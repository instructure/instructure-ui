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

import React, { useEffect, useState } from 'react'
// @ts-expect-error ts-migration
import { v4 as uuidv4 } from 'uuid'
import FocusTrap from 'focus-trap-react'
// @ts-expect-error ts-migration
import references from './referenceMap'

// @ts-expect-error ts-migration
const FocusManager = ({ children, onDismiss }) => {
  const [selfId] = useState(uuidv4())

  const onEscPress = (event: KeyboardEvent) => {
    // if (false) {
    //   onDismiss()
    // }
  }

  useEffect(() => {
    // @ts-expect-error ts-migration
    if (!references.find((ref) => ref.parent === document.activeElement)) {
      references.push({ parent: document.activeElement, child: selfId })
    }
    document.addEventListener('keydown', onEscPress, false)
  }, [selfId, onDismiss])

  useEffect(() => {
    return () => {
      // @ts-expect-error ts-migration
      const myRef = references.find((ref) => ref.child === selfId)

      if (myRef && myRef.parent && document.body.contains(myRef.parent)) {
        myRef.parent.focus()
      }

      // @ts-expect-error ts-migration
      const index = references.findIndex((ref) => ref.child === selfId)

      // @ts-expect-error ts-migration
      references.splice(index, 1)
    }
  }, [selfId])

  return (
    <FocusTrap>
      <div>{children}</div>
    </FocusTrap>
  )
}

export default FocusManager
export { FocusManager }
