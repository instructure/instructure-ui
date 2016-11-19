import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import themeable from '../../util/themeable'
import shortid from 'shortid'
import classnames from 'classnames'
import CustomPropTypes from '../../util/CustomPropTypes'
import keycode from 'keycode'
import { pickProps, omitProps } from '../../util/passthroughProps'
import FormField from '../FormField'

import IconArrowDown from './IconArrowDown'

import styles from './styles.css'
import theme from './theme.js'

/**

  An accessible and easily stylable select component.

  ### Select size variants

  Default is `medium`.

  ```jsx_example
  <div>
  <Select size="small" label="Small">
    <option value="foo">Foo</option>
    <option disabled value="bar">Bar</option>
  </Select>
  <br />
  <Select label="Medium">
    <option value="foo">Foo</option>
    <option disabled value="bar">Bar</option>
  </Select>
  <br />
  <Select size="large" label="Large">
    <option value="foo">Foo</option>
    <option disabled value="bar">Bar</option>
  </Select>
  </div>
  ```

  ### An inline Select with and without a fixed width

  ```jsx_example
  <div style={{display: 'flex', alignItems: 'center'}}>
    <Select label={<ScreenReaderContent>Count</ScreenReaderContent>} isBlock={false}>
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>10000</option>
    </Select>
    &nbsp;
    <Typography>foo</Typography>
    &nbsp;
    <Select label={<ScreenReaderContent>Count</ScreenReaderContent>} width="7em" isBlock={false}>
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>10000</option>
    </Select>
    &nbsp;
    <Typography>bar</Typography>
  </div>
  ```

  ### Select with an error message

  ```jsx_example
  <Select label="What would you like for a snack?" messages={[{ text: 'You need to make a selection', type: 'error' }]}>
    <option value="apples">Apples</option>
    <option value="oranges">Oranges</option>
    <option value="bananas">Bananas</option>
    <option value="candy" disabled>Candy</option>
  </Select>
  ```

  ### Select with the label visible only to screenreaders

  ```jsx_example
  <Select label={<ScreenReaderContent>What would you like for a snack?</ScreenReaderContent>}>
    <option value="apples">Apples</option>
    <option value="oranges">Oranges</option>
    <option value="bananas">Bananas</option>
    <option value="candy" disabled>Candy</option>
  </Select>
  ```

  ### Disabled Selects

  ```jsx_example
  <div>

    <Select disabled label="What would you like for a snack?" isBlock={false}>
      <option value="apples">Apples</option>
      <option value="oranges">Oranges</option>
      <option value="bananas">Bananas</option>
      <option value="candy" disabled>Candy</option>
    </Select>
    &nbsp;
    <Select disabled label="How many?" isBlock={false}>
      <option value=""></option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
    </Select>

  </div>
  ```
**/
@themeable(theme, styles)
class Select extends Component {
  static propTypes = {
    /**
    * Children must be option tags.
    */
    children: CustomPropTypes.Children.oneOf(['option']),
    label: PropTypes.node.isRequired,
    disabled: PropTypes.bool,
    /**
    * object with shape: `{
    * text: PropTypes.string,
    * type: PropTypes.oneOf(['error', 'hint', 'success', 'screenreader-only'])
    *   }`
    */
    messages: PropTypes.arrayOf(CustomPropTypes.formFieldMessage),
    id: PropTypes.string,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    required: PropTypes.bool,
    isBlock: PropTypes.bool,
    width: PropTypes.string,
    /**
    * a function that provides a reference to the actual select element
    */
    selectRef: PropTypes.func,
    /**
    * value to set on initial render
    */
    defaultValue: PropTypes.string,
    /**
    * the selected value (must be accompanied by an `onChange` prop)
    */
    value: CustomPropTypes.controllable(PropTypes.string),
    /**
    * when used with the `value` prop, the component will not control its own state
    */
    onChange: PropTypes.func,
    onBlur: PropTypes.func
  }

  static defaultProps = {
    isBlock: true,
    type: 'text',
    size: 'medium',
    messages: [],
    disabled: false,
    selectRef: function (select) {}
  }

  constructor (props) {
    super()

    this._defaultId = 'Select__' + shortid.generate()
  }

  get id () {
    return this.props.id || this._defaultId
  }

  get invalid () {
    return this.props.messages && this.props.messages.find((message) => { return message.type === 'error' })
  }

  get focused () {
    return (document.activeElement === ReactDOM.findDOMNode(this._select))
  }

  get value () {
    return ReactDOM.findDOMNode(this._select).value
  }

  handleChange = (e) => {
    const { onChange, disabled } = this.props

    if (disabled) {
      e.preventDefault()
      return
    }

    if (typeof onChange === 'function') {
      onChange(e)
    }
  }

  handleKeyDown = (e) => {
    const { onKeyDown, disabled } = this.props

    const keycodes = [
      keycode.codes.space,
      keycode.codes.up,
      keycode.codes.down
    ]

    if (disabled && (keycodes.includes(e.keyCode) ||
      (e.keyCode >= 48 && e.keyCode <= 57) || // 0 - 9
      (e.keyCode >= 65 && e.keyCode <= 90) || // A - Z
      (e.keyCode >= 96 && e.keyCode <= 105) // numpad 0 - 9
    )) {
      e.preventDefault()
      return
    }

    if (typeof onKeyDown === 'function') {
      onKeyDown(e)
    }
  }

  render () {
    const {
      size,
      children,
      width,
      selectRef,
      onBlur,
      required,
      disabled,
      value,
      defaultValue
    } = this.props

    const props = omitProps(this.props, Select.propTypes)

    const classes = {
      [styles.root]: true,
      [styles[size]]: size,
      [styles.disabled]: disabled
    }

    const style = width ? { width } : null

    return (
      <FormField
        {...pickProps(this.props, FormField.propTypes)}
        id={this.id}
      >
        <span className={classnames(classes)} style={style}>
          <select
            {...props}
            id={this.id}
            ref={(select, ...args) => {
              this._select = select
              selectRef.apply(this, [select].concat(args))
            }}
            value={value}
            defaultValue={defaultValue}
            onBlur={onBlur}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            className={styles.select}
            required={required}
            aria-required={required}
            aria-invalid={this.invalid ? 'true' : null}
            aria-disabled={disabled ? 'true' : null}
            disabled={disabled}
          >
            {children}
          </select>
          <IconArrowDown className={styles.arrow} />
        </span>
      </FormField>
    )
  }
}

export default Select
