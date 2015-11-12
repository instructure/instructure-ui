import React, { Component, PropTypes } from 'react'
import styles from './RangeInput.css'

export default class RangeInput extends Component {
  static displayName = 'RangeInput'

  static propTypes = {
    min:           PropTypes.number.isRequired,
    max:           PropTypes.number.isRequired,
    defaultValue:  PropTypes.number.isRequired,
    labelText:     PropTypes.string.isRequired,
    name:          PropTypes.string.isRequired,
    step:          PropTypes.number,
    formatValue:   PropTypes.func,
    onChange:      PropTypes.func
  }

  static defaultProps = {
    step: 1,
    onChange: function () {},
    formatValue: val => val
  }

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

  valueNow () {
    return this.state.value || this.props.defaultValue
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
        <label className={styles.label} htmlFor={this.props.name}>
          {labelText}
        </label>
        <div className={styles.control}>
          <input
            className={styles.input}
            ref="rangeInput"
            type="range"
            role="slider"
            aria-valuenow={this.valueNow()}
            aria-valuemin={this.props.min}
            aria-valuemax={this.props.max}
            aria-valuetext={formatValue(this.valueNow())}
            {...props} />
          <output htmlFor={this.props.name} className={styles.value}>
            { formatValue(this.valueNow()) }
          </output>
        </div>
      </div>
    )
  }
}

