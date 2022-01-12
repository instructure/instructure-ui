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
  getInteraction,
  withSSR
} from '@instructure/ui-react-utils'

import { Select } from '@instructure/ui-select'
import type { SelectProps } from '@instructure/ui-select'

import { Option } from './Option'
import type {
  SimpleSelectOptionProps,
  RenderSimpleSelectOptionLabel
} from './Option/props'

import { Group } from './Group'
import type { SimpleSelectGroupProps } from './Group/props'

import type { SimpleSelectProps } from './props'
import { allowedProps, propTypes, SimpleSelectState } from './props'

import { hashInstance } from '@instructure/ui-utils'

type OptionChild = React.ComponentElement<SimpleSelectOptionProps, Option>
type GroupChild = React.ComponentElement<SimpleSelectGroupProps, Group>

type GetOption = <F extends 'id' | 'value'>(
  field: F,
  value?: SimpleSelectOptionProps[F]
) => OptionChild | undefined

/**
---
category: components
tags: form, field, dropdown
---
@tsProps
**/
@withSSR()
@testable()
class SimpleSelect extends Component<SimpleSelectProps, SimpleSelectState> {
  static readonly componentId = 'SimpleSelect'

  static Option = Option
  static Group = Group

  static allowedProps = allowedProps
  static propTypes = propTypes

  static defaultProps = {
    size: 'medium',
    isRequired: false,
    isInline: false,
    visibleOptionsCount: 8,
    placement: 'bottom stretch',
    constrain: 'window',
    renderEmptyOption: '---'
  }

  ref: Select | null = null

  private readonly _emptyOptionId

  constructor(props: SimpleSelectProps) {
    super(props)

    const option = this.getInitialOption(props)

    this.state = {
      inputValue: option ? option.props.children : '',
      isShowingOptions: false,
      highlightedOptionId: undefined,
      selectedOptionId: option ? option.props.id : undefined
    }

    //@ts-expect-error props.ssr
    this._emptyOptionId = hashInstance('Select-EmptyOption', this.props.ssr)
  }

  get _select() {
    console.warn(
      '_select property is deprecated and will be removed in v9, please use ref instead'
    )

    return this.ref
  }

  get childrenArray() {
    return Children.toArray(this.props.children) as Array<
      OptionChild | GroupChild
    >
  }

  focus() {
    this.ref && this.ref.focus()
  }

  get focused() {
    return this.ref ? this.ref.focused : false
  }

  get id() {
    return this.ref ? this.ref.id : undefined
  }

  get isControlled() {
    return typeof this.props.value !== 'undefined'
  }

  get interaction() {
    return getInteraction({ props: this.props })
  }

  componentDidUpdate(prevProps: SimpleSelectProps) {
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

  getInitialOption(props: SimpleSelectProps) {
    const { value, defaultValue } = props
    const initialValue = value || defaultValue

    if (typeof initialValue === 'string' || typeof initialValue === 'number') {
      // get option based on value or defaultValue, if provided
      return this.getOption('value', initialValue)
    }
    // otherwise get the first option
    return this.getFirstOption()
  }

  getOptionLabelById(id: string) {
    const option = this.getOption('id', id)
    return option ? option.props.children : ''
  }

  getFirstOption() {
    let match: OptionChild | undefined

    for (let i = 0; i < this.childrenArray.length; i++) {
      const child = this.childrenArray[i]
      if (matchComponentTypes<OptionChild>(child, [Option])) {
        match = child
      } else if (matchComponentTypes<GroupChild>(child, [Group])) {
        // first child is a group, not an option, find first child in group
        match = (Children.toArray(child.props.children) as OptionChild[])[0]
      }
      if (match) {
        break
      }
    }
    return match
  }

  getOption: GetOption = (field, value) => {
    let match: OptionChild | undefined

    for (let i = 0; i < this.childrenArray.length; ++i) {
      const child = this.childrenArray[i]
      if (matchComponentTypes<OptionChild>(child, [Option])) {
        if (child.props[field] === value) {
          match = child
        }
      } else if (matchComponentTypes<GroupChild>(child, [Group])) {
        const groupChildren = Children.toArray(
          child.props.children
        ) as OptionChild[]
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

  handleRef = (node: Select) => {
    this.ref = node
  }

  handleBlur: SelectProps['onBlur'] = (event) => {
    this.setState({ highlightedOptionId: undefined })
    if (typeof this.props.onBlur === 'function') {
      this.props.onBlur(event)
    }
  }

  handleShowOptions: SelectProps['onRequestShowOptions'] = (event) => {
    this.setState({ isShowingOptions: true })
    if (typeof this.props.onShowOptions === 'function') {
      this.props.onShowOptions(event)
    }
  }

  handleHideOptions: SelectProps['onRequestHideOptions'] = (event) => {
    this.setState((state) => {
      const option = this.getOption('id', state.selectedOptionId)
      return {
        isShowingOptions: false,
        highlightedOptionId: undefined,
        inputValue: option ? option.props.children : ''
      }
    })
    if (typeof this.props.onHideOptions === 'function') {
      this.props.onHideOptions(event)
    }
  }

  handleHighlightOption: SelectProps['onRequestHighlightOption'] = (
    event,
    { id }
  ) => {
    if (id === this._emptyOptionId) return

    const option = this.getOption('id', id)
    const label = option?.props.children
    const inputValue = event.type === 'keydown' ? label : this.state.inputValue

    this.setState({
      highlightedOptionId: id,
      inputValue
    })
  }

  handleSelectOption: SelectProps['onRequestSelectOption'] = (
    event,
    { id }
  ) => {
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
    if (option && typeof this.props.onChange === 'function') {
      this.props.onChange(event, { value, id })
    }
    // hide options list whenever selection is made
    if (typeof this.props.onHideOptions === 'function') {
      this.props.onHideOptions(event)
    }
  }

  renderChildren() {
    const children = Children.map(this.childrenArray, (child) => {
      if (matchComponentTypes<OptionChild>(child, [Option])) {
        return this.renderOption(child)
      } else if (matchComponentTypes<GroupChild>(child, [Group])) {
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
    ) as OptionChild
  }

  renderOption(option: OptionChild) {
    const {
      id,
      value,
      children,
      renderBeforeLabel,
      renderAfterLabel,
      ...rest
    } = option.props

    const isDisabled = option.props.isDisabled
    const isSelected = id === this.state.selectedOptionId
    const isHighlighted = id === this.state.highlightedOptionId

    const getRenderLabel = (renderLabel: RenderSimpleSelectOptionLabel) => {
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
        isHighlighted={id === this.state.highlightedOptionId}
        isSelected={id === this.state.selectedOptionId}
        isDisabled={option.props.isDisabled}
        renderBeforeLabel={getRenderLabel(renderBeforeLabel)}
        renderAfterLabel={getRenderLabel(renderAfterLabel)}
        {...passthroughProps(rest)}
      >
        {children}
      </Select.Option>
    ) as OptionChild
  }

  renderGroup(group: GroupChild) {
    const { id, renderLabel, children, ...rest } = group.props
    return (
      <Select.Group
        renderLabel={renderLabel}
        key={group.key || id}
        {...passthroughProps(rest)}
      >
        {Children.map(children as OptionChild[], (child) =>
          this.renderOption(child)
        )}
      </Select.Group>
    ) as GroupChild
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
      optionsMaxHeight,
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
        optionsMaxHeight={optionsMaxHeight}
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
        {this.renderChildren()}
      </Select>
    )
  }
}

export { SimpleSelect }
export default SimpleSelect
