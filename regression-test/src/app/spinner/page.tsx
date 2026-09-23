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
import { Spinner, Text, View } from '@instructure/ui/latest'

const SIZES = ['x-small', 'small', 'medium', 'large'] as const

function Row({
  variant
}: {
  variant: 'default' | 'inverse' | 'ai' | 'ai-on-color'
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      {SIZES.map((size) => (
        <Spinner
          key={size}
          renderTitle={`Loading ${variant} ${size}`}
          variant={variant}
          size={size}
        />
      ))}
    </div>
  )
}

export default function SpinnerPage() {
  return (
    <main className="flex gap-8 p-8 flex-col items-start axe-test">
      {/*
        The spinner animates forever, so a screenshot would catch a different
        frame every run and always count as a diff. Pausing keeps the animation
        styles in the page but freezes every spinner on its first frame.
      */}
      <style>{`.axe-test * { animation-play-state: paused !important; }`}</style>

      <div>
        <Text>default</Text>
      </div>
      <Row variant="default" />

      <div>
        <Text>inverse</Text>
      </div>
      <View background="info" as="div" padding="small">
        <Row variant="inverse" />
      </View>

      <div>
        <Text>ai</Text>
      </div>
      <Row variant="ai" />

      <div>
        <Text>ai-on-color</Text>
      </div>
      <View background="info" as="div" padding="small">
        <Row variant="ai-on-color" />
      </View>
    </main>
  )
}
