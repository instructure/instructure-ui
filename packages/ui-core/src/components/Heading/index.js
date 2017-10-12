import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import themeable from '@instructure/ui-themeable'
import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'
import getElementType from '@instructure/ui-utils/lib/react/getElementType'
import { omitProps } from '@instructure/ui-utils/lib/react/passthroughProps'

import styles from './styles.css'
import theme from './theme'

import Container from '../Container'

/**
---
category: components/typography
---
  Generate content headings, from h1 to h5. The `as` prop controls what
  html element is outputted. The `level` prop sets its appearance.
  Use the `margin` prop to give the Heading margin.

  ```jsx_example
  <div>
    <Heading level="h1" as="h2" margin="0 0 x-small">Heading level One</Heading>
    <Heading level="h2" as="h1" margin="0 0 x-small">Heading level Two</Heading>
    <Heading level="h3" margin="0 0 x-small">Heading level Three</Heading>
    <Heading level="h4" margin="0 0 x-small">Heading level Four</Heading>
    <Heading level="h5" margin="0 0 x-small">Heading level Five</Heading>
    <Heading level="reset" as="h2">Heading level reset</Heading>
  </div>
  ```

  ### Colors

  Headings default to the theme's 'oxford' text color. However, the text color
  can be changed, if desired.

  ```jsx_example
  <div>
    <Heading>I inherit my color via the CSS cascade (default)</Heading>
    <Heading color="primary">I am primary color</Heading>
    <Heading color="secondary">I am secondary color</Heading>
    <Heading color="brand">I am brand color</Heading>
    <Heading color="success">I am success color</Heading>
    <Heading color="warning">I am warning color</Heading>
    <Heading color="error">I am error/danger color</Heading>
  </div>
  ```

  ```jsx_example
  ---
  inverse: true
  ---
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
    <Heading border="bottom" level="h5">I have a bottom border</Heading>
    <br />
    <br />
    <Heading border="top">I have a top border</Heading>
  </div>
  ```

  ### Ellipsis text overflow

  When the `ellipsis` prop is `true`, the Heading text will no longer
  wrap. Any overflow will be truncated with an ellipsis `...`

  ```jsx_example
  <Heading level="h1" ellipsis>{lorem.paragraph()}</Heading>
  ```
 **/
 @themeable(theme, styles)
export default class Heading extends Component {
  /* eslint-disable react/require-default-props */
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
      'brand',
      'inherit'
    ]),
    level: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'reset']),
    /**
    * the element type to render as (defaults to the level)
    */
    as: CustomPropTypes.elementType,
    ellipsis: PropTypes.bool,
    /**
    * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
    * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
    * familiar CSS-like shorthand. For example: `margin="small auto large"`.
    */
    margin: CustomPropTypes.spacing
  }
  /* eslint-enable react/require-default-props */

  static defaultProps = {
    border: 'none',
    color: 'inherit',
    level: 'h2',
    ellipsis: false
  }

  render () {
    const {
      border,
      children,
      color,
      level,
      ellipsis,
      margin
    } = this.props

    const className = classnames({
      [styles.root]: true,
      [styles[level]]: true,
      [styles[`color-${color}`]]: color,
      [styles[`border-${border}`]]: border !== 'none',
      [styles.ellipsis]: ellipsis
    })

    const props = {
      ...omitProps(this.props, Heading.propTypes, ['padding']),
      className
    }

    const ElementType = getElementType(Heading, this.props, () => {
      if (level === 'reset') {
        return 'span'
      } else {
        return level
      }
    })

    return (
      <Container
        {...props}
        as={ElementType}
        margin={margin}
      >
        {children}
      </Container>
    )
  }
}
