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

import themeable from '@instructure/ui-themeable'
import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'
import ThemeablePropTypes from '@instructure/ui-themeable/lib/utils/ThemeablePropTypes'
import safeCloneElement from '@instructure/ui-utils/lib/react/safeCloneElement'
import { omitProps } from '@instructure/ui-utils/lib/react/passthroughProps'

import View from '../View'
import FlexItem from './FlexItem'

import styles from './styles.css'
import theme from './theme'

/**
---
category: components/layout
---
**/
@themeable(theme, styles)
export default class Flex extends Component {
  static propTypes = {
    /**
    * Flex only accepts FlexItem as a child
    */
    children: CustomPropTypes.Children.oneOf([FlexItem]),
    /**
    * the element type to render as
    */
    as: CustomPropTypes.elementType,
    /**
    * Sets the flex-direction to row (horizontal) or column (vertical)
    */
    direction: PropTypes.oneOf(['row', 'column']),
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
    as: 'span',
    direction: 'row',
    justifyItems: 'start',
    alignItems: 'center',
    inline: false,
    visualDebug: false,
    wrapItems: false
  }

  renderChildren () {
    return Children.map(this.props.children, (child) => {
      return safeCloneElement(child, {
        visualDebug: this.props.visualDebug,
        ...child.props, /* child visualDebug prop should override parent */
        direction: this.props.direction
      })
    })
  }

  render () {
    const props = omitProps(
      this.props,
      Flex.propTypes
    )

    const {
      as,
      direction,
      height,
      inline,
      margin,
      padding,
      justifyItems,
      alignItems,
      textAlign,
      visualDebug,
      width,
      wrapItems
    } = this.props

    const classes = {
      [styles.root]: true,
      [styles.visualDebug]: visualDebug,
      [styles.column]: direction === 'column',
      [styles[`justifyItems--${justifyItems}`]]: true,
      [styles[`alignItems--${alignItems}`]]: true,
      [styles.wrapItems]: wrapItems
    }

    return (
      <View
        {...props}
        className={classnames(classes)}
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
  }
}

export { default as FlexItem } from './FlexItem'
