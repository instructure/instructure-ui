import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import themeable from '../../themeable'
import CustomPropTypes from '../../util/CustomPropTypes'
import Container from '../Container'

import RatingIcon from './RatingIcon'

import styles from './styles.css'
import theme from './theme'

/**
  Rating takes the `valueNow` and `valueMax` props and
  outputs a 3- or 5-star rating. Decimals are rounded to the nearest
  whole number.

  ### 3- or 5-star ratings

  Rating defaults to a 3-star rating system. Use `iconCount` to switch
  to a 5-star system. Note how you can use the `formatValueText` prop to
  create readable text for screenreaders that will be outputted in the
  `aria-valuetext` attribute.

  Note how the second example below has filled stars that animate in. Toggle
  this feature using the `animateFill` prop.

  ```jsx_example
  <div>
    <Rating
      formatValueText={function (currentRating, maxRating) {
        return currentRating + ' out of ' + maxRating
      }}
      label="Overall rating of freshman year experience"
      valueNow={68.45}
      valueMax={100}
    />
    <br />
    <Rating
      animateFill
      formatValueText={function (currentRating, maxRating) {
        return currentRating + ' out of ' + maxRating
      }}
      label="Overall rating of freshman year experience"
      iconCount={5}
      valueNow={68.45}
      valueMax={100}
    />
  </div>
  ```

  ### Sizes

  Choose from `small`, `medium`, or `large`. The `margin` prop has been added to add
  space around the actual rating.
  ```jsx_example
  <div>
    <Rating
      label="Product rating"
      size="small"
      iconCount={5}
      valueNow={3.76}
      valueMax={5}
      margin="x-small medium xx-small none"
    />
    <Rating
      label="Overall rating of college experience"
      iconCount={5}
      valueNow={30}
      valueMax={100}
      margin="x-small xx-large"
    />
    <Rating
      animateFill
      label="Rating of professor"
      size="large"
      iconCount={5}
      valueNow={8}
      valueMax={8}
      margin="medium"
    />
  </div>
  ```
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
