---
describes: Media
---

```js
---
guidelines: true
---
<Guidelines>
  <Figure title="Upgrade Notes for v8.0.0" recommendation="none">
    <Figure.Item>
      <strong>DEPRECATED:</strong> Media will be removed from <code>ui-byline</code> in version 8.0.0. Use <Link href="#Byline">Byline</Link> instead.
    </Figure.Item>
  </Figure>
</Guidelines>
```

A `Media` component with a caption:

```js
---
example: true
---
<Media description={lorem.sentence()}>
  <Avatar name="Julia Chowder" />
</Media>
```

Create a heading by using the `title` prop, and add space around the Media
component via the `margin` prop. To constrain the component's width, use
the `size` prop.

You can also adjust the alignment of the media with the descriptive text by
setting the `alignContent` prop.

```js
---
example: true
---
<Media
  margin="x-large auto"
  size="small"
  alignContent="top"
  title="Graham Taylor"
  description={lorem.paragraph()}
>
  <Avatar name="Graham Taylor" />
</Media>
```

```js
---
example: true
---
<Media 
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
</Media>
```
