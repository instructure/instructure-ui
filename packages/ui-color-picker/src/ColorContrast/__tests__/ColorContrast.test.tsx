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

import {
  expect,
  generateA11yTests,
  mount,
  stub
} from '@instructure/ui-test-utils'
import { contrast } from '@instructure/ui-color-utils'

import { ColorContrast } from '../'
import { ColorContrastLocator } from '../ColorContrastLocator'
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
      const elementRef = stub()
      await mount(
        <ColorContrast
          {...testColors}
          {...testLabels}
          elementRef={elementRef}
        />
      )

      const component = await ColorContrastLocator.find()

      expect(elementRef).to.have.been.calledWith(component.getDOMNode())
    })
  })

  describe('labels are displayed:', () => {
    Object.entries(testLabels).forEach(([label, text]) => {
      it(label, async () => {
        await mount(<ColorContrast {...testColors} {...testLabels} />)
        const component = await ColorContrastLocator.find()
        const labelElement = await component.findWithText(text)

        expect(labelElement.getDOMNode()).to.be.visible()
      })
    })
  })

  describe('should calculate contrast correctly', () => {
    it('on opaque colors', async () => {
      const color1 = '#fff'
      const color2 = '#088'

      await mount(
        <ColorContrast
          {...testLabels}
          firstColor={color1}
          secondColor={color2}
        />
      )
      const component = await ColorContrastLocator.find()
      const contrastResult = contrast(color1, color2, 2)
      const labelElement = await component.findWithText(contrastResult + ':1')

      expect(labelElement.getDOMNode()).to.be.visible()
    })

    it('on transparent colors', async () => {
      const color1 = '#fff'
      const color2 = '#00888880'

      await mount(
        <ColorContrast
          {...testLabels}
          firstColor={color1}
          secondColor={color2}
        />
      )
      const component = await ColorContrastLocator.find()

      // this is the result of a complicated "blended color" calculation
      // in the component, not simple `contrast()` check
      const labelElement = await component.findWithText('2:1')

      expect(labelElement.getDOMNode()).to.be.visible()
    })
  })

  describe('withoutColorPreview prop', () => {
    it('should be false by default, should display preview', async () => {
      await mount(<ColorContrast {...testColors} {...testLabels} />)

      const component = await ColorContrastLocator.find()
      const preview = await component.findPreview()

      expect(preview.getDOMNode()).to.be.visible()
    })

    it('should hide preview', async () => {
      await mount(
        <ColorContrast {...testColors} {...testLabels} withoutColorPreview />
      )

      const component = await ColorContrastLocator.find()
      const preview = await component.findPreview({ expectEmpty: true })

      expect(preview).to.not.exist()
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
          await mount(
            <ColorContrast
              {...testLabels}
              firstColor={firstColor}
              secondColor={secondColor}
            />
          )
          const component = await ColorContrastLocator.find()
          const normalTextCheckPill = await component.findNormalTextCheckPill()
          expect(normalTextCheckPill.getTextContent()).to.equal(
            expectedResult.normal
          )
        })

        it(`large text should ${expectedResult.large.toLowerCase()}`, async () => {
          await mount(
            <ColorContrast
              {...testLabels}
              firstColor={firstColor}
              secondColor={secondColor}
            />
          )
          const component = await ColorContrastLocator.find()
          const largeTextCheckPill = await component.findLargeTextCheckPill()
          expect(largeTextCheckPill.getTextContent()).to.equal(
            expectedResult.large
          )
        })

        it(`graphics should ${expectedResult.graphics.toLowerCase()}`, async () => {
          await mount(
            <ColorContrast
              {...testLabels}
              firstColor={firstColor}
              secondColor={secondColor}
            />
          )
          const component = await ColorContrastLocator.find()
          const graphicsCheckPill = await component.findGraphicsCheckPill()
          expect(graphicsCheckPill.getTextContent()).to.equal(
            expectedResult.graphics
          )
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
    generateA11yTests(ColorContrast, ColorContrastExamples)
    it('a11y', async () => {
      await mount(<ColorContrast {...testColors} {...testLabels} />)
      const subject = await ColorContrastLocator.find()

      expect(await subject.accessible()).to.be.true()
    })
  })
})
