import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import PropTypes from 'prop-types'
import shortid from 'shortid'
import classnames from 'classnames'

import themeable from '../../themeable'
import { omitProps } from '../../util/passthroughProps'
import CustomPropTypes from '../../util/CustomPropTypes'
import shallowEqual from '../../util/shallowEqual'
import isActiveElement from '../../util/dom/isActiveElement'

import TextInput from '../TextInput'
import ContextBox from '../ContextBox'
import Position, { PositionContent } from '../Position'

import IconArrowDown from './IconArrowDown'

import styles from './styles.css'
import theme from './theme.js'

export function areObjectArraysEqual (a, b) {
  if (a.length !== b.length) {
    return false
  }
  const lengthA = a.length
  for (let aIndex = 0; aIndex < lengthA; aIndex += 1) {
    if (!shallowEqual(a[aIndex], b[aIndex])) {
      return false
    }
  }

  return true
}

function parseOptions (children) {
  return React.Children.map(children, (option) => {
    const { label, id, value, children } = option.props
    return {
      id: id || value,
      label: label || children,
      children: children || label,
      value
    }
  }) || []
}

/**
---
category: forms
---
  Autocomplete is a searchable select component.

  ```jsx_example
  <Autocomplete
    label="Choose a state"
    defaultOption="12"
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
  ```

  An async Autocomplete.

  ```jsx_example
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

    handleInputChange = (e) => {
      const value = e.target.value.toLowerCase()

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
              return o.label.toLowerCase().startsWith(value)
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

    handleFilter = (o) => o;

    handleInputRef = (node) => {
      this._input = node
    };

    render () {
      return (
        <Autocomplete
          inputRef={this.handleInputRef}
          label="Choose a state"
          loading={this.state.loading}
          loadingOption={
            <Spinner size="small" title="Loading" />
          }
          emptyOption={this.state.emptyOption}
          onInputChange={this.handleInputChange}
          onChange={this.cleanResults}
          onClose={this.handleClose}
          defaultOption={{ value: '1', label: 'Alaska' }}
          filter={this.handleFilter}
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

  <Example />
  ```

  A controlled Autocomplete.

  ```jsx_example
  class Example extends React.Component {
    state = {
      option: null
    };

    handleChange = (e, option) => this.setState({ option });

    handleClick = () => this.setState({
      option: { value: '11', label: 'Florida' }
    });

    render () {
      return (
        <div>
          <Autocomplete
            label="Choose a state"
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
          <div>Value selected: {(this.state.option || {}).label}</div>
          <Button onClick={this.handleClick}>Select Florida</Button>
        </div>
      )
    }
  }

  <Example />
  ```

  Autocomplete with some decorated options (and only 4 visible at a time).
  The label prop is required for searching purposes in those cases.

  ```jsx_example
  <Autocomplete
    label="Choose a state"
    visibleOptionsCount="4"
    defaultOption="3"
  >
    <option value="0" label="Alabama">
      <span><PlaceholderIcon />State of Alabama</span>
    </option>
    <option value="1" label="Alaska">
      <span><PlaceholderIcon />State of Alaska</span>
    </option>
    <option value="5">California</option>
    <option value="6">Colorado</option>
    <option value="7">Connecticut</option>
    <option value="2" label="American Samoa">
      <span><PlaceholderIcon />State of American Samoa</span>
    </option>
    <option value="3" label="Arizona">
      <span><PlaceholderIcon />State of Arizona</span>
    </option>
    <option value="4" label="Arkansas">
      <span><PlaceholderIcon />State of Arkansas</span>
    </option>
  </Autocomplete>
  ```

  Autocomplete with errors.

  ```jsx_example
  <Autocomplete
    label="Choose a state"
    messages={[{ text: 'Invalid name', type: 'error' }]}
  >
    <option value="0">Alabama</option>
    <option value="1">Alaska</option>
  </Autocomplete>
  ```

  A disabled Autocomplete.

  ```jsx_example
  <Autocomplete
    label="Choose a state"
    disabled
  >
    <option value="0">Alabama</option>
    <option value="1">Alaska</option>
  </Autocomplete>
  ```

  Autocomplete with an `inline` layout.

  ```jsx_example
  <Autocomplete
    label="Choose a state"
    layout="inline"
  >
    <option value="0">Alabama</option>
    <option value="1">Alaska</option>
  </Autocomplete>
  ```

  An inline Autocomplete with a fixed width.

  ```jsx_example
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <Autocomplete
      label={<ScreenReaderContent>Label</ScreenReaderContent>}
      inline
      width="10em"
    >
      <option value="0">Alabama</option>
      <option value="1">Alaska</option>
    </Autocomplete>&nbsp;
    <Typography>foo</Typography>
  </div>
  ```

  Autocomplete of differing sizes next to a [Button](#Button).

  ```jsx_example
  <form>
    <FormFieldGroup
      layout="columns"
      vAlign="bottom"
      rowSpacing="medium"
      description={
        <ScreenReaderContent>
          Medium NumberInput + Button examples
        </ScreenReaderContent>
      }
    >
      <Autocomplete label="Default-size Autocomplete and button">
        <option value="0">Alabama</option>
        <option value="1">Alaska</option>
      </Autocomplete>
      <Button>Click me</Button>
    </FormFieldGroup>
    <br/>
    <FormFieldGroup
      layout="columns"
      vAlign="bottom"
      rowSpacing="medium"
      description={
        <ScreenReaderContent>
          Medium NumberInput + Button examples
        </ScreenReaderContent>
      }
    >
      <Autocomplete size="small" label="Small-size Autocomplete and button">
        <option value="0">Alabama</option>
        <option value="1">Alaska</option>
      </Autocomplete>
      <Button>Click me</Button>
    </FormFieldGroup>
    <br/>
    <FormFieldGroup
      layout="columns"
      vAlign="bottom"
      rowSpacing="medium"
      description={
        <ScreenReaderContent>
          Large NumberInput + Button examples
        </ScreenReaderContent>
      }
    >
      <Autocomplete size="large" label="Large-size Autocomplete and button">
        <option value="0">Alabama</option>
        <option value="1">Alaska</option>
      </Autocomplete>
      <Button size="large">Click me</Button>
    </FormFieldGroup>
  </form>
  ```
**/
@themeable(theme, styles)
class Autocomplete extends Component {
  static propTypes = {
    /**
    * Each children must be an option element.
    */
    children: CustomPropTypes.Children.oneOf(['option']),
    /**
    * a function that provides a reference to the internal input element
    */
    inputRef: PropTypes.func,
    /**
    * the selected value (must be accompanied by an `onChange` prop)
    */
    selectedOption: CustomPropTypes.controllable(
      PropTypes.oneOfType([PropTypes.string, PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        children: PropTypes.node
      })]),
      'onChange',
      'defaultOption'
    ),
    /**
    * value to set on initial render, meant for an uncontrolled component
    */
    defaultOption: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      children: PropTypes.node
    })]),

    id: PropTypes.string,

    /**
     * The placement of the content in relation to the trigger, passed down to Position
     */
    placement: CustomPropTypes.placement,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    /**
     * Disables menu interaction and renders loadingOption in its place
     */
    loading: PropTypes.bool,
    loadingOption: PropTypes.node,
    /**
     * The menu content to render when no options are present or are filtered away
     */
    emptyOption: PropTypes.node,
    /**
     * The amount of options that are visible without scrolling
     */
    visibleOptionsCount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /**
     * The filter function applied to the options when writing on the input
     */
    filter: PropTypes.func,

    /**
     * Callback fired when `<Position />` content has been rendered
     */
    onReady: PropTypes.func,
    /**
     * Callback fired when the menu is opened
     */
    onOpen: PropTypes.func,
    /**
     * Callback fired when the menu is closed
     */
    onClose: PropTypes.func,
    /**
     * Callback fired when one of the menu options gets selected
     */
    onChange: PropTypes.func,
    /**
     * Callback fired when on the onChange of the internal input
     */
    onInputChange: PropTypes.func,
    /**
     * Callback fired when on the onBlur of the internal input
     */
    onBlur: PropTypes.func,
    /**
     * Callback fired when on the onKeyDown of the internal input
     */
    onKeyDown: PropTypes.func,
    /**
     * Callback fired when on the onClick of the internal input
     */
    onClick: PropTypes.func
  }

  static defaultProps = {
    emptyOption: '---',
    loadingOption: '---',
    selectedOption: null,
    size: 'medium',
    loading: false,
    visibleOptionsCount: 8,
    inputRef: function (node) {},
    filter: (options, filterText) => {
      return options.filter(
        (option) => option.label.toLowerCase().startsWith(filterText.toLowerCase())
      )
    },
    onReady: () => {},
    onOpen: () => {},
    onClose: () => {},
    onChange: (event, value) => {},
    onInputChange: (event) => {},
    onBlur: (event) => {},
    onKeyDown: (event) => {},
    onClick: (event) => {}
  }

  constructor (props) {
    super(props)
    const options = parseOptions(props.children)
    let selectedOption = props.selectedOption || props.defaultOption
    if (typeof selectedOption === 'string') {
      selectedOption = options.find((o) => this.getOptionId(o) === selectedOption)

      if (!selectedOption) {
        throw new Error('The option value passed at mount time does not exist in options')
      }
    }

    this.state = {
      highlightedIndex: 0,
      positioned: false,
      expanded: false,
      selectedOption,
      filterText: '',
      options,
      filteredOptions: options
    }

    this._defaultId = 'Autocomplete__' + shortid.generate()
    this._optionsId = 'Autocomplete_Options_' + shortid.generate()
  }

  _input = null
  _content = null
  optionHeight = 5

  get id () {
    return this.props.id || this._defaultId
  }

  get expanded () {
    return this.state.expanded && this.state.positioned
  }

  get selectedOption () {
    return this.props.selectedOption || this.state.selectedOption
  }

  get placement () {
    if (this.props.placement) {
      return this.props.placement
    }

    if (this.props.layout === 'inline') {
      return 'bottom end'
    }

    return 'bottom start'
  }

  get focused () {
    return isActiveElement(this._input)
  }

  get value () {
    return this._input.value
  }

  getLiId (index) {
    return `${this._optionsId}_${index}`
  }

  getOptionId (option) {
    if (!option) {
      return null
    }

    return option.id !== undefined ? option.id : option.value
  }

  componentDidMount () {
    if (this.selectedOption) {
      this._input.value = this.selectedOption.label
    }
  }

  componentWillReceiveProps (nextProps) {
    const options = parseOptions(nextProps.children)

    if (!areObjectArraysEqual(this.state.options, options)) {
      this.setState({
        options,
        filteredOptions: nextProps.filter(options, this.state.filterText)
      }, this.highlightSelectedOption)
    }

    // When the component is controlled and selectedOption changes, update the input
    const oldId = this.getOptionId(this.props.selectedOption)
    const newId = this.getOptionId(nextProps.selectedOption)
    if (newId !== null && newId !== oldId) {
      this._input.value = nextProps.selectedOption.label
    }
  }

  focus = () => {
    this._input && this._input.focus()
  }

  open = (filterText = '') => {
    this.setState((prevState, props) => ({
      filterText,
      filteredOptions: props.filter(prevState.options, filterText),
      expanded: true
    }), () => {
      this.highlightSelectedOption()
      this.props.onOpen()
    })
  }

  close = (event, toSelect) => this.setState((prevState, props) => {
    const inputValue = this.value.toLowerCase()
    const match = toSelect || prevState.filteredOptions.find(
      option => option.label.toLowerCase() === inputValue
    )
    const newState = {
      filterText: '',
      filteredOptions: prevState.options,
      expanded: false,
      selectedOption: match || this.selectedOption,
      highlightedIndex: 0
    }

    if (match) {
      if (
        !this.selectedOption ||
        this.getOptionId(match) !== this.getOptionId(this.selectedOption)
      ) {
        this._input.value = match.label
        props.onChange(event, match)
      }
    } else if (this.selectedOption) {
      // reset the value to the last valid value
      this._input.value = this.selectedOption.label
    } else {
      // clean wrong values
      this._input.value = ''
    }

    return newState
  }, this.props.onClose)

  highlightSelectedOption = () => {
    if (this.selectedOption !== null) {
      const index = this.state.filteredOptions.findIndex(
        option => this.getOptionId(option) === this.getOptionId(this.selectedOption)
      )
      // setTimeout forced due to the need to wait for the browser to render the content
      setTimeout(() => this.highlightOption(Math.max(index, 0)))
    } else {
      this.highlightOption(0)
    }
  }

  highlightOption = (index) => {
    if (!this.props.loading && this.state.filteredOptions[index]) {
      this.setState({
        highlightedIndex: index
      })

      // Scroll into view
      const content = findDOMNode(this._content)
      const item = content.querySelectorAll('li')[index]
      const parentTop = content.scrollTop
      const elemTop = item.offsetTop
      const parentBottom = parentTop + content.clientHeight
      const elemBottom = elemTop + item.clientHeight

      if (elemBottom > parentBottom) {
        content.scrollTop = elemBottom - content.clientHeight
      } else if (elemTop < parentTop) {
        content.scrollTop = elemTop
      }
    }
  }

  handleHomeKey = (event) => {
    event.preventDefault()
    if (this.state.filteredOptions.length > 0) {
      this.highlightOption(0)
    }
  }

  handleEndKey = (event) => {
    event.preventDefault()
    if (this.state.filteredOptions.length > 0) {
      this.highlightOption(this.state.filteredOptions.length - 1)
    }
  }

  handleEnterKey = (event) => {
    event.preventDefault()
    if (this.expanded && !this.props.loading && this.state.filteredOptions.length) {
      this.handleSelect(event, this.state.filteredOptions[this.state.highlightedIndex])
    }
  }

  handleSpaceKey = (event) => {
    // Imitate VoiceOver's select and respond to ctrl+option+space
    if (event.ctrlKey && event.altKey) {
      event.preventDefault()
      if (!this.expanded) {
        this.open()
      } else if (!this.props.loading && this.state.filteredOptions.length) {
        this.handleSelect(event, this.state.filteredOptions[this.state.highlightedIndex])
      }
    }
  }

  handleUpArrowKey = (event) => {
    event.preventDefault()
    if (this.expanded) {
      this.highlightOption(Math.max(0, this.state.highlightedIndex - 1))
    } else {
      this.open()
    }
  }

  handleDownArrowKey = (event) => {
    event.preventDefault()
    if (this.expanded) {
      this.highlightOption(Math.min(
        this.state.filteredOptions.length - 1,
        this.state.highlightedIndex + 1
      ))
    } else {
      this.open()
    }
  }

  keyMap = {
    ArrowUp: this.handleUpArrowKey,
    ArrowDown: this.handleDownArrowKey,
    Home: this.handleHomeKey,
    End: this.handleEndKey,
    Escape: this.close,
    Enter: this.handleEnterKey,
    [String.fromCharCode(32)]: this.handleSpaceKey,
    // On Mac, Char 160 is what is written when doing Ctrl + Option + Space
    [String.fromCharCode(160)]: this.handleSpaceKey
  }

  handleKeyDown = (event) => {
    this.props.onKeyDown(event)

    if (this.keyMap.hasOwnProperty(event.key)) {
      this.keyMap[event.key](event)
    }
  }

  handleChange = (event) => {
    this.props.onInputChange(event)
    const filterText = this.value.toLowerCase()
    if (this.state.filterText !== filterText) {
      this.open(filterText)
    }
  }

  handleBlur = (event) => {
    this.props.onBlur(event)

    if (this.expanded) {
      setTimeout(() => {
        // timeout so we can check where focus went to
        if (!findDOMNode(this._content).contains(document.activeElement)) {
          this.close(event)
        }
      })
    }
  }

  handleInputClick = (event) => {
    this.props.onClick(event)

    if (!this.expanded) {
      event.preventDefault()
      this.open()
    }
  }

  handleSelect = (event, selectedOption) => {
    this._input.value = selectedOption.label
    this.close(event, selectedOption)
    this.focus()
  }

  handlePositionReady = () => {
    this.setState({ positioned: true })
    this.props.onReady()
  }

  handleInputRef = (node, ...args) => {
    this._input = node
    this.props.inputRef.apply(this, [node].concat(args))
  }

  handleContentRef = (node) => {
    this._content = node
    if (node) {
      // store the height of the options
      this.optionHeight = node.querySelector('li').clientHeight
    }
  }

  renderStaticOption (message) {
    return (
      <li // eslint-disable-line
        tabIndex="-1"
        className={classnames(styles.option, {
          [styles[this.props.size]]: this.props.size
        })}
        onClick={this.focus}
      >
        {message}
      </li>
    )
  }

  renderOptions () {
    if (this.props.loading) {
      return this.renderStaticOption(this.props.loadingOption)
    }

    const { filteredOptions } = this.state
    if (filteredOptions.length === 0) {
      return this.renderStaticOption(this.props.emptyOption)
    }

    return filteredOptions.map((option, index) => {
      const { children } = option
      const id = this.getOptionId(option)
      const selected = this.selectedOption && id === this.getOptionId(this.selectedOption)
      const handlers = {
        onMouseEnter: () => this.highlightOption(index),
        onClick: (event) => this.handleSelect(event, option)
      }

      return (
        <li
          {...handlers}
          tabIndex="-1"
          id={this.getLiId(index)}
          key={id}
          className={classnames(styles.option, {
            [styles.selected]: selected,
            [styles[this.props.size]]: this.props.size,
            [styles.highlighted]: index === this.state.highlightedIndex
          })}
          role="option"
          aria-checked={selected ? 'true' : 'false'}
        >
          <span className={styles.label}>
            {children}
          </span>
        </li>
      )
    })
  }

  render () {
    const props = omitProps(this.props, Autocomplete.propTypes)

    if (this.expanded) {
      props['aria-activedescendant'] = this.getLiId(this.state.highlightedIndex)
    }

    const inputWidth = this._input ? `${this._input.getBoundingClientRect().width}px` : 'auto'

    // TODO when possible, remove PositionTarget and use the target prop instead

    return (
      <span>
        <TextInput
          {...props}
          id={this.id}
          inputRef={this.handleInputRef}
          onKeyDown={this.handleKeyDown}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          onClick={this.handleInputClick}
          size={this.props.size}
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={this.expanded}
          aria-owns={this._optionsId}
          aria-controls={this._optionsId}
          icon={IconArrowDown}
        />
        <Position
          trackPosition={this.expanded}
          placement={this.expanded ? this.placement : 'offscreen'}
          onReady={this.handlePositionReady}
          target={this._input}
        >
          <PositionContent>
            <ContextBox withArrow={false}>
              <ul
                className={styles.optionsList}
                id={this._optionsId}
                ref={this.handleContentRef}
                role="listbox"
                style={{
                  width: inputWidth,
                  maxHeight: `${this.props.visibleOptionsCount * this.optionHeight}px`
                }}
              >
                {this.renderOptions()}
              </ul>
            </ContextBox>
          </PositionContent>
        </Position>
      </span>
    )
  }
}

export default Autocomplete
