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
import { expect, mount, stub } from '@instructure/ui-test-utils'

import { themeable } from '../themeable'
import { ThemeContext } from '../ThemeContext'
import { createThemeAdapter } from '../createThemeAdapter'

describe('@themeable', async () => {
  const theme = function () {
    return {
      textColor: 'rgb(0, 128, 0)',
      backgroundColor: 'rgb(255, 255, 0)'
    }
  }
  const styles = {
    componentId: 'fooblah',
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

  class ExampleComponent extends React.Component {
    render() {
      return (
        <div className={styles.root} data-scope={this.scope}>
          Hello World
        </div>
      )
    }
  }

  const ThemeableComponent = themeable(theme, styles)(ExampleComponent)

  it('generates a valid component scope', async () => {
    // for IE/Edge
    const subject = await mount(<ThemeableComponent />)
    const scope = subject.getDOMNode().getAttribute('data-scope')

    expect(scope).to.exist()
    expect(scope).to.include('ExampleComponent')
  })

  it('allows configuration through props', async () => {
    const theme = {
      textColor: 'purple'
    }
    const subject = await mount(<ThemeableComponent theme={theme} />)
    const component = subject.getDOMNode()

    expect(getComputedStyle(component).color).to.equal('rgb(128, 0, 128)') // purple
    expect(getComputedStyle(component).backgroundColor).to.equal(
      'rgb(255, 255, 0)'
    ) // yellow
  })

  it('ignores empty theme props', async () => {
    const subject = await mount(<ThemeableComponent theme={{}} />)
    const component = subject.getDOMNode()

    expect(getComputedStyle(component).color).to.equal('rgb(0, 128, 0)') // green
    expect(getComputedStyle(component).backgroundColor).to.equal(
      'rgb(255, 255, 0)'
    ) // yellow
  })

  it('allows configuration through context', async () => {
    const context = ThemeContext.makeThemeContext({
      [ThemeableComponent.theme]: {
        textColor: 'green',
        backgroundColor: 'yellow'
      }
    })
    const theme = {
      textColor: 'purple'
    }
    const subject = await mount(<ThemeableComponent theme={theme} />, context)
    const component = subject.getDOMNode()

    expect(getComputedStyle(component).color).to.equal('rgb(128, 0, 128)') // purple
    expect(getComputedStyle(component).backgroundColor).to.equal(
      'rgb(255, 255, 0)'
    ) // yellow
  })

  it('falls back to the default theme', async () => {
    const subject = await mount(<ThemeableComponent />)
    const component = subject.getDOMNode()

    expect(getComputedStyle(component).color).to.equal('rgb(0, 128, 0)') // green
    expect(getComputedStyle(component).backgroundColor).to.equal(
      'rgb(255, 255, 0)'
    ) // yellow
  })

  it('applies theme css variables to the root node', async () => {
    const theme = {
      textColor: 'purple'
    }
    const subject = await mount(<ThemeableComponent theme={theme} />)
    const component = subject.getDOMNode()

    expect(
      getComputedStyle(component).getPropertyValue(
        `--${ThemeableComponent.componentId}-textColor`
      )
    ).to.equal('purple')
  })

  it('updates css variables when props are updated', async () => {
    const theme = {
      textColor: 'purple'
    }
    const subject = await mount(<ThemeableComponent />)
    const component = subject.getDOMNode()

    await subject.setProps({ theme })
    expect(
      getComputedStyle(component).getPropertyValue(
        `--${ThemeableComponent.componentId}-textColor`
      )
    ).to.equal('purple')
  })

  it('allows for overrides using the same name when an adapter is specified', async () => {
    stub(console, 'warn')

    const originalTheme = {
      textColor: 'orange'
    }

    const map = {
      contentColor: 'textColor'
    }

    const adapter = createThemeAdapter({ map, version: '20.0.0' })

    const ThemeableAdapterComponent = themeable(
      originalTheme,
      styles,
      adapter
    )(ExampleComponent)

    const subject = await mount(
      <ThemeableAdapterComponent theme={{ textColor: 'blue' }} />
    )
    const component = subject.getDOMNode()

    expect(
      getComputedStyle(component).getPropertyValue(
        `--${ThemeableComponent.componentId}-textColor`
      )
    ).to.equal('blue')
  })

  it('allows for overrides of a different name when an adapter is specified', async () => {
    stub(console, 'warn')

    const originalTheme = {
      textColor: 'orange'
    }

    const map = {
      contentColor: 'textColor'
    }

    const adapter = createThemeAdapter({ map, version: '20.0.0' })

    const ThemeableAdapterComponent = themeable(
      originalTheme,
      styles,
      adapter
    )(ExampleComponent)

    const subject = await mount(
      <ThemeableAdapterComponent theme={{ contentColor: 'blue' }} />
    )
    const component = subject.getDOMNode()

    expect(
      getComputedStyle(component).getPropertyValue(
        `--${ThemeableComponent.componentId}-textColor`
      )
    ).to.equal('blue')
  })
})
