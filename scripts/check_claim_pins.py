#!/usr/bin/env python3
"""Fail if a pinned quote was dropped or a withdrawn phrase came back.

This does not fetch GitHub, PyPI, or arXiv, and it does not run the linked
test suites. It only keeps this repository from quietly reprinting a number
the 2026-11-09 pass withdrew, or from deleting the attribution around a
number it kept.
"""

from __future__ import annotations

import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PIN = ROOT / "claims" / "pinned-2026-11-09.json"


def main() -> int:
    pin = json.loads(PIN.read_text(encoding="utf-8"))
    failed = False
    for name, phrases in pin["require"].items():
        text = (ROOT / name).read_text(encoding="utf-8")
        for phrase in phrases:
            if phrase not in text:
                print(f"MISSING in {name}: {phrase}")
                failed = True
    for name, phrases in pin["forbid"].items():
        text = (ROOT / name).read_text(encoding="utf-8")
        for phrase in phrases:
            if phrase in text:
                print(f"FORBIDDEN in {name}: {phrase}")
                failed = True
    if failed:
        print("CLAIM_PINS_FAIL")
        return 1
    print(f"CLAIM_PINS_PASS checked={pin['checked']} file={PIN.name}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
