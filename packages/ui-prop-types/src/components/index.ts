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
  Breakpoints,
  Forms,
  Media,
  Shadows,
  Spacing,
  Stacking,
  Transitions,
  Typography,
  Size,
  Radius,
  StrokeWidth
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
  contentPadding: `${Spacing['small']} ${Spacing['medium']}`
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

type BylineThemeVariables = {
  fontFamily: Typography['fontFamily']
  background: BaseTheme['colors']['backgroundLightest']
  color: BaseTheme['colors']['textDarkest']
  figureMargin: Spacing['small']
  titleMargin: Spacing['xSmall']
  titleFontSize: Typography['fontSizeLarge']
  titleFontWeight: Typography['fontWeightNormal']
  titleLineHeight: Typography['lineHeightFit']
  descriptionFontSize: Typography['fontSizeMedium']
  descriptionFontWeight: Typography['fontWeightNormal']
  descriptionLineHeight: Typography['lineHeightCondensed']
  small: Breakpoints['small']
  medium: Breakpoints['medium']
  large: Breakpoints['large']
}

type CalendarDayThemeVariables = {
  color: BaseTheme['colors']['textDarkest']
  background: BaseTheme['colors']['backgroundLightest']
  fontSize: Typography['fontSizeMedium']
  padding: Spacing['xxSmall']
  height: Forms['inputHeightSmall']
  minWidth: Forms['inputHeightSmall']
  outsideMonthColor: BaseTheme['colors']['textDark']
  selectedBackground: BaseTheme['colors']['backgroundSuccess']
  selectedColor: BaseTheme['colors']['textLightest']
  selectedBorderRadius: Border['radiusMedium']
  todayBackground: BaseTheme['colors']['backgroundBrand']
  todayColor: BaseTheme['colors']['textLightest']
  todayBorderRadius: Forms['inputHeightSmall']
}

type CalendarThemeVariables = {
  fontSize: Typography['fontSizeMedium']
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightNormal']
  color: BaseTheme['colors']['textDarkest']
  background: BaseTheme['colors']['backgroundLightest']
  navMargin: Spacing['small']
  maxHeaderWidth: Spacing['medium']
}
type CheckboxFacadeThemeVariables = {
  color: BaseTheme['colors']['textLightest']
  borderWidth: Border['widthSmall']
  borderColor: BaseTheme['colors']['borderDark']
  borderRadius: Border['radiusMedium']
  background: BaseTheme['colors']['backgroundLightest']
  marginRight: Spacing['xSmall']
  padding: Spacing['xxxSmall']
  checkedBackground: BaseTheme['colors']['backgroundDarkest']
  checkedBorderColor: BaseTheme['colors']['borderDarkest']
  hoverBorderColor: BaseTheme['colors']['borderDarkest']
  focusBorderColor: BaseTheme['colors']['borderBrand']
  focusBorderWidth: Border['widthMedium']
  focusBorderStyle: Border['style']
  labelColor: BaseTheme['colors']['textDarkest']
  checkedLabelColor: BaseTheme['colors']['textDarkest']
  labelFontFamily: Typography['fontFamily']
  labelFontWeight: Typography['fontWeightNormal']
  labelLineHeight: Typography['lineHeightCondensed']
  labelFontSizeSmall: Typography['fontSizeSmall']
  labelFontSizeMedium: Typography['fontSizeMedium']
  labelFontSizeLarge: Typography['fontSizeLarge']
}

type ToggleFacadeThemeVariables = {
  color: BaseTheme['colors']['textLightest']
  background: BaseTheme['colors']['backgroundLight']
  borderColor: BaseTheme['colors']['borderMedium']
  borderWidth: Border['widthMedium']
  marginEnd: Spacing['small']
  marginStart: Spacing['small']
  marginVertical: Spacing['xSmall']
  checkedBackground: BaseTheme['colors']['backgroundSuccess']
  uncheckedIconColor: BaseTheme['colors']['textDarkest']
  checkedIconColor: BaseTheme['colors']['textSuccess']
  focusOutlineColor: BaseTheme['colors']['borderBrand']
  focusBorderWidth: Border['widthMedium']
  focusBorderStyle: Border['style']
  toggleBackground: BaseTheme['colors']['backgroundLightest']
  toggleShadow: Shadows['depth1']
  toggleSize: Forms['inputHeightSmall']
  labelColor: BaseTheme['colors']['textDarkest']
  labelFontFamily: Typography['fontFamily']
  labelFontWeight: Typography['fontWeightNormal']
  labelLineHeight: Typography['lineHeightCondensed']
  labelFontSizeSmall: Typography['fontSizeSmall']
  labelFontSizeMedium: Typography['fontSizeMedium']
  labelFontSizeLarge: Typography['fontSizeLarge']
}

type CodeEditorThemeVariables = {
  fontFamily: Typography['fontFamilyMonospace']
  fontSize: Typography['fontSizeSmall']
  background: BaseTheme['colors']['backgroundLight']
  border: `${Border['widthSmall']} ${string} ${BaseTheme['colors']['borderLight']}`
  borderRadius: Border['radiusMedium']
  focusBorderColor: BaseTheme['colors']['borderBrand']
  focusBoxShadow: BaseTheme['colors']['borderLightest']
  horizontalPadding: Spacing['xSmall']
  verticalPadding: Spacing['xxSmall']
  color: BaseTheme['colors']['textDarkest']
  lineNumberColor: BaseTheme['colors']['textDark']
  gutterBorder: BaseTheme['colors']['borderLight']
  gutterBackground: BaseTheme['colors']['backgroundLight']
  gutterMarkerColor: BaseTheme['colors']['textBrand']
  gutterMarkerSubtleColor: BaseTheme['colors']['textDark']
  cursorColor: BaseTheme['colors']['textDarkest']
  secondaryCursorColor: BaseTheme['colors']['textDark']
  rulerColor: BaseTheme['colors']['borderDark']
  matchingBracketOutline: BaseTheme['colors']['textDark']
  nonMatchingBracketColor: BaseTheme['colors']['textDanger']
  activeLineBackground: BaseTheme['colors']['backgroundLight']
  selectedBackground: BaseTheme['colors']['backgroundLight']
  fatCursorBackground: BaseTheme['colors']['backgroundSuccess']
  zIndex: Stacking['above']
  quoteColor: BaseTheme['colors']['textSuccess']
  headerColor: BaseTheme['colors']['textWarning']
  negativeColor: BaseTheme['colors']['textDanger']
  positiveColor: BaseTheme['colors']['textSuccess']
  keywordColor: BaseTheme['colors']['textBrand']
  atomColor: BaseTheme['colors']['textWarning']
  numberColor: BaseTheme['colors']['textWarning']
  defColor: BaseTheme['colors']['textDarkest']
  variableColor: BaseTheme['colors']['textBrand']
  secondaryVariableColor: BaseTheme['colors']['textWarning']
  typeColor: BaseTheme['colors']['textBrand']
  commentColor: BaseTheme['colors']['textDark']
  stringColor: BaseTheme['colors']['textBrand']
  secondaryStringColor: BaseTheme['colors']['textDanger']
  metaColor: BaseTheme['colors']['textDarkest']
  qualifierColor: BaseTheme['colors']['textSuccess']
  builtInColor: BaseTheme['colors']['textWarning']
  bracketColor: BaseTheme['colors']['borderDark']
  tagColor: BaseTheme['colors']['textSuccess']
  attributeColor: BaseTheme['colors']['textBrand']
  hrColor: BaseTheme['colors']['borderDark']
  linkColor: BaseTheme['colors']['textBrand']
  errorColor: BaseTheme['colors']['textDanger']
  propertyColor: BaseTheme['colors']['textAlert']
  nodeColor: BaseTheme['colors']['textWarning']
  operatorColor: BaseTheme['colors']['textDarkest']
}

type DrawerLayoutContentThemeVariables = {
  duration: Transitions['duration']
}
type DrawerLayoutTrayThemeVariables = {
  background: BaseTheme['colors']['backgroundLightest']
  borderColor: BaseTheme['colors']['borderMedium']
  borderWidth: Border['widthSmall']
  borderStyle: Border['style']
  zIndex: Stacking['topmost']
  boxShadow: Shadows['depth3']
}

type FileDropThemeVariables = {
  backgroundColor: BaseTheme['colors']['backgroundLightest']
  borderRadius: Border['radiusLarge']
  borderWidth: Border['widthMedium']
  borderColor: BaseTheme['colors']['borderMedium']
  hoverBorderColor: BaseTheme['colors']['borderBrand']
  acceptedColor: BaseTheme['colors']['textBrand']
  rejectedColor: BaseTheme['colors']['textDanger']
}

type FlexThemeVariables = {
  fontFamily: Typography['fontFamily']
}

type FormFieldGroupThemeVariables = {
  borderWidth: Border['widthSmall']
  borderStyle: Border['style']
  borderRadius: Border['radiusMedium']
  errorBorderColor: BaseTheme['colors']['borderDanger']
  errorFieldsPadding: Spacing['xSmall']
}

type FormFieldLabelThemeVariables = {
  color: BaseTheme['colors']['textDarkest']
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightBold']
  fontSize: Typography['fontSizeMedium']
  lineHeight: Typography['lineHeightFit']
}

type FormFieldMessageThemeVariables = {
  colorHint: BaseTheme['colors']['textDarkest']
  colorError: BaseTheme['colors']['textDanger']
  colorSuccess: BaseTheme['colors']['textSuccess']
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightNormal']
  fontSize: Typography['fontSizeSmall']
  lineHeight: Typography['lineHeight']
}

type FormFieldMessagesThemeVariables = {
  topMargin: Spacing['xxSmall']
}

type GridThemeVariables = {
  spacingSmall: Spacing['small']
  spacingMedium: Spacing['medium']
  spacingLarge: Spacing['large']
  mediumMin: Media['mediumMin']
  largeMin: Media['largeMin']
  xLargeMin: Media['xLargeMin']
}
type HeadingThemeVariables = {
  lineHeight: Typography['lineHeightFit']
  h1FontSize: Typography['fontSizeXXLarge']
  h1FontWeight: Typography['fontWeightLight']
  h1FontFamily: Typography['fontFamily']
  h2FontSize: Typography['fontSizeXLarge']
  h2FontWeight: Typography['fontWeightNormal']
  h2FontFamily: Typography['fontFamily']
  h3FontSize: Typography['fontSizeLarge']
  h3FontWeight: Typography['fontWeightBold']
  h3FontFamily: Typography['fontFamily']
  h4FontSize: Typography['fontSizeMedium']
  h4FontWeight: Typography['fontWeightBold']
  h4FontFamily: Typography['fontFamily']
  h5FontSize: Typography['fontSizeSmall']
  h5FontWeight: Typography['fontWeightNormal']
  h5FontFamily: Typography['fontFamily']
  primaryInverseColor: BaseTheme['colors']['textLightest']
  primaryColor: BaseTheme['colors']['textDarkest']
  secondaryColor: BaseTheme['colors']['textDark']
  secondaryInverseColor: BaseTheme['colors']['textLight']
  borderPadding: Spacing['xxxSmall']
  borderColor: BaseTheme['colors']['borderMedium']
  borderWidth: Border['widthSmall']
  borderStyle: Border['style']
}

type LinkThemeVariables = {
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightNormal']
  color: BaseTheme['colors']['textLink']
  focusOutlineWidth: Border['widthMedium']
  focusOutlineColor: BaseTheme['colors']['borderBrand']
  focusOutlineStyle: Border['style']
  hoverColor: BaseTheme['colors']['textLink']
  colorInverse: BaseTheme['colors']['textLight']
  focusInverseOutlineColor: BaseTheme['colors']['borderLightest']
  focusInverseIconOutlineColor: BaseTheme['colors']['borderLightest']
  iconPlusTextMargin: Spacing['xxSmall']
}

type InlineListItemThemeVariables = {
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightNormal']
  fontSizeSmall: Typography['fontSizeSmall']
  fontSizeMedium: Typography['fontSizeMedium']
  fontSizeLarge: Typography['fontSizeLarge']
  color: BaseTheme['colors']['textDark']
  lineHeight: Typography['lineHeightCondensed']
  noneSpacing: Spacing['xSmall']
  pipeSpacing: Spacing['xSmall']
  slashSpacing: Spacing['xSmall']
  arrowSpacing: Spacing['xSmall']
  marginBottomDefault: Spacing['xxxSmall']
  spacingXXXSmall: Spacing['xxxSmall']
  spacingXXSmall: Spacing['xxSmall']
  spacingXSmall: Spacing['xSmall']
  spacingSmall: Spacing['small']
  spacingMedium: Spacing['medium']
  spacingLarge: Spacing['large']
  spacingXLarge: Spacing['xLarge']
  spacingXXLarge: Spacing['xxLarge']
}

type ListItemThemeVariables = {
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightNormal']
  lineHeight: Typography['lineHeight']
  fontSizeSmall: Typography['fontSizeSmall']
  fontSizeMedium: Typography['fontSizeMedium']
  fontSizeLarge: Typography['fontSizeLarge']
  color: BaseTheme['colors']['textDarkest']
  spacingXXXSmall: Spacing['xxxSmall']
  spacingXXSmall: Spacing['xxSmall']
  spacingXSmall: Spacing['xSmall']
  spacingSmall: Spacing['small']
  spacingMedium: Spacing['medium']
  spacingLarge: Spacing['large']
  spacingXLarge: Spacing['xLarge']
  spacingXXLarge: Spacing['xxLarge']
  delimiterDashedBorder: `${Border['widthSmall']} ${string} ${BaseTheme['colors']['borderMedium']}`
  delimiterSolidBorder: `${Border['widthSmall']} ${string} ${BaseTheme['colors']['borderMedium']}`
}

type ListThemeVariables = {
  listPadding: Spacing['large']
  orderedNumberFontWeight: Typography['fontWeightBold']
  orderedNumberMargin: Spacing['xSmall']
}

type MenuItemThemeVariables = {
  padding: `${Spacing['xSmall']} ${Spacing['small']}`
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightNormal']
  lineHeight: Typography['lineHeightCondensed']
  fontSize: Typography['fontSizeMedium']
  labelPadding: Spacing['large']
  labelColor: BaseTheme['colors']['textDarkest']
  background: BaseTheme['colors']['backgroundLightest']
  iconColor: BaseTheme['colors']['textDarkest']
  iconPadding: Spacing['small']
  activeBackground: BaseTheme['colors']['backgroundBrand']
  activeLabelColor: BaseTheme['colors']['textLightest']
  activeIconColor: BaseTheme['colors']['textLightest']
}

type MenuGroupThemeVariables = {
  fontSize: Typography['fontSizeMedium']
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightBold']
  padding: `${Spacing['xSmall']} ${Spacing['small']}`
  color: BaseTheme['colors']['textDarkest']
  background: BaseTheme['colors']['backgroundLightest']
}
type MenuSeparatorThemeVariables = {
  background: BaseTheme['colors']['backgroundMedium']
  height: Border['widthSmall']
  margin: `${string} ${Spacing['small']}`
}
type MetricThemeVariables = {
  padding: `${string} ${Spacing['xSmall']}`
  fontFamily: Typography['fontFamily']
  valueColor: BaseTheme['colors']['textDarkest']
  valueFontSize: Typography['fontSizeXLarge']
  valueFontWeight: Typography['fontWeightBold']
  labelColor: BaseTheme['colors']['textDarkest']
  labelFontSize: Typography['fontSizeXSmall']
}
type MetricGroupThemeVariables = {
  lineHeight: Typography['lineHeightCondensed']
}

type ModalBodyThemeVariables = {
  inverseBackground: BaseTheme['colors']['backgroundBrandSecondary']
}
type ModalFooterThemeVariables = {
  background: BaseTheme['colors']['backgroundLight']
  borderColor: BaseTheme['colors']['borderMedium']
  borderWidth: Border['widthSmall']
  borderRadius: Border['radiusMedium']
  padding: Spacing['small']
  inverseBackground: BaseTheme['colors']['backgroundDarkest']
  inverseBorderColor: BaseTheme['colors']['borderDarkest']
}

type ModalHeaderThemeVariables = {
  background: BaseTheme['colors']['backgroundLightest']
  borderColor: BaseTheme['colors']['borderMedium']
  padding: Spacing['medium']
  inverseBackground: BaseTheme['colors']['backgroundDarkest']
  inverseBorderColor: BaseTheme['colors']['backgroundDarkest']
}

type ModalThemeVariables = {
  fontFamily: Typography['fontFamily']
  textColor: BaseTheme['colors']['textDarkest']
  background: BaseTheme['colors']['backgroundLightest']
  borderColor: BaseTheme['colors']['borderMedium']
  borderRadius: Border['radiusMedium']
  inverseBackground: BaseTheme['colors']['backgroundBrandSecondary']
  inverseTextColor: BaseTheme['colors']['textLightest']
  autoMinWidth: Breakpoints['xSmall']
  smallMaxWidth: Breakpoints['small']
  mediumMaxWidth: Breakpoints['medium']
  largeMaxWidth: Breakpoints['large']
  boxShadow: Shadows['depth3']
  zIndex: Stacking['topmost']
}

type TransitionThemeVariables = {
  duration: Transitions['duration']
  timing: Transitions['timing']
}

type AppNavItemThemeVariables = {
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightBold']
  textColor: BaseTheme['colors']['textLink']
  textColorSelected: BaseTheme['colors']['textDarkest']
  padding: Spacing['small']
  backgroundColor: BaseTheme['colors']['backgroundLightest']
}

type AppNavThemeVariables = {
  fontFamily: Typography['fontFamily']
  borderColor: BaseTheme['colors']['borderMedium']
  borderStyle: Border['style']
  borderWidth: Border['widthSmall']
  horizontalMargin: Spacing['xxSmall']
}

type NavigationItemThemeVariables = {
  fontSize: Typography['fontSizeSmall']
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightLight']
  fontColor: BaseTheme['colors']['textLightest']
  iconColor: BaseTheme['colors']['textLightest']
  lineHeight: Typography['lineHeight']
  hoverBackgroundColor: BaseTheme['colors']['backgroundDarkest']
  outerFocusOutline: `${string} ${string} ${string} ${string} ${string} ${BaseTheme['colors']['borderDarkest']}`
  innerFocusOutline: `${string} ${string} ${string} ${string} ${string} ${BaseTheme['colors']['borderLightest']}`
  selectedFontColor: BaseTheme['colors']['textBrand']
  selectedIconColor: BaseTheme['colors']['textBrand']
  selectedBackgroundColor: BaseTheme['colors']['backgroundLightest']
  selectedOuterFocusOutline: `${string} ${string} ${string} ${string} ${string} ${BaseTheme['colors']['borderLightest']}`
  selectedInnerFocusOutline: `${string} ${string} ${string} ${string} ${string} ${BaseTheme['colors']['borderBrand']}`
  contentPadding: Spacing['xxSmall']
}

type NavigationThemeVariables = {
  fontColor: BaseTheme['colors']['textLightest']
  backgroundColor: BaseTheme['colors']['backgroundBrandSecondary']
  fill: BaseTheme['colors']['textLightest']
  focusOutlineInnerWidth: Border['widthMedium']
  focusOutlineOuterWidth: Border['widthSmall']
  focusOutlineInnerColor: BaseTheme['colors']['borderBrand']
  focusOutlineOuterColor: BaseTheme['colors']['borderLightest']
  marginBottom: Spacing['small']
  toggleTransition: Transitions['duration']
}

type NumberInputThemeVariables = {
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightNormal']
  borderWidth: Border['widthSmall']
  borderStyle: Border['style']
  borderColor: BaseTheme['colors']['borderMedium']
  borderRadius: Border['radiusMedium']
  color: BaseTheme['colors']['textDarkest']
  background: BaseTheme['colors']['backgroundLightest']
  padding: `${string} ${Spacing['small']}`
  arrowsColor: BaseTheme['colors']['textDarkest']
  arrowsBackgroundColor: BaseTheme['colors']['backgroundLight']
  arrowsHoverBackgroundColor: BaseTheme['colors']['backgroundMedium']
  arrowsBorderColor: BaseTheme['colors']['borderMedium']
  arrowsActiveBoxShadow: `${string} ${string} ${string} ${string} ${string} ${BaseTheme['colors']['borderMedium']}`
  focusOutlineWidth: Border['widthMedium']
  focusOutlineStyle: Border['style']
  focusOutlineColor: BaseTheme['colors']['borderBrand']
  errorBorderColor: BaseTheme['colors']['borderDanger']
  errorOutlineColor: BaseTheme['colors']['borderDanger']
  placeholderColor: BaseTheme['colors']['textDark']
  mediumFontSize: Typography['fontSizeMedium']
  mediumHeight: Forms['inputHeightMedium']
  largeFontSize: Typography['fontSizeLarge']
  largeHeight: Forms['inputHeightLarge']
}

type OptionsItemThemeVariables = {
  fontSize: Typography['fontSizeMedium']
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightNormal']
  lineHeight: Typography['lineHeightCondensed']
  color: BaseTheme['colors']['textDarkest']
  background: BaseTheme['colors']['backgroundLightest']
  highlightedLabelColor: BaseTheme['colors']['textLightest']
  highlightedBackground: BaseTheme['colors']['backgroundBrand']
  selectedLabelColor: BaseTheme['colors']['textLightest']
  selectedBackground: BaseTheme['colors']['backgroundDark']
  padding: `${Spacing['xSmall']} ${Spacing['small']}`
  iconPadding: Spacing['small']
  nestedPadding: Spacing['medium']
}

type OptionsSeparatorThemeVariables = {
  background: BaseTheme['colors']['backgroundMedium']
  height: Border['widthSmall']
  margin: `${string} ${Spacing['small']}`
}

type OptionsThemeVariables = {
  labelFontWeight: Typography['fontWeightBold']
  background: BaseTheme['colors']['backgroundLightest']
  labelColor: BaseTheme['colors']['textDarkest']
  labelPadding: `${Spacing['xSmall']} ${string}`
  nestedLabelPadding: `${Spacing['xSmall']} ${Spacing['small']}`
}

type MaskThemeVariables = {
  zIndex: Stacking['topmost']
  focusBorderColor: BaseTheme['colors']['borderBrand']
  borderRadius: Border['radiusMedium']
  borderWidth: Border['widthSmall']
}

type PagesThemeVariables = {
  fontSize: Typography['fontSizeMedium']
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightNormal']
  color: BaseTheme['colors']['textDarkest']
  background: BaseTheme['colors']['backgroundLightest']
}

type PillThemeVariables = {
  fontFamily: Typography['fontFamily']
  padding: `${string} ${Spacing['xSmall']}`
  background: BaseTheme['colors']['backgroundLightest']
  textFontSize: Typography['fontSizeXSmall']
  textFontWeight: Typography['fontWeightBold']
  primaryColor: BaseTheme['colors']['textDark']
  infoColor: BaseTheme['colors']['textInfo']
  dangerColor: BaseTheme['colors']['textDanger']
  successColor: BaseTheme['colors']['textSuccess']
  warningColor: BaseTheme['colors']['textWarning']
  alertColor: BaseTheme['colors']['textAlert']
  borderWidth: Border['widthSmall']
  borderStyle: Border['style']
}

type PositionThemeVariables = {
  zIndex: Stacking['topmost']
}

type ProgressBarThemeVariables = {
  color: BaseTheme['colors']['textDarkest']
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightNormal']
  lineHeight: Typography['lineHeightCondensed']
  fontSize: Typography['fontSizeMedium']
  xSmallHeight: Spacing['xSmall']
  xSmallValueFontSize: Typography['fontSizeXSmall']
  smallHeight: Spacing['small']
  smallValueFontSize: Typography['fontSizeXSmall']
  mediumHeight: Spacing['medium']
  mediumValueFontSize: Typography['fontSizeSmall']
  largeHeight: Spacing['large']
  largeValueFontSize: Typography['fontSizeMedium']
  valuePadding: `${Spacing['xxSmall']}`
  meterColorBrand: BaseTheme['colors']['backgroundBrand']
  meterColorBrandInverse: BaseTheme['colors']['backgroundBrand']
  meterColorInfo: BaseTheme['colors']['backgroundInfo']
  meterColorInfoInverse: BaseTheme['colors']['backgroundInfo']
  meterColorSuccessInverse: BaseTheme['colors']['backgroundSuccess']
  meterColorDangerInverse: BaseTheme['colors']['backgroundDanger']
}

type ProgressCircleThemeVariables = {
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightNormal']
  lineHeight: Typography['lineHeightCondensed']
  xSmallSize: `${Size['xSmall']}em`
  xSmallRadius: `${Radius['xSmall']}em`
  xSmallCircumference: `${Radius['xSmall']}em`
  xSmallTransform: `${Size['xSmall']}em`
  xSmallStrokeWidth: `${StrokeWidth['xSmall']}em`
  xSmallBorderOffset: `${Radius['xSmall']}em`
  smallSize: `${Size['small']} em`
  smallRadius: `${Radius['small']}em`
  smallCircumference: `${Radius['small']}em`
  smallTransform: `${Size['small']}em`
  smallStrokeWidth: `${StrokeWidth['small']}em`
  smallBorderOffset: `${Radius['small']}em`
  mediumSize: `${Size['medium']}em`
  mediumRadius: `${Radius['medium']}em`
  mediumCircumference: `${Radius['medium']}em`
  mediumTransform: `${Size['medium']}em`
  mediumStrokeWidth: `${StrokeWidth['medium']}em`
  mediumBorderOffset: `${Radius['medium']}em`
  largeSize: `${Size['large']} em`
  largeRadius: `${Radius['large']}em`
  largeCircumference: `${Radius['large']} em`
  largeTransform: `${Size['large']}em`
  largeStrokeWidth: `${StrokeWidth['large']}em`
  largeBorderOffset: `${Radius['large']}em`
  color: BaseTheme['colors']['textDarkest']
  colorInverse: BaseTheme['colors']['textLightest']
  trackColor: BaseTheme['colors']['backgroundLightest']
  trackBorderColor: BaseTheme['colors']['borderMedium']
  trackBorderColorInverse: BaseTheme['colors']['borderLightest']
  meterColorBrand: BaseTheme['colors']['backgroundBrand']
  meterColorBrandInverse: BaseTheme['colors']['backgroundBrand']
  meterColorInfo: BaseTheme['colors']['backgroundInfo']
  meterColorInfoInverse: BaseTheme['colors']['backgroundInfo']
  meterColorSuccess: BaseTheme['colors']['backgroundSuccess']
  meterColorSuccessInverse: BaseTheme['colors']['backgroundSuccess']
  meterColorDanger: BaseTheme['colors']['backgroundDanger']
  meterColorDangerInverse: BaseTheme['colors']['backgroundDanger']
  meterColorAlert: BaseTheme['colors']['backgroundAlert']
  meterColorAlertInverse: BaseTheme['colors']['backgroundAlert']
  meterColorWarning: BaseTheme['colors']['backgroundWarning']
  meterColorWarningInverse: BaseTheme['colors']['backgroundWarning']
}

type RangeInputThemeVariables = {
  handleBackground: BaseTheme['colors']['backgroundBrand']
  handleShadowColor: BaseTheme['colors']['borderBrand']
  handleHoverBackground: BaseTheme['colors']['backgroundBrand']
  handleFocusBackground: BaseTheme['colors']['backgroundBrand']
  handleFocusOutlineColor: BaseTheme['colors']['borderBrand']
  trackBackground: BaseTheme['colors']['backgroundDark']
  valueColor: BaseTheme['colors']['textLightest']
  valueFontFamily: Typography['fontFamily']
  valueFontWeight: Typography['fontWeightNormal']
  valueSmallFontSize: Typography['fontSizeSmall']
  valueSmallPadding: `${string} ${Spacing['xSmall']}`
  valueSmallLineHeight: Forms['inputHeightSmall']
  valueMediumFontSize: Typography['fontSizeMedium']
  valueMediumPadding: `${string} ${Spacing['small']}`
  valueMediumLineHeight: Forms['inputHeightMedium']
  valueLargeFontSize: Typography['fontSizeLarge']
  valueLargePadding: `${string} ${Spacing['medium']}`
  valueLargeLineHeight: Forms['inputHeightLarge']
}

type RadioInputThemeVariables = {
  labelColor: BaseTheme['colors']['textDarkest']
  labelFontFamily: Typography['fontFamily']
  labelFontWeight: Typography['fontWeightNormal']
  labelLineHeight: Typography['lineHeightCondensed']
  background: BaseTheme['colors']['backgroundLightest']
  borderColor: BaseTheme['colors']['borderDarkest']
  hoverBorderColor: BaseTheme['colors']['borderDarkest']
  focusBorderColor: BaseTheme['colors']['borderBrand']
  focusBorderWidth: Border['widthMedium']
  focusBorderStyle: Border['style']
  simpleFontSizeSmall: Typography['fontSizeSmall']
  simpleFontSizeMedium: Typography['fontSizeMedium']
  simpleFontSizeLarge: Typography['fontSizeLarge']
  simpleFacadeMarginEnd: Spacing['xSmall']
  toggleBorderRadius: Border['radiusSmall']
  toggleBorderWidth: Border['widthLarge']
  toggleBackgroundSuccess: BaseTheme['colors']['backgroundSuccess']
  toggleBackgroundOff: BaseTheme['colors']['backgroundDark']
  toggleBackgroundDanger: BaseTheme['colors']['backgroundDanger']
  toggleBackgroundWarning: BaseTheme['colors']['backgroundWarning']
  toggleHandleText: BaseTheme['colors']['textLightest']
  toggleSmallHeight: Forms['inputHeightSmall']
  toggleMediumHeight: Forms['inputHeightMedium']
  toggleLargeHeight: Forms['inputHeightLarge']
  toggleShadow: Shadows['depth1']
  toggleSmallFontSize: Typography['fontSizeXSmall']
  toggleMediumFontSize: Typography['fontSizeSmall']
  toggleLargeFontSize: Typography['fontSizeMedium']
}

type RatingIconThemeVariables = {
  iconMargin: Spacing['xxxSmall']
  iconEmptyColor: BaseTheme['colors']['textBrand']
  iconFilledColor: BaseTheme['colors']['textBrand']
  smallIconFontSize: Typography['fontSizeMedium']
  mediumIconFontSize: Typography['fontSizeLarge']
  largeIconFontSize: Typography['fontSizeXXLarge']
}

type SelectThemeVariables = {
  fontSize: Typography['fontSizeMedium']
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightNormal']
  smallIconSize: Typography['fontSizeXSmall']
  mediumIconSize: Typography['fontSizeSmall']
  largeIconSize: Typography['fontSizeMedium']
  color: BaseTheme['colors']['textDarkest']
  background: BaseTheme['colors']['backgroundLightest']
}

type SpinnerThemeVariables = {
  trackColor: BaseTheme['colors']['backgroundLight']
  color: BaseTheme['colors']['backgroundBrand']
  inverseColor: BaseTheme['colors']['backgroundBrand']
}

type InlineSVGThemeVariables = {
  primaryInverseColor: BaseTheme['colors']['textLightest']
  primaryColor: BaseTheme['colors']['textDarkest']
  secondaryColor: BaseTheme['colors']['textDark']
  secondaryInverseColor: BaseTheme['colors']['textLight']
  warningColor: BaseTheme['colors']['textWarning']
  brandColor: BaseTheme['colors']['textBrand']
  errorColor: BaseTheme['colors']['textDanger']
  alertColor: BaseTheme['colors']['textAlert']
  successColor: BaseTheme['colors']['textSuccess']
}

type TableBodyThemeVariables = {
  fontSize: Typography['fontSizeMedium']
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightNormal']
  color: BaseTheme['colors']['textDarkest']
  background: BaseTheme['colors']['backgroundLightest']
}

type TableCellThemeVariables = {
  fontSize: Typography['fontSizeMedium']
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightNormal']
  color: BaseTheme['colors']['textDarkest']
  background: BaseTheme['colors']['backgroundLightest']
  borderColor: BaseTheme['colors']['borderMedium']
  lineHeight: Typography['lineHeightCondensed']
  padding: `${Spacing['xSmall']} ${Spacing['small']}`
}

type TableColHeaderThemeVariables = {
  fontSize: Typography['fontSizeMedium']
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightNormal']
  color: BaseTheme['colors']['textDarkest']
  background: BaseTheme['colors']['backgroundLightest']
  borderColor: BaseTheme['colors']['borderMedium']
  lineHeight: Typography['lineHeightCondensed']
  padding: `${Spacing['xSmall']} ${Spacing['small']}`
  focusOutlineColor: BaseTheme['colors']['borderBrand']
  focusOutlineWidth: Border['widthMedium']
  focusOutlineStyle: Border['style']
}

type TableHeadThemeVariables = {
  fontSize: Typography['fontSizeMedium']
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightNormal']
  color: BaseTheme['colors']['textDarkest']
  background: BaseTheme['colors']['backgroundLightest']
}

type TableRowThemeVariables = {
  fontSize: Typography['fontSizeMedium']
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightNormal']
  color: BaseTheme['colors']['textDarkest']
  background: BaseTheme['colors']['backgroundLightest']
  borderColor: BaseTheme['colors']['borderMedium']
  hoverBorderColor: BaseTheme['colors']['borderBrand']
  padding: `${Spacing['xSmall']} ${string}`
}

type TableRowHeaderThemeVariables = {
  fontSize: Typography['fontSizeMedium']
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightNormal']
  color: BaseTheme['colors']['textDarkest']
  background: BaseTheme['colors']['backgroundLightest']
  borderColor: BaseTheme['colors']['borderMedium']
  lineHeight: Typography['lineHeightCondensed']
  padding: `${Spacing['xSmall']} ${Spacing['small']}`
}

type TabsPanelThemeVariables = {
  fontSize: Typography['fontSizeMedium']
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightNormal']
  lineHeight: Typography['lineHeight']
  color: BaseTheme['colors']['textDarkest']
  background: BaseTheme['colors']['backgroundLightest']
  borderColor: BaseTheme['colors']['borderMedium']
  borderWidth: Border['widthSmall']
  borderStyle: Border['style']
}

type TabsTabThemeVariables = {
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightNormal']
  lineHeight: Typography['lineHeightCondensed']
  fontSize: Typography['fontSizeMedium']
  defaultColor: BaseTheme['colors']['textDarkest']
  defaultHoverBorderColor: BaseTheme['colors']['borderMedium']
  defaultSelectedBorderColor: BaseTheme['colors']['borderBrand']
  secondaryColor: BaseTheme['colors']['textDarkest']
  secondarySelectedBackground: BaseTheme['colors']['backgroundLightest']
  secondarySelectedBorderColor: BaseTheme['colors']['borderMedium']
  zIndex: Stacking['above']
}

type TableThemeVariables = {
  fontSize: Typography['fontSizeMedium']
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightNormal']
  color: BaseTheme['colors']['textDarkest']
  background: BaseTheme['colors']['backgroundLightest']
}

type TabsThemeVariables = {
  defaultBackground: BaseTheme['colors']['backgroundLightest']
  scrollFadeColor: BaseTheme['colors']['backgroundLightest']
  tabVerticalOffset: Border['widthSmall']
  zIndex: Stacking['above']
}

type TagThemeVariables = {
  fontFamily: Typography['fontFamily']
  heightMedium: Forms['inputHeightSmall']
  heightLarge: Forms['inputHeightMedium']
  fontSizeSmall: Typography['fontSizeXSmall']
  fontSizeMedium: Typography['fontSizeSmall']
  fontSizeLarge: Typography['fontSizeMedium']
  padding: `${string} ${Spacing['xSmall']}`
  paddingSmall: `${string} ${Spacing['xSmall']}`
  focusOutlineColor: BaseTheme['colors']['borderBrand']
  focusOutlineWidth: Border['widthMedium']
  focusOutlineStyle: Border['style']
  iconMargin: Spacing['small']
  defaultBackgroundHover: string
  defaultBackground: string
  defaultBorderColor: string
  defaultBorderRadius: string
  defaultBorderStyle: string
  defaultBorderWidth: string
  defaultColor: string
  defaultIconColor: string
  defaultIconHoverColor: string
  inlineBackgroundHover: string
  inlineBackground: string
  inlineBorderColor: string
  inlineBorderRadius: string
  inlineBorderStyle: string
  inlineBorderWidth: string
  inlineColor: string
  inlineIconColor: string
  inlineIconHoverColor: string
}

type TextThemeVariables = {
  fontFamily: string
  fontFamilyMonospace: string
  fontFamilyHeading?: string
  fontSizeXSmall: string
  fontSizeSmall: string
  fontSizeMedium: string
  fontSizeLarge: string
  fontSizeXLarge: string
  fontSizeXXLarge: string
  fontWeightLight: number
  fontWeightNormal: number
  fontWeightBold: number
  lineHeight: number
  lineHeightFit: number
  lineHeightCondensed: number
  lineHeightDouble: number
  letterSpacingNormal: number
  letterSpacingCondensed: string
  letterSpacingExpanded: string
  primaryInverseColor: BaseTheme['colors']['textLightest']
  primaryColor: BaseTheme['colors']['textDarkest']
  secondaryColor: BaseTheme['colors']['textDark']
  secondaryInverseColor: BaseTheme['colors']['textLight']
  warningColor: BaseTheme['colors']['textWarning']
  brandColor: BaseTheme['colors']['textBrand']
  dangerColor: BaseTheme['colors']['textDanger']
  successColor: BaseTheme['colors']['textSuccess']
  alertColor: BaseTheme['colors']['textAlert']
  paragraphMargin: `${Spacing['medium']} ${string}`
}

type TextAreaThemeVariables = {
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightNormal']
  color: BaseTheme['colors']['textDarkest']
  background: BaseTheme['colors']['backgroundLightest']
  borderWidth: Border['widthSmall']
  borderStyle: Border['style']
  borderTopColor: BaseTheme['colors']['borderMedium']
  borderRightColor: BaseTheme['colors']['borderMedium']
  borderBottomColor: BaseTheme['colors']['borderMedium']
  borderLeftColor: BaseTheme['colors']['borderMedium']
  borderRadius: Border['radiusMedium']
  padding: Spacing['small']
  focusOutlineColor: BaseTheme['colors']['borderBrand']
  focusOutlineWidth: Border['widthMedium']
  focusOutlineStyle: Border['style']
  errorBorderColor: BaseTheme['colors']['borderDanger']
  errorOutlineColor: BaseTheme['colors']['borderDanger']
  placeholderColor: BaseTheme['colors']['textDark']
  smallFontSize: Typography['fontSizeSmall']
  smallHeight: Forms['inputHeightSmall']
  mediumFontSize: Typography['fontSizeMedium']
  mediumHeight: Forms['inputHeightMedium']
  largeFontSize: Typography['fontSizeLarge']
  largeHeight: Forms['inputHeightLarge']
}

type ToggleDetailsThemeVariables = {
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightNormal']
  lineHeight: Typography['lineHeight']
  textColor: BaseTheme['colors']['textDarkest']
  fontSizeSmall: Typography['fontSizeSmall']
  fontSizeMedium: Typography['fontSizeMedium']
  fontSizeLarge: Typography['fontSizeLarge']
  iconMargin: Spacing['xxSmall']
  iconColor: BaseTheme['colors']['textDarkest']
  togglePadding: Spacing['xxSmall']
  toggleBorderRadius: Border['radiusMedium']
  toggleBorderWidth: Border['widthMedium']
  toggleBorderStyle: Border['style']
  toggleFocusBorderColor: BaseTheme['colors']['borderBrand']
  filledBackgroundColor: BaseTheme['colors']['backgroundLight']
  filledBorderWidth: Border['widthSmall']
  filledBorderStyle: Border['style']
  filledBorderColor: BaseTheme['colors']['borderMedium']
  filledBorderRadius: Border['radiusMedium']
  filledPadding: Spacing['small']
}

type TooltipThemeVariables = {
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightNormal']
  fontSize: Typography['fontSizeSmall']
  padding: Spacing['small']
}

type TrayThemeVariables = {
  background: BaseTheme['colors']['backgroundLightest']
  borderColor: BaseTheme['colors']['borderMedium']
  borderWidth: Border['widthSmall']
  borderStyle: Border['style']
  boxShadow: Shadows['depth3']
  xSmallWidth: Breakpoints['xSmall']
  regularWidth: Breakpoints['small']
  mediumWidth: Breakpoints['medium']
  largeWidth: Breakpoints['large']
  zIndex: Stacking['topmost']
}

type TreeBrowserButtonThemeVariables = {
  hoverBackgroundColor: BaseTheme['colors']['backgroundBrand']
  hoverTextColor: BaseTheme['colors']['textLightest']
  focusOutlineWidth: Border['widthMedium']
  focusOutlineColor: BaseTheme['colors']['borderBrand']
  focusOutlineStyle: Border['style']
  iconColor: BaseTheme['colors']['textDarkest']
  iconsMarginRight: Spacing['xSmall']
  descriptorMarginTop: Spacing['xxxSmall']
  descriptorTextColor: BaseTheme['colors']['textDarkest']
  descriptorFontSizeSmall: Typography['fontSizeXSmall']
  descriptorFontSizeMedium: Typography['fontSizeXSmall']
  descriptorFontSizeLarge: Typography['fontSizeSmall']
  nameTextColor: BaseTheme['colors']['textBrand']
  nameFontSizeSmall: Typography['fontSizeXSmall']
  nameFontSizeMedium: Typography['fontSizeSmall']
  nameFontSizeLarge: Typography['fontSizeMedium']
  baseSpacingSmall: Spacing['xSmall']
  baseSpacingMedium: Spacing['small']
  borderWidth: Border['widthSmall']
  borderRadius: Border['radiusMedium']
  borderColor: BaseTheme['colors']['borderDark']
  textLineHeight: Typography['lineHeightCondensed']
  selectedTextColor: BaseTheme['colors']['textLightest']
  selectedBackgroundColor: BaseTheme['colors']['backgroundDark']
  selectedOutlineWidth: Border['widthLarge']
}

type TreeBrowserCollectionThemeVariables = {
  fontFamily: Typography['fontFamily']
  baseSpacingSmall: Spacing['xSmall']
  baseSpacingMedium: Spacing['small']
  borderWidth: Border['widthSmall']
  borderColor: BaseTheme['colors']['borderDark']
}

type TreeBrowserThemeVariables = {
  borderRadius: Border['radiusMedium']
  focusOutlineWidth: Border['widthMedium']
  focusOutlineColor: BaseTheme['colors']['borderBrand']
  focusOutlineStyle: Border['style']
}
type TruncateTextThemeVariables = {
  fontFamily: Typography['fontFamily']
  lineHeight: Typography['lineHeight']
}

type ContextViewThemeVariables = {
  arrowBorderWidth: Border['widthSmall']
  arrowBackgroundColor: BaseTheme['colors']['white']
  arrowBorderColor: BaseTheme['colors']['tiara']
  arrowBackgroundColorInverse: BaseTheme['colors']['licorice']
}

type ViewThemeVariables = {
  fontFamily: Typography['fontFamily']
  color: BaseTheme['colors']['textDarkest']
  colorPrimaryInverse: BaseTheme['colors']['textLightest']
  borderColorPrimary: BaseTheme['colors']['borderMedium']
  borderColorSecondary: BaseTheme['colors']['borderDark']
  borderColorSuccess: BaseTheme['colors']['borderSuccess']
  borderColorBrand: BaseTheme['colors']['borderBrand']
  borderColorInfo: BaseTheme['colors']['borderInfo']
  borderColorAlert: BaseTheme['colors']['borderAlert']
  borderColorWarning: BaseTheme['colors']['borderWarning']
  borderColorDanger: BaseTheme['colors']['borderDanger']
  debugOutlineColor: BaseTheme['colors']['borderDebug']
  backgroundPrimary: BaseTheme['colors']['backgroundLightest']
  backgroundSecondary: BaseTheme['colors']['backgroundLight']
  backgroundPrimaryInverse: BaseTheme['colors']['backgroundDarkest']
  backgroundBrand: BaseTheme['colors']['backgroundBrand']
  backgroundInfo: BaseTheme['colors']['backgroundInfo']
  backgroundAlert: BaseTheme['colors']['backgroundAlert']
  backgroundSuccess: BaseTheme['colors']['backgroundSuccess']
  backgroundDanger: BaseTheme['colors']['backgroundDanger']
  backgroundWarning: BaseTheme['colors']['backgroundWarning']
  focusOutlineStyle: Border['style']
  focusOutlineWidth: Border['widthMedium']
  focusColorInfo: BaseTheme['colors']['borderInfo']
  focusColorDanger: BaseTheme['colors']['borderDanger']
  focusColorSuccess: BaseTheme['colors']['borderSuccess']
  focusColorInverse: BaseTheme['colors']['borderLightest']
  xSmallMaxWidth: Breakpoints['xSmall']
  smallMaxWidth: Breakpoints['small']
  mediumMaxWidth: Breakpoints['medium']
  largeMaxWidth: Breakpoints['large']
  marginXxxSmall: string
  marginXxSmall: string
  marginXSmall: string
  marginSmall: string
  marginMedium: string
  marginLarge: string
  marginXLarge: string
  marginXxLarge: string
  paddingXxxSmall: string
  paddingXxSmall: string
  paddingXSmall: string
  paddingSmall: string
  paddingMedium: string
  paddingLarge: string
  paddingXLarge: string
  paddingXxLarge: string
  shadowDepth1: string
  shadowDepth2: string
  shadowDepth3: string
  shadowResting: string
  shadowAbove: string
  shadowTopmost: string
  stackingTopmost: number
  stackingAbove: number
  stackingBelow: number
  stackingDeepest: number
  borderRadiusSmall: string
  borderRadiusMedium: string
  borderRadiusLarge: string
  borderWidthSmall: string
  borderWidthMedium: string
  borderWidthLarge: string
  borderStyle: string
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
  Byline: BylineThemeVariables
  'Calendar.Day': CalendarDayThemeVariables
  Calendar: CalendarThemeVariables
  CheckboxFacade: CheckboxFacadeThemeVariables
  ToggleFacade: ToggleFacadeThemeVariables
  CodeEditor: CodeEditorThemeVariables
  'DrawerLayout.Content': DrawerLayoutContentThemeVariables
  'DrawerLayout.Tray': DrawerLayoutTrayThemeVariables
  FileDrop: FileDropThemeVariables
  Flex: FlexThemeVariables
  FormFieldGroup: FormFieldGroupThemeVariables
  FormFieldLabel: FormFieldLabelThemeVariables
  FormFieldMessage: FormFieldMessageThemeVariables
  FormFieldMessages: FormFieldMessagesThemeVariables
  Grid: GridThemeVariables
  GridCol: GridThemeVariables
  GridRow: GridThemeVariables
  Heading: HeadingThemeVariables
  Link: LinkThemeVariables
  'InlineList.Item': InlineListItemThemeVariables
  'List.Item': ListItemThemeVariables
  List: ListThemeVariables
  'Menu.Item': MenuItemThemeVariables
  'Menu.Group': MenuGroupThemeVariables
  'Menu.Separator': MenuSeparatorThemeVariables
  Metric: MetricThemeVariables
  MetricGroup: MetricGroupThemeVariables
  'Modal.Body': ModalBodyThemeVariables
  'Modal.Footer': ModalFooterThemeVariables
  'Modal.Header': ModalHeaderThemeVariables
  Modal: ModalThemeVariables
  Transition: TransitionThemeVariables
  'AppNav.Item': AppNavItemThemeVariables
  AppNav: AppNavThemeVariables
  'Navigation.Item': NavigationItemThemeVariables
  Navigation: NavigationThemeVariables
  NumberInput: NumberInputThemeVariables
  'Options.Item': OptionsItemThemeVariables
  'Options.Separator': OptionsSeparatorThemeVariables
  Options: OptionsThemeVariables
  Mask: MaskThemeVariables
  Pages: PagesThemeVariables
  Pill: PillThemeVariables
  Position: PositionThemeVariables
  ProgressBar: ProgressBarThemeVariables
  ProgressCircle: ProgressCircleThemeVariables
  RangeInput: RangeInputThemeVariables
  RadioInput: RadioInputThemeVariables
  'Rating.Icon': RatingIconThemeVariables
  Select: SelectThemeVariables
  Spinner: SpinnerThemeVariables
  InlineSVG: InlineSVGThemeVariables
  'Table.Body': TableBodyThemeVariables
  'Table.Cell': TableCellThemeVariables
  'Table.ColHeader': TableColHeaderThemeVariables
  'Table.Head': TableHeadThemeVariables
  'Table.Row': TableRowThemeVariables
  'Table.RowHeader': TableRowHeaderThemeVariables
  Table: TableThemeVariables
  'Tabs.Panel': TabsPanelThemeVariables
  'Tabs.Tab': TabsTabThemeVariables
  Tabs: TabsThemeVariables
  Tag: TagThemeVariables
  Text: TextThemeVariables
  TextArea: TextAreaThemeVariables
  ToggleDetails: ToggleDetailsThemeVariables
  Tooltip: TooltipThemeVariables
  Tray: TrayThemeVariables
  'TreeBrowser.Button': TreeBrowserButtonThemeVariables
  'TreeBrowser.Collection': TreeBrowserCollectionThemeVariables
  TreeBrowser: TreeBrowserThemeVariables
  TruncateText: TruncateTextThemeVariables
  ContextView: ContextViewThemeVariables
  View: ViewThemeVariables
}
type ComponentTheme<Type> = {
  [Key in keyof Type]: Type[Key]
}
type ComponentThemeMap = ComponentTheme<ThemeVariables>

export type { ThemeVariables, ComponentThemeMap, AvatarThemeVariables }
