import removeVariablesFromCss from '../removeVariablesFromCss'

describe('removeVariablesFromCss', function () {
  it('removes variables from css text', function () {
    const cssText = `
      :root {
        --Component-textColor: blue;
        --Component-backgroundColor: yellow;
      }

      .Component__root {
        color: var(--Component-textColor);
        background-color: var(--Component-backgroundColor);
      }

      .Component__element {
        color: red;
      }`

    expect(removeVariablesFromCss(cssText))
      .to.equalIgnoreSpaces(`
      .Component__element {
        color: red;
      }`)
  })
})
