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

import { Tabs as tbs, Text as tx, View as vw } from '@instructure/ui/latest'

const Tabs = tbs as any
const Text = tx as any
const View = vw as any

const filler =
  'Ez a panel tartalma. Azért van benne több sor szöveg, hogy a panel magassága érzékelhető legyen, ha a Tabs a mount után átméretezi magát.'

export default function Scenario() {
  return (
    <View as="div" maxWidth="44rem">
      <Tabs>
        <Tabs.Panel id="p1" renderTitle="Áttekintés">
          <Text as="p">{filler}</Text>
        </Tabs.Panel>
        <Tabs.Panel id="p2" renderTitle="Részletek">
          <Text as="p">{filler}</Text>
        </Tabs.Panel>
        <Tabs.Panel id="p3" renderTitle="Aktivitás">
          <Text as="p">{filler}</Text>
        </Tabs.Panel>
      </Tabs>

      <View as="div" margin="large 0 0">
        <Tabs variant="secondary">
          <Tabs.Panel id="s1" renderTitle="Secondary 1">
            <Text as="p">{filler}</Text>
          </Tabs.Panel>
          <Tabs.Panel id="s2" renderTitle="Secondary 2">
            <Text as="p">{filler}</Text>
          </Tabs.Panel>
        </Tabs>
      </View>

      {/* Many tabs in a narrow container: Tabs measures the header and hides
          what does not fit, which it can only do after mount. */}
      <View as="div" margin="large 0 0" maxWidth="22rem">
        <Tabs>
          {Array.from({ length: 8 }).map((_item, index) => (
            <Tabs.Panel
              key={index}
              id={`overflow-${index}`}
              renderTitle={`Hosszabb fül ${index + 1}`}
            >
              <Text as="p">{index + 1}. panel</Text>
            </Tabs.Panel>
          ))}
        </Tabs>
      </View>
    </View>
  )
}
