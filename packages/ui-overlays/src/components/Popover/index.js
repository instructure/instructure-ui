/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 - present Instructure, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Dialog from '@instructure/ui-a11y/lib/components/Dialog'
import CloseButton from '@instructure/ui-buttons/lib/components/CloseButton'
import ContextBox from '@instructure/ui-elements/lib/components/ContextBox'
import Position, { PositionTarget, PositionContent } from '@instructure/ui-layout/lib/components/Position'

import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'
import LayoutPropTypes from '@instructure/ui-layout/lib/utils/LayoutPropTypes'
import ComponentIdentifier, { pick } from '@instructure/ui-utils/lib/react/ComponentIdentifier'
import createChainedFunction from '@instructure/ui-utils/lib/createChainedFunction'
import safeCloneElement from '@instructure/ui-utils/lib/react/safeCloneElement'
import shallowEqual from '@instructure/ui-utils/lib/shallowEqual'
import px from '@instructure/ui-utils/lib/px'
import handleMouseOverOut from '@instructure/ui-utils/lib/dom/handleMouseOverOut'
import { pickProps } from '@instructure/ui-utils/lib/react/passthroughProps'
import deprecated from '@instructure/ui-utils/lib/react/deprecated'
import warning from '@instructure/ui-utils/lib/warning'
import { parsePlacement } from '@instructure/ui-layout/lib/utils/calculateElementPosition'

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
**/

@deprecated('3.0.0', {
  renderOffscreen: 'shouldRenderOffscreen',
  rootClose: 'shouldCloseOnDocumentClick'
})
@deprecated('5.0.0', {
  closeButtonLabel: true,
  closeButtonRef: true,
  applicationElement: true
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
    placement: LayoutPropTypes.placement,

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
     * An element, function returning an element, or array of elements that will not be hidden from
     * the screen reader when the `<Popover />` is open
     */
    liveRegion: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element, PropTypes.func]),

    /**
     * Target element for positioning the Popover (if it differs from the trigger)
     */
    positionTarget: PropTypes.oneOfType([CustomPropTypes.element, PropTypes.func]),

    /**
     * should the content offset to align by its arrow
     */
    alignArrow: PropTypes.bool
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
    onDismiss: (event, documentClick) => {},
    placement: 'bottom center',
    offsetX: 0,
    offsetY: 0,
    variant: 'default',
    on: ['hover', 'focus'],
    contentRef: el => {},
    defaultShow: false,
    withArrow: true,
    trackPosition: true,
    constrain: 'window',
    onPositioned: position => {},
    onPositionChanged: position => {},
    shouldRenderOffscreen: false,
    shouldContainFocus: false,
    shouldReturnFocus: true,
    shouldCloseOnDocumentClick: true,
    shouldCloseOnEscape: true,
    defaultFocusElement: null,
    label: null,
    mountNode: null,
    insertAt: 'bottom',
    liveRegion: null,
    positionTarget: null,
    alignArrow: false
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

  hide = (e, documentClick) => {
    const {
      onDismiss,
      onToggle
    } = this.props

    if (this.props.show === undefined) {
      this.setState(({ show }) => {
        if (show) {
          onDismiss(e, documentClick)
        }
        return { show: false }
      })
    } else {
      if (this.props.show) {
        onDismiss(e, documentClick)
      }
    }

    onToggle(false)
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
        'aria-expanded': this.shown ? 'true' : 'false',
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
    return this.props.defaultFocusElement
  }

  renderCloseButton () {
    return this.props.closeButtonLabel
      ? <CloseButton
        placement={this.state.closeButtonPlacement}
        offset="x-small"
        variant={this.props.variant === 'inverse' ? 'icon-inverse' : 'icon'}
        buttonRef={el => {
          this._closeButton = el
          if (typeof this.props.closeButtonRef === 'function') {
            this.props.closeButtonRef(el)
          }
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
          ref={c => this._contextBox = c}
        >
          {this.renderCloseButton()}
          {content}
        </ContextBox>
      )
    } else {
      return null
    }
  }

  get positionProps () {
    let offsetX = this.props.offsetX
    let offsetY = this.props.offsetY
    if (this.props.alignArrow && this._contextBox) {
      const secondaryPlacement = parsePlacement(this.state.placement)[1]
      const { arrowSize, borderWidth } = this._contextBox.theme
      const offsetAmount = (px(arrowSize) + px(borderWidth)) * 2
      if (secondaryPlacement === 'start') {
        offsetX = offsetAmount
      } else if (secondaryPlacement === 'end') {
        offsetX = -offsetAmount
      } else if (secondaryPlacement === 'top') {
        offsetY = offsetAmount
      } else if (secondaryPlacement === 'bottom') {
        offsetY = -offsetAmount
      }
    }

    return {
      ...pickProps(this.props, Position.propTypes),
      offsetX,
      offsetY,
      trackPosition: this.shown,
      placement: this.placement,
      onPositioned: createChainedFunction(this.handlePositionChanged, this.props.onShow),
      onPositionChanged: this.handlePositionChanged,
      target: this.props.positionTarget
    }
  }

  render () {
    const positionProps = this.positionProps

    if (this.props.positionTarget) {
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
