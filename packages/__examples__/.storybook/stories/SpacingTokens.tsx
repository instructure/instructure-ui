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

import React from 'react'
import { Button } from '@instructure/ui'

function SpacingTokens() {
  const spaceTokens = [
    'space0',
    'space2',
    'space4',
    'space8',
    'space12',
    'space16',
    'space24',
    'space36',
    'space48',
    'space60',
    'sections',
    'sectionElrements',
    'trayElrements',
    'modalElrements',
    'moduleElrements',
    'paddingCardLarge',
    'paddingCardMedium',
    'paddingCardSmall',
    'selects',
    'textareas',
    'inputFields',
    'checkboxes',
    'radios',
    'toggles',
    'buttons',
    'tags',
    'statusIndicators',
    'dataPoints'
  ]

  return (
    <div>
      {spaceTokens.map((token) => (
        <Button margin={token} key={token}>
          {token}
        </Button>
      ))}
    </div>
  )
}

export default SpacingTokens
