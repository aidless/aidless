# Paper List

10 papers submitted to TMLR (under review), 10 papers published on arXiv. Last updated July 2026.

---

## TMLR Submissions (10 papers, under review)

### #47 -- The Contagion Tensor

A mathematical framework using tensors to measure how output distributions couple in multi-agent LLM systems. Formalizes the spread of calibration errors as a tensor operation.

arXiv: [2606.28839](https://arxiv.org/abs/2606.28839)

### #48 -- BOUNDARY_SYNC: Measuring Communication-Induced Representational Coupling

Introduces the CAF (Coupling Amplification Factor) metric. In controlled experiments with GPT-4o (N=30 per condition, approximately 9,900 API calls), measures both strategy consensus and calibration contagion simultaneously. Key result: text communication causes significant homogenization (CAF = 0.803, 95% CI [0.740, 0.873], Cohen's d = 1.30, p < 0.001). Group size modulates the direction of coupling.

arXiv: [2607.01600](https://arxiv.org/abs/2607.01600)

### #49 -- A Diagnostic Framework and Multi-Evaluator Audit

A systematic diagnostic framework for identifying evaluator preference dynamics in self-adapting LLM agents. Provides standardized detection methods for EPC problems across multiple evaluators.

arXiv: [2606.29719](https://arxiv.org/abs/2606.29719)

### #50 -- The Hidden Cost of Resampling

Discovers that data resampling techniques (oversampling/undersampling for class imbalance) degrade probability calibration in tree models. Warns about the applicability limits of calibration methods. Note: withdrawn from TMLR due to overlap with #52.

arXiv: [2606.29720](https://arxiv.org/abs/2606.29720)

### #51 -- EPC: A Standardized Protocol

A standardized measurement protocol for evaluator preference coupling in LLM agent systems. Includes a conformance test script (conformance_test.py) for verifying reproducible measurements across different models and setups.

arXiv: [2607.00297](https://arxiv.org/abs/2607.00297)

### #52 -- N-Sensitive Calibration of Tree Ensembles on Frozen LLM Embeddings

Experiments across 8 datasets and 5 models showing that sample size N affects calibration conclusions -- more data can change whether calibration appears to help or hurt. Uses mixed-effects models and Wilcoxon tests with Holm-Bonferroni correction. arXiv submission in progress.

### #53 -- Communication Degrades Calibration, Self-Evaluation Immunity Is Model-Dependent

Systematic study of calibration effects across 60 experimental conditions. Finds that calibration is highly condition-dependent: effective in some models, ineffective in others, and sometimes increases noise. arXiv submission in progress.

### #54 -- Not Contagion, Just Time: Temporal Calibration Fatigue

100,500 API calls across GPT-4o, DeepSeek V4 Pro, and DeepSeek V4 Flash. 8-condition factorial design. Distinguishes between "contagion" (cross-agent spread) and "temporal fatigue" (time-based degradation) mechanisms. Finds that calibration degradation is primarily caused by time fatigue, not cross-agent contagion. arXiv submission in progress.

### #55 -- Beyond Point Estimates: Temporal Dynamics and Protocol Interventions

Tracks the temporal dynamics of evaluator preference coupling, measuring convergence speed, oscillation patterns, and intervention windows. Reveals the time-series characteristics of coupling. arXiv submission in progress.

### #56 -- Memory Contagion: Cross-Temporal Propagation of Evaluator Bias via Agent Memory

Formalizes the concept of "memory contagion" and establishes the Gamma_temporal metric. Tests across three model generations (DeepSeek V4-Chat, V4-Pro, Claude 4.6), two bias types, and a four-phase experimental pipeline. Key finding: length bias propagates strongly in V4-Chat (Gamma_A = 13.18) but completely fails in V4-Pro and Claude 4.6 (Gamma_A = 0.00). Dose-response analysis shows that a 20% contamination rate is sufficient to detect contagion.

arXiv: [2606.23195](https://arxiv.org/abs/2606.23195)

---

## arXiv Published (10 papers)

| arXiv ID | Title | Also on TMLR |
|----------|-------|:---:|
| [2607.01600](https://arxiv.org/abs/2607.01600) | BOUNDARY_SYNC: Measuring Communication-Induced Representational Coupling in Multi-Agent LLM Systems | #48 |
| [2607.00304](https://arxiv.org/abs/2607.00304) | Mapping the Evaluation Frontier: An Empirical Survey of the Bias-Reliability Tradeoff Across Eleven Evaluator-Agent Conditions | -- |
| [2607.00297](https://arxiv.org/abs/2607.00297) | EPC: A Standardized Protocol for Measuring Evaluator Preference Dynamics in LLM Agent Systems | #51 |
| [2606.31371](https://arxiv.org/abs/2606.31371) | Calibrating the Evaluator: Does Probability Calibration Mitigate Preference Coupling in LLM Agent Feedback Loops? | -- |
| [2606.29720](https://arxiv.org/abs/2606.29720) | The Hidden Cost of Resampling: How Imbalance Correction Degrades Probability Calibration in Tree Ensembles | #50 |
| [2606.29719](https://arxiv.org/abs/2606.29719) | A Diagnostic Framework and Multi-Evaluator Audit of Evaluator-Driven Preference Dynamics in Self-Adapting LLM Agents | #49 |
| [2606.28839](https://arxiv.org/abs/2606.28839) | The Contagion Tensor: A Framework for Measuring Output-Distribution Coupling in Multi-Agent LLM Systems | #47 |
| [2606.20493](https://arxiv.org/abs/2606.20493) | Contagion Networks: Evaluator Preference Propagation in Multi-Agent LLM Systems | -- |
| [2606.23195](https://arxiv.org/abs/2606.23195) | Memory Contagion: Cross-Temporal Propagation of Evaluator Bias via Agent Memory | #56 |
| [2606.16682](https://arxiv.org/abs/2606.16682) | Multimodal Evaluator Preference Collapse: Cross-Modal Coupling in Self-Evolving Agents | -- |

---

## Summary

| Metric | Count |
|--------|:---:|
| TMLR submissions (under review) | 10 |
| arXiv published | 10 |
| arXiv in progress | 6 |
| Total distinct paper concepts | approximately 27 |
| Conference submissions (ACL, ICLR, EMNLP, AAAI) | 5 |
