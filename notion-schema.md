# Notion 库模板

time-ledger 把数据写进**你自己的** Notion database。照这个建一个,几分钟。

## 字段（7 个）

在 Notion 里新建一个 database（full-page 或 inline 都行），加这些 property：

| 字段名 | 类型 | 选项 / 说明 |
|---|---|---|
| `记录` | **Title** | 每个 database 自带的标题列，改名成「记录」。存原话或清晰标题。 |
| `活动` | **Select** | 选项: `阅读` `写代码` `刷题` `健身` `投资` `会议` `写作` `生活` `其他` |
| `分钟` | **Number** | 时长，分钟 |
| `时间` | **Date** | 这条活动发生的日期 |
| `状态` | **Select** | 选项: `待整理` `待确认` `已整理` |
| `复利` | **Select** | 选项: `复利` `消耗` `中性` |
| `备注` | **Text** | 原话线索 / agent 的疑问 |

> **想用英文 / 改分类?** 完全可以——改这里的字段名和 select 选项，然后把 `SKILL.md` 里对应的枚举同步改成一样即可。两边保持一致是唯一要求。

## 推荐视图

- **Table**（默认）— 录入 + 全貌
- **Calendar**（按 `时间`）— 一眼看时间分布
- **Board / 汇总**（group by `活动`，对 `分钟` 求和）— 看时间花在哪类最多
- 可选 **Chart**（donut，按 `活动`）— 各类占比

## 拿 data_source_id（装 skill 时要填）

`SKILL.md` 里要填一个 `DATA_SOURCE_ID`。两种拿法：

1. **让 Claude 取（最简单）**：连好 Notion 后，对 Claude 说"fetch 我这个库 <粘贴库的 Notion URL>，把 data_source_id 给我"。它会返回一个 `collection://...` 形式的 id —— 取 `collection://` 后面那段 UUID。
2. **从 URL**：database 的 URL 里那串 32 位十六进制就是 database id；data source id 通常可由 Claude 的 fetch 工具返回的 `<data-source url="collection://...">` 标签拿到。

把拿到的 UUID 填进 `SKILL.md` 的 `<YOUR_NOTION_DATA_SOURCE_ID>` 处，就装好了。
