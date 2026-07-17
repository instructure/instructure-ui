// @ts-nocheck
// Tag per-instance `themeOverride`: `padding` removed (warns), `defaultIconColor`
// removed (silent), `inlineIconColor` kept (still exists in v2, despite the
// upgrade guide).
import { Tag } from '@instructure/ui-tag/v11_7'

const test = () => (
  <Tag
    text="x"
    themeOverride={{
      padding: '0 1rem',
      defaultIconColor: 'red',
      inlineIconColor: 'blue'
    }}
  />
)
