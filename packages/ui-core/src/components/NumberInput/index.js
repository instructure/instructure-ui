import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import nanoid from 'nanoid'
import Decimal from 'decimal.js'
import numeral from 'numeral'
import 'numeral/locales'

import IconArrowOpenUpLine from 'instructure-icons/lib/Line/IconArrowOpenUpLine'
import IconArrowOpenDownLine from 'instructure-icons/lib/Line/IconArrowOpenDownLine'

import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'
import themeable from '@instructure/ui-themeable'
import Locale from '@instructure/ui-utils/lib/i18n/Locale'
import isActiveElement from '@instructure/ui-utils/lib/dom/isActiveElement'
import { pickProps, omitProps } from '@instructure/ui-utils/lib/react/passthroughProps'
import transformSelection from '@instructure/ui-utils/lib/dom/transformSelection'

import styles from './styles.css'
import theme from './theme'

import FormField from '../FormField'

// Decimal configuration
Decimal.set({
  /**
  * The maximum number of significant digits of the result of an operation.
  */
  precision: 100,
  /**
  * The positive exponent value at and above which toString returns scientific notation.
  */
  toExpPos: 100
})

const keyDirections = {
  ArrowUp: 1,
  ArrowDown: -1
}

function noop () {}

// Accepts a string locale and returns a string representing the decimal
// delimiter that is used by that locale, or '.' if the locale is not recognized.
function decimalDelimiter (locale) {
  const localeData = locale && numeral.locales[locale.toLowerCase()]
  if (!localeData) {
    // default to using '.' as the delimiter if no locale is set or if
    // there is no Numeral locale file for the currently set locale.
    return '.'
  }

  return localeData.delimiters.decimal
}

// Accepts three strings (a string to search, a character to be replaced, and a
// character to use as the replacement) and returns a string with every instance
// of 'char' replaced with 'replaceWith'.
function replaceChar (string, char, replaceWith) {
  return string.replace(new RegExp(`\\${char}`, 'g'), replaceWith)
}

// Accepts a number and a string locale and returns a string representing the
// number in the specified locale.
function formatNumberForLocale (number, locale) {
  const delimiter = decimalDelimiter(locale)
  return replaceChar(number.toString(), '.', delimiter)
}

export function cleanValue (value, locale, allowNegative = true) {
  const delimiter = decimalDelimiter(locale)
  // Remove everything that is not numbers, delimiter nor '-'
  const alphaRemoval = value.replace(new RegExp(`[^\\d\\-\\${delimiter}]`, 'g'), '')
  const isNegative = allowNegative && alphaRemoval[0] === '-'

  // Remove all '-'s
  let minusRemoval = replaceChar(alphaRemoval, '-', '')

  // Re-add one '-' if appropriate
  if (isNegative) {
    minusRemoval = `-${minusRemoval}`
  }

  // If there is no delimiter, return the cleaned string
  const delimiterIndex = minusRemoval.indexOf(delimiter)
  if (delimiterIndex === -1) {
    return minusRemoval
  }

  // If there are one or more delimiters, only keep the first one
  const [head, tail] = minusRemoval.split(new RegExp(`\\${delimiter}(.*)`), 2)
  return head + delimiter + replaceChar(tail, delimiter, '')
}

/**
---
category: components/forms
---
  A standard number input field with placeholder

  ```jsx_example
  <NumberInput label="Age" placeholder="Your age goes here" />
  ```

  A number input field with minimum set to 30

  ```jsx_example
  <NumberInput label="Monitor refresh rate" min="30" />
  ```

  A number input field with minimum and maximum

  ```jsx_example
  <NumberInput
    label="Two digit number or less, divisible by 7"
    min="-98"
    max="98"
    step="7"
  />
  ```

  A controlled number input

  ```jsx_example
  ---
  render: false
  ---
  class Example extends React.Component {
    state = {
      number: '0.1'
    };

    handleChange = (event, number) => this.setState({ number });

    render () {
      return (
        <div>
          <NumberInput
            {...this.props}
            value={this.state.number}
            onChange={this.handleChange}
          />
          <br />
          <Button onClick={() => this.handleChange({}, '5')}>
            Let's go with 5
          </Button>
        </div>
      )
    }
  }

  render(<Example label="Battery capacity in Amp-hrs" step="0.1" min="0.1" />)
  ```

  A number input field with step set to 0.1

  ```jsx_example
  <NumberInput label="Battery capacity in Amp-hrs" step="0.1" min="0.1" />
  ```

  The number input accepts and displays values according to the specified locale, which
  can be supplied either as a property or with [ApplyLocale](#ApplyLocale). If a locale
  is not specified, it will be inferred from the browser.

  ```jsx_example
  ---
  render: false
  ---
  class Example extends React.Component {
    state = { locale: 'de' };

    render () {
      const label = this.state.locale === 'de' ? "Comma separator" : "Period separator";
      return (
        <div>
          <Select
            label="Choose locale"
            onChange={(e) => this.setState({ locale: e.target.value })}>
              <option key="de" value="de">de</option>
              <option key="en" value="en">en</option>
          </Select>
          <Container padding="small">
            <NumberInput
              label={label}
              step="0.1"
              min="0.1"
              locale={this.state.locale}
              defaultValue="2.4"
            />
          </Container>
        </div>
      )
    }
  }

  render(<Example />)
  ```

  A number input field with min set to 10.2, max to 50.8 and step set to 0.111

  ```jsx_example
  <NumberInput label="Unpredictable numbers" min="10.2" max="50.8" step="0.111" />
  ```

  A number input field with errors

  ```jsx_example
  <NumberInput messages={[{ text: 'Invalid number', type: 'error' }]} label="Points" />
  ```

  As with other forms components, setting the `layout` prop to `inline` will
  horizontally align the input and the label.

  Setting the boolean `inline` prop to `true` will cause the input itself to display
  inline and accept a fixed `width`.

  ```jsx_example
  <div>
    <Container as="div" margin="0 0 medium">
      <NumberInput
        label="Points"
        layout="inline"
      />
    </Container>
    <Container as="div">
      <NumberInput
        label="Points"
        layout="inline"
        inline
        width="9rem"
      />
    </Container>
  </div>
  ```

  A number input field with a screenreader only label

  ```jsx_example
  <NumberInput
    label={<ScreenReaderContent>Points</ScreenReaderContent>}
    placeholder="Points"
  />
  ```

  An inline number input field with a fixed width

  ```jsx_example
  <Grid vAlign="bottom" colSpacing="small">
    <GridRow>
      <GridCol width="auto">
        <NumberInput
          label="Percent needed to pass"
          inline
          width="10rem"
        />
      </GridCol>
      <GridCol width="auto">
        <Container margin="0 0 x-small" display="block">
          <Text weight="bold">%</Text>
        </Container>
      </GridCol>
    </GridRow>
  </Grid>
  ```

  A number input field next to a [Button](#Button).

  ```jsx_example
  <form>
    <FormFieldGroup
      layout="columns"
      vAlign="bottom"
      rowSpacing="medium"
      description={
        <ScreenReaderContent>
          Medium NumberInput + Button examples
        </ScreenReaderContent>
      }
    >
      <NumberInput label="Default-size input and button" />
      <Button>Click me</Button>
    </FormFieldGroup>
    <br/>
    <FormFieldGroup
      layout="columns"
      vAlign="bottom"
      rowSpacing="medium"
      description={
        <ScreenReaderContent>
          Large NumberInput + Button examples
        </ScreenReaderContent>
      }
    >
      <NumberInput size="large" label="Large-size input and button" />
      <Button size="large">Click me</Button>
    </FormFieldGroup>
  </form>
  ```
**/
@themeable(theme, styles)
class NumberInput extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    label: PropTypes.node.isRequired,
    id: PropTypes.string,
    showArrows: PropTypes.bool,
    step: PropTypes.string,
    min: PropTypes.string,
    max: PropTypes.string,
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
    size: PropTypes.oneOf(['medium', 'large']),
    layout: PropTypes.oneOf(['stacked', 'inline']),
    width: PropTypes.string,
    inline: PropTypes.bool,
    /**
    * Html placeholder text to display when the input has no value. This should be hint text, not a label
    * replacement.
    */
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    /**
    * a function that provides a reference to the actual input element
    */
    inputRef: PropTypes.func,
    /**
    * value to set on initial render
    */
    defaultValue: PropTypes.string,
    /**
    * the selected value (must be accompanied by an `onChange` prop)
    */
    value: CustomPropTypes.controllable(PropTypes.string),
    onChange: PropTypes.func,
    onKeyDown: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func
  };
  /* eslint-enable react/require-default-props */

  static contextTypes = {
    locale: PropTypes.string
  };

  static defaultProps = {
    showArrows: true,
    step: '1',
    min: '',
    max: '',
    inline: false,
    size: 'medium',
    messages: [],
    disabled: false,
    layout: 'stacked',
    inputRef: function (input) {},
    onChange: function (event, value) {},
    onKeyDown: function (event) {},
    onFocus: function (event) {},
    onBlur: function (event) {}
  };

  constructor (props) {
    super()

    this._defaultId = `NumberInput_${nanoid(7)}`
  }

  _input = null;

  state = {
    focus: false
  };

  componentWillReceiveProps (nextProps) {
    if (nextProps.locale !== this.props.locale) {
      const delimiter = decimalDelimiter(this.props.locale)
      const newDelimiter = decimalDelimiter(nextProps.locale)
      this._input.value = replaceChar(this._input.value, delimiter, newDelimiter)
    }
  }

  // Replicate the arrow behavior commonly seen in inputs of type number
  applyStep = (dir) => {
    const rawValue = this._input.value
    const { min, max, step } = this.props
    const delimiter = decimalDelimiter(this.locale)
    const parseableRawValue = rawValue ? replaceChar(rawValue, delimiter, '.') : '0'
    const value = new Decimal(parseableRawValue || 0).minus(min || 0)
    const hasMin = min !== '' && min !== undefined && min !== null
    const hasMax = max !== '' && max !== undefined && max !== null

    // case when value is less than minimum
    if (hasMin && value.lt(0)) {
      if (dir < 0) {
        return rawValue || min
      }
      return min
    }

    // case when value is more than maximum
    if (hasMax && value.plus(min || 0).gt(max)) {
      if (dir > 0) {
        return rawValue || min
      }
      return max
    }

    let resultValue
    if (!value.mod(step).equals(0)) {
      // case when value is between steps, so we snap to the next step
      if (dir > 0) {
        resultValue = value.div(step).ceil().times(step)
      } else {
        resultValue = value.div(step).floor().times(step)
      }
    } else if (dir > 0) {
      resultValue = value.plus(step)
    } else {
      resultValue = value.minus(step)
    }

    if (hasMin && resultValue.lt(0)) {
      return min
    }

    resultValue = resultValue.plus(min || 0)

    if (hasMax) {
      const maxStep = new Decimal(max)
        .minus(min || 0)
        .div(step)
        .floor()
        .times(step)
        .plus(min || 0)

      if (resultValue.gt(maxStep)) {
        return maxStep.toString()
      }
    }

    return resultValue.toString()
  }

  focus () {
    this._input.focus()
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

  get value () {
    return this._input.value
  }

  handleRef = (element, ...args) => {
    this._input = element
    this.props.inputRef.apply(this, [element].concat(args))
  };

  handleFocus = (event) => {
    this.setState(() => ({ focus: true }))
    this.props.onFocus(event)
  };

  handleBlur = (event) => {
    this.setState(() => ({ focus: false }))
    this.props.onBlur(event)
  };

  handleChange = (event) => {
    const { min } = this.props
    const missingMin = min === '' || min === null || min === undefined
    const newValue = cleanValue(event.target.value, this.locale, missingMin || new Decimal(min).lt(0))
    const newSelection = transformSelection(this._input, newValue)
    this._input.value = newValue
    this._input.selectionStart = newSelection.selectionStart
    this._input.selectionEnd = newSelection.selectionEnd
    this._input.selectionDirection = newSelection.selectionDirection

    this.props.onChange(event, newValue)
  };

  handleKeyDown = (event) => {
    const dir = keyDirections[event.key]

    if (dir) {
      event.preventDefault()
      const newValue = formatNumberForLocale(this.applyStep(dir), this.locale)
      this._input.value = newValue
      this.props.onKeyDown(event)
      this.props.onChange(event, newValue)
    } else {
      this.props.onKeyDown(event)
    }
  };

  handleClickUp = (event) => {
    event.preventDefault()
    const newValue = formatNumberForLocale(this.applyStep(1), this.locale)
    this._input.focus()
    this._input.value = newValue
    this.props.onChange(event, newValue)
  };

  handleClickDown = (event) => {
    event.preventDefault()
    const newValue = formatNumberForLocale(this.applyStep(-1), this.locale)
    this._input.focus()
    this._input.value = newValue
    this.props.onChange(event, newValue)
  };

  renderArrows () {
    return (
      <span className={styles.arrowContainer}>
        <span
          className={styles.arrow}
          onClick={this.handleClickUp}
          onKeyDown={noop}
          role="presentation"
        >
          <IconArrowOpenUpLine />
        </span>
        <span
          className={styles.arrow}
          onClick={this.handleClickDown}
          onKeyDown={noop}
          role="presentation"
        >
          <IconArrowOpenDownLine />
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
      defaultValue,
      disabled,
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
            value={value}
            defaultValue={defaultValue && formatNumberForLocale(defaultValue, this.locale)}
            placeholder={placeholder}
            ref={this.handleRef}
            id={this.id}
            required={required}
            aria-required={required}
            aria-invalid={this.invalid ? 'true' : null}
            disabled={disabled}
            aria-disabled={disabled ? 'true' : null}
          />
          {showArrows ? this.renderArrows() : null}
        </span>
      </FormField>
    )
  }
}

export default NumberInput
