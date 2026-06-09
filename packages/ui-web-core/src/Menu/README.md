# `<instui-menu>`

Framework-agnostic (Lit) port of the React `@instructure/ui-menu`, POC stage 4
(after Alert → Drilldown → Popover). Menu's trigger/flyout mode uses
`@instructure/ui-popover`, so this stage **composes** the already-extracted
`<instui-popover>` for both its dropdown mode and its flyout submenus.

## What is shared vs reused

- **Single source of truth (extracted, React-free):** `@menu/Menu/v2/behavior` —
  `updateGroupSelection` (radio/checkbox array reducer), `resolveItemSelected`,
  `resolveGroupSelectedValues`, `itemTypeForGroup`, `nextFocusIndex` (roving-focus
  math), `computeInitialGroupSelection`. Both the React Menu and this element
  consume them. Menu's selection is **distributed** (a value array per group + a
  boolean per item) — intentionally not a centralized map like Drilldown.
- **Popover (reused):** dropdown + flyout submenus nest `<instui-popover>`.

## Usage

Content is a declarative `items` config property (groups / separators / items;
an item with nested `items` is a flyout submenu):

```ts
import '@instructure/ui-web-core' // registers <instui-menu>

const el = document.createElement('instui-menu')
el.items = [
  { id: 'new', label: 'New', value: 'new' },
  { separator: true, id: 's1' },
  {
    groupId: 'view',
    label: 'View',
    allowMultiple: false,
    defaultSelected: ['grid'],
    items: [
      { id: 'grid', label: 'Grid', value: 'grid' },
      { id: 'list', label: 'List', value: 'list' }
    ]
  },
  {
    id: 'share',
    label: 'Share',
    items: [
      /* nested submenu items */
    ]
  }
]
el.addEventListener('instui-menu-select', (e) => console.log(e.detail))
```

- Event: `instui-menu-select` — `{ value, selected, groupId? }`.
- Keyboard: ↑/↓ (and PageUp/PageDown) roving focus, Home/End, Enter/Space activate,
  → opens a flyout, ← closes a flyout (returns focus to the parent item).
- **Dropdown mode:** compose with `<instui-popover>` (see the `Dropdown` story);
  wire `shouldHideOnSelect` by calling `popover.hide()` from `instui-menu-select`.

## Flyout submenus + the focus constraint

Each flyout item renders a nested `<instui-popover>` whose content is a child
`<instui-menu>` built from the item's nested `items`. Because `FocusRegion`'s
`findTabbable` / screen-reader walk **do not cross shadow boundaries**, the nested
popover cannot focus or arrow-navigate the child menu's items. So **the menu owns
all roving focus**: after opening, the parent imperatively calls the child's
`focusFirstItem()`; the popover provides only outside-click/Escape/return-focus.
Active-submenu tracking closes the previous flyout when focus moves to a sibling.

## POC scope

`on='click'` dropdown + hover/Right-arrow flyouts. Theming via a sibling
`<instui-theme-provider>` (tokens resolved from `resolved.components.{Menu,MenuItem,MenuGroup}`).
