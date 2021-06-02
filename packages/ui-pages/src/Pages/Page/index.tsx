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

import { ThemeablePropTypes } from '@instructure/emotion'
import { findDOMNode, findTabbable } from '@instructure/ui-dom-utils'
import { logError as error } from '@instructure/console'
import { View } from '@instructure/ui-view'
import { PagesContext } from '..'

type Props = {
  defaultFocusElement?: React.ReactElement | ((...args: any[]) => any)
  padding?: any // TODO: ThemeablePropTypes.spacing
  textAlign?: 'start' | 'center' | 'end'
}

/**
---
parent: Pages
id: Pages.Page
---
**/
class Page extends Component<Props> {
  static componentId = 'Pages.Page'

  static propTypes = {
    /**
     * The children to be rendered
     */
    children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),

    /**
     * An element or a function returning an element to focus by default
     */
    defaultFocusElement: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.func
    ]),

    /**
     * Set the padding using familiar CSS shorthand
     */
    padding: ThemeablePropTypes.spacing,

    textAlign: PropTypes.oneOf(['start', 'center', 'end'])
  }

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

  get defaultFocusElement() {
    let { defaultFocusElement } = this.props

    if (typeof defaultFocusElement === 'function') {
      defaultFocusElement = defaultFocusElement()
    }

    if (defaultFocusElement) {
      defaultFocusElement = findDOMNode(defaultFocusElement) as any
    }

    if (!defaultFocusElement) {
      // @ts-expect-error ts-migrate(2551) FIXME:
      const tabbable = findTabbable(this._content)
      // @ts-expect-error ts-migrate(2554) FIXME:
      defaultFocusElement = tabbable && tabbable[0]
    }

    error(
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'focus' does not exist on type 'ReactElem... Remove this comment to see the full error message
      defaultFocusElement && defaultFocusElement.focus,
      '[Page] A default focusable element is required or focus will be lost.'
    )

    return defaultFocusElement
  }

  get focusable() {
    const element = this.defaultFocusElement

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'focus' does not exist on type 'ReactElem... Remove this comment to see the full error message
    return element && typeof element.focus === 'function'
  }

  focus() {
    if (this.focusable) {
      // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
      this.defaultFocusElement.focus()
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
            elementRef={(el) => {
              // @ts-expect-error ts-migrate(2551) FIXME: Property '_content' does not exist on type 'Page'.... Remove this comment to see the full error message
              this._content = el
            }}
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
