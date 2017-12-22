import numeral from 'numeral'

// referenced from https://github.com/adamwdraper/Numeral-js/pull/534/files
numeral.register('locale', 'sv', {
  delimiters: {
    thousands: ' ',
    decimal: ','
  },
  abbreviations: {
    thousand: 'k',
    million: 'm',
    billion: 'md',
    trillion: 'bn'
  },
  // http://www.unicode.org/cldr/charts/31/verify/numbers/sv.html
  ordinal: function (number) {
    const b = number % 10
    if ((b === 1 || b === 2) && ((number % 100) !== 11 && (number % 100) !== 12)) {
      return ':a'
    }
    return ':e'
  },
  currency: {
    symbol: 'kr'
  }
})
