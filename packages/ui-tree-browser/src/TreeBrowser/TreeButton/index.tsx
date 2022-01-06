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

import { testable } from '@instructure/ui-testable'
import { Img } from '@instructure/ui-img'
import { callRenderProp } from '@instructure/ui-react-utils'
import { withStyle, jsx } from '@instructure/emotion'

import generateStyles from './styles'
import generateComponentTheme from './theme'
import type { TreeBrowserButtonProps } from './props'
import { allowedProps, propTypes } from './props'

// Todo: merge TreeButton and TreeNode: TreeButton should be a special type of TreeNode

/**
---
parent: TreeBrowser
id: TreeBrowser.Button
---
@tsProps
**/
@withStyle(generateStyles, generateComponentTheme)
@testable()
class TreeButton extends Component<TreeBrowserButtonProps> {
  static readonly componentId = 'TreeBrowser.Button'

  static allowedProps = allowedProps
  static propTypes = propTypes

  static defaultProps = {
    type: 'treeButton',
    size: 'medium',
    variant: 'folderTree',
    selected: false,
    focused: false,
    expanded: false
  }

  ref: Element | null = null

  componentDidMount() {
    this.props.makeStyles?.()
  }

  componentDidUpdate() {
    this.props.makeStyles?.()
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
    const { expanded, collectionIcon, collectionIconExpanded, styles } =
      this.props

    if (collectionIcon || collectionIconExpanded) {
      return (
        <div css={styles?.icon}>
          {callRenderProp(expanded ? collectionIconExpanded : collectionIcon)}
        </div>
      )
    }
    return undefined
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

  handleRef = (el: HTMLButtonElement) => {
    if (el && typeof this.props.containerRef === 'function') {
      this.props.containerRef(el.parentElement)
    }
    this.ref = el
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
      >
        {buttonContent}
      </button>
    )
  }
}

export default TreeButton
export { TreeButton }
