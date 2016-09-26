import React from 'react'
import themeable from '../themeable'
import { makeThemeContext } from '../ThemeContextTypes'

describe('@themeable', function () {
  const theme = function () {
    return {
      textColor: 'rgb(0, 128, 0)',
      backgroundColor: 'rgb(255, 255, 0)'
    }
  }
  const styles = {
    root: 'ThemeableComponent__root',
    _cssText:
      `.ThemeableComponent__root {
        color: var(--ThemeableComponent-textColor);
        background-color: var(--ThemeableComponent-backgroundColor);
      }`
  }

  @themeable(theme, styles)
  class ThemeableComponent extends React.Component {
    render () {
      return <div className={styles.root}>Hello World</div>
    }
  }

  const testbed = createTestbed(<ThemeableComponent />)

  it('allows configuration through props', function () {
    const theme = {
      textColor: 'purple'
    }
    const component = testbed.render({ theme }).unwrap()

    expect(component.theme.textColor).to.equal('purple')
    expect(component.theme.backgroundColor).to.equal('rgb(255, 255, 0)')
  })

  it('allows configuration through context', function () {
    const context = makeThemeContext({}, {
      [ThemeableComponent.theme]: {
        textColor: 'green',
        backgroundColor: 'yellow'
      }
    })
    const theme = {
      textColor: 'purple'
    }

    const component = testbed.render({ theme }, context).unwrap()

    expect(component.theme.textColor).to.equal('purple')
    expect(component.theme.backgroundColor).to.equal('yellow')
  })

  it('falls back to the default theme', function () {
    const component = testbed.render().unwrap()

    expect(component.theme.backgroundColor).to.equal('rgb(255, 255, 0)')
    expect(component.theme.textColor).to.equal('rgb(0, 128, 0)')
  })

  it('applies theme css variables to the root node', function () {
    const theme = {
      textColor: 'purple'
    }
    const component = testbed.render({ theme })

    expect(component.getPropertyValue('--ThemeableComponent-textColor'))
      .to.equal('purple')
  })

  it('updates css variables when props are updated', function () {
    const theme = {
      textColor: 'purple'
    }
    const component = testbed.render()

    component.props({ theme })

    expect(component.getPropertyValue('--ThemeableComponent-textColor'))
      .to.equal('purple')
  })

  it('injects styles into the document', function () {
    const component = testbed.render()

    const styleNode = document.querySelector('style[id*="ThemeableComponent__"]')
    const styles = window.getComputedStyle(component.dom())

    expect(styleNode).to.exist

    expect(styles.color).to.equal('rgb(0, 128, 0)')
    expect(styles.backgroundColor).to.equal('rgb(255, 255, 0)')
  })
})
