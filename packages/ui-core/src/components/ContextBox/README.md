---
describes: ContextBox
---

A `<ContextBox/>` is a container component that displays contextual information. It may or may not
be displayed as on overlay using a [Popover](#Popover).

`<ContextBox/>` defaults to no padding around its content. To add padding, use the `padding` prop.

Use the `textAlign` prop to change the alignment of the text inside `<ContextBox />`.

In use cases where `<ContextBox/>` is not absolutely positioned, use the `margin` prop to set margin
around the component.

```js
---
example: true
---
<div>
  <ContextBox padding="small" margin="0 large 0 0">
    <Heading level="h3">Hello World</Heading>
  </ContextBox>
  <ContextBox
    margin="0 large 0 0"
    padding="small"
    placement="top"
  >
    <Heading level="h3">Hello World</Heading>
    <Text size="small">Some informational text that is helpful</Text>
  </ContextBox>
  <ContextBox
    margin="0 large 0 0"
    padding="small"
    textAlign="end"
    placement="start"
  >
    <Heading level="h3">Hello World</Heading>
    <Text size="small">This ContextBox is end-text-aligned</Text>
  </ContextBox>
  <ContextBox
    placement="bottom"
    padding="medium"
    variant="inverse"
    size="small"
    margin="x-large 0 0"
  >
    <Text size="small">
      This ContextBox uses the inverse variant and medium padding. Its size prop is set to small,
      which causes long strings like this to wrap. It also has top margin to separate it from
      the ContextBoxes about it.
    </Text>
  </ContextBox>
</div>
```
