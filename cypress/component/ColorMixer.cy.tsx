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
import { ColorMixer } from '../../packages/ui'

import '../support/component'
import 'cypress-real-events'

import { colorToHex8 } from '../../packages/ui-color-utils'

const testValue = {
  value: '#09918B'
}

const testInputLabels = {
  rgbRedInputScreenReaderLabel: 'Input field for red',
  rgbGreenInputScreenReaderLabel: 'Input field for green',
  rgbBlueInputScreenReaderLabel: 'Input field for blue',
  rgbAlphaInputScreenReaderLabel: 'Input field for alpha'
}

const testScreenReaderLabels = {
  colorSliderNavigationExplanationScreenReaderLabel: `You are on a color slider. To navigate the slider left or right, use the 'A' and 'D' buttons respectively`,
  alphaSliderNavigationExplanationScreenReaderLabel: `You are on an alpha slider. To navigate the slider left or right, use the 'A' and 'D' buttons respectively`,
  colorPaletteNavigationExplanationScreenReaderLabel: `You are on a color palette. To navigate on the palette up, left, down or right, use the 'W', 'A', 'S' and 'D' buttons respectively`
}

describe('<ColorMixer/>', () => {
  it('should change hue value when click at the middle of the slider', async () => {
    const onChange = cy.spy()
    cy.mount(
      <ColorMixer
        {...testInputLabels}
        {...testScreenReaderLabels}
        onChange={onChange}
      />
    )
    cy.get(
      `[role="slider"][aria-label="${testScreenReaderLabels.colorSliderNavigationExplanationScreenReaderLabel}"]`
    ).then(($colorSlider) => {
      const rect = $colorSlider[0].getBoundingClientRect()
      cy.wrap($colorSlider).realClick({ x: rect.width / 2, y: rect.height / 2 })
    })

    cy.wrap(onChange).should('have.been.called')
  })

  it('should change hue value when click at the end of the slider', async () => {
    const onChange = cy.spy()
    cy.mount(
      <ColorMixer
        {...testInputLabels}
        {...testScreenReaderLabels}
        onChange={onChange}
      />
    )

    cy.get(
      `[role="slider"][aria-label="${testScreenReaderLabels.colorSliderNavigationExplanationScreenReaderLabel}"]`
    ).then(($colorSlider) => {
      const rect = $colorSlider[0].getBoundingClientRect()

      cy.wrap($colorSlider).realClick({ x: rect.width - 1, y: rect.height / 2 })
    })

    cy.wrap(onChange).should('have.been.called')
  })

  it('should change hue value when click at the beginning of the slider', async () => {
    const onChange = cy.spy()
    cy.mount(
      <ColorMixer
        value="#00FF00"
        {...testInputLabels}
        {...testScreenReaderLabels}
        onChange={onChange}
      />
    )

    cy.get(
      `[role="slider"][aria-label="${testScreenReaderLabels.colorSliderNavigationExplanationScreenReaderLabel}"]`
    ).then(($colorSlider) => {
      const rect = $colorSlider[0].getBoundingClientRect()

      cy.wrap($colorSlider).realClick({ x: 1, y: rect.height / 2 })
    })
    // Because we already passed the `value` that different from the default value then the component changes their color once, so if we want to test with any action after that, `onChange` should be called twice.
    cy.wrap(onChange).should('have.been.calledTwice')
  })

  it('should change hue value when click at the outside of the slider to the left', async () => {
    const onChange = cy.spy()
    cy.mount(
      <ColorMixer
        value="#00FF00"
        {...testInputLabels}
        {...testScreenReaderLabels}
        onChange={onChange}
      />
    )
    cy.get(
      `[role="slider"][aria-label="${testScreenReaderLabels.colorSliderNavigationExplanationScreenReaderLabel}"]`
    ).then(($colorSlider) => {
      const rect = $colorSlider[0].getBoundingClientRect()

      cy.wrap($colorSlider).realClick({ x: -4, y: rect.height / 2 })
    })
    // Because we already passed the `value` that different from the default value then the component changes their color once, so if we want to test with any action after that, `onChange` should be called twice.
    cy.wrap(onChange).should('have.been.calledTwice')
  })

  it('should change hue value when click at the outside of the slider to the right', async () => {
    const onChange = cy.spy()
    cy.mount(
      <ColorMixer
        value="#00FF00"
        {...testInputLabels}
        {...testScreenReaderLabels}
        onChange={onChange}
      />
    )
    cy.get(
      `[role="slider"][aria-label="${testScreenReaderLabels.colorSliderNavigationExplanationScreenReaderLabel}"]`
    ).then(($colorSlider) => {
      const rect = $colorSlider[0].getBoundingClientRect()

      cy.wrap($colorSlider).realClick({
        x: rect.width + 10,
        y: rect.height / 2
      })
    })
    // Because we already passed the `value` that different from the default value then the component changes their color once, so if we want to test with any action after that, `onChange` should be called twice.
    cy.wrap(onChange).should('have.been.calledTwice')
  })

  it(`should hue value change with 'a' key pressed`, async () => {
    const onChange = cy.spy()

    cy.mount(
      <ColorMixer
        {...testValue}
        {...testInputLabels}
        {...testScreenReaderLabels}
        onChange={onChange}
      />
    )

    cy.get(
      `[role="slider"][aria-label="${testScreenReaderLabels.colorSliderNavigationExplanationScreenReaderLabel}"]`
    )
      .focus()
      .realPress('a')

    cy.wrap(onChange).should('have.been.calledTwice')
  })

  it(`should hue value change with 'd' key pressed`, async () => {
    const onChange = cy.spy()

    cy.mount(
      <ColorMixer
        {...testValue}
        {...testInputLabels}
        {...testScreenReaderLabels}
        onChange={onChange}
      />
    )

    cy.get(
      `[role="slider"][aria-label="${testScreenReaderLabels.colorSliderNavigationExplanationScreenReaderLabel}"]`
    )
      .focus()
      .realPress('d')

    cy.wrap(onChange).should('have.been.calledTwice')
  })

  it(`should hue value change with 'ArrowLeft' key pressed`, async () => {
    const onChange = cy.spy()

    cy.mount(
      <ColorMixer
        {...testValue}
        {...testInputLabels}
        {...testScreenReaderLabels}
        onChange={onChange}
      />
    )

    cy.get(
      `[role="slider"][aria-label="${testScreenReaderLabels.colorSliderNavigationExplanationScreenReaderLabel}"]`
    )
      .focus()
      .realPress('ArrowLeft')

    cy.wrap(onChange).should('have.been.calledTwice')
  })

  it(`should hue value change with 'ArrowRight' key pressed`, async () => {
    const onChange = cy.spy()

    cy.mount(
      <ColorMixer
        {...testValue}
        {...testInputLabels}
        {...testScreenReaderLabels}
        onChange={onChange}
      />
    )

    cy.get(
      `[role="slider"][aria-label="${testScreenReaderLabels.colorSliderNavigationExplanationScreenReaderLabel}"]`
    )
      .focus()
      .realPress('ArrowRight')

    cy.wrap(onChange).should('have.been.calledTwice')
  })

  it('the hue indicator move left', () => {
    const onChange = cy.spy()
    cy.mount(
      <ColorMixer
        {...testValue}
        {...testInputLabels}
        {...testScreenReaderLabels}
        onChange={onChange}
      />
    )

    cy.get(
      `[role="slider"][aria-label="${testScreenReaderLabels.colorSliderNavigationExplanationScreenReaderLabel}"]`
    )
      .as('hueSlider')
      .find('[class*=-colorMixerSlider__indicator]')
      .as('indicator')
      .then(($indicator) => {
        const pos1 = $indicator[0].getBoundingClientRect().x

        cy.get('@hueSlider').focus()

        cy.realPress('a').then(() => {
          const pos2 = $indicator[0].getBoundingClientRect().x
          expect(pos2).to.be.lessThan(pos1)

          cy.realPress('ArrowLeft').then(() => {
            const pos3 = $indicator[0].getBoundingClientRect().x
            expect(pos3).to.be.lessThan(pos2)
          })
        })
      })
  })

  it('the hue indicator move right', () => {
    const onChange = cy.spy()
    cy.mount(
      <ColorMixer
        {...testValue}
        {...testInputLabels}
        {...testScreenReaderLabels}
        onChange={onChange}
      />
    )

    cy.get(
      `[role="slider"][aria-label="${testScreenReaderLabels.colorSliderNavigationExplanationScreenReaderLabel}"]`
    )
      .as('hueSlider')
      .find('[class*=-colorMixerSlider__indicator]')
      .as('indicator')
      .then(($indicator) => {
        const pos1 = $indicator[0].getBoundingClientRect().x

        cy.get('@hueSlider').focus()

        cy.realPress('d').then(() => {
          const pos2 = $indicator[0].getBoundingClientRect().x
          expect(pos2).to.be.greaterThan(pos1)

          cy.realPress('ArrowRight').then(() => {
            const pos3 = $indicator[0].getBoundingClientRect().x
            expect(pos3).to.be.greaterThan(pos2)
          })
        })
      })
  })

  it('should not move the hue indicator when reach the left border', async () => {
    const onChange = cy.spy()
    cy.mount(
      <ColorMixer
        value={colorToHex8({ h: 0, s: 0.5, v: 0.5 })}
        {...testInputLabels}
        {...testScreenReaderLabels}
        onChange={onChange}
      />
    )

    cy.get(
      `[role="slider"][aria-label="${testScreenReaderLabels.colorSliderNavigationExplanationScreenReaderLabel}"]`
    )
      .as('hueSlider')
      .find('[class*=-colorMixerSlider__indicator]')
      .as('indicator')
      .then(($indicator) => {
        const pos1 = $indicator[0].getBoundingClientRect().x

        cy.get('@hueSlider').focus()

        cy.realPress('a').then(() => {
          const pos2 = $indicator[0].getBoundingClientRect().x
          expect(pos2).to.equal(pos1)

          cy.realPress('ArrowLeft').then(() => {
            const pos3 = $indicator[0].getBoundingClientRect().x
            expect(pos3).to.equal(pos2)
          })
        })
      })
  })

  it('should not move the hue indicator when reach the right border', async () => {
    const onChange = cy.spy()
    cy.mount(
      <ColorMixer
        value="#FF0001"
        {...testInputLabels}
        {...testScreenReaderLabels}
        onChange={onChange}
      />
    )

    cy.get(
      `[role="slider"][aria-label="${testScreenReaderLabels.colorSliderNavigationExplanationScreenReaderLabel}"]`
    ).as('hueSlider')

    // Initial positioning to reach the right end of the slider
    cy.get('@hueSlider').focus()
    cy.realPress('ArrowRight')
    cy.realPress('ArrowRight')

    cy.get('[class*=-colorMixerSlider__indicator]')
      .as('indicator')
      .then(($indicator) => {
        const pos1 = $indicator[0].getBoundingClientRect().x

        cy.get('@hueSlider').focus()
        cy.realPress('d').then(() => {
          const pos2 = $indicator[0].getBoundingClientRect().x
          expect(pos2).to.equal(pos1)

          cy.realPress('ArrowRight').then(() => {
            const pos3 = $indicator[0].getBoundingClientRect().x
            expect(pos3).to.equal(pos2)
          })
        })
      })
  })

  it('should change alpha value when click at the beginning of the bar', async () => {
    const onChange = cy.spy()
    cy.mount(
      <ColorMixer
        withAlpha
        value="#abcdefff"
        {...testInputLabels}
        {...testScreenReaderLabels}
        onChange={onChange}
      />
    )

    cy.get(
      `[role="slider"][aria-label="${testScreenReaderLabels.alphaSliderNavigationExplanationScreenReaderLabel}"]`
    ).then(($colorSlider) => {
      const rect = $colorSlider[0].getBoundingClientRect()

      cy.wrap($colorSlider).realClick({ x: 1, y: rect.height / 2 })
    })
    cy.wrap(onChange).should('have.been.calledTwice')
  })

  it('should change alpha value when click at the end of the bar', async () => {
    const onChange = cy.spy()
    cy.mount(
      <ColorMixer
        withAlpha
        value="#000000cc"
        {...testInputLabels}
        {...testScreenReaderLabels}
        onChange={onChange}
      />
    )

    cy.get(
      `[role="slider"][aria-label="${testScreenReaderLabels.alphaSliderNavigationExplanationScreenReaderLabel}"]`
    ).then(($colorSlider) => {
      const rect = $colorSlider[0].getBoundingClientRect()

      cy.wrap($colorSlider).realClick({ x: rect.width - 1, y: rect.height / 2 })
    })
    cy.wrap(onChange).should('have.been.calledTwice')
  })

  it('should change alpha value when click at the outside of the bar to the left', async () => {
    const onChange = cy.spy()
    cy.mount(
      <ColorMixer
        withAlpha
        value="#a000000f"
        {...testInputLabels}
        {...testScreenReaderLabels}
        onChange={onChange}
      />
    )
    cy.get(
      `[role="slider"][aria-label="${testScreenReaderLabels.alphaSliderNavigationExplanationScreenReaderLabel}"]`
    ).then(($colorSlider) => {
      const rect = $colorSlider[0].getBoundingClientRect()

      cy.wrap($colorSlider).realClick({ x: -4, y: rect.height / 2 })
    })
    // Because we already passed the `value` that different from the default value then the component changes their color once, so if we want to test with any action after that, `onChange` should be called twice.
    cy.wrap(onChange).should('have.been.calledTwice')
  })

  it('should change alpha value when click at the outside of the bar to the right', async () => {
    const onChange = cy.spy()
    cy.mount(
      <ColorMixer
        withAlpha
        value="#00000000"
        {...testInputLabels}
        {...testScreenReaderLabels}
        onChange={onChange}
      />
    )
    cy.get(
      `[role="slider"][aria-label="${testScreenReaderLabels.alphaSliderNavigationExplanationScreenReaderLabel}"]`
    ).then(($colorSlider) => {
      const rect = $colorSlider[0].getBoundingClientRect()

      cy.wrap($colorSlider).realClick({
        x: rect.width + 10,
        y: rect.height / 2
      })
    })

    cy.wrap(onChange).should('have.been.calledTwice')
  })

  it('should change alpha value when click at the middle of the slider', async () => {
    const onChange = cy.spy()
    cy.mount(
      <ColorMixer
        withAlpha
        value="#00000000"
        {...testInputLabels}
        {...testScreenReaderLabels}
        onChange={onChange}
      />
    )
    cy.get(
      `[role="slider"][aria-label="${testScreenReaderLabels.alphaSliderNavigationExplanationScreenReaderLabel}"]`
    ).then(($colorSlider) => {
      const rect = $colorSlider[0].getBoundingClientRect()
      cy.wrap($colorSlider).realClick({ x: rect.width / 2, y: rect.height / 2 })
    })

    cy.wrap(onChange).should('have.been.calledTwice')
  })

  it(`should alpha value change with 'ArrowRight' key pressed`, async () => {
    const onChange = cy.spy()

    cy.mount(
      <ColorMixer
        withAlpha
        value="#000000AA"
        {...testInputLabels}
        {...testScreenReaderLabels}
        onChange={onChange}
      />
    )

    cy.get(
      `[role="slider"][aria-label="${testScreenReaderLabels.alphaSliderNavigationExplanationScreenReaderLabel}"]`
    )
      .focus()
      .realPress('ArrowRight')

    cy.wrap(onChange).should('have.been.calledTwice')
  })

  it(`should alpha value change with 'ArrowLeft' key pressed`, async () => {
    const onChange = cy.spy()

    cy.mount(
      <ColorMixer
        withAlpha
        value="#000000AA"
        {...testInputLabels}
        {...testScreenReaderLabels}
        onChange={onChange}
      />
    )

    cy.get(
      `[role="slider"][aria-label="${testScreenReaderLabels.alphaSliderNavigationExplanationScreenReaderLabel}"]`
    )
      .focus()
      .realPress('ArrowLeft')

    cy.wrap(onChange).should('have.been.calledTwice')
  })

  it(`should alpha value change with 'a' key pressed`, async () => {
    const onChange = cy.spy()

    cy.mount(
      <ColorMixer
        withAlpha
        value="#000000AA"
        {...testInputLabels}
        {...testScreenReaderLabels}
        onChange={onChange}
      />
    )

    cy.get(
      `[role="slider"][aria-label="${testScreenReaderLabels.alphaSliderNavigationExplanationScreenReaderLabel}"]`
    )
      .focus()
      .realPress('a')

    cy.wrap(onChange).should('have.been.calledTwice')
  })

  it(`should alpha value change with 'd' key pressed`, async () => {
    const onChange = cy.spy()

    cy.mount(
      <ColorMixer
        withAlpha
        value="#000000AA"
        {...testInputLabels}
        {...testScreenReaderLabels}
        onChange={onChange}
      />
    )

    cy.get(
      `[role="slider"][aria-label="${testScreenReaderLabels.alphaSliderNavigationExplanationScreenReaderLabel}"]`
    )
      .focus()
      .realPress('d')

    cy.wrap(onChange).should('have.been.calledTwice')
  })

  it('should not move the alpha indicator when reach the left border', async () => {
    const onChange = cy.spy()
    cy.mount(
      <ColorMixer
        withAlpha
        value="#80404100"
        {...testInputLabels}
        {...testScreenReaderLabels}
        onChange={onChange}
      />
    )

    cy.get(
      `[role="slider"][aria-label="${testScreenReaderLabels.alphaSliderNavigationExplanationScreenReaderLabel}"]`
    )
      .as('hueSlider')
      .find('[class*=-colorMixerSlider__indicator]')
      .as('indicator')
      .then(($indicator) => {
        const pos1 = $indicator[0].getBoundingClientRect().x

        cy.get('@hueSlider').focus()

        cy.realPress('a').then(() => {
          const pos2 = $indicator[0].getBoundingClientRect().x
          expect(pos2).to.equal(pos1)

          cy.realPress('ArrowLeft').then(() => {
            const pos3 = $indicator[0].getBoundingClientRect().x
            expect(pos3).to.equal(pos2)
          })
        })
      })
  })

  it('should not move the alpha indicator when reach the right border', async () => {
    const onChange = cy.spy()
    cy.mount(
      <ColorMixer
        withAlpha
        value="#804041FF"
        {...testInputLabels}
        {...testScreenReaderLabels}
        onChange={onChange}
      />
    )

    cy.get(
      `[role="slider"][aria-label="${testScreenReaderLabels.alphaSliderNavigationExplanationScreenReaderLabel}"]`
    ).as('hueSlider')

    cy.get('[class*=-colorMixerSlider__indicator]')
      .as('indicator')
      .then(($indicator) => {
        const pos1 = $indicator[0].getBoundingClientRect().x

        cy.get('@hueSlider').focus()
        cy.realPress('d').then(() => {
          const pos2 = $indicator[0].getBoundingClientRect().x
          expect(pos2).to.equal(pos1)

          cy.realPress('ArrowRight').then(() => {
            const pos3 = $indicator[0].getBoundingClientRect().x
            expect(pos3).to.equal(pos2)
          })
        })
      })
  })

  it('should palette change the color when mousedown event is received inside the palette', async () => {
    const onChange = cy.spy()
    cy.mount(
      <ColorMixer
        {...testInputLabels}
        {...testScreenReaderLabels}
        onChange={onChange}
      />
    )

    cy.get(
      `[role="button"][aria-label="${testScreenReaderLabels.colorPaletteNavigationExplanationScreenReaderLabel}"]`
    ).then(($colorSlider) => {
      const rect = $colorSlider[0].getBoundingClientRect()
      cy.wrap($colorSlider).realClick({ x: rect.width / 2, y: rect.height / 2 })
    })

    cy.wrap(onChange).should('have.been.calledWith', '#7D3E3EFF')
  })

  it('should palette change the color when mousedown event is received at the top border', async () => {
    const onChange = cy.spy()
    cy.mount(
      <ColorMixer
        {...testInputLabels}
        {...testScreenReaderLabels}
        onChange={onChange}
      />
    )

    cy.get(
      `[role="button"][aria-label="${testScreenReaderLabels.colorPaletteNavigationExplanationScreenReaderLabel}"]`
    ).then(($colorSlider) => {
      const rect = $colorSlider[0].getBoundingClientRect()

      cy.wrap($colorSlider).realClick({ x: rect.width / 2, y: 1 })
    })

    cy.wrap(onChange).should('have.been.called')
  })

  it('should palette change the color when mousedown event is received at the bottom border', async () => {
    const onChange = cy.spy()
    cy.mount(
      <ColorMixer
        {...testInputLabels}
        {...testScreenReaderLabels}
        onChange={onChange}
      />
    )

    cy.get(
      `[role="button"][aria-label="${testScreenReaderLabels.colorPaletteNavigationExplanationScreenReaderLabel}"]`
    ).then(($colorSlider) => {
      const rect = $colorSlider[0].getBoundingClientRect()
      cy.wrap($colorSlider).realClick({ x: rect.width / 2, y: rect.height - 1 })
    })

    cy.wrap(onChange).should('have.been.called')
  })

  it('should palette change the color when mousedown event is received at the left border', async () => {
    const onChange = cy.spy()
    cy.mount(
      <ColorMixer
        {...testInputLabels}
        {...testScreenReaderLabels}
        onChange={onChange}
      />
    )

    cy.get(
      `[role="button"][aria-label="${testScreenReaderLabels.colorPaletteNavigationExplanationScreenReaderLabel}"]`
    ).then(($colorSlider) => {
      const rect = $colorSlider[0].getBoundingClientRect()
      cy.wrap($colorSlider).realClick({ x: 1, y: rect.height / 2 })
    })

    cy.wrap(onChange).should('have.been.called')
  })

  it('should palette change the color when mousedown event is received at the right border', async () => {
    const onChange = cy.spy()
    cy.mount(
      <ColorMixer
        {...testInputLabels}
        {...testScreenReaderLabels}
        onChange={onChange}
      />
    )

    cy.get(
      `[role="button"][aria-label="${testScreenReaderLabels.colorPaletteNavigationExplanationScreenReaderLabel}"]`
    ).then(($colorSlider) => {
      const rect = $colorSlider[0].getBoundingClientRect()
      cy.wrap($colorSlider).realClick({ x: rect.width - 1, y: rect.height / 2 })
    })

    cy.wrap(onChange).should('have.been.called')
  })

  it('should palette change the color when mousedown event is received at the top left corner', async () => {
    const onChange = cy.spy()
    cy.mount(
      <ColorMixer
        {...testInputLabels}
        {...testScreenReaderLabels}
        onChange={onChange}
      />
    )

    cy.get(
      `[role="button"][aria-label="${testScreenReaderLabels.colorPaletteNavigationExplanationScreenReaderLabel}"]`
    ).then(($colorSlider) => {
      cy.wrap($colorSlider).realClick({ x: 1, y: 1 })
    })

    cy.wrap(onChange).should('have.been.called')
  })

  it('should palette change the color when mousedown event is received at the top right corner', async () => {
    const onChange = cy.spy()
    cy.mount(
      <ColorMixer
        {...testInputLabels}
        {...testScreenReaderLabels}
        onChange={onChange}
      />
    )

    cy.get(
      `[role="button"][aria-label="${testScreenReaderLabels.colorPaletteNavigationExplanationScreenReaderLabel}"]`
    ).then(($colorSlider) => {
      const rect = $colorSlider[0].getBoundingClientRect()
      cy.wrap($colorSlider).realClick({ x: rect.width - 1, y: 1 })
    })

    cy.wrap(onChange).should('have.been.called')
  })

  it('should palette change the color when mousedown event is received at the bottom right corner', async () => {
    const onChange = cy.spy()
    cy.mount(
      <ColorMixer
        {...testInputLabels}
        {...testScreenReaderLabels}
        onChange={onChange}
      />
    )

    cy.get(
      `[role="button"][aria-label="${testScreenReaderLabels.colorPaletteNavigationExplanationScreenReaderLabel}"]`
    ).then(($colorSlider) => {
      const rect = $colorSlider[0].getBoundingClientRect()
      cy.wrap($colorSlider).realClick({ x: rect.width - 2, y: rect.height - 1 })
    })

    cy.wrap(onChange).should('have.been.called')
  })

  it('should palette change the color when mousedown event is received at the bottom left corner', async () => {
    const onChange = cy.spy()
    cy.mount(
      <ColorMixer
        {...testInputLabels}
        {...testScreenReaderLabels}
        onChange={onChange}
      />
    )

    cy.get(
      `[role="button"][aria-label="${testScreenReaderLabels.colorPaletteNavigationExplanationScreenReaderLabel}"]`
    ).then(($colorSlider) => {
      const rect = $colorSlider[0].getBoundingClientRect()
      cy.wrap($colorSlider).realClick({ x: 2, y: rect.height - 1 })
    })

    cy.wrap(onChange).should('have.been.called')
  })

  it(`should onChange is call when the palette receive event from keyboard 'a'`, async () => {
    const onChange = cy.spy()
    cy.mount(
      <ColorMixer
        {...testValue}
        {...testInputLabels}
        {...testScreenReaderLabels}
        onChange={onChange}
      />
    )

    cy.get(
      `[role="button"][aria-label="${testScreenReaderLabels.colorPaletteNavigationExplanationScreenReaderLabel}"]`
    )
      .focus()
      .realPress('a')

    // use `calledTwice` because it is called first time when passing  `testValue` color
    cy.wrap(onChange).should('have.been.calledTwice')
  })

  it(`should onChange is call when the palette receive event from keyboard 'w'`, async () => {
    const onChange = cy.spy()
    cy.mount(
      <ColorMixer
        {...testValue}
        {...testInputLabels}
        {...testScreenReaderLabels}
        onChange={onChange}
      />
    )

    cy.get(
      `[role="button"][aria-label="${testScreenReaderLabels.colorPaletteNavigationExplanationScreenReaderLabel}"]`
    )
      .focus()
      .realPress('w')

    // use `calledTwice` because it is called first time when passing  `testValue` color
    cy.wrap(onChange).should('have.been.calledTwice')
  })

  it(`should onChange is call when the palette receive event from keyboard 's'`, async () => {
    const onChange = cy.spy()
    cy.mount(
      <ColorMixer
        {...testValue}
        {...testInputLabels}
        {...testScreenReaderLabels}
        onChange={onChange}
      />
    )

    cy.get(
      `[role="button"][aria-label="${testScreenReaderLabels.colorPaletteNavigationExplanationScreenReaderLabel}"]`
    )
      .focus()
      .realPress('s')

    // use `calledTwice` because it is called first time when passing  `testValue` color
    cy.wrap(onChange).should('have.been.calledTwice')
  })

  it(`should onChange is call when the palette receive event from keyboard 'd'`, async () => {
    const onChange = cy.spy()
    cy.mount(
      <ColorMixer
        {...testValue}
        {...testInputLabels}
        {...testScreenReaderLabels}
        onChange={onChange}
      />
    )

    cy.get(
      `[role="button"][aria-label="${testScreenReaderLabels.colorPaletteNavigationExplanationScreenReaderLabel}"]`
    )
      .focus()
      .realPress('d')

    // use `calledTwice` because it is called first time when passing  `testValue` color
    cy.wrap(onChange).should('have.been.calledTwice')
  })

  it(`should onChange is call when the palette receive event from keyboard 'ArrowLeft'`, async () => {
    const onChange = cy.spy()
    cy.mount(
      <ColorMixer
        {...testValue}
        {...testInputLabels}
        {...testScreenReaderLabels}
        onChange={onChange}
      />
    )

    cy.get(
      `[role="button"][aria-label="${testScreenReaderLabels.colorPaletteNavigationExplanationScreenReaderLabel}"]`
    )
      .focus()
      .realPress('ArrowLeft')

    // use `calledTwice` because it is called first time when passing  `testValue` color
    cy.wrap(onChange).should('have.been.calledTwice')
  })

  it(`should onChange is call when the palette receive event from keyboard 'ArrowRight'`, async () => {
    const onChange = cy.spy()
    cy.mount(
      <ColorMixer
        {...testValue}
        {...testInputLabels}
        {...testScreenReaderLabels}
        onChange={onChange}
      />
    )

    cy.get(
      `[role="button"][aria-label="${testScreenReaderLabels.colorPaletteNavigationExplanationScreenReaderLabel}"]`
    )
      .focus()
      .realPress('ArrowRight')

    // use `calledTwice` because it is called first time when passing  `testValue` color
    cy.wrap(onChange).should('have.been.calledTwice')
  })

  it(`should onChange is call when the palette receive event from keyboard 'ArrowUp'`, async () => {
    const onChange = cy.spy()
    cy.mount(
      <ColorMixer
        {...testValue}
        {...testInputLabels}
        {...testScreenReaderLabels}
        onChange={onChange}
      />
    )

    cy.get(
      `[role="button"][aria-label="${testScreenReaderLabels.colorPaletteNavigationExplanationScreenReaderLabel}"]`
    )
      .focus()
      .realPress('ArrowUp')

    // use `calledTwice` because it is called first time when passing  `testValue` color
    cy.wrap(onChange).should('have.been.calledTwice')
  })

  it(`should onChange is call when the palette receive event from keyboard 'ArrowDown'`, async () => {
    const onChange = cy.spy()
    cy.mount(
      <ColorMixer
        {...testValue}
        {...testInputLabels}
        {...testScreenReaderLabels}
        onChange={onChange}
      />
    )

    cy.get(
      `[role="button"][aria-label="${testScreenReaderLabels.colorPaletteNavigationExplanationScreenReaderLabel}"]`
    )
      .focus()
      .realPress('ArrowDown')

    // use `calledTwice` because it is called first time when passing  `testValue` color
    cy.wrap(onChange).should('have.been.calledTwice')
  })

  it('should palette indicator moves up when receive the ArrowUp or w keyboard event', () => {
    const onChange = cy.spy()
    cy.mount(
      <ColorMixer
        {...testValue}
        {...testInputLabels}
        {...testScreenReaderLabels}
        onChange={onChange}
      />
    )

    cy.get(
      `[role="button"][aria-label="${testScreenReaderLabels.colorPaletteNavigationExplanationScreenReaderLabel}"]`
    )
      .as('palette')
      .find('[class*=-ColorPalette__indicator]')
      .as('indicator')
      .then(($indicator) => {
        const pos1 = $indicator[0].getBoundingClientRect().y

        cy.get('@palette').focus()

        cy.realPress('w').then(() => {
          const pos2 = $indicator[0].getBoundingClientRect().y
          expect(pos2).to.be.lessThan(pos1)

          cy.realPress('ArrowUp').then(() => {
            const pos3 = $indicator[0].getBoundingClientRect().y
            expect(pos3).to.be.lessThan(pos2)
          })
        })
      })
  })

  it('should palette indicator moves down when receive the ArrowDown or s keyboard event', () => {
    const onChange = cy.spy()
    cy.mount(
      <ColorMixer
        {...testValue}
        {...testInputLabels}
        {...testScreenReaderLabels}
        onChange={onChange}
      />
    )

    cy.get(
      `[role="button"][aria-label="${testScreenReaderLabels.colorPaletteNavigationExplanationScreenReaderLabel}"]`
    )
      .as('palette')
      .find('[class*=-ColorPalette__indicator]')
      .as('indicator')
      .then(($indicator) => {
        const pos1 = $indicator[0].getBoundingClientRect().y

        cy.get('@palette').focus()

        cy.realPress('s').then(() => {
          const pos2 = $indicator[0].getBoundingClientRect().y
          expect(pos2).to.be.greaterThan(pos1)

          cy.realPress('ArrowDown').then(() => {
            const pos3 = $indicator[0].getBoundingClientRect().y
            expect(pos3).to.be.greaterThan(pos2)
          })
        })
      })
  })

  it('should palette indicator moves left when receive the ArrowLeft or a keyboard event', () => {
    const onChange = cy.spy()
    cy.mount(
      <ColorMixer
        {...testValue}
        {...testInputLabels}
        {...testScreenReaderLabels}
        onChange={onChange}
      />
    )

    cy.get(
      `[role="button"][aria-label="${testScreenReaderLabels.colorPaletteNavigationExplanationScreenReaderLabel}"]`
    )
      .as('palette')
      .find('[class*=-ColorPalette__indicator]')
      .as('indicator')
      .then(($indicator) => {
        const pos1 = $indicator[0].getBoundingClientRect().x

        cy.get('@palette').focus()

        cy.realPress('a').then(() => {
          const pos2 = $indicator[0].getBoundingClientRect().x
          expect(pos2).to.be.lessThan(pos1)

          cy.realPress('ArrowLeft').then(() => {
            const pos3 = $indicator[0].getBoundingClientRect().x
            expect(pos3).to.be.lessThan(pos2)
          })
        })
      })
  })

  it('should palette indicator moves right when receive the ArrowRight or d keyboard event', () => {
    const onChange = cy.spy()
    cy.mount(
      <ColorMixer
        {...testValue}
        {...testInputLabels}
        {...testScreenReaderLabels}
        onChange={onChange}
      />
    )

    cy.get(
      `[role="button"][aria-label="${testScreenReaderLabels.colorPaletteNavigationExplanationScreenReaderLabel}"]`
    )
      .as('palette')
      .find('[class*=-ColorPalette__indicator]')
      .as('indicator')
      .then(($indicator) => {
        const pos1 = $indicator[0].getBoundingClientRect().x

        cy.get('@palette').focus()

        cy.realPress('d').then(() => {
          const pos2 = $indicator[0].getBoundingClientRect().x
          expect(pos2).to.be.greaterThan(pos1)

          cy.realPress('ArrowRight').then(() => {
            const pos3 = $indicator[0].getBoundingClientRect().x
            expect(pos3).to.be.greaterThan(pos2)
          })
        })
      })
  })

  it('should palette indicator does not move up when it reach the top border', () => {
    const onChange = cy.spy()
    cy.mount(
      <ColorMixer
        value={colorToHex8({ h: 200, s: 0.5, v: 1, a: 1 })}
        {...testInputLabels}
        {...testScreenReaderLabels}
        onChange={onChange}
      />
    )

    cy.get(
      `[role="button"][aria-label="${testScreenReaderLabels.colorPaletteNavigationExplanationScreenReaderLabel}"]`
    )
      .as('palette')
      .find('[class*=-ColorPalette__indicator]')
      .as('indicator')
      .then(($indicator) => {
        const pos1 = $indicator[0].getBoundingClientRect().y

        cy.get('@palette').focus()

        cy.realPress('w').then(() => {
          const pos2 = $indicator[0].getBoundingClientRect().y
          expect(pos2).to.equal(pos1)

          cy.realPress('ArrowUp').then(() => {
            const pos3 = $indicator[0].getBoundingClientRect().y
            expect(pos3).to.equal(pos1)
          })
        })
      })
  })

  it('should palette indicator does not move down when it reach the bottom border', () => {
    const onChange = cy.spy()
    cy.mount(
      <ColorMixer
        value={colorToHex8({ h: 200, s: 0.5, v: 0, a: 1 })}
        {...testInputLabels}
        {...testScreenReaderLabels}
        onChange={onChange}
      />
    )

    cy.get(
      `[role="button"][aria-label="${testScreenReaderLabels.colorPaletteNavigationExplanationScreenReaderLabel}"]`
    )
      .as('palette')
      .find('[class*=-ColorPalette__indicator]')
      .as('indicator')
      .then(($indicator) => {
        const pos1 = $indicator[0].getBoundingClientRect().y

        cy.get('@palette').focus()

        cy.realPress('s').then(() => {
          const pos2 = $indicator[0].getBoundingClientRect().y
          expect(pos2).to.equal(pos1)

          cy.realPress('ArrowDown').then(() => {
            const pos3 = $indicator[0].getBoundingClientRect().y
            expect(pos3).to.equal(pos1)
          })
        })
      })
  })

  it('should palette indicator does not move left when it reach the left border', () => {
    const onChange = cy.spy()
    cy.mount(
      <ColorMixer
        value={colorToHex8({ h: 200, s: 0, v: 0.5, a: 1 })}
        {...testInputLabels}
        {...testScreenReaderLabels}
        onChange={onChange}
      />
    )

    cy.get(
      `[role="button"][aria-label="${testScreenReaderLabels.colorPaletteNavigationExplanationScreenReaderLabel}"]`
    )
      .as('palette')
      .find('[class*=-ColorPalette__indicator]')
      .as('indicator')
      .then(($indicator) => {
        const pos1 = $indicator[0].getBoundingClientRect().x

        cy.get('@palette').focus()

        cy.realPress('a').then(() => {
          const pos2 = $indicator[0].getBoundingClientRect().x
          expect(pos2).to.equal(pos1)

          cy.realPress('ArrowLeft').then(() => {
            const pos3 = $indicator[0].getBoundingClientRect().x
            expect(pos3).to.equal(pos1)
          })
        })
      })
  })

  it('should palette indicator does not move right when it reach the right border', () => {
    const onChange = cy.spy()
    cy.mount(
      <ColorMixer
        value={colorToHex8({ h: 200, s: 1, v: 0.5, a: 1 })}
        {...testInputLabels}
        {...testScreenReaderLabels}
        onChange={onChange}
      />
    )

    cy.get(
      `[role="button"][aria-label="${testScreenReaderLabels.colorPaletteNavigationExplanationScreenReaderLabel}"]`
    )
      .as('palette')
      .find('[class*=-ColorPalette__indicator]')
      .as('indicator')
      .then(($indicator) => {
        const pos1 = $indicator[0].getBoundingClientRect().x

        cy.get('@palette').focus()

        cy.realPress('d').then(() => {
          const pos2 = $indicator[0].getBoundingClientRect().x
          expect(pos2).to.equal(pos1)

          cy.realPress('ArrowRight').then(() => {
            const pos3 = $indicator[0].getBoundingClientRect().x
            expect(pos3).to.equal(pos1)
          })
        })
      })
  })
})
