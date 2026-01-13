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

import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import { IconPropsProvider, useIconProps } from '../IconPropsProvider'

// Test component that exposes context values
const TestComponentWithHook = () => {
  const iconProps = useIconProps()
  return (
    <div data-testid="test-component">
      <span data-testid="size">
        {iconProps?.size?.toString() || 'undefined'}
      </span>
      <span data-testid="color">{iconProps?.color || 'undefined'}</span>
    </div>
  )
}

// Mock icon component that uses context
const MockIconComponent = ({ testId = 'mock-icon' }: { testId?: string }) => {
  const iconProps = useIconProps()
  return (
    <div
      data-testid={testId}
      data-size={iconProps?.size?.toString() || 'none'}
      data-color={iconProps?.color || 'none'}
    >
      Icon
    </div>
  )
}

// Mock icon that accepts direct props and merges with context
const MockIconWithProps = ({
  size,
  color,
  testId = 'mock-icon-with-props'
}: {
  size?: string | number
  color?: string
  testId?: string
}) => {
  const contextProps = useIconProps()
  const finalSize = size ?? contextProps?.size
  const finalColor = color ?? contextProps?.color

  return (
    <div
      data-testid={testId}
      data-size={finalSize?.toString() || 'none'}
      data-color={finalColor || 'none'}
    >
      Icon
    </div>
  )
}

describe('IconPropsProvider', () => {
  describe('useIconProps hook', () => {
    it('should return context values when inside provider', () => {
      render(
        <IconPropsProvider size="lg" color="baseColor">
          <TestComponentWithHook />
        </IconPropsProvider>
      )

      expect(screen.getByTestId('size')).toHaveTextContent('lg')
      expect(screen.getByTestId('color')).toHaveTextContent('baseColor')
    })

    it('should return empty object when outside provider', () => {
      render(<TestComponentWithHook />)

      expect(screen.getByTestId('size')).toHaveTextContent('undefined')
      expect(screen.getByTestId('color')).toHaveTextContent('undefined')
    })

    it('should return numeric size values', () => {
      render(
        <IconPropsProvider size={24} color="accentRedColor">
          <TestComponentWithHook />
        </IconPropsProvider>
      )

      expect(screen.getByTestId('size')).toHaveTextContent('24')
      expect(screen.getByTestId('color')).toHaveTextContent('accentRedColor')
    })
  })

  describe('Icon components receive props from context', () => {
    it('should pass context values to icon component', () => {
      render(
        <IconPropsProvider size="md" color="baseColor">
          <MockIconComponent />
        </IconPropsProvider>
      )

      const icon = screen.getByTestId('mock-icon')
      expect(icon).toHaveAttribute('data-size', 'md')
      expect(icon).toHaveAttribute('data-color', 'baseColor')
    })

    it('should work without IconPropsProvider', () => {
      render(<MockIconComponent />)

      const icon = screen.getByTestId('mock-icon')
      expect(icon).toHaveAttribute('data-size', 'none')
      expect(icon).toHaveAttribute('data-color', 'none')
    })
  })

  describe('Direct props override context props', () => {
    it('should allow direct props to override context', () => {
      render(
        <IconPropsProvider size="lg" color="baseColor">
          <MockIconWithProps size={16} color="accentRedColor" />
        </IconPropsProvider>
      )

      const icon = screen.getByTestId('mock-icon-with-props')
      expect(icon).toHaveAttribute('data-size', '16')
      expect(icon).toHaveAttribute('data-color', 'accentRedColor')
    })

    it('should use context when no direct props provided', () => {
      render(
        <IconPropsProvider size={24} color="baseColor">
          <MockIconWithProps />
        </IconPropsProvider>
      )

      const icon = screen.getByTestId('mock-icon-with-props')
      expect(icon).toHaveAttribute('data-size', '24')
      expect(icon).toHaveAttribute('data-color', 'baseColor')
    })
  })
})
