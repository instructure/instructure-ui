---
describes: DeprecatedProgress
id: DeprecatedProgress__README
---

**DEPRECATED:** Progress will be removed from `ui-elements` in version 7.0.0. Use [Progress](#Progress) from [ui-progress](#ui-progress) instead. Codemods are available to automatically update imports to the new package.
***

### Basic progress bar and circle
Progress is an easy-to-customize progress bar or circle (a.k.a, doughnut).

The Progress component defaults to a simple progress bar with no text
output. The only required prop is `label`, which is needed for accessibility.

To render the Progress component as a circle/doughnut instead, set the
`variant` to `circle`.

```js
---
example: true
---
<div>
  <DeprecatedProgress label="Loading completion" valueNow={40} valueMax={60} />
  <br />
  <DeprecatedProgress
    label="Loading completion"
    variant="circle"
    valueNow={40}
    valueMax={60} />
</div>
```

### Changing the size and adding margin

Use the `size` prop to display `x-small`, `small`, `medium` and `large`
progress bars. (Default is `medium`.) Use the `margin` prop to add margin
around the progress bar/circle.

```js
---
example: true
---
<div>
  <DeprecatedProgress
    label="Modules complete"
    size="x-small"
    valueNow={5}
    valueMax={20}
    margin="medium"
  />
  <DeprecatedProgress
    label="Modules complete"
    size="small"
    valueNow={10}
    valueMax={20}
    margin="large small xx-large x-small"
  />
  <DeprecatedProgress
    label="Modules complete"
    valueNow={15}
    valueMax={20}
    margin="x-small none large none"
  />
  <DeprecatedProgress
    label="Modules complete"
    size="large"
    valueNow={20}
    valueMax={20}
    margin="x-large xx-small large none"
  />
  <div>
    <DeprecatedProgress
      label="Modules complete"
      size="x-small"
      variant="circle"
      valueNow={5}
      valueMax={20}
      margin="xx-large"
    />
    <DeprecatedProgress
      label="Modules complete"
      size="small"
      variant="circle"
      valueNow={10}
      valueMax={20}
      margin="xxx-small"
    />
    <DeprecatedProgress
      label="Modules complete"
      variant="circle"
      valueNow={15}
      valueMax={20}
      margin="large"
    />
    <DeprecatedProgress
      label="Modules complete"
      size="large"
      variant="circle"
      valueNow={20}
      valueMax={20}
      margin="none medium"
    />
  </div>
</div>
```

### Displaying text output

Text output is intentionally left flexible: Via the `formatDisplayedValue`
prop, developers can use the `valueMax` and `valueNow` props to create
whatever output they desire - using whatever markup and internationalization
library tags they need. Common usage examples are shown below. Note the
use of the [Text](#Text) component for easy text formatting.

**Note that `formatDisplayedValue` will not be spoken by screenreaders.**
Any essential information in `formatDisplayedValue` must also be conveyed
via `formatValueText` for screenreader users.

#### Showing percent

```js
---
example: true
---
<div>
  <DeprecatedProgress
    label="Percent complete"
    formatValueText={function (valueNow, valueMax) {
      return Math.round((valueNow / valueMax * 100)) + ' percent'
    }}
    formatDisplayedValue={function (valueNow, valueMax) {
      return (
        <Text>
          {Math.round(valueNow / valueMax * 100)}%
        </Text>
      )
    }}
    valueMax={88}
    valueNow={33}
  />
  <DeprecatedProgress
    label="Percent complete"
    formatValueText={function (valueNow, valueMax) {
      return Math.round((valueNow / valueMax * 100)) + ' percent'
    }}
    formatDisplayedValue={function (valueNow, valueMax) {
      return (
        <Text>
          {Math.round(valueNow / valueMax * 100)}%
        </Text>
      )
    }}
    variant="circle"
    valueMax={88}
    valueNow={33}
  />
</div>
```

#### Showing a counter

Note how the `formatValueText` creates a readable output for
screenreader users.

```js
---
example: true
---
<div>
  <DeprecatedProgress
    size="small"
    label="Chapters complete"
    formatValueText={function (valueNow, valueMax) {
      return valueNow + ' out of ' + valueMax
    }}
    formatDisplayedValue={function (valueNow, valueMax) {
      return (
        <span>
          <Text size="small">{valueNow} / {valueMax}</Text>
        </span>
      )
    }}
    valueMax={88}
    valueNow={33}
  />
  <DeprecatedProgress
    label="Questions correct"
    formatValueText={function (valueNow, valueMax) {
      return valueNow + ' out of ' + valueMax
    }}
    formatDisplayedValue={function (valueNow, valueMax) {
      return (
        <span>
          <Text size="x-large" weight="bold">{valueNow}</Text>
          <br />
          <Text size="small">/&nbsp;</Text>
          <Text size="small">{valueMax}</Text>
        </span>
      )
    }}
    variant="circle"
    valueMax={88}
    valueNow={33}
  />
</div>
```

#### Using conditionals to change the output based on the score

```js
---
example: true
---
<div>
  <DeprecatedProgress
    label="Quiz score"
    formatValueText={function (valueNow, valueMax) {
      const passing = valueNow > (valueMax / 2) ? 'pass' : 'fail'
      return `${valueNow} of ${valueMax}: ${passing}`
    }}
    formatDisplayedValue={function (valueNow, valueMax) {
      if (valueNow > (valueMax / 2)) {
        return (
          <Text weight="bold" size="x-large">
            PASS
          </Text>
        )
      } else {
        return (
        <Text weight="bold" size="x-large">
          FAIL
        </Text>
        )
      }
    }}
    size="large"
    variant="circle"
    valueNow={44}
    valueMax={124}
  />
  <DeprecatedProgress
    label="Quiz score"
    formatValueText={function (valueNow, valueMax) {
      const passing = valueNow > (valueMax / 2) ? 'pass' : 'fail'
      return `${valueNow} of ${valueMax}: ${passing}`
    }}
    formatDisplayedValue={function (valueNow, valueMax) {
      if (valueNow > (valueMax / 2)) {
        return (
          <Text weight="bold" size="x-large">
            PASS
          </Text>
        )
      } else {
        return (
        <Text weight="bold" size="x-large">
          FAIL
        </Text>
        )
      }
    }}
    size="large"
    variant="circle"
    valueNow={110}
    valueMax={124}
  />
</div>
```

### animateOnMount (circle variant only)

Use the `animateOnMount` prop to make the doughnut's meter animate in
when the component mounts. (Hard to see on this page because the animation
only takes a second. Click the Codepen link to preview this feature.)

Please note that you won't see any animation in IE11/Win7.

```js
---
example: true
---
<div>
  <DeprecatedProgress
    animateOnMount
    label="Modules passed"
    formatValueText={function (valueNow, valueMax) {
      return valueNow + ' out of ' + valueMax
    }}
    formatDisplayedValue={function (valueNow, valueMax) {
      return (
        <span>
          <Text size="xx-large" weight="bold">{valueNow}</Text>
          <br />
          <Text size="small">of </Text>
          <Text size="small">{valueMax}</Text>
        </span>
      )
    }}
    size="large"
    variant="circle"
    valueNow={66}
  />
</div>
```

### Inverse color scheme for dark backgrounds

Use the `bar-inverse` and `circle-inverse` variants to make the Progress
track dark instead of light.

```js
---
example: true
background: 'checkerboard-inverse'
---
<div>
  <DeprecatedProgress
    label="Percent complete"
    formatValueText={function (valueNow, valueMax) {
      return Math.round((valueNow / valueMax * 100)) + ' percent'
    }}
    formatDisplayedValue={function (valueNow, valueMax) {
      return (
        <Text color="primary-inverse">
          {Math.round(valueNow / valueMax * 100)}%
        </Text>
      )
    }}
    variant="bar-inverse"
    valueNow={75}
  />
  <DeprecatedProgress
    label="Percent complete"
    formatValueText={function (valueNow, valueMax) {
      return Math.round((valueNow / valueMax * 100)) + ' percent'
    }}
    formatDisplayedValue={function (valueNow, valueMax) {
      return (
        <Text color="primary-inverse">
          {Math.round(valueNow / valueMax * 100)}%
        </Text>
      )
    }}
    size="small"
    variant="circle-inverse"
    valueNow={75}
  />
  <DeprecatedProgress
    label="Percent complete"
    formatValueText={function (valueNow, valueMax) {
      return valueNow + ' out of ' + valueMax
    }}
    formatDisplayedValue={function (valueNow, valueMax) {
      return (
        <span>
          <Text color="primary-inverse" size="x-large" weight="bold">{valueNow}</Text>
          <br />
          <Text color="secondary-inverse" size="small">of </Text>
          <Text color="secondary-inverse" size="small">{valueMax}</Text>
        </span>
      )
    }}
    size="large"
    variant="circle-inverse"
    valueNow={124}
    valueMax={124}
  />
</div>
```
