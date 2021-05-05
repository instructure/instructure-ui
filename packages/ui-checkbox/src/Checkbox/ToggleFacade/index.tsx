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

import { IconCheckSolid, IconXSolid } from '@instructure/ui-icons'

import { withStyle, jsx } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'

type Props = {
  makeStyles?: (...args: any[]) => any
  styles?: any
  checked?: boolean
  disabled?: boolean
  readOnly?: boolean
  focused?: boolean
  size?: 'small' | 'medium' | 'large'
  labelPlacement?: 'top' | 'start' | 'end'
}

/**
---
parent: Checkbox
---
**/
@withStyle(generateStyle, generateComponentTheme)
class ToggleFacade extends Component<Props> {
  static propTypes = {
    // eslint-disable-next-line react/require-default-props
    makeStyles: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    styles: PropTypes.object,
    children: PropTypes.node.isRequired,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    focused: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    labelPlacement: PropTypes.oneOf(['top', 'start', 'end'])
  }

  static defaultProps = {
    checked: false,
    focused: false,
    size: 'medium',
    disabled: false,
    readOnly: false,
    labelPlacement: 'end'
  }

  componentDidMount() {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles()
  }

  // @ts-expect-error ts-migrate(6133) FIXME: 'prevProps' is declared but its value is never rea... Remove this comment to see the full error message
  componentDidUpdate(prevProps, prevState, snapshot) {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles()
  }

  renderIcon() {
    const { styles, checked } = this.props

    if (checked) {
      return <IconCheckSolid css={styles.iconSVG} />
    } else {
      return <IconXSolid css={styles.iconSVG} />
    }
  }

  renderLabel() {
    const { children, styles } = this.props

    return <span css={styles.label}>{children}</span>
  }

  render() {
    const { labelPlacement, styles } = this.props

    return (
      <span css={styles.toggleFacade}>
        {(labelPlacement === 'top' || labelPlacement === 'start') &&
          this.renderLabel()}
        <span css={styles.facade} aria-hidden="true">
          <span css={styles.icon}>
            <span css={styles.iconToggle}>{this.renderIcon()}</span>
          </span>
        </span>
        {labelPlacement === 'end' && this.renderLabel()}
      </span>
    )
  }
}

export default ToggleFacade
export { ToggleFacade }
