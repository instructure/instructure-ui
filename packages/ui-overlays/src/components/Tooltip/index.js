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

import Focusable from '@instructure/ui-focusable/lib/components/Focusable'
import getElementType from '@instructure/ui-utils/lib/react/getElementType'
import LayoutPropTypes from '@instructure/ui-layout/lib/utils/LayoutPropTypes'
import { omitProps } from '@instructure/ui-utils/lib/react/passthroughProps'
import ensureSingleChild from '@instructure/ui-utils/lib/react/ensureSingleChild'
import uid from '@instructure/uid'
import themeable from '@instructure/ui-themeable'
import testable from '@instructure/ui-testable'

import Popover, { PopoverTrigger, PopoverContent } from '../Popover'

import styles from './styles.css'
import theme from './theme'

/**
---
category: components
---
**/
@testable()
@themeable(theme, styles)
export default class Tooltip extends Component {
  static propTypes = {
    /**
    * @param {Object} renderProps
    * @param {Boolean} renderProps.focused - Is the Tooltip trigger focused?
    * @param {Function} renderProps.getTriggerProps - Props to be spread onto the trigger element
    */
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
    tip: PropTypes.node.isRequired,
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
    variant: PropTypes.oneOf(['default', 'inverse']),
    /**
     * Specifies where the Tooltip will be placed in relation to the target element.
     * Ex. placement="bottom" will render the Tooltip below the triggering element
     * (Note: if there is not room, it will position opposite. Ex. "top" will
     * automatically switch to "bottom").
     */
    placement: LayoutPropTypes.placement,
    /**
     * An element or a function returning an element to use as the mount node
     * for the `<Tooltip />` (defaults to `document.body`)
     */
    mountNode: LayoutPropTypes.mountNode,
    /**
     * The parent in which to constrain the tooltip.
     * One of: 'window', 'scroll-parent', 'parent', 'none', an element,
     * or a function returning an element
     */
    constrain: LayoutPropTypes.constrain
  }

  static defaultProps = {
    on: undefined,
    variant: 'inverse',
    placement: 'top',
    mountNode: null,
    constrain: 'window'
  }

  constructor (props) {
    super()

    this._id = uid('Tooltip')
  }

  renderTrigger (focused) {
    const { children, as } = this.props
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
      return children(
        {
          focused,
          getTriggerProps: (props) => {
            return {
              ...triggerProps,
              ...props
            }
          }
        }
      )
    } else {
      return ensureSingleChild(this.props.children, triggerProps)
    }
  }

  render () {
    return (
      <Focusable render={({ focused }) => {
        return (
          <Popover
            on={this.props.on}
            shouldRenderOffscreen
            shouldReturnFocus={false}
            placement={this.props.placement}
            variant={this.props.variant}
            mountNode={this.props.mountNode}
            constrain={this.props.constrain}
            shadow="none"
          >
            <PopoverTrigger>
              {this.renderTrigger(focused)}
            </PopoverTrigger>
            <PopoverContent>
              <span
                id={this._id}
                className={styles.root}
                role="tooltip"
              >
                {this.props.tip}
              </span>
            </PopoverContent>
          </Popover>
        )
      }} />
    )
  }
}
