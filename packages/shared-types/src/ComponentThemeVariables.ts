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

import { Colors } from './Colors'
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
  background: Colors['contrasts']['white1010']
  color: Colors['contrasts']['grey125125']
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
  iconColor: Colors['contrasts']['white1010']
  successBorderColor: Colors['contrasts']['green4570']
  successIconBackground: Colors['contrasts']['green4570']
  infoBorderColor: Colors['contrasts']['blue4570']
  infoIconBackground: Colors['contrasts']['blue4570']
  warningBorderColor: Colors['contrasts']['orange4570']
  warningIconBackground: Colors['contrasts']['orange4570']
  dangerBorderColor: Colors['contrasts']['red4570']
  dangerIconBackground: Colors['contrasts']['red4570']
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

  aiTopGradientColor: string
  aiBottomGradientColor: string
}

export type BadgeTheme = {
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightNormal']
  color: Colors['contrasts']['white1010']
  fontSize: Typography['fontSizeXSmall']
  colorDanger: Colors['contrasts']['red4570']
  colorSuccess: Colors['contrasts']['green4570']
  colorPrimary: Colors['contrasts']['blue4570']
  colorInverse: Colors['contrasts']['grey4570']
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
  iconColor: Colors['contrasts']['grey4570']
  mediumMargin: Spacing['small']
  largeMargin: Spacing['medium']
  iconHoverColor: Colors['contrasts']['blue4570']
  backgroundColor: Colors['contrasts']['white1010']
  iconHoverColorInverse: Colors['contrasts']['white1010']
  buttonBorderWidth: Border['widthMedium']
  buttonBorderRadius: Border['radiusLarge']
  messageColor: Colors['contrasts']['blue4570']
  messageColorClickable: Colors['contrasts']['blue4570']
  messageColorInverse: Colors['contrasts']['grey1111']
  messageFontSizeSmall: Typography['fontSizeSmall']
  messageFontSizeMedium: Typography['fontSizeMedium']
  messageFontSizeLarge: Typography['fontSizeLarge']
  clickableActiveBg: Colors['contrasts']['blue4570']
  clickableActiveText: Colors['contrasts']['white1010']
  buttonBorderStyle: Border['style']
  buttonHoverBorderStyle: string
}

export type BreadcrumbTheme = {
  fontFamily: Typography['fontFamily']
  separatorColor: Colors['contrasts']['grey4570']
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

  primaryColor: Colors['contrasts']['white1010']
  primaryBorderColor: Colors['contrasts']['blue5782']
  primaryBackground: Colors['contrasts']['blue4570']
  primaryHoverBackground: Colors['contrasts']['blue5782']
  primaryActiveBackground: Colors['contrasts']['blue5782']
  primaryActiveBoxShadow: string
  primaryGhostColor: Colors['contrasts']['blue4570']
  primaryGhostBorderColor: Colors['contrasts']['blue4570']
  primaryGhostBackground: string
  primaryGhostHoverBackground: Colors['contrasts']['blue1212']
  primaryGhostActiveBackground: string
  primaryGhostActiveBoxShadow: string
  primaryBoxShadow: string
  primaryGhostBoxShadow: string
  primaryHoverBoxShadow: string
  primaryGhostHoverBoxShadow: string

  secondaryColor: Colors['contrasts']['grey125125']
  secondaryBorderColor: Colors['contrasts']['grey1424']
  secondaryBackground: Colors['contrasts']['grey1111']
  secondaryHoverBackground: Colors['contrasts']['grey1214']
  secondaryActiveBackground: Colors['contrasts']['grey1214']
  secondaryActiveBoxShadow: string
  secondaryGhostColor: Colors['contrasts']['grey125125']
  secondaryGhostBorderColor: Colors['contrasts']['grey125125']
  secondaryGhostBackground: string
  secondaryGhostHoverBackground: Colors['contrasts']['grey1111']
  secondaryGhostActiveBackground: string
  secondaryGhostActiveBoxShadow: string
  secondaryBoxShadow: string
  secondaryGhostBoxShadow: string
  secondaryHoverBoxShadow: string
  secondaryGhostHoverBoxShadow: string

  successColor: Colors['contrasts']['white1010']
  successBorderColor: Colors['contrasts']['green5782']
  successBackground: Colors['contrasts']['green4570']
  successHoverBackground: Colors['contrasts']['green5782']
  successActiveBackground: Colors['contrasts']['green5782']
  successActiveBoxShadow: string
  successGhostColor: Colors['contrasts']['green4570']
  successGhostBorderColor: Colors['contrasts']['green4570']
  successGhostBackground: string
  successGhostHoverBackground: Colors['contrasts']['green1212']
  successGhostActiveBackground: string
  successGhostActiveBoxShadow: string
  successBoxShadow: string
  successGhostBoxShadow: string
  successHoverBoxShadow: string
  successGhostHoverBoxShadow: string

  dangerColor: Colors['contrasts']['white1010']
  dangerBorderColor: Colors['contrasts']['red5782']
  dangerBackground: Colors['contrasts']['red4570']
  dangerHoverBackground: Colors['contrasts']['red5782']
  dangerActiveBackground: Colors['contrasts']['red5782']
  dangerActiveBoxShadow: string
  dangerGhostColor: Colors['contrasts']['red4570']
  dangerGhostBorderColor: Colors['contrasts']['red4570']
  dangerGhostBackground: string
  dangerGhostHoverBackground: Colors['contrasts']['red1212']
  dangerGhostActiveBackground: string
  dangerGhostActiveBoxShadow: string
  dangerBoxShadow: string
  dangerGhostBoxShadow: string
  dangerHoverBoxShadow: string
  dangerGhostHoverBoxShadow: string

  primaryInverseColor: Colors['contrasts']['grey125125']
  primaryInverseBorderColor: Colors['contrasts']['grey1214']
  primaryInverseBackground: Colors['contrasts']['white1010']
  primaryInverseHoverBackground: Colors['contrasts']['grey1111']
  primaryInverseActiveBackground: Colors['contrasts']['white1010']
  primaryInverseActiveBoxShadow: string
  primaryInverseGhostColor: Colors['contrasts']['white1010']
  primaryInverseGhostBorderColor: Colors['contrasts']['white1010']
  primaryInverseGhostBackground: string
  primaryInverseGhostHoverBackground: Colors['contrasts']['grey1111']
  primaryInverseGhostActiveBackground: string
  primaryInverseGhostActiveBoxShadow: string
  primaryInverseBoxShadow: string
  primaryInverseGhostBoxShadow: string
  primaryInverseHoverBoxShadow: string
  primaryInverseGhostHoverBoxShadow: string
}

export type CloseButtonTheme = {
  offsetMedium: Spacing['medium']
  offsetSmall: Spacing['small']
  offsetXSmall: Spacing['xSmall']
  zIndex: Stacking['above']
}

export type BylineTheme = {
  fontFamily: Typography['fontFamily']
  background: Colors['contrasts']['white1010']
  color: Colors['contrasts']['grey125125']
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
  color: Colors['contrasts']['grey125125']
  background: Colors['contrasts']['white1010']
  fontSize: Typography['fontSizeMedium']
  padding: Spacing['xxSmall']
  height: Forms['inputHeightSmall']
  minWidth: Forms['inputHeightSmall']
  outsideMonthColor: Colors['contrasts']['grey4570']
  selectedBackground: Colors['contrasts']['green4570']
  selectedColor: Colors['contrasts']['white1010']
  selectedBorderRadius: Border['radiusMedium']
  todayBackground: Colors['contrasts']['blue4570']
  todayColor: Colors['contrasts']['white1010']
  todayBorderRadius: Forms['inputHeightSmall']
}

export type CalendarTheme = {
  fontSize: Typography['fontSizeMedium']
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightNormal']
  color: Colors['contrasts']['grey125125']
  background: Colors['contrasts']['white1010']
  navMargin: Spacing['small']
  navWithYearMargin: Spacing['xSmall']
  yearPickerMargin: Spacing['mediumSmall']
  maxHeaderWidth: Spacing['medium']
}

export type CheckboxFacadeTheme = {
  color: Colors['contrasts']['white1010']
  borderWidth: Border['widthSmall']
  borderColor: Colors['contrasts']['grey1214']
  borderRadius: Border['radiusMedium']
  background: Colors['contrasts']['white1010']
  marginRight: Spacing['xSmall']
  padding: Spacing['xxxSmall']
  checkedBackground: Colors['contrasts']['grey125125']
  checkedBorderColor: Colors['contrasts']['grey125125']
  hoverBorderColor: Colors['contrasts']['grey125125']
  focusBorderColor: Colors['contrasts']['blue4570']
  focusBorderWidth: Border['widthMedium']
  focusBorderStyle: Border['style']
  labelColor: Colors['contrasts']['grey125125']
  checkedLabelColor: Colors['contrasts']['grey125125']
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
  errorBorderColor: Colors['contrasts']['red4570']
}

export type ToggleFacadeTheme = {
  color: Colors['contrasts']['white1010']
  background: Colors['contrasts']['grey1111']
  borderColor: Colors['contrasts']['grey1214']
  borderWidth: Border['widthMedium']
  borderRadius: string
  marginEnd: Spacing['small']
  marginStart: Spacing['small']
  marginVertical: Spacing['xSmall']
  checkedBackground: Colors['contrasts']['green4570']
  uncheckedIconColor: Colors['contrasts']['grey125125']
  checkedIconColor: Colors['contrasts']['green4570']
  focusOutlineColor: Colors['contrasts']['blue4570']
  focusBorderWidth: Border['widthMedium']
  focusBorderStyle: Border['style']
  toggleBackground: Colors['contrasts']['white1010']
  toggleShadow: Shadows['depth1']
  toggleSize: Forms['inputHeightSmall']
  labelColor: Colors['contrasts']['grey125125']
  labelFontFamily: Typography['fontFamily']
  labelFontWeight: Typography['fontWeightNormal']
  labelLineHeight: Typography['lineHeightCondensed']
  labelFontSizeSmall: Typography['fontSizeSmall']
  labelFontSizeMedium: Typography['fontSizeMedium']
  labelFontSizeLarge: Typography['fontSizeLarge']
  errorBorderColor: Colors['contrasts']['red4570']
  uncheckedIconBorderColor: Colors['contrasts']['grey3045']
  checkedIconBorderColor: Colors['contrasts']['green5782']
}

export type CodeEditorTheme = {
  fontFamily: Typography['fontFamilyMonospace']
  fontSize: Typography['fontSizeSmall']
  background: Colors['contrasts']['grey1111']
  border: string | 0
  borderRadius: Border['radiusMedium']
  focusBorderColor: Colors['contrasts']['blue4570']
  focusBoxShadow: string
  horizontalPadding: Spacing['xSmall']
  verticalPadding: Spacing['xxSmall']
  color: Colors['contrasts']['grey125125']
  lineNumberColor: Colors['contrasts']['grey4570']
  gutterBorder: Colors['contrasts']['grey1111']
  gutterBackground: Colors['contrasts']['grey1214']
  gutterMarkerColor: Colors['contrasts']['blue4570']
  gutterMarkerSubtleColor: Colors['contrasts']['grey4570']
  cursorColor: Colors['contrasts']['grey125125']
  secondaryCursorColor: Colors['contrasts']['grey4570']
  rulerColor: Colors['contrasts']['grey4570']
  matchingBracketOutline: Colors['contrasts']['grey4570']
  nonMatchingBracketColor: Colors['contrasts']['red4570']
  matchingTagBackground: string
  activeLineBackground: Colors['contrasts']['grey1214']
  selectedBackground: Colors['contrasts']['grey1424']
  fatCursorBackground: Colors['contrasts']['green4570']
  fatCursorMarkBackground: string
  searchingBackground: string
  zIndex: Stacking['above']
  quoteColor: Colors['contrasts']['green4570']
  headerColor: Colors['contrasts']['orange4570']
  negativeColor: Colors['contrasts']['red4570']
  positiveColor: Colors['contrasts']['green4570']
  keywordColor: Colors['contrasts']['blue4570']
  atomColor: Colors['contrasts']['orange4570']
  numberColor: Colors['contrasts']['orange4570']
  defColor: Colors['contrasts']['grey125125']
  variableColor: Colors['contrasts']['blue4570']
  secondaryVariableColor: Colors['contrasts']['orange4570']
  typeColor: Colors['contrasts']['blue4570']
  commentColor: Colors['contrasts']['grey4570']
  stringColor: Colors['contrasts']['blue4570']
  secondaryStringColor: Colors['contrasts']['red4570']
  metaColor: Colors['contrasts']['grey125125']
  qualifierColor: Colors['contrasts']['green4570']
  builtInColor: Colors['contrasts']['orange4570']
  bracketColor: Colors['contrasts']['grey4570']
  tagColor: Colors['contrasts']['green4570']
  attributeColor: Colors['contrasts']['blue4570']
  hrColor: Colors['contrasts']['grey4570']
  linkColor: Colors['contrasts']['blue4570']
  errorColor: Colors['contrasts']['red4570']
  propertyColor: Colors['contrasts']['blue5782']
  nodeColor: Colors['contrasts']['orange4570']
  operatorColor: Colors['contrasts']['grey125125']
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

  successColor: Colors['contrasts']['green4570']
  failureColor: Colors['contrasts']['red4570']
  pickedHexColor: Colors['contrasts']['grey4570']
}

export type ColorIndicatorTheme = {
  borderWidth: Border['widthSmall']
  backgroundImage: string
  backgroundSize: string
  backgroundPosition: string
  circleIndicatorSize: string
  rectangleIndicatorSize: string
  colorIndicatorBorderColor: Colors['contrasts']['grey1424']
  rectangularIndicatorBorderRadius: Spacing['xxSmall']
  rectangularIndicatorBorderWidth: Border['widthSmall']
}

export type ColorMixerPaletteTheme = {
  indicatorBorderColor: Colors['contrasts']['grey125125']
  whiteColor: Colors['contrasts']['white1010']
  colorIndicatorBorderColor: Colors['contrasts']['grey1424']

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
  indicatorBorderColor: Colors['contrasts']['grey125125']

  checkerboardBackgroundImage: string
  checkerboardBackgroundSize: string
  checkerboardBackgroundPosition: string
  colorIndicatorBorderColor: Colors['contrasts']['grey1424']

  indicatorBorderWidth: Border['widthSmall']
  sliderBorderWidth: Border['widthSmall']
  indicatorZIndex: Stacking['above']
  disabledOverlayZIndex: Stacking['topmost']
}

export type ColorPickerTheme = {
  hashMarkColor: Colors['contrasts']['grey4570']
  warningIconColor: Colors['contrasts']['orange4570']
  errorIconColor: Colors['contrasts']['red4570']
  successIconColor: Colors['contrasts']['green4570']
  popoverSeparatorColor: Colors['contrasts']['grey1214']
  popoverFooterColor: Colors['contrasts']['grey1111']
  checkerboardBackgroundColor: Colors['contrasts']['white1010']
  checkerboardBackgroundImage: string
  checkerboardBackgroundSize: string
  checkerboardBackgroundPosition: string
  colorIndicatorBorderColor: Colors['contrasts']['grey1424']
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
  spacing: any
}

export type ColorPresetTheme = {
  xxSmallSpacing: Spacing['xxSmall']
  smallSpacing: Spacing['small']
  selectedIndicatorBackgroundColor: Colors['contrasts']['white1010']
  selectedIndicatorBorderColor: Colors['contrasts']['grey125125']
  popoverDividerColor: Colors['contrasts']['grey1214']
  smallBorder: Border['widthSmall']
  popoverFooterColor: Colors['contrasts']['grey1111']
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
  background: Colors['contrasts']['white1010']
  borderColor: Colors['contrasts']['grey1424']
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
  headerActionColor: Colors['contrasts']['blue4570']
  labelInfoPadding: Spacing['small']
  labelInfoColor: Colors['contrasts']['grey5782']
  borderColor: Colors['contrasts']['grey3045']
}

export type FileDropTheme = {
  backgroundColor: Colors['contrasts']['white1010']
  borderRadius: Border['radiusLarge']
  borderWidth: Border['widthMedium']
  borderStyle: string
  borderColor: Colors['contrasts']['grey1424']
  hoverBorderColor: Colors['contrasts']['blue4570']
  acceptedColor: Colors['contrasts']['blue4570']
  rejectedColor: Colors['contrasts']['red4570']
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
  errorBorderColor: Colors['contrasts']['red4570']
  errorFieldsPadding: Spacing['xSmall']
}

export type FormFieldLayoutTheme = {
  color: Colors['contrasts']['grey125125']
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightBold']
  fontSize: Typography['fontSizeMedium']
  lineHeight: Typography['lineHeightFit']
  inlinePadding: Spacing['xxSmall']
  stackedOrInlineBreakpoint: Breakpoints['medium']
  spacing: any // TODO remove any
}

export type FormFieldLabelTheme = {
  color: Colors['contrasts']['grey125125']
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightBold']
  fontSize: Typography['fontSizeMedium']
  lineHeight: Typography['lineHeightFit']
}

export type FormFieldMessageTheme = {
  colorHint: Colors['contrasts']['grey125125']
  colorError: Colors['contrasts']['red4570']
  colorSuccess: Colors['contrasts']['green4570']
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightNormal']
  fontSize: Typography['fontSizeSmall']
  lineHeight: Typography['lineHeight']
  errorIconMarginRight: Spacing['xxSmall']
}

export type FormFieldMessagesTheme = {
  topMargin: Spacing['xxSmall']
}

export type GridTheme = {
  spacingSmall: Spacing['small']
  spacingMedium: Spacing['medium']
  spacingLarge: Spacing['large']
} & Media

export type HeadingTheme = Typography & {
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
  primaryInverseColor: Colors['contrasts']['white1010']
  primaryColor: Colors['contrasts']['grey125125']
  secondaryColor: Colors['contrasts']['grey4570']
  secondaryInverseColor: Colors['contrasts']['grey1111']
  borderPadding: Spacing['xxxSmall']
  borderColor: Colors['contrasts']['grey1424']
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
  fontSize: string | 0
  fontSizeSmall: string | 0
  lineHeight: number
  color: Colors['contrasts']['blue4570']
  textDecorationWithinText: string
  hoverTextDecorationWithinText: string
  textDecorationOutsideText: string
  hoverTextDecorationOutsideText: string
  focusOutlineWidth: Border['widthMedium']
  focusOutlineColor: Colors['contrasts']['blue4570']
  focusOutlineStyle: Border['style']
  focusOutlineBorderRadius: Border['radiusSmall']
  hoverColor: string
  colorInverse: Colors['contrasts']['grey1111']
  focusInverseOutlineColor: Colors['contrasts']['white1010']
  focusInverseIconOutlineColor: Colors['contrasts']['white1010']
  iconSize: string
  iconPlusTextMargin: string | 0
  iconPlusTextMarginSmall: string | 0
  textUnderlineOffset: string
}

export type InlineListItemTheme = {
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightNormal']
  fontSizeSmall: Typography['fontSizeSmall']
  fontSizeMedium: Typography['fontSizeMedium']
  fontSizeLarge: Typography['fontSizeLarge']
  color: Colors['contrasts']['grey4570']
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
  color: Colors['contrasts']['grey125125']
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
  labelColor: Colors['contrasts']['grey125125']
  background: Colors['contrasts']['white1010']
  iconColor: Colors['contrasts']['grey125125']
  iconPadding: Spacing['small']
  activeBackground: Colors['contrasts']['blue4570']
  activeLabelColor: Colors['contrasts']['white1010']
  activeIconColor: Colors['contrasts']['white1010']
  labelInfoColor: Colors['contrasts']['grey5782']
}

export type MenuGroupTheme = {
  fontSize: Typography['fontSizeMedium']
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightBold']
  padding: string | 0
  color: Colors['contrasts']['grey125125']
  background: Colors['contrasts']['white1010']
}

export type MenuSeparatorTheme = {
  background: Colors['contrasts']['grey1214']
  height: Border['widthSmall']
  margin: string | 0
}

export type MenuTheme = {
  minWidth: Breakpoints['xxSmall']
  maxWidth: Breakpoints['xSmall']
  background: Colors['contrasts']['white1010']
  borderRadius: Border['radiusMedium']
  focusBorderStyle: Border['style']
  focusBorderWidth: Border['widthMedium']
  focusBorderColor: Colors['contrasts']['blue4570']
  focusBorderRadius: Border['radiusMedium']
}

export type MetricTheme = {
  padding: string | 0
  fontFamily: Typography['fontFamily']
  valueColor: Colors['contrasts']['grey125125']
  valueFontSize: Typography['fontSizeXLarge']
  valueFontWeight: Typography['fontWeightBold']
  labelColor: Colors['contrasts']['grey125125']
  labelFontSize: Typography['fontSizeXSmall']
}

export type MetricGroupTheme = {
  lineHeight: Typography['lineHeightCondensed']
}

export type ModalBodyTheme = {
  inverseBackground: string
}

export type ModalFooterTheme = {
  background: Colors['contrasts']['grey1111']
  borderColor: Colors['contrasts']['grey1424']
  borderWidth: Border['widthSmall']
  borderRadius: Border['radiusMedium']
  padding: Spacing['small']
  inverseBackground: Colors['contrasts']['grey100100']
  inverseBorderColor: Colors['contrasts']['grey100100']
}

export type ModalHeaderTheme = {
  background: Colors['contrasts']['white1010']
  borderColor: Colors['contrasts']['grey1424']
  padding: Spacing['medium']
  paddingCompact: Spacing['small']
  inverseBackground: Colors['contrasts']['grey125125']
  inverseBorderColor: Colors['contrasts']['grey125125']
}

export type ModalTheme = {
  fontFamily: Typography['fontFamily']
  textColor: Colors['contrasts']['grey125125']
  background: Colors['contrasts']['white1010']
  borderColor: Colors['contrasts']['grey125125']
  borderRadius: Border['radiusMedium']
  inverseBackground: Colors['contrasts']['grey100100']
  inverseTextColor: Colors['contrasts']['white1010']
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
  textColor: Colors['contrasts']['blue4570']
  textColorSelected: Colors['contrasts']['grey125125']
  height: string | 0
  padding: Spacing['small']
  backgroundColor: Colors['contrasts']['white1010']
}

export type AppNavTheme = {
  fontFamily: Typography['fontFamily']
  height: string | 0
  borderColor: Colors['contrasts']['grey1424']
  borderStyle: Border['style']
  borderWidth: Border['widthSmall']
  horizontalMargin: Spacing['xxSmall']
  menuTriggerWidth: string | 0
}

export type SideNavBarTheme = {
  fontColor: Colors['contrasts']['white1010']
  backgroundColor: Colors['contrasts']['grey100100']
  width: string
  minimizedWidth: string
  fill: Colors['contrasts']['white1010']
  focusOutlineInnerWidth: Border['widthMedium']
  focusOutlineOuterWidth: Border['widthSmall']
  focusOutlineInnerColor: Colors['contrasts']['blue4570']
  focusOutlineOuterColor: Colors['contrasts']['white1010']
  marginBottom: Spacing['small']
  toggleTransition: Transitions['duration']
}

export type SideNavBarItemTheme = {
  fontSize: Typography['fontSizeSmall']
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightNormal']
  fontColor: Colors['contrasts']['white1010']
  iconSize: string | 0
  iconColor: Colors['contrasts']['white1010']
  lineHeight: Typography['lineHeight']
  backgroundColor: string
  linkTextDecoration: string
  hoverBackgroundColor: string
  outerFocusOutline: string
  innerFocusOutline: string
  selectedFontColor: Colors['contrasts']['blue4570']
  selectedIconColor: Colors['contrasts']['blue4570']
  selectedBackgroundColor: Colors['contrasts']['white1010']
  selectedOuterFocusOutline: string
  selectedInnerFocusOutline: string
  contentPadding: Spacing['xxSmall']
}

export type NumberInputTheme = {
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightNormal']
  borderWidth: Border['widthSmall']
  borderStyle: Border['style']
  borderColor: Colors['contrasts']['grey3045']
  borderRadius: Border['radiusMedium']
  color: Colors['contrasts']['grey125125']
  background: Colors['contrasts']['white1010']
  padding: string | 0
  arrowsContainerWidth: string | 0
  arrowsColor: Colors['contrasts']['grey125125']
  arrowsBackgroundColor: Colors['contrasts']['grey1111']
  arrowsHoverBackgroundColor: Colors['contrasts']['grey1214']
  arrowsBorderColor: Colors['contrasts']['grey3045']
  arrowsActiveBoxShadow: string
  focusOutlineWidth: Border['widthMedium']
  focusOutlineStyle: Border['style']
  focusOutlineColor: Colors['contrasts']['blue4570']
  errorBorderColor: Colors['contrasts']['red4570']
  errorOutlineColor: Colors['contrasts']['red4570']
  placeholderColor: Colors['contrasts']['grey4570']
  mediumFontSize: Typography['fontSizeMedium']
  mediumHeight: Forms['inputHeightMedium']
  largeFontSize: Typography['fontSizeLarge']
  largeHeight: Forms['inputHeightLarge']
  requiredInvalidColor: Colors['contrasts']['red5782']
}

export type OptionsItemTheme = {
  fontSize: Typography['fontSizeMedium']
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightNormal']
  lineHeight: Typography['lineHeightCondensed']
  color: Colors['contrasts']['grey125125']
  background: Colors['contrasts']['white1010']
  highlightedLabelColor: Colors['contrasts']['white1010']
  highlightedBackground: Colors['contrasts']['blue4570']
  selectedLabelColor: Colors['contrasts']['white1010']
  selectedBackground: Colors['contrasts']['grey4570']
  padding: string | 0
  iconPadding: Spacing['small']
  nestedPadding: Spacing['medium']
  beforeLabelContentVOffset: string | 0
  afterLabelContentVOffset: string | 0
  descriptionFontSize: Typography['fontSizeSmall']
  descriptionFontWeight: Typography['fontWeightNormal']
  descriptionLineHeight: Typography['lineHeight']
  descriptionPaddingStart: string | 0
  descriptionColor: Colors['contrasts']['grey4570']
  fontWeightSelected: Typography['fontWeightNormal']
}

export type OptionsSeparatorTheme = {
  background: Colors['contrasts']['grey1214']
  height: Border['widthSmall']
  margin: string | 0
}

export type OptionsTheme = {
  labelFontWeight: Typography['fontWeightBold']
  background: Colors['contrasts']['white1010']
  labelColor: Colors['contrasts']['grey125125']
  labelPadding: string | 0
  nestedLabelPadding: string | 0
}

export type MaskTheme = {
  zIndex: Stacking['topmost']
  background: string
  borderColor: string
  focusBorderColor: Colors['contrasts']['blue4570']
  borderRadius: Border['radiusMedium']
  borderWidth: Border['widthSmall']
}

export type PagesTheme = {
  fontSize: Typography['fontSizeMedium']
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightNormal']
  color: Colors['contrasts']['grey125125']
  background: Colors['contrasts']['white1010']
}

export type PaginationPageInputTheme = {
  inputSpacing: Spacing['xSmall']
  inputWidth: string
  labelColor: Colors['contrasts']['grey125125']
}

export type PaginationTheme = {
  pageIndicatorGap: Spacing['xSmall']
}

export type PillTheme = {
  fontFamily: Typography['fontFamily']
  padding: string | 0
  height: string | 0
  background: Colors['contrasts']['white1010']
  textFontSize: Typography['fontSizeSmall']
  statusLabelFontWeight: Typography['fontWeightBold']
  textFontWeight: Typography['fontWeightNormal']
  maxWidth: string | 0
  primaryColor: Colors['contrasts']['grey4570']
  infoColor: Colors['contrasts']['blue4570']
  dangerColor: Colors['contrasts']['red4570']
  successColor: Colors['contrasts']['green4570']
  warningColor: Colors['contrasts']['orange4570']
  alertColor: Colors['contrasts']['blue4570']
  borderWidth: Border['widthSmall']
  borderStyle: Border['style']
  borderRadius: string | 0
}

export type PopoverTheme = {
  borderColor: Colors['contrasts']['grey3045']
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
  meterColorBrand: Colors['contrasts']['blue4570']
  meterColorBrandInverse: Colors['contrasts']['blue4570']
  meterColorInfo: Colors['contrasts']['blue4570']
  meterColorInfoInverse: Colors['contrasts']['blue4570']
  meterColorSuccess: Colors['contrasts']['green4570']
  meterColorSuccessInverse: Colors['contrasts']['green4570']
  meterColorDanger: Colors['contrasts']['red4570']
  meterColorDangerInverse: Colors['contrasts']['red4570']
  meterColorAlert: Colors['contrasts']['blue4570']
  meterColorAlertInverse: Colors['contrasts']['blue4570']
  meterColorWarning: Colors['contrasts']['orange4570']
  meterColorWarningInverse: Colors['contrasts']['orange4570']
  meterBorderWidthInverse: Border['widthSmall']
  meterBorderColorInverse: 'transparent'
  trackColor: Colors['contrasts']['white1010']
  trackColorInverse: string
  trackBottomBorderWidth: Border['widthSmall']
  trackBottomBorderColor: Colors['contrasts']['grey1214']
  trackBottomBorderColorInverse: Colors['contrasts']['white1010']
  borderRadius: string
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
  color: Colors['contrasts']['grey125125']
  colorInverse: Colors['contrasts']['white1010']
  trackColor: Colors['contrasts']['white1010']
  trackColorInverse: string
  trackBorderColor: Colors['contrasts']['grey125125']
  trackBorderColorInverse: Colors['contrasts']['white1010']
  meterColorBrand: Colors['contrasts']['blue4570']
  meterColorBrandInverse: Colors['contrasts']['blue4570']
  meterColorInfo: Colors['contrasts']['blue4570']
  meterColorInfoInverse: Colors['contrasts']['blue4570']
  meterColorSuccess: Colors['contrasts']['green4570']
  meterColorSuccessInverse: Colors['contrasts']['green4570']
  meterColorDanger: Colors['contrasts']['red4570']
  meterColorDangerInverse: Colors['contrasts']['red4570']
  meterColorAlert: Colors['contrasts']['blue4570']
  meterColorAlertInverse: Colors['contrasts']['blue4570']
  meterColorWarning: Colors['contrasts']['orange4570']
  meterColorWarningInverse: Colors['contrasts']['orange4570']
}

export type RadioInputTheme = {
  labelColor: Colors['contrasts']['grey125125']
  labelFontFamily: Typography['fontFamily']
  labelFontWeight: Typography['fontWeightNormal']
  labelLineHeight: Typography['lineHeightCondensed']
  background: Colors['contrasts']['white1010']
  borderWidth: Border['widthSmall']
  borderColor: Colors['contrasts']['grey1214']
  hoverBorderColor: Colors['contrasts']['grey125125']
  controlSize: string | 0
  focusBorderColor: Colors['contrasts']['blue4570']
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
  toggleBackgroundSuccess: Colors['contrasts']['green4570']
  toggleBackgroundOff: Colors['contrasts']['green4570']
  toggleBackgroundDanger: Colors['contrasts']['orange4570']
  toggleBackgroundWarning: Colors['contrasts']['orange4570']
  toggleHandleText: Colors['contrasts']['white1010']
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
  handleBackground: Colors['contrasts']['blue4570']
  handleBorderColor: Colors['contrasts']['white1010']
  handleBorderSize: Border['widthMedium']
  handleShadow: string | 0
  handleFocusInset: Border['widthSmall']
  handleFocusRingSize: Border['widthMedium']
  handleFocusRingColor: Colors['contrasts']['white1010']
  handleShadowColor: string
  handleHoverBackground: Colors['contrasts']['blue4570']
  handleFocusBackground: Colors['contrasts']['blue4570']
  handleFocusOutlineColor: string
  handleFocusOutlineWidth: string | 0
  trackBackground: string
  valueColor: Colors['contrasts']['white1010']
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
  iconEmptyColor: Colors['contrasts']['blue4570']
  iconFilledColor: Colors['contrasts']['blue4570']
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
  color: Colors['contrasts']['grey125125']
  background: Colors['contrasts']['white1010']
  popoverBorderWidth: Border['widthSmall']
}

export type SourceCodeEditorTheme = {
  fontFamily: Typography['fontFamilyMonospace']
  fontSize: Typography['fontSizeSmall']
  color: Colors['contrasts']['grey125125']
  background: Colors['contrasts']['white1010']
  gutterBackground: Colors['contrasts']['grey1111']
  borderWidth: Border['widthSmall']
  borderColor: Colors['contrasts']['grey1214']
  borderRadius: Border['radiusMedium']
  focusBorderColor: Colors['contrasts']['blue4570']
  horizontalPadding: Spacing['xSmall']
  verticalPadding: Spacing['xxSmall']
}

export type SpinnerTheme = {
  trackColor: Colors['contrasts']['grey1111']
  color: Colors['contrasts']['blue4570']
  xSmallSize: string | 0
  xSmallBorderWidth: string | 0
  smallSize: string | 0
  smallBorderWidth: string | 0
  mediumSize: string | 0
  mediumBorderWidth: string | 0
  largeSize: string | 0
  largeBorderWidth: string | 0
  inverseColor: Colors['contrasts']['blue4570']
}

export type InlineSVGTheme = {
  primaryInverseColor: Colors['contrasts']['white1010']
  primaryColor: Colors['contrasts']['grey125125']
  secondaryColor: Colors['contrasts']['grey4570']
  secondaryInverseColor: Colors['contrasts']['grey1111']
  warningColor: Colors['contrasts']['orange4570']
  brandColor: Colors['contrasts']['blue4570']
  errorColor: Colors['contrasts']['red4570']
  alertColor: Colors['contrasts']['blue4570']
  successColor: Colors['contrasts']['green4570']
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
  color: Colors['contrasts']['grey125125']
  background: Colors['contrasts']['white1010']
}

export type TableCellTheme = {
  fontSize: Typography['fontSizeMedium']
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightNormal']
  color: Colors['contrasts']['grey125125']
  background: Colors['contrasts']['white1010']
  borderColor: Colors['contrasts']['grey3045']
  lineHeight: Typography['lineHeightCondensed']
  padding: string | 0
}

export type TableColHeaderTheme = {
  fontSize: Typography['fontSizeMedium']
  fontFamily: Typography['fontFamily']
  color: Colors['contrasts']['grey125125']
  background: Colors['contrasts']['white1010']
  borderColor: Colors['contrasts']['grey1214']
  lineHeight: Typography['lineHeightCondensed']
  padding: string | 0
  focusOutlineColor: Colors['contrasts']['blue4570']
  focusOutlineWidth: Border['widthMedium']
  focusOutlineStyle: Border['style']
  unSortedIconColor: Colors['contrasts']['grey4570']
  sortedIconColor: Colors['contrasts']['blue4570']
}

export type TableHeadTheme = {
  fontSize: Typography['fontSizeMedium']
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightNormal']
  color: Colors['contrasts']['grey125125']
  background: Colors['contrasts']['white1010']
}

export type TableRowTheme = {
  fontSize: Typography['fontSizeMedium']
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightNormal']
  color: Colors['contrasts']['grey125125']
  background: Colors['contrasts']['white1010']
  borderColor: Colors['contrasts']['grey1214']
  hoverBorderColor: Colors['contrasts']['blue4570']
  padding: string | 0
}

export type TableRowHeaderTheme = {
  fontSize: Typography['fontSizeMedium']
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightNormal']
  color: Colors['contrasts']['grey125125']
  background: Colors['contrasts']['white1010']
  borderColor: Colors['contrasts']['grey4570']
  lineHeight: Typography['lineHeightCondensed']
  padding: string | 0
}

export type TableTheme = {
  fontSize: Typography['fontSizeMedium']
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightNormal']
  color: Colors['contrasts']['grey125125']
  background: Colors['contrasts']['white1010']
}

export type TabsPanelTheme = {
  fontSize: Typography['fontSizeMedium']
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightNormal']
  lineHeight: Typography['lineHeight']
  color: Colors['contrasts']['grey125125']
  background: Colors['contrasts']['white1010']
  borderColor: Colors['contrasts']['grey1424']
  borderWidth: Border['widthSmall']
  borderStyle: Border['style']
  defaultOverflowY: string
}

export type TabsTabTheme = {
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightNormal']
  lineHeight: Typography['lineHeightCondensed']
  fontSize: Typography['fontSizeMedium']
  defaultColor: Colors['contrasts']['grey125125']
  defaultHoverBorderColor: Colors['contrasts']['grey1214']
  defaultSelectedBorderColor: Colors['contrasts']['blue4570']
  secondaryColor: Colors['contrasts']['grey125125']
  secondarySelectedBackground: Colors['contrasts']['white1010']
  secondarySelectedBorderColor: Colors['contrasts']['grey1214']
  zIndex: Stacking['above']
}

export type TabsTheme = {
  defaultBackground: Colors['contrasts']['white1010']
  scrollFadeColor: Colors['contrasts']['white1010']
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
  focusOutlineColor: Colors['contrasts']['blue4570']
  focusOutlineWidth: Border['widthMedium']
  focusOutlineStyle: Border['style']
  maxWidth: string | 0
  iconMargin: Spacing['small']
  transitionTiming: string
  defaultBackgroundHover: Colors['contrasts']['grey1214']
  defaultBackground: Colors['contrasts']['grey1111']
  defaultBorderColor: Colors['contrasts']['grey1424']
  defaultBorderRadius: string
  defaultBorderStyle: string
  defaultBorderWidth: string | 0
  defaultColor: Colors['contrasts']['grey125125']
  defaultIconColor: Colors['contrasts']['grey125125']
  defaultIconHoverColor: Colors['contrasts']['blue4570']
  inlineBackgroundHover: Colors['contrasts']['grey1111']
  inlineBackground: Colors['contrasts']['white1010']
  inlineBorderColor: Colors['contrasts']['grey4570']
  inlineBorderRadius: string | 0
  inlineBorderStyle: string
  inlineBorderWidth: string | 0
  inlineColor: Colors['contrasts']['grey125125']
  inlineIconColor: Colors['contrasts']['grey4570']
  inlineIconHoverColor: Colors['contrasts']['blue4570']
}

export type TextTheme = Typography & {
  primaryInverseColor: Colors['contrasts']['white1010']
  primaryColor: Colors['contrasts']['grey125125']
  secondaryColor: Colors['contrasts']['grey4570']
  secondaryInverseColor: Colors['contrasts']['grey1111']
  brandColor: Colors['contrasts']['blue4570']
  dangerColor: Colors['contrasts']['red4570']
  successColor: Colors['contrasts']['green4570']
  alertColor: Colors['contrasts']['blue4570']
  warningColor: Colors['contrasts']['orange5782']
  paragraphMargin: string | 0
}

export type TextAreaTheme = {
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightNormal']
  color: Colors['contrasts']['grey125125']
  background: Colors['contrasts']['white1010']
  borderWidth: Border['widthSmall']
  borderStyle: Border['style']
  borderTopColor: Colors['contrasts']['grey1214']
  borderRightColor: Colors['contrasts']['grey1214']
  borderBottomColor: Colors['contrasts']['grey1214']
  borderLeftColor: Colors['contrasts']['grey1214']
  borderRadius: Border['radiusMedium']
  padding: Spacing['small']
  focusOutlineColor: Colors['contrasts']['blue4570']
  focusOutlineWidth: Border['widthMedium']
  focusOutlineStyle: Border['style']
  errorBorderColor: Colors['contrasts']['red4570']
  errorOutlineColor: Colors['contrasts']['red4570']
  placeholderColor: Colors['contrasts']['grey4570']
  smallFontSize: Typography['fontSizeSmall']
  smallHeight: Forms['inputHeightSmall']
  mediumFontSize: Typography['fontSizeMedium']
  mediumHeight: Forms['inputHeightMedium']
  largeFontSize: Typography['fontSizeLarge']
  largeHeight: Forms['inputHeightLarge']
  requiredInvalidColor: Colors['contrasts']['red5782']
}

export type TextInputTheme = {
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightNormal']
  borderWidth: Border['widthSmall']
  borderStyle: Border['style']
  borderColor: Colors['contrasts']['grey1214']
  borderRadius: Border['radiusMedium']
  color: Colors['contrasts']['grey125125']
  background: Colors['contrasts']['white1010']
  padding: Spacing['small']
  focusOutlineWidth: Border['widthMedium']
  focusOutlineStyle: Border['style']
  focusOutlineColor: Colors['contrasts']['blue4570']
  errorBorderColor: Colors['contrasts']['red4570']
  errorOutlineColor: Colors['contrasts']['red4570']
  placeholderColor: Colors['contrasts']['grey4570']
  smallFontSize: Typography['fontSizeSmall']
  smallHeight: Forms['inputHeightSmall']
  mediumFontSize: Typography['fontSizeMedium']
  mediumHeight: Forms['inputHeightMedium']
  largeFontSize: Typography['fontSizeLarge']
  largeHeight: Forms['inputHeightLarge']
  requiredInvalidColor: Colors['contrasts']['red5782']
}

export type ToggleDetailsTheme = {
  fontFamily: Typography['fontFamily']
  fontWeight: Typography['fontWeightNormal']
  lineHeight: Typography['lineHeight']
  textColor: Colors['contrasts']['grey125125']
  fontSizeSmall: Typography['fontSizeSmall']
  fontSizeMedium: Typography['fontSizeMedium']
  fontSizeLarge: Typography['fontSizeLarge']
  smallIconSize: string | 0
  mediumIconSize: string | 0
  largeIconSize: string | 0
  iconMargin: Spacing['xxSmall']
  iconColor: Colors['contrasts']['grey125125']
  togglePadding: Spacing['xxSmall']
  toggleBorderRadius: Border['radiusMedium']
  toggleBorderWidth: Border['widthMedium']
  toggleBorderStyle: Border['style']
  toggleFocusBorderColor: Colors['contrasts']['blue4570']
  filledBackgroundColor: Colors['contrasts']['grey1111']
  filledBorderWidth: Border['widthSmall']
  filledBorderStyle: Border['style']
  filledBorderColor: Colors['contrasts']['grey1424']
  filledBorderRadius: Border['radiusMedium']
  filledPadding: Spacing['small']
}

export type ToggleGroupTheme = {
  borderColor: Colors['contrasts']['grey3045']
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
  activeIndicatorColor: Colors['contrasts']['white1010']
  activeIndicatorColorInverse: Colors['contrasts']['grey125125']
}

export type TopNavBarLayoutTheme = TopNavBarLayoutDesktopTheme &
  TopNavBarLayoutSmallViewportTheme

export type TopNavBarLayoutDesktopTheme = {
  desktopFontSize: Typography['fontSizeMedium']
  desktopFontFamily: Typography['fontFamily']
  desktopFontWeight: Typography['fontWeightNormal']
  desktopBackground: Colors['contrasts']['grey100100']
  desktopBackgroundInverse: Colors['contrasts']['grey1111']
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
  desktopUserSeparatorColor: Colors['contrasts']['grey1214']
  desktopUserSeparatorColorInverse: Colors['contrasts']['grey1214']
}

export type TopNavBarLayoutSmallViewportTheme = {
  smallViewportFontSize: Typography['fontSizeMedium']
  smallViewportFontFamily: Typography['fontFamily']
  smallViewportFontWeight: Typography['fontWeightNormal']
  smallViewportBackground: Colors['contrasts']['grey100100']
  smallViewportBackgroundInverse: Colors['contrasts']['grey1111']
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
  background: Colors['contrasts']['white1010']
  borderColor: Colors['contrasts']['grey1424']
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
  hoverBackgroundColor: Colors['contrasts']['blue4570']
  hoverTextColor: Colors['contrasts']['white1010']
  focusOutlineWidth: Border['widthMedium']
  focusOutlineColor: Colors['contrasts']['blue4570']
  focusOutlineStyle: Border['style']
  iconColor: Colors['contrasts']['grey125125']
  iconsMarginRight: Spacing['xSmall']
  descriptorMarginTop: Spacing['xxxSmall']
  descriptorTextColor: Colors['contrasts']['grey125125']
  descriptorFontSizeSmall: Typography['fontSizeXSmall']
  descriptorFontSizeMedium: Typography['fontSizeXSmall']
  descriptorFontSizeLarge: Typography['fontSizeSmall']
  nameTextColor: Colors['contrasts']['blue4570']
  nameFontSizeSmall: Typography['fontSizeXSmall']
  nameFontSizeMedium: Typography['fontSizeSmall']
  nameFontSizeLarge: Typography['fontSizeMedium']
  baseSpacingSmall: Spacing['xSmall']
  baseSpacingMedium: Spacing['small']
  baseSpacingLarge: string | 0
  borderWidth: Border['widthSmall']
  borderRadius: Border['radiusMedium']
  borderColor: Colors['contrasts']['grey4570']
  textLineHeight: Typography['lineHeightCondensed']
  selectedTextColor: Colors['contrasts']['white1010']
  selectedBackgroundColor: Colors['contrasts']['grey4570']
  selectedOutlineWidth: Border['widthLarge']
}

export type TreeBrowserCollectionTheme = {
  fontFamily: Typography['fontFamily']
  baseSpacingSmall: Spacing['xSmall']
  baseSpacingMedium: Spacing['small']
  baseSpacingLarge: string | 0
  borderWidth: Border['widthSmall']
  borderColor: Colors['contrasts']['grey4570']
}

export type TreeBrowserTheme = {
  borderRadius: Border['radiusMedium']
  focusOutlineWidth: Border['widthMedium']
  focusOutlineColor: Colors['contrasts']['blue4570']
  focusOutlineStyle: Border['style']
}

export type TruncateTextTheme = {
  fontFamily: Typography['fontFamily']
  lineHeight: Typography['lineHeight']
}

export type ContextViewTheme = {
  arrowSize: string | 0
  arrowBorderWidth: Border['widthSmall']
  arrowBackgroundColor: Colors['contrasts']['white1010']
  arrowBorderColor: Colors['contrasts']['grey1424']
  arrowBackgroundColorInverse: Colors['contrasts']['grey125125']
  arrowBorderColorInverse: string
}

export type ViewTheme = {
  fontFamily: Typography['fontFamily']
  color: Colors['contrasts']['grey125125']
  colorPrimaryInverse: Colors['contrasts']['white1010']
  borderColorPrimary: Colors['contrasts']['grey1214']
  borderColorSecondary: Colors['contrasts']['grey4570']
  borderColorSuccess: Colors['contrasts']['green4570']
  borderColorBrand: Colors['contrasts']['blue4570']
  borderColorInfo: Colors['contrasts']['blue4570']
  borderColorAlert: Colors['contrasts']['blue4570']
  borderColorWarning: Colors['contrasts']['orange4570']
  borderColorDanger: Colors['contrasts']['red4570']
  borderColorTransparent: string
  debugOutlineColor: Colors['contrasts']['red4570']
  backgroundPrimary: Colors['contrasts']['white1010']
  backgroundSecondary: Colors['contrasts']['grey1111']
  backgroundPrimaryInverse: Colors['contrasts']['grey125125']
  backgroundBrand: Colors['contrasts']['blue4570']
  backgroundInfo: Colors['contrasts']['blue4570']
  backgroundAlert: Colors['contrasts']['blue4570']
  backgroundSuccess: Colors['contrasts']['green4570']
  backgroundDanger: Colors['contrasts']['red4570']
  backgroundWarning: Colors['contrasts']['red4570']
  arrowSize: string | 0
  focusOutlineStyle: Border['style']
  focusOutlineWidth: Border['widthMedium']
  focusOutlineOffset: string | 0
  focusOutlineInset: string | 0
  focusColorInfo: Colors['contrasts']['blue4570']
  focusColorDanger: Colors['contrasts']['red4570']
  focusColorSuccess: Colors['contrasts']['green4570']
  focusColorInverse: Colors['contrasts']['white1010']
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

export type RadioInputGroupTheme = {
  invalidAsteriskColor: Colors['contrasts']['red5782']
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
  Popover: PopoverTheme
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
  ToggleGroup: ToggleGroupTheme
  'ToggleDetails.ToggleGroup': ToggleGroupTheme
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
  RadioInputGroup: RadioInputGroupTheme
}
