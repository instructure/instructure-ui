# ProgressCircle


`<ProgressCircle />` is a 🍩 styled HTML `<progress />` element, complete
with the aria attributes required to support screen readers.

### `size`, `shouldAnimateOnMount`, `animationDelay`

```js
---
type: example
---
<div>
  <ProgressCircle
    size="x-small"
    screenReaderLabel="Loading completion"
    valueNow={40}
    valueMax={60}
    margin="0 small 0 0"
    shouldAnimateOnMount
  />
  <ProgressCircle
    size="small"
    screenReaderLabel="Loading completion"
    valueNow={40}
    valueMax={60}
    margin="0 small 0 0"
    shouldAnimateOnMount
    animationDelay={2000}
  />
  <ProgressCircle
    screenReaderLabel="Loading completion"
    valueNow={40}
    valueMax={60}
    margin="0 small 0 0"
    shouldAnimateOnMount
    animationDelay={4000}
    formatScreenReaderValue={function ({ valueNow, valueMax }) {
      return valueNow + ' out of ' + valueMax
    }}
    renderValue={function ({ valueNow, valueMax }) {
      return (
        <span>
          <Text size="large" weight="bold">{valueNow}</Text>
          <br />
          <Text size="small">/&nbsp;</Text>
          <Text size="small">{valueMax}</Text>
        </span>
      )
    }}
  />
  <ProgressCircle
    size="large"
    screenReaderLabel="Loading completion"
    valueNow={40}
    valueMax={60}
    shouldAnimateOnMount
    animationDelay={6000}
    formatScreenReaderValue={function ({ valueNow, valueMax }) {
      const passing = valueNow > (valueMax / 2) ? 'pass' : 'fail'
      return `${valueNow} of ${valueMax}: ${passing}`
    }}
    renderValue={function ({ valueNow, valueMax }) {
      if (valueNow > (valueMax / 2)) {
        return (
          <Text weight="bold" size="large">
            PASS
          </Text>
        )
      } else {
        return (
        <Text weight="bold" size="large">
          FAIL
        </Text>
        )
      }
    }}
  />
</div>
```

### `color`

`<ProgressCircle />`'s `color` property controls the overall color scheme of the
component. Set it to `primary-inverse` when the component is used on dark backgrounds.

```js
---
type: example

---
<View background="primary-inverse" as="div">
  <ProgressCircle
    screenReaderLabel="Loading completion"
    color="primary-inverse"
    valueNow={50}
    valueMax={60}
  />
</View>
```

### `meterColor`

The color of the progress meter is set separately through the `meterColor` property.

```js
---
type: example
---
<div>
  <ProgressCircle
    screenReaderLabel="Loading completion"
    meterColor="info"
    valueNow={40}
    valueMax={60}
    margin="0 0 small"
  />
  <ProgressCircle
    screenReaderLabel="Loading completion"
    meterColor="success"
    valueNow={40}
    valueMax={60}
    margin="0 0 small"
  />
  <ProgressCircle
    screenReaderLabel="Loading completion"
    meterColor="alert"
    valueNow={40}
    valueMax={60}
    margin="0 0 small"
  />
  <ProgressCircle
    screenReaderLabel="Loading completion"
    meterColor="warning"
    valueNow={40}
    valueMax={60}
    margin="0 0 small"
  />
  <ProgressCircle
    screenReaderLabel="Loading completion"
    meterColor="danger"
    valueNow={40}
    valueMax={60}
    margin="0 0 small"
  />
</div>
```

`meterColor` can also be passed in as a function that takes `valueNow / valueMax`
as parameters. This allows you to adjust the color of the meter based on the
current value.

```js
---
type: example
---
<ProgressCircle
  screenReaderLabel="Loading completion"
  meterColor={({ valueNow, valueMax }) => {
    if (valueNow < 20) {
      return 'danger'
    } else if (valueNow / valueMax >= 1) {
      return 'success'
    } else {
      return 'info'
    }
  }}
  valueNow={10}
  valueMax={60}
/>
```

> `<ProgressCircle />` defaults to setting the meter color to `success` when
> complete.

### `renderValue` / `formatScreenReaderValue`

Via the `renderValue` prop, developers can use `valueMax` and `valueNow` props to format the
value that `<ProgressCircle />` displays.

> `renderValue` will not be spoken by screen readers. Any essential information
> in `renderValue` must also be conveyed via `formatScreenReaderValue` for screen reader users.

```js
---
type: example
---
<ProgressCircle
  screenReaderLabel="Percent complete"
  formatScreenReaderValue={({ valueNow, valueMax }) => {
    return Math.round((valueNow / valueMax * 100)) + ' percent'
  }}
  renderValue={({ valueNow, valueMax }) => {
    const percent = Math.round(valueNow / valueMax * 100)
    return (
      <span>
        <Text size="large" weight="bold" color="primary">
          {percent > 100 ? 100 : percent}
        </Text>
        <Text size="small" weight="bold" color="secondary">%</Text>
      </span>
    )
  }}
  valueMax={88}
  valueNow={33}
/>
```

```js
---
type: embed
---
<Guidelines>
  <Figure recommendation="a11y" title="Accessibility">
    <Figure.Item>If the progress bar conveys more information than just an approximate progress of a task (for example "5 or 23 items downloaded") then show this information as text too.</Figure.Item>
  </Figure>
</Guidelines>
```


### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| ProgressCircle | screenReaderLabel | `string` | Yes | - | A label is required for accessibility |
| ProgressCircle | size | `'x-small' \| 'small' \| 'medium' \| 'large'` | No | `'medium'` | Control the size of the progress circle |
| ProgressCircle | valueMax | `Values['valueMax']` | No | `100` | Maximum value (defaults to 100) |
| ProgressCircle | valueNow | `Values['valueNow']` | No | `0` | Receives the progress of the event |
| ProgressCircle | formatScreenReaderValue | `(values: Values) => string` | No | `({ valueNow, valueMax }: Values) =>
`${valueNow} / ${valueMax}`` | A function for formatting the text provided to screen readers via `aria-valuenow` |
| ProgressCircle | renderValue | `Renderable<Values>` | No | - | A function to format the displayed value. If null the value will not display. Takes `valueNow` and `valueMax` as parameters. |
| ProgressCircle | color | `'primary' \| 'primary-inverse'` | No | `'primary'` | Controls the overall color scheme of the component |
| ProgressCircle | meterColor | `\| ((values: Values) => ProgressCircleMeterColor) \| ProgressCircleMeterColor` | No | `({ valueNow, valueMax }: Values) =>
valueNow / valueMax >= 1 ? 'success' : 'brand'` | Control the color of the progress meter. Defaults to showing theme success color on completion, based on `valueNow` and `valueMax`. |
| ProgressCircle | margin | `Spacing` | No | - | Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`, `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via familiar CSS-like shorthand. For example: `margin="small auto large"`. |
| ProgressCircle | elementRef | `(element: Element \| null) => void` | No | - | Provides a reference to the component's root HTML element |
| ProgressCircle | as | `AsElementType` | No | `'div'` | Set the element type of the component's root |
| ProgressCircle | shouldAnimateOnMount | `boolean` | No | `false` |  |
| ProgressCircle | animationDelay | `number` | No | - |  |

### Usage

Install the package:

```shell
npm install @instructure/ui-progress
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { ProgressCircle } from '@instructure/ui-progress'
```

