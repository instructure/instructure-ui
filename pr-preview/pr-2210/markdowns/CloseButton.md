# CloseButton


Some design patterns require a `CloseButton` to be placed in the start or end position. This is a helper component that gives you the close icon out of the box and facilitates placement.

The `placement` prop designates the `CloseButton` placement within the parent container. Note that in order to apply an `offset`, `placement` should be set to `start` or `end`. Also make sure that the container has a `position` css style applied other than `static`. In the following example we use [View](View) as the container and set the `position` to `relative`.

```js
---
type: example
---
<View display="block" position="relative" height="5rem" background="primary" shadow="resting">
  <CloseButton placement="end" offset="small" screenReaderLabel="Close" />
</View>
```

If you need the `CloseButton` to work in a layout with other elements vs. absolutely positioning it, you can omit the `placement` prop or set it to `static`. You can then use another tool such as [Flex](Flex) to handle the layout.

```js
---
type: example
---
<View display="block" position="relative" background="primary" shadow="resting">
  <Flex height="6rem" justifyItems="space-between" alignItems="center" padding="medium">
    <Flex.Item shouldShrink shouldGrow>
      <Heading level="h2">Some Heading Text</Heading>
    </Flex.Item>
    <Flex.Item padding="none none none medium">
      <CloseButton size="medium" screenReaderLabel="Close" />
    </Flex.Item>
  </Flex>
</View>
```

If you need even more customization, note that you can always compose this component using the [IconButton](IconButton) directly. Supply the `renderIcon` prop with [IconXSolid](icons) and set the `withBorder` and `withBackground` props to `false`.

```js
---
type: example
---
<View display="block" position="relative" height="5rem" background="primary" shadow="resting">
  <Flex justifyItems="end">
    <Flex.Item>
      <IconButton
        screenReaderLabel="Close"
        renderIcon={IconXSolid}
        size="small"
        withBackground={false}
        withBorder={false}
        margin="small"
      />
    </Flex.Item>
  </Flex>
</View>
```

### Guidelines

```js
---
type: embed
---
<Guidelines>
  <Figure recommendation="a11y" title="Accessibility">
    <Figure.Item>Set the <code>color</code> prop to <code>primary</code> when a CloseButton appears on a dark background to ensure adequate contrast</Figure.Item>
    <Figure.Item>Ensure the CloseButton is labeled correctly using the <code>screenReaderLabel</code> prop so screen readers announce what action will be taken when selected</Figure.Item>
  </Figure>
</Guidelines>
```


### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| CloseButton | screenReaderLabel | `React.ReactNode` | Yes | - | An accessible label for the `CloseButton` (required) |
| CloseButton | color | `'primary' \| 'primary-inverse'` | No | - | Specifies the color for the `CloseButton`. |
| CloseButton | interaction | `'enabled' \| 'disabled' \| 'readonly'` | No | `undefined` | Specifies if interaction with the `CloseButton` is enabled, disabled, or readonly. |
| CloseButton | elementRef | `(element: Element \| null) => void` | No | - | Provides a reference to the `CloseButton`'s underlying html element. |
| CloseButton | size | `'small' \| 'medium' \| 'large'` | No | `'small'` | The size of the `CloseButton` |
| CloseButton | onClick | `( event: React.KeyboardEvent<ViewProps> \| React.MouseEvent<ViewProps> ) => void` | No | - | Callback fired when the `CloseButton` is clicked. |
| CloseButton | margin | `Spacing` | No | `'0'` | Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`, `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via familiar CSS-like shorthand. For example: `margin="small auto large"`. |
| CloseButton | placement | `'start' \| 'end' \| 'static'` | No | `'static'` | Specifies the placement of the `CloseButton` |
| CloseButton | offset | `'none' \| 'x-small' \| 'small' \| 'medium'` | No | `'x-small'` | Specifies the offset distance for the `CloseButton` with respect to both the top and start/end of the container. Note that for this property to have an effect, the `placement` prop must be set to either `start` or `end`. The offset will also be created with respect to a positioned parent. If it does not appear to be working, try setting the `position` of the parent container to `relative`. |
| CloseButton | type | `'button' \| 'submit' \| 'reset'` | No | `'button'` | Specifies the type of the `Button`'s underlying html element. |
| CloseButton | as | `keyof JSX.IntrinsicElements \| ComponentType<P>` | No | `'button'` | The element to render as the component root, `CloseButton` by default. |
| CloseButton | href | `string` | No | - | Specifies an href attribute for the `CloseButton`'s underlying html element. |
| CloseButton | cursor | `\| 'auto' \| 'default' \| 'none' \| 'context-menu' \| 'help' \| 'pointer' \| 'progress' \| 'wait' \| 'cell' \| 'crosshair' \| 'text' \| 'vertical-text' \| 'alias' \| 'copy' \| 'move' \| 'no-drop' \| 'not-allowed' \| 'grab' \| 'grabbing' \| 'all-scroll' \| 'col-resize' \| 'row-resize' \| 'n-resize' \| 'e-resize' \| 's-resize' \| 'w-resize' \| 'ne-resize' \| 'nw-resize' \| 'se-resize' \| 'sw-resize' \| 'ew-resize' \| 'ns-resize' \| 'nesw-resize' \| 'nwse-resize' \| 'zoom-in' \| 'zoom-out'` | No | `'pointer'` | Specify a mouse cursor to use when hovering over the `CloseButton`. |
| CloseButton | tabIndex | `number` | No | - | Specifies the tabindex of the `CloseButton`. |
| CloseButton | to | `string` | No | - | Needed for React Router links @private |

### Usage

Install the package:

```shell
npm install @instructure/ui-buttons
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { CloseButton } from '@instructure/ui-buttons'
```

