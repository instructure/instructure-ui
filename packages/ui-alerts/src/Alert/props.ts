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

import { ReactNode } from 'react'
import PropTypes from 'prop-types'

import { ThemeablePropTypes } from '@instructure/emotion'

import type {
  Spacing,
  WithStyleProps,
  ComponentStyle
} from '@instructure/emotion'
import type { AlertTheme, PropValidators } from '@instructure/shared-types'

type AlertOwnProps = {
  children?: ReactNode
  variant?: 'info' | 'success' | 'warning' | 'error'
  liveRegion?: (...args: any[]) => any
  liveRegionPoliteness?: 'polite' | 'assertive'
  isLiveRegionAtomic?: boolean
  screenReaderOnly?: boolean
  timeout?: number
  margin?: Spacing
  renderCloseButtonLabel?: ((...args: any[]) => any) | ReactNode
  onDismiss?: (...args: any[]) => any
  transition?: 'none' | 'fade'
  open?: boolean
  hasShadow: boolean
}

type PropKeys = keyof AlertOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type AlertProps = AlertOwnProps & WithStyleProps<AlertTheme, AlertStyle>

type AlertStyle = ComponentStyle<'alert' | 'icon' | 'closeButton' | 'content'>

const propTypes: PropValidators<PropKeys> = {
  /**
   * content to be rendered within Alert
   */
  children: PropTypes.node,
  /**
   * Determines color and icon
   */
  variant: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
  /**
   * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
   * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
   * familiar CSS-like shorthand. For example: `margin="small auto large"`.
   */
  margin: ThemeablePropTypes.spacing,
  /**
   * Function that returns the DIV where screenreader alerts will be placed.
   */
  liveRegion: PropTypes.func,
  /**
   * Choose the politeness level of screenreader alerts.
   */
  liveRegionPoliteness: PropTypes.oneOf(['polite', 'assertive']),
  /**
   * If the screenreader alert should be atomic
   */
  isLiveRegionAtomic: PropTypes.bool,
  /**
   * If the alert should only be visible to screen readers
   */
  screenReaderOnly: PropTypes.bool,
  /**
   * Milliseconds until the Alert is dismissed automatically
   */
  timeout: PropTypes.number,
  /**
   * Close button label. Can be a React component
   */
  renderCloseButtonLabel: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  /**
   * Callback after the alert is closed
   */
  onDismiss: PropTypes.func,
  /**
   * Transition used to make the alert appear and disappear
   */
  transition: PropTypes.oneOf(['none', 'fade']),
  /**
   * if open transitions from truthy to falsey, it's a signal to close and unmount the alert.
   * This is necessary to close the alert from the outside and still run the transition.
   */
  open: PropTypes.bool,
  /**
   * If the alert should have a shadow.
   */
  hasShadow: PropTypes.bool
}

const allowedProps: AllowedPropKeys = [
  'children',
  'variant',
  'margin',
  'liveRegion',
  'liveRegionPoliteness',
  'isLiveRegionAtomic',
  'screenReaderOnly',
  'timeout',
  'renderCloseButtonLabel',
  'onDismiss',
  'transition',
  'open',
  'hasShadow'
]

export type { AlertProps, AlertStyle }
export { propTypes, allowedProps }
