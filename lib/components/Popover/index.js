import React, { Children, Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import CustomPropTypes from '../../util/CustomPropTypes'
import OverlayTrigger from '../../util/OverlayTrigger'
import createChainedFunction from '../../util/createChainedFunction'
import safeCloneElement from '../../util/safeCloneElement'
import { contains } from 'dom-helpers'

import PopoverTrigger from './PopoverTrigger'
import PopoverContent from './PopoverContent'

/**
  A `<Popover/>` is a small overlay of content that contains secondary information. Most of the time
  you can use a [Tooltip](#Tooltip) or a [PopoverMenu](#PopoverMenu) component, but if you need
  something custom, use a `<Popover/>`.

  ```jsx_example
    <div>
        <Popover on="click">
          <PopoverTrigger><Button>Click Me</Button></PopoverTrigger>
          <PopoverContent>
            <Heading>Hello</Heading>
          </PopoverContent>
        </Popover>
        &nbsp;
        <Popover>
          <PopoverTrigger><Link>Hover or Focus Me</Link></PopoverTrigger>
          <PopoverContent>
            <Heading>Hello</Heading>
          </PopoverContent>
        </Popover>
    </div>
  ```
**/
export default class Popover extends Component {
  static propTypes = {
    /**
     * The action that causes the PopoverContent to display (`click`, `hover`, `focus`)
     */
    on: PropTypes.oneOfType([
      PropTypes.oneOf(['click', 'hover', 'focus']),
      PropTypes.arrayOf(PropTypes.oneOf(['click', 'hover', 'focus']))
    ]),
    placement: PropTypes.oneOf(['top', 'bottom', 'left', 'right']), // TODO: support horizontal and vertical placement
    variant: PropTypes.oneOf(['default', 'inverse']),
    /**
     * Should the Popover hide when clicks happen outside its content
     */
    rootClose: PropTypes.bool,
    /**
    * children of type `Button` or `Link`
    */
    children: CustomPropTypes.validChildren([PopoverTrigger, PopoverContent]),
    /**
    * should the menu be open for the initial render
    */
    defaultShow: PropTypes.bool,
    /**
    * is the menu open (should be accompanied by `onToggle`)
    */
    show: CustomPropTypes.controllable(PropTypes.bool, 'onToggle', 'defaultShow'),
    /**
    * Call this function when the content visibility is toggled. When used with `show`,
    * the component will not control its own state.
    */
    onToggle: PropTypes.func,
    /**
     * Callback fired when component is clicked
     */
    onClick: PropTypes.func,
    /**
     * Callback fired when component is focused
     */
    onFocus: PropTypes.func,
    /**
     * Callback fired when focus leaves the component
     */
    onBlur: PropTypes.func
  }

  static defaultProps = {
    on: ['hover', 'focus'],
    variant: 'default',
    placement: 'bottom',
    defaultShow: false,
    rootClose: true
  }

  constructor (props) {
    super()

    if (props.show === undefined) {
      this.state = {
        show: props.defaultShow
      }
    }
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
  }

  handleToggle = (e) => {
    const show = !this.show
    this.setShow(show)
  }

  handleClose = (e) => {
    if (e && contains(ReactDOM.findDOMNode(this._trigger), e.target)) {
      return
    }

    if (this.show) {
      this.setShow(false)
    }
  }

  focus () {
    this._trigger.focus()
  }

  parseChildren () {
    const results = {
      trigger: null,
      content: null
    }

    const {
      placement,
      variant,
      children
    } = this.props

    Children.forEach(children, (child) => {
      if (child.type === PopoverTrigger) {
        results.trigger = safeCloneElement(child, {
          ...child.props,
          ref: (c) => { this._trigger = c }
        })
      } else if (child.type === PopoverContent) {
        results.content = safeCloneElement(child, {
          ...child.props,
          ref: (c) => { this._content = c },
          placement,
          variant,
          show: this.show
        })
      } else {
        return child
      }
    })

    return results
  }

  render () {
    const {
      placement,
      onToggle,
      on,
      ...props
    } = this.props

    const children = this.parseChildren()

    delete props.defaultShow // make OverlayTrigger controlled

    return (
      <OverlayTrigger
        {...props}
        ref={(c) => { this._node = c }}
        container={document.body}
        trigger={on}
        overlay={children.content}
        placement={placement}
        shouldUpdatePosition
        onToggle={createChainedFunction(onToggle, this.handleToggle)}
        onClose={this.handleClose}
        onHide={this.handleClose}
        show={this.show}>
        {children.trigger}
      </OverlayTrigger>
    )
  }
}

export { default as PopoverTrigger } from './PopoverTrigger'
export { default as PopoverContent } from './PopoverContent'
