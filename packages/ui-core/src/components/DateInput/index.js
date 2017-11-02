import React, { Component } from 'react'
import PropTypes from 'prop-types'

import themeable from '@instructure/ui-themeable'
import { pickProps, omitProps } from '@instructure/ui-utils/lib/react/passthroughProps'
import warning from '@instructure/ui-utils/lib/warning'
import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'
import DateTime from '@instructure/ui-utils/lib/i18n/DateTime'
import Locale from '@instructure/ui-utils/lib/i18n/Locale'

import DatePicker from '../DatePicker'
import Popover, { PopoverTrigger, PopoverContent } from '../Popover'
import TextInput from '../TextInput'

import styles from './styles.css'
import theme from './theme'

/**
---
category: components/forms
---
  A DateInput component is used to input a date either with a
  [DatePicker](#DatePicker) in a popup, or by typing a date into a
  [TextInput](#TextInput).

  ```jsx_example
  <DateInput
    previousLabel="previous month"
    nextLabel="next month"
    placeholder="Choose"
    label="Birthday"
    onDateChange={function () { console.log(arguments) }}
    invalidDateMessage="Invalid date: Birthday"
  />
  ```

  DateInput passes most properties through to the underlying [TextInput](#TextInput).
  It does not pass through `type`, `messages`, `defaultValue`, `value`, `onChange`, or
  `onKeyDown`.

  When the DatePicker value changes the new date is displayed in the TextInput
  according to the specified format.

  As characters are typed into the TextInput, the DateInput attempts to parse
  the string according to the specified locale. The results are passed to the
  TextInput as a success for fail message. When successful, enter will replace
  the TextInput value with the formatted date.

**/
@themeable(theme, styles)
export default class DateInput extends Component {
  static propTypes = {
    /**
      The label to put on the previous month button of the calendar.
    **/
    previousLabel: PropTypes.string.isRequired,
    /**
      The label to put on the next month button of the calendar.
    **/
    nextLabel: PropTypes.string.isRequired,
    /**
     * The message that's used when the data is invalid.
     */
    invalidDateMessage:PropTypes.string,
    /**
     * Where the calendar popover should be placed.
     */
    placement: CustomPropTypes.placement,
    /**
      This display to show in the input when a date is selected.
      Valid formats are compatible with
      [moment.js formats](https://momentjs.com/docs/#/displaying/format/),
      including localized formats.
    **/
    format: PropTypes.string, // display format
    /**
    * object with shape: `{
    * text: PropTypes.string,
    * type: PropTypes.oneOf(['error', 'hint', 'success', 'screenreader-only'])
    *   }`
    */
    messages: PropTypes.arrayOf(CustomPropTypes.message),
    /**
      A standard language id
    **/
    locale: PropTypes.string,
    /**
      A timezone identifier in the format: Area/Location
    **/
    timezone: PropTypes.string,

    /**
      An ISO 8601 formatted string. The initial date value to display on render.
      It should only be used when using this component as an uncontrolled input.
    **/
    defaultDateValue: CustomPropTypes.iso8601,

    /**
      Called when the date value of the input has changed.
      The parameters are the triggering event, new date value in ISO 8601 format,
      the raw user input, and if the conversion from raw to a date was succesful.
    **/
    onDateChange: PropTypes.func,

    /**
    * the selected value (must be accompanied by an `onDateChange` prop)
    */
    dateValue: CustomPropTypes.controllable(CustomPropTypes.iso8601, 'onDateChange', 'defaultDateValue'),

    /**
      Whether to display validation feedback while typing.
    **/
    validationFeedback: PropTypes.bool,

    datePickerRef: PropTypes.func,

    inputRef: PropTypes.func
  }

  static defaultProps = {
    placement: 'bottom center',
    messages: [],
    format: 'LL',
    validationFeedback: true,
    locale: undefined,
    timezone: undefined,
    defaultDateValue: undefined,
    onDateChange: (e, formattedValue, rawValue, rawConversionFailed) => {},
    dateValue: undefined,
    datePickerRef: (el) => {},
    inputRef: (el) => {},
    invalidDateMessage: undefined
  }

  static contextTypes = {
    locale: PropTypes.string,
    timezone: PropTypes.string
  }

  constructor (props, context) {
    super(props, context)

    this.state = Object.assign(
      {
        showPopover: false,
        messages: [],
        hasInputRef: false
      },
      this.computeDateRelatedStateValues(props)
    )
    this._input = null
  }

  componentWillReceiveProps (nextProps) {
    this.setState(this.computeDateRelatedStateValues(nextProps))
  }

  locale (props) {
    return props.locale || this.context.locale || Locale.browserLocale()
  }

  timezone (props) {
    return props.timezone || this.context.timezone || DateTime.browserTimeZone()
  }

  computeDateRelatedStateValues (props) {
    const defaultDateValue = props.dateValue === undefined ? props.defaultDateValue : props.dateValue
    let textInputValue
    let parsedDate
    if (defaultDateValue) {
      parsedDate = DateTime.parse(defaultDateValue, this.locale(props), this.timezone(props))
      textInputValue = parsedDate.format(props.format)
    } else {
      textInputValue = ''
      parsedDate = DateTime.parse(textInputValue, this.locale(props), this.timezone(props))
    }

    return {
      textInputValue,
      parsedDate
    }
  }

  getCurrentDate () {
    return this.state.parsedDate.format()
  }

  handleInputRef = node => {
    this._input = node
    this.props.inputRef(node)

    // Once we get the input ref, we need to trigger a rerender so
    // it can be passed to the positionTarget element for Popover
    if (!this.state.hasInputRef) {
      this.setState({ hasInputRef: true })
    }
  }

  handlePopoverToggle = showPopoverValue => {
    this.setState({ showPopover: showPopoverValue })
  }

  handleTextInputChange = e => {
    const oldMoment = this.state.parsedDate
    const newTextValue = e.target.value
    const newParsedDate = DateTime.parse(newTextValue, this.locale(this.props), this.timezone(this.props))
    const rawConversionFailed = newTextValue !== '' && !newParsedDate.isValid()
    const newMessages = []
    if (newTextValue !== '' && this.props.validationFeedback) {
      if (newParsedDate.isValid()) {
        newMessages.push({
          text: newParsedDate.format(this.props.format),
          type: 'success'
        })
      } else {
        newMessages.push({
          text: this.props.invalidDateMessage || newParsedDate.format(this.props.format),
          type: 'error'
        })
      }
    }
    this.setState({
      showPopover: false,
      textInputValue: newTextValue,
      parsedDate: newParsedDate,
      messages: newMessages
    })

    this.fireOnChange(e, newParsedDate, newTextValue, rawConversionFailed)
  }

  handleTextInputKeyDown = e => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (this.state.parsedDate.isValid()) {
        this.setState({
          showPopover: false,
          textInputValue: this.state.parsedDate.format(this.props.format),
          messages: []
        })
      }
    }
  }

  handleDatePickerChange = (e, newValue) => {
    const newDate = DateTime.parse(newValue, this.locale(this.props), this.timezone(this.props))

    warning(newDate.isValid(), `[DateInput] Unexpected date format received from DatePicker: ${newValue}`)

    const textInputValue = newDate.format(this.props.format)
    this.setState({
      showPopover: false,
      textInputValue,
      parsedDate: newDate,
      messages: []
    })
    this.fireOnChange(e, newDate, textInputValue, !newDate.isValid())
  }

  fireOnChange (e, newMoment, rawValue, rawConversionFailed) {
    if (typeof this.props.onDateChange === 'function') {
      const moment = newMoment.isValid() ? newMoment.format() : null
      this.props.onDateChange(e, moment, rawValue, rawConversionFailed)
    }
  }

  render () {
    const ignoredProps = ['type', 'messages', 'defaultValue', 'value', 'onChange', 'onKeyDown']
    const textInputProps = pickProps(this.props, omitProps(TextInput.propTypes, {}, ignoredProps))

    let datePickerMoment = this.state.parsedDate
    if (!datePickerMoment.isValid()) {
      datePickerMoment = DateTime.now(this.locale(this.props), this.timezone(this.props))
        .hour(0)
        .minute(0)
        .second(0)
        .millisecond(0)
    }

    return (
      <Popover
        on={['click']}
        placement={this.props.placement}
        show={this.state.showPopover}
        onToggle={this.handlePopoverToggle}
        positionTarget={this._input}
      >
        <PopoverTrigger>
          <TextInput
            {...textInputProps}
            value={this.state.textInputValue}
            messages={this.state.messages.concat(this.props.messages)}
            onChange={this.handleTextInputChange}
            onKeyDown={this.handleTextInputKeyDown}
            inputRef={this.handleInputRef}
          />
        </PopoverTrigger>
        <PopoverContent>
          <DatePicker
            previousLabel={this.props.previousLabel}
            nextLabel={this.props.nextLabel}
            selectedValue={datePickerMoment.format()}
            locale={this.locale(this.props)}
            timezone={this.timezone(this.props)}
            onSelectedChange={this.handleDatePickerChange}
            ref={this.props.datePickerRef}
          />
        </PopoverContent>
      </Popover>
    )
  }
}
