# ContextView


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


### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| ContextView | as | `keyof JSX.IntrinsicElements \| ComponentType<P>` | No | `'span'` | The element to render as the component root |
| ContextView | elementRef | `(element: Element \| null) => void` | No | `() => {}` | provides a reference to the underlying html root element |
| ContextView | margin | `Spacing` | No | - | Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`, `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via familiar CSS-like shorthand. For example: `margin="small auto large"`. |
| ContextView | padding | `Spacing` | No | - | Valid values are `0`, `none`, `xxx-small`, `xx-small`, `x-small`, `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via familiar CSS-like shorthand. For example: `padding="small x-large large"`. |
| ContextView | height | `string \| number` | No | `'auto'` |  |
| ContextView | width | `string \| number` | No | `'auto'` |  |
| ContextView | maxHeight | `string \| number` | No | - |  |
| ContextView | maxWidth | `string \| number` | No | - |  |
| ContextView | minHeight | `string \| number` | No | - |  |
| ContextView | minWidth | `string \| number` | No | - |  |
| ContextView | children | `React.ReactNode` | No | `null` | The children to render inside the `<ContextView />` |
| ContextView | textAlign | `'start' \| 'center' \| 'end'` | No | `'start'` | Designates the text alignment within the `<ContextView />` |
| ContextView | shadow | `Shadow` | No | `'resting'` | Controls the shadow depth for the `<ContextView />` |
| ContextView | stacking | `Stacking` | No | - | Controls the z-index depth for the `<ContextView />` |
| ContextView | background | `'default' \| 'inverse'` | No | `'default'` | Designates the background style of the `<ContextView />` |
| ContextView | placement | `PlacementPropValues` | No | `'center end'` | Specifies how the arrow for `<ContextView />` will be rendered. Ex. `placement="top"` will render with an arrow pointing down. |
| ContextView | debug | `boolean` | No | `false` | Activate an outline around the component to make building your layout easier |
| ContextView | borderColor | `string` | No | - | Sets the color of the ContextView border. Accepts a color string value (e.g., "#FFFFFF", "red") |

### Usage

Install the package:

```shell
npm install @instructure/ui-view
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { ContextView } from '@instructure/ui-view'
```

