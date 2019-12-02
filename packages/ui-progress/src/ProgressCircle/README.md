---
describes: ProgressCircle
---

`<ProgressCircle />` is a <span role="img" aria-hidden="true" style="font-size: 2rem; vertical-align: middle;">🍩</span> styled HTML `<progress />` element, complete
with the aria attributes required to support screen readers.

### `size`, `shouldAnimateOnMount`, `animationDelay`

```js
---
example: true
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
example: true
background: 'checkerboard-inverse'
---
<ProgressCircle
  screenReaderLabel="Loading completion"
  color="primary-inverse"
  valueNow={50}
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
example: true
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
