import React, { Component, PropTypes } from 'react'
import styles from './RangeInput.css'

/**
  An html5 range input/slider component

  ```jsx_example
  <RangeInput labelText="bar" defaultValue={50} max={100} min={0} name="opacity" />
  ```
 **/
export default class RangeInput extends Component {
  static propTypes = {
    min:           PropTypes.number.isRequired,
    max:           PropTypes.number.isRequired,
    defaultValue:  PropTypes.number.isRequired,
    labelText:     PropTypes.string.isRequired,
    name:          PropTypes.string.isRequired,
    step:          PropTypes.number,
    /**
    * A function to format the displayed value
    */
    formatValue:   PropTypes.func,
    onChange:      PropTypes.func
  };

  static defaultProps = {
    step: 1,
    onChange: function () {},
    formatValue: val => val,
    max: 0,
    min: 0,
    defaultValue: 50
  };

  constructor (props) {
    super()
    this.state = {
      value: props.defaultValue
    }
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
    const { onChange } = this.props
    this.setState({ value: event.target.value })
    onChange(event.target.value)
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
        <label className={styles.label} htmlFor={props.name}>
          {labelText}
        </label>
        <div className={styles.control}>
          <input
            className={styles.input}
            ref="rangeInput"
            type="range"
            role="slider"
            aria-valuenow={this.state.value}
            aria-valuemin={props.min}
            aria-valuemax={props.max}
            aria-valuetext={formatValue(this.state.value)}
            {...props} />
          <output htmlFor={props.name} className={styles.value}>
            {formatValue(this.state.value)}
          </output>
        </div>
      </div>
    )
  }
}

