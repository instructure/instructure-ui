import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'

import themeable from '../../util/themeable'
import dismissable from '../../util/dismissable'

import IconCompleteSolid from 'instructure-icons/lib/Solid/IconCompleteSolid'
import IconInfoSolid from 'instructure-icons/lib/Solid/IconInfoSolid'
import IconWarningSolid from 'instructure-icons/lib/Solid/IconWarningSolid'

import styles from './styles.css'
import theme from './theme.js'

/**
---
category: dialogs
---
  Alert Component Success, Info, Error, Warning

  ```jsx_example
  <div>
    <Alert variant="success" closeButtonLabel="Close" isDismissable>
      Success: Sample alert text.
    </Alert>

    <Alert variant="info" closeButtonLabel="Close" isDismissable>
      Error: Sample alert text.
    </Alert>

    <Alert variant="error" closeButtonLabel="Close" isDismissable>
      Error: Sample alert text. This text continues for a while
      to demonstrate what happens when the content stretches over
      several lines.
    </Alert>

    <Alert variant="warning" closeButtonLabel="Close" isDismissable>
      Error: Sample alert text.
    </Alert>
  </div>
  ```
**/
@dismissable(styles.closeButton)
@themeable(theme, styles)
export default class Alert extends Component {
  static propTypes = {
    /**
    * content to be rendered within Alert
    */
    children: PropTypes.node,
    /**
    * Determines color and icon
    */
    variant: PropTypes.oneOf(['info', 'success', 'warning', 'error'])
  }

  static defaultProps = {
    isDismissable: false,
    variant: 'info'
  }

  variantUI () {
    return {
      error: {
        Icon: IconWarningSolid,
        classNames: classNames(styles.alert, styles.error)
      },
      info: {
        Icon: IconInfoSolid,
        classNames: classNames(styles.alert, styles.info)
      },
      success: {
        Icon: IconCompleteSolid,
        classNames: classNames(styles.alert, styles.success)
      },
      warning: {
        Icon: IconWarningSolid,
        classNames: classNames(styles.alert, styles.warning)
      }
    }[this.props.variant]
  }

  renderIcon () {
    const { Icon } = this.variantUI()
    return (
      <div className={styles.icon}>
        <Icon className={styles.alertIcon} />
      </div>
    )
  }

  render () {
    const { classNames } = this.variantUI()
    return (
      <div className={classNames}>
        {this.renderIcon()}
        <div className={styles.content}>
          {this.props.children}
        </div>
      </div>
    )
  }
}
