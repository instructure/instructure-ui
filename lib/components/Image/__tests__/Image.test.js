import Image from '../index'
import placeholderImage from 'mocks/util/placeholder-image'

describe('<Image />', function () {
  const testbed = createTestbed(Image, {
    src: placeholderImage(250, 250)
  })

  describe('for a11y', function () {
    it('should meet standards', function (done) {
      testbed.render()

      testbed.checkA11yStandards(done)
    })

    it('should render and empty alt attribute by default', function () {
      testbed.render()
      expect(testbed.dom.node.getAttribute('alt'))
        .to.exist
    })

    it('should render the provided alt attribute', function () {
      testbed.render({
        alt: 'Foo'
      })

      expect(testbed.dom.node.getAttribute('alt'))
        .to.equal('Foo')
    })
  })
})
