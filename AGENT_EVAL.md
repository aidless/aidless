# Agent evaluation: does the signal agree with the effect?

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
- The same board gives **MDE 0.0274** with an independent binomial approximation
  and **0.0743** with a paired cluster bootstrap — a **2.7×** difference that
  flips the verdict with no change to the data. `mde_method` is therefore always
  printed.
- A floor check runs first: five generators that each flip a coin agree half the
  time, so a margin above that floor looks like a landslide. If the floor is not
  distinguishable from chance, the verdict is `UNDECIDABLE` regardless of margin.
- **370 tests passing, 3 skipped**; six examples run offline with no API key and
  no model.

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

The direction is now active in public preprints. Four papers read closely:

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

- **Decay:** access weighting extends retention **81 → 119 days**, but has no
  effect at the eviction margin under a 180-day half-life (418 days for every
  access pattern tested).
- **Conflict:** 50 pairs × 3 models. The conservative rule had **1/90 false
  merges** but missed **16/60** true continuations; the permissive rule caught
  **58/60** and merged **29/90**. The best operating point is model-specific:
  llama conservative 49/50, qwen conservative 46/50, gemma permissive 46/50.
- **Deletion:** 50 profiles. An extractive summary preserved a deleted secret
  **50/50** (clean 0/50, closure 0/50); the model's own three-bullet summary
  retained it only **2/50** and recovered **1/50** — and the one failure with
  the string present said "their access code", not "your". Residue depends on
  the summarizer and on how the query addresses the memory.

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
  security harness for multi-agent systems, OWASP-aligned playbook, 92 pytest
  tests passing (1 skipped), 93/93 CI checks across 7 suites.
- [`mcp-guard`](https://github.com/aidless/mcp-guard) — offline MCP tool-definition
  scanner for description poisoning and description drift, plus sha256 pinning
  against rug-pull changes; 27-case rules-v1 evaluation (17 poisoned, 10 benign).
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

- Not peer-reviewed, except where a specific arXiv preprint is linked.
- Not a general-purpose agent or an AGI claim. The instruments measure specific
  claims; they do not establish intelligence.
- The numbers are local and authored. Each repo states its own interpretation
  limits; the summaries here do not widen them.
