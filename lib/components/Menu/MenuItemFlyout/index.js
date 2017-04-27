import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import keycode from 'keycode'

import Menu from '../../Menu'
import MenuItem from '../MenuItem'
import MenuItemSeparator from '../MenuItemSeparator'
import MenuItemGroup from '../MenuItemGroup'
import ContextBox from '../../ContextBox'
import Position, { PositionTarget, PositionContent } from '../../Position'

import CustomPropTypes from '../../../util/CustomPropTypes'
import createChainedFunction from '../../../util/createChainedFunction'
import themeable from '../../../themeable'

import styles from './styles.css'
import theme from './theme.js'

@themeable(theme, styles)
class MenuItemFlyout extends Component {
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
    onClose: PropTypes.func,
    /**
    * call this function when menu flyout's parent menu is closed
    */
    onParentClose: PropTypes.func,
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
    * the id of the element that the menu items within flyout will act upon
    */
    controls: PropTypes.string,
    /**
    * the id of the element that contains the text description of the menu flyout
    */
    labelledBy: PropTypes.string,
    title: PropTypes.string
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

  handlePositionReady = () => {
    if (this._menuItemTriggerClicked) {
      this._menu.focus()
    }
    this._menuItemTriggerClicked = false
  }

  handleMenuItemTriggerClick = () => {
    // We don't focus the first flyout menu item on trigger
    // hover so we set a boolean here in order to check in
    // handlePopoverReady if the popover was initialized
    // by a click or hover event
    if (!this.state.show) {
      this._menuItemTriggerClicked = true
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

  handleMenuClose = (e) => {
    const {
      onClose,
      onParentClose
    } = this.props

    this.setShow(false, () => {
      this.focus()
    })

    if (typeof onClose === 'function') {
      onClose(e)
    }

    // Close parent menu on tab
    if ((typeof onParentClose === 'function') &&
        (e.keyCode === keycode.codes.tab)) {
      onParentClose(e)
    }
  }

  handleMenuKeyDown = (e) => {
    if (e.keyCode === keycode.codes.left) {
      e.preventDefault()
      e.stopPropagation()
      this.handleMenuClose(e)
    }
  }

  focus () {
    this._menuItemTrigger.focus()
  }

  get focused () {
    return (document.activeElement === ReactDOM.findDOMNode(this._menuItemTrigger))
  }

  renderContent () {
    const {
      children,
      title,
      controls,
      labelledBy,
      onSelect
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
              onClose={this.handleMenuClose}
              onKeyDown={this.handleMenuKeyDown}
              onSelect={onSelect}
              ref={(el) => { this._menu = el }}
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
        onReady={this.handlePositionReady}
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
            ref={(el) => { this._menuItemTrigger = el }}
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
