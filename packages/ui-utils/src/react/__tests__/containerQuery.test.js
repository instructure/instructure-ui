import React from 'react'
import PropTypes from 'prop-types'
import containerQuery from '../containerQuery'

const query = {
  width_between_251_and_300: { minWidth: '15.6875rem', maxWidth: '300px' },
  width_less_than_200: { maxWidth: 200 },
  width_less_than_2em: { maxWidth: '2em' }
}

@containerQuery(query)
class ContainerComponent extends React.Component {
  static propTypes = {
    width: PropTypes.string
  }
  static defaultProps = {
    width: 'auto'
  }
  render () {
    const style = {
      width: this.props.width,
      backgroundColor: 'yellow'
    }
    return <div style={style}>Hello World</div>
  }
}

describe('@containerQuery', () => {
  const testbed = new Testbed(<ContainerComponent />)

  it('adds attributes to the container element based on its dimensions and the query', (done) => {
    const subject = testbed.render()
    expect(subject.getAttribute('data-width_less_than_200'))
      .to.not.exist

    subject.setProps({
      width: '100px'
    }, () => {
      testbed.raf() // for the listener
      testbed.tick() // for the debounce

      expect(subject.getAttribute('data-width_less_than_200'))
        .to.exist
      done()
    })
  })

  it('converts rem units in the query to pixels', (done) => {
    const subject = testbed.render()

    expect(subject.getAttribute('data-width_between_251_and_300'))
      .to.not.exist

    subject.setProps({
      width: '275px'
    }, () => {
      testbed.raf() // for the listener
      testbed.tick() // for the debounce
      expect(subject.getAttribute('data-width_between_251_and_300'))
        .to.exist
      done()
    })
  })

  it('converts em units in the query to pixels', (done) => {
    const subject = testbed.render()

    expect(subject.getAttribute('data-width_less_than_2em'))
      .to.not.exist

    subject.setProps({
      width: '30px'
    }, () => {
      testbed.raf() // for the listener
      testbed.tick() // for the debounce

      expect(subject.getAttribute('data-width_less_than_2em'))
        .to.exist
      done()
    })
  })

  it('parses pixels from strings in the query', (done) => {
    const subject = testbed.render({
      width: '300px'
    })

    expect(subject.getAttribute('data-width_between_251_and_300'))
      .to.exist

    subject.setProps({
      width: '301px'
    }, () => {
      testbed.raf() // for the listener
      testbed.tick() // for the debounce
      expect(subject.getAttribute('data-width_between_251_and_300'))
        .to.not.exist
      done()
    })
  })
})
