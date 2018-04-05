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
import themeable from '../themeable'
import { makeThemeContext } from '../ThemeContextTypes'

describe('@themeable', () => {
  const theme = function () {
    return {
      textColor: 'rgb(0, 128, 0)',
      backgroundColor: 'rgb(255, 255, 0)'
    }
  }
  const styles = {
    template: function (theme) {
      return `
        .ThemeableComponent__root {
          color: ${theme.textColor};
          background-color: ${theme.backgroundColor};
        }
      `
    },
    root: 'ThemeableComponent__root'
  }

  @themeable(theme, styles)
  class ThemeableComponent extends React.Component {
    render () {
      return <div className={styles.root}>Hello World</div>
    }
  }

  const testbed = new Testbed(<ThemeableComponent />)

  it('generates a valid component scope', () => { // for IE/Edge
    const component = testbed.render().instance()
    expect(() => { document.querySelector(`#${component.scope}`) }).to.not.throw(Error)
  })

  it('allows configuration through props', () => {
    const theme = {
      textColor: 'purple'
    }
    const component = testbed.render({ theme }).instance()

    expect(component.theme.textColor).to.equal('purple')
    expect(component.theme.backgroundColor).to.equal('rgb(255, 255, 0)')
  })

  it('allows configuration through context', () => {
    const context = makeThemeContext({
      [ThemeableComponent.theme]: {
        textColor: 'green',
        backgroundColor: 'yellow'
      }
    })
    const theme = {
      textColor: 'purple'
    }

    const component = testbed.render({ theme }, context).instance()

    expect(component.theme.textColor).to.equal('purple')
    expect(component.theme.backgroundColor).to.equal('yellow')
  })

  it('falls back to the default theme', () => {
    const component = testbed.render().instance()

    expect(component.theme.backgroundColor).to.equal('rgb(255, 255, 0)')
    expect(component.theme.textColor).to.equal('rgb(0, 128, 0)')
  })

  it('applies theme css variables to the root node', () => {
    const theme = {
      textColor: 'purple'
    }
    const component = testbed.render({ theme })

    expect(component.getComputedStyle().getPropertyValue(`--${ThemeableComponent.componentId}-textColor`))
      .to.equal('purple')
  })

  it('updates css variables when props are updated', (done) => {
    const theme = {
      textColor: 'purple'
    }
    const component = testbed.render()

    component.setProps({ theme }, () => {
      expect(component.getComputedStyle().getPropertyValue(`--${ThemeableComponent.componentId}-textColor`))
        .to.equal('purple')
      done()
    })
  })
})
