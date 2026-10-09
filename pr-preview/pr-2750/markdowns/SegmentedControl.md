# SegmentedControl


`SegmentedControl` is a horizontal bar of mutually exclusive options. Use it to
switch between two to five related views or filters in the same context. Only
one option is selected at a time.

Give the control an accessible name with `aria-label` or `aria-labelledby`.
Every option needs a `value`.

```js
---
type: example
---
<SegmentedControl aria-label="Calendar view" defaultValue="week">
  <SegmentedControl.Option value="day" renderLabel="Day" />
  <SegmentedControl.Option value="week" renderLabel="Week" />
  <SegmentedControl.Option value="month" renderLabel="Month" />
</SegmentedControl>
```

### Controlled and uncontrolled

Pass `defaultValue` and let `SegmentedControl` track the selection. Or pass
`value` together with `onChange` to control it yourself. `onChange` receives the
event and the `value` of the option the user selected.

```js
---
type: example
---
const Example = () => {
  const [view, setView] = useState('grid')

  return (
    <View as="div">
      <SegmentedControl
        aria-label="Layout"
        value={view}
        onChange={(event, value) => setView(value)}
      >
        <SegmentedControl.Option value="grid" renderLabel="Grid" />
        <SegmentedControl.Option value="list" renderLabel="List" />
        <SegmentedControl.Option value="table" renderLabel="Table" />
      </SegmentedControl>
      <View as="div" margin="general.spaceMd 0 0">
        Selected: {view}
      </View>
    </View>
  )
}

render(<Example />)
```

### Sizes

The `size` prop accepts `lg` (the default), `md`, and `sm`. Use `lg` in most
places, `md` in tighter layouts or secondary areas, and `sm` in compact toolbars
or inline controls.

```js
---
type: example
---
<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}>
  <SegmentedControl aria-label="Large" size="lg" defaultValue="one">
    <SegmentedControl.Option value="one" renderLabel="One" />
    <SegmentedControl.Option value="two" renderLabel="Two" />
    <SegmentedControl.Option value="three" renderLabel="Three" />
  </SegmentedControl>
  <SegmentedControl aria-label="Medium" size="md" defaultValue="one">
    <SegmentedControl.Option value="one" renderLabel="One" />
    <SegmentedControl.Option value="two" renderLabel="Two" />
    <SegmentedControl.Option value="three" renderLabel="Three" />
  </SegmentedControl>
  <SegmentedControl aria-label="Small" size="sm" defaultValue="one">
    <SegmentedControl.Option value="one" renderLabel="One" />
    <SegmentedControl.Option value="two" renderLabel="Two" />
    <SegmentedControl.Option value="three" renderLabel="Three" />
  </SegmentedControl>
</div>
```

### Text, icons, and both

An option shows text with `renderLabel`, an icon with `renderIcon`, or both.
Don't mix icon-only and text-only options in one control.

An option with no `renderLabel` needs a `screenReaderLabel`. Without it, screen
readers can't name the option.

```js
---
type: example
---
<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}>
  <SegmentedControl aria-label="Layout with icons and text" defaultValue="grid">
    <SegmentedControl.Option value="grid" renderIcon={<LayoutGridInstUIIcon />} renderLabel="Grid" />
    <SegmentedControl.Option value="list" renderIcon={<ListInstUIIcon />} renderLabel="List" />
  </SegmentedControl>
  <SegmentedControl aria-label="Layout with icons only" defaultValue="grid">
    <SegmentedControl.Option value="grid" renderIcon={<LayoutGridInstUIIcon />} screenReaderLabel="Grid view" />
    <SegmentedControl.Option value="list" renderIcon={<ListInstUIIcon />} screenReaderLabel="List view" />
  </SegmentedControl>
</div>
```

### Disabled

Set `isDisabled` on `SegmentedControl` to disable every option. Set it on a
single `SegmentedControl.Option` to disable just that one.

```js
---
type: example
---
<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}>
  <SegmentedControl aria-label="Whole control disabled" isDisabled defaultValue="day">
    <SegmentedControl.Option value="day" renderLabel="Day" />
    <SegmentedControl.Option value="week" renderLabel="Week" />
    <SegmentedControl.Option value="month" renderLabel="Month" />
  </SegmentedControl>
  <SegmentedControl aria-label="One option disabled" defaultValue="day">
    <SegmentedControl.Option value="day" renderLabel="Day" />
    <SegmentedControl.Option value="week" renderLabel="Week" isDisabled />
    <SegmentedControl.Option value="month" renderLabel="Month" />
  </SegmentedControl>
</div>
```

### Accessibility

`SegmentedControl` renders a `radiogroup` and each option is a `radio`. Give the group a name with `aria-label` or `aria-labelledby`, and give every icon-only option a `screenReaderLabel`.

Only the selected option (or the first enabled one, when nothing is selected) is in the tab order. The arrow keys move focus to the next or previous enabled option and select it. In right-to-left layouts, Arrow Left and Arrow Right swap. Home and End jump to the first and last enabled option. Options must be direct children of `SegmentedControl`.

### Guidelines

```js
---
type: embed
---
<Guidelines>
  <Figure recommendation="yes" title="Do">
    <Figure.Item>Switch between two to five related views or filters in the same context</Figure.Item>
    <Figure.Item>Offer mutually exclusive options where only one can be active at a time</Figure.Item>
    <Figure.Item>Keep option labels short and similar in length</Figure.Item>
    <Figure.Item>Pre-select a default option so users can see the current state</Figure.Item>
  </Figure>
  <Figure recommendation="no" title="Don't">
    <Figure.Item>Use more options than fit comfortably in one row (use <Link href="/#Tabs">Tabs</Link> or <Link href="/#SimpleSelect">SimpleSelect</Link> instead)</Figure.Item>
    <Figure.Item>Use it when options aren't mutually exclusive (use <Link href="/#Checkbox">Checkbox</Link> or <Link href="/#Toggle">Toggle</Link> instead)</Figure.Item>
    <Figure.Item>Use it to trigger actions (use <Link href="/#Button">Button</Link> instead)</Figure.Item>
  </Figure>
</Guidelines>
```


### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| SegmentedControl | children | `ReactNode` | No | - | The `SegmentedControl.Option` elements to render, as direct children. |
| SegmentedControl | value | `string` | No | - | The value of the selected option, which makes the component controlled. |
| SegmentedControl | defaultValue | `string` | No | - | The value of the option selected on first render when uncontrolled. |
| SegmentedControl | onChange | `(event: SyntheticEvent, value: string) => void` | No | - | Called with the event and the value of the option the user selected. |
| SegmentedControl | size | `'sm' \| 'md' \| 'lg'` | No | - | The size of the control and its options. |
| SegmentedControl | isDisabled | `boolean` | No | - | Disables every option. |
| SegmentedControl.SegmentedControlOption | value | `string` | Yes | - | The value passed to the `onChange` of the parent `SegmentedControl` when this option is selected. |
| SegmentedControl.SegmentedControlOption | renderLabel | `Renderable` | No | - | The text shown in the option. |
| SegmentedControl.SegmentedControlOption | renderIcon | `Renderable` | No | - | An icon shown in the option, before the label when both are given. |
| SegmentedControl.SegmentedControlOption | screenReaderLabel | `string` | No | - | The accessible name of the option, required when it has no `renderLabel`. |
| SegmentedControl.SegmentedControlOption | isDisabled | `boolean` | No | - | Disables this option. |

### Usage

Install the package:

```shell
npm install @instructure/ui-segmented-control
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { SegmentedControl } from '@instructure/ui-segmented-control/v11_7'
```

