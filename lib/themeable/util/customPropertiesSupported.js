export default function customPropertiesSupported () {
  return (window.CSS && window.CSS.supports && window.CSS.supports('color', 'var(--primary)'))
}
