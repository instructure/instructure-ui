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

import findDOMNode from '@instructure/ui-utils/lib/dom/findDOMNode'
import deepEqual from '@instructure/ui-utils/lib/deepEqual'
import getDisplayName from '@instructure/ui-utils/lib/react/getDisplayName'
import warning from '@instructure/ui-utils/lib/warning'

import addElementQueryMatchListener from '../../utils/addElementQueryMatchListener'
import addMediaQueryMatchListener from '../../utils/addMediaQueryMatchListener'
import LayoutPropTypes from '../../utils/LayoutPropTypes'

/**
---
category: components/layout
---
**/
class Responsive extends Component {
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
    query: PropTypes.objectOf(LayoutPropTypes.validQuery).isRequired,
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
    match: 'element',
    props: null
  }

  _matchListener = null

  state = {
    matches: []
  }

  componentWillMount () {
    warning(
      (this.props.render || this.props.children),
      `[${getDisplayName(Responsive)}] must have either a \`render\` prop or \`children\` prop.`
    )
  }

  componentDidMount () {
    this._matchListener = this.addMatchListener(this.props.query, this.updateMatches)
  }

  componentWillUnmount () {
    this.removeMatchListener()
  }

  componentWillReceiveProps (nextProps) {
    const {
      match,
      query
    } = this.props

    if (match !== nextProps.match || !deepEqual(query, nextProps.query)) {
      this.removeMatchListener()
      this._matchListener = this.addMatchListener(nextProps.query, this.updateMatches, nextProps.match)
    }
  }

  addMatchListener (query, updateMatches, match = this.props.match) {
    const matchListener = match === 'element'
      ? addElementQueryMatchListener
      : addMediaQueryMatchListener

    return matchListener(query, findDOMNode(this), updateMatches)
  }

  removeMatchListener () {
    if (this._matchListener) {
      this._matchListener.remove()
    }
  }

  updateMatches = (matches, cb) => {
    this.setState({ matches }, () => {
      if (typeof cb === 'function') {
        cb()
      }
    })
  }

  mergeProps (matches, props) {
    if (!props) {
      return null
    }

    let mergedProps = {}

    matches.forEach((match) => {
      const matchProps = props[match]
      // Iterate over the props for the current match. If that the prop is
      // already in `mergedProps` that means that the prop was defined for
      // multiple breakpoints, and more than one of those breakpoints is being
      // currently applied so we throw a warning.
      Object.keys(matchProps).forEach((prop) => {
        warning(
          !(prop in mergedProps),
          `[${getDisplayName(Responsive)}] The prop \`${prop}\` is defined at 2 or more breakpoints ` +
          `which are currently applied at the same time. Its current value, \`${mergedProps[prop]}\`, ` +
          `will be overwritten as \`${matchProps[prop]}\`.`
        )
      })

      mergedProps = Object.assign(mergedProps, matchProps)
    })

    return mergedProps
  }

  render () {
    const { matches } = this.state

    const {
      props,
      render,
      children
    } = this.props

    // Render via the children or render method, whichever is supplied. If
    // both are supplied, give preference to children.
    const renderFunc = children || render
    return renderFunc(this.mergeProps(matches, props), matches)
  }
}

export default Responsive
