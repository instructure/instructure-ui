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
} from './BaseTheme'
import { Colors } from './Colors'

export type Avatar = {
  color: Colors['textBrand']
  background: Colors['backgroundLightest']
  borderWidthSmall: Border['widthSmall']
  borderWidthMedium: Border['widthMedium']
  borderColor: Colors['borderMedium']
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightBold']
}

export type Alert = {
  background: Colors['backgroundLightest']
  color: Colors['textDarkest']
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
  iconColor: Colors['textLightest']
  successBorderColor: Colors['borderSuccess']
  successIconBackground: Colors['backgroundSuccess']
  infoBorderColor: Colors['borderInfo']
  infoIconBackground: Colors['backgroundInfo']
  warningBorderColor: Colors['borderWarning']
  warningIconBackground: Colors['backgroundWarning']
  dangerBorderColor: Colors['borderDanger']
  dangerIconBackground: Colors['backgroundDanger']
  boxShadow: Shadows['depth2']
}

export type Badge = {
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightNormal']
  color: Colors['textLightest']
  fontSize: Typography['fontSizeXSmall']
  colorDanger: Colors['textDanger']
  colorSuccess: Colors['textSuccess']
  colorPrimary: Colors['textBrand']
  notificationZIndex: Stacking['above']
  sizeNotification: Spacing['small']
  padding: Spacing['xxSmall']
  pulseBorderThickness: Border['widthMedium']
}

export type Billboard = {
  fontFamily: Typography['fontFamily']
  paddingSmall: Spacing['small']
  paddingMedium: Spacing['medium']
  paddingLarge: Spacing['medium']
  iconColor: Colors['textDark']
  mediumMargin: Spacing['small']
  largeMargin: Spacing['medium']
  iconHoverColor: Colors['textLink']
  backgroundColor: Colors['backgroundLightest']
  iconHoverColorInverse: Colors['textLightest']
  buttonBorderWidth: Border['widthMedium']
  buttonBorderRadius: Border['radiusLarge']
  messageColor: Colors['textDark']
  messageColorClickable: Colors['textLink']
  messageColorInverse: Colors['textLight']
  messageFontSizeSmall: Typography['fontSizeSmall']
  messageFontSizeMedium: Typography['fontSizeMedium']
  messageFontSizeLarge: Typography['fontSizeLarge']
  clickableActiveBg: Colors['backgroundBrand']
  clickableActiveText: Colors['textLightest']
  buttonBorderStyle: Border['style']
}

export type Breadcrumb = {
  fontFamily: Typography['fontFamily']
  separatorColor: Colors['borderDark']
  smallFontSize: Typography['fontSizeSmall']
  mediumFontSize: Typography['fontSizeMedium']
  largeFontSize: Typography['fontSizeLarge']
}

export type BaseButton = {
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

export type CloseButton = {
  offsetMedium: Spacing['medium']
  offsetSmall: Spacing['small']
  offsetXSmall: Spacing['xSmall']
  zIndex: Stacking['above']
}

export type Byline = {
  fontFamily: Typography['fontFamily']
  background: Colors['backgroundLightest']
  color: Colors['textDarkest']
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

export type CalendarDay = {
  color: Colors['textDarkest']
  background: Colors['backgroundLightest']
  fontSize: Typography['fontSizeMedium']
  padding: Spacing['xxSmall']
  height: Forms['inputHeightSmall']
  minWidth: Forms['inputHeightSmall']
  outsideMonthColor: Colors['textDark']
  selectedBackground: Colors['backgroundSuccess']
  selectedColor: Colors['textLightest']
  selectedBorderRadius: Border['radiusMedium']
  todayBackground: Colors['backgroundBrand']
  todayColor: Colors['textLightest']
  todayBorderRadius: Forms['inputHeightSmall']
}

export type Calendar = {
  fontSize: Typography['fontSizeMedium']
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightNormal']
  color: Colors['textDarkest']
  background: Colors['backgroundLightest']
  navMargin: Spacing['small']
  maxHeaderWidth: Spacing['medium']
}
export type CheckboxFacade = {
  color: Colors['textLightest']
  borderWidth: Border['widthSmall']
  borderColor: Colors['borderDark']
  borderRadius: Border['radiusMedium']
  background: Colors['backgroundLightest']
  marginRight: Spacing['xSmall']
  padding: Spacing['xxxSmall']
  checkedBackground: Colors['backgroundDarkest']
  checkedBorderColor: Colors['borderDarkest']
  hoverBorderColor: Colors['borderDarkest']
  focusBorderColor: Colors['borderBrand']
  focusBorderWidth: Border['widthMedium']
  focusBorderStyle: Border['style']
  labelColor: Colors['textDarkest']
  checkedLabelColor: Colors['textDarkest']
  labelFontFamily: Typography['fontFamily']
  labelFontWeight: Typography['fontWeightNormal']
  labelLineHeight: Typography['lineHeightCondensed']
  labelFontSizeSmall: Typography['fontSizeSmall']
  labelFontSizeMedium: Typography['fontSizeMedium']
  labelFontSizeLarge: Typography['fontSizeLarge']
}

export type ToggleFacade = {
  color: Colors['textLightest']
  background: Colors['backgroundLight']
  borderColor: Colors['borderMedium']
  borderWidth: Border['widthMedium']
  marginEnd: Spacing['small']
  marginStart: Spacing['small']
  marginVertical: Spacing['xSmall']
  checkedBackground: Colors['backgroundSuccess']
  uncheckedIconColor: Colors['textDarkest']
  checkedIconColor: Colors['textSuccess']
  focusOutlineColor: Colors['borderBrand']
  focusBorderWidth: Border['widthMedium']
  focusBorderStyle: Border['style']
  toggleBackground: Colors['backgroundLightest']
  toggleShadow: Shadows['depth1']
  toggleSize: Forms['inputHeightSmall']
  labelColor: Colors['textDarkest']
  labelFontFamily: Typography['fontFamily']
  labelFontWeight: Typography['fontWeightNormal']
  labelLineHeight: Typography['lineHeightCondensed']
  labelFontSizeSmall: Typography['fontSizeSmall']
  labelFontSizeMedium: Typography['fontSizeMedium']
  labelFontSizeLarge: Typography['fontSizeLarge']
}

export type CodeEditor = {
  fontFamily: Typography['fontFamilyMonospace']
  fontSize: Typography['fontSizeSmall']
  background: Colors['backgroundLight']
  border: `${Border['widthSmall']} ${string}C{'lors']['borderLight']}`
  borderRadius: Border['radiusMedium']
  focusBorderColor: Colors['borderBrand']
  focusBoxShadow: Colors['borderLightest']
  horizontalPadding: Spacing['xSmall']
  verticalPadding: Spacing['xxSmall']
  color: Colors['textDarkest']
  lineNumberColor: Colors['textDark']
  gutterBorder: Colors['borderLight']
  gutterBackground: Colors['backgroundLight']
  gutterMarkerColor: Colors['textBrand']
  gutterMarkerSubtleColor: Colors['textDark']
  cursorColor: Colors['textDarkest']
  secondaryCursorColor: Colors['textDark']
  rulerColor: Colors['borderDark']
  matchingBracketOutline: Colors['textDark']
  nonMatchingBracketColor: Colors['textDanger']
  activeLineBackground: Colors['backgroundLight']
  selectedBackground: Colors['backgroundLight']
  fatCursorBackground: Colors['backgroundSuccess']
  zIndex: Stacking['above']
  quoteColor: Colors['textSuccess']
  headerColor: Colors['textWarning']
  negativeColor: Colors['textDanger']
  positiveColor: Colors['textSuccess']
  keywordColor: Colors['textBrand']
  atomColor: Colors['textWarning']
  numberColor: Colors['textWarning']
  defColor: Colors['textDarkest']
  variableColor: Colors['textBrand']
  secondaryVariableColor: Colors['textWarning']
  typeColor: Colors['textBrand']
  commentColor: Colors['textDark']
  stringColor: Colors['textBrand']
  secondaryStringColor: Colors['textDanger']
  metaColor: Colors['textDarkest']
  qualifierColor: Colors['textSuccess']
  builtInColor: Colors['textWarning']
  bracketColor: Colors['borderDark']
  tagColor: Colors['textSuccess']
  attributeColor: Colors['textBrand']
  hrColor: Colors['borderDark']
  linkColor: Colors['textBrand']
  errorColor: Colors['textDanger']
  propertyColor: Colors['textAlert']
  nodeColor: Colors['textWarning']
  operatorColor: Colors['textDarkest']
}

export type DrawerLayoutContent = {
  duration: Transitions['duration']
}
export type DrawerLayoutTray = {
  background: Colors['backgroundLightest']
  borderColor: Colors['borderMedium']
  borderWidth: Border['widthSmall']
  borderStyle: Border['style']
  zIndex: Stacking['topmost']
  boxShadow: Shadows['depth3']
}

export type FileDrop = {
  backgroundColor: Colors['backgroundLightest']
  borderRadius: Border['radiusLarge']
  borderWidth: Border['widthMedium']
  borderColor: Colors['borderMedium']
  hoverBorderColor: Colors['borderBrand']
  acceptedColor: Colors['textBrand']
  rejectedColor: Colors['textDanger']
}

export type Flex = {
  fontFamily: Typography['fontFamily']
}

export type FormFieldGroup = {
  borderWidth: Border['widthSmall']
  borderStyle: Border['style']
  borderRadius: Border['radiusMedium']
  errorBorderColor: Colors['borderDanger']
  errorFieldsPadding: Spacing['xSmall']
}

export type FormFieldLabel = {
  color: Colors['textDarkest']
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightBold']
  fontSize: Typography['fontSizeMedium']
  lineHeight: Typography['lineHeightFit']
}

export type FormFieldMessage = {
  colorHint: Colors['textDarkest']
  colorError: Colors['textDanger']
  colorSuccess: Colors['textSuccess']
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightNormal']
  fontSize: Typography['fontSizeSmall']
  lineHeight: Typography['lineHeight']
}

export type FormFieldMessages = {
  topMargin: Spacing['xxSmall']
}

export type Grid = {
  spacingSmall: Spacing['small']
  spacingMedium: Spacing['medium']
  spacingLarge: Spacing['large']
  mediumMin: Media['mediumMin']
  largeMin: Media['largeMin']
  xLargeMin: Media['xLargeMin']
}
export type Heading = {
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
  primaryInverseColor: Colors['textLightest']
  primaryColor: Colors['textDarkest']
  secondaryColor: Colors['textDark']
  secondaryInverseColor: Colors['textLight']
  borderPadding: Spacing['xxxSmall']
  borderColor: Colors['borderMedium']
  borderWidth: Border['widthSmall']
  borderStyle: Border['style']
}

export type Link = {
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightNormal']
  color: Colors['textLink']
  focusOutlineWidth: Border['widthMedium']
  focusOutlineColor: Colors['borderBrand']
  focusOutlineStyle: Border['style']
  hoverColor: Colors['textLink']
  colorInverse: Colors['textLight']
  focusInverseOutlineColor: Colors['borderLightest']
  focusInverseIconOutlineColor: Colors['borderLightest']
  iconPlusTextMargin: Spacing['xxSmall']
}

export type InlineListItem = {
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightNormal']
  fontSizeSmall: Typography['fontSizeSmall']
  fontSizeMedium: Typography['fontSizeMedium']
  fontSizeLarge: Typography['fontSizeLarge']
  color: Colors['textDark']
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

export type ListItem = {
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightNormal']
  lineHeight: Typography['lineHeight']
  fontSizeSmall: Typography['fontSizeSmall']
  fontSizeMedium: Typography['fontSizeMedium']
  fontSizeLarge: Typography['fontSizeLarge']
  color: Colors['textDarkest']
  spacingXXXSmall: Spacing['xxxSmall']
  spacingXXSmall: Spacing['xxSmall']
  spacingXSmall: Spacing['xSmall']
  spacingSmall: Spacing['small']
  spacingMedium: Spacing['medium']
  spacingLarge: Spacing['large']
  spacingXLarge: Spacing['xLarge']
  spacingXXLarge: Spacing['xxLarge']
  delimiterDashedBorder: `${Border['widthSmall']} ${string}C{'lors']['borderMedium']}`
  delimiterSolidBorder: `${Border['widthSmall']} ${string}C{'lors']['borderMedium']}`
}

export type List = {
  listPadding: Spacing['large']
  orderedNumberFontWeight: Typography['fontWeightBold']
  orderedNumberMargin: Spacing['xSmall']
}

export type MenuItem = {
  padding: `${Spacing['xSmall']} ${Spacing['small']}`
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightNormal']
  lineHeight: Typography['lineHeightCondensed']
  fontSize: Typography['fontSizeMedium']
  labelPadding: Spacing['large']
  labelColor: Colors['textDarkest']
  background: Colors['backgroundLightest']
  iconColor: Colors['textDarkest']
  iconPadding: Spacing['small']
  activeBackground: Colors['backgroundBrand']
  activeLabelColor: Colors['textLightest']
  activeIconColor: Colors['textLightest']
}

export type MenuGroup = {
  fontSize: Typography['fontSizeMedium']
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightBold']
  padding: `${Spacing['xSmall']} ${Spacing['small']}`
  color: Colors['textDarkest']
  background: Colors['backgroundLightest']
}
export type MenuSeparator = {
  background: Colors['backgroundMedium']
  height: Border['widthSmall']
  margin: `${string} ${Spacing['small']}`
}
export type Metric = {
  padding: `${string} ${Spacing['xSmall']}`
  fontFamily: Typography['fontFamily']
  valueColor: Colors['textDarkest']
  valueFontSize: Typography['fontSizeXLarge']
  valueFontWeight: Typography['fontWeightBold']
  labelColor: Colors['textDarkest']
  labelFontSize: Typography['fontSizeXSmall']
}
export type MetricGroup = {
  lineHeight: Typography['lineHeightCondensed']
}

export type ModalBody = {
  inverseBackground: Colors['backgroundBrandSecondary']
}
export type ModalFooter = {
  background: Colors['backgroundLight']
  borderColor: Colors['borderMedium']
  borderWidth: Border['widthSmall']
  borderRadius: Border['radiusMedium']
  padding: Spacing['small']
  inverseBackground: Colors['backgroundDarkest']
  inverseBorderColor: Colors['borderDarkest']
}

export type ModalHeader = {
  background: Colors['backgroundLightest']
  borderColor: Colors['borderMedium']
  padding: Spacing['medium']
  inverseBackground: Colors['backgroundDarkest']
  inverseBorderColor: Colors['backgroundDarkest']
}

export type Modal = {
  fontFamily: Typography['fontFamily']
  textColor: Colors['textDarkest']
  background: Colors['backgroundLightest']
  borderColor: Colors['borderMedium']
  borderRadius: Border['radiusMedium']
  inverseBackground: Colors['backgroundBrandSecondary']
  inverseTextColor: Colors['textLightest']
  autoMinWidth: Breakpoints['xSmall']
  smallMaxWidth: Breakpoints['small']
  mediumMaxWidth: Breakpoints['medium']
  largeMaxWidth: Breakpoints['large']
  boxShadow: Shadows['depth3']
  zIndex: Stacking['topmost']
}

export type Transition = {
  duration: Transitions['duration']
  timing: Transitions['timing']
}

export type AppNavItem = {
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightBold']
  textColor: Colors['textLink']
  textColorSelected: Colors['textDarkest']
  padding: Spacing['small']
  backgroundColor: Colors['backgroundLightest']
}

export type AppNav = {
  fontFamily: Typography['fontFamily']
  borderColor: Colors['borderMedium']
  borderStyle: Border['style']
  borderWidth: Border['widthSmall']
  horizontalMargin: Spacing['xxSmall']
}

export type NavigationItem = {
  fontSize: Typography['fontSizeSmall']
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightLight']
  fontColor: Colors['textLightest']
  iconColor: Colors['textLightest']
  lineHeight: Typography['lineHeight']
  hoverBackgroundColor: Colors['backgroundDarkest']
  outerFocusOutline: `${string} ${string} ${string} ${string} ${string}C{'lors']['borderDarkest']}`
  innerFocusOutline: `${string} ${string} ${string} ${string} ${string}C{'lors']['borderLightest']}`
  selectedFontColor: Colors['textBrand']
  selectedIconColor: Colors['textBrand']
  selectedBackgroundColor: Colors['backgroundLightest']
  selectedOuterFocusOutline: `${string} ${string} ${string} ${string} ${string}C{'lors']['borderLightest']}`
  selectedInnerFocusOutline: `${string} ${string} ${string} ${string} ${string}C{'lors']['borderBrand']}`
  contentPadding: Spacing['xxSmall']
}

export type Navigation = {
  fontColor: Colors['textLightest']
  backgroundColor: Colors['backgroundBrandSecondary']
  fill: Colors['textLightest']
  focusOutlineInnerWidth: Border['widthMedium']
  focusOutlineOuterWidth: Border['widthSmall']
  focusOutlineInnerColor: Colors['borderBrand']
  focusOutlineOuterColor: Colors['borderLightest']
  marginBottom: Spacing['small']
  toggleTransition: Transitions['duration']
}

export type NumberInput = {
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightNormal']
  borderWidth: Border['widthSmall']
  borderStyle: Border['style']
  borderColor: Colors['borderMedium']
  borderRadius: Border['radiusMedium']
  color: Colors['textDarkest']
  background: Colors['backgroundLightest']
  padding: `${string} ${Spacing['small']}`
  arrowsColor: Colors['textDarkest']
  arrowsBackgroundColor: Colors['backgroundLight']
  arrowsHoverBackgroundColor: Colors['backgroundMedium']
  arrowsBorderColor: Colors['borderMedium']
  arrowsActiveBoxShadow: `${string} ${string} ${string} ${string} ${string}C{'lors']['borderMedium']}`
  focusOutlineWidth: Border['widthMedium']
  focusOutlineStyle: Border['style']
  focusOutlineColor: Colors['borderBrand']
  errorBorderColor: Colors['borderDanger']
  errorOutlineColor: Colors['borderDanger']
  placeholderColor: Colors['textDark']
  mediumFontSize: Typography['fontSizeMedium']
  mediumHeight: Forms['inputHeightMedium']
  largeFontSize: Typography['fontSizeLarge']
  largeHeight: Forms['inputHeightLarge']
}

export type OptionsItem = {
  fontSize: Typography['fontSizeMedium']
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightNormal']
  lineHeight: Typography['lineHeightCondensed']
  color: Colors['textDarkest']
  background: Colors['backgroundLightest']
  highlightedLabelColor: Colors['textLightest']
  highlightedBackground: Colors['backgroundBrand']
  selectedLabelColor: Colors['textLightest']
  selectedBackground: Colors['backgroundDark']
  padding: `${Spacing['xSmall']} ${Spacing['small']}`
  iconPadding: Spacing['small']
  nestedPadding: Spacing['medium']
}

export type OptionsSeparator = {
  background: Colors['backgroundMedium']
  height: Border['widthSmall']
  margin: `${string} ${Spacing['small']}`
}

export type Options = {
  labelFontWeight: Typography['fontWeightBold']
  background: Colors['backgroundLightest']
  labelColor: Colors['textDarkest']
  labelPadding: `${Spacing['xSmall']} ${string}`
  nestedLabelPadding: `${Spacing['xSmall']} ${Spacing['small']}`
}

export type Mask = {
  zIndex: Stacking['topmost']
  focusBorderColor: Colors['borderBrand']
  borderRadius: Border['radiusMedium']
  borderWidth: Border['widthSmall']
}

export type Pages = {
  fontSize: Typography['fontSizeMedium']
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightNormal']
  color: Colors['textDarkest']
  background: Colors['backgroundLightest']
}

export type Pill = {
  fontFamily: Typography['fontFamily']
  padding: `${string} ${Spacing['xSmall']}`
  background: Colors['backgroundLightest']
  textFontSize: Typography['fontSizeXSmall']
  textFontWeight: Typography['fontWeightBold']
  primaryColor: Colors['textDark']
  infoColor: Colors['textInfo']
  dangerColor: Colors['textDanger']
  successColor: Colors['textSuccess']
  warningColor: Colors['textWarning']
  alertColor: Colors['textAlert']
  borderWidth: Border['widthSmall']
  borderStyle: Border['style']
}

export type Position = {
  zIndex: Stacking['topmost']
}

export type ProgressBar = {
  color: Colors['textDarkest']
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
  meterColorBrand: Colors['backgroundBrand']
  meterColorBrandInverse: Colors['backgroundBrand']
  meterColorInfo: Colors['backgroundInfo']
  meterColorInfoInverse: Colors['backgroundInfo']
  meterColorSuccessInverse: Colors['backgroundSuccess']
  meterColorDangerInverse: Colors['backgroundDanger']
}

export type ProgressCircle = {
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
  color: Colors['textDarkest']
  colorInverse: Colors['textLightest']
  trackColor: Colors['backgroundLightest']
  trackBorderColor: Colors['borderMedium']
  trackBorderColorInverse: Colors['borderLightest']
  meterColorBrand: Colors['backgroundBrand']
  meterColorBrandInverse: Colors['backgroundBrand']
  meterColorInfo: Colors['backgroundInfo']
  meterColorInfoInverse: Colors['backgroundInfo']
  meterColorSuccess: Colors['backgroundSuccess']
  meterColorSuccessInverse: Colors['backgroundSuccess']
  meterColorDanger: Colors['backgroundDanger']
  meterColorDangerInverse: Colors['backgroundDanger']
  meterColorAlert: Colors['backgroundAlert']
  meterColorAlertInverse: Colors['backgroundAlert']
  meterColorWarning: Colors['backgroundWarning']
  meterColorWarningInverse: Colors['backgroundWarning']
}

export type RangeInput = {
  handleBackground: Colors['backgroundBrand']
  handleShadowColor: Colors['borderBrand']
  handleHoverBackground: Colors['backgroundBrand']
  handleFocusBackground: Colors['backgroundBrand']
  handleFocusOutlineColor: Colors['borderBrand']
  trackBackground: Colors['backgroundDark']
  valueColor: Colors['textLightest']
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

export type RadioInput = {
  labelColor: Colors['textDarkest']
  labelFontFamily: Typography['fontFamily']
  labelFontWeight: Typography['fontWeightNormal']
  labelLineHeight: Typography['lineHeightCondensed']
  background: Colors['backgroundLightest']
  borderColor: Colors['borderDarkest']
  hoverBorderColor: Colors['borderDarkest']
  focusBorderColor: Colors['borderBrand']
  focusBorderWidth: Border['widthMedium']
  focusBorderStyle: Border['style']
  simpleFontSizeSmall: Typography['fontSizeSmall']
  simpleFontSizeMedium: Typography['fontSizeMedium']
  simpleFontSizeLarge: Typography['fontSizeLarge']
  simpleFacadeMarginEnd: Spacing['xSmall']
  toggleBorderRadius: Border['radiusSmall']
  toggleBorderWidth: Border['widthLarge']
  toggleBackgroundSuccess: Colors['backgroundSuccess']
  toggleBackgroundOff: Colors['backgroundDark']
  toggleBackgroundDanger: Colors['backgroundDanger']
  toggleBackgroundWarning: Colors['backgroundWarning']
  toggleHandleText: Colors['textLightest']
  toggleSmallHeight: Forms['inputHeightSmall']
  toggleMediumHeight: Forms['inputHeightMedium']
  toggleLargeHeight: Forms['inputHeightLarge']
  toggleShadow: Shadows['depth1']
  toggleSmallFontSize: Typography['fontSizeXSmall']
  toggleMediumFontSize: Typography['fontSizeSmall']
  toggleLargeFontSize: Typography['fontSizeMedium']
}

export type RatingIcon = {
  iconMargin: Spacing['xxxSmall']
  iconEmptyColor: Colors['textBrand']
  iconFilledColor: Colors['textBrand']
  smallIconFontSize: Typography['fontSizeMedium']
  mediumIconFontSize: Typography['fontSizeLarge']
  largeIconFontSize: Typography['fontSizeXXLarge']
}

export type Select = {
  fontSize: Typography['fontSizeMedium']
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightNormal']
  smallIconSize: Typography['fontSizeXSmall']
  mediumIconSize: Typography['fontSizeSmall']
  largeIconSize: Typography['fontSizeMedium']
  color: Colors['textDarkest']
  background: Colors['backgroundLightest']
}

export type Spinner = {
  trackColor: Colors['backgroundLight']
  color: Colors['backgroundBrand']
  inverseColor: Colors['backgroundBrand']
}

export type InlineSVG = {
  primaryInverseColor: Colors['textLightest']
  primaryColor: Colors['textDarkest']
  secondaryColor: Colors['textDark']
  secondaryInverseColor: Colors['textLight']
  warningColor: Colors['textWarning']
  brandColor: Colors['textBrand']
  errorColor: Colors['textDanger']
  alertColor: Colors['textAlert']
  successColor: Colors['textSuccess']
}

export type TableBody = {
  fontSize: Typography['fontSizeMedium']
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightNormal']
  color: Colors['textDarkest']
  background: Colors['backgroundLightest']
}

export type TableCell = {
  fontSize: Typography['fontSizeMedium']
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightNormal']
  color: Colors['textDarkest']
  background: Colors['backgroundLightest']
  borderColor: Colors['borderMedium']
  lineHeight: Typography['lineHeightCondensed']
  padding: `${Spacing['xSmall']} ${Spacing['small']}`
}

export type TableColHeader = {
  fontSize: Typography['fontSizeMedium']
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightNormal']
  color: Colors['textDarkest']
  background: Colors['backgroundLightest']
  borderColor: Colors['borderMedium']
  lineHeight: Typography['lineHeightCondensed']
  padding: `${Spacing['xSmall']} ${Spacing['small']}`
  focusOutlineColor: Colors['borderBrand']
  focusOutlineWidth: Border['widthMedium']
  focusOutlineStyle: Border['style']
}

export type TableHead = {
  fontSize: Typography['fontSizeMedium']
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightNormal']
  color: Colors['textDarkest']
  background: Colors['backgroundLightest']
}

export type TableRow = {
  fontSize: Typography['fontSizeMedium']
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightNormal']
  color: Colors['textDarkest']
  background: Colors['backgroundLightest']
  borderColor: Colors['borderMedium']
  hoverBorderColor: Colors['borderBrand']
  padding: `${Spacing['xSmall']} ${string}`
}

export type TableRowHeader = {
  fontSize: Typography['fontSizeMedium']
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightNormal']
  color: Colors['textDarkest']
  background: Colors['backgroundLightest']
  borderColor: Colors['borderMedium']
  lineHeight: Typography['lineHeightCondensed']
  padding: `${Spacing['xSmall']} ${Spacing['small']}`
}

export type TabsPanel = {
  fontSize: Typography['fontSizeMedium']
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightNormal']
  lineHeight: Typography['lineHeight']
  color: Colors['textDarkest']
  background: Colors['backgroundLightest']
  borderColor: Colors['borderMedium']
  borderWidth: Border['widthSmall']
  borderStyle: Border['style']
}

export type TabsTab = {
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightNormal']
  lineHeight: Typography['lineHeightCondensed']
  fontSize: Typography['fontSizeMedium']
  defaultColor: Colors['textDarkest']
  defaultHoverBorderColor: Colors['borderMedium']
  defaultSelectedBorderColor: Colors['borderBrand']
  secondaryColor: Colors['textDarkest']
  secondarySelectedBackground: Colors['backgroundLightest']
  secondarySelectedBorderColor: Colors['borderMedium']
  zIndex: Stacking['above']
}

export type Table = {
  fontSize: Typography['fontSizeMedium']
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightNormal']
  color: Colors['textDarkest']
  background: Colors['backgroundLightest']
}

export type Tabs = {
  defaultBackground: Colors['backgroundLightest']
  scrollFadeColor: Colors['backgroundLightest']
  tabVerticalOffset: Border['widthSmall']
  zIndex: Stacking['above']
}

export type Tag = {
  fontFamily: Typography['fontFamily']
  heightMedium: Forms['inputHeightSmall']
  heightLarge: Forms['inputHeightMedium']
  fontSizeSmall: Typography['fontSizeXSmall']
  fontSizeMedium: Typography['fontSizeSmall']
  fontSizeLarge: Typography['fontSizeMedium']
  padding: `${string} ${Spacing['xSmall']}`
  paddingSmall: `${string} ${Spacing['xSmall']}`
  focusOutlineColor: Colors['borderBrand']
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

export type Text = {
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
  primaryInverseColor: Colors['textLightest']
  primaryColor: Colors['textDarkest']
  secondaryColor: Colors['textDark']
  secondaryInverseColor: Colors['textLight']
  warningColor: Colors['textWarning']
  brandColor: Colors['textBrand']
  dangerColor: Colors['textDanger']
  successColor: Colors['textSuccess']
  alertColor: Colors['textAlert']
  paragraphMargin: `${Spacing['medium']} ${string}`
}

export type TextArea = {
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightNormal']
  color: Colors['textDarkest']
  background: Colors['backgroundLightest']
  borderWidth: Border['widthSmall']
  borderStyle: Border['style']
  borderTopColor: Colors['borderMedium']
  borderRightColor: Colors['borderMedium']
  borderBottomColor: Colors['borderMedium']
  borderLeftColor: Colors['borderMedium']
  borderRadius: Border['radiusMedium']
  padding: Spacing['small']
  focusOutlineColor: Colors['borderBrand']
  focusOutlineWidth: Border['widthMedium']
  focusOutlineStyle: Border['style']
  errorBorderColor: Colors['borderDanger']
  errorOutlineColor: Colors['borderDanger']
  placeholderColor: Colors['textDark']
  smallFontSize: Typography['fontSizeSmall']
  smallHeight: Forms['inputHeightSmall']
  mediumFontSize: Typography['fontSizeMedium']
  mediumHeight: Forms['inputHeightMedium']
  largeFontSize: Typography['fontSizeLarge']
  largeHeight: Forms['inputHeightLarge']
}

export type ToggleDetails = {
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightNormal']
  lineHeight: Typography['lineHeight']
  textColor: Colors['textDarkest']
  fontSizeSmall: Typography['fontSizeSmall']
  fontSizeMedium: Typography['fontSizeMedium']
  fontSizeLarge: Typography['fontSizeLarge']
  iconMargin: Spacing['xxSmall']
  iconColor: Colors['textDarkest']
  togglePadding: Spacing['xxSmall']
  toggleBorderRadius: Border['radiusMedium']
  toggleBorderWidth: Border['widthMedium']
  toggleBorderStyle: Border['style']
  toggleFocusBorderColor: Colors['borderBrand']
  filledBackgroundColor: Colors['backgroundLight']
  filledBorderWidth: Border['widthSmall']
  filledBorderStyle: Border['style']
  filledBorderColor: Colors['borderMedium']
  filledBorderRadius: Border['radiusMedium']
  filledPadding: Spacing['small']
}

export type Tooltip = {
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightNormal']
  fontSize: Typography['fontSizeSmall']
  padding: Spacing['small']
}

export type Tray = {
  background: Colors['backgroundLightest']
  borderColor: Colors['borderMedium']
  borderWidth: Border['widthSmall']
  borderStyle: Border['style']
  boxShadow: Shadows['depth3']
  xSmallWidth: Breakpoints['xSmall']
  regularWidth: Breakpoints['small']
  mediumWidth: Breakpoints['medium']
  largeWidth: Breakpoints['large']
  zIndex: Stacking['topmost']
}

export type TreeBrowserButton = {
  hoverBackgroundColor: Colors['backgroundBrand']
  hoverTextColor: Colors['textLightest']
  focusOutlineWidth: Border['widthMedium']
  focusOutlineColor: Colors['borderBrand']
  focusOutlineStyle: Border['style']
  iconColor: Colors['textDarkest']
  iconsMarginRight: Spacing['xSmall']
  descriptorMarginTop: Spacing['xxxSmall']
  descriptorTextColor: Colors['textDarkest']
  descriptorFontSizeSmall: Typography['fontSizeXSmall']
  descriptorFontSizeMedium: Typography['fontSizeXSmall']
  descriptorFontSizeLarge: Typography['fontSizeSmall']
  nameTextColor: Colors['textBrand']
  nameFontSizeSmall: Typography['fontSizeXSmall']
  nameFontSizeMedium: Typography['fontSizeSmall']
  nameFontSizeLarge: Typography['fontSizeMedium']
  baseSpacingSmall: Spacing['xSmall']
  baseSpacingMedium: Spacing['small']
  borderWidth: Border['widthSmall']
  borderRadius: Border['radiusMedium']
  borderColor: Colors['borderDark']
  textLineHeight: Typography['lineHeightCondensed']
  selectedTextColor: Colors['textLightest']
  selectedBackgroundColor: Colors['backgroundDark']
  selectedOutlineWidth: Border['widthLarge']
}

export type TreeBrowserCollection = {
  fontFamily: Typography['fontFamily']
  baseSpacingSmall: Spacing['xSmall']
  baseSpacingMedium: Spacing['small']
  borderWidth: Border['widthSmall']
  borderColor: Colors['borderDark']
}

export type TreeBrowser = {
  borderRadius: Border['radiusMedium']
  focusOutlineWidth: Border['widthMedium']
  focusOutlineColor: Colors['borderBrand']
  focusOutlineStyle: Border['style']
}
export type TruncateText = {
  fontFamily: Typography['fontFamily']
  lineHeight: Typography['lineHeight']
}

export type ContextView = {
  arrowBorderWidth: Border['widthSmall']
  arrowBackgroundColor: Colors['white']
  arrowBorderColor: Colors['tiara']
  arrowBackgroundColorInverse: Colors['licorice']
}

export type View = {
  fontFamily: Typography['fontFamily']
  color: Colors['textDarkest']
  colorPrimaryInverse: Colors['textLightest']
  borderColorPrimary: Colors['borderMedium']
  borderColorSecondary: Colors['borderDark']
  borderColorSuccess: Colors['borderSuccess']
  borderColorBrand: Colors['borderBrand']
  borderColorInfo: Colors['borderInfo']
  borderColorAlert: Colors['borderAlert']
  borderColorWarning: Colors['borderWarning']
  borderColorDanger: Colors['borderDanger']
  debugOutlineColor: Colors['borderDebug']
  backgroundPrimary: Colors['backgroundLightest']
  backgroundSecondary: Colors['backgroundLight']
  backgroundPrimaryInverse: Colors['backgroundDarkest']
  backgroundBrand: Colors['backgroundBrand']
  backgroundInfo: Colors['backgroundInfo']
  backgroundAlert: Colors['backgroundAlert']
  backgroundSuccess: Colors['backgroundSuccess']
  backgroundDanger: Colors['backgroundDanger']
  backgroundWarning: Colors['backgroundWarning']
  focusOutlineStyle: Border['style']
  focusOutlineWidth: Border['widthMedium']
  focusColorInfo: Colors['borderInfo']
  focusColorDanger: Colors['borderDanger']
  focusColorSuccess: Colors['borderSuccess']
  focusColorInverse: Colors['borderLightest']
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

export interface ThemeVariables {
  Avatar: Avatar
  Alert: Alert
  Badge: Badge
  Billboard: Billboard
  Breadcrumb: Breadcrumb
  BaseButton: BaseButton
  CloseButton: CloseButton
  Byline: Byline
  CalendarDay: CalendarDay
  Calendar: Calendar
  CheckboxFacade: CheckboxFacade
  ToggleFacade: ToggleFacade
  CodeEditor: CodeEditor
  DrawerLayoutContent: DrawerLayoutContent
  DrawerLayoutTray: DrawerLayoutTray
  FileDrop: FileDrop
  Flex: Flex
  FormFieldGroup: FormFieldGroup
  FormFieldLabel: FormFieldLabel
  FormFieldMessage: FormFieldMessage
  FormFieldMessages: FormFieldMessages
  Grid: Grid
  Heading: Heading
  Link: Link
  InlineListItem: InlineListItem
  ListItem: ListItem
  List: List
  MenuItem: MenuItem
  MenuGroup: MenuGroup
  MenuSeparator: MenuSeparator
  Metric: Metric
  MetricGroup: MetricGroup
  ModalBody: ModalBody
  ModalFooter: ModalFooter
  ModalHeader: ModalHeader
  Modal: Modal
  Transition: Transition
  AppNavItem: AppNavItem
  AppNav: AppNav
  NavigationItem: NavigationItem
  Navigation: Navigation
  NumberInput: NumberInput
  OptionsItem: OptionsItem
  OptionsSeparator: OptionsSeparator
  Options: Options
  Mask: Mask
  Pages: Pages
  Position: Position
  Pill: Pill
  ProgressBar: ProgressBar
  ProgressCircle: ProgressCircle
  RangeInput: RangeInput
  RadioInput: RadioInput
  RatingIcon: RatingIcon
  Select: Select
  Spinner: Spinner
  InlineSVG: InlineSVG
  TableBody: TableBody
  TableCell: TableCell
  TableColHeader: TableColHeader
  TableHead: TableHead
  TableRow: TableRow
  TableRowHeader: TableRowHeader
  TabsPanel: TabsPanel
  TabsTab: TabsTab
  Table: Table
  Tabs: Tabs
  Tag: Tag
  Text: Text
  ToggleDetails: ToggleDetails
  TextArea: TextArea
  Tooltip: Tooltip
  Tray: Tray
  TreeBrowserButton: TreeBrowserButton
  TreeBrowserCollection: TreeBrowserCollection
  TreeBrowser: TreeBrowser
  TruncateText: TruncateText
  ContextView: ContextView
  View: View
}
