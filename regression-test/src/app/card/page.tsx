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

export default function CardPage() {
  return (
    <main className="flex gap-8 p-8 flex-col items-start axe-test">
      {/* Sizes */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <Card size="sm">
          <Text variant="content">Small base card</Text>
        </Card>
        <Card size="md">
          <Text variant="content">Medium base card</Text>
        </Card>
        <Card size="lg">
          <Text variant="content">Large base card</Text>
        </Card>
      </div>

      {/* Nested cards */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <Card variant="base" size="sm">
          <Card variant="nested" size="sm">
            <Text variant="content">Nested small card</Text>
          </Card>
        </Card>
        <Card variant="base" size="md">
          <Card variant="nested" size="md">
            <Text variant="content">Nested medium card</Text>
          </Card>
        </Card>
        <Card variant="base" size="lg">
          <Card variant="nested" size="lg">
            <Text variant="content">Nested large card</Text>
          </Card>
        </Card>
      </div>
    </main>
  )
}
