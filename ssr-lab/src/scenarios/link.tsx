'use client'

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

import {
  Link as lk,
  Text as tx,
  View as vw,
  IconUserLine as iul
} from '@instructure/ui/latest'

const Link = lk as any
const Text = tx as any
const View = vw as any
const IconUserLine = iul as any

export default function Scenario() {
  return (
    <View as="div" maxWidth="34rem">
      <Text as="p">
        A paragraph with{' '}
        <Link href="https://instructure.design/">a link in it</Link>, so it is
        visible whether the surrounding text moves.
      </Text>

      <Text as="p">
        Link with an icon:{' '}
        <Link href="https://instructure.design/" renderIcon={<IconUserLine />}>
          profile
        </Link>{' '}
        — the icon width affects where the line breaks.
      </Text>

      <View as="div" margin="medium 0">
        <Link variant="standalone" href="https://instructure.design/">
          Standalone link
        </Link>
      </View>

      <View as="div" margin="medium 0">
        <Link variant="inline-small" href="https://instructure.design/">
          Small inline link
        </Link>
      </View>

      {/* Many links in a paragraph: each one that changes size after hydration
          can re-wrap the whole block. */}
      <Text as="p">
        {Array.from({ length: 12 }).map((_item, index) => (
          <span key={index}>
            <Link href="https://instructure.design/">link {index + 1}</Link>
            {index < 11 ? ', ' : '.'}
          </span>
        ))}
      </Text>
    </View>
  )
}
