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
import { passthroughProps } from '@instructure/ui-react-utils'
import { testable } from '@instructure/ui-testable'

import {
  withStyle,
  jsx,
  ThemeablePropTypes,
  Spacing
} from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'

type Props = {
  makeStyles?: (...args: any[]) => any
  styles?: any
  src: string
  alt?: string
  display?: 'inline-block' | 'block'
  margin?: Spacing
  overlay?: {
    color: string
    opacity: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
    blend?: 'normal' | 'multiply' | 'screen' | 'overlay' | 'color-burn'
  }
  withGrayscale?: boolean
  withBlur?: boolean
  constrain?: 'cover' | 'contain'
  elementRef?: (...args: any[]) => any
  height?: string | number
  width?: string | number
}

/**
---
category: components
---
**/
@withStyle(generateStyle, generateComponentTheme, [
  'overlay',
  'withBlur',
  'withGrayscale',
  'src',
  'constrain'
])
@testable()
class Img extends Component<Props> {
  static componentId = 'Img'

  static propTypes = {
    // eslint-disable-next-line react/require-default-props
    makeStyles: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
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

  componentDidMount() {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles()
  }

  componentDidUpdate() {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles()
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
      ...props
    } = this.props

    const a11yProps = {
      alt: alt || ''
    }

    const imageProps = {
      css: styles.img,
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

    if (overlay) {
      // if a background image is rendered we add the a11y props on the container element
      const rootProps = {
        ...containerProps
      }

      return (
        <View {...rootProps} as="span" css={styles.container}>
          {
            <img {...imageProps} {...a11yProps} /> // eslint-disable-line jsx-a11y/alt-text
          }
          {overlay && <span css={styles.overlay} />}
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
