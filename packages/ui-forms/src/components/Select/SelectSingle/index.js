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
import deepEqual from 'deep-equal'

import { controllable } from '@instructure/ui-prop-types'
import { omitProps } from '@instructure/ui-react-utils/lib/omitProps'
import isActiveElement from '@instructure/ui-dom-utils/lib/isActiveElement'
import testable from '@instructure/ui-testable'

import SelectField from '../SelectField'
import getOptionId from '../utils/getOptionId'

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
@testable()
class SelectSingle extends Component {
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
    selectedOption: controllable(
      PropTypes.oneOfType([PropTypes.string, optionType]),
      'onChange',
      'defaultSelectedOption'
    ),
    /**
     * Options dropdown can be wider than input if optionsMaxWidth is provided
     */
    optionsMaxWidth: PropTypes.string,
    /**
    * value to set on initial render, meant for an uncontrolled component
    */
    defaultSelectedOption: PropTypes.oneOfType([PropTypes.string, optionType]),
    /**
    * Determines whether the user can type in the input
    */
    editable: PropTypes.bool,
    /**
    * for non-multiple Select, allows the user to empty selection
    */
    allowEmpty: PropTypes.bool,
    /**
     * If true, the user can freely enter a value not available in the options list.
     * Implies editable is true.
     */
    allowCustom: PropTypes.bool,
    /**
     * Whether or not to disable the input
     */
    disabled: PropTypes.bool,
    /**
     * Works just like disabled but keeps the same styles as if it were active
     */
    readOnly: PropTypes.bool,
    /**
     * The filter function applied to the options when writing on the input
     */
    filter: PropTypes.func,
    /**
     * Callback fired when the menu is closed
     */
    onClose: PropTypes.func,
    /**
     * Callback fired when one of the menu options gets selected
     */
    onChange: PropTypes.func,
    /**
     * Callback fired when on the onChange of the internal input
     */
    onInputChange: PropTypes.func,
    /**
     * Callback fired when the options displayed in the menu change
     */
    onOptionsChange: PropTypes.func,
    /**
    * should the menu be closed when a selection happens
    */
    closeOnSelect: PropTypes.bool,
    /**
     * the current value. The selected option's value, or the entered text if allowCustom is true
     */
    value: PropTypes.string,
  }

  static defaultProps = {
    options: undefined,
    selectedOption: undefined,
    defaultSelectedOption: undefined,
    value: undefined,
    filter: undefined,
    readOnly: false,
    disabled: false,
    allowCustom: false,
    allowEmpty: false,
    editable: false,
    optionsMaxWidth: undefined,
    inputRef: (node) => {},
    onClose: () => {},
    onChange: (event, selectedOption) => {},
    onInputChange: (event, value) => {},
    onOptionsChange: (filteredOptions) => {},
    closeOnSelect: true,
  }

  constructor (props) {
    super(props)

    this.state = {
      filterText: null,
      filteredOptions: props.options,
      selectedOption: this.getSelectedOptionFromProps(props)
    }
  }

  _input = null

  get focused () {
    return isActiveElement(this._input)
  }

  get value () {
    const selected = this.state.selectedOption
    if (selected) {
      return selected.value
    }
    if (this.props.allowCustom) {
      return this._input.value
    }
    return null
  }

  focus = () => {
    this._input && this._input.focus()
  }

  findSelectedOption (options, selected) {
    const id = getOptionId(selected)
    const foundOption = options.find((option) => getOptionId(option) === id)

    return foundOption || selected
  }

  getSelectedOptionFromProps (props, selected) {
    return selected
      ? this.findSelectedOption(props.options, selected)
      : this.findSelectedOption(props.options, props.selectedOption || props.defaultSelectedOption)
  }

  componentDidMount () {
    if (this.state.selectedOption) {
      this._input.value = this.state.selectedOption.label || ''
    }
  }

  componentWillReceiveProps (nextProps) {
    const optionsChanged = !deepEqual(this.props.options, nextProps.options)
    const selectedChanged = this.props.selectedOption != nextProps.selectedOption     // undefined == null -> no change
                            && !deepEqual(this.props.selectedOption, nextProps.selectedOption)
                            && !this.props.disabled
                            && !this.props.readOnly
    const valueChanged = this.props.value !== nextProps.value

    if (optionsChanged || selectedChanged || valueChanged) {
      this.setState((prevState) => {
        const selected = selectedChanged ? null : prevState.selectedOption
        const selectedOption = this.getSelectedOptionFromProps(nextProps, selected)
        let filterText = prevState.filterText || ''
        if (nextProps.allowCustom && (selectedChanged && !this.props.selectedOption) ) {
          // went from custom text entry to a selection from the options
          filterText = (selectedOption && selectedOption.label) || ''
        }
        const filteredOptions = nextProps.filter(nextProps.options, filterText)
        const value = (selectedOption && selectedOption.label) || nextProps.value || ''

        if ((nextProps.allowCustom || prevState.filterText === null) && this._input.value !== value) {
          this._input.value = value
          nextProps.onInputChange(null, this._input.value)
        }
        if (optionsChanged) {
          nextProps.onOptionsChange(filteredOptions)
        }
        return {
          selectedOption,
          filteredOptions,
        }
      })
    }
  }

  matchSelectedOption = (state, selectedOption) => {
    const inputValue = this._input.value

    let match
    if (selectedOption) {
      // find option with a value that matches current selected value
      match = state.filteredOptions.find(
        option => option.value === selectedOption.value
      )
    } else {
      // find option with a label that matches input's value
      match = state.filteredOptions.find(
        option => option.label.toLowerCase() === inputValue.toLowerCase()
      )
    }

    return match
  }

  handleClose = (event, newSelectedOption) => this.setState((prevState, props) => {
    const inputValue = this._input.value
    const match = this.matchSelectedOption(prevState, newSelectedOption)
    const selectedOption = newSelectedOption || prevState.selectedOption

    if (match) {
      this._input.value = match.label

      if (!selectedOption || getOptionId(match) !== getOptionId(selectedOption)) {
        props.onChange(event, match)
      }
    } else if (selectedOption) {
      if (props.allowEmpty && this._input.value === '') {
        props.onChange(event, null)
        return {
          filterText: null,
          filteredOptions: props.options,
          selectedOption: null
        }
      } else if (!this.props.allowCustom) {
        // reset the value to the last valid value
        this._input.value = selectedOption.label
      }
    } else if (!this.props.allowCustom) {
      // clean wrong values
      this._input.value = ''
    }

    if (this._input.value !== inputValue) {
      this.props.onInputChange(null, this._input.value)
    }

    return {
      filterText: this.props.allowCustom ? this._input.value : null,
      filteredOptions: props.options,
      selectedOption: match || selectedOption
    }
  }, this.props.onClose)

  handleInputChange = (event, value) => {
    this.props.onInputChange(event, value)

    const filterText = value.toLowerCase()
    if (this.state.filterText !== filterText) {
      this.setState((prevState, props) => {
        const filteredOptions = props.filter(this.props.options, filterText || '')
        let selectedOption = prevState.selectedOption
        if (props.allowCustom && filteredOptions.length === 0) {
          selectedOption = undefined
        }
        return {
          filterText,
          filteredOptions,
          selectedOption
        }
      })
    }
  }

  handleSelect = (event, selectedOption) => {
    if (this._input.value !== selectedOption.label) {
      this._input.value = selectedOption.label
      this.props.onInputChange(null, this._input.value)
    }

    this.setState({
      filterText: null,
      filteredOptions: this.props.options,
      selectedOption
    }, () => this.focus())

    this.props.onChange(event, selectedOption)
  }

  handleInputRef = (node, ...args) => {
    this._input = node
    this.props.inputRef.apply(this, [node].concat(args))
  }

  render () {
    return (
      <SelectField
        {...omitProps(this.props, SelectSingle.propTypes)}
        editable={this.props.allowCustom || this.props.editable}  // allowCustom requires editable
        inputRef={this.handleInputRef}
        options={this.state.filteredOptions}
        selectedOption={this.state.selectedOption}
        disabled={this.props.disabled}
        readOnly={this.props.readOnly}
        onSelect={this.handleSelect}
        onStaticClick={this.focus}
        onClose={this.handleClose}
        onInputChange={this.handleInputChange}
        optionsMaxWidth={this.props.optionsMaxWidth}
        closeOnSelect={this.props.closeOnSelect}
      />
    )
  }
}

export default SelectSingle
