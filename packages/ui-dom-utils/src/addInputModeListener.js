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
import { addEventListener } from './addEventListener'
import { canUseDOM } from './canUseDOM'

const MODES = {
  keyboard: 'keyboard',
  pointer: 'pointer'
}

let _moveListeners = []
let _downListeners = []
let _mode = MODES.keyboard
let _registeredCount = 0
let _modeChangeHandlers = {}

const handleInitialPointerMove = (event) => {
  // Work around a Safari quirk that fires a mousemove on <html> whenever the
  // window blurs, even if you're tabbing out of the page. ¯\_(ツ)_/¯
  if (event.target.nodeName.toLowerCase() === 'html') {
    return
  }
  handleInputModeChange(_mode, MODES.pointer)
  _moveListeners.forEach((listener) => listener.remove())
}

const handleInputModeChange = (currentMode, newMode) => {
  if (currentMode === newMode) return

  _mode = newMode

  Object.keys(_modeChangeHandlers).forEach((handlerId) =>
    _modeChangeHandlers[handlerId](currentMode, newMode)
  )
}

const handleKeyDown = () => {
  handleInputModeChange(_mode, MODES.keyboard)
}

const handlePointerDown = () => {
  handleInputModeChange(_mode, MODES.pointer)
}

const addMoveListeners = () => {
  if (_moveListeners.length === 0) {
    _moveListeners.push(
      addEventListener(document, 'mousemove', handleInitialPointerMove, true)
    )
    _moveListeners.push(
      addEventListener(document, 'mousedown', handleInitialPointerMove, true)
    )
    _moveListeners.push(
      addEventListener(document, 'mouseup', handleInitialPointerMove, true)
    )
    _moveListeners.push(
      addEventListener(document, 'pointermove', handleInitialPointerMove, true)
    )
    _moveListeners.push(
      addEventListener(document, 'pointerdown', handleInitialPointerMove, true)
    )
    _moveListeners.push(
      addEventListener(document, 'pointerup', handleInitialPointerMove, true)
    )
    _moveListeners.push(
      addEventListener(document, 'touchmove', handleInitialPointerMove, true)
    )
    _moveListeners.push(
      addEventListener(document, 'touchstart', handleInitialPointerMove, true)
    )
    _moveListeners.push(
      addEventListener(document, 'touchend', handleInitialPointerMove, true)
    )
  }
}

const addDownListeners = () => {
  if (_downListeners.length === 0) {
    _downListeners.push(
      addEventListener(document, 'keydown', handleKeyDown, true)
    )
    _downListeners.push(
      addEventListener(document, 'mousedown', handlePointerDown, true)
    )
    _downListeners.push(
      addEventListener(document, 'pointerdown', handlePointerDown, true)
    )
    _downListeners.push(
      addEventListener(document, 'touchstart', handlePointerDown, true)
    )
  }
}

const removeListeners = () => {
  _moveListeners.forEach((listener) => listener.remove())
  _moveListeners = []
  _downListeners.forEach((listener) => listener.remove())
  _downListeners = []
}

const addInputModeListener = ({ onInputModeChange }) => {
  const id = _registeredCount++

  if (typeof onInputModeChange === 'function') {
    _modeChangeHandlers[id] = onInputModeChange
  }

  if (canUseDOM) {
    addDownListeners()
    addMoveListeners()
  }

  return {
    isKeyboardMode: () => {
      return _mode === MODES.keyboard
    },
    remove: () => {
      if (_registeredCount === 1) {
        removeListeners()
      }

      delete _modeChangeHandlers[id]

      _registeredCount--
    }
  }
}

export default addInputModeListener
export { addInputModeListener, MODES }
