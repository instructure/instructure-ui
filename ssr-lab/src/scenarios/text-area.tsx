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

import { TextArea as ta, View as vw, Text as tx } from '@instructure/ui/latest'

const TextArea = ta as any
const View = vw as any
const Text = tx as any

const longValue = Array.from({ length: 8 })
  .map(
    (_item, index) =>
      `${
        index + 1
      }. sor: a TextArea autogrow magassága a tartalom megméréséből jön.`
  )
  .join('\n')

export default function Scenario() {
  return (
    <View as="div" maxWidth="32rem">
      <TextArea label="Alap" placeholder="Írj valamit" />

      <View as="div" margin="medium 0">
        {/* autoGrow sizes the field from the measured content height, which only
            exists after mount. The server renders the default height. */}
        <TextArea
          label="Autogrow, hosszú kezdőértékkel"
          defaultValue={longValue}
        />
      </View>

      <View as="div" margin="medium 0">
        <TextArea
          label="Autogrow kikapcsolva"
          autoGrow={false}
          defaultValue={longValue}
        />
      </View>

      <View as="div" margin="medium 0">
        <TextArea
          label="Hibaüzenettel"
          messages={[{ type: 'newError', text: 'Túl hosszú' }]}
          defaultValue={longValue}
        />
      </View>

      <Text as="p">Ez a bekezdés a mezők alatt van.</Text>
    </View>
  )
}
