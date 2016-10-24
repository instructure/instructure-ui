import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import themeable from '../../util/themeable'

import styles from './styles.css'
import theme from './theme.js'

/**
  A Heading component.

  ```jsx_example
  <div>
    <Heading level="h1" tag="h2">Heading level One</Heading>
    <Heading level="h2" tag="h1">Heading level Two</Heading>
    <Heading level="h3">Heading level Three</Heading>
    <Heading level="h4">Heading level Four</Heading>
    <Heading level="h5">Heading level Five</Heading>
    <Heading level="reset" tag="h2">Heading level reset</Heading>
  </div>
  ```
 **/
 @themeable(theme, styles)
export default class Heading extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    level: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'reset']),
    /**
    * the html tag to use (defaults to the level)
    */
    tag: PropTypes.string
  }

  static defaultProps = {
    level: 'h2'
  }

  render () {
    const {
      tag,
      level,
      children,
      ...props
    } = this.props

    props.className = classnames({
      [styles.root]: true,
      [styles[level]]: true
    })

    return React.createElement(tag || level, props, children)
  }
}
