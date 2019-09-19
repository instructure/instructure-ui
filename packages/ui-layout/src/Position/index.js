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

import { themeable } from '@instructure/ui-themeable'
import { element } from '@instructure/ui-prop-types'
import { ComponentIdentifier } from '@instructure/ui-react-utils'
import { testable } from '@instructure/ui-testable'
import { Position as UIPosition, PositionPropTypes } from '@instructure/ui-position'

import styles from './styles.css'
import theme from './theme'

@testable()
class PositionTarget extends ComponentIdentifier {
  static displayName = 'PositionTarget'
  static locatorAttribute = 'data-position-target'
}

@testable()
class PositionContent extends ComponentIdentifier {
  static displayName = 'PositionContent'
  static propTypes = {
    children: PropTypes.node,
    placement: PositionPropTypes.placement
  }
  static locatorAttribute = 'data-position-content'
}

/**
---
category: components/utilities/deprecated
id: DeprecatedPosition
---
**/
@testable()
@themeable(theme, styles)
class Position extends Component {
  static Target = PositionTarget
  static Content = PositionContent
  static locatorAttribute = 'data-position'

  static propTypes = {
    /**
     * The children to be rendered within the `<Position />`
     */
    children: PropTypes.node,

    /**
     * The target to be used when not using `<PositionTarget />`
     */
    target: PropTypes.oneOfType([element, PropTypes.func]),

    /**
     * Whether or not you want the content to position over the `<PositionTarget />`
     */
    over: PropTypes.bool,

    /**
     * The placement of the content in relation to the trigger
     */
    placement: PositionPropTypes.placement,

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
     * Callback fired when `<Position />` content has been mounted and is initially positioned
     */
    onPositioned: PropTypes.func,

    /**
     * Whether or not position of the target should be tracked or just set statically on render
     */
    trackPosition: PropTypes.bool,

    /**
     * An element or a function returning an element to use as the mount node
     * for the `<Position />` (defaults to `document.body`)
     */
    mountNode: PositionPropTypes.mountNode,

    /**
     * Insert the element at the 'top' of the mountNode or at the 'bottom'
     */
    insertAt: PropTypes.oneOf(['bottom', 'top']),

    /**
     * The parent in which to constrain the placement.
     * One of: 'window', 'scroll-parent', 'parent', 'none', an element,
     * or a function returning an element
     */
    constrain: PositionPropTypes.constrain,
    id: PropTypes.string
  }

  static defaultProps = {
    trackPosition: true,
    placement: 'bottom center',
    offsetX: 0,
    offsetY: 0,
    mountNode: null,
    target: null,
    insertAt: 'bottom',
    over: false,
    onPositioned: position => {},
    onPositionChanged: position => {},
    constrain: 'window',
    children: null,
    id: undefined
  }

  render () {
    const {
      children,
      id,
      trackPosition,
      placement,
      offsetX,
      offsetY,
      mountNode,
      target,
      insertAt,
      over,
      onPositioned,
      onPositionChanged,
      constrain,
      ...passthroughProps
    } = this.props

    let renderTarget = ComponentIdentifier.pick(Position.Target, children)
    let content = ComponentIdentifier.pick(Position.Content, children)

    return (
      <UIPosition
        {...passthroughProps}
        target={target}
        renderTarget={renderTarget}
        id={id}
        shouldTrackPosition={trackPosition}
        placement={placement}
        offsetX={offsetX}
        offsetY={offsetY}
        mountNode={mountNode}
        insertAt={insertAt}
        constrain={constrain}
        shouldPositionOverTarget={over}
        onPositioned={onPositioned}
        onPositionChanged={onPositionChanged}
        __dangerouslyIgnoreExperimentalWarnings
      >
        { content }
      </UIPosition>
    )
  }
}

export default Position
export { Position, PositionTarget, PositionContent }
