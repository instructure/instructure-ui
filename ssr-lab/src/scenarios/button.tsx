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
  Button as btn,
  CondensedButton as cbtn,
  IconButton as ibtn,
  ToggleButton as tbtn,
  View as vw,
  IconPlusLine as ipl,
  IconTrashLine as itl,
  IconEyeLine as iel
} from '@instructure/ui/latest'

const Button = btn as any
const CondensedButton = cbtn as any
const IconButton = ibtn as any
const ToggleButton = tbtn as any
const View = vw as any
const IconPlusLine = ipl as any
const IconTrashLine = itl as any
const IconEyeLine = iel as any

const colors = ['primary', 'secondary', 'success', 'danger', 'primary-inverse']

export default function Scenario() {
  return (
    <View as="div" maxWidth="40rem">
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {colors.map((color) => (
          <Button key={color} color={color}>
            {color}
          </Button>
        ))}
      </div>

      <View as="div" margin="medium 0">
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          {['small', 'medium', 'large'].map((size) => (
            <Button key={size} size={size} renderIcon={<IconPlusLine />}>
              {size}
            </Button>
          ))}
        </div>
      </View>

      <View as="div" margin="medium 0">
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <IconButton screenReaderLabel="Törlés">
            <IconTrashLine />
          </IconButton>
          <IconButton screenReaderLabel="Megtekintés" withBackground={false}>
            <IconEyeLine />
          </IconButton>
          <ToggleButton
            screenReaderLabel="Megtekintés"
            renderTooltipContent="Megtekintés"
            renderIcon={IconEyeLine}
            status="pressed"
          />
          <CondensedButton>Condensed</CondensedButton>
        </div>
      </View>

      {/* A grid of buttons makes even a 1px size change visible as a shift,
          because every later button gets pushed along. */}
      <View as="div" margin="medium 0">
        <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }}>
          {Array.from({ length: 24 }).map((_item, index) => (
            <Button key={index} size="small">
              #{index + 1}
            </Button>
          ))}
        </div>
      </View>
    </View>
  )
}
