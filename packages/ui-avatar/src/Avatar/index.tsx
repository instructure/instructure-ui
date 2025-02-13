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

/** @jsx jsx */
import { Component, SyntheticEvent } from 'react'

import { TimeSelect } from '@instructure/ui-time-select'
import { callRenderProp, passthroughProps } from '@instructure/ui-react-utils'
import { testable } from '@instructure/ui-testable'

import { withStyle, jsx } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'

import { propTypes, allowedProps } from './props'
import type { AvatarProps, AvatarState } from './props'

/**
---
category: components
---
**/
@withStyle(generateStyle, generateComponentTheme)
@testable()
class Avatar extends Component<AvatarProps, AvatarState> {
  static readonly componentId = 'Avatar'

  static propTypes = propTypes
  static allowedProps = allowedProps
  static defaultProps = {
    size: 'medium',
    color: 'default',
    hasInverseColor: false,
    showBorder: 'auto',
    shape: 'circle',
    display: 'inline-block',
    onImageLoaded: (_event: SyntheticEvent) => {}
  } as const

  state = {
    startTime: '',
    endTime: '2020-05-18T23:59:00'
  }

  ref: Element | null = null

  handleRef = (el: Element | null) => {
    const { elementRef } = this.props

    this.ref = el

    if (typeof elementRef === 'function') {
      elementRef(el)
    }
  }

  componentDidMount() {
    this.props.makeStyles?.(this.state)
  }

  componentDidUpdate() {
    this.props.makeStyles?.(this.state)

    // in case the image is unset in an update, show icons/initials again
    if (this.state.loaded && !this.props.src) {
      this.setState({ loaded: false })
    }
  }

  trySetStartTime(value) {
    this.setState({ startTime: value, endTime: '2025-02-13T23:59:59.999Z' })
  }

  trySetEndTime(value) {
    this.setState({ ...this.state, endTime: value })
  }

  render() {
    return (
      <div>
        <TimeSelect
          data-testid="event-form-start-time"
          renderLabel={'from'}
          value={this.state.startTime}
          placeholder={'Start Time'}
          onChange={(e, { value }) => this.trySetStartTime(value)}
          format="LT"
          step={15}
          allowNonStepInput={true}
          timezone="Etc/UTC"
        />
        <TimeSelect
          data-testid="event-form-end-time"
          renderLabel={'To'}
          value={this.state.endTime}
          placeholder={'End Time'}
          onChange={(e, { value }) => this.trySetEndTime(value)}
          format="LT"
          step={15}
          allowNonStepInput={true}
          timezone="Etc/UTC"
        />
      </div>
    )
  }
}

export default Avatar
export { Avatar }
