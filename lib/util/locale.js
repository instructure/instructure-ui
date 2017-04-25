export function browserLocale () {
  if (typeof navigator !== 'undefined') {
    return navigator.language
  }
  return 'en'
}
