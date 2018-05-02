---
describes: ContextView
---

A `<ContextView/>` is a container component that displays contextual information. It may or may not
be displayed as on overlay using a [Popover](#Popover).

`<ContextView/>` defaults to no padding around its content. To add padding, use the `padding` prop.

Use the `textAlign` prop to change the alignment of the text inside `<ContextView />`.

In use cases where `<ContextView/>` is not absolutely positioned, use the `margin` prop to set margin
around the component.

```js
---
example: true
---
<div>
  <ContextView
    padding="small"
    margin="large"
    placement="end top"
    shadow="resting"
  >
    <Heading level="h3">Hello World</Heading>
  </ContextView>
  <ContextView
    margin="0 large 0 0"
    padding="small"
    placement="top"
  >
    <Heading level="h3">Hello World</Heading>
    <Text size="small">Some informational text that is helpful</Text>
  </ContextView>
  <ContextView
    margin="0 large 0 0"
    padding="small"
    textAlign="end"
    placement="start"
  >
    <Heading level="h3">Hello World</Heading>
    <Text size="small">This ContextView is end-text-aligned</Text>
  </ContextView>
  <ContextView
    placement="end bottom"
    padding="medium"
    background="inverse"
    width="30rem"
    margin="x-large 0 0"
  >
    <Text size="small">
      This ContextView uses the inverse background and medium padding. Its width prop is set to `30rem`, which causes long strings like this to wrap. It also has top margin to separate it from the ContextViews above it.
    </Text>
  </ContextView>
</div>
```
