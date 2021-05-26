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
import PropTypes from 'prop-types'

import { deepEqual } from '@instructure/ui-utils'
import { logError as error } from '@instructure/console'

import {
  addElementQueryMatchListener,
  updateElementMatches
} from '../addElementQueryMatchListener'
import { addMediaQueryMatchListener } from '../addMediaQueryMatchListener'
import { ResponsivePropTypes } from '../ResponsivePropTypes'
import { findDOMNode } from '@instructure/ui-dom-utils'

type Props = {
  query: any // TODO: PropTypes.objectOf(ResponsivePropTypes.validQuery).isRequired,
  match?: 'element' | 'media'
  props?: {
    [key: string]: any
  }
  render?: (...args: any[]) => any
}

/**
---
category: components
---
**/
class Responsive extends Component<Props> {
  static propTypes = {
    /**
     * Specifies if the `<Responsive />` component should use element or media queries
     */
    match: PropTypes.oneOf(['element', 'media']),
    /**
     * Consists of an object where the keys define the names of breakpoints. The values are query objects
     * with keys representing the breakpoint condition and values representing a breakpoint value as a
     * string or number. Ex. `{small: { maxWidth: 400 }, large: { minWidth: '600em'}}`
     */
    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '(props: any, propName: any, comp... Remove this comment to see the full error message
    query: PropTypes.objectOf(ResponsivePropTypes.validQuery).isRequired,
    /**
     * Consists of an object where the keys match the breakpoint names used in the query. The values
     * are objects with keys representing prop names and values representing prop values Ex.
     * `{small: { myProp: 'fillscreen' }, large: { myProp: 'fillcontainer' }}`
     */
    props: PropTypes.objectOf(PropTypes.object),
    /**
     * Function called on render with the following form `(props, matches) => {...}` where the props
     * are the current props to be applied and matches is an array of current matches from the query
     * prop. Either this or a `children` prop function must be supplied.
     */
    render: PropTypes.func,
    /**
     * Function that takes the same form and arguments as the render prop. Either this or a `render`
     * prop function must be supplied.
     */
    children: PropTypes.func
  }

  static defaultProps = {
    children: null,
    render: undefined,
    match: 'element',
    props: null
  }

  _matchListener = null

  state = {
    matches: [],
    hasRendered: false
  }

  componentDidMount() {
    // @ts-expect-error ts-migrate(2555) FIXME: Expected at least 5 arguments, but got 2.
    error(
      this.props.render || this.props.children,
      `[Responsive] must have either a \`render\` prop or \`children\` prop.`
    )

    if (this.props.match === 'element') {
      // Because Responsive renders an empty div initially, it always needs to
      // re-render with the children provided. If there are no matches the match
      // listener won't trigger an update, so we handle this update explicitly.
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 4 arguments, but got 2.
      const initialMatches = updateElementMatches(this.props.query, this) || []
      this.setState({
        matches: initialMatches,
        hasRendered: true
      })
    } else {
      this.setState({ hasRendered: true })
    }
    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ remove(): void; }' is not assignable to ty... Remove this comment to see the full error message
    this._matchListener = this.addMatchListener(
      this.props.query,
      this.updateMatches
    )
  }

  componentWillUnmount() {
    this.removeMatchListener()
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'prevProps' implicitly has an 'any' type... Remove this comment to see the full error message
  componentDidUpdate(prevProps) {
    const { match, query } = this.props

    if (match !== prevProps.match || !deepEqual(query, prevProps.query)) {
      this.removeMatchListener()
      // @ts-expect-error ts-migrate(2322) FIXME: Type '{ remove(): void; }' is not assignable to ty... Remove this comment to see the full error message
      this._matchListener = this.addMatchListener(
        query,
        this.updateMatches,
        match
      )
    }
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'query' implicitly has an 'any' type.
  addMatchListener(query, updateMatches, match = this.props.match) {
    const matchListener =
      match === 'element'
        ? addElementQueryMatchListener
        : addMediaQueryMatchListener
    // TODO: refactor to use a ref to root div instead of `this`
    return matchListener(query, () => findDOMNode(this as any), updateMatches)
  }

  removeMatchListener() {
    if (this._matchListener) {
      // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
      this._matchListener.remove()
    }
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'matches' implicitly has an 'any' type.
  updateMatches = (matches, cb) => {
    this.setState({ matches }, () => {
      if (typeof cb === 'function') {
        cb()
      }
    })
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'matches' implicitly has an 'any' type.
  mergeProps(matches, props) {
    if (!props) {
      return null
    }

    const mergedProps = {}

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'match' implicitly has an 'any' type.
    matches.forEach((match) => {
      const matchProps = props[match]

      // Iterate over the props for the current match. If that the prop is
      // already in `mergedProps` that means that the prop was defined for
      // multiple breakpoints, and more than one of those breakpoints is being
      // currently applied so we log an error.
      Object.keys(matchProps).forEach((prop) => {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        const currentValue = mergedProps[prop]

        // @ts-expect-error ts-migrate(2555) FIXME: Expected at least 5 arguments, but got 2.
        error(
          !(prop in mergedProps),
          [
            `[Responsive] The prop \`${prop}\` is defined at 2 or more breakpoints`,
            `which are currently applied at the same time. Its current value, \`${currentValue}\`,`,
            `will be overwritten as \`${matchProps[prop]}\`.`
          ].join(' ')
        )
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        mergedProps[prop] = matchProps[prop]
      })
    })

    return mergedProps
  }

  render() {
    const { matches, hasRendered } = this.state
    const { props, render, children } = this.props
    let renderFunc
    // Responsive needs to render once to measure the dom and obtain matches.
    // Calling the render prop on this initial render can cause visual side
    // effects and is slower than rendering an empty div.
    if (hasRendered) {
      // Render via the children or render method, whichever is supplied. If
      // both are supplied, give preference to children.
      renderFunc = children || render
    }
    return (
      <div>
        {/* @ts-expect-error ts-migrate(2349) FIXME: This expression is not callable. */}
        {renderFunc && renderFunc(this.mergeProps(matches, props), matches)}
      </div>
    )
  }
}

export default Responsive
export { Responsive }
