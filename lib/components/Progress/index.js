import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
import shortid from 'shortid'
import themeable from '../../util/themeable'

import styles from './Progress.css'
import themeVariables from './theme/Progress'
import themeStyles from './theme/Progress.css'

/**
  Progress is an easy-to-customize progress bar or circle (a.k.a, doughnut)

  ### A simple progress bar

  The only required prop is `label`, which is needed for accessibility.

  ```jsx_example
  <Progress label="Percent complete" valueNow={30} valueMax={60} />
  ```

  ### Displaying progress and different sizes

  Turn on the `showOutput` prop to make the component display
  numerical progress. If no `valueMax` prop is supplied,
  Progress will default to displaying progress as a percentage of
  `100` as `valueMax`.

  Use the `size` prop to display small, medium and large progress
  bars. Default is `medium`.

  ```jsx_example
  <div>
    <Progress
      label="Percent complete"
      size="small"
      showOutput={true}
      valueNow={30}
      valueMax={60}
    />
    <br />
    <Progress
      label="Percent complete"
      size="medium"
      showOutput={true}
      valueNow={100}
      formatValue={function (valueNow, valueMax) {
        return valueNow + ' out of ' + valueMax }
      }
    />
    <br />
    <Progress
      label="Percent complete"
      size="large"
      showOutput={true}
      valueNow={66}
    />
  </div>
  ```

  Setting the `outputType` to `counter` stops the component from
  displaying percent. Instead, it will show the current value
  against the maximum value.

  ```jsx_example
  <Progress
    label="Modules complete"
    showOutput={true}
    valueNow={24}
    valueMax={60}
    outputType="counter"
    formatValue={function (valueNow, valueMax) {
      return valueNow + ' out of ' + valueMax }
    }
  />
  ```

  ### Doughnuts!

  Any progress bar can also be displayed as a circle via the `variant` prop.

  Use the `animateOnMount` prop to make the doughnut's meter animate in
  when the component mounts. (Hard to see on this page because the animation
  only takes a second. Click the Codepen link to preview this feature.)

  Please note that you won't see any animation in IE11/Win7.

  ```jsx_example
  <div style={{textAlign: 'center'}}>
    <Progress
      label="Chapters read"
      animateOnMount={true}
      showOutput={true}
      outputType="counter"
      formatValue={function (valueNow, valueMax) {
        return valueNow + ' out of ' + valueMax }
      }
      variant="circle"
      size="small"
      valueNow={58} />
    <Progress
      label="Courses taken toward degree"
      animateOnMount={true}
      showOutput={true}
      variant="circle"
      valueMax={12}
      valueNow={10} />
    <Progress
      label="Modules finished"
      animateOnMount={true}
      showOutput={true}
      outputType="counter"
      formatValue={function (valueNow, valueMax) {
        return valueNow + ' out of ' + valueMax }
      }
      variant="circle"
      size="large"
      valueNow={100} />
  </div>
  ```

  ### Inverse color scheme for dark backgrounds

  ```jsx_example
  <div style={{padding: '1.5rem', background: '#444'}}>
    <div>
      <Progress
        label="Percent complete"
        showOutput={true}
        variant="bar-inverse"
        valueNow={34}
      />
    </div>
    <div style={{marginTop: '1rem', textAlign: 'center'}}>
      <Progress
        label="Test score"
        animateOnMount={true}
        showOutput={true}
        variant="circle-inverse"
        size="large"
        valueNow={50}
        valueMax={80} />
      <Progress
        label="Chapters read"
        showOutput={true}
        animateOnMount={true}
        outputType="counter"
        formatValue={function (valueNow, valueMax) {
          return valueNow + ' out of ' + valueMax }
        }
        variant="circle-inverse"
        valueMax={10}
        valueNow={10} />
    </div>
  </div>
  ```
**/
@themeable(themeVariables, themeStyles)
export default class Progress extends Component {
  static propTypes = {
    /**
    * If the outputType is set to counter, use this function
    * to set a human-readable value for the aria-valuetext
    * attribute. For example, "80 out of 100". (See examples
    * for how to use this prop.)
    */
    formatValue: PropTypes.func,
    /**
    * A label is required for accessibility
    */
    label: PropTypes.string.isRequired,
    /**
    * Show percent complete OR a value / max value counter
    */
    outputType: PropTypes.oneOf(['counter', 'percent']),
    /**
    * Show the output as text as the progress bar moves
    */
    showOutput: PropTypes.bool,
    /**
    * Different-sized progress bars and circles
    */
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    /**
    * Animate the progress meter to the current value when the component
    * has mounted
    */
    animateOnMount: PropTypes.bool,
    /**
    * Maximum value (defaults to 100)
    */
    valueMax: PropTypes.number,
    /**
    * Receives the progress of the event
    */
    valueNow: PropTypes.number,
    /**
    * Choose either a progress bar or circle. The -inverse variants are for
    * when you need the Progress component to appear on dark backgrounds
    */
    variant: PropTypes.oneOf(['bar', 'circle', 'bar-inverse', 'circle-inverse'])
  }

  static defaultProps = {
    formatValue: (val) => val,
    outputType: 'percent',
    showOutput: false,
    size: 'medium',
    animateOnMount: false,
    valueMax: 100,
    valueNow: 0,
    variant: 'bar'
  }

  constructor (props) {
    super()

    this.titleId = 'Progress__' + shortid.generate()

    this.state = {
      circleAnimateEnter: props.animateOnMount && props.variant.startsWith('circle')
    }
  }

  componentWillMount () {
    if (this.state.circleAnimateEnter) {
      this.timeout = setTimeout(() => {
        this.setState({
          circleAnimateEnter: false
        })
      }, 500)
    }
  }

  componentWillUnmount () {
    clearTimeout(this.timeout)
  }

  radius () {
    switch (this.props.size) {
      case 'small':
        return '1.8em'
      case 'large':
        return '3.5em'
      default:
        return '2.75em'
    }
  }

  getPercent () {
    return Math.round((this.props.valueNow / this.props.valueMax) * 100)
  }

  readableOutput () {
    switch (this.props.outputType) {
      case 'counter':
        return this.props.formatValue(this.props.valueNow, this.props.valueMax)
      default:
        return this.getPercent() + '%'
    }
  }

  renderMeter () {
    if (this.props.variant === 'circle' || this.props.variant === 'circle-inverse') {
      let style
      // get a numerical value for the meter circle's radius
      const meterRadius = parseFloat(this.radius().replace(/[^\d.-]/g, ''))
      // get the circumference of the meter circle
      const meterCircumference = 2 * 3.1416 * meterRadius
      // figure out how much offset to give the stroke to show the % complete
      const dashOffset =
        meterCircumference - ((this.props.valueNow / this.props.valueMax) * meterCircumference)
      // send the stroke-dashoffset to the meter circle, checking
      // to make sure current value doesn't exceed max value
      if (this.props.valueNow <= this.props.valueMax) {
        style = {strokeDashoffset: dashOffset + 'em'}
      } else {
        style = {strokeDashoffset: '0em'}
      }

      return (
        <svg
          className={styles.circleSVG}
          role="progressbar"
          aria-valuetext={this.readableOutput()}
          aria-valuenow={this.props.valueNow}
          aria-valuemax={this.props.valueMax}>
          <title id={this.titleId}>{this.props.label}</title>
          <circle
            className={styles.circleShadow}
            role="presentation"
            cx="50%"
            cy="50%"
            r={this.radius()}></circle>
          <circle
            className={styles.circleTrack}
            role="presentation"
            cx="50%"
            cy="50%"
            r={this.radius()}></circle>
          <circle
            className={styles.circleMeter}
            role="presentation"
            style={style}
            cx="50%"
            cy="50%"
            r={this.radius()}></circle>
        </svg>
      )
    } else {
      return (
        <progress
          className={styles.progress}
          max={this.props.valueMax}
          value={this.props.valueNow}
          role="progressbar"
          aria-valuetext={this.readableOutput()}
          aria-valuenow={this.props.valueNow}
          aria-valuemax={this.props.valueMax}
          aria-label={this.props.label} />
      )
    }
  }

  renderOutputText () {
    if (this.props.outputType === 'counter') {
      return (
        <span className={styles.outputCounterText}>
          <strong className={styles.outputCounterValueNow}>
            {this.props.valueNow}
          </strong>
          <span className={styles.outputCount}>
            <span className={styles.outputCountSlash}>&#47;</span>
            {this.props.valueMax}
          </span>
        </span>
      )
    } else {
      return (
        <span>
          <strong className={styles.outputCounterValueNow}>
            {this.getPercent()}
          </strong>
          <span className={styles.outputPercent}>%</span>
        </span>
      )
    }
  }

  renderOutput () {
    if (this.props.variant === 'circle' || this.props.variant === 'circle-inverse') {
      return (
        <div className={styles.output} aria-hidden="true">
          <div className={styles.circleOutputText}>
            {this.renderOutputText()}
          </div>
        </div>
      )
    } else {
      return (
        <div className={styles.output} aria-hidden="true">
          {this.renderOutputText()}
        </div>
      )
    }
  }

  render () {
    const classes = {
      [styles.root]: true,
      [styles[this.props.size]]: true,
      [styles.bar]: this.props.variant === 'bar' || this.props.variant === 'bar-inverse',
      [styles.circle]: this.props.variant === 'circle' || this.props.variant === 'circle-inverse',
      [styles.lightBg]: this.props.variant === 'bar' || this.props.variant === 'circle',
      [styles.darkBg]: this.props.variant === 'bar-inverse' || this.props.variant === 'circle-inverse',
      [styles.counter]: this.props.outputType === 'counter',
      [styles.almostDone]: this.props.valueNow / this.props.valueMax >= 1,
      [styles.animateOnMount]: this.state.circleAnimateEnter,
      [styles.showOutput]: this.props.showOutput
    }

    return (
      <div className={classNames(classes)}>
        {this.renderMeter()}
        {this.props.showOutput ? this.renderOutput() : null}
      </div>
    )
  }
}
