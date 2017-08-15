import warning from '../../util/warning'

export default function getDisplayName (Component) {
  // Note: Component.displayName is being ensured via babel/plugins/transform-class-display-name
  warning(
    typeof Component === 'string' || typeof Component.displayName !== 'undefined',
    '[themeable] %s is missing the property "displayName" which is required for @themeable components. ' +
    'Once this code is minified the name will be obfuscated to something that is not useful.',
    Component.name
  )
  return typeof Component === 'string' ? Component : Component.displayName
}
