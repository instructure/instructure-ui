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
import { Children, Component, ReactElement } from 'react'
import PropTypes from 'prop-types'

import { View } from '@instructure/ui-view'
import { passthroughProps, safeCloneElement } from '@instructure/ui-react-utils'
import { Children as ChildrenPropTypes } from '@instructure/ui-prop-types'
import { testable } from '@instructure/ui-testable'

import { ListItem } from './ListItem'

import {
  withStyle,
  jsx,
  ThemeablePropTypes,
  Spacing
} from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'

type Props = {
  makeStyles?: (...args: any[]) => any
  styles?: any
  as?: 'ul' | 'ol'
  delimiter?: 'none' | 'dashed' | 'solid'
  isUnstyled?: boolean
  margin?: Spacing
  size?: 'small' | 'medium' | 'large'
  itemSpacing?:
    | 'none'
    | 'xxx-small'
    | 'xx-small'
    | 'x-small'
    | 'small'
    | 'medium'
    | 'large'
    | 'x-large'
    | 'xx-large'
  elementRef?: (...args: any[]) => any
}

/**
---
category: components
---
**/
@withStyle(generateStyle, generateComponentTheme)
@testable()
class List extends Component<Props> {
  static componentId = 'List'

  static propTypes = {
    // eslint-disable-next-line react/require-default-props
    makeStyles: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    styles: PropTypes.object,
    /**
     * Only accepts `<List.Item>` as a child
     */
    children: ChildrenPropTypes.oneOf([ListItem]),
    as: PropTypes.oneOf(['ul', 'ol']),
    /**
     * One of: none, dashed, solid
     */
    delimiter: PropTypes.oneOf(['none', 'dashed', 'solid']),
    /**
     * When set, renders the List Items without a list style type.
     */
    isUnstyled: PropTypes.bool,
    /**
     * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
     * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
     * familiar CSS-like shorthand. For example: `margin="small auto large"`.
     */
    margin: ThemeablePropTypes.spacing,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    /**
     * Sets the margin separating each ListItem.
     */
    itemSpacing: PropTypes.oneOf([
      'none',
      'xxx-small',
      'xx-small',
      'x-small',
      'small',
      'medium',
      'large',
      'x-large',
      'xx-large'
    ]),
    elementRef: PropTypes.func
  }

  static defaultProps = {
    children: null,
    as: 'ul',
    delimiter: 'none',
    isUnstyled: false,
    margin: undefined,
    size: 'medium',
    itemSpacing: 'none',
    // @ts-expect-error ts-migrate(6133) FIXME: 'el' is declared but its value is never read.
    elementRef: (el) => {}
  }

  static Item = ListItem

  componentDidMount() {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles()
  }

  // @ts-expect-error ts-migrate(6133) FIXME: 'prevProps' is declared but its value is never rea... Remove this comment to see the full error message
  componentDidUpdate(prevProps, prevState, snapshot) {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles()
  }

  renderChildren() {
    return Children.map(this.props.children, (child) => {
      if (!child) return // ignore null, falsy children

      return safeCloneElement(child as ReactElement, {
        isUnstyled: this.props.isUnstyled,
        delimiter: this.props.delimiter,
        size: this.props.size,
        spacing: this.props.itemSpacing
      })
    })
  }

  render() {
    const { as, margin, isUnstyled, elementRef, styles, ...rest } = this.props

    return (
      <View
        {...passthroughProps(rest)}
        css={styles.list}
        as={as}
        margin={margin}
        elementRef={elementRef}
        display="block"
      >
        {this.renderChildren()}
      </View>
    )
  }
}

export default List
export { List, ListItem }
