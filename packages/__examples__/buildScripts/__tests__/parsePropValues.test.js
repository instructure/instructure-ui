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

import { expect } from '@instructure/ui-test-utils'
import parsePropValues from '../parsePropValues'

const src = `import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class TestComponent extends Component {
  static propTypes = {
    variant: PropTypes.oneOf(['circle', 'rectangle']),
    show: PropTypes.bool,
    message: PropTypes.object,
    children: PropTypes.node
  }

  static defaultProps = {
    variant: 'circle',
    show: true,
    message: null
  }

  render () {
    return (
      <span>{this.props.children}</span>
    )
  }
}
`

// Deactivated this test for now. The test fails, because parsePropValues
// uses react-docgen, and the "^6.0.0-alpha.0" seems to break the test
// with the error "TypeError: importer is not a function".
// We need this alpha version for react-docgen to parse types outside of
// the current file.
// This test also seems a bit unnecessary, since it is mainly
// testing react-docgen itself.
// TODO: try to turn this test back when v6 is not in alpha anymore or we switch from react-docgen to something else that can parse TS types better

// describe('parsePropValues', () => {
//   it('should parse a component correctly', () => {
//     expect(parsePropValues(src, 'testFilename')).to.deep.equal({
//       variant: ['circle', 'rectangle'],
//       show: [false, true]
//     })
//   })
// })
