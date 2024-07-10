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
import { vi } from 'vitest'
import PropTypes from 'prop-types'

import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

import { experimental } from '../experimental'

type TestComponentProps = {
  bar: string
  qux: string
}
class TestComponent extends Component<TestComponentProps> {
  static propTypes = {
    bar: PropTypes.string,
    qux: PropTypes.string
  }

  static defaultProps = {
    bar: undefined,
    qux: 'Hello'
  }

  render() {
    return (
      <div>
        {this.props.qux} {this.props.bar}
      </div>
    )
  }
}

describe('@experimental', () => {
  describe('experimental props', () => {
    const ExperimentalComponent = experimental(['bar'])(TestComponent)

    it('should warn when using an experimental prop', () => {
      const consoleWarningSpy = vi
        .spyOn(console, 'warn')
        .mockImplementation(() => {})
      render(<ExperimentalComponent bar="Jane" />)

      const expectedWarningMessage =
        'Warning: [TestComponent] The `bar` prop is experimental and its API could change significantly in a future release.'

      expect(consoleWarningSpy).toHaveBeenCalledWith(
        expect.stringContaining(expectedWarningMessage),
        expect.any(String)
      )

      consoleWarningSpy.mockRestore()
    })

    it('should not output a warning using a non-experimental prop', () => {
      const consoleWarningSpy = vi
        .spyOn(console, 'warn')
        .mockImplementation(() => {})
      render(<ExperimentalComponent qux="Jane" />)

      expect(consoleWarningSpy).not.toHaveBeenCalled()

      consoleWarningSpy.mockRestore()
    })

    it('should not output a warning for an experimental prop when dangerously ignored', () => {
      const consoleWarningSpy = vi
        .spyOn(console, 'warn')
        .mockImplementation(() => {})

      render(
        <ExperimentalComponent
          qux="Jane"
          __dangerouslyIgnoreExperimentalWarnings
        />
      )

      expect(consoleWarningSpy).not.toHaveBeenCalled()

      consoleWarningSpy.mockRestore()
    })
  })

  describe('experimental component', () => {
    const ExperimentalComponent = experimental()(TestComponent)

    it('should warn that the entire component is experimental if no props are supplied', () => {
      const consoleWarningSpy = vi
        .spyOn(console, 'warn')
        .mockImplementation(() => {})
      render(<ExperimentalComponent />)

      const expectedWarningMessage =
        'Warning: [TestComponent] is experimental and its API could change significantly in a future release.'

      expect(consoleWarningSpy).toHaveBeenCalledWith(
        expect.stringContaining(expectedWarningMessage),
        expect.any(String)
      )

      consoleWarningSpy.mockRestore()
    })

    it('should not output a warning for a component when dangerously ignored', () => {
      const consoleWarningSpy = vi
        .spyOn(console, 'warn')
        .mockImplementation(() => {})
      render(<ExperimentalComponent __dangerouslyIgnoreExperimentalWarnings />)

      expect(consoleWarningSpy).not.toHaveBeenCalled()

      consoleWarningSpy.mockRestore()
    })
  })
})
