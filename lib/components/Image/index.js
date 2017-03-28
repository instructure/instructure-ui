import React, { Component, PropTypes } from 'react'
import CustomPropTypes from '../../util/CustomPropTypes'
import classnames from 'classnames'
import themeable from '../../util/themeable'

import Container from '../Container'

import styles from './styles.css'

/**
  An accessible image component

  ```jsx_example
  <Image src={placeholderImage(250, 250)} />
  ```

  Images with the `margin` prop used to add space around them.

  ```jsx_example
  <div>
    <Image margin="large" isBlock src={placeholderImage(500, 200)} />
    <Image margin="none medium none none" src={placeholderImage(200, 200)} />
    <Image src={placeholderImage(200, 200)} />
    <Image margin="none small" src={placeholderImage(400, 200)} />
  </div>
  ```
 **/
@themeable(null, styles)
export default class Image extends Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
    isBlock: PropTypes.bool,
    /**
    * Valid values are `0`, `none`, `auto`, `xxxSmall`, `xxSmall`, `xSmall`,
    * `small`, `medium`, `large`, `xLarge`, `xxLarge`. Apply these values via
    * familiar CSS-like shorthand. For example: `margin="small auto large"`.
    */
    margin: CustomPropTypes.spacing

  }

  static defaultProps = {
    alt: '',
    isBlock: false
  }

  render () {
    const {
      alt,
      margin,
      isBlock,
      ...props
    } = this.props

    const classes = {
      [styles.root]: true,
      [styles['is-block']]: isBlock
    }

    return (
      <Container
        {...props}
        alt={alt} as="img" margin={margin} display={null}
        className={classnames(classes)}
      />
    )
  }
}
