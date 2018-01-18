import React, { Component } from 'react'
import PropTypes from 'prop-types'
import themeable from '@instructure/ui-themeable'
import classNames from 'classnames'
import Button from '@instructure/ui-core/lib/components/Button'
import TextInput from '@instructure/ui-core/lib/components/TextInput'
import ScreenReaderContent from '@instructure/ui-core/lib/components/ScreenReaderContent'

import {
  SAVING
} from '../../constants/CaptureStates'

export default class FileSave extends Component {
  static propTypes = {
    captureState: PropTypes.string.isRequired,
    fileName: PropTypes.string.isRequired,
    actions: PropTypes.shape({
      saveClicked: PropTypes.func.isRequired
    }).isRequired
  }

  constructor (props) {
    super(props)

    this.state = {
      fileName: this.props.fileName
    }
  }

  onChange = () => {
    this.setState({
      fileName: this.input.value
    })
  }

  saveClicked = () => {
    this.props.actions.saveClicked(this.state.fileName)
  }

  render () {
    return (
      <div style={{ display: 'flex', width: '100%' }}>
        <TextInput
          size="small"
          label={<ScreenReaderContent>Name{/* needs i18n */}</ScreenReaderContent>}
          placeholder={this.props.fileName} /* needs i18n */
          onChange={this.onChange}
          inputRef={(e) => { this.input = e }}
        />
        <Button
          onClick={this.saveClicked}
          disabled={this.props.captureState === SAVING}
          variant="primary"
          size="small"
          margin="0 0 0 x-small" /* needs i18n */
        >
          Save
        </Button>
      </div>
    )
  }
}
