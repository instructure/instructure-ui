import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import Container from '@instructure/ui-container/lib/components/Container'
import themeable from '@instructure/ui-themeable'
import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'

import styles from './styles.css'
import theme from './theme'

/**
---
category: components
---
**/

@themeable(theme, styles)
export default class Avatar extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    name: PropTypes.string.isRequired,
    /*
    * URL of the image to display as the background image
    */
    src: PropTypes.string,
    /*
    * Accessible label
    */
    alt: PropTypes.string,
    size: PropTypes.oneOf(['auto', 'x-small', 'small', 'medium', 'large', 'x-large']),
    variant: PropTypes.oneOf(['circle', 'rectangle']),
    /**
    * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
    * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
    * familiar CSS-like shorthand. For example: `margin="small auto large"`.
    */
    margin: CustomPropTypes.spacing,
    inline: PropTypes.bool
  }
  /* eslint-enable react/require-default-props */

  static defaultProps = {
    size: 'medium',
    variant: 'circle',
    inline: true
  }

  makeInitialsFromName () {
    let name = this.props.name

    if (!name || typeof name !== 'string') {
      return
    }
    name = name.trim()
    if (name.length === 0) {
      return
    }

    if (name.match(/\s+/)) {
      const names = name.split(/\s+/)
      return (names[0][0] + names[names.length - 1][0]).toUpperCase()
    } else {
      return name[0].toUpperCase()
    }
  }

  renderInitials () {
    return (
      <span className={styles.initials} aria-hidden="true">
        {this.makeInitialsFromName()}
      </span>
    )
  }

  render () {
    const classes = {
      [styles.root]: true,
      [styles[this.props.size]]: true,
      [styles[this.props.variant]]: true
    }

    const style = this.props.src ? {
      backgroundImage: `url('${this.props.src}')`
    } : null

    return (
      <Container
        style={style}
        className={classnames(classes)}
        aria-label={this.props.alt ? this.props.alt : null}
        role={this.props.alt ? 'img' : null}
        margin={this.props.margin}
        display={this.props.inline ? 'inline' : 'block'}
      >
        {!this.props.src && this.renderInitials()}
      </Container>
    )
  }
}
