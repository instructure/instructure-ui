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

/** @jsx jsx */
import { Component } from 'react'
import PropTypes from 'prop-types'

import {
  getElementType,
  omitProps,
  ensureSingleChild,
  passthroughProps,
  callRenderProp
} from '@instructure/ui-react-utils'
import { PositionPropTypes } from '@instructure/ui-position'
import { uid } from '@instructure/uid'
import { testable } from '@instructure/ui-testable'
import { Popover } from '@instructure/ui-popover'
import { element } from '@instructure/ui-prop-types'
import { withStyle, jsx } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'

/**
---
category: components
---
**/
@withStyle(generateStyle, generateComponentTheme)
@testable()
class Tooltip extends Component {
  static propTypes = {
    // eslint-disable-next-line react/require-default-props
    makeStyles: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    styles: PropTypes.object,
    /**
     * @param {Object} renderProps
     * @param {Boolean} renderProps.focused - Is the Tooltip trigger focused?
     * @param {Function} renderProps.getTriggerProps - Props to be spread onto the trigger element
     */
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
    /**
     * The content to render in the tooltip
     */
    renderTip: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
    /**
     * Whether or not the tooltip content is shown, when controlled
     */
    isShowingContent: PropTypes.bool,
    /**
     * Whether or not to show the content by default, when uncontrolled
     */
    defaultIsShowingContent: PropTypes.bool,
    /**
     * the element type to render as (assumes a single child if 'as' is undefined)
     */
    as: PropTypes.elementType, // eslint-disable-line react/require-default-props
    /**
     * The action that causes the Content to display (`click`, `hover`, `focus`)
     */
    on: PropTypes.oneOfType([
      PropTypes.oneOf(['click', 'hover', 'focus']),
      PropTypes.arrayOf(PropTypes.oneOf(['click', 'hover', 'focus']))
    ]),
    /**
     * The color of the tooltip content
     */
    color: PropTypes.oneOf(['primary', 'primary-inverse']),
    /**
     * Specifies where the Tooltip will be placed in relation to the target element.
     * Ex. placement="bottom" will render the Tooltip below the triggering element
     * (Note: if there is not room, it will position opposite. Ex. "top" will
     * automatically switch to "bottom")
     */
    placement: PositionPropTypes.placement,
    /**
     * An element or a function returning an element to use as the mount node
     * for the `<Tooltip />` (defaults to `document.body`)
     */
    mountNode: PositionPropTypes.mountNode,
    /**
     * The parent in which to constrain the tooltip.
     * One of: 'window', 'scroll-parent', 'parent', 'none', an element,
     * or a function returning an element
     */
    constrain: PositionPropTypes.constrain,
    /**
     * The horizontal offset for the positioned content
     */
    offsetX: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /**
     * The vertical offset for the positioned content
     */
    offsetY: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /**
     * Target element for positioning the Tooltip (if it differs from children/trigger)
     */
    positionTarget: PropTypes.oneOfType([element, PropTypes.func]),
    /**
     * Callback fired when content is shown. When controlled, this callback is
     * fired when the tooltip expects to be shown
     */
    onShowContent: PropTypes.func,
    /**
     * Callback fired when content is hidden. When controlled, this callback is
     * fired when the tooltip expects to be hidden
     */
    onHideContent: PropTypes.func
  }

  static defaultProps = {
    isShowingContent: undefined,
    defaultIsShowingContent: false,
    on: undefined,
    color: 'primary',
    placement: 'top',
    mountNode: null,
    constrain: 'window',
    offsetX: 0,
    offsetY: 0,
    positionTarget: undefined,
    onShowContent: (event) => {},
    onHideContent: (event, { documentClick }) => {}
  }

  _id = uid('Tooltip')
  state = { hasFocus: false }

  componentDidMount() {
    this.props.makeStyles()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.props.makeStyles()
  }

  handleFocus = (event) => {
    this.setState({ hasFocus: true })
  }

  handleBlur = (event) => {
    this.setState({ hasFocus: false })
  }

  renderTrigger() {
    const { children, as } = this.props
    const { hasFocus } = this.state
    const triggerProps = {
      'aria-describedby': this._id
    }

    if (as) {
      const Trigger = getElementType(Tooltip, this.props)
      const props = omitProps(this.props, Tooltip.propTypes)
      return (
        <Trigger {...props} {...triggerProps}>
          {children}
        </Trigger>
      )
    } else if (typeof children === 'function') {
      return children({
        focused: hasFocus,
        getTriggerProps: (props) => {
          return {
            ...triggerProps,
            ...props
          }
        }
      })
    } else {
      return ensureSingleChild(this.props.children, triggerProps)
    }
  }

  render() {
    const {
      renderTip,
      isShowingContent,
      defaultIsShowingContent,
      on,
      color,
      placement,
      mountNode,
      constrain,
      offsetX,
      offsetY,
      positionTarget,
      onShowContent,
      onHideContent,
      styles,
      ...rest
    } = this.props

    return (
      <Popover
        {...passthroughProps(rest)}
        isShowingContent={isShowingContent}
        defaultIsShowingContent={defaultIsShowingContent}
        on={on}
        shouldRenderOffscreen
        shouldReturnFocus={false}
        placement={placement}
        color={color === 'primary' ? 'primary-inverse' : 'primary'}
        mountNode={mountNode}
        constrain={constrain}
        shadow="none"
        offsetX={offsetX}
        offsetY={offsetY}
        positionTarget={positionTarget}
        renderTrigger={() => this.renderTrigger()}
        onShowContent={onShowContent}
        onHideContent={onHideContent}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
      >
        <span id={this._id} css={styles.tooltip} role="tooltip">
          {callRenderProp(renderTip)}
        </span>
      </Popover>
    )
  }
}

export default Tooltip
export { Tooltip }
