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

import React, { Component, Children } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { Children as ChildrenPropTypes } from '@instructure/ui-prop-types'
import { omitProps, matchComponentTypes, callRenderProp, safeCloneElement, experimental } from '@instructure/ui-react-utils'
import { themeable } from '@instructure/ui-themeable'
import { testable } from '@instructure/ui-testable'
import { uid } from '@instructure/uid/lib/uid'

import { View } from '@instructure/ui-layout'
import { Item } from './Item'
import { Separator } from './Separator'

import styles from './styles.css'
import theme from './theme'

/**
---
category: components
experimental: true
---
**/
@testable()
@experimental()
@themeable(theme, styles)
class Options extends Component {
  static Item = Item
  static Separator = Separator

  static propTypes = {
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

  _labelId = uid('Options-label')

  get childAs () {
    const { as } = this.props
    if (as === 'ul' || as === 'ol') {
      return 'li'
    }
    return undefined
  }

  renderLabel () {
    const { renderLabel } = this.props
    return (
      <span
        id={this._labelId}
        role="presentation"
        className={classnames({
          [styles.label]: true
        })}
      >
        {callRenderProp(renderLabel)}
      </span>
    )
  }

  renderSubList (children) {
    return (
      <Item
        as={this.childAs}
        role="presentation"
        className={styles.label}
      >
        {children}
      </Item>
    )
  }

  renderChildren () {
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

  render () {
    const passthroughProps = View.omitViewProps(
      omitProps(this.props, Options.propTypes),
      Options
    )

    const {
      as,
      role,
      elementRef,
      renderLabel
    } = this.props

    return (
      <div
        className={styles.root}
        role="presentation"
      >
        {renderLabel && this.renderLabel()}
        <View
          {...passthroughProps}
          elementRef={elementRef}
          className={styles.list}
          as={as}
          role={role}
          display="block"
          margin="none"
          padding="none"
          background="default"
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
