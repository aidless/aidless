# 论文清单

10 篇论文投了 TMLR（审稿中），10 篇论文发表在 arXiv。最后更新 2026 年 7 月。

---

## TMLR 投稿（10 篇，审稿中）

### #47 -- The Contagion Tensor

用张量数学框架量化多 Agent 系统中校准误差的传播路径和强度。把输出分布的耦合关系建模为张量运算，可以预测误差在不同 Agent 之间如何扩散。

arXiv: [2606.28839](https://arxiv.org/abs/2606.28839)

---

### #48 -- BOUNDARY_SYNC: 测量通信诱导的表征耦合

提出了 CAF（Coupling Amplification Factor，耦合放大因子）度量协议。在 GPT-4o 上做了严格对照实验：30 个 Agent 一组，约 9,900 次 API 调用。

关键发现：
- 文本通信导致 Agent 之间相似度增加约 20%（CAF = 0.803，95% CI [0.740, 0.873]，Cohen's d = 1.30，p < 0.001）
- 无通信消融实验：CAF = 0.978，确认通信是因果因素
- 图像通信：CAF = 0.834 [0.811, 0.858]，与文本效果成比例可比
- Group size 调节方向：K=5 同化，K=3 可能分化
- 跨模型（DeepSeek）：极端变异 CAF 0.034-0.803，格式瑕疵主导
- Stateless 发现：效应来自即时 peer info，去除后消失，非累积

arXiv: [2607.01600](https://arxiv.org/abs/2607.01600)

---

### #49 -- 多评估者审计的诊断框架

系统化的诊断框架，用于识别自适应 LLM Agent 中的评估者偏好动态。提供标准化的 EPC（Evaluator Preference Coupling）检测方法，可以跨多个评估者使用。

arXiv: [2606.29719](https://arxiv.org/abs/2606.29719)

---

### #50 -- 重采样的隐藏代价

发现数据不平衡修正技术（过采样/欠采样）会破坏树模型的概率校准。对校准方法的适用边界提出了警告。

注意：已从 TMLR 撤回。与 #52 N-Sensitive Calibration 高度重叠——都是树模型+校准方向，合并后统一投 #52。

arXiv: [2606.29720](https://arxiv.org/abs/2606.29720)

---

### #51 -- EPC: 标准化协议

评估者偏好耦合的标准化测量协议。包含 conformance_test.py 合规性检验脚本，确保跨模型、跨设置的可复现测量。解决了"不同论文用不同方法导致结果无法横向比较"的问题。

arXiv: [2607.00297](https://arxiv.org/abs/2607.00297)

---

### #52 -- N-Sensitive Calibration: 冻结 LLM 嵌入上的树集成校准

8 个数据集 x 5 个模型的校准实验。发现样本量 N 对校准结论有敏感性——更多数据可能改变"校准是否有效"的判断。使用混合效应模型和 Wilcoxon 检验 + Holm-Bonferroni 多重比较校正。

arXiv 在投。

---

### #53 -- Communication Degrades Calibration

60 种条件的系统性模拟研究，覆盖校准对偏好耦合的缓解效果。发现校准效果高度条件依赖：在某些模型上有效，在另一些模型上无效，甚至在特定条件下加重噪声。

核心结论：不能假设校准总是有益的。需要针对具体设置做实验验证。

arXiv 在投。

---

### #54 -- Not Contagion, Just Time: 时间校准疲劳

100,500 次 API 调用（GPT-4o、DeepSeek V4 Pro、DeepSeek V4 Flash），8 条件因子设计。区分了"传染"（跨 Agent 传播）和"时间疲劳"（随时间退化）两种机制。

发现校准退化主要源于时间疲劳而非跨 Agent 传染。这意味着问题可能不是"一个 Agent 的错误传给了另一个"，而是"模型在多次交互后逐渐退化"。

arXiv 在投。

---

### #55 -- Beyond Point Estimates: 时间动力学与协议干预

追踪评估者偏好耦合的时间动力学，测量收敛速度、振荡模式和干预窗口。揭示了耦合的时序特征——它不是恒定的，而是有节奏地变化。

arXiv 在投。

---

### #56 -- Memory Contagion: 评估偏差通过 Agent 记忆的跨时间传播

形式化了"记忆传染"概念，建立了 Gamma_temporal 度量。跨三代模型（DeepSeek V4-Chat、V4-Pro、Claude 4.6）、两种偏差类型、四阶段实验流水线。

关键发现：
- Length bias 在 V4-Chat 上强传播（Gamma_A = 13.18），但在 V4-Pro 和 Claude 4.6 上完全失效（Gamma_A = 0.00）
- Authority bias 在所有三个模型上都未传播（15 个多 seed 实验）
- Dose-response 分析：20% 污染率即可检出传染
- 机制分解：content-based > retrieval-based

arXiv: [2606.23195](https://arxiv.org/abs/2606.23195)

---

## arXiv 已发表（10 篇）

| arXiv ID | 标题 | 也在 TMLR |
|----------|------|:---:|
| [2607.01600](https://arxiv.org/abs/2607.01600) | BOUNDARY_SYNC: 测量通信诱导的表征耦合 | #48 |
| [2607.00304](https://arxiv.org/abs/2607.00304) | Mapping the Evaluation Frontier: 11 种评估者-Agent 条件的偏差-可靠性 tradeoff 实证调查 | -- |
| [2607.00297](https://arxiv.org/abs/2607.00297) | EPC: 评估者偏好动态的标准化协议 | #51 |
| [2606.31371](https://arxiv.org/abs/2606.31371) | Calibrating the Evaluator: 概率校准能否缓解 LLM Agent 反馈循环中的偏好耦合？ | -- |
| [2606.29720](https://arxiv.org/abs/2606.29720) | The Hidden Cost of Resampling: 不平衡修正如何破坏树模型的概率校准 | #50 |
| [2606.29719](https://arxiv.org/abs/2606.29719) | A Diagnostic Framework: 自适应 LLM Agent 中评估者驱动的偏好动态的诊断框架和多评估者审计 | #49 |
| [2606.28839](https://arxiv.org/abs/2606.28839) | The Contagion Tensor: 多 Agent LLM 系统中输出分布耦合的度量框架 | #47 |
| [2606.20493](https://arxiv.org/abs/2606.20493) | Contagion Networks: 多 Agent LLM 系统中评估者偏好的网络传播 | -- |
| [2606.23195](https://arxiv.org/abs/2606.23195) | Memory Contagion: 评估偏差通过 Agent 记忆的跨时间传播 | #56 |
| [2606.16682](https://arxiv.org/abs/2606.16682) | Multimodal Evaluator Preference Collapse: 自演化 Agent 中的跨模态耦合 | -- |

---

## 统计

| 指标 | 数量 |
|------|------|
| TMLR 投稿（审稿中） | 10 |
| arXiv 已发表 | 10 |
| arXiv 在投 | 6 |
| 独立论文概念（去重后） | 约 27 |
| 会议投稿（ACL、ICLR、EMNLP、AAAI） | 5 |
