import React, { PropTypes, Component } from 'react'
import ReactDOM from 'react-dom'
import CustomPropTypes from '../../../util/CustomPropTypes'
import themeable from '../../../util/themeable'
import { omitProps } from '../../../util/passthroughProps'
import getElementType from '../../../util/getElementType'
import createChainedFunction from '../../../util/createChainedFunction'
import IconCheckSolid from 'instructure-icons/lib/Solid/IconCheckSolid'
import keycode from 'keycode'

import styles from './styles.css'
import theme from './theme.js'

@themeable(theme, styles)
class MenuItem extends Component {
  static propTypes = {
    /* the menu item label */
    children: PropTypes.node.isRequired,
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
    onClick: PropTypes.func,
    onKeyDown: PropTypes.func,
    onKeyUp: PropTypes.func,
    /**
    * the id of the element that the menu item will act upon
    */
    controls: PropTypes.string,
    disabled: PropTypes.bool,
    /**
    * the element type to render as (will default to `<a>` if href is provided)
    */
    as: CustomPropTypes.elementType(),
    type: PropTypes.oneOf(['button', 'checkbox', 'radio']),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  };

  static defaultProps = {
    type: 'button',
    disabled: false,
    onSelect: function (e, value, selected) {}
  };

  constructor (props) {
    super()

    this.state = {
      selected: (props.selected === undefined) ? !!props.defaultSelected : null
    }
  }

  handleClick = (e) => {
    const { onSelect, onClick, disabled, value } = this.props
    const selected = !this.selected

    if (disabled) {
      e.preventDefault()
      return
    }

    if (this.props.selected === undefined) {
      this.setState({ selected })
    }

    if (typeof onSelect === 'function') {
      onSelect(e, value, selected)
    }

    if (typeof onClick === 'function') {
      onClick(e)
    }
  }

  handleKeyDown = (e) => {
    const spaceKey = e.keyCode === keycode.codes.space
    const enterKey = e.keyCode === keycode.codes.enter
    const elementType = this.elementType

    if (spaceKey || (elementType !== 'a' && enterKey)) {
      e.preventDefault()
      e.stopPropagation()
    }
  }

  handleKeyUp = (e) => {
    const spaceKey = e.keyCode === keycode.codes.space
    const enterKey = e.keyCode === keycode.codes.enter
    const elementType = this.elementType

    if (spaceKey || (elementType !== 'a' && enterKey)) {
      e.preventDefault()
      e.stopPropagation()

      this.handleClick(e)
    }
  }

  get elementType () {
    return getElementType(MenuItem, this.props)
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

  get selected () {
    return (this.props.selected === undefined) ? this.state.selected : this.props.selected
  }

  get focused () {
    return (document.activeElement === ReactDOM.findDOMNode(this._node))
  }

  focus () {
    this._node.focus()
  }

  render () {
    const {
      children,
      disabled,
      controls,
      onKeyDown,
      onKeyUp
    } = this.props

    const props = omitProps(this.props, MenuItem.propTypes)
    const ElementType = this.elementType

    return (
      <ElementType
        tabIndex="-1" // note: tabIndex can be overridden by Menu or MenuItemGroup components
        {...props}
        role={this.role}
        aria-disabled={disabled ? 'true' : null}
        aria-controls={controls}
        aria-checked={(this.role !== 'menuitem') ? (this.selected) ? 'true' : 'false' : null}
        onClick={this.handleClick}
        onKeyUp={createChainedFunction(onKeyUp, this.handleKeyUp)}
        onKeyDown={createChainedFunction(onKeyDown, this.handleKeyDown)}
        ref={(c) => { this._node = c }}
        className={styles.root}
      >
        {this.role !== 'menuitem' && (
          <span className={styles.icon}>
            {(this.selected) && <IconCheckSolid />}
          </span>
        )}
        <span className={styles.label}>{children}</span>
      </ElementType>
    )
  }
}

export default MenuItem
