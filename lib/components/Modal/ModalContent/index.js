import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import themeable from '../../../themeable'
import dismissible from '../../../util/dismissible'
import { omitProps } from '../../../util/passthroughProps'

import styles from './styles.css'
import theme from './theme'

@dismissible(styles.closeButton)
@themeable(theme, styles)
export default class ModalContent extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    label: PropTypes.string.isRequired,
    size: PropTypes.oneOf(['auto', 'small', 'medium', 'large', 'fullscreen']),
    children: PropTypes.node
  }
  /* eslint-enable react/require-default-props */

  render () {
    const {
      size,
      children,
      label,
      ...props
    } = this.props

    return (
      <div
        {...omitProps(props, dismissible.propTypes)}
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
