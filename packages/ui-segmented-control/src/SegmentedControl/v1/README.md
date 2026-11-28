---
describes: SegmentedControl
---

`SegmentedControl` is a horizontal bar of mutually exclusive options. Use it to
switch between two to five related views or filters in the same context. Only
one option is selected at a time.

Every option needs a `value`, the string that identifies it in `value`, `defaultValue` and `onChange`.

### Accessibility

`SegmentedControl` renders a `radiogroup` and each option is a `radio`. Give the group a name with `aria-label` or `aria-labelledby`, and give every icon-only option a `screenReaderLabel`.

Only the selected option (or the first one, when nothing is selected) is in the tab order. The arrow keys move focus to the next or previous option without selecting it, so users can browse before they choose. Space and Enter select the focused option. The arrow keys stop at the first and last option instead of wrapping, and Tab leaves the control. In right-to-left layouts, Arrow Left and Arrow Right swap. Home and End jump to the first and last option. Options must be direct children of `SegmentedControl`.

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
        <Text>Selected: {view}</Text>
      </View>
    </View>
  )
}

render(<Example />)
```

### Sizes

The `size` prop accepts `medium` (the default), `large`, and `small`. Use `medium` in most
places, `large` where the control needs more prominence, and `small` in compact
toolbars or inline controls.

```js
---
type: example
---
<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}>
  <SegmentedControl aria-label="Large" size="large" defaultValue="one">
    <SegmentedControl.Option value="one" renderLabel="One" />
    <SegmentedControl.Option value="two" renderLabel="Two" />
    <SegmentedControl.Option value="three" renderLabel="Three" />
  </SegmentedControl>
  <SegmentedControl aria-label="Medium" size="medium" defaultValue="one">
    <SegmentedControl.Option value="one" renderLabel="One" />
    <SegmentedControl.Option value="two" renderLabel="Two" />
    <SegmentedControl.Option value="three" renderLabel="Three" />
  </SegmentedControl>
  <SegmentedControl aria-label="Small" size="small" defaultValue="one">
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

### Overflow

When the options don't fit the available width, they stay on one row and scroll. Set `renderPreviousLabel` and `renderNextLabel` to also show arrow buttons over the edges of the control, each only while there are options to scroll to in that direction. Both labels are needed so screen readers can name the arrows. The control fills at most the width of its container, so put it in a container of the width you want to limit it to.

```js
---
type: example
---
<div style={{ width: '20rem' }}>
  <SegmentedControl
    aria-label="Month"
    renderPreviousLabel="Show earlier months"
    renderNextLabel="Show later months"
    defaultValue="jan"
  >
    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'].map((month) => (
      <SegmentedControl.Option key={month} value={month.toLowerCase()} renderLabel={month} />
    ))}
  </SegmentedControl>
</div>
```

### Guidelines

```js
---
type: embed
---
<Guidelines>
  <Figure recommendation="yes" title="Do">
    <Figure.Item>Change how the same content is shown, such as a day, week or month view of one calendar</Figure.Item>
    <Figure.Item>Offer mutually exclusive options where only one can be active at a time</Figure.Item>
    <Figure.Item>Keep option labels short and similar in length</Figure.Item>
    <Figure.Item>Pre-select a default option so users can see the current state</Figure.Item>
  </Figure>
  <Figure recommendation="no" title="Don't">
    <Figure.Item>Navigate between separate sections of content (use <Link href="/#Tabs">Tabs</Link> instead)</Figure.Item>
    <Figure.Item>Offer a long list of choices (use <Link href="/#SimpleSelect">SimpleSelect</Link> instead)</Figure.Item>
    <Figure.Item>Use it when options aren't mutually exclusive (use <Link href="/#Checkbox">Checkbox</Link> or <Link href="/#Toggle">Toggle</Link> instead)</Figure.Item>
    <Figure.Item>Use it to trigger actions (use <Link href="/#Button">Button</Link> instead)</Figure.Item>
  </Figure>
</Guidelines>
```
