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
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'no-s... Remove this comment to see the full error message
import noScroll from 'no-scroll'
import { withStyle, jsx } from '@instructure/emotion'
import { ensureSingleChild, omitProps } from '@instructure/ui-react-utils'

import generateStyle from './styles'
import generateComponentTheme from './theme'
import type { MaskProps } from './props'
import { allowedProps, propTypes } from './props'

/**
---
category: components/utilities
---
**/
@withStyle(generateStyle, generateComponentTheme)
class Mask extends Component<MaskProps> {
  static readonly componentId = 'Mask'

  static allowedProps = allowedProps
  static propTypes = propTypes

  static defaultProps = {
    placement: 'center',
    fullscreen: false,
    children: null,
    // @ts-expect-error ts-migrate(6133) FIXME: 'el' is declared but its value is never read.
    elementRef: (el) => {}
  }

  componentDidMount() {
    this.props.makeStyles?.()
    if (this.props.fullscreen) {
      noScroll.on()
    }
  }

  componentDidUpdate() {
    this.props.makeStyles?.()
  }

  componentWillUnmount() {
    if (this.props.fullscreen) {
      noScroll.off()
    }
  }

  ref: Element | null = null

  handleElementRef = (el: Element | null) => {
    const { elementRef } = this.props

    this.ref = el

    if (typeof elementRef === 'function') {
      elementRef(el)
    }
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'el' implicitly has an 'any' type.
  contentRef = (el) => {
    // @ts-expect-error ts-migrate(2551) FIXME: Property '_content' does not exist on type 'Mask'.... Remove this comment to see the full error message
    this._content = el
  }

  render() {
    const content = ensureSingleChild(this.props.children, {
      ref: this.contentRef
    })

    const props = {
      ...omitProps(this.props, Mask.allowedProps),
      css: this.props.styles?.mask,
      ref: this.handleElementRef
    }

    if (typeof this.props.onClick === 'function') {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'onClick' does not exist on type '{ css: ... Remove this comment to see the full error message
      props.onClick = this.props.onClick
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'tabIndex' does not exist on type '{ css:... Remove this comment to see the full error message
      props.tabIndex = -1
    }

    return <span {...props}>{content}</span>
  }
}

export default Mask
export { Mask }