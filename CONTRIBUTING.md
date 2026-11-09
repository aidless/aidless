# Contributing

Thanks for your interest in improving this repository.

## Getting set up

```bash
git clone https://github.com/aidless/aidless.git
cd aidless
```

There is no `requirements.txt` and no `Makefile`. This repository is a profile index.

## Verifying your change

```bash
python3 scripts/check_claim_pins.py
cd portfolio-mcp && node verify_chain.mjs
```

Those two commands are what CI runs for the claims and the snapshot hash, besides the Markdown link check. They do not execute the linked evaluation repositories.

## Pull requests

- One logical change per pull request.
- Explain what breaks or is missing without the change.
- State how you verified it, and paste the command output.
- Keep unrelated reformatting out of the diff.

## Security

Do not open a public issue for a security problem. Use the private channel described
in [SECURITY.md](SECURITY.md).

## Code of conduct

Participation is governed by [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).
