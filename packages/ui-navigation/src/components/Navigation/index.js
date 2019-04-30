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

import React, { Component, Children } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import testable from '@instructure/ui-testable'
import themeable from '@instructure/ui-themeable'
import { controllable, Children as ChildrenPropTypes } from '@instructure/ui-prop-types'
import { omitProps } from '@instructure/ui-react-utils/lib/omitProps'
import safeCloneElement from '@instructure/ui-react-utils/lib/safeCloneElement'
import IconMoveStartLine from '@instructure/ui-icons/lib/IconMoveStartLine'

import ScreenReaderContent from '@instructure/ui-a11y/lib/ScreenReaderContent'
import NavigationItem from './NavigationItem'

import styles from './styles.css'
import theme from './theme'

const navMinimized = ({ minimized }) => ({ minimized: !minimized })

/**
---
category: components
---
**/
@testable()
@themeable(theme, styles)
class Navigation extends Component {
  static propTypes = {
    /**
    * children of type NavigationItem
    */
    children: ChildrenPropTypes.oneOf([NavigationItem]),
    /**
    * When minimized is set to true, the `<Navigation />` shows icons only while the text becomes a tooltip. When it is set to false, the `<Navigation />` shows text in addition to the icons
    */
    minimized: controllable(
      PropTypes.bool,
      'onMinimized',
      'defaultMinimized'
    ),
    /**
    * Whether the <Navigation /> is initially minimized (uncontrolled)
    */
    defaultMinimized: PropTypes.bool,
    onMinimized: PropTypes.func,
    /**
    * Screen reader label for the main Navigation
    */
    label: PropTypes.string.isRequired,
    /**
    * Screen reader label for the toggle button expanded/minimized state
    */
    toggleLabel: PropTypes.shape({
      expandedLabel: PropTypes.string,
      minimizedLabel: PropTypes.string
    }).isRequired,
    /**
    * If the NavigationItem goes to a new page, pass an href
    */
    href: PropTypes.string,
    /**
    * If the NavigationItem does not go to a new page pass an onClick
    */
    onClick: PropTypes.func,
  }

  static defaultProps = {
    children: null,
    defaultMinimized: false,
    onMinimized: function (event, minimized) {},
    onClick: function (e) {},
    href: undefined,
    minimized: undefined
  }

  constructor (props) {
    super()

    this.state = {
      minimized: this.isControlled(props) ? props.minimized : !!props.defaultMinimized
    }
  }

  get minimized () {
    if (this.isControlled()) {
      return !!this.props.minimized
    }
    return !!this.state.minimized
  }

  isControlled (props = this.props) {
    return typeof props.minimized === 'boolean'
  }

  handleNavToggle = (event) => {
    if (!this.isControlled()) {
      this.setState(navMinimized)
    }

    this.props.onMinimized(event, !this.minimized)
  }

  renderChildren () {
    return Children.map(this.props.children, (child) => {
      const navItem = safeCloneElement(child, {
        minimized: this.state.minimized
      })
      return (
        <li className={styles.list}>
          {navItem}
        </li>
      )
    })
  }

  toggleMessage () {
    return (this.state.minimized) ?
      this.props.toggleLabel.minimizedLabel :
      this.props.toggleLabel.expandedLabel
  }

  render () {
    const {
      label
    } = this.props

    const props = omitProps(this.props, Navigation.propTypes, ['minimized'])

    const navClasses = classnames({
      [styles.root]: true,
      [styles.minimized]: this.minimized
    })

    return (
      <nav
        {...props}
        className={navClasses}
        aria-label={label}
      >
        <ul className={styles.content}>
          {this.renderChildren()}
        </ul>
        <div
          className={styles.toggle}>
          <NavigationItem
            aria-expanded={!this.minimized}
            onClick={this.handleNavToggle}
            icon={<IconMoveStartLine className={styles.toggleIcon}/>}
            label={<ScreenReaderContent>{this.toggleMessage()}</ScreenReaderContent>}
          >
          </NavigationItem>
        </div>
      </nav>
    )
  }
}

export default Navigation
export { default as NavigationItem } from './NavigationItem'
