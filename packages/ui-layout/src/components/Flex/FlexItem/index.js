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

import themeable from '@instructure/ui-themeable'
import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'
import { omitProps } from '@instructure/ui-utils/lib/react/passthroughProps'
import ThemeablePropTypes from '@instructure/ui-themeable/lib/utils/ThemeablePropTypes'

import View from '../../View'

import styles from './styles.css'
import theme from './theme'

/**
---
parent: Flex
---
**/
@themeable(theme, styles)
export default class FlexItem extends Component {
  static propTypes = {
    /**
    * overrides the parent Flex's alignItems prop, if needed
    */
    align: PropTypes.oneOf(['center', 'start', 'end', 'stretch']),
    /**
    * the element type to render as
    */
    as: CustomPropTypes.elementType,
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
    visualDebug: PropTypes.bool
  }

  static defaultProps = {
    as: 'span',
    grow: false,
    shrink: false
  }

  render () {
   const props = omitProps(this.props, FlexItem.propTypes)

   const {
     align,
     as,
     children,
     direction,
     grow,
     margin,
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
     [styles[`align--${align}`]]: align,
     [styles.column]: dirColumn
   }

   return (
     <View
       {...props}
       className={classnames(classes)}
       style={style}
       as={as}
       minHeight={dirColumn ? size : undefined} // eslint-disable-line no-undefined
       minWidth={direction === 'row' ? size : undefined} // eslint-disable-line no-undefined
       textAlign={textAlign}
       margin={margin}
       padding={padding}
     >
       {children}
     </View>
   )
  }
}
