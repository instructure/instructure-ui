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

import { Flex, FlexItem } from '@instructure/ui-flex'
import { View } from '@instructure/ui-view'
import { themeable } from '@instructure/ui-themeable'

import styles from './styles.css'
import theme from './theme'

@themeable(theme, styles)
class ColorBand extends Component {
  static propTypes = {
    height: PropTypes.string
  }

  static defaultProps = {
    height: '1.25rem'
  }

  render() {
    return (
      <View
        display="block"
        background="brand"
        aria-hidden="true"
        height={this.props.height}
      >
        <Flex height="100%" alignItems="stretch" justifyItems="end">
          <FlexItem size="7%">
            <span
              className={classnames({
                [styles.tile]: true,
                [styles.colorAlert]: true
              })}
            ></span>
          </FlexItem>
          <FlexItem size="10%">
            <span
              className={classnames({
                [styles.tile]: true,
                [styles.colorWarning]: true
              })}
            ></span>
          </FlexItem>
          <FlexItem size="15%">
            <span
              className={classnames({
                [styles.tile]: true,
                [styles.colorDanger]: true
              })}
            ></span>
          </FlexItem>
        </Flex>
      </View>
    )
  }
}

export default ColorBand
export { ColorBand }
