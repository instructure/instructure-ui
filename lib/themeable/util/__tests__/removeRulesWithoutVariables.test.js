import removeRulesWithoutVariables from '../removeRulesWithoutVariables'

describe('removeRulesWithoutVariables', function () {
  it('removes rules without variables from css text', function () {
    const cssText = `.Component__root {
        color: blue;
        background-color: var(--Component-backgroundColor);
      }`

    expect(removeRulesWithoutVariables(cssText))
      .to.equalIgnoreSpaces(`.Component__root {
        background-color: var(--Component-backgroundColor);
      }`)
  })
})
