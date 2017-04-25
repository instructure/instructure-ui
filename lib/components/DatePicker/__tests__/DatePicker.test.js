import React from 'react'
import DatePicker from '../index'
import moment from 'moment'
import styles from '../styles.css'
import sliderStyles from '../Slider/styles.css'

describe('<DatePicker />', function () {
  const testbed = new Testbed(<DatePicker previousLabel="foo" nextLabel="bar" todayValue="2017-06-01" />)

  it('styles today date', () => {
    const subject = testbed.render()
    expect(subject.find(`.${styles.today}`)).to.be.present
  })

  it('styles the selected date', () => {
    const subject = testbed.render()
    expect(subject.find(`.${styles.selected}`)).to.be.present
  })

  it('styles dates outside the selected month', () => {
    const subject = testbed.render()
    expect(subject.find(`.${styles.outside}`).length).to.be.above(0)
  })

  it('fires onSelectedChange when date is clicked', () => {
    const onSelectedChange = testbed.stub()
    const subject = testbed.render({onSelectedChange})
    const cell = subject.find(`.${styles.outside}`).first()
    cell.simulate('click')
    expect(onSelectedChange).to.have.been.called
    const onChangeArg = onSelectedChange.getCall(0).args[0]
    expect(moment(onChangeArg, [moment.ISO_8601]).isValid()).to.be.ok
  })

  it('fires onRenderedChange when next arrow is clicked', () => {
    const onRenderedChange = testbed.stub()
    const subject = testbed.render({onRenderedChange})
    const nextButton = subject.find(`.${sliderStyles.next}`)
    nextButton.simulate('click')
    expect(onRenderedChange).to.have.been.called
    const onChangeArg = onRenderedChange.getCall(0).args[0]
    expect(moment(onChangeArg, [moment.ISO_8601]).isValid()).to.be.ok
  })

  it('fires onRenderedChange when previous arrow is clicked', () => {
    const onRenderedChange = testbed.stub()
    const subject = testbed.render({onRenderedChange})
    const prevButton = subject.find(`.${sliderStyles.prev}`)
    prevButton.simulate('click')
    expect(onRenderedChange).to.have.been.called
    const onChangeArg = onRenderedChange.getCall(0).args[0]
    expect(moment(onChangeArg, [moment.ISO_8601]).isValid()).to.be.ok
  })

  it('localizes the calendar layout', () => {
    const subject = testbed.render({locale: 'fr'})
    expect(subject.find('th PresentationContent').first().text()).to.equal('Lu')
    expect(subject.find('th ScreenReaderContent').first().text()).to.equal('lundi')
  })

  it('localizes the header', () => {
    const subject = testbed.render({defaultRenderedValue: '2017-01-01', locale: 'fr'})
    expect(subject.find(`.${styles.label}`).text()).to.equal('janvier2017')
  })

  it('uses the specified timezone', () => {
    const onSelectedChange = testbed.stub()
    const subject = testbed.render(
      {defaultRenderedValue: '2017-05-01', timezone: 'Europe/Paris', onSelectedChange})
    expect(subject.get)
    const cell = subject.find(`.${styles.outside}`).first()
    cell.simulate('click')
    expect(onSelectedChange).to.have.been.calledWith('2017-04-30T00:00:00+02:00')
  })

  it('gets locale and timezone from context', () => {
    const subject = testbed.render({}, {locale: 'fr', timezone: 'Europe/Paris'})
    expect(subject.instance().locale()).to.equal('fr')
    expect(subject.instance().timezone()).to.equal('Europe/Paris')
  })

  it('overrides locale and timezone context with properties', () => {
    const subject = testbed.render({locale: 'ja', timezone: 'Asia/Tokyo'}, {locale: 'fr', timezone: 'Europe/Paris'})
    expect(subject.instance().locale()).to.equal('ja')
    expect(subject.instance().timezone()).to.equal('Asia/Tokyo')
  })

  it('defaults the selected value to the today value', () => {
    const subject = testbed.render({todayValue: '2017-04-01'})
    expect(subject.instance().selectedValue()).to.equal('2017-04-01')
  })

  it('defaults the rendered value to the selected value', () => {
    const subject = testbed.render({todayValue: '2017-04-01', defaultSelectedValue: '2017-05-01'})
    expect(subject.instance().renderedValue()).to.equal('2017-05-01')
  })

  it('should meet a11y standards', function (done) {
    const subject = testbed.render({
      defaultRenderedValue: '2017-04-01',
      defaultSelectedValue: '2017-04-01',
      todayValue: '2017-04-02'
    })
    subject.should.be.accessible(done, {
      ignores: [ 'color-contrast' ] // checked manually for 3:1 in theme tests
    })
  })
})
