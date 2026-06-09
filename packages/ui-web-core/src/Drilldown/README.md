# `<instui-drilldown>`

A framework-agnostic (Lit) Web Component port of the React `@instructure/ui-drilldown`,
built as the second stage of the ui-web-core POC (after `<instui-alert>`).

This component is intentionally **not** a feature-complete port. It exists to prove
two things on the most complex InstUI component:

1. The "emotion style-object → CSS string" approach proven on Alert **repeats** —
   here via the shared [`styleObjectToCss`](../theme/styleObjectToCss.ts) converter.
2. Drilldown's **selection + navigation behavior is a single source of truth** shared
   by both the React component and this Web Component, with **zero React dependency**.

## Single source of truth

The selection state machine, controlled-prop sync, page-history navigation, and
keyboard-highlight index math live in framework-neutral, React-free modules inside
the React package and are consumed by both adapters via the `@drilldown/*` source alias:

- `@drilldown/Drilldown/v2/behavior` — `computeInitialSelectionMap`,
  `computeControlledSelectionUpdate`, `reduceGroupSelection`, `selectedValuesInGroup`,
  `reduceGoToPage`, `reduceHighlight`, `previousPageId`
- `@drilldown/Drilldown/v2/types` — neutral unions + the `Neutral*Data` shapes that
  form the boundary between each adapter's child-parsing and the pure reducers
- `@drilldown/Drilldown/v2/styles` — the (now framework-neutral) `generateStyle`

The React adapter produces `NeutralPageData[]` by walking JSX children; this adapter
produces the same shape from its declarative `pages` property. Same reducers, two producers.

## Usage

Children are expressed as a declarative `pages` config (a JS property), not slots —
this maps directly to the reducers' `NeutralPageData[]` and avoids re-parsing a DOM tree.

```ts
import '@instructure/ui-web-core' // registers <instui-drilldown>

const el = document.createElement('instui-drilldown')
el.rootPageId = 'settings'
el.label = 'Account settings'
el.pages = [
  {
    pageId: 'settings',
    title: 'Account settings',
    groups: [
      {
        groupId: 'theme',
        groupTitle: 'Theme',
        selectableType: 'single', // radio
        defaultSelected: ['light'],
        options: [
          { id: 'theme-light', label: 'Light', value: 'light' },
          { id: 'theme-dark', label: 'Dark', value: 'dark' }
        ]
      }
    ]
  }
]
el.addEventListener('instui-drilldown-select', (e) => console.log(e.detail))
```

A group **without** `selectableType` is a plain navigation/link container; options
with a `subPageId` drill into another page.

## Events

- `instui-drilldown-select` — `{ value, isSelected, optionId, groupId? }`. For
  selectable groups `value` is the full array of selected values in the group (even
  for single-select), matching the React `onSelect` contract.
- `instui-drilldown-page-change` — `{ prevPageId, newPageId, pageHistory }`.

## Keyboard

`↑`/`↓` move highlight (wrapping when `rotate-focus`), `Home`/`End` jump,
`Enter`/`Space` activate, `→` drill into a sub-page, `←` go back. The React adapter
delegates this to `<Selectable>`; here raw `keydown` handlers feed the shared
`reduceHighlight`.

## Theming

Tokens come from a sibling `<instui-theme-provider>` (CSS custom properties +
`instui-theme-change` event). `generateStyle` is resolved against
`resolveTheme(...).components.Drilldown`, exactly like `<instui-alert>`.
