import UserCard from '../index'
import Heading from '../../Heading'
import Avatar from '../../Avatar'
import MetricsList, { MetricsListItem } from '../../MetricsList'
import placeholderImage from 'mocks/util/placeholder-image'

describe('<UserCard />', function () {
  const testbed = createTestbed(UserCard, {
    userName: 'Jessica Jones',
    profileData: [{
      label: 'Section',
      value: '2'
    }, {
      label: 'Last Login',
      value: '2/20/12'
    }],
    metricsData: [{
      label: 'Grade',
      value: '80%'
    }, {
      label: 'Missing',
      value: '4'
    }]
  })

  it('should meet a11y standards', function (done) {
    testbed.render()

    testbed.checkA11yStandards(done)
  })

  it('should render the Avatar', function () {
    const image = placeholderImage(250, 250)
    testbed.render({
      userImgUrl: image
    })

    const avatar = testbed.findChildByType(Avatar)

    expect(avatar.props.userName)
      .to.equal('Jessica Jones')

    expect(avatar.props.userImgUrl)
      .to.equal(image)
  })

  it('should render the user name', function () {
    testbed.render()

    expect(testbed.getText(testbed.dom.find(Heading).node))
      .to.equal('Jessica Jones')
  })

  it('should render a link to the profile url', function () {
    testbed.render({
      profileUrl: 'http://www.instructure.com'
    })

    const link = testbed.dom.find(Heading)
      .find('a').node

    expect(link.getAttribute('href'))
      .to.equal('http://www.instructure.com')

    expect(testbed.getText(link))
      .to.equal('Jessica Jones')
  })

  it('should render profile data', function () {
    testbed.render()

    expect(testbed.dom.find(':contains("Section 2")'))
      .to.be.ok

    expect(testbed.dom.find(':contains("Last Login 2/20/12")'))
      .to.be.ok
  })

  it('should render the metrics data', function () {
    testbed.render()

    const items = testbed.dom.find(MetricsList)
      .findAll(MetricsListItem)

    expect(items.nodes.length)
      .to.equal(2)
  })

  it('should pass the metrics data as props', function () {
    testbed.render()

    const items = testbed.findChildrenByType(MetricsListItem)

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
