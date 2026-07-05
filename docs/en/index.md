# Liu Zewen -- Research and Projects

I study multi-agent large language model systems. In plain terms: when multiple AI models communicate with each other, their outputs change in specific, measurable ways.

This is not an abstract problem. When you build a multi-agent system using GPT-4o and DeepSeek, if Agent A reads Agent B's response, Agent A's next response will become more similar to Agent B's. This "contagion" effect influences all outputs in the system and is very hard to detect.

My work measures how strong this effect is, when it happens, and how to prevent it.

---

## Three Key Findings

### Finding 1: Communication Has Two Faces

Previous researchers studied whether "multiple AIs reach consensus" and whether "one AI's errors spread to another." But nobody had measured both effects simultaneously in the same experiment.

We measured both strategy consensus (agents' outputs becoming similar) and calibration contagion (evaluation errors spreading between agents) in a single experiment, using a metric we call CAF (Coupling Amplification Factor).

**Concrete numbers:** On GPT-4o, with 30 agents per group and approximately 9,900 API calls, text communication increased agent similarity by about 20% (CAF = 0.803, 95% confidence interval [0.740, 0.873]).

**Important detail:** The direction of the effect depends on group size. With 5 agents, communication makes them more similar. With 3 agents, communication may make them more different. So you cannot make a universal statement about "what communication does" -- it depends on system parameters.

### Finding 2: Probability Calibration Is Not a Silver Bullet

Many practitioners assume that applying probability calibration (like Platt Scaling or Temperature Scaling) will fix evaluation noise in multi-agent systems. We tested this under 60 different experimental conditions.

The result: calibration helps in some cases, does nothing in others, and actually makes things worse in certain models. The effect depends on which model you use, what data you feed it, and what protocol you follow.

This means you cannot assume calibration will improve your system. You need to test it empirically for your specific setup.

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

- [Research Overview](overview.md) -- classification of all 27 papers by research line, method type, and maturity
- [Paper List](papers.md) -- complete list of TMLR submissions and arXiv publications with detailed descriptions
- [Projects](projects.md) -- engineering projects including paper audit tools, code review agents, and astrology platform
- [Blog](../blog/loop-engineering.md) -- longer posts explaining specific projects and findings

---

## Contact

- Email: 17353895263@163.com
- GitHub: [github.com/aidless](https://github.com/aidless)
- ORCID: [0009-0003-2981-9888](https://orcid.org/0009-0003-2981-9888)
