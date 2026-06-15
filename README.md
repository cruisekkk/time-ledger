# time-ledger

**English** | [简体中文](README.zh-CN.md)

**Track your time in one sentence.** You say what you did in plain language — *"read ML papers for two hours, hit the gym for one, did a LeetCode problem"* — and an AI parses it into structured activity / minutes / date and writes it to your own Notion database. **When it isn't sure, it asks you back instead of guessing.**

Not a timer. Not a form. A mirror for whether your hours are actually compounding.

```
You:  read ML system design for two hours, gym for one, did a leetcode
AI:   Logged 3 entries ✅
      · Reading · ML system design · 120min · compounding
      · Fitness · gym · 60min
      · LeetCode · ~20min ❓ to-confirm: you didn't say how long — I guessed 20min, right?
```

## Why

I'm lazy — I won't keep a form going — but I do want to know where my time goes: am I wasting it, or compounding it?

So you just say what you did, and the LLM does the grunt work — categorize it, estimate the duration, write the row. Its one rule: **when it's unsure (how long? which day? is "2h + 1h" three hours, or two?), it asks instead of guessing.** A log that quietly invents facts is worse than no log at all.

## What it is

A **Claude skill** (a single `SKILL.md` of instructions) + your own **Notion database**. No server, no backend to deploy. Capture anywhere you have Claude (phone / laptop / chat); the source of truth lives in your Notion (cloud, phone-native).

## Install

**Step 0 — duplicate the Notion template** (same for both forms): [🇬🇧 English](https://spiral-jump-106.notion.site/0d3d3d13164241f595aa50679c6c42d8) · [🇨🇳 中文](https://spiral-jump-106.notion.site/c7e8fde1248f4b4a9b204ccca99c153f). One click; fields, views, and example rows included.

Then pick your form — both do the same thing, just a different surface:

<table>
<tr>
<th width="50%">⌨️ Terminal · Claude Code</th>
<th width="50%">💬 Web · Claude.ai</th>
</tr>
<tr>
<td width="50%"><img src="./assets/demo-terminal.gif" alt="terminal demo: claude -p logs your time" width="100%" /></td>
<td width="50%"><img src="./assets/demo-web.gif" alt="claude.ai web demo: chat logs your time" width="100%" /></td>
</tr>
<tr>
<td width="50%" valign="top">

1. Clone the repo and drop `SKILL.md` into `~/.claude/skills/time-ledger/` — **commands below ↓**
2. Add the **Notion MCP connector** (grant your `time-ledger` DB), then restart Claude Code.
3. Log: `claude -p "log it: read papers 2h today"`

</td>
<td width="50%" valign="top">

1. **Settings → Capabilities** → turn on **Code execution and file creation** (*"Required for skills"*).
2. **[claude.ai/customize/skills](https://claude.ai/customize/skills)** → **+** → Create skill → **Write skill instructions** — paste the name, description, and body from **[`SKILL.md`](./SKILL.md)**.
3. **Settings → Connectors → Notion** — grant access to your `time-ledger` database.
4. Just say *"log it: read papers 2h today."*

</td>
</tr>
</table>

**Claude Code commands** (中文 → swap `SKILL.md` for `SKILL.zh-CN.md`):

```bash
git clone https://github.com/cruisekkk/time-ledger.git
mkdir -p ~/.claude/skills/time-ledger
cp time-ledger/SKILL.md ~/.claude/skills/time-ledger/SKILL.md
```

**Either way — no id to paste.** The skill finds your database by title (keep `time-ledger` / `时间账本` in it, and share just that one), reads its id, and writes the row — asking instead of guessing when it's unsure. (On Claude.ai the first write pops an **approve** prompt — Notion's write tools default to *Needs approval* — so it's expected, not a hang.)

> **Customize** — want different categories or another language? Change the fields in your database, then mirror them in the skill's instructions (the select values must match).

## Usage

- **Just report**: say what you did → the AI parses and writes it, batch-asking on anything uncertain.
- **Batch reconcile**: say *"tidy up my time ledger"* → the AI pulls every `待确认` (to-confirm) row and asks you in one message, then fills them in.
- **See the breakdown**: Notion's built-in calendar view + group-by-activity sum; or ask Claude to draw a chart on the spot.

## Honest limitations

- **Depends on Claude + Notion**: this is a skill, not a standalone program. Without both, it doesn't run.
- **Relies on you reporting**: it doesn't auto-track (deliberately — auto-tracking doesn't know *why* you spent the time). If you don't say it, it doesn't know.
- **Compounding tags are a manual heuristic**: `compounding / consuming / neutral` are hand-tagged by rules today, not learned. A real "compounding engine" is on the roadmap, not in the repo.
- **n=1**: the author used it solo for a handful of days; no large-sample validation.

## Design philosophy

From a larger personal project (inveself), one line: **"You have to become a compounding *person* before you can be a good compounding *investor*."** This ledger is the tool for that line — it honestly mirrors whether your hours compound (it once showed the author a week of reading:building ≈ 30:1).

## License

MIT — see [LICENSE](./LICENSE). Fork it, use it, ship your own version.
