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

/* istanbul ignore file */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import themeable from '@instructure/ui-themeable'
import ThemeablePropTypes from '@instructure/ui-themeable/lib/utils/ThemeablePropTypes'
import getElementType from '@instructure/ui-utils/lib/react/getElementType'
import { omitProps } from '@instructure/ui-utils/lib/react/passthroughProps'

import deprecated, { changedPackageWarning } from '@instructure/ui-utils/lib/react/deprecated'

import styles from './styles.css'
import theme from './theme'

/**
---
category: components
---
**/
@themeable(theme, styles)
class Container extends Component {
  static propTypes = {
    as: PropTypes.elementType,
    children: PropTypes.node,
    textAlign: PropTypes.oneOf(['start', 'center', 'end']),
    /**
    * Controls the maximum width of the Container
    */
    size: PropTypes.oneOf(['auto', 'x-small', 'small', 'medium', 'large', 'fullscreen']),
    /**
    * Set the margin using familiar CSS shorthand
    */
    margin: ThemeablePropTypes.spacing,
    /**
    * Set the padding using familiar CSS shorthand
    */
    padding: ThemeablePropTypes.spacing,
    /**
    * By default the Container's display prop is null, meaning it takes on the
    * display rules of the html element it's rendered as.
    */
    display: PropTypes.oneOf([null, 'block', 'inline']),
    /**
    * Activate a dotted line around the Container to make building your
    * layout easier
    */
    visualDebug: PropTypes.bool,

    /**
    * provides a reference to the underlying html element
    */
    elementRef: PropTypes.func,

    /**
     * Whether or not to render a border around the Container
     */
    withBorder: PropTypes.bool,

    /**
     * Whether or not to render a box shadow for the Container
     */
    withShadow: PropTypes.bool
  }

  static defaultProps = {
    display: null
  }

  renderSpacingStyles (spacingFromProps, spacingFromTheme) {
    if (typeof spacingFromProps !== 'string') {
      return null
    }

    const spacing = spacingFromProps.split(' ')
    const spacingStyle = []

    for (let i = 0; i < spacing.length; i++) {
      const style = spacingFromTheme[spacing[i]]
      if (style) {
        spacingStyle.push(style)
      }
    }

    return spacingStyle.join(' ')
  }

  get paddingFromTheme () {
    return {
      0: '0',
      none: '0',
      'xxx-small': this.theme.paddingxxxSmall,
      'xx-small': this.theme.paddingxxSmall,
      'x-small': this.theme.paddingxSmall,
      small: this.theme.paddingSmall,
      medium: this.theme.paddingMedium,
      large: this.theme.paddingLarge,
      'x-large': this.theme.paddingxLarge,
      'xx-large': this.theme.paddingxxLarge
    }
  }

  get marginFromTheme () {
    return {
      auto: 'auto',
      0: '0',
      none: '0',
      'xxx-small': this.theme.marginxxxSmall,
      'xx-small': this.theme.marginxxSmall,
      'x-small': this.theme.marginxSmall,
      small: this.theme.marginSmall,
      medium: this.theme.marginMedium,
      large: this.theme.marginLarge,
      'x-large': this.theme.marginxLarge,
      'xx-large': this.theme.marginxxLarge
    }
  }

  render () {
    const {
      children,
      textAlign,
      display,
      visualDebug,
      size,
      padding,
      margin,
      withBorder,
      withShadow
    } = this.props

    const classes = {
      [styles.root]: true,
      [styles[display]]: display !== null,
      [styles.visualDebug]: visualDebug,
      [styles[`textAlign--${textAlign}`]]: textAlign,
      [styles[size]]: size,
      [styles.hasPadding]: padding,
      [styles.withBorder]: withBorder,
      [styles.withShadow]: withShadow,
      [this.props.className]: this.props.className // eslint-disable-line react/prop-types
    }

    const style = {
      ...this.props.style, // eslint-disable-line react/prop-types
      margin: this.renderSpacingStyles(margin, this.marginFromTheme),
      padding: this.renderSpacingStyles(padding, this.paddingFromTheme)
    }

    const ElementType = getElementType(Container, this.props)

    return (
      <ElementType
        {...omitProps(this.props, Container.propTypes)}
        className={classnames(classes)}
        style={style}
        ref={this.props.elementRef}
      >
        {children}
      </ElementType>
    )
  }
}

export default deprecated('5.4.0', null, `${changedPackageWarning(
  'ui-container',
  'ui-layout'
)} It has also been renamed from [Container] to [View].`)(Container)
