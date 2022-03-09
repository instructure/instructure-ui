---
describes: Spinner
---

### Choose from four sizes and add margin as needed

The `size` prop allows you to select from `x-small`, `small`, `medium` and `large`
-sized spinners. Margin can be added as needed using the `margin` prop.

```js
---
example: true
---
<div>
  <Spinner renderTitle="Loading" size="x-small" />
  <Spinner renderTitle="Loading" size="small" margin="0 0 0 medium" />
  <Spinner renderTitle="Loading" margin="0 0 0 medium" />
  <Spinner renderTitle="Loading" size="large" margin="0 0 0 medium" />
</div>
```

### Different color schemes for use with light and dark backgrounds

Spinner provides an `inverse` color scheme designed to be used with
dark backgrounds.

```js
---
example: true
---
<View background="primary-inverse" as="div">
  <Spinner renderTitle="Loading" variant="inverse" />
</View>
```

### Screen reader support

The `renderTitle` prop is read to screen readers.

```js
---
example: true
---
<Spinner renderTitle={() => "Hello world"} />
```
