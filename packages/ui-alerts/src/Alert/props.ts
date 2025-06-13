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

import type {
  Spacing,
  WithStyleProps,
  ComponentStyle
} from '@instructure/emotion'
import type {
  AlertTheme,
  PropValidators,
  Renderable
} from '@instructure/shared-types'
import type { WithDeterministicIdProps } from '@instructure/ui-react-utils'

type AlertOwnProps = {
  /**
   * content to be rendered within Alert
   */
  children?: ReactNode
  /**
   * Determines color and icon
   */
  variant?: 'info' | 'success' | 'warning' | 'error'
  /**
   * How the screen reader should announce the alert variant. While the `variant` prop sets the color and icon for the alert component, this label should be a textual representation of that information. So e.g. if the variant is `info`, this label could be "Information," or "Information alert,". Note the `,` at the end of the label which helps the screenreader to be more natural sounding.
   */
  variantScreenReaderLabel?: string
  /**
   * Function that returns the DIV where screenreader alerts will be placed.
   */
  liveRegion?: () => Element
  /**
   * Choose the politeness level of screenreader alerts, sets the value of
   * `aria-live`.
   *
   * When regions are specified as `polite`, assistive technologies will notify
   * users of updates but generally do not interrupt the current task,
   * and updates take low priority.
   *
   * When regions are specified as `assertive`, assistive technologies will
   * immediately notify the user, and could potentially clear the speech queue
   * of previous updates.
   */
  liveRegionPoliteness?: 'polite' | 'assertive'
  /**
   * Value for the `aria-atomic` attribute.
   * `aria-atomic` controls how much is read when a change happens. Should only
   * the specific thing that changed be read or should the entire element be
   * read.
   */
  isLiveRegionAtomic?: boolean
  /**
   * If the alert should only be visible to screen readers
   */
  screenReaderOnly?: boolean
  /**
   * Milliseconds until the Alert is dismissed automatically
   */
  timeout?: number
  /**
   * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
   * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
   * familiar CSS-like shorthand. For example: `margin="small auto large"`.
   */
  margin?: Spacing
  /**
   * Close button label. Can be a React component
   */
  renderCloseButtonLabel?: Renderable
  /**
   * Callback after the alert is closed
   */
  onDismiss?: () => void
  /**
   * Transition used to make the alert appear and disappear
   */
  transition?: 'none' | 'fade'
  /**
   * if open transitions from truthy to falsey, it's a signal to close and unmount the alert.
   * This is necessary to close the alert from the outside and still run the transition.
   */
  open?: boolean
  /**
   * If the alert should have a shadow.
   */
  hasShadow: boolean

  /**
   * An icon, or function that returns an icon. Setting it will override the variant's icon.
   */
  renderCustomIcon?: Renderable
}

type PropKeys = keyof AlertOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type AlertProps = AlertOwnProps &
  WithStyleProps<AlertTheme, AlertStyle> &
  WithDeterministicIdProps

type AlertStyle = ComponentStyle<
  'alert' | 'icon' | 'closeButton' | 'content' | 'variantScreenReaderLabel'
>

const propTypes: PropValidators<PropKeys> = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
  margin: PropTypes.string,
  liveRegion: PropTypes.func,
  liveRegionPoliteness: PropTypes.oneOf(['polite', 'assertive']),
  isLiveRegionAtomic: PropTypes.bool,
  screenReaderOnly: PropTypes.bool,
  timeout: PropTypes.number,
  renderCloseButtonLabel: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  onDismiss: PropTypes.func,
  transition: PropTypes.oneOf(['none', 'fade']),
  open: PropTypes.bool,
  hasShadow: PropTypes.bool,
  variantScreenReaderLabel: PropTypes.string,
  renderCustomIcon: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
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
  'hasShadow',
  'renderCustomIcon'
]

type AlertState = {
  open: boolean
}

export type { AlertProps, AlertStyle, AlertState }
export { propTypes, allowedProps }
