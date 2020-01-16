---
describes: DeprecatedSelect
id: DeprecatedSelect__README
---

**DEPRECATED:** Select will be removed from `ui-forms` in version 7.0.0. Use the controlled [Select](#Select) from [ui-select](#ui-select) instead. View [Select](#Select) for examples of managing state for a `Select`.
***

Select is an accessible, custom styled combobox component with optional autocomplete.
- Select behaves similar to [Popover](#Popover) but provides additional semantic markup and focus behavior as a form input.
- Select should not be used for navigation or as a list of actions/functions. (see [Menu](#Menu))
- Select can provide autocomplete behavior.
- Select can allow single or multiple selections.

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
  <DeprecatedSelect
    size="small"
    label="Small"
    assistiveText="3 options available. Use arrow keys to navigate options."
  >
    <option value="foo">Foo</option>
    <option value="bar">Bar</option>
    <option value="baz">Baz</option>
  </DeprecatedSelect>
  <br />
  <DeprecatedSelect
    label="Medium"
    assistiveText="3 options available. Use arrow keys to navigate options."
  >
    <option value="foo">Foo</option>
    <option value="bar">Bar</option>
    <option value="baz">Baz</option>
  </DeprecatedSelect>
  <br />
  <DeprecatedSelect
    size="large"
    label="Large"
    assistiveText="3 options available. Use arrow keys to navigate options."
  >
    <option value="foo">Foo</option>
    <option value="bar">Bar</option>
    <option value="baz">Baz</option>
  </DeprecatedSelect>
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
  <DeprecatedSelect label="Inline select" layout="inline">
    <option value="foo">Foo</option>
    <option disabled value="bar">Bar</option>
  </DeprecatedSelect>
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
        <DeprecatedSelect
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
        </DeprecatedSelect>
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
  <DeprecatedSelect
    label="Single"
    defaultOption="bar"
    onChange={(event, option) => console.log(option.value)}
  >
    <option value="foo">Foo</option>
    <option value="bar">Bar</option>
  </DeprecatedSelect>
  <br />
  <DeprecatedSelect
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
  </DeprecatedSelect>
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
  <DeprecatedSelect
    label="Single"
    defaultOption="bar"
    disabled
  >
    <option value="foo">Foo</option>
    <option value="bar">Bar</option>
  </DeprecatedSelect>
  <br />
  <DeprecatedSelect
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
  </DeprecatedSelect>
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
  <DeprecatedSelect label="Icon select">
    <option value="foo" icon={IconUserLine}>Foo</option>
    <option value="bar" icon={IconUserLine}>Bar</option>
  </DeprecatedSelect>
</View>
```

### Select with groups

```js
---
example: true
---
<div style={{ padding: '0 0 18rem 0', margin: '0 auto' }}>
  <DeprecatedSelect
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
    <optgroup label="Group With an Icon" icon={IconUserSolid}>
      <option value="item5" icon={IconUserSolid}>Item Five</option>
      <option value="item6" icon={IconUserSolid}>Item Six</option>
    </optgroup>
  </DeprecatedSelect>

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
  <DeprecatedSelect
    layout="inline"
    label="Choose a snack"
    messages={[{ text: 'You need to make a selection', type: 'error' }]}>
    <option value="apples">Apples</option>
    <option value="oranges">Oranges</option>
    <option value="bananas">Bananas</option>
    <option value="candy" disabled>Candy</option>
  </DeprecatedSelect>
  <br />
  <DeprecatedSelect
    layout="inline"
    label="Choose a snack"
    messages={[{ text: 'Great job choosing something healthy!', type: 'success' }]}>
    <option value="apples">Apples</option>
    <option value="oranges">Oranges</option>
    <option value="bananas">Bananas</option>
    <option value="candy" disabled>Candy</option>
  </DeprecatedSelect>
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
      <DeprecatedSelect
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
      </DeprecatedSelect>
    )
  }
}

render(
  <div style={{ padding: '0 0 16rem 0', margin: '0 auto' }}>
    <Example
      label="Choose a state"
      name="state"
      defaultOption="opt12"
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
  <DeprecatedSelect label="Choose a snack" inline>
    <option value="apples">Apples</option>
    <option value="oranges">Oranges</option>
    <option value="bananas">Bananas</option>
    <option value="candy" disabled>Candy</option>
  </DeprecatedSelect>
  <br />
  <br />
  <DeprecatedSelect disabled label="What would you like for a snack?" inline>
    <option value="apples" disabled>Apples</option>
    <option value="oranges">Oranges</option>
    <option value="bananas">Bananas</option>
    <option value="candy">Candy</option>
  </DeprecatedSelect>
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
      <DeprecatedSelect
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
      </DeprecatedSelect>
    )
  }
}

render(
  <div style={{ padding: '0 0 16rem 0', margin: '0 auto' }}>
    <Example
      label="Choose a state"
      name="state"
      defaultOption="opt12"
      editable
    />
    <br />
    <Example
      label="Choose a few states"
      name="states"
      defaultOption={["opt0", "opt12", "opt15"]}
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
    { value: 'opt0', label: 'Alabama' },
    { value: 'opt1', label: 'Alaska' },
    { value: 'opt2', label: 'American Samoa' },
    { value: 'opt3', label: 'Arizona' },
    { value: 'opt4', label: 'Arkansas' },
    { value: 'opt5', label: 'California' },
    { value: 'opt6', label: 'Colorado' },
    { value: 'opt7', label: 'Connecticut' },
    { value: 'opt8', label: 'Delaware' },
    { value: 'opt9', label: 'District Of Columbia' },
    { value: 'opt10', label: 'Federated States Of Micronesia' },
    { value: 'opt11', label: 'Florida' },
    { value: 'opt12', label: 'Georgia' },
    { value: 'opt13', label: 'Guam' },
    { value: 'opt14', label: 'Hawaii' },
    { value: 'opt15', label: 'Idaho' },
    { value: 'opt16', label: 'Illinois' }
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
      <DeprecatedSelect
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
      </DeprecatedSelect>
    )
  }
}

render(
  <div style={{ padding: '0 0 16rem 0', margin: '0 auto' }}>
    <Example
      label="Choose a state"
      defaultOption={{ value: 'opt1', label: 'Alaska' }}
    />
    <br />
    <Example
      label="Choose a few states"
      defaultOption={[{ value: 'opt1', label: 'Alaska' }]}
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
    const florida = { value: 'opt11', label: 'Florida' }
    this.setState({
      option: this.props.multiple ? [florida] : florida
    });
  };

  handleIdaho = () => {
    const { option } = this.state
    if (!option.find((o) => o.value === 'opt15')) {
      this.setState({
        option: [...this.state.option, { value: 'opt15', label: 'Idaho' }]
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
        <DeprecatedSelect
          editable
          {...props}
          formatSelectedOption={(tag) => (
            <AccessibleContent alt={`Remove ${tag.label}`}>{tag.label}</AccessibleContent>
          )}
          selectedOption={this.state.option}
          onChange={this.handleChange}
        >
          <option value="opt0">Alabama</option>
          <option value="opt1">Alaska</option>
          <option value="opt2">American Samoa</option>
          <option value="opt3">Arizona</option>
          <option value="opt4">Arkansas</option>
          <option value="opt5">California</option>
          <option value="opt6">Colorado</option>
          <option value="opt7">Connecticut</option>
          <option value="opt8">Delaware</option>
          <option value="opt9">District Of Columbia</option>
          <option value="opt10">Federated States Of Micronesia</option>
          <option value="opt11">Florida</option>
          <option value="opt12">Georgia</option>
          <option value="opt13">Guam</option>
          <option value="opt14">Hawaii</option>
          <option value="opt15">Idaho</option>
          <option value="opt16">Illinois</option>
        </DeprecatedSelect>
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
      initialOption={{ value: 'opt7', label: 'Connecticut' }}
    />
    <br />
    <Example
      label="Choose a few states"
      initialOption={[{ value: 'opt12', label: 'Georgia' }, { value: 'opt16', label: 'Illinois' }]}
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
      { label: 'Apples', value: 'opt0', dismissible: false },
      { label: 'Bananas', value: 'opt1', dismissible: false }
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
        <DeprecatedSelect
          editable
          {...this.props}
          selectedOption={this.state.options}
          onChange={this.handleChange}
        >
          <option value="opt0">Apples</option>
          <option value="opt1">Bananas</option>
          <option value="opt2">Oranges</option>
          <option value="opt3">Mangoes</option>
          <option value="opt4">Pears</option>
          <option value="opt5">Cherries</option>

        </DeprecatedSelect>
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
        <DeprecatedSelect
          {...this.props}
          editable
          inline
        >
          <option value="opt0">Alabama</option>
          <option value="opt1">Alaska</option>
          <option value="opt2">American Samoa</option>
          <option value="opt3">Arizona</option>
          <option value="opt4">Arkansas</option>
          <option value="opt5">California</option>
          <option value="opt6">Colorado</option>
          <option value="opt7">Connecticut</option>
          <option value="opt8">Delaware</option>
          <option value="opt9">District Of Columbia</option>
          <option value="opt10">Federated States Of Micronesia</option>
          <option value="opt11">Florida</option>
          <option value="opt12">Georgia</option>
          <option value="opt13">Guam</option>
          <option value="opt14">Hawaii</option>
          <option value="opt15">Idaho</option>
          <option value="opt16">Illinois</option>
        </DeprecatedSelect>
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
    <Figure.Item>When implementing Select that allows multiple values, be sure to add AccessibleContent so that it announces what action will be taken when screen readers interact with the tags in the form</Figure.Item>
  </Figure>
</Guidelines>
```
