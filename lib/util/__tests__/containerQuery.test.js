import React from 'react'
import containerQuery from '../containerQuery'

describe('@containerQuery', function () {
  const query = {
    width_between_251_and_300: { minWidth: '15.6875rem', maxWidth: '300px' },
    width_less_than_200: { maxWidth: 200 }
  }

  @containerQuery(query)
  class ContainerComponent extends React.Component {
    render () {
      return <div className="root">Hello World</div>
    }
  }

  const testbed = createTestbed(ContainerComponent)

  it('adds attributes to the container element based on its dimensions and the query', function (done) {
    testbed.render()

    setTimeout(() => {
      testbed.dom.node.style.width = '100px'

      setTimeout(() => {
        expect(testbed.dom.node.getAttribute('data-width_less_than_200'))
          .to.exist
        done()
      }, 100)
    }, 100)
  })

  it('converts rem units in the query to pixels', function (done) {
    testbed.render()

    setTimeout(() => {
      testbed.dom.node.style.width = '275px'

      setTimeout(() => {
        expect(testbed.dom.node.getAttribute('data-width_between_251_and_300'))
          .to.exist
        done()
      }, 100)
    }, 100)
  })

  it('parses pixels from strings in the query', function (done) {
    testbed.render()

    setTimeout(() => {
      testbed.dom.node.style.width = '301px'

      setTimeout(() => {
        expect(testbed.dom.node.getAttribute('data-width_between_251_and_300'))
          .to.not.exist
        done()
      }, 100)
    }, 100)
  })
})
