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

import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'
import Decimal from '@instructure/ui-i18n/lib/Decimal'
import FormPropTypes from '@instructure/ui-form-field/lib/utils/FormPropTypes'
import Locale from '@instructure/ui-i18n/lib/Locale'
import NumberInputControlled from '@instructure/ui-number-input'
import deepEqual from '@instructure/ui-utils/lib/deepEqual'
import deprecated, { changedPackageWarning } from '@instructure/ui-utils/lib/react/deprecated'
import isActiveElement from '@instructure/ui-utils/lib/dom/isActiveElement'

/**
---
category: components
---
**/
class NumberInput extends Component {
  static propTypes = {
    label: PropTypes.node.isRequired,
    id: PropTypes.string,
    showArrows: PropTypes.bool,
    step: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /**
     * Specify the number of digits to display after the decimal separator. If
     * the input has more digits after the decimal separator, it will be
     * rounded on blur. If it has less, trailing zeros will be added on blur.
     *
     * Pass either decimalPrecision or significantDigits, not both.
     */
    decimalPrecision: CustomPropTypes.xor(PropTypes.number, 'significantDigits'),
    /**
     * Specify the number of significant digits. If the input has more
     * significant digits, it will be rounded on blur. If it has less, traling
     * zeros will be added on blur.
     *
     * Pass either decimalPrecision or significantDigits, not both.
     */
    significantDigits: CustomPropTypes.xor(PropTypes.number, 'decimalPrecision'),
    /**
    * object with shape: `{
    * text: PropTypes.string,
    * type: PropTypes.oneOf(['error', 'hint', 'success', 'screenreader-only'])
    *   }`
    */
    messages: PropTypes.arrayOf(FormPropTypes.message),
    /**
      A standard language id
    **/
    locale: PropTypes.string,
    size: PropTypes.oneOf(['medium', 'large']),
    layout: PropTypes.oneOf(['stacked', 'inline']),
    width: PropTypes.string,
    inline: PropTypes.bool,
    /**
    * Html placeholder text to display when the input has no value. This should be hint text, not a label
    * replacement.
    */
    placeholder: PropTypes.string,
    /**
     * Whether or not to disable the input
     */
    disabled: PropTypes.bool,
    /**
     * Works just like disabled but keeps the same styles as if it were active
     */
    readOnly: PropTypes.bool,
    required: PropTypes.bool,
    /**
    * a function that provides a reference to the actual input element
    */
    inputRef: PropTypes.func,
    /**
    * value to set on initial render
    */
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /**
    * The selected value (must be accompanied by an `onChange` prop). If this
    * is a number, it will be formatted according to the current locale. If a
    * string is given, it should already be in the correct format for the
    * current locale.
    */
    value: CustomPropTypes.controllable(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    ),
    /**
    * Called whenever the value of the input changes. The second argument is
    * the string value of the input; the third argument is a normalized string
    * value obtained by parsing the input string according to the current
    * locale, removing thousands separators, using the period `.` as decimal
    * separator, and rounding to the specified precision. This third argument
    * is `null` if the input value cannot be parsed.
    *
    * `onChange` is called on blur, as the value is formatted when the
    * component loses focus. In this case, `onChange` is always called *before*
    * `onBlur`.
    */
    onChange: PropTypes.func,
    onKeyDown: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func
  }

  static contextTypes = {
    locale: PropTypes.string
  }

  static defaultProps = {
    showArrows: true,
    step: 1,
    min: null,
    max: null,
    inline: false,
    size: 'medium',
    messages: [],
    disabled: false,
    readOnly: false,
    layout: 'stacked',
    inputRef: function (input) {},
    onChange: function (event, value, normalizedValue) {},
    onKeyDown: function (event) {},
    onFocus: function (event) {},
    onBlur: function (event) {}
  }

  state = {
    value: this.defaultValue || ''
  }

  _input = null

  componentWillReceiveProps (nextProps, nextContext) {
    if (!this._input.value) return

    // If the locale or precision props change, update the input value accordingly
    const currentLocale = this.getLocale(this.props, this.context)
    const nextLocale = this.getLocale(nextProps, nextContext)
    const currentPrecision = this.getPrecision(this.props)
    const nextPrecision = this.getPrecision(nextProps)
    if (currentLocale === nextLocale && deepEqual(currentPrecision, nextPrecision)) return

    const decimalValue = Decimal.parse(this._input.value, currentLocale)
    if (decimalValue.isNaN()) return

    const formattedString = this.formatValue(decimalValue, nextLocale, nextPrecision)
    this.setState({ value: formattedString })
    nextProps.onChange(null, formattedString, this.normalizeValue(decimalValue, nextPrecision))
  }

  // Replicate the arrow behavior commonly seen in inputs of type number
  applyStep = (dir) => {
    let d = Decimal.parse(this._input.value || '0', this.locale)
    if (this.step.isNaN()) return d

    if (!d.mod(this.step).equals(0)) {
      // case when value is between steps, so we snap to the next step
      const steps = d.div(this.step)

      if (dir > 0) {
        d = steps.floor().times(this.step)
      } else {
        d = steps.ceil().times(this.step)
      }
    }

    // then we add the step
    if (dir > 0) {
      d = d.plus(this.step)
    } else {
      d = d.minus(this.step)
    }

    // case when value is less than minimum
    if (d.lt(this.min)) {
      return this.min
    }

    // case when value is more than maximum
    if (d.gt(this.max)) {
      return this.max
    }

    return d
  }

  focus () {
    this._input.focus()
  }

  getLocale (props, context) {
    return props.locale || context.locale || Locale.browserLocale()
  }

  // Return the current precision, either from props if given, or from the
  // input value itself
  getPrecision (props) {
    const { decimalPrecision, significantDigits } = props
    if (decimalPrecision != null) return { decimalPrecision }
    if (significantDigits != null) return { significantDigits }

    if (this._input) {
      const precisionFromInput = this.getDecimals(this._input.value).length
      if (precisionFromInput > 0) return { decimalPrecision: precisionFromInput }
    }

    return {}
  }

  // Return the portion of the given string that follows the decimal separator
  getDecimals (string, locale = this.locale) {
    const { decimal } = Decimal.getDelimiters(locale)
    const match = string.match(new RegExp(`\\${decimal}(\\d+?)$`))
    return match ? match[1] : ''
  }

  getDecimalFromNormalizedString (value) {
    // For some reason Decimal.parse treats null as 0, so we have to check for it here
    return Decimal.parse(value === null ? NaN : value, Locale.defaultLocale)
  }

  get min () {
    return this.getDecimalFromNormalizedString(this.props.min)
  }

  get max () {
    return this.getDecimalFromNormalizedString(this.props.max)
  }

  get step () {
    return this.getDecimalFromNormalizedString(this.props.step)
  }

  get defaultValue () {
    const { defaultValue } = this.props

    // If defaultValue is a string, parse it as an en-US number
    const decimalValue = this.getDecimalFromNormalizedString(defaultValue)

    // If it can be parsed as a number, format it according to the current
    // locale. Otherwise just return it as-is
    return decimalValue.isNaN() ? defaultValue : this.formatValue(decimalValue, this.locale)
  }

  get locale () {
    return this.getLocale(this.props, this.context)
  }

  get precision () {
    return this.getPrecision(this.props)
  }

  get invalid () {
    return (
      this.props.messages &&
      this.props.messages.findIndex((message) => message.type === 'error') >= 0
    )
  }

  get id () {
    return this.props.id || this._defaultId
  }

  get focused () {
    return isActiveElement(this._input)
  }

  getDecimalValue (value) {
    return Decimal.parse(value, this.locale)
  }

  get value () {
    return this._input.value
  }

  isControlled () {
    return typeof this.props.value !== 'undefined'
  }

  shouldFormatValueOnRender () {
    return this.isControlled() && typeof this.props.value === 'number' || this.props.value instanceof Number
  }

  conditionalFormat (value) {
    return this.shouldFormatValueOnRender()
      ? this.formatValue(this.getDecimalValue(value), this.locale)
      : value
  }

  formatValue (decimal, locale, precision = this.precision) {
    const { decimalPrecision, significantDigits } = precision
    if (parseInt(decimalPrecision) >= 0) return decimal.toFixed(decimalPrecision, locale)
    if (parseInt(significantDigits) >= 1) return decimal.toPrecision(significantDigits, locale)
    return locale ? decimal.toLocaleString(locale) : decimal.toString()
  }

  normalizeValue (decimal, precision = this.precision) {
    if (decimal.isNaN()) return null
    let value = decimal
    if (value.lt(this.min)) value = this.min
    if (value.gt(this.max)) value = this.max
    return this.formatValue(value, void 0, precision)
  }

  handleRef = (element, ...args) => {
    this._input = element
    this.props.inputRef.apply(this, [element].concat(args))
  }

  handleBlur = (event) => {
    let decimalValue = this.getDecimalValue(event.target.value)

    // case when value is less than minimum
    if (decimalValue.lt(this.min)) {
      decimalValue = this.min
    }

    // case when value is more than maximum
    if (decimalValue.gt(this.max)) {
      decimalValue = this.max
    }

    const formattedString = decimalValue.isNaN()
      ? this._input.value
      : this.formatValue(decimalValue, this.locale)
    if (!this.isControlled()) {
      this.setState({ value: formattedString })
    }

    this.props.onChange(event, formattedString, this.normalizeValue(decimalValue))
    this.props.onBlur(event)
  }

  handleChange = (event, value) => {
    const decimalValue = this.getDecimalValue(value)
    this.props.onChange(event, value, this.normalizeValue(decimalValue))
    if (!this.isControlled()) {
      this.setState({ value })
    }
  }

  handleIncrement = (event) => {
    this.handleStep(event, 1)
  }

  handleDecrement = (event) => {
    this.handleStep(event, -1)
  }

  handleStep (event, step) {
    if (this.props.disabled || this.props.readOnly) return

    const decimalValue = this.applyStep(step)
    if (!decimalValue.isNaN()) {
      const formattedString = decimalValue.toLocaleString(this.locale)
      if (!this.isControlled()) {
        this.setState({ value: formattedString })
      }
      this.props.onChange(event, formattedString, this.normalizeValue(decimalValue))
    }
  }

  render () {
    const {
      disabled,
      id,
      inline,
      label,
      layout,
      messages,
      onFocus,
      onKeyDown,
      placeholder,
      readOnly,
      required,
      showArrows,
      size,
      value,
      width
    } = this.props

    return (
      <NumberInputControlled
        disabled={disabled}
        id={id}
        inline={inline}
        inputRef={this.handleRef}
        label={label}
        layout={layout}
        messages={messages}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onDecrement={this.handleDecrement}
        onFocus={onFocus}
        onIncrement={this.handleIncrement}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        readOnly={readOnly}
        required={required}
        showArrows={showArrows}
        size={size}
        value={this.conditionalFormat(value || this.state.value)}
        width={width}
      />
    )
  }
}

export default deprecated('5.35.0', null, changedPackageWarning(
  'ui-forms',
  'ui-number-input'
))(NumberInput)
