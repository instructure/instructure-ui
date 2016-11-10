import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import themeable from '../../util/themeable'
import { omitProps } from '../../util/passthroughProps'

import styles from './styles.css'
import theme from './theme.js'

/**
  A Link component

  ```jsx_example
    <Link href="example.html">I'm a link</Link>
  ```

  ```jsx_example
    <Link>I'm a button that looks like a link because I have no href prop</Link>
  ```
 **/
@themeable(theme, styles)
class Link extends Component {
  static propTypes = {
    href: PropTypes.string,
    children: PropTypes.node.isRequired,
    /**
    * the `role` is auto-set to `button` if the `onClick` prop is set
    */
    role: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func
  }

  handleClick = (e) => {
    const {
      disabled,
      onClick
    } = this.props

    if (disabled) {
      e.preventDefault()
      e.stopPropagation()
    } else if (typeof onClick === 'function') {
      onClick(e)
    }
  }

  isLink () {
    const { href } = this.props
    return (href && href !== '#')
  }

  focus () {
    ReactDOM.findDOMNode(this).focus()
  }

  get focused () {
    return (document.activeElement === ReactDOM.findDOMNode(this))
  }

  render () {
    const {
      children,
      disabled,
      onClick,
      role,
      href
    } = this.props

    const props = omitProps(this.props, Link.propTypes)

    if (this.isLink()) {
      return (
        <a
          href={href}
          className={styles.root}
          aria-disabled={disabled ? 'true' : null}
          role={onClick ? 'button' : role}
          onClick={this.handleClick}
          onKeyDown={this.handleKeyDown}
          {...props}>
          {children}
        </a>
      )
    } else {
      return (
        <button
          className={styles.root}
          aria-disabled={disabled ? 'true' : null}
          onClick={this.handleClick}
          {...props}
        >
          {children}
        </button>
      )
    }
  }
}

export default Link
