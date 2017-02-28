import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
import themeable from '../../util/themeable'
import shortid from 'shortid'

import styles from './styles.css'
import theme from './theme.js'

/**
  ### Choose from three sizes

  The `size` prop allows you to select from `small`, `medium` and `large` -sized spinners.

  ```jsx_example
  <div>
    <Spinner title="Loading" size="small" />
    <Spinner title="Loading" />
    <Spinner title="Loading" size="large" />
  </div>

  ```
  ### Different color schemes for use with light and dark backgrounds

  The Spinner component defaults to `lightBg`. However, there is also an `inverse`
  color scheme designed to be more visible on dark backgrounds.

  ```jsx_example_inverse
    <Spinner title="Loading" variant="inverse" />
  ```
  ### Internet Explorer

  As of mid-2016, Internet Explorer doesn't support animations inside inline SVGs.
  IE users will simply see a rotating circle, minus the "morphing" of the spinner.

**/
@themeable(theme, styles)
export default class Spinner extends Component {
  static propTypes = {
    /**
    * Give the spinner a title to be read by screenreaders
    */
    title: PropTypes.string.isRequired,
    /**
    * Different-sized spinners
    */
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    /**
    * Different color schemes for use with light or dark backgrounds
    */
    variant: PropTypes.oneOf(['default', 'inverse'])
  }

  static defaultProps = {
    size: 'medium',
    variant: 'default'
  }

  constructor (props) {
    super()

    this.titleId = 'Spinner__' + shortid.generate()
  }

  radius () {
    switch (this.props.size) {
      case 'small':
        return '1em'
      case 'large':
        return '2.5em'
      default:
        return '1.75em'
    }
  }

  render () {
    const classes = {
      [styles.root]: true,
      [styles[this.props.size]]: true,
      [styles[this.props.variant]]: true
    }
    return (
      <div className={classNames(classes)}>
        <svg
          className={styles.circle}
          role="img"
          aria-labelledby={this.titleId}
          focusable="false"
        >
          <title id={this.titleId}>{this.props.title}</title>
          <g role="presentation">
            <circle className={styles.circleShadow} cx="50%" cy="50%" r={this.radius()} />
            <circle className={styles.circleTrack} cx="50%" cy="50%" r={this.radius()} />
            <circle className={styles.circleSpin} cx="50%" cy="50%" r={this.radius()} />
          </g>
        </svg>
      </div>
    )
  }
}
