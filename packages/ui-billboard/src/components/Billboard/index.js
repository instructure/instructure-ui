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

import Heading from '@instructure/ui-elements/lib/components/Heading'
import View from '@instructure/ui-layout/lib/components/View'

import themeable from '@instructure/ui-themeable'
import { omitProps } from '@instructure/ui-utils/lib/react/passthroughProps'
import getElementType from '@instructure/ui-utils/lib/react/getElementType'
import ThemeablePropTypes from '@instructure/ui-themeable/lib/utils/ThemeablePropTypes'
import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'
import testable from '@instructure/ui-testable'

import styles from './styles.css'
import theme from './theme'

/**
---
category: components
---
**/
@testable()
@themeable(theme, styles)
class Billboard extends Component {
  static propTypes = {
    /**
    * Provide an <Img> component or Instructure Icon for the hero image
    */
    hero: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    /**
    * If you're using an icon, this prop will size it. Also sets the font-size
    * of the headline and message.
    */
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    /**
    * the element type to render as
    */
    as: CustomPropTypes.elementType,
    /**
    * provides a reference to the underlying html root element
    */
    elementRef: PropTypes.func,
    /**
    * The headline for the Billboard. Is styled as an h1 element by default
    */
    heading: PropTypes.string,
    /**
    * Choose the appropriately semantic tag for the heading
    */
    headingAs: PropTypes.oneOf(['h1', 'h2', 'h3', 'span']),
    /**
    * Choose the font-size for the heading (see the Heading component)
    */
    headingLevel: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4']),
    /**
    * Instructions or information for the Billboard
    */
    message: PropTypes.string,
    /**
    * If you add an onClick prop, the Billboard renders as a clickable button
    */
    onClick: PropTypes.func,
    /**
    * If `href` is provided, Billboard will render as a link
    */
    href: PropTypes.string,
    /**
     * Whether or not to disable the billboard
     */
    disabled: PropTypes.bool,
    /**
     * Works just like disabled but keeps the same styles as if it were active
     */
    readOnly: PropTypes.bool,
    /**
    * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
    * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
    * familiar CSS-like shorthand. For example: `margin="small auto large"`.
    */
    margin: ThemeablePropTypes.spacing
  }

  static defaultProps = {
    size: 'medium',
    headingAs: 'span',
    headingLevel: 'h1',
    as: 'span',
    elementRef: (el) => {}
  }

  renderHeading () {
    const {
      headingLevel,
      headingAs,
      heading
    } = this.props

    return (
      <span className={styles.heading}>
        <Heading
          level={headingLevel}
          as={headingAs}
          color="primary"
        >
          {heading}
        </Heading>
      </span>
    )
  }

  get heroIsFunction () {
    return typeof this.props.hero === 'function'
  }

  get SVGIconSize () {
    const size = this.props.size

    // serve up appropriate SVGIcon size for each Billboard size
    if (size === 'small') {
      return 'medium'
    } else if (size === 'large') {
      return 'x-large'
    } else {
      return 'large'
    }
  }

  renderHero () {
    if (this.heroIsFunction) {
      return this.props.hero(this.SVGIconSize)
    } else {
      return this.props.hero
    }
  }

  renderContent () {
    const {
      heading,
      message,
      hero
    } = this.props

    return (
      <span className={styles.content}>
        {hero && <span className={styles.hero}>{this.renderHero()}</span>}
        {heading && this.renderHeading()}
        {message && <span className={styles.message}>{message}</span>}
      </span>
    )
  }

  handleClick = (e) => {
    const {
      disabled,
      readOnly,
      onClick
    } = this.props

    if (disabled || readOnly) {
      e.preventDefault()
      e.stopPropagation()
    } else if (typeof onClick === 'function') {
      onClick(e)
    }
  }

  render () {
    const {
      href,
      disabled,
      readOnly,
      onClick,
      size,
      margin,
      elementRef
    } = this.props

    const classes = {
      [styles.root]: true,
      [styles[size]]: true,
      [styles.clickable]: href || onClick,
      [styles.disabled]: disabled
    }
    const Element = getElementType(Billboard, this.props)

    return (
      <View
        {...omitProps(this.props, { ...Billboard.propTypes, ...View.propTypes })}
        type={(Element === 'button') ? 'button' : null}
        as={Element}
        elementRef={elementRef}
        className={classnames(classes)}
        margin={margin}
        href={href}
        onClick={this.handleClick}
        disabled={disabled || readOnly}
        aria-disabled={(disabled || readOnly) ? 'true' : null}
      >
        {this.renderContent()}
      </View>
    )
  }
}

export default Billboard
