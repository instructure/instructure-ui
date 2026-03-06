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

import { useState, lazy, Suspense } from 'react'

import { Tabs } from '@instructure/ui-tabs'
import { Spinner } from '@instructure/ui-spinner'
import { Glyph } from '../../buildScripts/DataTypes.mjs'

// Lazy load gallery components for better initial load performance
const LucideIconsGallery = lazy(() => import('./LucideIconsGallery'))
const LegacyIconsGallery = lazy(() => import('./LegacyIconsGallery'))

type IconsPageProps = {
  glyphs: Glyph[]
}

const IconsPage = ({ glyphs }: IconsPageProps) => {
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0)

  const handleTabChange = (_event: any, { index }: { index: number }) => {
    setSelectedTabIndex(index)
  }

  return (
    <div>
      <Tabs onRequestTabChange={handleTabChange}>
        <Tabs.Panel
          renderTitle="Lucide Icons (New)"
          isSelected={selectedTabIndex === 0}
          padding="medium 0"
        >
          {/* Keep both galleries mounted but hide inactive one with CSS for instant switching */}
          <div style={{ display: selectedTabIndex === 0 ? 'block' : 'none' }}>
            <Suspense
              fallback={
                <Spinner renderTitle="Loading Lucide icons..." size="large" />
              }
            >
              <LucideIconsGallery />
            </Suspense>
          </div>
        </Tabs.Panel>

        <Tabs.Panel
          renderTitle="Legacy Icons (Deprecated)"
          isSelected={selectedTabIndex === 1}
          padding="medium 0"
        >
          <div style={{ display: selectedTabIndex === 1 ? 'block' : 'none' }}>
            <Suspense
              fallback={
                <Spinner renderTitle="Loading legacy icons..." size="large" />
              }
            >
              <LegacyIconsGallery glyphs={glyphs} />
            </Suspense>
          </div>
        </Tabs.Panel>
      </Tabs>
    </div>
  )
}

export default IconsPage
