import React from 'react'
import Portal from '../index'

describe('<Portal />', function () {
  describe('with or without yo...er a container', function () {
    const testbed = new Testbed(<Portal />)

    it('should support onReady prop', function () {
      const onReady = testbed.sandbox.stub()
      testbed.render({
        isOpen: true,
        children: (
          <ul>
            <li>Bono</li>
            <li>The Edge</li>
            <li>Adam Clayton</li>
            <li>Larry Mullen Jr.</li>
          </ul>
        ),
        onReady
      })
      expect(onReady).to.have.been.called
    })

    it('should support onClose prop', function (done) {
      const onClose = testbed.sandbox.stub()
      const subject = testbed.render({
        onClose,
        isOpen: true,
        children: 'Hello World'
      })

      expect(onClose).to.not.have.been.called

      subject.setProps({ isOpen: false }, () => {
        expect(onClose).to.have.been.called
        done()
      })
    })
  })

  describe('without a container', function () {
    const testbed = new Testbed(<Portal />)

    it('should render nothing and have a node with no parent when closed', function () {
      const subject = testbed.render()
      const node = subject.instance()._node

      expect(node.innerHTML).to.equal('')
      expect(node.nodeName.toUpperCase()).to.equal('DIV')
      expect(node.parentNode).to.equal(null)
    })

    it('should render children and have a node with a parent when open', function () {
      const subject = testbed.render({
        isOpen: true,
        children: 'Hello World'
      })
      const node = subject.instance()._node

      expect(node.innerHTML).to.contain('Hello World')
      expect(node.parentNode).to.equal(document.body)
    })

    it('should render children elements', function () {
      const subject = testbed.render({
        isOpen: true,
        children: <div>Foo Bar Baz</div>
      })
      const node = subject.instance()._node

      expect(node.children.length).to.equal(1)
      expect(node.innerHTML).to.contain('Foo Bar Baz')
    })
  })

  describe('when a container function is provided', function () {
    const getContainer = () => document.getElementById('portal-container')
    const testbed = new Testbed(
      <div>
        <Portal
          isOpen
          container={getContainer}
        >
          Greetings from the Portal
        </Portal>
        <div id="portal-container" />
      </div>
    )

    it('should render into the container', function () {
      const subject = testbed.render().find(Portal)
      const node = subject.unwrap()._node

      expect(node.parentNode).to.equal(document.getElementById('portal-container'))
    })
  })
})
