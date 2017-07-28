import React from 'react'
import keycode from 'keycode'

import Dialog from '../index'
import Button from '../../Button'

describe('<Dialog />', () => {
  const testbed = new Testbed(<Dialog>Hello World</Dialog>)

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

  it('should not render a button by default', () => {
    const subject = testbed.render({
      open: true
    })
    expect(subject.find(Button)).to.not.exist
  })

  it('should render a button when a label is provided', () => {
    const subject = testbed.render({ open: true, closeButtonLabel: 'Close' })

    expect(subject.find(Button)).to.include.text('Close')
  })

  it('should call onDismiss prop when button clicked', () => {
    const onDismiss = testbed.spy()
    const subject = testbed.render({
      open: true,
      closeButtonLabel: 'Close',
      onDismiss
    })
    const button = subject.find(Button)

    button.simulate('click')

    expect(onDismiss).to.have.been.called
  })

  it('should use close button variant', () => {
    const subject = testbed.render({
      open: true,
      closeButtonLabel: 'Close',
      closeButtonVariant: 'icon-inverse'
    })
    const button = subject.find(Button)

    expect(button.prop('variant')).to.equal('icon-inverse')
  })

  it('should provide a ref to the button', () => {
    const closeButtonRef = testbed.spy()
    testbed.render({
      open: true,
      closeButtonLabel: 'Close',
      closeButtonRef
    })

    expect(closeButtonRef).to.have.been.called
  })

  it('should call onDismiss prop when Esc key pressed', () => {
    const onDismiss = testbed.stub()
    testbed.render({
      open: true,
      closeButtonLabel: 'Close',
      shouldCloseOnEscape: true,
      onDismiss
    })

    testbed.wrapper.dispatchNativeKeyboardEvent('keyup', 'escape')

    expect(onDismiss).to.have.been.called
  })

  it('should call onDismiss prop when the document is clicked', () => {
    const onDismiss = testbed.stub()
    testbed.render({
      open: true,
      closeButtonLabel: 'Close',
      shouldCloseOnDocumentClick: true,
      onDismiss
    })

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
          <Dialog
            {...this.props}
            label="A Modal"
            closeButtonLabel="Close"
            applicationElement={() => applicationElement}
          >
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

  it('should focus closeButton by default', () => {
    let closeButton

    testbed.render({
      open: true,
      closeButtonRef: el => {
        closeButton = el
      }
    })

    expect(closeButton === document.activeElement).to.be.true
  })

  it('should focus closeButton when open prop becomes true', done => {
    let closeButton

    const subject = testbed.render({
      open: false,
      closeButtonRef: el => {
        closeButton = el
      }
    })

    subject.setProps(
      {
        open: true
      },
      () => {
        expect(closeButton === document.activeElement).to.be.true
        done()
      }
    )
  })

  it('should take a prop for finding default focus', () => {
    testbed.render({
      open: true,
      defaultFocusElement: function () {
        return document.getElementById('input-one')
      }
    })

    expect(document.getElementById('input-one') === document.activeElement).to.be.true
  })
})
