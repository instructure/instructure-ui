import React from 'react'
import keycode from 'keycode'

import Dialog from '../index'
import Button from '../../Button'

describe('<Dialog />', () => {
  const testbed = new Testbed(
    (
      <Dialog>
        <Button>Hello World</Button>
      </Dialog>
    )
  )

  it('should render nothing when closed', () => {
    const subject = testbed.render()
    expect(subject).to.be.blank()
  })

  it('should render children when open', () => {
    const subject = testbed.render({
      open: true
    })
    expect(subject).to.include.text('Hello World')
  })

  it('should apply the a11y attributes', () => {
    const subject = testbed.render({ open: true, label: 'Dialog Example' })
    expect(subject.find('[role="region"]')).to.be.present
    expect(subject.find('[aria-label="Dialog Example"]')).to.be.present
  })

  it('should call onDismiss prop when Esc key pressed', () => {
    const onDismiss = testbed.stub()
    testbed.render({
      open: true,
      shouldCloseOnEscape: true,
      onDismiss
    })

    testbed.tick()

    testbed.wrapper.dispatchNativeKeyboardEvent('keyup', 'escape')

    expect(onDismiss).to.have.been.called
  })

  it('should call onDismiss prop when the document is clicked', () => {
    const onDismiss = testbed.stub()
    testbed.render({
      open: true,
      shouldCloseOnDocumentClick: true,
      onDismiss
    })

    testbed.tick()

    testbed.wrapper.dispatchNativeMouseEvent('click', {
      bubbles: true
    })

    expect(onDismiss).to.have.been.called
  })
})

describe('<Dialog /> managed focus', () => {
  const applicationElement = document.createElement('div')
  class DialogExample extends React.Component {
    static propTypes = {
      ...Dialog.PropTypes
    }

    componentDidMount () {
      if (!this.props.open) {
        this._input.focus()
      }
    }

    render () {
      return (
        <div>
          <input
            type="text"
            ref={c => {
              this._input = c
            }}
          />
          <Dialog {...this.props} label="A Modal" applicationElement={() => applicationElement}>
            <div>
              <input type="text" id="input-one" />
              <input type="text" id="input-two" />
            </div>
          </Dialog>
        </div>
      )
    }
  }

  const testbed = new Testbed(<DialogExample />)

  it('should focus the first tabbable element by default', () => {
    testbed.render({
      open: true
    })

    testbed.tick()

    expect(document.getElementById('input-one') === document.activeElement).to.be.true
  })

  it('should focus the first tabbable element when open prop becomes true', done => {
    const subject = testbed.render({
      open: false
    })

    subject.setProps(
      {
        open: true
      },
      () => {
        testbed.tick()
        expect(document.getElementById('input-one') === document.activeElement).to.be.true
        done()
      }
    )
  })

  it('should take a prop for finding default focus', () => {
    testbed.render({
      open: true,
      defaultFocusElement: function () {
        return document.getElementById('input-two')
      }
    })

    testbed.tick()

    expect(document.getElementById('input-two') === document.activeElement).to.be.true
  })
})
