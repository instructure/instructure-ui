import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import dismissable from '../../../util/dismissable'
import themeable from '../../../themeable'
import { omitProps } from '../../../util/passthroughProps'

import styles from './styles.css'
import theme from './theme'

@dismissable(styles.closeButton)
@themeable(theme, styles)
class TrayContent extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    label: PropTypes.string.isRequired,
    /**
     * The children to be rendered within the `<TrayContent />`
     */
    children: PropTypes.node,

    /**
    * Placment to determine which side the close button should be placed on.
    */
    placement: PropTypes.oneOf(['top', 'bottom', 'start', 'end'])
  }
  /* eslint-enable react/require-default-props */

  render () {
    const {
      children,
      placement,
      label,
      ...props
    } = this.props

    return (
      <div
        {...omitProps(props, dismissable.propTypes)}
        role="region"
        aria-label={label}
        className={
          classnames({
            [styles[`placement--${placement}`]]: true
          })
        }
      >
        {children}
      </div>
    )
  }
}

export default TrayContent
