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

import { omitProps, getElementType, callRenderProp, matchComponentTypes } from '@instructure/ui-react-utils'
import { themeable } from '@instructure/ui-themeable'
import { testable } from '@instructure/ui-testable'

import styles from './styles.css'
import theme from './theme'

/**
---
parent: Options
---
**/
@testable()
@themeable(theme, styles)
class Item extends Component {
  static propTypes = {
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
    */
    renderBeforeLabel: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    /**
    * Content to render after the label
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

  get containsList () {
    if (matchComponentTypes(this.props.children, ['Options'])) {
      return true
    }
    return false
  }

  renderContent (placement) {
    const {
      renderBeforeLabel,
      renderAfterLabel
    } = this.props

    const classes = {
      [styles.content]: true,
      [styles[`content--${placement}`]]: true
    }

    return (
      <span
        className={classnames(classes)}
        role="presentation"
        aria-hidden="true"
      >
        {placement === 'before' && callRenderProp(renderBeforeLabel)}
        {placement === 'after' && callRenderProp(renderAfterLabel)}
      </span>
    )
  }

  render () {
    const {
      as,
      role,
      variant,
      renderBeforeLabel,
      renderAfterLabel,
      children
    } = this.props

    const ElementType = getElementType(Item, this.props, () => (as))
    const passthroughProps = omitProps(this.props, Item.propTypes)
    const classes = {
      [styles.root]: true,
      [styles.isDisabled]: variant === 'disabled',
      [styles.isHighlighted]: variant === 'highlighted',
      [styles.isSelected]: variant === 'selected',
      [styles.containsList]: this.containsList,
      [styles.hasContentBeforeLabel]: renderBeforeLabel,
      [styles.hasContentAfterLabel]: renderAfterLabel
    }

    return (
      <ElementType
        role="none"
        className={classnames(classes)}
      >
        <span
          {...passthroughProps}
          className={styles.label}
          role={role}
        >
          {children}
        </span>
        {renderBeforeLabel && this.renderContent('before')}
        {renderAfterLabel && this.renderContent('after')}
      </ElementType>
    )
  }
}

export default Item
export { Item }
