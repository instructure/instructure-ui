import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import CustomPropTypes from '../../../util/CustomPropTypes'
import themeable from '../../../util/themeable'
import { omitProps } from '../../../util/passthroughProps'

import keycode from 'keycode'

import RadioInputFacade from '../../RadioInput/RadioInputFacade'
import CheckboxFacade from '../../Checkbox/CheckboxFacade'

import styles from './styles.css'
import theme from './theme.js'

@themeable(theme, styles)
class MenuItem extends Component {
  static propTypes = {
    /* the menu item label */
    children: PropTypes.node.isRequired,
    type: PropTypes.oneOf(['default', 'checkbox', 'radio']),
    /* whether to set the menu item state to selected or not on initial render */
    defaultSelected: PropTypes.bool,
    /**
    * whether the menu item is selected or not (must be accompanied by an `onSelect` prop)
    */
    selected: CustomPropTypes.controllable(PropTypes.bool, 'onSelect', 'defaultSelected'),
    /**
    * when used with the `selected` prop, the component will not control its own state
    */
    onSelect: PropTypes.func,
    /**
    * the id of the element that the menu item will act upon
    */
    controls: PropTypes.string,
    disabled: PropTypes.bool
  }

  static defaultProps = {
    type: 'default',
    disabled: false
  }

  constructor (props) {
    super()

    this.state = {
      selected: (props.selected === undefined) ? props.defaultSelected : null
    }
  }

  handleClick = (e) => {
    const { onSelect, disabled, selected } = this.props

    if (disabled) {
      e.preventDefault()
      return
    }

    if (selected === undefined) {
      this.setState({ selected: !this.state.selected })
    }

    if (typeof onSelect === 'function') {
      onSelect(e)
    }
  }

  handleKeyDown = (e) => {
    if (e.keyCode === keycode.codes.enter || e.keyCode === keycode.codes.space) {
      e.preventDefault()
      this.handleClick(e)
    }
  }

  get role () {
    switch (this.props.type) {
      case 'checkbox':
        return 'menuitemcheckbox'
      case 'radio':
        return 'menuitemradio'
      default:
        return 'menuitem'
    }
  }

  get label () {
    const label = this.props.children
    switch (this.props.type) {
      case 'checkbox':
        return (
          <CheckboxFacade checked={this.selected}>
            {label}
          </CheckboxFacade>
        )
      case 'radio':
        return (
          <RadioInputFacade checked={this.selected}>
            {label}
          </RadioInputFacade>
        )
      default:
        return label
    }
  }

  get selected () {
    return (this.props.selected === undefined) ? this.state.selected : this.props.selected
  }

  get focused () {
    return (document.activeElement === ReactDOM.findDOMNode(this))
  }

  focus () {
    ReactDOM.findDOMNode(this).focus()
  }

  render () {
    const {
      disabled,
      controls,
      type
    } = this.props

    const props = omitProps(this.props, MenuItem.propTypes)

    const classes = {
      [styles.root]: true,
      [styles[type]]: true,
      [styles.disabled]: disabled
    }

    return (
      <li
        {...props}
        className={classnames(classes)}
        aria-disabled={disabled ? 'true' : null}
        role={this.role}
        tabIndex="-1"
        aria-controls={controls}
        onClick={this.handleClick}
        onKeyDown={this.handleKeyDown}
      >
        {this.label}
      </li>
    )
  }
}

export default MenuItem
