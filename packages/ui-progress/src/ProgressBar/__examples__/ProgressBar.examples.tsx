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

import type { StoryConfig } from '@instructure/ui-test-utils'
import type { ProgressBarProps, Values } from '../props'

const valueMax = 100

export default {
  sectionProp: 'color',
  excludeProps: ['shouldAnimate'],
  propValues: {
    valueNow: [0, 40, 80, 100],
    renderValue: [
      null,
      ({ valueNow, valueMax }: Values) => (
        <span>{Math.round((valueNow / valueMax) * 100)}</span>
      )
    ]
  },
  getComponentProps: () => {
    return {
      screenReaderLabel: 'Passing students',
      valueMax
    }
  },
  getExampleProps: (props) => {
    return {
      background: props.color!.includes('inverse')
        ? 'primary-inverse'
        : 'primary'
    }
  }
} as StoryConfig<ProgressBarProps>
