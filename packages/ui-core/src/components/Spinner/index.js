import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import shortid from 'shortid'

import themeable from '@instructure/ui-themeable'
import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'

import Container from '../Container'

import styles from './styles.css'
import theme from './theme'

/**
---
category: components
---
  ### Choose from four sizes and add margin as needed

  The `size` prop allows you to select from `x-small`, `small`, `medium` and `large`
  -sized spinners. Margin can be added as needed using the `margin` prop.

  ```jsx_example
  <div>
    <Spinner title="Loading" size="x-small" />
    <Spinner title="Loading" size="small" margin="0 0 0 medium" />
    <Spinner title="Loading" margin="0 0 0 medium" />
    <Spinner title="Loading" size="large" margin="0 0 0 medium" />
  </div>
  ```

  ### Different color schemes for use with light and dark backgrounds

  The Spinner component defaults to `lightBg`. However, there is also an `inverse`
  color scheme designed to be more visible on dark backgrounds.

  ```jsx_example
  ---
  inverse: true
  ---
  <Spinner title="Loading" variant="inverse" />
  ```

  ### Internet Explorer

  As of mid-2016, Internet Explorer doesn't support animations inside inline SVGs.
  IE users will simply see a rotating circle, minus the "morphing" of the spinner.

**/
@themeable(theme, styles)
export default class Spinner extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    /**
    * Give the spinner a title to be read by screenreaders
    */
    title: PropTypes.string.isRequired,
    /**
    * Different-sized spinners
    */
    size: PropTypes.oneOf(['x-small', 'small', 'medium', 'large']),
    /**
    * Different color schemes for use with light or dark backgrounds
    */
    variant: PropTypes.oneOf(['default', 'inverse']),
    /**
    * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
    * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
    * familiar CSS-like shorthand. For example: `margin="small auto large"`.
    */
    margin: CustomPropTypes.spacing
  }
  /* eslint-enable react/require-default-props */

  static defaultProps = {
    size: 'medium',
    variant: 'default'
  }

  constructor (props) {
    super()

    this.titleId = `Spinner__${shortid.generate()}`
  }

  radius () {
    switch (this.props.size) {
      case 'x-small':
        return '0.5em'
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
      <Container
        as="div"
        className={classNames(classes)}
        margin={this.props.margin}
      >
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
      </Container>
    )
  }
}
