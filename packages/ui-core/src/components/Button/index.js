import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import keycode from 'keycode'
import themeable from '@instructure/ui-themeable'
import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'
import { omitProps } from '@instructure/ui-utils/lib/react/passthroughProps'
import getElementType from '@instructure/ui-utils/lib/react/getElementType'
import isActiveElement from '@instructure/ui-utils/lib/dom/isActiveElement'
import findDOMNode from '@instructure/ui-utils/lib/dom/findDOMNode'

import Container from '../Container'

import styles from './styles.css'
import theme from './theme'

/**
---
category: components
---
  The default button component:

```jsx_example
<Button>OK</Button>
```
  The default button in its disabled state.

```jsx_example
<Button disabled>
  OK</Button>
```

  A button with an href passed outputs a link element styled like a button.

```jsx_example
<Button href="https://instructure.github.io/instructure-ui/">Click Here</Button>
```

  Button variants for different contexts using the `variant` prop are shown below. Note also
  the `margin` prop used to add space between the buttons.

  Note that for non-icon-variant buttons, SVG icons imported from
  [instructure-icons](http://instructure.github.io/instructure-icons/)
  will be sized appropriately and given right-margin to offset them from the text.

```jsx_example
<div>
  <Button variant="primary" margin="0 x-small 0 0">
    Primary button
  </Button>
  <Button href="https://instructure.github.io/instructure-ui/" variant="success" margin="0 x-small 0 0">
    <PlaceholderIcon />
    Success button
  </Button>
  <Button variant="danger" margin="0 x-small 0 0">
    Danger button
  </Button>
  <Button variant="light" margin="0 x-small 0 0">
    Light Button
  </Button>
  <Button variant="ghost" margin="0 x-small 0 0">
    <IconPlus />
    Ghost Button
  </Button>
  <Button variant="link">
    <PlaceholderIcon />
    Link Button
  </Button>
</div>
```

  Buttons with icons:

```jsx_example
<div>
  <Button variant="icon" margin="0 x-small 0 0"><PlaceholderIcon title="Accessible Button Label" /></Button>
  <Button variant="circle-primary" margin="0 x-small 0 0"><IconPlus title="Accessible Button Label" /></Button>
  <Button variant="circle-danger"><IconX title="Accessible Button Label" /></Button>
</div>
```

  Inverse variants:

```jsx_example
---
inverse: true
---
<div>
  <Button variant="ghost-inverse" margin="0 x-small 0 0">Ghost Button</Button>
  <Button variant="icon-inverse"><PlaceholderIcon title="Accessible Button Label" /></Button>
  <Button variant="link-inverse">Link Button</Button>
</div>
```

  Change the `size` prop to `small` or `large` to produce smaller or larger buttons than the default.

```jsx_example
<div>
  <Button size="small" margin="0 x-small 0 0">Small-size button</Button>
  <Button margin="0 x-small 0 0">Default-size button</Button>
  <Button size="large">Large-size button</Button>
</div>
```

  Set the `fluidWidth` prop if you want the button to fill the width of its container element
  and wrap the text.

```jsx_example
<div>
  <div style={{width: 300}}>
    <Button fluidWidth size="small">Small fluidWidth button</Button>
    <br />
    <Button fluidWidth size="small">
      <b>Small fluidWidth Button with line breaks.</b> {lorem.sentence()}
    </Button>
    <br />
    <Button fluidWidth>Medium fluidWidth button</Button>
    <br />
    <Button fluidWidth>
      <b>Medium fluidWidth Button with line breaks.</b> {lorem.sentence()}
    </Button>
    <br />
    <Button fluidWidth size="large" href="http://instructure.github.io/instructure-ui">
      Large fluidWidth link-button
    </Button>
    <br />
    <Button fluidWidth size="large">
      <b>Large fluidWidth Button with line breaks.</b> {lorem.sentence()}
    </Button>
  </div>
</div>
```
**/

@themeable(theme, styles)
class Button extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    children: PropTypes.node.isRequired,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    variant: PropTypes.oneOf([
      'default',
      'primary',
      'success',
      'danger',
      'light',
      'ghost',
      'ghost-inverse',
      'link',
      'link-inverse',
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
    as: CustomPropTypes.elementType,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    /**
    * should the `<Button/>` fill the width of its container
    */
    fluidWidth: PropTypes.bool,
    disabled: PropTypes.bool,
    href: PropTypes.string,
    onClick: PropTypes.func,
    /**
    * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
    * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
    * familiar CSS-like shorthand. For example: `margin="small auto large"`.
    */
    margin: CustomPropTypes.spacing
  }
  /* eslint-enable react/require-default-props */

  static defaultProps = {
    as: 'button',
    type: 'button',
    variant: 'default',
    size: 'medium',
    margin: '0',
    fluidWidth: false,
    buttonRef: function (button) {}
  }

  handleClick = e => {
    const { disabled, onClick } = this.props

    if (disabled) {
      e.preventDefault()
      e.stopPropagation()
    } else if (typeof onClick === 'function') {
      onClick(e)
    }
  }

  handleKeyDown = e => {
    const { disabled, onClick, href } = this.props

    // behave like a button when space key is pressed
    if (this.elementType !== 'button' && (e.keyCode === keycode.codes.space || e.keyCode === keycode.codes.enter)) {
      e.preventDefault()
      e.stopPropagation()

      if (typeof onClick === 'function' && !disabled) {
        onClick(e)
      } else if (href) {
        findDOMNode(this._button).click() // eslint-disable-line react/no-find-dom-node
      }
    }
  }

  get elementType () {
    return getElementType(Button, this.props)
  }

  get focused () {
    return isActiveElement(this._button)
  }

  focus () {
    findDOMNode(this._button).focus() // eslint-disable-line react/no-find-dom-node
  }

  render () {
    const { variant, size, fluidWidth, disabled, href, type, onClick, buttonRef, margin } = this.props

    const classes = {
      [styles.root]: true,
      [styles[variant]]: true,
      [styles[size]]: size,
      [styles.fluidWidth]: fluidWidth
    }

    const props = {
      elementRef: (c, ...args) => {
        this._button = c
        buttonRef.apply(this, [c].concat(args))
      },
      ...omitProps(this.props, Button.propTypes, ['padding']),
      className: classnames(classes),
      disabled,
      'aria-disabled': disabled ? 'true' : null,
      onClick: this.handleClick,
      onKeyDown: this.handleKeyDown,
      href: href,
      type: href ? null : type,
      role: onClick && this.props.as ? 'button' : null,
      tabIndex: onClick && this.props.as ? '0' : null
    }

    const ElementType = this.elementType

    return (
      <Container
        {...props}
        display={null}
        as={ElementType}
        margin={margin}
      >
        <span className={styles.content}>{this.props.children}</span>
      </Container>
    )
  }
}

export default Button
