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

import Locale from '../Locale'
import Decimal from '../Decimal'

describe('Decimal', () => {
  const testbed = new Testbed()

  const uniqueDelimiters = {
    bg: Decimal.getDelimiters('bg'),
    chs: Decimal.getDelimiters('chs'),
    da: Decimal.getDelimiters('da')
  }

  describe('getDelimiters', () => {
    it('is a function', () => {
      expect(Decimal.getDelimiters).to.exist
      expect(typeof Decimal.getDelimiters).to.equal('function')
    });

    ['bg', 'chs', 'da', 'hi', 'zh'].forEach((locale) => {
      it(`has locale ${locale} with decimal strings of one character`, () => {
        const { decimal } = Decimal.getDelimiters(locale)
        expect(decimal).to.exist
        expect(typeof decimal).to.equal('string')
        expect(decimal.length).to.equal(1)
      })

      it(`has locale ${locale} with thousands strings of one character`, () => {
        const { thousands } = Decimal.getDelimiters(locale)
        expect(thousands).to.exist
        expect(typeof thousands).to.equal('string')
        expect(thousands.length).to.equal(1)
      })
    })
  })

  // TODO: we're trying to parse a lot of weird formats that we don't need to
  // support here (e.g. '/-$%&/()=000,010,00[]}„...–0.000'). We should just fail
  // for these formats.
  describe('#parse', () => {
    it('returns NaN when input is undefined', () => {
      expect(Decimal.parse().isNaN()).to.be.true
      expect(Decimal.parse(undefined, 'pl').isNaN()).to.be.true // eslint-disable-line no-undefined
    })

    it('returns 0 when input is null', () => {
      expect(Decimal.parse(null).toNumber()).to.equal(0)
      expect(Decimal.parse(null, 'fr').toNumber()).to.equal(0)
    })

    it('just returns the input when it is already a number', () => {
      expect(Decimal.parse(10.6).toNumber()).to.equal(10.6)
      expect(Decimal.parse(1110.98, 'fr').toNumber()).to.equal(1110.98)
    })

    it('correctly parses decimal formats with default locale', () => {
      expect(Decimal.parse('12,345,679.90').toNumber()).to.equal(12345679.90)
    })

    it('correctly parses integer formats with default locale', () => {
      expect(Decimal.parse('12,345,679').toNumber()).to.equal(12345679)
    })

    it('correctly parses normal integers with default locale', () => {
      expect(Decimal.parse('12345679').toNumber()).to.equal(12345679)
    })

    it('correctly parses normal floats with default locale', () => {
      expect(Decimal.parse('12345679.09').toNumber()).to.equal(12345679.09)
    })

    it('correctly parses negative floats with default locale', () => {
      expect(Decimal.parse('-12345679.09').toNumber()).to.equal(-12345679.09)
    })

    it('correctly parses in progress negative numbers', () => {
      expect(Decimal.parse('-').isNaN()).to.be.true
    })

    it('correctly parses positive floats beginning with +', () => {
      expect(Decimal.parse('+12345679.09').toNumber()).to.equal(12345679.09)
    })

    it('returns NaN if a value can\'t be parsed', () => {
      expect(Decimal.parse('whatever').isNaN()).to.be.true
    })

    it('returns NaN if group size is not three', () => {
      expect(Decimal.parse('12,34,567.22').toNumber()).to.equal(1234567.22)
    })

    describe('correctly parses all decimal formats', () => {
      Object.keys(uniqueDelimiters).forEach((locale) => {
        const { decimal, thousands } = uniqueDelimiters[locale]
        expectResult(
          Decimal.parse,
          [`123${thousands}456${thousands}789${decimal}123456789`, locale],
          'toNumber',
          123456789.123456789
        )
        expectResult(
          Decimal.parse,
          [`23${thousands}456${thousands}789${decimal}123456789`, locale],
          'toNumber',
          23456789.123456789
        )
        expectResult(
          Decimal.parse,
          [`3${thousands}456${thousands}789${decimal}123456789`, locale],
          'toNumber',
          3456789.123456789
        )
        expectResult(
          Decimal.parse,
          [`123${thousands}456${thousands}789${decimal}1`, locale],
          'toNumber',
          123456789.1
        )
        expectResult(
          Decimal.parse,
          [`23${thousands}456${thousands}789${decimal}1`, locale],
          'toNumber',
          23456789.1
        )
        expectResult(
          Decimal.parse,
          [`3${thousands}456${thousands}789${decimal}1`, locale],
          'toNumber',
          3456789.1
        )
        expectResult(
          Decimal.parse,
          [`789${decimal}1`, locale],
          'toNumber',
          789.1
        )
        expectResult(
          Decimal.parse,
          [`89${decimal}1`, locale],
          'toNumber',
          89.1
        )
        expectResult(
          Decimal.parse,
          [`9${decimal}1`, locale],
          'toNumber',
          9.1
        )
        expectResult(
          Decimal.parse,
          [`0${decimal}1`, locale],
          'toNumber',
          0.1
        )
        expectResult(
          Decimal.parse,
          [`${decimal}1`, locale],
          'toNumber',
          0.1
        )
      })
    })

    describe('correctly parses all integer formats', () => {
      Object.keys(uniqueDelimiters).forEach((locale) => {
        const { thousands } = uniqueDelimiters[locale]
        expectResult(
          Decimal.parse,
          [`123${thousands}456${thousands}789`, locale],
          'toNumber',
          123456789
        )
        expectResult(
          Decimal.parse,
          [`23${thousands}456${thousands}789`, locale],
          'toNumber',
          23456789
        )
        expectResult(
          Decimal.parse,
          [`3${thousands}456${thousands}789`, locale],
          'toNumber',
          3456789
        )
        expectResult(
          Decimal.parse,
          ['789', locale],
          'toNumber',
          789
        )
        expectResult(
          Decimal.parse,
          ['89', locale],
          'toNumber',
          89
        )
        expectResult(
          Decimal.parse,
          ['0', locale],
          'toNumber',
          0
        )
      })
    })
  })

  describe('#toLocaleString', () => {
    it('returns "0" if the number given is null', () => {
      expect(Decimal.toLocaleString(null)).to.equal('0')
      expect(Decimal.toLocaleString(null, 'de')).to.equal('0')
    })

    it('returns empty string if the number given is undefined', () => {
      expect(Decimal.toLocaleString()).to.equal('')
      expect(Decimal.toLocaleString(undefined, 'de')).to.equal('') // eslint-disable-line no-undefined
    })

    describe('correctly converts all floating numbers', () => {
      Object.keys(uniqueDelimiters).forEach((locale) => {
        const { decimal, thousands } = uniqueDelimiters[locale]
        // the use of a string is for testing precision higher than what Number allows
        expectResult(
          Decimal.toLocaleString,
          [`123456789${decimal}123456789`, locale],
          null,
          `123${thousands}456${thousands}789${decimal}123456789`
        )
        expectResult(
          Decimal.toLocaleString,
          [`23456789${decimal}123456789`, locale],
          null,
          `23${thousands}456${thousands}789${decimal}123456789`
        )
        expectResult(
          Decimal.toLocaleString,
          [`3456789${decimal}123456789`, locale],
          null,
          `3${thousands}456${thousands}789${decimal}123456789`
        )
        expectResult(
          Decimal.toLocaleString,
          [123456789.12345678, locale],
          null,
          `123${thousands}456${thousands}789${decimal}12345678`
        )
        expectResult(
          Decimal.toLocaleString,
          [23456789.12345678, locale],
          null,
          `23${thousands}456${thousands}789${decimal}12345678`
        )
        expectResult(
          Decimal.toLocaleString,
          [3456789.12345678, locale],
          null,
          `3${thousands}456${thousands}789${decimal}12345678`
        )
        expectResult(
          Decimal.toLocaleString,
          [123456789.1, locale],
          null,
          `123${thousands}456${thousands}789${decimal}1`
        )
        expectResult(
          Decimal.toLocaleString,
          [23456789.1, locale],
          null,
          `23${thousands}456${thousands}789${decimal}1`
        )
        expectResult(
          Decimal.toLocaleString,
          [3456789.1, locale],
          null,
          `3${thousands}456${thousands}789${decimal}1`
        )
        expectResult(
          Decimal.toLocaleString,
          [789.1, locale],
          null,
          `789${decimal}1`
        )
        expectResult(
          Decimal.toLocaleString,
          [89.1, locale],
          null,
          `89${decimal}1`
        )
        expectResult(
          Decimal.toLocaleString,
          [9.1, locale],
          null,
          `9${decimal}1`
        )
        expectResult(
          Decimal.toLocaleString,
          [0.1, locale],
          null,
          `0${decimal}1`
        )
      })
    })

    describe('it cleans extra characters', () => {
      it('removes leading zeros', () => {
        expect(Decimal.toLocaleString('0', 'en')).to.equal('0')
        expect(Decimal.toLocaleString('01', 'en')).to.equal('1')
        expect(Decimal.toLocaleString('000001', 'en')).to.equal('1')
        expect(Decimal.toLocaleString('0000010', 'en')).to.equal('10')
        expect(Decimal.toLocaleString('-010', 'en')).to.equal('-10')
      })

      it('removes non-numeric characters', () => {
        expect(Decimal.toLocaleString('fghjkisufdhgnhmgnk', 'en'))
          .to.equal('')
        expect(Decimal.toLocaleString('qwertyuiopasdfghjklñ123456789', 'en'))
          .to.equal('123,456,789')
        expect(Decimal.toLocaleString('123456zxcvbnm7890', 'en'))
          .to.equal('1,234,567,890')
        expect(Decimal.toLocaleString('123456789asdasd', 'en'))
          .to.equal('123,456,789')
        expect(Decimal.toLocaleString('3;:_¨2„…!"·$%&/()=–{}[]Ç^*1', 'en'))
          .to.equal('321')
      })

      Object.keys(uniqueDelimiters).forEach((locale) => {
        const { decimal, thousands } = uniqueDelimiters[locale]
        expectResult(
          Decimal.toLocaleString,
          [`0123456789${decimal}123456789`, locale],
          null,
          `123${thousands}456${thousands}789${decimal}123456789`
        )
        expectResult(
          Decimal.toLocaleString,
          [`01234${decimal}56789${decimal}123456789`, locale],
          null,
          `123${thousands}456${thousands}789${decimal}123456789`
        )
        expectResult(
          Decimal.toLocaleString,
          [`${decimal}56789${decimal}12${decimal}345${decimal}`, locale],
          null,
          `5${thousands}678${thousands}912${thousands}345`
        )
        expectResult(
          Decimal.toLocaleString,
          [`01234${thousands}56789${thousands}12${thousands}345${thousands}6789`, locale],
          null,
          `123${thousands}456${thousands}789${thousands}123${thousands}456${thousands}789`
        )
        expectResult(
          Decimal.toLocaleString,
          [`${thousands}10${thousands}089${thousands}`, locale],
          null,
          `10${thousands}089`
        )
        expectResult(
          Decimal.toLocaleString,
          [`10${thousands}569${thousands}089`, locale],
          null,
          `10${thousands}569${thousands}089`
        )
        expectResult(
          Decimal.toLocaleString,
          [`abc1lkj0${thousands}56^*Ç¨9${thousands}08oiu***0`, locale],
          null,
          `10${thousands}569${thousands}080`
        )
        expectResult(
          Decimal.toLocaleString,
          [`0${decimal}1`, locale, { removeLeadingZeros: true }],
          null,
          `0${decimal}1`
        )
        expectResult(
          Decimal.toLocaleString,
          [`000${decimal}10`, locale, { removeLeadingZeros: true }],
          null,
          `0${decimal}1`
        )
        expectResult(
          Decimal.toLocaleString,
          [`0asda00${decimal}90`, locale, { removeLeadingZeros: true }],
          null,
          `0${decimal}9`
        )
        expectResult(
          Decimal.toLocaleString,
          [`-0${thousands}000${decimal}09`, locale, { removeLeadingZeros: true }],
          null,
          `-0${decimal}09`
        )
        expectResult(
          Decimal.toLocaleString,
          [
            `00${decimal}00765${decimal}43${decimal}2${decimal}1`,
            locale
          ],
          null,
          `765${thousands}432${decimal}1`
        )
        expectResult(
          Decimal.toLocaleString,
          [
            `--0-0${decimal}00765${decimal}43${decimal}2${decimal}1`,
            locale
          ],
          null,
          `-765${thousands}432${decimal}1`
        )
        expectResult(
          Decimal.toLocaleString,
          [
            `-$%&/()=0${thousands}00[]}„…–0${decimal}09`,
            locale
          ],
          null,
          `-0${decimal}09`
        )
        expectResult(
          Decimal.toLocaleString,
          [
            `/-$%&/()=000${thousands}010${thousands}00[]}„…–0${decimal}000`,
            locale
          ],
          null,
          `10${thousands}000`
        )
      })
    })

    describe('correctly converts all integer numbers', () => {
      Object.keys(uniqueDelimiters).forEach((locale) => {
        const { thousands } = uniqueDelimiters[locale]

        // the use of a string is for testing numbers higher than what Number allows
        expectResult(
          Decimal.toLocaleString,
          ['123456789123456789', locale],
          null,
          `123${thousands}456${thousands}789${thousands}123${thousands}456${thousands}789`
        )
        expectResult(
          Decimal.toLocaleString,
          [ 123456789, locale ],
          null,
          `123${thousands}456${thousands}789`
        )
        expectResult(
          Decimal.toLocaleString,
          [ 23456789, locale ],
          null,
          `23${thousands}456${thousands}789`
        )
        expectResult(
          Decimal.toLocaleString,
          [ 3456789, locale ],
          null,
          `3${thousands}456${thousands}789`
        )
        expectResult(
          Decimal.toLocaleString,
          [ 789, locale ],
          null,
          '789'
        )
        expectResult(
          Decimal.toLocaleString,
          [ 89, locale ],
          null,
          '89'
        )
        expectResult(
          Decimal.toLocaleString,
          [ 0, locale ],
          null,
          '0'
        )
      })
    })

    describe('formats with the passed in locale', () => {
      Object.keys(uniqueDelimiters).forEach((locale) => {
        const { decimal, thousands } = uniqueDelimiters[locale]

        expectResult(
          Decimal.toLocaleString,
          [`${thousands}123${thousands}4${thousands}`, locale],
          null,
          `1${thousands}234`
        )
        expectResult(
          Decimal.toLocaleString,
          [`001${thousands}2${decimal}3${decimal}4`, locale],
          null,
          `123${decimal}4`
        )
        expectResult(
          Decimal.toLocaleString,
          [`a1a2a3a4a`, locale],
          null,
          `1${thousands}234`
        )
        expectResult(
          Decimal.toLocaleString,
          [`0-${thousands}a${thousands}1${thousands}a2a${thousands}3a4${thousands}a`, locale],
          null,
          `1${thousands}234`
        )
        expectResult(
          Decimal.toLocaleString,
          [`-0${thousands}a${thousands}1${thousands}a2a${thousands}3a4${thousands}a`, locale],
          null,
          `-1${thousands}234`
        )
        expectResult(
          Decimal.toLocaleString,
          [`00000000000${decimal}1`, locale],
          null,
          `0${decimal}1`
        )
        expectResult(
          Decimal.toLocaleString,
          [`0${decimal}1`, locale],
          null,
          `0${decimal}1`
        )
        expectResult(
          Decimal.toLocaleString,
          [`0001234567890${decimal}0010`, locale],
          null,
          `1${thousands}234${thousands}567${thousands}890${decimal}001`
        )
        expectResult(
          Decimal.toLocaleString,
          [`00${thousands}0123${thousands}4567890${decimal}0010`, locale],
          null,
          `1${thousands}234${thousands}567${thousands}890${decimal}001`
        )
        expectResult(
          Decimal.toLocaleString,
          [`00${decimal}00765${decimal}43${decimal}2${decimal}1`, locale],
          null,
          `765${thousands}432${decimal}1`
        )
        expectResult(
          Decimal.toLocaleString,
          [`--0-0${decimal}00765${decimal}43${decimal}2${decimal}1`, locale],
          null,
          `-765${thousands}432${decimal}1`
        )
      })
    })

    context('with browser locale "fr"', () => {
      beforeEach(() => {
        testbed.stub(Locale, 'browserLocale').returns('fr')
      })

      it('formats French numbers correctly', () => {
        const decimal = new Decimal(12.34)
        expect(decimal.toLocaleString('fr')).to.equal('12,34')
      })
    })
  })

  describe('#toFixed', () => {
    const number = 123456.789
    const decimal = new Decimal(number)

    context('with locale', () => {
      const locale = 'de'

      it('adds trailing zeros when precision is higher than value', () => {
        expect(decimal.toFixed(5, locale)).to.equal('123.456,78900')
      })

      it('rounds when precision is higher than value', () => {
        expect(decimal.toFixed(1, locale)).to.equal('123.456,8')
      })
    })

    context('without locale', () => {
      it('behaves the same as Number.prototype.toFixed', () => {
        expect(decimal.toFixed(5)).to.equal(number.toFixed(5))
        expect(decimal.toFixed(1)).to.equal(number.toFixed(1))
      })
    })
  })

  describe('#toPrecision', () => {
    const number = 123456.789
    const decimal = new Decimal(number)

    context('with locale', () => {
      const locale = 'de'

      it('adds trailing zeros when precision is higher than value', () => {
        expect(decimal.toPrecision(11, locale)).to.equal('123.456,78900')
      })

      it('rounds when precision is higher than value', () => {
        expect(decimal.toPrecision(5, locale)).to.equal('123.460')
      })
    })

    context('without locale', () => {
      it('behaves the same as Number.prototype.toPrecision when precision is higher than value', () => {
        expect(decimal.toPrecision(11)).to.equal(number.toPrecision(11))
      })

      it("doesn't use exponential notation when precision is lower than value", () => {
        expect(decimal.toPrecision(4)).to.equal('123500')
      })
    })
  })
})

// Call fn with args arguments and test if it is exactly equal to result
function expectResult (fn, args, method, expectedResult) {
  const stringify = (s) => {
    if (typeof s === 'string') {
      return `'${s}'`
    }
    if (typeof s === 'object') {
      return JSON.stringify(s)
    }
    return s
  }
  const argsString = args.map(stringify).join(', ')

  it(`returns ${stringify(expectedResult)} when called with (${argsString})`, () => {
    const actualResult = fn(...args)
    expect(method ? actualResult[method]() : actualResult)
      .to.equal(expectedResult)
  })
}
