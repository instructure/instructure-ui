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

import { View } from '@instructure/ui-view'
import { omitProps } from '@instructure/ui-react-utils'
import { getCSSStyleDeclaration } from '@instructure/ui-dom-utils'

import { withStyleRework as withStyle } from '@instructure/emotion'
import generateStyle from './styles'
import generateComponentTheme from './theme'

import { allowedProps } from './props'
import type { ModalBodyProps } from './props'
import { UIElement } from '@instructure/shared-types'

/**
---
parent: Modal
id: Modal.Body
---
**/
@withStyle(generateStyle, generateComponentTheme)
class ModalBody extends Component<ModalBodyProps> {
  static readonly componentId = 'Modal.Body'

  static allowedProps = allowedProps
  static defaultProps = {
    padding: 'medium',
    as: 'div',
    variant: 'default'
  }

  ref: UIElement | null = null

  handleRef = (el: UIElement | null) => {
    const { elementRef } = this.props

    this.ref = el

    if (typeof elementRef === 'function') {
      elementRef(el)
    }
  }

  constructor(props: ModalBodyProps) {
    super(props)
  }

  componentDidMount() {
    this.props.makeStyles?.()

    // We detect if -moz- prefixed style is present to identify whether we are in Firefox browser
    const style = this.ref && getCSSStyleDeclaration(this.ref)
    const isFirefox = !!(
      style &&
      Array.prototype.slice
        .call(style)
        .join('')
        .match(/(?:-moz-)/)
    )

    if (isFirefox) {
      this.setState({ isFirefox })
    }
  }

  componentDidUpdate() {
    this.props.makeStyles?.()
  }

  getFinalRef(el: UIElement): Element | undefined {
    if (!el) {
      return undefined
    }
    if (el instanceof Element) {
      return el
    }
    if ((el as unknown as { ref: UIElement }).ref) {
      return this.getFinalRef((el as unknown as { ref: UIElement }).ref)
    }
    return undefined
  }

  render() {
    const { as, elementRef, overflow, variant, padding, children, ...rest } =
      this.props

    const passthroughProps = View.omitViewProps(
      omitProps(rest, ModalBody.allowedProps),
      ModalBody
    )
    const isFit = overflow === 'fit'
    // this recursive function is needed because `ref` can be a React component.
    // TODO rethink, the 'as' prop, likely its not a good idea to allow React
    // components. See INSTUI-4674
    const finalRef = this.getFinalRef(this.ref)

    return (
      <View
        {...passthroughProps}
        display="block"
        data-cid="ModalBody"
        width={isFit ? '100%' : undefined}
        height={isFit ? '100%' : undefined}
        elementRef={this.handleRef}
        as={as}
        css={this.props.styles?.modalBody}
        padding={padding}
        // check if there is a scrollbar, if so, the element has to be tabbable to be able to scroll with keyboard only
        // epsilon tolerance is used to avoid scrollbar for rounding errors
        {...(finalRef &&
        Math.abs(
          (finalRef.scrollHeight ?? 0) -
            (finalRef.getBoundingClientRect()?.height ?? 0)
        ) > 1
          ? { tabIndex: 0 }
          : {})}
      >
        {children}
      </View>
    )
  }
}

export default ModalBody
export { ModalBody }
