import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import Container from '@instructure/ui-container/lib/components/Container'
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
