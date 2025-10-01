# Select


`Select` is an accessible, custom styled combobox component for inputting a variety of data types.

- It behaves similar to [Popover](Popover) but provides additional semantic markup and focus behavior as a form input.
- It should not be used for navigation or as a list of actions/functions. (see [Menu](Menu)).
- It can behave like a `<select>` element or implement autocomplete behavior.

> Notes:
>
> - Before implementing Select, see if a [SimpleSelect](SimpleSelect) will suffice.
> - The `id` prop on options must be globally unique, it will be translated to an `id` prop in the DOM.

#### Managing state for a Select

`Select` is a controlled-only component. The consuming app or component must manage any state needed. A variety of request callbacks are provided as prompts for state updates. `onRequestShowOptions`, for example, is fired when `Select` thinks the `isShowingOptions` prop should be updated to `true`. Of course, the consumer can always choose how to react to these callbacks.

- ```javascript
  class SingleSelectExample extends React.Component {
    state = {
      inputValue: this.props.options[0].label,
      isShowingOptions: false,
      highlightedOptionId: null,
      selectedOptionId: this.props.options[0].id,
      announcement: null
    }
    inputElement = null

    focusInput = () => {
      if (this.inputElement) {
        this.inputElement.blur()
        this.inputElement.focus()
      }
    }

    getOptionById(queryId) {
      return this.props.options.find(({ id }) => id === queryId)
    }

    handleShowOptions = (event) => {
      const { options } = this.props
      const { inputValue, selectedOptionId } = this.state

      this.setState({
        isShowingOptions: true
      })
      if (inputValue || selectedOptionId || options.length === 0) return

      switch (event.key) {
        case 'ArrowDown':
          return this.handleHighlightOption(event, { id: options[0].id })
        case 'ArrowUp':
          return this.handleHighlightOption(event, {
            id: options[options.length - 1].id
          })
      }
    }

    handleHideOptions = (event) => {
      const { selectedOptionId } = this.state
      const option = this.getOptionById(selectedOptionId)?.label
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
      const nowOpen = !this.state.isShowingOptions
        ? `List expanded. ${optionsAvailable}`
        : ''
      const option = this.getOptionById(id)?.label
      this.setState((state) => ({
        highlightedOptionId: id,
        inputValue: state.inputValue,
        announcement: `${option} ${nowOpen}`
      }))
    }

    handleSelectOption = (event, { id }) => {
      this.focusInput()
      const option = this.getOptionById(id)?.label
      this.setState({
        selectedOptionId: id,
        inputValue: option,
        isShowingOptions: false,
        announcement: `"${option}" selected. List collapsed.`
      })
    }

    render() {
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
            inputRef={(el) => {
              this.inputElement = el
            }}
          >
            {this.props.options.map((option) => {
              return (
                <Select.Option
                  id={option.id}
                  key={option.id}
                  isHighlighted={option.id === highlightedOptionId}
                  isSelected={option.id === selectedOptionId}
                >
                  {option.label}
                </Select.Option>
              )
            })}
          </Select>
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

- ```js
  const SingleSelectExample = ({ options }) => {
    const [inputValue, setInputValue] = useState(options[0].label)
    const [isShowingOptions, setIsShowingOptions] = useState(false)
    const [highlightedOptionId, setHighlightedOptionId] = useState(null)
    const [selectedOptionId, setSelectedOptionId] = useState(options[0].id)
    const [announcement, setAnnouncement] = useState(null)
    const inputRef = useRef()

    const focusInput = () => {
      if (inputRef.current) {
        inputRef.current.blur()
        inputRef.current.focus()
      }
    }

    const getOptionById = (queryId) => {
      return options.find(({ id }) => id === queryId)
    }

    const handleShowOptions = (event) => {
      setIsShowingOptions(true)
      if (inputValue || selectedOptionId || options.length === 0) return

      switch (event.key) {
        case 'ArrowDown':
          return handleHighlightOption(event, { id: options[0].id })
        case 'ArrowUp':
          return handleHighlightOption(event, {
            id: options[options.length - 1].id
          })
      }
    }

    const handleHideOptions = (event) => {
      const option = getOptionById(selectedOptionId)?.label
      setIsShowingOptions(false)
      setHighlightedOptionId(null)
      setSelectedOptionId(selectedOptionId ? option : '')
      setAnnouncement('List collapsed.')
    }

    const handleBlur = (event) => {
      setHighlightedOptionId(null)
    }

    const handleHighlightOption = (event, { id }) => {
      event.persist()
      const optionsAvailable = `${options.length} options available.`
      const nowOpen = !isShowingOptions
        ? `List expanded. ${optionsAvailable}`
        : ''
      const option = getOptionById(id)?.label
      setHighlightedOptionId(id)
      setInputValue(inputValue)
      setAnnouncement(`${option} ${nowOpen}`)
    }

    const handleSelectOption = (event, { id }) => {
      focusInput()
      const option = getOptionById(id)?.label
      setSelectedOptionId(id)
      setInputValue(option)
      setIsShowingOptions(false)
      setAnnouncement(`"${option}" selected. List collapsed.`)
    }

    return (
      <div>
        <Select
          renderLabel="Single Select"
          assistiveText="Use arrow keys to navigate options."
          inputValue={inputValue}
          isShowingOptions={isShowingOptions}
          onBlur={handleBlur}
          onRequestShowOptions={handleShowOptions}
          onRequestHideOptions={handleHideOptions}
          onRequestHighlightOption={handleHighlightOption}
          onRequestSelectOption={handleSelectOption}
          inputRef={(el) => {
            inputRef.current = el
          }}
        >
          {options.map((option) => {
            return (
              <Select.Option
                id={option.id}
                key={option.id}
                isHighlighted={option.id === highlightedOptionId}
                isSelected={option.id === selectedOptionId}
              >
                {option.label}
              </Select.Option>
            )
          })}
        </Select>
      </div>
    )
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

- ```javascript
  class AutocompleteExample extends React.Component {
    state = {
      inputValue: '',
      isShowingOptions: false,
      highlightedOptionId: null,
      selectedOptionId: null,
      filteredOptions: this.props.options,
      announcement: null
    }
    inputElement = null

    getOptionById(queryId) {
      return this.props.options.find(({ id }) => id === queryId)
    }

    getOptionsChangedMessage(newOptions) {
      let message =
        newOptions.length !== this.state.filteredOptions.length
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
      return this.props.options.filter((option) =>
        option.label.toLowerCase().startsWith(value.toLowerCase())
      )
    }

    focusInput = () => {
      if (this.inputElement) {
        this.inputElement.blur()
        this.inputElement.focus()
      }
    }

    matchValue() {
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
      const { options } = this.props
      const { inputValue, selectedOptionId } = this.state

      this.setState(({ filteredOptions }) => ({
        isShowingOptions: true,
        announcement: `List expanded. ${filteredOptions.length} options available.`
      }))

      if (inputValue || selectedOptionId || options.length === 0) return

      switch (event.key) {
        case 'ArrowDown':
          return this.handleHighlightOption(event, { id: options[0].id })
        case 'ArrowUp':
          return this.handleHighlightOption(event, {
            id: options[options.length - 1].id
          })
      }
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
        inputValue: state.inputValue,
        announcement: option.label
      }))
    }

    handleSelectOption = (event, { id }) => {
      const option = this.getOptionById(id)
      if (!option) return // prevent selecting of empty option
      this.focusInput()
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

    render() {
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
            inputRef={(el) => {
              this.inputElement = el
            }}
          >
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => {
                return (
                  <Select.Option
                    id={option.id}
                    key={option.id}
                    isHighlighted={option.id === highlightedOptionId}
                    isSelected={option.id === selectedOptionId}
                    isDisabled={option.disabled}
                    renderBeforeLabel={
                      !option.disabled ? IconUserSolid : IconUserLine
                    }
                  >
                    {!option.disabled
                      ? option.label
                      : `${option.label} (unavailable)`}
                  </Select.Option>
                )
              })
            ) : (
              <Select.Option id="empty-option" key="empty-option">
                ---
              </Select.Option>
            )}
          </Select>
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

- ```js
  const AutocompleteExample = ({ options }) => {
    const [inputValue, setInputValue] = useState('')
    const [isShowingOptions, setIsShowingOptions] = useState(false)
    const [highlightedOptionId, setHighlightedOptionId] = useState(null)
    const [selectedOptionId, setSelectedOptionId] = useState(null)
    const [filteredOptions, setFilteredOptions] = useState(options)
    const [announcement, setAnnouncement] = useState(null)
    const inputRef = useRef()

    const focusInput = () => {
      if (inputRef.current) {
        inputRef.current.blur()
        inputRef.current.focus()
      }
    }

    const getOptionById = (queryId) => {
      return options.find(({ id }) => id === queryId)
    }

    const getOptionsChangedMessage = (newOptions) => {
      let message =
        newOptions.length !== filteredOptions.length
          ? `${newOptions.length} options available.` // options changed, announce new total
          : null // options haven't changed, don't announce
      if (message && newOptions.length > 0) {
        // options still available
        if (highlightedOptionId !== newOptions[0].id) {
          // highlighted option hasn't been announced
          const option = getOptionById(newOptions[0].id).label
          message = `${option}. ${message}`
        }
      }
      return message
    }

    const filterOptions = (value) => {
      return options.filter((option) =>
        option.label.toLowerCase().startsWith(value.toLowerCase())
      )
    }

    const matchValue = () => {
      // an option matching user input exists
      if (filteredOptions.length === 1) {
        const onlyOption = filteredOptions[0]
        // automatically select the matching option
        if (onlyOption.label.toLowerCase() === inputValue.toLowerCase()) {
          setInputValue(onlyOption.label)
          setSelectedOptionId(onlyOption.id)
          setFilteredOptions(filterOptions(''))
        }
      }
      // allow user to return to empty input and no selection
      else if (inputValue.length === 0) {
        setSelectedOptionId(null)
      }
      // no match found, return selected option label to input
      else if (selectedOptionId) {
        const selectedOption = getOptionById(selectedOptionId)
        setInputValue(selectedOption.label)
      }
      // input value is from highlighted option, not user input
      // clear input, reset options
      else if (highlightedOptionId) {
        if (inputValue === getOptionById(highlightedOptionId).label) {
          setInputValue('')
          setFilteredOptions(filterOptions(''))
        }
      }
    }

    const handleShowOptions = (event) => {
      setIsShowingOptions(true)
      setAnnouncement(
        `List expanded. ${filteredOptions.length} options available.`
      )
      if (inputValue || selectedOptionId || options.length === 0) return

      switch (event.key) {
        case 'ArrowDown':
          return handleHighlightOption(event, { id: options[0].id })
        case 'ArrowUp':
          return handleHighlightOption(event, {
            id: options[options.length - 1].id
          })
      }
    }

    const handleHideOptions = (event) => {
      setIsShowingOptions(false)
      setHighlightedOptionId(false)
      setAnnouncement('List collapsed.')
      matchValue()
    }

    const handleBlur = (event) => {
      setHighlightedOptionId(null)
    }

    const handleHighlightOption = (event, { id }) => {
      event.persist()
      const option = getOptionById(id)
      if (!option) return // prevent highlighting of empty option
      setHighlightedOptionId(id)
      setInputValue(inputValue)
      setAnnouncement(option.label)
    }

    const handleSelectOption = (event, { id }) => {
      const option = getOptionById(id)
      if (!option) return // prevent selecting of empty option
      focusInput()
      setSelectedOptionId(id)
      setInputValue(option.label)
      setIsShowingOptions(false)
      setFilteredOptions(options)
      setAnnouncement(`${option.label} selected. List collapsed.`)
    }

    const handleInputChange = (event) => {
      const value = event.target.value
      const newOptions = filterOptions(value)
      setInputValue(value)
      setFilteredOptions(newOptions)
      setHighlightedOptionId(newOptions.length > 0 ? newOptions[0].id : null)
      setIsShowingOptions(true)
      setSelectedOptionId(value === '' ? null : selectedOptionId)
      setAnnouncement(getOptionsChangedMessage(newOptions))
    }

    return (
      <div>
        <Select
          renderLabel="Autocomplete"
          assistiveText="Type or use arrow keys to navigate options."
          placeholder="Start typing to search..."
          inputValue={inputValue}
          isShowingOptions={isShowingOptions}
          onBlur={handleBlur}
          onInputChange={handleInputChange}
          onRequestShowOptions={handleShowOptions}
          onRequestHideOptions={handleHideOptions}
          onRequestHighlightOption={handleHighlightOption}
          onRequestSelectOption={handleSelectOption}
          renderBeforeInput={<IconUserSolid inline={false} />}
          renderAfterInput={<IconSearchLine inline={false} />}
          inputRef={(el) => {
            inputRef.current = el
          }}
        >
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => {
              return (
                <Select.Option
                  id={option.id}
                  key={option.id}
                  isHighlighted={option.id === highlightedOptionId}
                  isSelected={option.id === selectedOptionId}
                  isDisabled={option.disabled}
                  renderBeforeLabel={
                    !option.disabled ? IconUserSolid : IconUserLine
                  }
                >
                  {!option.disabled
                    ? option.label
                    : `${option.label} (unavailable)`}
                </Select.Option>
              )
            })
          ) : (
            <Select.Option id="empty-option" key="empty-option">
              ---
            </Select.Option>
          )}
        </Select>
      </div>
    )
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

To mark an option as "highlighted", use the option's `isHighlighted` prop. Note that only one highlighted option is permitted. Similarly, use `isSelected` to mark an option or multiple options as "selected". When allowing multiple selections, it's best to render a [Tag](Tag) with [AccessibleContent](AccessibleContent) for each selected option via the `renderBeforeInput` prop.

- ```javascript
  class MultipleSelectExample extends React.Component {
    state = {
      inputValue: '',
      isShowingOptions: false,
      highlightedOptionId: null,
      selectedOptionId: ['opt1', 'opt6'],
      filteredOptions: this.props.options,
      announcement: null
    }

    inputRef = null

    focusInput = () => {
      if (this.inputRef) {
        this.inputRef.blur()
        this.inputRef.focus()
      }
    }

    getOptionById(queryId) {
      return this.props.options.find(({ id }) => id === queryId)
    }

    getOptionsChangedMessage(newOptions) {
      let message =
        newOptions.length !== this.state.filteredOptions.length
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
      return this.props.options.filter((option) =>
        option.label.toLowerCase().startsWith(value.toLowerCase())
      )
    }

    matchValue() {
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
      const { options } = this.props
      const { inputValue, selectedOptionId } = this.state

      this.setState({ isShowingOptions: true })

      if (inputValue || options.length === 0) return

      switch (event.key) {
        case 'ArrowDown':
          return this.handleHighlightOption(event, {
            id: options.find((option) => !selectedOptionId.includes(option.id))
              .id
          })
        case 'ArrowUp':
          // Highlight last non-selected option
          return this.handleHighlightOption(event, {
            id: options[
              options.findLastIndex(
                (option) => !selectedOptionId.includes(option.id)
              )
            ].id
          })
      }
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
        inputValue: state.inputValue,
        announcement: option.label
      }))
    }

    handleSelectOption = (event, { id }) => {
      this.focusInput()
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
    dismissTag(e, tag) {
      // prevent closing of list
      e.stopPropagation()
      e.preventDefault()

      const newSelection = this.state.selectedOptionId.filter(
        (id) => id !== tag
      )
      this.setState(
        {
          selectedOptionId: newSelection,
          highlightedOptionId: null,
          announcement: `${this.getOptionById(tag).label} removed`
        },
        () => {
          this.inputRef.focus()
        }
      )
    }
    // render tags when multiple options are selected
    renderTags() {
      const { selectedOptionId } = this.state
      return selectedOptionId.map((id, index) => (
        <Tag
          dismissible
          key={id}
          text={
            <AccessibleContent alt={`Remove ${this.getOptionById(id).label}`}>
              {this.getOptionById(id)?.label}
            </AccessibleContent>
          }
          margin={
            index > 0 ? 'xxx-small xx-small xxx-small 0' : '0 xx-small 0 0'
          }
          onClick={(e) => this.dismissTag(e, id)}
        />
      ))
    }

    render() {
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
            inputRef={(el) => (this.inputRef = el)}
            onBlur={this.handleBlur}
            onInputChange={this.handleInputChange}
            onRequestShowOptions={this.handleShowOptions}
            onRequestHideOptions={this.handleHideOptions}
            onRequestHighlightOption={this.handleHighlightOption}
            onRequestSelectOption={this.handleSelectOption}
            onKeyDown={this.handleKeyDown}
            renderBeforeInput={
              selectedOptionId.length > 0 ? this.renderTags() : null
            }
          >
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => {
                if (selectedOptionId.indexOf(option.id) === -1) {
                  return (
                    <Select.Option
                      id={option.id}
                      key={option.id}
                      isHighlighted={option.id === highlightedOptionId}
                    >
                      {option.label}
                    </Select.Option>
                  )
                }
              })
            ) : (
              <Select.Option id="empty-option" key="empty-option">
                ---
              </Select.Option>
            )}
          </Select>
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

- ```js
  const MultipleSelectExample = ({ options }) => {
    const [inputValue, setInputValue] = useState('')
    const [isShowingOptions, setIsShowingOptions] = useState(false)
    const [highlightedOptionId, setHighlightedOptionId] = useState(null)
    const [selectedOptionId, setSelectedOptionId] = useState(['opt1', 'opt6'])
    const [filteredOptions, setFilteredOptions] = useState(options)
    const [announcement, setAnnouncement] = useState(null)
    const inputRef = useRef()

    const focusInput = () => {
      if (inputRef.current) {
        inputRef.current.blur()
        inputRef.current.focus()
      }
    }

    const getOptionById = (queryId) => {
      return options.find(({ id }) => id === queryId)
    }

    const getOptionsChangedMessage = (newOptions) => {
      let message =
        newOptions.length !== filteredOptions.length
          ? `${newOptions.length} options available.` // options changed, announce new total
          : null // options haven't changed, don't announce
      if (message && newOptions.length > 0) {
        // options still available
        if (highlightedOptionId !== newOptions[0].id) {
          // highlighted option hasn't been announced
          const option = getOptionById(newOptions[0].id).label
          message = `${option}. ${message}`
        }
      }
      return message
    }

    const filterOptions = (value) => {
      return options.filter((option) =>
        option.label.toLowerCase().startsWith(value.toLowerCase())
      )
    }

    const matchValue = () => {
      // an option matching user input exists
      if (filteredOptions.length === 1) {
        const onlyOption = filteredOptions[0]
        // automatically select the matching option
        if (onlyOption.label.toLowerCase() === inputValue.toLowerCase()) {
          setInputValue('')
          setSelectedOptionId([...selectedOptionId, onlyOption.id])
          setFilteredOptions(filterOptions(''))
        }
      }
      // input value is from highlighted option, not user input
      // clear input, reset options
      else if (highlightedOptionId) {
        if (inputValue === getOptionById(highlightedOptionId).label) {
          setInputValue('')
          setFilteredOptions(filterOptions(''))
        }
      }
    }

    const handleShowOptions = (event) => {
      setIsShowingOptions(true)

      if (inputValue || options.length === 0) return

      switch (event.key) {
        case 'ArrowDown':
          return handleHighlightOption(event, {
            id: options.find((option) => !selectedOptionId.includes(option.id))
              .id
          })
        case 'ArrowUp':
          // Highlight last non-selected option
          return handleHighlightOption(event, {
            id: options[
              options.findLastIndex(
                (option) => !selectedOptionId.includes(option.id)
              )
            ].id
          })
      }
    }

    const handleHideOptions = (event) => {
      setIsShowingOptions(false)
      matchValue()
    }

    const handleBlur = (event) => {
      setHighlightedOptionId(null)
    }

    const handleHighlightOption = (event, { id }) => {
      event.persist()
      const option = getOptionById(id)
      if (!option) return // prevent highlighting empty option
      setHighlightedOptionId(id)
      setInputValue(inputValue)
      setAnnouncement(option.label)
    }

    const handleSelectOption = (event, { id }) => {
      const option = getOptionById(id)
      if (!option) return // prevent selecting of empty option
      focusInput()
      setSelectedOptionId([...selectedOptionId, id])
      setHighlightedOptionId(null)
      setFilteredOptions(filterOptions(''))
      setInputValue('')
      setIsShowingOptions(false)
      setAnnouncement(`${option.label} selected. List collapsed.`)
    }

    const handleInputChange = (event) => {
      const value = event.target.value
      const newOptions = filterOptions(value)
      setInputValue(value)
      setFilteredOptions(newOptions)
      sethHighlightedOptionId(newOptions.length > 0 ? newOptions[0].id : null)
      setIsShowingOptions(true)
      setAnnouncement(getOptionsChangedMessage(newOptions))
    }

    const handleKeyDown = (event) => {
      if (event.keyCode === 8) {
        // when backspace key is pressed
        if (inputValue === '' && selectedOptionId.length > 0) {
          // remove last selected option, if input has no entered text
          setHighlightedOptionId(null)
          setSelectedOptionId(selectedOptionId.slice(0, -1))
        }
      }
    }

    // remove a selected option tag
    const dismissTag = (e, tag) => {
      // prevent closing of list
      e.stopPropagation()
      e.preventDefault()

      const newSelection = selectedOptionId.filter((id) => id !== tag)

      setSelectedOptionId(newSelection)
      setHighlightedOptionId(null)
      setAnnouncement(`${getOptionById(tag).label} removed`)

      inputRef.current.focus()
    }

    const renderTags = () => {
      return selectedOptionId.map((id, index) => (
        <Tag
          dismissible
          key={id}
          text={
            <AccessibleContent alt={`Remove ${getOptionById(id).label}`}>
              {getOptionById(id).label}
            </AccessibleContent>
          }
          margin={
            index > 0 ? 'xxx-small xx-small xxx-small 0' : '0 xx-small 0 0'
          }
          onClick={(e) => dismissTag(e, id)}
        />
      ))
    }

    return (
      <div>
        <Select
          renderLabel="Multiple Select"
          assistiveText="Type or use arrow keys to navigate options. Multiple selections allowed."
          inputValue={inputValue}
          isShowingOptions={isShowingOptions}
          inputRef={(el) => {
            inputRef.current = el
          }}
          onBlur={handleBlur}
          onInputChange={handleInputChange}
          onRequestShowOptions={handleShowOptions}
          onRequestHideOptions={handleHideOptions}
          onRequestHighlightOption={handleHighlightOption}
          onRequestSelectOption={handleSelectOption}
          onKeyDown={handleKeyDown}
          renderBeforeInput={selectedOptionId.length > 0 ? renderTags() : null}
        >
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => {
              if (selectedOptionId.indexOf(option.id) === -1) {
                return (
                  <Select.Option
                    id={option.id}
                    key={option.id}
                    isHighlighted={option.id === highlightedOptionId}
                  >
                    {option.label}
                  </Select.Option>
                )
              }
            })
          ) : (
            <Select.Option id="empty-option" key="empty-option">
              ---
            </Select.Option>
          )}
        </Select>
      </div>
    )
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

- ```javascript
  class GroupSelectExample extends React.Component {
    state = {
      inputValue: this.props.options['Western'][0].label,
      isShowingOptions: false,
      highlightedOptionId: null,
      selectedOptionId: this.props.options['Western'][0].id,
      announcement: null
    }

    inputElement = null

    focusInput = () => {
      if (this.inputElement) {
        this.inputElement.blur()
        this.inputElement.focus()
      }
    }

    getOptionById(id) {
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

    getGroupChangedMessage(newOption) {
      const currentOption = this.getOptionById(this.state.highlightedOptionId)
      const isNewGroup =
        !currentOption || currentOption.group !== newOption.group
      let message = isNewGroup ? `Group ${newOption.group} entered. ` : ''
      message += newOption.label
      return message
    }

    handleShowOptions = (event) => {
      const { options } = this.props
      const { inputValue, selectedOptionId } = this.state

      this.setState({
        isShowingOptions: true,
        highlightedOptionId: null
      })

      if (inputValue || selectedOptionId || options.length === 0) return

      switch (event.key) {
        case 'ArrowDown':
          return this.handleHighlightOption(event, {
            id: options[Object.keys(options)[0]][0].id
          })
        case 'ArrowUp':
          return this.handleHighlightOption(event, {
            id: Object.values(options).at(-1)?.at(-1)?.id
          })
      }
    }

    handleHideOptions = (event) => {
      const { selectedOptionId } = this.state
      this.setState({
        isShowingOptions: false,
        highlightedOptionId: null,
        inputValue: this.getOptionById(selectedOptionId)?.label
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
        inputValue: state.inputValue,
        announcement: this.getGroupChangedMessage(newOption)
      }))
    }

    handleSelectOption = (event, { id }) => {
      this.focusInput()
      this.setState({
        selectedOptionId: id,
        inputValue: this.getOptionById(id).label,
        isShowingOptions: false,
        announcement: `${this.getOptionById(id).label} selected.`
      })
    }

    renderLabel(text, variant) {
      return (
        <span>
          <Badge
            type="notification"
            variant={variant}
            standalone
            margin="0 x-small xxx-small 0"
          />
          {text}
        </span>
      )
    }

    renderGroup() {
      const { options } = this.props
      const { highlightedOptionId, selectedOptionId } = this.state

      return Object.keys(options).map((key, index) => {
        const badgeVariant = key === 'Eastern' ? 'success' : 'primary'
        return (
          <Select.Group
            key={index}
            renderLabel={this.renderLabel(key, badgeVariant)}
          >
            {options[key].map((option) => (
              <Select.Option
                key={option.id}
                id={option.id}
                isHighlighted={option.id === highlightedOptionId}
                isSelected={option.id === selectedOptionId}
              >
                {option.label}
              </Select.Option>
            ))}
          </Select.Group>
        )
      })
    }

    render() {
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
                variant={
                  this.getOptionById(selectedOptionId)?.group === 'Eastern'
                    ? 'success'
                    : 'primary'
                }
                standalone
                margin="0 0 xxx-small 0"
              />
            }
            inputRef={(el) => {
              this.inputElement = el
            }}
          >
            {this.renderGroup()}
          </Select>
        </div>
      )
    }
  }

  render(
    <View>
      <GroupSelectExample
        options={{
          Western: [
            { id: 'opt5', label: 'Alaska' },
            { id: 'opt6', label: 'California' },
            { id: 'opt7', label: 'Colorado' },
            { id: 'opt8', label: 'Idaho' }
          ],
          Eastern: [
            { id: 'opt1', label: 'Alabama' },
            { id: 'opt2', label: 'Connecticut' },
            { id: 'opt3', label: 'Delaware' },
            { id: 'opt4', label: 'Illinois' }
          ]
        }}
      />
    </View>
  )
  ```

- ```js
  const GroupSelectExample = ({ options }) => {
    const [inputValue, setInputValue] = useState(options['Western'][0].label)
    const [isShowingOptions, setIsShowingOptions] = useState(false)
    const [highlightedOptionId, setHighlightedOptionId] = useState(null)
    const [selectedOptionId, setSelectedOptionId] = useState(
      options['Western'][0].id
    )
    const [announcement, setAnnouncement] = useState(null)
    const inputRef = useRef()

    const focusInput = () => {
      if (inputRef.current) {
        inputRef.current.blur()
        inputRef.current.focus()
      }
    }

    const getOptionById = (id) => {
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

    const getGroupChangedMessage = (newOption) => {
      const currentOption = getOptionById(highlightedOptionId)
      const isNewGroup =
        !currentOption || currentOption.group !== newOption.group
      let message = isNewGroup ? `Group ${newOption.group} entered. ` : ''
      message += newOption.label
      return message
    }

    const handleShowOptions = (event) => {
      setIsShowingOptions(true)
      setHighlightedOptionId(null)
      if (inputValue || selectedOptionId || options.length === 0) return

      switch (event.key) {
        case 'ArrowDown':
          return handleHighlightOption(event, {
            id: options[Object.keys(options)[0]][0].id
          })
        case 'ArrowUp':
          return handleHighlightOption(event, {
            id: Object.values(options).at(-1)?.at(-1)?.id
          })
      }
    }

    const handleHideOptions = (event) => {
      setIsShowingOptions(false)
      setHighlightedOptionId(null)
      setInputValue(getOptionById(selectedOptionId)?.label)
    }

    const handleBlur = (event) => {
      setHighlightedOptionId(null)
    }

    const handleHighlightOption = (event, { id }) => {
      event.persist()
      const newOption = getOptionById(id)
      setHighlightedOptionId(id)
      setInputValue(inputValue)
      setAnnouncement(getGroupChangedMessage(newOption))
    }

    const handleSelectOption = (event, { id }) => {
      focusInput()
      setSelectedOptionId(id)
      setInputValue(getOptionById(id).label)
      setIsShowingOptions(false)
      setAnnouncement(`${getOptionById(id).label} selected.`)
    }

    const renderLabel = (text, variant) => {
      return (
        <span>
          <Badge
            type="notification"
            variant={variant}
            standalone
            margin="0 x-small xxx-small 0"
          />
          {text}
        </span>
      )
    }

    const renderGroup = () => {
      return Object.keys(options).map((key, index) => {
        const badgeVariant = key === 'Eastern' ? 'success' : 'primary'
        return (
          <Select.Group
            key={index}
            renderLabel={renderLabel(key, badgeVariant)}
          >
            {options[key].map((option) => (
              <Select.Option
                key={option.id}
                id={option.id}
                isHighlighted={option.id === highlightedOptionId}
                isSelected={option.id === selectedOptionId}
              >
                {option.label}
              </Select.Option>
            ))}
          </Select.Group>
        )
      })
    }

    return (
      <div>
        <Select
          renderLabel="Group Select"
          assistiveText="Type or use arrow keys to navigate options."
          inputValue={inputValue}
          isShowingOptions={isShowingOptions}
          onBlur={handleBlur}
          onRequestShowOptions={handleShowOptions}
          onRequestHideOptions={handleHideOptions}
          onRequestHighlightOption={handleHighlightOption}
          onRequestSelectOption={handleSelectOption}
          renderBeforeInput={
            <Badge
              type="notification"
              variant={
                getOptionById(selectedOptionId)?.group === 'Eastern'
                  ? 'success'
                  : 'primary'
              }
              standalone
              margin="0 0 xxx-small 0"
            />
          }
          inputRef={(el) => {
            inputRef.current = el
          }}
        >
          {renderGroup()}
        </Select>
      </div>
    )
  }

  render(
    <View>
      <GroupSelectExample
        options={{
          Western: [
            { id: 'opt5', label: 'Alaska' },
            { id: 'opt6', label: 'California' },
            { id: 'opt7', label: 'Colorado' },
            { id: 'opt8', label: 'Idaho' }
          ],
          Eastern: [
            { id: 'opt1', label: 'Alabama' },
            { id: 'opt2', label: 'Connecticut' },
            { id: 'opt3', label: 'Delaware' },
            { id: 'opt4', label: 'Illinois' }
          ]
        }}
      />
    </View>
  )
  ```

##### Using groups with autocomplete on Safari

Due to a WebKit bug if you are using `Select.Group` with autocomplete, the screenreader won't announce highlight/selection changes. This only seems to be an issue in Safari. Here is an example how you can work around that:

- ```javascript
  class GroupSelectAutocompleteExample extends React.Component {
    state = {
      inputValue: '',
      isShowingOptions: false,
      highlightedOptionId: null,
      selectedOptionId: null,
      filteredOptions: this.props.options,
      announcement: null
    }

    inputElement = null

    focusInput = () => {
      if (this.inputElement) {
        this.inputElement.blur()
        this.inputElement.focus()
      }
    }

    getOptionById(id) {
      const options = this.props.options
      return Object.values(options)
        .flat()
        .find((o) => o?.id === id)
    }

    filterOptions(value, options) {
      const filteredOptions = {}
      Object.keys(options).forEach((key) => {
        filteredOptions[key] = options[key]?.filter((option) =>
          option.label.toLowerCase().includes(value.toLowerCase())
        )
      })
      const optionsWithoutEmptyKeys = Object.keys(filteredOptions)
        .filter((k) => filteredOptions[k].length > 0)
        .reduce((a, k) => ({ ...a, [k]: filteredOptions[k] }), {})
      return optionsWithoutEmptyKeys
    }

    handleShowOptions = (event) => {
      const { options } = this.props
      const { inputValue, selectedOptionId } = this.state

      this.setState({
        isShowingOptions: true,
        highlightedOptionId: null
      })

      if (inputValue || selectedOptionId || options.length === 0) return

      switch (event.key) {
        case 'ArrowDown':
          return this.handleHighlightOption(event, {
            id: options[Object.keys(options)[0]][0].id
          })
        case 'ArrowUp':
          return this.handleHighlightOption(event, {
            id: Object.values(options).at(-1)?.at(-1)?.id
          })
      }
    }

    handleHideOptions = (event) => {
      const { selectedOptionId } = this.state
      this.setState({
        isShowingOptions: false,
        highlightedOptionId: null
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
      setTimeout(() => {
        this.setState((state) => ({
          announcement: option.label
        }))
      }, 0)
      this.setState((state) => ({
        highlightedOptionId: id
      }))
    }

    handleSelectOption = (event, { id }) => {
      const option = this.getOptionById(id)
      if (!option) return // prevent selecting of empty option
      this.focusInput()
      this.setState({
        selectedOptionId: id,
        inputValue: option.label,
        isShowingOptions: false,
        filteredOptions: this.props.options,
        announcement: option.label
      })
    }

    handleInputChange = (event) => {
      const value = event.target.value
      const newOptions = this.filterOptions(value, this.props.options)
      this.setState((state) => ({
        inputValue: value,
        filteredOptions: newOptions,
        highlightedOptionId: newOptions.length > 0 ? newOptions[0].id : null,
        isShowingOptions: true,
        selectedOptionId: value === '' ? null : state.selectedOptionId
      }))
    }

    renderGroup() {
      const filteredOptions = this.state.filteredOptions
      const { highlightedOptionId, selectedOptionId } = this.state

      return Object.keys(filteredOptions).map((key, index) => {
        return (
          <Select.Group key={index} renderLabel={key}>
            {filteredOptions[key].map((option) => (
              <Select.Option
                key={option.id}
                id={option.id}
                isHighlighted={option.id === highlightedOptionId}
                isSelected={option.id === selectedOptionId}
              >
                {option.label}
              </Select.Option>
            ))}
          </Select.Group>
        )
      })
    }

    renderScreenReaderHelper() {
      const announcement = this.state.announcement
      return (
        window.safari && (
          <ScreenReaderContent>
            <span role="alert" aria-live="assertive">
              {announcement}
            </span>
          </ScreenReaderContent>
        )
      )
    }

    render() {
      const {
        inputValue,
        isShowingOptions,
        highlightedOptionId,
        selectedOptionId,
        filteredOptions
      } = this.state

      return (
        <div>
          <Select
            placeholder="Start typing to search..."
            renderLabel="Group Select with autocomplete"
            assistiveText="Type or use arrow keys to navigate options."
            inputValue={inputValue}
            isShowingOptions={isShowingOptions}
            onBlur={this.handleBlur}
            onInputChange={this.handleInputChange}
            onRequestShowOptions={this.handleShowOptions}
            onRequestHideOptions={this.handleHideOptions}
            onRequestHighlightOption={this.handleHighlightOption}
            onRequestSelectOption={this.handleSelectOption}
            inputRef={(el) => {
              this.inputElement = el
            }}
          >
            {this.renderGroup()}
          </Select>
          {this.renderScreenReaderHelper()}
        </div>
      )
    }
  }

  render(
    <View>
      <GroupSelectAutocompleteExample
        options={{
          Western: [
            { id: 'opt5', label: 'Alaska' },
            { id: 'opt6', label: 'California' },
            { id: 'opt7', label: 'Colorado' },
            { id: 'opt8', label: 'Idaho' }
          ],
          Eastern: [
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

- ```js
  const GroupSelectAutocompleteExample = ({ options }) => {
    const [inputValue, setInputValue] = useState('')
    const [isShowingOptions, setIsShowingOptions] = useState(false)
    const [highlightedOptionId, setHighlightedOptionId] = useState(null)
    const [selectedOptionId, setSelectedOptionId] = useState(null)
    const [filteredOptions, setFilteredOptions] = useState(options)
    const [announcement, setAnnouncement] = useState(null)
    const inputRef = useRef()

    const focusInput = () => {
      if (inputRef.current) {
        inputRef.current.blur()
        inputRef.current.focus()
      }
    }

    const getOptionById = (id) => {
      return Object.values(options)
        .flat()
        .find((o) => o?.id === id)
    }

    const filterOptions = (value, options) => {
      const filteredOptions = {}
      Object.keys(options).forEach((key) => {
        filteredOptions[key] = options[key]?.filter((option) =>
          option.label.toLowerCase().includes(value.toLowerCase())
        )
      })
      const optionsWithoutEmptyKeys = Object.keys(filteredOptions)
        .filter((k) => filteredOptions[k].length > 0)
        .reduce((a, k) => ({ ...a, [k]: filteredOptions[k] }), {})
      return optionsWithoutEmptyKeys
    }

    const handleShowOptions = (event) => {
      setIsShowingOptions(true)
      setHighlightedOptionId(null)

      if (inputValue || selectedOptionId || options.length === 0) return

      switch (event.key) {
        case 'ArrowDown':
          return handleHighlightOption(event, {
            id: options[Object.keys(options)[0]][0].id
          })
        case 'ArrowUp':
          return handleHighlightOption(event, {
            id: Object.values(options).at(-1)?.at(-1)?.id
          })
      }
    }

    const handleHideOptions = (event) => {
      setIsShowingOptions(false)
      setHighlightedOptionId(null)
    }

    const handleBlur = (event) => {
      setHighlightedOptionId(null)
    }

    const handleHighlightOption = (event, { id }) => {
      event.persist()
      const option = getOptionById(id)
      setTimeout(() => {
        setAnnouncement(option.label)
      }, 0)
      setHighlightedOptionId(id)
    }

    const handleSelectOption = (event, { id }) => {
      const option = getOptionById(id)
      if (!option) return // prevent selecting of empty option
      focusInput()
      setSelectedOptionId(id)
      setInputValue(option.label)
      setIsShowingOptions(false)
      setFilteredOptions(options)
      setAnnouncement(option.label)
    }

    const handleInputChange = (event) => {
      const value = event.target.value
      const newOptions = filterOptions(value, options)
      setInputValue(value)
      setFilteredOptions(newOptions)
      setHighlightedOptionId(newOptions.length > 0 ? newOptions[0].id : null)
      setIsShowingOptions(true)
      setSelectedOptionId(value === '' ? null : selectedOptionId)
    }

    const renderGroup = () => {
      return Object.keys(filteredOptions).map((key, index) => {
        return (
          <Select.Group key={index} renderLabel={key}>
            {filteredOptions[key].map((option) => (
              <Select.Option
                key={option.id}
                id={option.id}
                isHighlighted={option.id === highlightedOptionId}
                isSelected={option.id === selectedOptionId}
              >
                {option.label}
              </Select.Option>
            ))}
          </Select.Group>
        )
      })
    }

    const renderScreenReaderHelper = () => {
      return (
        window.safari && (
          <ScreenReaderContent>
            <span role="alert" aria-live="assertive">
              {announcement}
            </span>
          </ScreenReaderContent>
        )
      )
    }

    return (
      <div>
        <Select
          placeholder="Start typing to search..."
          renderLabel="Group Select with autocomplete"
          assistiveText="Type or use arrow keys to navigate options."
          inputValue={inputValue}
          isShowingOptions={isShowingOptions}
          onBlur={handleBlur}
          onInputChange={handleInputChange}
          onRequestShowOptions={handleShowOptions}
          onRequestHideOptions={handleHideOptions}
          onRequestHighlightOption={handleHighlightOption}
          onRequestSelectOption={handleSelectOption}
          inputRef={(el) => {
            inputRef.current = el
          }}
        >
          {renderGroup()}
        </Select>
        {renderScreenReaderHelper()}
      </div>
    )
  }

  render(
    <View>
      <GroupSelectAutocompleteExample
        options={{
          Western: [
            { id: 'opt5', label: 'Alaska' },
            { id: 'opt6', label: 'California' },
            { id: 'opt7', label: 'Colorado' },
            { id: 'opt8', label: 'Idaho' }
          ],
          Eastern: [
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

If no results match the user's search, it's recommended to leave `isShowingOptions` as `true` and to display an "empty option" as a way of communicating that there are no matches. Similarly, it's helpful to display a [Spinner](Spinner) in an empty option while options load.

- ```javascript
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

    inputElement = null

    focusInput = () => {
      if (this.inputElement) {
        this.inputElement.blur()
        this.inputElement.focus()
      }
    }

    timeoutId = null

    getOptionById(queryId) {
      return this.state.filteredOptions.find(({ id }) => id === queryId)
    }

    filterOptions = (value) => {
      return this.props.options.filter((option) =>
        option.label.toLowerCase().startsWith(value.toLowerCase())
      )
    }

    matchValue() {
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
        inputValue: state.inputValue,
        announcement: option.label
      }))
    }

    handleSelectOption = (event, { id }) => {
      const option = this.getOptionById(id)
      if (!option) return // prevent selecting of empty option
      this.focusInput()
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
          filteredOptions: []
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

    render() {
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
            inputRef={(el) => {
              this.inputElement = el
            }}
          >
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => {
                return (
                  <Select.Option
                    id={option.id}
                    key={option.id}
                    isHighlighted={option.id === highlightedOptionId}
                    isSelected={option.id === selectedOptionId}
                    isDisabled={option.disabled}
                    renderBeforeLabel={
                      !option.disabled ? IconUserSolid : IconUserLine
                    }
                  >
                    {option.label}
                  </Select.Option>
                )
              })
            ) : (
              <Select.Option id="empty-option" key="empty-option">
                {isLoading ? (
                  <Spinner renderTitle="Loading" size="x-small" />
                ) : inputValue !== '' ? (
                  'No results'
                ) : (
                  'Type to search'
                )}
              </Select.Option>
            )}
          </Select>
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
          { id: 'opt14', label: 'Ziggy Stardust' }
        ]}
      />
    </View>
  )
  ```

- ```js
  const AsyncExample = ({ options }) => {
    const [inputValue, setInputValue] = useState('')
    const [isShowingOptions, setIsShowingOptions] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [highlightedOptionId, setHighlightedOptionId] = useState(null)
    const [selectedOptionId, setSelectedOptionId] = useState(null)
    const [selectedOptionLabel, setSelectedOptionLabel] = useState('')
    const [filteredOptions, setFilteredOptions] = useState([])
    const [announcement, setAnnouncement] = useState(null)
    const inputRef = useRef()

    const focusInput = () => {
      if (inputRef.current) {
        inputRef.current.blur()
        inputRef.current.focus()
      }
    }

    let timeoutId = null

    const getOptionById = (queryId) => {
      return filteredOptions.find(({ id }) => id === queryId)
    }

    const filterOptions = (value) => {
      return options.filter((option) =>
        option.label.toLowerCase().startsWith(value.toLowerCase())
      )
    }

    const matchValue = () => {
      // an option matching user input exists
      if (filteredOptions.length === 1) {
        const onlyOption = filteredOptions[0]
        // automatically select the matching option
        if (onlyOption.label.toLowerCase() === inputValue.toLowerCase()) {
          setInputValue(onlyOption.label)
          setSelectedOptionId(onlyOption.id)
          return
        }
      }
      // allow user to return to empty input and no selection
      if (inputValue.length === 0) {
        setSelectedOptionId(null)
        setFilteredOptions([])
        return
      }
      // no match found, return selected option label to input
      if (selectedOptionId) {
        setInputValue(selectedOptionLabel)
        return
      }
    }

    const handleShowOptions = (event) => {
      setIsShowingOptions(true)
    }

    const handleHideOptions = (event) => {
      setIsShowingOptions(false)
      setHighlightedOptionId(null)
      setAnnouncement('List collapsed.')
      matchValue()
    }

    const handleBlur = (event) => {
      setHighlightedOptionId(null)
    }

    const handleHighlightOption = (event, { id }) => {
      event.persist()
      const option = getOptionById(id)
      if (!option) return // prevent highlighting of empty option

      setHighlightedOptionId(id)
      setInputValue(inputValue)
      setAnnouncement(option.label)
    }

    const handleSelectOption = (event, { id }) => {
      const option = getOptionById(id)
      if (!option) return // prevent selecting of empty option
      focusInput()
      setSelectedOptionId(id)
      setSelectedOptionLabel(option.label)
      setInputValue(option.label)
      setIsShowingOptions(false)
      setAnnouncement(`${option.label} selected. List collapsed.`)
      setFilteredOptions([getOptionById(id)])
    }

    const handleInputChange = (event) => {
      const value = event.target.value
      clearTimeout(timeoutId)

      if (!value || value === '') {
        setIsLoading(false)
        setInputValue(value)
        setIsShowingOptions(true)
        setSelectedOptionId(null)
        setSelectedOptionLabel(null)
        setFilteredOptions([])
      } else {
        setIsLoading(true)
        setInputValue(value)
        setIsShowingOptions(true)
        setFilteredOptions([])
        setHighlightedOptionId(null)
        setAnnouncement('Loading options.')

        timeoutId = setTimeout(() => {
          const newOptions = filterOptions(value)
          setFilteredOptions(newOptions)
          setIsLoading(false)
          setAnnouncement(`${newOptions.length} options available.`)
        }, 1500)
      }
    }

    return (
      <div>
        <Select
          renderLabel="Async Select"
          assistiveText="Type to search"
          inputValue={inputValue}
          isShowingOptions={isShowingOptions}
          onBlur={handleBlur}
          onInputChange={handleInputChange}
          onRequestShowOptions={handleShowOptions}
          onRequestHideOptions={handleHideOptions}
          onRequestHighlightOption={handleHighlightOption}
          onRequestSelectOption={handleSelectOption}
          inputRef={(el) => {
            inputRef.current = el
          }}
        >
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => {
              return (
                <Select.Option
                  id={option.id}
                  key={option.id}
                  isHighlighted={option.id === highlightedOptionId}
                  isSelected={option.id === selectedOptionId}
                  isDisabled={option.disabled}
                  renderBeforeLabel={
                    !option.disabled ? IconUserSolid : IconUserLine
                  }
                >
                  {option.label}
                </Select.Option>
              )
            })
          ) : (
            <Select.Option id="empty-option" key="empty-option">
              {isLoading ? (
                <Spinner renderTitle="Loading" size="x-small" />
              ) : inputValue !== '' ? (
                'No results'
              ) : (
                'Type to search'
              )}
            </Select.Option>
          )}
        </Select>
      </div>
    )
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
          { id: 'opt14', label: 'Ziggy Stardust' }
        ]}
      />
    </View>
  )
  ```

### Icons

To display icons (or other elements) before or after an option, pass it via the `renderBeforeLabel` and `renderAfterLabel` prop to `Select.Option`. You can pass a function as well, which will have a `props` parameter, so you can access the properties of that `Select.Option` (e.g. if it is currently `isHighlighted`). The available props are: `[ id, isDisabled, isSelected, isHighlighted, children ]`.

- ```js
  class SingleSelectExample extends React.Component {
    state = {
      inputValue: this.props.options[0].label,
      isShowingOptions: false,
      highlightedOptionId: null,
      selectedOptionId: this.props.options[0].id,
      announcement: null
    }
    inputElement = null

    focusInput = () => {
      if (this.inputElement) {
        this.inputElement.blur()
        this.inputElement.focus()
      }
    }

    getOptionById(queryId) {
      return this.props.options.find(({ id }) => id === queryId)
    }

    handleShowOptions = (event) => {
      const { options } = this.props
      const { inputValue, selectedOptionId } = this.state

      this.setState({
        isShowingOptions: true
      })

      if (inputValue || selectedOptionId || options.length === 0) return

      switch (event.key) {
        case 'ArrowDown':
          return this.handleHighlightOption(event, { id: options[0].id })
        case 'ArrowUp':
          return this.handleHighlightOption(event, {
            id: options[options.length - 1].id
          })
      }
    }

    handleHideOptions = (event) => {
      const { selectedOptionId } = this.state
      const option = this.getOptionById(selectedOptionId)?.label
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
      const nowOpen = !this.state.isShowingOptions
        ? `List expanded. ${optionsAvailable}`
        : ''
      const option = this.getOptionById(id).label
      this.setState((state) => ({
        highlightedOptionId: id,
        inputValue: state.inputValue,
        announcement: `${option} ${nowOpen}`
      }))
    }

    handleSelectOption = (event, { id }) => {
      const option = this.getOptionById(id).label
      this.focusInput()
      this.setState({
        selectedOptionId: id,
        inputValue: option,
        isShowingOptions: false,
        announcement: `"${option}" selected. List collapsed.`
      })
    }

    render() {
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
            renderLabel="Option Icons"
            assistiveText="Use arrow keys to navigate options."
            inputValue={inputValue}
            isShowingOptions={isShowingOptions}
            onBlur={this.handleBlur}
            onRequestShowOptions={this.handleShowOptions}
            onRequestHideOptions={this.handleHideOptions}
            onRequestHighlightOption={this.handleHighlightOption}
            onRequestSelectOption={this.handleSelectOption}
            inputRef={(el) => {
              this.inputElement = el
            }}
          >
            {this.props.options.map((option) => {
              return (
                <Select.Option
                  id={option.id}
                  key={option.id}
                  isHighlighted={option.id === highlightedOptionId}
                  isSelected={option.id === selectedOptionId}
                  renderBeforeLabel={option.renderBeforeLabel}
                >
                  {option.label}
                </Select.Option>
              )
            })}
          </Select>
        </div>
      )
    }
  }

  render(
    <View>
      <SingleSelectExample
        options={[
          {
            id: 'opt1',
            label: 'Text',
            renderBeforeLabel: 'XY'
          },
          {
            id: 'opt2',
            label: 'Icon',
            renderBeforeLabel: <IconCheckSolid />
          },
          {
            id: 'opt3',
            label: 'Colored Icon',
            renderBeforeLabel: (props) => {
              let color = 'brand'
              if (props.isHighlighted) color = 'primary-inverse'
              if (props.isSelected) color = 'primary'
              if (props.isDisabled) color = 'warning'
              return <IconInstructureSolid color={color} />
            }
          }
        ]}
      />
    </View>
  )
  ```

- ```js
  const SingleSelectExample = ({ options }) => {
    const [inputValue, setInputValue] = useState(options[0].label)
    const [isShowingOptions, setIsShowingOptions] = useState(false)
    const [highlightedOptionId, setHighlightedOptionId] = useState(null)
    const [selectedOptionId, setSelectedOptionId] = useState(options[0].id)
    const [announcement, setAnnouncement] = useState(null)
    const inputRef = useRef()

    const focusInput = () => {
      if (inputRef.current) {
        inputRef.current.blur()
        inputRef.current.focus()
      }
    }

    const getOptionById = (queryId) => {
      return options.find(({ id }) => id === queryId)
    }

    const handleShowOptions = (event) => {
      setIsShowingOptions(true)

      if (inputValue || selectedOptionId || options.length === 0) return

      switch (event.key) {
        case 'ArrowDown':
          return handleHighlightOption(event, { id: options[0].id })
        case 'ArrowUp':
          return handleHighlightOption(event, {
            id: options[options.length - 1].id
          })
      }
    }

    const handleHideOptions = (event) => {
      const option = getOptionById(selectedOptionId)?.label
      setIsShowingOptions(false)
      setHighlightedOptionId(null)
      setInputValue(selectedOptionId ? option : '')
      setAnnouncement('List collapsed.')
    }

    const handleBlur = (event) => {
      setHighlightedOptionId(null)
    }

    const handleHighlightOption = (event, { id }) => {
      event.persist()
      const optionsAvailable = `${options.length} options available.`
      const nowOpen = !isShowingOptions
        ? `List expanded. ${optionsAvailable}`
        : ''
      const option = getOptionById(id).label
      setHighlightedOptionId(id)
      setInputValue(inputValue)
      setAnnouncement(`${option} ${nowOpen}`)
    }

    const handleSelectOption = (event, { id }) => {
      const option = getOptionById(id).label
      focusInput()
      setSelectedOptionId(id)
      setInputValue(option)
      setIsShowingOptions(false)
      setAnnouncement(`"${option}" selected. List collapsed.`)
    }

    return (
      <div>
        <Select
          renderLabel="Option Icons"
          assistiveText="Use arrow keys to navigate options."
          inputValue={inputValue}
          isShowingOptions={isShowingOptions}
          onBlur={handleBlur}
          onRequestShowOptions={handleShowOptions}
          onRequestHideOptions={handleHideOptions}
          onRequestHighlightOption={handleHighlightOption}
          onRequestSelectOption={handleSelectOption}
          inputRef={(el) => {
            inputRef.current = el
          }}
        >
          {options.map((option) => {
            return (
              <Select.Option
                id={option.id}
                key={option.id}
                isHighlighted={option.id === highlightedOptionId}
                isSelected={option.id === selectedOptionId}
                renderBeforeLabel={option.renderBeforeLabel}
              >
                {option.label}
              </Select.Option>
            )
          })}
        </Select>
      </div>
    )
  }

  render(
    <View>
      <SingleSelectExample
        options={[
          {
            id: 'opt1',
            label: 'Text',
            renderBeforeLabel: 'XY'
          },
          {
            id: 'opt2',
            label: 'Icon',
            renderBeforeLabel: <IconCheckSolid />
          },
          {
            id: 'opt3',
            label: 'Colored Icon',
            renderBeforeLabel: (props) => {
              let color = 'brand'
              if (props.isHighlighted) color = 'primary-inverse'
              if (props.isSelected) color = 'primary'
              if (props.isDisabled) color = 'warning'
              return <IconInstructureSolid color={color} />
            }
          }
        ]}
      />
    </View>
  )
  ```

#### Providing assistive text for screen readers

It's important to ensure screen reader users receive instruction and feedback while interacting with a `Select`, but screen reader support for the `combobox` role varies. The `assistiveText` prop should always be used to explain how a keyboard user can make a selection. Additionally, a live region should be updated with feedback as the component is interacted with, such as when options are filtered or highlighted. Using an [Alert](Alert) with the `screenReaderOnly` prop is the easiest way to do this.

> Note: This component uses a native `input` field to render the selected value. When it's included in a native HTML `form`, the text value will be sent to the backend instead of anything specified in the `value` field of the `Select.Option`-s. We do not recommend to use this component this way, rather write your own code that collects information and sends it to the backend.

```js
---
type: embed
---
<Guidelines>
  <Figure recommendation="a11y" title="Accessibility">
    <Figure.Item>To ensure Select is accessible for iOS VoiceOver users, the input field’s focus must be blurred and then reapplied after selecting an option and closing the listbox. The examples above demonstrate this behavior.
    </Figure.Item>
    <Figure.Item>If no option is selected initially, pressing the down arrow should open the listbox and move focus to the first option, while pressing up should move focus to the last item. You can see this behavior in the examples above.
    </Figure.Item>
  </Figure>
</Guidelines>
```


### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| Select | renderLabel | `\| keyof ReactHTML \| keyof ReactSVG \| ClassType<P, ClassicComponent<P, ComponentState>, ClassicComponentClass<P>> \| ComponentClass \| ReactNode \| ((data: P) => ReactNode \| Element) \| (() => ReactNode \| Element) \| Element` | Yes | - | The form field label. |
| Select | inputValue | `string` | No | `''` | The value to display in the text input. |
| Select | id | `string` | No | - | The id of the text input. One is generated if not supplied. |
| Select | size | `'small' \| 'medium' \| 'large'` | No | `'medium'` | The size of the text input. |
| Select | assistiveText | `string` | No | - | Additional helpful text to provide to screen readers about the operation of the component. |
| Select | placeholder | `string` | No | - | Html placeholder text to display when the input has no value. This should be hint text, not a label replacement. |
| Select | interaction | `'enabled' \| 'disabled' \| 'readonly'` | No | `undefined` | Specifies if interaction with the input is enabled, disabled, or readonly. When "disabled", the input changes visibly to indicate that it cannot receive user interactions. When "readonly" the input still cannot receive user interactions but it keeps the same styles as if it were enabled. |
| Select | isRequired | `boolean` | No | `false` | Whether or not the text input is required. |
| Select | isInline | `boolean` | No | `false` | Whether the input is rendered inline with other elements or if it is rendered as a block level element. |
| Select | width | `string` | No | - | The width of the text input. |
| Select | htmlSize | `number` | No | - | The width of the input (integer value 0 or higher), if a width is not explicitly provided via the `width` prop. Only applicable if `isInline={true}`. For more see https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/size |
| Select | visibleOptionsCount | `number` | No | `8` | The number of options that should be visible before having to scroll. Works best when the options are the same height. |
| Select | isOptionContentAppliedToInput | `boolean` | No | `false` | Whether or not the content of the selected `Select.Option`'s `renderBeforeLabel` and `renderAfterLabel` appear in the input field. If the selected `Select.Option` has both `renderBeforeLabel` and `renderAfterLabel` content, both will be displayed in the input field. One of the `Select.Option`'s `isSelected` prop should be `true` in order to display the content in the input field. `Select.Option`'s `renderBeforeLabel` and `renderAfterLabel` content will not be displayed, if `Select`'s `inputValue` is an empty value, null or undefined. If `true` and the selected `Select.Option` has a `renderAfterLabel` value, it will replace the default arrow icon. If `true` and `Select`'s `renderBeforeInput` or `renderAfterInput` prop is set, it will display the selected `Select.Option`'s `renderBeforeLabel` and `renderAfterLabel` instead of `Select`'s `renderBeforeInput` or `renderAfterInput` value. If the selected `Select.Option`'s `renderAfterLabel` value is empty, default arrow icon will be rendered. |
| Select | optionsMaxHeight | `string` | No | - | The max height the options list can be before having to scroll. If set, it will __override__ the `visibleOptionsCount` prop. |
| Select | optionsMaxWidth | `string` | No | - | The max width the options list can be before option text wraps. If not set, the list will only display as wide as the text input. |
| Select | messages | `FormMessage[]` | No | - | Displays messages and validation for the input. It should be an object with the following shape: `{ text: React.ReactNode, type: One of: ['newError', 'error', 'hint', 'success', 'screenreader-only'] }` |
| Select | placement | `PlacementPropValues` | No | `'bottom stretch'` | The placement of the options list. |
| Select | constrain | `PositionConstraint` | No | `'window'` | The parent in which to constrain the placement. |
| Select | mountNode | `PositionMountNode` | No | - | An element or a function returning an element to use mount the options list to in the DOM (defaults to `document.body`) |
| Select | onFocus | `(event: React.FocusEvent<HTMLInputElement>) => void` | No | - | Callback fired when text input receives focus. |
| Select | onBlur | `(event: React.FocusEvent<HTMLInputElement>) => void` | No | - | Callback fired when text input loses focus. |
| Select | onInputChange | `( event: React.ChangeEvent<HTMLInputElement>, value: string ) => void` | No | - | Callback fired when text input value changes. |
| Select | isShowingOptions | `boolean` | No | `false` | Whether or not to show the options list. |
| Select | onRequestShowOptions | `(event: React.SyntheticEvent) => void` | No | - | Callback fired requesting that the options list be shown. |
| Select | onRequestHideOptions | `(event: React.SyntheticEvent) => void` | No | - | Callback fired requesting that the options list be hidden. |
| Select | onRequestHighlightOption | `( event: React.SyntheticEvent, data: { id?: string; direction?: 1 \| -1 } ) => void` | No | - | Callback fired requesting a particular option be highlighted. |
| Select | onRequestSelectOption | `( event: React.SyntheticEvent, data: { id?: string } ) => void` | No | - | Callback fired requesting a particular option be selected. |
| Select | inputRef | `(inputElement: HTMLInputElement \| null) => void` | No | - | A ref to the html `input` element. |
| Select | listRef | `(listElement: HTMLUListElement \| null) => void` | No | - | A ref to the html `ul` element. |
| Select | renderBeforeInput | `\| keyof ReactHTML \| keyof ReactSVG \| ClassType<P, ClassicComponent<P, ComponentState>, ClassicComponentClass<P>> \| ComponentClass \| ReactNode \| ((data: P) => ReactNode \| Element) \| (() => ReactNode \| Element) \| Element` | No | - | Content to display before the text input. This will commonly be an icon or tags to show multiple selections. |
| Select | renderAfterInput | `\| keyof ReactHTML \| keyof ReactSVG \| ClassType<P, ClassicComponent<P, ComponentState>, ClassicComponentClass<P>> \| ComponentClass \| ReactNode \| ((data: P) => ReactNode \| Element) \| (() => ReactNode \| Element) \| Element` | No | - | Content to display after the text input. This content will replace the default arrow icons. |
| Select | children | `React.ReactNode` | No | - | Children of type `<Select.Option />` or `<Select.Group />`. |
| Select | shouldNotWrap | `boolean` | No | `false` | Prevents the default behavior of wrapping the input and rendered content when available space is exceeded. |
| Select | scrollToHighlightedOption | `boolean` | No | `true` | Enable/disable auto scroll to the highlighted option on every re-render |
| Select | layout | `'stacked' \| 'inline'` | No | - | In `stacked` mode the input is below the label. In `inline` mode the input is to the right/left (depending on text direction) of the label, and the layout will look like `stacked` for small screens. |
| Select.Group | renderLabel | `\| keyof ReactHTML \| keyof ReactSVG \| ClassType<P, ClassicComponent<P, ComponentState>, ClassicComponentClass<P>> \| ComponentClass \| ReactNode \| ((data: P) => ReactNode \| Element) \| (() => ReactNode \| Element) \| Element` | Yes | - | The label associated with the group options. |
| Select.Group | children | `React.ReactNode` | No | - | Children of type `<SimpleSelect.Option />` that will be considered part of the group. |
| Select.Option | id | `string` | Yes | - | The id for the option. **Must be globally unique**, it will be translated to an `id` prop in the DOM. |
| Select.Option | isHighlighted | `boolean` | No | `false` | Whether or not this option is highlighted. |
| Select.Option | isSelected | `boolean` | No | `false` | Whether or not this option is selected. |
| Select.Option | isDisabled | `boolean` | No | `false` | Whether or not this option is disabled. |
| Select.Option | renderBeforeLabel | `\| keyof ReactHTML \| keyof ReactSVG \| ClassType<P, ClassicComponent<P, ComponentState>, ClassicComponentClass<P>> \| ComponentClass \| ReactNode \| ((data: P) => ReactNode \| Element) \| (() => ReactNode \| Element) \| Element` | No | - | Content to display before the option label, such as an icon. |
| Select.Option | renderAfterLabel | `\| keyof ReactHTML \| keyof ReactSVG \| ClassType<P, ClassicComponent<P, ComponentState>, ClassicComponentClass<P>> \| ComponentClass \| ReactNode \| ((data: P) => ReactNode \| Element) \| (() => ReactNode \| Element) \| Element` | No | - | Content to display after the option label, such as an icon. |
| Select.Option | children | `React.ReactNode` | No | - | Content to display as the option label. |

### Usage

Install the package:

```shell
npm install @instructure/ui-select
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { Select } from '@instructure/ui-select'
```

