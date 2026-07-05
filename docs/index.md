# Liu Zewen -- Research and Projects

I study what happens when multiple AI language models communicate with each other. When you put several LLMs in a room and let them talk, their outputs change in predictable but surprising ways. My research measures exactly how and why this happens.

---

## The Core Question

When AI agents exchange information, do they reach consensus, or do they diverge? The answer is both -- and the mechanisms matter for anyone building multi-agent systems.

### Finding 1: Communication Has Two Faces

When LLM agents communicate, two things happen at the same time. First, their strategies converge toward consensus -- they start giving similar answers. Second, calibration errors spread between agents -- if one agent is poorly calibrated, that poor calibration propagates to others through communication.

We measured this with a metric called CAF (Coupling Amplification Factor). In controlled experiments with GPT-4o using 30 agents per condition and about 9,900 API calls, we found that text communication causes agents to become about 20% more similar (CAF = 0.803, with a 95% confidence interval of [0.740, 0.873]).

An important detail: the direction of this effect depends on group size. With 5 agents, communication causes them to become more similar. With 3 agents, it may cause them to become more different. This means you cannot make a single statement about "what communication does" -- it depends on the system parameters.

### Finding 2: Calibration Is Not a Silver Bullet

Many practitioners assume that applying probability calibration (like Platt scaling or temperature scaling) will fix evaluation noise in multi-agent systems. We tested this under 60 different experimental conditions and found that calibration helps in some cases, does nothing in others, and actually makes things worse in certain models.

The effect is highly dependent on which model you use, what data you feed it, and what protocol you follow. This means you cannot assume calibration will improve your system. You need to test it empirically for your specific setup before relying on it.

### Finding 3: Evaluation Has an Impossibility Triangle

We conjecture that three properties of LLM evaluation -- bias (how far the evaluator deviates from ground truth), reliability (how consistent the evaluator is), and coupling (how much the evaluator is influenced by the agent being evaluated) -- cannot all be optimized simultaneously.

Improving one necessarily degrades at least one of the other two. This is analogous to the CAP theorem in distributed systems or the bias-variance tradeoff in machine learning. You have to choose which two properties matter most for your application.

We tested this across 11 different evaluator-agent conditions and found consistent tradeoff patterns that support the conjecture.

---

## Scale of the Work

- 10 papers submitted to TMLR (Transactions on Machine Learning Research), currently under review
- 10 papers published on arXiv
- 100,500+ LLM API calls across GPT-4o, DeepSeek V4, Claude 4.6, GLM
- All experiments use proper statistics: bootstrap confidence intervals, Wilcoxon tests with Holm-Bonferroni correction, mixed-effects models
- Built a custom paper quality assurance system with 91 automated rules

---

## Navigation

- [Research Overview](research/overview.md) -- how all 27 papers are classified by research line, method, and maturity
- [Paper List](research/papers.md) -- complete list of TMLR submissions and arXiv publications with links
- [Projects](research/projects.md) -- engineering projects including paper audit tools and code review agents
- [Blog](blog/loop-engineering.md) -- longer posts explaining specific projects

---

## Contact

- Email: 17353895263@163.com
- GitHub: [github.com/aidless](https://github.com/aidless)
- ORCID: [0009-0003-2981-9888](https://orcid.org/0009-0003-2981-9888)
