import React, { Component, PropTypes } from 'react'
import themeable from '../../util/themeable'
import classnames from 'classnames'
import { omitProps } from '../../util/passthroughProps'

import styles from './styles.css'
import theme from './theme.js'

/**
  A Typography component for styling text content

  ### Font sizes

  ```jsx_example
  <div>
    <Typography size="x-small">I'm extra small</Typography><br/>
    <Typography size="small">I'm small</Typography><br/>
    <Typography>I'm medium</Typography><br/>
    <Typography size="large">I'm large</Typography><br/>
    <Typography size="x-large">I'm extra large</Typography><br/>
    <Typography size="xx-large">I'm extra extra large</Typography>
  </div>
  ```

  ### Font weights

  ```jsx_example
  <div>
    <Typography weight="light">I'm light text</Typography><br/>
    <Typography>I'm normal text</Typography><br/>
    <Typography weight="bold">I'm bold text</Typography>
  </div>
  ```

  ### Font styles

  ```jsx_example
  <div>
    <Typography style="italic">I'm italic text</Typography><br/>
    <Typography>I'm normal text</Typography>
  </div>
  ```

  ### Line heights

  ```jsx_example
  <div>
    <Typography tag="p" lineHeight="fit">{lorem.paragraph()}</Typography>
    <Typography tag="p">{lorem.paragraph()}</Typography>
    <Typography tag="p" lineHeight="condensed">{lorem.paragraph()}</Typography>
    <Typography tag="p" lineHeight="double">{lorem.paragraph()}</Typography>
  </div>
  ```

  ### Text transform

  ```jsx_example
  <div>
    <Typography transform="capitalize">I'm capitalized text</Typography><br/>
    <Typography transform="uppercase">I'm uppercase text</Typography><br/>
    <Typography transform="lowercase">I'M LOWERCASE TEXT</Typography><br/>
  </div>
  ```

  ### Text colors

  ```jsx_example
  <div>
    <Typography color="primary">I'm primary text</Typography><br/>
    <Typography color="secondary">I'm secondary text</Typography><br/>
    <Typography color="success">I'm success text</Typography><br/>
    <Typography color="error">I'm error text</Typography>
  </div>
  ```

  ```jsx_example_inverse
  <div>
    <Typography color="primary-inverse">I'm primary text</Typography><br/>
    <Typography color="secondary-inverse">I'm secondary text</Typography>
  </div>
  ```

  ### Element styles

  ```jsx_example
    <Typography>
      <b>bold </b>
      <strong>strong </strong>
      <i>italic </i>
      <em>emphasis </em>
      <pre>preformatted</pre>
      <code>code</code>
    </Typography>
  ```

**/
@themeable(theme, styles)
export default class Typography extends Component {
  static propTypes = {
    /**
    * the html tag to use for the root element
    */
    tag: PropTypes.string,
    weight: PropTypes.oneOf([
      'normal',
      'light',
      'bold'
    ]),
    style: PropTypes.oneOf([
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
      'error'
    ]),
    children: PropTypes.node
  }

  static defaultProps = {
    tag: 'span'
  }

  render () {
    const {
      tag,
      weight,
      style,
      size,
      lineHeight,
      transform,
      color,
      children
    } = this.props

    const classes = {
      [styles.root]: true,
      [styles[size]]: size,
      [styles['weight' + '-' + weight]]: weight,
      [styles['style' + '-' + style]]: style,
      [styles['transform' + '-' + transform]]: transform,
      [styles['lineHeight' + '-' + lineHeight]]: lineHeight,
      [styles['color' + '-' + color]]: color
    }

    const props = omitProps(this.props, Typography.propTypes)

    props.className = classnames(classes)
    props.children = children

    return React.createElement(tag, props)
  }
}
