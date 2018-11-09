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
import { expect, mount, locator } from '@instructure/ui-test-utils'
import testable from '@instructure/ui-testable'
import themeable from '../../../themeable'

import ApplyTheme from '../index'

describe('<ApplyTheme />', async () => {
  const themeVariables = function () {
    return {
      textColor: 'red',
      backgroundColor: 'yellow'
    }
  }

  const themeStyles = {
    template: function (theme) {
      return `
        .root { color: ${theme.textColor}; background: ${theme.backgroundColor}; }
      `
    }
  }
  @testable()
  @themeable(themeVariables, themeStyles)
  class ThemeableComponent extends React.Component {
    render () {
      return <div className="root">Hello World</div>
    }
  }

  const ThemeableComponentLocator = locator(ThemeableComponent.locator)

  it('injects theme via context', async () => {
    const theme = {
      [ThemeableComponent.theme]: {
        textColor: 'green'
      }
    }
    await mount(
      <ApplyTheme theme={theme}>
        <ThemeableComponent />
      </ApplyTheme>
    )

    const component = await ThemeableComponentLocator.find()

    expect(component.getComputedStyle().color).to.equal('rgb(0, 128, 0)') // green
    expect(component.getComputedStyle().backgroundColor).to.equal('rgb(255, 255, 0)') // yellow
  })

  it('overrides the theme set via outer components', async () => {
    const outerTheme = {
      [ThemeableComponent.theme]: {
        textColor: 'green',
        backgroundColor: 'grey'
      }
    }
    const innerTheme = {
      [ThemeableComponent.theme]: {
        textColor: 'blue'
      }
    }
    await mount(
      <ApplyTheme theme={outerTheme}>
        <ApplyTheme theme={innerTheme}>
          <ThemeableComponent />
        </ApplyTheme>
      </ApplyTheme>
    )

    const component = await ThemeableComponentLocator.find()

    expect(component.getComputedStyle().color).to.equal('rgb(0, 0, 255)') // blue
    expect(component.getComputedStyle().backgroundColor).to.equal('rgb(128, 128, 128)') // grey
  })
})
