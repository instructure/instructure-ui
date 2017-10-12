import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import themeable from '@instructure/ui-themeable'
import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'
import getElementType from '@instructure/ui-utils/lib/react/getElementType'
import { omitProps } from '@instructure/ui-utils/lib/react/passthroughProps'

import styles from './styles.css'
import theme from './theme'

/**
---
category: components/typography
---
  A component for styling text content

  ### Font sizes

  ```jsx_example
  <div>
    <Text size="x-small">I'm extra small</Text><br/>
    <Text size="small">I'm small</Text><br/>
    <Text>I'm medium</Text><br/>
    <Text size="large">I'm large</Text><br/>
    <Text size="x-large">I'm extra large</Text><br/>
    <Text size="xx-large">I'm extra extra large</Text>
  </div>
  ```

  ### Font weights

  ```jsx_example
  <div>
    <Text weight="light">I'm light text</Text><br/>
    <Text>I'm normal text</Text><br/>
    <Text weight="bold">I'm bold text</Text>
  </div>
  ```

  ### Font styles

  ```jsx_example
  <div>
    <Text fontStyle="italic">I'm italic text</Text><br/>
    <Text>I'm normal text</Text>
  </div>
  ```

  ### Line heights

  ```jsx_example
  <div>
    <Text lineHeight="fit">
      <p>{lorem.paragraph()}</p>
    </Text>
    <Text>
      <p>{lorem.paragraph()}</p>
    </Text>
    <Text lineHeight="condensed">
      <p>{lorem.paragraph()}</p>
    </Text>
    <Text lineHeight="double">
      <p>{lorem.paragraph()}</p>
    </Text>
  </div>
  ```

  ### Text transform

  ```jsx_example
  <div>
    <Text transform="capitalize">I'm capitalized text</Text><br/>
    <Text transform="uppercase">I'm uppercase text</Text><br/>
    <Text transform="lowercase">I'M LOWERCASE TEXT</Text><br/>
  </div>
  ```

  ### Letter-spacing

  ```jsx_example
  <div>
    <Text letterSpacing="normal">I'm normal text</Text><br/>
    <Text letterSpacing="condensed">I'm condensed text</Text><br/>
    <Text letterSpacing="expanded" transform="uppercase">I'm expanded uppercase text</Text><br/>
  </div>
  ```
  ### Text colors

  ```jsx_example
  <div>
    <Text color="primary">I'm primary text</Text><br/>
    <Text color="secondary">I'm secondary text</Text><br/>
    <Text color="brand">I'm brand text</Text><br />
    <Text color="success">I'm success text</Text><br/>
    <Text color="warning">I'm warning text</Text><br/>
    <Text color="error">I'm error text</Text>
  </div>
  ```

  ```jsx_example
  ---
  inverse: true
  ---
  <div>
    <Text color="primary-inverse">I'm primary text</Text><br/>
    <Text color="secondary-inverse">I'm secondary text</Text>
  </div>
  ```

  ### Element styles

  ```jsx_example
    <Text>
      <b>bold </b>
      <strong>strong </strong>
      <i>italic </i>
      <em>emphasis </em>
      <pre>preformatted</pre>
      <code>code</code>
      This<sup>is</sup> some<sub>text</sub>.
    </Text>
  ```

**/
@themeable(theme, styles)
export default class Text extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    /**
    * the element type to render as
    */
    as: CustomPropTypes.elementType,
    weight: PropTypes.oneOf([
      'normal',
      'light',
      'bold'
    ]),
    fontStyle: PropTypes.oneOf([
      'italic',
      'normal'
    ]),
    size: PropTypes.oneOf([
      'x-small',
      'small',
      'medium',
      'large',
      'x-large',
      'xx-large'
    ]),
    lineHeight: PropTypes.oneOf([
      'default',
      'fit',
      'condensed',
      'double'
    ]),
    letterSpacing: PropTypes.oneOf([
      'normal',
      'condensed',
      'expanded'
    ]),
    transform: PropTypes.oneOf([
      'none',
      'capitalize',
      'uppercase',
      'lowercase'
    ]),
    color: PropTypes.oneOf([
      'primary',
      'secondary',
      'primary-inverse',
      'secondary-inverse',
      'success',
      'error',
      'warning',
      'brand'
    ]),
    children: PropTypes.node
  }
  /* eslint-enable react/require-default-props */

  static defaultProps = {
    as: 'span',
    size: 'medium',
    letterSpacing: 'normal'
  }

  render () {
    const {
      weight,
      fontStyle,
      size,
      lineHeight,
      letterSpacing,
      transform,
      color
    } = this.props

    const classes = {
      [styles.root]: true,
      [styles[size]]: size,
      [styles[`weight-${weight}`]]: weight,
      [styles[`style-${fontStyle}`]]: fontStyle,
      [styles[`transform-${transform}`]]: transform,
      [styles[`lineHeight-${lineHeight}`]]: lineHeight,
      [styles[`letterSpacing-${letterSpacing}`]]: letterSpacing,
      [styles[`color-${color}`]]: color
    }

    const props = {
      ...omitProps(this.props, Text.propTypes),
      className: classnames(classes)
    }

    const ElementType = getElementType(Text, this.props)

    return <ElementType {...props}>{this.props.children}</ElementType>
  }
}
