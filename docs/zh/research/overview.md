# 研究概览

27 篇论文，按研究方向、方法类型和成熟度分类。

---

## 按研究方向分类

### 方向一：通信效应 -- 通信对 Agent 输出有什么影响？

| # | 论文 | 核心问题 | arXiv | TMLR |
|:--:|------|------|:---:|:---:|
| P1 | BOUNDARY_SYNC | 通信引起同化还是分化？如何量化？ | 2607.01600 | #48 |
| P2 | Two Faces of Communication (FLAGSHIP) | 策略共识和校准传染能否同时测量？ | 在投 | #48 |
| P3 | Contagion Networks | 偏好传播在多 Agent 网络中的路径与结构 | 2606.20493 | -- |
| P4 | Memory Contagion | Agent 记忆如何跨时间传播评估偏差？ | 2606.23195 | #56 |
| P5 | Strategy Collapse Dynamics (tmlr_p17) | 评估者偏好如何随时间重塑 Agent 策略？ | -- | -- |

核心发现：通信引起同化（CAF<1），group size 调节方向，效应是 stateless 的。

---

### 方向二：校准效应 -- 概率校准有什么用？

| # | 论文 | 核心问题 | arXiv | TMLR |
|:--:|------|------|:---:|:---:|
| C1 | Calibration Effects | 校准何时有效？何时无效？何时加重噪声？ | 在投 | #53 |
| C2 | Calibrating the Evaluator (tmlr_p9) | 校准能否缓解偏好耦合？ | 2606.31371 | -- |
| C3 | Self-Evaluation Immunity (tmlr_p10) | 自评估免疫是普遍的吗？ | -- | -- |
| C4 | Calibration Worsens Noise (tmlr_p15) | 校准会不会反而加重评估噪声？ | -- | -- |
| C5 | Calibration Contagion | 校准误差如何在多 Agent 中传播？ | 在投 | #54 |

核心发现：校准不是万能药——效果因模型和条件而异，有时加重噪声。

---

### 方向三：重采样校准 -- 数据处理如何影响校准？

| # | 论文 | 核心问题 | arXiv | TMLR |
|:--:|------|------|:---:|:---:|
| R1 | N-Sensitive Calibration | 样本量 N 如何改变校准结论？ | 在投 | #52 |
| R2 | Hidden Cost of Resampling (tmlr_p6) | 不平衡修正为什么破坏概率校准？ | 2606.29720 | #50 |
| R3 | LLM Embeddings + Tree Ensembles (emnlp) | LLM 嵌入与树模型的校准组合初探 | -- | -- |

核心发现：N 敏感——更多数据可能改变故事结论；重采样会破坏校准。

---

### 方向四：评估可靠性 -- 评估本身有多可靠？

| # | 论文 | 核心问题 | arXiv | TMLR |
|:--:|------|------|:---:|:---:|
| E1 | 不可能三角 (tmlr_p13) | Bias-Reliability-Coupling 能否同时最优？ | 在投 | -- |
| E2 | Mapping the Evaluation Frontier (tmlr_p16) | 11 种条件的评估前沿图景 | 2607.00304 | -- |
| E3 | Within-Condition Testing (tmlr_p14) | 组内条件测试协议与试点 | 在投 | -- |
| E4 | External Validation | 不可能三角的跨评估者复现 | -- | -- |

核心发现：存在评估的不可能三角——三个指标不能同时最优。

---

### 方向五：方法与协议 -- 怎么标准化测量？

| # | 论文 | 核心问题 | arXiv | TMLR |
|:--:|------|------|:---:|:---:|
| M1 | EPC Protocol | 偏好耦合的统一测量协议 | 2607.00297 | #51 |
| M2 | Diagnostic Framework | 多评估者审计的诊断框架 | 2606.29719 | #49 |
| M3 | Contagion Tensor | 输出分布耦合的张量数学框架 | 2606.28839 | #47 |

核心发现：需要标准化协议——不同论文用不同方法无法横向比较。

---

### 方向六：理论批判 -- 现有假设有什么问题？

| # | 论文 | 核心问题 |
|:--:|------|------|
| T1 | Category Error | 多 Agent 模拟中的建模范畴错误 |
| T2 | Symmetric LR Refutation (tmlr_p13) | 对称学习率不能消除偏好耦合 |

---

## 按成熟度分类

### arXiv 已发表（10 篇）

BOUNDARY_SYNC (2607.01600)、Mapping Frontier (2607.00304)、EPC Protocol (2607.00297)、Calibrating Evaluator (2606.31371)、Hidden Cost (2606.29720)、Diagnostic Framework (2606.29719)、Contagion Tensor (2606.28839)、Contagion Networks (2606.20493)、Memory Contagion (2606.23195)、Multimodal EPC (2606.16682)

### TMLR 审稿中（10 篇）

#47-#56

### 待完成（约 10 篇）

Category Error、External Validation、closing_landscape 等

---

## 完整论文索引

| # | 目录 | 标题 | 方向 | arXiv | TMLR | 状态 |
|:--:|------|------|:--:|:---:|:---:|:---:|
| 1 | boundary_sync_standalone | BOUNDARY_SYNC | 通信 | 2607.01600 | #48 | 审稿 |
| 2 | FLAGSHIP | Two Faces of Communication | 通信 | 在投 | #48 | 审稿 |
| 3 | contagion_networks | Contagion Networks | 通信 | 2606.20493 | -- | arXiv |
| 4 | memory_contagion | Memory Contagion | 通信 | 2606.23195 | #56 | 审稿 |
| 5 | tmlr_p17 | Strategy Collapse Dynamics | 通信 | -- | -- | 待完成 |
| 6 | CALIBRATION_EFFECTS | Calibration Effects | 校准 | 在投 | #53 | 审稿 |
| 7 | tmlr_p9 | Calibrating the Evaluator | 校准 | 2606.31371 | -- | arXiv |
| 8 | tmlr_p10 | Self-Evaluation Immunity | 校准 | -- | -- | 归档 |
| 9 | tmlr_p15 | Calibration Worsens Noise | 校准 | -- | -- | 归档 |
| 10 | calibration_contagion | Calibration Contagion (P8) | 校准 | 在投 | #54 | 审稿 |
| 11 | RESAMPLING_CALIBRATION | N-Sensitive Calibration | 重采样 | 在投 | #52 | 审稿 |
| 12 | tmlr_p6 | Hidden Cost of Resampling | 重采样 | 2606.29720 | #50 | arXiv |
| 13 | _archive/emnlp_2027 | LLM Embeddings + Tree Ensembles | 重采样 | -- | -- | 归档 |
| 14 | tmlr_p13 | 不可能三角 | 评估 | 合并 | -- | 融入 Two Faces |
| 15 | tmlr_p16 | Mapping the Frontier | 评估 | 2607.00304 | -- | arXiv |
| 16 | tmlr_p14 | Within-Condition Testing | 评估 | 合并 | -- | 融入 Two Faces |
| 17 | tmlr_external_validation | External Validation | 评估 | -- | -- | 归档 |
| 18 | tmlr_p11/arxiv_submit | EPC Protocol | 方法 | 2607.00297 | #51 | 审稿 |
| 19 | _archive/acl_2027 | Diagnostic Framework | 方法 | 2606.29719 | #49 | 审稿 |
| 20 | contagion_tensor_arxiv_fixed.zip | Contagion Tensor | 方法 | 2606.28839 | #47 | 审稿 |
| 21 | _archive/tmlr_category_error | Category Error | 理论 | -- | -- | 归档 |
| 22 | tmlr_p12 | Symmetric LR Refutation | 理论 | -- | -- | 归档 |
| 23 | tmlr_p11 | Beyond Point Estimates | 方法 | -- | -- | 待完成 |
| 24 | TEMPORAL_DYNAMICS | Temporal Dynamics | 方法 | -- | -- | 活跃 |
| 25 | closing_landscape | Closing the Landscape | 通信 | -- | -- | 活跃 |
| 26 | _archive/aaai_student_abstract | Multimodal EPC | 理论 | 2606.16682 | -- | arXiv |
| 27 | joces_templates | MM-EPC 中文版 | 理论 | -- | -- | 中文 |
