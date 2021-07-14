/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 - present Instructure, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import {
  BaseTheme,
  Border,
  Forms,
  Shadows,
  Spacing,
  Stacking,
  Typography
} from '@instructure/ui-theme-tokens'

type AvatarThemeVariables = {
  color: BaseTheme['colors']['textBrand']
  background: BaseTheme['colors']['backgroundLightest']
  borderWidthSmall: Border['widthSmall']
  borderWidthMedium: Border['widthMedium']
  borderColor: BaseTheme['colors']['borderMedium']
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightBold']
}

type AlertThemeVariables = {
  background: BaseTheme['colors']['backgroundLightest']
  color: BaseTheme['colors']['textDarkest']
  marginTop: Spacing['small']
  borderRadius: Border['radiusMedium']
  borderWidth: Border['widthMedium']
  borderStyle: Border['style']
  contentPadding: `${Spacing['small']} ${Spacing['medium']} `
  contentFontSize: Typography['fontSizeMedium']
  contentFontFamily: Typography['fontFamily']
  contentFontWeight: Typography['fontWeightNormal']
  contentLineHeight: Typography['lineHeightCondensed']
  closeButtonMarginTop: Spacing['xSmall']
  closeButtonMarginRight: Spacing['xxSmall']
  iconColor: BaseTheme['colors']['textLightest']
  successBorderColor: BaseTheme['colors']['borderSuccess']
  successIconBackground: BaseTheme['colors']['backgroundSuccess']
  infoBorderColor: BaseTheme['colors']['borderInfo']
  infoIconBackground: BaseTheme['colors']['backgroundInfo']
  warningBorderColor: BaseTheme['colors']['borderWarning']
  warningIconBackground: BaseTheme['colors']['backgroundWarning']
  dangerBorderColor: BaseTheme['colors']['borderDanger']
  dangerIconBackground: BaseTheme['colors']['backgroundDanger']
  boxShadow: Shadows['depth2']
}

type BadgeThemeVariables = {
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightNormal']
  color: BaseTheme['colors']['textLightest']
  fontSize: Typography['fontSizeXSmall']
  colorDanger: BaseTheme['colors']['textDanger']
  colorSuccess: BaseTheme['colors']['textSuccess']
  colorPrimary: BaseTheme['colors']['textBrand']
  notificationZIndex: Stacking['above']
  sizeNotification: Spacing['small']
  padding: Spacing['xxSmall']
  pulseBorderThickness: Border['widthMedium']
}

type BillboardThemeVariables = {
  fontFamily: Typography['fontFamily']
  paddingSmall: Spacing['small']
  paddingMedium: Spacing['medium']
  paddingLarge: Spacing['medium']
  iconColor: BaseTheme['colors']['textDark']
  mediumMargin: Spacing['small']
  largeMargin: Spacing['medium']
  iconHoverColor: BaseTheme['colors']['textLink']
  backgroundColor: BaseTheme['colors']['backgroundLightest']
  iconHoverColorInverse: BaseTheme['colors']['textLightest']
  buttonBorderWidth: Border['widthMedium']
  buttonBorderRadius: Border['radiusLarge']
  messageColor: BaseTheme['colors']['textDark']
  messageColorClickable: BaseTheme['colors']['textLink']
  messageColorInverse: BaseTheme['colors']['textLight']
  messageFontSizeSmall: Typography['fontSizeSmall']
  messageFontSizeMedium: Typography['fontSizeMedium']
  messageFontSizeLarge: Typography['fontSizeLarge']
  clickableActiveBg: BaseTheme['colors']['backgroundBrand']
  clickableActiveText: BaseTheme['colors']['textLightest']
  buttonBorderStyle: Border['style']
}

type BreadcrumbThemeVariables = {
  fontFamily: Typography['fontFamily']
  separatorColor: BaseTheme['colors']['borderDark']
  smallFontSize: Typography['fontSizeSmall']
  mediumFontSize: Typography['fontSizeMedium']
  largeFontSize: Typography['fontSizeLarge']
}

type BaseButtonThemeVariables = {
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightNormal']
  borderRadius: Border['radiusMedium']
  borderStyle: Border['style']
  borderWidth: Border['widthSmall']
  smallHeight: Forms['inputHeightSmall']
  smallFontSize: Typography['fontSizeSmall']
  smallPaddingHorizontal: Spacing['xSmall']
  mediumHeight: Forms['inputHeightMedium']
  mediumFontSize: Typography['fontSizeMedium']
  mediumPaddingHorizontal: Spacing['small']
  largeHeight: Forms['inputHeightLarge']
  largeFontSize: Typography['fontSizeLarge']
  largePaddingHorizontal: Spacing['medium']
  lineHeight: Typography['lineHeightFit']
  iconTextGap: Spacing['xSmall']
  iconTextGapCondensed: Spacing['xxSmall']

  primaryColor: string
  primaryBorderColor: string
  primaryBackground: string
  primaryHoverBackground: string
  primaryActiveBackground: string
  primaryActiveBoxShadow: string
  primaryGhostColor: string
  primaryGhostBorderColor: string
  primaryGhostBackground: string
  primaryGhostHoverBackground: string
  primaryGhostActiveBackground: string
  primaryGhostActiveBoxShadow: string

  secondaryBorderColor: string
  secondaryBackground: string
  secondaryHoverBackground: string
  secondaryActiveBackground: string
  secondaryActiveBoxShadow: string
  secondaryGhostColor: string
  secondaryGhostBorderColor: string
  secondaryGhostBackground: string
  secondaryGhostHoverBackground: string
  secondaryGhostActiveBackground: string
  secondaryGhostActiveBoxShadow: string

  successBorderColor: string
  successBackground: string
  successHoverBackground: string
  successActiveBackground: string
  successActiveBoxShadow: string
  successGhostColor: string
  successGhostBorderColor: string
  successGhostBackground: string
  successGhostHoverBackground: string
  successGhostActiveBackground: string
  successGhostActiveBoxShadow: string

  dangerBorderColor: string
  dangerBackground: string
  dangerHoverBackground: string
  dangerActiveBackground: string
  dangerActiveBoxShadow: string
  dangerGhostColor: string
  dangerGhostBorderColor: string
  dangerGhostBackground: string
  dangerGhostHoverBackground: string
  dangerGhostActiveBackground: string
  dangerGhostActiveBoxShadow: string

  primaryInverseBorderColor: string
  primaryInverseBackground: string
  primaryInverseHoverBackground: string
  primaryInverseActiveBackground: string
  primaryInverseActiveBoxShadow: string
  primaryInverseGhostColor: string
  primaryInverseGhostBorderColor: string
  primaryInverseGhostBackground: string
  primaryInverseGhostHoverBackground: string
  primaryInverseGhostActiveBackground: string
  primaryInverseGhostActiveBoxShadow: string
}

type CloseButtonThemeVariables = {
  offsetMedium: Spacing['medium']
  offsetSmall: Spacing['small']
  offsetXSmall: Spacing['xSmall']
  zIndex: Stacking['above']
}
type ThemeVariables = {
  Avatar: AvatarThemeVariables
  Alert: AlertThemeVariables
  Badge: BadgeThemeVariables
  Billboard: BillboardThemeVariables
  Breadcrumb: BreadcrumbThemeVariables
  BaseButton: BaseButtonThemeVariables
  Button: BaseButtonThemeVariables
  CloseButton: CloseButtonThemeVariables
  CondensedButton: BaseButtonThemeVariables
  IconButton: BaseButtonThemeVariables
}
type ComponentThemeMap = ComponentTheme<ThemeVariables>

type ComponentTheme<Type> = {
  [Key in keyof Type]: Type[Key]
}
export type { ThemeVariables, ComponentThemeMap, AvatarThemeVariables }
