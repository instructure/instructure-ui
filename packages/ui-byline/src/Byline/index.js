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

import { ThemeablePropTypes } from '@instructure/ui-themeable'
import { omitProps } from '@instructure/ui-react-utils'
import { View } from '@instructure/ui-view'

import { withStyle, jsx } from '@instructure/emotion'

import generateStyle from './styles'

/**
---
category: components
---
**/
@withStyle(generateStyle)
class Byline extends Component {
  static propTypes = {
    // eslint-disable-next-line react/require-default-props
    makeStyles: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    styles: PropTypes.object,
    /**
     * the Byline visual/object
     */
    children: PropTypes.node.isRequired,
    /**
     * the Byline title
     */
    title: PropTypes.node,
    /**
     * the Byline description
     */
    description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    /**
     * how should the title and description align
     */
    alignContent: PropTypes.oneOf(['top', 'center']),
    /**
     * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
     * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
     * familiar CSS-like shorthand. For example: `margin="small auto large"`.
     */
    margin: ThemeablePropTypes.spacing,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    elementRef: PropTypes.func
  }

  static defaultProps = {
    alignContent: 'center',
    elementRef: undefined,
    margin: undefined,
    title: undefined,
    size: undefined,
    description: undefined
  }

  componentDidMount() {
    this.props.makeStyles()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.props.makeStyles()
  }

  render() {
    const passthroughProps = View.omitViewProps(
      omitProps(this.props, Byline.propTypes),
      Byline
    )

    return (
      <View
        {...passthroughProps}
        elementRef={this.props.elementRef}
        css={this.props.styles.byline}
        as="figure"
        margin={this.props.margin}
        maxWidth={this.props.styles.maxWidth}
      >
        <div css={this.props.styles.figure}>{this.props.children}</div>
        <figcaption css={this.props.styles.caption}>
          {this.props.title && (
            <span css={this.props.styles.title}>{this.props.title}</span>
          )}
          {this.props.description && (
            <div css={this.props.styles.description}>
              {this.props.description}
            </div>
          )}
        </figcaption>
      </View>
    )
  }
}

export default Byline
export { Byline }
