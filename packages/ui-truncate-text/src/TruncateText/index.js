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
import PropTypes from 'prop-types'

import { debounce } from '@instructure/debounce'
import { addResizeListener, canUseDOM } from '@instructure/ui-dom-utils'
import {
  safeCloneElement,
  ensureSingleChild,
  hack
} from '@instructure/ui-react-utils'
import { error } from '@instructure/console/macro'
import { testable } from '@instructure/ui-testable'
// eslint-disable-next-line import/named
import { withStyle, jsx } from '@instructure/emotion'

import generateStyles from './styles'

import truncate from './utils/truncate'

/**
---
category: components
---
**/
@withStyle(generateStyles)
@testable()
@hack(['shouldTruncateWhenInvisible'])
class TruncateText extends Component {
  static propTypes = {
    makeStyles: PropTypes.func,
    /**
     * The content to be truncated.
     */
    children: PropTypes.node.isRequired,
    /**
     * Number of lines to allow before truncating. `auto` will fit to parent
     */
    maxLines: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /**
     * Where to place the ellipsis within the string
     */
    position: PropTypes.oneOf(['end', 'middle']),
    /**
     * Add ellipsis after words or after any character
     */
    truncate: PropTypes.oneOf(['character', 'word']),
    /**
     * A string to use as the ellipsis
     */
    ellipsis: PropTypes.string,
    /**
     * Characters to ignore at truncated end of string
     */
    ignore: PropTypes.arrayOf(PropTypes.string),
    /**
     * Debounce delay in milliseconds
     */
    debounce: PropTypes.number,
    /**
     * Callback when truncated text has changed
     */
    onUpdate: PropTypes.func,
    /**
     * Force truncation of invisible elements (hack; will be removed in favor
     * of a better fix)
     */
    // eslint-disable-next-line react/require-default-props
    shouldTruncateWhenInvisible: PropTypes.bool
  }

  static defaultProps = {
    makeStyles: undefined,
    maxLines: 1,
    ellipsis: '\u2026',
    truncate: 'character',
    position: 'end',
    ignore: [' ', '.', ','],
    debounce: 0,
    onUpdate: (truncated, text) => {}
  }

  constructor(props) {
    super(props)
    this.state = this.initialState
    this.styles = props.makeStyles(this.state)
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
    const { children } = this.props

    if (children) {
      this.checkChildren()
      this._text = ensureSingleChild(children)

      this.truncate()

      if (this.props.debounce === 0) {
        this._resizeListener = addResizeListener(this._ref, this.update)
      } else {
        this._debounced = debounce(this.update, this.props.debounce, {
          leading: true,
          trailing: true
        })
        this._resizeListener = addResizeListener(this._ref, this._debounced)
      }
    }
  }

  componentWillUnmount() {
    if (this._resizeListener) {
      this._resizeListener.remove()
    }

    if (this._debounced) {
      this._debounced.cancel()
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // eslint-disable-next-line react/prop-types
    const { children, onUpdate, makeStyles } = this.props

    const { isTruncated, needsSecondRender, truncatedText } = this.state

    this.styles = makeStyles(this.state)

    if (children) {
      if (prevProps !== this.props) {
        if (prevProps.children !== this.props.children) {
          // reset internal text variable if children change
          this.checkChildren()
          this._text = ensureSingleChild(children)
        }
        // require the double render whenever props change
        this.setState(this.initialState)
        return
      }

      if (!needsSecondRender && (isTruncated || this._wasTruncated)) {
        onUpdate(isTruncated, truncatedText)
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
        const text = ensureSingleChild(this.props.children)
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
    if (this._ref) {
      this.setState(this.initialState)
    }
  }

  truncate() {
    if (!this.state.needsSecondRender) {
      return
    }

    if (canUseDOM) {
      const result = truncate(this._stage, {
        ...this.props,
        parent: this._ref,
        lineHeight: this.styles.lineHeight
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
        truncatedElement: this._text,
        truncatedText: this._ref.textContent
      })
    }
  }

  renderChildren(truncated, data, width) {
    if (!truncated) {
      return this._text
    }

    let childElements = []
    // iterate over each node used in the truncated string
    for (let i = 0; i < data.length; i++) {
      const item = data[i]
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
      <span css={this.styles.spacer} style={{ width: width || null }} />
    )

    const children = React.Children.map(childElements, (child) => child)
    return this._text.props
      ? safeCloneElement(this._text, this._text.props, children)
      : children
  }

  render() {
    const { truncatedElement } = this.state
    const { children } = this.props

    return (
      <span
        css={this.styles.root}
        ref={(el) => {
          this._ref = el
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
        {truncatedElement}
      </span>
    )
  }
}

export default TruncateText
export { TruncateText }
