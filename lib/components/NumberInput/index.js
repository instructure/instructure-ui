import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CustomPropTypes from '../../util/CustomPropTypes'
import classnames from 'classnames'
import shortid from 'shortid'
import Decimal from 'decimal.js'
import themeable from '../../themeable'
import isActiveElement from '../../util/dom/isActiveElement'
import { pickProps, omitProps } from '../../util/passthroughProps'
import transformSelection from '../../util/dom/transformSelection'

import IconArrowOpenUpLine from 'instructure-icons/lib/Line/IconArrowOpenUpLine'
import IconArrowOpenDownLine from 'instructure-icons/lib/Line/IconArrowOpenDownLine'

import styles from './styles.css'
import theme from './theme.js'

import FormField from '../FormField'

const keyDirections = {
  ArrowUp: 1,
  ArrowDown: -1
}

function noop () {}

export function cleanValue (value, allowNegative = true, sep = '.') {
  // Remove everything that is not numbers, sep nor '-'
  const alphaRemoval = value.split('').filter((char) => (
    char === sep || char === '-' || /^\d+$/.test(char)
  ))

  // Remove all '-'s
  const minusRemoval = alphaRemoval.filter((char) => char !== '-')

  // Re-add one '-' if appropriate
  if (allowNegative && alphaRemoval[0] === '-') {
    minusRemoval.unshift('-')
  }

  // Allow only one '.'
  const dotIndex = minusRemoval.indexOf('.')
  let dotRemoval = minusRemoval
  if (dotIndex !== -1) {
    dotRemoval = dotRemoval.filter((char) => char !== '.')
    dotRemoval.splice(dotIndex, 0, '.')
  }

  return dotRemoval.join('')
}

// Replicate the arrow behavior commonly seen in inputs of type number
export function applyStep (rawValue, step, dir, min, max) {
  const value = new Decimal(rawValue || 0).minus(min || 0)
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

/**
---
category: forms
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
  <NumberInput label="Two digit number or less, divisible by 7" min="-98" max="98" step="7" />
  ```

  A number input field with step set to 0.1

  ```jsx_example
  <NumberInput label="Battery capacity in Amp-hrs" step="0.1" min="0.1" />
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
        width="6rem"
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
          width="7rem"
        />
      </GridCol>
      <GridCol width="auto">
        <Container margin="0 0 x-small" display="block">
          <Typography weight="bold">%</Typography>
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
    onChange: function (event) {},
    onKeyDown: function (event) {},
    onFocus: function (event) {},
    onBlur: function (event) {}
  };

  constructor (props) {
    super()

    this._defaultId = 'NumberInput_' + shortid.generate()
  }

  _input = null;

  state = {
    focus: false
  };

  focus () {
    this._input.focus()
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
    const newValue = cleanValue(event.target.value, missingMin || new Decimal(min).lt(0))
    const newSelection = transformSelection(this._input, newValue)

    this._input.value = newValue
    this._input.selectionStart = newSelection.selectionStart
    this._input.selectionEnd = newSelection.selectionEnd
    this._input.selectionDirection = newSelection.selectionDirection

    this.props.onChange(event)
  };

  handleKeyDown = (event) => {
    const dir = keyDirections[event.key]

    if (dir) {
      event.preventDefault()
      const { min, max, step } = this.props
      this._input.value = applyStep(this._input.value, step, dir, min, max)

      this.props.onKeyDown(event)
      this.props.onChange(event)
    } else {
      this.props.onKeyDown(event)
    }
  };

  handleClickUp = (event) => {
    event.preventDefault()
    const { min, max, step } = this.props
    this._input.focus()
    this._input.value = applyStep(this._input.value, step, 1, min, max)
    this.props.onChange(event)
  };

  handleClickDown = (event) => {
    event.preventDefault()
    const { min, max, step } = this.props
    this._input.focus()
    this._input.value = applyStep(this._input.value, step, -1, min, max)
    this.props.onChange(event)
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
            style={width ? { width } : null}
            defaultValue={defaultValue}
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
