# Selectable


`Selectable` is a low level utility component that can be used to create combobox widgets. Before composing your own component, make sure an existing component, like [Select](Select), can't be adapted for your use case.

```js
---
type: example
---
  const CustomSelect = ({ options, isDisabled }) => {
    const [isShowingOptions, setIsShowingOptions] = useState(false)
    const [highlightedOptionId, setHighlightedOptionId] = useState(
      options[0].id
    )
    const [selectedOptionId, setSelectedOptionId] = useState(options[0].id)
    const [inputValue, setInputValue] = useState(options[0].label)
    const [filteredOptions, setFilteredOptions] = useState(options)

    const rootRef = useRef(null)

    const filterOptions = (value) => {
      return options.filter((option) =>
        option.label.toLowerCase().startsWith(value.toLowerCase())
      )
    }

    const matchValue = () => {
      if (filteredOptions.length === 1) {
        if (
          filteredOptions[0].label.toLowerCase() === inputValue.toLowerCase()
        ) {
          setInputValue(filteredOptions[0].label)
          setsSelectedOptionId(filteredOptions[0].id)
          return
        }
      }
      const index = getOptionIndex(null, selectedOptionId, options)
      setInputValue(options[index].label)
    }

    const getInputStyles = () => {
      return {
        display: 'block',
        width: '250px',
        padding: '5px'
      }
    }

    const getListStyles = () => {
      return {
        background: 'white',
        listStyle: 'none',
        padding: 0,
        margin: 0,
        border: isShowingOptions && 'solid 1px lightgray'
      }
    }

    const getOptionStyles = (option) => {
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

    const getOptionIndex = (direction, id, from) => {
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

    const getHandlers = () => {
      return isDisabled
        ? {}
        : {
            onRequestShowOptions: (e) => {
              setIsShowingOptions(true)
              setHighlightedOptionId(filteredOptions[0].id)
            },
            onRequestHideOptions: (e) => {
              const index = getOptionIndex(null, selectedOptionId, options)
              setIsShowingOptions(false)
              setInputValue(options[index].label)
              setFilteredOptions(options)
              setHighlightedOptionId(null)
            },
            onRequestHighlightOption: (e, { id, direction }) => {
              let index = getOptionIndex(direction, id)
              setHighlightedOptionId(
                filteredOptions[index] ? filteredOptions[index].id : null
              )
              setInputValue(
                direction && filteredOptions[index]
                  ? filteredOptions[index].label
                  : inputValue
              )
            },
            onRequestSelectOption: (e, { id }) => {
              const index = getOptionIndex(null, id)
              setSelectedOptionId(id)
              setInputValue(filteredOptions[index].label)
              setFilteredOptions(options)
              setIsShowingOptions(false)
              setHighlightedOptionId(null)
            }
          }
    }

    return (
      <Selectable
        isShowingOptions={isShowingOptions}
        highlightedOptionId={highlightedOptionId}
        selectedOptionId={selectedOptionId ? selectedOptionId : null}
        {...getHandlers()}
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
            style={{ display: 'inline-block' }}
            {...getRootProps({ ref: rootRef })}
          >
            <label {...getLabelProps()}>Selectable Example</label>
            <input
              style={getInputStyles()}
              {...getInputProps()}
              {...getTriggerProps({
                type: 'text',
                value: inputValue,
                onChange: (e) => {
                  const newOptions = filterOptions(e.target.value)
                  setInputValue(e.target.valu)
                  setFilteredOptions(newOptions)
                  setIsShowingOptions(true)
                  setHighlightedOptionId(
                    newOptions[0] ? newOptions[0].id : null
                  )
                },
                onBlur: (e) => {
                  setFilteredOptions(options)
                  setHighlightedOptionId(null)
                  setIsShowingOptions(false)
                  matchValue()
                }
              })}
            />
            <ul style={getListStyles()} {...getListProps()}>
              {isShowingOptions &&
                filteredOptions.map((option) => (
                  <li
                    key={option.id}
                    style={getOptionStyles(option)}
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

  render(
    <View>
      <CustomSelect
        options={[
          { id: 'opt0', value: '0', label: 'Alabama' },
          { id: 'opt1', value: '1', label: 'Alaska' },
          { id: 'opt2', value: '2', label: 'American Samoa' },
          { id: 'opt3', value: '3', label: 'Arizona' },
          { id: 'opt4', value: '4', label: 'Arkansas' },
          { id: 'opt5', value: '5', label: 'California' },
          { id: 'opt6', value: '6', label: 'Colorado' },
          { id: 'opt7', value: '7', label: 'Connecticut' },
          { id: 'opt8', value: '8', label: 'Delaware' },
          { id: 'opt9', value: '9', label: 'District Of Columbia' },
          { id: 'opt10', value: '10', label: 'Federated States Of Micronesia' },
          { id: 'opt11', value: '11', label: 'Florida' },
          { id: 'opt12', value: '12', label: 'Georgia' },
          { id: 'opt13', value: '13', label: 'Guam' },
          { id: 'opt14', value: '14', label: 'Hawaii' },
          { id: 'opt15', value: '15', label: 'Idaho' },
          { id: 'opt16', value: '16', label: 'Illinois' }
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


### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| Selectable | id | `string` | No | - | The id of the trigger element. Set automatically if not provided |
| Selectable | highlightedOptionId | `string` | No | - | The id of the option in the list that should be considered highlighted |
| Selectable | selectedOptionId | `string \| string[]` | No | - | The id of the option(s) in the list that should be considered selected |
| Selectable | isShowingOptions | `boolean` | No | `false` | Whether or not the options should be visible |
| Selectable | onRequestShowOptions | `(event: React.KeyboardEvent \| React.MouseEvent) => void` | No | - | Callback fired when the options want to become visible |
| Selectable | onRequestHideOptions | `( event: React.KeyboardEvent \| React.MouseEvent \| React.FocusEvent ) => void` | No | - | Callback fired when the options no longer want to be visible |
| Selectable | onRequestHighlightOption | `( event: React.KeyboardEvent \| React.MouseEvent, data: { id?: string; direction?: 1 \| -1 } ) => void` | No | - | Callback fired when option is hovered or highlighted via keyboard. Either the `id` or the `direction` parameter is supplied |
| Selectable | onRequestHighlightFirstOption | `(event: React.KeyboardEvent) => void` | No | - | Callback fired when first option should be highlighted (triggered by the Home key) |
| Selectable | onRequestHighlightLastOption | `(event: React.KeyboardEvent) => void` | No | - | Callback fired when last option should be highlighted (triggered by the End key) |
| Selectable | onRequestSelectOption | `( event: React.KeyboardEvent \| React.MouseEvent, data: { id?: string } ) => void` | No | - | Callback fired when option clicked or selected via keyboard |
| Selectable | render | `(propGetters: SelectableRender) => ReactNode` | No | - | A function with prop getters |
| Selectable | children | `(propGetters: SelectableRender) => ReactNode` | No | - | A function with prop getters |

### Usage

Install the package:

```shell
npm install @instructure/ui-selectable
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { Selectable } from '@instructure/ui-selectable'
```

