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

import { render } from '@testing-library/react'
import { vi } from 'vitest'
import '@testing-library/jest-dom'

// eslint-disable-next-line no-restricted-imports
import { generateA11yTests } from '@instructure/ui-scripts/lib/test/generateA11yTests'
import { runAxeCheck } from '@instructure/ui-axe-check'
import { contrast } from '@instructure/ui-color-utils'

import { ColorContrast } from '../'
import ColorContrastExamples from '../__examples__/ColorContrast.examples'

const testColors = {
  firstColor: '#FF0000',
  secondColor: '#FFFF00'
}

const testLabels = {
  label: 'Color Contrast Ratio',
  successLabel: 'PASS',
  failureLabel: 'FAIL',
  normalTextLabel: 'Normal text',
  largeTextLabel: 'Large text',
  graphicsTextLabel: 'Graphics text',
  firstColorLabel: 'Background',
  secondColorLabel: 'Foreground'
}

type ContrastStatus = 'FAIL' | 'PASS'

describe('<ColorContrast />', () => {
  describe('elementRef prop', () => {
    it('should provide ref', async () => {
      const elementRef = vi.fn()
      const { container } = render(
        <ColorContrast
          {...testColors}
          {...testLabels}
          elementRef={elementRef}
        />
      )

      expect(elementRef).toHaveBeenCalledWith(container.firstChild)
    })
  })

  describe('labels are displayed:', () => {
    Object.entries(testLabels).forEach(([label, text]) => {
      it(label, async () => {
        const { container } = render(
          <ColorContrast {...testColors} {...testLabels} />
        )

        expect(container).toHaveTextContent(text)
      })
    })
  })

  describe('should calculate contrast correctly', () => {
    it('on opaque colors', async () => {
      const color1 = '#fff'
      const color2 = '#088'

      const { container } = render(
        <ColorContrast
          {...testLabels}
          firstColor={color1}
          secondColor={color2}
        />
      )
      const contrastResult = contrast(color1, color2, 2)

      expect(container).toHaveTextContent(contrastResult + ':1')
    })

    it('on transparent colors', async () => {
      const color1 = '#fff'
      const color2 = '#00888880'

      const { container } = render(
        <ColorContrast
          {...testLabels}
          firstColor={color1}
          secondColor={color2}
        />
      )

      // this is the result of a complicated "blended color" calculation
      // in the component, not simple `contrast()` check
      expect(container).toHaveTextContent('2:1')
    })
  })

  describe('withoutColorPreview prop', () => {
    it('should be false by default, should display preview', async () => {
      const { container } = render(
        <ColorContrast {...testColors} {...testLabels} />
      )

      const preview = container.querySelector(
        "[class$='-colorContrast__colorPreview']"
      )
      expect(preview).toBeInTheDocument()
    })

    it('should hide preview', async () => {
      const { container } = render(
        <ColorContrast {...testColors} {...testLabels} withoutColorPreview />
      )

      const preview = container.querySelector(
        "[class$='-colorContrast__colorPreview']"
      )
      expect(preview).not.toBeInTheDocument()
    })
  })

  describe('contrast check', () => {
    const checkContrastPills = (
      title: string,
      firstColor: string,
      secondColor: string,
      expectedResult: {
        normal: ContrastStatus
        large: ContrastStatus
        graphics: ContrastStatus
      }
    ) => {
      describe(title, () => {
        it(`normal text should ${expectedResult.normal.toLowerCase()}`, async () => {
          const { container } = render(
            <ColorContrast
              {...testLabels}
              firstColor={firstColor}
              secondColor={secondColor}
            />
          )

          expect(container).toHaveTextContent(expectedResult.normal)
        })

        it(`large text should ${expectedResult.large.toLowerCase()}`, async () => {
          const { container } = render(
            <ColorContrast
              {...testLabels}
              firstColor={firstColor}
              secondColor={secondColor}
            />
          )

          expect(container).toHaveTextContent(expectedResult.large)
        })

        it(`graphics should ${expectedResult.graphics.toLowerCase()}`, async () => {
          const { container } = render(
            <ColorContrast
              {...testLabels}
              firstColor={firstColor}
              secondColor={secondColor}
            />
          )
          expect(container).toHaveTextContent(expectedResult.graphics)
        })
      })
    }

    checkContrastPills('on x < 3 contrast', '#fff', '#aaa', {
      normal: 'FAIL',
      large: 'FAIL',
      graphics: 'FAIL'
    })

    checkContrastPills('on small 3 < x < 4.5 contrast', '#fff', '#0c89bf', {
      normal: 'FAIL',
      large: 'PASS',
      graphics: 'PASS'
    })

    checkContrastPills('on small x > 4.5 contrast', '#fff', '#333', {
      normal: 'PASS',
      large: 'PASS',
      graphics: 'PASS'
    })
  })

  describe('should be accessible', () => {
    it('a11y', async () => {
      const { container } = render(
        <ColorContrast {...testColors} {...testLabels} />
      )
      const axeCheck = await runAxeCheck(container)

      expect(axeCheck).toBe(true)
    })

    describe('with generated examples', () => {
      const generatedComponents = generateA11yTests(
        ColorContrast,
        ColorContrastExamples
      )

      it.each(generatedComponents)(
        'should be accessible with example: $description',
        async ({ content }) => {
          const { container } = render(content)
          const axeCheck = await runAxeCheck(container)
          expect(axeCheck).toBe(true)
        }
      )
    })
  })
})
