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

import { View } from '@instructure/ui-view'
import { testable } from '@instructure/ui-testable'
import { omitProps } from '@instructure/ui-react-utils'

import {
  withStyle,
  jsx,
  ThemeablePropTypes,
  Spacing
} from '@instructure/emotion'
import generateStyle from './styles'
import generateComponentTheme from './theme'

type Props = {
  padding?: Spacing
  elementRef?: (...args: any[]) => any
  as?: React.ReactElement
  variant?: 'default' | 'inverse'
  overflow?: 'scroll' | 'fit'
  makeStyles?: (...args: any[]) => any
  styles?: any
}

/**
---
parent: Modal
id: Modal.Body
---
**/
@withStyle(generateStyle, generateComponentTheme, ['variant'])
@testable()
class ModalBody extends Component<Props> {
  static componentId = 'Modal.Body'

  static propTypes = {
    children: PropTypes.node,
    padding: ThemeablePropTypes.spacing,
    elementRef: PropTypes.func,
    as: PropTypes.elementType,
    variant: PropTypes.oneOf(['default', 'inverse']),
    overflow: PropTypes.oneOf(['scroll', 'fit']),

    // eslint-disable-next-line react/require-default-props
    makeStyles: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    styles: PropTypes.object
  }

  static defaultProps = {
    padding: 'medium',
    as: 'div',
    variant: 'default',
    children: null,
    elementRef: undefined,
    overflow: undefined
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
    const { as, elementRef, overflow, variant, padding, children, ...rest } =
      this.props

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'omitViewProps' does not exist on type 't... Remove this comment to see the full error message
    const passthroughProps = View.omitViewProps(
      omitProps(rest, ModalBody.propTypes),
      ModalBody
    )
    const isFit = overflow === 'fit'

    return (
      <View
        {...passthroughProps}
        display="block"
        width={isFit ? '100%' : null}
        height={isFit ? '100%' : null}
        elementRef={elementRef}
        as={as}
        css={this.props.styles.modalBody}
        padding={padding}
        tabIndex="-1" // prevent FF from focusing view when scrollable
      >
        {children}
      </View>
    )
  }
}

export default ModalBody
export { ModalBody }
