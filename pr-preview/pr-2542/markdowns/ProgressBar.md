# ProgressBar


`<ProgressBar />` is a styled HTML `<progress />` element, complete
with the aria attributes required to support screen readers.

### `size`

```js
---
type: example
---
<div>
  <ProgressBar
    size="x-small"
    screenReaderLabel="Loading completion"
    valueNow={40}
    valueMax={60}
    margin="0 0 small"
    renderValue={({ valueNow, valueMax }) => {
    return (
      <Text>
        {Math.round(valueNow / valueMax * 100)}%
      </Text>
    )
  }}
  formatScreenReaderValue={({ valueNow, valueMax }) => {
    return Math.round((valueNow / valueMax * 100)) + ' percent'
  }}
  />
  <ProgressBar
    size="small"
    screenReaderLabel="Loading completion"
    valueNow={40}
    valueMax={60}
    margin="0 0 small"
    renderValue={({ valueNow, valueMax }) => {
    return (
      <Text>
        {Math.round(valueNow / valueMax * 100)}%
      </Text>
    )
  }}
  formatScreenReaderValue={({ valueNow, valueMax }) => {
    return Math.round((valueNow / valueMax * 100)) + ' percent'
  }}
  />
  <ProgressBar
    screenReaderLabel="Loading completion"
    valueNow={40}
    valueMax={60}
    margin="0 0 small"
    renderValue={({ valueNow, valueMax }) => {
    return (
      <Text>
        {Math.round(valueNow / valueMax * 100)}%
      </Text>
    )
  }}
  formatScreenReaderValue={({ valueNow, valueMax }) => {
    return Math.round((valueNow / valueMax * 100)) + ' percent'
  }}
  />
  <ProgressBar
    size="large"
    screenReaderLabel="Loading completion"
    valueNow={40}
    valueMax={60}
    renderValue={({ valueNow, valueMax }) => {
    return (
      <Text>
        {Math.round(valueNow / valueMax * 100)}%
      </Text>
    )
  }}
  formatScreenReaderValue={({ valueNow, valueMax }) => {
    return Math.round((valueNow / valueMax * 100)) + ' percent'
  }}
  />
</div>
```

### `color`

`<ProgressBar />`'s `color` property controls the overall color scheme of the
component. Set it to `primary-inverse` when the component is used on dark backgrounds.

```js
---
type: example
---
<View background="primary-inverse" as="div">
  <ProgressBar
    screenReaderLabel="Loading completion"
    color="primary-inverse"
    valueNow={30}
    valueMax={60}
    renderValue={({ valueNow, valueMax }) => {
    return (
      <Text>
        {Math.round(valueNow / valueMax * 100)}%
      </Text>
    )
  }}
  formatScreenReaderValue={({ valueNow, valueMax }) => {
    return Math.round((valueNow / valueMax * 100)) + ' percent'
  }}
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
  <ProgressBar
    screenReaderLabel="Loading completion"
    meterColor="info"
    valueNow={40}
    valueMax={60}
    margin="0 0 small"
    renderValue={({ valueNow, valueMax }) => {
    return (
      <Text>
        {Math.round(valueNow / valueMax * 100)}%
      </Text>
    )
  }}
  formatScreenReaderValue={({ valueNow, valueMax }) => {
    return Math.round((valueNow / valueMax * 100)) + ' percent'
  }}
  />
  <ProgressBar
    screenReaderLabel="Loading completion"
    meterColor="success"
    valueNow={40}
    valueMax={60}
    margin="0 0 small"
    renderValue={({ valueNow, valueMax }) => {
    return (
      <Text>
        {Math.round(valueNow / valueMax * 100)}%
      </Text>
    )
  }}
  formatScreenReaderValue={({ valueNow, valueMax }) => {
    return Math.round((valueNow / valueMax * 100)) + ' percent'
  }}
  />
  <ProgressBar
    screenReaderLabel="Loading completion"
    meterColor="alert"
    valueNow={40}
    valueMax={60}
    margin="0 0 small"
    renderValue={({ valueNow, valueMax }) => {
    return (
      <Text>
        {Math.round(valueNow / valueMax * 100)}%
      </Text>
    )
  }}
  formatScreenReaderValue={({ valueNow, valueMax }) => {
    return Math.round((valueNow / valueMax * 100)) + ' percent'
  }}
  />
  <ProgressBar
    screenReaderLabel="Loading completion"
    meterColor="warning"
    valueNow={40}
    valueMax={60}
    margin="0 0 small"
    renderValue={({ valueNow, valueMax }) => {
    return (
      <Text>
        {Math.round(valueNow / valueMax * 100)}%
      </Text>
    )
  }}
  formatScreenReaderValue={({ valueNow, valueMax }) => {
    return Math.round((valueNow / valueMax * 100)) + ' percent'
  }}
  />
  <ProgressBar
    screenReaderLabel="Loading completion"
    meterColor="danger"
    valueNow={40}
    valueMax={60}
    margin="0 0 small"
    renderValue={({ valueNow, valueMax }) => {
    return (
      <Text>
        {Math.round(valueNow / valueMax * 100)}%
      </Text>
    )
  }}
  formatScreenReaderValue={({ valueNow, valueMax }) => {
    return Math.round((valueNow / valueMax * 100)) + ' percent'
  }}
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
<ProgressBar
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
  renderValue={({ valueNow, valueMax }) => {
    return (
      <Text>
        {Math.round(valueNow / valueMax * 100)}%
      </Text>
    )
  }}
  formatScreenReaderValue={({ valueNow, valueMax }) => {
    return Math.round((valueNow / valueMax * 100)) + ' percent'
  }}
/>
```

> `<ProgressBar />` defaults to setting the meter color to `success` when
> complete.

### `renderValue` / `formatScreenReaderValue`

Via the `renderValue` prop, developers can use `valueMax` and `valueNow` props to format the
value that `<ProgressBar />` displays.

> `renderValue` will not be spoken by screen readers. Any essential information
> in `renderValue` must also be conveyed via `formatScreenReaderValue` for screen reader users.

```js
---
type: example
---
<ProgressBar
  screenReaderLabel="Percent complete"
  formatScreenReaderValue={({ valueNow, valueMax }) => {
    return Math.round((valueNow / valueMax * 100)) + ' percent'
  }}
  renderValue={({ valueNow, valueMax }) => {
    return (
      <Text>
        {Math.round(valueNow / valueMax * 100)}%
      </Text>
    )
  }}
  valueMax={88}
  valueNow={33}
/>
```

### `shouldAnimate`

The `shouldAnimate` prop makes the progress bar animate the transition between value changes, giving it a smoother look.

```js
---
type: example
---
const Example = () => {
  const MIN = 0
  const MAX = 100

  const [value, setValue] = useState(25)
  const [shouldAnimate, setShouldAnimate] = useState(true)

  const bound = (n) => {
    if (n < MIN) return MIN
    if (n > MAX) return MAX
    return n
  }

  const handleChange = (event, value) => {
    const newValue = Number(value)
    if (isNaN(newValue)) {
      return
    }
    setValue(newValue)
  }

  const handleDecrement = () => {
    if (Number.isInteger(value)) {
      setValue((value) => bound(value - 1))
    }
    setValue((value) => bound(Math.floor(value)))
  }

  const handleIncrement = () => {
    if (Number.isInteger(value)) {
      setValue((value) => bound(value + 1))
    }
    setValue((value) => bound(Math.ceil(value)))
  }

  const handleBlur = () => {
    setValue((value) => bound(Math.round(value)))
  }

  return (
    <div>
      <View
        as="div"
        background="primary"
        padding="medium"
        margin="0 0 large 0"
      >
        <FormFieldGroup
          description={<ScreenReaderContent>Settings</ScreenReaderContent>}
        >
          <Checkbox
            label="Should animate"
            checked={shouldAnimate}
            onChange={() => {
              setShouldAnimate((shouldAnimate) => !shouldAnimate)
            }}
            variant="toggle"
          />

          <NumberInput
            renderLabel={`ProgressBar value (${MIN}-${MAX})`}
            display="inline-block"
            onBlur={handleBlur}
            onChange={handleChange}
            onDecrement={handleDecrement}
            onIncrement={handleIncrement}
            showArrows
            value={value}
          />
        </FormFieldGroup>
      </View>

      <ProgressBar
        screenReaderLabel="Loading completion"
        valueNow={value}
        valueMax={MAX}
        shouldAnimate={shouldAnimate}
        renderValue={({ valueNow, valueMax }) => {
          return <Text>{Math.round((valueNow / valueMax) * 100)}%</Text>
        }}
        formatScreenReaderValue={({ valueNow, valueMax }) => {
          return Math.round((valueNow / valueMax) * 100) + ' percent'
        }}
      />
    </div>
  )
}

render(<Example />)
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
| ProgressBar | screenReaderLabel | `string` | Yes | - | A label is required for accessibility |
| ProgressBar | size | `'x-small' \| 'small' \| 'medium' \| 'large'` | No | `'medium'` | Control the height of the progress bar |
| ProgressBar | valueMax | `Values['valueMax']` | No | `100` | Maximum value (defaults to 100) |
| ProgressBar | valueNow | `Values['valueNow']` | No | `0` | Receives the progress of the event |
| ProgressBar | formatScreenReaderValue | `(values: Values) => string` | No | `({ valueNow, valueMax }: Values) =>
`${valueNow} / ${valueMax}`` | A function for formatting the text provided to screen readers via `aria-valuenow` |
| ProgressBar | renderValue | `Renderable<Values>` | No | - | A function to format the displayed value. If null the value will not display. Takes `valueNow` and `valueMax` as parameters. |
| ProgressBar | color | `'primary' \| 'primary-inverse'` | No | `'primary'` | Controls the overall color scheme of the component |
| ProgressBar | meterColor | `\| ((values: Values) => ProgressBarMeterColor) \| ProgressBarMeterColor` | No | `({ valueNow, valueMax }: Values) =>
valueNow / valueMax >= 1 ? 'success' : 'brand'` | Control the color of the progress meter. Defaults to showing theme success color on completion, based on `valueNow` and `valueMax`. |
| ProgressBar | shouldAnimate | `boolean` | No | `false` | Whether the change of value should have a transition |
| ProgressBar | margin | `Spacing` | No | - | Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`, `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via familiar CSS-like shorthand. For example: `margin="small auto large"`. |
| ProgressBar | elementRef | `(element: Element \| null) => void` | No | - | Provides a reference to the component's root HTML element |
| ProgressBar | as | `AsElementType` | No | `'div'` | Set the element type of the component's root |
| ProgressBar | renderValueInside | `boolean` | No | - | If true, displays the `renderValue` inside the progress meter for customization. Note: This should not be used in most cases. When enabled, ensure `renderValue` is styled for proper legibility and alignment across themes and sizes. |

### Usage

Install the package:

```shell
npm install @instructure/ui-progress
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { ProgressBar } from '@instructure/ui-progress'
```

