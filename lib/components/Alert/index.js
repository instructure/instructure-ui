import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import themeable from '../../themeable'
import dismissable from '../../util/dismissable'
import CustomPropTypes from '../../util/CustomPropTypes'
import Container from '../Container'

import IconCompleteSolid from 'instructure-icons/lib/Solid/IconCompleteSolid'
import IconInfoSolid from 'instructure-icons/lib/Solid/IconInfoSolid'
import IconWarningSolid from 'instructure-icons/lib/Solid/IconWarningSolid'

import styles from './styles.css'
import theme from './theme.js'

/**
---
category: dialogs
---
  Alert Component Success, Info, Error, Warning. The `margin` prop can be added to give
  space above or below the alert.

  ```jsx_example
  <div>
    <Alert variant="success" closeButtonLabel="Close" isDismissable margin="large none">
      Success: Sample alert text.
    </Alert>

    <Alert variant="info" closeButtonLabel="Close" isDismissable margin="small none">
      Info: Sample alert text.
    </Alert>

    <Alert variant="error" closeButtonLabel="Close" isDismissable margin="medium none">
      Error: Sample alert text. This text continues for a while
      to demonstrate what happens when the content stretches over
      several lines.
    </Alert>

    <Alert variant="warning" closeButtonLabel="Close" isDismissable margin="xxSmall none">
      Warning: Sample alert text.
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
    variant: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
    /**
    * Valid values are `0`, `none`, `auto`, `xxxSmall`, `xxSmall`, `xSmall`,
    * `small`, `medium`, `large`, `xLarge`, `xxLarge`. Apply these values via
    * familiar CSS-like shorthand. For example: `margin="small auto large"`.
    */
    margin: CustomPropTypes.spacing
  }

  static defaultProps = {
    isDismissable: false,
    variant: 'info',
    closeButtonVariant: 'icon'
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
      <Container as="div" margin={this.props.margin} className={classNames} display={null}>
        {this.renderIcon()}
        <div className={styles.content}>
          {this.props.children}
        </div>
      </Container>
    )
  }
}
