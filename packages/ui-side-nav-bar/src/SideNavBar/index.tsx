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
import { Component, Children, ReactElement, isValidElement } from 'react'

import { testable } from '@instructure/ui-testable'

import { omitProps, safeCloneElement } from '@instructure/ui-react-utils'
import { IconMoveStartLine } from '@instructure/ui-icons'
import { ScreenReaderContent } from '@instructure/ui-a11y-content'
import { withStyle } from '@instructure/emotion'

import { SideNavBarItem } from './SideNavBarItem'

import generateStyle from './styles'
import generateComponentTheme from './theme'
import type { SideNavBarProps, SideNavBarState } from './props'
import { allowedProps, propTypes } from './props'

const navMinimized = ({ minimized }: { minimized: boolean }) => ({
  minimized: !minimized
})

/**
---
category: components
---
**/
@withStyle(generateStyle, generateComponentTheme)
@testable()
class SideNavBar extends Component<SideNavBarProps, SideNavBarState> {
  static readonly componentId = 'SideNavBar'

  static allowedProps = allowedProps
  static propTypes = propTypes

  static defaultProps = {
    children: null,
    defaultMinimized: false,
    // TODO we should investigate later if it used or not
    onClick: function (_e: React.MouseEvent) {}
  }

  static Item = SideNavBarItem

  ref: Element | null = null

  constructor(props: SideNavBarProps) {
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
    if (typeof this.props.onMinimized === 'function') {
      this.props.onMinimized(event, !this.minimized)
    }
  }

  renderChildren() {
    return Children.map(this.props.children, (child) => {
      if (!isValidElement(child)) return null
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

    const props = omitProps(this.props, SideNavBar.allowedProps, ['minimized'])

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
        <SideNavBarItem
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
        ></SideNavBarItem>
      </nav>
    )
  }
}

export default SideNavBar
export { SideNavBar, SideNavBarItem }
