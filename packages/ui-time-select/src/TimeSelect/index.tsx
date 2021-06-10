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

import {
  I18nPropTypes,
  ApplyLocaleContext,
  DateTime,
  Locale
} from '@instructure/ui-i18n'
import { controllable } from '@instructure/ui-prop-types'
import {
  getInteraction,
  passthroughProps,
  callRenderProp
} from '@instructure/ui-react-utils'
import { FormPropTypes } from '@instructure/ui-form-field'
import { PositionPropTypes } from '@instructure/ui-position'
import { testable } from '@instructure/ui-testable'
import { Select } from '@instructure/ui-select'
import { uid } from '@instructure/uid'

type Props = {
  renderLabel: React.ReactNode | ((...args: any[]) => any)
  defaultToFirstOption?: boolean
  value?: any // TODO: controllable(I18nPropTypes.iso8601, 'onChange'),
  defaultValue?: any // TODO: I18nPropTypes.iso8601
  id?: string
  format?: string
  step?: 5 | 10 | 15 | 20 | 30 | 60
  interaction?: 'enabled' | 'disabled' | 'readonly'
  placeholder?: string
  isRequired?: boolean
  isInline?: boolean
  width?: string
  optionsMaxWidth?: string
  visibleOptionsCount?: number
  messages?: any[] // TODO: FormPropTypes.message
  placement?: any // TODO: PositionPropTypes.placement
  constrain?: any // TODO: PositionPropTypes.constrain
  onChange?: (...args: any[]) => any
  onFocus?: (...args: any[]) => any
  onBlur?: (...args: any[]) => any
  onShowOptions?: (...args: any[]) => any
  onHideOptions?: (...args: any[]) => any
  inputRef?: (...args: any[]) => any
  listRef?: (...args: any[]) => any
  renderEmptyOption?: React.ReactNode | ((...args: any[]) => any)
  renderBeforeInput?: React.ReactNode | ((...args: any[]) => any)
  renderAfterInput?: React.ReactNode | ((...args: any[]) => any)
  locale?: string
  timezone?: string
}

/**
---
category: components
---
**/

@testable()
class TimeSelect extends Component<Props> {
  static componentId = 'TimeSelect'

  static propTypes = {
    /**
     * The form field label.
     */
    renderLabel: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
      .isRequired,
    /**
     * Whether to default to the first option when `defaultValue` hasn't been specified.
     */
    defaultToFirstOption: PropTypes.bool,
    /**
     * An ISO 8601 formatted date string representing the current selected value. If defined,
     * the component will act controlled and will not manage its own state.
     */
    value: controllable(I18nPropTypes.iso8601, 'onChange'),
    /**
     * An ISO 8601 formatted date string to use if `value` isn't provided.
     */
    defaultValue: I18nPropTypes.iso8601,
    /**
     * The id of the text input. One is generated if not supplied.
     */
    id: PropTypes.string,
    /**
     * The format to use when displaying the possible and currently selected options.
     *
     * See [moment.js formats](https://momentjs.com/docs/#/displaying/format/) for the list of available formats.
     */
    format: PropTypes.string,
    /**
     * The number of minutes to increment by when generating the allowable options.
     */
    step: PropTypes.oneOf([5, 10, 15, 20, 30, 60]),
    /**
     * Specifies if interaction with the input is enabled, disabled, or readonly.
     * When "disabled", the input changes visibly to indicate that it cannot
     * receive user interactions. When "readonly" the input still cannot receive
     * user interactions but it keeps the same styles as if it were enabled.
     */
    interaction: PropTypes.oneOf(['enabled', 'disabled', 'readonly']),
    /**
     * Html placeholder text to display when the input has no value. This should
     * be hint text, not a label replacement.
     */
    placeholder: PropTypes.string,
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
     * Callback fired when a new option is selected.
     * @param {Object} event - the event object
     * @param {Object} data - additional data
     * @param data.value - the value of selected option
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

    /* eslint-disable react/require-default-props */
    /**
     * A standard language identifier.
     *
     * See [moment.js i18n](https://momentjs.com/docs/#/i18n/) for more details.
     *
     * This property can also be set via a context property and if both are set then the component property takes
     * precedence over the context property.
     *
     * The web browser's locale will be used if no value is set via a component property or a context
     * property.
     */
    locale: PropTypes.string,
    /**
     * A timezone identifier in the format: Area/Location
     *
     * See [List of tz database time zones](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) for the list
     * of possible options.
     *
     * This property can also be set via a context property and if both are set then the component property takes
     * precedence over the context property.
     *
     * The web browser's timezone will be used if no value is set via a component property or a context
     * property.
     */
    timezone: PropTypes.string
    /* eslint-enable react/require-default-props */
  }

  static defaultProps = {
    value: undefined,
    defaultValue: undefined,
    defaultToFirstOption: false,
    id: undefined,
    format: 'LT',
    step: 30,
    interaction: undefined,
    placeholder: undefined,
    isRequired: false,
    isInline: false,
    width: undefined,
    optionsMaxWidth: undefined,
    visibleOptionsCount: 8,
    messages: undefined,
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

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
  constructor(props) {
    super(props)
    this.state = this.getInitialState()
  }

  _emptyOptionId = uid('Select-EmptyOption')

  focus() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_select' does not exist on type 'TimeSel... Remove this comment to see the full error message
    this._select && this._select.focus()
  }

  get isControlled() {
    return typeof this.props.value !== 'undefined'
  }

  get interaction() {
    return getInteraction({ props: this.props })
  }

  get focused() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_select' does not exist on type 'TimeSel... Remove this comment to see the full error message
    return this._select && this._select.focused
  }

  get id() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_select' does not exist on type 'TimeSel... Remove this comment to see the full error message
    return this._select && this._select.id
  }

  locale() {
    if (this.props.locale) {
      return this.props.locale
    } else if (this.context && this.context.locale) {
      return this.context.locale
    }
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1-2 arguments, but got 0.
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

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'prevProps' implicitly has an 'any' type... Remove this comment to see the full error message
  componentDidUpdate(prevProps) {
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
        selectedOptionId: option ? option.id : null
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
      highlightedOptionId: initialSelection ? initialSelection.id : null,
      selectedOptionId: initialSelection ? initialSelection.id : null
    }
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'options' implicitly has an 'any' type.
  getInitialOption(options) {
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
      return { label: date.format(format) }
    }
    // otherwise return first option, if desired
    if (defaultToFirstOption) {
      return options[0]
    }

    return null
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'field' implicitly has an 'any' type.
  getOption(field, value, options = this.state.options) {
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'option' implicitly has an 'any' type.
    return options.find((option) => option[field] === value)
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'date' implicitly has an 'any' type.
  getFormattedId(date) {
    // ISO8601 strings may contain a space. Remove any spaces before using the
    // date as the id.
    const dateStr = date.toISOString()
    return dateStr ? dateStr.replace(/\s/g, '') : null
  }

  getBaseDate() {
    let baseDate
    const baseValue = this.props.value || this.props.defaultValue
    if (baseValue) {
      baseDate = DateTime.parse(baseValue, this.locale(), this.timezone())
    } else {
      baseDate = DateTime.now(this.locale(), this.timezone())
    }
    return baseDate.second(0).millisecond(0)
  }

  generateOptions() {
    const date = this.getBaseDate()
    const options = []

    for (let hour = 0; hour < 24; hour++) {
      // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
      for (let minute = 0; minute < 60 / this.props.step; minute++) {
        // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
        const minutes = minute * this.props.step
        date.hour(hour).minute(minutes)
        // store time options
        options.push({
          id: this.getFormattedId(date), // iso no spaces
          value: date.toISOString(), // iso
          label: date.format(this.props.format) // formatted string
        })
      }
    }
    return options
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'inputValue' implicitly has an 'any' typ... Remove this comment to see the full error message
  filterOptions(inputValue) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'options' does not exist on type 'Readonl... Remove this comment to see the full error message
    return this.state.options.filter((option) =>
      option.label.toLowerCase().startsWith(inputValue.toLowerCase())
    )
  }

  // @ts-expect-error ts-migrate(7030) FIXME: Not all code paths return a value.
  matchValue() {
    const {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'inputValue' does not exist on type 'Read... Remove this comment to see the full error message
      inputValue,
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'filteredOptions' does not exist on type ... Remove this comment to see the full error message
      filteredOptions,
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'highlightedOptionId' does not exist on t... Remove this comment to see the full error message
      highlightedOptionId,
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'selectedOptionId' does not exist on type... Remove this comment to see the full error message
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
      if (inputValue === this.getOption('id', highlightedOptionId).label) {
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
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'node' implicitly has an 'any' type.
  handleRef = (node) => {
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_select' does not exist on type 'TimeSel... Remove this comment to see the full error message
    this._select = node
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
  handleBlur = (event) => {
    this.setState({ highlightedOptionId: null })
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.onBlur(event)
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
  handleInputChange = (event) => {
    const value = event.target.value
    const newOptions = this.filterOptions(value)

    // @ts-expect-error ts-migrate(6133) FIXME: 'state' is declared but its value is never read.
    this.setState((state) => ({
      inputValue: value,
      filteredOptions: newOptions,
      highlightedOptionId: newOptions.length > 0 ? newOptions[0].id : null,
      isShowingOptions: true
    }))

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'isShowingOptions' does not exist on type... Remove this comment to see the full error message
    if (!this.state.isShowingOptions) {
      // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
      this.props.onShowOptions(event)
    }
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
  handleShowOptions = (event) => {
    this.setState({ isShowingOptions: true })
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.onShowOptions(event)
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
  handleHideOptions = (event) => {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'selectedOptionId' does not exist on type... Remove this comment to see the full error message
    const { selectedOptionId } = this.state
    const option = this.getOption('id', selectedOptionId)
    let prevValue = ''

    if (this.props.defaultValue) {
      const date = DateTime.parse(
        this.props.defaultValue,
        this.locale(),
        this.timezone()
      )
      prevValue = date.format(this.props.format)
    }

    // @ts-expect-error ts-migrate(6133) FIXME: 'inputValue' is declared but its value is never re... Remove this comment to see the full error message
    this.setState(({ inputValue }) => ({
      isShowingOptions: false,
      highlightedOptionId: null,
      inputValue: selectedOptionId ? option.label : prevValue,
      filteredOptions: this.filterOptions(''),
      ...this.matchValue()
    }))
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.onHideOptions(event)
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
  handleHighlightOption = (event, { id }) => {
    if (id === this._emptyOptionId) return
    const { type } = event
    const option = this.getOption('id', id).label

    this.setState((state) => ({
      highlightedOptionId: id,
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'inputValue' does not exist on type 'Read... Remove this comment to see the full error message
      inputValue: type === 'keydown' ? option : state.inputValue
    }))
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
  handleSelectOption = (event, { id }) => {
    if (id === this._emptyOptionId) {
      this.setState({ isShowingOptions: false })
      return
    }
    const option = this.getOption('id', id)

    if (this.isControlled) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'selectedOptionId' does not exist on type... Remove this comment to see the full error message
      const prev = this.getOption('id', this.state.selectedOptionId)
      this.setState({
        isShowingOptions: false,
        inputValue: prev ? prev.label : '',
        filteredOptions: this.filterOptions('')
      })
    } else {
      this.setState({
        isShowingOptions: false,
        selectedOptionId: id,
        inputValue: option.label,
        filteredOptions: this.filterOptions('')
      })
    }

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'selectedOptionId' does not exist on type... Remove this comment to see the full error message
    if (id !== this.state.selectedOptionId) {
      // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
      this.props.onChange(event, { value: option.value })
    }
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.onHideOptions(event)
  }

  renderOptions() {
    const {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'filteredOptions' does not exist on type ... Remove this comment to see the full error message
      filteredOptions,
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'highlightedOptionId' does not exist on t... Remove this comment to see the full error message
      highlightedOptionId,
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'selectedOptionId' does not exist on type... Remove this comment to see the full error message
      selectedOptionId
    } = this.state

    if (filteredOptions.length < 1) {
      return this.renderEmptyOption()
    }

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'option' implicitly has an 'any' type.
    return filteredOptions.map((option) => {
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

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'inputValue' does not exist on type 'Read... Remove this comment to see the full error message
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
