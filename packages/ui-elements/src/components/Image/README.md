---
describes: Image
---

An accessible image component

```js
---
example: true
---
<Image src={placeholderImage(250, 250)} />
```

### Margin and display

Use the `margin` prop to add space around `<Image />`. Setting the `inline` prop to `false` makes
the image a block-level element.

```js
---
example: true
---
<Container textAlign="center" as="div">
  <Image margin="small" alt="A placeholder image" src={placeholderImage(300, 200)} />
  <Image margin="small" src={placeholderImage(200, 200)} />
  <Image inline={false} margin="small auto" src={placeholderImage(400, 200)} />
</Container>
```

### Color overlay

The `overlay` prop accepts parameters for `color`, `opacity`, and `blend`. (Keep
in mind that Internet Explorer currently ignores CSS blend mode rules.)

```js
---
example: true
---
  <Container textAlign="center" as="div">
    <Image
      src={placeholderImage(200, 200)}
      overlay={{color: '#008ee2', opacity: 7}}
      alt="A placeholder image"
      margin="x-small"
    />
    <Image
      src={placeholderImage(200, 200)}
      overlay={{color: '#008ee2', opacity: 7, blend: 'multiply'}}
      alt="A placeholder image"
      margin="x-small"
    />
    <Image
      src={placeholderImage(200, 200)}
      overlay={{color: '#008ee2', opacity: 7, blend: 'screen'}}
      alt="A placeholder image"
      margin="x-small"
    />
  </Container>
```

### Cover

When the `cover` prop is `true` Image fills the full width and height of its
containing element, while maintaining the aspect ratio of the source image.

```js
---
example: true
---
<div style={{width: '66%', height: '11rem'}}>
  <Image
    src={avatarImage}
    overlay={{color: 'rebeccapurple', opacity: 8}}
    cover
  />
</div>
```

### Grayscale and blur filters

Please note: these should only be used for presentational effects: Filters
are not supported in Internet Explorer.

```js
---
example: true
---
  <Container textAlign="center" as="div">
    <Image
      grayscale
      src={avatarImage}
      alt="A placeholder image"
      margin="x-small"
    />
    <Image
      blur
      src={avatarImage}
      alt="A placeholder image"
      margin="x-small"
    />
  </Container>
```
