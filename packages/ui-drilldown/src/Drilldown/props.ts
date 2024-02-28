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

import { Children, controllable } from '@instructure/ui-prop-types'
import { PositionPropTypes } from '@instructure/ui-position'

import { Popover } from '@instructure/ui-popover'

import type { WithStyleProps, ComponentStyle } from '@instructure/emotion'

import type { WithDeterministicIdProps } from '@instructure/ui-react-utils'
import type {
  PlacementPropValues,
  PositionConstraint,
  PositionMountNode
} from '@instructure/ui-position'
import type {
  DrilldownTheme,
  OtherHTMLAttributes,
  PropValidators,
  AsElementType
} from '@instructure/shared-types'

import { DrilldownPage } from './DrilldownPage'
import type { DrilldownPageProps } from './DrilldownPage/props'
import { DrilldownGroup } from './DrilldownGroup'
import type { DrilldownGroupProps } from './DrilldownGroup/props'
import { DrilldownOption } from './DrilldownOption'
import type {
  DrilldownOptionProps,
  DrilldownOptionValue
} from './DrilldownOption/props'
import { DrilldownSeparator } from './DrilldownSeparator'
import type { DrilldownSeparatorProps } from './DrilldownSeparator/props'

import { Drilldown } from './index'

type PageChild = React.ComponentElement<DrilldownPageProps, DrilldownPage>
type GroupChild = React.ComponentElement<DrilldownGroupProps, DrilldownGroup>
type OptionChild = React.ComponentElement<DrilldownOptionProps, DrilldownOption>
type SeparatorChild = React.ComponentElement<
  DrilldownSeparatorProps,
  DrilldownSeparator
>

type DrilldownOwnProps = {
  /**
   * The id of the root page
   */
  rootPageId: string

  /**
   * Children of type `<Drilldown.Page />`
   */
  children?: PageChild | PageChild[] // TODO: type Children.oneOf([DrilldownPage])

  /**
   * The id of the `<Drilldown />`
   */
  id?: string

  /**
   * Description of the `<Drilldown />` (used as `aria-label` attribute)
   */
  label?: string

  /**
   * Is the `<Drilldown />` disabled
   */
  disabled?: boolean

  /**
   * Whether the focus should rotate with keyboard navigation
   * when reaching the first or last option
   */
  rotateFocus?: boolean

  /**
   * Element type to render as.
   */
  as?: AsElementType

  /**
   * The ARIA role of the element
   */
  role?: string

  /**
   * A function that returns a reference to root HTML element
   */
  elementRef?: (el: Element | null) => void

  /**
   * A function that returns a reference to the `<Drilldown />`
   */
  drilldownRef?: (el: HTMLDivElement | null) => void

  // View props
  overflowX?: 'auto' | 'hidden' | 'visible'
  overflowY?: 'auto' | 'hidden' | 'visible'
  height?: string | number
  width?: string | number
  minHeight?: string | number
  minWidth?: string | number
  maxHeight?: string | number
  maxWidth?: string | number

  // Popover version props
  /**
   * The trigger element, if the `<Drilldown />` is to render as a popover
   */
  trigger?: React.ReactNode

  /**
   * If a trigger is supplied, where should the `<Drilldown />` be placed (relative to the trigger)
   */
  placement?: PlacementPropValues

  /**
   * Should the `<Drilldown />` be open for the initial render
   */
  defaultShow?: boolean

  /**
   * Is the `<Drilldown />` open (should be accompanied by `onToggle` and `trigger`)
   */
  show?: boolean // TODO: type controllable(PropTypes.bool, 'onToggle', 'defaultShow')

  /**
   * Callback fired when the `<Drilldown />` is toggled open/closed.
   * When used with `show`, the component will not control its own state.
   */
  onToggle?: (
    event: React.UIEvent | React.FocusEvent,
    args: {
      shown: boolean
      drilldown: Drilldown
      pageHistory: string[]
      goToPage: (
        pageId: string
      ) => { prevPageId: string; newPageId: string } | undefined
      goToPreviousPage: () =>
        | { prevPageId: string; newPageId: string }
        | undefined
    }
  ) => void

  /**
   * Callback fired when an item within the `<Drilldown />` is selected
   */
  onSelect?: (
    event: React.SyntheticEvent,
    args: {
      value: DrilldownOptionValue | DrilldownOptionValue[]
      isSelected: boolean
      selectedOption: OptionChild
      drilldown: Drilldown
    }
  ) => void

  /**
   * If a trigger is supplied, callback fired when the `<Drilldown />` is closed
   */
  onDismiss?: (
    event: React.UIEvent | React.FocusEvent,
    documentClick: boolean
  ) => void

  /**
   * If a trigger is supplied, callback fired when the `<Drilldown />` trigger is focused
   */
  onFocus?: (event: React.FocusEvent) => void

  /**
   * If a trigger is supplied, callback fired onMouseOver for the `<Drilldown />` trigger
   */
  onMouseOver?: (event: React.MouseEvent) => void

  /**
   * If a trigger is supplied, A function that returns a reference to the `<Popover />`
   */
  popoverRef?: (el: Popover | null) => void

  /**
   * If a trigger is supplied, an element or a function returning an element
   * to use as the mount node for the `<Drilldown />` (defaults to `document.body`)
   */
  mountNode?: PositionMountNode

  /**
   * Target element for positioning the Popover (if it differs from the trigger)
   */
  positionTarget?: PositionMountNode

  /**
   * If a trigger is supplied, this prop can set the CSS `display` property on the `<span>` container element of the underlying Position component
   */
  positionContainerDisplay?: 'inline-block' | 'block'

  /**
   * The parent in which to constrain the placement.
   */
  constrain?: PositionConstraint

  /**
   * If a trigger is supplied, should the `<Drilldown />` hide when an item is selected
   */
  shouldHideOnSelect?: boolean

  /**
   * Whether focus should be contained within the `<Drilldown/>` when it is open.
   * Works only if `trigger` is provided.
   */
  shouldContainFocus?: boolean

  /**
   * Whether focus should be returned to the trigger
   * when the `<Drilldown/>` is closed.
   * Works only if `trigger` is provided.
   */
  shouldReturnFocus?: boolean

  /**
   * Whether or not an arrow pointing to the trigger should be rendered.
   * Works only if `trigger` is provided.
   */
  withArrow?: boolean

  /**
   * The horizontal offset for the positioned content.
   * Works only if `trigger` is provided.
   */
  offsetX?: string | number

  /**
   * The vertical offset for the positioned content.
   * Works only if `trigger` is provided.
   */
  offsetY?: string | number
}

type PropKeys = keyof DrilldownOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type DrilldownProps = DrilldownOwnProps &
  WithStyleProps<DrilldownTheme, DrilldownStyle> &
  WithDeterministicIdProps &
  OtherHTMLAttributes<DrilldownOwnProps>

type DrilldownStyle = ComponentStyle<
  | 'drilldown'
  | 'container'
  | 'headerBack'
  | 'headerTitle'
  | 'optionContainer'
  | 'optionLabelInfo'
  | 'optionContent'
> & { headerActionColor: string }

type DrilldownStyleProps = {
  hasHighlightedOption: boolean
}

type SelectedGroupOptionsMap = {
  [groupId: string]: Map<string, DrilldownOptionValue>
}

type DrilldownState = {
  isShowingPopover: boolean
  activePageId: string
  highlightedOptionId?: string
  // needed for rerender
  lastSelectedId?: string
  selectedGroupOptionsMap: SelectedGroupOptionsMap
}

const propTypes: PropValidators<PropKeys> = {
  rootPageId: PropTypes.string.isRequired,
  children: Children.oneOf([DrilldownPage]),
  id: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  rotateFocus: PropTypes.bool,
  as: PropTypes.elementType,
  role: PropTypes.string,
  elementRef: PropTypes.func,
  drilldownRef: PropTypes.func,
  overflowX: PropTypes.oneOf(['auto', 'hidden', 'visible']),
  overflowY: PropTypes.oneOf(['auto', 'hidden', 'visible']),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  minHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  minWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  trigger: PropTypes.node,
  placement: PositionPropTypes.placement,
  defaultShow: PropTypes.bool,
  show: controllable(PropTypes.bool, 'onToggle', 'defaultShow'),
  onToggle: PropTypes.func,
  onSelect: PropTypes.func,
  onDismiss: PropTypes.func,
  onFocus: PropTypes.func,
  onMouseOver: PropTypes.func,
  popoverRef: PropTypes.func,
  mountNode: PositionPropTypes.mountNode,
  positionTarget: PositionPropTypes.mountNode,
  positionContainerDisplay: PropTypes.oneOf(['inline-block', 'block']),
  constrain: PositionPropTypes.constrain,
  shouldHideOnSelect: PropTypes.bool,
  shouldContainFocus: PropTypes.bool,
  shouldReturnFocus: PropTypes.bool,
  withArrow: PropTypes.bool,
  offsetX: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  offsetY: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

const allowedProps: AllowedPropKeys = [
  'rootPageId',
  'children',
  'id',
  'label',
  'disabled',
  'rotateFocus',
  'as',
  'role',
  'overflowX',
  'overflowY',
  'height',
  'width',
  'minHeight',
  'minWidth',
  'maxHeight',
  'maxWidth',

  // Popover version props
  'trigger',
  'placement',
  'defaultShow',
  'show',
  'onToggle',
  'onSelect',
  'onDismiss',
  'onFocus',
  'onMouseOver',
  'elementRef',
  'drilldownRef',
  'popoverRef',
  'mountNode',
  'positionTarget',
  'positionContainerDisplay',
  'constrain',
  'shouldHideOnSelect',
  'shouldContainFocus',
  'shouldReturnFocus',
  'withArrow',
  'offsetX',
  'offsetY'
]

export type {
  DrilldownProps,
  DrilldownState,
  DrilldownStyle,
  DrilldownStyleProps,
  DrilldownPageProps,
  PageChild,
  GroupChild,
  OptionChild,
  SeparatorChild,
  SelectedGroupOptionsMap
}
export { propTypes, allowedProps }
