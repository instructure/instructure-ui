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
import React, { useRef } from 'react'
import { Alert } from '@instructure/ui/latest'

export default function AlertPage() {
  const variants = ['info', 'success', 'warning', 'error'] as const
  const myElementRef = useRef(null)
  return (
    <main className="flex gap-8 p-8 flex-row items-start axe-test">
      <div id="flash-messages" role="alert" ref={myElementRef}></div>
      <div>
        {variants.map((variant) => (
          <Alert variant={variant} key={variant} transition="none">
            I&apos;m {variant} Alert
          </Alert>
        ))}
      </div>
      <div>
        <Alert transition="none" renderCloseButtonLabel="Close">
          Close button Alert
        </Alert>
        <Alert transition="none" margin="xx-large" hasShadow={false}>
          no shadow Alert
        </Alert>
      </div>
      <div>
        {myElementRef.current ? (
          <Alert
            liveRegion={() => myElementRef.current}
            isLiveRegionAtomic
            screenReaderOnly
          >
            some message
          </Alert>
        ) : null}
      </div>
    </main>
  )
}
