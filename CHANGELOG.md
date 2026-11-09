# Changelog

All notable changes to this repository are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

- Profile README now states that this repository is an index, not a product.
  Quoted counts are dated to the linked READMEs as read on 2026-11-09, or
  marked unchecked where that README disagrees with itself (`arx`). Withdrawn
  figures are guarded by `scripts/check_claim_pins.py`.
- `tmaudit` is no longer described as a TMLR self-audit. PyPI `tmaudit` 0.5.1
  was re-checked on 2026-11-09; `llmtriage` and the three main-line names
  returned 404 the same day.
- Portfolio snapshot: arXiv records use `status: preprint`. The old
  "10 arXiv + 36 Zenodo" count is withdrawn. The hash chain was rebuilt.
  The snapshot still omits `eval-sandbox`, `eval-gate`, `rubric-support-qa`,
  and `trace-replay`.
- The old "latest releases" shelf is not restored. Those GitHub release tags
  were not re-checked on 2026-11-09, and the word "published" there was easy
  to misread as acceptance.
- Governance baseline: LICENSE, security policy, code of conduct, contributor and
  support guides, issue and pull-request templates, CODEOWNERS, dependabot, and
  `.editorconfig` added. No research content changed.
