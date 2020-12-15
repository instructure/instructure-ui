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
import { testable } from '@instructure/ui-testable'
import { passthroughProps } from '@instructure/ui-react-utils'

import { withStyle, jsx } from '@instructure/emotion'

import generateStyles from './styles'

/**
---
parent: InlineList
id: InlineList.Item
---
**/
@withStyle(generateStyles)
@testable()
class InlineListItem extends Component {
  static propTypes = {
    // eslint-disable-next-line react/require-default-props
    makeStyles: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    styles: PropTypes.object,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
    /**
     * Inherits delimiter from the parent InlineList component
     */
    delimiter: PropTypes.oneOf(['none', 'pipe', 'slash', 'arrow']),
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    /**
     * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
     * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
     * familiar CSS-like shorthand. For example: `margin="small auto large"`.
     */
    margin: ThemeablePropTypes.spacing,
    /**
     * Valid values are `0`, `none`, `xxx-small`, `xx-small`, `x-small`,
     * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
     * familiar CSS-like shorthand. For example: `padding="small x-large large"`.
     */
    padding: ThemeablePropTypes.spacing,
    /**
     * Inherits itemSpacing from the parent InlineList component
     */
    spacing: PropTypes.oneOf([
      'none',
      'xxx-small',
      'xx-small',
      'x-small',
      'small',
      'medium',
      'large',
      'x-large',
      'xx-large'
    ]),
    elementRef: PropTypes.func
  }

  static defaultProps = {
    padding: 'none',
    margin: undefined,
    spacing: 'none',
    delimiter: 'none',
    size: 'medium',
    elementRef: (el) => {}
  }

  componentDidMount() {
    this.props.makeStyles()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.props.makeStyles()
  }

  render() {
    const {
      delimiter,
      size,
      margin,
      padding,
      elementRef,
      children,
      spacing,
      styles,
      ...rest
    } = this.props

    return (
      <View
        {...passthroughProps(rest)}
        css={styles.inlineListItem}
        as="li"
        margin={margin}
        padding={padding}
        display="inline-block"
        maxWidth="100%"
        elementRef={elementRef}
      >
        {children}
        <span css={styles.delimiter} aria-hidden="true" />
      </View>
    )
  }
}

export default InlineListItem
export { InlineListItem }
