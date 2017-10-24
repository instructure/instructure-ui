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

### inline and margin

Use the `margin` prop to add space around `<Image/>`. Adding `inline={false}` makes
the image a block-level element

```js
---
example: true
---
<div>
  <Image margin="0 medium 0 0" alt="A placeholder image" src={placeholderImage(300, 200)} />
  <Image margin="0 0 0 medium" src={placeholderImage(200, 200)} />
  <Image inline={false} margin="medium 0 0" src={placeholderImage(400, 200)} />
</div>
```

### Color overlay

The `overlay` prop accepts parameters for `color`, `opacity`, and `blend`. (Keep
in mind that Internet Explorer currently ignores CSS blend mode rules.)

```js
---
example: true
---
  <Container textAlign="center">
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

### Grayscale and blur filters

Please note: these should only be used for presentational effects: Filters
are not supported in Internet Explorer.

```js
---
example: true
---
  <Container textAlign="center">
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
