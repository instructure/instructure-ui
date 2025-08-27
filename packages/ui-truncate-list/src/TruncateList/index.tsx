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

import { Children, Component } from 'react'

import { debounce } from '@instructure/debounce'
import type { Debounced } from '@instructure/debounce'
import { px, combineDataCid } from '@instructure/ui-utils'
import { omitProps } from '@instructure/ui-react-utils'
import {
  getBoundingClientRect,
  getComputedStyle
} from '@instructure/ui-dom-utils'

import { withStyle } from '@instructure/emotion'

import generateStyle from './styles'

import { allowedProps } from './props'
import type { TruncateListProps, TruncateListState } from './props'

/**
---
category: components/utilities
---
**/
@withStyle(generateStyle, null)
class TruncateList extends Component<TruncateListProps, TruncateListState> {
  static readonly componentId = 'TruncateList'

  static allowedProps = allowedProps
  static defaultProps = {
    itemSpacing: '0',
    debounce: 300
  }

  ref: HTMLUListElement | null = null

  private _menuTriggerRef: HTMLLIElement | null = null

  private _debouncedHandleResize?: Debounced<typeof this.handleResize>
  private _resizeListener?: ResizeObserver

  handleRef = (el: HTMLUListElement | null) => {
    const { elementRef } = this.props

    this.ref = el

    if (typeof elementRef === 'function') {
      elementRef(el)
    }
  }

  constructor(props: TruncateListProps) {
    super(props)

    this.state = {
      isMeasuring: false,
      menuTriggerWidth: undefined
    }
  }

  componentDidMount() {
    this.props.makeStyles?.()

    const { width: origWidth } = getBoundingClientRect(this.ref)

    this._debouncedHandleResize = debounce(
      this.handleResize,
      this.props.debounce,
      {
        leading: true,
        trailing: true
      }
    )

    this._resizeListener = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width } = entry.contentRect

        if (origWidth !== width) {
          this._debouncedHandleResize?.()
        }
      }
    })

    // On first render we only render the trigger to measure it
    const menuTriggerWidth = this.props.fixMenuTriggerWidth
      ? px(this.props.fixMenuTriggerWidth)
      : this.calcMenuTriggerWidth()

    this.setState({ menuTriggerWidth }, () => {
      this._resizeListener?.observe(this.ref!)

      this._debouncedHandleResize?.()
    })
  }

  componentDidUpdate(
    prevProps: TruncateListProps,
    prevState: TruncateListState
  ) {
    this.props.makeStyles?.()

    if (
      prevProps.fixMenuTriggerWidth !== this.props.fixMenuTriggerWidth ||
      prevProps.itemSpacing !== this.props.itemSpacing
    ) {
      this._debouncedHandleResize?.()
    }

    if (
      this.ref &&
      prevState.isMeasuring &&
      prevState.isMeasuring !== this.state.isMeasuring
    ) {
      const menuTriggerWidth = this.calcMenuTriggerWidth()

      if (
        menuTriggerWidth &&
        this.state.menuTriggerWidth !== menuTriggerWidth
      ) {
        this.setState({ menuTriggerWidth }, () => {
          this._debouncedHandleResize?.()
        })
      }
    }
  }

  componentWillUnmount() {
    if (this._resizeListener) {
      this._resizeListener.disconnect()
    }

    if (this._debouncedHandleResize) {
      this._debouncedHandleResize.cancel()
    }
  }

  get childrenArray() {
    return Children.toArray(this.props.children)
  }

  get visibleChildren() {
    const { visibleItemsCount } = this.props
    const { isMeasuring, menuTriggerWidth } = this.state

    // for the first render we need to measure the trigger width
    if (typeof menuTriggerWidth === 'undefined') {
      return []
    }

    const visibleChildren =
      typeof visibleItemsCount === 'undefined'
        ? this.childrenArray
        : this.childrenArray.splice(0, visibleItemsCount)

    return isMeasuring ? this.childrenArray : visibleChildren
  }

  get hiddenChildren() {
    const { isMeasuring } = this.state

    return isMeasuring
      ? []
      : this.childrenArray.splice(
          this.visibleChildren.length,
          this.childrenArray.length
        )
  }

  calcMenuTriggerWidth() {
    const { fixMenuTriggerWidth } = this.props

    if (!this._menuTriggerRef) {
      return 0
    }

    if (fixMenuTriggerWidth) {
      return px(fixMenuTriggerWidth)
    }

    const { children } = this._menuTriggerRef
    let width = 0

    Array.from(children).forEach((child) => {
      width += getBoundingClientRect(child).width
    })

    return width
  }

  measureItems = () => {
    const { fixMenuTriggerWidth, itemSpacing } = this.props

    const itemSpacingPx = px(itemSpacing!)
    const menuTriggerWidthPx = px(
      fixMenuTriggerWidth || this.state.menuTriggerWidth!
    )

    let visibleItemsCount = 0

    if (this.ref) {
      const { width: navWidth } = getBoundingClientRect(this.ref)
      const { paddingInlineStart, paddingInlineEnd } = getComputedStyle(
        this.ref
      )
      const navWidthWithoutPadding =
        navWidth - px(paddingInlineStart) - px(paddingInlineEnd)

      const itemWidths = Array.from(this.ref.getElementsByTagName('li')).map(
        (item) => {
          const { width } = getBoundingClientRect(item)
          return width
        }
      )

      let currentWidth = 0

      for (let i = 0; i < itemWidths.length; i++) {
        currentWidth += itemWidths[i]

        // for the last item we don't need to calculate with the menu trigger
        const maxWidth =
          i === itemWidths.length - 1
            ? navWidthWithoutPadding
            : navWidthWithoutPadding - (menuTriggerWidthPx + itemSpacingPx)

        if (currentWidth <= maxWidth) {
          visibleItemsCount++
        } else {
          break
        }
      }
    }

    return { visibleItemsCount }
  }

  handleResize = () => {
    this.setState({ isMeasuring: true }, () => {
      const { visibleItemsCount } = this.measureItems()

      if (typeof this.props.onUpdate === 'function') {
        this.props.onUpdate({ visibleItemsCount })
      }
      this.setState({ isMeasuring: false })
    })
  }

  render() {
    const { styles, className, style, renderHiddenItemMenu } = this.props
    const { visibleChildren, hiddenChildren } = this

    return (
      <ul
        ref={this.handleRef}
        {...omitProps(this.props, allowedProps)}
        // we have to pass style and className
        // (e.g. if emotion style is provided, it will be passed as a className)
        style={style}
        className={className}
        css={styles?.truncateList}
        data-cid={combineDataCid('TruncateList', this.props)}
      >
        {visibleChildren.map((child, index) => {
          return (
            <li key={index} css={styles?.listItem}>
              {child}
            </li>
          )
        })}

        {/* On first render we only render the trigger to measure it */}
        {typeof renderHiddenItemMenu === 'function' &&
          hiddenChildren &&
          hiddenChildren.length > 0 && (
            <li
              key="menuTrigger"
              css={[styles?.listItem, styles?.menuTrigger]}
              ref={(e) => {
                this._menuTriggerRef = e
              }}
            >
              {renderHiddenItemMenu(hiddenChildren)}
            </li>
          )}
      </ul>
    )
  }
}

export { TruncateList }
export default TruncateList
