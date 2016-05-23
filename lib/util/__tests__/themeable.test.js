import React from 'react'
import themeable from '../themeable'

describe('@themeable', function () {
  const themeVariables = function () {
    return {
      textColor: 'black',
      backgroundColor: 'white'
    }
  }
  const themeStyles =
    '.root { color: map(ThemeableComponent, textColor); background-color: map(ThemeableComponent, backgroundColor); }'

  @themeable(themeVariables, themeStyles)
  class ThemeableComponent extends React.Component {
    render () {
      return <div className="root">Hello World</div>
    }
  }

  const testbed = createTestbed(<ThemeableComponent />)

  it('allows configuration through props', function () {
    const theme = {
      textColor: 'purple'
    }
    const component = testbed.render({ theme }).unwrap()

    expect(component.theme.textColor).to.equal('purple')
    expect(component.theme.backgroundColor).to.equal('white')
  })

  it('falls back to default theme', function () {
    const component = testbed.render().unwrap()

    expect(component.theme.backgroundColor).to.equal('white')
    expect(component.theme.textColor).to.equal('black')
  })
})
