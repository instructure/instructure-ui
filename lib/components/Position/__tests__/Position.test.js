import React, { Component, PropTypes } from 'react'
import Position, { Target, Content } from '../index'
import Button from '../../Button'
import ContextBox from '../../ContextBox'

function findAll (subject) {
  const position = subject.find(Position)
  const target = subject.find('button').unwrap()
  const content = document.querySelector('[data-position-component]')
  const targetRect = target.getBoundingClientRect()
  const contentRect = content.getBoundingClientRect()

  return { position, target, content, targetRect, contentRect }
}

describe('<Position />', function () {
  class App extends Component {
    static propTypes = {
      placement: PropTypes.string,
      offsetX: PropTypes.number,
      offsetY: PropTypes.number
    }

    render () {
      const { ...props } = this.props

      delete props.children

      return (
        <div style={{
          width: 500,
          height: 150,
          padding: 50,
          textAlign: 'center'
        }}>
          <Position {...props}>
            <Target>
              <Button>Target</Button>
            </Target>
            <Content>
              <ContextBox placement={this.props.placement}>
                <div>Content</div>
              </ContextBox>
            </Content>
          </Position>
        </div>
      )
    }
  }

  function assertOffset (placement) {
    it(`should render offset for ${placement}`, function (done) {
      const subject = testbed.render({ placement })
      const { contentRect } = findAll(subject)
      const { top, left } = contentRect
      const offsetX = 10
      const offsetY = 10

      subject
        .setProps({ offsetX, offsetY }, () => {
          testbed.sandbox.clock.restore()
          setTimeout(() => {
            const { contentRect } = findAll(subject)
            expect(contentRect.top).to.equal(top + offsetY)
            expect(contentRect.left).to.equal(left + offsetX)
            done()
          }, 0)
        })
    })
  }

  const testbed = new Testbed(<App />)

  it('should render', function () {
    const subject = testbed.render()

    expect(subject).to.be.present
  })

  it('should absolutely position content', function () {
    const subject = testbed.render()
    const { content } = findAll(subject)

    expect(content.style.position).to.equal('absolute')
  })

  it('should render right placement by default', function () {
    const subject = testbed.render()
    const { position } = findAll(subject)

    expect(position.prop('placement')).to.equal('right')
  })

  it('should render right of target', function () {
    const subject = testbed.render({ placement: 'right' })
    const { targetRect, contentRect } = findAll(subject)

    expect(Math.floor(contentRect.left)).to.be.above(Math.floor(targetRect.right))
  })

  it('should render below target', function () {
    const subject = testbed.render({ placement: 'bottom' })
    const { targetRect, contentRect } = findAll(subject)

    expect(Math.floor(contentRect.top)).to.be.above(Math.floor(targetRect.bottom))
  })

  it('should render left of target', function () {
    const subject = testbed.render({ placement: 'left' })
    const { targetRect, contentRect } = findAll(subject)

    expect(Math.floor(contentRect.right)).to.equal(Math.floor(targetRect.left))
  })

  it('should render above target', function () {
    const subject = testbed.render({ placement: 'top' })
    const { targetRect, contentRect } = findAll(subject)

    expect(Math.floor(contentRect.bottom)).to.equal(Math.floor(targetRect.top))
  })

  it('should center vertically', function () {
    const subject = testbed.render({ placement: 'right' })
    const { targetRect, contentRect } = findAll(subject)

    expect(Math.floor(contentRect.top)).to.equal(
      Math.floor(targetRect.top + ((targetRect.height / 2) - (contentRect.height / 2)))
    )
  })

  it('should center horizontally', function () {
    const subject = testbed.render({ placement: 'bottom' })
    const { targetRect, contentRect } = findAll(subject)

    expect(Math.floor(contentRect.left)).to.equal(
      Math.floor(targetRect.left + ((targetRect.width / 2) - (contentRect.width / 2)))
    )
  })

  assertOffset('top')
  assertOffset('left')
  assertOffset('right')
  assertOffset('bottom')
})
