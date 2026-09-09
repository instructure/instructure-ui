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
  Banner as bn,
  Button as btn,
  SearchInstUIIcon as sii
} from '@instructure/ui/latest'

// alias to avoid TS/SSR friction like other pages
const Banner = bn as any
const Button = btn as any
const SearchInstUIIcon = sii as any

export default function BannerPage() {
  return (
    <main className="flex gap-8 p-8 flex-col items-start axe-test">
      <div style={{ width: '100%' }}>
        <Banner header="Banner header" onDismiss={() => {}}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Banner>
      </div>

      <div style={{ width: '100%' }}>
        <Banner color="sea" density="compact" onDismiss={() => {}}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Banner>
      </div>

      <div style={{ width: '100%' }}>
        <Banner dismissible={false} header="Banner header">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Banner>
      </div>

      <div style={{ width: '100%' }}>
        <Banner
          header="Banner header"
          onDismiss={() => {}}
          renderIcon={() => <SearchInstUIIcon />}
          renderPrimaryAction={() => (
            <Button color="primary">Learn more</Button>
          )}
          renderSecondaryAction={() => (
            <Button color="primary" withBackground={false}>
              Dismiss for now
            </Button>
          )}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Banner>
      </div>
    </main>
  )
}
