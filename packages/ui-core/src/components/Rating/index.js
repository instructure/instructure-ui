import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import themeable from '@instructure/ui-themeable'
import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'

import Container from '../Container'

import RatingIcon from './RatingIcon'

import styles from './styles.css'
import theme from './theme'

/**
---
category: components
---
**/
@themeable(theme, styles)
class Rating extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    /**
    * A label is required for accessibility
    */
    label: PropTypes.string.isRequired,
    /**
    * A function that returns the current value formatted for screen readers
    */
    formatValueText: PropTypes.func,
    /**
    * Choose from a 0-3 or 0-5 rating system
    */
    iconCount: PropTypes.oneOf([3, 5]),
    /**
    * Choose from different rating icon sizes
    */
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    /**
    * The maximum rating (defaults to iconCount)
    */
    valueMax: PropTypes.number,
    /**
    * The current rating
    */
    valueNow: PropTypes.number,
    /**
    * Set to make the icons animate when they become filled
    */
    animateFill: PropTypes.bool,
    /**
    * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
    * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
    * familiar CSS-like shorthand. For example: `margin="small auto large"`.
    */
    margin: CustomPropTypes.spacing
  }
  /* eslint-enable react/require-default-props */

  static defaultProps = {
    animateFill: false,
    formatValueText: (filled, iconCount) => `${filled} / ${iconCount}`,
    iconCount: 3,
    size: 'medium',
    valueNow: 0
  }

  get filled () {
    const {
      valueNow,
      iconCount,
      valueMax
    } = this.props

    // prevent divide by zero errors
    const max = (valueMax > 0) ? valueMax : iconCount

    const filledIcons = Math.round((valueNow * iconCount) / max)

    // Handle edge case where valueNow is greater than valueMax
    if (filledIcons > iconCount) {
      return iconCount
    } else {
      return filledIcons
    }
  }

  get empty () {
    return this.props.iconCount - this.filled
  }

  render () {
    const {
      iconCount,
      animateFill,
      size,
      margin,
      formatValueText
    } = this.props

    const classes = {
      [styles.root]: true
    }

    const valueText = formatValueText(this.filled, iconCount)

    /* eslint-disable react/no-array-index-key */
    return (
      <Container
        className={classnames(classes)}
        margin={margin}
        role="progressbar"
        aria-valuetext={valueText}
        aria-valuenow={this.filled}
        aria-valuemax={this.props.iconCount}
        title={this.props.label}
      >
        {
          [...Array(this.filled)].map((x, i) => (
            <RatingIcon
              key={i + 1}
              filled
              animateFill={animateFill}
              animationDelay={(animateFill) ? (i + 1) * 200 : null}
              size={size}
            />
          ))
        }
        {
          [...Array(this.empty)].map((x, i) => (
            <RatingIcon
              key={i + 1}
              size={size}
            />
          ))
        }
      </Container>
    )
  }
  /* eslint-enable react/no-array-index-key */
}

export default Rating
