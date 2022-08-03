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

import {
  matchComponentTypes,
  omitProps,
  safeCloneElement,
  withDeterministicId
} from '@instructure/ui-react-utils'
import { testable } from '@instructure/ui-testable'

import { withStyle, jsx, Global } from '@instructure/emotion'

import { Position } from '@instructure/ui-position'
import { Drilldown } from '@instructure/ui-drilldown'
import type { DrilldownProps } from '@instructure/ui-drilldown'

import { TopNavBarContext } from '../TopNavBarContext'

import generateStyle from './styles'
import generateComponentTheme from './theme'

import { propTypes, allowedProps } from './props'
import type {
  TopNavBarItemProps,
  TopNavBarItemState,
  TopNavBarItemStyleProps,
  DrilldownSubmenu
} from './props'

/**
---
parent: TopNavBar
id: TopNavBar.Item
---
@module TopNavBarItem
@isWIP
**/
@withDeterministicId()
@withStyle(generateStyle, generateComponentTheme)
@testable()
class TopNavBarItem extends Component<TopNavBarItemProps, TopNavBarItemState> {
  static readonly componentId = 'TopNavBar.Item'
  // TODO: add to the docs: makeing it static on parent and jsdocs parent/module settings, dont export child on its own

  static propTypes = propTypes
  static allowedProps = allowedProps
  static defaultProps = {
    /**
     * FIXME: defaultProps go here
     */
  }

  declare context: React.ContextType<typeof TopNavBarContext>
  static contextType = TopNavBarContext

  ref: HTMLDivElement | Element | null = null

  private readonly _submenuId

  handleRef = (el: HTMLDivElement | null) => {
    const { elementRef } = this.props

    this.ref = el

    if (typeof elementRef === 'function') {
      elementRef(el)
    }
  }

  constructor(props: TopNavBarItemProps) {
    super(props)

    this._submenuId = props.deterministicId!('TopNavBarItem-submenuId')

    this.state = {
      submenuContainerSelector: undefined
    }
  }

  componentDidMount() {
    this.props.makeStyles?.(this.makeStylesVariables)

    if (!this.state.submenuContainerSelector && this.shouldRenderSubmenu) {
      this.setState({
        submenuContainerSelector: `[${Position.locatorAttribute}="${this._submenuId}"]`
      })
    }
  }

  componentDidUpdate() {
    this.props.makeStyles?.(this.makeStylesVariables)
  }

  get makeStylesVariables(): TopNavBarItemStyleProps {
    return {
      layout: this.context.layout,
      submenuContainerSelector: this.state.submenuContainerSelector
    }
  }

  get shouldRenderSubmenu() {
    const { renderSubmenu } = this.props
    const isDesktop = this.context.layout === 'desktop'

    return isDesktop &&
      renderSubmenu &&
      matchComponentTypes(renderSubmenu, [Drilldown])
      ? renderSubmenu
      : null
  }

  renderDropdownMenu() {
    const { renderSubmenu, styles } = this.props

    if (!renderSubmenu) {
      return null
    }

    return (
      <>
        <Global styles={styles?.globalStyles} />
        {safeCloneElement<DrilldownSubmenu, Partial<DrilldownProps>>(
          renderSubmenu,
          {
            trigger: (
              <div
                style={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                {this.renderContent()}
              </div>
            ),
            id: this._submenuId,
            placement: 'bottom start',
            withArrow: false,
            minWidth: renderSubmenu.props?.minWidth || '18.5rem',
            maxHeight: renderSubmenu.props?.maxHeight || `calc(100vh - 10rem)`
          }
        )}
      </>
    )
  }

  renderContent() {
    const { children, styles } = this.props

    return (
      <div css={styles?.content}>
        {children}
        {this.shouldRenderSubmenu ? ` >` : ''}
      </div>
    )
  }

  render() {
    const { styles } = this.props

    return (
      <div
        {...omitProps(this.props, allowedProps)}
        ref={this.handleRef}
        css={styles?.topNavBarItem}
      >
        {this.shouldRenderSubmenu
          ? this.renderDropdownMenu()
          : this.renderContent()}
      </div>
    )
  }
}

export { TopNavBarItem }
export default TopNavBarItem
