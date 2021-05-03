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

import { testable } from '@instructure/ui-testable'
import { omitProps, getElementType } from '@instructure/ui-react-utils'
import { Tooltip } from '@instructure/ui-tooltip'
import { hasVisibleChildren } from '@instructure/ui-a11y-utils'
import { withStyle, jsx } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'

type Props = {
  makeStyles?: (...args: any[]) => any
  styles?: any
  icon: React.ReactNode
  label: React.ReactNode
  as?: React.ReactElement
  href?: string
  onClick?: (...args: any[]) => any
  selected?: boolean
  minimized?: boolean
}

/**
---
parent: Navigation
id: Navigation.Item
---
**/
@withStyle(generateStyle, generateComponentTheme)
@testable()
class NavigationItem extends Component<Props> {
  static propTypes = {
    // eslint-disable-next-line react/require-default-props
    makeStyles: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    styles: PropTypes.object,
    /**
     * The visual to display (ex. an Image, Logo, Avatar, or Icon)
     */
    icon: PropTypes.node.isRequired,
    /**
     * The text to display  for the Navigation Link
     */
    label: PropTypes.node.isRequired,
    /**
     * The element type to render as (will default to `<a>` if href is provided)
     */
    as: PropTypes.elementType,
    /**
     * If the NavigationItem goes to a new page, pass an href
     */
    href: PropTypes.string,
    /**
     * If the NavigationItem does not go to a new page pass an onClick
     */
    onClick: PropTypes.func,
    /**
     * Denotes which NavigationItem is currently selected
     */
    selected: PropTypes.bool,
    /**
     * When minimized is set to true, the `<Navigation />` shows icons only while the text becomes a tooltip. When it is set to false, the `<Navigation />` shows text in addition to the icons
     */
    minimized: PropTypes.bool
  }

  static defaultProps = {
    as: 'a',
    // @ts-expect-error ts-migrate(6133) FIXME: 'e' is declared but its value is never read.
    onClick: function (e, selected) {},
    selected: false,
    minimized: false,
    href: undefined
  }

  componentDidMount() {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles({ minimized: this.minimized })
  }

  componentDidUpdate() {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles({ minimized: this.minimized })
  }

  renderLink() {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
    const ElementType = getElementType(NavigationItem, this.props)

    const { href, onClick, icon, label } = this.props

    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
    const props = omitProps(this.props, NavigationItem.propTypes)

    return (
      // @ts-expect-error ts-migrate(2322) FIXME: Type '{ children: (Element | null)[]; href: string... Remove this comment to see the full error message
      <ElementType
        {...props}
        href={href}
        onClick={onClick}
        css={this.props.styles.navigationItem}
        aria-label={this.props.minimized ? label : null}
      >
        <div css={this.props.styles.icon} aria-hidden="true">
          {icon}
        </div>
        {!this.props.minimized ? (
          <div css={this.props.styles.label}>{label}</div>
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
