import React, { Children, Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import Container from '@instructure/ui-container/lib/components/Container'
import themeable from '@instructure/ui-themeable'
import { omitProps } from '@instructure/ui-utils/lib/react/passthroughProps'
import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'
import safeCloneElement from '@instructure/ui-utils/lib/react/safeCloneElement'

import ListItem from './ListItem'

import styles from './styles.css'
import theme from './theme'

/**
---
category: components/typography
---
**/
@themeable(theme, styles)
export default class List extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    /**
    * Only accepts <ListItem> as a child
    */
    children: CustomPropTypes.Children.oneOf([ListItem]),
    as: PropTypes.oneOf(['ul', 'ol']),
    /**
    * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
    * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
    * familiar CSS-like shorthand. For example: `margin="small auto large"`.
    */
    margin: CustomPropTypes.spacing,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    variant: PropTypes.oneOf(['default', 'unstyled', 'inline']),
    delimiter: PropTypes.oneOf(['none', 'pipe', 'slash', 'arrow'])
  }
  /* eslint-enable react/require-default-props */

  static defaultProps = {
    as: 'ul',
    margin: 'none',
    variant: 'default',
    delimiter: 'none',
    size: 'medium'
  }

  renderChildren () {
    return Children.map(this.props.children, (child) => {
      if (!child) return // ignore null, falsy children

      return safeCloneElement(child, {
        variant: this.props.variant,
        delimiter: this.props.delimiter,
        size: this.props.size,
        as: this.props.as
      })
    })
  }

  render () {
    const props = omitProps(this.props, List.propTypes, ['padding'])

    const {
      as,
      margin,
      variant
    } = this.props

    const classes = {
      [styles.root]: true,
      [styles[variant]]: variant,
      [styles.unordered]: as === 'ul',
      [styles.ordered]: as === 'ol'
    }

    return (
      <Container
        {...props}
        className={classnames(classes)}
        as={as}
        margin={margin}
      >
        {this.renderChildren()}
      </Container>
    )
  }
}

export { default as ListItem } from './ListItem'
