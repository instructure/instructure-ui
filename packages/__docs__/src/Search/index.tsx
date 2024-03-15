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
import lunr from 'lunr'

import { Alert } from '@instructure/ui-alerts'
import { IconButton } from '@instructure/ui-buttons'
import { ScreenReaderContent } from '@instructure/ui-a11y-content'
import { IconTroubleLine } from '@instructure/ui-icons'
import { Select } from '@instructure/ui-select'

import { SearchStatus } from '../SearchStatus'

import type { SearchProps, SearchState, OptionType } from './props'

class Search extends Component<SearchProps, SearchState> {
  static defaultProps = {
    options: undefined
  }

  _options: OptionType[] = []
  timeoutId?: ReturnType<typeof setTimeout>

  constructor(props: SearchProps) {
    super(props)

    const indexedData: any[] = []

    // index the descriptions so lunr can accept it
    for (const [key, value] of Object.entries(props.options || {})) {
      if (value.description) {
        indexedData.push({
          id: key,
          description: value.description,
          title: value.title
        })
      }
    }

    const idx = lunr(function () {
      this.ref('id')
      this.field('title')
      this.field('description')
      this.metadataWhitelist = ['position']

      indexedData.forEach(function (doc) {
        this.add(doc)
      }, this)
    })

    this.state = {
      inputValue: '',
      isShowingOptions: false,
      isLoading: false,
      highlightedOptionId: null,
      selectedOptionId: null,
      selectedOptionLabel: '',
      filteredOptions: [],
      announcement: null,
      idx,
      searchMatches: []
    }

    Object.keys(props.options).forEach((option, i) => {
      const doc = props.options[option]
      if (!doc.category) return

      this._options.push({
        id: `doc${i}`,
        value: `#${option}`,
        label: option,
        groupLabel: doc.category,
        tags: doc.tags,
        isWIP: doc.isWIP || doc.category.includes('WIP')
      })
    })
  }

  getOptionById(queryId: string) {
    return this.state.filteredOptions.find(({ id }) => id === queryId)
  }

  filterOptions = (value: string) => {
    return this._options.filter((option) => {
      // We want to hide WIP components etc.
      if (option?.isWIP) {
        return false
      }

      return (
        option.label.toLowerCase().includes(value.toLowerCase()) ||
        (option.tags && option.tags.toString().includes(value.toLowerCase()))
      )
    })
  }

  handleClearInput = () => {
    this.setState({
      isShowingOptions: false,
      isLoading: false,
      highlightedOptionId: null,
      selectedOptionId: null,
      selectedOptionLabel: '',
      filteredOptions: [],
      searchMatches: [],
      announcement: 'List collapsed.',
      inputValue: ''
    })
  }

  handleShowOptions = () => {
    this.setState({ isShowingOptions: true })
  }

  handleHideOptions = () => {
    this.handleClearInput()
  }

  handleBlur = () => {
    this.setState({ highlightedOptionId: null })
  }

  handleHighlightOption = (
    event: React.SyntheticEvent,
    { id }: { id?: string; direction?: 1 | -1 }
  ) => {
    event.persist()
    const option = this.getOptionById(id || '')
    if (!option) return // prevent highlighting of empty option
    this.setState((state) => ({
      highlightedOptionId: id || '',
      inputValue: event.type === 'keydown' ? option.label : state.inputValue,
      announcement: option.label
    }))
  }

  handleSelectOption = (
    _event: React.SyntheticEvent,
    { id }: { id?: string }
  ) => {
    const option = this.getOptionById(id || '')
    if (!option) return // prevent selecting of empty option
    this.setState(
      {
        selectedOptionId: id || '',
        selectedOptionLabel: option.label,
        inputValue: option.label,
        isShowingOptions: false,
        announcement: `${option.label} selected. List collapsed.`,
        filteredOptions: [this.getOptionById(id || '')!]
      },
      () => {
        window.location.href = option.value
      }
    )
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
    }

    const searchContextPadding = 5
    const getContextForMatch = (
      ref: any,
      field: 'title' | 'description',
      positions: any
    ) => {
      return positions?.map((p: number[]) => {
        const matchStartIndex = p[0]
        const matchLength = p[1]
        const context = this.props.options?.[ref]?.[field]?.substring(
          matchStartIndex - searchContextPadding,
          matchStartIndex + matchLength + searchContextPadding
        )
        return {
          context
        }
      })
    }

    const searchTerm = value
    const searchResults: any[] = this.state.idx.search(`*${searchTerm}*`)
    const searchMatchesWithContext = searchResults.map((result) => {
      const {
        ref,
        score,
        matchData: { metadata }
      } = result
      const matches = Object.values(metadata).map((value: any) => {
        return Object.entries(value).map(
          ([field, { position }]: [any, any]) => {
            return {
              [field]: getContextForMatch(ref, field, position)
            }
          }
        )
      })
      return {
        matches,
        ref,
        score
      }
    })
    searchMatchesWithContext.map((m) => {
      return {
        label: m.ref
      }
    })
    this.setState({
      searchMatches: searchMatchesWithContext.map((m) => {
        return {
          label: `${m.ref} (${m.score})`,
          matches: m.matches.map((match: any, index) => {
            const context = match[0]?.description?.[0].context
            return {
              id: m.ref + index,
              label: (
                <span>
                  {context?.substring(0, 5)}
                  <span style={{ background: 'yellow' }}>
                    {context?.substring(5, context.length - 5)}
                  </span>
                  {context?.substring(context.length - 5, context.length)}
                </span>
              )
            }
          })
        }
      })
    })

    if (!value || value === '') {
      this.setState({
        isLoading: false,
        inputValue: value,
        isShowingOptions: true,
        selectedOptionId: null,
        selectedOptionLabel: '',
        filteredOptions: []
      })
    } else {
      this.setState({
        isLoading: true,
        inputValue: value,
        isShowingOptions: true,
        filteredOptions: [],
        highlightedOptionId: null,
        announcement: 'Loading options.'
      })

      this.timeoutId = setTimeout(() => {
        const newOptions = this.filterOptions(value)
        this.setState({
          filteredOptions: newOptions,
          isLoading: false,
          announcement: `${newOptions.length} options available.`
        })
      }, 300)
    }
  }

  renderEmptyOption() {
    const withValue = this.state.inputValue !== ''
    return (
      <Select.Option id="empty-option" key="empty-option">
        {this.state.isLoading
          ? 'Searching...'
          : withValue
          ? 'Sorry! No matches were found.'
          : 'Type to search'}
      </Select.Option>
    )
  }

  renderGroups(options: OptionType[]) {
    const { highlightedOptionId, selectedOptionId } = this.state

    // TODO fix any
    const groups: any = {
      'GETTING STARTED': [],
      GUIDES: [],
      'CONTRIBUTOR GUIDES': [],
      PATTERNS: [],
      COMPONENTS: [],
      PACKAGES: [],
      UTILITIES: [],
      THEMES: []
    }

    // parse items into groups
    options.forEach((option) => {
      // normalize category labels i.e. utilities/dom -> UTILITIES
      const label = option.groupLabel.toUpperCase().split('/')[0]

      if (!groups[label]) {
        groups[label] = []
      }
      groups[label].push(option)
    })

    // remove empty groups
    Object.keys(groups).forEach((group) => {
      if (groups[group].length === 0) {
        delete groups[group]
      }
    })

    return Object.keys(groups).map((group) => (
      <Select.Group renderLabel={group} key={group}>
        {groups[group].map(
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          ({ id, label }: { id: string; label: string; disabled: boolean }) => (
            <Select.Option
              id={id}
              key={id}
              isHighlighted={id === highlightedOptionId}
              isSelected={id === selectedOptionId}
            >
              {label}
            </Select.Option>
          )
        )}
      </Select.Group>
    ))
  }

  render() {
    const {
      inputValue,
      isShowingOptions,
      isLoading,
      filteredOptions,
      announcement
    } = this.state

    const withValue = this.state.inputValue !== ''

    return (
      <div>
        <Select
          size="large"
          renderLabel={
            <ScreenReaderContent>Search Instructure UI</ScreenReaderContent>
          }
          placeholder="Search Instructure UI"
          assistiveText="Type to search"
          inputValue={inputValue}
          isShowingOptions={isShowingOptions}
          onBlur={this.handleBlur}
          onInputChange={this.handleInputChange}
          onRequestShowOptions={this.handleShowOptions}
          onRequestHideOptions={this.handleHideOptions}
          onRequestHighlightOption={this.handleHighlightOption}
          onRequestSelectOption={this.handleSelectOption}
          shouldNotWrap
          renderBeforeInput={
            <SearchStatus status={isLoading ? 'active' : 'inactive'} />
          }
          renderAfterInput={
            withValue ? (
              <IconButton
                size="small"
                withBackground={false}
                withBorder={false}
                screenReaderLabel="Clear search"
                onClick={this.handleClearInput}
              >
                <IconTroubleLine />
              </IconButton>
            ) : (
              <span />
            )
          }
        >
          {this.state.searchMatches.length > 0
            ? this.state.searchMatches.map((group) => (
                <Select.Group renderLabel={group.label} key={group.label}>
                  {group.matches.map(
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    ({
                      id,
                      label,
                      disabled
                    }: {
                      id: string
                      label: string
                      disabled: boolean
                    }) => (
                      <Select.Option id={id} key={id} isDisabled={disabled}>
                        {label}
                      </Select.Option>
                    )
                  )}
                </Select.Group>
              ))
            : this.renderEmptyOption()}
        </Select>
        <Alert
          liveRegion={() =>
            document.getElementById('flash-messages') as HTMLElement
          }
          liveRegionPoliteness="assertive"
          screenReaderOnly
        >
          {announcement}
        </Alert>
      </div>
    )
  }
}

export default Search
export { Search }
