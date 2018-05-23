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
import ThemeablePropTypes from '@instructure/ui-themeable/lib/utils/ThemeablePropTypes'
import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'
import { omitProps } from '@instructure/ui-utils/lib/react/passthroughProps'

import LayoutPropTypes from '../../utils/LayoutPropTypes'
import mirrorPlacement from '../../utils/mirrorPlacement'
import View from '../View'

import styles from './styles.css'
import theme from './theme'

/**
---
category: components/layout
---
**/
@themeable(theme, styles)
class ContextView extends Component {
  static propTypes = {
    /**
    * The element to render as the component root
    */
    as: CustomPropTypes.elementType,

    /**
    * provides a reference to the underlying html root element
    */
    elementRef: PropTypes.func,

    /**
    * Set the margin using familiar CSS shorthand
    */
    margin: ThemeablePropTypes.spacing,

    /**
    * Set the padding using familiar CSS shorthand
    */
    padding: ThemeablePropTypes.spacing,

    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    minHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    minWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    /**
    * The children to render inside the `<ContextView />`
    */
    children: PropTypes.node,

    /**
    * Designates the text alignment within the `<ContextView />`
    */
    textAlign: PropTypes.oneOf(['start', 'center', 'end']),

    /**
    * Controls the shadow depth for the `<ContextView />`
    */
    shadow: ThemeablePropTypes.shadow,

    /**
    * Controls the z-index depth for the `<ContextView />`
    */
    stacking: ThemeablePropTypes.stacking,

    /**
    * Designates the background style of the `<ContextView />`
    */
    background: PropTypes.oneOf(['default', 'inverse']),

    /**
    * Specifies how the arrow for `<ContextView />` will be rendered.
    * Ex. `placement="top"` will render with an arrow pointing down.
    */
    placement: LayoutPropTypes.placement,

    /**
    * Activate an outline around the component to make building your
    * layout easier
    */
    debug: PropTypes.bool
  }

  static defaultProps = {
    as: 'span',
    elementRef: el => {},
    debug: false,
    width: 'auto',
    height: 'auto',
    children: null,
    textAlign: 'start',
    background: 'default',
    shadow: 'resting',
    placement: 'center end'
  }

  get mirroredPlacement () {
    return mirrorPlacement(this.props.placement, '-')
  }

  render () {
    const {
      as,
      background,
      children,
      debug,
      elementRef,
      height,
      width,
      maxHeight,
      maxWidth,
      minHeight,
      minWidth,
      margin,
      padding,
      placement,
      shadow,
      stacking,
      style, // eslint-disable-line react/prop-types
      textAlign
    } = this.props

    const classes = {
      [styles.root]: true,
      [styles[`placement--${placement.replace(' ', '-')}`]]: true
    }

    return (
      <View
        {...omitProps(this.props, ContextView.propTypes)}
        style={style}
        className={classnames(classes)}
        borderWidth="none"
        display="inline-block"
        as={as}
        debug={debug}
        elementRef={elementRef}
        margin={margin}
        stacking={stacking}
      >
        <View
          className={styles.content}
          borderRadius="medium"
          borderWidth="small"
          display="block"
          background={background}
          debug={debug}
          height={height}
          width={width}
          maxHeight={maxHeight}
          maxWidth={maxWidth}
          minHeight={minHeight}
          minWidth={minWidth}
          padding={padding}
          shadow={shadow}
          textAlign={textAlign}
        >
          <span
            className={classnames({
              [styles.arrow]: true,
              [styles[`arrow--${background}`]]: background,
              [styles[`arrow--${this.mirroredPlacement}`]]: true
            })}
          />
          {children}
        </View>
      </View>
    )
  }
}

export default ContextView
