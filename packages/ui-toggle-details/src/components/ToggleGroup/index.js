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

import { omitProps, pickProps } from '@instructure/ui-utils/lib/react/passthroughProps'
import getElementType from '@instructure/ui-utils/lib/react/getElementType'
import Button from '@instructure/ui-buttons/lib/components/Button'
import ScreenReaderContent from '@instructure/ui-a11y/lib/components/ScreenReaderContent'
import Transition from '@instructure/ui-motion/lib/components/Transition'
import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'
import isActiveElement from '@instructure/ui-utils/lib/dom/isActiveElement'

import Flex, { FlexItem } from '@instructure/ui-layout/lib/components/Flex'
import View from '@instructure/ui-layout/lib/components/View'
import IconArrowOpenEnd from '@instructure/ui-icons/lib/Solid/IconArrowOpenEnd'
import IconArrowOpenDown from '@instructure/ui-icons/lib/Solid/IconArrowOpenDown'

import Expandable from '../Expandable'

/**
---
category: components/navigation
---
**/
class ToggleGroup extends Component {
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
    toggleLabel: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.func
    ]).isRequired,
    /**
    * the element type to render as
    */
    as: CustomPropTypes.elementType,
    /**
    * provides a reference to the underlying html root element
    */
    elementRef: PropTypes.func,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    /**
    * Whether the content is expanded or hidden
    */
    expanded: CustomPropTypes.controllable(
      PropTypes.bool,
      'onToggle',
      'defaultExpanded'
    ),
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
    size: 'medium',
    icon: IconArrowOpenEnd,
    iconExpanded: IconArrowOpenDown,
    defaultExpanded: false,
    onToggle: function (event, expanded) {},
    transition: true,
    as: 'span',
    elementRef: (el) => {},
    border: true
  }

  _button = null
  _shouldTransition = false

  get focused () {
    return isActiveElement(this._button)
  }

  focus () {
    this._button.focus()
  }

  componentDidMount () {
    this._shouldTransition = true
  }

  renderIcon (expanded) {
    const Icon = expanded ? this.props.iconExpanded : this.props.icon
    return <Icon />
  }

  renderToggle (toggleProps, expanded) {
    const { toggleLabel, size } = this.props
    let label
    if (typeof toggleLabel === 'function') {
      label = toggleLabel(expanded)
    } else {
      label = toggleLabel
    }
    return (
      <Button
        {...toggleProps}
        variant="icon"
        size={(size === 'large') ? 'medium' : 'small'}
        buttonRef={(el) => {
          this._button = el
        }}
        icon={this.renderIcon(expanded)}
      >
        <ScreenReaderContent>{label}</ScreenReaderContent>
      </Button>
    )
  }

  renderDetails (detailsProps) {
    return (
      <View
        {...detailsProps}
        display="block"
        borderWidth="small none none none"
      >
        {(this.props.transition && this._shouldTransition) ?
          <Transition transitionOnMount in type="fade">
            {this.props.children}
          </Transition> : this.props.children
        }
      </View>
    )
  }

  render () {
    const Element = getElementType(ToggleGroup, this.props)

    return (
      <Expandable
        {...pickProps(this.props, Expandable.propTypes)}
      >
      {({ expanded, getToggleProps, getDetailsProps }) => {
        return (
          <View
            {...omitProps(this.props, ToggleGroup.propTypes)}
            borderWidth={(this.props.border) ? 'small' : 'none'}
            as={Element}
            elementRef={this.props.elementRef}
            display="block"
            borderRadius="medium"
            background="default"
          >
            <Flex padding={(this.props.size === 'small') ? 'x-small' : 'small small small x-small'}>
              <FlexItem>
                {this.renderToggle(getToggleProps(), expanded)}
              </FlexItem>
              <FlexItem grow shrink padding="0 0 0 x-small">
                {this.props.summary}
              </FlexItem>
            </Flex>
            {expanded ? this.renderDetails(getDetailsProps()) : <span {...getDetailsProps()} />}
          </View>
        )
      }}
      </Expandable>
    )
  }
}

export default ToggleGroup
