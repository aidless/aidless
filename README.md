This repository is a profile index: it points at other repositories and does not itself run an evaluation pipeline.
The main line it points at is execution sandbox → verdict gate → rubric — [`eval-sandbox`](https://github.com/aidless/eval-sandbox), [`eval-gate`](https://github.com/aidless/eval-gate), [`rubric-support-qa`](https://github.com/aidless/rubric-support-qa).
It does not show peer-reviewed acceptance, external users, or a live demo. Counts below are quotes from those repositories as read on 2026-11-09, not suites executed in this checkout.

# Liu Zewen (刘泽文)

STATUS: WORK-IN-PROGRESS — not A yet. Gap: the GitHub About description is not stored in this tree. As read on 2026-11-09 it was `LLM evaluation & reliability — execution sandbox → verdict gate → rubric, each independently runnable. Start with eval-sandbox.` That line does not say this repository is only an index.

[![CI](https://github.com/aidless/aidless/actions/workflows/ci.yml/badge.svg)](https://github.com/aidless/aidless/actions/workflows/ci.yml)

The badge is this repository's own Actions workflow. It checks that relative Markdown links resolve, that tracked Python still byte-compiles, and that `scripts/check_claim_pins.py` still matches `claims/pinned-2026-11-09.json`. It does not clone or test the linked repositories. A green badge here is not a PASS from `eval-sandbox`.

**LLM Evaluation & Reliability.** I build a three-layer LLM evaluation pipeline — execution sandbox → verdict gate → rubric — that decides whether a model actually improved, and I publish the evidence when it refuses to pass. **Start with [`eval-sandbox`](https://github.com/aidless/eval-sandbox): one command, no API key.**

📧 [17353895263@163.com](mailto:17353895263@163.com) · China · open to relocate · available immediately

## One chain, three repos

**Execution → Verdict → Criteria.** Each repository is separately clonable. What happens when the command runs is what that repository's README says. This page does not add a measurement.

| Layer | Repository | The question it answers | Quoted from that README on 2026-11-09 |
|---|---|---|---|
| Execution | [`eval-sandbox`](https://github.com/aidless/eval-sandbox) | Did the task actually run isolated — network, mounts, memory, CPU, PIDs? | `SUMMARY: 10/10 PASS` and pytest `43 passed`. The same README also says a non-privileged run is `11 passed, 32 skipped`, and one recorded `check` wall clock is 5.2s. |
| Verdict | [`eval-gate`](https://github.com/aidless/eval-gate) | Did this change make the model worse? | Quickstart quoted as `4/4 符合预期`. `python3 -m pytest tests -q` is commented `# 129 tests`. `eval-gate demo` is quoted as `10/10 符合预期`. |
| Criteria | [`rubric-support-qa`](https://github.com/aidless/rubric-support-qa) | Is the scoring rubric itself right, before anyone scores with it? | 300 dev items and 800 frozen test items, hash-checked by the scripts below. `Ran 114 tests`. That README says there is no model run and no measured κ. |

```bash
# Execution — also needs bubblewrap and a writable cgroup v2 subtree.
# Missing either, and that repo refuses to report PASS.
git clone --depth 1 https://github.com/aidless/eval-sandbox && cd eval-sandbox
python3 -m eval_sandbox.cli check

# Verdict — quickstart needs no dataset and no API key.
# That README also says the PyPI name eval-gate returned 404; install from the clone.
git clone --depth 1 https://github.com/aidless/eval-gate && cd eval-gate
python3 -m venv .venv && .venv/bin/pip install . && .venv/bin/eval-gate quickstart

# Criteria — hash-checks the frozen sets, then lints rubric v0.
# Those three files exist on the default branch as checked on 2026-11-09.
git clone --depth 1 https://github.com/aidless/rubric-support-qa && cd rubric-support-qa
python3 scripts/freeze.py --check && python3 scripts/freeze_test.py --check && python3 rubric/lint.py
```

The refusal is the result `eval-sandbox` documents: it will not report a PASS when the isolation primitives are unavailable.

## Supporting layer

Each figure is a sentence in the linked README (or a GitHub Actions API read), dated 2026-11-09, and was not re-run from this checkout. Where that README disagrees with itself, the count is unchecked.

- [`trace-replay`](https://github.com/aidless/trace-replay) — offline replay of recorded agent tool-call traces. That README's section dated 2026-11-04 says pytest `111 passed`, and `verify --runs 3` printed `identical=true` for sha256 `50aa7357572bbc0ca3414358841615e25c4ad803796fd4591c294e354b94d193`. The Actions run that README cites, [41816274925](https://github.com/aidless/trace-replay/actions/runs/41816274925), had jobs `test (3.10)`, `test (3.11)`, `test (3.12)`, and `mypy` all `success` when the GitHub API was queried on 2026-11-09. A later `ci` run on `main`, [42626553504](https://github.com/aidless/trace-replay/actions/runs/42626553504), also concluded `success`; this page did not open that later run's jobs. That README says the report hash was not compared across Python versions.
- [`auditable-llm-eval`](https://github.com/aidless/auditable-llm-eval) — is the reported number fake-green? That README says the naive checker returns `100/100` and the authoritative scores are `0.6900` and `0.6700`, with `88 tests`.
- [`mcp-guard`](https://github.com/aidless/mcp-guard) — offline MCP tool-definition scan and sha256 pin. That README's offline set is 30 cases (19 poison / 11 benign). An older smaller split quoted on this page is withdrawn.
- [`agent-reliability`](https://github.com/aidless/agent-reliability) — joint verdict over the tool surface and the output surface. That README says `60 passed` and `16/16 mutations caught`. The 16 is a mutation-control count, not a subtest total. The PyPI project `agent-reliability` is a different repository (`kamleshd07/agent-reliability`). This page does not give a PyPI install command for it.
- [`llmtriage`](https://github.com/aidless/llmtriage) — one-command triage of a broken inference deployment. That README says `pytest -q` → `57 passed`. `https://pypi.org/pypi/llmtriage/json` returned 404 on 2026-11-09. This page does not repeat that README's PyPI install line.
- [`tmaudit`](https://github.com/aidless/tmaudit) — CLI that audits machine-learning paper LaTeX for reporting defects. Not a TMLR acceptance. `https://pypi.org/pypi/tmaudit/json` on 2026-11-09 returned version `0.5.1` with Homepage `https://github.com/aidless/tmaudit`. That README says PyPI `0.5.1` is behind the git tree (it calls the repository `0.5.2`) and quotes `264 passing + 3 skipped` (dated there 2026-11-01) while also saying CI reports `264 passed, 1 skipped, 2 deselected`.
- [`arx`](https://github.com/aidless/arx) — refuses to rank a leaderboard whose labels cannot resolve it. Test count unchecked: that README's header says `374 passed, 0 skipped` and its Status section says `373 tests: 370 passing, 3 skipped`. This page will not pick one. The same README's example prints MDE `0.0274` (`binomial_approx`) and `0.0743` (`cluster_bootstrap`), about `2.7×`. The PyPI project `arx` is a different project (homepage `https://git.ligo.org/jameson.rollins/arx`). This page does not give a PyPI install command for it.
- [`agent-redteam`](https://github.com/aidless/agent-redteam) — OWASP-aligned red-team harness for LLM agents. Count and limits are in [AGENT_EVAL.md](AGENT_EVAL.md). The PyPI project `agent-redteam` is a different repository (`uninhibited-scholar/agent-redteam`). This page does not give a PyPI install command for it.

## What this page does not prove

- A green clone, or a green Actions run, of a linked repository is not a published paper and not peer review.
- Test counts printed here were not executed in this checkout. They are sentences from the linked README, or they are marked unchecked when that README disagrees with itself.
- This repository's CI badge does not mean `eval-sandbox`, `eval-gate`, or `rubric-support-qa` passed here.
- `portfolio-mcp/data/repos.json` holds 107 records and does not include `eval-sandbox`, `eval-gate`, `rubric-support-qa`, or `trace-replay`. The MCP overview is that snapshot. It is not a live census of the GitHub account, and the paper figures in `papers.json` were not re-checked against arXiv or Zenodo on 2026-11-09.
- `node verify_chain.mjs` printing `VERIFY_PASS` means those JSON files match `audit-chain.json`. It does not mean the scores were recomputed from experiments.
- Missing bubblewrap or a writable cgroup v2 subtree makes `eval-sandbox` refuse. A refusal is the result that repository documents. It is not a PASS.

## What I don't claim

No peer-reviewed acceptance. No external users yet. No live demo. `https://pypi.org/pypi/eval-sandbox/json`, `https://pypi.org/pypi/eval-gate/json`, and `https://pypi.org/pypi/rubric-support-qa/json` all returned 404 on 2026-11-09. `rubric-support-qa` has no model run and no inter-annotator κ yet — its README says so instead of quoting a number. `mm-epc`'s arXiv:2606.16682 is a preprint, and its AAAI 2027 student abstract is a submission, not an acceptance. The ICLR 2027 text in `morphagent-textbook` (`research/iclr-2027-submission`) is marked `status: draft` in that file, and the Zenodo DOI there is a deposit, not a conference acceptance.

The longer line — preprints quoted from `agent-proxy-audit`, and the portfolio MCP snapshot — is in [AGENT_EVAL.md](AGENT_EVAL.md) and [portfolio-mcp/README.md](portfolio-mcp/README.md).

## Re-check the pins

From this clone, with no network:

```bash
python3 scripts/check_claim_pins.py
cd portfolio-mcp && node verify_chain.mjs
```

`scripts/check_claim_pins.py` only checks that this page still contains the pinned phrases and does not contain the withdrawn ones. It does not fetch the linked repositories. To re-verify a number, open the linked README and compare the sentence. If it moved, change the quote and the pin together, or mark the count unchecked.
