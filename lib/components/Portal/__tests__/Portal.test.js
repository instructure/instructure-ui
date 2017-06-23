import React from 'react'
import Portal from '../index'

describe('<Portal />', function () {
  describe('with or without yo...er a container', function () {
    const testbed = new Testbed(<Portal />)

    it('should support onOpen prop', function () {
      const onOpen = testbed.stub()
      testbed.render({
        open: true,
        children: (
          <ul>
            <li>Bono</li>
            <li>The Edge</li>
            <li>Adam Clayton</li>
            <li>Larry Mullen Jr.</li>
          </ul>
        ),
        onOpen
      })

      testbed.tick()

      expect(onOpen).to.have.been.called
    })

    it('should support onClose prop', function (done) {
      const onClose = testbed.stub()
      const subject = testbed.render({
        onClose,
        open: true,
        children: 'Hello World'
      })

      expect(onClose).to.not.have.been.called

      subject.setProps({ open: false }, () => {
        expect(onClose).to.have.been.called
        done()
      })
    })

    it('should not render if children are empty', function () {
      const subject = testbed.render({ open: true })
      const node = subject.instance().node

      expect(node).to.equal(undefined)
    })
  })

  describe('without a mountNode prop', function () {
    const testbed = new Testbed(<Portal />)

    it('should render nothing and have a node with no parent when closed', function () {
      const subject = testbed.render()
      const node = subject.instance().node

      expect(node).to.equal(undefined)
    })

    it('should render children and have a node with a parent when open', function () {
      const subject = testbed.render({
        open: true,
        children: 'Hello World'
      })
      const node = subject.instance().node

      expect(node.innerHTML).to.contain('Hello World')
      expect(node.nodeName.toUpperCase()).to.equal('SPAN')
      expect(node.parentNode).to.equal(document.body)
    })

    it('should render children elements', function () {
      const subject = testbed.render({
        open: true,
        children: <div>Foo Bar Baz</div>
      })
      const node = subject.instance().node

      expect(node.children.length).to.equal(1)
      expect(node.innerHTML).to.contain('Foo Bar Baz')
    })
  })

  describe('when a mountNode prop is provided', function () {
    const getMountNode = () => document.getElementById('portal-mount-node')
    const testbed = new Testbed(
      <div>
        <Portal
          open
          mountNode={getMountNode}
        >
          Greetings from the Portal
        </Portal>
        <div id="portal-mount-node" />
      </div>
    )

    it('should render into the mount node', function () {
      const subject = testbed.render().find(Portal)
      const node = subject.unwrap().node

      expect(node.parentNode).to.equal(document.getElementById('portal-mount-node'))
    })
  })
})
