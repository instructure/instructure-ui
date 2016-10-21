import React, { Component, PropTypes } from 'react'
import CustomPropTypes from '../../util/CustomPropTypes'
import { pickProps } from '../../util/passthroughProps'
import createChainedFunction from '../../util/createChainedFunction'
import safeCloneElement from '../../util/safeCloneElement'

import shortid from 'shortid'

import Button from '../Button'
import Menu, { MenuItem, MenuItemSeparator } from '../Menu'
import Popover, { PopoverTrigger, PopoverContent } from '../Popover'

/**
  [WIP]

  The `<PopoverMenu/>` component provides a toggle button which, when clicked, shows or hides a [Menu](#Menu) in a
  [Popover](#Popover).

  ```jsx_example
  <Grid hAlign="center">
    <GridRow>
      <GridCol width="auto">
        <PopoverMenu defaultShow zIndex="9999" trigger={
          <Button>
            <ScreenReaderContent>More</ScreenReaderContent>
            &hellip;
          </Button>
        }>
          <MenuItem>Learning Mastery</MenuItem>
          <MenuItem disabled>Gradebook</MenuItem>
          <MenuItem type="radio" defaultChecked>
            Default (Grid view)
          </MenuItem>
          <MenuItem type="radio">
            Individual (List view)
          </MenuItem>
          <MenuItem type="checkbox" defaultChecked>
            Include Anchor Standards
          </MenuItem>
          <MenuItemSeparator />
          <MenuItem>Open grading history...</MenuItem>
        </PopoverMenu>
      </GridCol>
    </GridRow>
  </Grid>
  ```
**/
export default class PopoverMenu extends Component {
  static propTypes = {
    /**
    * the trigger button
    */
    trigger: PropTypes.node,
    /**
    * text to display inside the trigger button
    */
    label: PropTypes.node,
    placement: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
    /**
    * children of type `MenuItem` or `MenuItemSeparator`
    */
    children: CustomPropTypes.Children.oneOf([MenuItem, MenuItemSeparator]),
    /**
    * should the menu be open for the initial render
    */
    defaultShow: PropTypes.bool,
    /**
    * is the menu open (should be accompanied by `onToggle`)
    */
    show: CustomPropTypes.controllable(PropTypes.bool, 'onToggle', 'defaultShow'),
    /**
    * Call this function when the menu is toggled open/closed. When used with `show`,
    * the component will not control its own state.
    */
    onToggle: PropTypes.func,
    onSelect: PropTypes.func,
    onClose: PropTypes.func,
    onFocus: PropTypes.func
  }

  static defaultProps = {
    placement: 'bottom',
    defaultShow: false
  }

  constructor (props) {
    super()

    if (props.show === undefined) {
      this.state = {
        show: props.defaultShow,
        shouldFocusMenu: props.defaultShow
      }
    }

    this.labelId = 'PopoverMenu__' + shortid.generate()
  }

  get show () {
    return (this.props.show === undefined) ? this.state.show : this.props.show
  }

  setShow (show) {
    if (this.props.show === undefined) {
      this.setState({
        show
      })
    }

    if (show) {
      this.setState({ shouldFocusMenu: true })
    } else {
      this.focus()
    }
  }

  handleToggle = () => {
    this.setShow(!this.show)
  }

  handleClose = (e) => {
    this.setShow(false)
  }

  handleFocus = () => {
    if (this.show) {
      // focus the menu on the next render
      this.setState({ shouldFocusMenu: true })
    }
  }

  focus () {
    this._trigger.focus()
  }

  render () {
    const {
      label,
      onClose,
      onSelect,
      onFocus,
      onToggle,
      children
    } = this.props

    const menu = (
      <Menu
        labelledBy={this.labelId}
        hidden={!this.show}
        focus={this.show && this.state.shouldFocusMenu}
        onSelect={createChainedFunction(onSelect, this.handleClose)}
        onClose={createChainedFunction(onClose, this.handleClose)}>
        {children}
      </Menu>
    )

    if (this.state.shouldFocusMenu) {
      // don't use setState to avoid rerender
      this.state.shouldFocusMenu = false
    }

    const trigger = this.props.trigger || <Button>{label}</Button>

    return (
      <Popover
        {...pickProps(this.props, Popover.propTypes)}
        show={this.show}
        on={['click']}
        onToggle={createChainedFunction(onToggle, this.handleToggle)}
        onFocus={createChainedFunction(onFocus, this.handleFocus)}>
        <PopoverTrigger>
          {
            safeCloneElement(trigger, {
              ...trigger.props,
              role: 'button',
              tabIndex: 0,
              ref: (c) => { this._trigger = c },
              'aria-haspopup': true,
              id: this.labelId
            })
          }
        </PopoverTrigger>
        <PopoverContent>
          {menu}
        </PopoverContent>
      </Popover>
    )
  }
}
