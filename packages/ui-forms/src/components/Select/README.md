---
describes: Select
---

Select is an accessible, custom styled combobox component with optional autocomplete.
- Select behaves similar to [Popover](#Popover) but provides additional semantic markup and focus behavior as a form input.
- Select should not be used for navigation or as a list of actions/functions. (see [Menu](#Menu))
- Select can provide autocomplete behavior.
- Select can allow single or multiple selections.

*Note: When Select is rendered inside a parent with `overflow:hidden` the options may be clipped.*

### Select size variants

Default is `medium`. As with other form elements, the sizes align with the `Button` options for a nice layout.

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

### Controlled Select with `allowCustom`

Permits arbitrary text to be entered in the text box, similar to the Windows ComboBox.

Note: `allowCustom` is currently only valid for single select.

Subscribe to `onInputChange` to be kept abreast of typed input. If typed input exactly matches an option (ignoring case) when the dropdown closes, `onChange` is fired with the selected option after the last `onInputChange`.
```js
---
example: true
render: false
---
class Example extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedOption: null,
      value: null // initialize with '', and Select will complain about the string not being found in options
                  // once the user starts interacting with it, will be set to the string value.
    }
    this._select = null
  }

  onInputChange = (event, value) => {
    this.setState({
      selectedOption: null, // if the new text just matched an option, we'll find out in onChange
      value
    })
  }

  onChange = (event, selection) => {
    this.setState({
      value: selection ? selection.value : this.state.value,  // of no selection, leave the value alone for allowCustom
      selectedOption: selection ? selection.value : null,
    })
  }

  ch = () => {
    let o = this.state.selectedOption ? (parseInt(this.state.selectedOption)+1)%3+1 : 1
    this.setState({selectedOption: `${o}`})
  }

  cl = () => {
    this.setState({selectedOption: null, value: null})
  }

  render () {
    return (
      <View
        as="div"
        margin="0 auto xx-large auto"
        padding="x-small x-small x-large x-small"
      >
        <p>
          <Button onClick={this.ch} margin="0 medium 0 0">change selected option</Button>
          <Button onClick={this.cl} margin="0 medium 0 0">clear selected option</Button>
          Current Value: <span style={{whiteSpace: 'pre'}}>'{this._select ? this._select.value : ''}'</span>
        </p>
        <Select
          ref={el => this._select = el}
          label="Type anything."
          allowCustom
          onInputChange={this.onInputChange}
          onChange={this.onChange}
          value={this.state.value}
          selectedOption={this.state.selectedOption}
        >
          <option value="1">Foo</option>
          <option value="2">Bar</option>
          <option value="3">Baz</option>
        </Select>
      </View>
    )
  }
}

render(<Example/>)
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
    assistiveText="Start typing to search. Press the down arrow to select multiple options."
    defaultOption={['foo', 'bar']}
    formatSelectedOption={option => {
     return (
       <span>
         <Badge type="notification" variant={option.label === 'Foo' ? "primary" : "success"} standalone margin="0 xx-small xxx-small 0" />
         <AccessibleContent alt={`Remove ${option.label}`}>{option.label}</AccessibleContent>
       </span>
     )}
    }
    multiple

    onChange={(event, options) => console.log(options)}
  >
    <option value="foo">Foo</option>
    <option value="bar">Bar</option>
    <option value="baz">Baz</option>
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
    formatSelectedOption={(tag) => (
      <AccessibleContent alt={`Remove ${tag.label}`}>{tag.label}</AccessibleContent>
    )}
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
    <option value="foo" icon={IconUser.Line}>Foo</option>
    <option value="bar" icon={IconUser.Line}>Bar</option>
  </Select>
</View>
```

### Select with groups

```js
---
example: true
---
<div style={{ padding: '0 0 18rem 0', margin: '0 auto' }}>
  <Select
    label="Group Select"
    onChange={(e, opt) => console.log(`option from '${opt.group}' selected`)}
  >
    <optgroup label="Group One" value="group-1">
      <option value="item1">Item One</option>
      <option value="item2">Item Two</option>
    </optgroup>
    <optgroup label="Group Two" value="group-2">
      <option value="item3">Item Three</option>
    </optgroup>
    <optgroup label="Group With an Icon" icon={IconUser.Solid}>
      <option value="item5" icon={IconUser.Solid}>Item Five</option>
      <option value="item6" icon={IconUser.Solid}>Item Six</option>
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
      formatSelectedOption={(tag) => (
        <AccessibleContent alt={`Remove ${tag.label}`}>{tag.label}</AccessibleContent>
      )}
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
          formatSelectedOption={(tag) => (
            <AccessibleContent alt={`Remove ${tag.label}`}>{tag.label}</AccessibleContent>
          )}
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
### Guidelines

```js
---
guidelines: true
---
<Guidelines>
  <Figure recommendation="a11y" title="Accessibility">
    <FigureItem>When implementing Select that allows multiple values, be sure to add AccessibleContent so that it announces what action will be taken when screen readers interact with the tags in the form</FigureItem>
  </Figure>
</Guidelines>
```
