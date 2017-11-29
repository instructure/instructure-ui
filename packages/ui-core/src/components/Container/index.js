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
category: components/layout
---
**/
@themeable(theme, styles)
class Container extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    as: CustomPropTypes.elementType,
    children: PropTypes.node,
    textAlign: PropTypes.oneOf(['start', 'center', 'end']),
    /**
    * Controls the maximum width of the Container
    */
    size: PropTypes.oneOf(['auto', 'x-small', 'small', 'medium', 'large', 'fullscreen']),
    /**
    * Set the margin using familiar CSS shorthand
    */
    margin: CustomPropTypes.spacing,
    /**
    * Set the padding using familiar CSS shorthand
    */
    padding: CustomPropTypes.spacing,
    /**
    * By default the Container is a block-level element
    */
    display: PropTypes.oneOf([null, 'block', 'inline']),
    /**
    * Activate a dotted line around the Container to make building your
    * layout easier
    */
    visualDebug: PropTypes.bool,

    /**
    * provides a reference to the underlying html element
    */
    elementRef: PropTypes.func,

    /**
     * Whether or not to render a border around the Container
     */
    withBorder: PropTypes.bool,

    /**
     * Whether or not to render a box shadow for the Container
     */
    withShadow: PropTypes.bool
  }
  /* eslint-enable react/require-default-props */

  static defaultProps = {
    display: null
  }

  renderSpacingStyles (spacingFromProps, spacingFromTheme) {
    if (typeof spacingFromProps !== 'string') {
      return null
    }

    const spacing = spacingFromProps.split(' ')
    const spacingStyle = []

    for (let i = 0; i < spacing.length; i++) {
      const style = spacingFromTheme[spacing[i]]
      if (style) {
        spacingStyle.push(style)
      }
    }

    return spacingStyle.join(' ')
  }

  get paddingFromTheme () {
    return {
      0: '0',
      none: '0',
      'xxx-small': this.theme.paddingxxxSmall,
      'xx-small': this.theme.paddingxxSmall,
      'x-small': this.theme.paddingxSmall,
      small: this.theme.paddingSmall,
      medium: this.theme.paddingMedium,
      large: this.theme.paddingLarge,
      'x-large': this.theme.paddingxLarge,
      'xx-large': this.theme.paddingxxLarge
    }
  }

  get marginFromTheme () {
    return {
      auto: 'auto',
      0: '0',
      none: '0',
      'xxx-small': this.theme.marginxxxSmall,
      'xx-small': this.theme.marginxxSmall,
      'x-small': this.theme.marginxSmall,
      small: this.theme.marginSmall,
      medium: this.theme.marginMedium,
      large: this.theme.marginLarge,
      'x-large': this.theme.marginxLarge,
      'xx-large': this.theme.marginxxLarge
    }
  }

  render () {
    const {
      children,
      textAlign,
      display,
      visualDebug,
      size,
      padding,
      margin,
      withBorder,
      withShadow
    } = this.props

    const classes = {
      [styles.root]: true,
      [styles[display]]: display !== null,
      [styles.visualDebug]: visualDebug,
      [styles[`textAlign--${textAlign}`]]: textAlign,
      [styles[size]]: size,
      [styles.hasPadding]: padding,
      [styles.withBorder]: withBorder,
      [styles.withShadow]: withShadow,
      [this.props.className]: this.props.className // eslint-disable-line react/prop-types
    }

    const style = {
      ...this.props.style, // eslint-disable-line react/prop-types
      margin: this.renderSpacingStyles(margin, this.marginFromTheme),
      padding: this.renderSpacingStyles(padding, this.paddingFromTheme)
    }

    const ElementType = getElementType(Container, this.props)

    return (
      <ElementType
        {...omitProps(this.props, Container.propTypes)}
        className={classnames(classes)}
        style={style}
        ref={this.props.elementRef}
      >
        {children}
      </ElementType>
    )
  }
}

export default Container
