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
import { Component } from 'react'
import PropTypes from 'prop-types'
import { controllable } from '@instructure/ui-prop-types'
import { uid } from '@instructure/uid'
import { createChainedFunction } from '@instructure/ui-utils'

const toggleExpanded = ({ expanded }: { expanded: boolean }) => ({
  expanded: !expanded
})

type GetToggleProps = <P extends Record<string, any>>(
  props?: P & { onClick?: (event: Event) => void }
) => {
  'aria-controls': string
  'aria-expanded': boolean
  onClick: (event: Event) => void
} & P

type RenderProps = {
  expanded: boolean
  /**
   * Props to be spread onto the trigger element
   */
  getToggleProps: GetToggleProps
  /**
   * Props to be spread onto the details element
   */
  getDetailsProps: () => { id: string }
}

type RenderExpandable = (props: RenderProps) => JSX.Element

type ExpandableProps = {
  /**
   * Whether the content is expanded or hidden. Makes the component controlled, so if provided, the `onToggle` handler has to be provided too.
   */
  expanded?: boolean

  /**
   * Whether the content is initially expanded or hidden (uncontrolled)
   */
  defaultExpanded: boolean

  onToggle: (event: Event, expanded: boolean) => void

  /**
   * @param {Object} renderProps
   * @param {Boolean} renderProps.expanded
   * @param {Function} renderProps.getToggleProps - Props to be spread onto the trigger element
   * @param {Function} renderProps.getDetailsProps - Props to be spread onto the details element
   */
  children?: RenderExpandable

  /**
   * Identical to children
   */
  render?: RenderExpandable
}
type ExpandableState = { expanded: boolean }

/**
---
category: components/utilities
---
@tsProps
*/
class Expandable extends Component<ExpandableProps, ExpandableState> {
  static propTypes = {
    expanded: controllable(PropTypes.bool, 'onToggle', 'defaultExpanded'),
    defaultExpanded: PropTypes.bool,
    onToggle: PropTypes.func,
    children: PropTypes.func,
    render: PropTypes.func
  }

  static defaultProps = {
    defaultExpanded: false,
    onToggle: function () {},
    expanded: undefined,
    children: null,
    render: undefined
  }

  _contentId: string

  constructor(props: ExpandableProps) {
    super(props)
    this.state = {
      expanded: this.isControlled(props)
        ? (props.expanded as boolean)
        : props.defaultExpanded
    }
    this._contentId = uid('Expandable__content')
  }

  get expanded() {
    return this.isControlled()
      ? (this.props.expanded as boolean)
      : this.state.expanded
  }

  isControlled(props = this.props) {
    return typeof props.expanded === 'boolean'
  }

  static getDerivedStateFromProps(
    nextProps: ExpandableProps,
    state: ExpandableState
  ) {
    if (
      // if component is controlled, keep internal state up to date
      // with the `expanded` prop value
      typeof nextProps.expanded === 'boolean' &&
      nextProps.expanded !== state.expanded
    ) {
      return {
        expanded: nextProps.expanded
      }
    } else {
      return null
    }
  }

  handleToggle = (event: Event) => {
    if (!this.isControlled()) {
      this.setState(toggleExpanded)
    }
    this.props.onToggle(event, !this.expanded)
  }

  render() {
    const { children, render = children } = this.props

    if (typeof render === 'function') {
      return render({
        expanded: this.expanded,
        getToggleProps: (props = {} as any) => {
          return {
            'aria-controls': this._contentId,
            'aria-expanded': this.expanded,
            onClick: createChainedFunction(
              this.handleToggle,
              props.onClick
            ) as (event: Event) => void,
            ...props
          }
        },
        getDetailsProps: () => {
          return {
            id: this._contentId
          }
        }
      })
    } else {
      return null
    }
  }
}

export default Expandable
export { Expandable }
