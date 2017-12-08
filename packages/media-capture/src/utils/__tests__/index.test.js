import { canUseMediaCapture } from '../index'

describe('canUseMediaCapture', () => {
  it('returns true', () => {
    expect(canUseMediaCapture()).to.be.true
  })
})
