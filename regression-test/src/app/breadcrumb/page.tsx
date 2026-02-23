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
  Breadcrumb as bc,
  View as vw,
  IconBankLine as ibl,
  IconClockLine as icl,
  IconPlusLine as ipl
} from '@instructure/ui/latest'

const Breadcrumb = bc as any
const View = vw as any
const IconBankLine = ibl as any
const IconClockLine = icl as any
const IconPlusLine = ipl as any

export default function BreadcrumbPage() {
  return (
    <main className="flex gap-8 p-8 flex-col items-start axe-test">
      <Breadcrumb label="You are here">
        <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
        <Breadcrumb.Link href="/courses">Courses</Breadcrumb.Link>
        <Breadcrumb.Link>English 204</Breadcrumb.Link>
      </Breadcrumb>
      <div>
        <Breadcrumb size="small" label="breadcrumb" margin="none none medium">
          <Breadcrumb.Link href="https://instructure.github.io/instructure-ui/">
            English 204
          </Breadcrumb.Link>
          <Breadcrumb.Link>Exploring John Updike</Breadcrumb.Link>
          <Breadcrumb.Link href="https://instructure.github.io/instructure-ui/">
            The Rabbit Novels
          </Breadcrumb.Link>
          <Breadcrumb.Link>Rabbit Is Rich</Breadcrumb.Link>
        </Breadcrumb>
        <View as="div" width="40rem">
          <Breadcrumb label="breadcrumb" margin="none none medium">
            <Breadcrumb.Link href="https://instructure.github.io/instructure-ui/">
              English 204
            </Breadcrumb.Link>
            <Breadcrumb.Link>Exploring John Updike</Breadcrumb.Link>
            <Breadcrumb.Link href="https://instructure.github.io/instructure-ui/">
              The Rabbit Novels
            </Breadcrumb.Link>
            <Breadcrumb.Link>Rabbit Is Rich</Breadcrumb.Link>
          </Breadcrumb>
        </View>
        <Breadcrumb size="large" label="breadcrumb">
          <Breadcrumb.Link href="https://instructure.github.io/instructure-ui/">
            English 204
          </Breadcrumb.Link>
          <Breadcrumb.Link>Exploring John Updike</Breadcrumb.Link>
          <Breadcrumb.Link href="https://instructure.github.io/instructure-ui/">
            The Rabbit Novels
          </Breadcrumb.Link>
          <Breadcrumb.Link>Rabbit Is Rich</Breadcrumb.Link>
        </Breadcrumb>
      </div>
      <Breadcrumb label="Breadcrumb with icons">
        <Breadcrumb.Link
          renderIcon={<IconBankLine size="small" />}
          href="#Breadcrumb"
        >
          Item Bank
        </Breadcrumb.Link>
        <Breadcrumb.Link
          renderIcon={<IconClockLine size="small" />}
          onClick={() => {}}
        >
          History
        </Breadcrumb.Link>
        <Breadcrumb.Link renderIcon={IconPlusLine} iconPlacement="end">
          New Question
        </Breadcrumb.Link>
      </Breadcrumb>
    </main>
  )
}
