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

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { themeable, ThemeablePropTypes } from '@instructure/ui-themeable'
import { omitProps } from '@instructure/ui-react-utils'

import { View } from '../../View'

import styles from './styles.css'
import theme from './theme'

/**
---
parent: Flex
id: Flex.Item
---
**/
@themeable(theme, styles)
class FlexItem extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    /**
    * overrides the parent Flex's alignItems prop, if needed
    */
    align: PropTypes.oneOf(['center', 'start', 'end', 'stretch']),
    /**
    * the element type to render as
    */
    as: PropTypes.elementType,
    /**
    * provides a reference to the underlying html root element
    */
    elementRef: PropTypes.func,
    children: PropTypes.node,
    /**
    * Inherits from the parent Flex component
    */
    direction: PropTypes.oneOf(['row', 'column']),
    /**
    * Should the FlexItem grow to fill any available space?
    */
    grow: PropTypes.bool,
    /**
    * Should the FlexItem shrink (stopping at its `size`)?
    */
    shrink: PropTypes.bool,
    /**
    * Sets the base size of the FlexItem (width if direction is `row`; height if direction is `column`)
    */
    size: PropTypes.string,
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
    /**
    * Places dashed lines around the component's borders to help debug your layout
    */
    visualDebug: PropTypes.bool,
    overflowX: PropTypes.oneOf(['auto', 'hidden', 'visible']),
    overflowY: PropTypes.oneOf(['auto', 'hidden', 'visible'])
  }
  /* eslint-enable react/require-default-props */

  static defaultProps = {
    as: 'span',
    elementRef: (el) => {},
    grow: false,
    shrink: false
  }

  render () {
   const props = omitProps(this.props, FlexItem.propTypes)

   const {
     align,
     as,
     elementRef,
     children,
     direction,
     grow,
     margin,
     overflowX,
     overflowY,
     padding,
     shrink,
     size,
     textAlign,
     visualDebug
   } = this.props

   const dirColumn = direction === 'column'

   const style = {
     flexBasis: size
   }

   const classes = {
     [styles.root]: true,
     [styles.visualDebug]: visualDebug,
     [styles.grow]: grow,
     [styles.shrink]: shrink,
     [styles[`align--${align}`]]: align
   }

   return (
     <View
       {...props}
       className={classnames(classes)}
       style={style}
       elementRef={elementRef}
       as={as}
       minHeight={dirColumn ? size : undefined}
       minWidth={direction === 'row' ? size : undefined}
       textAlign={textAlign}
       margin={margin}
       padding={padding}
       overflowX={overflowX}
       overflowY={overflowY || (dirColumn ? 'auto' : 'visible')}
     >
       {children}
     </View>
   )
  }
}

export default FlexItem
export { FlexItem }
