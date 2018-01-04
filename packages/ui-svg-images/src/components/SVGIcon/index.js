import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import themeable from '@instructure/ui-themeable'
import { omitProps } from '@instructure/ui-utils/lib/react/passthroughProps'
import deprecated from '@instructure/ui-utils/lib/react/deprecated'

import InlineSVG from '../InlineSVG'

import styles from './styles.css'
import theme from './theme'

/**
---
category: components/utilities
---
**/
@themeable(theme, styles)

@deprecated('4.7.0', {
  width: 'size',
  height: 'size'
})

class SVGIcon extends Component {
  static propTypes = {
    ...InlineSVG.propTypes,
    width: PropTypes.string,
    height: PropTypes.string,
    rotate: PropTypes.oneOf(['0', '90', '180', '270']),
    size: PropTypes.oneOf([undefined, 'x-small', 'small', 'medium', 'large', 'x-large'])
  }

  static defaultProps = {
    width: '1em',
    height: '1em',
    rotate: '0',
    size: undefined
  }

  render () {
    const {
      width,
      height,
      rotate,
      className,
      size,
      style, // eslint-disable-line react/prop-types
      ...props
    } = this.props

    const classes = {
      [styles.root]: true,
      [styles[`rotate--${rotate}`]]: rotate && rotate !== '0',
      [styles[`size--${size}`]]: size,
      [className]: className
    }

    return (
      <InlineSVG
        {...props}
        style={{ ...style, width, height }}
        width={width}
        height={height}
        rotate={rotate}
        className={classnames(classes)}
      />
    )
  }
}

export default SVGIcon
