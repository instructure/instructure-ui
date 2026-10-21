---
describes: Card
---

Use `<Card />` as a basic wrapper for grouping related content with padding,
border radius, shadow, and background color.

Card has two internal width breakpoints. It measures its own rendered width and scales its
padding and border radius from that, so the same markup works in a narrow
sidebar and in a wide main region.

```js
---
type: example
---
<ImageCard  src={placeholderImage(250, 250)} >
  <Heading level="h3" margin="0 0 x-small 0">
    Base card
  </Heading>
  <Text variant="content">Content goes here.</Text>
</ImageCard>
```
