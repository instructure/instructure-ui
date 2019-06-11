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

import { View } from '@instructure/ui-layout'
import { testable } from '@instructure/ui-testable'
import { themeable, ThemeablePropTypes } from '@instructure/ui-themeable'
import { passthroughProps } from '@instructure/ui-react-utils'
import { Transition } from '@instructure/ui-motion'

import styles from './styles.css'
import theme from './theme'

/**
---
parent: TabList
id: TabList.Panel
---
**/
@testable()
@themeable(theme, styles)
class TabPanel extends Component {
  static propTypes = {
    /**
    * The content that will be rendered in the corresponding <Tab /> and will label
    * this `<TabPanel />` for screen readers
    */
    title: PropTypes.node.isRequired,
    children: PropTypes.node,
    variant: PropTypes.oneOf(['simple', 'minimal']),
    maxHeight: PropTypes.string,
    id: PropTypes.string,
    labelledBy: PropTypes.string,
    selected: PropTypes.bool,
    disabled: PropTypes.bool,
    padding: ThemeablePropTypes.spacing,
    textAlign: PropTypes.oneOf(['start', 'center', 'end']),
    /**
    * A ref to this `<TabPanel />` component instance
    */
    tabRef: PropTypes.func
  }

  static defaultProps = {
    children: null,
    maxHeight: undefined,
    disabled: false,
    textAlign: undefined,
    id: null,
    variant: 'simple',
    labelledBy: null,
    selected: false,
    padding: 'small',
    tabRef: (el) => {}
  }

  render () {
    const {
      selected,
      disabled,
      labelledBy,
      variant,
      id,
      maxHeight,
      padding,
      textAlign,
      children,
      ...props
    } = this.props
    const isHidden = !selected || !!disabled
    return (
      <div
        {...passthroughProps(props)}
        className={classnames({
          [styles.root]: true,
          [styles[variant]]: true
        })}
        role="tabpanel"
        id={id}
        aria-labelledby={labelledBy}
        aria-hidden={isHidden ? 'true' : null}
      >
        <Transition
          type="fade"
          in={!isHidden}
          unmountOnExit
          transitionExit={false}
        >
          <View
            className={classnames({
              [styles.content]: true,
              [styles.overflow]: maxHeight
            })}
            maxHeight={maxHeight}
            as="div"
            padding={padding}
            textAlign={textAlign}
          >
            {children}
          </View>
        </Transition>
      </div>
    )
  }
}

export default TabPanel
export { TabPanel }
