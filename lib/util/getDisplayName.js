export default function getDisplayName (Component) {
  return Component.displayName ||
    Component.name ||
    (typeof Component === 'string' ? Component : 'Component')
}
