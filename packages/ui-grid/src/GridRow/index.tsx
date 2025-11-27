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

import { ComponentElement, Component, Children } from 'react'

import {
  safeCloneElement,
  matchComponentTypes,
  omitProps,
  pickProps
} from '@instructure/ui-react-utils'

import { GridCol } from '../GridCol'
import type { GridColProps } from '../GridCol/props'

import { withStyleRework as withStyle } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'

import { allowedProps } from './props'
import type { GridRowProps } from './props'

/**
---
parent: Grid
id: Grid.Row
---
**/
@withStyle(generateStyle, generateComponentTheme)
class GridRow extends Component<GridRowProps> {
  static readonly componentId = 'Grid.Row'

  static allowedProps = allowedProps
  static defaultProps = {
    children: null,
    isLastRow: false
  }

  ref: Element | null = null

  handleRef = (el: Element | null) => {
    this.ref = el
  }

  componentDidMount() {
    this.props.makeStyles?.()
  }

  componentDidUpdate() {
    this.props.makeStyles?.()
  }

  renderChildren() {
    const { styles, makeStyles, ...props } = this.props

    return Children.map(this.props.children, (child, index) => {
      if (
        matchComponentTypes<ComponentElement<GridColProps, GridCol>>(child, [
          GridCol
        ])
      ) {
        return safeCloneElement(child, {
          ...pickProps(props, GridRow.allowedProps),
          ...child.props /* child props should override parent */,
          isLastRow: props.isLastRow,
          isLastCol: index + 1 === Children.count(this.props.children)
        })
      } else {
        return child // PropType validation should handle errors
      }
    })
  }

  render() {
    const { styles, ...restProps } = this.props

    const props = omitProps(restProps, GridRow.allowedProps)

    return (
      <span {...props} css={styles?.gridRow} ref={this.handleRef}>
        {this.renderChildren()}
      </span>
    )
  }
}

export default GridRow
export { GridRow }
