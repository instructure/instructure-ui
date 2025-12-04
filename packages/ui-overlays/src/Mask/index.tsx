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

import { Component } from 'react'
import noScroll from 'no-scroll'

import { withStyleRework as withStyle } from '@instructure/emotion'
import type { ComponentStyle } from '@instructure/emotion'
import { ensureSingleChild, omitProps } from '@instructure/ui-react-utils'

import generateStyle from './styles'
import generateComponentTheme from './theme'

import type { MaskProps } from './props'
import { allowedProps } from './props'
import MaskCounter from './MaskCounter'

/**
---
category: components/utilities
---
**/
@withStyle(generateStyle, generateComponentTheme)
class Mask extends Component<MaskProps> {
  static readonly componentId = 'Mask'

  static allowedProps = allowedProps

  static defaultProps = {
    placement: 'center',
    fullscreen: false
  }

  componentDidMount() {
    this.props.makeStyles?.()

    if (this.props.fullscreen) {
      noScroll.on()
      MaskCounter.incrementCounter()
    }
  }

  componentDidUpdate() {
    this.props.makeStyles?.()
  }

  componentWillUnmount() {
    if (this.props.fullscreen) {
      MaskCounter.decrementCounter()
      if (MaskCounter.getCounter() <= 0) {
        noScroll.off()
      }
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

  // It can be a ref for any type of child
  _content: any

  contentRef: React.LegacyRef<any> = (el) => {
    this._content = el
  }

  render() {
    const content = ensureSingleChild(this.props.children, {
      ref: this.contentRef
    })

    const props: React.ClassAttributes<HTMLSpanElement> &
      React.HTMLAttributes<HTMLSpanElement> & {
        css?: ComponentStyle<'mask'>['mask']
      } = {
      ...omitProps(this.props, Mask.allowedProps),
      css: this.props.styles?.mask,
      ref: this.handleElementRef
    }

    if (typeof this.props.onClick === 'function') {
      props.onClick = this.props.onClick
      props.tabIndex = -1
    }

    return <span {...props}>{content}</span>
  }
}

export default Mask
export { Mask }
