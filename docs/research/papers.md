# 📄 论文清单

> **arXiv: 10 篇已发表 + 8 篇在投 | TMLR: 10 篇审稿中 (#47-56) | 最后更新: 2026-07-05**

---

## 🌐 arXiv 已发表（10篇）

| arXiv ID | 标题 | 本地 | TMLR |
|------|------|:---:|:---:|
| **2607.01600** | BOUNDARY_SYNC: Measuring Communication-Induced Representational Coupling in Multi-Agent LLM Systems | ✅ `boundary_sync_standalone/` | #48 |
| **2607.00304** | Mapping the Evaluation Frontier: An Empirical Survey of the Bias-Reliability Tradeoff Across Eleven Evaluator-Agent Conditions | ✅ `tmlr_p16/` | — |
| **2607.00297** | EPC: A Standardized Protocol for Measuring Evaluator Preference Dynamics in LLM Agent Systems | ✅ `tmlr_p11/arxiv_submit/` | #51 |
| **2606.31371** | Calibrating the Evaluator: Does Probability Calibration Mitigate Preference Coupling in LLM Agent Feedback Loops? | ✅ `tmlr_p9/` | — |
| **2606.29720** | The Hidden Cost of Resampling... | ✅ `tmlr_p6/` | #50 |
| **2606.29719** | A Diagnostic Framework and Multi-Evaluator Audit of Evaluator-Driven Preference Dynamics in Self-Adapting LLM Agents | ✅ `_archive/acl_2027/` | #49 |
| **2606.28839** | The Contagion Tensor: A Framework for Measuring Output-Distribution Coupling in Multi-Agent LLM Systems | 📦 zip | #47 |
| **2606.16682** | Multimodal Evaluator Preference Collapse: Cross-Modal Coupling in Self-Evolving Agents | ✅ `_archive/aaai_student_abstract/` | — |
| **2606.20493** | Contagion Networks: Evaluator Preference Propagation in Multi-Agent LLM Systems | ✅ contagion_networks | — |
| **2606.23195** | Memory Contagion: Cross-Temporal Propagation of Evaluator Bias via Agent Memory | ✅ memory_contagion | — |

---

## 📤 arXiv 在投（8篇）

| ID | 标题 | 本地 | 状态 |
|:---:|------|:---:|:---:|
| 7768916 | 不可能三角（已融入 Two Faces） | — | 🗑️ 可清理 |
| 7768917 | Within-Condition（已融入 Two Faces） | — | 🗑️ 可清理 |
| 7774801 | **N-Sensitive Calibration** | RESAMPLING_CALIBRATION | on hold |
| 7780195 | **Calibration Effects** | CALIBRATION_EFFECTS | incomplete |
| 7782801 | **Two Faces of Communication** | FLAGSHIP | ✅ submitted |
| 7784925 | **Not Contagion, Just Time** (P8) | calibration_contagion | incomplete |
| **7786759** 🆕 | **Beyond Point Estimates** (TEMPORAL_DYNAMICS) | TEMPORAL_DYNAMICS | incomplete |
| **7786771** 🆕 | *(无标题)* | ❓ | incomplete |

---

## ✅ TMLR 当前状态（10篇）

| TMLR # | 标题 | 本地 | arXiv |
|:---:|------|:---:|:---:|
| **47** | The Contagion Tensor | 📦 zip | 2606.28839 |
| **48** | BOUNDARY_SYNC | ✅ FLAGSHIP + standalone | 2607.01600 |
| **49** | A Diagnostic Framework... | ✅ _archive | 2606.29719 |
| **50** | Hidden Cost of Resampling 🔄 | ✅ tmlr_p6 | 2606.29720 |
| **51** | EPC: A Standardized Protocol | ✅ tmlr_p11/arxiv_submit | 2607.00297 |
| **52** | N-Sensitive Calibration | ✅ RESAMPLING_CALIBRATION | 在投 7774801 |
| **53** | Calibration Effects | ✅ CALIBRATION_EFFECTS | 在投 7780195 |
| **54** | Not Contagion, Just Time (P8) | ✅ calibration_contagion | 在投 7784925 |
| **55** 🆕 | **Beyond Point Estimates** (TEMPORAL_DYNAMICS) | ✅ TEMPORAL_DYNAMICS | 在投 7786759 |
| **56** 🆕 | **Memory Contagion** | ✅ memory_contagion | 2606.23195 |

---

## 🚀 .loop 管理（7篇）

| ID | 目录 | 标题 | TMLR | arXiv |
|:--:|------|------|:---:|:---:|
| A | RESAMPLING_CALIBRATION | N-Sensitive Calibration | #52 | 在投 |
| B | TEMPORAL_DYNAMICS | Beyond Point Estimates: Temporal Dynamics... | — | — |
| C | calibration_contagion | Calibration Contagion in Multi-Agent LLM | — | — |
| D | CALIBRATION_EFFECTS | Communication Degrades Calibration... | #53 | 在投 |
| E | FLAGSHIP → "Two Faces of Multi-Agent Communication" | #48 | 在投 |
| — | closing_landscape | Closing the Calibration Landscape | — | — |
| — | boundary_sync_standalone | BOUNDARY_SYNC（独立版） | #48 | 2607.01600 |

---

## ⚠️ 本地缺失的论文

| 标题 | arXiv ID | 搜索建议 |
|------|------|------|
| 7774733（无标题） | — | 检查 arXiv 网页 |

---

## 📐 TMLR 版本演进

| 目录 | 标题 | → 合并到 |
|------|------|:--:|
| tmlr_p6 | Hidden Cost of Resampling | ~~#50~~ |
| tmlr_p9 | Calibrating the Evaluator | PAPER-D |
| tmlr_p10 | Self-Evaluation Immunity Is Model-Dependent | PAPER-D |
| tmlr_p11 | Beyond Point Estimates: Temporal Dynamics | PAPER-B |
| tmlr_p11/arxiv_submit | **EPC: A Standardized Protocol** | #51 |
| tmlr_p12 | Evaluating the Evaluators | PAPER-B |
| tmlr_p13 | Symmetric Learning Rates Do Not Eliminate... (+ 不可能三角) | PAPER-B, arXiv |
| tmlr_p14 | Within-Condition Testing | PAPER-E, arXiv |
| tmlr_p15 | Probability Calibration Worsens Evaluation Noise | PAPER-D |
| tmlr_p16 | Mapping the Evaluation Frontier | PAPER-E, arXiv |
| tmlr_p17 | Strategy Collapse Dynamics | PAPER-E |
| tmlr_flagship | What Communication Does to... (Flagship TMLR) | #48 |

---

## 📦 归档

| 目录 | 标题 | 投稿 |
|------|------|:--:|
| acl_2027 | Diagnostic Framework | ACL / ICLR / TMLR |
| emnlp_2027 | Probability Calibration When Combining LLM Embeddings with Tree Ensembles | EMNLP |
| aaai_student_abstract | Multimodal Evaluator Preference Collapse | AAAI SA |
| tmlr_category_error | The Category Error in Multi-Agent Simulation | TMLR |
| tmlr_external_validation | Partial Replication of the Impossibility Triangle | TMLR |
| arxiv_main | Text-Mediated Preference Coupling (MM-EPC) | ArXiv 早期 |
| arxiv_v3 | MM-EPC v3 | ArXiv |
| contagion_tensor | Contagion Tensor 实验代码 | #47 |
| joces_templates | MM-EPC → 计算机工程与科学 | 中文期刊 |

---

## 📊 统计

| 指标 | 数量 |
|------|:---:|
| arXiv 已发表 | 10 |
| arXiv 在投 | 8 |
| TMLR 审稿中 | 10 (#47-56) |
| 本地源文件 | 27 |
| 可清理 arXiv 重复 | 2 (7768916, 7768917) |
