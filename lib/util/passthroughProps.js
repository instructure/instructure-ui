import omit from 'object.omit'
import pick from 'object.pick'

export function omitProps (props, propTypes = {}, exclude = []) {
  const keys = Object.keys(propTypes)
    .concat(['theme', 'children', 'className', 'style'])
    .concat(exclude)

  return omit(props, keys)
}

export function pickProps (props, propTypes = {}, include = []) {
  return pick(props, Object.keys(propTypes).concat(include))
}
