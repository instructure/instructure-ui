import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ProgressBar from './ProgressBar'
import ProgressCircle from './ProgressCircle'
import CustomPropTypes from '../../util/CustomPropTypes'

/**
  Progress is an easy-to-customize progress bar or circle (a.k.a, doughnut)

  ### Basic progress bar and circle
  The Progress component defaults to a simple progress bar with no text
  output. The only required prop is `label`, which is needed for accessibility.

  To render the Progress component as a circle/doughnut instead, set the
  `variant` to `circle`.

  ```jsx_example
  <div>
    <Progress label="Loading completion" valueNow={40} valueMax={60} />
    <br />
    <Progress
      label="Loading completion"
      variant="circle"
      valueNow={40}
      valueMax={60} />
  </div>
  ```

  ### Changing the size and adding margin

  Use the `size` prop to display `x-small`, `small`, `medium` and `large`
  progress bars. (Default is `medium`.) Use the `margin` prop to add margin
  around the progress bar/circle.

  ```jsx_example
  <div>
    <Progress
      label="Modules complete"
      size="x-small"
      valueNow={5}
      valueMax={20}
      margin="medium"
    />
    <Progress
      label="Modules complete"
      size="small"
      valueNow={10}
      valueMax={20}
      margin="large small xx-large x-small"
    />
    <Progress
      label="Modules complete"
      valueNow={15}
      valueMax={20}
      margin="x-small none large none"
    />
    <Progress
      label="Modules complete"
      size="large"
      valueNow={20}
      valueMax={20}
      margin="x-large xx-small large none"
    />
    <div>
      <Progress
        label="Modules complete"
        size="x-small"
        variant="circle"
        valueNow={5}
        valueMax={20}
        margin="xx-large"
      />
      <Progress
        label="Modules complete"
        size="small"
        variant="circle"
        valueNow={10}
        valueMax={20}
        margin="xxx-small"
      />
      <Progress
        label="Modules complete"
        variant="circle"
        valueNow={15}
        valueMax={20}
        margin="large"
      />
      <Progress
        label="Modules complete"
        size="large"
        variant="circle"
        valueNow={20}
        valueMax={20}
        margin="none medium"
      />
    </div>
  </div>
  ```

  ### Displaying text output

  Text output is intentionally left flexible: Via the `formatDisplayedValue`
  prop, developers can use the `valueMax` and `valueNow` props to create
  whatever output they desire - using whatever markup and internationalization
  library tags they need. Common usage examples are shown below. Note the
  use of the [Typography](#Typography) component for easy text formatting.

  Don't forget to use the `formatValueText` prop to create easily
  understandable output for screenreader users.

  #### Showing percent

  ```jsx_example
  <div>
  <Progress
    label="Percent complete"
    formatValueText={function (valueNow, valueMax) {
      return Math.round((valueNow / valueMax * 100)) + ' percent'
    }}
    formatDisplayedValue={function (valueNow, valueMax) {
      return (
        <Typography weight="bold">
          {Math.round(valueNow / valueMax * 100)}
          <Typography color="secondary" weight="light"><sup>%</sup></Typography>
        </Typography>
      )
    }}
    valueMax={88}
    valueNow={33}
  />
  <Progress
    label="Percent complete"
    formatValueText={function (valueNow, valueMax) {
      return Math.round((valueNow / valueMax * 100)) + ' percent'
    }}
    formatDisplayedValue={function (valueNow, valueMax) {
      return (
        <Typography weight="bold" size="large">
          {Math.round(valueNow / valueMax * 100)}
          <Typography color="secondary" weight="light"><sup>%</sup></Typography>
        </Typography>
      )
    }}
    variant="circle"
    valueMax={88}
    valueNow={33}
  />
  </div>
  ```
  #### Showing a counter

  Note how the `formatValueText` creates a readable output for
  screenreader users.

  ```jsx_example
  <div>
  <Progress
    size="small"
    label="Chapters complete"
    formatValueText={function (valueNow, valueMax) {
      return valueNow + ' out of ' + valueMax
    }}
    formatDisplayedValue={function (valueNow, valueMax) {
      return (
        <span>
          <Typography size="small">{valueNow} / {valueMax}</Typography>
        </span>
      )
    }}
    valueMax={88}
    valueNow={33}
  />
  <Progress
    label="Questions correct"
    formatValueText={function (valueNow, valueMax) {
      return valueNow + ' out of ' + valueMax
    }}
    formatDisplayedValue={function (valueNow, valueMax) {
      return (
        <span>
          <Typography size="x-large" weight="bold">{valueNow}</Typography>
          <br />
          <Typography color="secondary" size="small">/&nbsp;</Typography>
          <Typography color="secondary" size="small">{valueMax}</Typography>
        </span>
      )
    }}
    variant="circle"
    valueMax={88}
    valueNow={33}
  />
  </div>
  ```

  #### Using conditionals to change the output based on the score

  ```jsx_example
  <div>
  <Progress
    label="Quiz score"
    formatValueText={function (valueNow, valueMax) {
      return valueNow + ' of ' + valueMax
    }}
    formatDisplayedValue={function (valueNow, valueMax) {
      if (valueNow > (valueMax / 2)) {
        return (
          <Typography weight="bold" size="x-large">
            PASS
          </Typography>
        )
      } else {
        return (
        <Typography weight="bold" size="x-large">
          FAIL
        </Typography>
        )
      }
    }}
    size="large"
    variant="circle"
    valueNow={44}
    valueMax={124}
  />
  <Progress
    label="Quiz score"
    formatValueText={function (valueNow, valueMax) {
      return valueNow + ' of ' + valueMax
    }}
    formatDisplayedValue={function (valueNow, valueMax) {
      if (valueNow > (valueMax / 2)) {
        return (
          <Typography weight="bold" size="x-large">
            PASS
          </Typography>
        )
      } else {
        return (
        <Typography weight="bold" size="x-large">
          FAIL
        </Typography>
        )
      }
    }}
    size="large"
    variant="circle"
    valueNow={110}
    valueMax={124}
  />
  </div>
  ```

  ### animateOnMount (circle variant only)

  Use the `animateOnMount` prop to make the doughnut's meter animate in
  when the component mounts. (Hard to see on this page because the animation
  only takes a second. Click the Codepen link to preview this feature.)

  Please note that you won't see any animation in IE11/Win7.

  ```jsx_example
    <div>
      <Progress
        animateOnMount
        label="Modules passed"
        formatValueText={function (valueNow, valueMax) {
          return valueNow + ' out of ' + valueMax
        }}
        formatDisplayedValue={function (valueNow, valueMax) {
          return (
            <span>
              <Typography size="xx-large" weight="bold">{valueNow}</Typography>
              <br />
              <Typography color="secondary" size="small">of </Typography>
              <Typography color="secondary" size="small">{valueMax}</Typography>
            </span>
          )
        }}
        size="large"
        variant="circle"
        valueNow={66}
      />
    </div>
  ```

  ### Inverse color scheme for dark backgrounds

  Use the `bar-inverse` and `circle-inverse` variants to make the Progress
  track dark instead of light.

  ```jsx_example_inverse
    <div>
    <Progress
      label="Percent complete"
      formatValueText={function (valueNow, valueMax) {
        return Math.round((valueNow / valueMax * 100)) + ' percent'
      }}
      formatDisplayedValue={function (valueNow, valueMax) {
        return (
          <Typography weight="bold" color="primary-inverse">
            {Math.round(valueNow / valueMax * 100)}
            <Typography
              color="secondary"
              weight="light"
              color="secondary-inverse">
                <sup>%</sup>
            </Typography>
          </Typography>
        )
      }}
      variant="bar-inverse"
      valueNow={75}
    />
    <Progress
      label="Percent complete"
      formatValueText={function (valueNow, valueMax) {
        return Math.round((valueNow / valueMax * 100)) + ' percent'
      }}
      formatDisplayedValue={function (valueNow, valueMax) {
        return (
          <Typography weight="bold" color="primary-inverse">
            {Math.round(valueNow / valueMax * 100)}
            <Typography
              color="secondary"
              weight="light"
              color="secondary-inverse">
                <sup>%</sup>
            </Typography>
          </Typography>
        )
      }}
      size="small"
      variant="circle-inverse"
      valueNow={75}
    />
    <Progress
      label="Percent complete"
      formatValueText={function (valueNow, valueMax) {
        return valueNow + ' out of ' + valueMax
      }}
      formatDisplayedValue={function (valueNow, valueMax) {
        return (
          <span>
            <Typography color="primary-inverse" size="x-large" weight="bold">{valueNow}</Typography>
            <br />
            <Typography color="secondary-inverse" size="small">of </Typography>
            <Typography color="secondary-inverse" size="small">{valueMax}</Typography>
          </span>
        )
      }}
      size="large"
      variant="circle-inverse"
      valueNow={124}
      valueMax={124}
    />
    </div>
  ```
**/
class Progress extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    /**
    * A label is required for accessibility
    */
    label: PropTypes.string.isRequired,
    /**
    * Different-sized progress bars and circles
    */
    size: PropTypes.oneOf(['x-small', 'small', 'medium', 'large']),
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
    /**
    * The bar changes to your theme's success color when complete
    */
    successColor: PropTypes.bool,
    /**
    * Choose either a progress bar or circle. The `-inverse` variants are for
    * when you need the Progress component to appear on inverse backgrounds
    */
    variant: PropTypes.oneOf(['bar', 'circle', 'bar-inverse', 'circle-inverse']),
    /**
    * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
    * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
    * familiar CSS-like shorthand. For example: `margin="small auto large"`.
    */
    margin: CustomPropTypes.spacing
  }
  /* eslint-enable react/require-default-props */

  static defaultProps = {
    formatValueText: (valueNow, valueMax) => `${valueNow} / ${valueMax}`,
    size: 'medium',
    animateOnMount: false,
    valueMax: 100,
    valueNow: 0,
    variant: 'bar',
    successColor: true
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
