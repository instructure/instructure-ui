import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import shortid from 'shortid'
import themeable from '../../../util/themeable'

import styles from './styles.css'
import theme from './theme'

@themeable(theme, styles)
export default class ProgressCircle extends Component {
  static propTypes = {
    /**
    * A label is required for accessibility
    */
    label: PropTypes.string.isRequired,
    /**
    * Different-sized progress bars and circles
    */
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    /**
    * Maximum value (defaults to 100)
    */
    valueMax: PropTypes.number,
    /**
    * Receives the progress of the event
    */
    valueNow: PropTypes.number,
    /**
    * A function that returns the current value formatted for screen readers
    */
    formatValueText: PropTypes.func,
    /**
    * A function to format the displayed value. If null the value will not display.
    */
    formatDisplayedValue: PropTypes.func,
    /**
    * Animate the progress meter to the current value when the component
    * has mounted
    */
    animateOnMount: PropTypes.bool,
    variant: PropTypes.oneOf(['default', 'inverse'])
  }

  static defaultProps = {
    formatValueText: (valueNow, valueMax) => valueNow + ' / ' + valueMax,
    size: 'medium',
    valueMax: 100,
    valueNow: 0,
    variant: 'default',
    showValue: false,
    animateOnMount: false
  }

  constructor (props) {
    super()

    this.labelId = 'Progress__' + shortid.generate()

    this.state = {
      animateOnMount: props.animateOnMount
    }
  }

  componentWillMount () {
    if (this.state.animateOnMount) {
      this.timeout = window.setTimeout(() => {
        this.setState({
          animateOnMount: false
        })
      }, 500)
    }
  }

  componentWillUnmount () {
    window.clearTimeout(this.timeout)
  }

  dashOffset () {
    const {
      valueNow,
      valueMax
    } = this.props

    // send the stroke-dashoffset to the meter circle, checking
    // to make sure current value doesn't exceed max value
    if (valueNow < valueMax) {
      // get the circumference of the meter circle
      const circumference = parseFloat(this.theme[this.props.size].circumference)
      // figure out how much offset to give the stroke to show the % complete
      return circumference - ((valueNow / valueMax) * circumference)
    } else {
      return 0
    }
  }

  render () {
    const classes = {
      [styles.root]: true,
      [styles[this.props.size]]: true,
      [styles[this.props.variant]]: true,
      [styles.done]: this.props.valueNow / this.props.valueMax >= 1,
      [styles.animateOnMount]: this.state.animateOnMount
    }

    const {
      formatDisplayedValue,
      formatValueText,
      valueNow,
      valueMax,
      label
    } = this.props

    const valueText = formatValueText(valueNow, valueMax)
    const value = (typeof formatDisplayedValue === 'function') && formatDisplayedValue(valueNow, valueMax)

    const style = this.state.animateOnMount ? null : {
      strokeDashoffset: this.dashOffset() + 'em'
    }

    const radius = this.theme[this.props.size].radius

    return (
      <div className={classnames(classes)}>
        <svg
          className={styles.circle}
          role="progressbar"
          aria-labelledby={this.labelId}
          aria-valuetext={valueText}
          aria-valuenow={valueNow}
          aria-valuemax={valueMax}>
          <title id={this.labelId}>{label}</title>
          <circle
            className={styles.shadow}
            role="presentation"
            cx="50%"
            cy="50%"
            r={radius} />
          <circle
            className={styles.track}
            role="presentation"
            cx="50%"
            cy="50%"
            r={radius} />
          <circle
            className={styles.meter}
            role="presentation"
            style={style}
            cx="50%"
            cy="50%"
            r={radius} />
        </svg>
        { value && <span className={styles.center}><span className={styles.value}>{value}</span></span> }
      </div>
    )
  }
}
