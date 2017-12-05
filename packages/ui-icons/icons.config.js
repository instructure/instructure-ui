const libraryName = 'InstructureIcons'
const packageName = '@instructure/ui-icons'
const source = './src/'
const destination = './lib/'

const svg = {
  source: `${source}**/*.sketch`,
  destination: `${source}__svg__/`
}

const fonts = {
  source: svg.destination, // variant is added to path
  destination: `${destination}font/`,
  fontName: libraryName,
  className: 'icon',
  formats: ['woff2', 'woff', 'eot', 'ttf', 'svg']
}

const react = {
  source: svg.destination,
  tmp: './__build__/',
  destination: `${destination}`,
  componentBaseName: 'Icon'
}

const deprecated = {
  /* [icon name]: [icon name to use instead]
  /* e.g. 'arrow-up': 'arrow' */
}

module.exports = {
  source,
  destination,
  libraryName,
  packageName,
  svg,
  fonts,
  react,
  deprecated
}
