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
      captureState: PropTypes.string
    }).isRequired
  }

  render () {
    return (
      <Provider store={this.props.store}>
        {this.props.render(this.props.state)}
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
