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
import React, { Component, ReactElement } from 'react'

import { View } from '@instructure/ui-view'
import { containsActiveElement, findTabbable } from '@instructure/ui-dom-utils'
import { safeCloneElement, withSSR } from '@instructure/ui-react-utils'
import { logError as error } from '@instructure/console'

import { Page } from './Page'

import { withStyle, jsx } from '@instructure/emotion'
import generateStyle from './styles'
import generateComponentTheme from './theme'

import { PagesContext } from './PagesContext'
import type { PagesContextType } from './PagesContext'

import { allowedProps, propTypes } from './props'
import type { PagesProps } from './props'

import { hashInstance } from '@instructure/ui-utils'

/**
---
category: components
---
@tsProps
**/
@withSSR()
@withStyle(generateStyle, generateComponentTheme)
class Pages extends Component<PagesProps> {
  static readonly componentId = 'Pages'

  static allowedProps = allowedProps
  static propTypes = propTypes

  static defaultProps = {
    activePageIndex: 0
  }

  static Page = Page

  _timeouts: ReturnType<typeof setTimeout>[] = []
  _history: PagesContextType['history']
  _activePage: Page | null = null
  _contentId: string

  ref: Element | null = null

  handleRef = (el: Element | null) => {
    this.ref = el
  }

  get _contentElement() {
    console.warn(
      '_contentElement property is deprecated and will be removed in v9, please use ref instead'
    )

    return this.ref
  }

  constructor(props: PagesProps) {
    super(props)

    this._history = [
      typeof props.defaultPageIndex === 'number'
        ? props.defaultPageIndex
        : props.activePageIndex!
    ]

    //@ts-expect-error props.instanceMapCounter
    this._contentId = hashInstance('Pages', props.instanceMapCounter)
  }

  componentDidMount() {
    this.props.makeStyles?.()
  }

  handleBackButtonClick = () => {
    const oldPageIndex = this._history.pop()
    const newPageIndex = this._history[this._history.length - 1]

    this.props.onPageIndexChange?.(newPageIndex || 0, oldPageIndex)
  }

  // TODO: componentWillReceiveProps has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.
  componentWillReceiveProps(nextProps: PagesProps) {
    if (
      nextProps &&
      typeof nextProps.activePageIndex === 'number' &&
      (this._history.length === 0 ||
        nextProps.activePageIndex !== this._history[this._history.length - 1])
    ) {
      this._history.push(nextProps.activePageIndex)
    }
  }

  componentDidUpdate() {
    this._timeouts.push(
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
      setTimeout(() => {
        const activePage = this._activePage

        // Attempt to focus active page
        if (activePage && activePage.focusable) {
          activePage.focus()
        } else {
          // Use first tabbable as last ditch effort
          const tabbable = findTabbable(this.ref)
          const element = tabbable && tabbable[0]

          element && (element as HTMLElement).focus()
        }
      })
    )
  }

  get activePage() {
    const { activePageIndex, children } = this.props
    const pages = React.Children.toArray(children)
    const activePage =
      activePageIndex! < pages.length ? pages[activePageIndex!] : null

    error(!!activePage, '[Pages] Invalid `activePageIndex`.')

    return activePage
      ? safeCloneElement(activePage as ReactElement, {
          ref: (el: Page | null) => {
            this._activePage = el
          }
        })
      : null
  }

  render() {
    const { activePage } = this

    return activePage ? (
      <PagesContext.Provider
        value={{
          history: this._history,
          navigateToPreviousPage: () => {
            this.handleBackButtonClick()
          }
        }}
      >
        <View
          as="div"
          id={this._contentId}
          css={this.props.styles?.pages}
          margin={this.props.margin}
          role="region"
          elementRef={this.handleRef}
        >
          {activePage}
        </View>
      </PagesContext.Provider>
    ) : null
  }
}

export default Pages
export { Pages, Page }
