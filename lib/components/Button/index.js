import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import themeable from '../../util/themeable'
import keycode from 'keycode'
import CustomPropTypes from '../../util/CustomPropTypes'
import { omitProps } from '../../util/passthroughProps'
import getElementType from '../../util/getElementType'

import styles from './styles.css'
import theme from './theme.js'

/**

  The default button component:
  ```jsx_example
  <Button>OK</Button>
  ```
  The default button in its disabled state:
  ```jsx_example
  <Button disabled>OK</Button>
  ```
  A button with an href passed outputs a link element styled like a button.
  ```jsx_example
  <Button href="example.html">Click Here</Button>
  ```
  Button variants for different contexts using the `variant` prop:
  ```jsx_example
  <div>
    <Button variant="primary">Primary button</Button>&nbsp;
    <Button variant="success">Success button</Button>&nbsp;
    <Button variant="light">Light Button</Button>&nbsp;
    <Button variant="ghost">Ghost Button</Button>&nbsp;
    <Button variant="link">Link Button</Button>
  </div>
  ```

  Buttons with icons:
  ```jsx_example
  <div>
    <Button variant="icon"><PlaceholderIcon title="Accessible Button Label" /></Button>&nbsp;
    <Button variant="circle-primary"><IconPlus title="Accessible Button Label" /></Button>&nbsp;
    <Button variant="circle-danger"><IconX title="Accessible Button Label" /></Button>
  </div>
  ```

  Inverse variants:
  ```jsx_example_inverse
  <div>
    <Button variant="ghost-inverse">Ghost Button</Button>&nbsp;
    <Button variant="icon-inverse"><PlaceholderIcon title="Accessible Button Label" /></Button>
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
      'light',
      'ghost',
      'ghost-inverse',
      'link',
      'circle-primary',
      'circle-danger',
      'icon',
      'icon-inverse'
    ]),
    /**
    * provides a reference to the underlying focusable (`button` or `a`) element
    */
    buttonRef: PropTypes.func,
    /**
    * the element type to render as (will be `<a>` if href is provided)
    */
    as: CustomPropTypes.elementType(),
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    isBlock: PropTypes.bool,
    disabled: PropTypes.bool,
    href: PropTypes.string,
    onClick: PropTypes.func
  }

  static defaultProps = {
    as: 'button',
    type: 'button',
    variant: 'default',
    size: 'medium',
    buttonRef: function (button) {}
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

    // behave like a button when space key is pressed
    if (this.elementType !== 'button' && e.keyCode === keycode.codes.space) {
      if (disabled) {
        e.preventDefault()
        e.stopPropagation()
      } else if (typeof onClick === 'function') {
        e.preventDefault()
        onClick(e)
      } else if (href) {
        window.location.href = href
      }
    }
  }

  get elementType () {
    return getElementType(Button, this.props)
  }

  get focused () {
    return (document.activeElement === ReactDOM.findDOMNode(this._button))
  }

  focus () {
    ReactDOM.findDOMNode(this._button).focus()
  }

  render () {
    const {
      children,
      variant,
      size,
      isBlock,
      disabled,
      href,
      type,
      onClick,
      buttonRef
    } = this.props

    const classes = {
      [styles.root]: true,
      [styles[variant]]: true,
      [styles[size]]: size,
      [styles['is-block']]: isBlock
    }

    const props = {
      ref: (c, ...args) => {
        this._button = c
        buttonRef.apply(this, [c].concat(args))
      },
      ...omitProps(this.props, Button.propTypes),
      className: classnames(classes),
      'aria-disabled': disabled ? 'true' : null,
      onClick: this.handleClick,
      onKeyDown: this.handleKeyDown,
      href: href,
      type: type,
      role: (onClick && this.props.as) ? 'button' : null,
      tabIndex: (onClick && this.props.as) ? '0' : null
    }

    const ElementType = this.elementType

    return <ElementType {...props}>{children}</ElementType>
  }
}

export default Button
