import findTabbable from '../findTabbable'

describe('findTabbable', () => {
  let container

  beforeEach(() => {
    container = document.createElement('div')
    container.innerHTML = `
      <a href="javascript://">Yep</a>
      <div>Nope</div>
      <div tabindex="1">Yep</div>
      <input type="text" value="Yep"/>
      <div>
        <button>Yep</button>
        <button style="display:none;">Nope</button>
      </div>
      <div style="width:0; height:0;">
        <button>Nope</button>
      </div>
    `
    document.body.appendChild(container)
  })

  afterEach(() => {
    if (container && container.parentNode) {
      container.parentNode.removeChild(container)
    }
  })

  it('should find tabbable descendants', () => {
    expect(findTabbable(container).length).to.equal(4)
  })

  it('should gracefully handle null', () => {
    expect(findTabbable(null).length).to.equal(0)
  })

  it('should gracefully handle non-element', () => {
    expect(findTabbable({}).length).to.equal(0)
  })
})
