# Img


An accessible image component

```js
---
type: example
---
<Img src={placeholderImage(250, 250)} />
```

### Margin and display

Use the `margin` prop to add space around `<Img />`. Setting the `display` prop to `block` makes
the image a block-level element.

```js
---
type: example
---
<View textAlign="center" as="div">
  <Img margin="small" alt="A placeholder image" src={placeholderImage(300, 200)} />
  <Img margin="small" src={placeholderImage(200, 200)} />
  <Img display="block" margin="small auto" src={placeholderImage(400, 200)} />
</View>
```

### Color overlay

The `overlay` prop accepts parameters for `color`, `opacity`, and `blend`.

```js
---
type: example
---
  <View textAlign="center" as="div">
    <Img
      src={placeholderImage(200, 200)}
      overlay={{color: '#0374B5', opacity: 9, blend: 'overlay'}}
      alt="A placeholder image"
      margin="x-small"
    />
    <Img
      src={placeholderImage(200, 200)}
      overlay={{color: '#0374B5', opacity: 6, blend: 'multiply'}}
      alt="A placeholder image"
      margin="x-small"
    />
    <Img
      src={placeholderImage(200, 200)}
      overlay={{color: '#0374B5', opacity: 3}}
      alt="A placeholder image"
      margin="x-small"
    />
  </View>
```

### Cover

When the `constrain` prop is set to `cover` the image fills the _full_ width and height of its
containing element, while maintaining the aspect ratio of the source image.

```js
---
type: example
---
<div style={{width: '66%', height: '11rem'}}>
  <Img src={avatarSquare} constrain="cover" />
</div>
```

### Contain

When the `constrain` prop is set to `contain` the image fits within the width and height of its
containing element, while maintaining the aspect ratio of the source image.

```js
---
type: example
---
<View as="div" background="primary-inverse" width="200px" height="200px" textAlign="center">
  <Img src={avatarPortrait} constrain="contain" />
</View>
```

### Grayscale and blur filters

Please note: these should only be used for presentational effects.

```js
---
type: example
---
  <View textAlign="center" as="div">
    <Img
      withGrayscale
      src={avatarSquare}
      alt="A placeholder image"
      margin="x-small"
    />
    <Img
      withBlur
      src={avatarSquare}
      alt="A placeholder image"
      margin="x-small"
    />
  </View>
```

### Guidelines

```js
---
type: embed
---
<Guidelines>
  <Figure recommendation="a11y" title="Accessibility">
    <Figure.Item>Contextual images must have alternative text that describes the information or function represented by them</Figure.Item>
    <Figure.Item>Decorative images that do not present important content, are used for layout or non-informative purposes, and do not appear within a link do not need to be presented to screen readers.  Decorative and spacer images should have null alternative text (alt="")</Figure.Item>
  </Figure>
</Guidelines>
```


### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| Img | src | `string` | Yes | - |  |
| Img | alt | `string` | No | `''` |  |
| Img | display | `'inline-block' \| 'block'` | No | `'inline-block'` |  |
| Img | loading | `'eager' \| 'lazy'` | No | - | Gets passed down to the img component. Same as the native HTML img's loading attribute |
| Img | margin | `Spacing` | No | - | Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`, `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via familiar CSS-like shorthand. For example: `margin="small auto large"`. |
| Img | overlay | `{ color: string opacity: 0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 7 \| 8 \| 9 \| 10 blend?: 'normal' \| 'multiply' \| 'screen' \| 'overlay' \| 'color-burn' }` | No | - | Valid values for `opacity` are `0` - `10`. Valid values for `blend` are `normal` (default), `multiply`, `screen`, `overlay`, and `color-burn`. |
| Img | withGrayscale | `boolean` | No | `false` |  |
| Img | withBlur | `boolean` | No | `false` |  |
| Img | constrain | `'cover' \| 'contain'` | No | - |  |
| Img | elementRef | `(element: Element \| null) => void` | No | - | provides a reference to the underlying html root element |
| Img | height | `string \| number` | No | - |  |
| Img | width | `string \| number` | No | - |  |

### Usage

Install the package:

```shell
npm install @instructure/ui-img
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { Img } from '@instructure/ui-img'
```

