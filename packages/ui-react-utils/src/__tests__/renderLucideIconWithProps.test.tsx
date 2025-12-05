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

import React from 'react'
import { render } from '@testing-library/react'
import { expect, describe, it, vi } from 'vitest'
import '@testing-library/jest-dom'
import { renderLucideIconWithProps } from '../renderLucideIconWithProps'

describe('renderLucideIconWithProps', () => {
  describe('with undefined/null', () => {
    it('should return null for undefined', () => {
      const result = renderLucideIconWithProps(undefined, { foo: 'bar' })
      expect(result).toBeNull()
    })

    it('should return null for null', () => {
      const result = renderLucideIconWithProps(null as any, { foo: 'bar' })
      expect(result).toBeNull()
    })
  })

  describe('with component reference', () => {
    it('should render component with props', () => {
      const TestComponent = ({ size, color }: any) => (
        <div data-testid="test" data-size={size} data-color={color}>
          Test
        </div>
      )
      TestComponent.displayName = 'wrapLucideIcon(TestComponent)'

      const result = renderLucideIconWithProps(TestComponent, {
        size: 'large',
        color: 'blue'
      })

      const { getByTestId } = render(<>{result}</>)
      const element = getByTestId('test')

      expect(element).toHaveAttribute('data-size', 'large')
      expect(element).toHaveAttribute('data-color', 'blue')
    })

    it('should call component with props', () => {
      const mockComponent = vi.fn((props: any) => (
        <div data-testid="mock">{props.text}</div>
      ))
      ;(mockComponent as any).displayName = 'wrapLucideIcon(MockComponent)'

      renderLucideIconWithProps(mockComponent, { text: 'hello' })

      expect(mockComponent).toHaveBeenCalledWith(
        expect.objectContaining({ text: 'hello' })
      )
    })
  })

  describe('with JSX element', () => {
    it('should clone JSX element with props', () => {
      const TestComponent = ({ size, color }: any) => (
        <div data-testid="test" data-size={size} data-color={color}>
          Test
        </div>
      )
      TestComponent.displayName = 'wrapLucideIcon(TestComponent)'

      const result = renderLucideIconWithProps(<TestComponent />, {
        size: 'medium',
        color: 'red'
      })

      const { getByTestId } = render(<>{result}</>)
      const element = getByTestId('test')

      expect(element).toHaveAttribute('data-size', 'medium')
      expect(element).toHaveAttribute('data-color', 'red')
    })

    it('should override existing props on JSX element', () => {
      const TestComponent = ({ size }: any) => (
        <div data-testid="test" data-size={size}>
          Test
        </div>
      )
      TestComponent.displayName = 'wrapLucideIcon(TestComponent)'

      const result = renderLucideIconWithProps(<TestComponent size="small" />, {
        size: 'large'
      })

      const { getByTestId } = render(<>{result}</>)
      const element = getByTestId('test')

      expect(element).toHaveAttribute('data-size', 'large')
    })
  })

  describe('with render function that accepts props', () => {
    it('should call function with props and render result', () => {
      const renderFunc = ({ size, color }: any) => (
        <div data-testid="test" data-size={size} data-color={color}>
          Test
        </div>
      )
      renderFunc.displayName = 'wrapLucideIcon(renderFunc)'

      const result = renderLucideIconWithProps(renderFunc, {
        size: 'small',
        color: 'green'
      })

      const { getByTestId } = render(<>{result}</>)
      const element = getByTestId('test')

      expect(element).toHaveAttribute('data-size', 'small')
      expect(element).toHaveAttribute('data-color', 'green')
    })

    it('should merge props if function uses them', () => {
      const renderFunc = (props: any) => (
        <div data-testid="test" {...props}>
          Test
        </div>
      )
      renderFunc.displayName = 'wrapLucideIcon(renderFunc)'

      const result = renderLucideIconWithProps(renderFunc, {
        'data-size': 'medium',
        'data-color': 'yellow'
      } as any)

      const { getByTestId } = render(<>{result}</>)
      const element = getByTestId('test')

      expect(element).toHaveAttribute('data-size', 'medium')
      expect(element).toHaveAttribute('data-color', 'yellow')
    })
  })

  describe('with render function that ignores props', () => {
    it('should apply props to returned JSX even if function ignores them', () => {
      const renderFunc = () => (
        <div data-testid="test" data-size="original">
          Test
        </div>
      )
      renderFunc.displayName = 'wrapLucideIcon(renderFunc)'

      const result = renderLucideIconWithProps(renderFunc, {
        'data-size': 'overridden',
        'data-color': 'purple'
      } as any)

      const { getByTestId } = render(<>{result}</>)
      const element = getByTestId('test')

      // Props should be merged/overridden
      expect(element).toHaveAttribute('data-size', 'overridden')
      expect(element).toHaveAttribute('data-color', 'purple')
    })

    it('should work with arrow function without parameters', () => {
      const TestComponent = ({ size }: any) => (
        <div data-testid="test" data-size={size}>
          Test
        </div>
      )
      TestComponent.displayName = 'wrapLucideIcon(TestComponent)'

      const renderFunc = () => <TestComponent />
      renderFunc.displayName = 'wrapLucideIcon(renderFunc)'

      const result = renderLucideIconWithProps(renderFunc, {
        size: 'x-large'
      })

      const { getByTestId } = render(<>{result}</>)
      const element = getByTestId('test')

      expect(element).toHaveAttribute('data-size', 'x-large')
    })
  })

  describe('with React components', () => {
    it('should work with class components', () => {
      class TestComponent extends React.Component<{ size?: string }> {
        render() {
          return (
            <div data-testid="test" data-size={this.props.size}>
              Test
            </div>
          )
        }
      }
      ;(TestComponent as any).displayName = 'wrapLucideIcon(TestComponent)'

      const result = renderLucideIconWithProps(TestComponent, { size: 'huge' })

      const { getByTestId } = render(<>{result}</>)
      const element = getByTestId('test')

      expect(element).toHaveAttribute('data-size', 'huge')
    })

    it('should work with functional components', () => {
      const TestComponent = ({ size }: any) => (
        <div data-testid="test" data-size={size}>
          Test
        </div>
      )
      TestComponent.displayName = 'wrapLucideIcon(TestComponent)'

      const result = renderLucideIconWithProps(TestComponent, { size: 'tiny' })

      const { getByTestId } = render(<>{result}</>)
      const element = getByTestId('test')

      expect(element).toHaveAttribute('data-size', 'tiny')
    })
  })

  describe('prop precedence', () => {
    it('should have passed props override original JSX props', () => {
      const TestComponent = ({ a, b, c }: any) => (
        <div data-testid="test" data-a={a} data-b={b} data-c={c}>
          Test
        </div>
      )
      TestComponent.displayName = 'wrapLucideIcon(TestComponent)'

      const result = renderLucideIconWithProps(<TestComponent a="1" b="2" />, {
        b: '20',
        c: '30'
      })

      const { getByTestId } = render(<>{result}</>)
      const element = getByTestId('test')

      expect(element).toHaveAttribute('data-a', '1') // Original preserved
      expect(element).toHaveAttribute('data-b', '20') // Overridden
      expect(element).toHaveAttribute('data-c', '30') // Added
    })

    it('should have passed props override function-returned JSX props', () => {
      const renderFunc = () => (
        <div data-testid="test" data-x="original" data-y="original">
          Test
        </div>
      )
      renderFunc.displayName = 'wrapLucideIcon(renderFunc)'

      const result = renderLucideIconWithProps(renderFunc, {
        'data-x': 'new',
        'data-z': 'added'
      } as any)

      const { getByTestId } = render(<>{result}</>)
      const element = getByTestId('test')

      expect(element).toHaveAttribute('data-x', 'new') // Overridden
      expect(element).toHaveAttribute('data-y', 'original') // Preserved
      expect(element).toHaveAttribute('data-z', 'added') // Added
    })
  })

  describe('Lucide icon detection', () => {
    it('should apply props to Lucide icons (detected by displayName)', () => {
      const LucideIcon = ({ size, color }: any) => (
        <svg data-testid="lucide-icon" data-size={size} data-color={color}>
          <circle />
        </svg>
      )
      LucideIcon.displayName = 'wrapLucideIcon(UserIcon)'

      const result = renderLucideIconWithProps(LucideIcon, {
        size: 'lg',
        color: 'blue'
      })

      const { getByTestId } = render(<>{result}</>)
      const element = getByTestId('lucide-icon')

      expect(element).toHaveAttribute('data-size', 'lg')
      expect(element).toHaveAttribute('data-color', 'blue')
    })

    it('should NOT apply props to non-Lucide icons', () => {
      const NonLucideIcon = ({ size }: any) => (
        <svg data-testid="non-lucide-icon" data-size={size || 'default'}>
          <circle />
        </svg>
      )

      const result = renderLucideIconWithProps(NonLucideIcon, {
        size: 'lg',
        color: 'blue'
      })

      const { getByTestId } = render(<>{result}</>)
      const element = getByTestId('non-lucide-icon')

      // Should render with default value, not the passed prop
      expect(element).toHaveAttribute('data-size', 'default')
      expect(element).not.toHaveAttribute('data-color')
    })

    it('should detect Lucide icon from JSX element', () => {
      const LucideIcon = ({ size }: any) => (
        <svg data-testid="lucide-jsx" data-size={size}>
          <circle />
        </svg>
      )
      LucideIcon.displayName = 'wrapLucideIcon(CircleIcon)'

      const result = renderLucideIconWithProps(<LucideIcon />, {
        size: 'md'
      })

      const { getByTestId } = render(<>{result}</>)
      const element = getByTestId('lucide-jsx')

      expect(element).toHaveAttribute('data-size', 'md')
    })

    it('should NOT apply props to JSX element without Lucide displayName', () => {
      const NonLucideIcon = ({ size }: any) => (
        <svg data-testid="non-lucide-jsx" data-size={size || 'default'}>
          <circle />
        </svg>
      )

      const result = renderLucideIconWithProps(<NonLucideIcon />, {
        size: 'xl'
      })

      const { getByTestId } = render(<>{result}</>)
      const element = getByTestId('non-lucide-jsx')

      expect(element).toHaveAttribute('data-size', 'default')
    })

    it('should detect Lucide icon from render function', () => {
      const renderFunc = ({ size }: any) => (
        <svg data-testid="lucide-func" data-size={size}>
          <circle />
        </svg>
      )
      renderFunc.displayName = 'wrapLucideIcon(StarIcon)'

      const result = renderLucideIconWithProps(renderFunc, { size: 'sm' })

      const { getByTestId } = render(<>{result}</>)
      const element = getByTestId('lucide-func')

      expect(element).toHaveAttribute('data-size', 'sm')
    })

    it('should NOT apply props to render function without Lucide displayName', () => {
      const renderFunc = ({ size }: any) => (
        <svg data-testid="non-lucide-func" data-size={size || 'default'}>
          <circle />
        </svg>
      )

      const result = renderLucideIconWithProps(renderFunc, { size: 'lg' })

      const { getByTestId } = render(<>{result}</>)
      const element = getByTestId('non-lucide-func')

      expect(element).toHaveAttribute('data-size', 'default')
    })

    it('should detect Lucide icon from arrow function returning JSX without displayName', () => {
      const LucideIcon = ({ size }: any) => (
        <svg data-testid="lucide-arrow" data-size={size}>
          <circle />
        </svg>
      )
      LucideIcon.displayName = 'wrapLucideIcon(ArrowIcon)'

      // Arrow function without displayName that returns a Lucide icon
      const renderFunc = () => <LucideIcon />

      const result = renderLucideIconWithProps(renderFunc, { size: 'lg' })

      const { getByTestId } = render(<>{result}</>)
      const element = getByTestId('lucide-arrow')

      // Should apply size prop even though arrow function has no displayName
      expect(element).toHaveAttribute('data-size', 'lg')
    })

    it('should handle arrow function returning non-Lucide icon', () => {
      const NonLucideIcon = ({ size }: any) => (
        <svg data-testid="non-lucide-arrow" data-size={size || 'default'}>
          <circle />
        </svg>
      )

      // Arrow function without displayName that returns a non-Lucide icon
      const renderFunc = () => <NonLucideIcon />

      const result = renderLucideIconWithProps(renderFunc, { size: 'xl' })

      const { getByTestId } = render(<>{result}</>)
      const element = getByTestId('non-lucide-arrow')

      // Should NOT apply size prop
      expect(element).toHaveAttribute('data-size', 'default')
    })
  })
})
