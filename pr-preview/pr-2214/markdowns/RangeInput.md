# RangeInput


An html5 range input/slider component.

```js
---
type: example
---
const Example = () => {
  const [size, setSize] = useState('small')
  const [thumbVariant, setThumbVariant] = useState('accessible')

  const handleSizeChange = (event, value) => {
    setSize(value)
  }

  const handleThumbVariantChange = (event, value) => {
    setThumbVariant(value)
  }

  return (
    <div>
      <View as="div" padding="medium" background="primary">
        <RangeInput
          label="Grading range"
          defaultValue={30}
          max={100}
          min={0}
          size={size}
          thumbVariant={thumbVariant}
        />
      </View>

      <View as="div" margin="medium 0 0">
        <FormFieldGroup
          description={
            <ScreenReaderContent>
              RangeInput Example Settings
            </ScreenReaderContent>
          }
          layout="columns"
          vAlign="top"
        >
          <RadioInputGroup
            onChange={handleSizeChange}
            name="labelSize"
            value={size}
            description="Label size"
          >
            <RadioInput label="small" value="small" />
            <RadioInput label="medium" value="medium" />
            <RadioInput label="large" value="large" />
          </RadioInputGroup>

          <RadioInputGroup
            onChange={handleThumbVariantChange}
            name="thumbVariant"
            value={thumbVariant}
            description="Thumb variant"
          >
            <RadioInput label="accessible" value="accessible" />
            <RadioInput label="deprecated" value="deprecated" />
          </RadioInputGroup>
        </FormFieldGroup>
      </View>
    </div>
  )
}

render(<Example />)
```


### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| RangeInput | min | `number` | No | `0` |  |
| RangeInput | max | `number` | No | `0` |  |
| RangeInput | defaultValue | `number` | No | - | value to set on initial render |
| RangeInput | value | `number` | No | - | the selected value (must be accompanied by an `onChange` prop) |
| RangeInput | onChange | `(value: number \| string) => void` | No | - | when used with the `value` prop, the component will not control its own state |
| RangeInput | messages | `FormMessage[]` | No | - |  |
| RangeInput | size | `'small' \| 'medium' \| 'large'` | No | `'medium'` | The size of the value label |
| RangeInput | layout | `'stacked' \| 'inline'` | No | `'stacked'` |  |
| RangeInput | id | `string` | No | - |  |
| RangeInput | label | `React.ReactNode` | Yes | - |  |
| RangeInput | displayValue | `boolean` | No | `true` | whether to display the current value |
| RangeInput | step | `number` | No | `1` |  |
| RangeInput | formatValue | `(value?: number, max?: number) => string` | No | `(val?: number) => val` | A function to format the displayed value |
| RangeInput | inline | `boolean` | No | `false` |  |
| RangeInput | disabled | `boolean` | No | `false` |  |
| RangeInput | readOnly | `boolean` | No | `false` |  |
| RangeInput | thumbVariant | `\| 'deprecated' // TODO: deprecated, remove in V9. \| 'accessible'` | No | `'deprecated'` | The "deprecated" variant has an outer shadow on focus. The "accessible" variant has better color contrast, border and inset focus ring for better accessibility. |
| RangeInput | inputRef | `(inputElement: HTMLInputElement \| null) => void` | No | - | A function that provides a reference to the actual underlying input element |

### Usage

Install the package:

```shell
npm install @instructure/ui-range-input
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { RangeInput } from '@instructure/ui-range-input'
```

