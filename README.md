# Liu Zewen (刘泽文)

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**AI Application Developer** — autonomous agent systems, and the evidence discipline to know when they don't work.

Every claim below links to something you can check. Where a number can't be reproduced, I say so instead of quoting it.

---

## Three things to look at

Each of these is a repository you can clone and verify yourself. I start here rather than a skills table because the table is the least interesting thing about my work.

### 1. [`gsm8k-self-evolve`](https://github.com/aidless/gsm8k-self-evolve) — the trust anchor

Two rounds of policy self-evolution on GSM8K, built so that **anyone can recompute every number from the raw files**.

- Blind set **0.780 → 0.925** (200 paired items), **McNemar p = 1.08e-06**, paired split 33:4
- `python3 verify_evidence.py` recomputes the chain; `signed/bundle.json` is an **Ed25519-signed** manifest of every artifact
- Round 5 is a preregistered ablation: it locates the gate's power in an α=0.05 significance test (FPR 0.0125, against 0.4125 / 0.9825 for the naive gates) with **zero model calls**

**The part worth your attention**: the `verify` job in CI is **red on purpose**. The signed bundle binds the artifact hashes as of promotion, and the working tree has since grown, so the hash check fails. That is fail-closed behaving correctly — re-signing to make it green would mean the manifest no longer describes a promotion event that happened. A previous round had a similar situation in a different repo and I left it red there too.

```bash
git clone https://github.com/aidless/gsm8k-self-evolve && cd gsm8k-self-evolve
python3 verify_evidence.py
```

### 2. [`ai-agent-playground`](https://github.com/aidless/ai-agent-playground) — production agent system

**5** self-improvement engines (evolution, debate, bootstrap, self-play, meta-agent) across ~55 modules under `agent/`. Detects its own capability gaps, generates missing tools at runtime, evolves them, rolls back on regression.

- **161 tests** in `tests/` (166 collected including the end-to-end script), **0 failures**
- **14/14** penetration tests (OWASP LLM Top 10), `scripts/pentest.py`
- Committed evidence: `benchmark_report.json`, `b3_bench_report.json` (10 attacks), `code_bench_report.json`, `swebench_report.json`, `multi_agent_bench_report.json`
- Ran 24/7 on Alibaba Cloud ECS. **The instance is released**, so there is no live demo — see below

```bash
git clone https://github.com/aidless/ai-agent-playground && cd ai-agent-playground
uv sync --locked && uv run pytest tests/ -q
```

**What I won't claim:** an earlier version of this page quoted "9 engines", "100k+ requests handled", and "P95 = 150ms over 1000 requests". The first was simply wrong — it is 5, and the repo README said so. The other two I could not reproduce from anything committed, so they are gone rather than hedged. The benchmark files above are what I can actually show you.

### 3. [`mm-epc`](https://github.com/aidless/mm-epc) — where the evaluator, not the task design, drives the drift

Multi-modal evaluator preference collapse. In submission.

- **MPCI = 1.449** for GPT-4o-as-judge — **~3.2×** the self-eval condition, **2.0×** random
- Self-eval looks immune (**γ̄ ≈ 0.033**) — but swapping the judge within the same family flips that by **~36×**
- **An earlier draft reported p = 0.008 on directional asymmetry. The final analysis does not.** The claim was revised during review preparation, and the reversal became the input to a separate diagnostic line of work rather than being quietly dropped

Full experiment JSONs, a preregistered protocol, and an evidence manifest are in the repo.

---

## The research line

Five papers on evaluator-coupling, all with evidence chains (SHA-256 manifests) rather than prose claims.

| Repository | What it establishes |
|---|---|
| [`paper1-anon`](https://github.com/aidless/paper1-anon) | 13 conditions × 4 model families on evaluator-preference coupling |
| [`paper2-anon`](https://github.com/aidless/paper2-anon) | Cramér–Rao-type conditional bounds on the same coupling, γ ∈ [0.033, 1.038] |
| [`paper4-anon`](https://github.com/aidless/paper4-anon) | N-Sensitivity: how much of a conclusion is the evaluator's — 4 case studies |
| [`memory-architecture-bias`](https://github.com/aidless/memory-architecture-bias) | A negative result **reversed by external replication** (+2.72, p < 0.0001) |
| [`acvjepa-project`](https://github.com/aidless/acvjepa-project) | AC-VJEPA: three preregistered experiments, three negative results |

**A convention I keep**: when a result reverses, the reversal is written down and kept citable. `aettl-research` is a whole repository kept online specifically to preserve a paper whose headline `p = 0.008` did not survive — its description says so.

## Teaching and tooling

- [`morphagent-textbook`](https://github.com/aidless/morphagent-textbook) — 31-chapter open textbook on self-modifying agents. Zenodo DOI, GitHub Pages. **The only repository here with stars.**
- [`paper-writing-agent`](https://github.com/aidless/paper-writing-agent) — 49 deterministic validation gates for paper writing, including a 619-line stdlib re-implementation of p/t/z/χ²/F, and a library of 29 failure modes mined from real revision rounds
- [`tmaudit`](https://github.com/aidless/tmaudit) — TMLR self-audit CLI, rulepack C1–C10
- [`agent-redteam`](https://github.com/aidless/agent-redteam) — red-team harness, 93 tests, including a documented incident where a hallucinated dependency version (`pandas==3.0.5`) broke a pipeline

---

## How I work

**I test my own gates.** After finding that six repositories on this account had CI that was green while proving nothing — `|| true` swallowing every failure, and one gate that printed "no Python sources tracked" in a repository with 182 of them — I added mutation-control jobs: each injects a known fault and requires the gate to reject it, then re-wraps the gate in the swallowing form and requires the control to *refuse* that. 7 repositories now carry one.

That approach immediately paid for itself: in `hybrid-calibration` the control reported `FAIL: the byte-compile gate accepted a file with a syntax error`. It had been wrong since it was written and no one had noticed.

Three rules I now follow without exception:

- **`yaml.safe_load` passing is not enough.** A workflow that mentions an Actions expression inside a `run:` block comment fails schema validation and never starts a job. `actionlint` before every push.
- **A green run means nothing until I confirm the gate earned it.** Mutation injection, or a reverse control.
- **Never "fix" a red gate by rewriting what it measures.** If the red is the correct answer — a signed bundle whose hashes no longer match, an evidence manifest for published results — the fix is documentation, not a re-signed file.

**Stack:** Python (primary) · FastAPI · LangGraph · PyTorch · DeepSeek / Qwen / Claude · ChromaDB + all-MiniLM · Postgres / Supabase (RLS) · Docker · Linux systemd

**Methods I reach for:** McNemar, cluster bootstrap, BH–Holm correction, preregistration, SHA-256 evidence manifests, append-only ledgers

---

## Currently

- **Looking for:** AI Application Developer / AI Agent Engineer
- **Location:** China · open to relocate · **Available immediately**

## Elsewhere

- [从学生项目到生产级 AI Agent](https://github.com/aidless/ai-agent-playground/blob/main/blog/from-student-to-production.md) · [English](https://github.com/aidless/ai-agent-playground/blob/main/blog/from-student-to-production-en.md)
