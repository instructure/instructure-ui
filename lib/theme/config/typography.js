const base = '"Open Sans", sans-serif'
const light = '"Open Sans Light"'
const bold = '"Open Sans Bold"'

export default Object.freeze({
  fontFamilyBase: base,
  fontFamilyBold: [bold, base].join(', '),
  fontFamilyLight: [light, base].join(', '),
  fontFamilyMonospace: 'Menlo, Consolas, Monaco, "Andale Mono", monospace',

  fontSizeExtraSmall: '0.75rem',
  fontSizeSmall: '0.875rem',
  fontSizeMedium: '1rem',
  fontSizeLarge: '1.125rem',
  fontSizeExtraLarge: '1.75rem',

  fontWeightBold: 500,
  fontWeightNormal: 300,
  fontWeightLight: 200,

  lineHeightBase: 1.4,
  lineHeightFit: 1.1,
  lineHeightCondensed: 1.25,
  lineHeightDouble: 2
})
