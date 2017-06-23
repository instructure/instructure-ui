import React, { Component } from 'react'
import PropTypes from 'prop-types'
import deepEqual from 'deep-equal'

import { omitProps } from '../../util/passthroughProps'
import CustomPropTypes from '../../util/CustomPropTypes'

import AutocompleteSingle from './AutocompleteSingle'
import AutocompleteMultiple from './AutocompleteMultiple'
import { parseOptions } from './util'

/**
---
category: forms
---
  Autocomplete is a searchable select component.

  ```jsx_example

  class Example extends React.Component {
    render () {
      const options = [
        'Alabama', 'Alaska', 'American Samoa', 'Arizona',
        'Arkansas', 'California', 'Colorado', 'Connecticut',
        'Delaware', 'District Of Columbia',
        'Federated States Of Micronesia', 'Florida', 'Georgia',
        'Guam', 'Hawaii', 'Idaho', 'Illinois'
      ]

      return (
        <Autocomplete {...this.props}
          formatSelectedOption={(tag) => (
            <AccessibleContent alt={`Remove ${tag.label}`}>{tag.label}</AccessibleContent>
          )}
        >
          {options.map((label, index) => (
            <option key={label} value={'' + index}>
              {label}
            </option>
          ))}
        </Autocomplete>
      )
    }
  }

  <div>
    <Example label="Choose a state" defaultOption="12" />
    <br />
    <Example
      label="Choose a few states"
      defaultOption={["0", "12", "15"]}
      multiple
    />
  </div>
  ```

  It allows for async loading of options Autocomplete.

  ```jsx_example
  class Example extends React.Component {
    timeoutId = null;

    state = {
      shownOptions: [],
      loading: false,
      emptyOption: 'Write to search'
    };

    options = [
      { value: '0', label: 'Alabama' },
      { value: '1', label: 'Alaska' },
      { value: '2', label: 'American Samoa' },
      { value: '3', label: 'Arizona' },
      { value: '4', label: 'Arkansas' },
      { value: '5', label: 'California' },
      { value: '6', label: 'Colorado' },
      { value: '7', label: 'Connecticut' },
      { value: '8', label: 'Delaware' },
      { value: '9', label: 'District Of Columbia' },
      { value: '10', label: 'Federated States Of Micronesia' },
      { value: '11', label: 'Florida' },
      { value: '12', label: 'Georgia' },
      { value: '13', label: 'Guam' },
      { value: '14', label: 'Hawaii' },
      { value: '15', label: 'Idaho' },
      { value: '16', label: 'Illinois' }
    ];

    handleInputChange = (e) => {
      const value = e.target.value.toLowerCase()

      clearTimeout(this.timeoutId)

      if (!value) {
        this.cleanResults()
      } else {
        this.setState({
          loading: true,
          emptyOption: 'No results'
        })

        this.timeoutId = setTimeout(() => {
          this.setState({
            shownOptions: this.options.filter((o) => {
              return o.label.toLowerCase().startsWith(value)
            }),
            loading: false
          })
        }, 1000)
      }
    };

    cleanResults = () => this.setState({
      loading: false,
      emptyOption: 'Write to search',
      shownOptions: []
    });

    handleClose = () => {
      if (this._input.value) {
        this.cleanResults()
      }
    };

    handleFilter = (option) => option;

    handleInputRef = (node) => {
      this._input = node
    };

    render () {
      return (
        <Autocomplete
          inputRef={this.handleInputRef}
          loading={this.state.loading}
          loadingOption={
            <Spinner size="small" title="Loading" />
          }
          emptyOption={this.state.emptyOption}
          onInputChange={this.handleInputChange}
          onChange={this.props.multiple ? undefined : this.cleanResults}
          onClose={this.handleClose}
          filter={this.handleFilter}
          {...this.props}
        >
          {this.state.shownOptions.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Autocomplete>
      )
    }
  }
  <div>
    <Example
      label="Choose a state"
      defaultOption={{ value: '1', label: 'Alaska' }}
    />
    <br />
    <Example
      label="Choose a few states"
      defaultOption={[{ value: '1', label: 'Alaska' }]}
      multiple
    />
  </div>
  ```

  A controlled Autocomplete.

  ```jsx_example
  class Example extends React.Component {
    constructor () {
      super(...arguments)
      this.state = {
        option: this.props.initialOption
      }
    }

    handleChange = (e, option) => this.setState({ option });

    handleFlorida = () => {
      const florida = { value: '11', label: 'Florida' }
      this.setState({
        option: this.props.multiple ? [florida] : florida
      });
    }

    handleIdaho = () => {
      const { option } = this.state
      if (!option.find((o) => o.value === '15')) {
        this.setState({
          option: [...this.state.option, { value: '15', label: 'Idaho' }]
        });
      }
    };

    getOptionLabel () {
      const { option } = this.state
      if (option && option.map) {
        return option.map((o) => o.label).join(', ')
      }
      return option && option.label
    };

    render () {
      const { initialOption, ...props } = this.props
      return (
        <div>
          <Autocomplete
            {...props}
            selectedOption={this.state.option}
            onChange={this.handleChange}
          >
            <option value="0">Alabama</option>
            <option value="1">Alaska</option>
            <option value="2">American Samoa</option>
            <option value="3">Arizona</option>
            <option value="4">Arkansas</option>
            <option value="5">California</option>
            <option value="6">Colorado</option>
            <option value="7">Connecticut</option>
            <option value="8">Delaware</option>
            <option value="9">District Of Columbia</option>
            <option value="10">Federated States Of Micronesia</option>
            <option value="11">Florida</option>
            <option value="12">Georgia</option>
            <option value="13">Guam</option>
            <option value="14">Hawaii</option>
            <option value="15">Idaho</option>
            <option value="16">Illinois</option>
          </Autocomplete>
          <div>Value selected: {this.getOptionLabel()}</div>
          <br />
          <Button onClick={this.handleFlorida}>Only select Florida</Button>
          {' '}
          {!props.multiple ? null : <Button onClick={this.handleIdaho}>Add Idaho</Button>}
        </div>
      )
    }
  }
  <div>
    <Example
      label="Choose a state"
      initialOption={{ value: '7', label: 'Connecticut' }}
    />
    <br />
    <Example
      label="Choose a few states"
      initialOption={[{ value: '12', label: 'Georgia' }, { value: '16', label: 'Illinois' }]}
      multiple
    />
  </div>
  ```

  Autocomplete with errors.

  ```jsx_example
  <div>
    <Autocomplete
      label="Choose a state"
      messages={[{ text: 'Invalid name', type: 'error' }]}
    >
      <option value="0">Alabama</option>
      <option value="1">Alaska</option>
    </Autocomplete>
    <br />
    <Autocomplete
      label="Choose a few states"
      messages={[{ text: 'Invalid name', type: 'error' }]}
      multiple
    >
      <option value="0">Alabama</option>
      <option value="1">Alaska</option>
    </Autocomplete>
  </div>
  ```

  A disabled Autocomplete.

  ```jsx_example
  <div>
    <Autocomplete
      label="Choose a state"
      disabled
    >
      <option value="0">Alabama</option>
      <option value="1">Alaska</option>
    </Autocomplete>
    <br />
    <Autocomplete
      label="Choose a few states"
      multiple
      disabled
    >
      <option value="0">Alabama</option>
      <option value="1">Alaska</option>
    </Autocomplete>
  </div>
  ```

  Autocomplete with an `inline` layout.

  ```jsx_example
  class Example extends React.Component {
    render () {
      return (
        <Autocomplete
          {...this.props}
          layout="inline"
        >
          <option value="0">Alabama</option>
          <option value="1">Alaska</option>
          <option value="2">American Samoa</option>
          <option value="3">Arizona</option>
          <option value="4">Arkansas</option>
          <option value="5">California</option>
          <option value="6">Colorado</option>
          <option value="7">Connecticut</option>
          <option value="8">Delaware</option>
          <option value="9">District Of Columbia</option>
          <option value="10">Federated States Of Micronesia</option>
          <option value="11">Florida</option>
          <option value="12">Georgia</option>
          <option value="13">Guam</option>
          <option value="14">Hawaii</option>
          <option value="15">Idaho</option>
          <option value="16">Illinois</option>
        </Autocomplete>
      )
    }
  }

  <div>
    <Example label="This one allows empty values" allowEmpty />
    <br />
    <Example label="Choose a few states" multiple />
  </div>
  ```

  An inline Autocomplete with a fixed width.

  ```jsx_example
  class Example extends React.Component {
    render () {
      return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Autocomplete
            {...this.props}
            inline
          >
            <option value="0">Alabama</option>
            <option value="1">Alaska</option>
            <option value="2">American Samoa</option>
            <option value="3">Arizona</option>
            <option value="4">Arkansas</option>
            <option value="5">California</option>
            <option value="6">Colorado</option>
            <option value="7">Connecticut</option>
            <option value="8">Delaware</option>
            <option value="9">District Of Columbia</option>
            <option value="10">Federated States Of Micronesia</option>
            <option value="11">Florida</option>
            <option value="12">Georgia</option>
            <option value="13">Guam</option>
            <option value="14">Hawaii</option>
            <option value="15">Idaho</option>
            <option value="16">Illinois</option>
          </Autocomplete>
          &nbsp;
          <Typography>{this.props.width}</Typography>
        </div>
      )
    }
  }

  <div>
    <Example
      width="14em"
      label={<ScreenReaderContent>Label</ScreenReaderContent>} />
    <br />
    <Example
      width="20em"
      label={<ScreenReaderContent>Label</ScreenReaderContent>}
      multiple
    />
  </div>
  ```

  Autocomplete of differing sizes next to a [Button](#Button).

  ```jsx_example
  class Example extends React.Component {
    render () {
      const options = [
        'Alabama', 'Alaska', 'American Samoa', 'Arizona',
        'Arkansas', 'California', 'Colorado', 'Connecticut',
        'Delaware', 'District Of Columbia',
        'Federated States Of Micronesia', 'Florida', 'Georgia',
        'Guam', 'Hawaii', 'Idaho', 'Illinois'
      ]

      return (
        <FormFieldGroup
          layout="columns"
          vAlign="bottom"
          rowSpacing="medium"
          description={
            <ScreenReaderContent>
              {this.props.label}
            </ScreenReaderContent>
          }
        >
          <Autocomplete {...this.props}>
            {options.map((label, index) => (
              <option key={label} value={'' + index}>{label}</option>
            ))}
          </Autocomplete>
          <Button size={this.props.size}>Click me</Button>
        </FormFieldGroup>
      )
    }
  }

  <form>
    <Example label="Default-size Autocomplete and button" />
    <br/>
    <Example label="Default-size Multiple Autocomplete and button" multiple />
    <br/>
    <Example
      label="Small-size Autocomplete and button"
      size="small"
    />
    <br/>
    <Example
      label="Small-size Multiple Autocomplete and button"
      size="small"
      multiple
    />
    <br/>
    <Example
      label="Large-size Autocomplete and button"
      size="large"
    />
    <br/>
    <Example
      label="Large-size Multiple Autocomplete and button"
      size="large"
      multiple
    />
  </form>
  ```
**/
class Autocomplete extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    /**
     * Determines wether Autocomplete allows multiple values
     */
    multiple: PropTypes.bool,

    /**
    * Each children must be an option element.
    */
    children: CustomPropTypes.Children.oneOf(['option']),
    /**
    * a function that provides a reference to the internal input element
    */
    inputRef: PropTypes.func,
    /**
    * the selected value (must be accompanied by an `onChange` prop)
    */
    selectedOption: CustomPropTypes.controllable(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          label: PropTypes.string.isRequired,
          value: PropTypes.string.isRequired,
          id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
          children: PropTypes.node
        }),
        PropTypes.arrayOf(PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            children: PropTypes.node
          })
        ]))
      ]),
      'onChange',
      'defaultOption'
    ),
    /**
    * value to set on initial render, meant for an uncontrolled component
    */
    defaultOption: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        children: PropTypes.node
      }),
      PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          label: PropTypes.string.isRequired,
          value: PropTypes.string.isRequired,
          id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
          children: PropTypes.node
        })
      ]))
    ]),
    /**
    * for not multiple Autocomplete, allows the user to empty selection
    */
    allowEmpty: PropTypes.bool,

    id: PropTypes.string,

    /**
     * The placement of the content in relation to the trigger, passed down to Position
     */
    placement: CustomPropTypes.placement,
    messages: PropTypes.arrayOf(CustomPropTypes.message),
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    layout: PropTypes.oneOf(['stacked', 'inline']),
    /**
     * Disables menu interaction and renders loadingOption in its place
     */
    loading: PropTypes.bool,
    loadingOption: PropTypes.node,
    /**
     * The menu content to render when no options are present or are filtered away
     */
    emptyOption: PropTypes.node,
    /**
     * The amount of options that are visible without scrolling
     */
    visibleOptionsCount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /**
     * The filter function applied to the options when writing on the input
     */
    filter: PropTypes.func,
    /**
     * The format function called for each Tag to render its contents
     */
    formatSelectedOption: PropTypes.func,
    /**
     * Callback fired when `<Position />` content has been rendered
     */
    onPositioned: PropTypes.func,
    /**
     * Callback fired when the menu is opened
     */
    onOpen: PropTypes.func,
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
     * Callback fired when on the onBlur of the internal input
     */
    onBlur: PropTypes.func,
    /**
     * Callback fired when on the onClick of the internal input
     */
    onClick: PropTypes.func
  }
  /* eslint-enable react/require-default-props */

  static defaultProps = {
    allowEmpty: false,
    emptyOption: '---',
    loadingOption: '---',
    selectedOption: null,
    size: 'medium',
    loading: false,
    visibleOptionsCount: 8,
    inputRef: function (node) {},
    filter: (options, filterText) => {
      return options.filter(
        (option) => option.label.toLowerCase().startsWith(filterText.toLowerCase())
      )
    },
    formatSelectedOption: (tag) => tag.label || tag.children
  }

  constructor (props) {
    super(props)
    const options = parseOptions(props.children)

    this.state = { options }
  }

  _input = null

  get focused () {
    return this._subComponent && this._subComponent.focused
  }

  get invalid () {
    return (
      !!this.props.messages &&
      this.props.messages.findIndex((message) => message.type === 'error') >= 0
    )
  }

  focus = () => {
    this._subComponent && this._subComponent.focus()
  }

  componentWillReceiveProps (nextProps) {
    const options = parseOptions(nextProps.children)

    if (!deepEqual(this.state.options, options)) {
      this.setState({ options })
    }
  }

  handleRef = (node) => {
    this._subComponent = node
  }

  render () {
    const Component = this.props.multiple ? AutocompleteMultiple : AutocompleteSingle

    return (
      <Component
        ref={this.handleRef}
        {...omitProps(this.props, {}, [
          'multiple',
          'defaultOption',
          !this.props.multiple ? 'formatSelectedOption' : ''
        ])}
        options={this.state.options}
        defaultSelectedOption={this.props.defaultOption}
      />
    )
  }
}

export default Autocomplete
