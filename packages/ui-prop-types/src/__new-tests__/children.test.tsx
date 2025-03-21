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

import { ReactNode } from 'react'
import '@testing-library/jest-dom'
import { Children } from '../Children'

const Foo = () => <div>foo</div>
const Bar = () => <div>bar</div>
const Baz = () => <div>baz</div>
const Qux = () => <div>qux</div>

const { oneOf, oneOfEach, enforceOrder } = Children

describe('children', () => {
  describe('oneOf', () => {
    it('should accept props of the correct type', () => {
      const validProps = [Foo, Bar]

      const props: { children: ReactNode } = {
        children: <Foo />
      }

      expect(oneOf(validProps)(props, 'children', 'TestComponent')).toBeNull()

      props.children = <Bar />
      expect(oneOf(validProps)(props, 'children', 'TestComponent')).toBeNull()

      props.children = [
        <Bar key="bar1" />,
        <Foo key="foo" />,
        <Bar key="bar2" />
      ]
      expect(oneOf(validProps)(props, 'children', 'TestComponent')).toBeNull()
    })

    it('should reject props of the incorrect type', () => {
      const validProps = [Foo, Bar]

      const props: { children: ReactNode } = {
        children: <Baz />
      }

      expect(
        oneOf(validProps)(props, 'children', 'TestComponent')
      ).toBeInstanceOf(Error)

      props.children = <div>hello</div>
      expect(
        oneOf(validProps)(props, 'children', 'TestComponent')
      ).toBeInstanceOf(Error)

      props.children = 'hello world'
      expect(
        oneOf(validProps)(props, 'children', 'TestComponent')
      ).toBeInstanceOf(Error)

      props.children = [
        <Bar key="bar1" />,
        <Foo key="foo" />,
        <Bar key="bar2" />,
        <Baz key="baz" />
      ]
      expect(
        oneOf(validProps)(props, 'children', 'TestComponent')
      ).toBeInstanceOf(Error)

      props.children = [
        <Bar key="bar1" />,
        <div key="div">hi</div>,
        <Foo key="foo" />,
        <Bar key="bar2" />
      ]
      expect(
        oneOf(validProps)(props, 'children', 'TestComponent')
      ).toBeInstanceOf(Error)
    })

    it('can be required', () => {
      const validProps = [Foo, Bar]

      const props: { children: ReactNode } = {
        children: <Bar />
      }
      // Still validates correctly
      expect(
        oneOf(validProps).isRequired(props, 'children', 'TestComponent')
      ).toBeNull()

      props.children = <Baz />
      expect(
        oneOf(validProps).isRequired(props, 'children', 'TestComponent')
      ).toBeInstanceOf(Error)

      // Accepts a null child when not required
      props.children = null
      expect(oneOf(validProps)(props, 'children', 'TestComponent')).toBeNull()

      // Requires the prop to be supplied when required
      expect(
        oneOf(validProps).isRequired(props, 'children', 'TestComponent')
      ).toBeInstanceOf(Error)
    })
  })

  describe('oneOfEach', () => {
    it('should accept when exactly one of each prop type is present', () => {
      const validProps = [Foo, Bar, Baz]

      const props: { children: ReactNode } = {
        children: [<Foo key="foo" />, <Bar key="bar" />, <Baz key="baz" />]
      }

      expect(
        oneOfEach(validProps)(props, 'children', 'TestComponent')
      ).toBeNull()

      props.children = [<Baz key="baz" />, <Foo key="foo" />, <Bar key="bar" />]
      expect(
        oneOfEach(validProps)(props, 'children', 'TestComponent')
      ).toBeNull()

      props.children = [<Baz key="baz" />, <Bar key="bar" />, <Foo key="foo" />]
      expect(
        oneOfEach(validProps)(props, 'children', 'TestComponent')
      ).toBeNull()
    })

    it('should reject when exactly one of each prop type is not present', () => {
      const validProps = [Foo, Bar, Baz]

      const props: { children: ReactNode } = {
        children: <Foo />
      }

      expect(
        oneOfEach(validProps)(props, 'children', 'TestComponent')
      ).toBeInstanceOf(Error)

      props.children = [
        <Foo key="foo" />,
        <Bar key="bar" />,
        <Baz key="baz" />,
        <Qux key="qux" />
      ]
      expect(
        oneOfEach(validProps)(props, 'children', 'TestComponent')
      ).toBeInstanceOf(Error)

      props.children = [<Foo key="foo" />, 'Hello world', <Baz key="baz" />]
      expect(
        oneOfEach(validProps)(props, 'children', 'TestComponent')
      ).toBeInstanceOf(Error)
    })
  })

  describe('enforceOrder', () => {
    it('should accept props that match the designated ordering', () => {
      const validTypeGroups = [
        [Foo, Bar, Baz],
        [Bar, Qux]
      ]

      const props: { children: ReactNode } = {
        children: [<Foo key="foo" />]
      }

      expect(
        enforceOrder(...validTypeGroups)(props, 'children', 'TestComponent')
      ).toBeNull()

      props.children = [<Foo key="foo" />, <Bar key="bar" />]
      expect(
        enforceOrder(...validTypeGroups)(props, 'children', 'TestComponent')
      ).toBeNull()

      props.children = [<Foo key="foo" />, <Bar key="bar" />, <Baz key="baz" />]
      expect(
        enforceOrder(...validTypeGroups)(props, 'children', 'TestComponent')
      ).toBeNull()

      props.children = [<Bar key="bar" />]
      expect(
        enforceOrder(...validTypeGroups)(props, 'children', 'TestComponent')
      ).toBeNull()

      props.children = [<Bar key="bar" />, <Qux key="bar" />]
      expect(
        enforceOrder(...validTypeGroups)(props, 'children', 'TestComponent')
      ).toBeNull()
    })

    it('should reject props that do not match the designated ordering', () => {
      const validTypeGroups = [
        [Foo, Bar, Baz],
        [Bar, Qux]
      ]

      const props: { children: ReactNode } = {
        children: <Baz />
      }

      expect(
        enforceOrder(...validTypeGroups)(props, 'children', 'TestComponent')
      ).toBeInstanceOf(Error)

      props.children = <Qux />
      expect(
        enforceOrder(...validTypeGroups)(props, 'children', 'TestComponent')
      ).toBeInstanceOf(Error)

      props.children = [<Foo key="foo" />, <Baz key="baz" />, <Bar key="bar" />]
      expect(
        enforceOrder(...validTypeGroups)(props, 'children', 'TestComponent')
      ).toBeInstanceOf(Error)

      props.children = [<Bar key="bar" />, <Qux key="qux" />, <Baz key="baz" />]
      expect(
        enforceOrder(...validTypeGroups)(props, 'children', 'TestComponent')
      ).toBeInstanceOf(Error)

      props.children = [<Bar key="bar" />, <div key="qux">qux</div>]
      expect(
        enforceOrder(...validTypeGroups)(props, 'children', 'TestComponent')
      ).toBeInstanceOf(Error)
    })

    it('can be required', () => {
      const validTypeGroups = [
        [Foo, Bar, Baz],
        [Bar, Qux]
      ]

      const props: { children: ReactNode } = {
        children: <Foo />
      }

      expect(
        enforceOrder(...validTypeGroups).isRequired(
          props,
          'children',
          'TestComponent'
        )
      ).toBeNull()

      props.children = <Qux />
      expect(
        enforceOrder(...validTypeGroups).isRequired(
          props,
          'children',
          'TestComponent'
        )
      ).toBeInstanceOf(Error)

      // Accepts a null child when not required
      props.children = null
      expect(
        enforceOrder(...validTypeGroups)(props, 'children', 'TestComponent')
      ).toBeNull()
      // Requires the prop to be supplied when required
      expect(
        enforceOrder(...validTypeGroups).isRequired(
          props,
          'children',
          'TestComponent'
        )
      ).toBeInstanceOf(Error)
    })
  })
})
