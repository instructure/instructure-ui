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
import React from 'react'
import PropTypes from 'prop-types'

import type { PropValidators } from '@instructure/shared-types'
import type { WithStyleProps } from '@instructure/emotion'

type BaseTransitionOwnProps = {
  /**
   * Show the component? Triggers the enter or exit animation.
   */
  in?: boolean

  /**
   * Unmount the component (remove it from the DOM) when it is not shown.
   */
  unmountOnExit?: boolean

  /**
   * Run the enter animation when the component mounts, if it is initially
   * shown
   */
  transitionOnMount?: boolean
  /**
   * Run the enter animation
   */
  transitionEnter?: boolean
  /**
   * Run the exit animation
   */
  transitionExit?: boolean

  /**
   * A Timeout for the animation, in milliseconds, to ensure that a node doesn't
   * transition indefinately if the browser transitionEnd events are
   * canceled or interrupted.
   *
   * By default this is set to a high number (5 seconds) as a failsafe. You should consider
   * setting this to the duration of your animation (or a bit above it).
   */
  enterDelay?: number

  /**
   * A Timeout for the animation, in milliseconds, to ensure that a node doesn't
   * transition indefinately if the browser transitionEnd events are
   * canceled or interrupted.
   *
   * By default this is set to a high number (5 seconds) as a failsafe. You should consider
   * setting this to the duration of your animation (or a bit above it).
   */
  exitDelay?: number

  /**
   * the base CSS class for the transition (transitions go here)
   */
  transitionClassName?: string

  /**
   * CSS class or classes applied when the component is exited
   */
  exitedClassName?: string
  /**
   * CSS class or classes applied while the component is exiting
   */
  exitingClassName?: string
  /**
   * CSS class or classes applied when the component is entered
   */
  enteredClassName?: string
  /**
   * CSS class or classes applied while the component is entering
   */
  enteringClassName?: string

  /**
   * Callback fired when transitioning to the next state
   */
  onTransition?: (toState: number, fromState: number) => void

  /**
   * Callback fired before the "entering" classes are applied
   */
  onEnter?: () => void
  /**
   * Callback fired after the "entering" classes are applied
   */
  onEntering?: () => void
  /**
   * Callback fired after the "enter" classes are applied
   */
  onEntered?: () => void
  /**
   * Callback fired before the "exiting" classes are applied
   */
  onExit?: () => void
  /**
   * Callback fired after the "exiting" classes are applied
   */
  onExiting?: () => void
  /**
   * Callback fired after the "exited" classes are applied
   */
  onExited?: () => void

  children?: React.ReactNode

  className?: string
}

type PropKeys = keyof BaseTransitionOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type BaseTransitionProps = BaseTransitionOwnProps & WithStyleProps

const propTypes: PropValidators<PropKeys> = {
  in: PropTypes.bool,
  unmountOnExit: PropTypes.bool,
  transitionOnMount: PropTypes.bool,
  transitionEnter: PropTypes.bool,
  transitionExit: PropTypes.bool,
  enterDelay: PropTypes.number,
  exitDelay: PropTypes.number,
  transitionClassName: PropTypes.string,
  exitedClassName: PropTypes.string,
  exitingClassName: PropTypes.string,
  enteredClassName: PropTypes.string,
  enteringClassName: PropTypes.string,
  onTransition: PropTypes.func,
  onEnter: PropTypes.func,
  onEntering: PropTypes.func,
  onEntered: PropTypes.func,
  onExit: PropTypes.func,
  onExiting: PropTypes.func,
  onExited: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string
}

const allowedProps: AllowedPropKeys = [
  'in',
  'unmountOnExit',
  'transitionOnMount',
  'transitionEnter',
  'transitionExit',
  'enterDelay',
  'exitDelay',
  'transitionClassName',
  'exitedClassName',
  'exitingClassName',
  'enteredClassName',
  'enteringClassName',
  'onTransition',
  'onEnter',
  'onEntering',
  'onEntered',
  'onExit',
  'onExiting',
  'onExited',
  'children',
  'className'
]

export type { BaseTransitionProps }
export { propTypes, allowedProps }
