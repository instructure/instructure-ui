/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2021 - present Instructure, Inc.
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

import { Component, ContextType } from 'react'

import { Img } from '@instructure/ui-img/v11_5'
import { callRenderProp } from '@instructure/ui-react-utils'
import { withStyleLegacy as withStyle } from '@instructure/emotion'

import generateStyles from '../TreeButton/styles'
import generateComponentTheme from '../TreeButton/theme'
import type { TreeBrowserNodeProps } from './props'
import { allowedProps } from './props'
import TreeBrowserContext from '../TreeBrowserContext'

// Todo: merge TreeButton and TreeNode: TreeButton should be a special type of TreeNode

/**
---
parent: TreeBrowser
id: TreeBrowser.Node
---
A helper class used to render the :renderBeforeItems and :renderAfterItems
in the TreeBrowser.
**/
@withStyle(generateStyles, generateComponentTheme)
class TreeNode extends Component<TreeBrowserNodeProps> {
  static readonly componentId = 'TreeBrowser.Node'

  static allowedProps = allowedProps

  static contextType = TreeBrowserContext
  declare context: ContextType<typeof TreeBrowserContext>

  static defaultProps = {
    size: 'medium',
    variant: 'folderTree',
    selected: false,
    focused: false
  }

  ref: Element | null = null

  componentDidMount() {
    this.props.makeStyles?.({ animation: this.context?.animation })
  }

  componentDidUpdate() {
    this.props.makeStyles?.({ animation: this.context?.animation })
  }

  handleRef = (el: HTMLDivElement) => {
    if (el && typeof this.props.containerRef === 'function') {
      this.props.containerRef(el.parentElement)
    }
    this.ref = el
  }

  renderItemImage() {
    const { thumbnail, itemIcon, styles } = this.props
    if (thumbnail) {
      return (
        <div css={styles?.thumbnail}>
          <Img src={thumbnail} constrain="cover" alt="" />
        </div>
      )
    }
    if (itemIcon) {
      return <div css={styles?.icon}>{callRenderProp(itemIcon)}</div>
    }
    return undefined
  }

  render() {
    const { children, styles } = this.props
    return (
      <div
        ref={this.handleRef}
        tabIndex={-1}
        css={styles?.treeButton}
        data-cid="TreeNode"
      >
        <span css={styles?.layout}>
          {this.renderItemImage()}
          <span css={styles?.node}>{children}</span>
        </span>
      </div>
    )
  }
}

export default TreeNode
export { TreeNode }
