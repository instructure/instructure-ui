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

import { SVGIcon } from '@instructure/ui-svg-images'
import { IconCheckMarkSolid } from '@instructure/ui-icons'

import { withStyle, jsx } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'

/**
---
parent: Checkbox
---
**/
@withStyle(generateStyle, generateComponentTheme)
class CheckboxFacade extends Component {
  static propTypes = {
    // eslint-disable-next-line react/require-default-props
    makeStyles: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    styles: PropTypes.object,
    children: PropTypes.node.isRequired,
    checked: PropTypes.bool,
    focused: PropTypes.bool,
    hovered: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    /**
     * Visual state showing that child checkboxes are a combination of checked and unchecked
     */
    indeterminate: PropTypes.bool
  }

  static defaultProps = {
    checked: false,
    focused: false,
    hovered: false,
    size: 'medium',
    indeterminate: false
  }

  componentDidMount() {
    this.props.makeStyles()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.props.makeStyles()
  }

  renderIcon() {
    if (this.props.indeterminate) {
      return (
        <SVGIcon viewBox="0 0 1920 1920" inline={false}>
          <rect x="140" y="820" width="1640" height="280" />
        </SVGIcon>
      )
    } else if (this.props.checked) {
      return <IconCheckMarkSolid inline={false} />
    } else {
      return null
    }
  }

  render() {
    const { children, styles } = this.props

    return (
      <span css={styles.checkboxFacade}>
        <span css={styles.facade} aria-hidden="true">
          {this.renderIcon()}
        </span>
        <span css={styles.label}>{children}</span>
      </span>
    )
  }
}

export default CheckboxFacade
export { CheckboxFacade }
