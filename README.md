# Zewen Liu · 刘泽文

**AI-Native Engineer** — I don't just use AI. I build AI agent systems that run in production, research how they fail, and make them safer.

> 📧 17353895263@163.com · 📍 Shanghai · 🔗 [arXiv](https://arxiv.org/search/?searchtype=author&query=Liu%2C+Zewen) · [ORCID](https://orcid.org/0009-0003-2981-9888)
> 
> **Available immediately** — looking for AI Agent Engineer / LLM Application Developer roles.

---

## Why Me

```text
Most graduates:  "I've used ChatGPT to help with assignments"
Me:              "I built an AI agent system that runs 24/7 with 0 incidents,
                  published 10 arXiv papers on multi-agent LLM safety,
                  and stress-tested LLM systems against 12 attack vectors."
```

I'm an AI-native engineer: I embed AI into every step of my workflow — research, design, coding, debugging, documentation — and I've shipped production systems, not just demos.

---

## 🔬 Research: 10 arXiv Papers (First Author)

My research asks: **when LLM agents communicate, what happens to their outputs?**

I discovered and formalized communication-induced coupling in multi-agent LLM systems — including strategy consensus, calibration contagion, and the evaluation "impossibility triangle."

| Paper | arXiv | Key Finding |
|-------|-------|-------------|
| **BOUNDARY_SYNC** | [2607.01600](https://arxiv.org/abs/2607.01600) | Communication causes assimilation (CAF=0.80, Cohen's d=1.30, p<0.001) |
| **EPC Protocol** | [2607.00297](https://arxiv.org/abs/2607.00297) | Standardized protocol for measuring evaluator preference coupling |
| **Contagion Tensor** | [2606.28839](https://arxiv.org/abs/2606.28839) | Tensor framework for output-distribution coupling |
| **Hidden Cost of Resampling** | [2606.29720](https://arxiv.org/abs/2606.29720) | Resampling for balance breaks probability calibration |
| **Contagion Networks** | [2606.20493](https://arxiv.org/abs/2606.20493) | Evaluator bias propagation paths in multi-agent networks |
| **Memory Contagion** | [2606.23195](https://arxiv.org/abs/2606.23195) | Agent memory propagates evaluation bias across time |
| **Multimodal EPC** | [2606.16682](https://arxiv.org/abs/2606.16682) | Cross-modal preference collapse (text + image) |
| **Diagnostic Framework** | [2606.29719](https://arxiv.org/abs/2606.29719) | Multi-evaluator audit framework |
| **Calibrating the Evaluator** | [2606.31371](https://arxiv.org/abs/2606.31371) | Calibration mitigates coupling (γ↓20-49%), but conditionally |
| **Mapping the Frontier** | [2607.00304](https://arxiv.org/abs/2607.00304) | Empirical survey across 11 evaluator-agent conditions |

**10 additional papers under review at TMLR (#47–56).** 500M+ API calls across GPT-4o, DeepSeek, Claude, GLM, Qwen.

---

## 🏭 Production Systems

### Agent Red Team Platform
> *Reproducible security evaluation for multi-agent LLM systems*

- **12 adversarial attack vectors** × **5 defense layers** — red-vs-blue combat simulation
- **86 tests passing**, CI/CD with multi-Python matrix (3.10/3.11/3.12), GitHub Actions
- Streamlit dashboard with real-time visualization + SQLite trace persistence
- Pluggable embedders, 7-aggregator pipeline, calibration metrics (ECE/JSD/entropy/γ)
- Companion to TMLR survey on Multi-Agent LLM Reliability

→ [GitHub](https://github.com/aidless/agent-redteam) · Apache 2.0

### Production AI Agent System
> *Autonomous agent framework, deployed 24/7 on cloud*

- **AutoPilot Orchestrator**: automatic task decomposition + multi-step execution chains
- **Agent Matrix**: multi-model routing (DeepSeek/Qwen/Claude), cost-optimized
- **Security Sandbox**: container isolation, blocked `os`/`subprocess`/`socket`, 12 vulns fixed
- **161 tests**, 0 failures · **1000/1000** stress test (P95=150ms) · **14/14** pentest passed
- **24/7 production**, 100K+ task requests, **0 incidents**

→ [GitHub](https://github.com/aidless/ai-agent-playground) · [Blog: From Student to Production](https://github.com/aidless/ai-agent-playground/blob/main/blog/from-student-to-production.md)

### Enterprise RAG
> *Hybrid retrieval + evaluation harness for enterprise knowledge bases*

→ [GitHub](https://github.com/aidless/enterprise-rag)

---

## 🛠 Tech Stack

| Category | Technologies |
|----------|-------------|
| **AI/LLM** | LangChain/LangGraph, PyTorch, scikit-learn, LLM APIs (GPT-4o, DeepSeek, Claude, GLM, Qwen) |
| **Agent Tech** | RAG (ChromaDB), tool calling, multi-agent orchestration, self-evolution loops |
| **Backend** | Python (AsyncIO), FastAPI, Flask, Spring Boot, Express.js |
| **Frontend** | Vue.js, React, Streamlit, WeChat Mini Programs |
| **Security** | OWASP Top 10 for LLM, sandbox isolation, automated pentest scripts |
| **DevOps** | Docker, Nginx, CI/CD (GitHub Actions), Linux, SQLite/MySQL |
| **Research** | Statistical analysis (SciPy/NumPy), LaTeX, experiment design, reproducibility |

---

## 🤖 AI-Native Workflow

I don't just "use AI" — I've built AI agent systems to manage my entire research pipeline:

- **DeepSeek Harness research-collab agent**: 36+ sessions, automating literature review → experiment design → statistical analysis → paper writing → adversarial review → TMLR submission compliance
- **Self-evolution protocol**: 40+ generations (G000–G040) of agent improvement with A/B statistical gating
- **Paper-writing-agent**: ~48 scripts, CI 11/11, claim-ledger-driven evidence-first writing

This is how I work every day: AI amplifies my output at every step, but I make the decisions and take responsibility.

---

## 📌 Pinned Repos

<!-- Pin these 6 repos on your GitHub profile (Profile → Customize your pins) -->
1. `agent-redteam` — Multi-agent LLM security evaluation platform
2. `ai-agent-playground` — Production autonomous agent system
3. `enterprise-rag` — Enterprise RAG with hybrid retrieval
4. `mm-epc` — Research code for 10 arXiv papers
5. `llm-lab` — Local-first LLM evaluation framework
6. `reviewer-sim` — Agentic paper review with 6 specialized agents

---

## GitHub Stats

![GitHub Stats](https://github-readme-stats.vercel.app/api?username=aidless&show_icons=true&theme=vue-dark&count_private=true)
![Top Languages](https://github-readme-stats.vercel.app/api/top-langs/?username=aidless&layout=compact&theme=vue-dark)

---

*Market rewards shipping, not learning. — Zewen Liu*
