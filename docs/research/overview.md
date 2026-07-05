# 📊 论文分类

> 按研究问题、方法类型、成熟度三维拆分。27 篇论文，6 条研究线。

---

## 一、按研究问题分类

### 🔵 线1：通信效应 — 通信对 Agent 输出有什么影响？

| # | 论文 | 核心问题 | arXiv | TMLR |
|:--:|------|------|:---:|:---:|
| P1 | **BOUNDARY_SYNC** | 通信引起同化还是分化？如何量化？ | 2607.01600 | #48 |
| P2 | **Two Faces of Communication** (FLAGSHIP) | 策略共识和校准传染能否同时测量？ | 在投 | #48 |
| P3 | **Contagion Networks** | 偏好传播在 Agent 网络中的路径与结构 | 2606.20493 | — |
| P4 | **Memory Contagion** | Agent 记忆如何跨时间传播评估偏差？ | 2606.23195 | — |
| P5 | **Strategy Collapse Dynamics** (tmlr_p17) | 评估者偏好如何随时间重塑 Agent 策略？ | — | — |

**关键发现**：通信引起同化（CAF<1），group size 调节方向，效应是 stateless 的。

---

### 🟢 线2：校准效应 — 概率校准有什么用？

| # | 论文 | 核心问题 | arXiv | TMLR |
|:--:|------|------|:---:|:---:|
| C1 | **Calibration Effects** | 校准何时有效？何时无效？何时加重噪声？ | 在投 | #53 |
| C2 | Calibrating the Evaluator (tmlr_p9) | 校准能否缓解偏好耦合？ | 2606.31371 | — |
| C3 | Self-Evaluation Immunity (tmlr_p10) | 自评估免疫是普遍的吗？ | — | — |
| C4 | Calibration Worsens Noise (tmlr_p15) | 校准会不会反而加重评估噪声？ | — | — |
| C5 | **Calibration Contagion** | 校准误差如何在多 Agent 中传播？ | — | — |

**关键发现**：校准不是银弹——效果因模型和条件而异，有时加重噪声。

---

### 🟡 线3：重采样校准 — 数据处理如何影响校准？

| # | 论文 | 核心问题 | arXiv | TMLR |
|:--:|------|------|:---:|:---:|
| R1 | **N-Sensitive Calibration** | 样本量 N 如何改变校准结论？ | 在投 | #52 |
| R2 | Hidden Cost of Resampling (tmlr_p6) | 不平衡修正为什么破坏概率校准？ | 2606.29720 | ~~#50~~ |
| R3 | LLM Embeddings + Tree Ensembles (emnlp) | LLM 嵌入与树模型的校准组合初探 | — | — |

**关键发现**：N 敏感——更多数据可能改变故事结论；重采样会破坏校准。

---

### 🔴 线4：评估可靠性 — 评估本身有多可靠？

| # | 论文 | 核心问题 | arXiv | TMLR |
|:--:|------|------|:---:|:---:|
| E1 | **不可能三角** (tmlr_p13/arxiv_p13) | Bias-Reliability-Coupling 能否同时最优？ | 在投 | — |
| E2 | **Mapping the Evaluation Frontier** (tmlr_p16) | 11 种条件的评估前沿图景 | 2607.00304 | — |
| E3 | **Within-Condition Testing** (tmlr_p14/arxiv_p14) | 组内条件测试协议与试点 | 在投 | — |
| E4 | External Validation | 不可能三角的跨评估者复现 | — | — |

**关键发现**：存在评估的不可能三角——三个指标不能同时最优。

---

### 🟣 线5：方法与协议 — 怎么标准化测量？

| # | 论文 | 核心问题 | arXiv | TMLR |
|:--:|------|------|:---:|:---:|
| M1 | **EPC: A Standardized Protocol** | 偏好耦合的统一测量协议 | 2607.00297 | #51 |
| M2 | **Diagnostic Framework** | 多评估者审计的诊断框架 | 2606.29719 | #49 |
| M3 | **Contagion Tensor** | 输出分布耦合的张量数学框架 | 2606.28839 | #47 |

**关键发现**：需要标准化协议——不同论文用不同方法无法横向比较。

---

### ⚪ 线6：理论批判 — 现有假设有什么问题？

| # | 论文 | 核心问题 | arXiv | TMLR |
|:--:|------|------|:---:|:---:|
| T1 | Category Error | 多 Agent 模拟中的建模范畴错误 | — | — |
| T2 | Symmetric LR Refutation (tmlr_p13) | 对称学习率不能消除偏好耦合 | — | — |

---

## 二、按方法类型分类

### 📏 实证研究（Empirical）

| 论文 | 实验规模 | 关键指标 |
|------|:--:|------|
| BOUNDARY_SYNC | GPT-4o N=30, ~9900 API calls | CAF, JSD, Cohen's d |
| N-Sensitive Calibration | 8 数据集, 5 模型, 5-20 seeds | ECE, Brier, AUROC, NLL |
| Calibration Effects | 60 条件模拟 | γ, ECE, H, CV |
| Mapping the Frontier | 11 Evaluator-Agent 条件 | γ, H, CV |
| Strategy Collapse | 时序追踪 | 收敛速度、振荡幅度 |
| Contagion Networks | 多 Agent 网络传播 | 传播路径、网络指标 |

### 🔧 协议/框架（Protocol & Framework）

| 论文 | 贡献 |
|------|------|
| EPC Protocol | 偏好耦合标准化测量协议（含 conformance_test.py） |
| Diagnostic Framework | 多评估者审计框架 + 诊断清单 |
| Contagion Tensor | 耦合度量的张量数学框架 |
| Within-Condition Testing | 组内条件测试实验协议 |

### 💡 理论猜想（Theoretical）

| 论文 | 猜想 |
|------|------|
| 不可能三角 | γ + k·H·CV(N) ≥ c |
| Category Error | 概率混合 ≠ 语义通信，符号反转预测 |
| Symmetric LR Refutation | 对称学习率不能消除耦合 |

---

## 三、按成熟度分类

### 🟢 已发表 arXiv（10篇）

| ID | 标题 |
|------|------|
| 2607.01600 | BOUNDARY_SYNC |
| 2607.00304 | Mapping the Evaluation Frontier |
| 2607.00297 | EPC: Standardized Protocol |
| 2606.31371 | Calibrating the Evaluator |
| 2606.29720 | Hidden Cost of Resampling |
| 2606.29719 | Diagnostic Framework |
| 2606.28839 | Contagion Tensor |
| 2606.16682 | Multimodal Evaluator Preference Collapse |
| 2606.20493 | Contagion Networks |
| 2606.23195 | Memory Contagion |

### 🔵 TMLR 审稿中（6篇）

| # | 标题 |
|:--:|------|
| 47 | Contagion Tensor |
| 48 | BOUNDARY_SYNC |
| 49 | Diagnostic Framework |
| 51 | EPC Protocol |
| 52 | N-Sensitive Calibration |
| 53 | Calibration Effects |

### 🟡 待完成（~10篇）

| 论文 | 状态 |
|------|------|
| FLAGSHIP (Two Faces) | 合并蓝图中 |
| TEMPORAL_DYNAMICS | Phase 0，需 N≥10 实验 |
| Calibration Contagion | Phase 0 |
| Closing the Calibration Landscape | Phase 0，刚初始化 |
| 不可能三角 | 猜想待验证 |
| Within-Condition Testing | 协议设计完成，待全量实验 |
| Category Error | 需复现 |
| External Validation | 需更多评估者 |
| Strategy Collapse Dynamics | 需更多时序数据 |

---

## 四、27 篇论文完整索引

| # | 论文 | 线 | arXiv | TMLR | 状态 |
|:--:|------|:--:|:---:|:---:|:---:|
| 1 | boundary_sync_standalone | 🔵 | ✅ | #48 | 审稿 |
| 2 | FLAGSHIP (Two Faces) | 🔵 | 在投 | #48 | 审稿 |
| 3 | contagion_networks | 🔵 | ✅ | — | arXiv |
| 4 | memory_contagion | 🔵 | ✅ | #56 | 审稿 |
| 5 | tmlr_p17 | 🔵 | — | — | 待完成 |
| 6 | CALIBRATION_EFFECTS | 🟢 | 在投 | #53 | 审稿 |
| 7 | tmlr_p9 | 🟢 | ✅ | — | arXiv |
| 8 | tmlr_p10 | 🟢 | — | — | 归档 |
| 9 | tmlr_p15 | 🟢 | — | — | 归档 |
| 10 | calibration_contagion (P8) | 🟢 | 在投 | #54 | 审稿 |
| 11 | RESAMPLING_CALIBRATION | 🟡 | 在投 | #52 | 审稿 |
| 12 | tmlr_p6 | 🟡 | ✅ | #50 | 审稿 |
| 13 | emnlp_2027 | 🟡 | — | — | 归档 |
| 14 | tmlr_p13 | 🔴 | 合并 | — | 融入 Two Faces |
| 15 | tmlr_p16 | 🔴 | ✅ | — | arXiv |
| 16 | tmlr_p14 | 🔴 | 合并 | — | 融入 Two Faces |
| 17 | tmlr_external_validation | 🔴 | — | — | 归档 |
| 18 | tmlr_p11/arxiv_submit | 🟣 | ✅ | #51 | 审稿 |
| 19 | acl_2027 | 🟣 | ✅ | #49 | 审稿 |
| 20 | 📦 contagion_tensor_arxiv_fixed.zip | 🟣 | ✅ | #47 | 审稿 |
| 21 | tmlr_category_error | ⚪ | — | — | 归档 |
| 22 | tmlr_p12 | ⚪ | — | — | 归档 |
| 23 | tmlr_p11 | 🟣 | — | — | 待完成 |
| 24 | TEMPORAL_DYNAMICS | 🟣 | — | — | 活跃 |
| 25 | closing_landscape | 🔵 | — | — | 活跃 |
| 26 | aaai_student_abstract | ⚪ | ✅ | — | arXiv |
| 27 | joces_templates | ⚪ | — | — | 中文 |
