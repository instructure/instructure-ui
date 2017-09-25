import React, { Component } from 'react'

import PropTypes from 'prop-types'
import classnames from 'classnames'
import shortid from 'shortid'

import themeable from '@instructure/ui-themeable'
import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'
import { omitProps, pickProps } from '@instructure/ui-utils/lib/react/passthroughProps'
import containsActiveElement from '@instructure/ui-utils/lib/dom/containsActiveElement'
import findDOMNode from '@instructure/ui-utils/lib/dom/findDOMNode'

import AutocompleteOptionsList from '../AutocompleteOptionsList'
import Position, { PositionContent } from '../../Position'
import FormField from '../../FormField'

import { getOptionId } from '../util'
import IconArrowDown from './IconArrowDown'

import styles from './styles.css'
import theme from './theme'

@themeable(theme, styles)
class AutocompleteField extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    /**
    * the selected value (must be accompanied by an `onSelect` prop)
    */
    selectedOption: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        children: PropTypes.node
      })
    ]),
    options: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        children: PropTypes.node
      })
    ),
    /**
     * The placement of the menu in relation to the input, passed down to Position
     */
    placement: CustomPropTypes.placement,
    label: PropTypes.node.isRequired,
    messages: PropTypes.arrayOf(CustomPropTypes.message),
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    layout: PropTypes.oneOf(['stacked', 'inline']),
    /**
     * Options dropdown can be wider than input if optionsMaxWidth is provided
     */
    optionsMaxWidth: PropTypes.string,
    /**
     * Give the Spinner a title to be read by screenreaders. Disables menu
     * interaction and renders a Spinner in its place.
     */
    loadingText: PropTypes.string,
    /**
    * Determines whether the user can type in the input
    */
    editable: PropTypes.bool,
    /**
     * The menu content to render when no options are present or are filtered away
     */
    emptyOption: PropTypes.node,
    /**
     * The amount of options that are visible without scrolling
     */
    visibleOptionsCount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    /**
     * Callback fired when the options have been positioned
     */
    onPositioned: PropTypes.func,
    /**
     * Callback fired on the option selection
     */
    onSelect: PropTypes.func,
    /**
     * Callback fired when the empty option is selected by click
     */
    onStaticClick: PropTypes.func,
    /**
     * Callback fired when an option gets highlighted
     */
    onHighlight: PropTypes.func,
    /**
     * Width of the whole container
     */
    width: PropTypes.string,
    /**
     * Children to be rendered inside the input container before the actual input
     */
    children: PropTypes.node,
    /**
     * Callback fired when the input gains focus
     */
    onFocus: PropTypes.func,
    /**
     * Callback fired when the input container lost focus
     */
    onBlur: PropTypes.func,
    /**
     * Callback fired on keyDown for the input
     */
    onKeyDown: PropTypes.func,
    /**
     * Callback fired on keyUp for the input
     */
    onKeyUp: PropTypes.func,
    /**
     * Callback fired on click for the input
     */
    onClick: PropTypes.func,
    /**
     * Callback fired on change for the input
     */
    onInputChange: PropTypes.func,
    /**
     * Callback fired when the menu is opened
     */
    onOpen: PropTypes.func,
    /**
     * Callback fired when the menu is closed
     */
    onClose: PropTypes.func,
    /**
     * Optional id for the FormField
     */
    id: PropTypes.string,
    /**
    * a function that provides a reference to the internal input element
    */
    inputRef: PropTypes.func,
    /**
    * should the menu be closed when a selection happens
    */
    closeOnSelect: PropTypes.bool,
    disabled: PropTypes.bool,
    required: PropTypes.bool
  }
  /* eslint-enable react/require-default-props */

  static defaultProps = {
    emptyOption: '---',
    selectedOption: null,
    size: 'medium',
    loadingText: null,
    options: [],
    visibleOptionsCount: 8,
    closeOnSelect: true,
    onPositioned: () => {},
    onSelect: (event, selectedOption) => {},
    onStaticClick: event => {},
    onHighlight: event => {},
    onClick: event => {},
    onInputChange: event => {},
    onFocus: event => {},
    onBlur: event => {},
    onKeyDown: event => {},
    onKeyUp: event => {},
    onOpen: event => {},
    onClose: event => {}
  }

  constructor () {
    super(...arguments)

    this._defaultId = `Autocomplete__${shortid.generate()}`
    this._optionsId = `Autocomplete_Options_${shortid.generate()}`
  }

  _menu = null
  _inputContainer = null
  _timeouts = []
  timeoutId = null

  state = {
    focus: false,
    highlightedIndex: 0,
    expanded: false,
    positioned: false
  }

  get id () {
    return this.props.id || this._defaultId
  }

  get expanded () {
    return this.state.positioned && this.state.expanded
  }

  get placement () {
    if (this.expanded) {
      return this.props.placement || 'bottom stretch'
    } else {
      return 'offscreen'
    }
  }

  get invalid () {
    return (
      this.props.messages
      && this.props.messages.findIndex(message => message.type === 'error') >= 0
    )
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.options !== nextProps.options) {
      this.highlightSelectedOption()
    }
  }

  componentWillUnmount () {
    this._timeouts.forEach(timeout => clearTimeout(timeout))
  }

  open = () => {
    this.setState(
      () => ({ expanded: true }),
      () => {
        this.highlightSelectedOption()
        this.props.onOpen()
      }
    )
  }

  close = (event, selectedOption) => {
    this.setState(() => ({
      expanded: false,
      highlightedIndex: 0
    }))
    this.props.onClose(event, selectedOption)
  }

  select = (event, selectedOption) => {
    this.props.onSelect(event, selectedOption)
    if (this.props.closeOnSelect) {
      event.preventDefault()
      this.close(event, selectedOption)
    }
  }

  highlightSelectedOption = () => {
    if (this.props.selectedOption !== null) {
      // setTimeout forced due to the need to wait for the browser to render the menu
      this._timeouts.push(
        setTimeout(() => {
          const index = this.props.options.findIndex(
            option => getOptionId(option) === getOptionId(this.props.selectedOption)
          )
          this.highlightOption(Math.max(index, 0))
        }, 0)
      )
    } else {
      this.highlightOption(0)
    }
  }

  highlightOption = index => {
    if (!this.props.loadingText && this.props.options[index]) {
      this.setState({
        highlightedIndex: index
      })
      this.props.onHighlight(index)

      // Update scrolling
      const menu = findDOMNode(this._menu)
      if (menu) {
        const item = menu.querySelectorAll('li')[index]
        const parentTop = menu.scrollTop
        const elemTop = item.offsetTop
        const parentBottom = parentTop + menu.clientHeight
        const elemBottom = elemTop + item.clientHeight

        if (elemBottom > parentBottom) {
          menu.scrollTop = elemBottom - menu.clientHeight
        } else if (elemTop < parentTop) {
          menu.scrollTop = elemTop
        }
      }
    }
  }

  handleHomeKey = event => {
    if (this.props.options.length > 0) {
      this.highlightOption(0)
    }
  }

  handleEndKey = event => {
    if (this.props.options.length > 0) {
      this.highlightOption(this.props.options.length - 1)
    }
  }

  handleEnterKey = event => {
    if (this.expanded && !this.props.loadingText && this.props.options.length) {
      this.select(event, this.props.options[this.state.highlightedIndex])
    }
  }

  handleUpArrowKey = event => {
    if (this.expanded) {
      this.highlightOption(Math.max(0, this.state.highlightedIndex - 1))
    } else {
      this.open()
    }
  }

  handleDownArrowKey = event => {
    if (this.expanded) {
      this.highlightOption(Math.min(this.props.options.length - 1, this.state.highlightedIndex + 1))
    } else {
      this.open()
    }
  }

  keyMap = {
    ArrowUp: this.handleUpArrowKey,
    ArrowDown: this.handleDownArrowKey,
    Home: this.handleHomeKey,
    End: this.handleEndKey,
    Enter: this.handleEnterKey
  }

  handlePositioned = () => {
    this.setState({ positioned: true }, () => this.props.onPositioned())
  }

  handleKeyDown = event => {
    // eslint-disable-next-line no-prototype-builtins
    if (this.keyMap.hasOwnProperty(event.key)) {
      if (event.key !== 'Enter' || this.expanded) {
        event.preventDefault()
      }
      this.keyMap[event.key](event)
    }
    this.props.onKeyDown(event)
  }

  handleKeyUp = event => {
    if (event.key === 'Escape' && this.expanded) {
      event.preventDefault()
      this.close(event)
    }
    this.props.onKeyUp(event)
  }

  handleFocus = event => {
    this.setState(() => ({ focus: true }))
    this.props.onFocus(event)
  }

  handleBlur = event => {
    event.persist()

    this.setState(
      () => ({ focus: false }),
      () => {
        if (this.expanded) {
          this._timeouts.push(
            setTimeout(() => {
              // timeout so we can check where focus went to
              if (!containsActiveElement(this._menu)) {
                this.close(event)
              }
            }, 0)
          )
        }
        this.props.onBlur(event)
      }
    )
  }

  handleClick = event => {
    if (!this.expanded) {
      event.preventDefault()
      this.open()
    }
    this.props.onClick(event)
  }

  handleChange = event => {
    if (!this.expanded) {
      this.open()
    }
    this.props.onInputChange(event, event.target.value)
  }

  handleMenuRef = node => {
    this._menu = node
  }

  handleInputContainerRef = node => {
    this._inputContainer = node
  }

  render () {
    const {
      size,
      disabled,
      editable,
      required,
      width,
      options,
      selectedOption,
      loadingText,
      emptyOption,
      visibleOptionsCount,
      children,
      onStaticClick
    } = this.props

    const inputProps = omitProps(this.props, AutocompleteField.propTypes, [
      'allowEmpty',
      ...Object.keys(FormField.propTypes)
    ])

    const highlightedOption = options[this.state.highlightedIndex]
    if (highlightedOption) {
      inputProps['aria-activedescendant'] = `${this._optionsId}_${highlightedOption.id}`
    } else {
      inputProps['aria-activedescendant'] = `${this._optionsId}_${0}`
    }

    return (
      <span>
        <FormField {...pickProps(this.props, FormField.propTypes)} id={this.id}>
          <span
            style={{
              width: width || 'auto'
            }}
            ref={this.handleInputContainerRef}
            className={classnames(styles.inputContainer, {
              [styles.invalid]: this.invalid,
              [styles.disabled]: disabled,
              [styles[size]]: size,
              [styles.focus]: this.state.focus
            })}
          >
            {children}
            <span className={styles.inputLayout}>
              <input
                {...inputProps}
                id={this.id}
                className={styles.input}
                onFocus={this.handleFocus}
                onChange={this.handleChange}
                onClick={this.handleClick}
                onKeyDown={this.handleKeyDown}
                onKeyUp={this.handleKeyUp}
                onBlur={this.handleBlur}
                type="text"
                autoComplete="off"
                ref={this.props.inputRef}
                role="combobox"
                aria-autocomplete="list"
                aria-expanded={this.expanded}
                aria-owns={this._optionsId}
                aria-controls={this._optionsId}
                required={required}
                aria-required={required}
                aria-invalid={this.invalid ? 'true' : null}
                readOnly={!editable}
                disabled={disabled}
                aria-disabled={disabled ? 'true' : null}
              />
              <IconArrowDown className={styles.icon} />
            </span>
          </span>
        </FormField>
        <Position
          trackPosition={this.expanded}
          placement={this.placement}
          onPositioned={this.handlePositioned}
          target={this._inputContainer}
          mountNode={this._inputContainer}
        >
          <PositionContent>
            <AutocompleteOptionsList
              options={options}
              selectedOption={selectedOption}
              optionsId={this._optionsId}
              menuRef={this.handleMenuRef}
              visibleOptionsCount={visibleOptionsCount}
              loadingText={loadingText}
              emptyOption={emptyOption}
              onStaticClick={onStaticClick}
              onHighlightOption={this.highlightOption}
              onSelect={this.select}
              highlightedIndex={this.state.highlightedIndex}
              maxWidth={this.props.optionsMaxWidth}
            />
          </PositionContent>
        </Position>
      </span>
    )
  }
}

export default AutocompleteField
