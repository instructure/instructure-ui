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
import type { Debounced } from '@instructure/debounce'
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
import { propTypes, allowedProps, TruncateTextState } from './props'
import type { TruncateTextProps } from './props'

/**
---
category: components
---
@tsProps
**/
@withStyle(generateStyle, generateComponentTheme)
@testable()
@hack(['shouldTruncateWhenInvisible'])
class TruncateText extends Component<TruncateTextProps, TruncateTextState> {
  static readonly componentId = 'TruncateText'

  static allowedProps = allowedProps
  static propTypes = propTypes

  static defaultProps = {
    maxLines: 1,
    ellipsis: '\u2026',
    truncate: 'character',
    position: 'end',
    ignore: [' ', '.', ','],
    debounce: 0
  }

  ref: Element | null = null
  private _text?: JSX.Element
  private _debounced?: Debounced
  private _stage: HTMLSpanElement | null = null
  private _wasTruncated?: boolean
  private _resizeListener?: ResizeObserver

  constructor(props: TruncateTextProps) {
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
      truncatedElement: undefined,
      truncatedText: undefined
    }
  }

  componentDidMount() {
    const { children, makeStyles } = this.props

    makeStyles?.()

    if (children) {
      this.checkChildren()
      const txt = ensureSingleChild(children)
      this._text = txt ? txt : undefined

      this.truncate()

      this._debounced = debounce(this.update, this.props.debounce, {
        leading: true,
        trailing: true
      })

      const { width: origWidth } = getBoundingClientRect(this.ref)
      this._resizeListener = new ResizeObserver((entries) => {
        // requestAnimationFrame call is needed becuase some truncatetext test cases
        // failed due to ResizeObserver was not able to deliver all observations within a single animation frame
        // see: https://stackoverflow.com/questions/49384120/resizeobserver-loop-limit-exceeded
        requestAnimationFrame(() => {
          for (const entry of entries) {
            const { width } = entry.contentRect

            if (origWidth !== width) {
              this.props.debounce === 0 ? this.update() : this._debounced!()
            }
          }
        })
      })
      this._resizeListener.observe(this.ref!)
    }
  }

  componentWillUnmount() {
    if (this._resizeListener) {
      this._resizeListener.disconnect()
    }

    if (this._debounced) {
      this._debounced.cancel()
    }
  }

  componentDidUpdate(prevProps: TruncateTextProps) {
    const { children, onUpdate, makeStyles } = this.props

    makeStyles?.()

    const { isTruncated, needsSecondRender, truncatedText } = this.state

    if (children) {
      if (prevProps !== this.props) {
        if (prevProps.children !== this.props.children) {
          // reset internal text variable if children change
          this.checkChildren()
          const txt = ensureSingleChild(children)
          this._text = txt ? txt : undefined
        }
        // require the double render whenever props change
        this.setState(this.initialState)
        return
      }

      if (!needsSecondRender && (isTruncated || this._wasTruncated)) {
        onUpdate?.(isTruncated, truncatedText)
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
    if (!this.state.needsSecondRender) {
      return
    }

    if (canUseDOM) {
      const result = truncate(this._stage!, {
        ...this.props,
        parent: this.ref ? this.ref : undefined,
        lineHeight: this.props.styles?.lineHeight as number
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
      const textContent = this.ref?.textContent
        ? this.ref?.textContent
        : undefined
      // if dom isn't available, use original children
      this.setState({
        needsSecondRender: false,
        isTruncated: false,
        truncatedElement: this._text,
        truncatedText: textContent
      })
    }
  }

  renderChildren(truncated: boolean, data: string[][], width: number) {
    if (!truncated) {
      return this._text
    }

    const childElements = []
    // iterate over each node used in the truncated string
    for (let i = 0; i < data.length; i++) {
      const item = data[i]
      const element = this._text!.props.children[i]
      const nodeText = item.join('')

      if (element && element.props) {
        // if node is an html element and not just a string
        childElements.push(safeCloneElement(element, element.props, nodeText))
      } else {
        childElements.push(nodeText)
      }
    }
    // this spacer element is set to the max width the full text could
    // potentially be without this, text in `width: auto` elements won't expand
    // to accommodate more text, once truncated
    childElements.push(
      <span
        css={this.props.styles?.spacer}
        style={{ width: width || undefined }}
      />
    )

    const children = React.Children.map(childElements, (child) => child)
    return this._text!.props
      ? safeCloneElement(this._text!, this._text!.props, children)
      : children
  }

  render() {
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
                this._stage = el
              }}
            >
              {ensureSingleChild(children)}
            </span>
          ))}
        {truncatedElement &&
          React.cloneElement(truncatedElement as any, {
            style: { pointerEvents: 'none' }
          })}
      </span>
    )
  }
}

export default TruncateText
export { TruncateText }
