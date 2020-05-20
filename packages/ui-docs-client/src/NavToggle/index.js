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

import { ApplyTheme } from '@instructure/ui-themeable'
import { ToggleDetails } from '@instructure/ui-toggle-details'
import { Text } from '@instructure/ui-text'
import { View } from '@instructure/ui-view'

class NavToggle extends Component {
  static propTypes = {
    summary: PropTypes.string.isRequired,
    variant: PropTypes.oneOf(['section', 'category']),
    children: PropTypes.node
  }

  static defaultProps = {
    variant: 'section',
    children: null
  }

  focus () {
    this._toggle.focus()
  }

  render () {
    const {
      summary,
      variant,
      ...props
    } = this.props

    const isSection = variant === 'section'

    const summaryContent = (
      <View display="block">
        <Text
          transform="capitalize"
          size="medium"
          color="primary"
          lineHeight="fit"
        >
          {summary}
        </Text>
      </View>
    )

    return (
      <View
        display="block"
        padding="x-small none"
        margin={isSection ? 'none' : 'none none none x-small'}
      >
        <ApplyTheme theme={ApplyTheme.generateTheme('instructure')}>
          <ToggleDetails
            ref={(c) => { this._toggle = c }}
            fluidWidth
            {...props}
            summary={summaryContent}
          />
        </ApplyTheme>
      </View>
    )
  }
}

export default NavToggle
export { NavToggle }
