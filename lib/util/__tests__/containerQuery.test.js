import React, { PropTypes } from 'react'
import containerQuery from '../containerQuery'

describe('@containerQuery', function () {
  const query = {
    width_between_251_and_300: { minWidth: '15.6875rem', maxWidth: '300px' },
    width_less_than_200: { maxWidth: 200 }
  }

  @containerQuery(query)
  class ContainerComponent extends React.Component {
    static propTypes = {
      width: PropTypes.string
    };
    static defaultProps = {
      width: 'auto'
    };
    render () {
      const {
        width,
        ...props
      } = this.props
      const style = {
        width
      }
      return <div className="root" style={style} {...props}>Hello World</div>
    }
  }

  const testbed = createTestbed(<ContainerComponent />)

  it('adds attributes to the container element based on its dimensions and the query', function () {
    const subject = testbed.render()

    expect(subject.getAttribute('data-width_less_than_200')).to.not.exist

    subject.props({
      width: '100px'
    })

    expect(subject.getAttribute('data-width_less_than_200')).to.exist
  })

  it('converts rem units in the query to pixels', function () {
    const subject = testbed.render()

    expect(subject.getAttribute('data-width_between_251_and_300')).to.not.exist

    subject.props({
      width: '275px'
    })

    expect(subject.getAttribute('data-width_between_251_and_300')).to.exist
  })

  it('parses pixels from strings in the query', function () {
    const subject = testbed.render({
      width: '300px'
    })

    expect(subject.getAttribute('data-width_between_251_and_300')).to.exist

    subject.props({
      width: '301px'
    })

    expect(subject.getAttribute('data-width_between_251_and_300')).to.not.exist
  })
})
