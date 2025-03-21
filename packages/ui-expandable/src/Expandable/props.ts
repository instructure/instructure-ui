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

import { JSX } from 'react'
import PropTypes from 'prop-types'

import { controllable } from '@instructure/ui-prop-types'

import type { PropValidators } from '@instructure/shared-types'
import type { WithDeterministicIdProps } from '@instructure/ui-react-utils'

type ExpandableToggleProps = (props?: {
  onClick?: React.MouseEventHandler
  [key: string]: unknown
}) => {
  'aria-controls': string
  'aria-expanded': boolean
  onClick: (event: React.MouseEvent) => void
  [key: string]: unknown
}

type RenderProps = {
  expanded: boolean
  /**
   * Props to be spread onto the trigger element
   */
  getToggleProps: ExpandableToggleProps

  /**
   * Props to be spread onto the details element
   */
  getDetailsProps: () => { id: string }
}

type RenderExpandable = (props: RenderProps) => JSX.Element

type ExpandableOwnProps = {
  /**
   * Whether the content is expanded or hidden. Makes the component controlled, so if provided, the `onToggle` handler has to be provided too.
   */
  expanded?: boolean

  /**
   * Whether the content is initially expanded or hidden (uncontrolled)
   */
  defaultExpanded: boolean

  /**
   * Function invoked when this component is expanded/collapsed
   */
  onToggle?: (event: React.MouseEvent, expanded: boolean) => void

  /**
   * Must be a function that returns a JSX element. It receives and object which
   * contains whether its expanded and objects that need to be spread on the
   * trigger and details elements.
   */
  children?: RenderExpandable

  /**
   * Must be a function that returns a JSX element. It receives and object which
   * contains whether its expanded and objects that need to be spread on the
   * trigger and details elements.
   * Identical to children
   */
  render?: RenderExpandable
}

type ExpandableState = { expanded: boolean }

type PropKeys = keyof ExpandableOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type ExpandableProps = ExpandableOwnProps & WithDeterministicIdProps

const propTypes: PropValidators<PropKeys> = {
  expanded: controllable(PropTypes.bool, 'onToggle', 'defaultExpanded'),
  defaultExpanded: PropTypes.bool,
  onToggle: PropTypes.func,
  children: PropTypes.func,
  render: PropTypes.func
}

const allowedProps: AllowedPropKeys = [
  'expanded',
  'defaultExpanded',
  'onToggle',
  'children',
  'render'
]

export type {
  ExpandableProps,
  ExpandableState,
  RenderExpandable,
  ExpandableToggleProps
}
export { propTypes, allowedProps }
