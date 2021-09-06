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

/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import { Component } from 'react'

import { Img } from '@instructure/ui-img'
import { callRenderProp } from '@instructure/ui-react-utils'
import { testable } from '@instructure/ui-testable'
import { withStyle, jsx } from '@instructure/emotion'

import generateStyles from '../TreeButton/styles'
import generateComponentTheme from '../TreeButton/theme'
import type { TreeBrowserNodeProps } from './props'
import { allowedProps, propTypes } from './props'

/**
---
parent: TreeBrowser
id: TreeBrowser.Node
---
A helper class used to render the :renderBeforeItems and :renderAfterItems
in the TreeBrowser.
**/

// Todo: merge TreeButton and TreeNode: TreeButton should be a special type of TreeNode

@withStyle(generateStyles, generateComponentTheme)
@testable()
class TreeNode extends Component<TreeBrowserNodeProps> {
  static readonly componentId = 'TreeBrowser.Node'

  static allowedProps = allowedProps
  static propTypes = propTypes

  static defaultProps = {
    id: undefined,
    size: 'medium',
    variant: 'folderTree',
    selected: false,
    focused: false,
    children: undefined,
    itemIcon: undefined,
    thumbnail: undefined,
    level: undefined,
    containerRef: function () {},
    parentRef: undefined,
    onKeyDown: undefined,
    onClick: undefined
  }

  componentDidMount() {
    this.props.makeStyles?.()
  }
  componentDidUpdate() {
    this.props.makeStyles?.()
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'el' implicitly has an 'any' type.
  handleRef = (el) => {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    el && this.props.containerRef(el.parentElement)
  }

  // @ts-expect-error ts-migrate(7030) FIXME: Not all code paths return a value.
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
  }

  render() {
    const { children, styles } = this.props

    return (
      <div ref={this.handleRef} tabIndex={-1} css={styles?.treeButton}>
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
