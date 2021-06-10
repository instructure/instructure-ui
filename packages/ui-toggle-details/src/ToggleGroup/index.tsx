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

import {
  omitProps,
  pickProps,
  getElementType
} from '@instructure/ui-react-utils'
import { IconButton } from '@instructure/ui-buttons'
import { Transition } from '@instructure/ui-motion'
import { Expandable } from '@instructure/ui-expandable'
import { controllable } from '@instructure/ui-prop-types'
import { isActiveElement } from '@instructure/ui-dom-utils'
import { Flex } from '@instructure/ui-flex'
import { View } from '@instructure/ui-view'
import {
  IconArrowOpenEndSolid,
  IconArrowOpenDownSolid
} from '@instructure/ui-icons'
import { testable } from '@instructure/ui-testable'

type Props = {
  summary: React.ReactNode
  toggleLabel: React.ReactNode | ((...args: any[]) => any)
  as?: React.ReactElement
  elementRef?: (...args: any[]) => any
  size?: 'small' | 'medium' | 'large'
  expanded?: any // TODO: controllable(PropTypes.bool, 'onToggle', 'defaultExpanded')
  defaultExpanded?: boolean
  onToggle?: (...args: any[]) => any
  icon?: React.ReactNode | ((...args: any[]) => any)
  iconExpanded?: React.ReactNode | ((...args: any[]) => any)
  transition?: boolean
  border?: boolean
}

/**
---
category: components
---
**/
@testable()
class ToggleGroup extends Component<Props> {
  static componentId = 'ToggleGroup'

  static propTypes = {
    /**
     * the content to show and hide
     */
    children: PropTypes.node.isRequired,
    /**
     * the content area next to the toggle button
     */
    summary: PropTypes.node.isRequired,
    /**
     * provides a screenreader label for the toggle button
     * (takes `expanded` as an argument if a function)
     */
    toggleLabel: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
      .isRequired,
    /**
     * the element type to render as
     */
    as: PropTypes.elementType,
    /**
     * provides a reference to the underlying html root element
     */
    elementRef: PropTypes.func,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    /**
     * Whether the content is expanded or hidden
     */
    expanded: controllable(PropTypes.bool, 'onToggle', 'defaultExpanded'),
    /**
     * Whether the content is initially expanded or hidden (uncontrolled)
     */
    defaultExpanded: PropTypes.bool,
    /**
     * Fired when the content display is toggled
     */
    onToggle: PropTypes.func,
    /**
     * The icon displayed in the toggle button when the content is hidden
     */
    icon: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    /**
     * The icon displayed in the toggle button when the content is showing
     */
    iconExpanded: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    /**
     * Transition content into view
     */
    transition: PropTypes.bool,
    /**
     * Toggle the border around the component
     */
    border: PropTypes.bool
  }

  static defaultProps = {
    expanded: undefined,
    size: 'medium',
    icon: IconArrowOpenEndSolid,
    iconExpanded: IconArrowOpenDownSolid,
    defaultExpanded: false,
    // @ts-expect-error ts-migrate(6133) FIXME: 'event' is declared but its value is never read.
    onToggle: function (event, expanded) {},
    transition: true,
    as: 'span',
    // @ts-expect-error ts-migrate(6133) FIXME: 'el' is declared but its value is never read.
    elementRef: (el) => {},
    border: true
  }

  _button = null
  _shouldTransition = false

  get focused() {
    return isActiveElement(this._button)
  }

  focus() {
    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    this._button.focus()
  }

  componentDidMount() {
    this._shouldTransition = true
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'expanded' implicitly has an 'any' type.
  renderIcon(expanded) {
    const Icon = expanded ? this.props.iconExpanded : this.props.icon
    // @ts-expect-error ts-migrate(2604) FIXME: JSX element type 'Icon' does not have any construc... Remove this comment to see the full error message
    return <Icon />
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'toggleProps' implicitly has an 'any' ty... Remove this comment to see the full error message
  renderToggle(toggleProps, expanded) {
    const { toggleLabel, size } = this.props
    let label
    if (typeof toggleLabel === 'function') {
      label = toggleLabel(expanded)
    } else {
      label = toggleLabel
    }
    return (
      <IconButton
        {...toggleProps}
        withBackground={false}
        withBorder={false}
        size={size === 'large' ? 'medium' : 'small'}
        elementRef={(el) => {
          this._button = el
        }}
        screenReaderLabel={label}
      >
        {this.renderIcon(expanded)}
      </IconButton>
    )
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'detailsProps' implicitly has an 'any' t... Remove this comment to see the full error message
  renderDetails(detailsProps) {
    return (
      <View
        {...detailsProps}
        display="block"
        borderWidth="small none none none"
      >
        {this.props.transition && this._shouldTransition ? (
          <Transition transitionOnMount in type="fade">
            {this.props.children}
          </Transition>
        ) : (
          this.props.children
        )}
      </View>
    )
  }

  render() {
    const Element = getElementType(ToggleGroup, this.props)

    return (
      <Expandable {...pickProps(this.props, Expandable.propTypes)}>
        {/* @ts-expect-error ts-migrate(7031) FIXME: Binding element 'expanded' implicitly has an 'any'... Remove this comment to see the full error message */}
        {({ expanded, getToggleProps, getDetailsProps }) => {
          return (
            <View
              {...omitProps(this.props, ToggleGroup.propTypes)}
              borderWidth={this.props.border ? 'small' : 'none'}
              as={Element}
              elementRef={this.props.elementRef}
              display="block"
              borderRadius="medium"
              background="primary"
            >
              <Flex
                padding={
                  this.props.size === 'small'
                    ? 'x-small'
                    : 'small small small x-small'
                }
              >
                <Flex.Item>
                  {this.renderToggle(getToggleProps(), expanded)}
                </Flex.Item>
                <Flex.Item shouldGrow shouldShrink padding="0 0 0 x-small">
                  {this.props.summary}
                </Flex.Item>
              </Flex>
              {expanded ? (
                this.renderDetails(getDetailsProps())
              ) : (
                <span {...getDetailsProps()} />
              )}
            </View>
          )
        }}
      </Expandable>
    )
  }
}

export default ToggleGroup
export { ToggleGroup }
