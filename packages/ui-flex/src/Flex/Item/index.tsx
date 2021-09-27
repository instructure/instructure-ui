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

/** @jsx jsx */
import { Component } from 'react'

import { omitProps } from '@instructure/ui-react-utils'
import { View } from '@instructure/ui-view'
import { withStyle, jsx } from '@instructure/emotion'

import generateStyle from './styles'

import { propTypes, allowedProps } from './props'
import type { FlexItemProps } from './props'

/**
---
parent: Flex
id: Flex.Item
---
**/
@withStyle(generateStyle)
class Item extends Component<FlexItemProps> {
  static readonly componentId = 'Flex.Item'

  componentDidMount() {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles()
  }

  componentDidUpdate() {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles()
  }

  static propTypes = propTypes
  static allowedProps = allowedProps
  static defaultProps = {
    as: 'span',
    // @ts-expect-error ts-migrate(6133) FIXME: 'el' is declared but its value is never read.
    elementRef: (el: any) => {},
    shouldGrow: false,
    shouldShrink: false
  }

  render() {
    const props = omitProps(this.props, Item.allowedProps)

    const {
      as,
      elementRef,
      children,
      withVisualDebug,
      textAlign,
      size,
      direction,
      margin,
      padding,
      overflowX,
      overflowY,
      styles
    } = this.props

    const dirColumn = direction === 'column'
    const dirRow = direction === 'row'

    return (
      <View
        {...props}
        css={styles?.flexItem}
        elementRef={elementRef}
        as={as}
        minHeight={dirColumn ? size : undefined}
        minWidth={dirRow ? size : undefined}
        textAlign={textAlign}
        margin={margin}
        padding={padding}
        overflowX={overflowX}
        overflowY={overflowY || (dirColumn ? 'auto' : 'visible')}
        withVisualDebug={withVisualDebug}
      >
        {children}
      </View>
    )
  }
}

export default Item
export { Item }
