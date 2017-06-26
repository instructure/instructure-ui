import React, { Component } from 'react'
import Position, { PositionTarget, PositionContent } from '../index'
import Button from '../../Button'
import ContextBox from '../../ContextBox'

function findAll (subject) {
  const position = subject.find(Position)
  const target = subject.find('button').unwrap()
  const content = subject.ref('_content').getDOMNode()

  const targetRect = target.getBoundingClientRect()
  const contentRect = content.getBoundingClientRect()

  return { position, target, content, targetRect, contentRect }
}

describe('<Position />', function () {
  class App extends Component {
    static propTypes = {
      ...Position.propTypes
    }

    render () {
      const { ...props } = this.props

      delete props.children

      return (
        <div style={{
          width: 500,
          height: 150,
          padding: 100,
          textAlign: 'center'
        }}
        >
          <Position {...props}>
            <PositionTarget>
              <Button>Target</Button>
            </PositionTarget>
            <PositionContent>
              <ContextBox
                placement={this.props.placement}
                ref={(el) => { this._content = el }}
              >
                <div>Content</div>
              </ContextBox>
            </PositionContent>
          </Position>
        </div>
      )
    }
  }

  const testbed = new Testbed(<App />)

  beforeEach(function () {
    testbed.enableCSSTransitions()
  })

  it('should render', function () {
    const subject = testbed.render()

    expect(subject).to.be.present
  })

  it('should absolutely position content', function () {
    const subject = testbed.render()

    const { content } = findAll(subject)

    expect(content.style.position).to.equal('absolute')
  })

  it('should render `bottom center` placement by default', function () {
    const subject = testbed.render()
    testbed.tick() // portal

    const { position } = findAll(subject)
    expect(position.prop('placement')).to.equal('bottom center')
  })

  it('should render right of target', function () {
    const subject = testbed.render({ placement: 'end' })

    testbed.tick()

    const { targetRect, contentRect } = findAll(subject)

    expect(Math.floor(contentRect.left)).to.be.above(Math.floor(targetRect.right))
  })

  it('should render below target', function () {
    const subject = testbed.render({ placement: 'bottom' })

    testbed.tick()

    const { targetRect, contentRect } = findAll(subject)

    expect(Math.floor(contentRect.top)).to.be.above(Math.floor(targetRect.bottom))
  })

  it('should render left of target', function () {
    const subject = testbed.render({ placement: 'start' })

    testbed.tick()

    const { targetRect, contentRect } = findAll(subject)

    expect(Math.floor(contentRect.right)).to.equal(Math.floor(targetRect.left))
  })

  it('should render above target', function () {
    const subject = testbed.render({ placement: 'top' })

    testbed.tick()

    const { targetRect, contentRect } = findAll(subject)

    expect(Math.floor(contentRect.bottom)).to.equal(Math.floor(targetRect.top))
  })

  it('should center vertically', function () {
    const subject = testbed.render({ placement: 'end' })

    testbed.tick()

    const { targetRect, contentRect } = findAll(subject)
    const top = Math.floor(contentRect.top)
    const center = Math.floor(targetRect.top + ((targetRect.height / 2) - (contentRect.height / 2)))

    expect(within(top, center)).to.be.true
  })

  it('should center horizontally', function () {
    const subject = testbed.render({ placement: 'bottom' })

    testbed.tick()

    const { targetRect, contentRect } = findAll(subject)

    const left = Math.floor(contentRect.left)
    const center = Math.floor(targetRect.left + ((targetRect.width / 2) - (contentRect.width / 2)))

    expect(within(left, center)).to.be.true
  })

  describe('with offset props', function () {
    function assertOffset (placement, offset, assertion) {
      it(`should render offset for ${placement}`, function (done) {
        const subject = testbed.render({ placement })

        testbed.tick()

        const { contentRect } = findAll(subject)
        const { top, left } = contentRect
        const offsetX = offset
        const offsetY = offset

        subject.setProps({ offsetX, offsetY }, () => {
          testbed.defer(() => {
            testbed.tick()

            const { contentRect } = findAll(subject)

            assertion(contentRect, top, left)

            done()
          })
        })
      })
    }

    assertOffset('top', 10, (contentRect, top, left) => {
      expect(within(contentRect.top, top - 10, 0.5)).to.be.true
      expect(within(contentRect.left, left - 10, 0.5)).to.be.true
    })

    assertOffset('start', '10px', (contentRect, top, left) => {
      expect(within(contentRect.top, top - 10, 0.5)).to.be.true
      expect(within(contentRect.left, left - 10, 0.5)).to.be.true
    })

    assertOffset('end', 10, (contentRect, top, left) => {
      expect(within(contentRect.top, top - 10, 0.5)).to.be.true
      expect(within(contentRect.left, left + 10, 0.5)).to.be.true
    })

    assertOffset('bottom', 10, (contentRect, top, left) => {
      expect(within(contentRect.top, top + 10, 0.5)).to.be.true
      expect(within(contentRect.left, left - 10, 0.5)).to.be.true
    })
  })
})

function within (a, b, diff = 1) {
  return (a + diff >= b && b >= a - diff)
}
