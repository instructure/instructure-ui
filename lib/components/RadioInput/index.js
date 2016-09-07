import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import styleable from '../../util/styleable'
import shortid from 'shortid'
import { omitProps } from '../../util/passthroughProps'

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
class RadioInput extends Component {
  static propTypes = {
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired,
    label: PropTypes.node.isRequired,
    id: PropTypes.string,
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

  constructor (props) {
    super(props)

    this._defaultId = 'RadioInput__' + shortid.generate()
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

  get id () {
    return this.props.id || this._defaultId
  }

  get focused () {
    return (document.activeElement === ReactDOM.findDOMNode(this._input))
  }

  get checked () {
    return this.props.checked
  }

  render () {
    const {
      disabled,
      label,
      variant,
      size,
      isBlock,
      context,
      value,
      name,
      checked
    } = this.props

    const props = omitProps(this.props, RadioInput.propTypes)

    const classes = {
      [styles.root]: true,
      [styles.disabled]: disabled,
      [styles[variant]]: true,
      [styles['is-block']]: isBlock
    }

    return (
      <label className={classnames(classes)} htmlFor={this.id}>
        <input
          ref={(c) => { this._input = c }}
          id={this.id}
          value={value}
          name={name}
          checked={checked}
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

export default RadioInput
export { default as RadioInputFacade } from './RadioInputFacade'
