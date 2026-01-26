import type { NewComponentTypes } from '@instructure/ui-themes'
import { LucideIconStyle, LucideIconWrapperProps } from './props'
type StyleParams = {
  size?: LucideIconWrapperProps['size']
  color?: LucideIconWrapperProps['color']
  rotate?: LucideIconWrapperProps['rotate']
  bidirectional?: LucideIconWrapperProps['bidirectional']
  inline?: LucideIconWrapperProps['inline']
  themeOverride?: LucideIconWrapperProps['themeOverride']
}
declare const generateStyle: (
  componentTheme: NewComponentTypes['Icon'],
  params: StyleParams
) => LucideIconStyle
export default generateStyle
//# sourceMappingURL=styles.d.ts.map
