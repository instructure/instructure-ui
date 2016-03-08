import React, { Component, PropTypes } from 'react'
import shortid from 'shortid'
import themeable from '../../util/themeable'
import CustomPropTypes from '../../util/CustomPropTypes'

import styles from './RangeInput.css'
import themeVariables from './theme/RangeInput'
import themeStyles from './theme/RangeInput.css'

/**
  An html5 range input/slider component

  ```jsx_example
  <RangeInput labelText="bar" defaultValue={50} max={100} min={0} />
  ```
 **/
@themeable(themeVariables, themeStyles)
export default class RangeInput extends Component {
  static propTypes = {
    min:           PropTypes.number.isRequired,
    max:           PropTypes.number.isRequired,
    /**
    * value to set on initial render
    */
    defaultValue: PropTypes.number,
    /**
    * the selected value (must be accompanied by an `onChange` prop)
    */
    value: CustomPropTypes.controllable(PropTypes.number),
    /**
    * when used with the `value` prop, the component will not control its own state
    */
    onChange: PropTypes.func,
    labelText:     PropTypes.string.isRequired,
    step:          PropTypes.number,
    /**
    * A function to format the displayed value
    */
    formatValue:   PropTypes.func
  };

  static defaultProps = {
    step: 1,
    formatValue: (val) => val,
    max: 0,
    min: 0,
    defaultValue: 50
  };

  constructor (props) {
    super()

    if (!props.value) {
      this.state = {
        value: props.defaultValue
      }
    }

    this.inputId = 'RangeInput_' + shortid.generate()
  }

  /* workaround for https://github.com/facebook/react/issues/554 */
  componentDidMount () {
    if (!this.refs.rangeInput) {
      return
    }
    // https://connect.microsoft.com/IE/Feedback/Details/856998
    this.refs.rangeInput.addEventListener('input', this.handleChange.bind(this), false)
    this.refs.rangeInput.addEventListener('change', this.handleChange.bind(this), false)
  }

  componentWillUnmount () {
    if (!this.refs.rangeInput) {
      return
    }
    this.refs.rangeInput.removeEventListener('input', this.handleChange, false)
    this.refs.rangeInput.removeEventListener('change', this.handleChange, false)
  }
  /* end workaround */

  handleChange (event) {
    const { onChange, value } = this.props

    if (!value) {
      this.setState({ value: event.target.value })
    }

    if (typeof onChange === 'function') {
      onChange(event.target.value)
    }
  }

  get value () {
    return this.props.value || this.state.value
  }

  render () {
    const {
      labelText,
      formatValue,
      onChange,
      ...props
    } = this.props

    return (
      <div className={styles.root}>
        <label className={styles.label} htmlFor={this.inputId}>
          {labelText}
        </label>
        <div className={styles.control}>
          <input
            className={styles.input}
            ref="rangeInput"
            type="range"
            role="slider"
            id={this.inputId}
            aria-valuenow={this.value}
            aria-valuemin={props.min}
            aria-valuemax={props.max}
            aria-valuetext={formatValue(this.value)}
            {...props} />
          <output htmlFor={this.inputId} className={styles.value}>
            {formatValue(this.value)}
          </output>
        </div>
      </div>
    )
  }
}

