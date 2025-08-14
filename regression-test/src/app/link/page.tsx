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
import { Link as lk } from 'instructure-ui/ui-link/es/index'
import { Text as tx } from 'instructure-ui/ui-text/es/index'
import { View as vw } from 'instructure-ui/ui-view/es/index'
import { IconUserLine as iul } from 'instructure-ui/ui-icons/es/index'
import { ScreenReaderContent as src } from 'instructure-ui/ui-a11y-content/es/index'
import { TruncateText as tt } from 'instructure-ui/ui-truncate-text/es/index'

const Link = lk as any
const Text = tx as any
const View = vw as any
const IconUserLine = iul as any
const ScreenReaderContent = src as any
const TruncateText = tt as any

export default function LinkPage() {
  return (
    <main className="flex gap-12 p-8 flex-col items-start axe-test">
      {/* Inline usage */}
      <section>
        <Text>
          The quick brown fox{' '}
          <Link href="https://instructure.github.io/instructure-ui/">
            jumps
          </Link>{' '}
          over the lazy dog.
        </Text>
      </section>

      {/* Inverse on dark background */}
      <section>
        <View background="primary-inverse" as="div" padding="small medium">
          <Text color="primary-inverse">
            The quick brown fox{' '}
            <Link
              color="link-inverse"
              href="https://instructure.github.io/instructure-ui/"
            >
              jumps
            </Link>{' '}
            over the lazy dog.
          </Text>
        </View>
      </section>

      {/* Controlled navigation */}
      <section>
        <Link
          variant="standalone"
          onClick={(e: any) => {
            e.preventDefault()
          }}
          forceButtonRole={false}
          href="#"
        >
          Go to places
        </Link>
      </section>

      {/* Variants */}
      <section>
        <div>
          In a line of text you should use the{' '}
          <Link
            variant="inline"
            renderIcon={<IconUserLine />}
            href="https://instructure.github.io/instructure-ui/"
          >
            inline
          </Link>{' '}
          link variant.
        </div>
        <br />
        <div>
          <Text variant="contentSmall">
            In a line of text, where the text is smaller, use the{' '}
            <Link
              variant="inline-small"
              renderIcon={<IconUserLine />}
              href="https://instructure.github.io/instructure-ui/"
            >
              inline-small
            </Link>{' '}
            link variant
          </Text>
        </div>
        <br />
        <div>
          If the link is standalone (not in a text), use the{' '}
          <code>standalone</code>{' '}
          <Link
            display="block"
            variant="standalone"
            href="https://instructure.github.io/instructure-ui/"
          >
            standalone
          </Link>
        </div>
        <br />
        <div>
          If the link is standalone (not in a text), but smaller, use the{' '}
          <code>standalone-small</code>{' '}
          <Link
            display="block"
            variant="standalone-small"
            href="https://instructure.github.io/instructure-ui/"
          >
            standalone-small
          </Link>
        </div>
      </section>

      {/* Margin */}
      <section>
        <Text>
          The quick brown fox{' '}
          <Link
            href="https://instructure.github.io/instructure-ui/"
            margin="0 small"
          >
            jumps
          </Link>{' '}
          over the lazy dog.
        </Text>
      </section>

      {/* Underlines (outside text) */}
      <section>
        <Link href="http://instructure.design" isWithinText={false}>
          I have no default underline
        </Link>
      </section>

      {/* Truncate text with icon */}
      <section style={{ maxWidth: '24rem' }}>
        <Link
          onClick={() => {}}
          isWithinText={false}
          renderIcon={<IconUserLine size="small" />}
        >
          <TruncateText>
            This is a very long piece of link text intended to demonstrate
            truncation inside a Link component with an icon before the text.
          </TruncateText>
        </Link>
      </section>
    </main>
  )
}
