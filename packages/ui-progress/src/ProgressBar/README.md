---
describes: ProgressBar
---

`<ProgressBar />` is a styled HTML `<progress />` element, complete
with the aria attributes required to support screen readers.

### `size`

```js
---
example: true
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
example: true
background: 'checkerboard-inverse'
---
<ProgressBar
  screenReaderLabel="Loading completion"
  color="primary-inverse"
  valueNow={30}
  valueMax={60}
/>
```

### `meterColor`
The color of the progress meter is set separately through the `meterColor` property.

```js
---
example: true
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
example: true
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
complete.


### `renderValue` / `formatScreenReaderValue`

Via the `renderValue` prop, developers can use `valueMax` and `valueNow` props to format the
value that `<ProgressBar />` displays.

> `renderValue` will not be spoken by screen readers. Any essential information
in `renderValue` must also be conveyed via `formatScreenReaderValue` for screen reader users.

```js
---
example: true
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
