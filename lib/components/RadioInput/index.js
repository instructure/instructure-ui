import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import styleable from '../../util/styleable'

import RadioInputFacade from './RadioInputFacade'

import styles from './styles.css'
/**

  ```jsx_example
    <RadioInput
      label={lorem.sentence()}
      value="foo" checked />
  ```
**/
@styleable(styles)
export default class RadioInput extends Component {
  static propTypes = {
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired,
    label: PropTypes.node.isRequired,
    name: PropTypes.string,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    onChange: PropTypes.func,
    variant: PropTypes.oneOf(['simple', 'toggle']),
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    context: PropTypes.oneOf(['success', 'danger']),
    isBlock: PropTypes.bool
  }

  static defaultProps = {
    onClick: function (event) {},
    onChange: function (event) {},
    variant: 'simple',
    size: 'medium',
    disabled: false,
    isBlock: true
  }

  handleClick = (e) => {
    if (this.props.disabled) {
      e.preventDefault()
      return
    }

    this.props.onClick(e)
  }

  handleChange = (e) => {
    if (this.props.disabled) {
      e.preventDefault()
      return
    }

    this.props.onChange(e)
  }

  focus () {
    ReactDOM.findDOMNode(this._input).focus()
  }

  get focused () {
    return (document.activeElement === ReactDOM.findDOMNode(this._input))
  }

  get checked () {
    return this.props.checked
  }

  render () {
    /* eslint-disable no-unused-vars, react/prop-types */
    const {
      onClick,
      disabled,
      label,
      className,
      variant,
      size,
      isBlock,
      children,
      context,
      ...props
    } = this.props
    /* eslint-enable no-unused-vars, react/prop-types */

    const classes = {
      [styles.root]: true,
      [styles.disabled]: disabled,
      [styles[variant]]: true,
      [styles['is-block']]: isBlock
    }

    return (
      <label className={classnames(classes)}>
        <input
          ref={(c) => { this._input = c }}
          type="radio"
          className={styles.input}
          aria-disabled={disabled ? 'true' : null}
          onChange={this.handleChange}
          onClick={this.handleClick}
          {...props}
        />
        <RadioInputFacade
          variant={variant}
          size={size}
          context={context}
        >
          {label}
        </RadioInputFacade>
      </label>
    )
  }
}

export { default as RadioInputFacade } from './RadioInputFacade'
