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

import { Component, ContextType } from 'react'

import { Img } from '@instructure/ui-img'
import { callRenderProp } from '@instructure/ui-react-utils'
import { withStyle } from '@instructure/emotion'

import generateStyles from './styles'
import type { TreeBrowserButtonProps } from './props'
import { allowedProps } from './props'
import TreeBrowserContext from '../TreeBrowserContext'

// Todo: merge TreeButton and TreeNode: TreeButton should be a special type of TreeNode

/**
---
parent: TreeBrowser
id: TreeBrowser.Button
---
**/
@withStyle(generateStyles, 'TreeBrowserTreeButton')
class TreeButton extends Component<
  TreeBrowserButtonProps,
  { isHovered: boolean }
> {
  static readonly componentId = 'TreeBrowser.Button'

  static allowedProps = allowedProps

  static contextType = TreeBrowserContext
  declare context: ContextType<typeof TreeBrowserContext>

  static defaultProps = {
    type: 'treeButton',
    size: 'medium',
    variant: 'folderTree',
    selected: false,
    focused: false,
    expanded: false
  }

  ref: Element | null = null

  state = {
    isHovered: false
  }

  componentDidMount() {
    this.props.makeStyles?.({ animation: this.context?.animation })
  }

  componentDidUpdate() {
    this.props.makeStyles?.({ animation: this.context?.animation })
  }

  defaultContentRenderer(props: TreeBrowserButtonProps) {
    const { name, descriptor, styles } = props
    return (
      <span css={styles!.layout}>
        {this.renderImage()}
        <span css={styles!.text}>
          <span css={styles!.textName}>{name}</span>
          {descriptor ? (
            <span css={styles!.textDescriptor} title={descriptor}>
              {descriptor}
            </span>
          ) : null}
        </span>
      </span>
    )
  }

  renderImage() {
    const { type } = this.props
    switch (type) {
      case 'collection':
        return this.renderCollectionIcon()
      case 'item':
        return this.renderItemImage()
      default:
        break
    }
    return undefined
  }

  renderCollectionIcon() {
    const {
      expanded,
      collectionIcon,
      collectionIconExpanded,
      styles,
      size,
      selected
    } = this.props
    const { isHovered } = this.state

    if (collectionIcon || collectionIconExpanded) {
      // Determine icon color based on state
      let iconColor: 'baseColor' | 'onColor' = 'baseColor'
      if (selected || isHovered) {
        iconColor = 'onColor'
      }

      return (
        <div css={styles?.icon}>
          {callRenderProp(
            (expanded ? collectionIconExpanded : collectionIcon) as any,
            {
              size,
              color: iconColor
            }
          )}
        </div>
      )
    }
    return undefined
  }

  renderItemImage() {
    const { thumbnail, itemIcon, styles, size, selected } = this.props
    const { isHovered } = this.state

    if (thumbnail) {
      return (
        <div css={styles?.thumbnail}>
          <Img src={thumbnail} constrain="cover" alt="" />
        </div>
      )
    }
    if (itemIcon) {
      // Determine icon color based on state
      let iconColor: 'baseColor' | 'onColor' = 'baseColor'
      if (selected || isHovered) {
        iconColor = 'onColor'
      }

      return (
        <div css={styles?.icon}>
          {callRenderProp(itemIcon as any, {
            size,
            color: iconColor
          })}
        </div>
      )
    }
    return undefined
  }

  handleRef = (el: HTMLButtonElement) => {
    if (el && typeof this.props.containerRef === 'function') {
      this.props.containerRef(el.parentElement)
    }
    this.ref = el
  }

  handleMouseEnter = () => {
    this.setState({ isHovered: true })
  }

  handleMouseLeave = () => {
    this.setState({ isHovered: false })
  }

  render() {
    const { styles, renderContent } = this.props
    const buttonContent = renderContent
      ? renderContent(this.props)
      : this.defaultContentRenderer(this.props)
    // VoiceOver can't navigate without the buttons, even though they don't do anything
    return (
      <button
        ref={this.handleRef}
        tabIndex={-1}
        type="button"
        css={styles?.treeButton}
        data-cid="TreeButton"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        {buttonContent}
      </button>
    )
  }
}

export default TreeButton
export { TreeButton }
