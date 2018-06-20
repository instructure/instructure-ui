---
describes: Select
---

Select is an accessible, custom styled combobox component with optional autocomplete.

*Note: When Select is rendered inside a parent with `overflow:hidden` the options may be clipped.*

### Select size variants

Default is `medium`.

```js
---
example: true
---
<View
  as="div"
  margin="0 auto xx-large auto"
  padding="x-small x-small x-large x-small"
>
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
</View>
```

### Select with the `layout` prop set to `inline`

*Note: IE11 needs a `width` prop if the Select is `inline`.*

```js
---
example: true
---
<View
  as="div"
  margin="0 auto xx-large auto"
  padding="x-small"
>
  <Select label="Inline select" layout="inline">
    <option value="foo">Foo</option>
    <option disabled value="bar">Bar</option>
  </Select>
</View>
```

### Select with default value set using `defaultOption`
Select with `formatSelectedOption` configured to show a `Badge` component in front of label

```js
---
example: true
---
<View
  as="div"
  margin="0 auto medium auto"
  padding="x-small"
>
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
    formatSelectedOption={option => {
     return (
       <span>
         <Badge type="notification" variant={option.label === 'Foo' ? "primary" : "success"} standalone margin="0 xx-small xxx-small 0" />
         {option.label}
       </span>
     )}
    }
    multiple
    onChange={(event, options) => console.log(options)}
  >
    <option value="foo">Foo</option>
    <option value="bar">Bar</option>
  </Select>
</View>
```

### Select with the `disabled` prop

```js
---
example: true
---
<View
  as="div"
  margin="0 auto medium auto"
  padding="x-small"
>
  <Select
    label="Single"
    defaultOption="bar"
    disabled
  >
    <option value="foo">Foo</option>
    <option value="bar">Bar</option>
  </Select>
  <br />
  <Select
    label="Multiple"
    defaultOption={['foo', 'bar']}
    multiple
    disabled
  >
    <option value="foo">Foo</option>
    <option value="bar">Bar</option>
  </Select>
</View>
```

### Select with icons

```js
---
example: true
---
<View
  as="div"
  margin="0 auto xx-large auto"
  padding="x-small"
>
  <Select label="Icon select">
    <option value="foo" icon={IconUser.Solid}>Foo</option>
    <option value="bar" icon={IconUser.Solid}>Bar</option>
  </Select>
</View>
```

### Select with groups

```js
---
example: true
---
<div style={{ padding: '0 0 18rem 0', margin: '0 auto' }}>
  <Select label="Group Select">
  <optgroup label="Group One">
    <option value="item1">Item One</option>
    <option value="item2">Item Two</option>
  </optgroup>
  <optgroup label="Group Two">
    <option value="item3">Item Three</option>
  </optgroup>
  <optgroup label="Group With an Icon" icon={IconUser.Solid}>
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
<View
  as="div"
  margin="0 auto xx-large auto"
  padding="x-small x-small x-large x-small"
>
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
</View>
```

### Select with assistive text and a label visible only to screenreaders

```js
---
example: true
render: false
---
class Example extends React.Component {
  constructor () {
    super()
    this.state = { announcement: null }
  }

  render () {
    const options = [
      'Alabama', 'Alaska', 'American Samoa', 'Arizona',
      'Arkansas', 'California', 'Colorado', 'Connecticut',
      'Delaware', 'District Of Columbia',
      'Federated States Of Micronesia', 'Florida', 'Georgia',
      'Guam', 'Hawaii', 'Idaho', 'Illinois'
    ]

    return (
      <Select
        {...this.props}
        assistiveText="Start typing to search. Press the down arrow to navigate results."
        announcement={this.state.announcement}
        onOptionsChange={(options) => {
          const num = options.length
          this.setState({announcement: `${num} option${num !== 1 ? 's' : ''} available.`})
        }}
        onOpen={() => {
          this.setState({announcement: 'Dropdown is expanded.'})
        }}
        onClose={() => {
          this.setState({announcement: 'Dropdown is collapsed.'})
        }}
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
      editable
    />
  </div>
)
```

### Disabled Selects

You can disable an entire Select or the child options.

```js
---
example: true
---
<View
  as="div"
  margin="0 auto x-large auto"
  padding="x-small"
>
  <Select label="Choose a snack" inline>
    <option value="apples">Apples</option>
    <option value="oranges">Oranges</option>
    <option value="bananas">Bananas</option>
    <option value="candy" disabled>Candy</option>
  </Select>
  <br />
  <br />
  <Select disabled label="What would you like for a snack?" inline>
    <option value="apples" disabled>Apples</option>
    <option value="oranges">Oranges</option>
    <option value="bananas">Bananas</option>
    <option value="candy">Candy</option>
  </Select>
</View>
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
      <Select
        {...this.props}
        assistiveText="Start typing to search. Press the down arrow to navigate results."
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
      editable
    />
    <br />
    <Example
      label="Choose a few states"
      name="states"
      defaultOption={["0", "12", "15"]}
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

### Persistent Options

```js
---
example: true
render: false
---
class Example extends React.Component {
  constructor () {
    super(...arguments)
    this.persistentOptions = [
      { label: 'Apples', value: '0', dismissible: false },
      { label: 'Bananas', value: '1', dismissible: false }
    ]
    this.state = {
      options: [...this.persistentOptions]
    }
  };

  handleChange = (e, opts) => {
    const options = [
      ...this.persistentOptions,
      ...opts.slice(this.persistentOptions.length)
    ];
    console.log(options)
    this.setState({ options });
  }

  clear = () => {
    this.setState({
      options: [...this.persistentOptions]
    });
  };

  getOptionLabel () {
    const { options } = this.state
    return options.map((o) => o.label).join(', ')
  };

  render () {
    return (
      <div>
        <Select
          editable
          {...this.props}
          selectedOption={this.state.options}
          onChange={this.handleChange}
        >
          <option value="0">Apples</option>
          <option value="1">Bananas</option>
          <option value="2">Oranges</option>
          <option value="3">Mangoes</option>
          <option value="4">Pears</option>
          <option value="5">Cherries</option>

        </Select>
        <div>Value selected: {this.getOptionLabel()}</div>
        <br />
        <Button onClick={this.clear}>Clear Selections</Button>
      </div>
    )
  }
}

render(
  <div style={{ margin: '0 auto 4rem' }}>
    <Example label="Choose a few fruits" multiple />
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
  <div style={{ padding: '0 0 16rem 0', margin: '0 auto' }}>
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
  </div>
)
```
