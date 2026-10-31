# TimeSelect


A component used to select a time value.
`TimeSelect` component is a higher level abstraction of [Select](Select) specifically for selecting time values. The list of possible values can be configured via the component's props.

### Uncontrolled

For the most basic implementations, `TimeSelect` can be uncontrolled. If desired, the `defaultValue` prop can be used to set the initial selection.

```javascript
---
type: example
---
<TimeSelect
  renderLabel="Choose a time"
  onChange={(e, { value }) => console.log(value)}
  onHideOptions={(e)=> console.log("hide opts")}
  // defaultValue={new Date().toISOString()}
/>
```

### Controlled

To use `TimeSelect` controlled, simply provide the `value` prop an ISO string. The `onChange` callback provides the ISO value of the corresponding option that was selected. Use this value to update the state.

```js
---
type: example
---
const Example = () => {
  const [value, setValue] = useState('2020-05-18T23:59:00')

  const handleChange = (e, { value }) => {
    setValue(value)
  }

  return (
    <TimeSelect
      renderLabel="Choose a time"
      placeholder="e.g., 4:00:00 PM"
      value={value}
      step={15}
      format="LTS"
      onChange={handleChange}
    />
  )
}

render(<Example />)
```

### Freeform input

By default, the user can only set a value that is divisible by `step` (although the component allows to set any valid time value programmatically). You can allow the user to set any valid value with typing in by setting `allowNonStepInput` to `true`. You can use the `onInputChange` event to see whether the current input is valid and its current value.
Note that the exact value needed to be typed by the user depends on their `locale`:

```javascript
---
type: example
---
<TimeSelect
  renderLabel="Choose a time"
  onChange={(e, { value }) => console.log("change",value)}
  onInputChange={(e, value, isoValue)=> console.log("inputChange", value, isoValue)}
  defaultValue="2022-05-12T05:30:00.000Z"
  locale="en_AU"
  timezone='US/Eastern'
  allowNonStepInput
/>
```

### Guidelines

```js
---
type: embed
---
<Guidelines>
  <Figure recommendation="yes" title="Do">
    <Figure.Item>Use a default value of 11:59 pm for implementations that have to do with due dates</Figure.Item>
    <Figure.Item>Respect the user's `locale` and `timezone` browser settings (the component does this by itself when not setting `locale` or `timezone`).</Figure.Item>
  </Figure>
</Guidelines>
```


### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| TimeSelect | renderLabel | `Renderable` | Yes | - | The form field label. |
| TimeSelect | defaultToFirstOption | `boolean` | No | `false` | Whether to default to the first option when `defaultValue` hasn't been specified. |
| TimeSelect | value | `string` | No | - | An ISO 8601 formatted date string representing the current selected value. If defined, the component will act controlled and will not manage its own state. |
| TimeSelect | defaultValue | `string` | No | - | An ISO 8601 formatted date string to use if `value` isn't provided. |
| TimeSelect | id | `string` | No | - | The id of the text input. One is generated if not supplied. |
| TimeSelect | format | `string` | No | `'LT'` | The format to use when displaying the possible and currently selected options. This component currently rounds seconds down to the minute. Defaults to `LT`, which is localized time without seconds, e.g. "16:45" or "4:45 PM" See [moment](https://momentjs.com/docs/#/displaying/format/) for the list of available formats. |
| TimeSelect | step | `5 \| 10 \| 15 \| 20 \| 30 \| 60` | No | `30` | The number of minutes to increment by when generating the allowable options. |
| TimeSelect | interaction | `'enabled' \| 'disabled' \| 'readonly'` | No | - | Specifies if interaction with the input is enabled, disabled, or readonly. When "disabled", the input changes visibly to indicate that it cannot receive user interactions. When "readonly" the input still cannot receive user interactions, but it keeps the same styles as if it were enabled. |
| TimeSelect | placeholder | `string` | No | - | Html placeholder text to display when the input has no value. This should be hint text, not a label replacement. |
| TimeSelect | isRequired | `boolean` | No | `false` |  |
| TimeSelect | isInline | `boolean` | No | `false` | Whether the input is rendered inline with other elements or if it is rendered as a block level element. |
| TimeSelect | width | `string` | No | - | The width of the text input. |
| TimeSelect | optionsMaxWidth | `string` | No | - | The max width the options list can be before option text wraps. If not set, the list will only display as wide as the text input. |
| TimeSelect | visibleOptionsCount | `number` | No | `8` | The number of options that should be visible before having to scroll. |
| TimeSelect | messages | `FormMessage[]` | No | - | Displays messages and validation for the input. It should be an array of objects with the following shape: `{ text: ReactNode, type: One of: ['newError', 'error', 'hint', 'success', 'screenreader-only'] }` |
| TimeSelect | placement | `PlacementPropValues` | No | `'bottom stretch'` | The placement of the options list. |
| TimeSelect | constrain | `PositionConstraint` | No | `'window'` | The parent in which to constrain the placement. |
| TimeSelect | mountNode | `PositionMountNode` | No | - | An element or a function returning an element to use mount the options list to in the DOM (defaults to `document.body`) |
| TimeSelect | onChange | `( event: React.SyntheticEvent, data: { value: string; inputText: string } ) => void` | No | - | Callback fired when a new option is selected. This can happen in the following ways: 1. User clicks/presses enter on an option in the dropdown and focuses away 2. User enters a valid time manually and focuses away @param event - the event object @param data - additional data containing the value and the input string |
| TimeSelect | onFocus | `(event: React.FocusEvent<HTMLInputElement>) => void` | No | - | Callback fired when text input receives focus. |
| TimeSelect | onBlur | `(event: React.FocusEvent<HTMLInputElement>) => void` | No | - | Callback fired when text input loses focus. |
| TimeSelect | onShowOptions | `(event: React.SyntheticEvent) => void` | No | - | Callback fired when the options list is shown. |
| TimeSelect | onHideOptions | `(event: React.SyntheticEvent) => void` | No | - | Callback fired when the options list is hidden. |
| TimeSelect | inputRef | `(inputElement: HTMLInputElement \| null) => void` | No | - | A ref to the html `input` element. |
| TimeSelect | listRef | `(listElement: HTMLUListElement \| null) => void` | No | - | A ref to the html `ul` element. |
| TimeSelect | renderEmptyOption | `Renderable` | No | `'---'` | Content to display in the list when no options are available. |
| TimeSelect | renderBeforeInput | `Renderable` | No | - | Content to display before the text input. This will commonly be an icon. |
| TimeSelect | renderAfterInput | `Renderable` | No | - | Content to display after the text input. This content will replace the default arrow icons. |
| TimeSelect | locale | `string` | No | - | A standard language identifier. See [moment.js i18n](https://momentjs.com/docs/#/i18n/) for more details. This property can also be set via a context property and if both are set then the component property takes precedence over the context property. The web browser's locale will be used if no value is set via a component property or a context property. |
| TimeSelect | timezone | `string` | No | - | A timezone identifier in the format: Area/Location See [List of tz database time zones](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) for the list of possible options. This property can also be set via a context property and if both are set then the component property takes precedence over the context property. The web browser's timezone will be used if no value is set via a component property or a context property. |
| TimeSelect | allowNonStepInput | `boolean` | No | `false` | Whether to allow the user to enter non-step divisible values in the input field. Note that even if this is set to `false` one can enter non-step divisible values programatically. The user will need to enter the value exactly (except for lower/uppercase) as specified by the `format` prop for it to be accepted. Default is `false` |
| TimeSelect | onInputChange | `( /** * The raw HTML input event */ event: React.ChangeEvent<HTMLInputElement>, /** * The text value in the input field. */ value: string, /** * Current value as ISO datetime string, undefined it its a non-valid value. */ valueAsISOString?: string ) => void` | No | - | Callback fired when text input value changes. |
| TimeSelect | allowClearingSelection | `boolean` | No | `false` | Whether to allow for the user to clear the selected option in the input field. If `false`, the input field will return the last selected option after the input is cleared and loses focus. |

### Usage

Install the package:

```shell
npm install @instructure/ui-time-select
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { TimeSelect } from '@instructure/ui-time-select'
```

