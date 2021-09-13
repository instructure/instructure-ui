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
import { Children, Component } from 'react'

import {
  safeCloneElement,
  passthroughProps,
  matchComponentTypes,
  callRenderProp
} from '@instructure/ui-react-utils'
import { View } from '@instructure/ui-view'
import { withStyle, jsx } from '@instructure/emotion'

import { Item } from './Item'

import generateStyle from './styles'
import generateComponentTheme from './theme'

import { propTypes, allowedProps } from './props'
import type { FlexProps } from './props'

/**
---
category: components
---
@module Flex
**/
@withStyle(generateStyle, generateComponentTheme)
class Flex extends Component<FlexProps> {
  static readonly componentId = 'Flex'

  constructor(props: FlexProps) {
    super(props)
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    props.makeStyles()
  }

  componentDidUpdate() {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles()
  }

  static Item = Item

  static propTypes = propTypes
  static allowedProps = allowedProps
  static defaultProps = {
    children: null,
    as: 'span',
    // @ts-expect-error ts-migrate(6133) FIXME: 'el' is declared but its value is never read.
    elementRef: (el: any) => {},
    direction: 'row',
    justifyItems: 'start',
    display: 'flex',
    withVisualDebug: false,
    wrap: 'no-wrap'
  }

  renderChildren(children: any) {
    return Children.map(children, (child) => {
      if (!child) {
        return null
      }

      return matchComponentTypes(child, ['Item'])
        ? safeCloneElement(child, {
            withVisualDebug: this.props.withVisualDebug,
            ...child.props /* child withVisualDebug prop should override parent */,
            //@ts-expect-error FIXME:
            direction: this.props.direction.replace(/-reverse/, '')
          })
        : child
    })
  }

  render() {
    const {
      as,
      elementRef,
      withVisualDebug,
      height,
      display,
      margin,
      padding,
      textAlign,
      width,
      styles
    } = this.props

    const children = callRenderProp(this.props.children)

    if (children && Children.count(children) > 0) {
      return (
        <View
          {...passthroughProps(this.props)}
          css={styles?.flex}
          elementRef={elementRef}
          as={as}
          display={display}
          width={width}
          height={height}
          margin={margin}
          padding={padding}
          textAlign={textAlign}
          withVisualDebug={withVisualDebug}
        >
          {this.renderChildren(children)}
        </View>
      )
    } else {
      return null
    }
  }
}

export default Flex
export { Flex, Item as FlexItem }
