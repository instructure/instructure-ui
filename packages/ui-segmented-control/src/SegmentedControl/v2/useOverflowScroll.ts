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

import { useEffect, useRef, useState } from 'react'
import type { RefObject } from 'react'

// share of the visible width that one arrow click moves the options by
const SCROLL_STEP = 0.75

type Params = {
  trackRef: RefObject<HTMLElement | null>
  isEnabled: boolean
  selectedValue?: string
  firstValue?: string
  lastValue?: string
  previousArrowRef: RefObject<HTMLElement | null>
  nextArrowRef: RefObject<HTMLElement | null>
}

/**
 * Tracks whether the options are clipped at either end of the scrolling
 * track, keeps the selected option in view, and scrolls on request.
 */
const useOverflowScroll = ({
  trackRef,
  isEnabled,
  selectedValue,
  firstValue,
  lastValue,
  previousArrowRef,
  nextArrowRef
}: Params) => {
  const [canScrollPrevious, setCanScrollPrevious] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)
  const hasPositioned = useRef(false)

  // an end option that is not fully visible means there is more to scroll to
  useEffect(() => {
    const track = trackRef.current
    const first = track?.firstElementChild
    const last = track?.lastElementChild
    if (!isEnabled || !track || !first || !last) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const { target, isIntersecting } of entries) {
          const isStart = target === first
          const setCanScroll = isStart ? setCanScrollPrevious : setCanScrollNext
          setCanScroll(!isIntersecting)

          // an arrow that unmounts while focused would drop focus to the page, and
          // scrolling to the focused option would undo the scroll that got us here
          const arrow = isStart ? previousArrowRef : nextArrowRef
          if (
            isIntersecting &&
            arrow.current?.contains(document.activeElement)
          ) {
            track
              .querySelector<HTMLElement>('[tabindex="0"]')
              ?.focus({ preventScroll: true })
          }
        }
      },
      { root: track, threshold: 0.99 }
    )
    observer.observe(first)
    observer.observe(last)
    return () => observer.disconnect()
  }, [
    isEnabled,
    firstValue,
    lastValue,
    trackRef,
    previousArrowRef,
    nextArrowRef
  ])

  // scrollLeft is direction dependent, so move by on-screen distance instead
  useEffect(() => {
    const track = trackRef.current
    const selected = track?.querySelector('[aria-checked="true"]')
    if (!isEnabled || !track || !selected) return

    const trackBox = track.getBoundingClientRect()
    const box = selected.getBoundingClientRect()
    track.scrollBy({
      left: box.left + box.width / 2 - (trackBox.left + trackBox.width / 2),
      behavior: hasPositioned.current ? 'smooth' : 'instant'
    })
    hasPositioned.current = true
  }, [isEnabled, selectedValue, trackRef])

  const scroll = (direction: 'previous' | 'next') => {
    const track = trackRef.current
    if (!track) return

    // scrollBy follows the screen: positive is always toward the right edge
    const isRtl = getComputedStyle(track).direction === 'rtl'
    const towardRight = (direction === 'next') !== isRtl
    const distance = track.clientWidth * SCROLL_STEP
    track.scrollBy({
      left: towardRight ? distance : -distance,
      behavior: 'smooth'
    })
  }

  return { canScrollPrevious, canScrollNext, scroll }
}

export default useOverflowScroll
export { useOverflowScroll }
