import React, { Component } from 'react'
import styles from './RangeInput.css'

class RangeInput extends Component {
  constructor () {
    super()
    this.state = {}
  }

  /* workaround for https://github.com/facebook/react/issues/554 */
  componentDidMount () {
    // https://connect.microsoft.com/IE/Feedback/Details/856998
    this.refs.rangeInput.addEventListener('input', this.handleChange.bind(this), false)
    this.refs.rangeInput.addEventListener('change', this.handleChange.bind(this), false)
  }

  componentWillUnmount () {
    this.refs.rangeInput.removeEventListener('input', this.handleChange, false)
    this.refs.rangeInput.removeEventListener('change', this.handleChange, false)
  }
  /* end workaround */

  handleChange (event) {
    this.setState({ value: event.target.value })
    this.props.onChange(event.target.value)
  }

/* eslint no-unused-vars: 0 */
/* eslint no-undef: 0 */
  render () {
    const {
      labelText,
      formatValue,
      onChange,
      ...props
    } = this.props

    return (
      <label className={styles.root}>
        <div className={styles.label}>
          {labelText}
        </div>
        <div className={styles.control}>
          <input
            className={styles.input}
            ref="rangeInput"
            type="range"
            role="slider"
            aria-valuenow={this.props.defaultValue}
            aria-valuemin={this.props.min}
            aria-valuemax={this.props.max}
            aria-valuetext={formatValue(this.state.value)}
            onChange={function () {}}
            {...props} />
          <output htmlFor={this.props.name} className={styles.value}>
            { formatValue(this.state.value || this.props.defaultValue) }
          </output>
        </div>
      </label>
    )
  }
}

RangeInput.propTypes = {
  min:           React.PropTypes.number.isRequired,
  max:           React.PropTypes.number.isRequired,
  defaultValue:  React.PropTypes.number.isRequired,
  labelText:     React.PropTypes.string.isRequired,
  name:          React.PropTypes.string.isRequired,
  step:          React.PropTypes.number,
  formatValue:   React.PropTypes.func,
  onChange:      React.PropTypes.func
}

RangeInput.defaultProps = {
  step: 1,
  onChange: function () {},
  formatValue: val => val
}

export default RangeInput
