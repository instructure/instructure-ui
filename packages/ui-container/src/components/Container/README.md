---
describes: Container
---

Use Container as a wrapper to separate content and/or to set the
text alignment for a section of content.

Note the `visualDebug` prop you can set to see the Container's boundaries.

```js
---
example: true
---
<Container
  as="div"
  visualDebug
  size="small"
  textAlign="center"
  margin="large auto"
  padding="small"
>
  <Text as="div">{lorem.sentence()}</Text>
</Container>
```

Add a shadow or border to the Container using `withShadow` and `withBorder` props

```js
---
example: true
---
<Container
  as="div"
  size="medium"
  textAlign="center"
  margin="small"
  withBorder
  withShadow
>
  <Text as="div">{lorem.sentence()}</Text>
</Container>
```

### The `as` prop

Change the `as` prop to set what element Container should render as.
In the example below a `<section>` wraps a `<header>` and a paragraph of content.
The outermost `<section>` Container provides padding for all the content, while
the header and paragraph are separated by bottom margin from the `<header>` Container.

```js
---
example: true
---
<Container
  as="section"
  visualDebug
  padding="small"
>
  <Container
    as="header"
    visualDebug
    margin="0 0 medium"
  >

    <Grid startAt="medium" vAlign="middle" colSpacing="none">
      <GridRow>
        <GridCol>
          <Heading>My container is a &lt;header&gt;</Heading>
        </GridCol>
        <GridCol width="auto">
          <Button variant="primary">Some action</Button>
        </GridCol>
      </GridRow>
    </Grid>

  </Container>
  <Text as="p">{lorem.paragraph()}</Text>
</Container>
```

### Inline Containers

Setting `display` to `inline`, styles the Container to display
inline-block with other inline elements.

```js
---
example: true
---
<Container as="div" textAlign="center" padding="x-small" visualDebug>
  <Container
    display="inline"
    visualDebug
    size="small"
    textAlign="end"
    margin="large auto"
    padding="0 small 0 0"
  >
    <Text as="div">{lorem.sentence()}</Text>
  </Container>
  <Button variant="success">Some action</Button>
</Container>
```

