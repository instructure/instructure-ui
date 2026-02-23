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

import { Img } from '@instructure/ui-img/latest'
import { withStyle } from '@instructure/emotion'
import { renderIconWithProps } from '@instructure/ui-icons'

import generateStyles from '../TreeButton/styles'
import type { TreeBrowserNodeProps } from './props'
import { allowedProps } from './props'
import TreeBrowserContext from '../TreeBrowserContext'

// Map TreeBrowser size tokens to icon size tokens
const treeBrowserSizeToIconSize = {
  small: 'md',
  medium: 'lg',
  large: 'xl'
} as const

// Todo: merge TreeButton and TreeNode: TreeButton should be a special type of TreeNode

/**
---
parent: TreeBrowser
id: TreeBrowser.Node
---
A helper class used to render the :renderBeforeItems and :renderAfterItems
in the TreeBrowser.
**/
@withStyle(generateStyles, 'TreeBrowserTreeButton')
class TreeNode extends Component<TreeBrowserNodeProps, { isHovered: boolean }> {
  static readonly componentId = 'TreeBrowser.Node'

  static allowedProps = allowedProps

  static contextType = TreeBrowserContext
  declare context: ContextType<typeof TreeBrowserContext>

  static defaultProps = {
    size: 'medium',
    variant: 'folderTree',
    selected: false,
    focused: false,
    hoverable: true
  }

  ref: Element | null = null

  state = {
    isHovered: false
  }

  componentDidMount() {
    this.props.makeStyles?.({
      animation: this.context?.animation,
      hoverable: this.props.hoverable
    })
  }

  componentDidUpdate() {
    this.props.makeStyles?.({
      animation: this.context?.animation,
      hoverable: this.props.hoverable
    })
  }

  handleRef = (el: HTMLDivElement) => {
    if (el && typeof this.props.containerRef === 'function') {
      this.props.containerRef(el.parentElement)
    }
    this.ref = el
  }

  handleMouseEnter = () => {
    if (this.props.hoverable) {
      this.setState({ isHovered: true })
    }
  }

  handleMouseLeave = () => {
    if (this.props.hoverable) {
      this.setState({ isHovered: false })
    }
  }
  getIconColor(): 'baseColor' | 'onColor' | 'inverseColor' {
    const { selected } = this.props
    const { isHovered } = this.state

    // Priority: selected > hover > default
    if (selected) return 'onColor'
    if (isHovered) return 'inverseColor'
    return 'baseColor'
  }
  renderItemImage() {
    const { thumbnail, itemIcon, styles, size } = this.props

    if (thumbnail) {
      return (
        <div css={styles?.thumbnail}>
          <Img src={thumbnail} constrain="cover" alt="" />
        </div>
      )
    }
    if (itemIcon) {
      const iconSize = treeBrowserSizeToIconSize[size!]
      const iconColor = this.getIconColor()
      const iconElement = renderIconWithProps(itemIcon, iconSize, iconColor)

      return <div css={styles?.icon}>{iconElement}</div>
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
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
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
