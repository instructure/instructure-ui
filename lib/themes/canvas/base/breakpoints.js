const onePixel = 0.0625 // base = 16px
const breakpoints = {
  xxSmall: 8, // 128px
  xSmall: 16, // 256px
  small: 30, // 480px
  medium: 48, // 768px
  large: 62, // 992px
  xLarge: 75 // 1200px
}

export default Object.freeze({
  xxSmall: `${breakpoints.xxSmall}em`,
  xSmall: `${breakpoints.xSmall}em`,
  small: `${breakpoints.small}em`,
  medium: `${breakpoints.medium}em`,
  large: `${breakpoints.large}em`,
  xLarge: `${breakpoints.xLarge}em`,

  maxWidth: `${breakpoints.large - onePixel}em`
})
