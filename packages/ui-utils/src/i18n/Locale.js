/**
* ---
* category: utilities/i18n
* ---
* Localization utilities
* @module Locale
*/
export default {
  /**
  * Return the locale from the browser
  * @returns {String} locale (defaults to 'en')
  */
  browserLocale (nav = navigator) {
    if (typeof nav !== 'undefined') {
      return nav.language
    }
    return 'en'
  }
}
