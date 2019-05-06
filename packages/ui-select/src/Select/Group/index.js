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

import { Children as ChildrenPropTypes } from '@instructure/ui-prop-types'

/**
---
parent: Select
id: Select.Group
---
@module Group
**/
class Group extends Component {
  static propTypes = {
    /**
    * The label associated with the group options.
    */
    renderLabel: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
    /**
    * Children of type `<Select.Option />` that will be considered part of the group.
    */
    children: ChildrenPropTypes.oneOf([Option]),
  }

  static defaultProps = {
    children: null
  }

  render () {
    // this component is only used for prop validation. Select.Group children
    // are parsed in Select and rendered as Options components
    return null
  }
}

export default Group
export { Group }
