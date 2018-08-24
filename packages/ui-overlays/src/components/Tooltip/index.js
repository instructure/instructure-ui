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
import classnames from 'classnames'

import getElementType from '@instructure/ui-utils/lib/react/getElementType'
import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'
import LayoutPropTypes from '@instructure/ui-layout/lib/utils/LayoutPropTypes'
import { omitProps } from '@instructure/ui-utils/lib/react/passthroughProps'
import ensureSingleChild from '@instructure/ui-utils/lib/react/ensureSingleChild'
import generateElementId from '@instructure/ui-utils/lib/dom/generateElementId'
import themeable from '@instructure/ui-themeable'

import Popover, { PopoverTrigger, PopoverContent } from '../Popover'

import styles from './styles.css'
import theme from './theme'

/**
---
category: components
---
**/
@themeable(theme, styles)
export default class Tooltip extends Component {
  static propTypes = {
    tip: PropTypes.node.isRequired,
    children: PropTypes.node.isRequired,
    /**
    * the element type to render as (assumes a single child if 'as' is undefined)
    */
    as: CustomPropTypes.elementType,
    /**
     * The action that causes the Content to display (`click`, `hover`, `focus`)
     */
    on: PropTypes.oneOfType([
      PropTypes.oneOf(['click', 'hover', 'focus']),
      PropTypes.arrayOf(PropTypes.oneOf(['click', 'hover', 'focus']))
    ]),
    variant: PropTypes.oneOf(['default', 'inverse']),
    placement: LayoutPropTypes.placement,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
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
    variant: 'default',
    placement: 'top',
    size: 'small',
    mountNode: null,
    constrain: 'window'
  }

  constructor (props) {
    super()

    this._id = generateElementId('Tooltip')
  }

  renderTrigger () {
    if (this.props.as) {
      const Trigger = getElementType(Tooltip, this.props)
      const props = omitProps(this.props, Tooltip.propTypes)
      return (
        <Trigger {...props}>
          {this.props.children}
        </Trigger>
      )
    } else {
      return ensureSingleChild(this.props.children)
    }
  }

  render () {
    const trigger = this.renderTrigger()
    return (
      <Popover
        on={this.props.on}
        shouldRenderOffscreen
        shouldReturnFocus={false}
        placement={this.props.placement}
        variant={this.props.variant}
        mountNode={this.props.mountNode}
        constrain={this.props.constrain}
      >
        <PopoverTrigger
          aria-describedby={this._id}
          aria-controls={this._id}
        >
          {trigger}
        </PopoverTrigger>
        <PopoverContent>
          <span
            id={this._id}
            className={classnames({
              [styles.root]: true,
              [styles[this.props.size]]: this.props.size
            })}
            role="tooltip"
          >
            {this.props.tip}
          </span>
        </PopoverContent>
      </Popover>
    )
  }
}
