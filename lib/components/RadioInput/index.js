import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import themeable from '../../util/themeable'
import shortid from 'shortid'
import { omitProps } from '../../util/passthroughProps'
import createChainedFunction from '../../util/createChainedFunction'

import RadioInputFacade from './RadioInputFacade'

import styles from './styles.css'
import theme from './theme.js'
/**

  ```jsx_example
    <RadioInput
      label={lorem.sentence()}
      value="foo" checked />
  ```
**/
@themeable(theme, styles)
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
    variant: PropTypes.oneOf(['simple', 'toggle']),
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    context: PropTypes.oneOf(['success', 'warning', 'danger', 'off']),
    isBlock: PropTypes.bool,
    onClick: PropTypes.func,
    onChange: PropTypes.func,
    onKeyDown: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onMouseOver: PropTypes.func,
    onMouseOut: PropTypes.func
  }

  static defaultProps = {
    onClick: function (event) {},
    onChange: function (event) {},
    variant: 'simple',
    size: 'medium',
    disabled: false,
    isBlock: true,
    context: 'success'
  }

  constructor (props) {
    super(props)

    this.state = {
      focused: false,
      hovered: false
    }

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

  handleFocus = (e) => {
    this.setState({
      focused: true
    })
  }

  handleBlur = (e) => {
    this.setState({
      focused: false
    })
  }

  handleMouseOver = (e) => {
    this.setState({
      hovered: true
    })
  }

  handleMouseOut = (e) => {
    this.setState({
      hovered: false
    })
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
      checked,
      onMouseOver,
      onMouseOut,
      onFocus,
      onBlur
    } = this.props

    const props = omitProps(this.props, RadioInput.propTypes)

    const classes = {
      [styles.root]: true,
      [styles.disabled]: disabled,
      [styles[variant]]: true,
      [styles['is-block']]: isBlock
    }

    /* eslint-disable jsx-a11y/mouse-events-have-key-events */

    return (
      <label
        className={classnames(classes)}
        htmlFor={this.id}
        onMouseOver={createChainedFunction(onMouseOver, this.handleMouseOver)}
        onMouseOut={createChainedFunction(onMouseOut, this.handleMouseOut)}
      >
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
          onFocus={createChainedFunction(onFocus, this.handleFocus)}
          onBlur={createChainedFunction(onBlur, this.handleBlur)}
          {...props}
        />
        <RadioInputFacade
          variant={variant}
          size={size}
          context={context}
          checked={checked}
          focused={this.state.focused}
          hovered={this.state.hovered}
        >
          {label}
        </RadioInputFacade>
      </label>
    )

    /* eslint-enable jsx-a11y/mouse-events-have-key-events */
  }
}

export default RadioInput
export { default as RadioInputFacade } from './RadioInputFacade'
