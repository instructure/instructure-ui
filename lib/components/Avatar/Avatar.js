import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'

import styles from './Avatar.css'

/**
  An Avatar component

  ```jsx_example
  <Avatar userName="Kyle Montgomery" userImgUrl={avatarImage} />
  ```
  When an image url is not supplied the user's initials will display.

  ```jsx_example
  <Avatar userName="Kyle Montgomery" />
  ```

  The avatar can be `circle` or `rectangle` shaped.

  ```jsx_example
  <Avatar userName="Kyle Montgomery" shape="rectangle" />
  ```
 **/
export default class Avatar extends Component {
  static propTypes = {
    userName: PropTypes.string.isRequired,
    userImgUrl: PropTypes.string,
    shape: PropTypes.oneOf(['circle', 'rectangle'])
  }

  static defaultProps = {
    shape: 'circle'
  }

  makeInitialsFromName () {
    const name = this.props.userName
    if (name.match(/\s+/)) {
      const names = name.split(/\s+/)
      return (names[0][0] + names[names.length - 1][0]).toUpperCase()
    } else {
      return name[0].toUpperCase()
    }
  }

  renderInitials () {
    return (
      <div className={styles.initials}>
        { this.makeInitialsFromName() }
      </div>
    )
  }

  render () {
    const classes = {
      [styles.root]:               true,
      [styles[this.props.shape]]:  this.props.shape
    }
    const style = this.props.userImgUrl ? {
      backgroundImage: 'url("' + this.props.userImgUrl + '")'
    } : null

    return (
      <div className={classnames(classes)} style={style} aria-hidden="true">
        { !this.props.userImgUrl && this.renderInitials() }
      </div>
    )
  }
}
