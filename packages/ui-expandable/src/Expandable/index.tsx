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
const toggleExpanded = ({ expanded }: any) => ({ expanded: !expanded })
type OwnExpandableProps = {
  expanded?: any // TODO: controllable(PropTypes.bool, 'onToggle', 'defaultExpanded')
  defaultExpanded?: boolean
  onToggle?: (...args: any[]) => any
  render?: (...args: any[]) => any
}
type ExpandableState = any
type ExpandableProps = OwnExpandableProps & typeof Expandable.defaultProps
/**
---
category: components/utilities
---
*/
class Expandable extends Component<ExpandableProps, ExpandableState> {
  static propTypes = {
    /**
     * Whether the content is expanded or hidden
     */
    expanded: controllable(PropTypes.bool, 'onToggle', 'defaultExpanded'),
    /**
     * Whether the content is initially expanded or hidden (uncontrolled)
     */
    defaultExpanded: PropTypes.bool,
    onToggle: PropTypes.func,
    /**
     * @param {Object} renderProps
     * @param {Boolean} expanded
     * @param {Function} renderProps.getToggleProps - Props to be spread onto the trigger element
     * @param {Function} renderProps.getDetailsProps - Props to be spread onto the details element
     */
    children: PropTypes.func,
    /**
     * Identical to children
     */
    render: PropTypes.func
  }
  static defaultProps = {
    defaultExpanded: false,
    // @ts-expect-error ts-migrate(6133) FIXME: 'event' is declared but its value is never read.
    onToggle: function (event: any, expanded: any) {},
    expanded: undefined,
    children: null,
    render: undefined
  }
  _contentId: any
  constructor(props: ExpandableProps) {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1-2 arguments, but got 0.
    super()
    this.state = {
      expanded: this.isControlled(props)
        ? props.expanded
        : !!props.defaultExpanded
    }
    this._contentId = uid('Expandable__content')
  }
  get expanded() {
    return this.isControlled() ? this.props.expanded : this.state.expanded
  }
  isControlled(props = this.props) {
    return typeof props.expanded === 'boolean'
  }
  static getDerivedStateFromProps(nextProps: any, state: any) {
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
  handleToggle = (event: any) => {
    if (!this.isControlled()) {
      this.setState(toggleExpanded)
    }
    this.props.onToggle(event, !this.expanded)
  }
  render() {
    const { children, render = children } = this.props
    if (typeof render === 'function') {
      // @ts-expect-error ts-migrate(2721) FIXME: Cannot invoke an object which is possibly 'null'.
      return render({
        expanded: this.expanded,
        getToggleProps: (props = {}) => {
          return {
            'aria-controls': this._contentId,
            'aria-expanded': this.expanded,
            onClick: createChainedFunction(
              this.handleToggle,
              (props as any).onClick
            ),
            ...props
          }
        },
        // @ts-expect-error ts-migrate(6133) FIXME: 'props' is declared but its value is never read.
        getDetailsProps: (props: any) => {
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
