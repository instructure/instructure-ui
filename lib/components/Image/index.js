import React, { Component, PropTypes } from 'react'
import styles from './Image.css'

/**
  An Image component

  ```jsx_example
  <Image src={placeholderImage(250, 250)} />
  ```
 **/
export default class Image extends Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string
  };

  static defaultProps = {
    alt: ''
  };

  render () {
    return (
      <img {...this.props} className={styles.root} />
    )
  }
}
