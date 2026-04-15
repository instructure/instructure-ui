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

import {
  isValidElement,
  ComponentElement,
  Component,
  Children,
  type ReactElement
} from 'react'

import * as utils from '@instructure/ui-utils'
import {
  matchComponentTypes,
  passthroughProps,
  callRenderProp,
  getInteraction,
  withDeterministicId
} from '@instructure/ui-react-utils'

import { Select } from '@instructure/ui-select/latest'
import type { SelectProps } from '@instructure/ui-select/latest'

import { Option } from './Option'
import type {
  SimpleSelectOptionProps,
  RenderSimpleSelectOptionLabel
} from './Option/props'

import { Group } from './Group'
import type { SimpleSelectGroupProps } from './Group/props'

import type { SimpleSelectProps } from './props'
import { allowedProps, SimpleSelectState } from './props'

type OptionChild = ComponentElement<SimpleSelectOptionProps, Option>
type GroupChild = ComponentElement<SimpleSelectGroupProps, Group>

type GetOption = <F extends keyof SimpleSelectOptionProps>(
  field: F,
  value?: SimpleSelectOptionProps[F]
) => OptionChild | undefined

/**
---
category: components
tags: form, field, dropdown
---
**/
@withDeterministicId()
class SimpleSelect extends Component<SimpleSelectProps, SimpleSelectState> {
  static readonly componentId = 'SimpleSelect'

  static Option = Option
  static Group = Group

  static allowedProps = allowedProps

  static defaultProps = {
    size: 'medium',
    isRequired: false,
    isInline: false,
    visibleOptionsCount: 8,
    placement: 'bottom stretch',
    constrain: 'window',
    renderEmptyOption: '---',
    isOptionContentAppliedToInput: false
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

    this._emptyOptionId = props.deterministicId!('Select-EmptyOption')
  }

  get _select() {
    console.warn(
      '_select property is deprecated and will be removed in v9, please use ref instead'
    )

    return this.ref
  }

  focus() {
    this.ref && this.ref.focus()
  }

  blur() {
    this.ref && this.ref.blur()
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

  hasOptionsChanged(
    prevChildren: SimpleSelectProps['children'],
    currentChildren: SimpleSelectProps['children']
  ) {
    const getValues = (children: SimpleSelectProps['children']) =>
      Children.map(children, (child) => {
        if (isValidElement(child)) {
          return (child as ReactElement<any>).props.value
        }
        return null
      })

    const prevValues = getValues(prevChildren)
    const currentValues = getValues(currentChildren)

    return JSON.stringify(prevValues) !== JSON.stringify(currentValues)
  }

  componentDidUpdate(prevProps: SimpleSelectProps) {
    if (this.hasOptionsChanged(prevProps.children, this.props.children)) {
      // Compare current input value to children's child prop, this is put into
      // state.inputValue
      const option = this.getOption('children', this.state.inputValue)
      this.setState({
        inputValue: option ? option.props.children : undefined,
        selectedOptionId: option ? option.props.id : ''
      })
    }
    if (this.props.value !== prevProps.value) {
      // if value has changed externally try to find an option with the same value
      // and select it
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
    const children = Children.toArray(this.props.children) as (
      | OptionChild
      | GroupChild
    )[]
    let match: OptionChild | undefined

    for (let i = 0; i < children.length; i++) {
      const child = children[i]
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
    const children = Children.toArray(this.props.children) as (
      | OptionChild
      | GroupChild
    )[]
    let match: OptionChild | undefined

    for (let i = 0; i < children.length; ++i) {
      const child = children[i]
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

  getOptionByPosition(position: 'first' | 'last'): OptionChild | undefined {
    const children = Children.toArray(this.props.children)

    // Determine where to start looking based on position
    const index = position === 'first' ? 0 : children.length - 1

    // Check if child is an option or group
    const child = children[index]
    if (!child) return undefined

    // If it's a regular option, return it
    if (matchComponentTypes<OptionChild>(child, [Option])) {
      return child
    }

    // If it's a group, get its options
    if (matchComponentTypes<GroupChild>(child, [Group])) {
      const groupOptions = Children.toArray(child.props.children)
      const groupIndex = position === 'first' ? 0 : groupOptions.length - 1
      return groupOptions[groupIndex] as OptionChild
    }

    return undefined
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

    if (event.type.startsWith('key')) {
      const keyboardEvent = event as React.KeyboardEvent
      const children = Children.toArray(this.props.children) as (
        | OptionChild
        | GroupChild
      )[]

      if (!this.state.inputValue && children.length > 0) {
        const position =
          keyboardEvent.key === 'ArrowDown'
            ? 'first'
            : keyboardEvent.key === 'ArrowUp'
            ? 'last'
            : undefined
        if (position) {
          const optionId = this.getOptionByPosition(position)?.props.id
          optionId &&
            this.setState({
              highlightedOptionId: optionId
            })
        }
      }
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
    _event,
    { id }
  ) => {
    if (id === this._emptyOptionId) return

    this.setState({
      highlightedOptionId: id,
      inputValue: this.state.inputValue
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

    // Focus needs to be reapplied to input
    // after selecting an item to make sure VoiceOver behaves correctly on iOS
    if (utils.isAndroidOrIOS()) {
      this.blur()
      this.focus()
    }

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
    let children = Children.toArray(this.props.children) as (
      | OptionChild
      | GroupChild
    )[]
    children = Children.map(children, (child) => {
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

    const isDisabled = option.props.isDisabled ?? false // after the react 19 upgrade `isDisabled` is undefined instead of defaulting to false if not specified (but only in vitest env for some reason)
    const isSelected = id === this.state.selectedOptionId
    const isHighlighted = id === this.state.highlightedOptionId

    const getRenderLabel = (renderLabel: RenderSimpleSelectOptionLabel) => {
      if (
        typeof renderLabel === 'function' &&
        !renderLabel?.prototype?.isReactComponent
      ) {
        return (renderLabel as any).bind(null, {
          id,
          isDisabled,
          isSelected,
          isHighlighted,
          children
        })
      }
      return renderLabel
    }

    return (
      <Select.Option
        id={id}
        value={value}
        key={option.key || id}
        isHighlighted={isHighlighted}
        isSelected={isSelected}
        isDisabled={isDisabled}
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
      layout,
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
        isOptionContentAppliedToInput={this.props.isOptionContentAppliedToInput}
        layout={layout}
        {...passthroughProps(rest)}
        data-cid="SimpleSelect"
      >
        {this.renderChildren()}
      </Select>
    )
  }
}

export { SimpleSelect }
export default SimpleSelect
