import canUseDOM from '@instructure/ui-utils/lib/dom/canUseDOM'

export default function customPropertiesSupported () {
  return (canUseDOM && window.CSS && window.CSS.supports && window.CSS.supports('color', 'var(--primary)'))
}
