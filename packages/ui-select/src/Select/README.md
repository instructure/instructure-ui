---
describes: Select
---

`Select` is an accessible, custom styled combobox component for inputting a variety of data types.
- It behaves similar to [Popover](#Popover) but provides additional semantic markup and focus behavior as a form input.
- It should not be used for navigation or as a list of actions/functions. (see [Menu](#Menu)).
- It can behave like a `<select>` element or implement autocomplete behavior.

> Note: Before implementing Select, see if a [SimpleSelect](#SimpleSelect) will suffice.

#### Managing state for a Select
`Select` is a controlled-only component. The consuming app or component must manage any state needed. A variety of request callbacks are provided as prompts for state updates. `onRequestShowOptions`, for example, is fired when `Select` thinks the `isShowingOptions` prop should be updated to `true`. Of course, the consumer can always choose how to react to these callbacks.

```javascript
---
example: true
render: false
---

class SingleSelectExample extends React.Component {
  state = {
    inputValue: this.props.options[0].label,
    isShowingOptions: false,
    highlightedOptionId: null,
    selectedOptionId: this.props.options[0].id,
    announcement: null
  }

  getOptionById (queryId) {
    return this.props.options.find(({ id }) => id === queryId)
  }

  handleShowOptions = (event) => {
    this.setState({
      isShowingOptions: true
    })
  }

  handleHideOptions = (event) => {
    const { selectedOptionId } = this.state
    const option = this.getOptionById(selectedOptionId).label
    this.setState({
      isShowingOptions: false,
      highlightedOptionId: null,
      inputValue: selectedOptionId ? option : '',
      announcement: 'List collapsed.'
    })
  }

  handleBlur = (event) => {
    this.setState({
      highlightedOptionId: null
    })
  }

  handleHighlightOption = (event, { id }) => {
    event.persist()
    const optionsAvailable = `${this.props.options.length} options available.`
    const nowOpen = !this.state.isShowingOptions ? `List expanded. ${optionsAvailable}` : ''
    const option = this.getOptionById(id).label
    this.setState((state) => ({
      highlightedOptionId: id,
      inputValue: event.type === 'keydown' ? option : state.inputValue,
      announcement: `${option} ${nowOpen}`
    }))
  }

  handleSelectOption = (event, { id }) => {
    const option = this.getOptionById(id).label
    this.setState({
      selectedOptionId: id,
      inputValue: option,
      isShowingOptions: false,
      announcement: `"${option}" selected. List collapsed.`
    })
  }

  render () {
    const {
      inputValue,
      isShowingOptions,
      highlightedOptionId,
      selectedOptionId,
      announcement
    } = this.state

    return (
      <div>
        <Select
          renderLabel="Single Select"
          assistiveText="Use arrow keys to navigate options."
          inputValue={inputValue}
          isShowingOptions={isShowingOptions}
          onBlur={this.handleBlur}
          onRequestShowOptions={this.handleShowOptions}
          onRequestHideOptions={this.handleHideOptions}
          onRequestHighlightOption={this.handleHighlightOption}
          onRequestSelectOption={this.handleSelectOption}
        >
          {this.props.options.map((option) => {
            return (
              <Select.Option
                id={option.id}
                key={option.id}
                isHighlighted={option.id === highlightedOptionId}
                isSelected={option.id === selectedOptionId}
              >
                { option.label }
              </Select.Option>
            )
          })}
        </Select>
        <Alert
          liveRegion={() => document.getElementById('flash-messages')}
          liveRegionPoliteness="assertive"
          screenReaderOnly
        >
          { announcement }
        </Alert>
      </div>
    )
  }
}

render(
  <View>
    <SingleSelectExample
      options={[
        { id: 'opt1', label: 'Alaska' },
        { id: 'opt2', label: 'American Samoa' },
        { id: 'opt3', label: 'Arizona' },
        { id: 'opt4', label: 'Arkansas' },
        { id: 'opt5', label: 'California' },
        { id: 'opt6', label: 'Colorado' },
        { id: 'opt7', label: 'Connecticut' },
        { id: 'opt8', label: 'Delaware' },
        { id: 'opt9', label: 'District Of Columbia' },
        { id: 'opt10', label: 'Federated States Of Micronesia' },
        { id: 'opt11', label: 'Florida' },
        { id: 'opt12', label: 'Georgia (unavailable)' },
        { id: 'opt13', label: 'Guam' },
        { id: 'opt14', label: 'Hawaii' },
        { id: 'opt15', label: 'Idaho' },
        { id: 'opt16', label: 'Illinois' }
      ]}
    />
  </View>
)
```

#### Providing autocomplete behavior
It's best practice to always provide autocomplete functionality to help users make a selection. The example below demonstrates one method of filtering options based on user input, but this logic should be customized to what works best for the application.

> Note: Select makes some conditional assumptions about keyboard behavior. For example, if the list is NOT showing, up/down arrow keys and the space key, will show the list. Otherwise, the arrows will navigate options and the space key will type a space character.

```javascript
---
example: true
render: false
---

class AutocompleteExample extends React.Component {
  state = {
    inputValue: '',
    isShowingOptions: false,
    highlightedOptionId: null,
    selectedOptionId: null,
    filteredOptions: this.props.options,
    announcement: null
  }

  getOptionById (queryId) {
    return this.props.options.find(({ id }) => id === queryId)
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
    return this.props.options.filter(option => (
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
      filteredOptions: this.props.options,
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
      <div>
        <Select
          renderLabel="Autocomplete"
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
          renderBeforeInput={<IconUserSolid inline={false} />}
          renderAfterInput={<IconSearchLine inline={false} />}
        >
          {filteredOptions.length > 0 ? filteredOptions.map((option) => {
            return (
              <Select.Option
                id={option.id}
                key={option.id}
                isHighlighted={option.id === highlightedOptionId}
                isSelected={option.id === selectedOptionId}
                isDisabled={option.disabled}
                renderBeforeLabel={!option.disabled ? IconUserSolid : IconUserLine}
              >
                {!option.disabled
                  ? option.label
                  : `${option.label} (unavailable)`
                }
              </Select.Option>
            )
          }) : (
            <Select.Option
              id="empty-option"
              key="empty-option"
            >
              ---
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
      </div>
    )
  }
}

render(
  <View>
    <AutocompleteExample
      options={[
        { id: 'opt0', label: 'Aaron Aaronson' },
        { id: 'opt1', label: 'Amber Murphy' },
        { id: 'opt2', label: 'Andrew Miller' },
        { id: 'opt3', label: 'Barbara Ward' },
        { id: 'opt4', label: 'Byron Cranston', disabled: true },
        { id: 'opt5', label: 'Dennis Reynolds' },
        { id: 'opt6', label: 'Dee Reynolds' },
        { id: 'opt7', label: 'Ezra Betterthan' },
        { id: 'opt8', label: 'Jeff Spicoli' },
        { id: 'opt9', label: 'Joseph Smith' },
        { id: 'opt10', label: 'Jasmine Diaz' },
        { id: 'opt11', label: 'Martin Harris' },
        { id: 'opt12', label: 'Michael Morgan', disabled: true },
        { id: 'opt13', label: 'Michelle Rodriguez' },
        { id: 'opt14', label: 'Ziggy Stardust' }
      ]}
    />
  </View>
)
```

#### Highlighting and selecting options
To mark an option as "highlighted", use the option's `isHighlighted` prop. Note that only one highlighted option is permitted. Similarly, use `isSelected` to mark an option or multiple options as "selected". When allowing multiple selections, it's best to render a [Tag](#Tag) for each selected option via the `renderBeforeInput` prop.

```javascript
---
example: true
render: false
---

class MultipleSelectExample extends React.Component {
  state = {
    inputValue: '',
    isShowingOptions: false,
    highlightedOptionId: null,
    selectedOptionId: ['opt1', 'opt6'],
    filteredOptions: this.props.options,
    announcement: null
  }

  getOptionById (queryId) {
    return this.props.options.find(({ id }) => id === queryId)
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
    const { selectedOptionId } = this.state
    return this.props.options.filter(option => (
      selectedOptionId.indexOf(option.id) === -1 // ignore selected options removed from list
      && option.label.toLowerCase().startsWith(value.toLowerCase())
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
          inputValue: '',
          selectedOptionId: [...selectedOptionId, onlyOption.id],
          filteredOptions: this.filterOptions('')
        }
      }
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
    this.setState({ isShowingOptions: true })
  }

  handleHideOptions = (event) => {
    this.setState({
      isShowingOptions: false,
      ...this.matchValue()
    })
  }

  handleBlur = (event) => {
    this.setState({
      highlightedOptionId: null
    })
  }

  handleHighlightOption = (event, { id }) => {
    event.persist()
    const option = this.getOptionById(id)
    if (!option) return // prevent highlighting empty option
    this.setState((state) => ({
      highlightedOptionId: id,
      inputValue: event.type === 'keydown' ? option.label : state.inputValue,
      announcement: option.label
    }))
  }

  handleSelectOption = (event, { id }) => {
    const option = this.getOptionById(id)
    if (!option) return // prevent selecting of empty option
    this.setState((state) => ({
      selectedOptionId: [...state.selectedOptionId, id],
      highlightedOptionId: null,
      filteredOptions: this.filterOptions(''),
      inputValue: '',
      isShowingOptions: false,
      announcement: `${option.label} selected. List collapsed.`
    }))
  }

  handleInputChange = (event) => {
    const value = event.target.value
    const newOptions = this.filterOptions(value)
    this.setState({
      inputValue: value,
      filteredOptions: newOptions,
      highlightedOptionId: newOptions.length > 0 ? newOptions[0].id : null,
      isShowingOptions: true,
      announcement: this.getOptionsChangedMessage(newOptions)
    })
  }

  handleKeyDown = (event) => {
    const { selectedOptionId, inputValue } = this.state
    if (event.keyCode === 8) {
      // when backspace key is pressed
      if (inputValue === '' && selectedOptionId.length > 0) {
        // remove last selected option, if input has no entered text
        this.setState((state) => ({
          highlightedOptionId: null,
          selectedOptionId: state.selectedOptionId.slice(0, -1)
        }))
      }
    }
  }
  // remove a selected option tag
  dismissTag (e, tag) {
    // prevent closing of list
    e.stopPropagation()
    e.preventDefault()

    const newSelection = this.state.selectedOptionId.filter((id) => id !== tag)
    this.setState({
      selectedOptionId: newSelection,
      highlightedOptionId: null
    }, () => {
      this.inputRef.focus()
    })
  }
  // render tags when multiple options are selected
  renderTags () {
    const { selectedOptionId } = this.state
    return selectedOptionId.map((id, index) => (
      <Tag
        dismissible
        key={id}
        title={`Remove ${this.getOptionById(id).label}`}
        text={this.getOptionById(id).label}
        margin={index > 0 ? 'xxx-small 0 xxx-small xx-small' : 'xxx-small 0'}
        onClick={(e) => this.dismissTag(e, id)}
      />
    ))
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
      <div>
        <Select
          renderLabel="Multiple Select"
          assistiveText="Type or use arrow keys to navigate options. Multiple selections allowed."
          inputValue={inputValue}
          isShowingOptions={isShowingOptions}
          inputRef={(el) => this.inputRef = el}
          onBlur={this.handleBlur}
          onInputChange={this.handleInputChange}
          onRequestShowOptions={this.handleShowOptions}
          onRequestHideOptions={this.handleHideOptions}
          onRequestHighlightOption={this.handleHighlightOption}
          onRequestSelectOption={this.handleSelectOption}
          onKeyDown={this.handleKeyDown}
          renderBeforeInput={selectedOptionId.length > 0 ? this.renderTags() : null}
        >
          {filteredOptions.length > 0 ? filteredOptions.map((option, index) => {
            if (selectedOptionId.indexOf(option.id) === -1) {
              return (
                <Select.Option
                  id={option.id}
                  key={option.id}
                  isHighlighted={option.id === highlightedOptionId}
                >
                  { option.label }
                </Select.Option>
              )
            }
          }) : (
            <Select.Option
              id="empty-option"
              key="empty-option"
            >
              ---
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
      </div>
    )
  }
}

render(
  <View>
    <MultipleSelectExample
      options={[
        { id: 'opt1', label: 'Alaska' },
        { id: 'opt2', label: 'American Samoa' },
        { id: 'opt3', label: 'Arizona' },
        { id: 'opt4', label: 'Arkansas' },
        { id: 'opt5', label: 'California' },
        { id: 'opt6', label: 'Colorado' },
        { id: 'opt7', label: 'Connecticut' },
        { id: 'opt8', label: 'Delaware' },
        { id: 'opt9', label: 'District Of Columbia' },
        { id: 'opt10', label: 'Federated States Of Micronesia' },
        { id: 'opt11', label: 'Florida' },
        { id: 'opt12', label: 'Georgia (unavailable)' },
        { id: 'opt13', label: 'Guam' },
        { id: 'opt14', label: 'Hawaii' },
        { id: 'opt15', label: 'Idaho' },
        { id: 'opt16', label: 'Illinois' }
      ]}
    />
  </View>
)
```

#### Composing option groups
In addition to `<Select.Option />` Select also accepts `<Select.Group />` as children. This is meant to serve the same purpose as `<optgroup>` elements. Group only requires you provide a label via its `renderLabel` prop. Groups and their associated options also accept icons or other stylistic additions if needed.

```javascript
---
example: true
render: false
---

class GroupSelectExample extends React.Component {
  state = {
    inputValue: this.props.options['Western'][0].label,
    isShowingOptions: false,
    highlightedOptionId: null,
    selectedOptionId: this.props.options['Western'][0].id,
    announcement: null
  }

  getOptionById (id) {
    const { options } = this.props
    let match = null
    Object.keys(options).forEach((key, index) => {
      for (let i = 0; i < options[key].length; i++) {
        const option = options[key][i]
        if (id === option.id) {
          // return group property with the object just to make it easier
          // to check which group the option belongs to
          match = { ...option, group: key }
          break
        }
      }
    })
    return match
  }

  getGroupChangedMessage (newOption) {
    const currentOption = this.getOptionById(this.state.highlightedOptionId)
    const isNewGroup = !currentOption || currentOption.group !== newOption.group
    let message = isNewGroup ? `Group ${newOption.group} entered. ` : ''
    message += newOption.label
    return message
  }

  handleShowOptions = (event) => {
    this.setState({
      isShowingOptions: true,
      highlightedOptionId: null
    })
  }

  handleHideOptions = (event) => {
    const { selectedOptionId } = this.state
    this.setState({
      isShowingOptions: false,
      highlightedOptionId: null,
      inputValue: this.getOptionById(selectedOptionId).label
    })
  }

  handleBlur = (event) => {
    this.setState({
      highlightedOptionId: null
    })
  }

  handleHighlightOption = (event, { id }) => {
    event.persist()
    const newOption = this.getOptionById(id)
    this.setState((state) => ({
      highlightedOptionId: id,
      inputValue: event.type === 'keydown' ? newOption.label : state.inputValue,
      announcement: this.getGroupChangedMessage(newOption)
    }))
  }

  handleSelectOption = (event, { id }) => {
    this.setState({
      selectedOptionId: id,
      inputValue: this.getOptionById(id).label,
      isShowingOptions: false,
      announcement: `${this.getOptionById(id).label} selected.`
    })
  }

  renderLabel (text, variant) {
    return (
      <span>
        <Badge
          type="notification"
          variant={variant}
          standalone
          margin="0 x-small xxx-small 0"
        />
        { text }
      </span>
    )
  }

  renderGroup () {
    const { options } = this.props
    const { highlightedOptionId, selectedOptionId } = this.state

    return Object.keys(options).map((key, index) => {
      const badgeVariant = key === 'Eastern' ? 'success' : 'primary'
      return (
        <Select.Group key={index} renderLabel={this.renderLabel(key, badgeVariant)}>
          {options[key].map((option) => (
            <Select.Option
              key={option.id}
              id={option.id}
              isHighlighted={option.id === highlightedOptionId}
              isSelected={option.id === selectedOptionId}
            >
              { option.label }
            </Select.Option>
          ))}
        </Select.Group>
      )
    })
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
      <div>
        <Select
          renderLabel="Group Select"
          assistiveText="Type or use arrow keys to navigate options."
          inputValue={inputValue}
          isShowingOptions={isShowingOptions}
          onBlur={this.handleBlur}
          onRequestShowOptions={this.handleShowOptions}
          onRequestHideOptions={this.handleHideOptions}
          onRequestHighlightOption={this.handleHighlightOption}
          onRequestSelectOption={this.handleSelectOption}
          renderBeforeInput={
            <Badge
              type="notification"
              variant={this.getOptionById(selectedOptionId).group === 'Eastern'
                ? 'success'
                : 'primary'
              }
              standalone
              margin="0 0 xxx-small 0"
            />
          }
        >
          {this.renderGroup()}
        </Select>
        <Alert
          liveRegion={() => document.getElementById('flash-messages')}
          liveRegionPoliteness="assertive"
          screenReaderOnly
        >
          { announcement }
        </Alert>
      </div>
    )
  }
}

render(
  <View>
    <GroupSelectExample
      options={{
        'Western': [
          { id: 'opt5', label: 'Alaska' },
          { id: 'opt6', label: 'California' },
          { id: 'opt7', label: 'Colorado' },
          { id: 'opt8', label: 'Idaho' }
        ],
        'Eastern': [
          { id: 'opt1', label: 'Alabama' },
          { id: 'opt2', label: 'Connecticut' },
          { id: 'opt3', label: 'Delaware' },
          { id: '4', label: 'Illinois' }
        ]
      }}
    />
  </View>
)
```

#### Asynchronous option loading
If no results match the user's search, it's recommended to leave `isShowingOptions` as `true` and to display an "empty option" as a way of communicating that there are no matches. Similarly, it's helpful to display a [Spinner](#Spinner) in an empty option while options load.

```javascript
---
example: true
render: false
---

class AsyncExample extends React.Component {
  state = {
    inputValue: '',
    isShowingOptions: false,
    isLoading: false,
    highlightedOptionId: null,
    selectedOptionId: null,
    selectedOptionLabel: '',
    filteredOptions: [],
    announcement: null
  }

  timeoutId = null

  getOptionById (queryId) {
    return this.state.filteredOptions.find(({ id }) => id === queryId)
  }

  filterOptions = (value) => {
    return this.props.options.filter(option => (
      option.label.toLowerCase().startsWith(value.toLowerCase())
    ))
  }

  matchValue () {
    const {
      filteredOptions,
      inputValue,
      selectedOptionId,
      selectedOptionLabel
    } = this.state

    // an option matching user input exists
    if (filteredOptions.length === 1) {
      const onlyOption = filteredOptions[0]
      // automatically select the matching option
      if (onlyOption.label.toLowerCase() === inputValue.toLowerCase()) {
        return {
          inputValue: onlyOption.label,
          selectedOptionId: onlyOption.id
        }
      }
    }
    // allow user to return to empty input and no selection
    if (inputValue.length === 0) {
      return { selectedOptionId: null, filteredOptions: [] }
    }
    // no match found, return selected option label to input
    if (selectedOptionId) {
      return { inputValue: selectedOptionLabel }
    }
  }

  handleShowOptions = (event) => {
    this.setState(({ filteredOptions }) => ({
      isShowingOptions: true
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
      selectedOptionLabel: option.label,
      inputValue: option.label,
      isShowingOptions: false,
      announcement: `${option.label} selected. List collapsed.`,
      filteredOptions: [this.getOptionById(id)]
    })
  }

  handleInputChange = (event) => {
    const value = event.target.value
    clearTimeout(this.timeoutId)

    if (!value || value === '') {
      this.setState({
        isLoading: false,
        inputValue: value,
        isShowingOptions: true,
        selectedOptionId: null,
        selectedOptionLabel: null,
        filteredOptions: [],
      })
    } else {
      this.setState({
        isLoading: true,
        inputValue: value,
        isShowingOptions: true,
        filteredOptions: [],
        highlightedOptionId: null,
        announcement: 'Loading options.'
      })

      this.timeoutId = setTimeout(() => {
        const newOptions = this.filterOptions(value)
        this.setState({
          filteredOptions: newOptions,
          isLoading: false,
          announcement: `${newOptions.length} options available.`
        })
      }, 1500)
    }
  }

  render () {
    const {
      inputValue,
      isShowingOptions,
      isLoading,
      highlightedOptionId,
      selectedOptionId,
      filteredOptions,
      announcement
    } = this.state

    return (
      <div>
        <Select
          renderLabel="Async Select"
          assistiveText="Type to search"
          inputValue={inputValue}
          isShowingOptions={isShowingOptions}
          onBlur={this.handleBlur}
          onInputChange={this.handleInputChange}
          onRequestShowOptions={this.handleShowOptions}
          onRequestHideOptions={this.handleHideOptions}
          onRequestHighlightOption={this.handleHighlightOption}
          onRequestSelectOption={this.handleSelectOption}
        >
          {filteredOptions.length > 0 ? filteredOptions.map((option) => {
            return (
              <Select.Option
                id={option.id}
                key={option.id}
                isHighlighted={option.id === highlightedOptionId}
                isSelected={option.id === selectedOptionId}
                isDisabled={option.disabled}
                renderBeforeLabel={!option.disabled ? IconUserSolid : IconUserLine}
              >
                {option.label}
              </Select.Option>
            )
          }) : (
            <Select.Option id="empty-option" key="empty-option">
              {isLoading
                ? <Spinner renderTitle="Loading" size="x-small" />
                : inputValue !== '' ? 'No results' : 'Type to search'}
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
      </div>
    )
  }
}

render(
  <View>
    <AsyncExample
      options={[
        { id: 'opt0', label: 'Aaron Aaronson' },
        { id: 'opt1', label: 'Amber Murphy' },
        { id: 'opt2', label: 'Andrew Miller' },
        { id: 'opt3', label: 'Barbara Ward' },
        { id: 'opt4', label: 'Byron Cranston', disabled: true },
        { id: 'opt5', label: 'Dennis Reynolds' },
        { id: 'opt6', label: 'Dee Reynolds' },
        { id: 'opt7', label: 'Ezra Betterthan' },
        { id: 'opt8', label: 'Jeff Spicoli' },
        { id: 'opt9', label: 'Joseph Smith' },
        { id: 'opt10', label: 'Jasmine Diaz' },
        { id: 'opt11', label: 'Martin Harris' },
        { id: 'opt12', label: 'Michael Morgan', disabled: true },
        { id: 'opt13', label: 'Michelle Rodriguez' },
        { id: 'opt14', label: 'Ziggy Stardust' },
      ]}
    />
  </View>
)
```

#### Providing assistive text for screen readers
It's important to ensure screen reader users receive instruction and feedback while interacting with a `Select`, but screen reader support for the `combobox` role varies. The `assistiveText` prop should always be used to explain how a keyboard user can make a selection. Additionally, a live region should be updated with feedback as the component is interacted with, such as when options are filtered or highlighted. Using an [Alert](#Alert) with the `screenReaderOnly` prop is the easiest way to do this.
