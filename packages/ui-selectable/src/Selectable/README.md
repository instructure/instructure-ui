---
describes: Selectable
---

`Selectable` is a low level utility component that can be used to create combobox widgets. Before composing your own component, make sure an existing component, like [Select](#Select), can't be adapted for your use case.


```javascript
---
example: true
render: false
---

class CustomSelect extends React.Component {
  state = {
    isShowingOptions: false,
    highlightedOptionId: this.props.options[0].id,
    selectedOptionId: this.props.options[0].id,
    inputValue: this.props.options[0].label,
    filteredOptions: this.props.options
  }

  filterOptions = (value) => {
    return this.props.options.filter(option => (
      option.label.toLowerCase().startsWith(value.toLowerCase())
    ))
  }

  matchValue () {
    const { filteredOptions, inputValue, selectedOptionId } = this.state
    if (filteredOptions.length === 1) {
      if (filteredOptions[0].label.toLowerCase() === inputValue.toLowerCase()) {
        return {
          inputValue: filteredOptions[0].label,
          selectedOptionId: filteredOptions[0].id
        }
      }
    }
    const index = this.getOptionIndex(null, selectedOptionId, this.props.options)
    return { inputValue: this.props.options[index].label }
  }

  getInputStyles () {
    return {
      display: 'block',
      width: '250px',
      padding: '5px'
    }
  }

  getListStyles () {
    const { isShowingOptions } = this.state
    return {
      background: 'white',
      listStyle: 'none',
      padding: 0,
      margin: 0,
      border: isShowingOptions && 'solid 1px lightgray'
    }
  }

  getOptionStyles (option) {
    const { selectedOptionId, highlightedOptionId } = this.state
    const selected = selectedOptionId === option.id
    const highlighted = highlightedOptionId === option.id
    let background = 'transparent'
    if (selected) {
      background = 'lightgray'
    } else if (highlighted) {
      background = '#eeeeee'
    }
    return {
      background,
      padding: '0 10px'
    }
  }

  getOptionIndex (direction, id, from) {
    const { filteredOptions, highlightedOptionId } = this.state
    const options = from ? from : filteredOptions
    let index

    for (let i = 0; i <= options.length - 1; i++) {
      if (typeof id === 'undefined') {
        if (highlightedOptionId === options[i].id) {
          index = i + direction
          if (index < 0) {
            index = 0
          } else if (index >= options.length - 1) {
            index = options.length - 1
          }
          break
        }
      } else {
        if (id === options[i].id) {
          index = i
          break
        }
      }
    }
    return index
  }

  getHandlers () {
    return this.props.isDisabled ? {} : {
      onRequestShowOptions: (e) => this.setState(state => ({
        isShowingOptions: true,
        highlightedOptionId: state.filteredOptions[0].id
      })),
      onRequestHideOptions: (e) => {
        const index = this.getOptionIndex(null, this.state.selectedOptionId, this.props.options)
        this.setState(state => ({
          isShowingOptions: false,
          inputValue: this.props.options[index].label,
          filteredOptions: this.props.options,
          highlightedOptionId: null,
        }))
      },
      onRequestHighlightOption: (e, { id, direction }) => {
        let index = this.getOptionIndex(direction, id)
        this.setState(state => ({
          highlightedOptionId: state.filteredOptions[index] ? state.filteredOptions[index].id : null,
          inputValue: direction && state.filteredOptions[index]
            ? state.filteredOptions[index].label
            : state.inputValue
        }))
      },
      onRequestSelectOption: (e, { id }) => {
        const index = this.getOptionIndex(null, id)
        this.setState(state => ({
          selectedOptionId: id,
          inputValue: state.filteredOptions[index].label,
          filteredOptions: this.props.options,
          isShowingOptions: false,
          highlightedOptionId: null,
        }))
      }
    }
  }

  render () {
    const {
      isShowingOptions,
      inputValue,
      highlightedOptionId,
      selectedOptionId,
      filteredOptions
    } = this.state

    return (
      <Selectable
        isShowingOptions={isShowingOptions}
        highlightedOptionId={highlightedOptionId}
        selectedOptionId={selectedOptionId ? selectedOptionId : null}
        {...this.getHandlers()}
      >
        {({
          getRootProps,
          getLabelProps,
          getInputProps,
          getTriggerProps,
          getListProps,
          getOptionProps
        }) => (
          <span
            style={{display: 'inline-block'}}
            {...getRootProps({ref: (el) => this.rootRef = el})}
          >
            <label {...getLabelProps()}>Selectable Example</label>
            <input
              style={this.getInputStyles()}
              {...getInputProps()}
              {...getTriggerProps({
                type: 'text',
                value: inputValue,
                onChange: (e) => {
                  const newOptions = this.filterOptions(e.target.value)
                  this.setState({
                    inputValue: e.target.value,
                    filteredOptions: newOptions,
                    isShowingOptions: true,
                    highlightedOptionId: newOptions[0] ? newOptions[0].id : null
                  })
                },
                onBlur: (e) => this.setState({
                  filteredOptions: this.props.options,
                  highlightedOptionId: null,
                  isShowingOptions: false,
                  ...this.matchValue()
                })
              })
            } />
            <ul
              style={this.getListStyles()}
              {...getListProps()}
            >
              {isShowingOptions && filteredOptions.map((option) => (
                <li
                  key={option.id}
                  style={this.getOptionStyles(option)}
                  {...getOptionProps({ id: option.id })}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          </span>
        )}
      </Selectable>
    )
  }
}

render(
  <View>
    <CustomSelect
      options={[
        { id: '0', value: '0', label: 'Alabama' },
        { id: '1', value: '1', label: 'Alaska' },
        { id: '2', value: '2', label: 'American Samoa' },
        { id: '3', value: '3', label: 'Arizona' },
        { id: '4', value: '4', label: 'Arkansas' },
        { id: '5', value: '5', label: 'California' },
        { id: '6', value: '6', label: 'Colorado' },
        { id: '7', value: '7', label: 'Connecticut' },
        { id: '8', value: '8', label: 'Delaware' },
        { id: '9', value: '9', label: 'District Of Columbia' },
        { id: '10', value: '10', label: 'Federated States Of Micronesia' },
        { id: '11', value: '11', label: 'Florida' },
        { id: '12', value: '12', label: 'Georgia' },
        { id: '13', value: '13', label: 'Guam' },
        { id: '14', value: '14', label: 'Hawaii' },
        { id: '15', value: '15', label: 'Idaho' },
        { id: '16', value: '16', label: 'Illinois' }
      ]}
    />
  </View>
)
```

Selectable has very few opinions about how a combobox component should be composed. It mostly aims to ensure all the proper WAI-ARIA roles and attributes are set on the right elements at the right times. Selectable uses a combination of controllable props and prop getters to set these attributes and provide accessible behavior.

#### Prop getters
`Selectable` provides a number of different prop getters. Each getter is intended to be used with a particular element in your component. `getInputProps` should be used to obtain attributes relevant to the `input` element in a combobox component. `getTriggerProps` should be used for the element responsible for triggering the showing and hiding of the options list. If the `input` element is also the trigger, use both of these prop getters on that element.

The only getter with a required argument is `getOptionProps` which requires an `id` be provided. However, it's best practice to set any props needed on an element via its prop getter. This just ensures you don't inadvertently override an essential value.

#### Controllable props
There are several controllable props available. These should be updated to reflect changes to the externally managed state of the combobox component. The `selectedOptionId` prop, for example, specifies which option(s) should be considered "selected" when rendered.

#### Request callbacks
A variety of request callbacks are provided as prompts for state updates. They do not actually make any changes to props or state on their own. `onRequestShowOptions`, for example, is fired when `Selectable` thinks its `isShowingOptions` prop should be updated to true. The consumer can always decide if and how to react to these prompts, but utilizing them reduces a lot of the boilerplate combobox logic the consumer would otherwise be responsible for providing.
