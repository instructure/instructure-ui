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
    alt: PropTypes.string,
    src: PropTypes.string.isRequired
  }

  static defaultProps = {
    alt: ''
  }

  render () {
    const {
      alt,
      ...props
    } = this.props
    return (
      <img {...this.props} className={styles.root} alt={alt} />
    )
  }
}
