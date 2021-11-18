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
import React, { Component, createContext, ReactElement } from 'react'

import { View } from '@instructure/ui-view'
import { containsActiveElement, findTabbable } from '@instructure/ui-dom-utils'
import { safeCloneElement } from '@instructure/ui-react-utils'
import { uid } from '@instructure/uid'
import { logError as error } from '@instructure/console'

import { Page } from './Page'

import { withStyle, jsx } from '@instructure/emotion'
import generateStyle from './styles'
import generateComponentTheme from './theme'
import type { PagesProps } from './props'
import { allowedProps, propTypes } from './props'

export const PagesContext = createContext({
  history: [],
  navigateToPreviousPage: () => {}
})

/**
---
category: components
---
**/
@withStyle(generateStyle, generateComponentTheme)
class Pages extends Component<PagesProps> {
  static readonly componentId = 'Pages'

  static allowedProps = allowedProps
  static propTypes = propTypes

  static defaultProps = {
    children: null,
    defaultPageIndex: null,
    activePageIndex: 0,
    onPageIndexChange: function () {}
  }

  static Page = Page

  _timeouts = []
  get _contentElement() {
    console.warn(
      '_contentElement property is deprecated and will be removed in v9, please use ref instead'
    )

    return this.ref
  }
  ref: Element | null = null

  handleRef = (el: Element | null) => {
    this.ref = el
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
  constructor(props) {
    super(props)

    // @ts-expect-error ts-migrate(2339) FIXME: Property '_history' does not exist on type 'Pages'... Remove this comment to see the full error message
    this._history = [
      typeof props.defaultPageIndex === 'number'
        ? props.defaultPageIndex
        : props.activePageIndex
    ]

    // @ts-expect-error ts-migrate(2339) FIXME: Property '_contentId' does not exist on type 'Page... Remove this comment to see the full error message
    this._contentId = uid('Pages')
  }

  componentDidMount() {
    this.props.makeStyles?.()
  }

  handleBackButtonClick = () => {
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_history' does not exist on type 'Pages'... Remove this comment to see the full error message
    const oldPageIndex = this._history.pop()
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_history' does not exist on type 'Pages'... Remove this comment to see the full error message
    const newPageIndex = this._history[this._history.length - 1]
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.onPageIndexChange(newPageIndex || 0, oldPageIndex)
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'nextProps' implicitly has an 'any' type... Remove this comment to see the full error message
  componentWillReceiveProps(nextProps, nextContext) {
    if (
      nextProps &&
      typeof nextProps.activePageIndex === 'number' &&
      // @ts-expect-error ts-migrate(2339) FIXME: Property '_history' does not exist on type 'Pages'... Remove this comment to see the full error message
      (this._history.length === 0 ||
        // @ts-expect-error ts-migrate(2339) FIXME: Property '_history' does not exist on type 'Pages'... Remove this comment to see the full error message
        nextProps.activePageIndex !== this._history[this._history.length - 1])
    ) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property '_history' does not exist on type 'Pages'... Remove this comment to see the full error message
      this._history.push(nextProps.activePageIndex)
    }
  }

  componentDidUpdate() {
    this._timeouts.push(
      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'Timeout' is not assignable to pa... Remove this comment to see the full error message
      setTimeout(() => {
        !this.focused && this.focus()
      }, 0)
    )
    this.props.makeStyles?.()
  }

  componentWillUnmount() {
    this._timeouts.forEach(clearTimeout)
  }

  get focused() {
    return containsActiveElement(this.ref)
  }

  focus() {
    this._timeouts.push(
      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'Timeout' is not assignable to pa... Remove this comment to see the full error message
      setTimeout(() => {
        // @ts-expect-error ts-migrate(2551) FIXME: Property '_activePage' does not exist on type 'Pag... Remove this comment to see the full error message
        const activePage = this._activePage

        // Attempt to focus active page
        if (activePage && activePage.focusable) {
          activePage.focus()
        } else {
          // Use first tabbable as last ditch effort
          const tabbable = findTabbable(this.ref)
          const element = tabbable && tabbable[0]

          // @ts-expect-error ts-migrate(2554) FIXME:
          element && element.focus()
        }
      })
    )
  }

  get activePage() {
    const { activePageIndex, children } = this.props
    const pages = React.Children.toArray(children)
    const activePage =
      activePageIndex < pages.length ? pages[activePageIndex] : null

    // @ts-expect-error ts-migrate(2555) FIXME
    error(activePage, '[Pages] Invalid `activePageIndex`.')

    return activePage
      ? safeCloneElement(activePage as ReactElement, {
          // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'el' implicitly has an 'any' type.
          ref: (el) => {
            // @ts-expect-error ts-migrate(2551) FIXME: Property '_activePage' does not exist on type 'Pag... Remove this comment to see the full error message
            this._activePage = el
          }
        })
      : null
  }

  render() {
    return this.activePage ? (
      <PagesContext.Provider
        value={{
          // @ts-expect-error ts-migrate(2339) FIXME: Property '_history' does not exist on type 'Pages'... Remove this comment to see the full error message
          history: this._history,
          navigateToPreviousPage: () => {
            this.handleBackButtonClick()
          }
        }}
      >
        <View
          as="div"
          // @ts-expect-error ts-migrate(2322) FIXME: Type '{ children: any; as: string; id: any; css: a... Remove this comment to see the full error message
          id={this._contentId}
          css={this.props.styles?.pages}
          margin={this.props.margin}
          role="region"
          elementRef={this.handleRef}
        >
          {this.activePage}
        </View>
      </PagesContext.Provider>
    ) : null
  }
}

export default Pages
export { Pages, Page }