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
import React, { useMemo } from 'react'
import PropTypes from 'prop-types'

import { View } from '@instructure/ui-view'
import {
  callRenderProp,
  useDeprecated,
  omitProps
} from '@instructure/ui-react-utils'
import { ThemeablePropTypes } from '@instructure/ui-themeable'
import { uid } from '@instructure/uid'
import { withTestable } from '@instructure/ui-testable'
import { error } from '@instructure/console/macro'

import { useStyle, jsx } from '@instructure/emotion'
import generateStyle from './styles'

/**
---
category: components
---
**/
const Spinner = (props) => {
  useDeprecated({
    componentName: Spinner.name,
    version: '8.0.0',
    oldProps: {
      title: 'renderTitle'
    },
    props
  })

  const styles = useStyle(Spinner.name, generateStyle, props, {})

  const titleId = useMemo(() => uid('Spinner'), [])

  const radius = () => {
    switch (props.size) {
      case 'x-small':
        return '0.5em'
      case 'small':
        return '1em'
      case 'large':
        return '2.25em'
      default:
        return '1.75em'
    }
  }

  const passthroughProps = View.omitViewProps(
    omitProps(props, Spinner.propTypes),
    Spinner
  )

  const hasTitle = props.renderTitle || props.title
  error(
    hasTitle,
    '[Spinner] The renderTitle prop is necessary for screen reader support.'
  )

  return (
    <View
      {...passthroughProps}
      as={props.as}
      elementRef={props.elementRef}
      css={styles.root}
      margin={props.margin}
    >
      <svg
        css={styles.circle}
        role="img"
        aria-labelledby={titleId}
        focusable="false"
      >
        <title id={titleId}>{callRenderProp(props.renderTitle)}</title>
        <g role="presentation">
          {props.variant !== 'inverse' && (
            <circle css={styles.circleTrack} cx="50%" cy="50%" r={radius()} />
          )}
          <circle css={styles.circleSpin} cx="50%" cy="50%" r={radius()} />
        </g>
      </svg>
    </View>
  )
}

Spinner.propTypes = {
  /**
   * Give the spinner a title to be read by screenreaders
   */
  renderTitle: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  /**
   * Different-sized spinners
   */
  size: PropTypes.oneOf(['x-small', 'small', 'medium', 'large']),
  /**
   * Different color schemes for use with light or dark backgrounds
   */
  variant: PropTypes.oneOf(['default', 'inverse']),
  /**
   * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
   * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
   * familiar CSS-like shorthand. For example: `margin="small auto large"`.
   */
  margin: ThemeablePropTypes.spacing,
  elementRef: PropTypes.func,
  as: PropTypes.elementType,

  /**
   * __Deprecated - use `renderTitle` instead__
   */
  /* eslint-disable react/require-default-props */
  title: PropTypes.string
  /* eslint-enable react/require-default-props */
}

Spinner.defaultProps = {
  renderTitle: undefined,
  as: 'div',
  size: 'medium',
  variant: 'default',
  margin: undefined,
  elementRef: undefined
}

const Spinner__Testable = withTestable(Spinner)

export default Spinner__Testable
export { Spinner__Testable as Spinner }
