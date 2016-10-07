import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import themeable from '../../util/themeable'
import keycode from 'keycode'
import { omitProps } from '../../util/passthroughProps'

import styles from './styles.css'
import theme from './theme.js'

/**
  The default button component.
  ```jsx_example
  <Button>OK</Button>
  ```
  The default button in its disabled state.
  ```jsx_example
  <Button disabled>OK</Button>
  ```

  A button with an href passed outputs a link element styled like a button.
  ```jsx_example
  <Button href="example.html">Click Here</Button>
  ```

  Button variants for different contexts using the `variant` prop.
  ```jsx_example
  <div>
    <Button variant="primary">Primary button</Button>&nbsp;
    <Button variant="success">Success button</Button>&nbsp;
    <Button variant="link">Link Button</Button>&nbsp;
    <Button variant="icon"><PlaceholderIcon title="Accessible Button Label" /></Button>&nbsp;
  </div>
  ```

  Change the `size` prop to `small` or `large` to produce smaller or larger buttons than the default.
  ```jsx_example
  <div>
    <Button size="small">Small-size button</Button>&nbsp;
    <Button>Default-size button</Button>&nbsp;
    <Button size="large">Large-size button</Button>
  </div>
  ```

  Set the `isBlock` prop to `true` if you want the button to display as a block-level element.
  ```jsx_example
  <Button isBlock={true}>Block-level button</Button>
  ```
**/

@themeable(theme, styles)
class Button extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    variant: PropTypes.oneOf([
      'default',
      'primary',
      'success',
      'link',
      'icon',
      'icon-inverse'
    ]),
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    isBlock: PropTypes.bool,
    describedBy: PropTypes.string,
    disabled: PropTypes.bool,
    href: PropTypes.string,
    onClick: PropTypes.func
  }

  static defaultProps = {
    type: 'button',
    variant: 'default',
    size: 'medium'
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

  handleKeyDown = (e) => {
    const {
      disabled,
      onClick,
      href
    } = this.props

    // make link behave like a button
    if (this.isLink() && e.keyCode === keycode.codes.space) {
      if (disabled) {
        e.preventDefault()
        e.stopPropagation()
      } else if (typeof onClick === 'function') {
        e.preventDefault()
        onClick(e)
      } else {
        window.location.href = href
      }
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
      variant,
      size,
      isBlock,
      describedBy,
      disabled,
      href,
      type
    } = this.props

    const props = omitProps(this.props, Button.propTypes)

    const classes = {
      [styles.root]: true,
      [styles[variant]]: true,
      [styles[size]]: size,
      [styles['is-block']]: isBlock
    }

    if (this.isLink()) {
      return (
        <a
          {...props}
          href={href}
          className={classnames(classes)}
          aria-describedby={describedBy}
          aria-disabled={disabled ? 'true' : null}
          onClick={this.handleClick}
          onKeyDown={this.handleKeyDown}
        >
          {children}
        </a>
      )
    } else {
      return (
        <button
          {...props}
          type={type}
          className={classnames(classes)}
          aria-disabled={disabled ? 'true' : null}
          aria-describedby={describedBy}
          onClick={this.handleClick}
        >
          {children}
        </button>
      )
    }
  }
}

export default Button
