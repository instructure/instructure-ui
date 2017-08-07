import React, { Component } from 'react'
import PropTypes from 'prop-types'
import invariant from 'invariant'

import ContextBox from '../ContextBox'
import Position, { PositionTarget, PositionContent } from '../Position'
import Dialog from '../Dialog'
import CloseButton from '../CloseButton'

import CustomPropTypes from '../../util/CustomPropTypes'
import ComponentIdentifier, { pick } from '../../util/ComponentIdentifier'
import createChainedFunction from '../../util/createChainedFunction'
import safeCloneElement from '../../util/safeCloneElement'
import shallowEqual from '../../util/shallowEqual'
import handleMouseOverOut from '../../util/handleMouseOverOut'
import { pickProps } from '../../util/passthroughProps'

class PopoverTrigger extends ComponentIdentifier {
  static displayName = 'PopoverTrigger'
}

class PopoverContent extends ComponentIdentifier {
  static displayName = 'PopoverContent'
}

/**
---
category: dialogs
---
  A `<Popover/>` is a small overlay of content that contains secondary information. Most of the time
  you can use a [Tooltip](#Tooltip) or a [PopoverMenu](#PopoverMenu) component, but if you need
  something custom, use a `<Popover/>`.

  ```jsx_example
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

  <Example />
  ```

  `<Popover />` can act as a dialog with a close button. With the `shouldContainFocus` and `applicationElement`
  properties set, it will trap focus inside the `<Popover />`.

```jsx_example
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

<Example />
```
**/
class Popover extends Component {
  static Trigger = PopoverTrigger
  static Content = PopoverContent

  /* eslint-disable react/require-default-props */
  static propTypes = {
    ...Dialog.propTypes,
    ...Position.propTypes,

    /**
     * Children of the `<Popover />`
     */
    children: CustomPropTypes.Children.oneOf([PopoverTrigger, PopoverContent]),

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
    * Should the popover display with an arrow
    */
    withArrow: PropTypes.bool,

    shouldRenderOffscreen: PropTypes.bool,

    shouldCloseOnEscape: PropTypes.bool,

    closeButtonLabel: PropTypes.string,

    closeButtonRef: PropTypes.func
  }
  /* eslint-enable react/require-default-props */

  static defaultProps = {
    placement: 'bottom center',
    variant: 'default',
    on: ['hover', 'focus'],
    contentRef: function (el) {},
    closeButtonRef: function (el) {},
    defaultShow: false,
    withArrow: true,
    shouldCloseOnEscape: true
  }

  constructor (props) {
    super(props)

    this.state = {}

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

  handlePositionChanged = () => {
    this.setState({
      closeButtonPlacement: this.getCloseButtonPlacement(this.props)
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
        invariant(
          !(on === 'hover'),
          'Specifying only the `"hover"` trigger limits the visibilty of the overlay to just mouse users. ' +
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
        <ContextBox {...pickProps(this.props, ContextBox.propTypes)} elementRef={this.props.contentRef}>
          {content}
        </ContextBox>
      )
    } else {
      return null
    }
  }

  render () {
    return (
      <Position
        {...pickProps(this.props, Position.propTypes)}
        trackPosition={this.shown}
        placement={this.placement}
        onPositioned={createChainedFunction(this.handlePositionChanged, this.props.onShow)}
        onPositionChanged={this.handlePositionChanged}
      >
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

export default Popover
export { PopoverTrigger, PopoverContent }
