import React, { Component } from 'react'
import PropTypes from 'prop-types'

import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'
import ComponentIdentifier, { pick } from '@instructure/ui-utils/lib/react/ComponentIdentifier'
import createChainedFunction from '@instructure/ui-utils/lib/createChainedFunction'
import safeCloneElement from '@instructure/ui-utils/lib/react/safeCloneElement'
import shallowEqual from '@instructure/ui-utils/lib/shallowEqual'
import handleMouseOverOut from '@instructure/ui-utils/lib/dom/handleMouseOverOut'
import { pickProps } from '@instructure/ui-utils/lib/react/passthroughProps'
import deprecated from '@instructure/ui-utils/lib/react/deprecated'
import warning from '@instructure/ui-utils/lib/warning'

import ContextBox from '../ContextBox'
import Position, { PositionTarget, PositionContent } from '../Position'
import Dialog from '../Dialog'
import CloseButton from '../CloseButton'

class PopoverTrigger extends ComponentIdentifier {
  static displayName = 'PopoverTrigger'
}

class PopoverContent extends ComponentIdentifier {
  static displayName = 'PopoverContent'
}

/**
---
category: components/dialogs
---
  A `<Popover/>` is a small overlay of content that contains secondary information. Most of the time
  you can use a [Tooltip](#Tooltip) or a [PopoverMenu](#PopoverMenu) component, but if you need
  something custom that behaves more like a dialog, use a `<Popover/>`.

  ```jsx_example
  ---
  render: false
  ---
  class Example extends React.Component {
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

  render(<Example />)
  ```

  `<Popover />` can act as a dialog with a close button. With the `shouldContainFocus` and `applicationElement`
  properties set, it will trap focus inside the `<Popover />`.

```jsx_example
---
render: false
---
class Example extends React.Component {
  render () {
    return (
      <Container padding="large 0">
        <Popover
          on="click"
          shouldContainFocus
          shouldReturnFocus
          closeButtonLabel="Close"
          applicationElement={() => document.getElementById('app')}

          label="Popover Dialog Example"
          offsetY="16px"
        >
          <PopoverTrigger><Button>Sign In</Button></PopoverTrigger>
          <PopoverContent>
            <Container padding="medium" display="block" as="form">
              <FormFieldGroup description="Log In">
                <TextInput label="Username" inputRef={(el) => { if (el) { this._username = el } }}/>
                <TextInput label="Password" type="password" />
              </FormFieldGroup>
            </Container>
          </PopoverContent>
        </Popover>
      </Container>
    )
  }
}

render(<Example />)
```
**/

@deprecated('3.0.0', {
  renderOffscreen: 'shouldRenderOffscreen',
  rootClose: 'shouldCloseOnDocumentClick'
})
class Popover extends Component {
  static Trigger = PopoverTrigger
  static Content = PopoverContent

  static propTypes = {
    /**
     * Children of the `<Popover />`
     */
    children: CustomPropTypes.Children.oneOf([PopoverTrigger, PopoverContent]),

    /**
     * The placement of the content in relation to the trigger
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
     * Whether or not the content should be rendered on initial render.
     */
    defaultShow: PropTypes.bool,

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
    onShow: PropTypes.func,

    /**
     * Callback fired when mouse is over trigger
     */
    onMouseOver: PropTypes.func,

    /**
     * Callback fired when mouse leaves trigger
     */
    onMouseOut: PropTypes.func,

    /**
     * Callback fired when the `<Popover />` requests to be hidden (via close button, escape key, etc.)
     */
    onDismiss: PropTypes.func,

    /**
    * Should the `<Popover />` display with an arrow pointing to the trigger
    */
    withArrow: PropTypes.bool,

    /**
     * An accessible label for the close button. The close button won't display without this label.
     */
    closeButtonLabel: PropTypes.string,

    /**
     *
     * A function that returns a reference to the close button element
     */
    closeButtonRef: PropTypes.func,

    /**
     * An accessible label for the `<Popover />` content
     */
    label: PropTypes.string,

    /**
     * An element or a function returning an element to focus by default
     */
    defaultFocusElement: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    /**
     * An element or a function returning an element to apply `aria-hidden` to
     */
    applicationElement: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element, PropTypes.func]),

    /**
    * Should the `<Popover />` render offscreen when visually hidden
    */
    shouldRenderOffscreen: PropTypes.bool,

    /**
     * Whether focus should contained within the `<Popover/>` when it is open
     */
    shouldContainFocus: PropTypes.bool,

    /**
     * Whether focus should be returned to the trigger when the `<Popover/>` is closed
     */
    shouldReturnFocus: PropTypes.bool,

    /**
     * Should the `<Popover />` hide when clicks occur outside the content
     */
    shouldCloseOnDocumentClick: PropTypes.bool,

    /**
     * Should the `<Popover />` hide when the escape key is pressed
     */
    shouldCloseOnEscape: PropTypes.bool,

    /**
     * The horizontal offset for the positioned content
     */
    offsetX: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    /**
     * The vertical offset for the positioned content
     */
    offsetY: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    /**
     * Callback fired when the position changes
     */
    onPositionChanged: PropTypes.func,

    /**
     * Callback fired when content has been mounted and is initially positioned
     */
    onPositioned: PropTypes.func,

    /**
     * Whether or not position should be tracked or just set on initial render
     */
    trackPosition: PropTypes.bool,

    /**
     * Should the `<Popover />` be positioned within some container.
     */
    constrain: Position.propTypes.constrain,

    /**
     * An element or a function returning an element to use as the mount node
     * for the `<Popover />` (defaults to `document.body`)
     */
    mountNode: PropTypes.oneOfType([CustomPropTypes.element, PropTypes.func]),

    /**
     * Insert the element at the 'top' of the mountNode or at the 'bottom'
     */
    insertAt: PropTypes.oneOf(['bottom', 'top']),
    /**
     * Target element for positioning the Popover (if it differs from the trigger)
     */
    positionTarget: PropTypes.oneOfType([CustomPropTypes.element, PropTypes.func])
  }

  static defaultProps = {
    children: null,
    show: undefined,
    onToggle: open => {},
    onClick: event => {},
    onFocus: event => {},
    onBlur: event => {},
    onMouseOver: event => {},
    onMouseOut: event => {},
    onShow: position => {},
    onDismiss: event => {},
    placement: 'bottom center',
    offsetX: 0,
    offsetY: 0,
    variant: 'default',
    on: ['hover', 'focus'],
    contentRef: el => {},
    closeButtonRef: el => {},
    defaultShow: false,
    withArrow: true,
    trackPosition: true,
    constrain: 'window',
    onPositioned: position => {},
    onPositionChanged: position => {},
    closeButtonLabel: null,
    shouldRenderOffscreen: false,
    shouldContainFocus: false,
    shouldReturnFocus: true,
    shouldCloseOnDocumentClick: true,
    shouldCloseOnEscape: true,
    applicationElement: null,
    defaultFocusElement: null,
    label: null,
    mountNode: null,
    insertAt: 'bottom',
    positionTarget: null
  }

  constructor (props) {
    super(props)

    this.state = {
      placement: props.placement
    }

    if (props.show === undefined) {
      this.state.show = props.defaultShow
    }
  }

  componentWillMount () {
    this._handleMouseOver = handleMouseOverOut.bind(null, () => {
      this.show()
    })
    this._handleMouseOut = handleMouseOverOut.bind(null, () => {
      this.hide()
    })
  }

  shouldComponentUpdate (nextProps, nextState) {
    return !(shallowEqual(this.props, nextProps) && shallowEqual(this.state, nextState))
  }

  get placement () {
    const { shouldRenderOffscreen, placement } = this.props
    return !this.shown && shouldRenderOffscreen ? 'offscreen' : placement
  }

  get shown () {
    return this.props.show === undefined ? this.state.show : this.props.show
  }

  show = () => {
    if (this.props.show === undefined) {
      this.setState({ show: true })
    }

    if (typeof this.props.onToggle === 'function') {
      this.props.onToggle(true)
    }
  }

  hide = () => {
    if (this.props.show === undefined) {
      this.setState({ show: false })
    }

    if (typeof this.props.onToggle === 'function') {
      this.props.onToggle(false)
    }
  }

  toggle = () => {
    if (this.shown) {
      this.hide()
    } else {
      this.show()
    }
  }

  handlePositionChanged = ({ placement }) => {
    this.setState({
      closeButtonPlacement: this.getCloseButtonPlacement(this.props),
      placement
    })
  }

  getCloseButtonPlacement (props) {
    const placement = props.placement.split(' ')

    if (placement.indexOf('end') >= 0) {
      return 'start'
    } else {
      return 'end'
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
        onClick = () => {
          this.toggle()
        }
      }

      if (on.indexOf('hover') > -1) {
        warning(
          !(on === 'hover'),
          '[Popover] Specifying only the `"hover"` trigger limits the visibilty of the overlay to just mouse users. ' +
            'Consider also including the `"focus"` trigger ' +
            'so that touch and keyboard only users can see the overlay as well.'
        )

        onMouseOver = this._handleMouseOver
        onMouseOut = this._handleMouseOut
      }

      if (on.indexOf('focus') > -1) {
        onFocus = () => {
          this.show()
        }
        onBlur = () => {
          this.hide()
        }
      }

      trigger = safeCloneElement(trigger, {
        ref: el => {
          this._trigger = el
        },
        onClick: createChainedFunction(onClick, this.props.onClick),
        onBlur: createChainedFunction(onBlur, this.props.onBlur),
        onFocus: createChainedFunction(onFocus, this.props.onFocus),
        onMouseOut: createChainedFunction(onMouseOut, this.props.onMouseOut),
        onMouseOver: createChainedFunction(onMouseOver, this.props.onMouseOver)
      })
    }

    return trigger
  }

  get defaultFocusElement () {
    return this.props.defaultFocusElement || (() => this._closeButton)
  }

  renderCloseButton () {
    return this.props.closeButtonLabel
      ? <CloseButton
        placement={this.state.closeButtonPlacement}
        offset="x-small"
        variant={this.props.variant === 'inverse' ? 'icon-inverse' : 'icon'}
        buttonRef={el => {
          this._closeButton = el
          this.props.closeButtonRef(el)
        }}
        onClick={this.hide}
      >
        {this.props.closeButtonLabel}
      </CloseButton>
      : null
  }

  renderContent () {
    let content = pick(Popover.Content, this.props.children)

    if (this.shown) {
      content = (
        <Dialog
          {...pickProps(this.props, Dialog.propTypes)}
          open={this.shown}
          onDismiss={this.hide}
          defaultFocusElement={this.defaultFocusElement}
        >
          {this.renderCloseButton()}
          {content}
        </Dialog>
      )
    }

    if (this.shown || this.props.shouldRenderOffscreen) {
      return (
        <ContextBox
          {...pickProps(this.props, ContextBox.propTypes)}
          elementRef={this.props.contentRef}
          placement={this.state.placement}
        >
          {content}
        </ContextBox>
      )
    } else {
      return null
    }
  }

  render () {
    const positionTarget = this.props.positionTarget

    const positionProps = {
      ...pickProps(this.props, Position.propTypes),
      trackPosition: this.shown,
      placement: this.placement,
      onPositioned: createChainedFunction(this.handlePositionChanged, this.props.onShow),
      onPositionChanged: this.handlePositionChanged,
      target: positionTarget
    }

    if (positionTarget) {
      return (
        <span>
          {this.renderTrigger()}
          <Position {...positionProps}>
            <PositionContent>
              {this.renderContent()}
            </PositionContent>
          </Position>
        </span>
      )
    } else {
      return (
        <Position {...positionProps}>
          <PositionTarget>
            {this.renderTrigger()}
          </PositionTarget>
          <PositionContent>
            {this.renderContent()}
          </PositionContent>
        </Position>
      )
    }
  }
}

export default Popover
export { PopoverTrigger, PopoverContent }
