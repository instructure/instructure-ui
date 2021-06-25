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
import PropTypes from 'prop-types'

import { omitProps } from '@instructure/ui-react-utils'
import { View } from '@instructure/ui-view'
import {
  withStyle,
  jsx,
  ThemeablePropTypes,
  Spacing
} from '@instructure/emotion'

import generateStyle from './styles'

type Props = {
  makeStyles?: (...args: any[]) => any
  styles?: any
  as?: React.ReactElement
  elementRef?: (...args: any[]) => any
  margin?: Spacing
  padding?: Spacing
  align?: 'center' | 'start' | 'end' | 'stretch'
  direction?: 'row' | 'column'
  textAlign?: 'start' | 'center' | 'end'
  overflowX?: 'auto' | 'hidden' | 'visible'
  overflowY?: 'auto' | 'hidden' | 'visible'
  shouldGrow?: boolean
  shouldShrink?: boolean
  size?: string
  withVisualDebug?: boolean
}

/**
---
parent: Flex
id: Flex.Item
---
**/
@withStyle(generateStyle)
class Item extends Component<Props> {
  static componentId = 'Flex.Item'

  componentDidMount() {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles()
  }

  componentDidUpdate() {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles()
  }

  /* eslint-disable react/require-default-props */
  static propTypes = {
    // eslint-disable-next-line react/require-default-props
    makeStyles: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    styles: PropTypes.object,
    /**
     * The children to render inside the Item`
     */
    children: PropTypes.node,
    /**
     * the element type to render as
     */
    as: PropTypes.elementType,
    /**
     * provides a reference to the underlying html root element
     */
    elementRef: PropTypes.func,
    /**
     * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
     * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
     * familiar CSS-like shorthand. For example: `margin="small auto large"`.
     */
    margin: ThemeablePropTypes.spacing,
    /**
     * Valid values are `0`, `none`, `xxx-small`, `xx-small`, `x-small`,
     * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
     * familiar CSS-like shorthand. For example: `padding="small x-large large"`.
     */
    padding: ThemeablePropTypes.spacing,
    /**
     * overrides the parent Flex's alignItems prop, if needed
     */
    align: PropTypes.oneOf(['center', 'start', 'end', 'stretch']),
    /**
     * Inherits from the parent Flex component
     */
    direction: PropTypes.oneOf(['row', 'column']),
    /**
     * Designates the text alignment inside the Item
     */
    textAlign: PropTypes.oneOf(['start', 'center', 'end']),
    /**
     * Handles horizontal overflow
     */
    overflowX: PropTypes.oneOf(['auto', 'hidden', 'visible']),
    /**
     * Handles vertical overflow
     */
    overflowY: PropTypes.oneOf(['auto', 'hidden', 'visible']),
    /**
     * Should the FlexItem grow to fill any available space?
     */
    shouldGrow: PropTypes.bool,
    /**
     * Should the FlexItem shrink (stopping at its `size`)?
     */
    shouldShrink: PropTypes.bool,
    /**
     * Sets the base size of the FlexItem (width if direction is `row`; height if direction is `column`)
     */
    size: PropTypes.string,
    /**
     * Places dashed lines around the component's borders to help debug your layout
     */
    withVisualDebug: PropTypes.bool
  }
  /* eslint-enable react/require-default-props */

  static defaultProps = {
    as: 'span',
    // @ts-expect-error ts-migrate(6133) FIXME: 'el' is declared but its value is never read.
    elementRef: (el: any) => {},
    shouldGrow: false,
    shouldShrink: false
  }

  render() {
    const props = omitProps(this.props, Item.propTypes)

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
        css={styles.flexItem}
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
