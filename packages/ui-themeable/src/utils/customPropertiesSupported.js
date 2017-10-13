import canUseDOM from '@instructure/ui-utils/lib/dom/canUseDOM'

/**
 * ---
 * category: utilities/DOM
 * ---
 * check if CSS custom properties (CSS variables) are supported
 * @returns {Boolean} true if the DOM is available and CSS variables are supported
 */
export default function customPropertiesSupported () {
  return (canUseDOM && window.CSS && window.CSS.supports && window.CSS.supports('color', 'var(--primary)'))
}
