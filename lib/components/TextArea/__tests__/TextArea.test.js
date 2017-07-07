import React from 'react'
import TextArea from '../index'

describe('TextArea', () => {
  const testbed = new Testbed(
    <TextArea label="Name" autoGrow={false} />
  )

  it('should adjust the height to fit the text', (done) => {
    const subject = testbed.render({
      autoGrow: true,
      onChange: testbed.stub()
    })

    subject.setProps({
      /* eslint-disable max-len */
      value: 'Chartreuse celiac thundercats, distillery snackwave glossier pork belly tacos venmo fanny pack paleo portland. Migas 3 wolf moon typewriter, meditation pitchfork meh narwhal copper mug gluten-free vegan next level. Succulents keytar cronut, fanny pack kitsch hammock sustainable skateboard gochujang poutine la croix ennui cred quinoa. Fap copper mug pitchfork small batch hell of vice. Kickstarter small batch hexagon, scenester bushwick tacos cliche. Pickled flannel PBR&B, chartreuse next level vinyl echo park chambray pitchfork selfies actually tattooed blue bottle 3 wolf moon. Raw denim enamel pin tumeric retro fam scenester.'
      /* eslint-enable max-len */
    }, () => {
      testbed.raf()
      testbed.tick()
      testbed.defer(() => {
        const height = subject.find('textarea').getComputedStyle().height
        expect(parseFloat(height))
          .to.be.above(58)

        done()
      }, 200)
    })
  })

  it('should accept a default value', () => {
    const subject = testbed.render({
      defaultValue: 'Tom Servo'
    })

    testbed.raf()
    testbed.tick()

    expect(subject.find('textarea').unwrap().value)
      .to.equal('Tom Servo')
  })

  it('should include a label', () => {
    const subject = testbed.render()

    expect(subject.find('label').length).to.equal(1)
  })

  it('should focus the textarea when focus is called', () => {
    const subject = testbed.render()

    subject.instance().focus()

    expect(subject.find('textarea').focused()).to.be.true
  })

  it('provides a focused getter', () => {
    const subject = testbed.render()

    subject.instance().focus()

    expect(subject.instance().focused).to.be.true
  })

  it('should provide an textareaRef prop', () => {
    const textareaRef = testbed.stub()
    const subject = testbed.render({
      textareaRef
    })

    expect(textareaRef).to.have.been.calledWith(subject.find('textarea').unwrap())
  })

  it('should provide a value getter', () => {
    const subject = testbed.render({
      defaultValue: 'bar'
    })

    expect(subject.instance().value).to.equal('bar')
  })

  describe('events', () => {
    it('responds to onChange event', () => {
      const onChange = testbed.stub()

      const subject = testbed.render({
        onChange
      })

      subject.find('textarea').simulate('change')

      expect(onChange).to.have.been.called
    })

    it('does not respond to onChange event when disabled', () => {
      const onChange = testbed.stub()

      const subject = testbed.render({
        disabled: true,
        onChange
      })

      subject.find('textarea').simulate('change')

      expect(onChange).to.not.have.been.called
    })

    it('responds to onBlur event', () => {
      const onBlur = testbed.stub()

      const subject = testbed.render({
        onBlur
      })

      subject.find('textarea').simulate('blur')

      expect(onBlur).to.have.been.called
    })

    it('responds to onFocus event', () => {
      const onFocus = testbed.stub()

      const subject = testbed.render({
        onFocus
      })

      subject.find('textarea').simulate('focus')

      expect(onFocus).to.have.been.called
    })
  })

  describe('for a11y', () => {
    it('should meet standards', (done) => {
      const subject = testbed.render()

      subject.should.be.accessible(done)
    })

    it('should set aria-invalid when errors prop is set', () => {
      const subject = testbed.render({
        messages: [{ type: 'error', text: 'some error message' }]
      })

      expect(subject.find('textarea').getAttribute('aria-invalid'))
        .to.exist
    })
  })
})
