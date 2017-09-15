import React from 'react'
import Image from '../index'
import styles from '../styles.css'
import Container from '../../Container'

describe('<Image />', () => {
  // eslint-disable-next-line max-len
  const image = 'data:image/gif;base64,R0lGODlhFAAUAJEAAP/9/fYQEPytrflWViH5BAAAAAAALAAAAAAUABQAQAJKhI+pGe09lnhBnEETfodatVHNh1BR+ZzH9LAOCYrVYpiAfWWJOxrC/5MASbyZT4d6AUIBlUYGoR1FsAXUuTN5YhxAEYbrpKRkQwEAOw=='

  const testbed = new Testbed(<Image src={image} />)

  describe('for a11y', () => {
    it('should meet standards', (done) => {
      const subject = testbed.render()

      subject.should.be.accessible(done)
    })

    it('should render an empty alt attribute by default', () => {
      const subject = testbed.render()

      expect(subject.find('[alt=""]')).to.be.present
    })

    it('should render the provided alt attribute', () => {
      const subject = testbed.render({ alt: 'Foo' })

      expect(subject.find('[alt="Foo"]')).to.be.present
    })

    it('should not allow padding to be added as a property', () => {
      const subject = testbed.render({
        padding: 'small medium large small'
      })
      expect(subject.find(Container).props().padding).to.not.exist
    })

    it('should render an overlay color', () => {
      const subject = testbed.render({
        overlay: {color: '#ff0000', opacity: 7}
      })
      const overlay = subject.find(`.${styles.overlay}`)
      expect(overlay).to.be.present
    })

    it('should render a blur filter', () => {
      const subject = testbed.render({
        blur: true
      })
      expect(subject.getComputedStyle().getPropertyValue('filter')).to.contain('blur')
    })

    it('should render a grayscale filter', () => {
      const subject = testbed.render({
        grayscale: true
      })
      expect(subject.getComputedStyle().getPropertyValue('filter')).to.contain('grayscale')
    })
  })
})
