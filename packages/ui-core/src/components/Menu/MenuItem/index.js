import React, { Component } from 'react'
import PropTypes from 'prop-types'

import classnames from 'classnames'
import IconCheckSolid from 'instructure-icons/lib/Solid/IconCheckSolid'
import IconArrowOpenRightSolid from 'instructure-icons/lib/Solid/IconArrowOpenRightSolid'
import keycode from 'keycode'

import themeable from '@instructure/ui-themeable'
import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'
import { omitProps } from '@instructure/ui-utils/lib/react/passthroughProps'
import getElementType from '@instructure/ui-utils/lib/react/getElementType'
import createChainedFunction from '@instructure/ui-utils/lib/createChainedFunction'
import isActiveElement from '@instructure/ui-utils/lib/dom/isActiveElement'
import findDOMNode from '@instructure/ui-utils/lib/dom/findDOMNode'

import styles from './styles.css'
import theme from './theme'

/**
---
parent: Menu
---
**/
@themeable(theme, styles)
class MenuItem extends Component {
  /* eslint-disable react/require-default-props */
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
    onMouseOver: PropTypes.func,
    /**
    * the id of the element that the menu item will act upon
    */
    controls: PropTypes.string,
    disabled: PropTypes.bool,
    /**
    * the element type to render as (will default to `<a>` if href is provided)
    */
    as: CustomPropTypes.elementType,
    type: PropTypes.oneOf(['button', 'checkbox', 'radio', 'flyout']),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    active: PropTypes.bool
  }
  /* eslint-enable react/require-default-props */

  static defaultProps = {
    type: 'button',
    disabled: false,
    onSelect: function (e, value, selected) {}
  }

  constructor (props) {
    super()

    this.state = {
      selected: props.selected === undefined ? !!props.defaultSelected : null
    }
  }

  handleClick = e => {
    const { onSelect, onClick, disabled, value, href } = this.props
    const selected = !this.selected

    if (disabled) {
      e.preventDefault()
      return
    }

    if (!href) {
      e.preventDefault()
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

  handleKeyDown = e => {
    const spaceKey = e.keyCode === keycode.codes.space
    const enterKey = e.keyCode === keycode.codes.enter

    if (spaceKey || enterKey) {
      e.preventDefault()
      e.stopPropagation()

      if (enterKey) {
        // handle space key on keyUp for FF
        findDOMNode(this._node).click() // eslint-disable-line react/no-find-dom-node
      }
    }
  }

  handleKeyUp = e => {
    const spaceKey = e.keyCode === keycode.codes.space
    const enterKey = e.keyCode === keycode.codes.enter

    if (spaceKey || enterKey) {
      e.preventDefault()
      e.stopPropagation()

      if (spaceKey) {
        findDOMNode(this._node).click() // eslint-disable-line react/no-find-dom-node
      }
    }
  }

  handleMouseOver = () => {
    this.focus()
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
      case 'flyout':
        return 'button'
      default:
        return 'menuitem'
    }
  }

  get selected () {
    return this.props.selected === undefined ? this.state.selected : this.props.selected
  }

  get focused () {
    return isActiveElement(this._node)
  }

  focus () {
    findDOMNode(this._node).focus() // eslint-disable-line react/no-find-dom-node
  }

  renderContent () {
    const { children, type } = this.props

    const classes = {
      [styles.content]: true,
      [styles.arrow]: type === 'flyout'
    }

    return (
      <span className={classnames(classes)}>
        {(type === 'checkbox' || type === 'radio') &&
          <span className={styles.icon}>
            {this.selected && <IconCheckSolid />}
          </span>}
        <span className={styles.label}>
          {children}
        </span>
        {type === 'flyout' &&
          <span className={styles.icon}>
            <IconArrowOpenRightSolid />
          </span>}
      </span>
    )
  }

  render () {
    const { disabled, controls, onKeyDown, onKeyUp, onMouseOver, active, type } = this.props

    const props = omitProps(this.props, MenuItem.propTypes)
    const ElementType = this.elementType

    const classes = {
      [styles.root]: true,
      [styles.active]: active
    }

    /* eslint-disable jsx-a11y/mouse-events-have-key-events, no-nested-ternary */
    return (
      <ElementType
        tabIndex="-1" // note: tabIndex can be overridden by Menu or MenuItemGroup components
        {...props}
        role={this.role}
        aria-disabled={disabled ? 'true' : null}
        aria-controls={controls}
        aria-checked={type === 'checkbox' || type === 'radio' ? (this.selected ? 'true' : 'false') : null}
        onClick={this.handleClick}
        onKeyUp={createChainedFunction(onKeyUp, this.handleKeyUp)}
        onKeyDown={createChainedFunction(onKeyDown, this.handleKeyDown)}
        ref={c => {
          this._node = c
        }}
        className={classnames(classes)}
        onMouseOver={createChainedFunction(onMouseOver, this.handleMouseOver)}
      >
        {this.renderContent()}
      </ElementType>
    )
    /* eslint-enable jsx-a11y/mouse-events-have-key-events, no-nested-ternary */
  }
}

export default MenuItem
