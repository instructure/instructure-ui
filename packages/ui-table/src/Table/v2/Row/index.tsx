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
  forwardRef,
  useContext,
  Children,
  isValidElement,
  type ReactElement
} from 'react'

import { omitProps, safeCloneElement } from '@instructure/ui-react-utils'
import { View } from '@instructure/ui-view/latest'

import { useStyleNew } from '@instructure/emotion'

import generateStyle from './styles.js'

import type { TableRowProps } from './props'
import { allowedProps } from './props.js'
import TableContext from '../TableContext.js'

/**
---
parent: Table
id: Table.Row
---
**/
const Row = forwardRef<HTMLElement, TableRowProps>((props, ref) => {
  const { children, setHoverStateTo, themeOverride } = props
  const { isStacked, hover, headers } = useContext(TableContext)

  const styles = useStyleNew({
    generateStyle,
    themeOverride,
    params: { isStacked, hover, setHoverStateTo },
    componentId: 'TableRow',
    displayName: 'Row'
  })

  const handleElementRef = (el: HTMLElement | null) => {
    if (typeof ref === 'function') {
      ref(el)
    } else if (ref) {
      const refObject = ref as React.MutableRefObject<HTMLElement | null>
      refObject.current = el
    }
  }

  return (
    <View
      {...View.omitViewProps(omitProps(props, allowedProps), Row)}
      as={isStacked ? 'div' : 'tr'}
      css={styles?.row}
      role={isStacked ? 'row' : undefined}
      elementRef={handleElementRef}
    >
      {Children.toArray(children)
        .filter(Boolean)
        .map((child, index) => {
          if (isValidElement(child)) {
            return safeCloneElement(child, {
              key: (child as ReactElement<any>).props.name,
              // used by `Cell` to render its column title in `stacked` layout
              header: headers && headers[index]
            })
          }
          return child
        })}
    </View>
  )
})

Row.displayName = 'Row'

export default Row
export { Row }
