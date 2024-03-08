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

import React, { useState, useRef } from 'react'
import {
  setSearchQuery,
  search,
  findNext,
  findPrevious,
  SearchQuery,
  closeSearchPanel
} from '@codemirror/search'
import { EditorView } from '@codemirror/view'
import { TextInput } from '@instructure/ui-text-input'
import { IconButton } from '@instructure/ui-buttons'
import {
  IconArrowOpenDownLine,
  IconArrowOpenUpLine,
  IconSearchLine
} from '@instructure/ui-icons'

import ReactDOM from 'react-dom'

export type SearchConfig = {
  placeholder: string
  nextResultLabel: string
  prevResultLabel: string
}

function SearchPanel({
  view,
  searchConfig
}: {
  view: EditorView
  searchConfig: SearchConfig
}) {
  const [searchQueryStr, setSearchQueryStr] = useState('')

  const handleChange = (
    _e: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    setSearchQueryStr(value)
    handleHighlightSearch(value)
  }

  const handleHighlightSearch = (searchStr: string) => {
    view.dispatch({
      effects: setSearchQuery.of(
        new SearchQuery({
          search: searchStr
        })
      )
    })
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== 'Enter') return
    if (!e.shiftKey) handleFindNext()
    else handleFindPrev()
  }

  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (e.key !== 'Escape') return
    closeSearchPanel(view)
  }

  const handleFindNext = () => {
    handleHighlightSearch(searchQueryStr)
    findNext(view)
  }

  const handleFindPrev = () => {
    handleHighlightSearch(searchQueryStr)
    findPrevious(view)
  }

  return (
    <TextInput
      renderLabel=""
      inputRef={(r) => {
        setTimeout(() => r?.focus(), 0)
      }}
      size="small"
      display="inline-block"
      width="20rem"
      placeholder={searchConfig.placeholder}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      renderBeforeInput={<IconSearchLine size="x-small" />}
      renderAfterInput={
        <span>
          <IconButton
            size="small"
            withBorder={false}
            withBackground={false}
            onClick={handleFindNext}
            screenReaderLabel={searchConfig.nextResultLabel}
          >
            <IconArrowOpenDownLine />
          </IconButton>
          <IconButton
            size="small"
            withBorder={false}
            withBackground={false}
            onClick={handleFindPrev}
            screenReaderLabel={searchConfig.prevResultLabel}
          >
            <IconArrowOpenUpLine />
          </IconButton>
        </span>
      }
    />
  )
}

export default function customSearch(searchConfig: SearchConfig | undefined) {
  return searchConfig
    ? search({
        createPanel: (view) => {
          const dom = document.createElement('div')
          dom.style.padding = '8px'
          const reactVersionMajor = Number(React.version.split('.')[0])
          if (reactVersionMajor >= 18) {
            // webpack tries to evaluate imports compile time which would lead to an error on older react versions
            import(/* webpackIgnore: true */ 'react-dom/client')
              .then((r) => {
                const root = r.createRoot(dom)
                root.render(
                  <SearchPanel view={view} searchConfig={searchConfig} />
                )
              })
              .catch((e) => {
                console.error(e)
              })
          } else {
            ReactDOM.render(
              <SearchPanel view={view} searchConfig={searchConfig} />,
              dom
            )
          }
          return { dom }
        }
      })
    : []
}
