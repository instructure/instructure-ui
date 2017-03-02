import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import CustomPropTypes from '../../util/CustomPropTypes'
import { pickProps } from '../../util/passthroughProps'
import createChainedFunction from '../../util/createChainedFunction'
import safeCloneElement from '../../util/safeCloneElement'
import shallowEqual from '../../util/shallowEqual'

import shortid from 'shortid'

import Button from '../Button'

import Menu, { MenuItem, MenuItemGroup, MenuItemSeparator } from '../Menu'
import Popover, { PopoverTrigger, PopoverContent } from '../Popover'

/**
---
category: navigation
---
  The `<PopoverMenu/>` component provides a toggle button which, when clicked, shows or hides a [Menu](#Menu) in a
  [Popover](#Popover).

  ```js_example

  class Example extends React.Component {
    constructor (props) {
      super(props)

      this.state = {
        singleSelection: ['itemOne'],
        multipleSelection: ['optionOne', 'optionThree']
      }
    }

    handleSingleSelect = (e, newSelected) => {
      this.setState({
        singleSelection: newSelected
      })
    };

    handleMultipleSelect = (e, newSelected) => {
      this.setState({
        multipleSelection: newSelected
      })
    };

    render () {
      return (
        <Grid hAlign="center">
          <GridRow>
            <GridCol width="auto">
              <PopoverMenu
                onSelect={function () { console.log(arguments) }}
                defaultShow
                trigger={
                  <Button>
                    <ScreenReaderContent>More</ScreenReaderContent>
                    &hellip;
                  </Button>
                }
              >
                <MenuItem href="example.html">Default (Grid view)</MenuItem>
                <MenuItem value="foo">Learning Mastery</MenuItem>
                <MenuItem disabled>Individual (List view)</MenuItem>
                <MenuItemSeparator />
                <MenuItemGroup
                  label="Select One"
                  selected={this.state.singleSelection}
                  onSelect={this.handleSingleSelect}
                >
                  <MenuItem value="itemOne">
                    Item 1
                  </MenuItem>
                  <MenuItem value="itemTwo">
                    Item 2
                  </MenuItem>
                </MenuItemGroup>
                <MenuItemSeparator />
                <MenuItemGroup
                  allowMultiple
                  label="Select Many"
                  selected={this.state.multipleSelection}
                  onSelect={this.handleMultipleSelect}
                >
                  <MenuItem value="optionOne">
                    Option 1
                  </MenuItem>
                  <MenuItem value="optionTwo">
                    Option 2
                  </MenuItem>
                  <MenuItem value="optionThree">
                    Option 3
                  </MenuItem>
                </MenuItemGroup>
                <MenuItemSeparator />
                <MenuItem value="baz">Open grading history...</MenuItem>
              </PopoverMenu>
            </GridCol>
          </GridRow>
        </Grid>
      )
    }
  }

  <Example />
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
    * children of type `MenuItem`, `MenuItemGroup`, or `MenuItemSeparator`
    */
    children: CustomPropTypes.Children.oneOf([MenuItem, MenuItemGroup, MenuItemSeparator]),
    /**
    * should the menu be open for the initial render
    */
    defaultShow: PropTypes.bool,
    /**
     * A function that returns a reference to the content element
     */
    contentRef: PropTypes.func,

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
  };

  static defaultProps = {
    placement: 'bottom',
    defaultShow: false,
    contentRef: function (el) {}
  };

  constructor (props) {
    super()

    this.state = {}
    if (props.show === undefined) {
      this.state.show = props.defaultShow
    }

    this.labelId = 'PopoverMenu__' + shortid.generate()
  }

  shouldComponentUpdate (nextProps, nextState) {
    return !(shallowEqual(this.props, nextProps) &&
      shallowEqual(this.state, nextState)
    )
  }

  componentDidMount () {
    this.focusIfNeeded()
  }

  componentDidUpdate () {
    this.focusIfNeeded()
  }

  componentWillUnmount () {
    this._isUnmounted = true
  }

  get show () {
    return (this.props.show === undefined) ? this.state.show : this.props.show
  }

  focusIfNeeded = () => {
    if (!this.show) {
      this.focus()
    }
  }

  setShow (show) {
    if (this.props.show === undefined) {
      this.setState({
        show
      })
    }
  }

  handleToggle = () => {
    this.setShow(!this.show)
  }

  handleClose = (e) => {
    this.setShow(false)
  }

  handleFocus = () => {
    // focus the menu on the next render
    this.focusMenu()
  }

  handlePopoverReady = () => {
    // Focus on Menu has to happen after it's been positioned or else
    // document will scroll to the bottom where Popover initially
    // inserts into the DOM.
    this.focusMenu()
  }

  focusMenu () {
    // Don't focus the menu if it already has focus
    if (this._menu) {
      const menuNode = ReactDOM.findDOMNode(this._menu)
      if (menuNode && (
          menuNode === document.activeElement ||
          menuNode.contains(document.activeElement)
      )) {
        return
      }
    }

    if (!this._isUnmounted && this.show) {
      this._menu.focus()
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
        focus={this.show}
        ref={(el) => { this._menu = el }}
        onSelect={createChainedFunction(onSelect, this.handleClose)}
        onClose={createChainedFunction(onClose, this.handleClose)}
      >
        {children}
      </Menu>
    )

    const trigger = this.props.trigger || <Button>{label}</Button>

    return (
      <Popover
        {...pickProps(this.props, Popover.propTypes)}
        show={this.show}
        on={['click']}
        onToggle={createChainedFunction(onToggle, this.handleToggle)}
        onFocus={createChainedFunction(onFocus, this.handleFocus)}
        onReady={this.handlePopoverReady}
      >
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
        <PopoverContent aria-expanded={this.show}>
          {menu}
        </PopoverContent>
      </Popover>
    )
  }
}
