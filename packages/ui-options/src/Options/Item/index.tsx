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
  omitProps,
  getElementType,
  callRenderProp
} from '@instructure/ui-react-utils'
import { testable } from '@instructure/ui-testable'

import { withStyle, jsx } from '@instructure/emotion'

import generateStyles from './styles'
import generateComponentTheme from './theme'

type Props = {
  makeStyles?: (...args: any[]) => any
  styles?: any
  as?: React.ReactElement
  variant?: 'default' | 'highlighted' | 'selected' | 'disabled'
  role?: string
  renderBeforeLabel?: React.ReactNode | ((...args: any[]) => any)
  renderAfterLabel?: React.ReactNode | ((...args: any[]) => any)
}

/**
---
parent: Options
id: Options.Item
---
**/
@withStyle(generateStyles, generateComponentTheme)
@testable()
class Item extends Component<Props> {
  static componentId = 'Options.Item'

  static propTypes = {
    // eslint-disable-next-line react/require-default-props
    makeStyles: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    styles: PropTypes.object,
    /**
     * Element type to render as
     */
    as: PropTypes.elementType,
    /**
     * The style variant of the item
     */
    variant: PropTypes.oneOf([
      'default',
      'highlighted',
      'selected',
      'disabled'
    ]),
    /**
     * The aria role of the element
     */
    role: PropTypes.string,
    /**
     * Content to render before the label
     * (if you pass a function, it has the `props` as its parameter)
     */
    renderBeforeLabel: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    /**
     * Content to render after the label
     * (if you pass a function, it has the `props` as its parameter)
     */
    renderAfterLabel: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
  }

  static defaultProps = {
    as: 'span',
    variant: 'default',
    role: 'listitem',
    renderBeforeLabel: null,
    renderAfterLabel: null,
    children: null
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

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'renderLabel' implicitly has an 'any' ty... Remove this comment to see the full error message
  renderContent(renderLabel, contentVariant) {
    const { styles, variant, as, role, children } = this.props

    return (
      <span
        css={[styles.content, contentVariant]}
        role="presentation"
        aria-hidden="true"
      >
        {callRenderProp(renderLabel, {
          variant,
          as,
          role,
          children
        })}
      </span>
    )
  }

  render() {
    const { as, role, styles, renderBeforeLabel, renderAfterLabel, children } =
      this.props

    const ElementType = getElementType(Item, this.props, () => as!)
    const passthroughProps = omitProps(this.props, Item.propTypes)

    return (
      <ElementType role="none" css={styles.item}>
        <span {...passthroughProps} css={styles.container} role={role}>
          {children}
        </span>
        {renderBeforeLabel &&
          this.renderContent(renderBeforeLabel, styles.contentBefore)}
        {renderAfterLabel &&
          this.renderContent(renderAfterLabel, styles.contentAfter)}
      </ElementType>
    )
  }
}

export default Item
export { Item }
