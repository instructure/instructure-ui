# IconButton


An IconButton can be used when the Button only renders an Icon and does not have other visual elements or text content.
It is not recommended to set the size of an icon inside an IconButton. Only use the `size` property of the IconButton.

```js
---
type: example
---
<IconButton screenReaderLabel="Add User"><IconAddLine /></IconButton>
```

### Accessibility

Because the IconButton visually only renders an icon, a description is necessary for assistive technologies. The `screenReaderLabel` prop is required for this purpose, and should consist of a complete description of the action.

```js
---
type: example
---
<IconButton color="primary" screenReaderLabel="Add blog post"><IconAddLine /></IconButton>
```

Using [Tooltip](Tooltip) in conjunction with IconButton can also provide necessary context when the IconButton alone would be insufficient.

```js
---
type: example
---
<Tooltip
  renderTip="View user profile"
  on={['hover', 'focus']}
  placement="bottom"
>
  <IconButton screenReaderLabel="View user profile"><IconUserLine /></IconButton>
</Tooltip>
```

### AI Icon buttons

```js
---
type: example
---
<View display="block">
  <IconButton color="ai-primary" screenReaderLabel="AI button" margin="small"><IconAiSolid/></IconButton>
  <IconButton color="ai-secondary" screenReaderLabel="AI button"  margin="small"><IconAiColoredSolid/></IconButton>
</View>
```

### Shaping

The `shape` prop specifies if the IconButton will render as a `rectangle` or `circle`.

```js
---
type: example
---
<View display="block">
  <IconButton shape="rectangle" screenReaderLabel="Delete tag" margin="small"><IconXSolid /></IconButton>
  <IconButton shape="circle" screenReaderLabel="Delete tag" margin="small"><IconXSolid /></IconButton>
</View>
```

### Rendering only the icon

The background and border can be optionally removed as needed by setting the `withBorder` and `withBackground` props to `false`

```js
---
type: example
---
<View display="block">
  <View display="inline-block" background="primary">
    <IconButton withBackground={false} withBorder={false} screenReaderLabel="Delete tag" margin="large">
      <IconXSolid />
    </IconButton>
  </View>
  <View display="inline-block" background="primary-inverse">
    <IconButton withBackground={false} withBorder={false} color="primary-inverse" screenReaderLabel="Delete tag" margin="large">
      <IconXSolid />
    </IconButton>
  </View>
</View>
```

### Styling

For an example see [Button](Button/#Styling%20buttons)


### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| IconButton | children | `Renderable` | No | - | An icon, or function returning an icon (identical to the `renderIcon` prop). |
| IconButton | renderIcon | `Renderable` | No | - | An icon, or function that returns an icon (identical to the `children` prop). |
| IconButton | screenReaderLabel | `ReactNode` | Yes | - | An accessible label for the `IconButton`. |
| IconButton | type | `'button' \| 'submit' \| 'reset'` | No | `'button'` | Specifies the type of the `IconButton`'s underlying html element. |
| IconButton | size | `'small' \| 'medium' \| 'large'` | No | `'medium'` | The size of the `IconButton` |
| IconButton | elementRef | `(element: Element \| null) => void` | No | - | Provides a reference to the `IconButton`'s underlying html element. |
| IconButton | as | `AsElementType` | No | `'button'` | The element to render as the component root, `button` by default. |
| IconButton | interaction | `'enabled' \| 'disabled' \| 'readonly'` | No | `undefined` | Specifies if interaction with the `IconButton` is enabled, disabled, or readonly. |
| IconButton | color | `\| 'primary' \| 'primary-inverse' \| 'secondary' \| 'success' \| 'danger' \| 'ai-primary' \| 'ai-secondary'` | No | `'secondary'` | Specifies the color for the `IconButton`. |
| IconButton | focusColor | `'info' \| 'inverse'` | No | - | Override the `Button`'s default focus outline color. |
| IconButton | shape | `'rectangle' \| 'circle'` | No | `'rectangle'` | Specifies if the `IconButton` shape should be a circle or rectangle. |
| IconButton | withBackground | `boolean` | No | `true` | Specifies if the `IconButton` should render with a solid background. When false, the background is transparent. |
| IconButton | withBorder | `boolean` | No | `true` | Specifies if the `IconButton` should render with a border. |
| IconButton | margin | `Spacing` | No | `'0'` | Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`, `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via familiar CSS-like shorthand. For example: `margin="small auto large"`. |
| IconButton | cursor | `Cursor` | No | `'pointer'` | Specify a mouse cursor to use when hovering over the button. The `pointer` cursor is used by default. |
| IconButton | href | `string` | No | - | Specifies an href attribute for the `IconButton`'s underlying html element. |
| IconButton | onClick | `( event: React.KeyboardEvent<ViewProps> \| React.MouseEvent<ViewProps> ) => void` | No | - | Callback fired when the `Button` is clicked. |

### Usage

Install the package:

```shell
npm install @instructure/ui-buttons
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { IconButton } from '@instructure/ui-buttons'
```

