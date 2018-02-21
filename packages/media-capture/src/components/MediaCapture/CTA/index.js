/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 - present Instructure, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '@instructure/ui-buttons/lib/components/Button'

import {
  READY,
  RECORDING
} from '../../../constants/CaptureStates'

import { translate } from '../../../constants/translated/translations'

/**
---
private: true
---
**/
class CTA extends Component {
  static propTypes = {
    actions: PropTypes.shape({
      saveClicked: PropTypes.func.isRequired,
      startClicked: PropTypes.func.isRequired,
      finishClicked: PropTypes.func.isRequired
    }).isRequired,
    captureState: PropTypes.string.isRequired,
    hasStarted: PropTypes.bool.isRequired
  }

  componentDidMount () {
    this.props.hasStarted && this.el && this.el.focus()
  }

  componentDidUpdate () {
    this.props.hasStarted && this.el && this.el.focus()
  }

  captureRef = (e) => {
    this.el = e
  }

  render () {
    const { captureState, actions } = this.props

    const StartGuard = (state) => {
      if (state !== READY) return null

      return (
        <Button
          onClick={actions.startClicked}
          variant="primary"
          size="large"
          margin="0 medium"
          ref={this.captureRef}
        >
          { translate('START') }
        </Button>
      )
    }

    const FinishGuard = (state) => {
      if (state !== RECORDING) return null

      return (
        <Button
          onClick={actions.finishClicked}
          variant="primary"
          size="large"
          margin="0 auto"
          ref={this.captureRef}
        >
          { translate('FINISH') }
        </Button>
      )
    }

    return (
      StartGuard(captureState) ||
      FinishGuard(captureState)
    )
  }
}

export default CTA
