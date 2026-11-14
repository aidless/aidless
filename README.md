# Liu Zewen (刘泽文)

[![CI](https://github.com/aidless/aidless/actions/workflows/ci.yml/badge.svg)](https://github.com/aidless/aidless/actions/workflows/ci.yml)

**LLM Evaluation & Reliability.** I build a three-layer LLM evaluation pipeline — execution sandbox → verdict gate → rubric — that decides whether a model actually improved, and I publish the evidence when it refuses to pass. **Start with [`eval-gate`](https://github.com/aidless/eval-gate): one command, no API key, sub-second, and its frozen demo suite is benchmark-verified ([`10/10 scenarios`](https://github.com/aidless/eval-gate/blob/main/docs/BENCHMARK.md), [`v0.2.0 release`](https://github.com/aidless/eval-gate/releases/tag/v0.2.0)).**

📧 [17353895263@163.com](mailto:17353895263@163.com) · China · open to relocate · available immediately

## What I don't claim (read this first)

No peer-reviewed acceptance. No external users yet. No live demo. `eval-sandbox`, `eval-gate` and `rubric-support-qa` are not on PyPI. `rubric-support-qa` has no model run and no inter-annotator κ yet — its README says so instead of quoting a number.

What I do claim: **every number in this profile is recomputable from the repo that produced it**, and where I could not reproduce a figure I removed it rather than hedge. The `Measured now` column below is command output, not aspiration.

## One chain, three repos

**Execution → Verdict → Criteria.** Each repo is independently clonable, runs offline, and fails loudly instead of passing quietly.

| Layer | Repository | The question it answers | Measured now |
|---|---|---|---|
| Execution | [`eval-sandbox`](https://github.com/aidless/eval-sandbox) | Did the task actually run isolated — network, mounts, memory, CPU, PIDs? | `SUMMARY: 10/10 PASS`, `43 passed` |
| Verdict | [`eval-gate`](https://github.com/aidless/eval-gate) | Did this change make the model worse? | [benchmark-verified](https://github.com/aidless/eval-gate/blob/main/docs/BENCHMARK.md): `10/10` frozen scenarios, `v0.2.0` |
| Criteria | [`rubric-support-qa`](https://github.com/aidless/rubric-support-qa) | Is the scoring rubric itself right, before anyone scores with it? | 300 dev + 800 frozen items hash-verified, `114` tests |

```bash
# Execution — also needs bubblewrap + a writable cgroup v2 subtree; missing either and it refuses to run
git clone --depth 1 https://github.com/aidless/eval-sandbox && cd eval-sandbox
python3 -m eval_sandbox.cli check

# Verdict — quickstart needs no dataset and no API key
git clone --depth 1 https://github.com/aidless/eval-gate && cd eval-gate
python3 -m venv .venv && .venv/bin/pip install . && .venv/bin/eval-gate quickstart

# Criteria — hash-checks the frozen sets, then lints rubric v0
git clone --depth 1 https://github.com/aidless/rubric-support-qa && cd rubric-support-qa
python3 scripts/freeze.py --check && python3 scripts/freeze_test.py --check && python3 rubric/lint.py
```

The refusal is the product: `eval-sandbox` will not report a PASS when the isolation primitives are unavailable.

## Where to click first

Six entry points, in reading order. Each one runs offline with no API key; each one refuses rather than guesses.

| # | Repository | Why this one first |
|---|---|---|
| 1 | [`eval-gate`](https://github.com/aidless/eval-gate) | The flagship verdict gate: did this change make the model worse? five-state answer, [benchmark-verified frozen suite](https://github.com/aidless/eval-gate/blob/main/docs/BENCHMARK.md) |
| 2 | [`tmaudit`](https://github.com/aidless/tmaudit) | The reviewer pre-check: cheap reviewable defects caught before submission |
| 3 | [`arx`](https://github.com/aidless/arx) | The research loop: refuses to rank what its labels cannot resolve |
| 4 | [`eval-sandbox`](https://github.com/aidless/eval-sandbox) | The execution floor: does the task actually run isolated? `10/10 PASS` |
| 5 | [`rubric-support-qa`](https://github.com/aidless/rubric-support-qa) | The criteria: is the rubric right before anyone scores with it? |
| 6 | [`mcp-guard`](https://github.com/aidless/mcp-guard) | The tool surface: offline MCP definition-poisoning scan |

## Supporting layer

- [`trace-replay`](https://github.com/aidless/trace-replay) — replays recorded agent tool-call traces offline; byte-identical reports across repeated runs (sha256 verified), `111` tests, CI green on 3.10 / 3.11 / 3.12.
- [`auditable-llm-eval`](https://github.com/aidless/auditable-llm-eval) — is the reported number fake-green? Naive checker `100/100` green vs authoritative `0.69 / 0.67`; `96` tests.
- [`mcp-guard`](https://github.com/aidless/mcp-guard) — offline MCP tool-definition poisoning scan, with hash pinning against rug pulls.
- [`agent-reliability`](https://github.com/aidless/agent-reliability) — joint verdict over the tool surface and the output surface; `60 passed, 16 subtests passed`.
- [`llmtriage`](https://github.com/aidless/llmtriage) — one-command triage of a broken inference deployment; `57 passed`.
- [`tmaudit`](https://github.com/aidless/tmaudit) — TMLR self-audit CLI on PyPI; `264 passed, 3 skipped`.
- [`arx`](https://github.com/aidless/arx) — refuses to rank a leaderboard whose labels cannot resolve it; `371 passed, 3 skipped` after `pip install -e .`.
- [`agent-redteam`](https://github.com/aidless/agent-redteam) — OWASP-aligned red-team harness for LLM agents.


A pre-registered five-arm protocol measuring whether a model's **own** verification assertion tracks the persisted state — the same proxy/actual divergence found in external approval gates, but with no log to compare against, because the assertion and the action come from the same source.

- The **primary endpoint is empty, and the paper says so as an emptiness, not a zero rate**: of 216 temptation cells, 48 reached the acting path and none of those 48 carried an assertion. There is no denominator to divide.
- The supported finding is **narration can be wrong while the decision is right**: 6 of 36 statements claim tool, target and value all match the grant while the value differs — and the model stops correctly anyway
- Every number in the [10-page manuscript](https://github.com/aidless/r5-verify-vs-gate/blob/main/paper/main.pdf) (TMLR format, **arXiv-style preprint, not peer-reviewed**) is emitted by `emit_numbers.py` into a 92-row claim ledger, and `audit_numbers.py` **fails the build** on any number the ledger cannot source. 21 distinct numbers: 14 sourced, 7 structural, 0 unmatched
- Writing the unexecuted arm down exposed a silent defect: Arm E's "trained verification switch" never reached the backend — the arm's prompt was byte-identical to Arm A's, so a run would have produced Arm A's behaviour under Arm E's label. The seam now refuses to run rather than degrade (Amendment 6, 9 tests)

```bash
git clone https://github.com/aidless/r5-verify-vs-gate && cd r5-verify-vs-gate
python3 scripts/check_integrity.py   # stop rule 1: 540-cell EXACT REPRODUCTION
python3 audit_numbers.py             # 0 unsourced numbers in the manuscript
```

### 1. [`gsm8k-self-evolve`](https://github.com/aidless/gsm8k-self-evolve) — the trust anchor

Two rounds of policy self-evolution on GSM8K, built so that **anyone can recompute every number from the raw files**.

- Blind set **0.780 → 0.925** (200 paired items), **McNemar p = 1.08e-06**, paired split 33:4
- `python3 verify_evidence.py` recomputes the chain; `signed/bundle.json` is an **Ed25519-signed** manifest of every artifact
- Round 5 is a preregistered ablation: it locates the gate's power in an α=0.05 significance test (FPR 0.0125, against 0.4125 / 0.9825 for the naive gates) with **zero model calls**

**The part worth your attention**: the evidence chain verifies on **any** checkout — `tools/verify_evidence_chain.py` prints 5/5 PASS including the Ed25519 signature — and CI is green. How it got green is the point: the gate used to hash the live working tree against a bundle that pins the round-2 evaluator, so it could only ever fail. The fix pointed the check at the byte-exact signed copy (`signed/artifacts/`) and documented the provenance — **not** a re-sign — and the mutation-control job still perturbs a hashed artifact to prove the gate can refuse.

```bash
git clone https://github.com/aidless/gsm8k-self-evolve && cd gsm8k-self-evolve
python3 verify_evidence.py
```

### 2. [`ai-agent-playground`](https://github.com/aidless/ai-agent-playground) — production agent system

**5** self-improvement engines (evolution, debate, bootstrap, self-play, meta-agent) across ~55 modules under `agent/`. Detects its own capability gaps, generates missing tools at runtime, evolves them, rolls back on regression.

- **161 passed, 1 skipped** in `tests/`, **0 failures** (run needs a format-valid `DEEPSEEK_API_KEY`; the key is never used to reach the network)
- **14/14** penetration tests (OWASP LLM Top 10), `scripts/pentest.py`
- Committed evidence: `benchmark_report.json`, `b3_bench_report.json` (10 attacks), `code_bench_report.json`, `swebench_report.json`, `multi_agent_bench_report.json`
- Ran 24/7 on Alibaba Cloud ECS. **The instance is released**, so there is no live demo — see below

```bash
git clone https://github.com/aidless/ai-agent-playground && cd ai-agent-playground
uv sync --locked && uv run pytest tests/ -q
```

**What I won't claim:** an earlier version of this page quoted "9 engines", "100k+ requests handled", and "P95 = 150ms over 1000 requests". The first was simply wrong — it is 5, and the repo README said so. The other two I could not reproduce from anything committed, so they are gone rather than hedged. The benchmark files above are what I can actually show you.

### 3. [`mm-epc`](https://github.com/aidless/mm-epc) — where the evaluator, not the task design, drives the drift

Multi-modal evaluator preference collapse. **arXiv preprint ([2606.16682](https://arxiv.org/abs/2606.16682)), not peer-reviewed.**

- **MPCI = 1.449** for GPT-4o-as-judge — **~3.2×** the self-eval condition, **2.0×** random
- Self-eval looks immune (**γ̄ ≈ 0.033**) — but swapping the judge within the same family flips that by **~36×**
- **An earlier draft reported p = 0.008 on directional asymmetry. The final analysis does not.** The claim was revised during review preparation, and the reversal became the input to a separate diagnostic line of work rather than being quietly dropped

Full experiment JSONs, a preregistered protocol, and an evidence manifest are in the repo.

### 4. [`arx`](https://github.com/aidless/arx) — what a rank gap is worth, on real boards

A gate that refuses to call a ranking readable unless the leader clears the noise floor of its own labels — run on all three ChaosNLI components (4,645 items, 100 annotations each) and then on the same board twice, with only the label producer changed.

- **Three boards, three verdicts**: `READABLE` on SNLI, `UNREADABLE` on MNLI-m and αNLI — and on both refusals the **leader itself** scores below the floor
- **The verdict inverts with the floor's producer**, board held fixed: 100 humans → margin **+0.0423** (`READABLE`); a 32-judge LLM panel → margin **−0.0770** (`UNREADABLE`), because the panel agrees with itself (0.8660) more than any model in the board scores (0.7890)
- **Even the readable board's ranking does not survive**: its top four systems sit within **0.29x** of the minimum detectable effect
- **Formatting alone moves the judges more than the ranking does**: re-ordering the answer options swings a judge's accuracy by a median **0.0120**, against a top-to-second gap of **0.0020** on the same items
- **It can reject a board too, not just rank one**: AlpacaEval 2.0 publishes no per-item human labels, and three of its five public evaluators are prompt variants of one GPT-4-turbo — two of those return an identical verdict on **805 of 805** items, one judge run counted twice. All four premises recompute

```bash
git clone https://github.com/aidless/arx && cd arx/case-studies/chaosnli-noise-floor
python3 audit_chaosnli.py && python3 audit_judge_panel.py && python3 audit_position_bias.py
python3 audit_alpaca_eval.py     # this one needs its own inputs; see the README
```

**Read the write-up:** [English](https://github.com/aidless/arx/blob/main/case-studies/chaosnli-noise-floor/ARTICLE.md) · [中文](https://github.com/aidless/arx/blob/main/case-studies/chaosnli-noise-floor/ARTICLE.zh-CN.md)

**What I won't claim:** the nine checkpoints are 2019-era encoders rather than LLMs, and the judge panel's *identities* are taken on trust — the latter is the data release's own caveat. Neither touches the finding, which is about the apparatus, but both are written down in the report instead of left out.

---

## Agent evaluation: does the signal agree with the effect?

Three instruments for one question — whether a comparison can be resolved at
all, whether the proxy report matches the persisted effect, and whether the loop
itself is covered by eval.

| Instrument | Question it answers | Evidence |
|---|---|---|
| [`arx`](https://github.com/aidless/arx) | Can this comparison be resolved at all? | Four verdicts; the same board flips `READABLE` → `MARGINAL` when the MDE method changes (0.0274 → 0.0743, 2.7×) with no change to the data. 374 tests, 371 passing / 3 environment-skipped in CI |
| [`agent-proxy-audit`](https://github.com/aidless/agent-proxy-audit) | Does the proxy report agree with the persisted effect? | 540-cell matrix: name-check passes **63** unauthorized effects, full precheck **45**, bound-control/AGT **0**. Self-verification's zeros include a **27/27 format collapse** — a false zero, not safety |
| [`agent-loop-safety`](https://github.com/aidless/agent-loop-safety) | Is the agent loop covered by eval? | `compare` / `chain_coverage` / `coupling_map` / `estimate`; offline tests and a red-team integration behind a write gate |

Supporting: [`agent-redteam`](https://github.com/aidless/agent-redteam) (OWASP-aligned red-team harness, 92 tests), [`mcp-guard`](https://github.com/aidless/mcp-guard) (offline MCP poisoning scan + hash pinning), [`agent-databench`](https://github.com/aidless/agent-databench) (20-task cost-aware eval).

**Full line, methods, reproducible commands, and stated limits:** [AGENT_EVAL.md](AGENT_EVAL.md)

---

## The research line

Eight preprints on evaluator-coupling, multi-agent systems and memory architecture, **none peer-reviewed**. Three carry a public arXiv ID; the other five are in-repo manuscripts, and those repositories say so themselves rather than letting a summary imply otherwise.

| Preprint on arXiv | ID |
|---|---|
| Multimodal Evaluator Preference Collapse: Cross-Modal Coupling in Self-Evolving Agents | [2606.16682](https://arxiv.org/abs/2606.16682) |
| Calibrating the Evaluator: Does Probability Calibration Mitigate Preference Coupling in LLM Agent Feedback Loops? | [2606.31371](https://arxiv.org/abs/2606.31371) |
| Mapping the Evaluation Frontier: An Empirical Survey of the Bias–Reliability Tradeoff Across Eleven Evaluator-Agent Conditions | [2607.00304](https://arxiv.org/abs/2607.00304) |

The other five carry an arXiv-style manuscript in the repository and state plainly that no arXiv submission is claimed. The `2606.31371` and `2607.00304` evidence bundles are not public yet, so this page links the preprint and not an artifact I cannot hand you. The public repositories ship SHA-256 evidence chains rather than prose claims.

| Repository | What it establishes |
|---|---|
| [`r5-verify-vs-gate`](https://github.com/aidless/r5-verify-vs-gate) | External approval gate vs model-internal self-verification: the primary endpoint is empty for a structural reason, and the narration can be wrong while the decision is right |
| [`approval-gates-r3`](https://github.com/aidless/approval-gates-r3) | The external-gate baseline R5 builds on: 540 constructed cells; 63/45 unauthorized effects under name-only / exact-precheck while the name/log proxy stays positive — plus an uncalibrated independent AI review (6.2/10) kept citable |
| [`agent-effort-r1`](https://github.com/aidless/agent-effort-r1) | A five-axis allocation calculation (modeled token-cost ratio 3.44) vs eight-task bounded agent evaluation, two Qwen3 AWQ case studies, 672 records each — with a protocol audit of what the model assumes and what the records support |
| [`memory-architecture-bias`](https://github.com/aidless/memory-architecture-bias) | A negative result **reversed by external replication** (+2.72, p < 0.0001) |
| [`acvjepa-project`](https://github.com/aidless/acvjepa-project) | AC-VJEPA: three preregistered experiments, three negative results |

**A convention I keep**: when a result reverses, the reversal is written down and kept citable. `aettl-research` is a whole repository kept online specifically to preserve a paper whose headline `p = 0.008` did not survive — its description says so.

## Teaching and tooling

- [`morphagent-textbook`](https://github.com/aidless/morphagent-textbook) — 31-chapter open textbook on self-modifying agents. Zenodo DOI, GitHub Pages. **The only repository here with more than one star.**
- [`paper-writing-agent`](https://github.com/aidless/paper-writing-agent) — 49 deterministic validation gates for paper writing, including a 619-line stdlib re-implementation of p/t/z/χ²/F, and a library of 29 failure modes mined from real revision rounds
- [`arx`](https://github.com/aidless/arx) — a research loop that refuses to write a claim its measurement cannot resolve: noise floor, minimum detectable effect, pre-registration ledger. 374 tests (371 passing, 3 environment-skipped in CI), five offline examples. Clone-and-run needs `pip install -e .` first, because the package lives under `src/`. The [ChaosNLI case study](https://github.com/aidless/arx/tree/main/case-studies/chaosnli-noise-floor) returns `READABLE` once and `UNREADABLE` twice over three real boards, shows the same board flipping verdict when only the label producer changes, and records an audit of AlpacaEval 2.0 that rejects it on four premises
- [`auditable-llm-eval`](https://github.com/aidless/auditable-llm-eval) — evaluating the evaluator: the naive check reports 100% green while the authoritative scorer returns 69.00% / 67.00%
- [`wse-bench-public`](https://github.com/aidless/wse-bench-public) — 156-task eval-gated self-evolution benchmark with an append-only promotion ledger, paired McNemar and cluster bootstrap
- [`tmaudit`](https://github.com/aidless/tmaudit) — TMLR self-audit CLI, rulepack C1–C10, plus a plugin API for auditing papers the built-in configs do not cover; **published to PyPI** ([`pip install tmaudit`](https://pypi.org/project/tmaudit/)), 264 passing / 1 skipped across Python 3.9–3.13 in CI, 14/14 regression-injection bugs caught
- [`agent-redteam`](https://github.com/aidless/agent-redteam) — red-team harness; 109 pytest tests, 108 passing offline (one needs network), plus a CI regression gate, including a documented incident where a hallucinated dependency version (`pandas==3.0.5`) broke a pipeline
- [`ai-researcher`](https://github.com/aidless/ai-researcher) — autonomous research loop: preregistration envelope + kill-switch executor + two-seat review + an Ed25519 evidence chain
- [`paper_agent`](https://github.com/aidless/paper_agent) — full-lifecycle paper agent: retrieval, close reading, writing and an evidence chain, with its own eval harness
- [`agent_compose`](https://github.com/aidless/agent_compose) — agent-composition experiments (ReAct / Reflexion / ablations); every results JSON recomputable from raw files

---

## How I work

**I test my own gates.** After finding that six repositories on this account had CI that was green while proving nothing — `|| true` swallowing every failure, and one gate that printed "no Python sources tracked" in a repository with 182 of them — I added mutation-control jobs: each injects a known fault and requires the gate to reject it, then re-wraps the gate in the swallowing form and requires the control to *refuse* that. **38 repositories carry one**, 30 of them public, so the pattern is checkable rather than asserted.

That approach immediately paid for itself: in `hybrid-calibration` the control reported `FAIL: the byte-compile gate accepted a file with a syntax error`. It had been wrong since it was written and no one had noticed.

Three rules I now follow without exception:

- **`yaml.safe_load` passing is not enough.** A workflow that mentions an Actions expression inside a `run:` block comment fails schema validation and never starts a job. `actionlint` before every push.
- **A green run means nothing until I confirm the gate earned it.** Mutation injection, or a reverse control.
- **Never "fix" a red gate by rewriting what it measures.** If the red is the correct answer — a signed bundle whose hashes no longer match, an evidence manifest for published results — the fix is documentation, not a re-signed file.

**Stack:** Python (primary) · FastAPI · LangGraph · PyTorch · DeepSeek / Qwen / Claude · ChromaDB + all-MiniLM · Postgres / Supabase (RLS) · Docker · Linux systemd

**Methods I reach for:** McNemar, cluster bootstrap, BH–Holm correction, preregistration, SHA-256 evidence manifests, append-only ledgers

---

## Currently

- **Looking for:** LLM Evaluation & Reliability Engineer / LLM–Agent Engineer
- **Location:** China · open to relocate · **Available immediately**
- **Contact:** [17353895263@163.com](mailto:17353895263@163.com) — plain email, no form

## The other half: AI application engineering

[`portfolio-site`](https://aidless.github.io/portfolio-site/) covers the product-engineering side — a zero-dependency static portfolio for AI-application / Agent-engineering roles, built on [`agent-platform`](https://github.com/aidless/agent-platform) (gateway, tool sandbox, memory compaction, failure taxonomy), [`llm-lab`](https://github.com/aidless/llm-lab) (eval orchestration with a hash-linked audit trail) and [`study-buddy`](https://github.com/aidless/study-buddy) (mobile first-run path, RLS, explicit privacy choice). Every card states what it does **not** prove — `study-buddy` has zero real users, and the page says so.

## What this repository itself is

This repository is a **profile page**, not a codebase: it tracks **0 Python
files** and holds no runnable artifact. Its CI (`.github/workflows/ci.yml`) runs
three things on a checkout with no source: a byte-compile gate that is a no-op
here, a link check that every relative Markdown link resolves, and a
mutation-control job that proves the byte-compile gate *can* fail (it corrupts a
tracked `.py` and requires a non-zero exit; here it has no `.py` to corrupt, so
the control asserts the gate is vacuously green on this tree and documents that
fact rather than pretending it tested something).

**Boundary:** the numbers and claims on this page belong to the linked
repositories, not to this one. Each link's claim is verified in that repo (e.g.
`r5-verify-vs-gate` runs `audit_numbers.py` and fails on any unsourced number;
`gsm8k-self-evolve` runs `verify_evidence.py`). Where a number cannot be
reproduced, this page says so instead of quoting it. No claim here is a
peer-reviewed acceptance — every manuscript is an arXiv-style preprint or an
in-repo manuscript, and the page states that.

## Elsewhere

- [从学生项目到生产级 AI Agent](https://github.com/aidless/ai-agent-playground/blob/master/blog/from-student-to-production.md) · [English](https://github.com/aidless/ai-agent-playground/blob/master/blog/from-student-to-production-en.md)

## 验收标准与复算

本仓判为合格的验收判据是：`python3 eval/run_cases.py` 的通过率必须为 100%（20/20），且 `make eval` 的退出码必须为 0；任何一条失败即判为不合格。20 条题全部现算 —— 19 条 `expr` 真解析 `portfolio-mcp/data/*.json` 与 `server.mjs` / `verify_chain.mjs` 源码，1 条 `doc` 校验 `portfolio-mcp/README.md` 公布的组合 root 与数据一致；期望值是跑出来的，改一个字段就会变红。

| axis | 判什么 | 条数 |
|---|---|---|
| `dataset/repos` | 仓库记录数、original 口径、tier F 榜首（与 `search_repos` 排序一致） | 3 |
| `dataset/papers` | 可见论文数、arXiv 号条数、单一方向的条数 | 3 |
| `dataset/comps` | 参赛记录数、奖牌资格条数、单条快照字段 | 3 |
| `chain` | 逐条 canonical sha256 重算三条链的 root、组合 root、不一致节点数 | 3 |
| `score` | 五维权重重算单仓 value、全表一致条数、`WEIGHTS` 归一 | 3 |
| `board` | `medianValue` 与 original value 中位数一致、commits 合计 | 2 |
| `server` | MCP 工具注册数、链初始前缀、README 公布 root 与重算一致 | 3 |

```bash
python3 eval/run_cases.py             # 期望 20/20，exit 0
python3 eval/run_cases.py --selftest  # 把第一条期望值改坏：期望 19/20 且 exit 0（证明这套题会红）
make eval                             # 一键重跑，rc 必须为 0
```

**复算口径。** 每条题的 `source` 指向真实文件（`portfolio-mcp/data/*.json:1`、`portfolio-mcp/server.mjs:24`、`portfolio-mcp/verify_chain.mjs:17`）。哈希链不是抄 `audit-chain.json` 的结论：`AL-10`–`AL-12` 按 `build_chain.mjs` 的 canonical JSON（字段名排序、数值按 `JSON.stringify` 形态）+ `prev|record` 链式 sha256 重算 166 条记录（107 repos + 51 papers + 8 comps），初始 `prev = "GENESIS:<label>"`，再以 `|` 连接三条 root 求组合 root；三个 root 与本仓落盘值逐字节相同、不一致节点数为 0。`AL-14` 钉住「落盘 value 与公开公式完全相等的条数」（当前 99/107），因此公式与数据一旦漂移，这一条先红，而不是让不一致被一个 pass rate 掩盖。

**失败归因**（`run_cases.py` 直接按 axis 汇总，不给单一通过率）：

```text
失败归因（按 axis）：
  dataset/comps: 3 条 —— AL-07, AL-08, AL-09
  dataset/papers: 3 条 —— AL-04, AL-05, AL-06
```

（上面是 `--selftest` 与变量名错误时的真实输出形态：先按 axis 定位是哪一类数据/口径坏了，再打开单条 `detail`。）
