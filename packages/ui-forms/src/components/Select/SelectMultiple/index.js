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

import themeable from '@instructure/ui-themeable'
import { omitProps } from '@instructure/ui-utils/lib/react/passthroughProps'
import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'
import isActiveElement from '@instructure/ui-utils/lib/dom/isActiveElement'
import containsActiveElement from '@instructure/ui-utils/lib/dom/containsActiveElement'
import warning from '@instructure/ui-utils/lib/warning'
import deepEqual from '@instructure/ui-utils/lib/deepEqual'

import Tag from '@instructure/ui-elements/lib/components/Tag'
import SelectField from '../SelectField'
import getOptionId from '../utils/getOptionId'

import styles from './styles.css'
import theme from './theme'

const optionType = PropTypes.shape({
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.node
})

/**
---
parent: Select
---
**/
@themeable(theme, styles)
class SelectMultiple extends Component {
  static propTypes = {
    /**
    * The options to render in the menu
    */
    options: PropTypes.arrayOf(optionType),
    /**
    * a function that provides a reference to the internal input element
    */
    inputRef: PropTypes.func,
    /**
    * the selected value (must be accompanied by an `onChange` prop)
    */
    selectedOption: CustomPropTypes.controllable(
      PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.string, optionType])
      ),
      'onChange',
      'defaultSelectedOption'
    ),
    /**
    * value to set on initial render, meant for an uncontrolled component
    */
    defaultSelectedOption: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, optionType])
    ),
    /**
    * Determines whether the user can type in the input
    */
    editable: PropTypes.bool,
    /**
     * Optional name for the FormField
     */
    name: PropTypes.string,
    /**
     * The size used for input and menu options
     */
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    /**
     * Options dropdown can be wider than input if optionsMaxWidth is provided
     */
    optionsMaxWidth: PropTypes.string,
    /**
     * The filter function applied to the options when the value of the input changes
     */
    filter: PropTypes.func,
    /**
     * The format function called for each Tag to render its contents
     */
    formatSelectedOption: PropTypes.func,
    /**
     * Whether or not to disable the input and tags
     */
    disabled: PropTypes.bool,
    /**
     * Works just like disabled but keeps the same styles as if it were active
     */
    readOnly: PropTypes.bool,
    /**
     * Callback fired when the menu is closed
     */
    onClose: PropTypes.func,
    /**
     * Callback fired when one of the menu options gets selected
     */
    onChange: PropTypes.func,
    /**
     * Callback fired on the onChange of the internal input
     */
    onInputChange: PropTypes.func,
    /**
     * Callback fired on the onKeyDown of the internal input
     */
    onKeyDown: PropTypes.func,
    /**
    * should the menu be closed when a selection happens
    */
    closeOnSelect: PropTypes.bool
  }

  static defaultProps = {
    inputRef: () => {},
    formatSelectedOption: (tag) => tag.children || tag.label,
    onClose: () => {},
    onChange: (event, selectedOption) => {},
    onInputChange: (event) => {},
    onKeyDown: (event) => {},
    closeOnSelect: true
  }

  constructor (props) {
    super(props)

    this.state = {
      filterText: '',
      selectedOption: this.getSelectedOptionFromProps(
        this.props.selectedOption || this.props.defaultSelectedOption,
        this.props.options
      )
    }

    this.state.filteredOptions = this.getFilteredOptions(this.props, '')
  }

  _input = null

  get focused () {
    return containsActiveElement(this._field)
  }

  get value () {
    return this.state.selectedOption.map(selected => selected && selected.value)
  }

  get isControlled () {
    return !!this.props.selectedOption
  }

  focus = () => {
    this._input && this._input.focus()
  }

  cleanInput = () => {
    if (this._input.value !== '') {
      this._input.value = ''
      this.props.onInputChange(null, '')
    }
  }

  getSelectedOptionFromProps (selectedOption = [], options = []) {
    return selectedOption.map((option) => {
      if (typeof option === 'string') {
        const foundOption = options.find((o) => getOptionId(o) === option)
        warning(
          foundOption,
          `[Select] The option (${option}) doesn't correspond to an option's id or (in case of no id) value`
        )

        return foundOption
      }

      return option
    })
  }

  getFilteredOptions (
    { filter, options },
    filterText,
    selectedOption = this.state.selectedOption
  ) {
    const filteredOptions = filter(options, filterText)
    const selectedIds = selectedOption.map((o) => getOptionId(o))
    return filteredOptions.filter((o) => !selectedIds.includes(getOptionId(o)))
  }

  componentWillReceiveProps (nextProps) {
    const updateOptions = this.props.options !== nextProps.options
    const updateSelectedOption = (
      this.props.selectedOption !== nextProps.selectedOption &&
      !deepEqual(this.props.selectedOption, nextProps.selectedOption)
    )

    if ((updateSelectedOption || updateOptions) && !this.props.disabled && !this.props.readOnly) {
      this.setState((prevState) => {
        const selectedOption = updateSelectedOption ? this.getSelectedOptionFromProps(
          nextProps.selectedOption,
          nextProps.options
        ) : prevState.selectedOption

        return {
          filteredOptions: this.getFilteredOptions(nextProps, prevState.filterText, selectedOption),
          selectedOption
        }
      })
    }
  }

  handleClose = (event) => this.setState((prevState, props) => {
    const loweredInputValue = this._input.value.toLowerCase()
    const match = prevState.filteredOptions.find(
      option => option.label.toLowerCase() === loweredInputValue
    )
    this.cleanInput()

    if (match) {
      const selectedOption = [...prevState.selectedOption, match]
      props.onChange(event, selectedOption)
      return {
        filterText: '',
        filteredOptions: this.getFilteredOptions(props, '', selectedOption),
        selectedOption
      }
    }
    return {
      filterText: '',
      filteredOptions: this.getFilteredOptions(props, '', prevState.selectedOption)
    }
  }, this.props.onClose)

  handleInputChange = (event, value) => {
    this.props.onInputChange(event, value)
    const filterText = value.toLowerCase()
    if (this.state.filterText !== filterText) {
      this.setState((prevState, props) => ({
        filterText,
        filteredOptions: this.getFilteredOptions(props, filterText)
      }))
    }
  }

  handleKeyDown = (event) => {
    const {
      filterText,
      selectedOption,
      selectedOption: { length }
    } = this.state

    // If the user pressed backspace while focusing on input, input is emtpy and there's selectedOptions
    if (
      (event.key === 'Backspace' || event.key === 'Delete') &&
      length > 0 &&
      filterText === '' &&
      isActiveElement(this._input)
    ) {
      this.dismiss(event, selectedOption[length - 1])
    }

    this.props.onKeyDown(event)
  }

  handleSelect = (event, newOption) => {
    this.cleanInput()

    const newSelectedOption = [...this.state.selectedOption, newOption]

    this.setState((prevState, props) => {
      const selectedOption = this.isControlled ? prevState.selectedOption : newSelectedOption

      return {
        filterText: '',
        filteredOptions: this.getFilteredOptions(props, '', selectedOption),
        selectedOption
      }
    }, this.focus)

    this.props.onChange(event, newSelectedOption)
  }

  dismiss = (event, tag) => {
    event.preventDefault() // to prevent expanding the menu onClick

    const tagId = getOptionId(tag)
    const newSelectedOption = this.state.selectedOption.filter((o) => getOptionId(o) !== tagId)

    this.setState((prevState, props) => {
      const selectedOption = this.isControlled ? prevState.selectedOption : newSelectedOption

      return {
        filteredOptions: this.getFilteredOptions(props, prevState.filterText, selectedOption),
        selectedOption
      }
    }, this.focus)

    this.props.onChange(event, newSelectedOption)
  }

  handleInputRef = (node, ...args) => {
    this._input = node
    this.props.inputRef.apply(this, [node].concat(args))
  }

  renderTags () {
    return this.state.selectedOption.map((tag, index) => (
      <Tag
        className={styles.tag}
        key={tag.label}
        title={tag.label}
        text={this.props.formatSelectedOption(tag, index)}
        size={this.props.size}
        onClick={(event) => this.dismiss(event, tag)}
        dismissible
        disabled={this.props.disabled}
        readOnly={this.props.readOnly}
      />
    ))
  }

  renderInputs () {
    return this.state.selectedOption.map((tag, index) => {
      return (
        <input
          type="hidden"
          key={tag.label}
          name={this.props.name}
          value={tag.value}
        />
      )
    })
  }

  render () {
    return (
      <SelectField
        {...omitProps(this.props, SelectMultiple.propTypes)}
        ref={(el) => { this._field = el }}
        inputRef={this.handleInputRef}
        editable={this.props.editable}
        options={this.state.filteredOptions}
        size={this.props.size}
        disabled={this.props.disabled}
        readOnly={this.props.readOnly}
        onSelect={this.handleSelect}
        onStaticClick={this.focus}
        onClose={this.handleClose}
        onInputChange={this.handleInputChange}
        onKeyDown={this.handleKeyDown}
        optionsMaxWidth={this.props.optionsMaxWidth}
        closeOnSelect={this.props.closeOnSelect}
      >
        {this.renderTags()}
        {this.renderInputs()}
      </SelectField>
    )
  }
}

export default SelectMultiple
