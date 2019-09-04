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
import { passthroughProps } from '@instructure/ui-react-utils'
import { View } from '@instructure/ui-view'

import styles from './styles.css'
import theme from './theme'

/**
---
parent: TabList
id: TabList.Tab
---
**/
@testable()
@themeable(theme, styles)
class Tab extends Component {
  static propTypes = {
    variant: PropTypes.oneOf(['simple', 'minimal']),
    id: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    controls: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    selected: PropTypes.bool,
    onClick: PropTypes.func,
    onKeyDown: PropTypes.func,
    children: PropTypes.node
  }

  static defaultProps = {
    children: null,
    variant: 'simple',
    disabled: false,
    selected: false,
    onClick: function () {},
    onKeyDown: function () {}
  }

  handleClick = (e) => {
    if (this.props.disabled) {
      return
    }

    this.props.onClick(this.props.index, e)
  }

  handleKeyDown = (e) => {
    if (this.props.disabled) {
      return
    }

    this.props.onKeyDown(this.props.index, e)
  }

  render () {
    const {
      id,
      variant,
      selected,
      disabled,
      controls,
      children,
      ...props
    } = this.props

    return (
      <View
        {...passthroughProps(props)}
        as="div"
        role='tab'
        id={id}
        onClick={this.handleClick}
        onKeyDown={this.handleKeyDown}
        className={classnames({
          [styles.root]: true,
          [styles[variant]]: true
        })}
        aria-selected={selected ? 'true' : null}
        aria-disabled={disabled ? 'true' : null}
        aria-controls={controls}
        tabIndex={selected && !disabled ? '0' : null}
        __dangerouslyIgnoreExperimentalWarnings
      >
        {children}
      </View>
    )
  }
}

export default Tab
export { Tab }
