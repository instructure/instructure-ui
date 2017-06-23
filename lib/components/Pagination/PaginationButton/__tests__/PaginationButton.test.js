import React from 'react'
import Button from '../../../Button'
import PaginationButton from '../index'

describe('<PaginationButton />', function () {
  const testbed = new Testbed(<PaginationButton>A-G</PaginationButton>)

  it('should designate current page', function () {
    const subject = testbed.render({ current: true })
    expect(subject.find(Button).prop('variant')).to.eq('primary')
  })

  it('should navigate using button when onClick provided', function () {
    const onClick = testbed.sandbox.stub()
    const subject = testbed.render({ onClick })
    subject.find(Button).simulate('click')
    expect(onClick).to.have.been.called
  })

  it('should disable navigation to current page', function () {
    const onClick = testbed.sandbox.stub()
    const subject = testbed.render({ onClick, current: true })
    subject.find(Button).simulate('click')
    expect(onClick).to.not.have.been.called
  })

  it('should navigate using link when href provided', function () {
    const subject = testbed.render({ href: 'inst.biz' })
    expect(subject.find('a[href="inst.biz"]')).to.be.present
  })

  it('should meet a11y standards with defaults', function (done) {
    const ignores = { ignores: [
      'color-contrast' // brand color doesn't meet 4.5:1 contrast req
    ] }
    const vanillaPage = testbed.render()
    vanillaPage.should.be.accessible(done, ignores)
  })

  it('should meet a11y standards with current prop', function (done) {
    const ignores = { ignores: [
      'color-contrast' // brand color doesn't meet 4.5:1 contrast req
    ] }
    const currentPage = testbed.render({ current: true })
    currentPage.should.be.accessible(done, ignores)
  })
})
