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

import testable from '@instructure/ui-testable'
import themeable from '@instructure/ui-themeable'
import findDOMNode from '@instructure/ui-dom-utils/lib/findDOMNode'

import styles from './styles.css'
import theme from './theme'

/**
---
parent: TabList
---
**/
@testable()
@themeable(theme, styles)
export default class Tab extends Component {
  static propTypes = {
    variant: PropTypes.oneOf(['simple', 'minimal', 'screenreader-only']),
    id: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    controls: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    selected: PropTypes.bool,
    focus: PropTypes.bool,
    onClick: PropTypes.func,
    onKeyDown: PropTypes.func,
    role: PropTypes.string,
    children: PropTypes.node
  }

  static defaultProps = {
    children: null,
    variant: 'simple',
    disabled: false,
    selected: false,
    focus: false,
    role: 'tab',
    onClick: function () {},
    onKeyDown: function () {}
  }

  handleClick = e => {
    if (this.props.disabled) {
      return
    }

    this.props.onClick(this.props.index, e)
  }

  handleKeyDown = e => {
    if (this.props.disabled) {
      return
    }

    this.props.onKeyDown(this.props.index, e)
  }

  syncNodeAttributes (node, props) {
    if (props.selected) {
      node.setAttribute('tabindex', 0)
      if (props.focus) {
        node.focus()
      }
    } else if (!props.disabled) {
      node.setAttribute('tabindex', -1)
    } else {
      node.removeAttribute('tabindex')
    }
  }

  componentDidMount () {
    this.syncNodeAttributes(findDOMNode(this), this.props)
  }

  componentDidUpdate () {
    this.syncNodeAttributes(findDOMNode(this), this.props)
  }

  renderIcon () {
    return <span className={styles.icon} aria-hidden="true" aria-label="" />
  }

  render () {
    const classes = {
      [styles.root]: true,
      [styles[this.props.variant]]: true
    }
    const icon = this.props.variant !== 'screenreader-only' && this.renderIcon()
    /* eslint-disable jsx-a11y/onclick-has-focus, jsx-a11y/no-static-element-interactions */
    return (
      <div
        className={classnames(classes)}
        role={this.props.role}
        id={this.props.id}
        onClick={this.handleClick}
        onKeyDown={this.handleKeyDown}
        aria-selected={this.props.selected ? 'true' : null}
        aria-disabled={this.props.disabled ? 'true' : null}
        aria-hidden={this.props.role === 'presentation' ? 'true' : null}
        aria-controls={this.props.controls}
      >
        {icon}
        {this.props.children}
      </div>
    )
    /* eslint-enable jsx-a11y/onclick-has-focus, jsx-a11y/no-static-element-interactions */
  }
}
