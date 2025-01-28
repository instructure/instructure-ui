---
describes: SimpleSelect
---

`SimpleSelect` is a higher level abstraction of [Select](#Select) that closely parallels the functionality of standard HTML `<select>` elements. It does not support autocomplete behavior and is much less configurable than [Select](#Select). However, because it is more opinionated, `SimpleSelect` can be implemented with very little boilerplate.

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

- ```javascript
  class Example extends React.Component {
    state = {
      value: 'Alaska'
    }

    handleSelect = (e, { id, value }) => {
      this.setState({ value })
    }

    render() {
      return (
        <SimpleSelect
          renderLabel="Controlled Select"
          assistiveText="Use arrow keys to navigate options."
          value={this.state.value}
          onChange={this.handleSelect}
        >
          {this.props.options.map((opt, index) => (
            <SimpleSelect.Option key={index} id={`opt-${index}`} value={opt}>
              {opt}
            </SimpleSelect.Option>
          ))}
        </SimpleSelect>
      )
    }
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

- ```javascript
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
