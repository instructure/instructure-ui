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

import { useLayoutEffect, useRef, useState } from 'react'

/**
 * ---
 * private: true
 * ---
 * Tells whether a horizontal Stepper has to show the mobile form, because its steps no longer fit
 * the container at their natural widths. Pass `sectionRef` to the container and `listRef` to the
 * horizontal list; `contentKey` changes whenever the steps' text changes.
 */
const useMobileForm = (enabled: boolean, contentKey: string) => {
  // the content the mobile form was chosen for: new text has new natural widths, so the horizontal
  // list is measured again
  const [mobileFor, setMobileFor] = useState<string | null>(null)
  const mobile = enabled && mobileFor === contentKey
  const sectionRef = useRef<HTMLElement | null>(null)
  const listRef = useRef<HTMLOListElement | null>(null)
  // the width the horizontal list needed when it stopped fitting
  const neededWidth = useRef(0)

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!enabled || !section) return

    const update = () => {
      const list = listRef.current
      if (list) {
        if (list.scrollWidth > list.clientWidth) {
          neededWidth.current = list.scrollWidth
          setMobileFor(contentKey)
        }
      } else if (section.clientWidth >= neededWidth.current) {
        setMobileFor(null)
      }
    }

    // a layout effect measures before the first paint, so an overflowing row never shows
    update()
    const observer = new ResizeObserver(update)
    observer.observe(section)
    return () => observer.disconnect()
  }, [enabled, mobile, contentKey])

  return { mobile, sectionRef, listRef }
}

export default useMobileForm
export { useMobileForm }
