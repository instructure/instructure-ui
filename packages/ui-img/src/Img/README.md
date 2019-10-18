---
describes: Img
---
### Important v8.0.0 upgrade notes
Codemods are available to automatically update imports to the new package as well as any props that have changed. These changes and other things to note are described below.

- **blur** has been updated to `withBlur`
- **grayscale** has been updated to `withGrayscale`
- the boolean **inline** has been updated to `display` with options ('inline-block', 'block)

***

An accessible image component

```js
---
example: true
---
<Img src={placeholderImage(250, 250)} />
```

### Margin and display

Use the `margin` prop to add space around `<Img />`. Setting the `display` prop to `block` makes
the image a block-level element.

```js
---
example: true
---
<View textAlign="center" as="div">
  <Img margin="small" alt="A placeholder image" src={placeholderImage(300, 200)} />
  <Img margin="small" src={placeholderImage(200, 200)} />
  <Img display="block" margin="small auto" src={placeholderImage(400, 200)} />
</View>
```

### Color overlay

The `overlay` prop accepts parameters for `color`, `opacity`, and `blend`. (Keep
in mind that Internet Explorer currently ignores CSS blend mode rules.)

```js
---
example: true
---
  <View textAlign="center" as="div">
    <Img
      src={placeholderImage(200, 200)}
      overlay={{color: '#008ee2', opacity: 9, blend: 'overlay'}}
      alt="A placeholder image"
      margin="x-small"
    />
    <Img
      src={placeholderImage(200, 200)}
      overlay={{color: '#008ee2', opacity: 6, blend: 'multiply'}}
      alt="A placeholder image"
      margin="x-small"
    />
    <Img
      src={placeholderImage(200, 200)}
      overlay={{color: '#008ee2', opacity: 3}}
      alt="A placeholder image"
      margin="x-small"
    />
  </View>
```

### Cover

When the `constrain` prop is set to `cover` the image fills the *full* width and height of its
containing element, while maintaining the aspect ratio of the source image.

```js
---
example: true
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
example: true
---
<View as="div" background="primary-inverse" width="200px" height="200px" textAlign="center">
  <Img src={avatarPortrait} constrain="contain" />
</View>
```

### Grayscale and blur filters

Please note: these should only be used for presentational effects: Filters
are not supported in Internet Explorer.

```js
---
example: true
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
guidelines: true
---
<Guidelines>
  <Figure recommendation="a11y" title="Accessibility">
    <Figure.Item>Contextual images must have alternative text that describes the information or function represented by them</Figure.Item>
    <Figure.Item>Decorative images that do not present important content, are used for layout or non-informative purposes, and do not appear within a link do not need to be presented to screen readers.  Decorative and spacer images should have null alternative text (alt="")</Figure.Item>
  </Figure>
</Guidelines>
```
