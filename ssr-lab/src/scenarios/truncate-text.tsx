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
  TruncateText as tt,
  View as vw,
  Heading as hd,
  Text as tx
} from '@instructure/ui/latest'

const TruncateText = tt as any
const View = vw as any
const Heading = hd as any
const Text = tx as any

const paragraph =
  'A TruncateText csak akkor tudja eldönteni, hol vágja el a szöveget, ha meg tudja mérni a rendelkezésre álló helyet. A szerveren nincs mit mérni, ezért a teljes szöveg kerül a HTML-be, és a rövidítés csak a hidratálás után történik meg.'

export default function Scenario() {
  return (
    <View as="div" maxWidth="30rem" withVisualDebug>
      <Heading level="h2">
        <TruncateText>{paragraph}</TruncateText>
      </Heading>

      <Text as="p">
        <TruncateText>{paragraph}</TruncateText>
      </Text>

      {/* maxLines caps the height, so the difference between the full server
          text and the truncated client text is a large vertical jump. */}
      <Text as="p">
        <TruncateText maxLines={2}>{paragraph}</TruncateText>
      </Text>

      <Text as="p">
        <TruncateText maxLines={3} truncate="word" ellipsis="…">
          {paragraph}
        </TruncateText>
      </Text>

      {/* Content below the truncated blocks: this is what visibly moves. */}
      <View as="div" background="secondary" padding="small" margin="medium 0 0">
        <Text>Ez a blokk a rövidített szövegek alatt van.</Text>
      </View>
    </View>
  )
}
