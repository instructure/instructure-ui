import canUseDOM from './canUseDOM'

export default function customPropertiesSupported () {
  return (canUseDOM && window.CSS && window.CSS.supports && window.CSS.supports('color', 'var(--primary)'))
}
