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

import ThemeablePropTypes from '@instructure/ui-themeable/lib/utils/ThemeablePropTypes'
import findDOMNode from '@instructure/ui-utils/lib/dom/findDOMNode'
import findTabbable from '@instructure/ui-a11y/lib/utils/findTabbable'
import warning from '@instructure/ui-utils/lib/warning'

import Container from '@instructure/ui-container/lib/components/Container'

/**
---
parent: Pages
---
**/
export default class Page extends Component {
  static propTypes = {
    /**
     * The children to be rendered
     */
    children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),

    /**
     * An element or a function returning an element to focus by default
     */
    defaultFocusElement: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),

    /**
    * Set the padding using familiar CSS shorthand
    */
    padding: ThemeablePropTypes.spacing,

    textAlign: PropTypes.oneOf(['start', 'center', 'end'])
  }

  static defaultProps = {
    defaultFocusElement: null,
    padding: 'small',
    textAlign: 'start'
  }

  static contextTypes = {
    history: PropTypes.array,
    navigateToPreviousPage: PropTypes.func
  }

  get defaultFocusElement () {
    let { defaultFocusElement } = this.props

    if (typeof defaultFocusElement === 'function') {
      defaultFocusElement = defaultFocusElement()
    }

    if (defaultFocusElement) {
      defaultFocusElement = findDOMNode(defaultFocusElement)
    }

    if (!defaultFocusElement) {
      const tabbable = findTabbable(this._content)
      defaultFocusElement = tabbable && tabbable[0]
    }

    warning(
      defaultFocusElement && defaultFocusElement.focus,
      '[Page] A default focusable element is required or focus will be lost.'
    )

    return defaultFocusElement
  }

  get focusable () {
    const element = this.defaultFocusElement

    return element && typeof element.focus === 'function'
  }

  focus () {
    if (this.focusable) {
      this.defaultFocusElement.focus()
    }
  }

  render () {
    const {
      children,
      ...props
    } = this.props

    const {
      history,
      navigateToPreviousPage
    } = this.context

    return (
      <Container
        as="div"
        padding={props.padding}
        textAlign={props.textAlign}
        elementRef={(el) => { this._content = el }}
      >
        {
          (children && typeof children === 'function') ? children(history, navigateToPreviousPage) : children
        }
      </Container>
    )
  }
}
