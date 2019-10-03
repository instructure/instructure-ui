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
import PropTypes from 'prop-types'
import { expect, mount, within } from '@instructure/ui-test-utils'

import { themeable } from '../themeable'
import { ThemeContext } from '../ThemeContext'

describe('@themeable', async () => {
  const theme = function (variables, props = {}) {
    const { textColor, backgroundColor } = props

    return {
      textColor: textColor ? textColor : 'rgb(0, 128, 0)',
      backgroundColor: backgroundColor ? backgroundColor : 'rgb(255, 255, 0)'
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
    static propTypes = {
      children: PropTypes.node
    }

    static defaultProps = {
      children: 'Hello World'
    }

    render () {
      return (
        <div className={styles.root} data-scope={this.scope}>
          {this.props.children}
        </div>
      )
    }
  }

  const ThemeableComponent = themeable(theme, styles)(ExampleComponent)

  it('generates a valid component scope', async () => { // for IE/Edge
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
    expect(getComputedStyle(component).backgroundColor).to.equal('rgb(255, 255, 0)') // yellow
  })

  it('ignores empty theme props', async () => {
    const subject = await mount(<ThemeableComponent theme={{}} />)
    const component = subject.getDOMNode()

    expect(getComputedStyle(component).color).to.equal('rgb(0, 128, 0)') // green
    expect(getComputedStyle(component).backgroundColor).to.equal('rgb(255, 255, 0)') // yellow
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
    expect(getComputedStyle(component).backgroundColor).to.equal('rgb(255, 255, 0)') // yellow
  })

  it('falls back to the default theme', async () => {
    const subject = await mount(<ThemeableComponent />)
    const component = subject.getDOMNode()

    expect(getComputedStyle(component).color).to.equal('rgb(0, 128, 0)') // green
    expect(getComputedStyle(component).backgroundColor).to.equal('rgb(255, 255, 0)') // yellow
  })

  it('Passes component props to the theme', async () => {
    const textColor = 'rgb(128, 0, 128)' // purple
    const backgroundColor = 'rgb(255, 165, 0)' // orange

    const subject = await mount(<ThemeableComponent textColor={textColor} backgroundColor={backgroundColor} />)
    const component = subject.getDOMNode()

    expect(getComputedStyle(component).color).to.equal(textColor)
    expect(getComputedStyle(component).backgroundColor).to.equal(backgroundColor)
  })

  it('Passes component props to the theme when it is passed via props functionally', async () => {
    const textColor = 'rgb(128, 0, 128)' // purple
    const backgroundColor = 'rgb(255, 165, 0)' // orange

    const subject = await mount(
      <ThemeableComponent
        variant="default"
        theme={(vars, props) => ({
          textColor: props.variant === 'default' ? textColor : 'rgb(0, 128, 0)',
          backgroundColor: props.variant === 'default' ? backgroundColor : 'rgb(255, 255, 0)'
        })}
      />
    )
    const component = subject.getDOMNode()

    expect(getComputedStyle(component).color).to.equal(textColor)
    expect(getComputedStyle(component).backgroundColor).to.equal(backgroundColor)
  })

  it('Allows for configuration through theme prop even when component props are used in the theme', async () => {
    const textColor = 'rgb(238, 130, 238)' // violet
    const backgroundColor = 'rgb(255, 253, 208)' // cream

    const subject = await mount(
      <ThemeableComponent
        textColor="rgb(128, 0, 128)"
        backgroundColor="rgb(255, 165, 0)"
        theme={{
          textColor,
          backgroundColor
        }}
      />
    )
    const component = subject.getDOMNode()

    expect(getComputedStyle(component).color).to.equal(textColor)
    expect(getComputedStyle(component).backgroundColor).to.equal(backgroundColor)
  })

  it('Should scope the theme variables to multiple instances of the same component with different props set', async () => {
    const textColorViolet = 'rgb(238, 130, 238)' // violet
    const textColorOrange = 'rgb(255, 165, 0)' // orange

    const violetChildren = 'Violet Text'
    const orangeChildren = 'Orange Text'

    const subject = await mount(
      <div>
        <ThemeableComponent textColor={textColorViolet}>{violetChildren}</ThemeableComponent>
        <ThemeableComponent textColor={textColorOrange}>{orangeChildren}</ThemeableComponent>
      </div>
    )

    const container = within(subject.getDOMNode())
    const violetNode = await container.find(`:withText(${violetChildren})`)
    const orangeNode = await container.find(`:withText(${orangeChildren})`)

    expect(getComputedStyle(violetNode.getDOMNode()).color).to.equal(textColorViolet)
    expect(getComputedStyle(orangeNode.getDOMNode()).color).to.equal(textColorOrange)
  })

  it('applies theme css variables to the root node', async () => {
    const theme = {
      textColor: 'purple'
    }
    const subject = await mount(<ThemeableComponent theme={theme} />)
    const component = subject.getDOMNode()

    expect(getComputedStyle(component).getPropertyValue(`--${ThemeableComponent.componentId}-textColor`)).to.equal('purple')
  })

  it('updates css variables when props are updated', async () => {
    const theme = {
      textColor: 'purple'
    }
    const subject = await mount(<ThemeableComponent />)
    const component = subject.getDOMNode()

    await subject.setProps({theme})
    expect(getComputedStyle(component).getPropertyValue(`--${ThemeableComponent.componentId}-textColor`)).to.equal('purple')
  })
})
