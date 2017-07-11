import React from 'react'
import IconLeft from 'instructure-icons/lib/Solid/IconArrowOpenLeftSolid'
import IconRight from 'instructure-icons/lib/Solid/IconArrowOpenRightSolid'
import Pagination from '../index'
import PaginationButton from '../PaginationButton'
import Container from '../../Container'

describe('<Pagination />', () => {
  const buildPages = function (count = 4, current = 0) {
    /* eslint-disable react/no-array-index-key */
    return Array.from(Array(count)).map((v, i) => {
      return <PaginationButton key={i} current={i === current}>#{i}</PaginationButton>
    })
    /* eslint-enable react/no-array-index-keys */
  }

  context('full', () => {
    const testbed = new Testbed(
      <Pagination>
        {buildPages(5)}
      </Pagination>
    )

    it('should render all pages', () => {
      const subject = testbed.render()
      expect(subject.find(PaginationButton).length).to.eq(5)
      expect(subject.text().trim()).to.eq('#0#1#2#3#4')
    })

    it('should not render arrows', () => {
      const subject = testbed.render()
      expect(subject.find(IconLeft)).to.have.length(0)
      expect(subject.find(IconRight)).to.have.length(0)
    })
  })

  context('compact', () => {
    const compactTestbed = new Testbed(
      <Pagination
        variant="compact"
        labelNext="Next"
        labelPrev="Prev"
      >
        {buildPages()}
      </Pagination>
    )

    it('should render pages', () => {
      const subject = compactTestbed.render()
      expect(subject.find(PaginationButton).length).to.eq(4)
      expect(subject.text().trim()).to.eq('#0#1#2#3')
    })

    it('should render a single page', () => {
      const subject = compactTestbed.render({
        children: <PaginationButton key="0">#000</PaginationButton>
      })
      expect(subject.find(PaginationButton).length).to.eq(0)
      expect(subject.find(IconLeft)).to.have.length(0)
      expect(subject.find(IconRight)).to.have.length(0)
    })

    it('should render no pages', () => {
      const subject = compactTestbed.render({ children: [] })
      expect(subject.find(PaginationButton).length).to.eq(0)
      expect(subject.find(IconLeft)).to.have.length(0)
      expect(subject.find(IconRight)).to.have.length(0)
    })

    it('should truncate pages to context', () => {
      const subject = compactTestbed.render({ children: buildPages(9, 3) })
      expect(subject.find(PaginationButton).length).to.eq(7)
      expect(subject.text().trim()).to.eq('#0...#2#3#4#5#6...#8')
    })

    it('should truncate start', () => {
      const subject = compactTestbed.render({ children: buildPages(6, 5) })
      expect(subject.find(PaginationButton).length).to.eq(3)
      expect(subject.text().trim()).to.eq('#0...#4#5')
    })

    it('should truncate end', () => {
      const subject = compactTestbed.render({ children: buildPages(6) })
      expect(subject.find(PaginationButton).length).to.eq(5)
      expect(subject.text().trim()).to.eq('#0#1#2#3...#5')
    })

    it('should omit ellipses when bounds included in context', () => {
      const subject = compactTestbed.render({ children: buildPages(7, 2) })
      expect(subject.find(PaginationButton).length).to.eq(7)
      expect(subject.text().trim()).to.eq('#0#1#2#3#4#5#6')
    })

    describe('arrows', () => {
      it('should render only when applicable', () => {
        const atFirst = compactTestbed.render()
        expect(atFirst.find(IconLeft)).to.have.length(0)
        expect(atFirst.find(IconRight)).to.have.length(1)

        const atLast = compactTestbed.render({ children: buildPages(4, 3) })
        expect(atLast.find(IconLeft)).to.have.length(1)
        expect(atLast.find(IconRight)).to.have.length(0)
      })

      it('should navigate to adjacent pages', () => {
        const onNextClick = compactTestbed.sandbox.stub()
        const subject = compactTestbed.render({ children: [
          <PaginationButton key="cur" current>Current</PaginationButton>,
          <PaginationButton key="next" onClick={onNextClick}>Next</PaginationButton>
        ]})
        subject.find(IconRight).simulate('click')
        expect(onNextClick).to.have.been.called
      })
    })

    // Testing compact only, since it is a superset of components in full
    it('should meet a11y standards', (done) => {
      const subject = compactTestbed.render()

      subject.should.be.accessible(done, {
        ignores: [
          'color-contrast' // brand color doesn't meet 4.5:1 contrast req
        ]
      })
    })

    it('should not allow margin or padding to be added as properties', () => {
      const subject = compactTestbed.render({
        margin: 'small medium large small',
        padding: 'large small medium large'
      })
      expect(subject.find(Container).first().props().margin).to.not.exist
      expect(subject.find(Container).first().props().padding).to.not.exist
    })
  })
})
