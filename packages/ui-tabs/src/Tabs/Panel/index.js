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
import { themeable, ThemeablePropTypes } from '@instructure/ui-themeable'
import { passthroughProps, deprecated } from '@instructure/ui-react-utils'
import { Transition } from '@instructure/ui-motion'

import styles from './styles.css'
import theme from './theme'

/**
---
parent: Tabs
id: Tabs.Panel
---
**/
@deprecated('7.0.0', {
  title: 'renderTitle',
  selected: 'isSelected',
  disabled: 'isDisabled'
})
@themeable(theme, styles)
class Panel extends Component {
  static propTypes = {
    /**
    * The content that will be rendered in the corresponding <Tab /> and will label
    * this `<Tabs.Panel />` for screen readers
    */
    renderTitle: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
    children: PropTypes.node,
    variant: PropTypes.oneOf(['default', 'secondary']),
    isSelected: PropTypes.bool,
    isDisabled: PropTypes.bool,
    maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    minHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    id: PropTypes.string,
    labelledBy: PropTypes.string,
    padding: ThemeablePropTypes.spacing,
    textAlign: PropTypes.oneOf(['start', 'center', 'end']),
    /**
    * deprecated
    */
    title: PropTypes.node,
    /**
    * deprecated
    */
    selected: PropTypes.bool,
    /**
    * deprecated
    */
    disabled: PropTypes.bool,
    elementRef: PropTypes.func
  }

  static defaultProps = {
    children: null,
    id: undefined,
    disabled: undefined,
    isDisabled: false,
    maxHeight: undefined,
    minHeight: undefined,
    textAlign: 'start',
    variant: 'default',
    labelledBy: null,
    selected: undefined,
    isSelected: false,
    padding: 'small',
    title: undefined,
    elementRef: (el) => {}
  }

  render () {
    const {
      selected,
      disabled,
      labelledBy,
      variant,
      id,
      maxHeight,
      minHeight,
      padding,
      textAlign,
      children,
      elementRef,
      ...props
    } = this.props
    // TODO: clean this up when selected and disabled props are removed in 7.0:
    const isSelected = selected || props.isSelected
    const isDisabled = disabled || props.isDisabled
    const isHidden = !isSelected || !!isDisabled

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
        ref={elementRef}
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
            minHeight={minHeight}
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

export default Panel
export { Panel }
