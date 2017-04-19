import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import themeable from '../../../themeable'
import dismissable from '../../../util/dismissable'
import { omitProps } from '../../../util/passthroughProps'

import styles from './styles.css'
import theme from './theme.js'

@dismissable(styles.closeButton)
@themeable(theme, styles)
export default class ModalContent extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    size: PropTypes.oneOf(['auto', 'small', 'medium', 'large', 'fullscreen']),
    children: PropTypes.node
  }

  render () {
    const {
      size,
      children,
      label,
      ...props
    } = this.props

    return (
      <div
        {...omitProps(props, dismissable.propTypes)}
        role="region"
        aria-label={label}
        className={classnames({
          [styles.root]: true,
          [styles[size]]: true
        })}
      >
        {children}
      </div>
    )
  }
}
