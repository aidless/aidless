# Projects

Engineering projects organized by category. Each project includes what it does, what technology it uses, and why it matters.

---

## Research Tools

### Loop Engineering v5.3 -- Paper Quality Audit System

A Python tool that automatically checks your paper for problems before submission. I built this because manually checking formatting, citations, statistics, and writing quality for every TMLR submission was tedious and error-prone.

The tool contains 91 review rules extracted from 3 papers and 11 review rounds. It runs 15 automated checks across 7 categories: format compliance, citation accuracy, statistical methods, internal consistency, methodology, LaTeX compilation, and semantic claims.

It also compares your paper against 5 published TMLR papers to calibrate expectations. For example, the typical TMLR paper uses 4 datasets and 3 models, rarely reports confidence intervals or effect sizes, and does not specify random seeds. My papers exceed these baselines on every metric.

GitHub: [aidless/loop-engineering](https://github.com/aidless/loop-engineering)

### Multi-Agent Code Review System

An AI-powered code review tool for GitHub Pull Requests. When you submit a PR URL, 5 specialized AI agents collaborate to analyze the code and generate a review report.

The agents are: Fetcher (pulls PR data from GitHub API), Analyzer (static code analysis + LLM reasoning), Synthesizer (generates Markdown report), Reflector (scores report quality using LLM-as-Judge, retries if score is below 7), and Notifier (posts report to PR comment).

Built with LangGraph for workflow orchestration, DeepSeek API for LLM calls, and Streamlit for the web interface.

GitHub: [aidless/code-review-agent](https://github.com/aidless/code-review-agent)

### Agentic Paper Review System

A domain-agnostic multi-agent system for structured academic paper review. Unlike the code review tool above, this one is designed for reviewing research papers against custom criteria.

The system uses a team of AI agents: Specialist (criterion-by-criterion analysis), Editor (synthesizes findings into a final review), Judge (resolves conflicts between reviews from different AI models), Librarian (searches academic databases for related papers), and Fact-Checker (verifies suspicious claims).

It produces scored reviews with cross-model adjudication and literature grounding. I used this system to generate 12+ structured review reports for my own papers.

GitHub: [aidless/agentic-paper-review](https://github.com/aidless/agentic-paper-review)

### Research Writing Skill

An AI-assisted academic writing system implemented as a Claude/Cursor plugin. It provides structured workflows for different stages of paper writing: brainstorming, outline creation, section drafting, figure generation, LaTeX formatting, and pre-submission review.

The system includes LaTeX templates for multiple venues (ACM, IEEE, Elsevier, Springer), writing modules for different disciplines (engineering, social science, medical, legal), and hooks that integrate with AI coding assistants.

GitHub: [aidless/research-writing-skill](https://github://aidless/research-writing-skill)

---

## Web Applications

### Taixuan Ge (Wanxiang) -- AI Fortune-Telling Platform

A full-stack WeChat Mini Program that combines traditional Chinese and Vedic astrology with AI interpretation. Users enter their birth date, and the system generates readings based on Bazi, Ziwei Doushu, Vedic Jyotish, Tarot, Liu Yao, and Qimen Dunjia.

The backend is a Node.js Express server (version 2.1, 664 lines in the main file) with 15 engine modules: AI interpretation engine (DeepSeek API with three-section structured output), Bazi chart engine, Vedic astrology engine (34KB Python, fixes 9 upstream bugs in Shadbala calculation), Tarot engine, Liu Yao engine, Qimen Dunjia microservice, scenario-based reading engine, user system, quota engine, payment engine, and rendering engine.

The WeChat Mini Program has 7 pages: home (hot questions, scenario selection), input (birth date, time, gender), result (AI interpretation display), history (past readings), profile (subscription management), functions, and webview.

API endpoints include: POST /api/v2/reading (generate scenario-based reading), GET /api/v2/readings (history), POST /api/chat (AI Q&A), POST /api/chart (Bazi/Ziwei chart), POST /api/tarot (Tarot spread), POST /api/liuyao (Liu Yao divination).

Security: CORS whitelist, rate limiting (10 requests/minute/IP), JWT authentication, CSP headers, XSS/CSRF protection, framework fingerprint hiding.

### AI Life Planner

A personal growth management platform built with FastAPI + Vue.js + Anthropic Claude API. Features include daily journaling, exam score analysis, college application guidance (Gaokao), job search tracking, and graduate school planning. The AI generates daily/weekly/monthly plans based on user history.

---

## Course and Graduation Projects

### Port Vessel Management System

A Spring Boot web application for managing vessel departures and arrivals at a port. Standard MVC architecture (Controller, Service, DAO, Entity layers) with MySQL database. Includes vessel registration, route queries, and role-based access control.

### Port Container Management System

A full-stack application with Spring Boot backend and Vue.js frontend for container management at a port. Includes database design documentation and thesis chapter draft.

### Task Management System

A Spring Boot task management application with standard CRUD operations, user authentication, and task assignment features.

---

## Calculation Engines

### Vedic Astrology Engine

An independent implementation of Vedic Jyotish (Indian astrology) astronomical calculations. 34KB of Python core code using PyJHora and pysweph (Swiss Ephemeris).

Implements: Shadbala strength assessment (9 types of strength calculation, fixes 9 bugs in PyJHora upstream), Dasha period system (Vimshottari and Chara Dasha), Ashtakavarga point system, divisional charts (D-9 through D-60), and planetary transit analysis.

### CCF Conference Deadline Tracker

A Rust application that automatically scrapes deadline dates for CCF-recommended computer science conferences. Supports filtering by conference tier, research area, and deadline proximity.

---

## GitHub Repositories

| Repository | Description |
|------------|-------------|
| [aidless/loop-engineering](https://github.com/aidless/loop-engineering) | Paper quality audit system |
| [aidless/code-review-agent](https://github.com/aidless/code-review-agent) | Multi-agent code review |
| [aidless/agentic-paper-review](https://github.com/aidless/agentic-paper-review) | Multi-agent paper review |
| [aidless/research-writing-skill](https://github.com/aidless/research-writing-skill) | AI writing system |
| [aidless/aidless](https://github.com/aidless/aidless) | Profile and research site |
