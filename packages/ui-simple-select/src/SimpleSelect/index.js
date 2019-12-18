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

import React, { Component, Children } from 'react'
import PropTypes from 'prop-types'

import {
  Children as ChildrenPropTypes,
  controllable
} from '@instructure/ui-prop-types'
import { FormPropTypes } from '@instructure/ui-form-field'
import { PositionPropTypes } from '@instructure/ui-position'
import { testable } from '@instructure/ui-testable'
import {
  matchComponentTypes,
  passthroughProps,
  callRenderProp,
  getInteraction,
  experimental
} from '@instructure/ui-react-utils'
import { uid } from '@instructure/uid'
import { Select } from '@instructure/ui-select'

import { Option } from './Option'
import { Group } from './Group'

/**
---
category: components
tags: form, field, dropdown
experimental: true
---
**/
@experimental()
@testable()
class SimpleSelect extends Component {
  static Option = Option
  static Group = Group
  static propTypes = {
    /**
    * The form field label.
    */
    renderLabel: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
    /**
    * The value corresponding to the value of the selected option. If defined,
    * the component will act controlled and will not manage its own state.
    */
    value: controllable(PropTypes.string, 'onChange'),
    /**
    * The value of the option to select by default, when uncontrolled.
    */
    defaultValue: PropTypes.string,
    /**
    * The id of the text input. One is generated if not supplied.
    */
    id: PropTypes.string,
    /**
    * The size of the text input.
    */
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    /**
    * Additional helpful text to provide to screen readers about the operation
    * of the component. Provided via aria-describedby.
    */
    assistiveText: PropTypes.string,
    /**
    * Html placeholder text to display when the input has no value. This should
    * be hint text, not a label replacement.
    */
    placeholder: PropTypes.string,
    /**
    * Specifies if interaction with the input is enabled, disabled, or readonly.
    * When "disabled", the input changes visibly to indicate that it cannot
    * receive user interactions. When "readonly" the input still cannot receive
    * user interactions but it keeps the same styles as if it were enabled.
    */
    interaction: PropTypes.oneOf(['enabled', 'disabled', 'readonly']),
    /**
    * Whether or not the text input is required.
    */
    isRequired: PropTypes.bool,
    /**
    * Whether the input is rendered inline with other elements or if it
    * is rendered as a block level element.
    */
    isInline: PropTypes.bool,
    /**
    * The width of the text input.
    */
    width: PropTypes.string,
    /**
    * The max width the options list can be before option text wraps. If not
    * set, the list will only display as wide as the text input.
    */
    optionsMaxWidth: PropTypes.string,
    /**
    * The number of options that should be visible before having to scroll.
    */
    visibleOptionsCount: PropTypes.number,
    /**
    * Displays messages and validation for the input. It should be an object
    * with the following shape:
    * `{
    *   text: PropTypes.string,
    *   type: PropTypes.oneOf(['error', 'hint', 'success', 'screenreader-only'])
    * }`
    */
    messages: PropTypes.arrayOf(FormPropTypes.message),
    /**
    * The placement of the options list.
    */
    placement: PositionPropTypes.placement,
    /**
    * The parent in which to constrain the placement.
    */
    constrain: PositionPropTypes.constrain,
    /**
     * An element or a function returning an element to use mount the options
     * list to in the DOM (defaults to `document.body`)
     */
    mountNode: PositionPropTypes.mountNode,
    /**
    * Callback fired when a new option is selected.
    * @param {Object} event - the event object
    * @param {Object} data - additional data
    * @param data.value - the value of selected option
    * @param data.id - the id of the selected option
    */
    onChange: PropTypes.func,
    /**
    * Callback fired when text input receives focus.
    */
    onFocus: PropTypes.func,
    /**
    * Callback fired when text input loses focus.
    */
    onBlur: PropTypes.func,
    /**
    * Callback fired when the options list is shown.
    */
    onShowOptions: PropTypes.func,
    /**
    * Callback fired when the options list is hidden.
    */
    onHideOptions: PropTypes.func,
    /**
    * A ref to the html `input` element.
    */
    inputRef: PropTypes.func,
    /**
    * A ref to the html `ul` element.
    */
    listRef: PropTypes.func,
    /**
    * Content to display in the list when no options are available.
    */
    renderEmptyOption: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    /**
    * Content to display before the text input. This will commonly be an icon.
    */
    renderBeforeInput: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    /**
    * Content to display after the text input. This content will replace the
    * default arrow icons.
    */
    renderAfterInput: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    /**
    * Children of type `<SimpleSelect.Option />` or `<SimpleSelect.Group />`.
    */
    children: ChildrenPropTypes.oneOf([Group, Option])
  }

  static defaultProps = {
    value: undefined,
    defaultValue: undefined,
    id: undefined,
    size: 'medium',
    assistiveText: undefined,
    placeholder: null,
    interaction: undefined,
    isRequired: false,
    isInline: false,
    width: undefined,
    optionsMaxWidth: undefined,
    visibleOptionsCount: 8,
    messages: undefined,
    placement: 'bottom stretch',
    mountNode: undefined,
    constrain: 'window',
    onChange: (event, data) => {},
    onFocus: (event) => {},
    onBlur: (event) => {},
    onShowOptions: (event) => {},
    onHideOptions: (event) => {},
    inputRef: (node) => {},
    listRef: (node) => {},
    renderEmptyOption: '---',
    renderBeforeInput: null,
    renderAfterInput: null,
    children: null
  }

  constructor (props) {
    super(props)

    const option = this.getInitialOption(props)

    this.state = {
      inputValue: option ? option.props.children : '',
      isShowingOptions: false,
      highlightedOptionId: null,
      selectedOptionId: option ? option.props.id : null
    }
  }

  _emptyOptionId = uid('Select-EmptyOption')

  focus () {
    this._select && this._select.focus()
  }

  get focused () {
    return this._select && this._select.focused
  }

  get id () {
    return this._select && this._select.id
  }

  get isControlled () {
    return typeof this.props.value !== 'undefined'
  }

  get interaction () {
    return getInteraction({ props: this.props })
  }

  componentDidUpdate (prevProps) {
    if (this.props.value !== prevProps.value) {
      let option = this.getOption('value', this.props.value)
      if (typeof this.props.value === 'undefined') {
        // preserve current value when changing from controlled to uncontrolled
        option = this.getOption('value', prevProps.value)
      }
      this.setState({
        inputValue: option ? option.props.children : '',
        selectedOptionId: option ? option.props.id : ''
      })
    }
  }

  getInitialOption (props) {
    const { value, defaultValue } = props
    const initialValue = value || defaultValue

    if (typeof initialValue === 'string') {
      // get option based on value or defaultValue, if provided
      return this.getOption('value', initialValue)
    }
    // otherwise get the first option
    return this.getOptionByIndex(0)
  }

  getOptionLabelById (id) {
    const option = this.getOption('id', id)
    return option ? option.props.children : ''
  }

  getOptionByIndex (index) {
    const children = Children.toArray(this.props.children)
    let match = null

    for (let i = 0; i < children.length; i++) {
      const child = children[i]
      if (matchComponentTypes(child, [Option])) {
        match = child
      } else if (matchComponentTypes(child, [Group])) {
        // first child is a group, not an option, find first child in group
        match = Children.toArray(child.props.children)[0]
      }
      if (match) {
        break
      }
    }
    return match
  }

  getOption (field, value) {
    const children = Children.toArray(this.props.children)
    let match = null

    for (let i = 0; i < children.length; ++i) {
      const child = children[i]
      if (matchComponentTypes(child, [Option])) {
        if (child.props[field] === value) {
          match = child
        }
      } else if (matchComponentTypes(child, [Group])) {
        const groupChildren = Children.toArray(child.props.children)
        for (let j = 0; j < groupChildren.length; ++j) {
          const groupChild = groupChildren[j]
          if (groupChild.props[field] === value) {
            match = groupChild
            break
          }
        }
      }
      if (match) break
    }
    return match
  }

  handleRef = (node) => {
    this._select = node
  }

  handleBlur = () => {
    this.setState({ highlightedOptionId: null })
    this.props.onBlur(event)
  }

  handleShowOptions = () => {
    this.setState({ isShowingOptions: true })
    this.props.onShowOptions(event)
  }

  handleHideOptions = () => {
    this.setState((state) => {
      const option = this.getOption('id', state.selectedOptionId)
      return {
        isShowingOptions: false,
        highlightedOptionId: null,
        inputValue: option ? option.props.children : ''
      }
    })
    this.props.onHideOptions(event)
  }

  handleHighlightOption = (event, { id }) => {
    if (id === this._emptyOptionId) return

    const option = this.getOption('id', id)
    const label = option.props.children
    const inputValue = event.type === 'keydown' ? label : this.state.inputValue

    this.setState({
      highlightedOptionId: id,
      inputValue
    })
  }

  handleSelectOption = (event, { id }) => {
    if (id === this._emptyOptionId) {
      // selected option is the empty option
      this.setState({ isShowingOptions: false })
      return
    }

    const option = this.getOption('id', id)
    const value = option && option.props.value

    if (this.isControlled) {
      this.setState({ isShowingOptions: false })
    } else {
      this.setState((state) => ({
        isShowingOptions: false,
        selectedOptionId: id,
        inputValue: option ? option.props.children : state.inputValue
      }))
    }
    // fire onChange if selected option changed
    option && this.props.onChange(event, { value, id })
    // hide options list whenever selection is made
    this.props.onHideOptions(event)
  }

  renderChildren () {
    let children = Children.toArray(this.props.children)
    children = Children.map(children, (child) => {
      if (matchComponentTypes(child, [Option])) {
        return this.renderOption(child)
      } else if (matchComponentTypes(child, [Group])) {
        return this.renderGroup(child)
      }
      return null
    }).filter(child => !!child)

    if (children.length === 0) {
      // no valid children, render empty option
      return this.renderEmptyOption()
    }

    return children
  }

  renderEmptyOption () {
    return (
      <Select.Option
        id={this._emptyOptionId}
        isHighlighted={false}
        isSelected={false}
      >
        {callRenderProp(this.props.renderEmptyOption)}
      </Select.Option>
    )
  }

  renderOption (option) {
    const {
      id,
      value,
      children,
      renderBeforeLabel,
      renderAfterLabel,
      ...rest
    } = option.props
    return (
      <Select.Option
        id={id}
        value={value}
        key={option.key || id}
        isHighlighted={id === this.state.highlightedOptionId}
        isSelected={id === this.state.selectedOptionId}
        isDisabled={option.props.isDisabled}
        renderBeforeLabel={renderBeforeLabel}
        renderAfterLabel={renderAfterLabel}
        {...passthroughProps(rest)}
      >
        { children }
      </Select.Option>
    )
  }

  renderGroup (group) {
    const {id, renderLabel, children, ...rest} = group.props
    return (
      <Select.Group
        renderLabel={renderLabel}
        key={group.key || id}
        {...passthroughProps(rest)}
      >
        {Children.map(children, (child) => this.renderOption(child))}
      </Select.Group>
    )
  }

  render () {
    const {
      renderLabel,
      value,
      defaultValue,
      id,
      size,
      assistiveText,
      placeholder,
      interaction,
      isRequired,
      isInline,
      width,
      optionsMaxWidth,
      visibleOptionsCount,
      messages,
      placement,
      constrain,
      mountNode,
      inputRef,
      listRef,
      renderEmptyOption,
      renderBeforeInput,
      renderAfterInput,
      onFocus,
      onBlur,
      onShowOptions,
      onHideOptions,
      children,
      ...rest
    } = this.props

    return (
      <Select
        renderLabel={renderLabel}
        inputValue={this.state.inputValue}
        isShowingOptions={this.state.isShowingOptions}
        id={id}
        size={size}
        assistiveText={assistiveText}
        placeholder={placeholder}
        interaction={this.interaction}
        isRequired={isRequired}
        isInline={isInline}
        width={width}
        optionsMaxWidth={optionsMaxWidth}
        visibleOptionsCount={visibleOptionsCount}
        messages={messages}
        placement={placement}
        constrain={constrain}
        mountNode={mountNode}
        ref={this.handleRef}
        inputRef={inputRef}
        listRef={listRef}
        renderBeforeInput={renderBeforeInput}
        renderAfterInput={renderAfterInput}
        onFocus={onFocus}
        onBlur={this.handleBlur}
        onRequestShowOptions={this.handleShowOptions}
        onRequestHideOptions={this.handleHideOptions}
        onRequestHighlightOption={this.handleHighlightOption}
        onRequestSelectOption={this.handleSelectOption}
        {...passthroughProps(rest)}
      >
        {this.renderChildren(children)}
      </Select>
    )
  }
}

export { SimpleSelect }
export default SimpleSelect
