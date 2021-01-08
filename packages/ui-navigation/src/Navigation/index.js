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
import { Component, Children } from 'react'
import PropTypes from 'prop-types'

import { testable } from '@instructure/ui-testable'
import {
  controllable,
  Children as ChildrenPropTypes
} from '@instructure/ui-prop-types'
import { omitProps, safeCloneElement } from '@instructure/ui-react-utils'
import { IconMoveStartLine } from '@instructure/ui-icons'
import { ScreenReaderContent } from '@instructure/ui-a11y-content'
import { withStyle, jsx } from '@instructure/emotion'

import { NavigationItem } from './NavigationItem'

import generateStyle from './styles'
import generateComponentTheme from './theme'

const navMinimized = ({ minimized }) => ({ minimized: !minimized })

/**
---
category: components
---
**/
@withStyle(generateStyle, generateComponentTheme)
@testable()
class Navigation extends Component {
  static propTypes = {
    // eslint-disable-next-line react/require-default-props
    makeStyles: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    styles: PropTypes.object,
    /**
     * children of type Navigation.Item
     */
    children: ChildrenPropTypes.oneOf([NavigationItem]),
    /**
     * When minimized is set to true, the `<Navigation />` shows icons only while the text becomes a tooltip. When it is set to false, the `<Navigation />` shows text in addition to the icons
     */
    minimized: controllable(PropTypes.bool, 'onMinimized', 'defaultMinimized'),
    /**
     * Whether the `<Navigation />` is initially minimized (uncontrolled)
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
     * If the `<Navigation.Item>` goes to a new page, pass an href
     */
    href: PropTypes.string,
    /**
     * If the `<Navigation.Item>` does not go to a new page pass an onClick
     */
    onClick: PropTypes.func
  }

  static defaultProps = {
    children: null,
    defaultMinimized: false,
    onMinimized: function (event, minimized) {},
    onClick: function (e) {},
    href: undefined,
    minimized: undefined
  }

  static Item = NavigationItem

  constructor(props) {
    super()

    this.state = {
      minimized: this.isControlled(props)
        ? props.minimized
        : !!props.defaultMinimized
    }
  }

  componentDidMount() {
    this.props.makeStyles({ minimized: this.minimized })
  }

  componentDidUpdate() {
    this.props.makeStyles({ minimized: this.minimized })
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

  handleNavToggle = (event) => {
    if (!this.isControlled()) {
      this.setState(navMinimized)
    }

    this.props.onMinimized(event, !this.minimized)
  }

  renderChildren() {
    return Children.map(this.props.children, (child) => {
      const navItem = safeCloneElement(child, {
        minimized: this.state.minimized
      })
      return <li css={this.props.styles.list}>{navItem}</li>
    })
  }

  toggleMessage() {
    return this.state.minimized
      ? this.props.toggleLabel.minimizedLabel
      : this.props.toggleLabel.expandedLabel
  }

  render() {
    const { label } = this.props

    const props = omitProps(this.props, Navigation.propTypes, ['minimized'])

    return (
      <nav {...props} css={this.props.styles.navigation} aria-label={label}>
        <ul css={this.props.styles.content}>{this.renderChildren()}</ul>
        <div css={this.props.styles.toggle}>
          <NavigationItem
            aria-expanded={!this.minimized}
            onClick={this.handleNavToggle}
            icon={
              <IconMoveStartLine
                css={this.props.styles.toggleIcon}
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
