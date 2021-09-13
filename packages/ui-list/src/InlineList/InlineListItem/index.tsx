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

import { View } from '@instructure/ui-view'
import { testable } from '@instructure/ui-testable'
import { passthroughProps } from '@instructure/ui-react-utils'

import { withStyle, jsx } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'

import { propTypes, allowedProps } from './props'
import type { InlineListItemProps } from './props'

/**
---
parent: InlineList
id: InlineList.Item
---
**/
@withStyle(generateStyle, generateComponentTheme)
@testable()
class InlineListItem extends Component<InlineListItemProps> {
  static readonly componentId = 'InlineList.Item'

  static propTypes = propTypes
  static allowedProps = allowedProps
  static defaultProps = {
    padding: 'none',
    spacing: 'none',
    delimiter: 'none',
    size: 'medium',
    // @ts-expect-error ts-migrate(6133) FIXME: 'el' is declared but its value is never read.
    elementRef: (el) => {}
  }

  componentDidMount() {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles()
  }

  // @ts-expect-error ts-migrate(6133) FIXME: 'prevProps' is declared but its value is never rea... Remove this comment to see the full error message
  componentDidUpdate(prevProps, prevState, snapshot) {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles()
  }

  render() {
    const {
      delimiter,
      size,
      margin,
      padding,
      elementRef,
      children,
      spacing,
      styles,
      ...rest
    } = this.props

    return (
      <View
        {...passthroughProps(rest)}
        css={styles?.inlineListItem}
        as="li"
        margin={margin}
        padding={padding}
        display="inline-block"
        maxWidth="100%"
        elementRef={elementRef}
      >
        {children}
        <span css={styles?.delimiter} aria-hidden="true" />
      </View>
    )
  }
}

export default InlineListItem
export { InlineListItem }
