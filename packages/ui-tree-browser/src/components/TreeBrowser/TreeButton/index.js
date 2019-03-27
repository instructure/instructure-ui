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

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import themeable from '@instructure/ui-themeable'
import testable from '@instructure/ui-testable'
import Browser from '@instructure/ui-utils/lib/Browser'
import Img from '@instructure/ui-elements/lib/components/Img'
import Tooltip from '@instructure/ui-overlays/lib/components/Tooltip'

import styles from './styles.css'
import theme from './theme'

/**
---
parent: TreeBrowser
---
**/

@testable()
@themeable(theme, styles)
export default class TreeButton extends Component {
  constructor(props) {
    super(props)

    this.nameEl = null
    this.descriptorEl = null

    this.state = {
      isTruncated: false
    }
  }

  componentDidMount() {
    this.checkForTruncation()
  }

  static propTypes = {
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    name: PropTypes.string,
    descriptor: PropTypes.string,
    type: PropTypes.string,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    variant: PropTypes.oneOf(['folderTree', 'indent']),
    collectionIcon: PropTypes.func,
    collectionIconExpanded: PropTypes.func,
    itemIcon: PropTypes.func,
    thumbnail: PropTypes.string,
    onClick: PropTypes.func,
    expanded: PropTypes.bool,
    selected: PropTypes.bool,
    focused: PropTypes.bool,
    showFulltext: PropTypes.bool,
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
    showFulltext: false
  }

  renderImage () {
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

  renderCollectionIcon () {
    const Icon = this.props.expanded
      ? this.props.collectionIconExpanded : this.props.collectionIcon
    if (Icon) {
      return <Icon className={styles.icon} />
    }
  }

  renderItemImage () {
    const thumbnail = this.props.thumbnail
    const Icon = this.props.itemIcon
    if (thumbnail) {
      return (
        <div className={styles.thumbnail}>
          <Img src={thumbnail} constrain="cover" alt="" />
        </div>
      )
    }
    if (Icon) {
      return <Icon className={styles.icon} />
    }
  }

  renderFulltext() {
    const { name, descriptor } = this.props

    return (
      <>
        <header>{name}</header>
        {descriptor && <span>{descriptor}</span>}
      </>
    )
  }

  elementIsTruncated(el) {
    if (!el) {
      return false
    }

    return el.offsetWidth < el.scrollWidth
  }

  checkForTruncation() {
    const isTruncated = this.elementIsTruncated(this.nameEl) || this.elementIsTruncated(this.descriptorEl)
    this.setState({
      isTruncated: isTruncated
    })
  }

  renderButton() {
    const {
      name,
      descriptor,
      expanded,
      selected,
      focused,
      variant,
      size
    } = this.props

    const ie11 = Browser.msie && Browser.version > 10

    const classes = {
      [styles.root]: true,
      [styles[size]]: true,
      [styles[variant]]: true,
      [styles.expanded]: expanded,
      [styles.selected]: selected,
      [styles.focused]: focused,
      [styles.ie11]: ie11
    }

    // VoiceOver can't navigate without the buttons, even though they don't do anything
    return (
      <button type="button" className={classnames(classes)}>
        <span className={styles.layout} >
          {this.renderImage()}
          <span className={styles.text} >
            <span className={styles.textName} ref={el => (this.nameEl = el)}>
              {name}
            </span>
            {descriptor ? (
              <span className={styles.textDescriptor} title={descriptor} ref={el => (this.descriptorEl = el)}>
                {descriptor}
              </span>
            ) : null}
          </span>
        </span>
      </button>
    )
  }

  render() {
    const { showFulltext } = this.props
    const button = this.renderButton()
    const displayTooltip = showFulltext && this.state.isTruncated

    return displayTooltip ? (
      <Tooltip tip={this.renderFulltext()}>
        {button}
      </Tooltip>
    ) : (
        button
      )
  }
}
