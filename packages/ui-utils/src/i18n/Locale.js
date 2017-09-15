function browserLocale (nav = navigator) {
  if (typeof nav !== 'undefined') {
    return nav.language
  }
  return 'en'
}

export default { browserLocale }
