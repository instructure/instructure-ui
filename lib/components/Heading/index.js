import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import themeable from '../../util/themeable'

import styles from './styles.css'
import theme from './theme.js'

/**
  Generate content headings, from h1 to h5. The `tag` prop controls what
  html element is outputted. The `level` prop sets its appearance.

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

  ### Colors

  Headings default to the theme's dark text color. However, the text color
  can be changed, if desired.

  ```jsx_example
  <div>
    <Heading color="primary">I am primary color (default)</Heading>
    <Heading color="secondary">I am secondary color</Heading>
    <Heading color="brand">I am brand color</Heading>
    <Heading color="success">I am success color</Heading>
    <Heading color="warning">I am warning color</Heading>
    <Heading color="error">I am error/danger color</Heading>
  </div>
  ```
  ```jsx_example_inverse
  <div>
    <Heading color="primary-inverse">I am primary-inverse color</Heading>
    <Heading color="secondary-inverse">I am secondary-inverse color</Heading>
  </div>
  ```
  ### Borders

  `Heading` defaults to no borders. However, using the `border` prop, you can
  add either `top` or `bottom` borders to your heading.

  ```jsx_example
  <div>
    <Heading border="bottom">I have a bottom border</Heading>
    <br />
    <br />
    <Heading border="top">I have a top border</Heading>
  </div>
  ```
 **/
 @themeable(theme, styles)
export default class Heading extends Component {
  static propTypes = {
    border: PropTypes.oneOf(['none', 'top', 'bottom']),
    children: PropTypes.node.isRequired,
    color: PropTypes.oneOf([
      'primary',
      'secondary',
      'primary-inverse',
      'secondary-inverse',
      'success',
      'warning',
      'error',
      'brand'
    ]),
    level: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'reset']),
    /**
    * the html tag to use (defaults to the level)
    */
    tag: PropTypes.string
  }

  static defaultProps = {
    border: 'none',
    color: 'primary',
    level: 'h2'
  }

  render () {
    const {
      border,
      color,
      tag,
      level,
      children,
      ...props
    } = this.props

    props.className = classnames({
      [styles.root]: true,
      [styles[level]]: true,
      [styles['color' + '-' + color]]: color,
      [styles['border' + '-' + border]]: border !== 'none'
    })

    return React.createElement(tag || level, props, children)
  }
}
