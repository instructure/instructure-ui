import warning from '../warning'

/**
 * ---
 * category: utilities/react
 * ---
 * Get the displayName of a React component.
 *
 * For [themeable](#themeable) components defined as ES6 classes, the displayName can
 * be added via [babel plugin](#babel-plugin-transform-class-display-name).
 *
 * @param {ReactComponent|String} Component
 * @returns {String} the component displayName
 */
export default function getDisplayName (Component) {
  warning(
    typeof Component === 'string' || typeof Component.displayName !== 'undefined',
    '%s is missing the property "displayName".',
    Component.name
  )
  return typeof Component === 'string' ? Component : Component.displayName
}
