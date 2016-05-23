import React from 'react'
import UserCard from '../index'
import Heading from '../../Heading'
import Avatar from '../../Avatar'
import MetricsList, { MetricsListItem } from '../../MetricsList'
import placeholderImage from 'mocks/util/placeholder-image'

describe('<UserCard />', function () {
  const testbed = createTestbed(
    <UserCard
      userName="Jessica Jones"
      profileData={[{
        label: 'Section',
        value: '2'
      }, {
        label: 'Last Login',
        value: '2/20/12'
      }]}
      metricsData={[{
        label: 'Grade',
        value: '80%'
      }, {
        label: 'Missing',
        value: '4'
      }]}
    />
  )

  it('should meet a11y standards', function (done) {
    const subject = testbed.render()

    subject.should.be.accessible(done)
  })

  it('should render the Avatar', function () {
    const image = placeholderImage(250, 250)
    const subject = testbed.render({
      userImgUrl: image
    })

    const avatar = subject.find(Avatar)

    expect(avatar.props('userName'))
      .to.equal('Jessica Jones')

    expect(avatar.props('userImgUrl'))
      .to.equal(image)
  })

  it('should render the user name', function () {
    const subject = testbed.render()

    expect(subject.find(Heading).text())
      .to.equal('Jessica Jones')
  })

  it('should render a link to the profile url', function () {
    const subject = testbed.render({
      profileUrl: 'example.html'
    })

    const link = subject.find(Heading)
      .find('a')

    expect(link.getAttribute('href'))
      .to.equal('example.html')

    expect(link.text())
      .to.equal('Jessica Jones')
  })

  it('should render profile data', function () {
    const subject = testbed.render()

    expect(subject.children(':contains("Section 2")').length)
      .to.equal(1)

    expect(subject.children(':contains("Last Login 2/20/12")').length)
      .to.equal(1)
  })

  it('should render the metrics data', function () {
    const subject = testbed.render()

    const items = subject.find(MetricsList)
      .find(MetricsListItem)

    expect(items.length)
      .to.equal(2)
  })

  it('should pass the metrics data as props', function () {
    const subject = testbed.render()

    const items = subject.find(MetricsListItem)

    expect(items[0].props.label)
      .to.equal('Grade')

    expect(items[0].props.value)
      .to.equal('80%')

    expect(items[1].props.label)
      .to.equal('Missing')

    expect(items[1].props.value)
      .to.equal('4')
  })
})
