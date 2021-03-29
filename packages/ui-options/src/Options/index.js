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
import { Component, Children } from 'react'
import PropTypes from 'prop-types'

import { Children as ChildrenPropTypes } from '@instructure/ui-prop-types'
import {
  omitProps,
  matchComponentTypes,
  callRenderProp,
  safeCloneElement
} from '@instructure/ui-react-utils'
import { testable } from '@instructure/ui-testable'
import { uid } from '@instructure/uid'

import { View } from '@instructure/ui-view'

import { withStyle, jsx } from '@instructure/emotion'

import generateStyles from './styles'
import generateComponentTheme from './theme'

import { Item } from './Item'
import { Separator } from './Separator'

/**
---
category: components
---
**/
@withStyle(generateStyles, generateComponentTheme)
@testable()
class Options extends Component {
  static Item = Item
  static Separator = Separator

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
     * The aria role of the element
     */
    role: PropTypes.string,
    /**
     * The the actual list element
     */
    elementRef: PropTypes.func,
    /**
     * Content to render as a label. Mostly for when the component is nested
     */
    renderLabel: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    children: ChildrenPropTypes.oneOf(['Options', 'Item', 'Separator'])
  }

  static defaultProps = {
    as: 'span',
    role: 'list',
    elementRef: (node) => {},
    renderLabel: null,
    children: null
  }

  componentDidMount() {
    this.props.makeStyles()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.props.makeStyles()
  }

  _labelId = uid('Options-label')

  get childAs() {
    const { as } = this.props
    if (as === 'ul' || as === 'ol') {
      return 'li'
    }
    return undefined
  }

  renderLabel() {
    const { renderLabel, styles } = this.props
    return (
      <span id={this._labelId} role="presentation" css={styles.label}>
        {callRenderProp(renderLabel)}
      </span>
    )
  }

  renderSubList(children) {
    const { styles } = this.props
    return (
      <Item as={this.childAs} role="presentation" css={styles.label}>
        {children}
      </Item>
    )
  }

  renderChildren() {
    const { children } = this.props

    return Children.map(children, (child) => {
      if (matchComponentTypes(child, ['Options'])) {
        return this.renderSubList(child)
      }

      if (matchComponentTypes(child, ['Item', 'Separator'])) {
        return safeCloneElement(child, { as: this.childAs })
      }
    })
  }

  render() {
    const passthroughProps = View.omitViewProps(
      omitProps(this.props, Options.propTypes),
      Options
    )

    const { as, role, elementRef, renderLabel, styles } = this.props

    return (
      <div css={styles.options} role="presentation">
        {renderLabel && this.renderLabel()}
        <View
          {...passthroughProps}
          elementRef={elementRef}
          css={styles.list}
          as={as}
          role={role}
          display="block"
          margin="none"
          padding="none"
          background="primary"
          aria-labelledby={renderLabel && this._labelId}
        >
          {this.renderChildren()}
        </View>
      </div>
    )
  }
}

export default Options
export { Options }
