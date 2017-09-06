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
  const styles = function (theme) {
    return `
      .ThemeableComponent__root {
        color: ${theme.textColor};
        background-color: ${theme.backgroundColor};
      }
    `
  }
  styles.root = 'ThemeableComponent__root'

  @themeable(theme, styles)
  class ThemeableComponent extends React.Component {
    render () {
      return <div className={styles.root}>Hello World</div>
    }
  }

  const testbed = new Testbed(<ThemeableComponent />)

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
