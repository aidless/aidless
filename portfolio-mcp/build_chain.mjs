// 审计数据哈希链：把 107 条审计记录按 slug 排序，逐条链式哈希，
// 产出 root hash。任何人改一条记录，后续哈希全变 → 可检测篡改。
// 这是「可复算」的升级：不仅分数可算，记录本身也防篡改。
import { readFileSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";

const REPOS = JSON.parse(readFileSync("data/repos.json", "utf8"));
const PAPERS = JSON.parse(readFileSync("data/papers.json", "utf8"));
const COMPS = JSON.parse(readFileSync("data/comps.json", "utf8"));

// 规范化：字段顺序固定，避免 JSON 序列化差异
function canonical(obj) {
  if (obj === null || typeof obj !== "object") return JSON.stringify(obj);
  if (Array.isArray(obj)) return "[" + obj.map(canonical).join(",") + "]";
  const keys = Object.keys(obj).sort();
  return "{" + keys.map(k => JSON.stringify(k) + ":" + canonical(obj[k])).join(",") + "}";
}

function chain(records, label) {
  let prev = "GENESIS:" + label;
  const nodes = [];
  for (const r of records) {
    const h = createHash("sha256").update(prev + "|" + canonical(r)).digest("hex");
    nodes.push({ id: r.slug || r.arxiv || "?", hash: h });
    prev = h;
  }
  return { label, count: records.length, root: prev, nodes };
}

const reposSorted = [...REPOS].sort((a, b) => a.slug.localeCompare(b.slug));
const papersSorted = [...PAPERS].sort((a, b) => a.slug.localeCompare(b.slug));
const compsSorted = [...COMPS].sort((a, b) => a.slug.localeCompare(b.slug));

const chains = [
  chain(reposSorted, "repos"),
  chain(papersSorted, "papers"),
  chain(compsSorted, "comps")
];

const combinedRoot = createHash("sha256")
  .update(chains.map(c => c.root).join("|"))
  .digest("hex");

const out = {
  generatedAt: new Date().toISOString(),
  algorithm: "sha256(chained, canonical-json)",
  chains: chains.map(c => ({ label: c.label, count: c.count, root: c.root })),
  root: combinedRoot,
  nodes: Object.fromEntries(chains.map(c => [c.label, c.nodes]))
};

writeFileSync("data/audit-chain.json", JSON.stringify(out, null, 2));
console.log("root:", combinedRoot);
chains.forEach(c => console.log(`  ${c.label}: ${c.count} records, root=${c.root.slice(0, 16)}…`));
