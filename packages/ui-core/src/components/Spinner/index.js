import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Container from '@instructure/ui-container/lib/components/Container'
import themeable from '@instructure/ui-themeable'
import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'
import uid from '@instructure/ui-utils/lib/uid'

import styles from './styles.css'
import theme from './theme'

/**
---
category: components
---
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

    this.titleId = `Spinner__${uid()}`
  }

  radius () {
    switch (this.props.size) {
      case 'x-small':
        return '0.5em'
      case 'small':
        return '1em'
      case 'large':
        return '2.25em'
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
