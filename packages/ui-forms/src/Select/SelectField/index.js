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

import { Dialog } from '@instructure/ui-dialog'
import { hasVisibleChildren } from '@instructure/ui-a11y-utils'
import { ScreenReaderContent } from '@instructure/ui-a11y-content'
import { FormField, FormFieldLayout, FormPropTypes } from '@instructure/ui-form-field'
import { LayoutPropTypes, Position } from '@instructure/ui-layout'
import { containsActiveElement, findDOMNode, isActiveElement } from '@instructure/ui-dom-utils'
import { createChainedFunction } from '@instructure/ui-utils'
import { uid } from '@instructure/uid'
import { themeable } from '@instructure/ui-themeable'
import { testable } from '@instructure/ui-testable'
import { omitProps, pickProps } from '@instructure/ui-react-utils'
import { IconArrowOpenDownLine } from '@instructure/ui-icons'

import { SelectOptionsList } from '../SelectOptionsList'
import getOptionId from '../utils/getOptionId'

import styles from './styles.css'
import theme from './theme'

/**
---
parent: DeprecatedSelect
---
**/
@testable()
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
     * Additional text to provide screenreader feedback upon user action
     */
    announcement: PropTypes.string,
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
    /**
     * The parent in which to constrain the menu.
     * One of: 'window', 'scroll-parent', 'parent', 'none', an element,
     * or a function returning an element
     */
    constrain: LayoutPropTypes.constrain,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    required: PropTypes.bool
  }

  static defaultProps = {
    emptyOption: '---',
    selectedOption: null,
    size: 'medium',
    loadingText: null,
    announcement: null,
    options: [],
    visibleOptionsCount: 8,
    closeOnSelect: true,
    editable: false,
    inline: false,
    constrain: 'window',
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
    onClose: event => {},
    disabled: false,
    readOnly: false,
    required: false,
    inputRef: undefined,
    id: undefined,
    children: null,
    width: undefined,
    assistiveText: undefined,
    optionsMaxWidth: undefined,
    layout: undefined,
    messages: undefined,
    placement: undefined
  }

  constructor (props) {
    super(props)

    this.state = {
      focus: false,
      highlightedIndex: this.getSelectedIndex(props),
      expanded: false,
      positioned: false
    }

    this._defaultId = uid('Select')
    this._optionsId = uid('Select-Options')
    this._assistId = uid('Select-assistiveText')
  }

  _menu = null
  _input = null
  _inputContainer = null
  _timeouts = []
  timeoutId = null

  get id () {
    return this.props.id || this._defaultId
  }

  get expanded () {
    return this.state.positioned && this.state.expanded
  }

  get placement () {
    if (this.state.expanded) {
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

  get selectedIndex () {
    return this.getSelectedIndex(this.props)
  }

  getSelectedIndex (props) {
    if (props.selectedOption) {
      const index = props.options.findIndex(
        option => getOptionId(option) === getOptionId(props.selectedOption)
      )
      return Math.max(index, 0)
    } else {
      return -1
    }
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
    this.setState(state => {
      if (state.expanded) {
        this.props.onClose(event, selectedOption)
      }
      return { expanded: false }
    })
  }

  select = (event, selectedOption) => {
    this.props.onSelect(event, selectedOption)
    if (this.props.closeOnSelect) {
      event.preventDefault()
      this.close(event, selectedOption)
    }
  }

  highlightSelectedOption = () => {
    let index = 0
    if (this.selectedIndex > 0) {
      index = this.selectedIndex
    }
    // setTimeout forced due to the need to wait for the browser to render the menu
    this._timeouts.push(
      setTimeout(() => {
        this.highlightOption(index)
      }, 0)
    )
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
    // eslint-disable-next-line no-prototype-builtins
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
    if (key === 'tab') {
      // return focus to input and back into natural tab order
      this._input.focus()
    }
    this.props.onKeyDown(event)
  }

  handleKeyUp = event => {
    const key = keycode.names[event.keyCode]
    if (key === 'esc' && this.expanded) {
      event.preventDefault()
      // ensure focus returns to input
      if (this._input) {
        this._input.focus()
      }
      this.close(event)
    }
    this.props.onKeyUp(event)
  }

  handleMouseDown = event => {
    event.preventDefault()
  }

  handleFocus = event => {
    this.setState(() => ({ focus: true }))
    this.props.onFocus(event)
  }

  handleBlur = event => {
    event.persist()
    // is focus on an input or a tag
    let stillFocused = this._inputContainer.contains(event.relatedTarget)
    if (!stillFocused && this.expanded) {
      // is focus on an option
      stillFocused = this._menu.contains(event.relatedTarget)
    }

    this.setState(
      () => ({ focus: stillFocused }),
      () => {
        if (this.expanded && !stillFocused) {
          this._timeouts.push(
            setTimeout(() => {
              // timeout so we can check where focus went to
              if (!containsActiveElement(this._menu)) {
                // is focus still not on an option
                this.close(event)
              }
            }, 0)
          )
        }
        if (!stillFocused) {
          this.props.onBlur(event)
        }
      }
    )
  }

  handleClick = event => {
    event.preventDefault()

    if (this.props.disabled || this.props.readOnly) {
      return
    }

    if (!this.expanded) {
      if (this._input && !isActiveElement(this._input)) {
        this._input.focus()
      }
      this.open()
    } else {
      this.close()
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
      assistiveText,
      layout,
      announcement,
      constrain
    } = this.props

    const inputProps = omitProps(this.props, SelectField.propTypes, [
      'allowEmpty',
      'assistiveText',
      'value',
      ...Object.keys(FormField.propTypes)
    ])

    const highlightedOption = options[this.state.highlightedIndex]
    if (highlightedOption && this.expanded) {
      inputProps['aria-activedescendant'] = `${this._optionsId}_${highlightedOption.id}`
    } else {
      inputProps['aria-activedescendant'] = null
    }


    let wrappedLabel = (
      <label
        htmlFor={this.id}
        className={styles.label}
      >
        {this.props.label}
      </label>
    )

    if (!hasVisibleChildren(this.props.label)) {
      wrappedLabel = <ScreenReaderContent>{wrappedLabel}</ScreenReaderContent>
    }

    return (
      <FormFieldLayout
        {...pickProps(this.props, FormFieldLayout.propTypes)}
        as="span"
        label={wrappedLabel}
        id={this.id}
        vAlign={(layout === 'inline') ? 'middle' : null}
        onMouseDown={this.handleMouseDown}
      >
        <span
          style={{
            width: width || 'auto'
          }}
          className={classnames(styles.inputWidth, {
            [styles.invalid]: this.invalid,
            [styles.focus]: this.state.focus
          })}
        >
          <span
            ref={this.handleInputContainerRef}
            className={classnames(styles.inputContainer, {
              [styles.invalid]: this.invalid,
              [styles.disabled]: disabled,
              [styles[size]]: size,
              [styles.focus]: this.state.focus
            })}
          >
            {children}
            {/* The click handler needs to be attached to the input layout because
                the actual input does not always fill the entire layout */}
            {/* eslint-disable jsx-a11y/click-events-have-key-events */}
            {/* eslint-disable jsx-a11y/no-static-element-interactions */}
            <span className={styles.inputLayout} onClick={this.handleClick}>
            {/* eslint-enable jsx-a11y/click-events-have-key-events */}
            {/* eslint-enable jsx-a11y/no-static-element-interactions */}
              {selectedOption && this.renderIcon()}
              <input
                {...inputProps}
                id={this.id}
                className={classnames(styles.input, {
                  [styles.editable]: editable
                })}
                onFocus={this.handleFocus}
                onChange={editable ? this.handleChange : null}
                onKeyDown={this.handleKeyDown}
                onKeyUp={this.handleKeyUp}
                onBlur={this.handleBlur}
                type="text"
                ref={createChainedFunction(this.props.inputRef, this.handleInputRef)}
                role="combobox"
                aria-expanded={this.expanded}
                aria-owns={this.expanded ? this._optionsId : null}
                aria-describedby={this._assistId}
                aria-controls={this.expanded ? this._optionsId : null}
                aria-autocomplete={editable ? 'list' : null}
                aria-haspopup="true"
                autoComplete={editable ? 'off' : null}
                required={required}
                aria-required={required}
                aria-invalid={this.invalid ? 'true' : null}
                readOnly={!editable}
                disabled={disabled || readOnly}
              />
              <IconArrowOpenDownLine width="0.875rem" height="0.875rem" className={styles.icon} />
            </span>
          </span>
        </span>
        <Dialog open={this.state.expanded}>
          <Position
            trackPosition={this.expanded}
            placement={this.placement}
            onPositioned={this.handlePositioned}
            target={this._inputContainer}
            constrain={constrain}
          >
            <Position.Content>
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
            </Position.Content>
          </Position>
        </Dialog>
        <span
          id={this._assistId}
          style={{
            display: 'none'
          }}
        >
          {assistiveText}
        </span>
        <ScreenReaderContent>
          <span
            role="log"
            aria-live="polite"
            aria-atomic="true"
          >
            {announcement}
          </span>
        </ScreenReaderContent>
      </FormFieldLayout>
    )
  }
}

export default SelectField
export { SelectField }
