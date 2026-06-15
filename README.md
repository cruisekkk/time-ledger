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

Every manual time log dies of the same thing: **logging friction**. RescueTime/Toggl auto-track but don't know *what* you were doing or *why*; manual forms are accurate but you quit in three days.

time-ledger drops the friction to zero: **you talk, the LLM does the grunt work** (categorize, estimate duration, write the row). What sets it apart from other "AI logging" is one **honesty contract**:

> When it's unsure (how long? which category? which day? is "2h + 1h" three hours, or is the second inside the first?), it **flags it and batch-asks you** — instead of filling in a guess.

This matters: language models are trained to *guess rather than abstain* (see OpenAI's *Why Language Models Hallucinate*, [arXiv 2509.04664](https://arxiv.org/abs/2509.04664)). A tool that **records facts for you** is worthless if it also guesses. So time-ledger inverts the default — **when unsure, ask.**

## What it is

A **Claude skill** (a single `SKILL.md` of instructions) + your own **Notion database**. No server, no backend to deploy. Capture anywhere you have Claude (phone / laptop / chat); the source of truth lives in your Notion (cloud, phone-native).

## Install (~3 min, zero-config)

**Prerequisites**: a Notion account + Claude (Claude Code, or Claude.ai with the Notion connector enabled).

1. **Duplicate the Notion template** — one click, nothing to build (fields, views, and example rows included):
   - 🇬🇧 English: [**Duplicate the `time-ledger` template →**](<EN_TEMPLATE_LINK>)
   - 🇨🇳 中文: [**复制「时间账本」模板 →**](<ZH_TEMPLATE_LINK>)
2. **Install the skill** — drop one into `~/.claude/skills/time-ledger/SKILL.md`:
   - English → [`SKILL.md`](./SKILL.md)  ·  中文 → [`SKILL.zh-CN.md`](./SKILL.zh-CN.md)
   - *No id to paste — the skill auto-finds your duplicated database by name.*
3. **Connect Notion** — make sure your Claude is connected to Notion (Claude Code: add the Notion MCP connector; Claude.ai: Settings → Connectors → Notion).
4. **Start logging** — tell Claude *"log it: wrote code for three hours today."*

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
