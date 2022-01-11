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
/** @jsxFrag React.Fragment */
import React, { Component } from 'react'

import { testable } from '@instructure/ui-testable'
import { Options } from '@instructure/ui-options'

import { withStyle, jsx } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'

import { propTypes, allowedProps } from './props'
import type { DrilldownHeaderProps } from './props'

import { DrilldownSeparator } from '../DrilldownSeparator'

/**
---
parent: Drilldown
id: Drilldown.Header
---
@module DrilldownHeader
@tsProps
**/
@withStyle(generateStyle, generateComponentTheme)
@testable()
class DrilldownHeader extends Component<DrilldownHeaderProps> {
  static readonly componentId = 'Drilldown.Header'

  static propTypes = propTypes
  static allowedProps = allowedProps
  static defaultProps = {}

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
    // const { styles } = this.props

    return (
      <>
        <Options.Item>Back</Options.Item>
        <Options.Item>Title</Options.Item>
        <Options.Item>Select all</Options.Item>
        <DrilldownSeparator />
      </>
    )
  }
}

export default DrilldownHeader
export { DrilldownHeader }
