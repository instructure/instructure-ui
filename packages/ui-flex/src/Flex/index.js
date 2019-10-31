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

import React, { Children, Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { themeable, ThemeablePropTypes } from '@instructure/ui-themeable'
import { Children as ChildrenPropTypes } from '@instructure/ui-prop-types'
import { safeCloneElement, passthroughProps, deprecated } from '@instructure/ui-react-utils'
import { View } from '@instructure/ui-view'

import { Item } from './Item'

import styles from './styles.css'
import theme from './theme'

/**
---
category: components
---
@module Flex
**/
@deprecated('8.0.0', {
  inline: 'display',
  wrapItems: 'wrap',
  visualDeug: 'withVisualDebug'
})
@themeable(theme, styles)
class Flex extends Component {
  static Item = Item

  static propTypes = {
    /**
    * Flex only accepts Flex.Item as a child
    */
    children: ChildrenPropTypes.oneOf([Item]),
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
    direction: PropTypes.oneOf(['row', 'column', 'row-reverse', 'column-reverse']),
    /**
    * Aligns Flex.Items on the vertical axis (horizontal if direction is column)
    */
    alignItems: PropTypes.oneOf(['center', 'start', 'end', 'stretch']),
    /**
    * Aligns Flex.Items on the horizontal axis (vertical if direction is column)
    */
    justifyItems: PropTypes.oneOf(['center', 'start', 'end', 'space-around', 'space-between']),
    /**
    * Determines if the Flex.Items should wrap when they exceed their container's width
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
    visualDebug: PropTypes.bool,
   /* eslint-enable react/require-default-props */
  }

  static defaultProps = {
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

  renderChildren () {
    return Children.map(this.props.children, (child) => {
      if (child) {
        return safeCloneElement(child, {
          withVisualDebug: this.props.withVisualDebug || this.props.visualDebug,
          ...child.props, /* child visualDebug prop should override parent */
          direction: this.props.direction.replace(/-reverse/, '')
        })
      } else {
        return null
      }
    })
  }

  render () {
    const {
      as,
      elementRef,
      children,
      direction,
      height,
      display,
      margin,
      padding,
      justifyItems,
      textAlign,
      withVisualDebug,
      width,
      wrap,
      visualDebug,
      wrapItems,
      inline
    } = this.props

    // When flex direction is row, 'center' is the most useful default because it
    // vertically aligns Items. For column direction, though, we want 'stretch'.
    const alignItems = this.props.alignItems || (direction === 'column' || direction === 'column-reverse' ? 'stretch' : 'center')

    const backwardsDisplay = inline ? 'inline-flex' : null

    const classes = {
      [styles.root]: true,
      [styles[`justifyItems--${justifyItems}`]]: true,
      [styles[`alignItems--${alignItems}`]]: true,
      [styles[`wrap--${wrap}`]]: wrap !== 'no-wrap',
      [styles.wrapItems]: wrapItems
    }

    if (children && React.Children.count(children) > 0) {
      return (
        <View
          {...passthroughProps(this.props)}
          className={classnames(classes, styles[direction])}
          elementRef={elementRef}
          as={as}
          display={backwardsDisplay || display}
          width={width}
          height={height}
          margin={margin}
          padding={padding}
          textAlign={textAlign}
          withVisualDebug={withVisualDebug || visualDebug}
          __dangerouslyIgnoreExperimentalWarnings
        >
          {this.renderChildren()}
        </View>
      )
    } else {
      return null
    }
  }
}

export default Flex
export { Flex }
