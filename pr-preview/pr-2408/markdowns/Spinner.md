# Spinner


### Choose from four sizes and add margin as needed

The `size` prop allows you to select from `x-small`, `small`, `medium` and `large`
-sized spinners. Margin can be added as needed using the `margin` prop.

```js
---
type: example
---
<div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
  <Spinner renderTitle="Loading" size="x-small" />
  <Spinner renderTitle="Loading" size="small" />
  <Spinner renderTitle="Loading" />
  <Spinner renderTitle="Loading" size="large" />
</div>
```

### Different color schemes for use with light and dark backgrounds

Spinner provides an `inverse` color scheme designed to be used with
dark backgrounds.

```js
---
type: example
---
<View background="primary-inverse" as="div" >
  <Spinner renderTitle="Loading" variant="inverse"  />
</View>
```

### Delay rendering

The `delay` prop allows you to delay the rendering of the spinner a desired time to prevent flickering in cases of very fast load times.

```js
---
type: example
---
<div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
  <Spinner renderTitle="Loading" size="x-small" delay={1000} />
  <Spinner renderTitle="Loading" size="small" delay={2000} />
  <Spinner renderTitle="Loading" delay={3000} />
  <Spinner renderTitle="Loading" size="large" delay={4000} />
</div>
```

### Screen reader support

The `renderTitle` prop is read to screen readers.

```js
---
type: example
---
<div>
  <Spinner renderTitle={() => "Hello world"} />
</div>
```


### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| Spinner | delay | `number` | No | - | delay spinner rendering for a time (in ms). Used to prevent flickering in case of very fast load times |
| Spinner | margin | `Spacing` | No | - | Valid values are `0`, `none`, `auto`, and Spacing token values, see https://instructure.design/layout-spacing. Apply these values via familiar CSS-like shorthand. For example, `gap="small auto large"`. |
| Spinner | renderTitle | `Renderable` | No | - | Give the spinner a title to be read by screenreaders |
| Spinner | size | `'x-small' \| 'small' \| 'medium' \| 'large'` | No | - | Different-sized spinners |
| Spinner | variant | `'default' \| 'inverse'` | No | - | Different color schemes for use with light or dark backgrounds |
| Spinner | themeOverride | `ThemeOverrideValue` | No | - |  |

### Usage

Install the package:

```shell
npm install @instructure/ui-spinner
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { Spinner } from '@instructure/ui-spinner'
```

