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
import { Component } from 'react'
import PropTypes from 'prop-types'

import { View } from '@instructure/ui-view'
import { ThemeablePropTypes } from '@instructure/ui-themeable'
import { passthroughProps } from '@instructure/ui-react-utils'
import { supportsObjectFit } from '@instructure/ui-dom-utils'
import { withStyle, jsx } from '@instructure/emotion'

import generateStyles from './styles'

/**
---
category: components
---
**/
@withStyle(generateStyles)
class Img extends Component {
  componentDidMount() {
    this.props.makeStyles(this.state)
  }

  componentDidUpdate() {
    this.props.makeStyles(this.state)
  }

  static propTypes = {
    makeStyles: PropTypes.func,
    styles: PropTypes.object,
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
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }

  static defaultProps = {
    makeStyles: undefined,
    styles: {},
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
    const blur = `blur(${this.props.styles.imageBlurAmount})`
    const grayscale = 'grayscale(1)'

    if (this.props.withGrayscale && this.props.withBlur) {
      return `${blur} ${grayscale}`
    } else if (this.props.withGrayscale) {
      return grayscale
    } else if (this.props.withBlur) {
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
      ...props
    } = this.props

    const a11yProps = {
      alt: alt || ''
    }

    const imageProps = {
      css: this.props.styles.img,
      src
    }

    const containerProps = {
      ...passthroughProps(props),
      width,
      height,
      margin,
      display,
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
        <View {...rootProps} as="span" css={this.props.styles.view}>
          {
            !hasBackground && <img {...imageProps} {...a11yProps} /> // eslint-disable-line jsx-a11y/alt-text
          }
          {overlay && <span css={this.props.styles.overlay} />}
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
