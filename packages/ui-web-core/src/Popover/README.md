# `<instui-popover>`

Framework-agnostic (Lit) port of the React `@instructure/ui-popover`, POC stage 3
(after `<instui-alert>` and `<instui-drilldown>`). Popover is the other major
React-coupled dependency inside Drilldown's `trigger` mode, so this both adds a
standalone component and lets the two extracted Lit components **compose** (see
`<instui-drilldown>`'s trigger mode).

## What is shared vs reused

- **Single source of truth (extracted, React-free):** the controlled/uncontrolled
  show/hide state machine + trigger/placement helpers in
  `@popover/Popover/v2/behavior` (`resolveShown`, `resolveShowIntent`,
  `resolveHideIntent`, `resolveToggleIntent`, `resolveActiveTriggers`, `isTooltip`,
  `resolvePlacement`). Both the React Popover and this element consume them.
- **Positioning (reused as-is):** `calculateElementPosition` from
  `@instructure/ui-position` is already framework-free — imported directly via the
  `@position/*` alias, no extraction needed.
- **Focus (reused as-is):** `FocusRegion` from `@instructure/ui-a11y-utils`
  (React-free at runtime) drives contain/return focus, Escape, and click-outside
  dismissal via its `onDismiss` callback.

## Usage

Trigger and content are slots; the positioned content is portaled to
`document.body` so `calculateElementPosition`'s body-relative coordinates are
valid (scoped chrome styles are inlined into the portal).

```html
<instui-popover
  placement="bottom center"
  should-contain-focus
  should-return-focus
>
  <button slot="trigger">Open</button>
  <div>…focusable content…</div>
</instui-popover>
```

- Controlled: set the `el.isShowingContent = true|false` **property** (not an
  attribute — a Boolean attribute defaults to `false` and would break the
  `undefined`-means-uncontrolled contract). Uncontrolled: `default-is-showing-content`.
- Public methods/getter: `show()`, `hide()`, `toggle()`, `shown` — the contract
  `<instui-drilldown>` depends on.
- Events: `instui-popover-show`; `instui-popover-hide` (`detail: { documentClick }`).

## POC scope & known gaps

- `on='click'` only — no hover/focus triggers, no tooltip mode, no arrow.
- Reposition on scroll/resize uses native window listeners (not ui-position's
  `addPositionChangeListener`), sufficient for the common cases.
- **`shouldContainFocus` into a nested custom element's shadow root is partial:**
  `FocusRegion`'s `findTabbable` / screen-reader ancestor walk do not cross shadow
  boundaries. When the content is itself a web component (e.g. `<instui-drilldown>`),
  rely on that component's own keyboard handling for intra-panel focus; the popover's
  FocusRegion still provides return-focus + close-on-outside/Escape.

## Theming

Tokens come from a sibling `<instui-theme-provider>`; `generateStyle` is resolved
against `resolveTheme(...).components.Popover` and re-applied on `instui-theme-change`.
