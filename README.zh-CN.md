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

我懒——表格坚持不了三天——但我想知道时间花哪了:是在浪费,还是在复利。

所以你只管说一句做了啥,LLM 来干脏活——归类、估时长、写库。它只守一条规矩:**拿不准的时候(多久?哪天?"2h+1h" 是 3 小时还是 2 小时?),它问你,而不是瞎猜。** 一个会偷偷编数据的账本,比没有还糟。

## 这是什么形态

它是一个 **Claude Skill**(就是一份 `SKILL.md` 指令)+ 一个你自己的 **Notion database**。没有服务器、没有要部署的后端。捕获在任何有 Claude 的地方(手机/电脑/对话),数据真相源在你的 Notion(云端、手机原生可看)。

## 安装

**第 0 步 —— 复制 Notion 模板**(两种形式通用): [🇨🇳 中文](https://spiral-jump-106.notion.site/c7e8fde1248f4b4a9b204ccca99c153f) · [🇬🇧 English](https://spiral-jump-106.notion.site/0d3d3d13164241f595aa50679c6c42d8)。一键,字段、视图、示例都含好了。

然后挑你的形式 —— 两种干的是同一件事,只是界面不同:

<table>
<tr>
<th width="50%">⌨️ 终端 · Claude Code</th>
<th width="50%">💬 网页 · Claude.ai</th>
</tr>
<tr>
<td width="50%"><img src="./assets/demo-terminal.gif" alt="终端演示:claude -p 记录时间" width="100%" /></td>
<td width="50%"><img src="./assets/demo-web.gif" alt="claude.ai 网页演示:对话记录时间" width="100%" /></td>
</tr>
<tr>
<td width="50%" valign="top">

1. clone 仓库,把 `SKILL.zh-CN.md` 放到 `~/.claude/skills/time-ledger/SKILL.md` —— **命令在下面 ↓**
2. 加 **Notion MCP 连接器**(把你的「时间账本」库授权给它),重启 Claude Code。
3. 记一笔: `claude -p "记一下:今天看了俩小时论文"`

</td>
<td width="50%" valign="top">

1. **Settings → Capabilities** → 打开 **Code execution and file creation**(*"Required for skills"*)。
2. **[claude.ai/customize/skills](https://claude.ai/customize/skills)** → **+** → Create skill → **Write skill instructions** —— 把名字、描述、正文从 **[`SKILL.zh-CN.md`](./SKILL.zh-CN.md)** 拷进去。
3. **Settings → Connectors → Notion** —— 把你的「时间账本」库授权给它。
4. 直接说"记一下:今天看了俩小时论文"。

</td>
</tr>
</table>

**Claude Code 命令**(中文版用 `SKILL.zh-CN.md`):

```bash
git clone https://github.com/cruisekkk/time-ledger.git
mkdir -p ~/.claude/skills/time-ledger
cp time-ledger/SKILL.zh-CN.md ~/.claude/skills/time-ledger/SKILL.md
```

**两种都一样 —— 不用填 id。** skill 按标题找你的库(保留 `时间账本` / `time-ledger`、只授权这一个),读它的 id,写进去——拿不准就问,不瞎猜。(在 Claude.ai 上第一次写入会弹 **approve** —— Notion 写工具默认 *Needs approval* —— 是正常的,不是卡住了。)

> **改字段** —— 想换分类或语言?在库里改字段,然后把 skill 指令里的枚举同步成一样的(select 值必须对得上)。

## 怎么用

- **直接报**: 随口说做了啥 → AI 解析写入,拿不准的批量问你。
- **批量整理**: 说"整理时间账本" → AI 把"待确认"的行捞出来一次性问清、补齐。
- **看分布**: Notion 自带日历视图 + 按活动 group 汇总;或让 Claude 现场画一张图。

## 诚实的局限

- 得你主动报 —— 它不自动追踪(有意的;追踪器不懂你"为什么"花这时间)。
- `复利 / 消耗 / 中性` 现在是手动规则,不是学出来的 —— 真正的引擎是 roadmap,不是现状。
- n=1:作者一个人用了几天,没大样本验证。
- 暂时没有快速接入 ChatGPT 的办法 —— 它还不像 Claude 那样支持自定义 skill,没有现成接法(Custom GPT 能做,但得重搭)。希望 OpenAI 早点支持自定义 skill。

## 设计哲学

来自一个更大的个人项目(inveself)的一句话:**"你得先成为一个会复利的人,才能做好复利的投资。"** 这个账本是那句话的工具——它诚实地照出你的小时数到底有没有在利滚利(它曾照出作者某周 reading:building ≈ 30:1)。

## License

MIT — 见 [LICENSE](./LICENSE)。拿去改、拿去用、拿去发你自己的版本。
