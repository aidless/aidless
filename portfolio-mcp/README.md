# aidless-portfolio-mcp

An MCP (Model Context Protocol) server over a stored snapshot in `data/`.
It is not a live census of the GitHub account, and it is not the main line.

The files in this directory, counted on 2026-11-09, hold **107 repo records, 51 paper records (48 without `duplicateOf`), and 8 competition records**.
Of the 51 paper records, 10 have an arXiv id, 39 have a Zenodo id, and 2 have neither (`approval-gates-r5` rejected, `agent-effort-r1` not submitted).
An earlier "10 arXiv + 36 Zenodo" sentence does not match those files. It is withdrawn.

`data/repos.json` does not include `eval-sandbox`, `eval-gate`, `rubric-support-qa`, or `trace-replay`.
Those four are the profile's main line and are linked from the repository README. This server does not score them.

Paper bodies were not re-checked against arXiv or Zenodo on 2026-11-09. Treat every number inside `papers.json` as unchecked against the live record.
`status` for the ten arXiv records is `preprint`. That is not peer-reviewed acceptance.
`mm-epc` in this snapshot is an arXiv preprint plus an AAAI 2027 submission, not an acceptance.
`morphagent-textbook` is a GitHub/Zenodo textbook deposit. The ICLR 2027 file in that repo is a draft, not an acceptance.

Any MCP client — Claude Desktop, Cursor, an agent you wrote — can query the snapshot directly.

## Tools

| Tool | What it returns |
|---|---|
| `portfolio_overview` | Counts, 5-factor aggregates, median/max value, language mix |
| `search_repos` | Query by free text, topic tag, or tier (F/S/B/X); value score + 5-factor breakdown |
| `get_repo` | One repo: 5-factor scores, proof trace (per-dimension formula steps), boundary, usage snippet |
| `search_papers` | Paper records in `papers.json`, each with `proves` / `doesNotProve`. `preprint` is not acceptance |
| `recompute_value` | Recompute the weighted value score from raw dimensions — the formula is public |
| `skill_to_evidence` | Skill string → snapshot rows whose stored text matches. Not a new measurement |
| `verify_integrity` | SHA-256 hash-chain root over the snapshot. A match is not a re-run experiment |
| `search_competitions` | 8 Kaggle entries with snapshot metadata (score, rank, teams, date) |

## Run

```bash
npm install
node server.mjs            # speaks MCP over stdio
node verify_chain.mjs      # recomputes every chain, exits non-zero on tamper
```

Claude Desktop / Cursor config:

```json
{
  "mcpServers": {
    "aidless-portfolio": {
      "command": "node",
      "args": ["portfolio-mcp/server.mjs"]
    }
  }
}
```

Run that config with the working directory set to the clone root (`aidless/`, the directory that contains `portfolio-mcp/`). The argument is relative to that directory. There is no author-machine path.

## Tamper-evident audit data

`data/audit-chain.json` is a SHA-256 hash chain over every record (sorted by slug,
canonical JSON, each hash folds in the previous one). Changing a single field anywhere
breaks every downstream hash and the combined root.

```
root = 2073904c79d9fa299d41bedb02eedb61c58fee9e886ad9e5e129db935c49018a
```

Verify:

```bash
node verify_chain.mjs
```

Regenerate after updating the data (for example after a fresh `gh api` collection):

```bash
node build_chain.mjs
```

## Where the data comes from

The JSON was collected earlier with `gh api` from the public GitHub account (`@aidless`) and scored with a 5-factor formula (evidence 30 / boundary 20 / entry 20 / originality 20 / maintenance 10).
That collection was **not repeated on 2026-11-09**. `board.json` still carries the old aggregate fields (`stars`, commit totals, a timeline that stops at `11-02`). Those fields are the stored snapshot, not a new count.
On 2026-11-09 the `desc` text was edited only for `tmaudit`, `mm-epc`, `morphagent-textbook`, and `arx`. Every other `desc` is the older snapshot and was not re-read against that repository's README.

`recompute_value` recomputes the weighted score from the raw dimension values stored on a record. It does not re-read the linked repository.
`get_repo` returns the per-dimension `steps` stored in the snapshot.
`verify_chain.mjs` checks that the files still hash to `audit-chain.json`. A match means the files were not edited after the chain was built. It does not mean an experiment was re-run.

Preprints are **not peer-reviewed**. That is stated in each paper's `doesNotProve` field, and the ten arXiv records use `status: preprint`.
