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
import { View as vw } from '@instructure/ui/latest'

const View = vw as any

export default function ViewPage() {
  return (
    <main className="flex gap-12 p-8 flex-col items-start axe-test">
      <section>
        <View
          as="div"
          margin="small"
          padding="large"
          textAlign="center"
          background="secondary"
        >
          Basic View content
        </View>
      </section>

      {/* Backgrounds */}
      <section>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {[
            'transparent',
            'primary',
            'secondary',
            'primary-inverse',
            'brand',
            'alert',
            'success',
            'danger',
            'warning'
          ].map((bg) => (
            <View
              key={bg}
              as="div"
              display="inline-block"
              maxWidth="10rem"
              margin="small"
              padding="small"
              background={bg}
            >
              {bg}
            </View>
          ))}
        </div>
      </section>

      {/* Shadows */}
      <section>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {['resting', 'above', 'topmost'].map((sh) => (
            <View
              key={sh}
              as="span"
              display="inline-block"
              maxWidth="10rem"
              margin="small"
              padding="large"
              background="primary"
              shadow={sh}
            >
              {sh}
            </View>
          ))}
        </div>
      </section>

      {/* Border width and color */}
      <section>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <View
            as="span"
            display="inline-block"
            margin="small"
            padding="small"
            background="primary"
            borderWidth="small"
          >
            small
          </View>
          <View
            as="span"
            display="inline-block"
            margin="small"
            padding="small"
            background="primary"
            borderWidth="medium"
          >
            medium
          </View>
          <View
            as="span"
            display="inline-block"
            margin="small"
            padding="small"
            background="primary"
            borderWidth="large none"
          >
            large none
          </View>
          <View
            as="div"
            margin="small"
            padding="small"
            background="primary"
            borderWidth="none none small none"
          >
            bottom only
          </View>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {[
            'primary',
            'info',
            'warning',
            'danger',
            'alert',
            'success',
            'brand'
          ].map((bc) => (
            <View
              key={bc}
              as="span"
              display="inline-block"
              margin="small"
              padding="small"
              background="primary"
              borderWidth="large"
              borderColor={bc}
            >
              {bc}
            </View>
          ))}
        </div>
      </section>

      {/* Border radius */}
      <section>
        <div
          style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}
        >
          <View
            as="span"
            display="inline-block"
            maxWidth="10rem"
            margin="small"
            padding="medium"
            background="primary-inverse"
            borderRadius="medium"
            textAlign="center"
          >
            medium
          </View>
          <View
            as="span"
            display="inline-block"
            maxWidth="10rem"
            margin="small"
            padding="medium"
            background="primary-inverse"
            borderRadius="large large none none"
            textAlign="center"
          >
            large large none none
          </View>
          <View
            as="span"
            display="inline-block"
            maxWidth="10rem"
            margin="small"
            padding="medium"
            background="primary-inverse"
            borderRadius="none none large large"
            textAlign="center"
          >
            none none large large
          </View>
          <View
            display="inline-block"
            width="6rem"
            height="6rem"
            margin="small"
            padding="medium"
            background="primary-inverse"
            borderRadius="circle"
            textAlign="center"
          >
            circle
          </View>
          <View
            display="inline-block"
            width="10rem"
            margin="small"
            padding="medium"
            background="primary-inverse"
            borderRadius="pill"
            textAlign="center"
          >
            pill
          </View>
        </div>
      </section>

      <section>
        <View
          as="div"
          height="7rem"
          width="20rem"
          margin="medium none x-large"
          overflowY="auto"
          overflowX="auto"
          withVisualDebug
          tabIndex="0"
        >
          <div style={{ width: '30rem', height: '10rem', background: '#ccc' }}>
            Scrollable content
          </div>
        </View>
        <View as="div" textAlign="center" padding="x-small" withVisualDebug>
          <View
            as="div"
            display="inline-block"
            withVisualDebug
            textAlign="end"
            margin="large auto"
            padding="0 small 0 0"
          >
            Inline block A
          </View>
          <View
            as="div"
            display="inline-block"
            withVisualDebug
            margin="large auto"
            padding="0 0 0 small"
          >
            Inline block B
          </View>
        </View>
        <section style={{ margin: '15px' }}>
          <View as="header" margin="0 0 medium" withVisualDebug>
            Some header content
          </View>
          <div>Paragraph-like content</div>
        </section>
      </section>
    </main>
  )
}
