# NumberInput


A controlled number input field.
By deafult, it renders a `<intput type="number">` to the DOM. However, if you need any string value, use the `allowStringValue` flag. Only use this if absolutely necessary, since it could be confusing for screenreader users.
Note that this field **does not work
uncontrolled** - you must pass event handlers if you want it to respond to
user input.

This example handles arrow buttons, up/down arrow keys, and typing into
the input. It also includes an `onBlur` handler that displays an error message
if the input is invalid or missing.

```js
---
type: example
---
const Example = () => {
  const MIN = 0
  const MAX = 999

  const [disabled, setDisabled] = useState(false)
  const [inline, setInline] = useState(false)
  const [messages, setMessages] = useState(null)
  const [number, setNumber] = useState(null)
  const [readOnly, setReadOnly] = useState(false)
  const [showArrows, setShowArrows] = useState(true)
  const [value, setValue] = useState('')

  const handleChange = (event, value) => {
    setMessages(null)
    setNumber(value ? Number(value) : null)
    setValue(value)
  }

  const handleDecrement = (event) => {
    if (!isNaN(number)) {
      const newNumber =
        number === null
          ? MIN
          : Number.isInteger(number)
          ? number - 1
          : Math.floor(number)
      updateNumber(newNumber)
    }
  }

  const handleIncrement = (event) => {
    if (!isNaN(number)) {
      const newNumber =
        number === null
          ? MIN + 1
          : Number.isInteger(number)
          ? number + 1
          : Math.ceil(number)
      updateNumber(newNumber)
    }
  }

  const handleBlur = (event) => {
    if (isNaN(number)) return invalidNumber(value)
    if (number === null) return required()
    return updateNumber(Math.round(number))
  }

  const updateNumber = (n) => {
    const number = bound(n)
    setMessages(null)
    setNumber(number)
    setValue(number)
  }

  const bound = (n) => {
    if (n < MIN) return MIN
    if (n > MAX) return MAX
    return n
  }

  const invalidNumber = (value) => {
    setMessages([
      { text: `'${value}' is not a valid number.`, type: 'newError' }
    ])
  }

  const required = () => {
    setMessages([{ text: 'This is required.', type: 'newError' }])
  }

  const toggleDisabled = (event) => {
    setDisabled((prevDisabled) => !prevDisabled)
  }

  const toggleInline = (event) => {
    setInline((prevInline) => !prevInline)
  }

  const toggleReadOnly = (event) => {
    setReadOnly((prevReadOnly) => !prevReadOnly)
  }

  const toggleShowArrows = (event) => {
    setShowArrows((prevShowArrows) => !prevShowArrows)
  }

  return (
    <FormFieldGroup description="Controlled NumberInput example">
      <Checkbox
        checked={showArrows}
        label="Show arrows"
        onChange={toggleShowArrows}
      />
      <Checkbox
        checked={disabled}
        label="Disabled"
        onChange={toggleDisabled}
      />
      <Checkbox
        checked={readOnly}
        label="Read only"
        onChange={toggleReadOnly}
      />
      <Checkbox
        checked={inline}
        label="Inline display"
        onChange={toggleInline}
      />
      <NumberInput
        renderLabel={`How old are you? (${MIN}-${MAX})`}
        display={inline ? 'inline-block' : null}
        messages={messages}
        onBlur={handleBlur}
        onChange={handleChange}
        onDecrement={handleDecrement}
        onIncrement={handleIncrement}
        placeholder="Age (in years)"
        interaction={
          disabled ? 'disabled' : readOnly ? 'readonly' : 'enabled'
        }
        isRequired
        showArrows={showArrows}
        value={value}
      />
    </FormFieldGroup>
  )
}

render(<Example />)
```

> Note: `NumberInput` accepts a string or number as its `value`. However, the value returned by the `onChange` callback is always a string and should be converted to a number before attempting to augment it.

NumberInput comes in 2 sizes. The default size is "medium".

```js
---
type: example
---
<div>
  <NumberInput renderLabel="Default-size input" /><br/>
  <NumberInput size="large" renderLabel="Large-size input" />
</div>
```

### Guidelines

```js
---
type: embed
---
<Guidelines>
  <Figure recommendation="yes" title="Do">
    <Figure.Item>Use when you need increment/decrement functionality</Figure.Item>
    <Figure.Item>Use labels at the top or to the left of the input field</Figure.Item>
  </Figure>
  <Figure recommendation="no" title="Don't">
    <Figure.Item>Place labels or text strings to the right of the input field</Figure.Item>
  </Figure>
</Guidelines>
```


### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| NumberInput | renderLabel | `Renderable` | Yes | - | The form field label. |
| NumberInput | id | `string` | No | - | The id of the input. One is generated if not supplied. |
| NumberInput | interaction | `InteractionType` | No | `undefined` | Specifies if interaction with the input is enabled, disabled, or readonly. When "disabled", the input changes visibly to indicate that it cannot receive user interactions. When "readonly" the input still cannot receive user interactions but it keeps the same styles as if it were enabled. |
| NumberInput | messages | `FormMessage[]` | No | `[]` | Array of objects with shape: `{ text: ReactNode, type: One of: ['newError', 'error', 'hint', 'success', 'screenreader-only'] }` |
| NumberInput | placeholder | `string` | No | - | Html placeholder text to display when the input has no value. This should be hint text, not a label replacement. |
| NumberInput | isRequired | `boolean` | No | `false` | Whether or not the text input is required. |
| NumberInput | showArrows | `boolean` | No | `true` | Whether or not to display the up/down arrow buttons. |
| NumberInput | size | `'medium' \| 'large'` | No | `'medium'` | The size of the input. |
| NumberInput | value | `string \| number` | No | - | The value of the input (should be accompanied by an `onChange` prop). |
| NumberInput | width | `string` | No | - | The width of the input. |
| NumberInput | display | `'inline-block' \| 'block'` | No | `'block'` | The display of the root element. |
| NumberInput | inputRef | `(element: HTMLInputElement \| null) => void` | No | - | A function that provides a reference to the actual input element. |
| NumberInput | onFocus | `(event: React.FocusEvent<HTMLInputElement>) => void` | No | - | Callback fired when input receives focus. |
| NumberInput | onBlur | `(event: React.FocusEvent<HTMLInputElement>) => void` | No | - | Callback fired when the input loses focus. |
| NumberInput | onChange | `(event: React.ChangeEvent<HTMLInputElement>, value: string) => void` | No | - | Callback executed when the input fires a change event. @param {Object} event - the event object @param {string} value - the string value of the input |
| NumberInput | onDecrement | `( event: \| React.KeyboardEvent<HTMLInputElement> \| React.MouseEvent<HTMLButtonElement> ) => void` | No | - | Called when the down arrow button is clicked, or the down arrow key is pressed. |
| NumberInput | onIncrement | `( event: \| React.KeyboardEvent<HTMLInputElement> \| React.MouseEvent<HTMLButtonElement> ) => void` | No | - | Called when the up arrow button is clicked, or the up arrow key is pressed. |
| NumberInput | onKeyDown | `(event: React.KeyboardEvent<HTMLInputElement>) => void` | No | - | Callback fired when a key is pressed. |
| NumberInput | inputMode | `'numeric' \| 'decimal' \| 'tel'` | No | `'numeric'` | The inputMode attribute of the underlying `input` element can be one of ['numeric', 'decimal', 'tel'] |
| NumberInput | textAlign | `'start' \| 'center'` | No | `'start'` | The text alignment of the input. |
| NumberInput | allowStringValue | `boolean` | No | `false` | sets the input type to string and allows string as value |
| NumberInput | renderIcons | `{ increase: Renderable decrease: Renderable }` | No | - | Sets the icons to be rendered for increase and decrease buttons |
| NumberInput | margin | `Spacing` | No | - | Margin around the component. Accepts a `Spacing` token. See token values and example usage in [this guide](https://instructure.design/#layout-spacing). |

### Usage

Install the package:

```shell
npm install @instructure/ui-number-input
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { NumberInput } from '@instructure/ui-number-input'
```

