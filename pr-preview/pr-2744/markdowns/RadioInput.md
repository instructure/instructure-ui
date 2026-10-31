# RadioInput


By default, the RadioInput component is a custom styled HTML radio button.

Adjust the size of the RadioInput and its label text via the `size` prop. The default size is
`medium`.

```js
---
type: example
---
<RadioInput
  label="See RadioInputGroup for more details"
  value="foo"
  name="bar"
  checked
/>
```

### Guidelines

```js
---
type: embed
---
<Guidelines>
  <Figure recommendation="yes" title="Do">
    <Figure.Item>Use sentence-style capitalization</Figure.Item>
    <Figure.Item>Use a clear and concise label for RadioInput</Figure.Item>
    <Figure.Item>Optionally include a heading to provide further clarity</Figure.Item>
  </Figure>
  <Figure recommendation="no" title="Don't">
    <Figure.Item>Have a single RadioInput</Figure.Item>
    <Figure.Item>Use long labels for RadioInput</Figure.Item>
    <Figure.Item>Display more than two radio inputs horizontally</Figure.Item>
  </Figure>
</Guidelines>
```


### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| RadioInput | label | `React.ReactNode` | Yes | - | The label displayed next to the checkbox |
| RadioInput | value | `string \| number` | No | - | This maps to the low level HTML attribute [with the same name](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio#value) |
| RadioInput | id | `string` | No | - |  |
| RadioInput | name | `string` | No | - | The [name](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio#defining_a_radio_group) defines which group it belongs to, it's managed by the `RadioInputGroup` this component belongs to. Do not set it manually. |
| RadioInput | checked | `boolean` | No | - |  |
| RadioInput | disabled | `boolean` | No | `false` | Whether to disable the input |
| RadioInput | readOnly | `boolean` | No | `false` | Works just like disabled but keeps the same styles as if it were active |
| RadioInput | variant | `'simple' \| 'toggle'` | No | `'simple'` |  |
| RadioInput | size | `'small' \| 'medium' \| 'large'` | No | `'medium'` |  |
| RadioInput | context | `'success' \| 'warning' \| 'danger' \| 'off'` | No | `'success'` |  |
| RadioInput | inline | `boolean` | No | `false` |  |
| RadioInput | onClick | `(event: React.MouseEvent<HTMLInputElement>) => void` | No | - |  |
| RadioInput | onChange | `(event: React.ChangeEvent<HTMLInputElement>) => void` | No | - | Callback fired when the input fires a change event. event.target.value will contain the new value. It will always be a string. |
| RadioInput | inputRef | `(inputElement: HTMLInputElement \| null) => void` | No | - | A function that provides a reference to the actual underlying input element |

### Usage

Install the package:

```shell
npm install @instructure/ui-radio-input
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { RadioInput } from '@instructure/ui-radio-input'
```

