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

import { SkeletonShape } from '../SkeletonShape'
import type { SkeletonShapeProps } from '../SkeletonShape/props'

type BoundShapeProps = Omit<SkeletonShapeProps, 'shape'>

/**
 * The three primitives from the design spec, as named shortcuts over
 * `SkeletonLoader.Shape`. Composing pages from these rather than hand-rolling
 * markup per feature is what keeps sizing and motion consistent.
 *
 * These deliberately carry no docs metadata of their own — they are thin
 * aliases, documented alongside the shape they bind rather than as separate
 * pages in the nav.
 */
const bindShape = (shape: SkeletonShapeProps['shape'], displayName: string) => {
  const Bound = forwardRef<HTMLSpanElement, BoundShapeProps>((props, ref) => (
    <SkeletonShape {...props} shape={shape} ref={ref} />
  ))
  Bound.displayName = displayName
  return Bound
}

const Circle = bindShape('circle', 'Circle')
const Rectangle = bindShape('rectangle', 'Rectangle')
const Text = bindShape('text', 'Text')

export { Circle, Rectangle, Text }
export type { BoundShapeProps }
