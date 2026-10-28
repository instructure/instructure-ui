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
'use client'
import React from 'react'
import { ImageCard } from '@instructure/ui/latest'

const SRC =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

// ImageCard picks its title size, padding and border radius from its own
// width, so each wrapper width below pins the card inside it to one step.
const STEPS = [
  { width: '200px', label: 'below breakpointMd' },
  { width: '400px', label: 'between breakpointMd and breakpointLg' },
  { width: '800px', label: 'above breakpointLg' }
]

export default function ImageCardPage() {
  return (
    <main className="flex gap-8 p-8 flex-col items-start axe-test">
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {STEPS.map(({ width, label }) => (
          <div
            key={width}
            style={{ width }}
            data-testid={`image-card-${width}-wrapper`}
          >
            <ImageCard title="Card title" src={SRC} alt="Placeholder image">
              Image card, {label}
            </ImageCard>
          </div>
        ))}
      </div>
    </main>
  )
}
