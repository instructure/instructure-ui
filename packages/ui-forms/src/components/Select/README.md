---
describes: Select
---

### Select size variants

Default is `medium`.

```js
---
example: true
---
<div style={{ padding: '0 0 6rem 0', margin: '0 auto' }}>
  <Select
    size="small"
    label="Small"
    assistiveText="3 options available. Use arrow keys to navigate options."
  >
    <option value="foo">Foo</option>
    <option value="bar">Bar</option>
    <option value="baz">Baz</option>
  </Select>
  <br />
  <Select
    label="Medium"
    assistiveText="3 options available. Use arrow keys to navigate options."
  >
    <option value="foo">Foo</option>
    <option value="bar">Bar</option>
    <option value="baz">Baz</option>
  </Select>
  <br />
  <Select
    size="large"
    label="Large"
    assistiveText="3 options available. Use arrow keys to navigate options."
  >
    <option value="foo">Foo</option>
    <option value="bar">Bar</option>
    <option value="baz">Baz</option>
  </Select>
</div>
```

### Select with the `layout` prop set to `inline`

*Note: IE11 needs a `width` prop if the Select is `inline`.*

```js
---
example: true
---
<div style={{ padding: '0 0 4rem 0', margin: '0 auto' }}>
  <Select label="Inline select" layout="inline">
    <option value="foo">Foo</option>
    <option disabled value="bar">Bar</option>
  </Select>
</div>
```

### Select with default value set using `defaultOption`

```js
---
example: true
---
<div style={{ padding: '0 0 4rem 0', margin: '0 auto' }}>
  <Select
    label="Single"
    defaultOption="bar"
    onChange={(event, option) => console.log(option.value)}
  >
    <option value="foo">Foo</option>
    <option value="bar">Bar</option>
  </Select>
  <br />
  <Select
    label="Multiple"
    defaultOption={['foo', 'bar']}
    multiple
    onChange={(event, options) => console.log(options)}
  >
    <option value="foo">Foo</option>
    <option value="bar">Bar</option>
  </Select>
</div>
```

### Select with icons

```js
---
example: true
---
<div style={{ padding: '0 0 4rem 0', margin: '0 auto' }}>
  <Select label="Icon select">
    <option value="foo" icon={PlaceholderIcon}>Foo</option>
    <option value="bar" icon={PlaceholderIcon}>Bar</option>
  </Select>
</div>
```

### Select with groups

```js
---
example: true
---
<div style={{ padding: '0 0 17rem 0', margin: '0 auto' }}>
  <Select label="Group Select">
  <optgroup label="Group One">
    <option value="item1">Item One</option>
    <option value="item2">Item Two</option>
  </optgroup>
  <optgroup label="Group Two">
    <option value="item3">Item Three</option>
  </optgroup>
  <optgroup label="Group With an Icon" icon={PlaceholderIcon}>
    <option value="item5">Item Five</option>
    <option value="item6">Item Six</option>
  </optgroup>
  </Select>

</div>
```

### Select with messages

```js
---
example: true
---
<div style={{ padding: '0 0 10rem 0', margin: '0 auto' }}>
  <Select
    layout="inline"
    label="Choose a snack"
    messages={[{ text: 'You need to make a selection', type: 'error' }]}>
    <option value="apples">Apples</option>
    <option value="oranges">Oranges</option>
    <option value="bananas">Bananas</option>
    <option value="candy" disabled>Candy</option>
  </Select>
  <br />
  <Select
    layout="inline"
    label="Choose a snack"
    messages={[{ text: 'Great job choosing something healthy!', type: 'success' }]}>
    <option value="apples">Apples</option>
    <option value="oranges">Oranges</option>
    <option value="bananas">Bananas</option>
    <option value="candy" disabled>Candy</option>
  </Select>
</div>
```

### Select with assistive text and a label visible only to screenreaders

```js
---
example: true
---
<div style={{ padding: '0 0 10rem 0', margin: '0 auto' }}>
  <Select
    label={<ScreenReaderContent>What would you like for a snack?</ScreenReaderContent>}
    assistiveText="4 options available. Use the down arrow to navigate options."
  >
    <option value="apples">Apples</option>
    <option value="oranges">Oranges</option>
    <option value="bananas">Bananas</option>
    <option value="candy">Candy</option>
  </Select>
</div>
```

### Disabled Selects

You can disable an entire Select or the child options.

```js
---
example: true
---
<div style={{ padding: '0 0 10rem 0', margin: '0 auto' }}>
  <Select disabled label="What would you like for a snack?" inline>
    <option value="apples" disabled>Apples</option>
    <option value="oranges">Oranges</option>
    <option value="bananas">Bananas</option>
    <option value="candy">Candy</option>
  </Select>
  <br />
  <br />
  <Select label="Choose a snack" inline>
    <option value="apples">Apples</option>
    <option value="oranges">Oranges</option>
    <option value="bananas">Bananas</option>
    <option value="candy" disabled>Candy</option>
  </Select>
</div>
```
### Select with autocomplete

Select can be searchable.

```js
---
example: true
render: false
---
class Example extends React.Component {
render () {
  const options = [
    'Alabama', 'Alaska', 'American Samoa', 'Arizona',
    'Arkansas', 'California', 'Colorado', 'Connecticut',
    'Delaware', 'District Of Columbia',
    'Federated States Of Micronesia', 'Florida', 'Georgia',
    'Guam', 'Hawaii', 'Idaho', 'Illinois'
  ]

  return (
    <Select {...this.props}
      formatSelectedOption={(tag) => (
        <AccessibleContent alt={`Remove ${tag.label}`}>{tag.label}</AccessibleContent>
      )}
    >
      {options.map((label, index) => (
        <option key={label} value={'' + index}>
          {label}
        </option>
      ))}
    </Select>
  )
}
}

render(
<div style={{ padding: '0 0 16rem 0', margin: '0 auto' }}>
  <Example
    label="Choose a state"
    name="state"
    defaultOption="12"
    onChange={(event, value) => console.log(value.label)}
    assistiveText="Start typing to search. Press the down arrow to navigate results."
    editable
  />
  <br />
  <Example
    label="Choose a few states"
    name="states"
    defaultOption={["0", "12", "15"]}
    assistiveText="Start typing to search. Press the down arrow to navigate results."
    editable
    multiple
  />
</div>
)
```

### Select with async loading of options

```js
---
example: true
render: false
---
class Example extends React.Component {
  timeoutId = null;

  state = {
    shownOptions: [],
    loading: false,
    emptyOption: 'Write to search'
  };

  options = [
    { value: '0', label: 'Alabama' },
    { value: '1', label: 'Alaska' },
    { value: '2', label: 'American Samoa' },
    { value: '3', label: 'Arizona' },
    { value: '4', label: 'Arkansas' },
    { value: '5', label: 'California' },
    { value: '6', label: 'Colorado' },
    { value: '7', label: 'Connecticut' },
    { value: '8', label: 'Delaware' },
    { value: '9', label: 'District Of Columbia' },
    { value: '10', label: 'Federated States Of Micronesia' },
    { value: '11', label: 'Florida' },
    { value: '12', label: 'Georgia' },
    { value: '13', label: 'Guam' },
    { value: '14', label: 'Hawaii' },
    { value: '15', label: 'Idaho' },
    { value: '16', label: 'Illinois' }
  ];

  handleInputChange = (e, value) => {
    clearTimeout(this.timeoutId)

    if (!value) {
      this.cleanResults()
    } else {
      this.setState({
        loading: true,
        emptyOption: 'No results'
      })

      this.timeoutId = setTimeout(() => {
        this.setState({
          shownOptions: this.options.filter((o) => {
            return o.label.toLowerCase().startsWith(value.toLowerCase())
          }),
          loading: false
        })
      }, 1000)
    }
  };

  cleanResults = () => this.setState({
    loading: false,
    emptyOption: 'Write to search',
    shownOptions: []
  });

  handleClose = () => {
    if (this._input.value) {
      this.cleanResults()
    }
  };

  handleFilter = (option) => option;

  handleInputRef = (node) => {
    this._input = node
  };

  render () {
    return (
      <Select
        editable
        inputRef={this.handleInputRef}
        loadingText={this.state.loading ? 'Loading options' : null}
        emptyOption={this.state.emptyOption}
        onInputChange={this.handleInputChange}
        onChange={this.props.multiple ? undefined : this.cleanResults}
        onClose={this.handleClose}
        filter={this.handleFilter}
        {...this.props}
      >
        {this.state.shownOptions.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </Select>
    )
  }
}

render(
  <div style={{ padding: '0 0 16rem 0', margin: '0 auto' }}>
    <Example
      label="Choose a state"
      defaultOption={{ value: '1', label: 'Alaska' }}
    />
    <br />
    <Example
      label="Choose a few states"
      defaultOption={[{ value: '1', label: 'Alaska' }]}
      multiple
    />
  </div>
)
```

### Controlled Selects

```js
---
example: true
render: false
---
class Example extends React.Component {
  constructor () {
    super(...arguments)
    this.state = {
      option: this.props.initialOption
    }
  };

  handleChange = (e, option) => this.setState({ option });

  handleFlorida = () => {
    const florida = { value: '11', label: 'Florida' }
    this.setState({
      option: this.props.multiple ? [florida] : florida
    });
  };

  handleIdaho = () => {
    const { option } = this.state
    if (!option.find((o) => o.value === '15')) {
      this.setState({
        option: [...this.state.option, { value: '15', label: 'Idaho' }]
      });
    }
  };

  getOptionLabel () {
    const { option } = this.state
    if (option && option.map) {
      return option.map((o) => o.label).join(', ')
    }
    return option && option.label
  };

  render () {
    const { initialOption, ...props } = this.props
    return (
      <div>
        <Select
          editable
          {...props}
          selectedOption={this.state.option}
          onChange={this.handleChange}
        >
          <option value="0">Alabama</option>
          <option value="1">Alaska</option>
          <option value="2">American Samoa</option>
          <option value="3">Arizona</option>
          <option value="4">Arkansas</option>
          <option value="5">California</option>
          <option value="6">Colorado</option>
          <option value="7">Connecticut</option>
          <option value="8">Delaware</option>
          <option value="9">District Of Columbia</option>
          <option value="10">Federated States Of Micronesia</option>
          <option value="11">Florida</option>
          <option value="12">Georgia</option>
          <option value="13">Guam</option>
          <option value="14">Hawaii</option>
          <option value="15">Idaho</option>
          <option value="16">Illinois</option>
        </Select>
        <div>Value selected: {this.getOptionLabel()}</div>
        <br />
        <Button onClick={this.handleFlorida}>Only select Florida</Button>
        {' '}
        {!props.multiple ? null : <Button onClick={this.handleIdaho}>Add Idaho</Button>}
      </div>
    )
  }
}

render(
  <div style={{ padding: '0 0 16rem 0', margin: '0 auto' }}>
    <Example
      label="Choose a state"
      initialOption={{ value: '7', label: 'Connecticut' }}
    />
    <br />
    <Example
      label="Choose a few states"
      initialOption={[{ value: '12', label: 'Georgia' }, { value: '16', label: 'Illinois' }]}
      multiple
    />
  </div>
)
```

### Inline Select with a fixed width

```js
---
example: true
render: false
---
class Example extends React.Component {
  render () {
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Select
          {...this.props}
          editable
          inline
        >
          <option value="0">Alabama</option>
          <option value="1">Alaska</option>
          <option value="2">American Samoa</option>
          <option value="3">Arizona</option>
          <option value="4">Arkansas</option>
          <option value="5">California</option>
          <option value="6">Colorado</option>
          <option value="7">Connecticut</option>
          <option value="8">Delaware</option>
          <option value="9">District Of Columbia</option>
          <option value="10">Federated States Of Micronesia</option>
          <option value="11">Florida</option>
          <option value="12">Georgia</option>
          <option value="13">Guam</option>
          <option value="14">Hawaii</option>
          <option value="15">Idaho</option>
          <option value="16">Illinois</option>
        </Select>
        &nbsp;
        <Text>{this.props.width}</Text>
      </div>
    )
  }
}

render(
  <div style={{ padding: '0 0 16rem 0', margin: '0 auto' }}>
    <Example
      width="14em"
      label={<ScreenReaderContent>Label</ScreenReaderContent>} />
    <br />
    <Example
      width="20em"
      label={<ScreenReaderContent>Label</ScreenReaderContent>}
      multiple
    />
  </div>
)
```

### Select of differing sizes next to a [Button](#Button)

```js
---
example: true
render: false
---
class Example extends React.Component {
  render () {
    const options = [
      'Alabama', 'Alaska', 'American Samoa', 'Arizona',
      'Arkansas', 'California', 'Colorado', 'Connecticut',
      'Delaware', 'District Of Columbia',
      'Federated States Of Micronesia', 'Florida', 'Georgia',
      'Guam', 'Hawaii', 'Idaho', 'Illinois'
    ]

    return (
      <FormFieldGroup
        layout="columns"
        vAlign="bottom"
        rowSpacing="medium"
        description={
          <ScreenReaderContent>
            {this.props.label}
          </ScreenReaderContent>
        }
      >
        <Select {...this.props} editable>
          {options.map((label, index) => (
            <option key={label} value={'' + index}>{label}</option>
          ))}
        </Select>
        <Button size={this.props.size}>Click me</Button>
      </FormFieldGroup>
    )
  }
}

render(
  <form style={{ padding: '0 0 16rem 0', margin: '0 auto' }}>
    <Example label="Default-size Select and button" />
    <br/>
    <Example
      label="Small-size Select and button"
      size="small"
    />
    <br/>
    <Example
      label="Large-size Select and button"
      size="large"
    />
    <br/>
  </form>
)
```
