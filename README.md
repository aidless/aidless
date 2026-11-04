# Liu Zewen (刘泽文)

**LLM Evaluation & Reliability.** I build a three-layer LLM evaluation pipeline — execution sandbox → verdict gate → rubric — that decides whether a model actually improved, and I publish the evidence when it refuses to pass. **Start with [`eval-sandbox`](https://github.com/aidless/eval-sandbox): one command, no API key, ~5 seconds.**

📧 [17353895263@163.com](mailto:17353895263@163.com) · China · open to relocate · available immediately

## One chain, three repos

**Execution → Verdict → Criteria.** Each repo is independently clonable, runs offline, and fails loudly instead of passing quietly.

| Layer | Repository | The question it answers | Measured now |
|---|---|---|---|
| Execution | [`eval-sandbox`](https://github.com/aidless/eval-sandbox) | Did the task actually run isolated — network, mounts, memory, CPU, PIDs? | `SUMMARY: 10/10 PASS`, `43 passed` |
| Verdict | [`eval-gate`](https://github.com/aidless/eval-gate) | Did this change make the model worse? | `4/4` verdicts as expected, `70` tests |
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

## Supporting layer

- [`trace-replay`](https://github.com/aidless/trace-replay) — replays recorded agent tool-call traces offline; byte-identical reports across repeated runs (sha256 verified), `111` tests, CI green on 3.10 / 3.11 / 3.12.
- [`auditable-llm-eval`](https://github.com/aidless/auditable-llm-eval) — is the reported number fake-green? Naive checker `100/100` green vs authoritative `0.69 / 0.67`; `88` tests.
- [`mcp-guard`](https://github.com/aidless/mcp-guard) — offline MCP tool-definition poisoning scan, with hash pinning against rug pulls.
- [`agent-reliability`](https://github.com/aidless/agent-reliability) — joint verdict over the tool surface and the output surface; `60 passed, 16 subtests passed`.
- [`llmtriage`](https://github.com/aidless/llmtriage) — one-command triage of a broken inference deployment; `57 passed`.
- [`tmaudit`](https://github.com/aidless/tmaudit) — TMLR self-audit CLI on PyPI; `264 passed, 3 skipped`.
- [`arx`](https://github.com/aidless/arx) — refuses to rank a leaderboard whose labels cannot resolve it; `371 passed, 3 skipped` after `pip install -e .`.
- [`agent-redteam`](https://github.com/aidless/agent-redteam) — OWASP-aligned red-team harness for LLM agents.

## What I don't claim

No peer-reviewed acceptance. No external users yet. No live demo. `eval-sandbox`, `eval-gate` and `rubric-support-qa` are not on PyPI. `rubric-support-qa` has no model run and no inter-annotator κ yet — its README says so instead of quoting a number. Where I could not reproduce a figure, I removed it rather than hedge.

The longer lines — preprints, agent-evaluation instruments, and the portfolio MCP server — are in [AGENT_EVAL.md](AGENT_EVAL.md).
