import React, { Component, PropTypes } from 'react'
import styleable from '../../util/styleable'

import styles from './styles.css'

/**
  An accessible image component

  ```jsx_example
  <Image src={placeholderImage(250, 250)} />
  ```
 **/
@styleable(styles)
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
