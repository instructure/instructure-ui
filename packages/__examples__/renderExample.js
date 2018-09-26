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

import ApplyLocale from '@instructure/ui-i18n/lib/components/ApplyLocale'
import View from '@instructure/ui-layout/lib/components/View'

export default function renderExample (Component, componentProps, exampleProps, key) {
  return (
    <View
      key={key}
      display={exampleProps.display || 'auto'}
      as={exampleProps.as || 'span'}
      margin={exampleProps.margin || 'none'}
      padding={exampleProps.padding || 'none'}
      textAlign={exampleProps.textAlign || 'start'}
      debug={exampleProps.debug || false}
      borderWidth={exampleProps.borderWidth || 'none'}
      background={exampleProps.background || 'default'}
      width={exampleProps.width || '100%'}
      maxWidth={exampleProps.maxWidth || 'none'}
      height={exampleProps.height || 'auto'}
      maxHeight={exampleProps.maxHeight || 'none'}
    >
      <ApplyLocale locale="en-US">
        <Component {...componentProps} />
      </ApplyLocale>
    </View>
  )
}
