# BaseButton


`BaseButton` is a low level utility component used to compose Instructure UI buttons. In most cases, it should not be used directly.
Use [Button](#Button), [CloseButton](#CloseButton), [IconButton](#IconButton), or [CondensedButton](#CondensedButton) instead.

```js
---
type: example
---
<View display="block" margin="medium">
  <BaseButton>Click me</BaseButton>
</View>
```


### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| BaseButton | children | `React.ReactNode` | No | - | Specifies the `Button` children. |
| BaseButton | type | `'button' \| 'submit' \| 'reset'` | No | `'button'` | Specifies the type of the `Button`'s underlying html element. |
| BaseButton | size | `'small' \| 'medium' \| 'large'` | No | `'medium'` | The size of the `Button` |
| BaseButton | elementRef | `(element: HTMLElement \| null) => void` | No | - | Provides a reference to the `Button`'s underlying html element. |
| BaseButton | as | `keyof JSX.IntrinsicElements \| ComponentType<P>` | No | `'button'` | The element to render as the component root, `Button` by default. |
| BaseButton | interaction | `InteractionType` | No | `undefined` | Specifies if interaction with the `Button` is enabled, disabled, or readonly. |
| BaseButton | color | `\| 'primary' \| 'primary-inverse' \| 'secondary' \| 'success' \| 'danger' \| 'ai-primary' \| 'ai-secondary'` | No | `'secondary'` | Specifies the color for the `Button`. |
| BaseButton | focusColor | `'info' \| 'inverse'` | No | - | Override the `Button`'s default focus outline color. |
| BaseButton | display | `'inline-block' \| 'block'` | No | `'inline-block'` | The `Button` display property. When set to `inline-block`, the `Button` displays inline with other elements. When set to block, the `Button` expands to fill the width of the container. |
| BaseButton | textAlign | `'start' \| 'center'` | No | `'start'` | Sets the alignment of the `Button` children and/or icon. |
| BaseButton | shape | `'rectangle' \| 'circle'` | No | `'rectangle'` | Specifies if the `Button` shape should be a circle or rectangle. |
| BaseButton | withBackground | `boolean` | No | `true` | Specifies if the `Button` should render with a solid background. When false, the background is transparent. |
| BaseButton | withBorder | `boolean` | No | `true` | Specifies if the `Button` should render with a border. |
| BaseButton | isCondensed | `boolean` | No | `false` | Designates if the `Button` should render without padding. This option should only be set when `withBorder` and `withBackground` are also set to false. |
| BaseButton | margin | `Spacing` | No | `'0'` | Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`, `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via familiar CSS-like shorthand. For example: `margin="small auto large"`. |
| BaseButton | cursor | `Cursor` | No | `'pointer'` | Specify a mouse cursor to use when hovering over the button. The `pointer` cursor is used by default. |
| BaseButton | href | `string` | No | - | Specifies an href attribute for the `Button`'s underlying html element. |
| BaseButton | onClick | `( event: React.KeyboardEvent<ViewProps> \| React.MouseEvent<ViewProps> ) => void` | No | - | Callback fired when the `Button` is clicked. |
| BaseButton | onKeyDown | `(event: React.KeyboardEvent<ViewProps>) => void` | No | - | Callback fired when the `Button` receives a keydown event. |
| BaseButton | renderIcon | `\| keyof ReactHTML \| keyof ReactSVG \| ClassType<P, ClassicComponent<P, ComponentState>, ClassicComponentClass<P>> \| ComponentClass \| ReactNode \| ((data: P) => ReactNode \| Element) \| (() => ReactNode \| Element) \| Element` | No | - | An icon, or function that returns an icon. |
| BaseButton | tabIndex | `number` | No | - | Specifies the tabindex of the `Button`. |
| BaseButton | withFocusOutline | `boolean` | No | - | Manually control if the `Button` should display a focus outline. When left `undefined` (which is the default) the focus outline will display if this component is focusable and receives focus. |
| BaseButton | to | `string` | No | - | Needed for React Router links @private |

### Usage

Install the package:

```shell
npm install @instructure/ui-buttons
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { BaseButton } from '@instructure/ui-buttons'
```

