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
import { callRenderProp, omitProps } from '@instructure/ui-react-utils'
import { uid } from '@instructure/uid'
import { testable } from '@instructure/ui-testable'
import { logError as error } from '@instructure/console'

import { withStyle, jsx, ThemeablePropTypes } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'

/**
---
category: components
---
**/
@withStyle(generateStyle, generateComponentTheme)
@testable()
class Spinner extends Component {
  static propTypes = {
    // eslint-disable-next-line react/require-default-props
    makeStyles: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    styles: PropTypes.object,
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
    as: PropTypes.elementType
  }

  static defaultProps = {
    renderTitle: undefined,
    as: 'div',
    size: 'medium',
    variant: 'default',
    margin: undefined,
    elementRef: undefined
  }

  constructor(props) {
    super(props)

    this.titleId = uid('Spinner')
  }

  componentDidMount() {
    this.props.makeStyles()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.props.makeStyles()
  }

  radius() {
    switch (this.props.size) {
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

  render() {
    const passthroughProps = View.omitViewProps(
      omitProps(this.props, Spinner.propTypes),
      Spinner
    )

    const hasTitle = this.props.renderTitle
    error(
      hasTitle,
      '[Spinner] The renderTitle prop is necessary for screen reader support.'
    )

    return (
      <View
        {...passthroughProps}
        as={this.props.as}
        elementRef={this.props.elementRef}
        css={this.props.styles.spinner}
        margin={this.props.margin}
      >
        <svg
          css={this.props.styles.circle}
          role="img"
          aria-labelledby={this.titleId}
          focusable="false"
        >
          <title id={this.titleId}>
            {callRenderProp(this.props.renderTitle)}
          </title>
          <g role="presentation">
            {this.props.variant !== 'inverse' && (
              <circle
                css={this.props.styles.circleTrack}
                cx="50%"
                cy="50%"
                r={this.radius()}
              />
            )}
            <circle
              css={this.props.styles.circleSpin}
              cx="50%"
              cy="50%"
              r={this.radius()}
            />
          </g>
        </svg>
      </View>
    )
  }
}

export default Spinner
export { Spinner }
