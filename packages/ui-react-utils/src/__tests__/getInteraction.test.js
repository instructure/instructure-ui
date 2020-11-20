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

import { expect } from '@instructure/ui-test-utils'

import { getInteraction } from '../getInteraction'

describe('getInteraction', () => {
  it("should return 'enabled' when `interaction`, `disabled`, and `readOnly` are not provided", () => {
    const props = {
      foo: 'foo',
      bar: 'bar'
    }

    expect(getInteraction({ props })).to.equal('enabled')
  })

  it('should return `interaction` value when `interaction` is specified', () => {
    const props = {
      interaction: 'enabled'
    }

    expect(getInteraction({ props })).to.equal('enabled')

    props.interaction = 'disabled'

    expect(getInteraction({ props })).to.equal('disabled')

    props.interaction = 'readonly'

    expect(getInteraction({ props })).to.equal('readonly')
  })

  it('should give preference to interaction even when disabled and readOnly are also specified', () => {
    const props = {
      interaction: 'enabled',
      disabled: true,
      readOnly: true
    }

    expect(getInteraction({ props })).to.equal('enabled')

    props.disabled = false
    props.interaction = 'disabled'

    expect(getInteraction({ props })).to.equal('disabled')

    props.readOnly = false
    props.interaction = 'readonly'

    expect(getInteraction({ props })).to.equal('readonly')
  })

  it("should return 'disabled' when `disabled` prop is set and `interaction` is not specified", () => {
    const props = {
      disabled: true
    }

    expect(getInteraction({ props })).to.equal('disabled')
  })

  it("should return 'disabled' when both `disabled` and `readOnly` props are set and `interaction` is not specified", () => {
    const props = {
      disabled: true,
      readOnly: true
    }

    expect(getInteraction({ props })).to.equal('disabled')
  })

  it("should return 'readonly' when `readOnly` prop is set and `interaction` and `disabled` are not specified", () => {
    const props = {
      disabled: true
    }

    expect(getInteraction({ props })).to.equal('disabled')
  })

  it('should not include `disabled` if it is not listed in the interactionTypes', () => {
    const props = {
      disabled: true,
      readOnly: true
    }

    expect(getInteraction({ props, interactionTypes: ['readOnly'] })).to.equal(
      'readonly'
    )
  })

  it('should not include `readOnly` if it is not listed in the interactionTypes', () => {
    const props = {
      readOnly: true
    }

    expect(getInteraction({ props, interactionTypes: ['disabled'] })).to.equal(
      'enabled'
    )
  })
})
