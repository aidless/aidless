# Loop Engineering: Building a Paper Quality Audit System

I built a tool that checks your论文 for problems before reviewers do. 91 rules, 15 automated checks, 15 Python modules.

## Why

Every time I submitted a paper to TMLR, I had to manually check formatting, citations, statistics, and writing quality. It was tedious and I kept missing things. So I extracted all the issues from 3 papers and 11 review rounds into a rulebook, and automated the checking.

## What It Does

The tool does three things:

1. **Pre-submission check** -- scans your paper for hard errors (missing citations, wrong statistical methods, formatting issues)
2. **Quality assessment** -- scores your paper and compares it against published TMLR papers
3. **Cross-paper tracking** -- if you're submitting multiple papers, it finds issues that appear in one paper but might exist in others

## The Rulebook

91 rules extracted from real review rounds, organized into 4 tiers:

- **Tier 1 (blocking)**: Must fix. Ghost references, missing controls, contradictions.
- **Tier 2 (quality)**: Important improvements. Small N, missing CIs, cherry-picking.
- **Tier 3 (polish)**: Minor refinements. Terminology, figure labels.
- **Defense**: Prepare for hostile reviewer attacks.

## TMLR Baseline Comparison

The tool compares your paper against 5 published TMLR papers:

| Metric | TMLR Median | Typical Result |
|--------|-------------|----------------|
| Datasets | 4 | 8 |
| Models | 3 | 5 |
| Seeds specified | 0% | 100% |
| CI reported | 0% | 100% |
| Effect sizes | 0% | 100% |

## Results

I used this tool on my last 6 TMLR submissions. It caught 23 issues that I would have missed, including 4 ghost references, 2 missing confidence intervals, and 1 statistical test inconsistency.

## Code

The entire system is open source: [github.com/aidless/loop-engineering](https://github.com/aidless/loop-engineering)
