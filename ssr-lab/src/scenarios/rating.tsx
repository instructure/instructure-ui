'use client'

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

import { Rating as rt, View as vw, Text as tx } from '@instructure/ui/latest'

const Rating = rt as any
const View = vw as any
const Text = tx as any

const formatValueText = (current: number, max: number) => `${current} / ${max}`

export default function Scenario() {
  return (
    <View as="div" maxWidth="34rem">
      {['small', 'medium', 'large'].map((size) => (
        <View as="div" key={size} margin="0 0 medium">
          <Text size="small">{size}</Text>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <Rating
              label="Értékelés animáció nélkül"
              size={size}
              iconCount={5}
              valueNow={3.76}
              valueMax={5}
              formatValueText={formatValueText}
            />
            {/* animateFill fills the stars in after mount, which is a real
                mount-time visual change on top of the two-pass styles. */}
            <Rating
              animateFill
              label="Értékelés animációval"
              size={size}
              iconCount={5}
              valueNow={3.76}
              valueMax={5}
              formatValueText={formatValueText}
            />
          </div>
        </View>
      ))}
    </View>
  )
}
