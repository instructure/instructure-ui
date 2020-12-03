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
// original source: https://github.com/kentcdodds/dom-testing-library/blob/master/src/events.js
// modified to add spy to Event methods

import { spy } from '@instructure/ui-test-sandbox'

const eventMap = {
  // Clipboard Events
  copy: {
    EventType: 'ClipboardEvent',
    defaultInit: { bubbles: true, cancelable: true }
  },
  cut: {
    EventType: 'ClipboardEvent',
    defaultInit: { bubbles: true, cancelable: true }
  },
  paste: {
    EventType: 'ClipboardEvent',
    defaultInit: { bubbles: true, cancelable: true }
  },
  // Composition Events
  compositionEnd: {
    EventType: 'CompositionEvent',
    defaultInit: { bubbles: true, cancelable: true }
  },
  compositionStart: {
    EventType: 'CompositionEvent',
    defaultInit: { bubbles: true, cancelable: true }
  },
  compositionUpdate: {
    EventType: 'CompositionEvent',
    defaultInit: { bubbles: true, cancelable: false }
  },
  // Keyboard Events
  keyDown: {
    EventType: 'KeyboardEvent',
    defaultInit: { bubbles: true, cancelable: true, charCode: 0 }
  },
  keyPress: {
    EventType: 'KeyboardEvent',
    defaultInit: { bubbles: true, cancelable: true, charCode: 0 }
  },
  keyUp: {
    EventType: 'KeyboardEvent',
    defaultInit: { bubbles: true, cancelable: true, charCode: 0 }
  },
  // Focus Events
  focus: {
    EventType: 'FocusEvent',
    defaultInit: { bubbles: false, cancelable: false }
  },
  focusIn: {
    EventType: 'FocusEvent',
    defaultInit: { bubbles: true, cancelable: false }
  },
  focusOut: {
    EventType: 'FocusEvent',
    defaultInit: { bubbles: true, cancelable: false }
  },
  blur: {
    EventType: 'FocusEvent',
    defaultInit: { bubbles: false, cancelable: false }
  },
  // Form Events
  change: {
    EventType: 'InputEvent',
    defaultInit: { bubbles: true, cancelable: true }
  },
  beforeInput: {
    EventType: 'InputEvent',
    defaultInit: { bubbles: true, cancelable: true }
  },
  input: {
    EventType: 'InputEvent',
    defaultInit: { bubbles: true, cancelable: true }
  },
  invalid: {
    EventType: 'Event',
    defaultInit: { bubbles: false, cancelable: true }
  },
  submit: {
    EventType: 'Event',
    defaultInit: { bubbles: true, cancelable: true }
  },
  // Mouse Events
  click: {
    EventType: 'MouseEvent',
    defaultInit: { bubbles: true, cancelable: true, button: 0 }
  },
  contextMenu: {
    EventType: 'MouseEvent',
    defaultInit: { bubbles: true, cancelable: true }
  },
  dblClick: {
    EventType: 'MouseEvent',
    defaultInit: { bubbles: true, cancelable: true }
  },
  drag: {
    EventType: 'DragEvent',
    defaultInit: { bubbles: true, cancelable: true }
  },
  dragEnd: {
    EventType: 'DragEvent',
    defaultInit: { bubbles: true, cancelable: false }
  },
  dragEnter: {
    EventType: 'DragEvent',
    defaultInit: { bubbles: true, cancelable: true }
  },
  dragExit: {
    EventType: 'DragEvent',
    defaultInit: { bubbles: true, cancelable: false }
  },
  dragLeave: {
    EventType: 'DragEvent',
    defaultInit: { bubbles: true, cancelable: false }
  },
  dragOver: {
    EventType: 'DragEvent',
    defaultInit: { bubbles: true, cancelable: true }
  },
  dragStart: {
    EventType: 'DragEvent',
    defaultInit: { bubbles: true, cancelable: true }
  },
  drop: {
    EventType: 'DragEvent',
    defaultInit: { bubbles: true, cancelable: true }
  },
  mouseDown: {
    EventType: 'MouseEvent',
    defaultInit: { bubbles: true, cancelable: true }
  },
  mouseEnter: {
    EventType: 'MouseEvent',
    defaultInit: { bubbles: true, cancelable: true }
  },
  mouseLeave: {
    EventType: 'MouseEvent',
    defaultInit: { bubbles: true, cancelable: true }
  },
  mouseMove: {
    EventType: 'MouseEvent',
    defaultInit: { bubbles: true, cancelable: true }
  },
  mouseOut: {
    EventType: 'MouseEvent',
    defaultInit: { bubbles: true, cancelable: true }
  },
  mouseOver: {
    EventType: 'MouseEvent',
    defaultInit: { bubbles: true, cancelable: true }
  },
  mouseUp: {
    EventType: 'MouseEvent',
    defaultInit: { bubbles: true, cancelable: true }
  },
  // Selection Events
  select: {
    EventType: 'Event',
    defaultInit: { bubbles: true, cancelable: false }
  },
  // Touch Events
  touchCancel: {
    EventType: 'TouchEvent',
    defaultInit: { bubbles: true, cancelable: false }
  },
  touchEnd: {
    EventType: 'TouchEvent',
    defaultInit: { bubbles: true, cancelable: true }
  },
  touchMove: {
    EventType: 'TouchEvent',
    defaultInit: { bubbles: true, cancelable: true }
  },
  touchStart: {
    EventType: 'TouchEvent',
    defaultInit: { bubbles: true, cancelable: true }
  },
  // UI Events
  scroll: {
    EventType: 'UIEvent',
    defaultInit: { bubbles: false, cancelable: false }
  },
  // Wheel Events
  wheel: {
    EventType: 'WheelEvent',
    defaultInit: { bubbles: true, cancelable: true }
  },
  // Media Events
  abort: {
    EventType: 'Event',
    defaultInit: { bubbles: false, cancelable: false }
  },
  canPlay: {
    EventType: 'Event',
    defaultInit: { bubbles: false, cancelable: false }
  },
  canPlayThrough: {
    EventType: 'Event',
    defaultInit: { bubbles: false, cancelable: false }
  },
  durationChange: {
    EventType: 'Event',
    defaultInit: { bubbles: false, cancelable: false }
  },
  emptied: {
    EventType: 'Event',
    defaultInit: { bubbles: false, cancelable: false }
  },
  encrypted: {
    EventType: 'Event',
    defaultInit: { bubbles: false, cancelable: false }
  },
  ended: {
    EventType: 'Event',
    defaultInit: { bubbles: false, cancelable: false }
  },
  // error: {
  //   EventType: Event,
  //   defaultInit: {bubbles: false, cancelable: false},
  // },
  loadedData: {
    EventType: 'Event',
    defaultInit: { bubbles: false, cancelable: false }
  },
  loadedMetadata: {
    EventType: 'Event',
    defaultInit: { bubbles: false, cancelable: false }
  },
  loadStart: {
    EventType: 'ProgressEvent',
    defaultInit: { bubbles: false, cancelable: false }
  },
  pause: {
    EventType: 'Event',
    defaultInit: { bubbles: false, cancelable: false }
  },
  play: {
    EventType: 'Event',
    defaultInit: { bubbles: false, cancelable: false }
  },
  playing: {
    EventType: 'Event',
    defaultInit: { bubbles: false, cancelable: false }
  },
  progress: {
    EventType: 'ProgressEvent',
    defaultInit: { bubbles: false, cancelable: false }
  },
  rateChange: {
    EventType: 'Event',
    defaultInit: { bubbles: false, cancelable: false }
  },
  seeked: {
    EventType: 'Event',
    defaultInit: { bubbles: false, cancelable: false }
  },
  seeking: {
    EventType: 'Event',
    defaultInit: { bubbles: false, cancelable: false }
  },
  stalled: {
    EventType: 'Event',
    defaultInit: { bubbles: false, cancelable: false }
  },
  suspend: {
    EventType: 'Event',
    defaultInit: { bubbles: false, cancelable: false }
  },
  timeUpdate: {
    EventType: 'Event',
    defaultInit: { bubbles: false, cancelable: false }
  },
  volumeChange: {
    EventType: 'Event',
    defaultInit: { bubbles: false, cancelable: false }
  },
  waiting: {
    EventType: 'Event',
    defaultInit: { bubbles: false, cancelable: false }
  },
  // Image Events
  load: {
    EventType: 'UIEvent',
    defaultInit: { bubbles: false, cancelable: false }
  },
  error: {
    EventType: 'Event',
    defaultInit: { bubbles: false, cancelable: false }
  },
  // Animation Events
  animationStart: {
    EventType: 'AnimationEvent',
    defaultInit: { bubbles: true, cancelable: false }
  },
  animationEnd: {
    EventType: 'AnimationEvent',
    defaultInit: { bubbles: true, cancelable: false }
  },
  animationIteration: {
    EventType: 'AnimationEvent',
    defaultInit: { bubbles: true, cancelable: false }
  },
  // Transition Events
  transitionEnd: {
    EventType: 'TransitionEvent',
    defaultInit: { bubbles: true, cancelable: true }
  }
}

const eventAliasMap = {
  doubleClick: 'dblClick'
}

function fireEvent(element, event) {
  // eslint-disable-next-line no-param-reassign
  event.preventDefault = spy(event, 'preventDefault')
  // eslint-disable-next-line no-param-reassign
  event.stopPropagation = spy(event, 'stopPropagation')
  element.dispatchEvent(event)
  return event
}

Object.entries(eventMap).forEach(([key, { EventType, defaultInit }]) => {
  const eventName = key.toLowerCase()

  fireEvent[key] = (node, init = {}) => {
    const eventInit = { ...defaultInit, ...init }
    const { target: { value, files, ...targetProperties } = {} } = eventInit
    Object.assign(node, targetProperties)
    if (typeof value !== 'undefined') {
      setNativeValue(node, value)
    }
    if (typeof files !== 'undefined') {
      // input.files is a read-only property so this is not allowed:
      // input.files = [file]
      // so we have to use this workaround to set the property
      Object.defineProperty(node, 'files', {
        value: files
      })
    }
    const window = node.ownerDocument.defaultView
    const EventConstructor = window[EventType] || window.Event
    const event = new EventConstructor(eventName, eventInit)
    return fireEvent(node, event)
  }
})

// function written after some investigation here:
// https://github.com/facebook/react/issues/10135#issuecomment-401496776
function setNativeValue(element, value) {
  const { set: valueSetter } =
    Object.getOwnPropertyDescriptor(element, 'value') || {}
  const prototype = Object.getPrototypeOf(element)
  const { set: prototypeValueSetter } =
    Object.getOwnPropertyDescriptor(prototype, 'value') || {}
  if (prototypeValueSetter && valueSetter !== prototypeValueSetter) {
    prototypeValueSetter.call(element, value)
  } /* istanbul ignore next (I don't want to bother) */ else if (valueSetter) {
    valueSetter.call(element, value)
  } else {
    throw new Error('The given element does not have a value setter')
  }
}

// React event system tracks native mouseOver/mouseOut events for
// running onMouseEnter/onMouseLeave handlers
// @link https://github.com/facebook/react/blob/b87aabdfe1b7461e7331abb3601d9e6bb27544bc/packages/react-dom/src/events/EnterLeaveEventPlugin.js#L24-L31
fireEvent.mouseEnter = fireEvent.mouseOver
fireEvent.mouseLeave = fireEvent.mouseOut

fireEvent.select = (node, init) => {
  // React tracks this event only on focused inputs
  node.focus()

  // React creates this event when one of the following native events happens
  // - contextMenu
  // - mouseUp
  // - dragEnd
  // - keyUp
  // - keyDown
  // so we can use any here
  // @link https://github.com/facebook/react/blob/b87aabdfe1b7461e7331abb3601d9e6bb27544bc/packages/react-dom/src/events/SelectEventPlugin.js#L203-L224
  fireEvent.keyUp(node, init)
}

Object.entries(eventAliasMap).forEach(([aliasKey, key]) => {
  fireEvent[aliasKey] = (...args) => fireEvent[key](...args)
})

export { fireEvent, eventMap }
