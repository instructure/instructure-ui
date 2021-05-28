/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 - present Instructure, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import React from 'react'

import {
  expect,
  mount,
  stub,
  wait,
  within,
  generateA11yTests
} from '@instructure/ui-test-utils'

import { Alert } from '../index'
import AlertExamples from '../__examples__/Alert.examples'

describe('<Alert />', async () => {
  // @ts-expect-error ts-migrate(7034) FIXME: Variable 'srdiv' implicitly has type 'any' in some... Remove this comment to see the full error message
  let srdiv

  beforeEach(async () => {
    stub(console, 'warn') // suppress deprecation warnings
    srdiv = document.createElement('div')
    srdiv.id = '_alertLiveRegion'
    srdiv.setAttribute('role', 'alert')
    srdiv.setAttribute('aria-live', 'assertive')
    srdiv.setAttribute('aria-relevant', 'additions text')
    srdiv.setAttribute('aria-atomic', 'false')
    document.body.appendChild(srdiv)
  })

  afterEach(async () => {
    // @ts-expect-error ts-migrate(7005) FIXME: Variable 'srdiv' implicitly has an 'any' type.
    srdiv && srdiv.parentNode && srdiv.parentNode.removeChild(srdiv)
    srdiv = null
  })

  it('should render', async () => {
    const subject = await mount(
      <Alert variant="success">Success: Sample alert text.</Alert>
    )

    expect(subject.getDOMNode()).to.exist()
  })

  describe('with generated examples', async () => {
    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ sectionProp: string; propValue... Remove this comment to see the full error message
    generateA11yTests(AlertExamples)
  })

  it('should not render the Close button when `renderCloseButtonLabel` is not provided', async () => {
    const subject = await mount(
      <Alert variant="success">Success: Sample alert text.</Alert>
    )

    const alert = within(subject.getDOMNode())
    const closeButton = await alert.find(':focusable', {
      expectEmpty: true
    })

    expect(closeButton).to.not.exist()
  })

  // TODO fix test when new testing library is introduced
  // it('should call `onDismiss` when the close button is clicked with renderCloseButtonLabel', async () => {
  //   const onDismiss = stub()
  //   const subject = await mount(
  //     <Alert
  //       variant="success"
  //       renderCloseButtonLabel={<div>Close</div>}
  //       onDismiss={onDismiss}
  //     >
  //       Success: Sample alert text.
  //     </Alert>
  //   )
  //
  //   const alert = within(subject.getDOMNode())
  //   const closeButton = await alert.find(':focusable')
  //
  //   await closeButton.click()
  //   await wait(() => {
  //     expect(onDismiss).to.have.been.called()
  //   })
  // })

  const iconComponentsVariants = {
    error: 'IconNo',
    info: 'IconInfoBorderless',
    success: 'IconCheckMark',
    warning: 'IconWarningBorderless'
  }

  Object.entries(iconComponentsVariants).forEach(([variant, iconComponent]) => {
    it(`"${variant}" variant should have icon "${iconComponent}".`, async () => {
      const subject = await mount(
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        <Alert variant={variant} transition="none">
          Success: Sample alert text.
        </Alert>
      )

      const alert = within(subject.getDOMNode())
      const icon = await alert.find(`[name=${iconComponent}]`)
      expect(icon).to.exist()
    })
  })

  it('should meet a11y standards', async () => {
    const subject = await mount(
      <Alert variant="success" transition="none">
        Success: Sample alert text.
      </Alert>
    )

    const alert = within(subject.getDOMNode())
    expect(await alert.accessible()).to.be.true()
  })

  it('should add alert text to aria live region, when present', async () => {
    const liver = document.getElementById('_alertLiveRegion')
    await mount(
      <Alert
        variant="success"
        transition="none"
        liveRegion={() => liver}
        liveRegionPoliteness="polite"
      >
        Success: Sample alert text.
      </Alert>
    )

    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    expect(liver.innerText).to.include('Success: Sample alert text.')
    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    expect(liver.getAttribute('aria-live')).to.equal('polite')
  })

  describe('with `screenReaderOnly', async () => {
    it('should not render anything when using `liveRegion`', async () => {
      const liver = document.getElementById('_alertLiveRegion')
      const subject = await mount(
        <Alert
          variant="success"
          liveRegion={() => liver}
          screenReaderOnly={true}
        >
          Success: Sample alert text.
        </Alert>
      )

      expect(subject.getDOMNode()).to.not.exist()
    })

    it('should warn if `liveRegion` is not defined', async () => {
      const consoleError = stub(console, 'error')
      const warning =
        "Warning: [Alert] The 'screenReaderOnly' prop must be used in conjunction with 'liveRegion'."
      await mount(
        <Alert variant="success" screenReaderOnly={true}>
          Success: Sample alert text.
        </Alert>
      )
      expect(consoleError).to.be.calledWith(warning)
    })
  })

  it('should set aria-atomic to the aria live region when isLiveRegionAtomic is present', async () => {
    const liver = document.getElementById('_alertLiveRegion')
    await mount(
      <Alert
        variant="success"
        transition="none"
        liveRegion={() => liver}
        liveRegionPoliteness="polite"
        isLiveRegionAtomic
      >
        Success: Sample alert text.
      </Alert>
    )

    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    expect(liver.innerText).to.include('Success: Sample alert text.')
    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    expect(liver.getAttribute('aria-atomic')).to.equal('true')
  })

  it('should close when told to, with transition', async () => {
    const liver = document.getElementById('_alertLiveRegion')
    const subject = await mount(
      <Alert variant="success" liveRegion={() => liver}>
        Success: Sample alert text.
      </Alert>
    )

    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    expect(liver.children.length).to.equal(1)

    await subject.setProps({
      open: false
    })

    await wait(() => {
      // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
      expect(liver.children.length).to.equal(0)
    })
  })

  it('should close when told to, without transition', async () => {
    const liver = document.getElementById('_alertLiveRegion')
    const subject = await mount(
      <Alert variant="success" transition="none" liveRegion={() => liver}>
        Success: Sample alert text.
      </Alert>
    )

    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    expect(liver.children.length).to.equal(1)

    await subject.setProps({
      open: false
    })

    expect(subject.getDOMNode()).to.not.exist()
    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    expect(liver.children.length).to.equal(0)
  })
})
