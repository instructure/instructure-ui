# Banner


A `Banner` is a promotional message used to proactively surface a feature,
offer, event, or announcement. Unlike `Alert`, a `Banner` doesn't communicate
system or account status — use `Alert` for that instead.

```js
---
type: example
---
<Banner header="Banner header" onDismiss={() => {}}>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
  tempor incididunt ut labore et dolore magna aliqua.
</Banner>
```
A `Banner` is a promotional message used to proactively surface a feature,
offer, event, or announcement. It communicates something proactive, not a
system or account status — use [Alert](#Alert) for status, warnings, and
confirmations that need to interrupt and be responded to.

### Default

By default, `Banner` is dismissible and shows an optional header, body copy,
and a single primary action.

```js
---
type: example
---
<Banner header="Banner header" onDismiss={() => {}}>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
  tempor incididunt ut labore et dolore magna aliqua.
</Banner>
```

### Colors

Use `color` to choose the visual treatment that best fits the surrounding
page.

```js
---
type: example
---
<div>
  <Banner
    color="violet"
    header="Banner header"
    onDismiss={() => {}}
    margin="0 0 medium 0"
  >
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  </Banner>
  <Banner color="sea" header="Banner header" onDismiss={() => {}}>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  </Banner>
</div>
```

### Density

Use `density="compact"` when there's less room for the banner, such as inside
a smaller container.

```js
---
type: example
---
<Banner density="compact" header="Banner header" onDismiss={() => {}}>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
</Banner>
```

### Dismissible

Reserve `dismissible={false}` for time-sensitive or recurring campaign
banners, where the user shouldn't lose track of the message. A `Banner` is a
controlled component — it does not manage its own visibility, so mount and
unmount it based on your own state in `onDismiss`.

```js
---
type: example
---
<Banner dismissible={false} header="Banner header">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
</Banner>
```

### Actions

Use `renderPrimaryAction` when there's a next step for the user to take, and
`renderSecondaryAction` for at most one additional action. Don't use actions
for page navigation — link the header or message text instead.

```js
---
type: example
---
<Banner
  header="Banner header"
  onDismiss={() => {}}
  renderPrimaryAction={() => <Button color="primary">Learn more</Button>}
  renderSecondaryAction={() => (
    <Button color="primary" withBackground={false}>
      Dismiss for now
    </Button>
  )}
>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
</Banner>
```

### Icon

`renderIcon` accepts a function that returns a decorative icon or
illustration. It's treated as purely decorative, so don't rely on it to
convey information — put anything meaningful in the header or body copy.

```js
---
type: example
---
<Banner
  header="Banner header"
  onDismiss={() => {}}
  renderIcon={() => <SearchInstUIIcon />}
>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
</Banner>
```

### Guidelines

```js
---
type: embed
---
<Guidelines>
  <Figure recommendation="a11y" title="Accessibility">
    <Figure.Item>The icon is decorative; don't rely on it to convey meaning</Figure.Item>
    <Figure.Item>The dismiss button always needs an accessible label</Figure.Item>
  </Figure>
</Guidelines>
```


### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| Banner | color | `'violet' \| 'sea'` | No | `'violet'` | The visual color treatment of the `Banner`. |
| Banner | density | `'relaxed' \| 'compact'` | No | `'relaxed'` | Controls the padding and internal spacing of the `Banner`. Use `compact` when there's less real estate for the banner such as smaller containers. |
| Banner | dismissible | `boolean` | No | `true` | Whether the `Banner` can be dismissed by the user. Reserve `false` for time-sensitive or recurring campaign banners where the user shouldn't lose track of the message. |
| Banner | onDismiss | `() => void` | No | - | Callback fired when the user dismisses the `Banner`. Required when `dismissible` is `true` — the `Banner` does not manage its own visibility. |
| Banner | closeButtonLabel | `ReactNode` | No | `'Close banner'` | An accessible label for the dismiss button. |
| Banner | renderIcon | `() => ReactNode` | No | - | A function returning a decorative icon or illustration to render at the start of the `Banner`. Treated as purely decorative — pass meaningful content via `children` instead. |
| Banner | header | `ReactNode` | No | - | An optional title for the `Banner`. |
| Banner | children | `ReactNode` | No | - | The body content of the `Banner`. |
| Banner | renderPrimaryAction | `() => ReactNode` | No | - | A function returning the primary action element (for example, a `Button`). Don't use this for page navigation — link the title or message instead. |
| Banner | renderSecondaryAction | `() => ReactNode` | No | - | A function returning a secondary action element. Only rendered alongside a primary action. |
| Banner | elementRef | `(element: Element \| null) => void` | No | - | Provides a reference to the `Banner`'s underlying html element. |
| Banner | margin | `Spacing` | No | - | Valid values are `0`, `none`, `auto`, and Spacing token values, see https://instructure.design/layout-spacing. Apply these values via familiar CSS-like shorthand. For example, `margin="general.spaceMd auto"`. |

### Usage

Install the package:

```shell
npm install @instructure/ui-banner
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { Banner } from '@instructure/ui-banner/v11_7'
```

