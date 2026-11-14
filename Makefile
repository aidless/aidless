# 一键重跑本仓验收题库。纯 Python 标准库，不依赖 node / 网络 / 第三方包。
# 只跑 eval/run_cases.py：本仓唯一的可执行验收入口（portfolio-mcp 的 node 侧
# 在路径含反斜杠的工作区里无法被 ESM loader 解析，故不挂进 eval）。
.PHONY: eval
eval:
	python3 eval/run_cases.py
