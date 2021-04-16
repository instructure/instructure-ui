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

import { Alert } from '@instructure/ui-alerts'
import { IconButton } from '@instructure/ui-buttons'
import { ScreenReaderContent } from '@instructure/ui-a11y-content'
import { IconTroubleLine } from '@instructure/ui-icons'
import { Select } from '@instructure/ui-select'

import { SearchStatus } from '../SearchStatus'

class Search extends Component {
  static propTypes = {
    options: PropTypes.object
  }

  static defaultProps = {
    options: undefined
  }

  _options = []
  timeoutId = null

  constructor(props) {
    super(props)

    this.state = {
      inputValue: '',
      isShowingOptions: false,
      isLoading: false,
      highlightedOptionId: null,
      selectedOptionId: null,
      selectedOptionLabel: '',
      filteredOptions: [],
      announcement: null
    }

    Object.keys(props.options).forEach((option, i) => {
      const doc = props.options[option]
      if (!doc.category) return

      this._options.push({
        id: `doc${i}`,
        value: `${window.location.origin}/#${option}`,
        label: option,
        groupLabel: doc.category,
        tags: doc.tags
      })
    })
  }

  getOptionById(queryId) {
    return this.state.filteredOptions.find(({ id }) => id === queryId)
  }

  filterOptions = (value) => {
    return this._options.filter(
      (option) =>
        option.label.toLowerCase().includes(value.toLowerCase()) ||
        (option.tags && option.tags.toString().includes(value.toLowerCase()))
    )
  }

  handleClearInput = (event) => {
    this.setState({
      isShowingOptions: false,
      isLoading: false,
      highlightedOptionId: null,
      selectedOptionId: null,
      selectedOptionLabel: '',
      filteredOptions: [],
      announcement: 'List collapsed.',
      inputValue: ''
    })
  }

  handleShowOptions = (event) => {
    this.setState(({ filteredOptions }) => ({
      isShowingOptions: true
    }))
  }

  handleHideOptions = (event) => {
    this.handleClearInput()
  }

  handleBlur = (event) => {
    this.setState({ highlightedOptionId: null })
  }

  handleHighlightOption = (event, { id }) => {
    event.persist()
    const option = this.getOptionById(id)
    if (!option) return // prevent highlighting of empty option
    this.setState((state) => ({
      highlightedOptionId: id,
      inputValue: event.type === 'keydown' ? option.label : state.inputValue,
      announcement: option.label
    }))
  }

  handleSelectOption = (event, { id }) => {
    const option = this.getOptionById(id)
    if (!option) return // prevent selecting of empty option
    this.setState(
      {
        selectedOptionId: id,
        selectedOptionLabel: option.label,
        inputValue: option.label,
        isShowingOptions: false,
        announcement: `${option.label} selected. List collapsed.`,
        filteredOptions: [this.getOptionById(id)]
      },
      () => {
        window.location = option.value
      }
    )
  }

  handleInputChange = (event) => {
    const value = event.target.value
    clearTimeout(this.timeoutId)

    if (!value || value === '') {
      this.setState({
        isLoading: false,
        inputValue: value,
        isShowingOptions: true,
        selectedOptionId: null,
        selectedOptionLabel: null,
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

  renderGroups(options) {
    const { highlightedOptionId, selectedOptionId } = this.state

    // define group order
    const groups = {
      'GETTING STARTED': [],
      GUIDES: [],
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
        {groups[group].map(({ id, value, label, disabled }) => (
          <Select.Option
            id={id}
            key={id}
            isHighlighted={id === highlightedOptionId}
            isSelected={id === selectedOptionId}
            isDisabled={disabled}
          >
            {label}
          </Select.Option>
        ))}
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
          {filteredOptions.length > 0
            ? this.renderGroups(filteredOptions)
            : this.renderEmptyOption()}
        </Select>
        <Alert
          liveRegion={() => document.getElementById('flash-messages')}
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
