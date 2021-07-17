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
}
type ComponentTheme<Type> = {
  [Key in keyof Type]: Type[Key]
}
type ComponentThemeMap = ComponentTheme<ThemeVariables>

export type { ThemeVariables, ComponentThemeMap, AvatarThemeVariables }
