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
import { Img as ig, View as vw } from '@instructure/ui/latest'

const Img = ig as any
const View = vw as any

export default function ImgPage() {
  return (
    <main className="flex gap-12 p-8 flex-col items-start axe-test">
      <section>
        <Img src="/assets/avatarSquare.jpg" alt="Sample image" />
      </section>

      <section>
        <Img
          src="/assets/avatarSquare.jpg"
          overlay={{ color: '#0374B5', opacity: 9, blend: 'overlay' }}
          alt="Overlay example"
          margin="x-small"
        />
      </section>

      <section>
        <div style={{ width: '5rem', height: '7rem' }}>
          <Img src="/assets/avatarSquare.jpg" constrain="cover" alt="test" />
        </div>
      </section>

      <section>
        <View
          as="div"
          withGrayscale
          background="primary-inverse"
          width="500px"
          height="200px"
          textAlign="center"
        >
          <Img
            withBlur
            src="/assets/avatarSquare.jpg"
            constrain="contain"
            alt=""
          />
        </View>
      </section>
    </main>
  )
}
