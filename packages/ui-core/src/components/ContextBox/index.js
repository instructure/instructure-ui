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
 **/
@themeable(theme, styles)
export default class ContextBox extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    children:  PropTypes.node.isRequired,
    variant: PropTypes.oneOf(['default', 'inverse']),
    withArrow: PropTypes.bool,
    /**
     * Should the `<ContextBox />` have a border
     */
    withBorder: PropTypes.bool,
    /**
     * Should the `<ContextBox />` have a box shadow
     */
    withShadow: PropTypes.bool,
    arrowOffsetStart: PropTypes.oneOfType([
      PropTypes.number, PropTypes.string
    ]),
    arrowOffsetTop: PropTypes.oneOfType([
      PropTypes.number, PropTypes.string
    ]),
    placement: CustomPropTypes.placement,
    positionStart: PropTypes.oneOfType([
      PropTypes.number, PropTypes.string
    ]),
    positionTop: PropTypes.oneOfType([
      PropTypes.number, PropTypes.string
    ]),
    /**
    * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
    * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
    * familiar CSS-like shorthand. For example: `margin="small auto large"`.
    */
    margin: CustomPropTypes.spacing,
    /**
    * Valid values are `0`, `none`, `xxx-small`, `xx-small`, `x-small`,
    * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
    * familiar CSS-like shorthand. For example: `padding="small x-large large"`.
    */
    padding: CustomPropTypes.spacing,
    textAlign: PropTypes.oneOf(['start', 'center', 'end']),
    /**
    * Component will expand to fit the width of its contents by default,
    * unless size is specified
    */
    size: PropTypes.oneOf(['small', 'medium', 'large'])
  }
  /* eslint-enable react/require-default-props */

  static defaultProps = {
    variant: 'default',
    placement: 'center end',
    withArrow: true,
    withBorder: true,
    withShadow: true
  }

  render () {
    const {
      style, // eslint-disable-line react/prop-types
      className, // eslint-disable-line react/prop-types
      padding,
      margin,
      size,
      textAlign,
      variant,
      children,
      withArrow,
      withBorder,
      withShadow,
      positionStart,
      positionTop,
      arrowOffsetTop,
      arrowOffsetStart,
      placement
    } = this.props

    const classes = {
      [styles.root]: true,
      [styles[variant]]: true,
      [styles['with-arrow']]: withArrow,
      [styles['with-border']]: withBorder,
      [className]: className,
      [styles[`positioned--${placement.replace(' ', '-')}`]]: true
    }

    const containerStyle = {
      position: (positionTop || positionStart) ? 'absolute' : (style && style.position),
      left: positionStart || (style && style.left),
      top: positionTop || (style && style.top),
      ...style
    }

    const arrowStyle = {
      left: arrowOffsetStart,
      top: arrowOffsetTop
    }

    return (
      <Container
        {...omitProps(this.props, ContextBox.propTypes)}
        style={containerStyle}
        className={classnames(classes)}
        margin={margin}
        size={size}
      >
        <Container
          className={styles.content}
          padding={padding}
          textAlign={textAlign}
          withBorder={withBorder}
          withShadow={withShadow}
        >
          {withArrow && <span className={styles.arrow} style={arrowStyle} />}
          {children}
        </Container>
      </Container>
    )
  }
}
