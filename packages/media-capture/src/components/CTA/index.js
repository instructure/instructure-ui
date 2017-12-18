import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as CaptureActions from '../../actions'

class CTA extends Component {
  static propTypes = {
    actions: PropTypes.shape({
      startClicked: PropTypes.func
    })
  }

  static defaultProps = {
    actions: {
      startClicked: () => {}
    }
  }

  render () {
    return (
      <button onClick={this.props.actions.startClicked}>Start</button>
    )
  }
}

const mapStateToProps = state => ({
  state: state
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(CaptureActions, dispatch)
})

export const _component = CTA
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CTA)
