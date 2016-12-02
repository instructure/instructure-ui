const onePixel = 0.0625
const breakpoints = {
  phone: 30, // 480px
  tablet: 48, // 768px
  desktop: 62, // 992px
  wide: 75 // 1200px
}

export default Object.freeze({
  phone: breakpoints.phone + 'em',
  tablet: breakpoints.tablet + 'em',
  desktop: breakpoints.desktop + 'em',
  wide: breakpoints.wide + 'em',

  maxWidth: (breakpoints.desktop - onePixel) + 'em'
})
