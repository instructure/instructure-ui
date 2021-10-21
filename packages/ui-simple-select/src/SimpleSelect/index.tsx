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

import { testable } from '@instructure/ui-testable'
import {
  matchComponentTypes,
  passthroughProps,
  callRenderProp,
  getInteraction
} from '@instructure/ui-react-utils'
import { uid } from '@instructure/uid'
import { Select } from '@instructure/ui-select'

import { Option } from './Option'
import { Group } from './Group'
import type { SimpleSelectProps } from './props'
import { allowedProps, propTypes } from './props'

/**
---
category: components
tags: form, field, dropdown
---
**/
@testable()
class SimpleSelect extends Component<SimpleSelectProps> {
  static readonly componentId = 'SimpleSelect'

  static Option = Option
  static Group = Group

  static allowedProps = allowedProps
  static propTypes = propTypes

  static defaultProps = {
    size: 'medium',
    placeholder: null,
    isRequired: false,
    isInline: false,
    visibleOptionsCount: 8,
    placement: 'bottom stretch',
    constrain: 'window',
    // @ts-expect-error ts-migrate(6133) FIXME: 'event' is declared but its value is never read.
    onChange: (event, data) => {},
    // @ts-expect-error ts-migrate(6133) FIXME: 'event' is declared but its value is never read.
    onFocus: (event) => {},
    // @ts-expect-error ts-migrate(6133) FIXME: 'event' is declared but its value is never read.
    onBlur: (event) => {},
    // @ts-expect-error ts-migrate(6133) FIXME: 'event' is declared but its value is never read.
    onShowOptions: (event) => {},
    // @ts-expect-error ts-migrate(6133) FIXME: 'event' is declared but its value is never read.
    onHideOptions: (event) => {},
    // @ts-expect-error ts-migrate(6133) FIXME: 'node' is declared but its value is never read.
    inputRef: (node) => {},
    // @ts-expect-error ts-migrate(6133) FIXME: 'node' is declared but its value is never read.
    listRef: (node) => {},
    renderEmptyOption: '---',
    renderBeforeInput: null,
    renderAfterInput: null,
    children: null
  }

  ref: Element | null = null

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
  constructor(props) {
    super(props)

    const option = this.getInitialOption(props)

    this.state = {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type '{}'.
      inputValue: option ? option.props.children : '',
      isShowingOptions: false,
      highlightedOptionId: null,
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type '{}'.
      selectedOptionId: option ? option.props.id : null
    }
  }

  _emptyOptionId = uid('Select-EmptyOption')

  get _select() {
    console.warn(
      '_select property is deprecated and will be removed in v9, please use ref instead'
    )

    return this.ref
  }

  focus() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'ref' does not exist on type 'SimpleS... Remove this comment to see the full error message
    this.ref && this.ref.focus()
  }

  get focused() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'ref' does not exist on type 'SimpleS... Remove this comment to see the full error message
    return this.ref && this.ref.focused
  }

  get id() {
    return this.ref && this.ref.id
  }

  get isControlled() {
    return typeof this.props.value !== 'undefined'
  }

  get interaction() {
    return getInteraction({ props: this.props })
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'prevProps' implicitly has an 'any' type... Remove this comment to see the full error message
  componentDidUpdate(prevProps) {
    if (this.props.value !== prevProps.value) {
      let option = this.getOption('value', this.props.value)
      if (typeof this.props.value === 'undefined') {
        // preserve current value when changing from controlled to uncontrolled
        option = this.getOption('value', prevProps.value)
      }
      this.setState({
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type '{}'.
        inputValue: option ? option.props.children : '',
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type '{}'.
        selectedOptionId: option ? option.props.id : ''
      })
    }
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
  getInitialOption(props) {
    const { value, defaultValue } = props
    const initialValue = value || defaultValue

    if (typeof initialValue === 'string' || typeof initialValue === 'number') {
      // get option based on value or defaultValue, if provided
      return this.getOption('value', initialValue)
    }
    // otherwise get the first option
    return this.getOptionByIndex(0)
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'id' implicitly has an 'any' type.
  getOptionLabelById(id) {
    const option = this.getOption('id', id)
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type '{}'.
    return option ? option.props.children : ''
  }

  // @ts-expect-error ts-migrate(6133) FIXME: 'index' is declared but its value is never read.
  getOptionByIndex(index) {
    const children = Children.toArray(this.props.children)
    let match = null

    for (let i = 0; i < children.length; i++) {
      const child = children[i]
      if (matchComponentTypes(child, [Option])) {
        match = child
      } else if (matchComponentTypes(child, [Group])) {
        // first child is a group, not an option, find first child in group
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type 'string | ... Remove this comment to see the full error message
        match = Children.toArray(child.props.children)[0]
      }
      if (match) {
        break
      }
    }
    return match
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'field' implicitly has an 'any' type.
  getOption(field, value) {
    const children = Children.toArray(this.props.children)
    let match = null

    for (let i = 0; i < children.length; ++i) {
      const child = children[i]
      if (matchComponentTypes(child, [Option])) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type 'string | ... Remove this comment to see the full error message
        if (child.props[field] === value) {
          match = child
        }
      } else if (matchComponentTypes(child, [Group])) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type 'string | ... Remove this comment to see the full error message
        const groupChildren = Children.toArray(child.props.children)
        for (let j = 0; j < groupChildren.length; ++j) {
          const groupChild = groupChildren[j]
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type 'string | ... Remove this comment to see the full error message
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

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'node' implicitly has an 'any' type.
  handleRef = (node) => {
    this.ref = node
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
  handleBlur = (event) => {
    this.setState({ highlightedOptionId: null })
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.onBlur(event)
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
  handleShowOptions = (event) => {
    this.setState({ isShowingOptions: true })
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.onShowOptions(event)
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
  handleHideOptions = (event) => {
    this.setState((state) => {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'selectedOptionId' does not exist on type... Remove this comment to see the full error message
      const option = this.getOption('id', state.selectedOptionId)
      return {
        isShowingOptions: false,
        highlightedOptionId: null,
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type '{}'.
        inputValue: option ? option.props.children : ''
      }
    })
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.onHideOptions(event)
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
  handleHighlightOption = (event, { id }) => {
    if (id === this._emptyOptionId) return

    const option = this.getOption('id', id)
    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    const label = option.props.children
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'inputValue' does not exist on type 'Read... Remove this comment to see the full error message
    const inputValue = event.type === 'keydown' ? label : this.state.inputValue

    this.setState({
      highlightedOptionId: id,
      inputValue
    })
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
  handleSelectOption = (event, { id }) => {
    if (id === this._emptyOptionId) {
      // selected option is the empty option
      this.setState({ isShowingOptions: false })
      return
    }

    const option = this.getOption('id', id)
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type '{}'.
    const value = option && option.props.value

    if (this.isControlled) {
      this.setState({ isShowingOptions: false })
    } else {
      this.setState((state) => ({
        isShowingOptions: false,
        selectedOptionId: id,
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type '{}'.
        inputValue: option ? option.props.children : state.inputValue
      }))
    }
    // fire onChange if selected option changed
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    option && this.props.onChange(event, { value, id })
    // hide options list whenever selection is made
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.onHideOptions(event)
  }

  renderChildren() {
    let children = Children.toArray(this.props.children)
    children = Children.map(children, (child) => {
      if (matchComponentTypes(child, [Option])) {
        return this.renderOption(child)
      } else if (matchComponentTypes(child, [Group])) {
        return this.renderGroup(child)
      }
      return null
    }).filter((child) => !!child)

    if (children.length === 0) {
      // no valid children, render empty option
      return this.renderEmptyOption()
    }

    return children
  }

  renderEmptyOption() {
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

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'option' implicitly has an 'any' type.
  renderOption(option) {
    const {
      id,
      value,
      children,
      renderBeforeLabel,
      renderAfterLabel,
      ...rest
    } = option.props

    const isDisabled = option.props.isDisabled
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'highlightedOptionId' does not exist on t... Remove this comment to see the full error message
    const isSelected = id === this.state.selectedOptionId
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'highlightedOptionId' does not exist on t... Remove this comment to see the full error message
    const isHighlighted = id === this.state.highlightedOptionId

    const getRenderLabel = (renderLabel: any) => {
      return typeof renderLabel === 'function'
        ? renderLabel.bind(null, {
            id,
            isDisabled,
            isSelected,
            isHighlighted,
            children
          })
        : renderLabel
    }

    return (
      <Select.Option
        id={id}
        value={value}
        key={option.key || id}
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'highlightedOptionId' does not exist on t... Remove this comment to see the full error message
        isHighlighted={id === this.state.highlightedOptionId}
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'selectedOptionId' does not exist on type... Remove this comment to see the full error message
        isSelected={id === this.state.selectedOptionId}
        isDisabled={option.props.isDisabled}
        renderBeforeLabel={getRenderLabel(renderBeforeLabel)}
        renderAfterLabel={getRenderLabel(renderAfterLabel)}
        {...passthroughProps(rest)}
      >
        {children}
      </Select.Option>
    )
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'group' implicitly has an 'any' type.
  renderGroup(group) {
    const { id, renderLabel, children, ...rest } = group.props
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

  render() {
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
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'inputValue' does not exist on type 'Read... Remove this comment to see the full error message
        inputValue={this.state.inputValue}
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'isShowingOptions' does not exist on type... Remove this comment to see the full error message
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
        {/* @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 1. */}
        {this.renderChildren(children)}
      </Select>
    )
  }
}

export { SimpleSelect }
export default SimpleSelect
