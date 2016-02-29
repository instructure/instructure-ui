const base = '"Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif'
const medium = '"HelveticaNeue-Medium", "Helvetica Neue Medium"'
const light = '"HelveticaNeue-Light", "Helvetica Neue Light"'
const ultralight = '"HelveticaNeue-UltraLight", "Helvetica Neue UltraLight"'
const bold = '"HelveticaNeue-Bold", "Helvetica Neue Bold"'

export default Object.freeze({
  fontFamilyBase: [medium, base].join(', '),
  fontFamilyBold: [bold, medium, base].join(', '),
  fontFamilyLight: [light, medium, base].join(', '),
  fontFamilyUltraLight: [ultralight, light, medium, base].join(', '),
  fontFamilyMonospace: 'Menlo, Consolas, Monaco, "Andale Mono", monospace',

  fontSizeExtraSmall: '0.75rem',
  fontSizeSmall: '0.875rem',
  fontSizeMedium: '1rem',
  fontSizeLarge: '1.125rem',
  fontSizeExtraLarge: '1.75rem',

  fontWeightBold: 600,
  fontWeightNormal: 300,
  fontWeightLight: 200,

  lineHeightBase: 1.4,
  lineHeightFit: 1.1,
  lineHeightCondensed: 1.25,
  lineHeightDouble: 2
})
