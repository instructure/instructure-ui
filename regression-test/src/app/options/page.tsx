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
  Options as op,
  View as vw,
  IconArrowOpenEndSolid as iaoes,
  IconCheckSolid as ics,
  IconCheckLine as icl
} from '@instructure/ui/latest'

const Options = op as any
const View = vw as any
const IconArrowOpenEndSolid = iaoes as any
const IconCheckSolid = ics as any
const IconCheckLine = icl as any

export default function OptionsPage() {
  return (
    <main className="flex gap-12 p-8 flex-col items-start axe-test">
      {/* Basic variants */}
      <View display="block" width="300px">
        <Options>
          <Options.Item>Default option</Options.Item>
          <Options.Item variant="highlighted">Highlighted option</Options.Item>
          <Options.Item variant="selected">Selected option</Options.Item>
          <Options.Item variant="disabled">Disabled option</Options.Item>
          <Options.Item variant="highlighted-disabled">
            Highlighted disabled option
          </Options.Item>
        </Options>
      </View>

      {/* Nested menus with roles, separators and radio group */}
      <View display="block" width="400px">
        <Options role="menu" as="ul">
          <Options.Item role="menuitem">Option one</Options.Item>
          <Options.Item role="menuitem" variant="highlighted">
            Option two
          </Options.Item>
          <Options.Item
            role="menuitem"
            renderAfterLabel={IconArrowOpenEndSolid}
          >
            Flyout menu option
          </Options.Item>
          <Options.Separator as="li" />
          <Options role="menu" as="ul" renderLabel={'Sub menu'}>
            <Options.Item role="menuitem">Sub option one</Options.Item>
            <Options.Item role="menuitem">Sub option two</Options.Item>
          </Options>
          <Options.Separator />
          <Options role="menu" as="ul" renderLabel={'Radio group'}>
            <Options.Item
              role="menuitemradio"
              aria-checked="true"
              renderBeforeLabel={IconCheckSolid}
            >
              Radio option one
            </Options.Item>
            <Options.Item
              role="menuitemradio"
              aria-checked="false"
              renderBeforeLabel={<IconCheckLine style={{ opacity: 0 }} />}
            >
              Radio option two
            </Options.Item>
          </Options>
          <Options.Separator />
          <Options.Item role="menuitem">Option three</Options.Item>
        </Options>
      </View>

      {/* Description + icon alignment */}
      <View display="block" width="300px">
        <Options>
          <Options.Item
            description="Curabitur fringilla, urna ut efficitur molestie, nibh lacus tincidunt elit, ut tempor ipsum nunc sit amet massa."
            renderBeforeLabel={IconCheckSolid}
            renderAfterLabel={IconArrowOpenEndSolid}
            beforeLabelContentVAlign="start"
            afterLabelContentVAlign="start"
          >
            Option one
          </Options.Item>
          <Options.Item
            variant="highlighted"
            description="Curabitur fringilla, urna ut efficitur molestie, nibh lacus tincidunt elit, ut tempor ipsum nunc sit amet massa."
            renderBeforeLabel={IconCheckSolid}
            renderAfterLabel={IconArrowOpenEndSolid}
            beforeLabelContentVAlign="center"
            afterLabelContentVAlign="center"
          >
            Option two
          </Options.Item>
          <Options.Item
            description="Curabitur fringilla, urna ut efficitur molestie, nibh lacus tincidunt elit, ut tempor ipsum nunc sit amet massa."
            renderBeforeLabel={IconCheckSolid}
            renderAfterLabel={IconArrowOpenEndSolid}
            beforeLabelContentVAlign="end"
            afterLabelContentVAlign="end"
          >
            Option three
          </Options.Item>
        </Options>
      </View>
    </main>
  )
}
