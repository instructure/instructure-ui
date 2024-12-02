---
describes: ProgressBar
---

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
  />
  <ProgressBar
    size="small"
    screenReaderLabel="Loading completion"
    valueNow={40}
    valueMax={60}
    margin="0 0 small"
  />
  <ProgressBar
    screenReaderLabel="Loading completion"
    valueNow={40}
    valueMax={60}
    margin="0 0 small"
  />
  <ProgressBar
    size="large"
    screenReaderLabel="Loading completion"
    valueNow={40}
    valueMax={60}
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
  />
  <ProgressBar
    screenReaderLabel="Loading completion"
    meterColor="success"
    valueNow={40}
    valueMax={60}
    margin="0 0 small"
  />
  <ProgressBar
    screenReaderLabel="Loading completion"
    meterColor="alert"
    valueNow={40}
    valueMax={60}
    margin="0 0 small"
  />
  <ProgressBar
    screenReaderLabel="Loading completion"
    meterColor="warning"
    valueNow={40}
    valueMax={60}
    margin="0 0 small"
  />
  <ProgressBar
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
/>
```

> `<ProgressBar />` defaults to setting the meter color to `success` when
> complete.

### `isRounded`

Rounded variant of the progress bar is available via the `isRounded` prop

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
  />
  <ProgressBar
    size="small"
    screenReaderLabel="Loading completion"
    valueNow={40}
    valueMax={60}
    margin="0 0 small"
  />
  <ProgressBar
    screenReaderLabel="Loading completion"
    valueNow={40}
    valueMax={60}
    margin="0 0 small"
  />
  <ProgressBar
    size="large"
    screenReaderLabel="Loading completion"
    valueNow={60}
    valueMax={60}
    isRounded
  />
</div>
```

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

- ```js
  class Example extends React.Component {
    MIN = 0
    MAX = 100

    state = {
      value: 25,
      shouldAnimate: true
    }

    bound(n) {
      if (n < this.MIN) return this.MIN
      if (n > this.MAX) return this.MAX
      return n
    }

    setNumber(n) {
      return { value: this.bound(n) }
    }

    handleChange = (event, value) => {
      const newValue = Number(value)

      if (isNaN(newValue)) {
        return
      }

      this.setState({
        value: newValue
      })
    }

    handleDecrement = (event) =>
      this.setState(({ value }) => {
        if (Number.isInteger(value)) {
          return this.setNumber(value - 1)
        }
        return this.setNumber(Math.floor(value))
      })

    handleIncrement = (event) =>
      this.setState(({ value }) => {
        if (Number.isInteger(value)) {
          return this.setNumber(value + 1)
        }
        return this.setNumber(Math.ceil(value))
      })

    handleBlur = (event) =>
      this.setState(({ value }) => {
        return this.setNumber(Math.round(value))
      })

    render() {
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
                checked={this.state.shouldAnimate}
                onChange={() => {
                  this.setState({ shouldAnimate: !this.state.shouldAnimate })
                }}
                variant="toggle"
              />

              <NumberInput
                renderLabel={`ProgressBar value (${this.MIN}-${this.MAX})`}
                display="inline-block"
                onBlur={this.handleBlur}
                onChange={this.handleChange}
                onDecrement={this.handleDecrement}
                onIncrement={this.handleIncrement}
                showArrows
                value={this.state.value}
              />
            </FormFieldGroup>
          </View>

          <ProgressBar
            screenReaderLabel="Loading completion"
            valueNow={this.state.value}
            valueMax={this.MAX}
            shouldAnimate={this.state.shouldAnimate}
          />
        </div>
      )
    }
  }

  render(<Example />)
  ```

- ```js
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
