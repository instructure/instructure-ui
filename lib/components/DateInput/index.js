import React, { Component } from 'react'
import PropTypes from 'prop-types'
import keycode from 'keycode'

import themeable from '../../themeable'
import { pickProps, omitProps } from '../../util/passthroughProps'
import warning from '../../util/warning'
import CustomPropTypes from '../../util/CustomPropTypes'
import isActiveElement from '../../util/dom/isActiveElement'
import createChainedFunction from '../../util/createChainedFunction'

import DatePicker from '../DatePicker'
import Popover, { PopoverTrigger, PopoverContent } from '../Popover'
import TextInput from '../TextInput'

import styles from './styles.css'
import theme from './theme'

import { browserTimeZone, now, parseMoment } from '../../util/time'
import Locale from '../../util/locale'

const defaultTimeZone = browserTimeZone()
const defaultLocale = Locale.browserLocale()

/**
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
  />
  ```

  A controlled (required) DateInput:

  ```js_example
  class Example extends React.Component {
    constructor (props) {
      super(props)

      this.state = {
        isoDate: undefined,
        messages: []
      }
    }

    onInputChange = (e) => {
      this.setState({ messages: [] })
    };

    onDateChange = (e, dateObj, rawValue, rawConversionFailed) => {
      const messages = []

      if (!rawValue) {
        this.setState({
          messages: [{
            type: 'error',
            text: 'Date field is required.'
          }]
        })
      } else {
        this.setState({ messages: [], isoDate: dateObj.format() })
      }
    };

    onInputBlur = (e) => {
      const messages = []

      if (!e.target.value) {
        messages.push({
          type: 'error',
          text: 'Date field is required.'
        })
      }

      this.setState({ messages })
    };

    randomMonth = () => {
      let m = Math.floor(Math.random() * 12)
      const newDate = new Date(this.state.isoDate || Date.now())
      newDate.setMonth(m)
      this.setState({ isoDate: newDate.toISOString(), messages: [] })
    }

    render () {
      return (
        <FormFieldGroup description={<ScreenReaderContent>DateInput Example</ScreenReaderContent>}>
          <Button margin="small" onClick={this.randomMonth}>Random Month</Button>
          <DateInput
            label="Date"
            placeholder="Pick a date"
            previousLabel="previous month"
            messages={this.state.messages}
            nextLabel="next month"
            placement='bottom center'
            onDateChange={this.onDateChange}
            onChange={this.onInputChange}
            onBlur={this.onInputBlur}
            dateValue={this.state.isoDate}
            required
          />
        </FormFieldGroup>
      )
    }
  }

  <Example />
  ```

  DateInput passes most properties through to the underlying [TextInput](#TextInput).
  It does not pass through `type`, `defaultValue`, or `value`.

  When the DatePicker value changes, the new date is displayed in the TextInput
  according to the specified format.

  As characters are typed into the TextInput, the DateInput attempts to parse
  the string according to the specified locale. The results are passed to the
  TextInput as a success for fail message. When successful, typing `ENTER` will replace
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
    invalidDateMessage: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func
    ]),
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

    inputRef: PropTypes.func,

    /**
      An ISO 8601 formatted string. Defaults to the current date.
    **/
    todayValue: CustomPropTypes.iso8601,

    size: PropTypes.oneOf(['small', 'medium', 'large']),
    layout: PropTypes.oneOf(['stacked', 'inline']),
    width: PropTypes.string,
    inline: PropTypes.bool,
    /**
    * Html placeholder text to display when the input has no value. This should be hint text, not a label
    * replacement.
    */
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    required: PropTypes.bool
  }

  static defaultProps = {
    placement: 'bottom center',
    messages: [],
    format: 'LL',
    validationFeedback: true,
    locale: undefined,
    timezone: undefined,
    defaultDateValue: undefined,
    onDateChange: (e, dateObj, rawValue, rawConversionFailed) => {},
    dateValue: undefined,
    datePickerRef: el => {},
    inputRef: el => {},
    invalidDateMessage: (textInputValue) => {},
    required: false,
    placeholder: undefined,
    todayValue: undefined,
    width: undefined,
    inline: false,
    size: 'medium',
    disabled: false,
    layout: 'stacked'
  }

  static contextTypes = {
    locale: PropTypes.string,
    timezone: PropTypes.string
  }

  constructor (props, context) {
    super(props, context)

    const initialDateValue = props.dateValue || props.defaultDateValue || undefined
    const locale = this._locale(props, context)
    const timezone = this._timezone(props, context)
    const parsedDate = this._parseDate(initialDateValue, locale, timezone)

    this.state = {
      showCalendar: false,
      ...this.computeState(initialDateValue, parsedDate, props)
    }

    this._input = undefined
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.dateValue !== nextProps.dateValue) {
      this.setState((state, props) => {
        return this.computeState(
          nextProps.dateValue,
          this.parseDate(nextProps.dateValue),
          nextProps,
          state
        )
      })
    }
  }

  /**
  * focus the input element
  */
  focus () {
    this._input.focus()
  }

  get hasMessages () {
    return this.messages && (this.messages.length > 0)
  }

  get invalid () {
    return this.messages && this.messages.findIndex((message) => { return message.type === 'error' }) >= 0
  }

  get focused () {
    return isActiveElement(this._input)
  }

  get value () {
    return this._input.value
  }

  get calendarSelectedValue () {
    const { acceptedValue } = this.state

    let value = acceptedValue ? this.parseDate(acceptedValue) : undefined

    if (!value || !value.isValid()) {
      value = now(this.locale, this.timezone)
    }

    return value
      .hour(0)
      .minute(0)
      .second(0)
      .millisecond(0)
      .format()
  }

  get locale () {
    return this._locale(this.props, this.context)
  }

  get timezone () {
    return this._timezone(this.props, this.context)
  }

  get messages () {
    if (!this.props.validationFeedback || !this.state.textInputValue) {
      return this.props.messages
    }

    const messages = []
    const parsedDate = this.parseDate(this.state.textInputValue)

    if (parsedDate.isValid()) {
      messages.push({
        text: parsedDate.format(this.props.format),
        type: 'success'
      })
    } else {
      let { invalidDateMessage } = this.props
      if (typeof invalidDateMessage === 'function') {
        invalidDateMessage = invalidDateMessage(this.state.textInputValue)
      }

      messages.push({
        text: invalidDateMessage || parsedDate.format(this.props.format),
        type: 'error'
      })
    }

    return messages.concat(this.props.messages)
  }

  textInputRef = node => {
    this._input = node
    if (node) {
      this.props.inputRef(node)
    }
  }

  handleTextInputChange = event => {
    // because we're controlling the TextInput
    this.setState({ textInputValue: event.target.value, showCalendar: false })
  }

  handleTextInputKeyDown = event => {
    if (event.keyCode === keycode.codes.enter) {
      event.preventDefault() // prevent form submission
      this.acceptValue(event)
    }
  }

  handleTextInputClick = event => {
    // accept the current value first so the calendar shows the correct selected date
    this.acceptValue(event)
    this.showCalendar()
  }

  handleTextInputBlur = event => {
    // when focus leaves the textInput field, replace its text with the properly formatted
    // string for the date. This is handy because once the user types "Nov", we will parse that
    // into November 1st of the current year.
    this.acceptValue(event)
  }

  handleCalendarSelect = (event, newValue) => {
    const parsedDate = this.parseDate(newValue)

    warning(parsedDate.isValid(), `[DateInput] Unexpected date format received from DatePicker: ${newValue}`)

    this.acceptValue(event, newValue)

    if (parsedDate.isValid()) {
      this.hideCalendar()
    }
  }

  handleCalendarDismiss = () => {
    this.hideCalendar()
  }

  toggleCalendar (showCalendar) {
    this.setState({ showCalendar })
  }

  showCalendar () {
    this.toggleCalendar(true)
  }

  hideCalendar () {
    this.toggleCalendar(false)
  }

  acceptValue (event, dateStr) {
    const rawAcceptedValue = dateStr || event.target.value

    this.setState((state, props) => {
      const parsedDate = this.parseDate(rawAcceptedValue)
        .hour(state.hour)
        .minute(state.minute)
        .second(state.second)
        .millisecond(state.millisecond)

      const newState = this.computeState(rawAcceptedValue, parsedDate, props, state)

      if ((newState.acceptedValue !== state.acceptedValue) && (typeof this.props.onDateChange === 'function')) {
        this.props.onDateChange(
          event,
          parsedDate.isValid() ? parsedDate : null,
          rawAcceptedValue,
          !newState.isValidOrEmpty
        )
      }

      return newState
    })
  }

  _parseDate (dateStr, locale, timezone) {
    return parseMoment(dateStr, locale, timezone)
  }

  _timezone (props, context) {
    return props.timezone || context.timezone || defaultTimeZone
  }

  _locale (props, context) {
    return props.locale || context.locale || defaultLocale
  }

  parseDate (dateStr) {
    return this._parseDate(dateStr, this.locale, this.timezone)
  }

  computeState (rawValue, parsedDate, props, state) {
    if (parsedDate.isValid()) {
      return {
        isValidOrEmpty: true,
        acceptedValue: parsedDate.format(),
        textInputValue: parsedDate.format(props.format),
        hour: parsedDate.hour(),
        minute: parsedDate.minute(),
        second: parsedDate.second(),
        millisecond: parsedDate.millisecond()
      }
    } else {
      return {
        isValidOrEmpty: !rawValue,
        acceptedValue: undefined,
        textInputValue: state ? state.textInputValue : '',
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0
      }
    }
  }

  render () {
    const ignoredProps = [
      'type',
      'messages',
      'defaultValue',
      'value'
    ]
    const textInputProps = pickProps(this.props, omitProps(TextInput.propTypes, {}, ignoredProps))
    const { onChange, onKeyDown, onClick, onBlur } = this.props // eslint-disable-line react/prop-types

    return (
      <span>
        <TextInput
          {...textInputProps}
          value={this.state.textInputValue}
          messages={this.messages}
          onChange={createChainedFunction(onChange, this.handleTextInputChange)}
          onKeyDown={createChainedFunction(onKeyDown, this.handleTextInputKeyDown)}
          onClick={createChainedFunction(onClick, this.handleTextInputClick)}
          onBlur={createChainedFunction(onBlur, this.handleTextInputBlur)}
          inputRef={this.textInputRef}
        />
        <Popover
          placement={this.props.placement}
          show={this.state.showCalendar}
          onDismiss={this.handleCalendarDismiss}
          positionTarget={this._input}
        >
          <PopoverContent>
            <DatePicker
              todayValue={this.props.todayValue}
              previousLabel={this.props.previousLabel}
              nextLabel={this.props.nextLabel}
              selectedValue={this.calendarSelectedValue}
              locale={this.locale}
              timezone={this.timezone}
              onSelectedChange={this.handleCalendarSelect}
              ref={this.props.datePickerRef}
            />
          </PopoverContent>
        </Popover>
      </span>
    )
  }
}
