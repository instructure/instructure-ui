import React from 'react'
import Avatar from '../index'

import styles from '../styles.css'

describe('<Avatar />', () => {
  const testbed = new Testbed(<Avatar name="Jessica Jones" />)

  describe('for a11y', () => {
    it('should meet standards', (done) => {
      const subject = testbed.render()

      subject.should.be.accessible(done)
    })

    it('should have aria-hidden=true', () => {
      const subject = testbed.render()

      expect(subject.find('[aria-hidden]')).to.be.present
    })
  })

  describe('with the default props', () => {
    it('should should display as a circle', () => {
      const subject = testbed.render()

      expect(subject.hasClass(styles.circle)).to.be.true
    })

    it('should render initials', () => {
      const subject = testbed.render()

      expect(subject.text())
        .to.equal('JJ')
    })
  })

  describe('when an image src url is provided', () => {
    it('should display the image url provided', () => {
      // eslint-disable-next-line max-len
      const image = 'data:image/gif;base64,R0lGODlhFAAUAJEAAP/9/fYQEPytrflWViH5BAAAAAAALAAAAAAUABQAQAJKhI+pGe09lnhBnEETfodatVHNh1BR+ZzH9LAOCYrVYpiAfWWJOxrC/5MASbyZT4d6AUIBlUYGoR1FsAXUuTN5YhxAEYbrpKRkQwEAOw=='

      const subject = testbed.render({
        src: image
      })

      expect(subject.getComputedStyle().getPropertyValue('background-image'))
        .to.contain(image)
    })
  })

  describe('when variant is set to "rectangle"', () => {
    it('should display as a rectangle', () => {
      const subject = testbed.render({
        variant: 'rectangle'
      })

      expect(subject.hasClass(styles.rectangle)).to.be.true
    })
  })

  describe('when the user name has no spaces', () => {
    it('should render a single initial', () => {
      const subject = testbed.render({
        name: 'Jessica'
      })

      expect(subject.text()).to.equal('J')
    })
  })

  describe('when the user name has leading spaces', () => {
    it('should skip them', () => {
      const subject = testbed.render({
        name: ' Jessica Jones'
      })

      expect(subject.text()).to.equal('JJ')
    })
  })

  describe('when the user name is empty', () => {
    it('should render', () => {
      const subject = testbed.render({
        name: ''
      })

      expect(subject.text()).to.equal('')
    })
  })

  describe('when alt text is provided', () => {
    it('should render the text as an aria-label attribute', () => {
      const subject = testbed.render({alt: 'This is a test'})
      expect(subject.find('[aria-label]').getAttribute('aria-label')).to.equal('This is a test')
    })

    it('should set the role attribute to img', () => {
      const subject = testbed.render({alt: 'This is a test'})
      expect(subject.find('[role]').getAttribute('role')).to.equal('img')
    })
  })
})
