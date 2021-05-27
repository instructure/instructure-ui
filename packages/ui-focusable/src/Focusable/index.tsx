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

import {
  addInputModeListener,
  addEventListener,
  containsActiveElement,
  findFocusable
} from '@instructure/ui-dom-utils'
import { logWarn as warn } from '@instructure/console'

type Props = {
  render?: (...args: any[]) => any
}

/**
---
category: components/utilities
---
**/
class Focusable extends Component<Props> {
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

  _focusListener: { remove(): void } | null = null
  _blurListener: { remove(): void } | null = null
  _inputModeListener: { isKeyboardMode(): void; remove(): void } | null = null

  state = {
    focused: false,
    focusable: false
  }

  componentDidMount() {
    const { focusable, focused } = this
    this.addFocusableListeners(focusable, focused)
    this._inputModeListener = addInputModeListener({
      onInputModeChange: this.handleInputModeChange
    })
    this.setState({
      focusable,
      focused
    })
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'prevProps' implicitly has an 'any' type... Remove this comment to see the full error message
  getSnapshotBeforeUpdate(prevProps, prevState) {
    const { render, children } = this.props
    // prevent blur from firing when focusable element is replaced
    if (prevProps.children !== children || prevProps.render !== render) {
      this.removeFocusableListeners()
    }
    return null
  }

  // @ts-expect-error ts-migrate(6133) FIXME: 'prevProps' is declared but its value is never rea... Remove this comment to see the full error message
  componentDidUpdate(prevProps, prevState) {
    const { focusable } = this

    if (!focusable && this.state.focusable) {
      this.removeFocusableListeners()

      this.setState({
        focusable: false,
        focused: false
      })
    } else if (focusable !== this.state.focusable) {
      this.removeFocusableListeners()

      if (this.state.focused) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'focus' does not exist on type 'false | u... Remove this comment to see the full error message
        focusable.focus()
      }

      this.addFocusableListeners(focusable, this.state.focused)

      this.setState({ focusable })
    } else {
      this.addFocusableListeners(focusable, this.state.focused)
    }
  }

  componentWillUnmount() {
    if (this._inputModeListener) {
      this._inputModeListener.remove()
      this._inputModeListener = null
    }
    this.removeFocusableListeners()
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'focusable' implicitly has an 'any' type... Remove this comment to see the full error message
  addFocusableListeners(focusable, focused) {
    if (!focusable) return

    if (focused && !this._blurListener) {
      this._blurListener = addEventListener(
        focusable,
        'blur',
        this.handleBlur,
        true
      )
    } else if (!this._focusListener) {
      this._focusListener = addEventListener(
        focusable,
        'focus',
        this.handleFocus,
        true
      )
    }
  }

  removeFocusableListeners() {
    this.removeFocusListener()
    this.removeBlurListener()
  }

  removeFocusListener() {
    if (this._focusListener) {
      this._focusListener.remove()
      this._focusListener = null
    }
  }

  removeBlurListener() {
    if (this._blurListener) {
      this._blurListener.remove()
      this._blurListener = null
    }
  }

  handleInputModeChange = () => {
    this.forceUpdate()
  }

  // @ts-expect-error ts-migrate(6133) FIXME: 'event' is declared but its value is never read.
  handleFocus = (event) => {
    this.removeFocusListener()
    this.setState({ focused: true })
  }

  // @ts-expect-error ts-migrate(6133) FIXME: 'event' is declared but its value is never read.
  handleBlur = (event) => {
    this.removeBlurListener()
    this.setState({ focused: false })
  }

  get focused() {
    return containsActiveElement(this)
  }

  get focusable() {
    let focusable = findFocusable(this, () => true, true) || []
    const focusableCount = (focusable && focusable.length) || 0

    // @ts-expect-error ts-migrate(2555) FIXME: Expected at least 5 arguments, but got 2.
    warn(
      focusableCount === 1,
      `[Focusable] Exactly one focusable child is required (${focusableCount} found).`
    )

    // @ts-expect-error ts-migrate(2322) FIXME: Type 'unknown' is not assignable to type 'unknown[... Remove this comment to see the full error message
    focusable = focusable ? focusable[0] : false

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'focus' does not exist on type 'unknown[]... Remove this comment to see the full error message
    if (focusable && typeof focusable.focus === 'function') {
      return focusable
    } else {
      return false
    }
  }

  get focusVisible() {
    const { focusable, focused } = this.state
    return this.isFocusVisible(focusable, focused)
  }

  focus() {
    const { focusable } = this
    if (focusable) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'focus' does not exist on type 'unknown[]... Remove this comment to see the full error message
      focusable.focus()
    }
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'focusable' implicitly has an 'any' type... Remove this comment to see the full error message
  isFocusVisible(focusable, focused) {
    if (!focusable || !focused) return false

    // always show focus for keyboard input mode
    if (this._inputModeListener && this._inputModeListener.isKeyboardMode())
      return true

    const { tagName, type, isContentEditable } = focusable

    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (tagName == 'INPUT' && Focusable.inputTypes[type]) {
      return true
    }

    if (tagName == 'TEXTAREA') {
      return true
    }

    if (isContentEditable) {
      return true
    }

    return false
  }

  render() {
    const { children, render = children } = this.props
    const { focusable, focused } = this.state

    if (typeof render === 'function') {
      return render({
        focused,
        focusable,
        focusVisible: this.isFocusVisible(focusable, focused)
      })
    } else {
      return null
    }
  }
}

export default Focusable
export { Focusable }
