import type { ComponentStyle, ThemeOverrideValue } from '@instructure/emotion'
import type { OtherHTMLAttributes } from '@instructure/shared-types'
/**
 * SVGIcon size tokens (legacy) - DEPRECATED
 */
type SVGIconSizeToken = 'x-small' | 'small' | 'medium' | 'large' | 'x-large'
/**
 * SVGIcon color tokens (legacy) - DEPRECATED
 */
type LegacyColorTokens =
  | 'primary'
  | 'secondary'
  | 'primary-inverse'
  | 'secondary-inverse'
  | 'success'
  | 'error'
  | 'alert'
  | 'warning'
  | 'brand'
  | 'auto'
/**
 * Semantic size tokens for icons - includes SVGIcon legacy tokens, they are DEPRECATED and will be deleted, DON'T USE THEM.
 */
type IconSizeToken = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | SVGIconSizeToken
/**
 * Semantic color tokens from Icon theme
 */
type IconColorToken =
  | 'baseColor'
  | 'mutedColor'
  | 'successColor'
  | 'errorColor'
  | 'warningColor'
  | 'infoColor'
  | 'onColor'
  | 'inverseColor'
  | 'disabledBaseColor'
  | 'disabledOnColor'
  | 'dark'
  | 'ai'
  | 'navigationPrimaryBaseColor'
  | 'navigationPrimaryHoverColor'
  | 'navigationPrimaryActiveColor'
  | 'navigationPrimaryOnColorBaseColor'
  | 'navigationPrimaryOnColorHoverColor'
  | 'navigationPrimaryOnColorActiveColor'
  | 'actionSecondaryBaseColor'
  | 'actionSecondaryHoverColor'
  | 'actionSecondaryActiveColor'
  | 'actionSecondaryDisabledColor'
  | 'actionStatusBaseColor'
  | 'actionStatusHoverColor'
  | 'actionStatusActiveColor'
  | 'actionStatusDisabledColor'
  | 'actionAiBaseColor'
  | 'actionAiHoverColor'
  | 'actionAiActiveColor'
  | 'actionAiDisabledColor'
  | 'actionPrimaryBaseColor'
  | 'actionPrimaryHoverColor'
  | 'actionPrimaryActiveColor'
  | 'actionPrimaryDisabledColor'
  | 'actionPrimaryOnColorBaseColor'
  | 'actionPrimaryOnColorHoverColor'
  | 'actionPrimaryOnColorActiveColor'
  | 'actionPrimaryOnColorDisabledColor'
  | 'accentBlueColor'
  | 'accentGreenColor'
  | 'accentRedColor'
  | 'accentOrangeColor'
  | 'accentGreyColor'
  | 'accentAshColor'
  | 'accentPlumColor'
  | 'accentVioletColor'
  | 'accentStoneColor'
  | 'accentSkyColor'
  | 'accentHoneyColor'
  | 'accentSeaColor'
  | 'accentAuroraColor'
  | 'actionTertiaryBaseColor'
  | 'actionTertiaryHoverColor'
  | 'actionTertiaryActiveColor'
  | 'actionTertiaryDisabledColor'
  | 'actionSuccessSecondaryBaseColor'
  | 'actionSuccessSecondaryDisabledColor'
  | 'actionDestructiveSecondaryBaseColor'
  | 'actionDestructiveSecondaryDisabledColor'
  | 'actionAiSecondaryDisabledColor'
  | 'actionSecondaryOnColorBaseColor'
  | 'actionSecondaryOnColorHoverColor'
  | 'actionSecondaryOnColorActiveColor'
  | 'actionSecondaryOnColorDisabledColor'
  | 'actionSuccessSecondaryHoverColor'
  | 'actionSuccessSecondaryActiveColor'
  | 'actionDestructiveSecondaryHoverColor'
  | 'actionDestructiveSecondaryActiveColor'
type InstUIIconOwnProps = {
  /**
   * Semantic size token (also determines stroke width automatically)
   */
  size?: IconSizeToken
  /**
   * Icon theme color token
   */
  color?: 'inherit' | IconColorToken | LegacyColorTokens
  /**
   * Rotation angle in degrees
   */
  rotate?: '0' | '90' | '180' | '270'
  /**
   * Flip horizontally in RTL contexts
   * @default true
   */
  bidirectional?: boolean
  /**
   * Display mode: inline-block (true) or block (false)
   * @default true
   */
  inline?: boolean
  /**
   * Accessible title (adds role="img" and aria-label)
   */
  title?: string
  /**
   * provides a reference to the underlying SVG element
   */
  elementRef?: (element: SVGSVGElement | null) => void
}
/**
 * Full props: InstUI semantic + theme support + SVG attributes.
 * OtherHTMLAttributes provides SVG props for backward compatibility.
 * children, style, and className are explicitly omitted.
 */
type LucideIconWrapperProps = Omit<
  InstUIIconOwnProps & {
    themeOverride?: ThemeOverrideValue
  } & OtherHTMLAttributes<InstUIIconOwnProps>,
  'children' | 'style' | 'className'
>
type LucideIconStyle = ComponentStyle<'lucideIcon'> & {
  /**
   * Computed numeric size for Lucide icon (in pixels)
   */
  numericSize?: number
  /**
   * Computed numeric stroke width for Lucide icon
   */
  numericStrokeWidth?: number | string
  /**
   * Resolved color from theme for Lucide icon
   */
  resolvedColor?: string
  /**
   * Gradient colors for AI gradient (top and bottom)
   */
  gradientColors?: {
    top: string
    bottom: string
  }
}
export type { LucideIconWrapperProps, InstUIIconOwnProps, LucideIconStyle }
//# sourceMappingURL=props.d.ts.map
