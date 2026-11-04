#!/usr/bin/env node
// aidless portfolio MCP server —— 把 107 仓 / 51 论文 / 8 赛道 / 五维价值分
// 暴露成标准 MCP 工具，任何 MCP 客户端（Claude Desktop / Cursor / 任意 AI Agent）
// 都能直接查询。这是作品集的「机器消费接口」：作品集不只是给人看的页面，
// 也是 AI 助手可检索的结构化数据源。
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = join(__dirname, "data");
const load = (f) => JSON.parse(readFileSync(join(dataDir, f), "utf8"));

const REPOS = load("repos.json");
const PAPERS = load("papers.json");
const COMPS = load("comps.json");
const BOARD = load("board.json");
const CHAIN = load("audit-chain.json");

// 五维权重与云函数 score 一致
const WEIGHTS = { evidence: 0.3, boundary: 0.2, entry: 0.2, original: 0.2, maintain: 0.1 };
const recompute = (v = {}) => {
  const raw = WEIGHTS.evidence*(v.evidence||0)+WEIGHTS.boundary*(v.boundary||0)
    +WEIGHTS.entry*(v.entry||0)+WEIGHTS.original*(v.original||0)+WEIGHTS.maintain*(v.maintain||0);
  return Math.round(raw*10*100)/100;
};

const repoCard = (r) => ({
  slug: r.slug, name: r.name, value: r.value, tier: r.tier, cat: r.cat,
  lang: r.lang, commits: r.commits, url: r.url, cluster: r.cluster,
  claim: r.claim, desc: r.desc,
  five: r.v ? {
    evidence: r.v.evidence, boundary: r.v.boundary, entry: r.v.entry,
    original: r.v.original, maintain: r.v.maintain
  } : null,
  topics: r.topics || []
});

const paperCard = (p) => ({
  slug: p.slug, titleZh: p.titleZh, arxiv: p.arxiv || null, zenodo: p.zenodo || null,
  status: p.status, statusLabel: p.statusLabel, direction: p.direction,
  url: p.url, proves: p.proves || [], doesNotProve: p.doesNotProve || []
});

const server = new McpServer({
  name: "aidless-portfolio",
  version: "1.0.0",
});

// 1) 总览
server.tool(
  "portfolio_overview",
  "Get a portfolio snapshot: repo/paper/competition counts, 5-factor audit aggregates, median value, language mix.",
  {},
  async () => {
    const original = REPOS.filter(r => r.cat === "original");
    // 中位/峰值一律取 board 的官方口径（与小程序首页、审计脚本同一处）
    const med = BOARD.medianValue;
    const payload = {
      repos: REPOS.length,
      originalRepos: original.length,
      papersVisible: PAPERS.filter(p => !p.duplicateOf).length,
      papersTotal: PAPERS.length,
      competitions: COMPS.length,
      originalCommits: original.reduce((a,r) => a + (r.commits||0), 0),
      readmeChars: original.reduce((a,r) => a + (r.readmeLen||0), 0),
      medianValue: med,
      maxValue: BOARD.maxValue,
      boundaryWritten: REPOS.filter(r => r.hasBoundary).length,
      usageHas: REPOS.filter(r => r.hasUsage).length,
      board: BOARD
    };
    return { content: [{ type: "text", text: JSON.stringify(payload, null, 2) }] };
  }
);

// 2) 仓库查询
server.tool(
  "search_repos",
  "Search the 107 audited GitHub repos by keyword (name/desc/claim/topics) or by 5-factor skill tag. Returns value score, tier, 5-factor breakdown, url.",
  {
    q: z.string().optional().describe("free-text query, matched against name/desc/claim/topics"),
    skill: z.string().optional().describe("exact topic tag, e.g. 'python', 'llm-evaluation'"),
    tier: z.enum(["F","S","B","X"]).optional().describe("F=flagship S=standard B=stock X=archive"),
    limit: z.number().int().min(1).max(50).default(10)
  },
  async ({ q, skill, tier, limit }) => {
    let list = REPOS;
    if (tier) list = list.filter(r => r.tier === tier);
    if (skill) {
      const s = skill.toLowerCase();
      list = list.filter(r => (r.topics||[]).map(t => String(t).toLowerCase()).includes(s));
    }
    if (q) {
      const k = q.toLowerCase();
      list = list.filter(r => [r.name, r.desc, r.claim, r.lang, (r.topics||[]).join(' ')]
        .join(' ').toLowerCase().includes(k));
    }
    const totalMatched = list.length;
    list = list.slice().sort((a,b) => b.value - a.value).slice(0, limit);
    const payload = { matched: totalMatched, returned: list.length, repos: list.map(repoCard) };
    return { content: [{ type: "text", text: JSON.stringify(payload, null, 2) }] };
  }
);

// 3) 单仓详情（含边界与用法）
server.tool(
  "get_repo",
  "Get one repo by slug: 5-factor scores, proof trace (computed value, per-dim formula steps), boundary declaration, usage snippet.",
  { slug: z.string().describe("repo slug, e.g. 'roofline-lint'") },
  async ({ slug }) => {
    const r = REPOS.find(x => x.slug === slug);
    if (!r) return { content: [{ type: "text", text: JSON.stringify({ ok: false, error: "not found: " + slug }) }] };
    const payload = {
      ...repoCard(r),
      readmeLen: r.readmeLen,
      sizeKb: r.sizeKb,
      created: r.created, pushed: r.pushed,
      license: r.license,
      hasBoundary: r.hasBoundary, hasUsage: r.hasUsage, hasInstall: r.hasInstall,
      proof: r.proof || null,
      usage: r.usage || null,
      recomputedValue: recompute(r.v)
    };
    return { content: [{ type: "text", text: JSON.stringify(payload, null, 2) }] };
  }
);

// 4) 论文 + 边界账本
server.tool(
  "search_papers",
  "Search 51 preprints (10 arXiv + 36 Zenodo + in-prep/rejected). Every paper carries 'proves' and 'doesNotProve' — the honest boundary ledger.",
  {
    q: z.string().optional().describe("keyword in titleZh/title/tagline/proves/doesNotProve"),
    direction: z.string().optional().describe("research direction, e.g. '多智能体评估'"),
    onlyUncertain: z.boolean().optional().describe("if true, only papers that carry doesNotProve entries"),
    limit: z.number().int().min(1).max(50).default(10)
  },
  async ({ q, direction, onlyUncertain, limit }) => {
    let list = PAPERS.filter(p => !p.duplicateOf);
    if (direction) list = list.filter(p => p.direction === direction);
    if (onlyUncertain) list = list.filter(p => (p.doesNotProve||[]).length > 0);
    if (q) {
      const k = q.toLowerCase();
      list = list.filter(p => [p.titleZh, p.title, p.tagline, (p.proves||[]).join(' '), (p.doesNotProve||[]).join(' ')]
        .join(' ').toLowerCase().includes(k));
    }
    list = list.slice(0, limit).map(paperCard);
    return { content: [{ type: "text", text: JSON.stringify({ matched: list.length, papers: list }, null, 2) }] };
  }
);

// 5) 价值分复算（可核验承诺的机器入口）
server.tool(
  "recompute_value",
  "Recompute the 5-factor weighted value score from raw dimension values — proves the score is a public formula, not a hardcoded number. Returns the substituted expression.",
  {
    evidence: z.number().min(0).max(1),
    boundary: z.number().min(0).max(1),
    entry: z.number().min(0).max(1),
    original: z.number().min(0).max(1),
    maintain: z.number().min(0).max(1)
  },
  async (v) => {
    const raw = WEIGHTS.evidence*v.evidence + WEIGHTS.boundary*v.boundary
      + WEIGHTS.entry*v.entry + WEIGHTS.original*v.original + WEIGHTS.maintain*v.maintain;
    const expr = `0.30×${v.evidence} + 0.20×${v.boundary} + 0.20×${v.entry} + 0.20×${v.original} + 0.10×${v.maintain} = ${raw.toFixed(4)} → ×10 = ${(raw*10).toFixed(2)}`;
    return { content: [{ type: "text", text: JSON.stringify({ value: Math.round(raw*10*100)/100, expression: expr, weights: WEIGHTS }, null, 2) }] };
  }
);

// 6) 技能 → 证据映射
server.tool(
  "skill_to_evidence",
  "Given a skill, return the repos + papers that are the verifiable evidence for it (skill → code mapping).",
  { skill: z.string().describe("e.g. 'LLM 评测系统', 'Agent 安全评测', '可复现工程'") },
  async ({ skill }) => {
    const SKILL_MAP = {
      "LLM 评测系统": ["auditable-llm-eval"],
      "Agent 安全评测": ["agent-redteam"],
      "联合裁决链路": ["agent-reliability"],
      "部署可行性判定": ["roofline-lint"],
      "可复现工程": ["arx"],
      "Serverless / 云开发": ["ai-agent-playground"]
    };
    const wanted = (SKILL_MAP[skill] || []).filter(Boolean);
    const repos = REPOS.filter(r => wanted.includes(r.slug)).map(repoCard);
    // 也按 topics 模糊补充
    const byTopic = REPOS.filter(r => (r.topics||[]).some(t => String(t).toLowerCase().includes(skill.toLowerCase())));
    return { content: [{ type: "text", text: JSON.stringify({
      skill,
      curatedRepos: repos,
      topicMatches: byTopic.slice(0, 10).map(repoCard)
    }, null, 2) }] };
  }
);

// 8) 审计数据完整性（防篡改哈希链）
server.tool(
  "verify_integrity",
  "Return the SHA-256 hash-chain root over all audit records. Anyone can recompute it with verify_chain.mjs; a single changed field breaks the root, so the numbers are tamper-evident.",
  {},
  async () => ({ content: [{ type: "text", text: JSON.stringify({
    algorithm: CHAIN.algorithm,
    generatedAt: CHAIN.generatedAt,
    root: CHAIN.root,
    chains: CHAIN.chains,
    howToVerify: "node verify_chain.mjs (recomputes every chain and compares to data/audit-chain.json)"
  }, null, 2) }] })
);

// 7) 竞赛
server.tool(
  "search_competitions",
  "Search 8 Kaggle entries with honest snapshot metadata (score, rank, teams, snapshot date, medal).",
  { q: z.string().optional().describe("keyword in name/tagline") },
  async ({ q }) => {
    let list = COMPS;
    if (q) {
      const k = q.toLowerCase();
      list = list.filter(c => [c.name, c.tagline, c.role, c.status].join(' ').toLowerCase().includes(k));
    }
    return { content: [{ type: "text", text: JSON.stringify({ matched: list.length, competitions: list }, null, 2) }] };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("[aidless-portfolio-mcp] ready on stdio");
}

main().catch(err => { console.error(err); process.exit(1); });
