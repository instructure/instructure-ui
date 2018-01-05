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

import IconX from '@instructure/ui-icons/lib/Solid/IconX'

import themeable from '@instructure/ui-themeable'
import { omitProps, pickProps } from '@instructure/ui-utils/lib/react/passthroughProps'
import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'

import Button from '../Button'
import ScreenReaderContent from '../ScreenReaderContent'

import styles from './styles.css'
import theme from './theme'

/**
---
category: components/utilities
---
**/
@themeable(theme, styles)
class CloseButton extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    buttonRef: PropTypes.func,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    onClick: PropTypes.func,
    margin: CustomPropTypes.spacing,
    placement: PropTypes.oneOf(['start', 'end', 'static']),
    offset: PropTypes.oneOf(['none', 'x-small', 'small', 'medium']),
    variant: PropTypes.oneOf(['icon', 'icon-inverse'])
  }

  static defaultProps = {
    onClick: (event) => {},
    buttonRef: (el) => {},
    variant: 'icon',
    placement: 'static',
    offset: 'x-small',
    size: 'small',
    margin: '0'
  }

  render () {
    const { placement, offset } = this.props

    return (
      <span
        {...omitProps(this.props, CloseButton.propTypes)}
        className={classnames({
          [styles.root]: true,
          [styles[`placement--${placement}`]]: placement,
          [styles[`offset--${offset}`]]: offset
        })}
      >
        <Button {...pickProps(this.props, Button.propTypes)}>
          <IconX />
          <ScreenReaderContent>
            {this.props.children}
          </ScreenReaderContent>
        </Button>
      </span>
    )
  }
}

export default CloseButton
