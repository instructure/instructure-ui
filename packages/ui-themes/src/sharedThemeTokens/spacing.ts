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

import { Spacing } from '@instructure/shared-types'

const spacing: Spacing = Object.freeze({
  // legacy spacing tokens:
  xxxSmall: '0.125rem', // 2px
  xxSmall: '0.375rem', // 6px
  xSmall: '0.5rem', // 8px
  small: '0.75rem', // 12px
  mediumSmall: '1rem', // 16px
  medium: '1.5rem', // 24px
  large: '2.25rem', // 36px
  xLarge: '3rem', // 48px
  xxLarge: '3.75rem', // 60px

  // new spacing tokens:
  space0: '0rem', // 0px
  space2: '0.125rem', // 2px
  space4: '0.25rem', // 4px
  space8: '0.5rem', // 8px
  space12: '0.75rem', // 12px
  space16: '1rem', // 16px
  space24: '1.5rem', // 24px
  space36: '2.25rem', // 36px
  space48: '3rem', // 48px
  space60: '3.75rem', // 60px
  sections: '2.25rem', // 36px
  sectionElrements: '1.5em', // 24px
  trayElrements: '1.5em', // 24px
  modalElrements: '1.5em', // 24px
  moduleElrements: '1em', // 16px
  paddingCardLarge: '1.5rem', // 24px
  paddingCardMedium: '1rem', // 16px
  paddingCardSmall: '0.75rem', // 12px
  selects: '1rem', // 16px
  textareas: '1rem', // 16px
  inputFields: '1rem', // 16px
  checkboxes: '1rem', // 16px
  radios: '1rem', // 16px
  toggles: '1rem', // 16px
  buttons: '0.75rem', // 12px
  tags: '0.75rem', // 12px
  statusIndicators: '0.75rem', // 12px
  dataPoints: '0.75rem' // 12px
} as const)

export default spacing
export { spacing }
