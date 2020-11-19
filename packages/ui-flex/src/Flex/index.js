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
import React, { Children } from 'react'
import PropTypes from 'prop-types'
import { useStyle, jsx } from '@instructure/emotion'
import { ThemeablePropTypes } from '@instructure/ui-themeable'
import {
  safeCloneElement,
  passthroughProps,
  useDeprecated,
  matchComponentTypes,
  callRenderProp
} from '@instructure/ui-react-utils'
import { View } from '@instructure/ui-view'

import { Item } from './Item'

import generateStyle from './styles'

/**
---
category: components
---
@module Flex
**/
const Flex = (props) => {
  useDeprecated({
    componentName: Flex.name,
    version: '8.0',
    oldProps: {
      inline: 'display',
      wrapItems: 'wrap',
      visualDebug: 'withVisualDebug'
    },
    props
  })

  const styles = useStyle(Flex.name, generateStyle, props, {})

  const {
    as,
    elementRef,
    direction,
    height,
    display,
    margin,
    padding,
    textAlign,
    withVisualDebug,
    width,
    visualDebug,
    inline
  } = props

  const renderChildren = (children) => {
    return Children.map(children, (child) => {
      if (!child) return null

      return matchComponentTypes(child, ['Item'])
        ? safeCloneElement(child, {
            withVisualDebug: withVisualDebug || visualDebug,
            ...child.props /* child visualDebug prop should override parent */,
            direction: direction.replace(/-reverse/, '')
          })
        : child
    })
  }

  const children = callRenderProp(props.children)

  const backwardsDisplay = inline ? 'inline-flex' : null

  if (children && React.Children.count(children) > 0) {
    return (
      <View
        {...passthroughProps(props)}
        css={styles.root}
        elementRef={elementRef}
        as={as}
        display={backwardsDisplay || display}
        width={width}
        height={height}
        margin={margin}
        padding={padding}
        textAlign={textAlign}
        withVisualDebug={withVisualDebug || visualDebug}
      >
        {renderChildren(children)}
      </View>
    )
  } else {
    return null
  }
}

Flex.propTypes = {
  /**
   * It's recommended that you use `FlexItem` for children,
   * but you can also pass any markup or a function returning markup.
   * Note that if you do not use `FlexItem`, the `withVisualDebug`
   * and `direction` props will not automatically be set on the children.
   */
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  /**
   * the element type to render as
   */
  as: PropTypes.elementType,
  /**
   * provides a reference to the underlying html root element
   */
  elementRef: PropTypes.func,
  /**
   * Sets the height of the component's container (optional)
   */
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * Sets the width of the component's container (optional)
   */
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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
   * Sets the CSS display rule for the component's container
   */
  display: PropTypes.oneOf(['flex', 'inline-flex']),
  /**
   * Designates the text alignment
   */
  textAlign: PropTypes.oneOf(['start', 'center', 'end']),
  /**
   * Sets the flex-direction to row (horizontal) or column (vertical)
   */
  direction: PropTypes.oneOf([
    'row',
    'column',
    'row-reverse',
    'column-reverse'
  ]),
  /**
   * Aligns FlexItems on the vertical axis (horizontal if direction is column)
   */
  alignItems: PropTypes.oneOf(['center', 'start', 'end', 'stretch']),
  /**
   * Aligns FlexItems on the horizontal axis (vertical if direction is column)
   */
  justifyItems: PropTypes.oneOf([
    'center',
    'start',
    'end',
    'space-around',
    'space-between'
  ]),
  /**
   * Determines if the FlexItems should wrap when they exceed their container's width
   */
  wrap: PropTypes.oneOf(['wrap', 'no-wrap', 'wrap-reverse']),
  /**
   * Activate a dotted outline around the component to make building your
   * layout easier
   */
  withVisualDebug: PropTypes.bool,
  /* eslint-disable react/require-default-props */
  /**
   * __Deprecated - use 'display'__
   */
  inline: PropTypes.bool,
  /**
   * __Deprecated - use 'wrap'__
   */
  wrapItems: PropTypes.bool,
  /**
   * __Deprecated - use 'withVisualDebug'__
   */
  visualDebug: PropTypes.bool
  /* eslint-enable react/require-default-props */
}

Flex.defaultProps = {
  children: null,
  as: 'span',
  elementRef: (el) => {},
  direction: 'row',
  justifyItems: 'start',
  display: 'flex',
  withVisualDebug: false,
  wrap: 'no-wrap',
  width: undefined,
  height: undefined,
  padding: undefined,
  margin: undefined,
  alignItems: undefined,
  textAlign: undefined
}

export default Flex
export { Flex, Item as FlexItem }
