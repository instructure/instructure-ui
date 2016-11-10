import invariant from 'invariant'

export default function getDisplayName (Component) {
  // Note: Component.displayName is being ensured via babel/plugins/class-display-name
  invariant(
    typeof Component === 'string' || typeof Component.displayName !== 'undefined',
    '%s is missing the property "displayName" which is required for themeable components. ' +
    'Once this code is minified the name will be obfuscated to something that is not useful.',
    Component.name
  )
  return typeof Component === 'string' ? Component : Component.displayName
}
