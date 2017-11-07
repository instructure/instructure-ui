import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import IconXSolid from 'instructure-icons/lib/Solid/IconXSolid'

import themeable from '@instructure/ui-themeable'
import { omitProps, pickProps } from '@instructure/ui-utils/lib/react/passthroughProps'
import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'

import Button from '../Button'
import ScreenReaderContent from '../ScreenReaderContent'

import styles from './styles.css'
import theme from './theme'

/**
---
category: components/utilities
---
**/
@themeable(theme, styles)
class CloseButton extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    buttonRef: PropTypes.func,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    onClick: PropTypes.func,
    margin: CustomPropTypes.spacing,
    placement: PropTypes.oneOf(['start', 'end', 'static']),
    offset: PropTypes.oneOf(['none', 'x-small', 'small', 'medium']),
    variant: PropTypes.oneOf(['icon', 'icon-inverse'])
  }

  static defaultProps = {
    onClick: (event) => {},
    buttonRef: (el) => {},
    variant: 'icon',
    placement: 'static',
    offset: 'x-small',
    size: 'medium',
    margin: '0'
  }

  render () {
    const { placement, offset } = this.props

    return (
      <span
        {...omitProps(this.props, CloseButton.propTypes)}
        className={classnames({
          [styles.root]: true,
          [styles[`placement--${placement}`]]: placement,
          [styles[`offset--${offset}`]]: offset
        })}
      >
        <Button {...pickProps(this.props, Button.propTypes)} size="small">
          <IconXSolid />
          <ScreenReaderContent>
            {this.props.children}
          </ScreenReaderContent>
        </Button>
      </span>
    )
  }
}

export default CloseButton
