---
describes: Byline
---

A byline component with a visual and a caption:

```js
---
example: true
---
<Byline description={lorem.sentence()}>
  <Avatar name="Julia Childer" />
</Byline>
```

Create a heading by using the `title` prop, and add space around the Byline
component via the `margin` prop. To constrain the component's width, use
the `size` prop.

You can also adjust the alignment of the visual object with the descriptive text by
setting the `alignContent` prop.

```js
---
example: true
---
<Byline
  margin="x-large auto"
  size="small"
  alignContent="top"
  title="Graham Taylor"
  description={lorem.paragraph()}
>
  <Avatar name="Graham Taylor" />
</Byline>
```

```js
---
example: true
---
<Byline
  description={
    <View display="block" margin="0 0 0 x-small">
      <Heading level="h2">
        <Link href="#">Clickable Heading</Link>
      </Heading>
      <Text
        size="x-small"
        transform="uppercase"
        letterSpacing="expanded"
      >
        Something here
      </Text>
    </View>
  }>
  <SVGIcon src={iconExample} title="love" size="small" color="success" />
</Byline>
```
