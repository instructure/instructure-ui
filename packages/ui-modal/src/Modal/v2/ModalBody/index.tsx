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

import { View } from '@instructure/ui-view/latest'
import { omitProps } from '@instructure/ui-react-utils'
import { getCSSStyleDeclaration, findTabbable } from '@instructure/ui-dom-utils'

import { withStyleNew } from '@instructure/emotion'
import generateStyle from './styles.js'

import { allowedProps } from './props.js'
import type { ModalBodyProps, ModalBodyState } from './props'
import { UIElement } from '@instructure/shared-types'
import ModalContext from '../ModalContext.js'

/**
---
parent: Modal
id: Modal.Body
---
**/
@withStyleNew(generateStyle, 'ModalBody')
class ModalBody extends Component<ModalBodyProps, ModalBodyState> {
  static displayName = 'ModalBody'
  static readonly componentId = 'Modal.Body'
  static readonly themeId = 'ModalBody'

  static allowedProps = allowedProps
  static defaultProps = {
    padding: 'medium',
    as: 'div',
    variant: 'default'
  }

  state: ModalBodyState = { isFirefox: false, needsTabIndex: false }
  // mirrors state.needsTabIndex, but readable synchronously in the observer
  // callbacks below, where a pending setState would make this.state stale
  private lastNeedsTabIndex = false

  ref: UIElement | null = null
  private resizeObserver?: ResizeObserver
  private mutationObserver?: MutationObserver

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

    const finalRef = this.getFinalRef(this.ref)
    if (finalRef && typeof ResizeObserver !== 'undefined') {
      this.syncTabIndex()
      this.resizeObserver = new ResizeObserver(this.syncTabIndex)
      this.resizeObserver.observe(finalRef)
      this.mutationObserver = new MutationObserver(this.syncTabIndex)
      this.mutationObserver.observe(finalRef, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: [
          'disabled',
          'tabindex',
          'hidden',
          'href',
          'contenteditable',
          'type',
          'class',
          'style'
        ]
      })
    }
  }

  componentDidUpdate() {
    this.props.makeStyles?.()
  }

  componentWillUnmount() {
    this.resizeObserver?.disconnect()
    this.mutationObserver?.disconnect()
  }

  // The body is a tab stop only while it can be scrolled but holds nothing
  // focusable. Both inputs come from the DOM, so the observers recompute them
  // on resize and on subtree changes — which is most changes inside the body,
  // the vast majority of them leaving the result identical. Comparing against
  // the last computed value before calling setState keeps those callbacks from
  // scheduling an update at all, rather than scheduling one React later
  // discards: `setState` warns about updates outside `act()` in tests as soon
  // as it schedules, so bailing out inside the updater would be too late.
  syncTabIndex = () => {
    const finalRef = this.getFinalRef(this.ref)
    const hasScrollbar =
      !!finalRef &&
      Math.abs(
        (finalRef.scrollHeight ?? 0) -
          (finalRef.getBoundingClientRect()?.height ?? 0)
      ) > 1
    const needsTabIndex = hasScrollbar && findTabbable(finalRef).length === 0

    if (needsTabIndex === this.lastNeedsTabIndex) return
    this.lastNeedsTabIndex = needsTabIndex
    this.setState({ needsTabIndex })
  }

  // this recursive function is needed because `ref` can be a React component.
  // TODO rethink, the 'as' prop, likely its not a good idea to allow React
  // components. See INSTUI-4674
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
    const {
      as,
      elementRef,
      overflow,
      variant,
      padding,
      spacing,
      children,
      ...rest
    } = this.props

    const passthroughProps = View.omitViewProps(
      omitProps(rest, ModalBody.allowedProps),
      ModalBody
    )
    const isFit = overflow === 'fit'
    const { needsTabIndex } = this.state
    return (
      <ModalContext.Consumer>
        {(value) => (
          <View
            {...passthroughProps}
            display="block"
            data-cid="ModalBody"
            width={isFit ? '100%' : undefined}
            height={isFit ? '100%' : undefined}
            elementRef={this.handleRef}
            as={as}
            css={this.props.styles?.modalBody}
            padding={spacing ? undefined : padding}
            // check if there is a scrollbar and no focusable children, if so, the
            // element has to be tabbable
            {...(needsTabIndex
              ? {
                  tabIndex: 0,
                  'aria-label': value.bodyScrollAriaLabel
                }
              : {})}
          >
            {children}
          </View>
        )}
      </ModalContext.Consumer>
    )
  }
}

export default ModalBody
export { ModalBody }
