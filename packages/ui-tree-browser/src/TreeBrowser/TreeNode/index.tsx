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
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Img } from '@instructure/ui-img'
import { callRenderProp } from '@instructure/ui-react-utils'
import { testable } from '@instructure/ui-testable'
import { withStyle, jsx } from '@instructure/emotion'

import generateStyles from '../TreeButton/styles'
import generateComponentTheme from '../TreeButton/theme'

type Props = {
  makeStyles?: (...args: any[]) => any
  styles?: any
  id?: string | number
  size?: 'small' | 'medium' | 'large'
  variant?: 'folderTree' | 'indent'
  selected?: boolean
  focused?: boolean
  itemIcon?: React.ReactNode | ((...args: any[]) => any)
  thumbnail?: string
  level?: number
  containerRef?: (...args: any[]) => any
  onKeyDown?: (...args: any[]) => any
  onClick?: (...args: any[]) => any
}

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
class TreeNode extends Component<Props> {
  static componentId = 'TreeBrowser.Node'

  static propTypes = {
    // eslint-disable-next-line react/require-default-props
    makeStyles: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    styles: PropTypes.object,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    variant: PropTypes.oneOf(['folderTree', 'indent']),
    selected: PropTypes.bool,
    focused: PropTypes.bool,
    itemIcon: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    thumbnail: PropTypes.string,
    level: PropTypes.number,
    /**
     * The children to be rendered within the `<TreeNode />`
     */
    children: PropTypes.node,
    /**
     * A function that returns a reference to the parent li element
     */
    containerRef: PropTypes.func,
    onKeyDown: PropTypes.func,
    onClick: PropTypes.func
  }

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
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles()
  }
  componentDidUpdate() {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles()
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
        <div css={styles.thumbnail}>
          <Img src={thumbnail} constrain="cover" alt="" />
        </div>
      )
    }

    if (itemIcon) {
      return <div css={styles.icon}>{callRenderProp(itemIcon)}</div>
    }
  }

  render() {
    const { children, styles } = this.props

    return (
      <div ref={this.handleRef} tabIndex={-1} css={styles.treeButton}>
        <span css={styles.layout}>
          {this.renderItemImage()}
          <span css={styles.node}>{children}</span>
        </span>
      </div>
    )
  }
}

export default TreeNode
export { TreeNode }
