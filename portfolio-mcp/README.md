# aidless-portfolio-mcp

An MCP (Model Context Protocol) server over the same audit data behind my portfolio:
**107 GitHub repos, 51 preprints (10 arXiv + 36 Zenodo + in-prep/rejected), 8 Kaggle entries.**
Any MCP client — Claude Desktop, Cursor, an agent you wrote — can query it directly.
The portfolio is not only a page for humans; it is a structured data source for agents.

## Tools

| Tool | What it returns |
|---|---|
| `portfolio_overview` | Counts, 5-factor aggregates, median/max value, language mix |
| `search_repos` | Query by free text, topic tag, or tier (F/S/B/X); value score + 5-factor breakdown |
| `get_repo` | One repo: 5-factor scores, proof trace (per-dimension formula steps), boundary, usage snippet |
| `search_papers` | 51 preprints, each with `proves` / `doesNotProve` |
| `recompute_value` | Recompute the weighted value score from raw dimensions — the formula is public |
| `skill_to_evidence` | Skill → the repos that are the verifiable evidence for it |
| `verify_integrity` | SHA-256 hash-chain root over every audit record |
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
      "args": ["/absolute/path/to/portfolio-mcp/server.mjs"]
    }
  }
}
```

## Tamper-evident audit data

`data/audit-chain.json` is a SHA-256 hash chain over every record (sorted by slug,
canonical JSON, each hash folds in the previous one). Changing a single field anywhere
breaks every downstream hash and the combined root.

```
root = 6563685496e72931ca9c3b5a1ec99a2379b5abda6ed87f1da758253f3526cb2b
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

Collected with `gh api` from the public GitHub account (`@aidless`), scored with the
same 5-factor formula used by the mini-program and the audit report
(evidence 30 / boundary 20 / entry 20 / originality 20 / maintenance 10).
Every score can be recomputed from the raw dimension values; `recompute_value` does
exactly that, and `get_repo` returns the per-dimension `steps` used in the audit.

Preprints are **not peer-reviewed**. That is stated in each paper's `doesNotProve` field,
not buried in a footnote.
