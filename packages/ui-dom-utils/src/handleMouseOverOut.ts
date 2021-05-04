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

import { contains } from './contains'

/**
 * ---
 * category: utilities/DOM
 * ---
 *
 * Simple implementation of mouseEnter and mouseLeave.
 * React's built version is broken: https://github.com/facebook/react/issues/4251
 * for cases when the trigger is disabled and mouseOut/Over can cause flicker moving
 * from one child element to another.
 *
 * @module handleMouseOverOut
 * @param handler {function} Callback function for handling the event
 * @param event {Event} The DOM Event that was fired
 */
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'handler' implicitly has an 'any' type.
function handleMouseOverOut(handler, event) {
  const target = event.currentTarget
  const related = event.relatedTarget || event.nativeEvent.toElement

  if (!related || (related !== target && !contains(target, related))) {
    handler(event)
  }
}

export default handleMouseOverOut
export { handleMouseOverOut }
