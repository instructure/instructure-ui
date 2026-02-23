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
import { Tabs as tbs, View as vw, Text as tx } from '@instructure/ui/latest'

const Tabs = tbs as any
const View = vw as any
const Text = tx as any

export default function TabsPage() {
  return (
    <main className="flex gap-12 p-8 flex-col items-start axe-test">
      {/* Basic tabs with 3 panels */}
      <section>
        <Tabs margin="small 0">
          <Tabs.Panel id="tab-1" renderTitle="First tab">
            <Text>First panel content</Text>
          </Tabs.Panel>
          <Tabs.Panel id="tab-2" renderTitle="Second tab" isDisabled>
            <Text>Second panel (disabled)</Text>
          </Tabs.Panel>
          <Tabs.Panel id="tab-3" renderTitle="Third tab">
            <Text>Third panel content</Text>
          </Tabs.Panel>
        </Tabs>
      </section>

      {/* Secondary variant */}
      <section>
        <Tabs margin="small 0" variant="secondary">
          <Tabs.Panel id="sec-1" renderTitle="Overview">
            <View as="div" padding="small 0">
              <Text>Overview content</Text>
            </View>
          </Tabs.Panel>
          <Tabs.Panel id="sec-2" renderTitle="Details">
            <View as="div" padding="small 0">
              <Text>Details content</Text>
            </View>
          </Tabs.Panel>
          <Tabs.Panel id="sec-3" renderTitle="Activity">
            <View as="div" padding="small 0">
              <Text>Activity content</Text>
            </View>
          </Tabs.Panel>
        </Tabs>
      </section>
    </main>
  )
}
