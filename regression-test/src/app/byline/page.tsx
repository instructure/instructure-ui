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
import { Byline as bl } from 'instructure-ui/ui-byline/es/index'
import { Avatar as av } from 'instructure-ui/ui-avatar/es/index'
import { View as vw } from 'instructure-ui/ui-view/es/index'
import { Heading as hd } from 'instructure-ui/ui-heading/es/index'
import { Link as lk } from 'instructure-ui/ui-link/es/index'
import { Text as tx } from 'instructure-ui/ui-text/es/index'

const Byline = bl as any
const Avatar = av as any
const View = vw as any
const Heading = hd as any
const Link = lk as any
const Text = tx as any

export default function BylinePage() {
  return (
    <main className="flex gap-8 p-8 flex-col items-start axe-test">
      {/* Basic Byline */}
      <Byline description="A short description here.">
        <Avatar name="Julia Childer" />
      </Byline>

      {/* With title, size and alignment */}
      <Byline
        margin="x-large auto"
        size="small"
        alignContent="top"
        title="Graham Taylor"
        description="This is a longer paragraph describing the person, their role and other details."
      >
        <Avatar name="Graham Taylor" />
      </Byline>

      {/* Rich description with nested components */}
      <Byline
        description={
          <View display="block" margin="0 0 0 x-small">
            <Heading level="h2">
              <Link href="#">Clickable Heading</Link>
            </Heading>
            <Text size="x-small" transform="uppercase" letterSpacing="expanded">
              Something here
            </Text>
          </View>
        }
      >
        <Avatar name="Alex Johnson" />
      </Byline>
    </main>
  )
}
