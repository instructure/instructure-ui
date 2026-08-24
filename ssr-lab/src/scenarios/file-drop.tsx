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
  FileDrop as fd,
  View as vw,
  Heading as hd,
  Text as tx,
  Billboard as bb,
  IconImageLine as iil
} from '@instructure/ui/latest'

const FileDrop = fd as any
const View = vw as any
const Heading = hd as any
const Text = tx as any
const Billboard = bb as any
const IconImageLine = iil as any

const error = [{ type: 'newError', text: 'Nem támogatott fájltípus' }]

export default function Scenario() {
  return (
    <View as="div" maxWidth="40rem">
      <FileDrop
        accept="image/*"
        renderLabel={
          <View as="div" padding="large" background="primary">
            <Heading>Húzd ide a fájlokat</Heading>
            <Text color="brand">Vagy kattints a böngészéshez</Text>
          </View>
        }
      />

      <View as="div" margin="medium 0">
        <FileDrop
          messages={error}
          renderLabel={
            <Billboard
              heading="Kép feltöltése"
              message="Húzd ide, vagy kattints"
              hero={<IconImageLine />}
            />
          }
        />
      </View>

      <View as="div" margin="medium 0">
        <FileDrop
          interaction="disabled"
          renderLabel={
            <View as="div" padding="medium" background="secondary">
              <Text>Letiltott állapot</Text>
            </View>
          }
        />
      </View>
    </View>
  )
}
