# RadioInput


By default, the RadioInput component is a custom styled HTML radio button.

Adjust the size of the RadioInput and its label text via the `size` prop. The default size is
`medium`. See [RadioInputGroup](/RadioInputGroup) for more details

```js
---
type: example
---
<InstUISettingsProvider>
<Flex>
  <Flex direction="column" margin="medium" gap="medium">
    <RadioInput
      label="small"
      value="foo"
      name="bar"
      size="small"
    />
    <RadioInput
      label="medium"
      value="foo2"
      name="bar2"
    />
    <RadioInput
      label="large"
      value="foo3"
      name="bar3"
      size="large"
    />
    <RadioInput
      label="large disabled"
      value="foo4"
      name="bar4"
      size="large"
      disabled
    />
    <RadioInput
      label="large readonly"
      value="foo5"
      name="bar5"
      size="large"
      readOnly
    />
  </Flex>
  <Flex direction="column" margin="medium" gap="medium">
    <RadioInput
      label="small"
      value="foo6"
      name="bar6"
      checked
      size="small"
      checked
    />
    <RadioInput
      label="medium"
      value="foo7"
      name="bar7"
      checked
    />
    <RadioInput
      label="large"
      value="foo8"
      name="bar8"
      size="large"
      checked
    />
    <RadioInput
      label="large disabled checked"
      value="foo9"
      name="bar9"
      size="large"
      disabled
      checked
    />
    <RadioInput
      label="large readonly"
      value="foo10"
      name="bar10"
      size="large"
      readOnly
      checked
    />
  </Flex>
</Flex>
</InstUISettingsProvider>
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
| RadioInput | id | `string` | No | - | The id of the input element. If not provided, a unique id will be generated. |
| RadioInput | name | `string` | No | - | The [name](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio#defining_a_radio_group) defines which group it belongs to, it's managed by the `RadioInputGroup` this component belongs to. Do not set it manually. |
| RadioInput | checked | `boolean` | No | - | Sets the `checked` prop of the underlying input element. If left undefined, the component will control its own state. |
| RadioInput | disabled | `boolean` | No | - | Whether to disable the input |
| RadioInput | readOnly | `boolean` | No | - | Works just like disabled but keeps the same styles as if it were active |
| RadioInput | variant | `'simple' \| 'toggle'` | No | - | The visual style of the radio button |
| RadioInput | size | `'small' \| 'medium' \| 'large'` | No | - |  |
| RadioInput | context | `'success' \| 'warning' \| 'danger' \| 'off'` | No | - | Sets the background color of the radio button when `variant="toggle"` |
| RadioInput | inline | `boolean` | No | - | Sets the `display:inline-flex` in CSS |
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

