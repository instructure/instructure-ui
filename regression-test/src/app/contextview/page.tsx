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
import {
  ContextView as cv,
  Heading as hd,
  Text as tx
} from '@instructure/ui/latest'

const ContextView = cv as any
const Heading = hd as any
const Text = tx as any

export default function ContextViewPage() {
  return (
    <main className="flex gap-8 p-8 flex-col items-start axe-test">
      {/* padding + margin + placement + shadow */}
      <ContextView
        padding="small"
        margin="large"
        placement="end top"
        shadow="resting"
      >
        <Heading level="h3">Hello World</Heading>
      </ContextView>

      {/* placement top with heading + text */}
      <ContextView margin="0 large 0 0" padding="small" placement="top">
        <Heading level="h3">Hello World</Heading>
        <Text size="small">Some informational text that is helpful</Text>
      </ContextView>

      {/* end-aligned text */}
      <ContextView
        margin="0 large 0 0"
        padding="small"
        textAlign="end"
        placement="start"
      >
        <Heading level="h3">Hello World</Heading>
        <Text size="small">This ContextView is end-text-aligned</Text>
      </ContextView>

      {/* inverse background, fixed width */}
      <ContextView
        placement="end bottom"
        padding="medium"
        background="inverse"
        width="30rem"
        margin="x-large 0 0"
      >
        This ContextView uses the inverse background and medium padding. Its
        width prop is set to 30rem, which causes long strings like this to wrap.
        It also has top margin to separate it from the ContextViews above it.
      </ContextView>
    </main>
  )
}
