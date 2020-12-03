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

import { View } from '@instructure/ui-view'
import { themeable, ThemeablePropTypes } from '@instructure/ui-themeable'
import { passthroughProps, deprecated } from '@instructure/ui-react-utils'
import { supportsObjectFit } from '@instructure/ui-dom-utils'
import { testable } from '@instructure/ui-testable'

import styles from './styles.css'
import theme from './theme'

/**
---
category: components
---
**/
@deprecated('8.0.0', {
  grayscale: 'withGrayscale',
  blur: 'withBlur',
  inline: 'display'
})
@testable()
@themeable(theme, styles)
class Img extends Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
    display: PropTypes.oneOf(['inline-block', 'block']),
    /**
     * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
     * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
     * familiar CSS-like shorthand. For example: `margin="small auto large"`.
     */
    margin: ThemeablePropTypes.spacing,
    /**
     * Valid values for `opacity` are `0` - `10`. Valid values for `blend` are
     * `normal` (default), `multiply`, `screen`, `overlay`, and `color-burn`.
     */
    overlay: PropTypes.shape({
      color: PropTypes.string.isRequired,
      opacity: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).isRequired,
      blend: PropTypes.oneOf([
        'normal',
        'multiply',
        'screen',
        'overlay',
        'color-burn'
      ])
    }),
    withGrayscale: PropTypes.bool,
    withBlur: PropTypes.bool,
    constrain: PropTypes.oneOf(['cover', 'contain']),
    elementRef: PropTypes.func,
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /* eslint-disable react/require-default-props */
    /**
     * __Deprecated - use `display`__
     */
    inline: PropTypes.bool,
    /**
     * __Deprecated - use `withGrayscale`__
     */
    grayscale: PropTypes.bool,
    /**
     * __Deprecated - use `withBlur`__
     */
    blur: PropTypes.bool
    /* eslint-enable react/require-default-props */
  }

  static defaultProps = {
    margin: undefined,
    overlay: undefined,
    constrain: undefined,
    elementRef: undefined,
    height: undefined,
    width: undefined,
    alt: '',
    display: 'inline-block',
    withGrayscale: false,
    withBlur: false
  }

  get supportsObjectFit() {
    return supportsObjectFit()
  }

  renderFilter() {
    const blur = `blur(${this.theme.imageBlurAmount})`
    const grayscale = 'grayscale(1)'

    if (
      (this.props.withGrayscale || this.props.grayscale) &&
      (this.props.withBlur || this.props.blur)
    ) {
      return `${blur} ${grayscale}`
    } else if (this.props.withGrayscale || this.props.grayscale) {
      return grayscale
    } else if (this.props.withBlur || this.props.blur) {
      return blur
    } else {
      return null
    }
  }

  render() {
    const {
      src,
      alt,
      margin,
      display,
      overlay,
      withGrayscale,
      withBlur,
      constrain,
      width,
      height,
      elementRef,
      inline,
      blur,
      grayscale,
      ...props
    } = this.props

    const a11yProps = {
      alt: alt || ''
    }

    const imageProps = {
      className: classnames({
        [styles.image]: true,
        [styles['has-overlay']]: overlay,
        [styles['has-filter']]: withBlur || withGrayscale || blur || grayscale,
        [styles.cover]: this.supportsObjectFit && constrain === 'cover',
        [styles.contain]: this.supportsObjectFit && constrain === 'contain'
      }),
      style: {
        filter:
          withBlur || withGrayscale || blur || grayscale
            ? this.renderFilter()
            : 'none'
      },
      src
    }

    const containerProps = {
      ...passthroughProps(props),
      width,
      height,
      margin,
      display:
        display === 'block' || inline === false ? 'block' : 'inline-block',
      elementRef
    }

    // if browser does not support ObjectFit CSS, and Img needs "constrain",
    // serve up a background-image instead
    const hasBackground = !this.supportsObjectFit && this.props.constrain

    if (overlay || hasBackground) {
      // if a background image is rendered we add the a11y props on the container element
      const rootProps = hasBackground
        ? {
            ...a11yProps,
            ...containerProps
          }
        : containerProps

      return (
        <View
          {...rootProps}
          as="span"
          className={classnames({
            [styles['container--has-overlay']]: overlay,
            [styles['container--has-cover']]: constrain === 'cover',
            [styles['container--has-contain']]: constrain === 'contain',
            [styles['container--has-background']]: hasBackground
          })}
          style={{
            backgroundImage: hasBackground ? `url(${src})` : undefined
          }}
        >
          {
            !hasBackground && <img {...imageProps} {...a11yProps} /> // eslint-disable-line jsx-a11y/alt-text
          }
          {overlay && (
            <span
              className={styles.overlay}
              style={{
                backgroundColor: overlay.color,
                opacity: overlay.opacity * 0.1,
                mixBlendMode: overlay.blend ? overlay.blend : null
              }}
            />
          )}
        </View>
      )
    } else {
      return (
        <View {...containerProps} {...imageProps} {...a11yProps} as="img" />
      )
    }
  }
}

export default Img
export { Img }
