# time-ledger

[English](README.md) | **简体中文**

**用一句话记时间。** 你随口说"今天看了俩小时论文、撸铁一小时",一个 AI 把它解析成结构化的活动 / 时长 / 日期,写进你自己的 Notion 库。**拿不准就反过来问你——绝不瞎编。**

不是计时器,不是表格。是一面照"你的时间有没有在复利"的镜子。

```
你:   今天看了俩小时 ML system design,撸铁一小时,刷了道 leetcode
AI:   记好 3 条 ✅
      · 阅读 · ML system design · 120min · 复利
      · 健身 · 撸铁 · 60min
      · 刷题 · LeetCode · ~20min ❓ 待确认:你没说时长,我估的 20 分钟,对吗?
```

## 为什么

所有手动时间日志都死于同一个原因:**记录摩擦**。RescueTime/Toggl 自动追踪但不懂你在干嘛;手动填表准但坚持不了三天。

time-ledger 把摩擦压到零:**你说人话,LLM 干脏活**(归类、估时长、写库)。而它和别的"AI 记账"最大的不同是一条**诚实契约**——

> 拿不准的(多久?哪类?哪天?"2h+1h"是 3h 还是 2h?)它**标记并攒着批量问你**,而不是猜一个填进去。

这条很关键:语言模型默认被训练成"宁可猜也别空着"(见 OpenAI《Why Language Models Hallucinate》, [arXiv 2509.04664](https://arxiv.org/abs/2509.04664))。一个会替你**记录事实**的工具,如果也爱猜,数据就废了。所以 time-ledger 反着来——**不确定,就问。**

## 这是什么形态

它是一个 **Claude Skill**(就是一份 `SKILL.md` 指令)+ 一个你自己的 **Notion database**。没有服务器、没有要部署的后端。捕获在任何有 Claude 的地方(手机/电脑/对话),数据真相源在你的 Notion(云端、手机原生可看)。

## 安装（约 10 分钟）

**前置**: 一个 Notion 账号 + Claude(Claude Code,或 Claude.ai 连了 Notion 连接器)。

1. **建 Notion 库** — 照 [`notion-schema.md`](./notion-schema.md) 在 Notion 里新建一个 database,加好那 7 个字段(Entry / Activity / Minutes / Date / Status / Compounding / Notes,均为英文)。
2. **拿 `data_source_id`** — 见 `notion-schema.md` 末尾(让 Claude `fetch` 这个库,或从 URL 取)。
3. **装 skill** — 把 [`SKILL.md`](./SKILL.md) 放到 `~/.claude/skills/time-ledger/SKILL.md`,**把里面 `<YOUR_NOTION_DATA_SOURCE_ID>` 那一行换成你第 2 步拿到的值**。
4. **连 Notion** — 确保你的 Claude 连了 Notion(Claude Code: 加 Notion MCP 连接器;Claude.ai: Settings → Connectors → Notion)。
5. **开记** — 对 Claude 说"记一下:今天写代码三小时"。

## 怎么用

- **直接报**: 随口说做了啥 → AI 解析写入,拿不准的批量问你。
- **批量整理**: 说"整理时间账本" → AI 把"待确认"的行捞出来一次性问清、补齐。
- **看分布**: Notion 自带日历视图 + 按活动 group 汇总;或让 Claude 现场画一张图。

## 诚实的局限

- **依赖 Claude + Notion**:这是个 skill,不是独立程序。没有这两样跑不起来。
- **靠主动报**:它不自动追踪(那是有意的——自动追踪不懂你"为什么"花这时间)。你不说,它不知道。
- **复利标签是手动启发式**:`复利/消耗/中性` 现在靠规则手动标,不是学出来的。一个真正的"复利引擎"是 roadmap,不是现状。
- **n=1**:作者一个人用了若干天,没有大样本验证。

## 设计哲学

来自一个更大的个人项目(inveself)的一句话:**"你得先成为一个会复利的人,才能做好复利的投资。"** 这个账本是那句话的工具——它诚实地照出你的小时数到底有没有在利滚利(它曾照出作者某周 reading:building ≈ 30:1)。

## License

MIT — 见 [LICENSE](./LICENSE)。拿去改、拿去用、拿去发你自己的版本。
