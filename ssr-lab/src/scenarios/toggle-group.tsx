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
  ToggleGroup as tg,
  View as vw,
  Text as tx
} from '@instructure/ui/latest'

const ToggleGroup = tg as any
const View = vw as any
const Text = tx as any

export default function Scenario() {
  return (
    <View as="div" maxWidth="36rem">
      {[
        { background: 'default', expanded: false },
        { background: 'default', expanded: true },
        { background: 'inverse', expanded: true }
      ].map((config, index) => (
        <View as="div" key={index} margin="0 0 medium">
          <ToggleGroup
            toggleLabel="Tartalom nyitása és zárása"
            summary={`Összefoglaló ${index + 1}`}
            background={config.background}
            defaultExpanded={config.expanded}
            transition={false}
          >
            <View display="block" padding="medium">
              <Text>
                A kinyitott tartalom. Ha a ToggleGroup a mount után változtat
                paddinget vagy bordert, az itt lentebb tolja mindent.
              </Text>
            </View>
          </ToggleGroup>
        </View>
      ))}
    </View>
  )
}
