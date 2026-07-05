# Projects

Engineering projects organized by category. Each project explains what it does, what technology it uses, and why it matters.

---

## Research Tools

### Loop Engineering v5.3 -- Paper Quality Audit System

**What it does:** A Python tool that automatically checks your paper for problems before submission. Feed it your LaTeX files, it scans 91 rules, and tells you what needs to be fixed.

**Why I built it:** Every time I submitted to TMLR, I had to manually check formatting, citations, statistics, and writing quality. It was tedious and I kept missing things. So I extracted all the issues from 3 papers and 11 review rounds into a rulebook and automated the checking.

**What it checks:**

- Format: TMLR compliance, anonymization, figure quality, consistency between arXiv and TMLR versions
- Citations: ghost references (cited but missing from bibliography), accuracy, Semantic Scholar verification, self-citation rate
- Statistics: confidence interval coverage, effect size reporting, multiple comparison correction, power analysis
- Consistency: numerical cross-validation, symbol definitions, bibliography format
- Methodology: small sample size, selective reporting, cherry-picking detection
- LaTeX: compilation errors, citation matching, label consistency
- Semantics: "first" claim verification, novelty search

**Additional capability:** Compares your paper against 5 published TMLR papers. For example, the typical TMLR paper uses 4 datasets and 3 models, reports CIs in 0% of papers, and reports effect sizes in 0% of papers. My papers exceed these baselines on every metric.

GitHub: [aidless/loop-engineering](https://github.com/aidless/loop-engineering)

---

### Multi-Agent Code Review System

**What it does:** An AI-powered tool that automatically reviews GitHub Pull Requests. Submit a PR URL, 5 AI agents collaborate to analyze code quality and post a review report as a PR comment.

**What each agent does:**

1. **Fetcher** -- Pulls the PR diff from GitHub API
2. **Analyzer** -- Analyzes each file: static analysis (AST syntax tree checks) + LLM reasoning (DeepSeek understands code logic)
3. **Synthesizer** -- Combines all issues into a Markdown review report, organized into "Must Fix," "Should Fix," "Minor Issues," and "Positive Aspects"
4. **Reflector** -- Uses another LLM to score the report (1-10) on coverage, depth, actionability, and clarity. If score is below 7, sends it back to Analyzer for re-analysis. Retries up to 3 times
5. **Notifier** -- Posts the final report to the GitHub PR comment section

**Why 5 agents instead of a single LLM call:** Each agent does one thing, making failures easier to debug. Once Fetcher pulls data, Analyzer crashing doesn't require re-fetching. Reflector can keep rejecting until quality is acceptable.

**Tech stack:** LangGraph (workflow orchestration) + DeepSeek API (LLM calls) + Streamlit (web interface)

GitHub: [aidless/code-review-agent](https://github.com/aidless/code-review-agent)

---

### Agentic Paper Review System

**What it does:** A general-purpose paper review framework. Input a paper (PDF or Markdown), multiple AI agents evaluate it against custom criteria and produce structured review reports. Supports cross-model cross-validation -- two different LLMs review the same paper independently, then their disagreements are highlighted.

**Agent team:**

1. **Specialist** -- Analyzes the paper criterion by criterion
2. **Editor** -- Synthesizes Specialist findings into a final review
3. **Judge** -- Resolves conflicts between reviews from different models
4. **Librarian** -- Searches academic databases for related papers
5. **Fact-Checker** -- Verifies suspicious claims like "first study"

**Practical output:** Generated 12+ structured review reports for my own papers, helping identify and fix issues before formal submission.

GitHub: [aidless/agentic-paper-review](https://github.com/aidless/agentic-paper-review)

---

### Research Writing Skill

**What it does:** A Claude/Cursor plugin that turns paper writing from a one-shot chat into a trackable, resumable, reusable engineering workflow.

**Core capabilities:**

- Brainstorming: 7 rounds of questions to confirm paper type, discipline, topic, background, methods, and chapter structure
- Stage-gated execution: topic progression, section drafting, figure generation, pre-submission review
- De-AI writing: does not equate polishing with compressing; preserves research objects, data specifications, method conditions, and conclusion boundaries
- LaTeX templates: supports ACM, IEEE, Elsevier, Springer and other venue templates
- Discipline routing: separate writing modules for engineering, social science, medical, and legal papers

GitHub: [aidless/research-writing-skill](https://github.com/aidless/research-writing-skill)

---

## Web Applications

### Taixuan Ge (Wanxiang) -- AI Fortune-Telling Platform (Current Main Project)

**What it does:** A WeChat Mini Program + Node.js backend + Python microservice full-stack fortune-telling platform. Users enter their birth date, the system automatically generates Bazi, Ziwei Doushu, and Vedic Jyotish charts, then AI interprets them using seven divination systems.

**Architecture:**

```
WeChat Mini Program (7 pages)
    |
Express.js backend (Node.js v2.1, 664 lines main file)
    |-- 15 business engine modules
    |-- SQLite user/payment database
    |
Python microservices (ports 5001/5002)
    |-- Vedic astrology engine (PyJHora, 34KB)
    |-- Qimen Dunjia microservice
```

**15 engine modules:**

- AI interpretation engine: DeepSeek API, multi-turn dialogue, three-section output (astrological basis, interpretation analysis, actionable advice)
- Bazi chart engine: four pillars calculation, ten gods analysis, major luck periods, Ziwei Doushu chart
- Vedic astrology engine: 34KB Python core, Shadbala (9 strength types, 9 upstream bugs fixed), Dasha period system, Ashtakavarga, divisional charts
- Tarot engine: spread drawing, card meaning database
- Liu Yao engine: time-based hexagram generation, line change analysis
- Qimen Dunjia: time chart generation (Python microservice)
- Scenario reading engine: career, love, timing, general scenarios
- User system: registration, login, SMS verification code
- Quota engine: Free (3/day), Trial (10), Pro (unlimited)
- Payment engine: monthly 29 yuan, yearly 299 yuan, four-state machine
- Rendering engine: chart and hexagram frontend rendering

**Mini Program pages:** Home (hot question recommendations), Input (birth date + scenario), Result (AI interpretation), History, Profile, Functions, WebView

**Security:** CORS whitelist, rate limiting (10 requests/minute/IP), JWT authentication, CSP, XSS/CSRF protection

---

### AI Life Planner

**What it does:** A personal growth management platform. Daily journaling, exam score analysis, Gaokao college application guidance, job search tracking, graduate school planning. AI generates daily/weekly/monthly plans based on user history.

**Tech stack:** FastAPI + Vue.js + Anthropic Claude API

---

## Course and Graduation Projects

### Port Vessel Management System

Spring Boot + MyBatis + MySQL standard MVC architecture. Features: vessel departure/arrival registration, route queries, role-based access control.

### Port Container Management System

Spring Boot + Vue.js full-stack. Container information management, scheduling, queries. Includes complete database design documentation.

### Task Management System

Spring Boot task management. Standard CRUD operations, user authentication, task assignment.

---

## Calculation Engines

### Vedic Astrology Engine

34KB Python core code using PyJHora + pysweph (Swiss Ephemeris) for astronomical calculations.

Implements: Shadbala strength assessment (9 types, 9 upstream bugs fixed), Dasha period system (Vimshottari / Chara Dasha), Ashtakavarga point system, divisional charts (D-9 through D-60), planetary transit analysis.

### CCF Conference Deadline Tracker

Written in Rust. Automatically scrapes deadline dates for CCF-recommended computer science conferences. Supports filtering by tier, research area, and deadline proximity.

---

## GitHub Repositories

| Repository | Description |
|------------|-------------|
| [aidless/loop-engineering](https://github.com/aidless/loop-engineering) | Paper quality audit system |
| [aidless/code-review-agent](https://github.com/aidless/code-review-agent) | Multi-agent code review |
| [aidless/agentic-paper-review](https://github.com/aidless/agentic-paper-review) | Multi-agent paper review |
| [aidless/research-writing-skill](https://github.com/aidless/research-writing-skill) | AI writing system |
| [aidless/aidless](https://github.com/aidless/aidless) | Profile and research site |
