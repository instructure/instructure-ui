import findTabbable from '../findTabbable'

describe('findTabbable', function () {
  let container

  beforeEach(function () {
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

  afterEach(function () {
    if (container && container.parentNode) {
      container.parentNode.removeChild(container)
    }
  })

  it('should find tabbable descendants', function () {
    expect(findTabbable(container).length).to.equal(4)
  })

  it('should gracefully handle null', function () {
    expect(findTabbable(null).length).to.equal(0)
  })

  it('should gracefully handle non-element', function () {
    expect(findTabbable({}).length).to.equal(0)
  })
})
