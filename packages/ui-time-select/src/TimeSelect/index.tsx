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

import React, { BaseSyntheticEvent, Component, SyntheticEvent } from 'react'

import { ApplyLocaleContext, Locale, DateTime } from '@instructure/ui-i18n'
import {
  getInteraction,
  passthroughProps,
  callRenderProp
} from '@instructure/ui-react-utils'

import { testable } from '@instructure/ui-testable'
import { Select } from '@instructure/ui-select'
import { uid } from '@instructure/uid'
import type { TimeSelectProps } from './props'
import { allowedProps, propTypes } from './props'
import { Moment } from 'moment-timezone'

/**
---
category: components
---
**/

type TimeSelectOptions = {
  id: string
  value: string
  label: string
}

type TimeSelectState = {
  inputValue: string
  options: TimeSelectOptions[]
  filteredOptions: TimeSelectOptions[]
  isShowingOptions: boolean
  highlightedOptionId?: string
  selectedOptionId?: string
}

@testable()
class TimeSelect extends Component<TimeSelectProps, TimeSelectState> {
  static readonly componentId = 'TimeSelect'

  static allowedProps = allowedProps
  static propTypes = propTypes

  static defaultProps = {
    defaultToFirstOption: false,
    id: undefined,
    format: 'LT', // see https://momentjs.com/docs/#/displaying/
    step: 30,
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
    renderAfterInput: null
  }

  static contextType = ApplyLocaleContext

  constructor(props: TimeSelectProps) {
    super(props)
    this.state = this.getInitialState()
  }

  componentDidMount() {
    // we'll need to recalculate the state because the context value is
    // set at this point (and it might change locale & timezone)
    this.setState(this.getInitialState())
  }

  ref: Element | null = null
  _emptyOptionId = uid('Select-EmptyOption')

  focus() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'ref' does not exist on type 'TimeSel... Remove this comment to see the full error message
    this.ref && this.ref.focus()
  }

  get _select() {
    console.warn(
      '_select property is deprecated and will be removed in v9, please use ref instead'
    )

    return this.ref
  }
  get isControlled() {
    return typeof this.props.value !== 'undefined'
  }

  get interaction() {
    return getInteraction({ props: this.props })
  }

  get focused() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'ref' does not exist on type 'TimeSel... Remove this comment to see the full error message
    return this.ref && this.ref.focused
  }

  get id() {
    return this.ref && this.ref.id
  }

  locale() {
    if (this.props.locale) {
      return this.props.locale
    } else if (this.context && this.context.locale) {
      return this.context.locale
    }
    return Locale.browserLocale()
  }

  timezone() {
    if (this.props.timezone) {
      return this.props.timezone
    } else if (this.context && this.context.timezone) {
      return this.context.timezone
    }
    return DateTime.browserTimeZone()
  }

  componentDidUpdate(prevProps: TimeSelectProps) {
    if (
      this.props.step !== prevProps.step ||
      this.props.format !== prevProps.format
    ) {
      // options change, reset everything
      // when controlled, selection will be preserved
      // when uncontrolled, selection will be lost
      this.setState(this.getInitialState())
    }

    if (this.props.value !== prevProps.value) {
      // value changed
      let option = this.getOption('value', this.props.value)
      if (typeof this.props.value === 'undefined') {
        // preserve current value when changing from controlled to uncontrolled
        option = this.getOption('value', prevProps.value)
      }
      this.setState({
        inputValue: option ? option.label : '',
        selectedOptionId: option ? option.id : undefined
      })
    }
  }

  getInitialState() {
    const initialOptions = this.generateOptions()
    const initialSelection = this.getInitialOption(initialOptions)
    return {
      inputValue: initialSelection ? initialSelection.label : '',
      options: initialOptions,
      filteredOptions: initialOptions,
      isShowingOptions: false,
      highlightedOptionId: initialSelection
        ? (initialSelection as any).id
        : undefined,
      selectedOptionId: initialSelection
        ? (initialSelection as any).id
        : undefined
    }
  }

  getInitialOption(options: TimeSelectOptions[]) {
    const { value, defaultValue, defaultToFirstOption, format } = this.props
    const initialValue = value || defaultValue

    if (typeof initialValue === 'string') {
      // get option based on value or defaultValue, if provided
      const option = this.getOption('value', initialValue, options)
      if (option) {
        // value matches an existing option
        return option
      }
      // value does not match an existing option
      const date = DateTime.parse(initialValue, this.locale(), this.timezone())
      return { label: format ? date.format(format) : date.toISOString() }
    }
    // otherwise return first option, if desired
    if (defaultToFirstOption) {
      return options[0]
    }
    return undefined
  }

  getOption(field: string, value: unknown, options = this.state.options) {
    return options.find((option: any) => option[field] === value)
  }

  getFormattedId(date: Moment) {
    // ISO8601 strings may contain a space. Remove any spaces before using the
    // date as the id.
    const dateStr = date.toISOString()
    return dateStr.replace(/\s/g, '')
  }

  getBaseDate() {
    let baseDate
    const baseValue = this.props.value || this.props.defaultValue
    if (baseValue) {
      baseDate = DateTime.parse(baseValue, this.locale(), this.timezone())
    } else {
      baseDate = DateTime.now(this.locale(), this.timezone())
    }
    return baseDate.set({ second: 0, millisecond: 0 }).clone()
  }

  generateOptions() {
    const date = this.getBaseDate()
    const options = []

    for (let hour = 0; hour < 24; hour++) {
      // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
      for (let minute = 0; minute < 60 / this.props.step; minute++) {
        // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
        const minutes = minute * this.props.step
        const newDate = date.set({ hour: hour, minute: minutes })
        // store time options
        options.push({
          id: this.getFormattedId(newDate), // iso no spaces
          value: newDate.toISOString(),
          label: this.props.format
            ? newDate.format(this.props.format)
            : newDate.toISOString()
        })
      }
    }
    return options
  }

  filterOptions(inputValue: string) {
    return this.state?.options.filter((option: TimeSelectOptions) =>
      option.label.toLowerCase().startsWith(inputValue.toLowerCase())
    )
  }

  matchValue() {
    const {
      inputValue,
      filteredOptions,
      highlightedOptionId,
      selectedOptionId
    } = this.state

    // an option matching user input exists
    if (filteredOptions.length === 1) {
      const onlyOption = filteredOptions[0]
      // automatically select the matching option
      if (onlyOption.label.toLowerCase() === inputValue.toLowerCase()) {
        return {
          inputValue: onlyOption.label,
          selectedOptionId: onlyOption.id,
          filteredOptions: this.filterOptions('')
        }
      }
    }
    // no match found, return selected option label to input
    const selectedOption = this.getOption('id', selectedOptionId)
    if (selectedOption) {
      return { inputValue: selectedOption.label }
    }
    // input value is from highlighted option, not user input
    if (highlightedOptionId) {
      if (inputValue === this.getOption('id', highlightedOptionId)!.label) {
        return {
          inputValue: '',
          filteredOptions: this.filterOptions('')
        }
      }
    }
    // if input was completely cleared, ensure it stays clear
    // e.g. defaultValue defined, but no selection yet made
    if (inputValue === '') {
      return { inputValue: '' }
    }
    return undefined
  }

  handleRef = (node: any) => {
    this.ref = node
  }

  handleBlur = (event: SyntheticEvent) => {
    this.setState({ highlightedOptionId: undefined })
    this.props.onBlur?.(event)
  }

  handleInputChange = (event: BaseSyntheticEvent) => {
    const value = event.target.value
    const newOptions = this.filterOptions(value)

    this.setState((_state: TimeSelectState) => ({
      inputValue: value,
      filteredOptions: newOptions,
      highlightedOptionId: newOptions.length > 0 ? newOptions[0].id : undefined,
      isShowingOptions: true
    }))

    if (!this.state.isShowingOptions) {
      this.props.onShowOptions?.(event)
    }
  }

  handleShowOptions = (event: SyntheticEvent) => {
    this.setState({ isShowingOptions: true })
    this.props.onShowOptions?.(event)
  }

  handleHideOptions = (event: SyntheticEvent) => {
    const { selectedOptionId } = this.state
    const option = this.getOption('id', selectedOptionId)
    let prevValue = ''

    if (this.props.defaultValue) {
      const date = DateTime.parse(
        this.props.defaultValue,
        this.locale(),
        this.timezone()
      )
      prevValue = this.props.format
        ? date.format(this.props.format)
        : date.toISOString()
    }

    this.setState((_state: TimeSelectState) => ({
      isShowingOptions: false,
      highlightedOptionId: undefined,
      inputValue: selectedOptionId ? option!.label : prevValue,
      filteredOptions: this.filterOptions(''),
      ...this.matchValue()
    }))
    this.props.onHideOptions?.(event)
  }

  handleHighlightOption = (event: SyntheticEvent, { id }: { id: string }) => {
    if (id === this._emptyOptionId) return
    const { type } = event
    const option = this.getOption('id', id)!.label

    this.setState((state) => ({
      highlightedOptionId: id,
      inputValue: type === 'keydown' ? option : state.inputValue
    }))
  }

  handleSelectOption = (event: SyntheticEvent, { id }: { id: string }) => {
    if (id === this._emptyOptionId) {
      this.setState({ isShowingOptions: false })
      return
    }
    const option = this.getOption('id', id)

    let newInputValue: string
    if (this.isControlled) {
      const prev = this.getOption('id', this.state.selectedOptionId)
      newInputValue = prev ? prev.label : ''
      this.setState({
        isShowingOptions: false,
        inputValue: newInputValue,
        filteredOptions: this.filterOptions('')
      })
    } else {
      newInputValue = option!.label
      this.setState({
        isShowingOptions: false,
        selectedOptionId: id,
        inputValue: newInputValue,
        filteredOptions: this.filterOptions('')
      })
    }

    if (id !== this.state.selectedOptionId) {
      this.props.onChange?.(event, {
        value: option!.value,
        inputText: newInputValue
      })
    }
    this.props.onHideOptions?.(event)
  }

  renderOptions() {
    const {
      filteredOptions,
      highlightedOptionId,
      selectedOptionId
    } = this.state

    if (filteredOptions.length < 1) {
      return this.renderEmptyOption()
    }

    return filteredOptions.map((option: any) => {
      const { id, label } = option
      return (
        <Select.Option
          id={id}
          key={id}
          isHighlighted={id === highlightedOptionId}
          isSelected={id === selectedOptionId}
        >
          {label}
        </Select.Option>
      )
    })
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

  render() {
    const {
      value,
      defaultValue,
      placeholder,
      renderLabel,
      inputRef,
      id,
      listRef,
      renderBeforeInput,
      renderAfterInput,
      isRequired,
      isInline,
      width,
      format,
      step,
      optionsMaxWidth,
      visibleOptionsCount,
      messages,
      placement,
      constrain,
      onFocus,
      onShowOptions,
      onHideOptions,
      ...rest
    } = this.props

    const { inputValue, isShowingOptions } = this.state

    return (
      <Select
        renderLabel={renderLabel}
        inputValue={inputValue}
        interaction={this.interaction}
        placeholder={placeholder}
        id={id}
        onFocus={onFocus}
        onBlur={this.handleBlur}
        ref={this.handleRef}
        inputRef={inputRef}
        listRef={listRef}
        isRequired={isRequired}
        isInline={isInline}
        width={width}
        optionsMaxWidth={optionsMaxWidth}
        visibleOptionsCount={visibleOptionsCount}
        messages={messages}
        placement={placement}
        constrain={constrain}
        renderBeforeInput={renderBeforeInput}
        renderAfterInput={renderAfterInput}
        isShowingOptions={isShowingOptions}
        onRequestShowOptions={this.handleShowOptions}
        onRequestHideOptions={this.handleHideOptions}
        onRequestHighlightOption={this.handleHighlightOption}
        onRequestSelectOption={this.handleSelectOption}
        onInputChange={this.handleInputChange}
        {...passthroughProps(rest)}
      >
        {isShowingOptions && this.renderOptions()}
      </Select>
    )
  }
}

export { TimeSelect }
export default TimeSelect
