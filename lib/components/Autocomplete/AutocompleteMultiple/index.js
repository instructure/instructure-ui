import React, { Component } from 'react'
import PropTypes from 'prop-types'
import deepEqual from 'deep-equal'

import themeable from '../../../themeable'
import { omitProps } from '../../../util/passthroughProps'
import CustomPropTypes from '../../../util/CustomPropTypes'
import isActiveElement from '../../../util/dom/isActiveElement'
import containsActiveElement from '../../../util/dom/containsActiveElement'

import Tag from '../../Tag'
import AutocompleteField from '../AutocompleteField'
import { getOptionId } from '../util.js'

import styles from './styles.css'
import theme from './theme.js'

const optionType = PropTypes.shape({
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.node
})

@themeable(theme, styles)
class AutocompleteMultiple extends Component {
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
     * The size used for input and menu options
     */
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    /**
     * The filter function applied to the options when the value of the input changes
     */
    filter: PropTypes.func,
    /**
     * The format function called for each Tag to render its contents
     */
    formatSelectedOption: PropTypes.func,
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
    onKeyDown: PropTypes.func
  }

  static defaultProps = {
    inputRef: () => {},
    formatSelectedOption: (tag) => tag.children || tag.label,
    onClose: () => {},
    onChange: (event, selectedOption) => {},
    onInputChange: (event) => {},
    onKeyDown: (event) => {}
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

  focus = () => {
    this._input && this._input.focus()
  }

  getSelectedOptionFromProps (selectedOption = [], options = []) {
    return selectedOption.map((option) => {
      if (typeof option === 'string') {
        const foundOption = options.find((o) => getOptionId(o) === option)

        if (!foundOption) {
          throw new Error(
            `The option (${option}) doesn't correspond to an option's id or (in case of no id) value`
          )
        }

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

    if (updateSelectedOption || updateOptions) {
      this.setState(({ filterText, filteredOptions, selectedOption }) => {
        const state = {
          filteredOptions, selectedOption
        }

        if (updateSelectedOption) {
          state.selectedOption = this.getSelectedOptionFromProps(
            nextProps.selectedOption,
            nextProps.options
          )
        }

        state.filteredOptions = this.getFilteredOptions(nextProps, filterText, state.selectedOption)

        return state
      })
    }
  }

  handleClose = (event) => this.setState((prevState, props) => {
    const inputValue = this._input.value.toLowerCase()
    const match = prevState.filteredOptions.find(
      option => option.label.toLowerCase() === inputValue
    )

    this._input.value = ''

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
      filteredOptions: this.getFilteredOptions(props, '')
    }
  }, this.props.onClose)

  handleInputChange = (event) => {
    this.props.onInputChange(event)
    const filterText = this._input.value.toLowerCase()
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
    const selectedOption = [...this.state.selectedOption, newOption]

    this.setState(({ filterText }, props) => ({
      filteredOptions: this.getFilteredOptions(props, filterText, selectedOption),
      selectedOption
    }), this.focus)

    this.props.onChange(event, selectedOption)
  }

  dismiss = (event, tag) => {
    event.preventDefault() // to prevent expanding the menu onClick

    const tagId = getOptionId(tag)
    const selectedOption = this.state.selectedOption.filter((o) => getOptionId(o) !== tagId)

    this.setState(({ filterText }, props) => ({
      filteredOptions: this.getFilteredOptions(props, filterText, selectedOption),
      selectedOption
    }), this.focus)

    this.props.onChange(event, selectedOption)
  }

  handleInputRef = (node, ...args) => {
    this._input = node
    this.props.inputRef.apply(this, [node].concat(args))
  }

  renderTags () {
    return this.state.selectedOption.map((tag) => (
      <Tag
        className={styles.tag}
        key={tag.label}
        title={tag.label}
        text={this.props.formatSelectedOption(tag)}
        size={this.props.size}
        onClick={(event) => this.dismiss(event, tag)} // eslint-disable-line react/jsx-no-bind
        dismissible
      />
    ))
  }

  render () {
    return (
      <AutocompleteField
        {...omitProps(this.props, AutocompleteMultiple.propTypes)}
        ref={(el) => { this._field = el }}
        inputRef={this.handleInputRef}
        options={this.state.filteredOptions}
        size={this.props.size}
        onSelect={this.handleSelect}
        onStaticClick={this.focus}
        onClose={this.handleClose}
        onInputChange={this.handleInputChange}
        onKeyDown={this.handleKeyDown}
      >
        {this.renderTags()}
      </AutocompleteField>
    )
  }
}

export default AutocompleteMultiple
