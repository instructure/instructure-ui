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
import { createChainedFunction } from '@instructure/ui-utils'

import { propTypes, allowedProps } from './props'
import type { ExpandableProps, ExpandableState } from './props'

import { withDeterministicId } from '@instructure/ui-react-utils'

const toggleExpanded = ({ expanded }: { expanded: boolean }) => ({
  expanded: !expanded
})

/**
 ---
 category: components/utilities
 ---
 * @tsProps
 **/
@withDeterministicId()
class Expandable extends Component<ExpandableProps, ExpandableState> {
  static propTypes = propTypes
  static allowedProps = allowedProps
  static defaultProps = {
    defaultExpanded: false,
    onToggle: function () {},
    children: null
  }

  _contentId: string

  constructor(props: ExpandableProps) {
    super(props)
    this.state = {
      expanded: this.isControlled(props)
        ? (props.expanded as boolean)
        : props.defaultExpanded
    }
    this._contentId = props.deterministicId!
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
    nextProps: Readonly<ExpandableProps>,
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

  handleToggle = (event: React.MouseEvent) => {
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
            ) as React.MouseEventHandler,
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
