---
describes: ImageCard
---

Use `<ImageCard />` to present a card with an image on top, a title and
supporting content below. It has the same surface as [Card](/#Card): a
background color, a shadow, and padding and border radius that scale with the
card's own width.

`src` sets the image, `alt` describes it for screen readers and `title` sets the
heading. Anything passed as `children` renders below the title.

```js
---
type: example
---
<ImageCard
  title="Card Title"
  src={placeholderImage(250, 250)}
  alt="A gray placeholder square"
>
  <Text variant="content">Content goes here.</Text>
</ImageCard>
```

### Breakpoints

The cards below are 15rem, 30rem and 45rem wide, one for each size: below the
medium breakpoint (20rem), between the two breakpoints, and at or above the
large breakpoint (40rem).

```js
---
type: example
---
<Flex direction="column" gap="medium">
  <div style={{ width: '15rem', maxWidth: '100%' }}>
    <ImageCard
      title="Small"
      src={placeholderImage(600, 340)}
      alt="A gray placeholder"
    >
      <Text variant="content">Narrower than the medium breakpoint.</Text>
    </ImageCard>
  </div>
  <div style={{ width: '30rem', maxWidth: '100%' }}>
    <ImageCard
      title="Medium"
      src={placeholderImage(600, 340)}
      alt="A gray placeholder"
    >
      <Text variant="content">Between the two breakpoints.</Text>
    </ImageCard>
  </div>
  <div style={{ width: '45rem', maxWidth: '100%' }}>
    <ImageCard
      title="Large"
      src={placeholderImage(600, 340)}
      alt="A gray placeholder"
    >
      <Text variant="content">Wider than the large breakpoint.</Text>
    </ImageCard>
  </div>
</Flex>
```
