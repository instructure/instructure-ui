import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect, Provider } from 'react-redux'
import * as CaptureActions from '../../actions'

class MediaCaptureProvider extends React.Component {
  static propTypes = {
    render: PropTypes.func.isRequired,
    store: PropTypes.shape({
      dispatch: PropTypes.func,
      getState: PropTypes.func,
      subscribe: PropTypes.func
    }).isRequired,
    state: PropTypes.shape({
      captureState: PropTypes.string,
      videoSrc: PropTypes.string,
      msg: PropTypes.string
    }).isRequired,
    actions: PropTypes.shape({
      audioDeviceChanged: PropTypes.func.isRequired,
      closeClicked: PropTypes.func.isRequired,
      countdownComplete: PropTypes.func.isRequired,
      finishClicked: PropTypes.func.isRequired,
      onComplete: PropTypes.func.isRequired,
      startClicked: PropTypes.func.isRequired,
      startoverClicked: PropTypes.func.isRequired,
      titleEdited: PropTypes.func.isRequired,
      videoDeviceChanged: PropTypes.func.isRequired,
      deviceRequestAccepted: PropTypes.func.isRequired,
      mediaRecorderInitialized: PropTypes.func.isRequired,
      videoObjectGenerated: PropTypes.func.isRequired,
      errorOccurred: PropTypes.func.isRequired
    }).isRequired
  }

  render () {
    return (
      <Provider store={this.props.store}>
        {
          this.props.render(
            {
              state: { ...this.props.state },
              actions: { ...this.props.actions }
            }
          )
        }
      </Provider>
    )
  }
}

const mapStateToProps = state => ({
  state: state
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(CaptureActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MediaCaptureProvider)
