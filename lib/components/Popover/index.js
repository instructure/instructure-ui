import React, { Component } from 'react'
import PropTypes from 'prop-types'
import invariant from 'invariant'
import contains from '../../util/dom/contains'
import ContextBox from '../ContextBox'
import Position, { PositionTarget, PositionContent } from '../Position'
import CustomPropTypes from '../../util/CustomPropTypes'
import ComponentIdentifier, { pick } from '../../util/ComponentIdentifier'
import addEventListener from '../../util/dom/addEventListener'
import ownerDocument from '../../util/dom/ownerDocument'
import createChainedFunction from '../../util/createChainedFunction'
import safeCloneElement from '../../util/safeCloneElement'
import themeable from '../../themeable'
import shallowEqual from '../../util/shallowEqual'
import handleMouseOverOut from '../../util/handleMouseOverOut'

import styles from './styles.css'
import theme from './theme.js'

class PopoverTrigger extends ComponentIdentifier {
  static displayName = 'PopoverTrigger'
}

class PopoverContent extends ComponentIdentifier {
  static displayName = 'PopoverContent'
}

/**
---
category: utilities
---
  A `<Popover/>` is a small overlay of content that contains secondary information. Most of the time
  you can use a [Tooltip](#Tooltip) or a [PopoverMenu](#PopoverMenu) component, but if you need
  something custom, use a `<Popover/>`.

  ```jsx_example
  class App extends React.Component {
    render () {
      return (
        <div style={{ paddingBottom: 25 }}>
          <Popover on="click">
            <PopoverTrigger><Button>Click Me</Button></PopoverTrigger>
            <PopoverContent><Heading>Hello</Heading></PopoverContent>
          </Popover>
          &nbsp;
          <Popover>
            <PopoverTrigger><Link>Hover or Focus Me</Link></PopoverTrigger>
            <PopoverContent><Heading>Hello</Heading></PopoverContent>
          </Popover>
        </div>
      )
    }
  }

  <App />
  ```
**/
@themeable(theme, styles)
class Popover extends Component {
  static Trigger = PopoverTrigger;
  static Content = PopoverContent;

  static propTypes = {
    /**
     * Children of the `<Popover />`
     */
    children: CustomPropTypes.Children.oneOf([PopoverTrigger, PopoverContent]),

    /**
     * Where the content of the `<Popover />` should be placed.
     */
    placement: CustomPropTypes.placement,

    /**
     * The action that causes the Content to display (`click`, `hover`, `focus`)
     */
    on: PropTypes.oneOfType([
      PropTypes.oneOf(['click', 'hover', 'focus']),
      PropTypes.arrayOf(PropTypes.oneOf(['click', 'hover', 'focus']))
    ]),

    variant: PropTypes.oneOf(['default', 'inverse']),

    /**
     * Should the `<Popover />` hide when click happens outside it's content
     */
    rootClose: PropTypes.bool,

    /**
     * Whether or not the content should be rendered on initial render.
     */
    defaultShow: PropTypes.bool,

    renderOffscreen: PropTypes.bool,

    /**
    * Whether or not the `<Popover />` is shown (should be accompanied by `onToggle`)
    */
    show: CustomPropTypes.controllable(PropTypes.bool, 'onToggle', 'defaultShow'),

    /**
     *
     * A function that returns a reference to the content element
     */
    contentRef: PropTypes.func,

    /**
     * Call this function when the content visibility is toggled. When used with `show`,
     * `<Popover />` will not control its own state.
     */
    onToggle: PropTypes.func,

    /**
     * Callback fired when component is clicked
     */
    onClick: PropTypes.func,

    /**
     * Callback fired when trigger is focused
     */
    onFocus: PropTypes.func,

    /**
     * Callback fired when component is blurred
     */
    onBlur: PropTypes.func,

    /**
     * Callback fired when content is rendered and positioned
     */
    onReady: PropTypes.func,

    /**
     * Callback fired when mouse is over trigger
     */
    onMouseOver: PropTypes.func,

    /**
     * Callback fired when mouse leaves trigger
     */
    onMouseOut: PropTypes.func,

    /**
    * Should the popover display with an arrow
    */
    withArrow: PropTypes.bool,

    /**
     * The horizontal offset for the positioned content
     */
    offsetX: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),

    /**
     * The vertical offset for the positioned content
     */
    offsetY: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ])
  }

  static defaultProps = {
    placement: 'bottom center',
    variant: 'default',
    on: ['hover', 'focus'],
    contentRef: function (el) {},
    rootClose: true,
    defaultShow: false,
    withArrow: true
  }

  constructor (props) {
    super(props)

    this.state = {}

    if (props.show === undefined) {
      this.state.show = props.defaultShow
    }
  }

  componentWillMount () {
    this._handleMouseOver = handleMouseOverOut.bind(null, () => { this.show() })
    this._handleMouseOut = handleMouseOverOut.bind(null, () => { this.hide() })
  }

  componentDidMount () {
    if (this.props.rootClose) {
      this._addRootClose()
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    return !(shallowEqual(this.props, nextProps) &&
      shallowEqual(this.state, nextState)
    )
  }

  componentWillUnmount () {
    this._removeRootClose()
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.props.rootClose) {
      this._addRootClose()
    } else {
      this._removeRootClose()
    }
  }

  _addRootClose () {
    if (!this._removeBodyClick) {
      this._removeBodyClick = addEventListener(ownerDocument(this._content).body, 'click', this.handleBodyClick)
    }
  }

  _removeRootClose () {
    if (this._removeBodyClick && (typeof this._removeBodyClick.remove === 'function')) {
      this._removeBodyClick.remove()
      this._removeBodyClick = null
    }
  }

  handleBodyClick = (e) => {
    const { target } = e

    // Hide if body was clicked outside of trigger and content
    if (this.isShown &&
        !contains(this._trigger, target) &&
        !contains(this._content, target)) {
      // add set timeout so that selecting menu flyout still registers
      // even though it occurs outside of the popover content and trigger
      setTimeout(() => {
        this.hide()
      }, 0)
    }
  }

  get placement () {
    const { renderOffscreen, placement } = this.props
    return (!this.isShown && renderOffscreen) ? 'offscreen' : placement
  }

  get isShown () {
    return (this.props.show === undefined) ? this.state.show : this.props.show
  }

  show () {
    if (this.props.show === undefined) {
      this.setState({ show: true })
    }

    if (typeof this.props.onToggle === 'function') {
      this.props.onToggle(true)
    }
  }

  hide () {
    if (this.props.show === undefined) {
      this.setState({ show: false })
    }

    if (typeof this.props.onToggle === 'function') {
      this.props.onToggle(false)
    }
  }

  toggle () {
    if (this.isShown) {
      this.hide()
    } else {
      this.show()
    }
  }

  renderTrigger () {
    let trigger = pick(Popover.Trigger, this.props.children)

    if (trigger) {
      const { on } = this.props
      let onClick
      let onBlur
      let onFocus
      let onMouseOut
      let onMouseOver

      if (on.indexOf('click') > -1) {
        onClick = () => { this.toggle() }
      }

      if (on.indexOf('hover') > -1) {
        invariant(!(on === 'hover'),
          'Specifying only the `"hover"` trigger limits the visibilty of the overlay to just mouse users. ' +
          'Consider also including the `"focus"` trigger ' +
          'so that touch and keyboard only users can see the overlay as well.')

        onMouseOver = this._handleMouseOver
        onMouseOut = this._handleMouseOut
      }

      if (on.indexOf('focus') > -1) {
        onFocus = () => { this.show() }
        onBlur = () => { this.hide() }
      }

      trigger = safeCloneElement(trigger, {
        ...trigger.props,
        ref: (el) => { this._trigger = el },
        onClick: createChainedFunction(onClick, this.props.onClick),
        onBlur: createChainedFunction(onBlur, this.props.onBlur),
        onFocus: createChainedFunction(onFocus, this.props.onFocus),
        onMouseOut: createChainedFunction(onMouseOut, this.props.onMouseOut),
        onMouseOver: createChainedFunction(onMouseOver, this.props.onMouseOver)
      })
    }

    return trigger
  }

  renderContent () {
    let content = pick(Popover.Content, this.props.children)

    const {
      variant,
      withArrow
    } = this.props

    if (content) {
      if (this.isShown || this.props.renderOffscreen) {
        content = (
          <ContextBox
            className={styles.content}
            variant={variant}
            withArrow={withArrow}
          >
            {
              safeCloneElement(content, {
                ...content.props,
                ref: (el) => {
                  this._content = el
                  this.props.contentRef(el)
                }
              })
            }
          </ContextBox>
        )
      } else {
        content = null
      }
    }

    return content
  }

  render () {
    return (
      <Position
        trackPosition={this.isShown}
        placement={this.placement}
        onReady={this.props.onReady}
        offsetX={this.props.offsetX}
        offsetY={this.props.offsetY}
      >
        <PositionTarget>{this.renderTrigger()}</PositionTarget>
        <PositionContent>{this.renderContent()}</PositionContent>
      </Position>
    )
  }
}

export default Popover
export { PopoverTrigger, PopoverContent }
