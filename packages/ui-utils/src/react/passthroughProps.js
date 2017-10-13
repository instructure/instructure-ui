import omit from 'object.omit'
import pick from 'object.pick'
/**
 * ---
 * category: utilities/react
 * ---
 * @module passthroughProps
 */


 /**
  * Return a props object with the specified propTypes omitted.
  * Automatically excludes ('theme', 'children', 'className', 'style')
  *
  * @param {Object} props React component props
  * @param {Object} propTypes React component propTypes
  * @param {Array} exclude an optional array of prop names to exclude
  * @returns {Object} props object without the excluded props
  */
export function omitProps (props, propTypes = {}, exclude = []) {
  const keys = Object.keys(propTypes)
    .concat(['theme', 'children', 'className', 'style'])
    .concat(exclude)

  return omit(props, keys)
}

/**
 * Return a props object with only specified propTypes.
 *
 * @param {Object} props React component props
 * @param {Object} propTypes React component propTypes
 * @param {Array} include an optional array of prop names to include
 * @returns {Object} props object with only the included props
 */
export function pickProps (props, propTypes = {}, include = []) {
  return pick(props, Object.keys(propTypes).concat(include))
}
