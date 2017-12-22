import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import themeable from '@instructure/ui-themeable'
import { omitProps } from '@instructure/ui-utils/lib/react/passthroughProps'

import InlineSVG from '../InlineSVG'

import styles from './styles.css'
import theme from './theme'

/**
---
category: components/utilities
---
**/
@themeable(theme, styles)
class SVGIcon extends Component {
  static propTypes = {
    ...InlineSVG.propTypes,
    width: PropTypes.string,
    height: PropTypes.string,
    rotate: PropTypes.oneOf(['0', '90', '180', '270'])
  }

  static defaultProps = {
    width: '1em',
    height: '1em',
    rotate: '0'
  }

  render () {
    const {
      width,
      height,
      rotate,
      className,
      style, // eslint-disable-line react/prop-types
      ...props
    } = this.props

    const classes = {
      [styles.root]: true,
      [styles[`rotate--${rotate}`]]: rotate && rotate !== '0',
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
