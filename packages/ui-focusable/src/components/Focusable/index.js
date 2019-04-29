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

import addEventListener from '@instructure/ui-dom-utils/lib/addEventListener'
import containsActiveElement from '@instructure/ui-dom-utils/lib/containsActiveElement'
import { error } from '@instructure/console/macro'
import InputModeListener from '@instructure/ui-dom-utils/lib/InputModeListener'
import findTabbable from '@instructure/ui-a11y/lib/utils/findTabbable'

/**
---
category: components/utilities
---
**/
class Focusable extends Component {
  static propTypes = {
    /**
     * @param {Object} renderProps
     * @param {Boolean} renderProps.focused - Is the element focused (via keyboard only)?
     * @param {HTMLElement} renderProps.focusable - The focusable element
     * @param {Boolean} renderProps.focusVisible - Whether the focus state should be visible or not
     */
    children: PropTypes.func,
    /**
     * Identical to children
     */
    render: PropTypes.func
  }

  static defaultProps = {
    children: null,
    render: undefined
  }

  static inputTypes = {
    text: true,
    search: true,
    url: true,
    tel: true,
    email: true,
    password: true,
    number: true,
    date: true,
    month: true,
    week: true,
    time: true,
    datetime: true,
    'datetime-local': true
  }

  _listeners = []
  _inputModeListener = null

  state = {
    focused: false,
    focusable: false
  }

  componentDidMount () {
    const { focusable, focused } = this
    this.addEventListeners(focusable)
    this.setState({
      focusable,
      focused
    })
  }

  componentDidUpdate (prevProps, prevState) {
    const { render, children } = this.props

    // Check if the focusable element changed since the last render
    if (prevState.focusable !== this.focusable) {

      // If the element changed on or while focused, update the focusable element along with the
      // listeners and ensure that we are still focused
      if (this.state.focused) {
        this.focusable.focus()
        this.updateFocusable(true)
      } else {
        this.updateFocusable()
      }
    }

    if (prevProps.children !== children || prevProps.render !== render) {
      this.updateFocusable()
    }
  }

  componentWillUnmount () {
    this.removeEventListeners()
  }

  updateFocusable (focused = this.focused) {
    const { focusable } = this

    if (focusable !== this.state.focusable) {
      this.removeEventListeners()
      this.setState({ focusable, focused })
      this.addEventListeners(focusable)
    } else {
      this.setState({ focused })
    }
  }

  addEventListeners (focusable) {
    if (focusable) {
      this._listeners.push(addEventListener(focusable, 'focus', this.handleFocus, true))
      this._listeners.push(addEventListener(focusable, 'blur', this.handleBlur, true))
    }
  }

  removeEventListeners () {
    this._listeners.forEach(listener => listener.remove())
    this._listeners = []
  }

  handleFocus = event => {
    this.setState({ focused: true })
  }

  handleBlur = event => {
    this.setState({ focused: false })
  }

  get focused () {
    return containsActiveElement(this)
  }

  get focusable () {
    const tabbable = findTabbable(this, true) || []
    const tabbableCount = tabbable && tabbable.length || 0

    error(tabbableCount === 1, `[Focusable] Exactly one tabbable child is required (${tabbableCount} found).`)

    const focusable = tabbable ? tabbable[0] : false

    if (focusable && typeof focusable.focus === 'function')  {
      return focusable
    } else {
      return false
    }
  }

  focus () {
    const { focusable } = this
    if (focusable) {
      focusable.focus()
    }
  }

  get focusVisible () {
    const { focusable, focused } = this.state

    // always show focus for keyboard input mode
    if (focused && InputModeListener.isKeyboardMode()) return true

    if (!focusable || !focused) return false

    const { tagName, type, readOnly, isContentEditable } = focusable

    if (tagName == 'INPUT' && Focusable.inputTypes[type] && !readOnly) {
      return true
    }

    if (tagName == 'TEXTAREA' && !readOnly) {
      return true
    }

    if (isContentEditable) {
      return true
    }

    return false
  }

  render () {
    const { children, render = children } = this.props
    const { focusable, focused } = this.state
    const { focusVisible } = this

    if (typeof render === 'function') {
      return render({ focused, focusable, focusVisible })
    } else {
     return null
    }
  }
}

export default Focusable
export { default as FocusableView } from './FocusableView'
