# Research Overview

27 papers classified by research line, method type, and maturity.

---

## By Research Line

### Line 1: Communication Effects -- What Does Communication Do to Agent Outputs?

| # | Paper | Core Question | arXiv | TMLR |
|:--:|------|------|:---:|:---:|
| P1 | BOUNDARY_SYNC | Does communication cause homogenization or diversification? How to measure it? | 2607.01600 | #48 |
| P2 | Two Faces of Communication (FLAGSHIP) | Can strategy consensus and calibration contagion be measured simultaneously? | in progress | #48 |
| P3 | Contagion Networks | What are the propagation paths and structures of preference spread in multi-agent networks? | 2606.20493 | -- |
| P4 | Memory Contagion | How do agents propagate evaluation bias across time through memory? | 2606.23195 | #56 |
| P5 | Strategy Collapse Dynamics (tmlr_p17) | How do evaluator preferences reshape agent strategy over time? | -- | -- |

Key finding: Communication causes homogenization (CAF<1), group size modulates direction, effect is stateless.

---

### Line 2: Calibration Effects -- What Does Probability Calibration Actually Do?

| # | Paper | Core Question | arXiv | TMLR |
|:--:|------|------|:---:|:---:|
| C1 | Calibration Effects | When does calibration help? When does it hurt? | in progress | #53 |
| C2 | Calibrating the Evaluator (tmlr_p9) | Can calibration mitigate preference coupling? | 2606.31371 | -- |
| C3 | Self-Evaluation Immunity (tmlr_p10) | Is self-evaluation immunity universal? | -- | -- |
| C4 | Calibration Worsens Noise (tmlr_p15) | Does calibration actually increase evaluation noise? | -- | -- |
| C5 | Calibration Contagion | How does calibration error propagate in multi-agent systems? | in progress | #54 |

Key finding: Calibration is not a silver bullet -- effects depend on model and conditions, sometimes increasing noise.

---

### Line 3: Resampling Calibration -- How Does Data Processing Affect Calibration?

| # | Paper | Core Question | arXiv | TMLR |
|:--:|------|------|:---:|:---:|
| R1 | N-Sensitive Calibration | How does sample size N change calibration conclusions? | in progress | #52 |
| R2 | Hidden Cost of Resampling (tmlr_p6) | Why does imbalance correction degrade probability calibration? | 2606.29720 | #50 |
| R3 | LLM Embeddings + Tree Ensembles (emnlp) | Preliminary study of calibration when combining LLM embeddings with tree models | -- | -- |

Key finding: N-sensitive -- more data can change the story; resampling degrades calibration.

---

### Line 4: Evaluation Reliability -- How Reliable Is Evaluation Itself?

| # | Paper | Core Question | arXiv | TMLR |
|:--:|------|------|:---:|:---:|
| E1 | Impossibility Triangle (tmlr_p13) | Can Bias-Reliability-Coupling be optimized simultaneously? | in progress | -- |
| E2 | Mapping the Evaluation Frontier (tmlr_p16) | Evaluation frontier across 11 conditions | 2607.00304 | -- |
| E3 | Within-Condition Testing (tmlr_p14) | Protocol and pilot for within-condition testing | in progress | -- |
| E4 | External Validation | Cross-evaluator replication of the impossibility triangle | -- | -- |

Key finding: An evaluation impossibility triangle exists -- three metrics cannot all be optimized simultaneously.

---

### Line 5: Methods and Protocols -- How to Standardize Measurement?

| # | Paper | Core Question | arXiv | TMLR |
|:--:|------|------|:---:|:---:|
| M1 | EPC Protocol | Unified measurement protocol for preference coupling | 2607.00297 | #51 |
| M2 | Diagnostic Framework | Multi-evaluator audit diagnostic framework | 2606.29719 | #49 |
| M3 | Contagion Tensor | Tensor mathematical framework for output distribution coupling | 2606.28839 | #47 |

Key finding: Standardized protocols are needed -- different papers using different methods cannot be compared.

---

### Line 6: Theoretical Critique -- What Is Wrong with Existing Assumptions?

| # | Paper | Core Question |
|:--:|------|------|
| T1 | Category Error | Modeling fallacy in multi-agent simulation |
| T2 | Symmetric LR Refutation (tmlr_p13) | Symmetric learning rates cannot eliminate preference coupling |

---

## By Maturity

### arXiv Published (10 papers)

BOUNDARY_SYNC (2607.01600), Mapping Frontier (2607.00304), EPC Protocol (2607.00297), Calibrating Evaluator (2606.31371), Hidden Cost (2606.29720), Diagnostic Framework (2606.29719), Contagion Tensor (2606.28839), Contagion Networks (2606.20493), Memory Contagion (2606.23195), Multimodal EPC (2606.16682)

### TMLR Under Review (10 papers)

#47 through #56

### To Be Completed (approximately 10 papers)

Category Error, External Validation, closing_landscape, etc.

---

## Complete Paper Index

| # | Directory | Title | Line | arXiv | TMLR | Status |
|:--:|------|------|:--:|:---:|:---:|:---:|
| 1 | boundary_sync_standalone | BOUNDARY_SYNC | Comm | 2607.01600 | #48 | Review |
| 2 | FLAGSHIP | Two Faces of Communication | Comm | in progress | #48 | Review |
| 3 | contagion_networks | Contagion Networks | Comm | 2606.20493 | -- | arXiv |
| 4 | memory_contagion | Memory Contagion | Comm | 2606.23195 | #56 | Review |
| 5 | tmlr_p17 | Strategy Collapse Dynamics | Comm | -- | -- | To do |
| 6 | CALIBRATION_EFFECTS | Calibration Effects | Calib | in progress | #53 | Review |
| 7 | tmlr_p9 | Calibrating the Evaluator | Calib | 2606.31371 | -- | arXiv |
| 8 | tmlr_p10 | Self-Evaluation Immunity | Calib | -- | -- | Archived |
| 9 | tmlr_p15 | Calibration Worsens Noise | Calib | -- | -- | Archived |
| 10 | calibration_contagion | Calibration Contagion (P8) | Calib | in progress | #54 | Review |
| 11 | RESAMPLING_CALIBRATION | N-Sensitive Calibration | Resamp | in progress | #52 | Review |
| 12 | tmlr_p6 | Hidden Cost of Resampling | Resamp | 2606.29720 | #50 | arXiv |
| 13 | _archive/emnlp_2027 | LLM Embeddings + Tree Ensembles | Resamp | -- | -- | Archived |
| 14 | tmlr_p13 | Impossibility Triangle | Eval | merged | -- | Into Two Faces |
| 15 | tmlr_p16 | Mapping the Frontier | Eval | 2607.00304 | -- | arXiv |
| 16 | tmlr_p14 | Within-Condition Testing | Eval | merged | -- | Into Two Faces |
| 17 | tmlr_external_validation | External Validation | Eval | -- | -- | Archived |
| 18 | tmlr_p11/arxiv_submit | EPC Protocol | Method | 2607.00297 | #51 | Review |
| 19 | _archive/acl_2027 | Diagnostic Framework | Method | 2606.29719 | #49 | Review |
| 20 | contagion_tensor_arxiv_fixed.zip | Contagion Tensor | Method | 2606.28839 | #47 | Review |
| 21 | _archive/tmlr_category_error | Category Error | Theory | -- | -- | Archived |
| 22 | tmlr_p12 | Symmetric LR Refutation | Theory | -- | -- | Archived |
| 23 | tmlr_p11 | Beyond Point Estimates | Method | -- | -- | To do |
| 24 | TEMPORAL_DYNAMICS | Temporal Dynamics | Method | -- | -- | Active |
| 25 | closing_landscape | Closing the Landscape | Comm | -- | -- | Active |
| 26 | _archive/aaai_student_abstract | Multimodal EPC | Theory | 2606.16682 | -- | arXiv |
| 27 | joces_templates | MM-EPC Chinese Version | Theory | -- | -- | Chinese |
