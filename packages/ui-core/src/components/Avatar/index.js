import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import themeable from '@instructure/ui-themeable'
import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'

import Container from '../Container'

import styles from './styles.css'
import theme from './theme'

/**
---
category: components
---
  An Avatar component
  ```jsx_example
  <Avatar name="Sarah Robinson" src={avatarImage} />
  ```

  When an image src is not supplied the user's initials will display.
  ```jsx_example
  <Avatar name="Kyle Montgomery" />
  ```

  The `size` prop allows you to select from `x-small`, `small`, `medium`, `large`, and `x-large` for
  default sizes. If the `auto` prop is set, the avatar size will adjust according to the font-size
  of its container. Use the `margin` prop to add space between Avatar and other content.
  ```jsx_example
  <div>
    <Avatar name="James Arias" size="x-small" margin="0 small 0 0" />
    <Avatar name="Charles Kimball" size="small" margin="0 small 0 0" />
    <Avatar name="Melissa Reed" size="medium" margin="0 small 0 0" />
    <Avatar name="Heather Wheeler" size="large" margin="0 small 0 0" />
    <Avatar name="David Herbert" size="x-large" />
  </div>
  ```

  The avatar can be `circle` or `rectangle` shaped.
  ```jsx_example
  <Avatar alt="Grant Mitchell" name="Grant Mitchell" size="x-large" variant="rectangle" />
  ```
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
    const name = this.props.name

    if (name && typeof name === 'string' && name.match(/\s+/)) {
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
