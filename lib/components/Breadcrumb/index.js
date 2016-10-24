import React, { PropTypes, Component } from 'react'
import themeable from '../../util/themeable'
import IconArrowOpenRightSolid from 'instructure-icons/react/Solid/IconArrowOpenRightSolid'
import CustomPropTypes from '../../util/CustomPropTypes'
import classnames from 'classnames'

import BreadcrumbLink from './BreadcrumbLink'

import styles from './styles.css'
import theme from './theme.js'

/**
  Change the `size` prop to control the font-size of the breadcrumbs
  (default is `medium`).

  Long breadcrumb text will be automatically truncated, ensuring the
  breadcrumb list always remains on a single line.

  ```jsx_example
  <div>
    <Breadcrumb size="small" label="You are here:">
       <BreadcrumbLink href="example.html">English 204</BreadcrumbLink>
       <BreadcrumbLink href="example.html">Exploring John Updike</BreadcrumbLink>
       <BreadcrumbLink href="example.html">The Rabbit Novels</BreadcrumbLink>
       <BreadcrumbLink>Rabbit Is Rich</BreadcrumbLink>
    </Breadcrumb>
    <br />
    <Breadcrumb label="You are here:">
       <BreadcrumbLink href="example.html">English 204</BreadcrumbLink>
       <BreadcrumbLink href="example.html">Exploring John Updike</BreadcrumbLink>
       <BreadcrumbLink href="example.html">The Rabbit Novels</BreadcrumbLink>
       <BreadcrumbLink>Rabbit Is Rich</BreadcrumbLink>
    </Breadcrumb>
    <br />
    <Breadcrumb size="large" label="You are here:">
       <BreadcrumbLink href="example.html">English 204</BreadcrumbLink>
       <BreadcrumbLink href="example.html">Exploring John Updike</BreadcrumbLink>
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
    size: PropTypes.oneOf(['small', 'medium', 'large'])
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
      <nav role="navigation">
        <ol className={classnames(classes)} aria-label={this.props.label}>
          {this.renderChildren()}
        </ol>
      </nav>
    )
  }

}

export { default as BreadcrumbLink } from './BreadcrumbLink'
