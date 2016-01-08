import Avatar from '../index'
import placeholderImage from 'mocks/util/placeholder-image'

describe('Avatar', function () {
  const testbed = createTestbed(Avatar, {
    userName: 'Jessica Jones'
  })

  describe('for a11y', function () {
    it('should meet standards', function (done) {
      testbed.render()

      testbed.checkA11yStandards(done)
    })

    it('should have aria-hidden=true', function () {
      testbed.render()

      expect(testbed.dom.node.getAttribute('aria-hidden'))
        .to.equal('true')
    })
  })

  describe('with the default props', function () {
    it('should should display as a circle', function () {
      testbed.render()

      expect(testbed.dom.node.className)
        .to.contain('circle')
    })

    it('should render initials', function () {
      testbed.render()

      expect(testbed.dom.node.textContent.trim())
        .to.equal('JJ')
    })
  })

  describe('when an image url is provided', function () {
    it('should display the image url provided', function () {
      const image = placeholderImage(250, 250)
      testbed.render({
        userImgUrl: image
      })

      expect(testbed.dom.node.style.backgroundImage)
        .to.contain(image)
    })
  })

  describe('when shape is set to "rectangle"', function () {
    it('should display as a rectangle', function () {
      testbed.render({
        shape: 'rectangle'
      })

      expect(testbed.dom.node.className)
        .to.contain('rectangle')
    })
  })

  describe('when the user name has no spaces', function () {
    it('should render a single initial', function () {
      testbed.render({
        userName: 'Jessica'
      })

      expect(testbed.dom.node.textContent.trim())
        .to.equal('J')
    })
  })
})
