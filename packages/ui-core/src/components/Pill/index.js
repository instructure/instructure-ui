import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import themeable from '@instructure/ui-themeable'
import { omitProps } from '@instructure/ui-utils/lib/react/passthroughProps'
import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'

import Container from '../Container'

import styles from './styles.css'
import theme from './theme'

/**
---
category: components
---
  Displays short, contextual information about an item. Change the border
  and text color via the `variant` prop. Use the `margin` prop to add space around
  the component.

  ```jsx_example
  <div>
    <div>
      <Pill
        text="Excused"
        margin="0 0 x-small"
      />
    </div>
    <div>
      <Pill
        variant="danger"
        text="Missing"
        margin="0 0 x-small"
      />
    </div>
    <div>
      <Pill
        variant="success"
        text="Checked In"
        margin="0 0 x-small"
      />
    </div>
    <div>
      <Pill
        variant="primary"
        text="Draft"
      />
    </div>
  </div>
  ```
  The component has a max-width, set by its theme. Any overflowing text will
  be handled via ellipses.
  ```jsx_example
  <Pill
    text="Long text that will force max-width overflow"
  />
  ```
**/

@themeable(theme, styles)
class Pill extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    text: PropTypes.string.isRequired,
    /**
    * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
    * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
    * familiar CSS-like shorthand. For example: `margin="small auto large"`.
    */
    margin: CustomPropTypes.spacing,
    variant: PropTypes.oneOf(['default', 'success', 'danger', 'primary'])
  }
  /* eslint-enable react/require-default-props */

  static defaultProps = {
    variant: 'default'
  }

  render () {
    const {
      margin,
      text,
      variant
    } = this.props

    const props = omitProps(this.props, Pill.propTypes, ['padding'])

    const classes = classnames({
      [styles.root]: true,
      [styles[variant]]: variant
    })

    return (
      <Container
        {...props}
        className={classes}
        as="span"
        display={null}
        margin={margin}
        title={text}
      >
        <span className={styles.text}>
          {text}
        </span>
      </Container>
    )
  }
}

export default Pill
