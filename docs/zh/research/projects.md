# 项目

按类别整理的工程项目。每个项目包含做什么、用什么技术、为什么重要。

---

## 科研工具

### Loop Engineering v5.3 -- 论文质量审计系统

**做了什么：** 一个 Python 工具，自动检查你的论文有没有问题。你把 LaTeX 文件丢给它，它扫描 91 条规则，告诉你哪里有问题、哪里需要改。

**为什么做：** 每次投 TMLR 都要手动检查格式、引用、统计方法、写作质量，很烦而且容易漏。我把 3 篇论文、11 轮审稿中发现的所有问题整理成规则，写成了自动化工具。

**能检查什么：**

- 格式：TMLR 合规、匿名化、图片质量、arXiv 版本和 TMLR 版本是否一致
- 引用：幽灵引用（引用了但列表里没有）、引用准确性、Semantic Scholar 验证、自引率
- 统计：置信区间覆盖率、效应量报告、多重比较校正、功效分析
- 一致性：数值交叉验证、符号定义、参考文献格式
- 方法论：小样本、选择性报告、cherry-picking 检测
- LaTeX：编译错误、引用匹配、标签一致性
- 语义："首次发现"声明验证、novelty 搜索

**还做了什么：** 跟 5 篇已发表 TMLR 论文做对比。比如 TMLR 中位数用 4 个数据集、3 个模型、0% 报告置信区间、0% 报告效应量。我的论文在所有指标上都超过这个基线。

GitHub: [aidless/loop-engineering](https://github.com/aidless/loop-engineering)

---

### Multi-Agent 代码审查系统

**做了什么：** 一个自动审查 GitHub Pull Request 的工具。你把 PR 链接丢给它，5 个 AI Agent 分工合作，分析代码质量，把审查报告贴到 PR 的评论区。

**5 个 Agent 分别做什么：**

1. **Fetcher** -- 从 GitHub API 拉取 PR 的代码改动（diff）
2. **Analyzer** -- 逐文件分析：静态分析（AST 语法树检查）+ LLM 推理（用 DeepSeek 理解代码逻辑）
3. **Synthesizer** -- 把所有问题汇总成一份 Markdown 审查报告，分"必须修复"、"建议修复"、"小问题"、"做得好的地方"四部分
4. **Reflector** -- 用另一个 LLM 给报告打分（1-10 分），从覆盖面、深度、可操作性、清晰度四个维度评估。低于 7 分就退回给 Analyzer 重新分析，最多重试 3 次
5. **Notifier** -- 把最终报告贴到 GitHub PR 的评论区

**为什么用 5 个 Agent 而不是一个 LLM 调用：** 每个 Agent 只做一件事，出了问题好定位；Fetcher 拉完数据后 Analyzer 崩了不用重新拉；Reflector 可以反复打回重做直到质量达标。

**技术栈：** LangGraph（流程控制）+ DeepSeek API（LLM 调用）+ Streamlit（前端界面）

GitHub: [aidless/code-review-agent](https://github.com/aidless/code-review-agent)

---

### Agentic Paper Review -- 多 Agent 论文审稿系统

**做了什么：** 一个通用的论文审稿框架。输入一篇论文（PDF 或 Markdown），它用多个 AI Agent 按自定义标准逐条评分，生成结构化的审稿报告。支持跨模型交叉验证——用两个不同的 LLM 分别审稿，然后对比它们的分歧。

**Agent 团队：**

1. **Specialist** -- 按每个标准逐条分析论文
2. **Editor** -- 把 Specialist 的分析汇总成最终审稿报告
3. **Judge** -- 解决两个模型审稿结果之间的冲突
4. **Librarian** -- 搜索学术数据库找相关论文
5. **Fact-Checker** -- 验证可疑声明（比如"首次研究"）

**实际产出：** 用这个系统给自己的论文生成了 12+ 份结构化审稿报告，帮助在正式投稿前发现和修复问题。

GitHub: [aidless/agentic-paper-review](https://github.com/aidless/agentic-paper-review)

---

### Research Writing Skill -- AI 科研写作系统

**做了什么：** 一个 Claude/Cursor 插件，把论文写作从一次性聊天升级成可追踪、可恢复的工程化流程。

**核心功能：**

- 头脑风暴：7 轮问答确认论文类型、学科、题目、研究背景、方法、章节结构
- 按阶段执行：选题推进、正文写作、图表生成、投稿前自审
- 去 AI 化写作：不把润色等同于压缩，优先保留研究对象、数据口径、方法条件
- LaTeX 模板：支持 ACM、IEEE、Elsevier、Springer 等多个会议/期刊模板
- 学科分流：工科、社科、医学、法学各有专门的写作模块

GitHub: [aidless/research-writing-skill](https://github.com/aidless/research-writing-skill)

---

## Web 应用

### 太玄阁「万象」-- AI 命理平台（当前主力项目）

**做了什么：** 一个微信小程序 + Node.js 后端 + Python 微服务的全栈占卜平台。用户输入生日，系统自动排八字、紫微斗数、吠陀占星，然后 AI 结合七术进行深度解读。

**架构：**

```
微信小程序（7 个页面）
    |
Express.js 后端（Node.js v2.1，664 行主文件）
    |-- 15 个业务引擎模块
    |-- SQLite 用户/支付数据库
    |
Python 微服务（端口 5001/5002）
    |-- 吠陀占星引擎（PyJHora 天文计算，34KB）
    |-- 奇门遁甲微服务
```

**15 个引擎模块：**

- AI 命理引擎：调用 DeepSeek API，多轮对话，三段式输出（命理依据 -> 解读分析 -> 行动建议）
- 八字排盘引擎：四柱推算、十神分析、大运排列、紫微斗数排盘
- 吠陀占星引擎：34KB Python 核心代码，Shadbala（9 种力量评估，修复上游 9 个 bug）、Dasha 大运系统、Ashtakavarga、分盘
- 塔罗引擎：牌阵抽取、牌义数据库
- 六爻引擎：时间起卦、爻变分析
- 奇门遁甲：时盘排盘（Python 微服务）
- 场景解读引擎：职业/感情/时运/综合场景
- 用户系统：注册/登录、短信验证码
- 配额引擎：Free(3次/天) / Trial(10次) / Pro(无限)
- 支付引擎：月付 29 元、年付 299 元，四状态机
- 渲染引擎：星盘和卦象的前端渲染

**小程序页面：** 首页（热门问题推荐）、输入（生日+场景）、结果（AI 解读）、历史、个人中心、功能、webview

**安全：** CORS 白名单、Rate Limiting（10次/分钟/IP）、JWT 认证、CSP、XSS/CSRF 防护

---

### AI 生活规划助手

**做了什么：** 个人成长管理平台。日记记录、考试分析、高考志愿、求职、考研，AI 根据用户历史数据生成日/周/月规划建议。

**技术栈：** FastAPI + Vue.js + Anthropic Claude API

---

## 毕业/课程项目

### 码头船只出行管理系统

Spring Boot + MyBatis + MySQL 的标准 MVC 架构。功能：船只进出港登记、航线查询、用户角色权限管理。

### 港口集装箱管理系统

Spring Boot + Vue.js 全栈。集装箱信息管理、调度、查询。包含完整数据库设计。

### 任务管理系统

Spring Boot 任务管理。标准 CRUD 操作、用户认证、任务分配。

---

## 计算引擎

### 吠陀占星计算引擎

34KB Python 核心代码，用 PyJHora + pysweph（瑞士星历表）做天文计算。

实现了：Shadbala 力量评估（9 种，修了上游 9 个 bug）、Dasha 大运系统（Vimshottari / Chara Dasha）、Ashtakavarga 积分、分盘计算（D-9 到 D-60）、行星运行轨迹。

### CCF 会议截稿追踪器

Rust 写的。自动抓取 CCF 推荐会议截稿日期，支持按等级、方向、时间筛选。

---

## GitHub 仓库

| 仓库 | 说明 |
|------|------|
| [aidless/loop-engineering](https://github.com/aidless/loop-engineering) | 论文质量审计系统 |
| [aidless/code-review-agent](https://github.com/aidless/code-review-agent) | 多 Agent 代码审查 |
| [aidless/agentic-paper-review](https://github.com/aidless/agentic-paper-review) | 多 Agent 论文审稿 |
| [aidless/research-writing-skill](https://github.com/aidless/research-writing-skill) | AI 写作系统 |
| [aidless/aidless](https://github.com/aidless/aidless) | 个人主页和研究站点 |
