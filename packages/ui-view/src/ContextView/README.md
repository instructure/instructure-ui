---
describes: ContextView
---

`<ContextView/>` is a container that can be rendered inline in the document flow (vs as a [Popover](#Popover)) but with an arrow pointing to something. See [RangeInput](#RangeInput) for an example of how ContextView can be used to display contextual information in conjunction with another component. It is used internally in [Popover](#Popover).

- Defaults to no padding around its content. To add padding, use the `padding` prop.

- Use the `textAlign` prop to change the alignment of the text inside `<ContextView />`.

- In use cases where `<ContextView/>` is not absolutely positioned, use the `margin` prop to set margin around the component.

```js
---
type: example
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
