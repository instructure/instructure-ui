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
import { Component } from 'react'
import PropTypes from 'prop-types'

import {
  passthroughProps,
  callRenderProp,
  deprecated
} from '@instructure/ui-react-utils'
import { View } from '@instructure/ui-view'

import { withStyle, jsx } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'

/**
---
parent: Tabs
id: Tabs.Tab
---
**/
@withStyle(generateStyle, generateComponentTheme)
@deprecated('8.0.0', {
  selected: 'isSelected',
  disabled: 'isDisabled'
})
class Tab extends Component {
  static propTypes = {
    // eslint-disable-next-line react/require-default-props
    makeStyles: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    styles: PropTypes.object,
    variant: PropTypes.oneOf(['default', 'secondary']),
    id: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    controls: PropTypes.string.isRequired,
    isDisabled: PropTypes.bool,
    isSelected: PropTypes.bool,
    onClick: PropTypes.func,
    onKeyDown: PropTypes.func,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    /**
     * __Deprecated - use `isDisabled` instead__
     */
    disabled: PropTypes.bool,
    /**
     * __Deprecated - use `isSelected` instead__
     */
    selected: PropTypes.bool
  }

  static defaultProps = {
    children: null,
    variant: 'default',
    isDisabled: false,
    disabled: undefined,
    isSelected: false,
    selected: undefined,
    onClick: (event, { index, id }) => {},
    onKeyDown: (event, { index, id }) => {}
  }

  componentDidMount() {
    this.props.makeStyles()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.props.makeStyles()
  }

  handleClick = (event) => {
    const { onClick, index, id, disabled, isDisabled } = this.props

    if (disabled || isDisabled) {
      return
    }

    onClick(event, { index, id })
  }

  handleKeyDown = (event) => {
    const { onKeyDown, index, id, disabled, isDisabled } = this.props

    if (disabled || isDisabled) {
      return
    }

    onKeyDown(event, { index, id })
  }

  render() {
    const {
      id,
      variant,
      selected,
      disabled,
      controls,
      children,
      styles,
      ...props
    } = this.props

    const isSelected = selected || props.isSelected
    const isDisabled = disabled || props.isDisabled

    return (
      <View
        {...passthroughProps(props)}
        as="div"
        role="tab"
        id={id}
        onClick={this.handleClick}
        onKeyDown={this.handleKeyDown}
        css={styles.tab}
        aria-selected={isSelected ? 'true' : null}
        aria-disabled={isDisabled ? 'true' : null}
        aria-controls={controls}
        tabIndex={isSelected && !isDisabled ? '0' : null}
      >
        {callRenderProp(children)}
      </View>
    )
  }
}

export default Tab
export { Tab }
