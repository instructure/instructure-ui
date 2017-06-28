import React from 'react'
import themeable from '../../../themeable'
import ApplyTheme from '../index'

describe('<ApplyTheme />', () => {
  const themeVariables = function () {
    return {
      textColor: 'red',
      backgroundColor: 'yellow'
    }
  }

  const themeStyles = function (theme) {
    return `
      .root { color: ${theme.textColor}; }
    `
  }

  @themeable(themeVariables, themeStyles)
  class ThemeableComponent extends React.Component {
    render () {
      return <div className="root">Hello World</div>
    }
  }

  const testbed = new Testbed(
    <ApplyTheme>
      <ThemeableComponent />
    </ApplyTheme>
  )

  it('injects theme via context', () => {
    const subject = testbed.render({
      theme: {
        [ThemeableComponent.theme]: {
          textColor: 'green'
        }
      }
    })

    const themedComponent = subject.find(ThemeableComponent).unwrap()

    expect(themedComponent.theme.textColor).to.equal('green')
    expect(themedComponent.theme.backgroundColor).to.equal('yellow')
  })

  it('overrides the theme set via outer components', () => {
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

    const subject = testbed.render({
      theme: outerTheme,
      children: <ApplyTheme theme={innerTheme}><ThemeableComponent /></ApplyTheme>
    })

    const themedComponent = subject.find(ThemeableComponent).unwrap()

    expect(themedComponent.theme.textColor).to.equal('blue')
    expect(themedComponent.theme.backgroundColor).to.equal('grey')
  })
})
