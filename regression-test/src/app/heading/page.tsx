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
  Heading as hd,
  View as vw,
  IconAdminSolid as ias
} from '@instructure/ui/latest'

const Heading = hd as any
const View = vw as any
const IconAdminSolid = ias as any

export default function HeadingPage() {
  return (
    <main className="flex gap-12 p-8 flex-col items-start axe-test">
      {/* Variant showcase (explicit level as recommended) */}
      <section>
        <Heading variant="titlePageDesktop" level="h1">
          titlePageDesktop
        </Heading>
        <Heading variant="titlePageMobile" level="h1">
          titlePageMobile
        </Heading>
        <Heading variant="titleSection" level="h2">
          titleSection
        </Heading>
        <Heading variant="titleCardSection" level="h2">
          titleCardSection
        </Heading>
        <Heading variant="titleModule" level="h3">
          titleModule
        </Heading>
        <Heading variant="titleCardLarge" level="h3">
          titleCardLarge
        </Heading>
        <Heading variant="titleCardRegular" level="h3">
          titleCardRegular
        </Heading>
        <Heading variant="titleCardMini" level="h4">
          titleCardMini
        </Heading>
        <Heading variant="label" level="h5">
          label
        </Heading>
        <Heading variant="labelInline" level="h6">
          labelInline
        </Heading>
      </section>

      {/* AI Heading variants */}
      <section style={{ display: 'flex', flexDirection: 'row', gap: '14px' }}>
        <Heading aiVariant="stacked" level="h2">
          Nutrition Facts
        </Heading>
        <Heading aiVariant="horizontal" level="h3">
          Nutrition Facts
        </Heading>
        <Heading aiVariant="iconOnly" level="h4">
          Nutrition Facts
        </Heading>
      </section>

      {/* Colors */}
      <section>
        <Heading>I inherit my color via the CSS cascade (default)</Heading>
        <Heading color="primary">I am primary color</Heading>
        <Heading color="secondary">I am secondary color</Heading>
      </section>

      {/* Inverse colors */}
      <section>
        <View background="primary-inverse" as="div" padding="small medium">
          <Heading color="primary-inverse">I am primary-inverse color</Heading>
          <Heading color="secondary-inverse">
            I am secondary-inverse color
          </Heading>
        </View>
      </section>

      {/* With icon */}
      <section>
        <Heading renderIcon={<IconAdminSolid />}>
          I am heading with icon
        </Heading>
      </section>

      {/* Borders */}
      <section>
        <Heading margin="0 0 medium" border="bottom">
          I have a bottom border
        </Heading>
        <Heading border="top">I have a top border</Heading>
      </section>
    </main>
  )
}
