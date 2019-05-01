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

import ToggleDetails from '@instructure/ui-toggle-details/lib/components/ToggleDetails'
import Text from '@instructure/ui-elements/lib/Text'

export default class NavToggle extends Component {
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

    const sectionStyles = {
      color: '#0084D1',
      textWeight: 'light',
      textTransform: 'uppercase',
      textSize: 'medium'
    }

    const categoryStyles = {
      color: '#333',
      textWeight: 'normal',
      textTransform: 'capitalize',
      textSize: 'medium'
    }

    const styles = variant === 'section' ? sectionStyles : categoryStyles

    const toggleTheme = {
      iconColor: styles.color
    }

    const typographyTheme = {
      primaryColor: styles.color
    }

    const summaryContent = (
      <Text
        weight={styles.textWeight}
        transform={styles.textTransform}
        size={styles.textSize}
        theme={typographyTheme}
        color="primary"
      >
        {summary}
      </Text>
    )

    return (
      <ToggleDetails
        ref={(c) => { this._toggle = c }}
        variant="default"
        theme={toggleTheme}
        fluidWidth
        {...props}
        summary={summaryContent}
      />
    )
  }
}
