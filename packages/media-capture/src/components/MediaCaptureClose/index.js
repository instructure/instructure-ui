import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import CloseButton from '@instructure/ui-core/lib/components/CloseButton'
import themeable from '@instructure/ui-themeable'
import classNames from 'classnames'

import * as CaptureActions from '../../actions'

import styles from './styles.css'

@themeable({}, styles)
class MediaCaptureClose extends Component {
  static propTypes = {
    captureState: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    actions: PropTypes.shape({
      closeClicked: PropTypes.func
    })
  }

  static defaultProps = {
    actions: {
      closeClicked: () => {}
    }
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
          Close
        </CloseButton>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  state: state
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(CaptureActions, dispatch)
})

export const _component = MediaCaptureClose
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MediaCaptureClose)
