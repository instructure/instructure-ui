import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import themeable from '../../util/themeable'

import classnames from 'classnames'

import styles from './Link.css'
import themeVariables from './theme/Link'
import themeStyles from './theme/Link.css'

/**
  A Link component

  ```jsx_example
    <Link href="example.html">I'm a link</Link>
  ```

  ```jsx_example
    <Link>I'm a button that looks like a link because I have no href prop</Link>
  ```

  ```jsx_example
    <Link variant="menuitem">I'm a menu item link</Link>
  ```
 **/
@themeable(themeVariables, themeStyles)
export default class Link extends Component {
  static propTypes = {
    href: PropTypes.string,
    children: PropTypes.node.isRequired,
    /**
    * the `role` is auto-set to `button` if the `onClick` prop is set
    */
    role: PropTypes.string,
    disabled: PropTypes.bool,
    variant: PropTypes.oneOf(['default', 'menuitem']),
    onClick: PropTypes.func
  }

  static defaultProps = {
    variant: 'default'
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

  isFocused () {
    return (document.activeElement === ReactDOM.findDOMNode(this))
  }

  render () {
    const {
      children,
      variant,
      disabled,
      onClick,
      role,
      href,
      ...props
    } = this.props

    const classes = {
      [styles.root]: true,
      [styles[variant]]: true
    }

    if (this.isLink()) {
      return (
        <a
          href={href}
          className={classnames(classes)}
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
          className={classnames(classes)}
          aria-disabled={disabled ? 'true' : null}
          onClick={this.handleClick}
          {...props}>
            {children}
        </button>
      )
    }
  }
}
