import transformSelection, { transformCursor } from '../transformSelection'

describe('transformSelection', function () {
  it('should work with transformCursor', function () {
    const selectionStart = 2
    const selectionEnd = 3
    const selectionDirection = 'none'
    const value = '1a2345'

    expect(transformSelection({
      selectionStart,
      selectionEnd,
      selectionDirection,
      value
    }, '12345')).to.eql({
      selectionStart: 1,
      selectionEnd: 2,
      selectionDirection
    })
  })
})

describe('transformCursor', function () {
  it('should retain cursor at the end', function () {
    const dirtyValue = '12asdfghjk'
    const cleanedValue = '12'
    const cursorIndex = dirtyValue.length

    expect(transformCursor(
      cursorIndex, dirtyValue, cleanedValue
    )).to.equal(cleanedValue.length)
  })

  it('should retain cursor at the start', function () {
    const dirtyValue = '12dfghjkl67'
    const cleanedValue = '1267'
    const cursorIndex = 0

    expect(transformCursor(
      cursorIndex, dirtyValue, cleanedValue
    )).to.equal(0)
  })

  it('should retain cursor between cleaned values', function () {
    const dirtyValue = '12dfghjkl67'
    const cleanedValue = '1267'
    const cursorIndex = 6

    expect(transformCursor(
      cursorIndex, dirtyValue, cleanedValue
    )).to.equal(2)
  })

  it('should retain cursor after cleaned values', function () {
    const dirtyValue = '12dfghjkl67'
    const cleanedValue = '1267'
    const cursorIndex = dirtyValue.length - 1

    expect(transformCursor(
      cursorIndex, dirtyValue, cleanedValue
    )).to.equal(3)
  })
})
