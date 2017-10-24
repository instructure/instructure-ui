/**
 * ---
 * category: utilities/react
 * ---
 * Get the displayName of a React component.
 *
 * @param {ReactComponent|String} Component
 * @returns {String} the component display name
 */
export default function getDisplayName (Component) {
  return typeof Component === 'string' ? Component : Component.name
}
