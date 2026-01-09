# CondensedButton


CondensedButton is a button component that renders without padding. It is meant specifically for tight spaces, or areas where the button padding would prevent the button content from aligning correctly with other elements.

```js
---
type: example
---
<View display="block" background="primary" padding="small">
  <CondensedButton>Click Me</CondensedButton>
</View>
```

In the following example, CondensedButton is used so that the button content can align with the rest of the table cell content.

```js
---
type: example
---
<Table caption='Tallest Roller Coasters'>
  <Table.Head>
    <Table.Row>
      <Table.ColHeader id="Roller Coaster">
        Roller Coaster
      </Table.ColHeader>
      <Table.ColHeader id="Height">
        Height
      </Table.ColHeader>
      <Table.ColHeader id="Amusement Park">
        Amusement Park
      </Table.ColHeader>
    </Table.Row>
  </Table.Head>
  <Table.Body>
    <Table.Row>
      <Table.Cell>
        Kingda Ka<br />
        <CondensedButton>View Advanced Stats</CondensedButton>
      </Table.Cell>
      <Table.Cell>
        456.0ft
      </Table.Cell>
      <Table.Cell>
        Six Flags Great America
      </Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell>
        Top Thrill Dragster<br />
        <CondensedButton>View Advanced Stats</CondensedButton>
      </Table.Cell>
      <Table.Cell>
        420.0ft
      </Table.Cell>
      <Table.Cell>
        Cedar Point
      </Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell>
        Superman: Escape from Krypton<br />
        <CondensedButton>View Advanced Stats</CondensedButton>
      </Table.Cell>
      <Table.Cell>
        415.0ft
      </Table.Cell>
      <Table.Cell>
        Six Flags Magic Mountain
      </Table.Cell>
    </Table.Row>
  </Table.Body>
</Table>
```


### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| CondensedButton | children | `React.ReactNode` | No | - | Specifies the `CondensedButton` children. |
| CondensedButton | type | `'button' \| 'submit' \| 'reset'` | No | `'button'` | Specifies the type of the `CondensedButton`'s underlying html element. |
| CondensedButton | size | `'small' \| 'medium' \| 'large'` | No | `'medium'` | The size of the `CondensedButton` |
| CondensedButton | elementRef | `(element: Element \| null) => void` | No | - | Provides a reference to the `CondensedButton`'s underlying html element. |
| CondensedButton | as | `keyof JSX.IntrinsicElements \| ComponentType<P>` | No | `'button'` | The element to render as the component root, `button` by default. |
| CondensedButton | interaction | `'enabled' \| 'disabled' \| 'readonly'` | No | `undefined` | Specifies if interaction with the `CondensedButton` is enabled, disabled, or readonly. |
| CondensedButton | color | `'primary' \| 'primary-inverse' \| 'secondary'` | No | `'primary'` | Specifies the color for the `CondensedButton`. |
| CondensedButton | margin | `Spacing` | No | `'0'` | Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`, `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via familiar CSS-like shorthand. For example: `margin="small auto large"`. |
| CondensedButton | cursor | `\| 'auto' \| 'default' \| 'none' \| 'context-menu' \| 'help' \| 'pointer' \| 'progress' \| 'wait' \| 'cell' \| 'crosshair' \| 'text' \| 'vertical-text' \| 'alias' \| 'copy' \| 'move' \| 'no-drop' \| 'not-allowed' \| 'grab' \| 'grabbing' \| 'all-scroll' \| 'col-resize' \| 'row-resize' \| 'n-resize' \| 'e-resize' \| 's-resize' \| 'w-resize' \| 'ne-resize' \| 'nw-resize' \| 'se-resize' \| 'sw-resize' \| 'ew-resize' \| 'ns-resize' \| 'nesw-resize' \| 'nwse-resize' \| 'zoom-in' \| 'zoom-out'` | No | `'pointer'` | Specify a mouse cursor to use when hovering over the button. The `pointer` cursor is used by default. |
| CondensedButton | href | `string` | No | - | Specifies an href attribute for the `CondensedButton`'s underlying html element. |
| CondensedButton | renderIcon | `React.ReactNode \| (() => React.ReactNode)` | No | - | An icon, or function that returns an icon. |
| CondensedButton | onClick | `( event: React.KeyboardEvent<ViewProps> \| React.MouseEvent<ViewProps> ) => void` | No | - | Callback fired when the `CondensedButton` is clicked. |
| CondensedButton | display | `'inline-block' \| 'block'` | No | `'inline-block'` | The CSS display property of the button, `inline-block` or `block` |
| CondensedButton | to | `string` | No | - | Needed for React Router links @private |

### Usage

Install the package:

```shell
npm install @instructure/ui-buttons
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { CondensedButton } from '@instructure/ui-buttons'
```

