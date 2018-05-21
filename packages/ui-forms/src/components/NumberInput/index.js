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
import classnames from 'classnames'

import IconArrowOpenUp from '@instructure/ui-icons/lib/Line/IconArrowOpenUp'
import IconArrowOpenDown from '@instructure/ui-icons/lib/Line/IconArrowOpenDown'

import Locale from '@instructure/ui-i18n/lib/Locale'
import Decimal from '@instructure/ui-i18n/lib/Decimal'

import { pickProps, omitProps } from '@instructure/ui-utils/lib/react/passthroughProps'
import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'
import transformSelection from '@instructure/ui-utils/lib/dom/transformSelection'
import isActiveElement from '@instructure/ui-utils/lib/dom/isActiveElement'
import generateElementId from '@instructure/ui-utils/lib/dom/generateElementId'

import themeable from '@instructure/ui-themeable'

import styles from './styles.css'
import theme from './theme'

import FormPropTypes from '../../utils/FormPropTypes'
import FormField from '../FormField'

const keyDirections = {
  ArrowUp: 1,
  ArrowDown: -1
}

function noop () {}

/**
---
category: components/forms
---
**/
@themeable(theme, styles)
class NumberInput extends Component {
  static propTypes = {
    label: PropTypes.node.isRequired,
    id: PropTypes.string,
    showArrows: PropTypes.bool,
    step: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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
    * the selected value (must be accompanied by an `onChange` prop)
    */
    value: CustomPropTypes.controllable(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    ),
    /**
     * a boolean prop to control formatting a controlled NumberInput value prop to a normalized
     * and localized representation on each render cycle. Setting this prop to false is useful for
     * scenarios where the user should be allowed to type naturally prior to the value being formatted.
     */
    formatValueOnRender: PropTypes.bool,
    /**
    * the event may be of type blur under certain conditions
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
    step: '1',
    min: '',
    max: '',
    inline: false,
    size: 'medium',
    messages: [],
    disabled: false,
    readOnly: false,
    layout: 'stacked',
    inputRef: function (input) {},
    formatValueOnRender: true,
    onChange: function (event, numberAsString, parsedNumber) {},
    onKeyDown: function (event) {},
    onFocus: function (event) {},
    onBlur: function (event) {}
  }

  constructor (props) {
    super()
    this._defaultId = generateElementId('NumberInput')
  }

  _input = null

  state = {
    focus: false
  }

  componentWillReceiveProps (nextProps, nextContext) {
    const currentLocale = this.getLocale(this.props, this.context)
    const nextLocale = this.getLocale(nextProps, nextContext)
    let decimalValue

    if (currentLocale !== nextLocale) {
      decimalValue = Decimal.parse(this._input.value, currentLocale)
      this.updateInput((decimalValue.isNaN()) ? '' : decimalValue.toLocaleString(nextLocale))
    }

    // controlled
    if (nextProps.value !== this.props.value && typeof nextProps.value === 'number') {
      decimalValue = Decimal.parse(nextProps.value)
      this.updateInput((decimalValue.isNaN()) ? '' : decimalValue.toLocaleString(nextLocale))
    }
  }

  // Replicate the arrow behavior commonly seen in inputs of type number
  applyStep = (dir) => {
    const { min, max, step } = this.props

    let d = Decimal.parse(this._input.value || '0', this.locale)

    if (!d.mod(step).equals(0)) {
      // case when value is between steps, so we snap to the next step
      const steps = d.div(step)

      if (dir > 0) {
        d = steps.floor().times(step)
      } else {
        d = steps.ceil().times(step)
      }
    }

    // then we add the step
    if (dir > 0) {
      d = d.plus(step)
    } else {
      d = d.minus(step)
    }

    // case when value is less than minimum
    if (min && d.lt(min)) {
      return Decimal.parse(min)
    }

    // case when value is more than maximum
    if (max && d.gt(max)) {
      return Decimal.parse(max)
    }

    return d
  }

  focus () {
    this._input.focus()
  }

  getLocale = (props = {}, context = {}) => {
    return props.locale || context.locale || Locale.browserLocale()
  }

  get locale () {
    return this.props.locale || this.context.locale || Locale.browserLocale()
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

  getDecimalValue (value, locale) {
    return Decimal.parse(value, locale)
  }

  get value () {
    return this._input.value
  }

  conditionalFormat (value) {
    return value && this.props.formatValueOnRender
      ? Decimal.parse(value).toLocaleString(this.locale)
      : value
  }

  handleRef = (element, ...args) => {
    this._input = element
    this.props.inputRef.apply(this, [element].concat(args))
  }

  handleFocus = (event) => {
    this.setState(() => ({ focus: true }))
    this.props.onFocus(event)
  }

  handleBlur = (event) => {
    const { min, max } = this.props
    let decimalValue = this.getDecimalValue(event.target.value, this.locale)

    // case when value is less than minimum
    if (min && decimalValue.lt(min)) {
      decimalValue = Decimal.parse(min)
    }

    // case when value is more than maximum
    if (max && decimalValue.gt(max)) {
      decimalValue = Decimal.parse(max)
    }

    this._input.value = decimalValue.isNaN() ? '' : decimalValue.toLocaleString(this.locale)
    this.setState(() => ({ focus: false }))

    this.props.onBlur(event)
    this.props.onChange(event, decimalValue.toString(), decimalValue.toNumber())
  }

  handleChange = (event) => {
    const decimalValue = this.getDecimalValue(event.target.value, this.locale)
    this.props.onChange(event, decimalValue.toString(), decimalValue.toNumber())
  }

  updateInput = (value) => {
    const newSelection = transformSelection(this._input, value)
    this._input.value = value
    this._input.selectionStart = newSelection.selectionStart
    this._input.selectionEnd = newSelection.selectionEnd
    this._input.selectionDirection = newSelection.selectionDirection
  }

  handleKeyDown = (event) => {
    const dir = keyDirections[event.key]

    if (!this.props.disabled && !this.props.readOnly) {
      if (dir) {
        event.preventDefault()

        const decimalValue = this.applyStep(dir)

        this.updateInput((decimalValue.isNaN()) ? '' : decimalValue.toLocaleString(this.locale))

        this.props.onKeyDown(event)
        this.props.onChange(event, decimalValue.toString(), decimalValue.toNumber())
      } else {
        this.props.onKeyDown(event)
      }
    }
  }

  handleClickUp = (event) => {
    event.preventDefault()

    if (!this.props.disabled && !this.props.readOnly) {
      const decimalValue = this.applyStep(1)

      this._input.focus()
      this._input.value = (decimalValue.isNaN()) ? '' : decimalValue.toLocaleString(this.locale)

      this.props.onChange(event, decimalValue.toString(), decimalValue.toNumber())
    }
  }

  handleClickDown = (event) => {
    event.preventDefault()

    if (!this.props.disabled && !this.props.readOnly) {
      const decimalValue = this.applyStep(-1)

      this._input.focus()
      this._input.value = (decimalValue.isNaN()) ? '' : decimalValue.toLocaleString(this.locale)

      this.props.onChange(event, decimalValue.toString(), decimalValue.toNumber())
    }
  }

  renderArrows () {
    return (
      <span className={styles.arrowContainer}>
        <span
          className={styles.arrow}
          onClick={this.handleClickUp}
          onKeyDown={noop}
          role="presentation"
        >
          <IconArrowOpenUp />
        </span>
        <span
          className={styles.arrow}
          onClick={this.handleClickDown}
          onKeyDown={noop}
          role="presentation"
        >
          <IconArrowOpenDown />
        </span>
      </span>
    )
  }

  render () {
    const {
      size,
      showArrows,
      placeholder,
      value,
      disabled,
      readOnly,
      defaultValue,
      required,
      width,
      inline
    } = this.props

    return (
      <FormField
        {...pickProps(this.props, FormField.propTypes)}
        id={this.id}
      >
        <span
          className={classnames(styles.inputContainer, {
            [styles.invalid]: this.invalid,
            [styles.disabled]: disabled,
            [styles[size]]: size,
            [styles.focus]: this.state.focus,
            [styles.inline]: inline
          })}
          style={width ? { width } : null}
        >
          <input
            {...omitProps(this.props, NumberInput.propTypes)}
            className={styles.input}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            type="text"
            inputMode="numeric"
            value={this.conditionalFormat(value)}
            defaultValue={defaultValue ? Decimal.parse(defaultValue).toLocaleString(this.locale) : defaultValue}
            placeholder={placeholder}
            ref={this.handleRef}
            id={this.id}
            required={required}
            aria-required={required}
            aria-invalid={this.invalid ? 'true' : null}
            disabled={disabled || readOnly}
            aria-disabled={disabled || readOnly ? 'true' : null}
          />
          {showArrows ? this.renderArrows() : null}
        </span>
      </FormField>
    )
  }
}

export default NumberInput
