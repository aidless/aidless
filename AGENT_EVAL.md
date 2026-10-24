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
