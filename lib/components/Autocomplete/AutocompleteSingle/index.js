import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { omitProps } from '../../../util/passthroughProps'
import CustomPropTypes from '../../../util/CustomPropTypes'
import isActiveElement from '../../../util/dom/isActiveElement'

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
    onInputChange: PropTypes.func
  }
  /* eslint-enable react/require-default-props */

  static defaultProps = {
    inputRef: (node) => {},
    onClose: () => {},
    onChange: (event, selectedOption) => {},
    onInputChange: (event) => {}
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

      if (!foundOption) {
        throw new Error('The selectedOption is a string but doesn\'t correspond to an option')
      }

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

  handleClose = (event) => this.setState((prevState, props) => {
    const inputValue = this._input.value.toLowerCase()
    const match = prevState.filteredOptions.find(
      option => option.label.toLowerCase() === inputValue
    )

    if (match) {
      this._input.value = match.label

      if (
        !this.state.selectedOption ||
        getOptionId(match) !== getOptionId(this.state.selectedOption)
      ) {
        props.onChange(event, match)
      }
    } else if (this.state.selectedOption) {
      if (this.props.allowEmpty && this._input.value === '') {
        props.onChange(event, null)
        return {
          filterText: '',
          filteredOptions: props.options,
          selectedOption: null
        }
      } else {
        // reset the value to the last valid value
        this._input.value = this.state.selectedOption.label
      }
    } else {
      // clean wrong values
      this._input.value = ''
    }

    return {
      filterText: '',
      filteredOptions: props.options,
      selectedOption: match || this.state.selectedOption
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
        closeOnSelect
      />
    )
  }
}

export default AutocompleteSingle
