import React, { Component } from 'react'
import PropTypes from 'prop-types'
import keycode from 'keycode'
import Menu from '../../Menu'
import MenuItem from '../MenuItem'
import MenuItemSeparator from '../MenuItemSeparator'
import MenuItemGroup from '../MenuItemGroup'
import ContextBox from '../../ContextBox'
import Position, { PositionTarget, PositionContent } from '../../Position'

import CustomPropTypes from '../../../util/CustomPropTypes'
import createChainedFunction from '../../../util/createChainedFunction'
import isActiveElement from '../../../util/dom/isActiveElement'
import containsActiveElement from '../../../util/dom/containsActiveElement'
import themeable from '../../../themeable'

import styles from './styles.css'
import theme from './theme'

@themeable(theme, styles)
class MenuItemFlyout extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    label: PropTypes.node.isRequired,
    /**
    * children of type `MenuItem`, `MenuItemSeparator`, and `MenuItemGroup`
    */
    children: CustomPropTypes.Children.oneOf([MenuItem, MenuItemSeparator, MenuItemGroup]),
    disabled: PropTypes.bool,
    /**
    * call this function when menu flyout is closed
    */
    onDismiss: PropTypes.func,
    /**
    * call this function when menu flyout's parent menu is closed
    */
    onParentDismiss: PropTypes.func,
    /**
    * call this function when a menu flyout item is selected
    */
    onSelect: PropTypes.func,
    /**
    * call this function when a menu flyout item is toggled
    */
    onToggle: PropTypes.func,
    /**
    * call this function when mouse is over the menu flyout trigger
    */
    onMouseOver: PropTypes.func,
    /**
    * A function that returns a reference to the flyout content
    */
    contentRef: PropTypes.func,
    /**
    * the id of the element that the menu items within flyout will act upon
    */
    controls: PropTypes.string,
    /**
    * the id of the element that contains the text description of the menu flyout
    */
    labelledBy: PropTypes.string,
    title: PropTypes.string
  }
  /* eslint-enable react/require-default-props */

  static defaultProps = {
    contentRef: function (el) {}
  }

  constructor (props) {
    super(props)

    this.state = { show: false }
  }

  componentDidMount () {
    this._isMounted = true
  }

  componentWillUnmount () {
    this._isMounted = false
  }

  setShow (show, cb) {
    if (this._isMounted) {
      this.setState({ show }, () => {
        if (typeof cb === 'function') {
          cb()
        }

        if (typeof this.props.onToggle === 'function') {
          this.props.onToggle(this.state.show, this)
        }
      })
    }
  }

  handlePositioned = () => {
    if (this._triggerClicked) {
      this._menu.focus()
    }
    this._triggerClicked = false
  }

  handleMenuItemTriggerClick = () => {
    // We don't focus the first flyout menu item on trigger
    // hover so we set a boolean here in order to check in
    // handlePositioned if the popover was initialized
    // by a click or hover event
    if (!this.state.show) {
      this._triggerClicked = true
      this.setShow(true)
    } else {
      this._menu.focus()
    }
  }

  handleMenuItemTriggerKeyDown = (e) => {
    if (e.keyCode === keycode.codes.right) {
      this.handleMenuItemTriggerClick()
    }
  }

  handleMenuItemTriggerMouseOver = () => {
    this.setShow(true)
  }

  handleMenuDismiss = (e) => {
    const {
      onDismiss,
      onParentDismiss
    } = this.props

    this.setShow(false, () => {
      this.focus()
    })

    if (typeof onDismiss === 'function') {
      onDismiss(e)
    }

    // Dismiss parent menu on tab
    if ((typeof onParentDismiss === 'function') &&
        (e.keyCode === keycode.codes.tab)) {
      onParentDismiss(e)
    }
  }

  handleMenuKeyDown = (e) => {
    if (e.keyCode === keycode.codes.left) {
      e.preventDefault()
      e.stopPropagation()
      this.handleMenuDismiss(e)
    }
  }

  focusTrigger () {
    this._trigger && this._trigger.focus()
  }

  focusMenu () {
    this._menu && this._menu.focus()
  }

  focus () {
    if (this.show) {
      this.focusMenu()
    } else {
      this.focusTrigger()
    }
  }

  get focused () {
    if (this.show) {
      return containsActiveElement(this._menu)
    } else {
      return isActiveElement(this._trigger)
    }
  }

  renderContent () {
    const {
      children,
      title,
      controls,
      labelledBy,
      onSelect,
      contentRef
    } = this.props

    let content

    if (this.state.show) {
      content = (
        <ContextBox
          className={styles.content}
          withArrow={false}
        >
          <div className={styles.menu}>
            <Menu
              title={title}
              controls={controls}
              labelledBy={labelledBy}
              onDismiss={this.handleMenuDismiss}
              onKeyDown={this.handleMenuKeyDown}
              onSelect={onSelect}
              ref={(el) => {
                this._menu = el
                contentRef(el)
              }}
            >
              {children}
            </Menu>
          </div>
        </ContextBox>
      )
    } else {
      content = null
    }

    return content
  }

  render () {
    const offset = {
      x: -5,
      y: 5
    }

    const {
      label,
      controls,
      disabled,
      onMouseOver
    } = this.props

    // Displaying the menu automatically onFocus would be jarring UX for SR and KO users
    // We provide equivalent onMouseOver functionality by displaying the flyout onClick
    /* eslint-disable jsx-a11y/mouse-events-have-key-events */
    return (
      <Position
        trackPosition={this.state.show}
        placement="end top"
        onPositioned={this.handlePositioned}
        offsetX={offset.x}
        offsetY={offset.y}
      >
        <PositionTarget>
          <MenuItem
            type="flyout"
            active={this.state.show}
            onKeyDown={this.handleMenuItemTriggerKeyDown}
            onClick={this.handleMenuItemTriggerClick}
            onMouseOver={createChainedFunction(onMouseOver, this.handleMenuItemTriggerMouseOver)}
            ref={(el) => { this._trigger = el }}
            aria-haspopup="true"
            aria-expanded={this.state.show}
            controls={controls}
            disabled={disabled}
          >
            {label}
          </MenuItem>
        </PositionTarget>
        <PositionContent>
          {this.renderContent()}
        </PositionContent>
      </Position>
    )
    /* eslint-enable jsx-a11y/mouse-events-have-key-events */
  }
}

export default MenuItemFlyout
