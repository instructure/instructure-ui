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
  'discussion-x': 'x',
  'copy-course': 'copy',
  'discussion-reply-dark': 'more',
  'discussion-reply': 'more',
  'discussion-search': 'search',
  'search-address-book': 'search',
  'rss-add': 'add',
  'user-add': 'add',
  'materials-required-light': 'materials-required',
  'mature-light': 'mature',
  'note-dark': 'note',
  'note-light': 'note',
  'icon-reply-2': 'icon-reply',
  'icon-replied': 'icon-reply',
  'settings-2': 'settings',
  'twitter-boxed': 'twitter'
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
