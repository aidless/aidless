# Liu Zewen (刘泽文)

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**AI Application Developer** — building production-grade AI Agent systems from scratch.

> 10万+ task requests handled in real production systems. 161 tests, 0 failures. 14/14 penetration tests passed. Every number below is backed by evidence files committed in the repos.

---

## What I Build

I build **autonomous AI agent systems that don't just call an API** — they improve themselves, stay secure, and run reliably in production.

### 🔧 AI Agent Playground — Production Autonomous Agent System

A complete autonomous agent framework with 9 self-improving engines. Built from scratch over one semester.

**Key numbers:**
- 161 tests, 0 failures
- 14/14 penetration tests passed (OWASP LLM Top 10)
- 1000/1000 stress test requests, P95=150ms
- 9 autonomous engines: self-evolution, debate, bootstrap, meta-agent
- Deployment: ran 24/7 on Alibaba Cloud ECS — demo instance currently offline; benchmark & pentest reports are committed in the repo

**What it does:** The system doesn't just answer questions — it detects its own capability gaps, generates missing tools at runtime, evolves tool implementations, and rolls back on regression. All 9 engines have real LLM-verified code.

→ [GitHub](https://github.com/aidless/ai-agent-playground) &nbsp;|&nbsp; [Benchmark & pentest evidence (in repo)](https://github.com/aidless/ai-agent-playground) &nbsp;|&nbsp; [Blog (CN)](https://github.com/aidless/ai-agent-playground/blob/main/blog/from-student-to-production.md)

---

### 📊 MM-EPC — Multi-Modal Evaluator Preference Collapse (paper in submission)

Research on how evaluator choice distorts self-evolving multi-modal agents. Key findings from the final paper:

- **Cross-model evaluators drive strong preference collapse**: GPT-4o-as-judge yields MPCI = 1.449 — about 3.2× the self-eval condition and 2.0× the random baseline.
- **Self-eval is near-immune** (γ̄ ≈ 0.033) — but that immunity is fragile: swapping the judge model within the same family flips it by ~36×.
- **Directional asymmetry (text→vision vs vision→text) is not significant** in the final analysis — an earlier draft reported p = 0.008; the claim was revised during review preparation, and the reversal itself became part of the methodology (see the N-Sensitivity diagnostic work).

**Why it matters:** if you're building self-improving agent loops, the evaluator — not the task design — may dominate your policy drift.

**Paper:** in submission &nbsp;|&nbsp; [GitHub](https://github.com/aidless/mm-epc)

---

## Skills

| Category | Technologies |
|----------|-------------|
| **AI/LLM** | DeepSeek V4, Qwen2.5, Claude (API), OpenAI-compatible APIs |
| **Frameworks** | FastAPI, LangChain, Streamlit, AsyncIO |
| **Agent Tech** | RAG (ChromaDB + all-MiniLM), Tool calling, Multi-agent orchestration |
| **Research Methods** | McNemar / cluster bootstrap / BH–Holm correction, preregistration, SHA-256 evidence manifests, append-only evolution ledgers |
| **Security** | OWASP LLM Top 10 audit, penetration testing, sandbox isolation |
| **Deployment** | Docker, Alibaba Cloud ECS, systemd, Prometheus |
| **Languages** | Python (primary), Java / Spring Boot, SQL |

---

## Featured Projects

| Project | What It Does | Stack |
|---------|--------------|-------|
| [gsm8k-self-evolve](https://github.com/aidless/gsm8k-self-evolve) | Two-round eval-gated policy evolution; blind-set 0.780→0.925, McNemar p=1.08e-06; end-to-end recomputable evidence chain | Python, Ollama, Ed25519 signing |
| [ai-agent-playground](https://github.com/aidless/ai-agent-playground) | 9-engine autonomous agent, self-evolving, committed benchmark & pentest evidence | Python, FastAPI, DeepSeek V4, ChromaDB |
| [mm-epc](https://github.com/aidless/mm-epc) | Multi-modal evaluator preference collapse; full experiment JSONs + preregistered protocol | Python, LaTeX, GPT-4o / Qwen / DeepSeek |
| [morphagent-textbook](https://github.com/aidless/morphagent-textbook) | Open 31-chapter Chinese textbook on self-modifying agents (Zenodo DOI) | Markdown, LaTeX, SVG |

---

## Currently

- **Looking for:** AI Application Developer / AI Agent Engineer roles
- **Location:** China (open to relocate)
- **Available:** Immediately

---

## Blog & Talks

- [从学生项目到生产级 AI Agent](https://github.com/aidless/ai-agent-playground/blob/main/blog/from-student-to-production.md) — how I built a production AI agent system from scratch
- [English version](https://github.com/aidless/ai-agent-playground/blob/main/blog/from-student-to-production-en.md)

---

## GitHub Stats

![Liu Zewen's GitHub stats](https://github-readme-stats.vercel.app/api?username=aidless&show_icons=true&theme=vue-dark)
![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=aidless&layout=compact&theme=vue-dark)

---

*Market rewards shipping, not learning. — Liu Zewen*
