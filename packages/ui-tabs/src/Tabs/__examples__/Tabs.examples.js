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
import { Tabs } from '../index'

const contentShort =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tellus mauris, aliquet a massa posuere, lobortis laoreet eros. Ut at lacus aliquet arcu volutpat porttitor ut vel nibh. Aenean iaculis elit eu nulla ultricies blandit vitae quis ex.'
const contentLong =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tellus mauris, aliquet a massa posuere, lobortis laoreet eros. Ut at lacus aliquet arcu volutpat porttitor ut vel nibh. Aenean iaculis elit eu nulla ultricies blandit vitae quis ex. Maecenas quis justo ex. Donec in ante et justo iaculis dapibus in non leo. Curabitur suscipit ligula neque, ut suscipit nisl auctor ut. Proin lectus justo, vulputate quis sagittis nec, venenatis maximus nisl. Fusce id pretium justo.'

export default {
  propValues: {
    dir: ['ltr']
  },
  sectionProp: 'variant',
  excludeProps: ['focus'],
  filter: (props) => {
    if (props.tabOverflow === 'scroll' && props.variant === 'secondary')
      return true
    return false
  },
  getComponentProps: (props) => {
    return {
      margin: 'large',
      padding: 'small',
      children: [
        <Tabs.Panel key="1" renderTitle="Tab A">
          {contentLong}
        </Tabs.Panel>,
        <Tabs.Panel key="2" renderTitle="Tab B" isDisabled>
          {contentShort}
        </Tabs.Panel>,
        <Tabs.Panel key="3" renderTitle="Tab C" isSelected>
          {contentShort}
        </Tabs.Panel>,
        <Tabs.Panel key="4" renderTitle="Tab D">
          {contentLong}
        </Tabs.Panel>
      ]
    }
  }
}
