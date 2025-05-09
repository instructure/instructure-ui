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

import { Pagination } from '../index'
import type { PaginationProps } from '../props'

const buildPages = (count = 4, current = 0) => {
  return Array.from(Array(count)).map((_v, i) => {
    return (
      <Pagination.Page key={i} current={i === current}>
        {i}
      </Pagination.Page>
    )
  })
}

export default {
  sectionProp: 'variant',
  propValues: {
    variant: ['full', 'compact', 'input'],
    children: [
      buildPages(5),
      buildPages(1),
      buildPages(10, 1),
      buildPages(10, 9)
    ],
    label: [null, 'Example Pagination']
  },
  excludeProps: ['shouldHandleFocus'],
  filter: (props) => {
    return (
      props.label === 'Example Pagination' &&
      (!props.withFirstAndLastButton ||
        !props.showDisabledButtons ||
        props.disabled)
    )
  },
  getComponentProps: () => {
    return {
      labelNext: 'Next',
      labelPrev: 'Previous',
      labelFirst: 'First',
      labelLast: 'Last'
    }
  }
} as StoryConfig<PaginationProps>
