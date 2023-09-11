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
      this.props.timezone !== prevProps.timezone ||
      this.props.allowNonStepInput !== prevProps.allowNonStepInput
    ) {
      // options change, reset everything
      // when controlled, selection will be preserved
      // when uncontrolled, selection will be lost
      this.setState(this.getInitialState())
    }
    if (this.props.value !== prevProps.value) {
      let newValue: Moment | undefined
      if (this.props.value) {
        newValue = DateTime.parse(
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
      if (!this.isControlled) {
        // preserve current value when changing from controlled to uncontrolled
        if (prevProps.value) {
          option = this.getOption(
            'id',
            this.getFormattedId(
              DateTime.parse(prevProps.value, this.locale(), this.timezone())
            )
          )
        }
      } else if (newValue) {
        option = this.getOption(
          'id',
          this.getFormattedId(newValue),
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
      // 288 = 5 min step
      filteredOptions:
        initialOptions.length > 288
          ? initialOptions.filter(
              (opt) => opt.value.minute() % this.props.step! === 0
            )
          : initialOptions,
      isShowingOptions: false,
      highlightedOptionId: initialSelection ? initialSelection.id : undefined,
      selectedOptionId: initialSelection ? initialSelection.id : undefined
    }
  }

  getInitialOption(options: TimeSelectOptions[]) {
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
        id: this.getFormattedId(date),
        label: format ? date.format(format) : date.toISOString(),
        value: date
      } as TimeSelectOptions
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
    const step = this.props.step ? this.props.step : 30
    const maxMinute = this.props.allowNonStepInput ? 60 : 60 / step
    const minuteStep = this.props.allowNonStepInput ? 1 : step
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
    let inputNoSeconds = inputValue
    // if the input contains seconds disregard them (e.g. if format = LTS)
    if (inputValue.length > 5) {
      // e.g. "5:34:"
      const input = this.parseInputText(inputValue)
      if (input.isValid()) {
        input.set({ second: 0 })
        inputNoSeconds = input.format(this.props.format)
      }
    }

    if (this.props.allowNonStepInput && inputNoSeconds.length < 3) {
      // could show too many results, show only step values
      return this.state?.options.filter((option: TimeSelectOptions) => {
        return (
          option.label.toLowerCase().startsWith(inputNoSeconds.toLowerCase()) &&
          option.value.minute() % this.props.step! == 0
        )
      })
    }
    return this.state?.options.filter((option: TimeSelectOptions) =>
      option.label.toLowerCase().startsWith(inputNoSeconds.toLowerCase())
    )
  }

  handleRef = (node: Select) => {
    this.ref = node
  }

  handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    this.props.onBlur?.(event)
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    const newOptions = this.filterOptions(value)
    if (newOptions?.length == 1) {
      // if there is only 1 option, it will be automatically selected except
      // if in controlled mode (it would commit this change)
      if (!this.isControlled) {
        this.setState({ selectedOptionId: newOptions[0].id })
      }
      this.setState({ fireChangeOnBlur: newOptions[0] })
    } else {
      this.setState({
        // needs not to lose selectedOptionId in controlled mode otherwise it'd
        // revert to the default or '' instead of the set value
        selectedOptionId: this.isControlled
          ? this.state.selectedOptionId
          : undefined,
        fireChangeOnBlur: undefined
      })
    }
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

  onKeyDown = (event: React.KeyboardEvent<any>) => {
    const input = this.parseInputText(this.state.inputValue)
    if (
      event.key === 'Enter' &&
      this.props.allowNonStepInput &&
      input.isValid()
    ) {
      this.setState(() => ({
        isShowingOptions: false,
        highlightedOptionId: undefined
      }))
      // others are set in handleBlurOrEsc
    }
    this.props.onKeyDown?.(event)
  }

  handleShowOptions = (event: React.SyntheticEvent) => {
    this.setState({
      isShowingOptions: true,
      highlightedOptionId: this.state.selectedOptionId
    })
    this.props.onShowOptions?.(event)
  }

  // Called when the input is blurred (=when clicking outside, tabbing away),
  // when pressing ESC. NOT called when an item is selected via Enter/click,
  // (but in this case it will be called later when the input is blurred.)
  handleBlurOrEsc: SelectProps['onRequestHideOptions'] = (event) => {
    const { selectedOptionId, inputValue } = this.state
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
    const selectedOption = this.getOption('id', selectedOptionId)
    let newInputValue = defaultValue
    if (selectedOption) {
      // If there is a selected option use its value in the input field.
      newInputValue = selectedOption.label
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
      filteredOptions: this.filterOptions('')
    }))
    if (this.state.fireChangeOnBlur && (event as any).key !== 'Escape') {
      this.setState(() => ({ fireChangeOnBlur: undefined }))
      this.props.onChange?.(event, {
        value: this.state.fireChangeOnBlur.value.toISOString(),
        inputText: this.state.fireChangeOnBlur.label
      })
    }
    // TODO only fire this if handleSelectOption was not called before.
    this.props.onHideOptions?.(event)
  }

  // Called when an option is selected via mouse click or Enter.
  handleSelectOption: SelectProps['onRequestSelectOption'] = (event, data) => {
    if (data.id === this._emptyOptionId) {
      this.setState({ isShowingOptions: false })
      return
    }
    const selectedOption = this.getOption('id', data.id)
    let newInputValue: string
    const currentSelectedOptionId = this.state.selectedOptionId
    if (this.isControlled) {
      // in controlled mode we leave to the user to set the value of the
      // component e.g. in the onChange event handler.
      // This is accomplished by not setting a selectedOptionId
      const prev = this.getOption('id', this.state.selectedOptionId)
      newInputValue = prev ? prev.label : ''
      this.setState({
        isShowingOptions: false
      })
    } else {
      newInputValue = selectedOption!.label
      this.setState({
        isShowingOptions: false,
        selectedOptionId: data.id,
        inputValue: newInputValue
      })
    }
    if (data.id !== currentSelectedOptionId) {
      this.props.onChange?.(event, {
        value: selectedOption!.value.toISOString(),
        inputText: newInputValue
      })
    }
    this.props.onHideOptions?.(event)
  }

  handleHighlightOption: SelectProps['onRequestHighlightOption'] = (
    event,
    data
  ) => {
    if (data.id === this._emptyOptionId) return
    const option = this.getOption('id', data.id)!.label

    // this is needed for react 16. When we no longer support it, this can be removed
    const eventType = event.type
    this.setState((state) => ({
      highlightedOptionId: data.id,
      inputValue: eventType === 'keydown' ? option : state.inputValue
    }))
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
        onRequestHideOptions={this.handleBlurOrEsc}
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
