# 🏠 科研总览 — 刘泽文

> **研究主线**：多 Agent LLM 系统中的通信、校准与偏好耦合
> **10 篇 arXiv | 6 篇 TMLR | 7 篇待交 arXiv | 研究周期 2024-2026**

---

## 🎯 你的研究问题

一个根本问题：**当 LLM Agent 互相通信时，它们的输出会怎样？**

这个问题展开为三条追问：

```
问题 1: 通信引起什么效应？
  ├── 策略共识 (consensus)：Agent 意见趋同？
  ├── 校准传染 (contagion)：评估误差传播？
  └── 结论：两者同时发生——Two Faces of Communication

问题 2: 校准能解决问题吗？
  ├── 校准缓解耦合？（有时能，有时不能）
  ├── 校准加重噪声？（在特定条件下反而变差）
  └── 结论：校准不是银弹，效果条件依赖

问题 3: 评估本身有多可靠？
  ├── Bias-Reliability-Coupling 能否同时最优？（不能）
  ├── 不同评估者一致吗？（不一致）
  └── 结论：存在评估的"不可能三角"
```

---

## 🔬 10 篇 arXiv 已发表

| # | arXiv ID | 标题 | 一句话 | TMLR |
|:--:|------|------|------|:---:|
| 1 | 2607.01600 | **BOUNDARY_SYNC** | CAF 度量协议——通信引起同化 (CAF=0.80), group size 调节方向 | #48 |
| 2 | 2607.00304 | **Mapping the Evaluation Frontier** | 11 种 Evaluator-Agent 条件的评估前沿实证调查 | — |
| 3 | 2607.00297 | **EPC: Standardized Protocol** | 偏好耦合的标准化测量协议 + 合规性检验脚本 | #51 |
| 4 | 2606.31371 | **Calibrating the Evaluator** | 校准能否缓解偏好耦合？γ 下降 20-49%，但条件依赖 | — |
| 5 | 2606.29720 | **Hidden Cost of Resampling** | 不平衡修正会破坏概率校准 | #50 |
| 6 | 2606.29719 | **Diagnostic Framework** | 多评估者审计的诊断框架 | #49 |
| 7 | 2606.28839 | **Contagion Tensor** | 输出分布耦合的张量数学框架 | #47 |
| 8 | 2606.16682 | **Multimodal EPC** | 跨模态偏好坍缩——文本+图像双重验证 | — |
| 9 | 2606.20493 | **Contagion Networks** | 评估者偏好在多 Agent 网络中的传播路径与结构 | — |
| 10 | 2606.23195 | **Memory Contagion** | Agent 记忆如何跨时间传播评估偏差 | — |

---

## 📤 待交 arXiv（6篇）

| # | 论文 | 本地目录 | arXiv | TMLR |
|:--:|------|------|:---:|:---:|
| 1 | **N-Sensitive Calibration** | RESAMPLING_CALIBRATION | 7774801 on hold | #52 |
| 2 | **Calibration Effects** | CALIBRATION_EFFECTS | 7780195 incomplete | #53 |
| 3 | **Calibration Contagion** | calibration_contagion | 需新建 | — |
| 4 | **TEMPORAL_DYNAMICS** | TEMPORAL_DYNAMICS | 需新建 | — |
| 5 | **Closing the Landscape** | closing_landscape | 需新建 | — |
| 6 | **Not Contagion, Just Time** | calibration_contagion（P8 改名） | 7784925 incomplete | #54 |

---

## 🧠 四条核心洞察（按发现顺序）

### 洞察 1：通信有双面性（BOUNDARY_SYNC → Two Faces）

| 实验 | 发现 |
|------|------|
| GPT-4o N=30, ~9900 API calls | 文本通信：CAF=0.803 [0.740, 0.873], Cohen's d=1.30, p<0.001 |
| 消融实验 (no-communication) | CAF=0.978，确认通信是因果因素 |
| 图像通信 | CAF=0.834 [0.811, 0.858]，与文本成比例可比 |
| K=5 vs K=3 | Group size 调节方向：K=5 同化，K=3 可能分化 |
| 跨模型 (DeepSeek) | 极端变异 CAF 0.034-0.803，格式瑕疵主导 |
| Stateless 发现 | 效应来自即时 peer info，去除后消失，非累积 |

→ **结论**：通信同时产生策略共识和校准传染，group size 是方向调节器。

### 洞察 2：偏好耦合是系统性问题（EPC Protocol → Temporal Dynamics）

| 实验 | 发现 |
|------|------|
| 4 模型 × 多轮反馈 | 评估者产生系统性 Agent 偏好，形成正反馈 |
| 对称学习率 | 不能消除耦合——实证反驳 |
| 协议标准化 | conformance_test.py 确保可复现测量 |

→ **结论**：不是个别模型问题，是协议层面问题——需要标准化度量。

### 洞察 3：校准不是银弹（Calibration Effects 系列）

| 实验 | 发现 |
|------|------|
| 60 条件系统模拟 | 校准效果高度条件依赖 |
| 自评估免疫测试 | 免疫性因模型而异，非普遍 |
| Platt Scaling | 有时反而加重评估噪声 |
| Calibrated TTRL | γ 下降 20-49%，但只在特定条件下 |

→ **结论**：校准的效果取决于模型、条件、协议，不能假设它总是有益的。

### 洞察 4：评估存在不可能三角

| 证据 | 来源 |
|------|------|
| 形式化猜想 | γ + k·H·CV(N) ≥ c |
| 11 条件实证 | 三个指标从未同时最优 |
| 跨评估者验证 | 在不同评估者上复现了 tradeoff 模式 |
| 组内条件测试 | 协议设计完成，试点结果支持 |

→ **结论**：Bias-Reliability-Coupling 存在形式化 tradeoff 约束。

---

## 📜 研究时间线

```
2024 下半年 — 概念萌芽
  │ AE-TTL: Adaptive Ensemble Test-Time Learning
  │ EPC: Evaluator Preference Collapse（首次命名）
  │
2025 上半年 — MM-EPC 时代
  │ 文本+图像双模态验证
  │ ArXiv v1→v3，多次 R&R
  │ 投 ACL 2027 → ICLR 2027 → TMLR 2027
  │
2025 下半年 — 分叉
  │
  ├── 📊 重采样校准线
  │     tmlr_p6: Hidden Cost of Resampling (2606.29720)
  │     EMNLP 2027: LLM Embeddings + Tree Ensembles
  │     → RESAMPLING_CALIBRATION (#52)
  │
  ├── 🤖 Multi-Agent 通信线
  │     tmlr_p9: Calibrating the Evaluator (2606.31371)
  │     tmlr_p10: Self-Eval Immunity
  │     tmlr_p11: Beyond Point Estimates + EPC Protocol (#51)
  │     tmlr_p12: Multi-Model Benchmark
  │     tmlr_p13: Symmetric LR Refutation + 不可能三角
  │     tmlr_p14: Within-Condition Testing → arxiv (2607.00304)
  │     tmlr_p15: Calibration Worsens Noise
  │     tmlr_p16: Mapping the Frontier (2607.00304)
  │     tmlr_p17: Strategy Collapse Dynamics
  │
  ├── 🧪 理论批判
  │     Category Error: 概率混合≠语义通信
  │     External Validation: 不可能三角复现
  │     Contagion Tensor (#47, 2606.28839)
  │     Contagion Networks (2606.20493)
  │     Memory Contagion (2606.23195)
  │     Multimodal EPC (2606.16682)
  │
2026 年 6-7 月 — 收敛
  │
  ├── 🔴 BOUNDARY_SYNC → Two Faces of Communication (#48, arXiv 2607.01600)
  ├── 🟡 CALIBRATION_EFFECTS (#53)
  ├── 🟢 RESAMPLING_CALIBRATION (#52)
  ├── 🟣 Diagnostic Framework (#49, 2606.29719)
  ├── 🔵 EPC Protocol (#51, 2607.00297)
  │
  └── 📝 待完成
        TEMPORAL_DYNAMICS, Calibration Contagion,
        closing_landscape, Category Error, External Validation
```

---

## 🔗 论文依赖与融合关系

```
AE-TTL ──→ EPC ──→ MM-EPC ──→ Diagnostic Framework (#49)
                                   │
                    ┌──────────────┼──────────────┐
                    │              │              │
              Contagion Tensor  EPC Protocol   Temporal Dynamics
              (#47)             (#51)          (待整合)
                    │
         ┌─────────┼─────────┐
         │         │         │
    Contagion   Memory    Calibration
    Networks    Contagion  Contagion
    (2606.20493)(2606.23195)(待交)
         │         │         │
         └─────────┼─────────┘
                   │
         ┌─────────┴─────────┐
         │                   │
    BOUNDARY_SYNC      CALIBRATION_EFFECTS
    (#48, 2607.01600)   (#53)
         │                   │
    Two Faces of        RESAMPLING_CALIBRATION
    Communication       (#52)
    (arXiv 7782801)
         │
    ┌────┴────┐
    │         │
  不可能三角  评估前沿
  (融入)     (2607.00304)
```

---

## 📊 全维度统计

| 维度 | 数量 | 明细 |
|------|:---:|------|
| arXiv 已发表 | 10 | 2606.16682 ~ 2607.01600 |
| arXiv 在投 | 8 | 7774801, 7780195, 7782801, 7784925, 7786759, 7786771, +2 可清理 |
| TMLR 审稿中 | **10** | **#47-56** |
| 独立论文概念 | ~27 | 去重后 |
| 本地有源文件 | 27 | 1 篇仅 zip |
| 实验总次数 | 100+ | ~9900 BOUNDARY_SYNC API calls + others |
| 使用模型 | 5+ | GPT-4o, DeepSeek V4, Qwen3.7, Claude... |
| 投稿过的会议 | 5 | ACL, ICLR, EMNLP, AAAI, TMLR |

---

## 🎯 下一步行动

| 优先级 | 任务 | 论文 |
|:---:|------|------|
| 🔴 | 完成 arXiv 提交 | #52, #53, #54, #55 (4篇 incomplete) |
| 🔴 | 清理 arXiv 重复 | 7768916, 7768917 |
| 🟡 | 🆕 推荐投 TMLR | **Memory Contagion** (🥇), Mapping Frontier (🥈) |
| 🟢 | 新建 arXiv | Category Error, External Validation, closing_landscape |
| ❓ | 确认 7786771 | 这是什么？

---

## 🧭 导航

📄 [[📄_论文清单|清单]] | 📊 [[📊_论文分类|分类]] | 🧪 [[🧪_实验索引|实验]] | 👿 [[👿_审稿记录|审稿]] | 🔬 [[🔬_方法库|方法]] | 🖥️ [[🖥️_项目总览|全部项目]]
