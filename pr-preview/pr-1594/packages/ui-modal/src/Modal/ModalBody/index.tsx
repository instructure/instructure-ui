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

import { View } from '@instructure/ui-view'
import { testable } from '@instructure/ui-testable'
import { omitProps } from '@instructure/ui-react-utils'
import { getComputedStyle } from '@instructure/ui-dom-utils'

import { withStyle, jsx } from '@instructure/emotion'
import generateStyle from './styles'
import generateComponentTheme from './theme'

import { propTypes, allowedProps } from './props'
import type { ModalBodyProps, ModalBodyState } from './props'

/**
---
parent: Modal
id: Modal.Body
---
**/
@withStyle(generateStyle, generateComponentTheme)
@testable()
class ModalBody extends Component<ModalBodyProps, ModalBodyState> {
  static readonly componentId = 'Modal.Body'

  static propTypes = propTypes
  static allowedProps = allowedProps
  static defaultProps = {
    padding: 'medium',
    as: 'div',
    variant: 'default'
  }

  ref: Element | null = null

  handleRef = (el: Element | null) => {
    const { elementRef } = this.props

    this.ref = el

    if (typeof elementRef === 'function') {
      elementRef(el)
    }
  }

  constructor(props: ModalBodyProps) {
    super(props)

    this.state = {
      isFirefox: false
    }
  }

  componentDidMount() {
    this.props.makeStyles?.()

    // We detect if -moz- prefixed style is present to identify whether we are in Firefox browser
    const style = this.ref && getComputedStyle(this.ref)
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

  render() {
    const { as, elementRef, overflow, variant, padding, children, ...rest } =
      this.props

    const passthroughProps = View.omitViewProps(
      omitProps(rest, ModalBody.allowedProps),
      ModalBody
    )
    const isFit = overflow === 'fit'

    return (
      <View
        {...passthroughProps}
        display="block"
        width={isFit ? '100%' : undefined}
        height={isFit ? '100%' : undefined}
        elementRef={this.handleRef}
        as={as}
        css={this.props.styles?.modalBody}
        padding={padding}
        // We have to make an exception in Firefox, because it makes
        //  the container focusable when it is scrollable.
        //  This is a feature, not a bug, but it prevents VoiceOver
        //  to correctly focus inside the body in other browsers.
        {...(this.state.isFirefox && { tabIndex: -1 })}
      >
        {children}
      </View>
    )
  }
}

export default ModalBody
export { ModalBody }
