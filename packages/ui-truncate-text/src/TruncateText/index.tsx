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
import React, { Component } from 'react'

import { debounce } from '@instructure/debounce'
import { canUseDOM, getBoundingClientRect } from '@instructure/ui-dom-utils'
import {
  safeCloneElement,
  ensureSingleChild,
  hack
} from '@instructure/ui-react-utils'
import { logError as error } from '@instructure/console'
import { testable } from '@instructure/ui-testable'
import { withStyle, jsx } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'

import truncate from './utils/truncate'
import { propTypes, allowedProps } from './props'
import type { TruncateTextProps } from './props'

/**
---
category: components
---
**/
@withStyle(generateStyle, generateComponentTheme)
@testable()
@hack(['shouldTruncateWhenInvisible'])
class TruncateText extends Component<TruncateTextProps> {
  static readonly componentId = 'TruncateText'

  static allowedProps = allowedProps
  static propTypes = propTypes

  static defaultProps = {
    maxLines: 1,
    ellipsis: '\u2026',
    truncate: 'character',
    position: 'end',
    ignore: [' ', '.', ','],
    debounce: 0,
    // @ts-expect-error ts-migrate(6133) FIXME: 'truncated' is declared but its value is never rea... Remove this comment to see the full error message
    onUpdate: (truncated, text) => {}
  }

  ref: Element | null = null

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
  constructor(props) {
    super(props)
    this.state = this.initialState
  }
  get _ref() {
    console.warn(
      '_ref property is deprecated and will be removed in v9, please use ref instead'
    )

    return this.ref
  }

  get initialState() {
    return {
      isTruncated: false,
      needsSecondRender: true,
      truncatedElement: null,
      truncatedText: null
    }
  }

  componentDidMount() {
    const { children, makeStyles } = this.props

    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    makeStyles()

    if (children) {
      this.checkChildren()
      // @ts-expect-error ts-migrate(2339) FIXME: Property '_text' does not exist on type 'TruncateT... Remove this comment to see the full error message
      this._text = ensureSingleChild(children)

      this.truncate()

      // @ts-expect-error ts-migrate(2339) FIXME: Property '_debounced' does not exist on type 'Trun... Remove this comment to see the full error message
      this._debounced = debounce(this.update, this.props.debounce, {
        leading: true,
        trailing: true
      })

      const { width: origWidth } = getBoundingClientRect(this.ref)
      // @ts-expect-error ts-migrate(2339) FIXME: Property '_resizeListener' does not exist on type ... Remove this comment to see the full error message
      this._resizeListener = new ResizeObserver((entries) => {
        // requestAnimationFrame call is needed becuase some truncatetext test cases
        // failed due to ResizeObserver was not able to deliver all observations within a single animation frame
        // see: https://stackoverflow.com/questions/49384120/resizeobserver-loop-limit-exceeded
        requestAnimationFrame(() => {
          for (const entry of entries) {
            const { width } = entry.contentRect

            if (origWidth !== width) {
              // @ts-expect-error ts-migrate(2339) FIXME: Property '_debounced' does not exist on type 'Trun... Remove this comment to see the full error message
              this.props.debounce === 0 ? this.update() : this._debounced()
            }
          }
        })
      })

      // @ts-expect-error ts-migrate(2339) FIXME: Property '_resizeListener' does not exist on type ... Remove this comment to see the full error message
      this._resizeListener.observe(this.ref)
    }
  }

  componentWillUnmount() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_resizeListener' does not exist on type ... Remove this comment to see the full error message
    if (this._resizeListener) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property '_resizeListener' does not exist on type ... Remove this comment to see the full error message
      this._resizeListener.disconnect()
    }

    // @ts-expect-error ts-migrate(2339) FIXME: Property '_debounced' does not exist on type 'Trun... Remove this comment to see the full error message
    if (this._debounced) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property '_debounced' does not exist on type 'Trun... Remove this comment to see the full error message
      this._debounced.cancel()
    }
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'prevProps' implicitly has an 'any' type... Remove this comment to see the full error message
  componentDidUpdate(prevProps) {
    const { children, onUpdate, makeStyles } = this.props

    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    makeStyles()

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'isTruncated' does not exist on type 'Rea... Remove this comment to see the full error message
    const { isTruncated, needsSecondRender, truncatedText } = this.state

    if (children) {
      if (prevProps !== this.props) {
        if (prevProps.children !== this.props.children) {
          // reset internal text variable if children change
          this.checkChildren()
          // @ts-expect-error ts-migrate(2339) FIXME: Property '_text' does not exist on type 'TruncateT... Remove this comment to see the full error message
          this._text = ensureSingleChild(children)
        }
        // require the double render whenever props change
        this.setState(this.initialState)
        return
      }

      // @ts-expect-error ts-migrate(2339) FIXME: Property '_wasTruncated' does not exist on type 'T... Remove this comment to see the full error message
      if (!needsSecondRender && (isTruncated || this._wasTruncated)) {
        // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
        onUpdate(isTruncated, truncatedText)
        // @ts-expect-error ts-migrate(2339) FIXME: Property '_wasTruncated' does not exist on type 'T... Remove this comment to see the full error message
        this._wasTruncated = isTruncated
      } else {
        this.truncate()
      }
    }
  }

  checkChildren() {
    error(
      !(() => {
        let isTooDeep = false
        const text = ensureSingleChild(this.props.children)!
        React.Children.forEach(text.props.children, (child) => {
          if (child.props) {
            React.Children.forEach(child.props.children, (grandChild) => {
              // currently we don't support node trees deeper than 2 levels
              // truncation will still occur on their text content, but their actual node structure will be lost
              if (grandChild.props) {
                isTooDeep = true
              }
            })
          }
        })
        return isTooDeep
      })(),
      `[TruncateText] Some children are too deep in the node tree and will not render.`
    )
  }

  update = () => {
    if (this.ref) {
      this.setState(this.initialState)
    }
  }

  truncate() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'needsSecondRender' does not exist on typ... Remove this comment to see the full error message
    if (!this.state.needsSecondRender) {
      return
    }

    if (canUseDOM) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property '_stage' does not exist on type 'Truncate... Remove this comment to see the full error message
      const result = truncate(this._stage, {
        ...this.props,
        parent: this.ref,
        lineHeight: this.props.styles?.lineHeight
      })
      if (result) {
        const element = this.renderChildren(
          result.isTruncated,
          result.data,
          result.constraints.width
        )
        this.setState({
          needsSecondRender: false,
          isTruncated: result.isTruncated,
          truncatedElement: element,
          truncatedText: result.text
        })
      }
    } else {
      // if dom isn't available, use original children
      this.setState({
        needsSecondRender: false,
        isTruncated: false,
        // @ts-expect-error ts-migrate(2339) FIXME: Property '_text' does not exist on type 'TruncateT... Remove this comment to see the full error message
        truncatedElement: this._text,
        truncatedText: this.ref?.textContent
      })
    }
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'truncated' implicitly has an 'any' type... Remove this comment to see the full error message
  renderChildren(truncated, data, width) {
    if (!truncated) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property '_text' does not exist on type 'TruncateT... Remove this comment to see the full error message
      return this._text
    }

    const childElements = []
    // iterate over each node used in the truncated string
    for (let i = 0; i < data.length; i++) {
      const item = data[i]
      // @ts-expect-error ts-migrate(2339) FIXME: Property '_text' does not exist on type 'TruncateT... Remove this comment to see the full error message
      const element = this._text.props.children[i]
      const nodeText = item.join('')

      if (element && element.props) {
        // if node is an html element and not just a string
        childElements.push(safeCloneElement(element, element.props, nodeText))
      } else {
        childElements.push(nodeText)
      }
    }
    // this spacer element is set to the max width the full text could potentially be
    // without this, text in `width: auto` elements won't expand to accomodate more text, once truncated
    childElements.push(
      <span css={this.props.styles?.spacer} style={{ width: width || null }} />
    )

    const children = React.Children.map(childElements, (child) => child)
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_text' does not exist on type 'TruncateT... Remove this comment to see the full error message
    return this._text.props
      ? // @ts-expect-error ts-migrate(2339) FIXME: Property '_text' does not exist on type 'TruncateT... Remove this comment to see the full error message
        safeCloneElement(this._text, this._text.props, children)
      : children
  }

  render() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'truncatedElement' does not exist on type... Remove this comment to see the full error message
    const { truncatedElement } = this.state
    const { children } = this.props

    return (
      <span
        css={this.props.styles?.truncateText}
        ref={(el) => {
          this.ref = el
        }}
      >
        {children &&
          (truncatedElement ? null : (
            <span
              ref={(el) => {
                // @ts-expect-error ts-migrate(2339) FIXME: Property '_stage' does not exist on type 'Truncate... Remove this comment to see the full error message
                this._stage = el
              }}
            >
              {ensureSingleChild(children)}
            </span>
          ))}
        {truncatedElement}
      </span>
    )
  }
}

export default TruncateText
export { TruncateText }