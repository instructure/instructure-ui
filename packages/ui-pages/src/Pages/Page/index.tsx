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
import PropTypes from 'prop-types'

import { findDOMNode, findTabbable } from '@instructure/ui-dom-utils'
import { logError as error } from '@instructure/console'
import { View } from '@instructure/ui-view'

import { PagesContext } from '../PagesContext'

import { allowedProps, propTypes } from './props'
import type { PagesPageProps } from './props'

/**
---
parent: Pages
id: Pages.Page
---
**/
class Page extends Component<PagesPageProps> {
  static readonly componentId = 'Pages.Page'

  static allowedProps = allowedProps
  static propTypes = propTypes

  static defaultProps = {
    defaultFocusElement: null,
    padding: 'small',
    textAlign: 'start',
    children: null
  }

  static contextTypes = {
    history: PropTypes.array,
    navigateToPreviousPage: PropTypes.func
  }

  get _content() {
    console.warn('_content deprecated, please use ref instead')

    return this.ref
  }

  ref: Element | null = null

  handleRef = (el: Element | null) => {
    this.ref = el
  }

  get defaultFocusElement() {
    let { defaultFocusElement } = this.props

    if (typeof defaultFocusElement === 'function') {
      defaultFocusElement = defaultFocusElement()
    }

    if (defaultFocusElement) {
      defaultFocusElement = findDOMNode(defaultFocusElement)
    }

    if (!defaultFocusElement) {
      const tabbable = findTabbable(this.ref)
      defaultFocusElement = tabbable && tabbable[0]
    }

    error(
      defaultFocusElement && !!(defaultFocusElement as HTMLElement).focus,
      '[Page] A default focusable element is required or focus will be lost.'
    )

    return defaultFocusElement
  }

  get focusable() {
    const element = this.defaultFocusElement

    return !!element && typeof (element as HTMLElement).focus === 'function'
  }

  focus() {
    if (this.focusable) {
      ;(this.defaultFocusElement as HTMLElement).focus()
    }
  }

  render() {
    const { children, ...props } = this.props

    return (
      <PagesContext.Consumer>
        {({ history, navigateToPreviousPage }) => (
          <View
            as="div"
            padding={props.padding}
            textAlign={props.textAlign}
            elementRef={this.handleRef}
          >
            {children && typeof children === 'function'
              ? children(history, navigateToPreviousPage)
              : children}
          </View>
        )}
      </PagesContext.Consumer>
    )
  }
}

export default Page
export { Page }
