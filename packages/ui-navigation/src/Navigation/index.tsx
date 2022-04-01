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
import React, { Component, Children, ReactElement } from 'react'

import { testable } from '@instructure/ui-testable'

import {
  deprecated,
  omitProps,
  safeCloneElement
} from '@instructure/ui-react-utils'
import { IconMoveStartLine } from '@instructure/ui-icons'
import { ScreenReaderContent } from '@instructure/ui-a11y-content'
import { withStyle, jsx } from '@instructure/emotion'

import { NavigationItem } from './NavigationItem'

import generateStyle from './styles'
import generateComponentTheme from './theme'
import type { NavigationProps, NavigationState } from './props'
import { allowedProps, propTypes } from './props'

const navMinimized = ({ minimized }: { minimized: boolean }) => ({
  minimized: !minimized
})

/**
---
category: components/deprecated
---
@tsProps
**/

@withStyle(generateStyle, generateComponentTheme)
@testable()
@deprecated('9.0.0', null, 'No one uses <Navigation>, so we will deprecate it.')
class Navigation extends Component<NavigationProps, NavigationState> {
  static readonly componentId = 'Navigation'

  static allowedProps = allowedProps
  static propTypes = propTypes

  static defaultProps = {
    children: null,
    defaultMinimized: false,
    onMinimized: function (
      _event: React.SyntheticEvent,
      _minimized: boolean
    ) {},
    onClick: function (_e: React.MouseEvent) {}
  }

  static Item = NavigationItem

  ref: Element | null = null

  constructor(props: NavigationProps) {
    super(props)

    this.state = {
      minimized: this.isControlled(props)
        ? !!props.minimized
        : !!props.defaultMinimized
    }
  }

  componentDidMount() {
    this.props.makeStyles?.({ minimized: this.minimized })
  }

  componentDidUpdate() {
    this.props.makeStyles?.({ minimized: this.minimized })
  }

  get minimized() {
    if (this.isControlled()) {
      return !!this.props.minimized
    }
    return !!this.state.minimized
  }

  isControlled(props = this.props) {
    return typeof props.minimized === 'boolean'
  }

  handleNavToggle = (event: React.SyntheticEvent) => {
    if (!this.isControlled()) {
      this.setState(navMinimized)
    }
    this.props.onMinimized!(event, !this.minimized)
  }

  renderChildren() {
    return Children.map(this.props.children, (child) => {
      const navItem = safeCloneElement(child as ReactElement, {
        minimized: this.state.minimized
      })
      return <li css={this.props.styles?.list}>{navItem}</li>
    })
  }

  toggleMessage() {
    return this.state.minimized
      ? this.props.toggleLabel.minimizedLabel
      : this.props.toggleLabel.expandedLabel
  }

  render() {
    const { label } = this.props

    const props = omitProps(this.props, Navigation.allowedProps, ['minimized'])

    return (
      <nav
        {...props}
        css={this.props.styles?.navigation}
        aria-label={label}
        ref={(element) => {
          this.ref = element
        }}
      >
        <ul css={this.props.styles?.content}>{this.renderChildren()}</ul>
        <div css={this.props.styles?.toggle}>
          <NavigationItem
            aria-expanded={!this.minimized}
            onClick={this.handleNavToggle}
            icon={
              <IconMoveStartLine
                css={this.props.styles?.toggleIcon}
                inline={false}
              />
            }
            label={
              <ScreenReaderContent>{this.toggleMessage()}</ScreenReaderContent>
            }
          ></NavigationItem>
        </div>
      </nav>
    )
  }
}

export default Navigation
export { Navigation, NavigationItem }
