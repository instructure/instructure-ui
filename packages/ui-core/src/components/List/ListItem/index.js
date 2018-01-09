import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import themeable from '@instructure/ui-themeable'
import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'
import { omitProps } from '@instructure/ui-utils/lib/react/passthroughProps'
import warning from '@instructure/ui-utils/lib/warning'

import Container from '../../Container'

import styles from './styles.css'
import theme from './theme'

/**
---
parent: List
---
**/
@themeable(theme, styles)
export default class ListItem extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    children: PropTypes.node.isRequired,
    variant: CustomPropTypes.deprecatedVariant(
      PropTypes.oneOf(['default', 'unstyled', 'pipe', 'inline']),
      'pipe',
      'For the same functionality, use `inline` on the `variant` prop and set the `delimiter` prop to `pipe`.'
    ),
    delimiter: PropTypes.oneOf(['none', 'pipe', 'slash', 'arrow']),
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    /**
    * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
    * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
    * familiar CSS-like shorthand. For example: `margin="small auto large"`.
    */
    margin: CustomPropTypes.spacing,
    spacing: PropTypes.oneOf([
      undefined,
      'xxx-small',
      'xx-small',
      'x-small',
      'small',
      'medium',
      'large',
      'x-large',
      'xx-large'
    ])
  };
  /* eslint-enable react/require-default-props */

  render () {
    const props = omitProps(this.props, ListItem.propTypes, ['padding'])
    const delimiter = (this.props.variant === 'pipe') ? 'pipe' : this.props.delimiter
    const variant = (this.props.variant === 'pipe') ? 'inline' : this.props.variant
    const size = (this.props.variant === 'pipe') ? 'small' : this.props.size

    const noDelimiter = (delimiter === 'none' && variant !== 'inline')

    const noSpacing = this.props.delimiter !== 'none' || this.props.variant === 'pipe'
    warning(
      !(noSpacing && this.props.spacing),
      `[List] \`itemSpacing\` has no effect inside Lists with the \`delimiter\`
      prop set to anything other than \`none\`, or with a \`variant\` of \`pipe\``
    )

    const classes = {
      [styles.root]: true,
      [styles[variant]]: variant,
      [styles[size]]: size,
      [styles[`delimiter--${delimiter}`]]: true,
      [styles[`spacing--${this.props.spacing}`]]: !noSpacing
    }

    return (
      <Container
        {...props}
        as="li"
        margin={this.props.margin}
        className={classnames(classes)}
      >
        {this.props.children}
        {!noDelimiter && (
          <span
            className={styles.delimiter}
            aria-hidden="true"
          />
        )}
      </Container>
    )
  }
}
