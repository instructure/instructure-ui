import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CloseButton from '@instructure/ui-core/lib/components/CloseButton'
import themeable from '@instructure/ui-themeable'
import classNames from 'classnames'

import styles from './styles.css'

@themeable({}, styles)
export default class MediaCaptureClose extends Component {
  static propTypes = {
    captureState: PropTypes.string.isRequired,
    actions: PropTypes.shape({
      closeClicked: PropTypes.func
    }).isRequired,
    onClick: PropTypes.func.isRequired
  }

  static defaultProps = {
  }

  constructor (props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    this.props.actions.closeClicked()
    this.props.onClick(this.props.captureState)
  }

  render () {
    return (
      <div className={styles.close}>
        <CloseButton className="close" onClick={this.handleClick} size="large">
          Close {/* needs i18n */}
        </CloseButton>
      </div>
    )
  }
}
