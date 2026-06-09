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

import { Component } from 'react'

import { Text } from '@instructure/ui-text'
import { Tooltip } from '@instructure/ui-tooltip'
import { ScreenReaderContent } from '@instructure/ui-a11y-content'

import { withStyleForDocs } from '../withStyleForDocs'
import generateStyle from './styles'

import { allowedProps } from './props'
import type { ColorNameProps, ColorNameState } from './props'

// CSS truncation instead of heavy TruncateText
@withStyleForDocs(generateStyle, () => ({}))
class ColorName extends Component<ColorNameProps, ColorNameState> {
  static displayName = 'ColorName'
  static allowedProps = allowedProps
  static defaultProps = {
    as: 'span'
  }

  state = {
    isTruncated: false
  }

  private strongRef: HTMLElement | null = null

  componentDidMount() {
    this.props.makeStyles?.()
    this.checkTruncation()
  }

  componentDidUpdate(prevProps: ColorNameProps) {
    this.props.makeStyles?.()
    if (prevProps.name !== this.props.name) {
      this.checkTruncation()
    }
  }

  checkTruncation = () => {
    if (!this.strongRef) return
    const isTruncated = this.strongRef.scrollWidth > this.strongRef.clientWidth
    if (this.state.isTruncated !== isTruncated) {
      this.setState({ isTruncated })
    }
  }

  handleStrongRef = (el: HTMLElement | null) => {
    this.strongRef = el
  }

  renderText() {
    const { name, styles, makeStyles, ...passthrough } = this.props
    return (
      <Text {...passthrough}>
        <strong aria-hidden ref={this.handleStrongRef} css={styles?.truncate}>
          {name}
        </strong>
        <ScreenReaderContent>{name}</ScreenReaderContent>
      </Text>
    )
  }

  render() {
    return this.state.isTruncated ? (
      <Tooltip
        renderTip={this.props.name}
        mountNode={() => document.getElementById('app')}
      >
        {this.renderText()}
      </Tooltip>
    ) : (
      this.renderText()
    )
  }
}

export default ColorName
export { ColorName }
