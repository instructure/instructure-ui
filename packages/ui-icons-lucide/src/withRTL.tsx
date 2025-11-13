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

import { forwardRef } from 'react'
import type { LucideIcon, LucideProps } from 'lucide-react'

interface RTLOptions {
  flipsInRTL: boolean
}

/**
 * Wraps a Lucide icon component with RTL (Right-to-Left) support.
 * When flipsInRTL is true, the icon will be flipped horizontally in RTL contexts.
 *
 * @param Icon - The Lucide icon component to wrap
 * @param options - Configuration options
 * @returns A new component with RTL support
 *
 * @example
 * ```tsx
 * import { ArrowLeft } from 'lucide-react'
 * import { withRTL } from './withRTL'
 *
 * // Create an RTL-aware arrow icon
 * export const IconArrowStart = withRTL(ArrowLeft, { flipsInRTL: true })
 *
 * // In LTR: arrow points left
 * // In RTL: arrow points right (flipped)
 * <IconArrowStart size={24} />
 * ```
 */
export function withRTL(Icon: LucideIcon, options: RTLOptions): LucideIcon {
  // If icon doesn't need to flip in RTL, return it as-is (zero overhead)
  if (!options.flipsInRTL) {
    return Icon
  }

  // Create RTL-aware wrapper only for bidirectional icons
  const RTLIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
    // Detect RTL context from document direction
    const isRTL =
      typeof document !== 'undefined' &&
      (document.dir === 'rtl' || document.documentElement.dir === 'rtl')

    // If not in RTL context, render normally
    if (!isRTL) {
      return <Icon ref={ref} {...props} />
    }

    // Flip horizontally for RTL
    return (
      <span
        style={{
          display: 'inline-block',
          transform: 'scaleX(-1)',
          lineHeight: 0 // Prevent extra spacing
        }}
      >
        <Icon ref={ref} {...props} />
      </span>
    )
  })

  RTLIcon.displayName = `RTL(${Icon.displayName || Icon.name})`

  return RTLIcon as LucideIcon
}
