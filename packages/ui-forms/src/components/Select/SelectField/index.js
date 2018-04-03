/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 - present Instructure, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import React, { Component } from 'react'

import PropTypes from 'prop-types'
import classnames from 'classnames'
import keycode from 'keycode'

import themeable from '@instructure/ui-themeable'
import LayoutPropTypes from '@instructure/ui-layout/lib/utils/LayoutPropTypes'
import { omitProps, pickProps } from '@instructure/ui-utils/lib/react/passthroughProps'
import createChainedFunction from '@instructure/ui-utils/lib/createChainedFunction'
import containsActiveElement from '@instructure/ui-utils/lib/dom/containsActiveElement'
import findDOMNode from '@instructure/ui-utils/lib/dom/findDOMNode'
import generateElementId from '@instructure/ui-utils/lib/dom/generateElementId'

import Position, { PositionContent } from '@instructure/ui-layout/lib/components/Position'
import FormField from '../../FormField'

import SelectOptionsList from '../SelectOptionsList'
import getOptionId from '../utils/getOptionId'
import FormPropTypes from '../../../utils/FormPropTypes'
import IconArrowDown from './IconArrowDown'


import styles from './styles.css'
import theme from './theme'

/**
---
parent: Select
---
**/
@themeable(theme, styles)
class SelectField extends Component {
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
        children: PropTypes.node,
        disabled: PropTypes.bool,
        icon: PropTypes.func,
        groupLabel: PropTypes.bool
      })
    ]),
    options: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        children: PropTypes.node,
        disabled: PropTypes.bool,
        icon: PropTypes.func,
        groupLabel: PropTypes.bool
      })
    ),
    /**
     * The placement of the menu in relation to the input, passed down to Position
     */
    placement: LayoutPropTypes.placement,
    label: PropTypes.node.isRequired,
    messages: PropTypes.arrayOf(FormPropTypes.message),
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
     * Custom text to be read by the screenreader when Select is focused
     */
    assistiveText: PropTypes.string,
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
     * Determines whether or not to display the FormField inline
     */
    inline: PropTypes.bool,
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
    readOnly: PropTypes.bool,
    required: PropTypes.bool
  }

  static defaultProps = {
    emptyOption: '---',
    selectedOption: null,
    size: 'medium',
    loadingText: null,
    options: [],
    visibleOptionsCount: 8,
    closeOnSelect: true,
    editable: false,
    inline: false,
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

    this._defaultId = generateElementId('Select')
    this._optionsId = generateElementId('Select-Options')
    this._assistId = generateElementId('Select-assistiveText')
  }

  _menu = null
  _input = null
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
    const option = this.props.options[index]
    if (!this.props.loadingText && option) {
      if (option.disabled || option.groupLabel) {
        // target index is disabled, try next option instead
        if (index > this.state.highlightedIndex && index + 1 < this.props.options.length) {
          this.highlightOption(index + 1)
        } else if (index < this.state.highlightedIndex && index - 1 >= 0) {
          this.highlightOption(index - 1)
        }
        return
      }

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
      const index = Math.max(0, this.state.highlightedIndex - 1)
      const option = this.props.options[index]
      const el = this._menu.querySelectorAll('li')[index]

      this.highlightOption(index)
      // set dom focus so VO will read highlighted option correctly
      if (el &&
        option &&
        !option.disabled &&
        !option.groupLabel) {
        el.focus()
      }
    } else {
      this.open()
    }
  }

  handleDownArrowKey = event => {
    if (this.expanded) {
      const index = Math.min(this.props.options.length - 1, this.state.highlightedIndex + 1)
      const option = this.props.options[index]
      const el = this._menu.querySelectorAll('li')[index]

      this.highlightOption(index)
      // set dom focus so VO will read highlighted option correctly
      if (el &&
        option &&
        !option.disabled &&
        !option.groupLabel) {
        el.focus()
      }
    } else {
      this.open()
    }
  }

  handleSpaceKey = event => {
    if (!this.expanded) {
      event.preventDefault()
      this.open()
    }
  }

  keyMap = {
    up: this.handleUpArrowKey,
    down: this.handleDownArrowKey,
    home: this.handleHomeKey,
    end: this.handleEndKey,
    enter: this.handleEnterKey,
    space: this.handleSpaceKey
  }

  handlePositioned = () => {
    this.setState({ positioned: true }, () => this.props.onPositioned())
  }

  handleKeyDown = event => {
    const key = keycode.names[event.keyCode]
    if (this.keyMap.hasOwnProperty(key)) {
      if ((key !== 'enter' || this.expanded) && key !== 'space') {
        event.preventDefault()
      }
      this.keyMap[key](event)
    } else {
      // return dom focus to input when the user tries to type
      if (this._input && this.props.editable) {
        this._input.focus()
      }
    }
    this.props.onKeyDown(event)
  }

  handleKeyUp = event => {
    const key = keycode.names[event.keyCode]
    if (key === 'esc' && this.expanded) {
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

    const el = event.target.tagName === 'INPUT' ? this._menu : this._inputContainer

    this.setState(
      () => ({ focus: false }),
      () => {
        if (this.expanded) {
          this._timeouts.push(
            setTimeout(() => {
              // timeout so we can check where focus went to
              if (!containsActiveElement(el)) {
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
      // make sure safari focuses readonly input
      if (this._input && !this.props.editable) {
        this._input.focus()
      }
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

  handleInputRef = node => {
    this._input = node
  }

  handleInputContainerRef = node => {
    this._inputContainer = node
  }

  renderIcon () {
    if (typeof this.props.selectedOption.icon === 'function') {
      const Icon = this.props.selectedOption.icon
      return (
        <span className={styles.inputIcon}>
          <Icon />
        </span>
      )
    }
  }

  render () {
    const {
      size,
      disabled,
      readOnly,
      editable,
      required,
      width,
      options,
      selectedOption,
      loadingText,
      emptyOption,
      visibleOptionsCount,
      children,
      onStaticClick,
      assistiveText
    } = this.props

    const inputProps = omitProps(this.props, SelectField.propTypes, [
      'allowEmpty',
      'assistiveText',
      'value',
      ...Object.keys(FormField.propTypes)
    ])

    const highlightedOption = options[this.state.highlightedIndex]
    if (highlightedOption) {
      inputProps['aria-activedescendant'] = `${this._optionsId}_${highlightedOption.id}`
    } else {
      inputProps['aria-activedescendant'] = null
    }

    return (
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
            {selectedOption && this.renderIcon()}
            <input
              {...inputProps}
              id={this.id}
              className={classnames(styles.input, {
                [styles.editable]: editable
              })}
              onFocus={this.handleFocus}
              onClick={this.handleClick}
              onChange={editable ? this.handleChange : null}
              onKeyDown={this.handleKeyDown}
              onKeyUp={this.handleKeyUp}
              onBlur={this.handleBlur}
              type="text"
              ref={createChainedFunction(this.props.inputRef, this.handleInputRef)}
              role="combobox"
              aria-expanded={this.expanded}
              aria-owns={this._optionsId}
              aria-describedby={this._assistId}
              aria-controls={this._optionsId}
              aria-autocomplete={editable ? 'list' : null}
              aria-haspopup="true"
              autoComplete={editable ? 'off' : null}
              required={required}
              aria-required={required}
              aria-invalid={this.invalid ? 'true' : null}
              readOnly={!editable}
              disabled={disabled || readOnly}
              aria-disabled={disabled || readOnly ? 'true' : null}
            />
            <IconArrowDown className={styles.icon} />
          </span>
        </span>
        <Position
          trackPosition={this.expanded}
          placement={this.placement}
          onPositioned={this.handlePositioned}
          target={this._inputContainer}
          mountNode={this._inputContainer}
        >
          <PositionContent>
            <SelectOptionsList
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
              expanded={this.state.expanded}
              onKeyDown={this.handleKeyDown}
              onKeyUp={this.handleKeyUp}
              onBlur={this.handleBlur}
              highlightedIndex={this.state.highlightedIndex}
              maxWidth={this.props.optionsMaxWidth}
            />
          </PositionContent>
        </Position>
        <span
          id={this._assistId}
          style={{
            display: 'none'
          }}
        >
          {assistiveText}
        </span>
      </FormField>
    )
  }
}

export default SelectField
