import warning from '../warning'

export default function getDisplayName (Component) {
  warning(
    typeof Component === 'string' || typeof Component.displayName !== 'undefined',
    '%s is missing the property "displayName".',
    Component.name
  )
  return typeof Component === 'string' ? Component : Component.displayName
}
