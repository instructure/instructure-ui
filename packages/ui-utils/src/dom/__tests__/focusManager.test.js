import FocusManager from '../focusManager'

describe('focusManager', () => {
  const focusManager = new FocusManager()
  let container
  let handleWindowFocus

  beforeEach(() => {
    container = document.createElement('div')
    container.innerHTML = `
      <input class="focusManager--ONE" />
      <input class="focusManager--TWO" />
    `

    document.body.appendChild(container)
  })

  afterEach(() => {
    if (container && container.parentNode) {
      container.parentNode.removeChild(container)
    }

    focusManager.teardownScopedFocus()
    window.removeEventListener('focus', handleWindowFocus)
  })

  it('should manage focus', () => {
    const one = document.querySelector('.focusManager--ONE')
    const two = document.querySelector('.focusManager--TWO')

    one.focus()

    expect(document.activeElement).to.equal(one)

    focusManager.markForFocusLater()

    two.focus()

    expect(document.activeElement).to.equal(two)

    focusManager.returnFocus()

    expect(document.activeElement).to.equal(one)
  })

  // TODO Need to figure out how to properly trigger window.focus/blur
  // it('should scope focus after window blur', function (done) {
  //   const one = document.querySelector('.focusManager--ONE')
  //
  //   focusManager.setupScopedFocus(container)
  //
  //   window.blur()
  //
  //   expect(document.activeElement).to.equal(document.body)
  //
  //   handleWindowFocus = function () {
  //     setTimeout(function () {
  //       expect(document.activeElement).to.equal(one)
  //       done()
  //     }, 0)
  //   }
  //
  //   window.addEventListener('focus', handleWindowFocus)
  //   window.focus()
  // })
})
