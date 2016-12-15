import applyVariablesToCss from '../applyVariablesToCss'

describe('applyVariablesToCss', function () {
  it('replaces variables with values', function () {
    const cssText = `
      .Component__root {
        color: var(--Component-textColor);
        padding: var(--Component-paddingVertical) var(--Component-paddingHorizontal);
      }
      .Component__background {
        background-color: var(--Component-backgroundColor);
      }
      @keyframes animation {
        to {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }
      }
      @media screen and (--Component-tabletMin) {
        .Component__root {
          color: var(--Component-textColor);
        }
      }
    `

    const variables = {
      '--Component-textColor': 'red',
      '--Component-backgroundColor': 'purple',
      '--Component-paddingHorizontal': '1em',
      '--Component-paddingVertical': '0.5em'
    }

    const result = applyVariablesToCss(cssText, variables)

    expect(result).to.equalIgnoreSpaces(`
      .Component__root {
        color: red;
        padding: 0.5em 1em;
      }
      .Component__background {
        background-color: purple;
      }
      @keyframes animation {
        to {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }
      }
      @media screen and (--Component-tabletMin) {
        .Component__root {
          color: red;
        }
      }
    `)
  })
})
