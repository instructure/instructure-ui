import React from 'react'
import themeable from '../../../util/themeable'
import ApplyTheme from '../index'

describe('<ApplyTheme />', function () {
  const themeVariables = function () {
    return {
      textColor: 'red',
      backgroundColor: 'yellow'
    }
  }
  const themeStyles = '.root { color: map(Component, textColor); }'

  @themeable(themeVariables, themeStyles)
  class ThemeableComponent extends React.Component {
    render () {
      return <div className="root">Hello World</div>
    }
  }

  const testbed = createTestbed(ApplyTheme, {
    children: <ThemeableComponent/>
  })

  it('injects theme via context', function () {
    testbed.render({
      theme: {
        [ThemeableComponent.theme]: {
          textColor: 'green'
        }
      }
    })
    const themedComponent = testbed.findChildByType(ThemeableComponent)

    expect(themedComponent.theme.textColor).to.equal('green')
    expect(themedComponent.theme.backgroundColor).to.equal('yellow')
  })

  it('overrides the theme set via outer components and preserves defaults', function () {
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

    testbed.render({
      theme: outerTheme,
      children: <ApplyTheme theme={innerTheme}><ThemeableComponent /></ApplyTheme>
    })

    const themedComponent = testbed.findChildByType(ThemeableComponent)

    expect(themedComponent.theme.textColor).to.equal('blue')
    expect(themedComponent.theme.backgroundColor).to.equal('yellow') // default is preserved
  })
})
