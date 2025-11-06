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
  Billboard as bb,
  View as vw,
  IconUserLine as iul,
  IconGradebookLine as igl,
  IconPlusLine as ipl
} from '@instructure/ui'

const Billboard = bb as any
const View = vw as any
const IconUserLine = iul as any
const IconGradebookLine = igl as any
const IconPlusLine = ipl as any

export default function BillboardPage() {
  return (
    <main className="flex gap-8 p-8 flex-col items-start axe-test">
      {/* Static Billboard */}
      <Billboard
        size="medium"
        heading="Well, this is awkward."
        message="Think there should be something here?"
        hero={(size: string) => <IconGradebookLine size={size} />}
      />

      {/* Structure examples */}
      <View display="block" width="400px">
        <Billboard
          margin="large"
          heading="404"
          message="Billboard is now a button"
          size="small"
          onClick={() => {}}
          hero={(size: string) => <IconUserLine size={size} />}
        />
      </View>

      <View display="block" width="600px">
        <Billboard
          margin="large"
          message="Click this link"
          href="https://instructure.com"
          hero={(size: string) => <IconGradebookLine size={size} />}
        />
      </View>

      <Billboard
        readOnly
        message="Create a new Module"
        size="large"
        onClick={() => {}}
        hero={(size: string) => <IconPlusLine size={size} />}
      />

      {/* Disabled */}
      <Billboard
        size="small"
        heading="This is disabled"
        onClick={() => {}}
        hero={(size: string) => <IconUserLine size={size} />}
        disabled
      />
    </main>
  )
}
