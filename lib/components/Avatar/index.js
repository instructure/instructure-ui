import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import themeable from '../../themeable'

import CustomPropTypes from '../../util/CustomPropTypes'
import Container from '../Container'

import styles from './styles.css'
import theme from './theme.js'

/**
  An Avatar component
  ```jsx_example
  <Avatar userName="Sarah Robinson" userImgUrl={avatarImage} />
  ```

  When an image url is not supplied the user's initials will display.
  ```jsx_example
  <Avatar userName="Kyle Montgomery" />
  ```

  The `size` prop allows you to select from `x-small`, `small`, `medium`, `large`, and `x-large` for
  default sizes. If the `auto` prop is set, the avatar size will adjust according to the font-size
  of its container. Use the `margin` prop to add space between Avatar and other content.
  ```jsx_example
  <div>
    <Avatar userName="James Arias" size="x-small" margin="0 small 0 0" />
    <Avatar userName="Charles Kimball" size="small" margin="0 small 0 0" />
    <Avatar userName="Melissa Reed" size="medium" margin="0 small 0 0" />
    <Avatar userName="Heather Wheeler" size="large" margin="0 xSmall 0 0" />
    <Avatar userName="David Herbert" size="x-large" />
  </div>
  ```

  The avatar can be `circle` or `rectangle` shaped.
  ```jsx_example
  <Avatar userName="Grant Mitchell" size="x-large" variant="rectangle" />
  ```
 **/

@themeable(theme, styles)
export default class Avatar extends Component {
  static propTypes = {
    userName: PropTypes.string.isRequired,
    userImgUrl: PropTypes.string,
    size: PropTypes.oneOf(['auto', 'x-small', 'small', 'medium', 'large', 'x-large']),
    variant: PropTypes.oneOf(['circle', 'rectangle']),
    isBlock: PropTypes.bool,
    /**
    * Valid values are `0`, `none`, `auto`, `xxxSmall`, `xxSmall`, `xSmall`,
    * `small`, `medium`, `large`, `xLarge`, `xxLarge`. Apply these values via
    * familiar CSS-like shorthand. For example: `margin="small auto large"`.
    */
    margin: CustomPropTypes.spacing
  }

  static defaultProps = {
    size: 'medium',
    variant: 'circle',
    isBlock: false
  }

  makeInitialsFromName () {
    const name = this.props.userName

    if (name && typeof name === 'string' && name.match(/\s+/)) {
      const names = name.split(/\s+/)
      return (names[0][0] + names[names.length - 1][0]).toUpperCase()
    } else {
      return name[0].toUpperCase()
    }
  }

  renderInitials () {
    return (
      <div className={styles.initials}>
        {this.makeInitialsFromName()}
      </div>
    )
  }

  render () {
    const classes = {
      [styles.root]: true,
      [styles[this.props.size]]: true,
      [styles[this.props.variant]]: true,
      [styles['is-block']]: this.props.isBlock
    }

    const style = this.props.userImgUrl ? {
      backgroundImage: 'url("' + this.props.userImgUrl + '")'
    } : null

    const props = {
      style: style,
      className: classnames(classes)
    }

    return (
      <Container
        {...props}
        as="div"
        display={null}
        aria-hidden="true"
        margin={this.props.margin}
      >
        {!this.props.userImgUrl && this.renderInitials()}
      </Container>
    )
  }
}
