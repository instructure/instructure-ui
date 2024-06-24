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
  Typography
} from './BaseTheme'

export interface ComponentTheme {
  [variableName: string]: string | number | undefined
}

export type AlertTheme = {
  background: string
  color: string
  marginTop: Spacing['small']
  borderRadius: Border['radiusMedium']
  borderWidth: Border['widthMedium']
  borderStyle: Border['style']
  contentPadding: string | 0
  contentFontSize: Typography['fontSizeMedium']
  contentFontFamily: Typography['fontFamily']
  contentFontWeight: Typography['fontWeightNormal']
  contentLineHeight: Typography['lineHeightCondensed']
  closeButtonMarginTop: Spacing['xSmall']
  closeButtonMarginRight: Spacing['xxSmall']
  iconColor: string
  successBorderColor: string
  successIconBackground: string
  infoBorderColor: string
  infoIconBackground: string
  warningBorderColor: string
  warningIconBackground: string
  dangerBorderColor: string
  dangerIconBackground: string
  boxShadow: Shadows['depth2']
}

export type AvatarTheme = {
  background: string
  borderWidthSmall: Border['widthSmall']
  borderWidthMedium: Border['widthMedium']
  borderColor: string
  boxShadowColor: string
  boxShadowBlur: string
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightBold']
  color: string
  colorShamrock: string
  colorBarney: string
  colorCrimson: string
  colorFire: string
  colorLicorice: string
  colorAsh: string
}

export type BadgeTheme = {
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightNormal']
  color: string
  fontSize: Typography['fontSizeXSmall']
  colorDanger: string
  colorSuccess: string
  colorPrimary: string
  colorInverse: string
  size: string
  countOffset: string | 0
  notificationOffset: string | 0
  notificationZIndex: Stacking['above']
  sizeNotification: Spacing['small']
  borderRadius: string | 0
  padding: Spacing['xxSmall']
  pulseBorderThickness: Border['widthMedium']
}

export type BillboardTheme = {
  fontFamily: Typography['fontFamily']
  paddingSmall: Spacing['small']
  paddingMedium: Spacing['medium']
  paddingLarge: Spacing['medium']
  iconColor: string
  mediumMargin: Spacing['small']
  largeMargin: Spacing['medium']
  iconHoverColor: string
  backgroundColor: string
  iconHoverColorInverse: string
  buttonBorderWidth: Border['widthMedium']
  buttonBorderRadius: Border['radiusLarge']
  messageColor: string
  messageColorClickable: string
  messageColorInverse: string
  messageFontSizeSmall: Typography['fontSizeSmall']
  messageFontSizeMedium: Typography['fontSizeMedium']
  messageFontSizeLarge: Typography['fontSizeLarge']
  clickableActiveBg: string
  clickableActiveText: string
  buttonBorderStyle: Border['style']
  buttonHoverBorderStyle: string
}

export type BreadcrumbTheme = {
  fontFamily: Typography['fontFamily']
  separatorColor: string
  smallSeparatorFontSize: string
  smallFontSize: Typography['fontSizeSmall']
  mediumSeparatorFontSize: string
  mediumFontSize: Typography['fontSizeMedium']
  largeSeparatorFontSize: string
  largeFontSize: Typography['fontSizeLarge']
}

export type BaseButtonTheme = {
  transform: string
  hoverTransform: string
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightNormal']
  textTransform: string
  letterSpacing: string
  borderRadius: Border['radiusMedium']
  borderStyle: Border['style']
  borderWidth: Border['widthSmall']
  smallHeight: Forms['inputHeightSmall']
  smallFontSize: Typography['fontSizeSmall']
  smallPaddingHorizontal: Spacing['xSmall']
  smallPaddingTop: string
  smallPaddingBottom: string
  mediumHeight: Forms['inputHeightMedium']
  mediumFontSize: Typography['fontSizeMedium']
  mediumPaddingHorizontal: Spacing['small']
  mediumPaddingTop: string
  mediumPaddingBottom: string
  largeHeight: Forms['inputHeightLarge']
  largeFontSize: Typography['fontSizeLarge']
  largePaddingHorizontal: Spacing['medium']
  largePaddingTop: string
  largePaddingBottom: string
  lineHeight: Typography['lineHeightFit']
  iconSizeSmall: string
  iconSizeMedium: string
  iconSizeLarge: string
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

  secondaryColor: string
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

  successColor: string
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

  dangerColor: string
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

  primaryInverseColor: string
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

export type CloseButtonTheme = {
  offsetMedium: Spacing['medium']
  offsetSmall: Spacing['small']
  offsetXSmall: Spacing['xSmall']
  zIndex: Stacking['above']
}

export type BylineTheme = {
  fontFamily: Typography['fontFamily']
  background: string
  color: string
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

export type CalendarDayTheme = {
  color: string
  background: string
  fontSize: Typography['fontSizeMedium']
  padding: Spacing['xxSmall']
  height: Forms['inputHeightSmall']
  minWidth: Forms['inputHeightSmall']
  outsideMonthColor: string
  selectedBackground: string
  selectedColor: string
  selectedBorderRadius: Border['radiusMedium']
  todayBackground: string
  todayColor: string
  todayBorderRadius: Forms['inputHeightSmall']
}

export type CalendarTheme = {
  fontSize: Typography['fontSizeMedium']
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightNormal']
  color: string
  background: string
  navMargin: Spacing['small']
  navWithYearMargin: Spacing['xSmall']
  yearPickerMargin: Spacing['mediumSmall']
  maxHeaderWidth: Spacing['medium']
}

export type CheckboxFacadeTheme = {
  color: string
  borderWidth: Border['widthSmall']
  borderColor: string
  borderRadius: Border['radiusMedium']
  background: string
  marginRight: Spacing['xSmall']
  padding: Spacing['xxxSmall']
  checkedBackground: string
  checkedBorderColor: string
  hoverBorderColor: string
  focusBorderColor: string
  focusBorderWidth: Border['widthMedium']
  focusBorderStyle: Border['style']
  labelColor: string
  checkedLabelColor: string
  labelFontFamily: Typography['fontFamily']
  labelFontWeight: Typography['fontWeightNormal']
  labelLineHeight: Typography['lineHeightCondensed']
  facadeSizeSmall: string
  facadeSizeMedium: string
  facadeSizeLarge: string
  labelFontSizeSmall: Typography['fontSizeSmall']
  labelFontSizeMedium: Typography['fontSizeMedium']
  labelFontSizeLarge: Typography['fontSizeLarge']
  iconSizeSmall: string
  iconSizeMedium: string
  iconSizeLarge: string
}

export type ToggleFacadeTheme = {
  color: string
  background: string
  borderColor: string
  borderWidth: Border['widthMedium']
  borderRadius: string
  marginEnd: Spacing['small']
  marginStart: Spacing['small']
  marginVertical: Spacing['xSmall']
  checkedBackground: string
  uncheckedIconColor: string
  checkedIconColor: string
  focusOutlineColor: string
  focusBorderWidth: Border['widthMedium']
  focusBorderStyle: Border['style']
  toggleBackground: string
  toggleShadow: Shadows['depth1']
  toggleSize: Forms['inputHeightSmall']
  labelColor: string
  labelFontFamily: Typography['fontFamily']
  labelFontWeight: Typography['fontWeightNormal']
  labelLineHeight: Typography['lineHeightCondensed']
  labelFontSizeSmall: Typography['fontSizeSmall']
  labelFontSizeMedium: Typography['fontSizeMedium']
  labelFontSizeLarge: Typography['fontSizeLarge']
}

export type CodeEditorTheme = {
  fontFamily: Typography['fontFamilyMonospace']
  fontSize: Typography['fontSizeSmall']
  background: string
  border: string | 0
  borderRadius: Border['radiusMedium']
  focusBorderColor: string
  focusBoxShadow: string
  horizontalPadding: Spacing['xSmall']
  verticalPadding: Spacing['xxSmall']
  color: string
  lineNumberColor: string
  gutterBorder: string
  gutterBackground: string
  gutterMarkerColor: string
  gutterMarkerSubtleColor: string
  cursorColor: string
  secondaryCursorColor: string
  rulerColor: string
  matchingBracketOutline: string
  nonMatchingBracketColor: string
  matchingTagBackground: string
  activeLineBackground: string
  selectedBackground: string
  fatCursorBackground: string
  fatCursorMarkBackground: string
  searchingBackground: string
  zIndex: Stacking['above']
  quoteColor: string
  headerColor: string
  negativeColor: string
  positiveColor: string
  keywordColor: string
  atomColor: string
  numberColor: string
  defColor: string
  variableColor: string
  secondaryVariableColor: string
  typeColor: string
  commentColor: string
  stringColor: string
  secondaryStringColor: string
  metaColor: string
  qualifierColor: string
  builtInColor: string
  bracketColor: string
  tagColor: string
  attributeColor: string
  hrColor: string
  linkColor: string
  errorColor: string
  propertyColor: string
  nodeColor: string
  operatorColor: string
}

export type ColorContrastTheme = {
  width: string

  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightNormal']
  lineHeight: Typography['lineHeightCondensed']
  fontSize: Typography['fontSizeMedium']

  statusWrapperBottomMargin: Spacing['xxSmall']
  colorIndicatorRightMargin: Spacing['small']
  colorPreviewBottomMargin: Spacing['small']
  colorPreviewTopMargin: Spacing['xSmall']
  labelBottomMargin: Spacing['xxSmall']

  smallBorder: Border['widthSmall']

  successColor: string
  failureColor: string
  pickedHexColor: string
}

export type ColorIndicatorTheme = {
  borderWidth: Border['widthSmall']
  backgroundImage: string
  backgroundSize: string
  backgroundPosition: string
  circleIndicatorSize: string
  rectangleIndicatorSize: string
  colorIndicatorBorderColor: string
  rectangularIndicatorBorderRadius: Spacing['xxSmall']
  rectangularIndicatorBorderWidth: Border['widthSmall']
}

export type ColorMixerPaletteTheme = {
  indicatorBorderColor: string
  whiteColor: string
  colorIndicatorBorderColor: string

  indicatorBorderWidth: Border['widthSmall']
  paletteBorderRadius: Border['radiusMedium']
  paletteBorderWidth: Border['widthSmall']

  disabledOverlayZIndex: Stacking['topmost']
  paletteOffset: string
}

export type ColorMixerRGBAInputTheme = {
  labelFontWeight: Typography['fontWeightBold']
  inputContainerTopMargin: Spacing['xSmall']
  tgbInputTopMargin: Spacing['xSmall']
  rgbaInputTopMargin: Spacing['medium']
}

export type ColorMixerSliderTheme = {
  indicatorBorderColor: string

  checkerboardBackgroundImage: string
  checkerboardBackgroundSize: string
  checkerboardBackgroundPosition: string
  colorIndicatorBorderColor: string

  indicatorBorderWidth: Border['widthSmall']
  sliderBorderWidth: Border['widthSmall']
  indicatorZIndex: Stacking['above']
  disabledOverlayZIndex: Stacking['topmost']
}

export type ColorPickerTheme = {
  hashMarkColor: string
  warningIconColor: string
  errorIconColor: string
  successIconColor: string
  popoverSeparatorColor: string
  popoverFooterColor: string
  checkerboardBackgroundColor: string
  checkerboardBackgroundImage: string
  checkerboardBackgroundSize: string
  checkerboardBackgroundPosition: string
  colorIndicatorBorderColor: string
  simpleColorContainerLeftPadding: Spacing['xSmall']
  hashMarkContainerLineHeight: Typography['fontSizeXLarge']
  hashMarkContainerLeftPadding: Spacing['xSmall']
  hashMarkContainerRightPadding: Spacing['xxxSmall']
  errorIconsRightPadding: Spacing['small']
  successIconRightPadding: Spacing['small']
  labelRightMargin: Spacing['xxSmall']
  popoverContentPadding: Spacing['xxSmall']
  popoverContentBlockBorderWidth: Border['widthSmall']
  popoverContentBlockTopMargin: Spacing['small']
  popoverContentBlockBottomMargin: Spacing['small']
  popoverContentBlockTopPadding: Spacing['small']
  popoverFooterPadding: Spacing['xSmall']
  popoverFooterTopBorderWidth: Border['widthSmall']
  colorMixerButtonContainerLeftMargin: Spacing['xSmall']
}

export type ColorPresetTheme = {
  xxSmallSpacing: Spacing['xxSmall']
  smallSpacing: Spacing['small']
  selectedIndicatorBackgroundColor: string
  selectedIndicatorBorderColor: string
  popoverDividerColor: string
  smallBorder: Border['widthSmall']
  popoverFooterColor: string
  checkerboardBackgroundImage: string
  checkerboardBackgroundSize: string
  checkerboardBackgroundPosition: string
  popoverContentBlockTopMargin: Spacing['small']
  popoverContentBlockBottomMargin: Spacing['small']
  popoverContentBlockTopPadding: Spacing['small']
}

export type DrawerLayoutContentTheme = {
  duration: Transitions['duration']
  overflowY: string
}

export type DrawerLayoutTrayTheme = {
  background: string
  borderColor: string
  borderWidth: Border['widthSmall']
  borderStyle: Border['style']
  zIndex: Stacking['topmost']
  boxShadow: Shadows['depth3']
  overflowX: string
  overflowY: string
  contentOverflowY: string
}

export type DrilldownTheme = {
  headerTitleFontWeight: Typography['fontWeightBold']
  headerActionColor: string
  labelInfoPadding: Spacing['small']
}

export type FileDropTheme = {
  backgroundColor: string
  borderRadius: Border['radiusLarge']
  borderWidth: Border['widthMedium']
  borderStyle: string
  borderColor: string
  hoverBorderColor: string
  acceptedColor: string
  rejectedColor: string
}

export type FlexTheme = {
  fontFamily: Typography['fontFamily']
  gapXxxSmall: string
  gapXxSmall: string
  gapXSmall: string
  gapSmall: string
  gapMedium: string
  gapLarge: string
  gapXLarge: string
  gapXxLarge: string
}

export type FormFieldGroupTheme = {
  borderWidth: Border['widthSmall']
  borderStyle: Border['style']
  borderColor: string
  borderRadius: Border['radiusMedium']
  errorBorderColor: string
  errorFieldsPadding: Spacing['xSmall']
}

export type FormFieldLabelTheme = {
  color: string
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightBold']
  fontSize: Typography['fontSizeMedium']
  lineHeight: Typography['lineHeightFit']
}

export type FormFieldMessageTheme = {
  colorHint: string
  colorError: string
  colorSuccess: string
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightNormal']
  fontSize: Typography['fontSizeSmall']
  lineHeight: Typography['lineHeight']
}

export type FormFieldMessagesTheme = {
  topMargin: Spacing['xxSmall']
}

export type GridTheme = {
  spacingSmall: Spacing['small']
  spacingMedium: Spacing['medium']
  spacingLarge: Spacing['large']
} & Media

export type HeadingTheme = {
  lineHeight: Typography['lineHeightCondensed']
  h1FontSize: Typography['fontSizeXXLarge']
  h1FontWeight: Typography['fontWeightBold']
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
  primaryInverseColor: string
  primaryColor: string
  secondaryColor: string
  secondaryInverseColor: string
  borderPadding: Spacing['xxxSmall']
  borderColor: string
  borderWidth: Border['widthSmall']
  borderStyle: Border['style']
}

export type ImgTheme = {
  effectTransitionDuration: string
  imageBlurAmount: string | 0
}

export type LinkTheme = {
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightNormal']
  color: string
  textDecorationWithinText: string
  hoverTextDecorationWithinText: string
  textDecorationOutsideText: string
  hoverTextDecorationOutsideText: string
  focusOutlineWidth: Border['widthMedium']
  focusOutlineColor: string
  focusOutlineStyle: Border['style']
  focusOutlineBorderRadius: Border['radiusSmall']
  hoverColor: string
  colorInverse: string
  focusInverseOutlineColor: string
  focusInverseIconOutlineColor: string
  iconSize: string
  iconPlusTextMargin: Spacing['xxSmall']
}

export type InlineListItemTheme = {
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightNormal']
  fontSizeSmall: Typography['fontSizeSmall']
  fontSizeMedium: Typography['fontSizeMedium']
  fontSizeLarge: Typography['fontSizeLarge']
  color: string
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

export type ListItemTheme = {
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightNormal']
  lineHeight: Typography['lineHeight']
  fontSizeSmall: Typography['fontSizeSmall']
  fontSizeMedium: Typography['fontSizeMedium']
  fontSizeLarge: Typography['fontSizeLarge']
  color: string
  spacingXXXSmall: Spacing['xxxSmall']
  spacingXXSmall: Spacing['xxSmall']
  spacingXSmall: Spacing['xSmall']
  spacingSmall: Spacing['small']
  spacingMedium: Spacing['medium']
  spacingLarge: Spacing['large']
  spacingXLarge: Spacing['xLarge']
  spacingXXLarge: Spacing['xxLarge']
  delimiterDashedBorder: string
  delimiterSolidBorder: string
}

export type ListTheme = {
  listPadding: Spacing['large']
  orderedNumberFontWeight: Typography['fontWeightBold']
  orderedNumberMargin: Spacing['xSmall']
}

export type MenuItemTheme = {
  padding: string | 0
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightNormal']
  lineHeight: Typography['lineHeightCondensed']
  fontSize: Typography['fontSizeMedium']
  labelPadding: Spacing['large']
  labelColor: string
  background: string
  iconColor: string
  iconPadding: Spacing['small']
  activeBackground: string
  activeLabelColor: string
  activeIconColor: string
}

export type MenuGroupTheme = {
  fontSize: Typography['fontSizeMedium']
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightBold']
  padding: string | 0
  color: string
  background: string
}

export type MenuSeparatorTheme = {
  background: string
  height: Border['widthSmall']
  margin: string | 0
}

export type MenuTheme = {
  minWidth: Breakpoints['xxSmall']
  maxWidth: Breakpoints['xSmall']
  background: string
  borderRadius: Border['radiusMedium']
  focusBorderStyle: Border['style']
  focusBorderWidth: Border['widthMedium']
  focusBorderColor: string
  focusBorderRadius: Border['radiusMedium']
}

export type MetricTheme = {
  padding: string | 0
  fontFamily: Typography['fontFamily']
  valueColor: string
  valueFontSize: Typography['fontSizeXLarge']
  valueFontWeight: Typography['fontWeightBold']
  labelColor: string
  labelFontSize: Typography['fontSizeXSmall']
}

export type MetricGroupTheme = {
  lineHeight: Typography['lineHeightCondensed']
}

export type ModalBodyTheme = {
  inverseBackground: string
}

export type ModalFooterTheme = {
  background: string
  borderColor: string
  borderWidth: Border['widthSmall']
  borderRadius: Border['radiusMedium']
  padding: Spacing['small']
  inverseBackground: string
  inverseBorderColor: string
}

export type ModalHeaderTheme = {
  background: string
  borderColor: string
  padding: Spacing['medium']
  paddingCompact: Spacing['small']
  inverseBackground: string
  inverseBorderColor: string
}

export type ModalTheme = {
  fontFamily: Typography['fontFamily']
  textColor: string
  background: string
  borderColor: string
  borderRadius: Border['radiusMedium']
  inverseBackground: string
  inverseTextColor: string
  autoMinWidth: Breakpoints['xSmall']
  smallMaxWidth: Breakpoints['small']
  mediumMaxWidth: Breakpoints['medium']
  largeMaxWidth: Breakpoints['large']
  boxShadow: Shadows['depth3']
  zIndex: Stacking['topmost']
}

export type TransitionTheme = {
  duration: Transitions['duration']
  timing: Transitions['timing']
}

export type AppNavItemTheme = {
  fontFamily: Typography['fontFamily']
  fontSize: string | 0
  fontWeight: Typography['fontWeightBold']
  textColor: string
  textColorSelected: string
  height: string | 0
  padding: Spacing['small']
  backgroundColor: string
}

export type AppNavTheme = {
  fontFamily: Typography['fontFamily']
  height: string | 0
  borderColor: string
  borderStyle: Border['style']
  borderWidth: Border['widthSmall']
  horizontalMargin: Spacing['xxSmall']
  menuTriggerWidth: string | 0
}

export type SideNavBarTheme = {
  fontColor: string
  backgroundColor: string
  width: string
  minimizedWidth: string
  fill: string
  focusOutlineInnerWidth: Border['widthMedium']
  focusOutlineOuterWidth: Border['widthSmall']
  focusOutlineInnerColor: string
  focusOutlineOuterColor: string
  marginBottom: Spacing['small']
  toggleTransition: Transitions['duration']
}

export type SideNavBarItemTheme = {
  fontSize: Typography['fontSizeSmall']
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightNormal']
  fontColor: string
  iconSize: string | 0
  iconColor: string
  lineHeight: Typography['lineHeight']
  backgroundColor: string
  linkTextDecoration: string
  hoverBackgroundColor: string
  outerFocusOutline: string
  innerFocusOutline: string
  selectedFontColor: string
  selectedIconColor: string
  selectedBackgroundColor: string
  selectedOuterFocusOutline: string
  selectedInnerFocusOutline: string
  contentPadding: Spacing['xxSmall']
}

export type NumberInputTheme = {
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightNormal']
  borderWidth: Border['widthSmall']
  borderStyle: Border['style']
  borderColor: string
  borderRadius: Border['radiusMedium']
  color: string
  background: string
  padding: string | 0
  arrowsContainerWidth: string | 0
  arrowsColor: string
  arrowsBackgroundColor: string
  arrowsHoverBackgroundColor: string
  arrowsBorderColor: string
  arrowsActiveBoxShadow: string
  focusOutlineWidth: Border['widthMedium']
  focusOutlineStyle: Border['style']
  focusOutlineColor: string
  errorBorderColor: string
  errorOutlineColor: string
  placeholderColor: string
  mediumFontSize: Typography['fontSizeMedium']
  mediumHeight: Forms['inputHeightMedium']
  largeFontSize: Typography['fontSizeLarge']
  largeHeight: Forms['inputHeightLarge']
}

export type OptionsItemTheme = {
  fontSize: Typography['fontSizeMedium']
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightNormal']
  lineHeight: Typography['lineHeightCondensed']
  color: string
  background: string
  highlightedLabelColor: string
  highlightedBackground: string
  selectedLabelColor: string
  selectedBackground: string
  padding: string | 0
  iconPadding: Spacing['small']
  nestedPadding: Spacing['medium']
  beforeLabelContentVOffset: string | 0
  afterLabelContentVOffset: string | 0
  descriptionFontSize: Typography['fontSizeSmall']
  descriptionFontWeight: Typography['fontWeightNormal']
  descriptionLineHeight: Typography['lineHeight']
  descriptionPaddingStart: string | 0
  descriptionColor: string
}

export type OptionsSeparatorTheme = {
  background: string
  height: Border['widthSmall']
  margin: string | 0
}

export type OptionsTheme = {
  labelFontWeight: Typography['fontWeightBold']
  background: string
  labelColor: string
  labelPadding: string | 0
  nestedLabelPadding: string | 0
}

export type MaskTheme = {
  zIndex: Stacking['topmost']
  background: string
  borderColor: string
  focusBorderColor: string
  borderRadius: Border['radiusMedium']
  borderWidth: Border['widthSmall']
}

export type PagesTheme = {
  fontSize: Typography['fontSizeMedium']
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightNormal']
  color: string
  background: string
}

export type PaginationPageInputTheme = {
  inputSpacing: Spacing['xSmall']
  inputWidth: string
}

export type PillTheme = {
  fontFamily: Typography['fontFamily']
  padding: string | 0
  height: string | 0
  background: string
  textFontSize: Typography['fontSizeSmall']
  statusLabelFontWeight: Typography['fontWeightBold']
  textFontWeight: Typography['fontWeightNormal']
  maxWidth: string | 0
  primaryColor: string
  infoColor: string
  dangerColor: string
  successColor: string
  warningColor: string
  alertColor: string
  borderWidth: Border['widthSmall']
  borderStyle: Border['style']
  borderRadius: string | 0
}

export type PositionTheme = {
  zIndex: Stacking['topmost']
}

export type ProgressBarTheme = {
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightNormal']
  lineHeight: Typography['lineHeightCondensed']
  fontSize: Typography['fontSizeMedium']
  xSmallHeight: Spacing['xSmall']
  xSmallValueFontSize: Typography['fontSizeXSmall']
  smallHeight: string
  smallValueFontSize: Typography['fontSizeXSmall']
  mediumHeight: Spacing['medium']
  mediumValueFontSize: Typography['fontSizeSmall']
  largeHeight: Spacing['large']
  largeValueFontSize: Typography['fontSizeMedium']
  valuePadding: string | 0
  meterColorBrand: string
  meterColorBrandInverse: string
  meterColorInfo: string
  meterColorInfoInverse: string
  meterColorSuccess: string
  meterColorSuccessInverse: string
  meterColorDanger: string
  meterColorDangerInverse: string
  meterColorAlert: string
  meterColorAlertInverse: string
  meterColorWarning: string
  meterColorWarningInverse: string
  meterBorderWidthInverse: Border['widthSmall']
  meterBorderColorInverse: 'transparent'
  trackColor: string
  trackColorInverse: string
  trackBottomBorderWidth: Border['widthSmall']
  trackBottomBorderColor: string
  trackBottomBorderColorInverse: string
}

export type ProgressCircleTheme = {
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightNormal']
  lineHeight: Typography['lineHeightCondensed']
  xSmallSize: string
  xSmallRadius: string
  xSmallCircumference: string
  xSmallTransform: string
  xSmallStrokeWidth: string
  xSmallBorderOffset: string
  smallSize: string
  smallRadius: string
  smallCircumference: string
  smallTransform: string
  smallStrokeWidth: string
  smallBorderOffset: string
  mediumSize: string
  mediumRadius: string
  mediumCircumference: string
  mediumTransform: string
  mediumStrokeWidth: string
  mediumBorderOffset: string
  largeSize: string
  largeRadius: string
  largeCircumference: string
  largeTransform: string
  largeStrokeWidth: string
  largeBorderOffset: string
  color: string
  colorInverse: string
  trackColor: string
  trackColorInverse: string
  trackBorderColor: string
  trackBorderColorInverse: string
  meterColorBrand: string
  meterColorBrandInverse: string
  meterColorInfo: string
  meterColorInfoInverse: string
  meterColorSuccess: string
  meterColorSuccessInverse: string
  meterColorDanger: string
  meterColorDangerInverse: string
  meterColorAlert: string
  meterColorAlertInverse: string
  meterColorWarning: string
  meterColorWarningInverse: string
}

export type RadioInputTheme = {
  labelColor: string
  labelFontFamily: Typography['fontFamily']
  labelFontWeight: Typography['fontWeightNormal']
  labelLineHeight: Typography['lineHeightCondensed']
  background: string
  borderWidth: Border['widthSmall']
  borderColor: string
  hoverBorderColor: string
  controlSize: string | 0
  focusBorderColor: string
  focusBorderWidth: Border['widthMedium']
  focusBorderStyle: Border['style']
  simpleFacadeSmallSize: string | 0
  simpleFacadeMediumSize: string | 0
  simpleFacadeLargeSize: string | 0
  simpleCheckedInsetSmall: string | 0
  simpleCheckedInsetMedium: string | 0
  simpleCheckedInsetLarge: string | 0
  simpleFontSizeSmall: Typography['fontSizeSmall']
  simpleFontSizeMedium: Typography['fontSizeMedium']
  simpleFontSizeLarge: Typography['fontSizeLarge']
  simpleFacadeMarginEnd: Spacing['xSmall']
  toggleBorderRadius: Border['radiusSmall']
  toggleBorderWidth: Border['widthLarge']
  toggleBackgroundSuccess: string
  toggleBackgroundOff: string
  toggleBackgroundDanger: string
  toggleBackgroundWarning: string
  toggleHandleText: string
  toggleSmallHeight: Forms['inputHeightSmall']
  toggleMediumHeight: Forms['inputHeightMedium']
  toggleLargeHeight: Forms['inputHeightLarge']
  toggleShadow: Shadows['depth1']
  toggleSmallFontSize: Typography['fontSizeXSmall']
  toggleMediumFontSize: Typography['fontSizeSmall']
  toggleLargeFontSize: Typography['fontSizeMedium']
}

export type RangeInputTheme = {
  minWidth: string | 0
  handleSize: string | 0
  handleBackground: string
  handleBorderColor: string
  handleBorderSize: Border['widthMedium']
  handleShadow: string | 0
  handleFocusInset: Border['widthSmall']
  handleFocusRingSize: Border['widthMedium']
  handleFocusRingColor: string
  handleShadowColor: string
  handleHoverBackground: string
  handleFocusBackground: string
  handleFocusOutlineColor: string
  handleFocusOutlineWidth: string | 0
  trackBackground: string
  valueColor: string
  valueFontFamily: Typography['fontFamily']
  valueFontWeight: Typography['fontWeightNormal']
  valueSmallFontSize: Typography['fontSizeSmall']
  valueSmallPadding: string | 0
  valueSmallLineHeight: Forms['inputHeightSmall']
  valueMediumFontSize: Typography['fontSizeMedium']
  valueMediumPadding: string | 0
  valueMediumLineHeight: Forms['inputHeightMedium']
  valueLargeFontSize: Typography['fontSizeLarge']
  valueLargePadding: string | 0
  valueLargeLineHeight: Forms['inputHeightLarge']
}

export type RatingIconTheme = {
  iconMargin: Spacing['xxxSmall']
  iconEmptyColor: string
  iconFilledColor: string
  smallIconFontSize: Typography['fontSizeMedium']
  mediumIconFontSize: Typography['fontSizeLarge']
  largeIconFontSize: Typography['fontSizeXXLarge']
}

export type SelectTheme = {
  fontSize: Typography['fontSizeMedium']
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightNormal']
  smallIconSize: Typography['fontSizeXSmall']
  mediumIconSize: Typography['fontSizeSmall']
  largeIconSize: Typography['fontSizeMedium']
  color: string
  background: string
}

export type SourceCodeEditorTheme = {
  fontFamily: Typography['fontFamilyMonospace']
  fontSize: Typography['fontSizeSmall']
  color: string
  background: string
  gutterBackground: string
  borderWidth: Border['widthSmall']
  borderColor: string
  borderRadius: Border['radiusMedium']
  focusBorderColor: string
  horizontalPadding: Spacing['xSmall']
  verticalPadding: Spacing['xxSmall']
}

export type SpinnerTheme = {
  trackColor: string
  color: string
  xSmallSize: string | 0
  xSmallBorderWidth: string | 0
  smallSize: string | 0
  smallBorderWidth: string | 0
  mediumSize: string | 0
  mediumBorderWidth: string | 0
  largeSize: string | 0
  largeBorderWidth: string | 0
  inverseColor: string
}

export type InlineSVGTheme = {
  primaryInverseColor: string
  primaryColor: string
  secondaryColor: string
  secondaryInverseColor: string
  warningColor: string
  brandColor: string
  errorColor: string
  alertColor: string
  successColor: string
}

export type SVGIconTheme = {
  sizeXSmall: string | 0
  sizeSmall: string | 0
  sizeMedium: string | 0
  sizeLarge: string | 0
  sizeXLarge: string | 0
}

export type TableBodyTheme = {
  fontSize: Typography['fontSizeMedium']
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightNormal']
  color: string
  background: string
}

export type TableCellTheme = {
  fontSize: Typography['fontSizeMedium']
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightNormal']
  color: string
  background: string
  borderColor: string
  lineHeight: Typography['lineHeightCondensed']
  padding: string | 0
}

export type TableColHeaderTheme = {
  fontSize: Typography['fontSizeMedium']
  fontFamily: Typography['fontFamily']
  color: string
  background: string
  borderColor: string
  lineHeight: Typography['lineHeightCondensed']
  padding: string | 0
  focusOutlineColor: string
  focusOutlineWidth: Border['widthMedium']
  focusOutlineStyle: Border['style']
}

export type TableHeadTheme = {
  fontSize: Typography['fontSizeMedium']
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightNormal']
  color: string
  background: string
}

export type TableRowTheme = {
  fontSize: Typography['fontSizeMedium']
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightNormal']
  color: string
  background: string
  borderColor: string
  hoverBorderColor: string
  padding: string | 0
}

export type TableRowHeaderTheme = {
  fontSize: Typography['fontSizeMedium']
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightNormal']
  color: string
  background: string
  borderColor: string
  lineHeight: Typography['lineHeightCondensed']
  padding: string | 0
}

export type TableTheme = {
  fontSize: Typography['fontSizeMedium']
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightNormal']
  color: string
  background: string
}

export type TabsPanelTheme = {
  fontSize: Typography['fontSizeMedium']
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightNormal']
  lineHeight: Typography['lineHeight']
  color: string
  background: string
  borderColor: string
  borderWidth: Border['widthSmall']
  borderStyle: Border['style']
  defaultOverflowY: string
}

export type TabsTabTheme = {
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightNormal']
  lineHeight: Typography['lineHeightCondensed']
  fontSize: Typography['fontSizeMedium']
  defaultColor: string
  defaultHoverBorderColor: string
  defaultSelectedBorderColor: string
  secondaryColor: string
  secondarySelectedBackground: string
  secondarySelectedBorderColor: string
  zIndex: Stacking['above']
}

export type TabsTheme = {
  defaultBackground: string
  scrollFadeColor: string
  tabVerticalOffset: Border['widthSmall']
  zIndex: Stacking['above']
  scrollOverlayWidthDefault: string
  scrollOverlayWidthSecondary: string
}

export type TagTheme = {
  fontFamily: Typography['fontFamily']
  heightSmall: string | 0
  heightMedium: Forms['inputHeightSmall']
  heightLarge: Forms['inputHeightMedium']
  fontSizeSmall: Typography['fontSizeXSmall']
  fontSizeMedium: Typography['fontSizeSmall']
  fontSizeLarge: Typography['fontSizeMedium']
  padding: string | 0
  paddingSmall: string | 0
  focusOutlineColor: string
  focusOutlineWidth: Border['widthMedium']
  focusOutlineStyle: Border['style']
  maxWidth: string | 0
  iconMargin: Spacing['small']
  transitionTiming: string
  defaultBackgroundHover: string
  defaultBackground: string
  defaultBorderColor: string
  defaultBorderRadius: string
  defaultBorderStyle: string
  defaultBorderWidth: string | 0
  defaultColor: string
  defaultIconColor: string
  defaultIconHoverColor: string
  inlineBackgroundHover: string
  inlineBackground: string
  inlineBorderColor: string
  inlineBorderRadius: string | 0
  inlineBorderStyle: string
  inlineBorderWidth: string | 0
  inlineColor: string
  inlineIconColor: string
  inlineIconHoverColor: string
}

export type TextTheme = Typography & {
  primaryInverseColor: string
  primaryColor: string
  secondaryColor: string
  secondaryInverseColor: string
  brandColor: string
  dangerColor: string
  successColor: string
  alertColor: string
  paragraphMargin: string | 0
}

export type TextAreaTheme = {
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightNormal']
  color: string
  background: string
  borderWidth: Border['widthSmall']
  borderStyle: Border['style']
  borderTopColor: string
  borderRightColor: string
  borderBottomColor: string
  borderLeftColor: string
  borderRadius: Border['radiusMedium']
  padding: Spacing['small']
  focusOutlineColor: string
  focusOutlineWidth: Border['widthMedium']
  focusOutlineStyle: Border['style']
  errorBorderColor: string
  errorOutlineColor: string
  placeholderColor: string
  smallFontSize: Typography['fontSizeSmall']
  smallHeight: Forms['inputHeightSmall']
  mediumFontSize: Typography['fontSizeMedium']
  mediumHeight: Forms['inputHeightMedium']
  largeFontSize: Typography['fontSizeLarge']
  largeHeight: Forms['inputHeightLarge']
}

export type TextInputTheme = {
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightNormal']
  borderWidth: Border['widthSmall']
  borderStyle: Border['style']
  borderColor: string
  borderRadius: Border['radiusMedium']
  color: string
  background: string
  padding: Spacing['small']
  focusOutlineWidth: Border['widthMedium']
  focusOutlineStyle: Border['style']
  focusOutlineColor: string
  errorBorderColor: string
  errorOutlineColor: string
  placeholderColor: string
  smallFontSize: Typography['fontSizeSmall']
  smallHeight: Forms['inputHeightSmall']
  mediumFontSize: Typography['fontSizeMedium']
  mediumHeight: Forms['inputHeightMedium']
  largeFontSize: Typography['fontSizeLarge']
  largeHeight: Forms['inputHeightLarge']
}

export type ToggleDetailsTheme = {
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightNormal']
  lineHeight: Typography['lineHeight']
  textColor: string
  fontSizeSmall: Typography['fontSizeSmall']
  fontSizeMedium: Typography['fontSizeMedium']
  fontSizeLarge: Typography['fontSizeLarge']
  smallIconSize: string | 0
  mediumIconSize: string | 0
  largeIconSize: string | 0
  iconMargin: Spacing['xxSmall']
  iconColor: string
  togglePadding: Spacing['xxSmall']
  toggleBorderRadius: Border['radiusMedium']
  toggleBorderWidth: Border['widthMedium']
  toggleBorderStyle: Border['style']
  toggleFocusBorderColor: string
  filledBackgroundColor: string
  filledBorderWidth: Border['widthSmall']
  filledBorderStyle: Border['style']
  filledBorderColor: string
  filledBorderRadius: Border['radiusMedium']
  filledPadding: Spacing['small']
}

export type TooltipTheme = {
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightNormal']
  fontSize: Typography['fontSizeSmall']
  padding: Spacing['small']
}

export type TopNavBarActionItemsTheme = {
  smallViewportActionItemContainerMargin: Spacing['medium']
  smallViewportActionItemContainerMaxWidth: string | 0
  smallViewportDropdownMenuActiveOptionFontWeight: Typography['fontWeightBold']
  smallViewportDropdownMenuActiveOptionIndicatorSpacing: Spacing['xSmall']
  smallViewportDropdownMenuActiveOptionIndicatorWidth: Border['widthMedium']
  smallViewportDropdownMenuActiveOptionIndicatorColor: string
}

export type TopNavBarBrandTheme = {
  logoHeight: string
  logoPadding: Spacing['small']
  iconPadding: Spacing['small']
  focusOutlineInset: string | 0
}

export type TopNavBarItemTheme = {
  fontSize: Typography['fontSizeMedium']
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightNormal']
  color: string
  colorInverse: string
  itemInlinePadding: Spacing['xxSmall']
  itemSpacing: Spacing['xSmall']
  iconTextGap: Spacing['xSmall']
  activeItemFontWeight: Typography['fontWeightBold']
  activeItemIndicatorSpacing: Spacing['xSmall']
  activeIndicatorWidth: Border['widthMedium']
  activeIndicatorColor: string
  activeIndicatorColorInverse: string
}

export type TopNavBarLayoutTheme = TopNavBarLayoutDesktopTheme &
  TopNavBarLayoutSmallViewportTheme

export type TopNavBarLayoutDesktopTheme = {
  desktopFontSize: Typography['fontSizeMedium']
  desktopFontFamily: Typography['fontFamily']
  desktopFontWeight: Typography['fontWeightNormal']
  desktopBackground: string
  desktopBackgroundInverse: string
  desktopBottomBorder: string
  desktopBottomBorderInverse: string
  desktopHeight: string
  desktopZIndex: Stacking['topmost']

  desktopInlinePadding: Spacing['small']
  desktopBrandContainerInlineMargin: Spacing['medium']
  desktopMenuItemsContainerInlineMargin: Spacing['large']
  desktopActionItemsContainerInlineMargin: Spacing['xSmall']
  desktopUserContainerInlineMargin: Spacing['xSmall']

  desktopUserSeparatorGap: Spacing['xSmall']
  desktopUserSeparatorHeight: string | 0
  desktopUserSeparatorWidth: Border['widthSmall']
  desktopUserSeparatorColor: string
  desktopUserSeparatorColorInverse: string
}

export type TopNavBarLayoutSmallViewportTheme = {
  smallViewportFontSize: Typography['fontSizeMedium']
  smallViewportFontFamily: Typography['fontFamily']
  smallViewportFontWeight: Typography['fontWeightNormal']
  smallViewportBackground: string
  smallViewportBackgroundInverse: string
  smallViewportBottomBorder: string
  smallViewportBottomBorderInverse: string
  smallViewportHeight: string | 0
  smallViewportInlinePadding: string | 0
  smallViewportZIndex: Stacking['topmost']
  smallViewportTrayPosition: string
  smallViewportTrayFixTopPosition: string | undefined
  smallViewportTrayZIndex: Stacking['topmost']
  smallViewportDropdownMenuActiveOptionFontWeight: Typography['fontWeightBold']
  smallViewportDropdownMenuActiveOptionIndicatorSpacing: Spacing['xSmall']
  smallViewportDropdownMenuActiveOptionIndicatorWidth: Border['widthMedium']
  smallViewportDropdownMenuActiveOptionIndicatorColor: string
  smallViewportAlternativeTitleInlineMargin: Spacing['xSmall']
  smallViewportAlternativeTitleBlockMargin: Spacing['xSmall']
}

export type TopNavBarMenuItemsTheme = {
  desktopItemSpacing: string
  desktopMaxWidth: string
  desktopSubmenuActiveOptionFontWeight: Typography['fontWeightBold']
  desktopSubmenuActiveOptionIndicatorSpacing: Spacing['xSmall']
  desktopSubmenuActiveOptionIndicatorWidth: Border['widthMedium']
  desktopSubmenuActiveOptionIndicatorColor: string
}

export type TrayTheme = {
  background: string
  borderColor: string
  borderWidth: Border['widthSmall']
  borderStyle: Border['style']
  boxShadow: Shadows['depth3']
  xSmallWidth: Breakpoints['xSmall']
  smallWidth: string | 0
  regularWidth: Breakpoints['small']
  mediumWidth: Breakpoints['medium']
  largeWidth: Breakpoints['large']
  zIndex: Stacking['topmost']
  position: string
}

export type TreeBrowserButtonTheme = {
  hoverBackgroundColor: string
  hoverTextColor: string
  focusOutlineWidth: Border['widthMedium']
  focusOutlineColor: string
  focusOutlineStyle: Border['style']
  iconColor: string
  iconsMarginRight: Spacing['xSmall']
  descriptorMarginTop: Spacing['xxxSmall']
  descriptorTextColor: string
  descriptorFontSizeSmall: Typography['fontSizeXSmall']
  descriptorFontSizeMedium: Typography['fontSizeXSmall']
  descriptorFontSizeLarge: Typography['fontSizeSmall']
  nameTextColor: string
  nameFontSizeSmall: Typography['fontSizeXSmall']
  nameFontSizeMedium: Typography['fontSizeSmall']
  nameFontSizeLarge: Typography['fontSizeMedium']
  baseSpacingSmall: Spacing['xSmall']
  baseSpacingMedium: Spacing['small']
  baseSpacingLarge: string | 0
  borderWidth: Border['widthSmall']
  borderRadius: Border['radiusMedium']
  borderColor: string
  textLineHeight: Typography['lineHeightCondensed']
  selectedTextColor: string
  selectedBackgroundColor: string
  selectedOutlineWidth: Border['widthLarge']
}

export type TreeBrowserCollectionTheme = {
  fontFamily: Typography['fontFamily']
  baseSpacingSmall: Spacing['xSmall']
  baseSpacingMedium: Spacing['small']
  baseSpacingLarge: string | 0
  borderWidth: Border['widthSmall']
  borderColor: string
}

export type TreeBrowserTheme = {
  borderRadius: Border['radiusMedium']
  focusOutlineWidth: Border['widthMedium']
  focusOutlineColor: string
  focusOutlineStyle: Border['style']
}

export type TruncateTextTheme = {
  fontFamily: Typography['fontFamily']
  lineHeight: Typography['lineHeight']
}

export type ContextViewTheme = {
  arrowSize: string | 0
  arrowBorderWidth: Border['widthSmall']
  arrowBackgroundColor: string
  arrowBorderColor: string
  arrowBackgroundColorInverse: string
  arrowBorderColorInverse: string
}

export type ViewTheme = {
  fontFamily: Typography['fontFamily']
  color: string
  colorPrimaryInverse: string
  borderColorPrimary: string
  borderColorSecondary: string
  borderColorSuccess: string
  borderColorBrand: string
  borderColorInfo: string
  borderColorAlert: string
  borderColorWarning: string
  borderColorDanger: string
  borderColorTransparent: string
  debugOutlineColor: string
  backgroundPrimary: string
  backgroundSecondary: string
  backgroundPrimaryInverse: string
  backgroundBrand: string
  backgroundInfo: string
  backgroundAlert: string
  backgroundSuccess: string
  backgroundDanger: string
  backgroundWarning: string
  arrowSize: string | 0
  focusOutlineStyle: Border['style']
  focusOutlineWidth: Border['widthMedium']
  focusOutlineOffset: string | 0
  focusOutlineInset: string | 0
  focusColorInfo: string
  focusColorDanger: string
  focusColorSuccess: string
  focusColorInverse: string
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
  Avatar: AvatarTheme
  Alert: AlertTheme
  Badge: BadgeTheme
  Billboard: BillboardTheme
  Breadcrumb: BreadcrumbTheme
  BaseButton: BaseButtonTheme
  Button: BaseButtonTheme
  CloseButton: CloseButtonTheme
  CondensedButton: BaseButtonTheme
  IconButton: BaseButtonTheme
  Byline: BylineTheme
  CalendarDay: CalendarDayTheme
  'Calendar.Day': CalendarDayTheme
  Calendar: CalendarTheme
  CheckboxFacade: CheckboxFacadeTheme
  ToggleFacade: ToggleFacadeTheme
  CodeEditor: CodeEditorTheme
  ColorContrast: ColorContrastTheme
  ColorIndicator: ColorIndicatorTheme
  ColorMixerPalette: ColorMixerPaletteTheme
  'ColorMixer.Palette': ColorMixerPaletteTheme
  ColorMixerRGBAInput: ColorMixerRGBAInputTheme
  'ColorMixer.RGBAInput': ColorMixerRGBAInputTheme
  ColorMixerSlider: ColorMixerSliderTheme
  'ColorMixer.Slider': ColorMixerSliderTheme
  ColorPicker: ColorPickerTheme
  ColorPreset: ColorPresetTheme
  DrawerLayoutContent: DrawerLayoutContentTheme
  'DrawerLayout.Content': DrawerLayoutContentTheme
  DrawerLayoutTray: DrawerLayoutTrayTheme
  'DrawerLayout.Tray': DrawerLayoutTrayTheme
  Drilldown: DrilldownTheme
  FileDrop: FileDropTheme
  Flex: FlexTheme
  FormFieldGroup: FormFieldGroupTheme
  FormFieldLabel: FormFieldLabelTheme
  FormFieldMessage: FormFieldMessageTheme
  FormFieldMessages: FormFieldMessagesTheme
  Grid: GridTheme
  GridCol: GridTheme
  GridRow: GridTheme
  Heading: HeadingTheme
  Img: ImgTheme
  Link: LinkTheme
  InlineListItem: InlineListItemTheme
  'InlineList.Item': InlineListItemTheme
  ListItem: ListItemTheme
  'List.Item': ListItemTheme
  List: ListTheme
  MenuItem: MenuItemTheme
  'Menu.Item': MenuItemTheme
  MenuGroup: MenuGroupTheme
  'Menu.Group': MenuGroupTheme
  MenuSeparator: MenuSeparatorTheme
  'Menu.Separator': MenuSeparatorTheme
  Menu: MenuTheme
  Metric: MetricTheme
  MetricGroup: MetricGroupTheme
  ModalBody: ModalBodyTheme
  'Modal.Body': ModalBodyTheme
  ModalFooter: ModalFooterTheme
  'Modal.Footer': ModalFooterTheme
  ModalHeader: ModalHeaderTheme
  'Modal.Header': ModalHeaderTheme
  Modal: ModalTheme
  Transition: TransitionTheme
  AppNavItem: AppNavItemTheme
  'AppNav.Item': AppNavItemTheme
  AppNav: AppNavTheme
  NumberInput: NumberInputTheme
  OptionsItem: OptionsItemTheme
  'Options.Item': OptionsItemTheme
  OptionsSeparator: OptionsSeparatorTheme
  'Options.Separator': OptionsSeparatorTheme
  Options: OptionsTheme
  Mask: MaskTheme
  Pages: PagesTheme
  PaginationPageInput: PaginationPageInputTheme
  'Pagination.PageInput': PaginationPageInputTheme
  Position: PositionTheme
  Pill: PillTheme
  ProgressBar: ProgressBarTheme
  ProgressCircle: ProgressCircleTheme
  RangeInput: RangeInputTheme
  RadioInput: RadioInputTheme
  RatingIcon: RatingIconTheme
  'Rating.Icon': RatingIconTheme
  Select: SelectTheme
  SourceCodeEditor: SourceCodeEditorTheme
  Spinner: SpinnerTheme
  InlineSVG: InlineSVGTheme
  SVGIcon: SVGIconTheme
  TableBody: TableBodyTheme
  'Table.Body': TableBodyTheme
  TableCell: TableCellTheme
  'Table.Cell': TableCellTheme
  TableColHeader: TableColHeaderTheme
  'Table.ColHeader': TableColHeaderTheme
  TableHead: TableHeadTheme
  'Table.Head': TableHeadTheme
  TableRow: TableRowTheme
  'Table.Row': TableRowTheme
  TableRowHeader: TableRowHeaderTheme
  'Table.RowHeader': TableRowHeaderTheme
  TabsPanel: TabsPanelTheme
  'Tabs.Panel': TabsPanelTheme
  TabsTab: TabsTabTheme
  'Tabs.Tab': TabsTabTheme
  Table: TableTheme
  Tabs: TabsTheme
  Tag: TagTheme
  Text: TextTheme
  TextArea: TextAreaTheme
  TextInput: TextInputTheme
  ToggleDetails: ToggleDetailsTheme
  Tooltip: TooltipTheme
  TopNavBarBrand: TopNavBarBrandTheme
  'TopNavBar.Brand': TopNavBarBrandTheme
  TopNavBarItem: TopNavBarItemTheme
  'TopNavBar.Item': TopNavBarItemTheme
  TopNavBarLayout: TopNavBarLayoutTheme
  'TopNavBar.Layout': TopNavBarLayoutTheme
  TopNavBarDesktopLayout: TopNavBarLayoutDesktopTheme
  'TopNavBar.DesktopLayout': TopNavBarLayoutDesktopTheme
  TopNavBarSmallViewportLayout: TopNavBarLayoutSmallViewportTheme
  'TopNavBar.SmallViewportLayout': TopNavBarLayoutSmallViewportTheme
  TopNavBarMenuItems: TopNavBarMenuItemsTheme
  'TopNavBar.MenuItems': TopNavBarMenuItemsTheme
  Tray: TrayTheme
  TreeBrowserButton: TreeBrowserButtonTheme
  'TreeBrowser.Button': TreeBrowserButtonTheme
  TreeBrowserCollection: TreeBrowserCollectionTheme
  'TreeBrowser.Collection': TreeBrowserCollectionTheme
  TreeBrowser: TreeBrowserTheme
  TruncateText: TruncateTextTheme
  ContextView: ContextViewTheme
  View: ViewTheme
}
