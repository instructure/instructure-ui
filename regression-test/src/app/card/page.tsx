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
import { Card as c, Text as t } from '@instructure/ui/latest'

// alias to avoid TS/SSR friction like other pages
const Card = c as any
const Text = t as any

// Card picks its padding and border radius from its own width, so each
// wrapper width below pins the Card inside it to one step.
const STEPS = [
  { width: '200px', label: 'below breakpointMd' },
  { width: '400px', label: 'between breakpointMd and breakpointLg' },
  { width: '800px', label: 'above breakpointLg' }
]

export default function CardPage() {
  return (
    <main className="flex gap-8 p-8 flex-col items-start axe-test">
      {/* Base variant at each step */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {STEPS.map(({ width, label }) => (
          <div
            key={width}
            style={{ width }}
            data-testid={`base-card-${width}-wrapper`}
          >
            <Card>
              <Text variant="content">Base card, {label}</Text>
            </Card>
          </div>
        ))}
      </div>

      {/* Nested variant at each step, on the base Card surface it needs */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {STEPS.map(({ width, label }) => (
          <div
            key={width}
            style={{ width }}
            data-testid={`nested-card-${width}-wrapper`}
          >
            <Card>
              <Card variant="nested">
                <Text variant="content">Nested card, {label}</Text>
              </Card>
            </Card>
          </div>
        ))}
      </div>

      {/* Several nested Cards inside one base Card */}
      <div style={{ width: '800px' }} data-testid="multiple-nested-wrapper">
        <Card>
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            <Card variant="nested">
              <Text variant="content">First nested card</Text>
            </Card>
            <Card variant="nested">
              <Text variant="content">Second nested card</Text>
            </Card>
          </div>
        </Card>
      </div>
    </main>
  )
}
