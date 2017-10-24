import React, { Component } from 'react'
import PropTypes from 'prop-types'

import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'

import ProgressBar from './ProgressBar'
import ProgressCircle from './ProgressCircle'

/**
---
category: components
---
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
