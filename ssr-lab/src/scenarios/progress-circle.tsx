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

import {
  ProgressCircle as pc,
  ProgressBar as pb,
  View as vw
} from '@instructure/ui/latest'

const ProgressCircle = pc as any
const ProgressBar = pb as any
const View = vw as any

export default function Scenario() {
  return (
    <View as="div" maxWidth="40rem">
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end' }}>
        {['x-small', 'small', 'medium', 'large'].map((size) => (
          <ProgressCircle
            key={size}
            size={size}
            screenReaderLabel="Betöltés"
            valueNow={40}
            valueMax={60}
          />
        ))}
      </div>

      {/* `shouldAnimateOnMount` is a mount-time visual change by design; useful
          to see how the meter reports something that is intentional. */}
      <View as="div" margin="large 0">
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end' }}>
          {['x-small', 'small', 'medium', 'large'].map((size) => (
            <ProgressCircle
              key={size}
              size={size}
              screenReaderLabel="Betöltés animációval"
              valueNow={40}
              valueMax={60}
              shouldAnimateOnMount
            />
          ))}
        </div>
      </View>

      <View as="div" margin="large 0 0">
        {['x-small', 'small', 'medium', 'large'].map((size) => (
          <View as="div" key={size} margin="0 0 small">
            <ProgressBar
              size={size}
              screenReaderLabel="Betöltés"
              valueNow={40}
              valueMax={60}
            />
          </View>
        ))}
      </View>
    </View>
  )
}
