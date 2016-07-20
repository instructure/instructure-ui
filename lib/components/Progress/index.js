import React, { Component, PropTypes } from 'react'
import ProgressBar from './ProgressBar'
import ProgressCircle from './ProgressCircle'

/**
  Progress is an easy-to-customize progress bar or circle (a.k.a, doughnut)

  ### A simple progress bar

  The only required prop is `label`, which is needed for accessibility.

  ```jsx_example
  <Progress label="Percent complete" valueNow={30} valueMax={60} />
  ```

  ### Displaying progress and different sizes

  Set the `formatDisplayedValue` prop to make the component display
  the progress as text.

  Use the `size` prop to display small, medium and large progress
  bars. Default is `medium`.

  ```jsx_example
  <div>
    <Progress
      label="Percent complete"
      size="small"
      valueNow={30}
    />
    <br />
    <Progress
      label="Chapters read"
      size="medium"
      valueNow={10}
      valueMax={10}
      formatDisplayedValue={function (valueNow, valueMax) {
        return (
          <span>
            <Typography weight="bold">{valueNow}</Typography>
            <Typography weight="light"> of </Typography>
            {valueMax}
          </span>
        )
      }}
    />
    <br />
    <Progress
      label="Percent complete"
      size="large"
      valueNow={66}
      formatDisplayedValue={function (valueNow, valueMax) {
        return (
          <Typography weight="bold" lineHeight="fit">
            {valueNow / valueMax * 100}
            <Typography weight="light"><sup>%</sup></Typography>
          </Typography>
        )
      }}
    />
  </div>
  ```

  ### mmmmm Doughnuts!

  Any progress bar can also be displayed as a circle via the `variant` prop.

  Use the `animateOnMount` prop to make the doughnut's meter animate in
  when the component mounts. (Hard to see on this page because the animation
  only takes a second. Click the Codepen link to preview this feature.)

  Please note that you won't see any animation in IE11/Win7.

  ```jsx_example
    <div>
      <Progress
        label="Chapters read"
        animateOnMount
        formatValueText={function (valueNow, valueMax) {
          return valueNow + ' of ' + valueMax
        }}
        variant="circle"
        size="small"
        valueNow={58}
      />
      <Progress
        label="Courses taken toward degree"
        animateOnMount
        variant="circle"
        valueMax={12}
        valueNow={10}
      />
      <Progress
        label="Percent complete"
        animateOnMount={true}
        formatValueText={function (valueNow, valueMax) {
          return (valueNow / valueMax * 100) + ' percent'
        }}
        formatDisplayedValue={function (valueNow, valueMax) {
          return (
            <Typography weight="bold" lineHeight="fit">
              {valueNow / valueMax * 100}
              <Typography weight="light"><sup>%</sup></Typography>
            </Typography>
          )
        }}
        variant="circle"
        size="large"
        valueNow={100}
      />
    </div>
  ```

  ### Inverse color scheme for dark backgrounds

  ```jsx_example_inverse
    <div>
      <Progress
        label="Percent complete"
        variant="bar-inverse"
        valueNow={34}
        formatDisplayedValue={function (valueNow, valueMax) {
          return (
            <Typography weight="bold" lineHeight="fit">
              {valueNow / valueMax * 100}
              <Typography weight="light"><sup>%</sup></Typography>
            </Typography>
          )
        }}
      />
      <br/>
      <Progress
        label="Percent complete"
        size="small"
        variant="bar-inverse"
        valueNow={100}
      />
      <br />
      <Progress
        label="Test score"
        animateOnMount
        variant="circle-inverse"
        size="medium"
        valueNow={50}
        valueMax={80} />
      <Progress
        label="Percent complete"
        animateOnMount
        formatValueText={function (valueNow, valueMax) {
          return (valueNow / valueMax * 100) + ' percent'
        }}
        formatDisplayedValue={function (valueNow, valueMax) {
          return (
            <Typography weight="bold" lineHeight="fit">
              {valueNow / valueMax * 100}
              <Typography tag="sup" weight="light">%</Typography>
            </Typography>
          )
        }}
        variant="circle-inverse"
        size="large"
        valueNow={100}
      />
    </div>
  ```
**/
class Progress extends Component {
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
    readOnly: PropTypes.bool,
    /**
    * Animate the progress meter to the current value when the component
    * has mounted
    */
    animateOnMount: PropTypes.bool,
    /**
    * Choose either a progress bar or circle. The `-inverse` variants are for
    * when you need the Progress component to appear on inverse backgrounds
    */
    variant: PropTypes.oneOf(['bar', 'circle', 'bar-inverse', 'circle-inverse'])
  }

  static defaultProps = {
    formatValueText: (valueNow, valueMax) => `${valueNow} / ${valueMax}`,
    size: 'medium',
    animateOnMount: false,
    valueMax: 100,
    valueNow: 0,
    variant: 'bar'
  }

  render () {
    const variant = this.props.variant
    const childVariant = (variant === 'bar-inverse' || variant === 'circle-inverse') ? 'inverse' : 'default'

    if (variant === 'circle' || variant === 'circle-inverse') {
      return <ProgressCircle {...this.props} variant={childVariant} />
    } else {
      return <ProgressBar {...this.props} variant={childVariant} />
    }
  }
}

export default Progress
export { default as ProgressBar } from './ProgressBar'
export { default as ProgressCircle } from './ProgressCircle'
