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

import { View } from '@instructure/ui-view'
import { passthroughProps } from '@instructure/ui-react-utils'
import { testable } from '@instructure/ui-testable'

import { withStyle, jsx } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'

import { propTypes, allowedProps } from './props'
import type { ImgProps } from './props'

/**
---
category: components
---
**/
@withStyle(generateStyle, generateComponentTheme)
@testable()
class Img extends Component<ImgProps> {
  static readonly componentId = 'Img'

  static propTypes = propTypes
  static allowedProps = allowedProps
  static defaultProps = {
    alt: '',
    display: 'inline-block',
    withGrayscale: false,
    withBlur: false
  }

  ref: Element | null = null

  handleRef = (el: Element | null) => {
    const { elementRef } = this.props

    this.ref = el

    if (typeof elementRef === 'function') {
      elementRef(el)
    }
  }

  componentDidMount() {
    this.props.makeStyles?.()
  }

  componentDidUpdate() {
    this.props.makeStyles?.()
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
      styles,
      loading,
      ...props
    } = this.props

    const a11yProps = {
      alt: alt || ''
    }

    const imageProps = {
      css: styles?.img,
      src,
      loading
    }

    const containerProps = {
      ...passthroughProps(props),
      width,
      height,
      margin,
      display,
      elementRef: this.handleRef
    }

    if (overlay) {
      // if a background image is rendered we add the a11y props on the container element
      const rootProps = {
        ...containerProps
      }

      return (
        <View {...rootProps} as="span" css={styles?.container}>
          {/* eslint-disable-next-line jsx-a11y/alt-text*/}
          {<img {...imageProps} {...a11yProps} />}
          {overlay && <span css={styles?.overlay} />}
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
