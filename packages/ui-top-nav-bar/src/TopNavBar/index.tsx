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

import { omitProps } from '@instructure/ui-react-utils'
import { testable } from '@instructure/ui-testable'

import { withStyle, jsx } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'

import { propTypes, allowedProps } from './props'
import type {
  TopNavBarProps,
  TopNavBarState,
  TopNavBarStyleProps
} from './props'

/**
---
category: components/WIP
---
@isWIP
**/
@withStyle(generateStyle, generateComponentTheme)
@testable()
class TopNavBar extends Component<TopNavBarProps, TopNavBarState> {
  static readonly componentId = 'TopNavBar'

  static propTypes = propTypes
  static allowedProps = allowedProps
  static defaultProps = {
    /**
     * FIXME: defaultProps go here
     */
  }

  ref: HTMLDivElement | Element | null = null

  handleRef = (el: HTMLDivElement | null) => {
    const { elementRef } = this.props

    this.ref = el

    if (typeof elementRef === 'function') {
      elementRef(el)
    }
  }

  constructor(props: TopNavBarProps) {
    super(props)

    this.state = {
      /**
       * FIXME: If needed, state goes here
       */
    }
  }

  componentDidMount() {
    this.props.makeStyles?.(this.makeStylesVariables)
  }

  componentDidUpdate() {
    this.props.makeStyles?.(this.makeStylesVariables)
  }

  get makeStylesVariables(): TopNavBarStyleProps {
    return {
      /**
       * FIXME: If needed, props that gets passed to makeStyles come here
       */
    }
  }

  render() {
    const { children, elementRef, styles, ...props } = this.props

    return (
      <div
        {...omitProps(props, allowedProps)}
        ref={this.handleRef}
        css={styles?.topNavBar}
      >
        {children}
      </div>
    )
  }
}

export { TopNavBar }
export default TopNavBar
