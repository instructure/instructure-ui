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
import { Component, Children, ReactElement } from 'react'
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

type Props = {
  makeStyles?: (...args: any[]) => any
  styles?: any
  minimized?: any // TODO: controllable(PropTypes.bool, 'onMinimized', 'defaultMinimized')
  defaultMinimized?: boolean
  onMinimized?: (...args: any[]) => any
  label: string
  toggleLabel: {
    expandedLabel?: string
    minimizedLabel?: string
  }
  href?: string
  onClick?: (...args: any[]) => any
}

// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'minimized' implicitly has an 'any... Remove this comment to see the full error message
const navMinimized = ({ minimized }) => ({ minimized: !minimized })

/**
---
category: components
---
**/
@withStyle(generateStyle, generateComponentTheme)
@testable()
class Navigation extends Component<Props> {
  static readonly componentId = 'Navigation'

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
    // @ts-expect-error ts-migrate(6133) FIXME: 'event' is declared but its value is never read.
    onMinimized: function (event, minimized) {},
    // @ts-expect-error ts-migrate(6133) FIXME: 'e' is declared but its value is never read.
    onClick: function (e) {},
    href: undefined,
    minimized: undefined
  }

  static Item = NavigationItem

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
  constructor(props) {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1-2 arguments, but got 0.
    super()

    this.state = {
      minimized: this.isControlled(props)
        ? props.minimized
        : !!props.defaultMinimized
    }
  }

  componentDidMount() {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles({ minimized: this.minimized })
  }

  componentDidUpdate() {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles({ minimized: this.minimized })
  }

  get minimized() {
    if (this.isControlled()) {
      return !!this.props.minimized
    }
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'minimized' does not exist on type 'Reado... Remove this comment to see the full error message
    return !!this.state.minimized
  }

  isControlled(props = this.props) {
    return typeof props.minimized === 'boolean'
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
  handleNavToggle = (event) => {
    if (!this.isControlled()) {
      this.setState(navMinimized)
    }

    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.onMinimized(event, !this.minimized)
  }

  renderChildren() {
    return Children.map(this.props.children, (child) => {
      const navItem = safeCloneElement(child as ReactElement, {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'minimized' does not exist on type 'Reado... Remove this comment to see the full error message
        minimized: this.state.minimized
      })
      return <li css={this.props.styles.list}>{navItem}</li>
    })
  }

  toggleMessage() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'minimized' does not exist on type 'Reado... Remove this comment to see the full error message
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
