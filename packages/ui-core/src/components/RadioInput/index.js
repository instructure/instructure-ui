import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import shortid from 'shortid'

import themeable from '@instructure/ui-themeable'
import { omitProps } from '@instructure/ui-utils/lib/react/passthroughProps'
import isActiveElement from '@instructure/ui-utils/lib/dom/isActiveElement'

import styles from './styles.css'
import theme from './theme'
/**
---
category: components/forms
---
  By default, the RadioInput component is a custom styled HTML radio button.

  Adjust the size of the RadioInput and its label text via the `size` prop. The default size is
  `medium`.

  ```jsx_example
    <RadioInput
      label={lorem.sentence()}
      value="foo"
      name="bar"
      checked
    />
  ```
  You can also make the radioInput readOnly by passing in a readOnly prop.

  ```jsx_example
    <RadioInput
      label={lorem.sentence()}
      value="foo"
      name="baz"
      onClick={() => alert('this shouldn\'t appear!')}
      onChange={() => alert('this shouldn\'t appear!')}
      readOnly
    />
  ```
**/
@themeable(theme, styles)
class RadioInput extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    label: PropTypes.node.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    id: PropTypes.string,
    name: PropTypes.string,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    variant: PropTypes.oneOf(['simple', 'toggle']),
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    context: PropTypes.oneOf(['success', 'warning', 'danger', 'off']),
    inline: PropTypes.bool,
    onClick: PropTypes.func,
    onChange: PropTypes.func,
    /** works just like disabled but keeps the same styles as if it were active */
    readOnly: PropTypes.bool
  }
  /* eslint-enable react/require-default-props */

  static defaultProps = {
    onClick: function (event) {},
    onChange: function (event) {},
    variant: 'simple',
    size: 'medium',
    disabled: false,
    inline: false,
    context: 'success',
    readOnly: false
  }

  constructor (props) {
    super(props)

    this.state = {}

    if (props.checked === undefined) {
      this.state.checked = false
    }

    this._defaultId = `RadioInput__${shortid.generate()}`
  }

  handleClick = (e) => {
    if (this.props.disabled || this.props.readOnly) {
      e.preventDefault()
      return
    }

    this.props.onClick(e)
  }

  handleChange = (e) => {
    if (this.props.disabled || this.props.readOnly) {
      e.preventDefault()
      return
    }

    if (this.props.checked === undefined) {
      this.setState({ checked: !this.state.checked })
    }

    this.props.onChange(e)
  }

  focus () {
    this._input.focus()
  }

  get id () {
    return this.props.id || this._defaultId
  }

  get focused () {
    return isActiveElement(this._input)
  }

  get checked () {
    return (this.props.checked === undefined) ? this.state.checked : this.props.checked
  }

  render () {
    const {
      disabled,
      label,
      variant,
      size,
      inline,
      context,
      value,
      name,
      readOnly
    } = this.props

    const props = omitProps(this.props, RadioInput.propTypes)

    const classes = {
      [styles.root]: true,
      [styles.disabled]: disabled && !readOnly,
      [styles[variant]]: true,
      [styles[context]]: variant === 'toggle',
      [styles[size]]: true,
      [styles['inline']]: inline
    }

    return (
      <label
        className={classnames(classes)}
        htmlFor={this.id}
      >
        <input
          {...props}
          id={this.id}
          ref={(c) => { this._input = c }}
          value={value}
          name={name}
          checked={this.checked}
          type="radio"
          className={styles.input}
          disabled={disabled || readOnly ? 'true' : null}
          aria-disabled={disabled || readOnly ? 'true' : null}
          onChange={this.handleChange}
          onClick={this.handleClick}
        />
        <span className={styles.control}>
          <span className={styles.facade} aria-hidden="true" />
          <span className={styles.label}>
            {label}
          </span>
        </span>
      </label>
    )
  }
}

export default RadioInput
