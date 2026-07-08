# instui

A Claude Code plugin that teaches Claude to answer Instructure UI (InstUI) questions from
the authoritative plaintext docs at [instructure.design](https://instructure.design) instead
of guessing component APIs from memory.

Once installed, ask Claude anything about InstUI — "how do I use `DateInput` with a controlled
value?", "which props does `Modal` take?", "what theme variables control `Button`'s border?" —
and it will fetch the relevant docs and answer with citations. It activates automatically; no
command to remember.

## Install

In any project (or globally), run in Claude Code:

```
/plugin marketplace add instructure/instructure-ui
/plugin install instui@instructure-ui
```

Then `/plugin` to enable/disable or update it later.

## Team-wide, zero-setup (optional)

To offer the skill to everyone on a project automatically, add to the project's
`.claude/settings.json`:

```json
{
  "extraKnownMarketplaces": {
    "instructure-ui": {
      "source": { "source": "github", "repo": "instructure/instructure-ui" }
    }
  },
  "enabledPlugins": ["instui@instructure-ui"]
}
```

Teammates are prompted to trust and enable it on their next session.
