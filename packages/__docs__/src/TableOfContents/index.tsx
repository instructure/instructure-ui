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

import { canUseDOM, ownerDocument } from '@instructure/ui-dom-utils'

import { Link } from '@instructure/ui-link/latest'
import { List } from '@instructure/ui-list/latest'
import { View } from '@instructure/ui-view/latest'
import { ToggleDetails } from '@instructure/ui-toggle-details/latest'
import { InstUISettingsProvider } from '@instructure/emotion'
import type { SpacingValues } from '@instructure/emotion'

import { navigateTo } from '../navigationUtils'
import { allowedProps } from './props'
import type {
  TableOfContentsProps,
  TableOfContentsState,
  TOCHeadingData
} from './props'

class TableOfContents extends Component<
  TableOfContentsProps,
  TableOfContentsState
> {
  static displayName = 'TableOfContents'
  static allowedProps = allowedProps

  constructor(props: TableOfContentsProps) {
    super(props)

    this.state = {
      TOCData: []
    }
  }

  get shouldDisplayToC() {
    const { pageElement } = this.props
    const { TOCData } = this.state

    if (!TOCData || !TOCData.length) {
      return false
    }

    if (canUseDOM) {
      const pageHeight = pageElement.clientHeight
      const documentHeight =
        ownerDocument(pageElement)!.documentElement.clientHeight

      // shouldn't display ToC if the page is shorter than 3 times
      // the window size, that is easily scrollable
      if (pageHeight < documentHeight * 3) {
        return false
      }
    }

    return true
  }

  componentDidMount() {
    const { pageElement } = this.props

    const headings = pageElement?.querySelectorAll<HTMLHeadingElement>(
      'h1, h2, h3, h4, h5, h6'
    )
    const TOCData: TableOfContentsState['TOCData'] = []
    headings?.forEach((h) => {
      const { id, innerText, tagName } = h
      const text = innerText.toLowerCase()
      const charCount = innerText.length

      // if header is a note or warning, leave it out
      // (e.g.: "Note", "Notes:", "Warning!", etc.)
      if (
        (charCount < 7 && text.includes('note')) ||
        (charCount < 10 && text.includes('warning'))
      ) {
        return
      }

      const data: TOCHeadingData = {
        id,
        innerText,
        level: tagName[1]
      }
      TOCData.push(data)
    })

    // if there is only 1 item, clear TOC, no need for list
    if (TOCData.length === 1) {
      TOCData.pop()
    }
    this.setState({ TOCData })
  }

  render() {
    const { doc } = this.props
    const { TOCData } = this.state
    const category = doc.category?.toLowerCase()

    if (!this.shouldDisplayToC) {
      return null
    }

    const levelPaddingMap: Record<string, SpacingValues> = {
      1: '0',
      2: '0',
      3: '0',
      4: 'general.spaceMd',
      5: 'general.spaceXl',
      6: 'general.space2xl'
    }

    const TOC = TOCData.filter((data) => !!data.id).map((data) => {
      return (
        <List.Item
          key={data.id}
          padding={`0 0 0 ${levelPaddingMap[data.level]}`}
        >
          <Link
            href={`#${data.id}`}
            onClick={(e: any) => {
              e.preventDefault()
              navigateTo(doc.id, { sectionId: data.id })
            }}
          >
            {data.innerText}
          </Link>
        </List.Item>
      )
    })

    return (
      <InstUISettingsProvider>
        <View as="div" margin="general.spaceXl 0">
          <ToggleDetails
            summary="Table of Contents"
            defaultExpanded={
              category?.includes('components') || category === 'guides'
            }
            size="large"
          >
            <List
              margin="0 0 general.space2xl"
              isUnstyled
              size="small"
              itemSpacing="xx-small"
            >
              {TOC}
            </List>
          </ToggleDetails>
        </View>
      </InstUISettingsProvider>
    )
  }
}

export default TableOfContents
export { TableOfContents }
