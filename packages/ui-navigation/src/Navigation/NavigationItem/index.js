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

import { testable } from '@instructure/ui-testable'
import { themeable } from '@instructure/ui-themeable'
import { omitProps, getElementType } from '@instructure/ui-react-utils'
import { Tooltip } from '@instructure/ui-overlays'
import { hasVisibleChildren } from '@instructure/ui-a11y'

import styles from './styles.css'
import theme from './theme'

/**
---
parent: Navigation
---
**/
@testable()
@themeable(theme, styles)
class NavigationItem extends Component {
  static propTypes = {
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
    onClick: function (e, selected) {},
    selected: false,
    minimized: false,
    href: undefined
  }

  renderLink () {
    const ElementType = getElementType(NavigationItem, this.props)

    const {
      href,
      onClick,
      selected,
      icon,
      label
    } = this.props

    const classes = classnames ({
      [styles.root]: true,
      [styles.selected]: selected
    })

    const props = omitProps(this.props, NavigationItem.propTypes)

    return (
      <ElementType
        {...props}
        href={href}
        onClick={onClick}
        className={classes}
        aria-label={this.props.minimized ? label: null}
      >
        <div className={styles.icon} aria-hidden="true">
          {icon}
        </div>
        {
          !this.props.minimized ? (
           <div className={styles.label}>
              {label}
            </div>
          ) : null
        }
      </ElementType>
    )
  }

  render () {
    const {
      minimized,
      label
    } = this.props

    const link = this.renderLink()

    return (
      minimized && hasVisibleChildren(label) ? (
        <Tooltip tip={label} placement='end'>
          {link}
        </Tooltip>
      ) : link
    )
  }
}

export default NavigationItem
export { NavigationItem }
