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
import { omitProps, safeCloneElement, deprecated } from '@instructure/ui-react-utils'
import { View } from '@instructure/ui-view'

import { FlexItem } from './FlexItem'

import styles from './styles.css'
import theme from './theme'

/**
---
category: components/deprecated
id: DeprecatedFlex
---
**/
@deprecated('7.0.0', null, 'Use Flex from ui-flex instead.')
@themeable(theme, styles)
class Flex extends Component {
  static propTypes = {
    /**
    * Flex only accepts Flex.Item as a child
    */
    children: ChildrenPropTypes.oneOf([FlexItem]),
    /**
    * the element type to render as
    */
    as: PropTypes.elementType,
    /**
    * provides a reference to the underlying html root element
    */
    elementRef: PropTypes.func,
    /**
    * Sets the flex-direction to row (horizontal) or column (vertical)
    */
    direction: PropTypes.oneOf(['row', 'column', 'row-reverse', 'column-reverse']),
    /**
    * Sets the height of the component's container (optional)
    */
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /**
    * Sets the width of the component's container (optional)
    */
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    inline: PropTypes.bool,
    textAlign: PropTypes.oneOf(['start', 'center', 'end']),
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
    alignItems: PropTypes.oneOf(['center', 'start', 'end', 'stretch']),
    justifyItems: PropTypes.oneOf(['center', 'start', 'end', 'space-around', 'space-between']),
    /**
    * Places dashed lines around the component's borders to help debug your layout
    */
    visualDebug: PropTypes.bool,
    wrapItems: PropTypes.bool
  }

  static defaultProps = {
    children: null,
    as: 'span',
    elementRef: (el) => {},
    direction: 'row',
    justifyItems: 'start',
    inline: false,
    visualDebug: false,
    wrapItems: false,
    width: undefined,
    height: undefined,
    padding: undefined,
    margin: undefined,
    alignItems: undefined,
    textAlign: undefined
  }

  static Item = FlexItem

  renderChildren () {
    return Children.map(this.props.children, (child) => {
      if (child) {
        return safeCloneElement(child, {
          visualDebug: this.props.visualDebug,
          ...child.props, /* child visualDebug prop should override parent */
          direction: this.props.direction.replace(/-reverse/, '')
        })
      } else {
        return null
      }
    })
  }

  render () {
    const props = omitProps(
      this.props,
      Flex.propTypes
    )

    const {
      as,
      elementRef,
      children,
      direction,
      height,
      inline,
      margin,
      padding,
      justifyItems,
      textAlign,
      visualDebug,
      width,
      wrapItems
    } = this.props

    // When flex direction is row, 'center' is the most useful default because it
    // vertically aligns FlexItems. For column direction, though, we want 'stretch'.
    const alignItems = this.props.alignItems || (direction === 'column' || direction === 'column-reverse' ? 'stretch' : 'center')

    const classes = {
      [styles.root]: true,
      [styles.visualDebug]: visualDebug,
      [styles[`justifyItems--${justifyItems}`]]: true,
      [styles[`alignItems--${alignItems}`]]: true,
      [styles.wrapItems]: wrapItems
    }

    if (children && React.Children.count(children) > 0) {
      return (
        <View
          {...props}
          className={classnames(classes, styles[direction])}
          elementRef={elementRef}
          as={as}
          display={inline ? 'inline-flex' : 'flex'}
          width={width}
          height={height}
          margin={margin}
          padding={padding}
          textAlign={textAlign}
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
export { Flex, FlexItem }
