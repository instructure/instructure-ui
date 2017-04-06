export default function isValidPropType (element, propType) {
  if (element.type && element.type.propTypes) {
    return !!element.type.propTypes[propType]
  } else {
    return false
  }
}
