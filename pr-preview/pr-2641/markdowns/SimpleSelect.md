# SimpleSelect


`SimpleSelect` is a higher level abstraction of [Select](Select) that closely parallels the functionality of standard HTML `<select>` elements. It does not support autocomplete behavior and is much less configurable than [Select](Select). However, because it is more opinionated, `SimpleSelect` can be implemented with very little boilerplate.

> Note: The `id` prop on options must be globally unique, it will be translated to an `id` prop
> in the DOM.

### Uncontrolled

For the most basic implementations, `SimpleSelect` can be uncontrolled. If desired, the `defaultValue` prop can be used to set the initial selection.

```javascript
---
type: example
---
<SimpleSelect renderLabel="Uncontrolled Select">
  <SimpleSelect.Option id="foo" value="foo"
                       renderBeforeLabel={(props) => {
                         console.log(props)
                         return <IconCheckSolid />
                       }}>
    Foo
  </SimpleSelect.Option>
  <SimpleSelect.Option id="bar" value="bar">
    Bar
  </SimpleSelect.Option>
  <SimpleSelect.Option id="baz" value="baz">
    Baz
  </SimpleSelect.Option>
</SimpleSelect>
```

### Controlled

To use `SimpleSelect` controlled, simply provide the `value` prop the string that corresponds to the selected option's `value` prop. The `onChange` callback can be used to update the value stored in state.

```js
---
type: example
---
const Example = ({ options }) => {
  const [value, setValue] = useState('Alaska')

  const handleSelect = (e, { id, value }) => {
    setValue(value)
  }

  return (
    <SimpleSelect
      renderLabel="Controlled Select"
      assistiveText="Use arrow keys to navigate options."
      value={value}
      onChange={handleSelect}
    >
      {options.map((opt, index) => (
        <SimpleSelect.Option key={index} id={`opt-${index}`} value={opt}>
          {opt}
        </SimpleSelect.Option>
      ))}
    </SimpleSelect>
  )
}

render(
  <Example
    options={[
      'Alaska',
      'American Samoa',
      'Arizona',
      'Arkansas',
      'California',
      'Colorado',
      'Connecticut',
      'Delaware',
      'District Of Columbia',
      'Federated States Of Micronesia',
      'Florida',
      'Georgia',
      'Guam',
      'Hawaii',
      'Idaho',
      'Illinois'
    ]}
  />
)
```

### Groups

Like a HTML `<select>` element, `SimpleSelect` supports option groups. `SimpleSelect.Group` only requires the `renderLabel` prop be provided.

```javascript
---
type: example
---
<SimpleSelect renderLabel="Select with Groups">
  <SimpleSelect.Group renderLabel="Group one" key="grp1">
    <SimpleSelect.Option id="opt1" value="option-1">
      Option one
    </SimpleSelect.Option>
  </SimpleSelect.Group>
  <SimpleSelect.Group renderLabel="Group two" key="grp2">
    <SimpleSelect.Option id="opt2" value="option-2">
      Option two
    </SimpleSelect.Option>
    <SimpleSelect.Option id="opt3" value="option-3">
      Option three
    </SimpleSelect.Option>
    <SimpleSelect.Option id="opt4" value="option-4">
      Option four
    </SimpleSelect.Option>
  </SimpleSelect.Group>
</SimpleSelect>
```

### Icons

To display icons (or other elements) before or after an option, pass it via the `renderBeforeLabel` and `renderAfterLabel` prop to `SimpleSelect.Option`. You can pass a function as well, which will have a `props` parameter, so you can access the properties of that `SimpleSelect.Option` (e.g. if it is currently `isHighlighted`). The available props are: `[ id, isDisabled, isSelected, isHighlighted, children ]` (same as for `Select.Option`).

```javascript
---
type: example
---
<SimpleSelect renderLabel="Option Icons">
  <SimpleSelect.Option
    id="text"
    value="text"
    renderBeforeLabel={'XY'}
  >
    Text
  </SimpleSelect.Option>
  <SimpleSelect.Option
    id="icon"
    value="icon"
    renderBeforeLabel={<IconCheckSolid />}
  >
    Icon
  </SimpleSelect.Option>
  <SimpleSelect.Option
    id="coloredIcon"
    value="coloredIcon"
    renderBeforeLabel={(props) => {
      let color = 'brand'
      if (props.isHighlighted) color = 'primary-inverse'
      if (props.isSelected) color = 'primary'
      if (props.isDisabled) color = 'warning'
      return <IconInstructureSolid color={color} />
    }}
  >
    Colored Icon
  </SimpleSelect.Option>
</SimpleSelect>
```

> Note: This component uses a native `input` field to render the selected value. When it's included in a native HTML `form`, the text value will be sent to the backend instead of anything specified in the `value` field of the `SimpleSelect.Option`-s. We do not recommend to use this component this way, rather write your own code that collects information and sends it to the backend.


### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| SimpleSelect | renderLabel | `Renderable` | Yes | - | The form field label. |
| SimpleSelect | id | `string` | No | - | The id of the text input. One is generated if not supplied. |
| SimpleSelect | size | `'small' \| 'medium' \| 'large'` | No | `'medium'` | The size of the text input. |
| SimpleSelect | assistiveText | `string` | No | - | Additional helpful text to provide to screen readers about the operation of the component. Provided via aria-describedby. |
| SimpleSelect | placeholder | `string` | No | - | Html placeholder text to display when the input has no value. This should be hint text, not a label replacement. |
| SimpleSelect | interaction | `'enabled' \| 'disabled' \| 'readonly'` | No | - | Specifies if interaction with the input is enabled, disabled, or readonly. When "disabled", the input changes visibly to indicate that it cannot receive user interactions. When "readonly" the input still cannot receive user interactions but it keeps the same styles as if it were enabled. |
| SimpleSelect | isRequired | `boolean` | No | `false` | Whether or not the text input is required. |
| SimpleSelect | isInline | `boolean` | No | `false` | Whether the input is rendered inline with other elements or if it is rendered as a block level element. |
| SimpleSelect | width | `string` | No | - | The width of the text input. |
| SimpleSelect | visibleOptionsCount | `number` | No | `8` | The number of options that should be visible before having to scroll. Works best when the options are the same height. |
| SimpleSelect | optionsMaxHeight | `string` | No | - | The max height the options list can be before having to scroll. If set, it will __override__ the `visibleOptionsCount` prop. |
| SimpleSelect | optionsMaxWidth | `string` | No | - | The max width the options list can be before option text wraps. If not set, the list will only display as wide as the text input. |
| SimpleSelect | messages | `FormMessage[]` | No | - | Displays messages and validation for the input. It should be an array of objects with the following shape: `{ text: ReactNode, type: One of: ['newError', 'error', 'hint', 'success', 'screenreader-only'] }` |
| SimpleSelect | placement | `PlacementPropValues` | No | `'bottom stretch'` | The placement of the options list. |
| SimpleSelect | constrain | `PositionConstraint` | No | `'window'` | The parent in which to constrain the placement. |
| SimpleSelect | mountNode | `PositionMountNode` | No | - | An element or a function returning an element to use mount the options list to in the DOM (defaults to `document.body`) |
| SimpleSelect | inputRef | `(inputElement: HTMLInputElement \| null) => void` | No | - | A ref to the html `input` element. |
| SimpleSelect | listRef | `(listElement: HTMLUListElement \| null) => void` | No | - | A ref to the html `ul` element. |
| SimpleSelect | renderBeforeInput | `Renderable` | No | - | Content to display before the text input. This will commonly be an icon. |
| SimpleSelect | renderAfterInput | `Renderable` | No | - | Content to display after the text input. This content will replace the default arrow icons. |
| SimpleSelect | onFocus | `(event: React.FocusEvent<HTMLInputElement>) => void` | No | - | Callback fired when text input receives focus. |
| SimpleSelect | onBlur | `(event: React.FocusEvent<HTMLInputElement>) => void` | No | - | Callback fired when text input loses focus. |
| SimpleSelect | isOptionContentAppliedToInput | `boolean` | No | `false` | Whether or not the content of the selected `SimpleSelect.Option`'s `renderBeforeLabel` and `renderAfterLabel` appear in the input field. If the selected `SimpleSelect.Option` has both `renderBeforeLabel` and `renderAfterLabel` content, both will be displayed in the input field. `SimpleSelect.Option`'s `renderBeforeLabel` and `renderAfterLabel` content will not be displayed, if `SimpleSelect`'s `inputValue` is an empty value, null or undefined. If `true` and the selected `SimpleSelect.Option` has a `renderAfterLabel` value, it will replace the default arrow icon. If `true` and `SimpleSelect`'s `renderBeforeInput` or `renderAfterInput` prop is set, it will display the selected `SimpleSelect.Option`'s `renderBeforeLabel` and `renderAfterLabel` instead of `SimpleSelect`'s `renderBeforeInput` or `renderAfterInput` value. If the selected `SimpleSelect.Option`'s `renderAfterLabel` value is empty, default arrow icon will be rendered. |
| SimpleSelect | layout | `'stacked' \| 'inline'` | No | - | In `stacked` mode the input is below the label. In `inline` mode the input is to the right/left (depending on text direction) of the label, and the layout will look like `stacked` for small screens. |
| SimpleSelect | value | `string \| number` | No | - | The value corresponding to the value of the selected option. If defined, the component will act controlled and will not manage its own state. |
| SimpleSelect | defaultValue | `string` | No | - | The value of the option to select by default, when uncontrolled. |
| SimpleSelect | onChange | `( event: React.SyntheticEvent, data: { value?: string \| number id?: string } ) => void` | No | - | Callback fired when a new option is selected. |
| SimpleSelect | onShowOptions | `(event: React.SyntheticEvent) => void` | No | - | Callback fired when the options list is shown. |
| SimpleSelect | onHideOptions | `(event: React.SyntheticEvent) => void` | No | - | Callback fired when the options list is hidden. |
| SimpleSelect | renderEmptyOption | `Renderable` | No | `'---'` | Content to display in the list when no options are available. |
| SimpleSelect | children | `React.ReactNode` | No | - | Children of type `<SimpleSelect.Option />` or `<SimpleSelect.Group />`. |
| SimpleSelect.Group | renderLabel | `React.ReactNode \| (() => React.ReactNode)` | Yes | - | The label associated with the group options. |
| SimpleSelect.Group | children | `React.ReactNode` | No | - | Children of type `<SimpleSelect.Option />` that will be considered part of the group. |
| SimpleSelect.Option | id | `string` | Yes | - | The id for the option. **Must be globally unique**, it will be translated to an `id` prop in the DOM. |
| SimpleSelect.Option | value | `string \| number` | Yes | - | The value for the option. |
| SimpleSelect.Option | isDisabled | `boolean` | No | `false` | Whether or not this option is disabled. |
| SimpleSelect.Option | children | `string` | No | - | Content to display as the option label. |
| SimpleSelect.Option | renderBeforeLabel | `Renderable<OptionProps>` | No | - | Content to display before the option label, such as an icon. |
| SimpleSelect.Option | renderAfterLabel | `Renderable<OptionProps>` | No | - | Content to display after the option label, such as an icon. |

### Usage

Install the package:

```shell
npm install @instructure/ui-simple-select
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { SimpleSelect } from '@instructure/ui-simple-select'
```

