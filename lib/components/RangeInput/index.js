import React, { Component, PropTypes } from 'react'
import shortid from 'shortid'
import themeable from '../../util/themeable'
import classnames from 'classnames'
import CustomPropTypes from '../../util/CustomPropTypes'
import addEventListener from '../../util/addEventListener'
import { pickProps, omitProps } from '../../util/passthroughProps'

import ContextBox from '../ContextBox'
import FormField from '../FormField'

import styles from './styles.css'
import theme from './theme.js'

/**
  An html5 range input/slider component

  ```jsx_example
  <RangeInput label="bar" defaultValue={50} max={100} min={0} />
  ```
 **/
@themeable(theme, styles)
class RangeInput extends Component {
  static propTypes = {
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
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
    messages: PropTypes.arrayOf(CustomPropTypes.formFieldMessage),
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    id: PropTypes.string,
    label: PropTypes.node.isRequired,
    step: PropTypes.number,
    /**
    * A function to format the displayed value
    */
    formatValue: PropTypes.func,
    isBlock: PropTypes.bool
  };

  static defaultProps = {
    step: 1,
    formatValue: (val) => val,
    max: 0,
    min: 0,
    isBlock: true,
    size: 'medium'
  };

  constructor (props) {
    super()

    if (props.value === undefined) {
      this.state = {
        value: props.defaultValue
      }
    }

    this.defaultId = 'RangeInput_' + shortid.generate()
  }

  /* workaround for https://github.com/facebook/react/issues/554 */
  componentDidMount () {
    if (!this.refs.rangeInput) {
      return
    }
    // https://connect.microsoft.com/IE/Feedback/Details/856998
    this.inputListener = addEventListener(this.refs.rangeInput, 'input', this.handleChange)
    this.changeListener = addEventListener(this.refs.rangeInput, 'change', this.handleChange)
  }

  componentWillUnmount () {
    if (!this.refs.rangeInput) {
      return
    }
    this.inputListener.remove()
    this.changeListener.remove()
  }
  /* end workaround */

  handleChange = (event) => {
    const { onChange, value } = this.props

    if (value === undefined) {
      this.setState({ value: event.target.value })
    }

    if (typeof onChange === 'function') {
      onChange(event.target.value)
    }
  }

  get value () {
    return (this.props.value === undefined) ? this.state.value : this.props.value
  }

  get invalid () {
    return this.props.messages && this.props.messages.find((message) => { return message.type === 'error' })
  }

  get id () {
    return this.props.id || this.defaultId
  }

  render () {
    const {
      formatValue,
      size
    } = this.props

    const props = omitProps(this.props, RangeInput.propTypes)

    const classes = {
      [styles.root]: true,
      [styles[size]]: size
    }

    return (
      <FormField
        {...pickProps(this.props, FormField.propTypes)}
        id={this.id}
      >
        <div className={classnames(classes)}>
          <input
            className={styles.input}
            ref="rangeInput"
            type="range"
            role="slider"
            id={this.id}
            aria-valuenow={this.value}
            aria-valuemin={this.props.min}
            aria-valuemax={this.props.max}
            aria-valuetext={formatValue(this.value, this.props.max)}
            {...props} />
          <ContextBox variant="inverse" placement="right">
            <output htmlFor={this.id} className={styles.value}>
              {formatValue(this.value)}
            </output>
          </ContextBox>
        </div>
      </FormField>
    )
  }
}

export default RangeInput
