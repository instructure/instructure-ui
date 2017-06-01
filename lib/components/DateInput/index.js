import React, { Component } from 'react'
import PropTypes from 'prop-types'
import themeable from '../../themeable'
import { pickProps, omitProps } from '../../util/passthroughProps'

import DatePicker from '../DatePicker'
import Popover, { PopoverTrigger, PopoverContent } from '../Popover'
import TextInput from '../TextInput'
import CustomPropTypes from '../../util/CustomPropTypes'

import styles from './styles.css'
import theme from './theme.js'

import {browserTimeZone, now, parseMoment} from '../../util/time'
import Locale from '../../util/locale'

/**
  A DateInput component is used to input a date either with a
  [DatePicker](#DatePicker) in a popup, or by typing a date into a
  [TextInput](#TextInput).

  ```jsx_example
  <DateInput previousLabel="previous month" nextLabel="next month" placeholder="Choose" label="Birthday" />
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
    **/
    defaultDateValue: CustomPropTypes.iso8601,

    /**
      Called when the date value of the input has changed.
      The parameter is the new date value in ISO 8601 format.
    **/
    onDateChange: PropTypes.func,

    /**
      Whether to display validation feedback while typing.
    **/
    validationFeedback: PropTypes.bool,

    datePickerRef: PropTypes.func
  }

  static defaultProps = {
    placement: 'bottom center',
    messages: [],
    format: 'LL',
    validationFeedback: true
  }

  static contextTypes = {
    locale: PropTypes.string,
    timezone: PropTypes.string
  }

  constructor (props, context) {
    super(props, context)

    const defaultDateValue = this.props.defaultDateValue || ''
    const defaultMoment = parseMoment(defaultDateValue, this.locale(), this.timezone())
    let defaultTextValue = ''
    if (defaultMoment.isValid()) defaultTextValue = defaultMoment.format(this.props.format)

    this.state = {
      showPopover: false,
      messages: [],
      textInputValue: defaultTextValue
    }
    this.state.momentValue = parseMoment(this.state.textInputValue, this.locale(), this.timezone())
  }

  locale () {
    return this.props.locale || this.context.locale || Locale.browserLocale()
  }

  timezone () {
    return this.props.timezone || this.context.timezone || browserTimeZone()
  }

  getCurrentDate () {
    return this.state.momentValue.format()
  }

  handlePopoverToggle = (showPopoverValue) => {
    this.setState({showPopover: showPopoverValue})
  }

  handleTextInputChange = (e) => {
    const oldMoment = this.state.momentValue
    const newTextValue = e.target.value
    const newMoment = parseMoment(newTextValue, this.locale(), this.timezone())
    const newMessages = []
    if (newTextValue !== '' && this.props.validationFeedback) {
      newMessages.push({
        text: newMoment.format(this.props.format),
        type: newMoment.isValid() ? 'success' : 'error'
      })
    }
    this.setState({
      showPopover: false,
      textInputValue: newTextValue,
      momentValue: newMoment,
      messages: newMessages
    })

    if (!oldMoment.isSame(newMoment)) {
      this.fireOnChange(newMoment)
    }
  }

  handleTextInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (this.state.momentValue.isValid()) {
        this.setState({
          showPopover: false,
          textInputValue: this.state.momentValue.format(this.props.format),
          messages: []
        })
      }
    }
  }

  handleDatePickerChange = (newValue) => {
    const newMoment = parseMoment(newValue, this.locale(), this.timezone())
    if (!newMoment.isValid()) {
      throw new Error(`Unexpected date format received from DatePicker: ${newValue}`)
    }
    this.setState({
      showPopover: false,
      textInputValue: newMoment.format(this.props.format),
      momentValue: newMoment,
      messages: []
    })
    this.fireOnChange(newMoment)
  }

  fireOnChange (newMoment) {
    if (typeof this.props.onDateChange === 'function') {
      if (newMoment.isValid()) {
        this.props.onDateChange(newMoment.format())
      } else {
        this.props.onDateChange(null)
      }
    }
  }

  render () {
    const ignoredProps = ['type', 'messages', 'defaultValue', 'value', 'onChange', 'onKeyDown']
    const textInputProps = pickProps(this.props, omitProps(TextInput.propTypes, {}, ignoredProps))

    let datePickerMoment = this.state.momentValue
    if (!datePickerMoment.isValid()) datePickerMoment = now(this.locale(), this.timezone())
    return (
      <Popover
        on={['click']}
        placement={this.props.placement}
        show={this.state.showPopover}
        onToggle={this.handlePopoverToggle}>
        <PopoverTrigger>
          <TextInput
            {...textInputProps}
            value={this.state.textInputValue}
            messages={this.state.messages.concat(this.props.messages)}
            onChange={this.handleTextInputChange}
            onKeyDown={this.handleTextInputKeyDown} />
        </PopoverTrigger>
        <PopoverContent>
          <DatePicker
            previousLabel={this.props.previousLabel}
            nextLabel={this.props.nextLabel}
            selectedValue={datePickerMoment.format()}
            locale={this.locale()}
            timezone={this.timezone()}
            onSelectedChange={this.handleDatePickerChange}
            ref={this.props.datePickerRef} />
        </PopoverContent>
      </Popover>
    )
  }
}
