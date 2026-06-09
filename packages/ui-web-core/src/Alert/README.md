## Alert (Lit Web Component)

`<instui-alert>` is the Lit Web Component port of `@instructure/ui-alerts`'s
v2 Alert. It reuses the React-free pieces of v2 Alert directly via the
`@alerts/*` source alias — `generateStyle` for conditional CSS, the behavior
controllers for live regions / timers / keyboard, and the neutral type
definitions for the public API — so the visual and behavioral contract stays
locked in lock-step with the React component.

### Variants

| variant   | Icon (Lucide)  | Border / icon background      |
| --------- | -------------- | ----------------------------- |
| `info`    | info           | `--components-Alert-info*`    |
| `success` | circle-check   | `--components-Alert-success*` |
| `warning` | triangle-alert | `--components-Alert-warning*` |
| `error`   | circle-x       | `--components-Alert-danger*`  |

### Attributes

- `variant` — `'info' \| 'success' \| 'warning' \| 'error'`. Default `'info'`.
- `has-shadow` — boolean, default `true`.
- `open` — boolean, reflects. Flipping from true to false dismisses the alert.
- `transition` — `'none' \| 'fade'`. Default `'fade'`.
- `timeout` — number (ms). Auto-dismiss after this many ms. `0` disables.
- `render-close-button-label` — string. Setting the attribute renders a close
  button labeled with this string. Escape key also closes when this is set.
- `variant-screen-reader-label` — string. Read by assistive tech when an alert
  appears.
- `live-region-selector` — CSS selector that resolves to the screen-reader
  live region element. Use the `liveRegion` _property_ instead when you need
  to pass an Element or `() => Element` directly.
- `live-region-politeness` — `'polite' \| 'assertive'`. Default `'assertive'`.
- `is-live-region-atomic` — boolean. Default `false`.
- `screen-reader-only` — boolean. Hides the visual alert; SR content still
  goes to the live region.
- `theme-name` — `'defaultTheme' \| 'contrastTheme' \| 'darkTheme' \| 'lightTheme'`.
  Auto-updated when a sibling `<instui-theme-provider>` fires `instui-theme-change`.

### Events

- `instui-alert-dismiss` — bubbles + composed. Fires when the alert finishes
  dismissing (after the fade transition; immediately for `transition="none"`
  or `screen-reader-only`).

### Example

```html
<instui-theme-provider>
  <div id="sr-live" role="alert"></div>

  <instui-alert
    variant="success"
    variant-screen-reader-label="Success,"
    live-region-selector="#sr-live"
    render-close-button-label="Close"
    timeout="5000"
  >
    Your changes were saved.
  </instui-alert>
</instui-theme-provider>
```

### Re-used pieces from `@instructure/ui-alerts`

These are imported via the `@alerts/*` source alias declared in
`ui-web-core/tsconfig.json` and `.storybook/main.ts`:

- `@alerts/Alert/v2/types` — `AlertVariant`, `AlertTransition`,
  `AlertLiveRegion(Politeness)`, `AlertCorePropsOf`, etc.
- `@alerts/Alert/v2/styles` — `generateStyle(componentTheme, props, sharedTokens)`
  returns the same Emotion-shaped object the React Alert renders. The Lit
  Alert flattens that into a CSS string scoped to its shadow root.
- `@alerts/Alert/v2/behavior` — `AlertLiveRegionController`,
  `createDismissTimer`, `shouldCloseOnKey`, `describeScreenReaderContent`,
  `resolveLiveRegion`.
