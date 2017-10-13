import getDisplayName from './getDisplayName'

/**
 * ---
 * category: utilities/react
 * ---
 * Check if a React component instance (React element) matches one of the
 * specified types.
 *
 * @param {ReactComponent} componentInstance
 * @param {Array} types an array of React components
 * @returns {Boolean} true if the component matches at least one of the types
 */
export default function matchComponentTypes (componentInstance, types = []) {
  if (componentInstance && componentInstance.type) {
    const displayNames = types.map((type) => getDisplayName(type))
    return displayNames.indexOf(getDisplayName(componentInstance.type)) >= 0
  } else {
    return false
  }
}
