# Checkbox


By default, the Checkbox component is a custom styled HTML checkbox. To default the checkbox to checked,
set the `defaultChecked` prop.

Adjust the size of the checkbox and label text via the `size` prop. The default size is
`medium`.

```js
---
type: example
---
<Checkbox label={lorem.sentence()} value="medium" defaultChecked />
```

The default Checkbox in its disabled state:

```js
---
type: example
---
<CheckboxGroup
  defaultValue={['medium']}
  name="example"
  description={<ScreenReaderContent>Checkbox examples</ScreenReaderContent>}
>
  <Checkbox label={lorem.sentence()} value="medium" disabled />
  <Checkbox label={lorem.sentence()} value="small" disabled />
</CheckboxGroup>
```

The `indeterminate` property triggers a visual state that handles
situations where "child" Checkboxes are neither all checked nor all
unchecked. Note the use of `aria-labelledby` to make the relationship
between the parent and child Checkboxes clear to screenreader users.

_Note: the `toggle` variant does not support the `indeterminate`
property._

- ```js
  class Example extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        value: ['his111', 'eng203']
      }
    }

    updateValue(value) {
      const index = this.state.value.indexOf(value)

      if (index === -1) {
        this.setState({ value: [...this.state.value, value] })
      } else {
        this.setState((prevState) => ({
          value: [
            ...prevState.value.slice(0, index),
            ...prevState.value.slice(index + 1)
          ]
        }))
      }
    }

    render() {
      return (
        <FormFieldGroup
          description={
            <ScreenReaderContent>
              <span id="groupLabel">Courses to edit</span>
            </ScreenReaderContent>
          }
          rowSpacing="small"
        >
          <Checkbox
            aria-labelledby="groupLabel selectAllLabel"
            label={<span id="selectAllLabel">Select all courses</span>}
            value="all"
            onChange={() =>
              this.setState({
                value:
                  this.state.value.length === 3
                    ? []
                    : ['eng203', 'sci101', 'his111']
              })
            }
            checked={this.state.value.length === 3}
            indeterminate={
              this.state.value.length > 0 && this.state.value.length < 3
            }
          />
          <View as="div" padding="0 0 0 medium">
            <Checkbox
              aria-labelledby="groupLabel eng203Label"
              label={<span id="eng203Label">English 203</span>}
              value="eng203"
              name="courses"
              onChange={(event) => {
                this.updateValue(event.target.value)
              }}
              checked={this.state.value.indexOf('eng203') !== -1}
            />
          </View>
          <View as="div" padding="0 0 0 medium">
            <Checkbox
              aria-labelledby="groupLabel sci101Label"
              label={<span id="sci101Label">Science 101</span>}
              value="sci101"
              name="courses"
              onChange={(event) => {
                this.updateValue(event.target.value)
              }}
              checked={this.state.value.indexOf('sci101') !== -1}
            />
          </View>
          <View as="div" padding="0 0 0 medium">
            <Checkbox
              aria-labelledby="groupLabel hist101Label"
              label={<span id="hist101Label">History 111</span>}
              value="his111"
              name="courses"
              onChange={(event) => {
                this.updateValue(event.target.value)
              }}
              checked={this.state.value.indexOf('his111') !== -1}
            />
          </View>
        </FormFieldGroup>
      )
    }
  }

  render(<Example />)
  ```

- ```js
  const Example = () => {
    const [value, setValue] = useState(['his111', 'eng203'])

    const updateValue = (valueToUpdate) => {
      const index = value.indexOf(valueToUpdate)
      console.log(index)
      if (index === -1) {
        setValue([...value, valueToUpdate])
      } else {
        setValue([...value.slice(0, index), ...value.slice(index + 1)])
      }
    }

    return (
      <FormFieldGroup
        description={
          <ScreenReaderContent>
            <span id="groupLabel">Courses to edit</span>
          </ScreenReaderContent>
        }
        rowSpacing="small"
      >
        <Checkbox
          aria-labelledby="groupLabel selectAllLabel"
          label={<span id="selectAllLabel">Select all courses</span>}
          value="all"
          onChange={() =>
            setValue(value.length === 3 ? [] : ['eng203', 'sci101', 'his111'])
          }
          checked={value.length === 3}
          indeterminate={value.length > 0 && value.length < 3}
        />
        <View as="div" padding="0 0 0 medium">
          <Checkbox
            aria-labelledby="groupLabel eng203Label"
            label={<span id="eng203Label">English 203</span>}
            value="eng203"
            name="courses"
            onChange={(event) => {
              updateValue(event.target.value)
            }}
            checked={value.indexOf('eng203') !== -1}
          />
        </View>
        <View as="div" padding="0 0 0 medium">
          <Checkbox
            aria-labelledby="groupLabel sci101Label"
            label={<span id="sci101Label">Science 101</span>}
            value="sci101"
            name="courses"
            onChange={(event) => {
              updateValue(event.target.value)
            }}
            checked={value.indexOf('sci101') !== -1}
          />
        </View>
        <View as="div" padding="0 0 0 medium">
          <Checkbox
            aria-labelledby="groupLabel hist101Label"
            label={<span id="hist101Label">History 111</span>}
            value="his111"
            name="courses"
            onChange={(event) => {
              updateValue(event.target.value)
            }}
            checked={value.indexOf('his111') !== -1}
          />
        </View>
      </FormFieldGroup>
    )
  }

  render(<Example />)
  ```

Setting the `variant` prop to `toggle` turns the checkbox into a toggle switch. For **toggle only** the size prop affects the size of the label and not the actual size of the switch.

```js
---
type: example
---
<FormFieldGroup description={<ScreenReaderContent>Checkbox examples</ScreenReaderContent>}>
  <Checkbox label="Small size" value="small" variant="toggle" size="small" defaultChecked />
  <Checkbox label="Medium size" value="medium" variant="toggle" />
  <Checkbox label="Large size" value="large" variant="toggle" size="large" defaultChecked />
</FormFieldGroup>
```

To change the label placement for the toggle variety, use the labelPlacement prop. The default
placement is 'end'.

_Note: the `simple` variant does not support the `labelPlacement`
property._

```js
---
type: example
---
<FormFieldGroup description={<ScreenReaderContent>Toggle label examples</ScreenReaderContent>}>
  <Checkbox label="Top" variant="toggle" labelPlacement="top" defaultChecked />
  <Checkbox label="Start" variant="toggle" labelPlacement="start" />
  <Checkbox label="End" variant="toggle" labelPlacement="end" defaultChecked />
</FormFieldGroup>
```

You might want to hide the label text when using the toggle switch variant. Do that by wrapping
the text in the [ScreenReaderContent](#ScreenReaderContent) component.

```js
---
type: example
---
<Checkbox
  label={<ScreenReaderContent>Screenreader-accessible label</ScreenReaderContent>}
  value="accessible"
  variant="toggle"
/>
```

### Guidelines

```js
---
type: embed
---
<Guidelines>
  <Figure recommendation="yes" title="Do">
    <Figure.Item>Align to the left side of the label</Figure.Item>
    <Figure.Item>Use when multiple selections are allowed</Figure.Item>
    <Figure.Item>Use to save space from toggles</Figure.Item>
    <Figure.Item>Stack vertically if there is more than two options to select</Figure.Item>
  </Figure>
  <Figure recommendation="no" title="Don't">
    <Figure.Item>Run more than two checkboxes horizontally</Figure.Item>
  </Figure>
</Guidelines>
```

```js
---
type: embed
---
<Guidelines>
  <Figure recommendation="a11y" title="Accessibility">
    <Figure.Item>Do not add business logic to `onMouseOver` or `onMouseOut` events. These events are not triggered by keyboard navigation</Figure.Item>
  </Figure>
</Guidelines>
```


### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| Checkbox | label | `React.ReactNode` | Yes | - |  |
| Checkbox | id | `string` | No | - |  |
| Checkbox | value | `string \| number` | No | - |  |
| Checkbox | messages | `FormMessage[]` | No | - | Array of objects with shape: `{ text: ReactNode, type: One of: ['newError', 'error', 'hint', 'success', 'screenreader-only'] }` |
| Checkbox | defaultChecked | `boolean` | No | - |  |
| Checkbox | checked | `boolean` | No | - | whether the input is checked or not (must be accompanied by an `onChange` prop) |
| Checkbox | onChange | `(e: React.ChangeEvent<HTMLInputElement>) => void` | No | - | when used with the `checked` prop, the component will not control its own state |
| Checkbox | onKeyDown | `(e: React.KeyboardEvent<HTMLInputElement>) => void` | No | - |  |
| Checkbox | onFocus | `(e: React.FocusEvent<HTMLInputElement>) => void` | No | - |  |
| Checkbox | onBlur | `(e: React.FocusEvent<HTMLInputElement>) => void` | No | - |  |
| Checkbox | onMouseOver | `(e: React.MouseEvent<HTMLInputElement>) => void` | No | - |  |
| Checkbox | onMouseOut | `(e: React.MouseEvent<HTMLInputElement>) => void` | No | - |  |
| Checkbox | disabled | `boolean` | No | `false` | Whether or not to disable the checkbox |
| Checkbox | readOnly | `boolean` | No | `false` | Works just like disabled but keeps the same styles as if it were active |
| Checkbox | indeterminate | `boolean` | No | `false` | Visual state showing that child checkboxes are a combination of checked and unchecked |
| Checkbox | size | `'small' \| 'medium' \| 'large'` | No | `'medium'` |  |
| Checkbox | variant | `'simple' \| 'toggle'` | No | `'simple'` |  |
| Checkbox | inline | `boolean` | No | `false` |  |
| Checkbox | labelPlacement | `'top' \| 'start' \| 'end'` | No | `'end'` |  |
| Checkbox | isRequired | `boolean` | No | - |  |
| Checkbox | inputRef | `(inputElement: HTMLInputElement \| null) => void` | No | - | A function that provides a reference to the actual underlying input element |
| Checkbox.CheckboxFacade | children | `React.ReactNode` | Yes | - |  |
| Checkbox.CheckboxFacade | checked | `boolean` | No | `false` |  |
| Checkbox.CheckboxFacade | focused | `boolean` | No | `false` |  |
| Checkbox.CheckboxFacade | hovered | `boolean` | No | `false` |  |
| Checkbox.CheckboxFacade | size | `'small' \| 'medium' \| 'large'` | No | `'medium'` |  |
| Checkbox.CheckboxFacade | indeterminate | `boolean` | No | `false` | Visual state showing that child checkboxes are a combination of checked and unchecked |
| Checkbox.CheckboxFacade | invalid | `boolean` | No | - | Indicate if the parent component (`Checkbox`) is invalid to set the style accordingly. |
| Checkbox.ToggleFacade | children | `React.ReactNode` | Yes | - |  |
| Checkbox.ToggleFacade | checked | `boolean` | No | `false` |  |
| Checkbox.ToggleFacade | disabled | `boolean` | No | `false` |  |
| Checkbox.ToggleFacade | readOnly | `boolean` | No | `false` |  |
| Checkbox.ToggleFacade | focused | `boolean` | No | `false` |  |
| Checkbox.ToggleFacade | size | `'small' \| 'medium' \| 'large'` | No | `'medium'` |  |
| Checkbox.ToggleFacade | labelPlacement | `'top' \| 'start' \| 'end'` | No | `'end'` |  |
| Checkbox.ToggleFacade | invalid | `boolean` | No | - | Indicate if the parent component (`Checkbox`) is invalid to set the style accordingly. |

### Usage

Install the package:

```shell
npm install @instructure/ui-checkbox
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { Checkbox } from '@instructure/ui-checkbox'
```

