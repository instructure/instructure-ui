---
describes: Autocomplete
---

Autocomplete is a searchable select component.

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
    <Autocomplete {...this.props}
      formatSelectedOption={(tag) => (
        <AccessibleContent alt={`Remove ${tag.label}`}>{tag.label}</AccessibleContent>
      )}
    >
      {options.map((label, index) => (
        <option key={label} value={'' + index}>
          {label}
        </option>
      ))}
    </Autocomplete>
  )
}
}

render(
<div style={{ padding: '2rem 2rem 16rem 2rem', margin: '0 auto' }}>
  <Example
    label="Choose a state"
    defaultOption="12"
    onChange={(event, value) => console.log(value.label)}
  />
  <br />
  <Example
    label="Choose a few states"
    defaultOption={["0", "12", "15"]}
    multiple
  />
</div>
)
```

It allows for async loading of options Autocomplete.

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
      <Autocomplete
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
      </Autocomplete>
    )
  }
}

render(
  <div style={{ padding: '2rem 2rem 16rem 2rem', margin: '0 auto' }}>
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

A controlled Autocomplete.

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
        <Autocomplete
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
        </Autocomplete>
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
  <div style={{ padding: '2rem 2rem 16rem 2rem', margin: '0 auto' }}>
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

Autocomplete with errors:

```js
---
example: true
---
<div style={{ height: 300 }}>
  <Autocomplete
    label="Choose a state"
    messages={[{ text: 'Invalid name', type: 'error' }]}
  >
    <option value="0">Alabama</option>
    <option value="1">Alaska</option>
  </Autocomplete>
  <br />
  <Autocomplete
    label="Choose a few states"
    messages={[{ text: 'Invalid name', type: 'error' }]}
    multiple
  >
    <option value="0">Alabama</option>
    <option value="1">Alaska</option>
  </Autocomplete>
</div>
```

A disabled Autocomplete:

```js
---
example: true
---
<div style={{ padding: '2rem 2rem 16rem 2rem', margin: '0 auto' }}>
  <Autocomplete
    label="Choose a state"
    disabled
  >
    <option value="0">Alabama</option>
    <option value="1">Alaska</option>
  </Autocomplete>
  <br />
  <Autocomplete
    label="Choose a few states"
    multiple
    disabled
  >
    <option value="0">Alabama</option>
    <option value="1">Alaska</option>
  </Autocomplete>
</div>
```

Autocomplete with an `inline` layout:

```js
---
example: true
render: false
---
class Example extends React.Component {
  render () {
    return (
      <Autocomplete
        {...this.props}
        layout="inline"
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
      </Autocomplete>
    )
  }
}

render(
  <div style={{ padding: '2rem 2rem 16rem 2rem', margin: '0 auto' }}>
    <Example
      label="This one allows empty values"
      placeholder="Placeholder text"
      allowEmpty
    />
    <br />
    <Example label="Choose a few states" multiple />
  </div>
)
```

An inline Autocomplete with a fixed width. *Note: IE11 needs a `width` prop if the
Autocomplete is `inline`.*

```js
---
example: true
render: false
---
class Example extends React.Component {
  render () {
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Autocomplete
          {...this.props}
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
        </Autocomplete>
        &nbsp;
        <Text>{this.props.width}</Text>
      </div>
    )
  }
}

render(
  <div style={{ padding: '2rem 2rem 16rem 2rem', margin: '0 auto' }}>
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

Autocomplete of differing sizes next to a [Button](#Button):

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
        <Autocomplete {...this.props}>
          {options.map((label, index) => (
            <option key={label} value={'' + index}>{label}</option>
          ))}
        </Autocomplete>
        <Button size={this.props.size}>Click me</Button>
      </FormFieldGroup>
    )
  }
}

render(
  <form style={{ padding: '2rem 2rem 16rem 2rem', margin: '0 auto' }}>
    <Example label="Default-size Autocomplete and button" />
    <br/>
    <Example label="Default-size Multiple Autocomplete and button" multiple />
    <br/>
    <Example
      label="Small-size Autocomplete and button"
      size="small"
    />
    <br/>
    <Example
      label="Small-size Multiple Autocomplete and button"
      size="small"
      multiple
    />
    <br/>
    <Example
      label="Large-size Autocomplete and button"
      size="large"
    />
    <br/>
    <Example
      label="Large-size Multiple Autocomplete and button"
      size="large"
      multiple
    />
  </form>
)
```
