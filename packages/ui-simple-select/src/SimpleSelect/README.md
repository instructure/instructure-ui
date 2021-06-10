---
describes: SimpleSelect
---

`SimpleSelect` is a higher level abstraction of [Select](#Select) that closely parallels the functionality of standard HTML `<select>` elements. It does not support autocomplete behavior and is much less configurable than [Select](#Select). However, because it is more opinionated, `SimpleSelect` can be implemented with very little boilerplate.

### Uncontrolled

For the most basic implementations, `SimpleSelect` can be uncontrolled. If desired, the `defaultValue` prop can be used to set the initial selection.

```javascript
---
example: true
render: true
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

```javascript
---
example: true
render: false
---
class Example extends React.Component {
  state = {
    value: 'Alaska'
  }

  handleSelect = (e, { id, value }) => {
    this.setState({ value })
  }

  render () {
    return (
      <SimpleSelect
        renderLabel="Controlled Select"
        assistiveText="Use arrow keys to navigate options."
        value={this.state.value}
        onChange={this.handleSelect}
      >
        {this.props.options.map((opt, index) => (
          <SimpleSelect.Option
            key={index}
            id={`opt-${index}`}
            value={opt}
          >
            { opt }
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

### Groups

Like a HTML `<select>` element, `SimpleSelect` supports option groups. `SimpleSelect.Group` only requires the `renderLabel` prop be provided.

```javascript
---
example: true
render: true
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
example: true
render: true
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
