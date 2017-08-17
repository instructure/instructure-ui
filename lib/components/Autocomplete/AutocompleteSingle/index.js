import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { omitProps } from '../../../util/passthroughProps'
import CustomPropTypes from '../../../util/CustomPropTypes'
import isActiveElement from '../../../util/dom/isActiveElement'
import warning from '../../../util/warning'

import AutocompleteField from '../AutocompleteField'
import { getOptionId } from '../util'

const optionType = PropTypes.shape({
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.node
})

class AutocompleteSingle extends Component {
  /* eslint-disable react/require-default-props */
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
    * for non-multiple Autocomplete, allows the user to empty selection
    */
    allowEmpty: PropTypes.bool,
    /**
     * The filter function applied to the options when writting on the input
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
    * should the menu be closed when a selection happens
    */
    closeOnSelect: PropTypes.bool
  }
  /* eslint-enable react/require-default-props */

  static defaultProps = {
    inputRef: (node) => {},
    onClose: () => {},
    onChange: (event, selectedOption) => {},
    onInputChange: (event) => {},
    closeOnSelect: true
  }

  constructor (props) {
    super(props)

    this.state = {
      filterText: '',
      filteredOptions: props.options,
      selectedOption: this.getSelectedOptionFromProps(
        this.props.selectedOption || this.props.defaultSelectedOption
      )
    }
  }

  _input = null

  get focused () {
    return isActiveElement(this._input)
  }

  focus = () => {
    this._input && this._input.focus()
  }

  getSelectedOptionFromProps (selectedOption) {
    if (typeof selectedOption === 'string') {
      const foundOption = this.props.options.find((o) => getOptionId(o) === selectedOption)

      warning(foundOption, '[Autocomplete] The selectedOption is a string but doesn\'t correspond to an option')

      return foundOption
    }

    return selectedOption
  }

  componentDidMount () {
    if (this.state.selectedOption) {
      this._input.value = this.state.selectedOption.label
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.options !== nextProps.options) {
      this.setState({
        filteredOptions: nextProps.filter(nextProps.options, this.state.filterText)
      })
    }

    // When the component is controlled and selectedOption changes, update the input and state
    const oldId = getOptionId(this.props.selectedOption)
    const newId = getOptionId(nextProps.selectedOption)
    if (newId !== null && newId !== oldId) {
      const selectedOption = this.getSelectedOptionFromProps(nextProps.selectedOption)
      this.setState({ selectedOption })
      this._input.value = selectedOption.label
    }
  }

  handleClose = (event, newSelectedOption) => this.setState((prevState, props) => {
    const inputValue = this._input.value.toLowerCase()
    const selectedOption = newSelectedOption || prevState.selectedOption
    const match = prevState.filteredOptions.find(
      option => option.label.toLowerCase() === inputValue
    )

    if (match) {
      this._input.value = match.label

      if (
        !selectedOption ||
        getOptionId(match) !== getOptionId(selectedOption)
      ) {
        props.onChange(event, match)
      }
    } else if (selectedOption) {
      if (props.allowEmpty && this._input.value === '') {
        props.onChange(event, null)
        return {
          filterText: '',
          filteredOptions: props.options,
          selectedOption: null
        }
      } else {
        // reset the value to the last valid value
        this._input.value = selectedOption.label
      }
    } else {
      // clean wrong values
      this._input.value = ''
    }

    return {
      filterText: '',
      filteredOptions: props.options,
      selectedOption: match || selectedOption
    }
  }, this.props.onClose)

  handleInputChange = (event) => {
    this.props.onInputChange(event)
    const filterText = this._input.value.toLowerCase()
    if (this.state.filterText !== filterText) {
      this.setState((prevState, props) => ({
        filterText,
        filteredOptions: props.filter(this.props.options, filterText)
      }))
    }
  }

  handleSelect = (event, selectedOption) => {
    this._input.value = selectedOption.label
    this.setState({
      filterText: '',
      filteredOptions: this.props.options,
      selectedOption
    }, () => {
      this._input.value = selectedOption.label
      this.focus()
    })

    this.props.onChange(event, selectedOption)
  }

  handleInputRef = (node, ...args) => {
    this._input = node
    this.props.inputRef.apply(this, [node].concat(args))
  }

  render () {
    return (
      <AutocompleteField
        {...omitProps(this.props, AutocompleteSingle.propTypes)}
        editable={this.props.editable}
        inputRef={this.handleInputRef}
        options={this.state.filteredOptions}
        selectedOption={this.state.selectedOption}
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

export default AutocompleteSingle
