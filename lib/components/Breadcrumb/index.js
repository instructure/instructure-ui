import React, { Component } from 'react'
import PropTypes from 'prop-types'
import themeable from '../../themeable'
import IconArrowOpenRightSolid from 'instructure-icons/lib/Solid/IconArrowOpenRightSolid'
import CustomPropTypes from '../../util/CustomPropTypes'
import classnames from 'classnames'

import BreadcrumbLink from './BreadcrumbLink'
import Container from '../Container'

import styles from './styles.css'
import theme from './theme.js'

/**
---
category: navigation
---
  Change the `size` prop to control the font-size of the breadcrumbs
  (default is `medium`).

  Long breadcrumb text will be automatically truncated, ensuring the
  breadcrumb list always remains on a single line. Note also the `margin` prop
  used to add space around the breadcrumb list.

  ```jsx_example
  <div>

    <Breadcrumb size="small" label="You are here:" margin="none none medium">
      <BreadcrumbLink href="example.html">English 204</BreadcrumbLink>
        <BreadcrumbLink
          onClick={function () {
            console.log("This BreadcrumbLink was clicked!")
          }}
        >
          Exploring John Updike
        </BreadcrumbLink>
      <BreadcrumbLink href="example.html">The Rabbit Novels</BreadcrumbLink>
      <BreadcrumbLink>Rabbit Is Rich</BreadcrumbLink>
    </Breadcrumb>
    <Breadcrumb label="You are here:" margin="none none medium">
      <BreadcrumbLink href="example.html">English 204</BreadcrumbLink>
        <BreadcrumbLink
          onClick={function () {
            console.log("This BreadcrumbLink was clicked!")
          }}
        >
          Exploring John Updike
        </BreadcrumbLink>
      <BreadcrumbLink href="example.html">The Rabbit Novels</BreadcrumbLink>
      <BreadcrumbLink>Rabbit Is Rich</BreadcrumbLink>
    </Breadcrumb>
    <Breadcrumb size="large" label="You are here:">
      <BreadcrumbLink href="example.html">English 204</BreadcrumbLink>
        <BreadcrumbLink
          onClick={function () {
            console.log("This BreadcrumbLink was clicked!")
          }}
        >
          Exploring John Updike
        </BreadcrumbLink>
      <BreadcrumbLink href="example.html">The Rabbit Novels</BreadcrumbLink>
      <BreadcrumbLink>Rabbit Is Rich</BreadcrumbLink>
    </Breadcrumb>
  </div>
  ```

  If you don't provide an href to `BreadcrumbLink`, it will render as text.
  ```jsx_example
  <Breadcrumb label="You are here:">
    <BreadcrumbLink href="example.html">Course A</BreadcrumbLink>
    <BreadcrumbLink href="example.html">Modules</BreadcrumbLink>
    <BreadcrumbLink>A Great Module</BreadcrumbLink>
  </Breadcrumb>
  ```
**/

@themeable(theme, styles)
export default class Breadcrumb extends Component {
  static propTypes = {
    /**
    * children of type BreadcrumbLink
    */
    children: CustomPropTypes.Children.oneOf([BreadcrumbLink]),
    /**
    * An accessible label for the navigation
    */
    label: PropTypes.string.isRequired,
    /**
    * Sets the font-size of the breadcrumb text
    */
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    /**
    * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
    * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
    * familiar CSS-like shorthand. For example: `margin="small auto large"`.
    */
    margin: CustomPropTypes.spacing
  }

  static defaultProps = {
    size: 'medium'
  }

  renderChildren () {
    const numChildren = this.props.children ? this.props.children.length : 0
    const style = {
      maxWidth: Math.floor(100 / numChildren) + '%'
    }
    return React.Children.map(this.props.children,
      (child, index) => {
        return (
          <li className={styles.crumb} style={style}>
            {child}
            {index < (numChildren - 1) && <IconArrowOpenRightSolid className={styles.separator} />}
          </li>
        )
      }
    )
  }

  render () {
    const classes = {
      [styles.root]: true,
      [styles[this.props.size]]: true
    }
    return (
      <Container
        role="navigation"
        as="div"
        margin={this.props.margin}
      >
        <ol className={classnames(classes)} aria-label={this.props.label}>
          {this.renderChildren()}
        </ol>
      </Container>
    )
  }
}

export { default as BreadcrumbLink } from './BreadcrumbLink'
