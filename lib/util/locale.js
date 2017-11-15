import canUseDOM from './dom/canUseDOM'

function browserLocale (nav) {
  const navigator = nav || (canUseDOM ? window.navigator : { language: 'en' })
  return navigator.language
}

export default { browserLocale }
