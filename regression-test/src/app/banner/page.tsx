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
import { Banner as bn, View as vw } from '@instructure/ui/latest'

// alias to avoid TS/SSR friction like other pages
const Banner = bn as any
const View = vw as any

export default function BannerPage() {
  return (
    <main className="flex gap-8 p-8 flex-col items-start axe-test">
      {/* Default usage */}
      <View as="div" width="32rem">
        <Banner header="Course published">
          Your course has been published and is now visible to students.
        </Banner>
      </View>

      {/* Colors */}
      <View as="div" width="32rem">
        <Banner color="sea" header="Sea color">
          This banner uses the sea color treatment.
        </Banner>
      </View>

      {/* Compact density */}
      <View as="div" width="32rem">
        <Banner density="compact" header="Compact density">
          This banner uses the compact density.
        </Banner>
      </View>

      {/* Dismissible with CTA */}
      <View as="div" width="32rem">
        <Banner
          header="New feature available"
          isDismissible
          closeButtonLabel="Close this banner"
          onDismiss={() => {}}
          ctaText="Learn more"
          onCtaClick={() => {}}
        >
          Try out the new grading workflow before it becomes the default.
        </Banner>
      </View>
    </main>
  )
}
