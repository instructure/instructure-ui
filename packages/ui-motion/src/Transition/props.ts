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

import PropTypes from 'prop-types'

import type { PropValidators, TransitionTheme } from '@instructure/shared-types'
import type { WithStyleProps, ComponentStyle } from '@instructure/emotion'

import { transitionCommonPropTypes } from './BaseTransition/props'
import type {
  TransitionCommonProps,
  TransitionType
} from './BaseTransition/props'

const transitionTypes: Readonly<Array<TransitionType>> = [
  'fade',
  'scale',
  'slide-down',
  'slide-up',
  'slide-left',
  'slide-right'
]

const transitionTypePropType = PropTypes.oneOf(transitionTypes)

type OwnProps = {
  type?: TransitionType
}

// TransitionCommonProps get passed to BaseTransition
type TransitionOwnProps = OwnProps & TransitionCommonProps

type PropKeys = keyof TransitionOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type TransitionProps = TransitionOwnProps &
  WithStyleProps<TransitionTheme, TransitionStyle>

type TransitionStyle = ComponentStyle<'globalStyles'> & {
  duration: TransitionTheme['duration']
  classNames: {
    transitioning: string
    exited: string
    exiting: string
    entered: string
    entering: string
  }
}

const propTypes: PropValidators<PropKeys> = {
  type: transitionTypePropType,
  ...transitionCommonPropTypes
}

const allowedProps: AllowedPropKeys = [
  'type',
  'children',
  'in',
  'unmountOnExit',
  'transitionOnMount',
  'transitionEnter',
  'transitionExit',
  'onTransition',
  'onEnter',
  'onEntering',
  'onEntered',
  'onExit',
  'onExiting',
  'onExited'
]

export type { TransitionProps, TransitionType, TransitionStyle }
export { propTypes, allowedProps, transitionTypePropType }
