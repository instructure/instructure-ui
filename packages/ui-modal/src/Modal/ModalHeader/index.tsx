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

import { ComponentElement, Children, Component } from 'react'

import {
  matchComponentTypes,
  passthroughProps
} from '@instructure/ui-react-utils'
import { testable } from '@instructure/ui-testable'

import { withStyle } from '@instructure/emotion'

import { CloseButton } from '@instructure/ui-buttons'
import type { CloseButtonProps } from '@instructure/ui-buttons'

import generateStyle from './styles'
import generateComponentTheme from './theme'

import { propTypes, allowedProps } from './props'
import type { ModalHeaderProps, ModalHeaderStyleProps } from './props'
import ModalContext from '../ModalContext'

type CloseButtonChild = ComponentElement<CloseButtonProps, CloseButton>

/**
---
parent: Modal
id: Modal.Header
---
**/
@withStyle(generateStyle, generateComponentTheme)
@testable()
class ModalHeader extends Component<ModalHeaderProps> {
  static readonly componentId = 'Modal.Header'

  static propTypes = propTypes
  static allowedProps = allowedProps
  static defaultProps = {
    variant: 'default',
    spacing: 'default'
  }

  ref: HTMLDivElement | null = null
  declare context: React.ContextType<typeof ModalContext>
  static contextType = ModalContext

  /**
   * Gets all text in a DOM subtree, text under <button> nodes is excluded
   */
  getTextExcludingButtons = (root: Node) => {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        return node.parentElement?.closest('button')
          ? NodeFilter.FILTER_REJECT
          : NodeFilter.FILTER_ACCEPT
      }
    })
    let text = ''
    let current
    while ((current = walker.nextNode())) {
      text += current.nodeValue
    }
    return text
  }

  handleRef = (el: HTMLDivElement | null) => {
    this.ref = el
    if (el) {
      const txt = this.getTextExcludingButtons(el)
      this.context.setBodyScrollAriaLabel?.(txt)
    }
  }

  componentDidMount() {
    this.props.makeStyles?.(this.makeStyleProps())
  }

  componentDidUpdate() {
    this.props.makeStyles?.(this.makeStyleProps())
  }

  makeStyleProps = (): ModalHeaderStyleProps => {
    return {
      withCloseButton: this.usesCloseButton
    }
  }

  get usesCloseButton() {
    let hasCloseButton = false

    Children.forEach(this.props.children, (child) => {
      if (
        child &&
        matchComponentTypes<CloseButtonChild>(child, [CloseButton])
      ) {
        hasCloseButton = true
      }
    })

    return hasCloseButton
  }

  render() {
    const { children, ...rest } = this.props

    return (
      <div
        css={this.props.styles?.modalHeader}
        {...passthroughProps(rest)}
        ref={this.handleRef}
      >
        {children}
      </div>
    )
  }
}

export default ModalHeader
export { ModalHeader }
