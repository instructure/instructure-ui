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

import { testable } from '@instructure/ui-testable'
import { omitProps, getElementType } from '@instructure/ui-react-utils'
import { Tooltip } from '@instructure/ui-tooltip'
import { hasVisibleChildren } from '@instructure/ui-a11y-utils'
import { withStyle, jsx } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'
import type { NavigationItemProps } from './props'
import { allowedProps, propTypes } from './props'

/**
---
parent: Navigation
id: Navigation.Item
---
**/
@withStyle(generateStyle, generateComponentTheme)
@testable()
class NavigationItem extends Component<NavigationItemProps> {
  static readonly componentId = 'Navigation.Item'

  static allowedProps = allowedProps
  static propTypes = propTypes

  static defaultProps = {
    as: 'a',
    // @ts-expect-error ts-migrate(6133) FIXME: 'e' is declared but its value is never read.
    onClick: function (e, selected) {},
    selected: false,
    minimized: false
  } as const

  componentDidMount() {
    this.props.makeStyles?.({ minimized: this.props.minimized })
  }

  componentDidUpdate() {
    this.props.makeStyles?.({ minimized: this.props.minimized })
  }

  renderLink() {
    const ElementType = getElementType(NavigationItem, this.props)

    const { href, onClick, icon, label } = this.props

    const props = omitProps(this.props, NavigationItem.propTypes)

    return (
      <ElementType
        {...props}
        href={href}
        onClick={onClick}
        css={this.props.styles?.navigationItem}
        //@ts-expect-error TODO: INSTUI-3245
        aria-label={this.props.minimized ? label : undefined}
      >
        <div css={this.props.styles?.icon} aria-hidden="true">
          {icon}
        </div>
        {!this.props.minimized ? (
          <div css={this.props.styles?.label}>{label}</div>
        ) : null}
      </ElementType>
    )
  }

  render() {
    const { minimized, label } = this.props

    const link = this.renderLink()

    return minimized && hasVisibleChildren(label) ? (
      <Tooltip renderTip={label} placement="end">
        {link}
      </Tooltip>
    ) : (
      link
    )
  }
}

export default NavigationItem
export { NavigationItem }
