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

import React, { useContext } from 'react'
import { getElementType } from '@instructure/ui-react-utils'

import { DIRECTION, TextDirectionContext } from '../TextDirectionContext'

type ApplyTextDirectionProps = {
  dir?: 'ltr' | 'rtl'
  children?: React.ReactNode | ((...args: any[]) => any)
  as?: React.ReactElement
}

/**
---
category: components/utilities
---
**/
const ApplyTextDirection = (props: ApplyTextDirectionProps) => {
  const context = useTextDirectionContext()
  const dir = props.dir || context
  const ElementType = getElementType(ApplyTextDirection, props)

  return (
    <TextDirectionContext.Provider value={dir}>
      {
        <ElementType dir={dir}>
          {typeof props.children === 'function'
            ? props.children(dir, dir === DIRECTION.rtl)
            : props.children}
        </ElementType>
      }
    </TextDirectionContext.Provider>
  )
}

ApplyTextDirection.defaultProps = {
  dir: undefined,
  as: 'span',
  children: null
}

ApplyTextDirection.DIRECTION = DIRECTION

const useTextDirectionContext = () => {
  return useContext(TextDirectionContext)
}

export { ApplyTextDirection, useTextDirectionContext }
