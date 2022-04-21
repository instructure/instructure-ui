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

import {
  omitProps,
  getElementType,
  callRenderProp,
  withDeterministicId
} from '@instructure/ui-react-utils'
import { testable } from '@instructure/ui-testable'

import { withStyle, jsx } from '@instructure/emotion'

import generateStyles from './styles'
import generateComponentTheme from './theme'
import type { OptionsItemProps, OptionsItemStyle } from './props'
import { allowedProps, propTypes } from './props'

/**
---
parent: Options
id: Options.Item
---
@tsProps
**/
@withDeterministicId()
@withStyle(generateStyles, generateComponentTheme)
@testable()
class Item extends Component<OptionsItemProps> {
  static readonly componentId = 'Options.Item'

  static allowedProps = allowedProps
  static propTypes = propTypes

  static defaultProps = {
    as: 'span',
    variant: 'default',
    role: 'listitem',
    beforeLabelContentVAlign: 'center',
    afterLabelContentVAlign: 'center'
  } as const

  ref: Element | null = null

  private readonly _descriptionId: string

  constructor(props: OptionsItemProps) {
    super(props)

    this._descriptionId = props.deterministicId!('OptionsItem-description')
  }

  componentDidMount() {
    this.props.makeStyles?.()
  }

  componentDidUpdate() {
    this.props.makeStyles?.()
  }

  renderContent(
    renderLabel:
      | OptionsItemProps['renderBeforeLabel']
      | OptionsItemProps['renderAfterLabel'],
    contentVariant:
      | OptionsItemStyle['contentBefore']
      | OptionsItemStyle['contentAfter']
  ) {
    const { styles, variant, as, role, children } = this.props

    return (
      <span
        css={[styles?.content, contentVariant]}
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
    const {
      as,
      href,
      role,
      styles,
      description,
      descriptionRole,
      renderBeforeLabel,
      renderAfterLabel,
      elementRef,
      children
    } = this.props

    const ElementType = getElementType(Item, this.props, () => as!)

    const InnerElementType = href ? 'a' : 'span'

    const passthroughProps = omitProps(this.props, Item.allowedProps)

    const childrenContent = callRenderProp(children)
    const descriptionContent = callRenderProp(description)

    return (
      <ElementType
        role="none"
        css={styles?.item}
        // @ts-expect-error TODO: fix produces an union that is too complex to represent
        ref={(element: Element | null) => {
          this.ref = element

          if (typeof elementRef === 'function') {
            elementRef(element)
          }
        }}
      >
        <InnerElementType
          {...passthroughProps}
          css={styles?.container}
          role={href ? undefined : role}
          href={href}
          aria-describedby={
            this.props['aria-describedby'] ||
            (descriptionContent ? this._descriptionId : undefined)
          }
        >
          {childrenContent}
          {descriptionContent && (
            <span
              css={styles?.description}
              role={descriptionRole}
              id={this._descriptionId}
            >
              {descriptionContent}
            </span>
          )}
        </InnerElementType>
        {renderBeforeLabel &&
          this.renderContent(renderBeforeLabel, styles?.contentBefore)}
        {renderAfterLabel &&
          this.renderContent(renderAfterLabel, styles?.contentAfter)}
      </ElementType>
    )
  }
}

export default Item
export { Item }
