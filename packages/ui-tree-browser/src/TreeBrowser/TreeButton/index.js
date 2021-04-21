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
import PropTypes from 'prop-types'

import { testable } from '@instructure/ui-testable'
import { Img } from '@instructure/ui-img'
import { callRenderProp } from '@instructure/ui-react-utils'
import { withStyle, jsx } from '@instructure/emotion'

import generateStyles from './styles'
import generateComponentTheme from './theme'

/**
---
parent: TreeBrowser
id: TreeBrowser.Button
---
**/

// Todo: merge TreeButton and TreeNode: TreeButton should be a special type of TreeNode

@withStyle(generateStyles, generateComponentTheme)
@testable()
class TreeButton extends Component {
  static propTypes = {
    // eslint-disable-next-line react/require-default-props
    makeStyles: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    styles: PropTypes.object,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    descriptor: PropTypes.string,
    type: PropTypes.string,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    variant: PropTypes.oneOf(['folderTree', 'indent']),
    collectionIcon: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    collectionIconExpanded: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.func
    ]),
    itemIcon: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    thumbnail: PropTypes.string,
    onClick: PropTypes.func,
    expanded: PropTypes.bool,
    selected: PropTypes.bool,
    focused: PropTypes.bool,
    level: PropTypes.number,
    containerRef: function () {},
    renderContent: function () {}
  }

  static defaultProps = {
    type: 'treeButton',
    size: 'medium',
    variant: 'folderTree',
    selected: false,
    focused: false,
    onClick: function () {},
    id: undefined,
    name: undefined,
    collectionIcon: undefined,
    collectionIconExpanded: undefined,
    itemIcon: undefined,
    thumbnail: undefined,
    expanded: false,
    descriptor: undefined,
    level: undefined,
    containerRef: function () {},
    renderContent: undefined
  }

  componentDidMount() {
    this.props.makeStyles()
  }
  componentDidUpdate() {
    this.props.makeStyles()
  }

  defaultContentRenderer(props) {
    const { name, descriptor, styles } = props
    return (
      <span css={styles.layout}>
        {this.renderImage()}
        <span css={styles.text}>
          <span css={styles.textName}>{name}</span>
          {descriptor ? (
            <span css={styles.textDescriptor} title={descriptor}>
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
  }

  renderCollectionIcon() {
    const {
      expanded,
      collectionIcon,
      collectionIconExpanded,
      styles
    } = this.props

    if (collectionIcon || collectionIconExpanded) {
      return (
        <div css={styles.icon}>
          {callRenderProp(expanded ? collectionIconExpanded : collectionIcon)}
        </div>
      )
    }
  }

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

  handleRef = (el) => {
    el && this.props.containerRef(el.parentElement)
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
        css={styles.treeButton}
      >
        {buttonContent}
      </button>
    )
  }
}

export default TreeButton
export { TreeButton }
