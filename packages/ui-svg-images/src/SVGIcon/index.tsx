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

import { testable } from '@instructure/ui-testable'

import { InlineSVG } from '../InlineSVG'

import { withStyle, jsx } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'

type Props = {
  makeStyles?: (...args: any[]) => any
  styles?: any
  // TODO: ...InlineSVG.propTypes,
  rotate?: '0' | '90' | '180' | '270'
  size?: 'x-small' | 'small' | 'medium' | 'large' | 'x-large'
  bidirectional?: boolean
}

/**
---
category: components/utilities
---
**/
@withStyle(generateStyle, generateComponentTheme)
@testable()
class SVGIcon extends Component<Props> {
  static componentId = 'SVGIcon'

  static propTypes = {
    // @ts-expect-error ts-migrate(2783) FIXME: 'makeStyles' is specified more than once, so this ... Remove this comment to see the full error message
    // eslint-disable-next-line react/require-default-props
    makeStyles: PropTypes.func,
    // @ts-expect-error ts-migrate(2783) FIXME: 'styles' is specified more than once, so this usag... Remove this comment to see the full error message
    // eslint-disable-next-line react/require-default-props
    styles: PropTypes.object,
    ...InlineSVG.propTypes,
    rotate: PropTypes.oneOf(['0', '90', '180', '270']),
    size: PropTypes.oneOf(['x-small', 'small', 'medium', 'large', 'x-large']),
    bidirectional: PropTypes.bool
  }

  static defaultProps = {
    rotate: '0',
    bidirectional: false,
    size: undefined
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

  render() {
    const {
      rotate,
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'className' does not exist on type 'Reado... Remove this comment to see the full error message
      className,
      size,
      bidirectional,
      // 'makeStyles' and 'styles' need to be added here,
      // so it won't be passed to InlineSVG via '...props'
      makeStyles,
      styles,
      ...props
    } = this.props

    return (
      <InlineSVG
        {...props}
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ rotate: "0" | "90" | "180" | "270" | undef... Remove this comment to see the full error message
        rotate={rotate}
        css={styles.svgIcon}
        className={className}
      />
    )
  }
}

export default SVGIcon
export { SVGIcon }
