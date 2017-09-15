import React from 'react'
import Media from '../index'
import Container from '../../Container'
import Image from '../../Image'

describe('<Media />', () => {
  // eslint-disable-next-line max-len
  const image = 'data:image/gif;base64,R0lGODlhFAAUAJEAAP/9/fYQEPytrflWViH5BAAAAAAALAAAAAAUABQAQAJKhI+pGe09lnhBnEETfodatVHNh1BR+ZzH9LAOCYrVYpiAfWWJOxrC/5MASbyZT4d6AUIBlUYGoR1FsAXUuTN5YhxAEYbrpKRkQwEAOw=='

  const testbed = new Testbed(
    <Media
      title="Hello World"
      description="Test Image"
    >
      <Image src={image} />
    </Media>
  )

  it('should render', () => {
    const subject = testbed.render()

    expect(subject).to.be.present
  })

  it('should not allow padding to be added as a property', () => {
    const subject = testbed.render({
      padding: 'large small medium large'
    })
    expect(subject.find(Container).first().props().padding).to.not.exist
  })

  it('should meet a11y standards', (done) => {
    const subject = testbed.render()

    subject.should.be.accessible(done, {
      ignores: [ ]
    })
  })
})
