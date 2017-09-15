import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import IconXSolid from 'instructure-icons/lib/Solid/IconXSolid'

import themeable from '../../themeable'
import { omitProps, pickProps } from '../../util/passthroughProps'

import Button from '../Button'
import ScreenReaderContent from '../ScreenReaderContent'

import styles from './styles.css'
import theme from './theme'

/**
---
category: utilities
---
  A CloseButton component (used in dialog components).
  See [Alert](#Alert), [Popover](#Popover), [Modal](#Modal) and [Tray](#Tray).

  See [Button](#Button) for properties.

  ```jsx_example
  <CloseButton offset="none">Close</CloseButton>
  ```
**/
@themeable(theme, styles)
class CloseButton extends Component {
  static propTypes = {
    ...Button.propTypes,

    placement: PropTypes.oneOf(['start', 'end', 'static']),
    offset: PropTypes.oneOf(['none', 'x-small', 'small', 'medium']),
    variant: PropTypes.oneOf(['icon', 'icon-inverse'])
  }

  static defaultProps = {
    variant: 'icon',
    placement: 'static',
    offset: 'x-small'
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
