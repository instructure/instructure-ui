import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import Container from '@instructure/ui-container/lib/components/Container'
import themeable from '@instructure/ui-themeable'
import { omitProps } from '@instructure/ui-utils/lib/react/passthroughProps'
import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'

import styles from './styles.css'
import theme from './theme'

/**
---
category: components
---
**/

@themeable(theme, styles)
class Pill extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    text: PropTypes.node.isRequired,
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
