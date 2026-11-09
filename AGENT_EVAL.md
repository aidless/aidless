# Agent evaluation: does the signal agree with the effect?

Figures on this page are quotations from the linked files, read on 2026-11-09.
They were not re-run from this repository. An arXiv id is a preprint, not an
acceptance. No peer-reviewed acceptance is claimed for this line.

A claim about an agent is only as good as the measurement behind it. The repos
below are three instruments aimed at one question, from three directions:

1. **Can the comparison be resolved at all?** (`arx`)
2. **Does the proxy report agree with the persisted effect?** (`agent-proxy-audit`)
3. **Is the loop itself covered by the evaluation?** (`agent-loop-safety`)

They are deliberately not a framework, a leaderboard, or a benchmark suite. Each
one returns a verdict that can be wrong in a way you can inspect.

---

## 1. `arx` — resolution before effect size

[github.com/aidless/arx](https://github.com/aidless/arx) · Python 3.12 · Apache-2.0

Most evaluation debates ask whether a difference is big enough. `arx` asks
whether the measurement can resolve it: noise floor, margin, minimum detectable
effect (MDE), and the method that produced the MDE.

- Four verdicts: `READABLE` / `MARGINAL` / `UNDECIDABLE` / `UNREADABLE`. More
  items fixes `MARGINAL`; it does not fix `UNDECIDABLE`.
- The same README's example prints **MDE 0.0274** (`binomial_approx`) and
  **0.0743** (`cluster_bootstrap`) — about **2.7×** — and the verdict label
  changes with no change to the board. `mde_method` is therefore always
  printed. This page did not re-run `examples/02_audit_a_leaderboard.py`.
- A floor check runs first: five generators that each flip a coin agree half the
  time, so a margin above that floor looks like a landslide. If the floor is not
  distinguishable from chance, the verdict is `UNDECIDABLE` regardless of margin.
- Test count unchecked. That README's header says `374 passed, 0 skipped` and
  its Status section says `373 tests: 370 passing, 3 skipped` (both read on
  2026-11-09). This page will not pick one. The same header says six examples
  run offline with no API key and   no model. The PyPI project `arx` is a
  different project (`https://git.ligo.org/jameson.rollins/arx`). This page
  does not give a PyPI install command for it.

**What it does not claim:** `READABLE` says the margin cleared the floor by more
than the apparatus can resolve. It does not say the effect is real or that the
apparatus measured the right thing.

---

## 2. `agent-proxy-audit` — do verification signals equal persisted effects?

[github.com/aidless/agent-proxy-audit](https://github.com/aidless/agent-proxy-audit)

Three linked studies, one gap: between what a guard *reports* and what was
actually persisted locally. Every guard studied can report success while an
unauthorized effect lands anyway.

| Study | Question | Headline result |
|---|---|---|
| [approval-gates-r3](https://github.com/aidless/approval-gates-r3) | Do external approval gates' clean reports match persisted effects? | 540-cell constructed matrix: name-check passes **63** unauthorized effects, one-shot full precheck **45**; bound-control and AGT **0** |
| [r5-verify-vs-gate](https://github.com/aidless/r5-verify-vs-gate) | Does model-internal self-verification agree with persisted effects? | Without a gate, **14** (llama3.2:3b) / **10** (qwen2.5:7b) unauthorized effects; with self-verification **0** — but llama's zeros are **27/27 format collapse**, a false zero, not safety |
| [agent-effort-r1](https://github.com/aidless/agent-effort-r1) | Does an optimal allocation model describe a bounded tool-using agent? | 8,820-tuple search gives a modeled token-cost ratio **3.44×**; measured peaks diverge — 8B best at the **low** budget (0.9375), 14B at the **mid** (1.0000) |

Shared method: pre-registration with dated amendments, frozen blind checkers,
SHA-256 evidence manifests, and claim ledgers where every number names its source
file. Negative results and false zeros are recorded, not dropped.

**What it does not claim:** these are finite authored local-effect measurements.
They are not a defense, a population safety trial, or deployment validation.

---

## 3. `agent-loop-safety` — is the loop covered by eval?

[github.com/aidless/agent-loop-safety](https://github.com/aidless/agent-loop-safety)

A single-agent-loop harness skeleton plus an eval-first toolkit, distilled from
Anthropic's `single-agent-loop-kit`:

- `compare` — two eval runs side by side: pass rate, latency, calls, tokens,
  cost, and **routing changes**;
- `chain_coverage` — every production chain must have an eval task covering it,
  so a new branch cannot ship untested;
- `coupling_map` / `estimate` — where components couple, and what a change costs;
- offline tests and an integration example that wraps a red-team harness as a
  tool behind a write gate.

It is a reference skeleton, not a production runtime — the README says so up
front.

---

## Recent related work (Oct 2026)

The direction is visible in public preprints. Four papers are quoted below
from [`agent-proxy-audit/replications/2026-10-harness-and-deletion`](https://github.com/aidless/agent-proxy-audit/tree/main/replications/2026-10-harness-and-deletion),
read on 2026-11-09. The pilots described after them are that file's pilots,
not a new run from this page. The preprints are not acceptances.

- **When the harness decides success** (arXiv:2610.26632): truncating context
  costs nothing when a fact can be looked up again, but drops success to chance
  when it cannot — Δ **+92.5 points** (90% CI [89.5, 95.5]), replicated at
  **+101.0** on a second provider's model. On ARC-AGI-3, summarization recovers
  86% of a 63-point harness gap (one run per cell).
- **AfterDeleteBench** (arXiv:2610.31366): exact source deletion still leaves the
  secret recoverable from a derived summary — ΔRec **0.680** IID / **0.640** OOD,
  clean controls **0/200**; non-verbatim components reconstruct 0.615–0.990;
  provenance closure removes the tracked channel.
- **Who Verifies the Agent's Success Claim?** (arXiv:2610.29609): withholding the
  agent's self-report raises trace-only dangerous-misreport recall by **43.4**
  and **13.3** points on two judges; report isolation is a design requirement.
- **Auditing the Product, Not the Recursion** (arXiv:2610.27610): of 114 studies
  (90 self-described RSI), only **22%** audit two or more full-loop reruns, and
  **4 of 26** improvement claims compare procedures from identical starting
  artifacts at a matched budget.

I ran pilot replications of the first two on local Qwen2.5-7B: truncation ×
recoverability gave **0/6** when the fact was lost vs **6/6** when it could be
looked up; deleting a source record left the secret recoverable **20/20**, against
**0/20** never-exposed and **0/20** after provenance closure. Scripts, raw
records and the stated limits: [`agent-proxy-audit/replications/2026-10-harness-and-deletion`](https://github.com/aidless/agent-proxy-audit/tree/main/replications/2026-10-harness-and-deletion).

I also read four memory/harness systems in the same window — `ai-memory`
(git-backed Markdown, access-weighted decay, claim-once handoffs), `Hy-Memory`
(L0–L7 dual-process memory, conservative reconciliation), `Harness²` (eight
editable components, Propose–Probe–Compose), and `context-mode` (sandboxed
`ctx_execute`, SQLite/FTS5 continuity). Three pilots (local Ollama; the last two
scaled to 50 cases):

- **Decay:** that note says an access-weighted page survives **119 days** versus
  **81 days** for a never-accessed page, and that under a 180-day half-life
  retention is **418 days** for every access pattern tested.
- **Conflict:** that note's aggregate is conservative **44/60** true
  continuations and **1/90** false merges, and permissive **58/60** true and
  **29/90** false. (44 of 60 true is 16 missed; the missed count is that
  subtraction, not a separate reported cell.) The same note's per-model lines
  include llama conservative 49/50, qwen conservative 46/50, and gemma
  permissive 46/50.
- **Deletion:** that note says an extractive summary preserved a deleted secret
  **50/50** (clean 0/50, closure 0/50). Its prose says the model-written
  three-bullet summary retained the secret twice and recovered it once
  (**2/50** retained, **1/50** recovered). The one failure with the string
  present said "their access code", not "your". Residue depends on the
  summarizer and on how the query addresses the memory.

Comparison, scripts, raw records and limits:
[related systems](https://github.com/aidless/agent-proxy-audit/blob/main/docs/related-systems-2026-10.md).

**Write-up:** [Same conservative prompt, three operating points](https://github.com/aidless/agent-proxy-audit/blob/main/docs/blog/2026-10-conservative-prompt-operating-points.md).

**How this line differs:** the papers supply benchmarks and failure taxonomies;
this line supplies a check on whether a reported signal corresponds to a
persisted effect, with an evidence chain and an explicit refusal state. The
replications are pilot-scale and are labelled as such — they are not the
published protocols.

## Supporting tools

- [`agent-redteam`](https://github.com/aidless/agent-redteam) — red-vs-blue
  security harness for multi-agent systems, OWASP-aligned playbook. That
  README's status line says `92 passed / 1 skipped` and a CI regression gate
  `93/93` across 7 suites. Not re-run here. The PyPI project `agent-redteam`
  is `uninhibited-scholar/agent-redteam`, a different repository.
- [`mcp-guard`](https://github.com/aidless/mcp-guard) — offline MCP tool-definition
  scanner for description poisoning and description drift, plus sha256 pinning
  against rug-pull changes. That README's current offline set is 30 cases (19 poison / 11 benign), with `recall_case` quoted as 18/19. Not re-run here.
- [`agent-databench`](https://github.com/aidless/agent-databench) — a 20-task CSV
  data-analysis agent with a cost-aware harness (pass rate, turns, token spend).
  Fake-model rows are labelled `llm: fake` and are not counted as capability.

## Review this line in five minutes

```bash
# 1. resolution: two MDE methods, one verdict flip
git clone https://github.com/aidless/arx && cd arx
python3 -m pip install -e . && python3 examples/02_audit_a_leaderboard.py

# 2. proxy vs effect: the three-study table, with sources
#    open agent-proxy-audit/README.md and follow one study's claim ledger

# 3. loop coverage: offline, no API key
git clone https://github.com/aidless/agent-loop-safety && cd agent-loop-safety
python -m unittest discover -s tests -t .
```

## What this line does not claim

- No peer-reviewed acceptance. An arXiv id is a preprint, not an acceptance.
  The four ids named above resolved on 2026-11-09, via `export.arxiv.org`, to
  the titles this page uses. The numeric sentences are copied from
  `agent-proxy-audit/replications/2026-10-harness-and-deletion/README.md`,
  which quotes those preprints. This page did not re-read the PDFs.
- Not a general-purpose agent or an AGI claim. The instruments measure specific
  claims; they do not establish intelligence.
- The numbers are local and authored. Each repo states its own interpretation
  limits; the summaries here do not widen them.
- `chain_coverage`'s word "production" is the name of a chain under test in
  `agent-loop-safety`. That README says the repository is a reference
  skeleton, not a production runtime.
