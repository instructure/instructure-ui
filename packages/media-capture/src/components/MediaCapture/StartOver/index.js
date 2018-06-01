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
import IconResetSolid from '@instructure/ui-icons/lib/Solid/IconReset'
import { translate } from '../../../constants/translated/translations'

/**
---
private: true
---
**/
export default class StartOver extends Component {
  static propTypes = {
    actions: PropTypes.shape({
      startoverClicked: PropTypes.func.isRequired
    }).isRequired
  }

  static defaultProps = {
    actions: {
      startoverClicked: () => {}
    }
  }

  render () {
    const { actions } = this.props

    return (
      <Button
        onClick={actions.startoverClicked}
        variant="light"
        size="small"
        icon={IconResetSolid}
        theme={{ iconPlusTextFontSize: '0.8em' }}>
        { translate('START_OVER') }
      </Button>
    )
  }
}
