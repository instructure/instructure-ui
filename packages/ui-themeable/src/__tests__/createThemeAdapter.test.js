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

import { expect, stub } from '@instructure/ui-test-utils'
import { createThemeAdapter } from '../createThemeAdapter'

describe('createThemeAdapter', () => {
  const map = {
    originalColor: 'updatedColor',
    originalFont: 'updatedFont',
    originalBorder: 'updatedBorder'
  }

  const displayName = 'SomeComponent'

  const version = '20.0.0'

  describe('updating themes', () => {
    beforeEach(() => {
      stub(console, 'warn')
    })

    it('does not modify the theme object when none of the keys match', () => {
      const theme = {
        background: 'orange',
        boxShadow: 'none',
        font: 'comic-sans'
      }

      const updatedTheme = createThemeAdapter({ map, version })({ theme, displayName })

      expect(theme).to.deep.equal(updatedTheme)
    })

    it('updates when all theme keys match the map', () => {
      const theme = {
        originalColor: 'orange',
        originalFont: 'comic-sans',
        originalBorder: 'none'
      }

      const updatedTheme = createThemeAdapter({ map, version })({ theme, displayName })

      const expectedTheme = {
        updatedColor: 'orange',
        updatedFont: 'comic-sans',
        updatedBorder: 'none'
      }

      expect(updatedTheme).to.deep.equal(expectedTheme)
    })

    it('updates when only some theme keys match the map', () => {
      const theme = {
        updatedPadding: 'large',
        originalColor: 'orange',
        originalFont: 'comic-sans',
        updatedMargin: 'small'
      }

      const updatedTheme = createThemeAdapter({ map, version })({ theme, displayName })

      const expectedTheme = {
        updatedPadding: 'large',
        updatedColor: 'orange',
        updatedFont: 'comic-sans',
        updatedMargin: 'small'
      }

      expect(updatedTheme).to.deep.equal(expectedTheme)
    })

    it('should not modify a theme that already has updated keys', () => {
      const theme = {
        updatedColor: 'orange',
        updatedFont: 'comic-sans',
        updatedBorder: 'none'
      }

      const updatedTheme = createThemeAdapter({ map, version })({ theme, displayName })

      expect(theme).to.deep.equal(updatedTheme)
    })

    it('should include old values when `shouldIncludeOldValues` option is set', () => {
      const theme = {
        originalColor: 'orange',
        originalFont: 'comic-sans',
        originalBorder: 'none'
      }

      const updatedTheme = createThemeAdapter({ map, version, shouldIncludeOldValues: true })({ theme, displayName })

      const expectedTheme = {
        originalColor: 'orange',
        originalFont: 'comic-sans',
        originalBorder: 'none',
        updatedColor: 'orange',
        updatedFont: 'comic-sans',
        updatedBorder: 'none'
      }

      expect(updatedTheme).to.deep.equal(expectedTheme)
    })
  })

  describe('mapping a single variable to multiple values', () => {
    it('should map a single old variable to multiple new variables when entry in map is an array', () => {
      const theme = {
        fontFamily: 'papyrus'
      }

      const map = {
        fontFamily: [
          'fontFamily1',
          'fontFamily2',
          'fontFamily3'
        ]
      }

      const updatedTheme = createThemeAdapter({ map, version })({ theme, displayName })

      const expectedTheme = {
        fontFamily1: 'papyrus',
        fontFamily2: 'papyrus',
        fontFamily3: 'papyrus'
      }

      expect(updatedTheme).to.deep.equal(expectedTheme)
    })

    it('should preserve the original value when doing this mapping and `shouldIncludeOldValues` is set', () => {
      const theme = {
        fontFamily: 'papyrus'
      }

      const map = {
        fontFamily: [
          'fontFamily1',
          'fontFamily2',
          'fontFamily3'
        ]
      }

      const updatedTheme = createThemeAdapter({ map, version, shouldIncludeOldValues: true })({ theme, displayName })

      const expectedTheme = {
        fontFamily: 'papyrus',
        fontFamily1: 'papyrus',
        fontFamily2: 'papyrus',
        fontFamily3: 'papyrus'
      }

      expect(updatedTheme).to.deep.equal(expectedTheme)
    })
  })

  describe('warnings', () => {
    it('should not warn when keys are already updated', () => {
      const theme = {
        updatedColor: 'orange',
        updatedFont: 'comic-sans',
        updatedBorder: 'none'
      }

      const warningStub = stub(console, 'warn')

      createThemeAdapter({ map, version })({ theme, displayName })

      expect(warningStub).to.not.have.been.called()
    })

    it('should warn with the correct display name and version', () => {
      const theme = {
        originalColor: 'orange',
      }

      const warningStub = stub(console, 'warn')

      createThemeAdapter({ map, version })({ theme, displayName })

      const warning = warningStub.lastCall.args[0]

      const expectedWarning = `[${displayName}] The theme variable \`originalColor\` has been changed to \`updatedColor\`. In version ${version}, \`originalColor\` will no longer work as an override.`

      expect(warning).to.include(expectedWarning)
    })
  })

  it('should warn each time it encounters a key that needs to be updated', () => {
    const theme = {
      originalColor: 'orange',
      originalFont: 'comic-sans',
      originalBorder: 'none'
    }

    const warningStub = stub(console, 'warn')

    createThemeAdapter({ map, version })({ theme, displayName })

    expect(warningStub).to.have.been.calledThrice()
  })
})