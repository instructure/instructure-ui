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
import { logWarn as warn } from '@instructure/console'
import { addEventListener } from './addEventListener'
import { canUseDOM } from './canUseDOM'

export const MODES = {
  keyboard: 'keyboard',
  pointer: 'pointer'
}

class InputModeListenerImpl {
  constructor() {
    warn(
      false,
      `[InputModeListener] is deprecated and will be removed in version 7.0.0. Use addInputModeListener instead.`
    )
    this.init()
  }
  _listeners = []
  _initialized = false
  _mode = MODES.keyboard

  onInitialPointerMove = (event) => {
    // Work around a Safari quirk that fires a mousemove on <html> whenever the
    // window blurs, even if you're tabbing out of the page. ¯\_(ツ)_/¯
    if (event.target.nodeName.toLowerCase() === 'html') {
      return
    }
    this._mode = MODES.pointer
    this._listeners.forEach((listener) => listener.remove())
  }

  onKeyDown = () => {
    this._mode = MODES.keyboard
  }

  onPointerDown = () => {
    this._mode = MODES.pointer
  }

  addInitialPointerMoveListeners() {
    this._listeners.push(
      addEventListener(document, 'mousemove', this.onInitialPointerMove, true)
    )
    this._listeners.push(
      addEventListener(document, 'mousedown', this.onInitialPointerMove, true)
    )
    this._listeners.push(
      addEventListener(document, 'mouseup', this.onInitialPointerMove, true)
    )
    this._listeners.push(
      addEventListener(document, 'pointermove', this.onInitialPointerMove, true)
    )
    this._listeners.push(
      addEventListener(document, 'pointerdown', this.onInitialPointerMove, true)
    )
    this._listeners.push(
      addEventListener(document, 'pointerup', this.onInitialPointerMove, true)
    )
    this._listeners.push(
      addEventListener(document, 'touchmove', this.onInitialPointerMove, true)
    )
    this._listeners.push(
      addEventListener(document, 'touchstart', this.onInitialPointerMove, true)
    )
    this._listeners.push(
      addEventListener(document, 'touchend', this.onInitialPointerMove, true)
    )
  }

  init = () => {
    if (!canUseDOM || this._initialized) return
    addEventListener(document, 'keydown', this.onKeyDown, true)
    addEventListener(document, 'mousedown', this.onPointerDown, true)
    addEventListener(document, 'pointerdown', this.onPointerDown, true)
    addEventListener(document, 'touchstart', this.onPointerDown, true)
    this.addInitialPointerMoveListeners()
    this._initialized = true
  }

  get mode() {
    this.init()
    return this._mode
  }

  isKeyboardMode() {
    this.init()
    return this._mode === MODES.keyboard
  }
}

const InputModeListener = new InputModeListenerImpl()

export default InputModeListener
export { InputModeListener }
