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
import type { Moment } from 'moment-timezone'
import { ApplyLocaleContext, Locale, DateTime } from '@instructure/ui-i18n'
import {
  getInteraction,
  passthroughProps,
  callRenderProp,
  withDeterministicId
} from '@instructure/ui-react-utils'
import { testable } from '@instructure/ui-testable'
import { Select } from '@instructure/ui-select'

import type { SelectProps } from '@instructure/ui-select'
import type {
  TimeSelectProps,
  TimeSelectState,
  TimeSelectOptions
} from './props'

import { allowedProps, propTypes } from './props'

type GetOption = <F extends keyof TimeSelectOptions>(
  field: F,
  value?: TimeSelectOptions[F],
  options?: TimeSelectOptions[]
) => TimeSelectOptions | undefined

/**
---
category: components
---
@tsProps

A component used to select a time value.
 **/
@withDeterministicId()
@testable()
class TimeSelect extends Component<TimeSelectProps, TimeSelectState> {
  declare context: React.ContextType<typeof ApplyLocaleContext>

  static readonly componentId = 'TimeSelect'
  static allowedProps = allowedProps
  static propTypes = propTypes
  static defaultProps = {
    defaultToFirstOption: false,
    format: 'LT', // see https://momentjs.com/docs/#/displaying/
    step: 30,
    isRequired: false,
    isInline: false,
    visibleOptionsCount: 8,
    placement: 'bottom stretch',
    constrain: 'window',
    renderEmptyOption: '---',
    allowNonStepInput: false
  }
  static contextType = ApplyLocaleContext

  ref: Select | null = null
  private readonly _emptyOptionId =
    this.props.deterministicId!('Select-EmptyOption')

  constructor(props: TimeSelectProps) {
    super(props)
    this.state = this.getInitialState()
  }

  componentDidMount() {
    // we'll need to recalculate the state because the context value is
    // set at this point (and it might change locale & timezone)
    this.setState(this.getInitialState())
  }

  focus() {
    this.ref?.focus()
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
      this.props.format !== prevProps.format ||
      this.props.locale !== prevProps.locale ||
      this.props.timezone !== prevProps.timezone
    ) {
      // options change, reset everything
      // when controlled, selection will be preserved
      // when uncontrolled, selection will be lost
      this.setState(this.getInitialState())
    }
    if (this.props.value !== prevProps.value) {
      let momentValue: Moment | undefined
      if (this.props.value) {
        momentValue = DateTime.parse(
          this.props.value,
          this.locale(),
          this.timezone()
        )
      }
      // value changed
      const initState = this.getInitialState()
      this.setState(initState)
      // options need to be passed because state is not set immediately
      let option
      if (typeof momentValue === 'undefined') {
        // preserve current value when changing from controlled to uncontrolled
        if (prevProps.value) {
          option = this.getOption(
            'id',
            this.getFormattedId(
              DateTime.parse(prevProps.value, this.locale(), this.timezone())
            )
          )
        }
      } else {
        option = this.getOption(
          'id',
          this.getFormattedId(momentValue),
          initState.options
        )
      }
      const outsideVal = this.props.value ? this.props.value : ''
      // value does not match an existing option
      const date = DateTime.parse(outsideVal, this.locale(), this.timezone())
      let label = ''
      if (date.isValid()) {
        label = this.props.format
          ? date.format(this.props.format)
          : date.toISOString()
      }
      this.setState({
        inputValue: option ? option.label : label,
        selectedOptionId: option ? option.id : undefined
      })
    }
  }

  getFormattedId(date: Moment) {
    // ISO8601 strings may contain a space. Remove any spaces before using the
    // date as the id.
    return date.toISOString().replace(/\s/g, '')
  }

  getInitialState(): TimeSelectState {
    const initialOptions = this.generateOptions()
    const initialSelection = this.getInitialOption(initialOptions)
    return {
      inputValue: initialSelection ? initialSelection.label : '',
      options: initialOptions,
      filteredOptions:
        initialOptions.length > 30 ? this.filterOptions('') : initialOptions,
      isShowingOptions: false,
      highlightedOptionId: initialSelection ? initialSelection.id : undefined,
      selectedOptionId: initialSelection ? initialSelection.id : undefined
    }
  }

  getInitialOption(
    options: TimeSelectOptions[]
  ): TimeSelectOptions | undefined {
    const { value, defaultValue, defaultToFirstOption, format } = this.props
    const initialValue = value || defaultValue
    if (typeof initialValue === 'string') {
      const date = DateTime.parse(initialValue, this.locale(), this.timezone())
      // get option based on value or defaultValue, if provided
      const option = this.getOption('value', date, options)
      if (option) {
        // value matches an existing option
        return option
      }
      // value does not match an existing option
      return {
        label: format ? date.format(format) : date.toISOString(),
        value: date
      }
    }
    // otherwise, return first option, if desired
    if (defaultToFirstOption) {
      return options[0]
    }
    return undefined
  }

  getOption: GetOption = (field, value, options = this.state.options) => {
    return options.find((option) => option[field] === value)
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

  generateOptions(): TimeSelectOptions[] {
    const date = this.getBaseDate()
    const options = []
    const maxMinute = this.props.allowNonStepInput ? 60 : 60 / this.props.step!
    const minuteStep = this.props.allowNonStepInput ? 1 : this.props.step!
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < maxMinute; minute++) {
        const minutes = minute * minuteStep
        const newDate = date.set({ hour: hour, minute: minutes })
        // store time options
        options.push({
          id: this.getFormattedId(newDate),
          value: newDate.clone(),
          label: this.props.format
            ? newDate.format(this.props.format)
            : newDate.toISOString()
        })
      }
    }
    return options
  }

  filterOptions(inputValue: string) {
    if (this.props.allowNonStepInput && inputValue.length < 3) {
      // could show too many results, show only step values
      return this.state?.options.filter((option: TimeSelectOptions) => {
        return (
          option.label.toLowerCase().startsWith(inputValue.toLowerCase()) &&
          option.value.minute() % this.props.step! == 0
        )
      })
    }
    return this.state?.options.filter((option: TimeSelectOptions) =>
      option.label.toLowerCase().startsWith(inputValue.toLowerCase())
    )
  }

  handleRef = (node: Select) => {
    this.ref = node
  }

  handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    this.setState({ highlightedOptionId: undefined })
    this.props.onBlur?.(event)
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    const newOptions = this.filterOptions(value)
    this.setState({
      inputValue: value,
      filteredOptions: newOptions,
      highlightedOptionId: newOptions.length > 0 ? newOptions[0].id : undefined,
      isShowingOptions: true
    })
    if (!this.state.isShowingOptions) {
      this.props.onShowOptions?.(event)
    }
    const inputAsDate = this.parseInputText(value)
    this.props.onInputChange?.(
      event,
      value,
      inputAsDate.isValid() ? inputAsDate.toISOString() : undefined
    )
  }

  handleShowOptions = (event: React.SyntheticEvent) => {
    this.setState({
      isShowingOptions: true,
      highlightedOptionId: this.state.selectedOptionId
    })
    this.props.onShowOptions?.(event)
  }

  handleHideOptions: SelectProps['onRequestHideOptions'] = (event) => {
    const { selectedOptionId, filteredOptions, inputValue } = this.state
    let defaultValue = ''
    if (this.props.defaultValue) {
      const date = DateTime.parse(
        this.props.defaultValue,
        this.locale(),
        this.timezone()
      )
      defaultValue = this.props.format
        ? date.format(this.props.format)
        : date.toISOString()
    }
    const option = this.getOption('id', selectedOptionId)
    let newInputValue = defaultValue
    let newSelectedOptionId: string | undefined
    // an option matching user input exists
    if (filteredOptions.length === 1) {
      const onlyOption = filteredOptions[0]
      // automatically select the matching option
      if (onlyOption.label.toLowerCase() === inputValue.toLowerCase()) {
        newInputValue = onlyOption.label
        newSelectedOptionId = onlyOption.id
      }
    }
    // no match found, return selected option label to input
    else if (option) {
      newInputValue = option.label
    }
    // if input was completely cleared, ensure it stays clear
    // e.g. defaultValue defined, but no selection yet made
    else if (inputValue === '') {
      newInputValue = ''
    }
    this.setState(() => ({
      isShowingOptions: false,
      highlightedOptionId: undefined,
      inputValue: newInputValue,
      filteredOptions: this.filterOptions(''),
      selectedOptionId: newSelectedOptionId
        ? newSelectedOptionId
        : this.state.selectedOptionId
    }))
    this.props.onHideOptions?.(event)
  }

  handleHighlightOption: SelectProps['onRequestHighlightOption'] = (
    event: React.SyntheticEvent,
    { id }
  ) => {
    if (id === this._emptyOptionId) return
    const option = this.getOption('id', id)!.label
    this.setState((state) => ({
      highlightedOptionId: id,
      inputValue: event.type === 'keydown' ? option : state.inputValue
    }))
  }

  handleSelectOption: SelectProps['onRequestSelectOption'] = (
    event: React.SyntheticEvent,
    { id }
  ) => {
    if (id === this._emptyOptionId) {
      this.setState({ isShowingOptions: false })
      return
    }
    const option = this.getOption('id', id)!

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
      newInputValue = option.label
      this.setState({
        isShowingOptions: false,
        selectedOptionId: id,
        inputValue: newInputValue,
        filteredOptions: this.filterOptions('')
      })
    }

    if (id !== this.state.selectedOptionId) {
      this.setState({
        lastValidInput: newInputValue
      })
      this.props.onChange?.(event, {
        value: option.value.toISOString(),
        inputText: newInputValue
      })
    }
    this.props.onHideOptions?.(event)
  }

  renderOptions() {
    const { filteredOptions, highlightedOptionId, selectedOptionId } =
      this.state

    if (filteredOptions.length < 1) {
      return this.renderEmptyOption()
    }

    return filteredOptions.map((option: TimeSelectOptions) => {
      const { id, label } = option
      return (
        <Select.Option
          id={id!}
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

  onKeyDown = (event: React.KeyboardEvent<any>) => {
    const input = this.parseInputText(this.state.inputValue)
    // validate input and if OK close dropdown
    if (
      event.key === 'Enter' &&
      this.props.allowNonStepInput &&
      input.isValid() &&
      this.state.lastValidInput != this.state.inputValue
    ) {
      this.setState(() => ({
        isShowingOptions: false,
        highlightedOptionId: undefined,
        filteredOptions: this.filterOptions(''),
        lastValidInput: this.state.inputValue
      }))
      // others are set in OnHideOptions
    }
    this.props.onKeyDown?.(event)
  }

  parseInputText = (inputValue: string) => {
    const input = DateTime.parse(
      inputValue,
      this.locale(),
      this.timezone(),
      [this.props.format!],
      true
    )
    const baseDate = this.getBaseDate()
    input.year(baseDate.year())
    input.month(baseDate.month())
    input.date(baseDate.date())
    return input
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
      onInputChange,
      onKeyDown,
      mountNode,
      ...rest
    } = this.props

    const { inputValue, isShowingOptions } = this.state
    return (
      <Select
        mountNode={mountNode}
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
        onKeyDown={this.onKeyDown}
        {...passthroughProps(rest)}
      >
        {isShowingOptions && this.renderOptions()}
      </Select>
    )
  }
}

export { TimeSelect }
export default TimeSelect
