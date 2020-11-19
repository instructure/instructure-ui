---
title: Search
category: Patterns
id: Search
---

## Search

Make use of the following patterns when prompting users for a search query.

### Auto Activated Search

Results are updated in real time as the user keys in the search term.

```js
---
render: false
example: true
---
class AutoActivatedSearchExample extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      value: '',
      searchQuery: '',
      isLoading: false,
      results: []
    }
  }

  timeoutId = null

  handleChange = (e, value) => {
    clearTimeout(this.timeoutId);

    this.setState({
      value,
    })

    this.loadResults(value)
  }

  loadResults = debounce((value) => {
    if (!value || !value.length) {
      this.setState({
        searchQuery: value,
        isLoading: false,
        results: []
      })

      return;
    }

    this.setState({
      isLoading: true,
      searchQuery: value
    })

    this.timeoutId = setTimeout(() => {
      const results = this.filterResults(value)

      this.setState({
        results,
        isLoading: false
      })
    }, 1000)
  }, 300)

  filterResults = (query) => {
    if (!query.length) {
      return []
    }

    return this.props.dataset.filter(
      ({label}) => label.toLowerCase().indexOf(query.toLowerCase()) > -1
    )
  }

  handleClear = (e) => {
    e.stopPropagation()
    this.handleChange(e, "")
    this.inputRef.focus()
  }

  renderClearButton = () => {
    if (!this.state.value.length) return;

    return (
      <IconButton
          type="button"
          size="small"
          withBackground={false}
          withBorder={false}
          screenReaderLabel="Clear search"
          disabled={this.state.disabled || this.state.readOnly}
          onClick={this.handleClear}>
        <IconTroubleLine />
      </IconButton>
    )
  }

  render () {
    const {
      results,
      value,
      searchQuery,
      isLoading
    } = this.state

    return (
      <View as="div" padding="medium">
        <form
           name="autoActivatedSearchExample"
           autoComplete="off">
          <TextInput
            renderLabel={
              <ScreenReaderContent>Search fruits</ScreenReaderContent>
            }
            placeholder="Search fruits..."
            value={value}
            onChange={this.handleChange}
            inputRef={(el) => this.inputRef = el}
            renderBeforeInput={<IconSearchLine inline={false} />}
            renderAfterInput={this.renderClearButton()}
          />
        </form>
        <View as="div" padding="medium 0">
        {isLoading ? (
          <Flex direction="column" alignItems="center" padding="large 0">
            <Spinner renderTitle="Loading" />
          </Flex>
        ) : results.length ? (
            <>
              <View as="div" margin="0 0 small">
                <Text color="secondary">
                  {results.length} {results.length > 1 ? 'results ' : 'result '}
                  for "{searchQuery}"
                </Text>
              </View>
              {results.map(({ id, label }) => (
                <View
                  key={id}
                  as="div"
                  padding="small"
                  borderWidth="small none none none"
                >
                  {label}
                </View>
              ))}
              <Alert
                liveRegion={() => document.getElementById('flash-messages')}
                liveRegionPoliteness="assertive"
                screenReaderOnly
              >
                {`${results.length} ${results.length > 1 ? 'results' : 'result '} found`}
              </Alert>
            </>
          ) : (
            <Flex direction="column" alignItems="center" padding="large 0">
              <IconSearchLine size="medium" color="secondary" />
              <View margin="small 0 0">
                <Text size="large">
                  { searchQuery.length ?
                    `No results found for "${searchQuery}"` :
                    "Start typing to find results"
                  }
                </Text>
              </View>
              <Alert
                liveRegion={() => document.getElementById('flash-messages')}
                liveRegionPoliteness="assertive"
                screenReaderOnly
              >
                No results found
              </Alert>
            </Flex>
          )}
        </View>
      </View>
    )
  }
}

render(
  <AutoActivatedSearchExample dataset={[
    {id: '0', label: 'Apple'},
    {id: '1', label: 'Banana'},
    {id: '2', label: 'Cherry'},
    {id: '3', label: 'Grape'},
    {id: '4', label: 'Mango'},
    {id: '5', label: 'Orange'},
    {id: '6', label: 'Pear'},
    {id: '7', label: 'Plum'},
    {id: '8', label: 'Watermelon'},
  ]} />
)
```

#### Guidelines

```js
---
guidelines: true
---
<Guidelines>
  <Figure recommendation="yes" title="Do">
    <Figure.Item>
      Use a loading spinner or other loading animation in the results area to indicate data is being retrieved
    </Figure.Item>
    <Figure.Item>
      Debounce user input and consider setting a minimum search string length to avoid extraneous requests
    </Figure.Item>
  </Figure>
  <Figure recommendation="no" title="Don't">
    <Figure.Item>
      Use when long strings of text are needed to find useful results
    </Figure.Item>
  </Figure>
</Guidelines>
```

### Activated Search

Results are updated when a user triggers the search action, via keyboard or
mouse.

```js
---
render: false
example: true
---
class ActivatedSearchExample extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      value: '',
      submittedValue: '',
      results: []
    }
  }

  timeoutId = null

  handleChange = (e, value) => this.setState({ value })

  handleClear = (e) => {
    e.stopPropagation()
    this.handleChange(e, "")
    this.inputRef.focus()
  }

  handleSearch = (e) => {
    const { value } = this.state

    clearTimeout(this.timeoutId);

    if (!value.length) {
      return
    }

    this.setState({
      isLoading: true,
      submittedValue: value
    })

    this.timeoutId = setTimeout(() => {
      const results = this.props.dataset.filter(
        ({label}) => label.toLowerCase().indexOf(value.toLowerCase()) > -1
      )

      this.setState({
        results,
        isLoading: false
      })
    }, 1000)
  }

  renderClearButton = () => {
    if (!this.state.value.length) return;

    return (
      <IconButton
          type="button"
          size="small"
          withBackground={false}
          withBorder={false}
          screenReaderLabel="Clear search"
          disabled={this.state.disabled || this.state.readOnly}
          onClick={this.handleClear}>
        <IconTroubleLine />
      </IconButton>
    )
  }

  render () {
    const {
      results,
      submittedValue,
      value,
      isLoading
    } = this.state

    return (
      <View as="div" padding="medium">
        <form
           name="activatedSearchExample"
           onSubmit={this.handleSearch}
           autoComplete="off">
          <Flex>
            <FlexItem shouldGrow>
              <TextInput
                renderLabel={
                  <ScreenReaderContent>Search fruits</ScreenReaderContent>
                }
                placeholder="Search fruits..."
                value={value}
                onChange={this.handleChange}
                inputRef={(el) => this.inputRef = el}
                renderBeforeInput={<IconSearchLine inline={false} />}
                renderAfterInput={this.renderClearButton()}
              />
            </FlexItem>
            <FlexItem>
              <Button
                 color="primary"
                 margin="0 0 0 small"
                 onClick={this.handleSearch}>
                Search
              </Button>
            </FlexItem>
          </Flex>
        </form>
        <View as="div" padding="medium 0 0">
          {isLoading ? (
            <Flex direction="column" alignItems="center" padding="large 0">
              <Spinner renderTitle="Loading" />
            </Flex>
          ) : submittedValue.length ? results.length ? (
            <>
              <View as="div" margin="0 0 small">
                <Text color="secondary">
                  {results.length} {results.length > 1 ? 'results ' : 'result '}
                  for "{submittedValue}"
                </Text>
              </View>
              {results.map(({ id, label }) => (
                <View
                  key={id}
                  as="div"
                  padding="small"
                  borderWidth="small none none none"
                >
                  {label}
                </View>
              ))}
              <Alert
                liveRegion={() => document.getElementById('flash-messages')}
                liveRegionPoliteness="assertive"
                screenReaderOnly
              >
                {`${results.length} ${results.length > 1 ? 'results' : 'result '} found`}
              </Alert>
            </>
          ) : (
            <>
              <span>No results found for "{submittedValue}".</span>
              <Alert
                liveRegion={() => document.getElementById('flash-messages')}
                liveRegionPoliteness="assertive"
                screenReaderOnly
              >
                No results found
              </Alert>
            </>
          ) : null }
        </View>
      </View>
    )
  }
}

render(
  <ActivatedSearchExample dataset={[
    {id: '0', label: 'Apple'},
    {id: '1', label: 'Banana'},
    {id: '2', label: 'Cherry'},
    {id: '3', label: 'Grape'},
    {id: '4', label: 'Mango'},
    {id: '5', label: 'Orange'},
    {id: '6', label: 'Pear'},
    {id: '7', label: 'Plum'},
    {id: '8', label: 'Watermelon'},
  ]} />
)
```

#### Guidelines

```js
---
guidelines: true
---
<Guidelines>
  <Figure recommendation="yes" title="Do">
    <Figure.Item>
      Use a loading spinner or other loading animation in the results area after the “Search” action has been triggered
    </Figure.Item>
  </Figure>
</Guidelines>
```

### Autocomplete Results

Search performed within an autocomplete is used to populate the form field.
If the desired result is not found, no action is ultimately taken with this
pattern. It can be used for a single select, or a multi-select with tags. A
search icon may or may not be used on the left, depending on the context.

```js
---
render: false
example: true
---

class AutocompleteExample extends React.Component {
  state = {
    inputValue: '',
    isShowingOptions: false,
    highlightedOptionId: null,
    selectedOptionId: null,
    filteredOptions: this.props.dataset,
    announcement: null
  }

  getOptionById (queryId) {
    return this.props.dataset.find(({ id }) => id === queryId)
  }

  getOptionsChangedMessage (newOptions) {
    let message = newOptions.length !== this.state.filteredOptions.length
      ? `${newOptions.length} options available.` // options changed, announce new total
      : null // options haven't changed, don't announce
    if (message && newOptions.length > 0) {
      // options still available
      if (this.state.highlightedOptionId !== newOptions[0].id) {
        // highlighted option hasn't been announced
        const option = this.getOptionById(newOptions[0].id).label
        message = `${option}. ${message}`
      }
    }
    return message
  }

  filterOptions = (value) => {
    return this.props.dataset.filter(option => (
      option.label.toLowerCase().startsWith(value.toLowerCase())
    ))
  }

  matchValue () {
    const {
      filteredOptions,
      inputValue,
      highlightedOptionId,
      selectedOptionId
    } = this.state

    // an option matching user input exists
    if (filteredOptions.length === 1) {
      const onlyOption = filteredOptions[0]
      // automatically select the matching option
      if (onlyOption.label.toLowerCase() === inputValue.toLowerCase()) {
        return {
          inputValue: onlyOption.label,
          selectedOptionId: onlyOption.id,
          filteredOptions: this.filterOptions('')
        }
      }
    }
    // allow user to return to empty input and no selection
    if (inputValue.length === 0) {
      return { selectedOptionId: null }
    }
    // no match found, return selected option label to input
    if (selectedOptionId) {
      const selectedOption = this.getOptionById(selectedOptionId)
      return { inputValue: selectedOption.label }
    }
    // input value is from highlighted option, not user input
    // clear input, reset options
    if (highlightedOptionId) {
      if (inputValue === this.getOptionById(highlightedOptionId).label) {
        return {
          inputValue: '',
          filteredOptions: this.filterOptions('')
        }
      }
    }
  }

  handleShowOptions = (event) => {
    this.setState(({ filteredOptions }) => ({
      isShowingOptions: true,
      announcement: `List expanded. ${filteredOptions.length} options available.`
    }))
  }

  handleHideOptions = (event) => {
    const { selectedOptionId, inputValue } = this.state
    this.setState({
      isShowingOptions: false,
      highlightedOptionId: null,
      announcement: 'List collapsed.',
      ...this.matchValue()
    })
  }

  handleBlur = (event) => {
    this.setState({ highlightedOptionId: null })
  }

  handleHighlightOption = (event, { id }) => {
    event.persist()
    const option = this.getOptionById(id)
    if (!option) return // prevent highlighting of empty option
    this.setState((state) => ({
      highlightedOptionId: id,
      inputValue: event.type === 'keydown' ? option.label : state.inputValue,
      announcement: option.label
    }))
  }

  handleSelectOption = (event, { id }) => {
    const option = this.getOptionById(id)
    if (!option) return // prevent selecting of empty option
    this.setState({
      selectedOptionId: id,
      inputValue: option.label,
      isShowingOptions: false,
      filteredOptions: this.props.dataset,
      announcement: `${option.label} selected. List collapsed.`
    })
  }

  handleInputChange = (event) => {
    const value = event.target.value
    const newOptions = this.filterOptions(value)
    this.setState((state) => ({
      inputValue: value,
      filteredOptions: newOptions,
      highlightedOptionId: newOptions.length > 0 ? newOptions[0].id : null,
      isShowingOptions: true,
      selectedOptionId: value === '' ? null : state.selectedOptionId,
      announcement: this.getOptionsChangedMessage(newOptions)
    }))
  }

  handleClearInput = (event) => {
    this.setState({
      isShowingOptions: false,
      isLoading: false,
      highlightedOptionId: null,
      selectedOptionId: null,
      selectedOptionLabel: '',
      filteredOptions: [],
      announcement: 'List collapsed.',
      inputValue: ''
    })
  }

  renderAfterInput = () => {
    if (!this.state.inputValue.length) {
      return null
    }

    return (
      <IconButton
          type="button"
          size="small"
          withBackground={false}
          withBorder={false}
          screenReaderLabel="Clear search"
          onClick={this.handleClearInput}>
        <IconTroubleLine />
      </IconButton>
    )
  }

  render () {
    const {
      inputValue,
      isShowingOptions,
      highlightedOptionId,
      selectedOptionId,
      filteredOptions,
      announcement
    } = this.state

    return (
      <View as="div" padding="medium">
        <Select
          renderLabel="What's your favorite fruit?"
          assistiveText="Type or use arrow keys to navigate options."
          placeholder="Start typing to search..."
          inputValue={inputValue}
          isShowingOptions={isShowingOptions}
          onBlur={this.handleBlur}
          onInputChange={this.handleInputChange}
          onRequestShowOptions={this.handleShowOptions}
          onRequestHideOptions={this.handleHideOptions}
          onRequestHighlightOption={this.handleHighlightOption}
          onRequestSelectOption={this.handleSelectOption}
          renderBeforeInput={<IconSearchLine inline={false} />}
          renderAfterInput={this.renderAfterInput()}
        >
          {filteredOptions.length > 0 ? filteredOptions.map((option) => {
            return (
              <Select.Option
                id={option.id}
                key={option.id}
                isHighlighted={option.id === highlightedOptionId}
                isSelected={option.id === selectedOptionId}
                isDisabled={option.disabled}
              >
                {option.label}
              </Select.Option>
            )
          }) : (
            <Select.Option
              id="empty-option"
              key="empty-option"
            >
              No results found
            </Select.Option>
          )}
        </Select>
        <Alert
          liveRegion={() => document.getElementById('flash-messages')}
          liveRegionPoliteness="assertive"
          screenReaderOnly
        >
          { announcement }
        </Alert>
      </View>
    )
  }
}

render(
  <View>
    <AutocompleteExample dataset={[
      {id: '0', label: 'Apple'},
      {id: '1', label: 'Banana'},
      {id: '2', label: 'Cherry'},
      {id: '3', label: 'Grape'},
      {id: '4', label: 'Mango'},
      {id: '5', label: 'Orange'},
      {id: '6', label: 'Pear'},
      {id: '7', label: 'Plum'},
      {id: '8', label: 'Watermelon'},
    ]} />
  </View>
)
```

#### Guidelines

```js
---
guidelines: true
---
<Guidelines>
  <Figure recommendation="yes" title="Do">
    <Figure.Item>
      Provide additional information when no results are found (e.g. "Sorry, no matches were found”, “No results found”, “User not found”)
    </Figure.Item>
    <Figure.Item>
      Use a loading spinner if autocomplete results are being retrieved asynchronously
    </Figure.Item>
  </Figure>
</Guidelines>
```

### Search Input

Use this reference to see how various states affect how the search input is
rendered.

```js
---
render: false
example: true
---
class SearchInputExample extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      size: 'medium',
      value: '',
      disabled: false,
      readOnly: false,
      inline: false,
    }
  }

  handleChange = (e, value) => this.setState({ value })

  handleClear = (e) => {
    e.stopPropagation()
    this.handleChange(e, "")
    this.inputRef.focus()
  }

  toggleDisabled = (e) => this.setState(({ disabled: !this.state.disabled }))
  toggleReadOnly = (e) => this.setState(({ readOnly: !this.state.readOnly }))
  toggleInline = (e) => this.setState(({ inline: !this.state.inline }))
  toggleSize = (e, value) => this.setState(({ size: value }))

  renderClearButton = () => {
    if (!this.state.value.length) return;
    if (this.state.readOnly || this.state.disabled) return;

    return (
      <IconButton
          type="button"
          size="small"
          withBackground={false}
          withBorder={false}
          screenReaderLabel="Clear search"
          disabled={this.state.disabled || this.state.readOnly}
          onClick={this.handleClear}>
        <IconTroubleLine />
      </IconButton>
    )
  }

  render () {
    return (
      <View as="div" padding="medium">
        <View
          display="block"
          margin="0 0 medium"
          padding="0 0 medium"
          borderWidth="none none small none"
        >
          <TextInput
            size={this.state.size}
            renderLabel="What are you looking for?"
            display={this.state.inline ? 'inline-block' : null}
            value={this.state.value}
            onChange={this.handleChange}
            interaction={this.state.disabled
              ? 'disabled'
              : this.state.readOnly ? 'readonly' : 'enabled'
            }
            inputRef={(el) => this.inputRef = el}
            renderBeforeInput={<IconSearchLine inline={false} />}
            renderAfterInput={this.renderClearButton()}
          />
        </View>
        <FormFieldGroup
          description="TextInput Options"
          layout="inline"
        >
          <Checkbox
            checked={this.state.disabled}
            label="Disabled"
            onChange={this.toggleDisabled}
          />
          <Checkbox
            checked={this.state.readOnly}
            label="Read-Only"
            onChange={this.toggleReadOnly}
          />
          <Checkbox
            checked={this.state.inline}
            label="Inline Display"
            onChange={this.toggleInline}
          />
          <RadioInputGroup
            layout="columns"
            name="size"
            defaultValue="medium"
            description={<ScreenReaderContent>Input size</ScreenReaderContent>}
            onChange={this.toggleSize}
          >
            <RadioInput value="medium" label="Medium" />
            <RadioInput value="large" label="Large" />
          </RadioInputGroup>
        </FormFieldGroup>
      </View>
    )
  }
}

render(<SearchInputExample />)
```

#### Guidelines

```js
---
guidelines: true
---
<Guidelines>
  <Figure recommendation="yes" title="Do">
    <Figure.Item>
      Include an IconButton that clears the current search query
    </Figure.Item>
    <Figure.Item>Use the "trouble" icon for the clear action</Figure.Item>
    <Figure.Item>
      Restore focus to the search input after clearing its value
    </Figure.Item>
  </Figure>
  <Figure recommendation="no" title="Don't">
    <Figure.Item>
      Show the IconButton when there is no search query, or when the search
      input is disabled or read-only
    </Figure.Item>
    <Figure.Item>Use the "end" or "X" icons for the clear action</Figure.Item>
    <Figure.Item>Use a size "small" TextInput</Figure.Item>
  </Figure>
</Guidelines>
```
