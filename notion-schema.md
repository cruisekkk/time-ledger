# Notion database template

time-ledger writes into **your own** Notion database. Create one like this — a few minutes.

## Fields (7)

Create a new database in Notion and add these properties:

| Field | Type | Options / notes |
|---|---|---|
| `Entry` | **Title** | the built-in title column, renamed to "Entry". Stores the user's words or a clear title. |
| `Activity` | **Select** | options: `Reading` `Coding` `Practice` `Fitness` `Investing` `Meeting` `Writing` `Life` `Other` |
| `Minutes` | **Number** | duration in minutes |
| `Date` | **Date** | when this activity happened |
| `Status` | **Select** | options: `To-sort` `To-confirm` `Done` |
| `Compounding` | **Select** | options: `Compounding` `Consuming` `Neutral` |
| `Notes` | **Text** | clue from the user's words / the agent's question |

> **Want different categories or languages?** Go ahead — change the field names and select options, then sync the enum in `SKILL.md` to match. Keeping both sides consistent is the only requirement.

## Recommended views

- **Table** (default) — entry + overview
- **Calendar** (by `Date`) — see your time distribution at a glance
- **Board / rollup** (group by `Activity`, sum `Minutes`) — see which category eats the most time
- optional **Chart** (donut, by `Activity`) — share of each category

## Getting your data_source_id (needed when installing the skill)

`SKILL.md` needs a `DATA_SOURCE_ID`. Two ways:

1. **Ask Claude (easiest)**: with Notion connected, tell Claude *"fetch my database &lt;paste the Notion URL&gt; and give me the data_source_id"*. It returns a `collection://...` id — take the UUID after `collection://`.
2. **From the URL**: the 32-hex string in the database URL is the database id; the data source id is typically surfaced by Claude's fetch tool as a `<data-source url="collection://...">` tag.

Put the UUID into `SKILL.md` where it says `<YOUR_NOTION_DATA_SOURCE_ID>`, and you're set.
