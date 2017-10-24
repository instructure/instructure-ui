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
