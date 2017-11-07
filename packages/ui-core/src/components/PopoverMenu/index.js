import React, { Component } from 'react'
import PropTypes from 'prop-types'

import uid from '@instructure/ui-utils/lib/uid'
import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'
import { pickProps } from '@instructure/ui-utils/lib/react/passthroughProps'
import createChainedFunction from '@instructure/ui-utils/lib/createChainedFunction'
import safeCloneElement from '@instructure/ui-utils/lib/react/safeCloneElement'
import containsActiveElement from '@instructure/ui-utils/lib/dom/containsActiveElement'
import shallowEqual from '@instructure/ui-utils/lib/shallowEqual'
import requestAnimationFrame from '@instructure/ui-utils/lib/dom/requestAnimationFrame'
import themeable from '@instructure/ui-themeable'
import deprecated from '@instructure/ui-utils/lib/react/deprecated'

import Menu, { MenuItem, MenuItemGroup, MenuItemSeparator, MenuItemFlyout } from '../Menu'
import Popover, { PopoverTrigger, PopoverContent } from '../Popover'

import styles from './styles.css'
import theme from './theme'

/**
---
category: components/navigation
---
  The `<PopoverMenu/>` component provides a toggle button which, when clicked, shows or hides a [Menu](#Menu) in a
  [Popover](#Popover).

  Note: The `<PopoverMenu/>` cannot contain content that is not a `<MenuItem/>` (links or buttons). If
  you need to include more complex content, take a look at [Popover](#Popover) with the `shouldContainFocus`
  and `applicationElement` properties.

  ```jsx_example
  ---
  render: false
  ---
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
      <Container padding="medium" textAlign="center">
        <PopoverMenu
          placement="bottom"
          onSelect={function () { console.log(arguments) }}
          trigger={
            <Button>
              Menu
            </Button>
          }
        >
          <MenuItem value="mastery">Learning Mastery</MenuItem>
          <MenuItem href="https://instructure.github.io/instructure-ui/">Default (Grid view)</MenuItem>
          <MenuItem disabled>Individual (List view)</MenuItem>
          <MenuItemFlyout label="More Options">
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
            <MenuItem value="navigation">Navigation</MenuItem>
            <MenuItem value="set">Set as default</MenuItem>
          </MenuItemFlyout>
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
          <MenuItem value="baz">Open grading history...</MenuItem>
        </PopoverMenu>
      </Container>
      )
    }
  }

  render(<Example />)
  ```
**/

@deprecated('3.0.0', {
  focusTriggerOnClose: 'shouldFocusTriggerOnClose'
})
@themeable(theme, styles)
export default class PopoverMenu extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    /**
    * the trigger element
    */
    trigger: PropTypes.node.isRequired,

    placement: CustomPropTypes.placement,

    /**
    * children of type `MenuItem`, `MenuItemGroup`, or `MenuItemSeparator`
    */
    children: CustomPropTypes.Children.oneOf([MenuItem, MenuItemGroup, MenuItemSeparator, MenuItemFlyout]),
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
    onFocus: PropTypes.func,
    /**
     * A function that returns a reference to the content element
     */
    contentRef: PropTypes.func,
    /**
    * Should the trigger receive focus after close
    */
    shouldFocusTriggerOnClose: PropTypes.bool
  }
  /* eslint-enable react/require-default-props */

  static defaultProps = {
    placement: 'bottom center',
    defaultShow: false,
    contentRef: function (el) {},
    shouldFocusTriggerOnClose: true
  }

  constructor (props) {
    super()

    this.state = {}

    if (props.show === undefined) {
      this.state.show = props.defaultShow
    }

    this.labelId = `PopoverMenu__${uid()}`
    this.raf = []
  }

  shouldComponentUpdate (nextProps, nextState) {
    return !(shallowEqual(this.props, nextProps) && shallowEqual(this.state, nextState))
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.props.show !== prevProps.show || this.state.show !== prevState.show) {
      this.maybeFocusTrigger()
    }
  }

  componentWillUnmount () {
    this._unmounted = true
    this.raf.forEach(request => {
      request.cancel()
    })
    this.raf = []
  }

  get show () {
    return this.props.show === undefined ? this.state.show : this.props.show
  }

  maybeFocusTrigger () {
    if (!this.show && this.props.shouldFocusTriggerOnClose) {
      this.focusTrigger()
    }
  }

  toggleShow (callback) {
    let show
    this.setState(
      (state, props) => {
        show = props.show === undefined ? !state.show : !props.show
        return { show }
      },
      () => {
        if (typeof callback === 'function') {
          callback()
        }

        if (typeof this.props.onToggle === 'function') {
          this.props.onToggle(show)
        }

        if (!show && typeof this.props.onClose === 'function') {
          this.props.onClose()
        }
      }
    )
  }

  handleToggle = show => {
    if (show !== this.show) {
      this.toggleShow()
    }
  }

  handleMenuDismiss = e => {
    this.toggleShow()
  }

  handleMenuSelect = (e, value, selected) => {
    this.toggleShow(args => {
      if (typeof this.props.onSelect === 'function') {
        this.props.onSelect(e, value, selected)
      }
    })
  }

  handleFocus = () => {
    // focus the menu on the next render
    this.focusMenu()
  }

  handlePopoverShown = () => {
    // Focus on Menu has to happen after it's been positioned or else
    // document will scroll to the bottom where Popover initially
    // inserts into the DOM.
    this.raf.push(
      requestAnimationFrame(() => {
        this.focusMenu()
      })
    )
  }

  focusMenu () {
    // Don't focus the menu if it already has focus
    if (this._unmounted || (this._menu && containsActiveElement(this._menu))) {
      return
    }

    if (this.show) {
      this._menu.focus()
    }
  }

  focusTrigger () {
    if (!this.show) {
      this._trigger.focus()
    }
  }

  focus () {
    if (this.show) {
      this.focusMenu()
    } else {
      this.focusTrigger()
    }
  }

  render () {
    const { onFocus, children } = this.props

    const menu = (
      <div className={styles.menu}>
        <Menu
          labelledBy={this.labelId}
          hidden={!this.show}
          ref={el => {
            this._menu = el
          }}
          onSelect={this.handleMenuSelect}
          onDismiss={this.handleMenuDismiss}
        >
          {children}
        </Menu>
      </div>
    )

    return (
      <Popover
        {...pickProps(this.props, Popover.propTypes)}
        show={this.show}
        on={['click']}
        onToggle={this.handleToggle}
        onFocus={createChainedFunction(onFocus, this.handleFocus)}
        onShow={this.handlePopoverShown}
        shouldCloseOnEscape={false}
      >
        <PopoverTrigger>
          {safeCloneElement(this.props.trigger, {
            role: 'button',
            tabIndex: 0,
            ref: c => {
              this._trigger = c
            },
            'aria-haspopup': true,
            id: this.labelId
          })}
        </PopoverTrigger>
        <PopoverContent aria-expanded={this.show}>
          {menu}
        </PopoverContent>
      </Popover>
    )
  }
}
