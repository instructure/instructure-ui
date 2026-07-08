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

import { useState } from 'react'
import { expect } from 'chai'
import {
  InstUISettingsProvider,
  WithStyleProps,
  useStyleNew
} from '@instructure/emotion/src/index'

import '../support/component'
import 'cypress-real-events'

type Props = {
  inverse?: boolean
} & WithStyleProps<ComponentTheme>

type Theme = {
  key: string
  colors: {
    contrasts: {
      grey1111: string
      green4570: string
      blue4570: string
    }
  }
}

type ComponentTheme = {
  textColor: string
  textColorInverse: string
  backgroundColor: string
}

const grey1111 = 'rgb(0, 128, 0)'
const green4570 = 'rgb(10, 10, 10)'
const blue4570 = 'rgb(255, 255, 0)'
const exampleTheme: Theme = {
  key: 'exampleTheme',
  colors: {
    contrasts: {
      grey1111,
      green4570,
      blue4570
    }
  }
}

// `useStyleNew` calls this with `{ primitives, semantics, sharedTokens }` (the
// new theming system), not the legacy `{ colors: { contrasts } }` shape. This
// test only asserts the bi-directional polyfill, so the color values are
// arbitrary — return them statically rather than reading a removed theme shape.
const generateComponentTheme = function (): ComponentTheme {
  return {
    textColor: grey1111,
    textColorInverse: green4570,
    backgroundColor: blue4570
  }
}

type StyleParams = {
  inverse: boolean
  clearBackground: boolean
  themeOverride: Props['themeOverride']
}

const generateStyle = function (
  componentTheme: ComponentTheme,
  params: StyleParams
) {
  const { inverse, clearBackground } = params

  return {
    exampleComponent: {
      label: 'exampleComponent',
      color: componentTheme.textColor,
      background: componentTheme.backgroundColor,
      insetInlineStart: '8px',
      ...(inverse && { color: componentTheme.textColorInverse }),
      ...(clearBackground && { background: 'transparent' })
    }
  }
}

const ThemedComponent = ({ inverse = false, themeOverride }: Props) => {
  const [clearBackground, setClearBackground] = useState(false)

  const styles = useStyleNew({
    generateStyle,
    generateComponentTheme,
    componentId: 'ThemedComponent',
    params: { inverse, clearBackground, themeOverride }
  })

  const handleClick = () => {
    setClearBackground(true)
  }

  return (
    <div data-testid="useStyleNew-testComp" css={styles!.exampleComponent}>
      <p>Hello World</p>
      <button onClick={handleClick}>Button</button>
    </div>
  )
}

describe('useStyleNew should apply bi-directional polyfill on styles object', () => {
  it('in default "ltr" mode', () => {
    cy.mount(
      <InstUISettingsProvider theme={exampleTheme}>
        <ThemedComponent />
      </InstUISettingsProvider>
    )

    cy.get('[data-testid="useStyleNew-testComp"]').then(($el) => {
      const computedStyle = getComputedStyle($el[0])

      // `inset-inline-start` becomes 'left' in LTR mode
      expect(computedStyle.left).to.equal('8px')
      expect(computedStyle.right).to.equal('auto')
    })
  })

  it('in "rtl" mode', () => {
    cy.mount(
      <InstUISettingsProvider theme={exampleTheme} dir="rtl">
        <ThemedComponent />
      </InstUISettingsProvider>
    )
    cy.get('[data-testid="useStyleNew-testComp"]').then(($el) => {
      const computedStyle = getComputedStyle($el[0])

      // `inset-inline-start` should be transformed to 'right' in 'rtl' mode
      expect(computedStyle.left).to.equal('auto')
      expect(computedStyle.right).to.equal('8px')
    })
  })
})
