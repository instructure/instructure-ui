# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [11.7.4](https://github.com/instructure/instructure-ui/compare/v11.7.3...v11.7.4) (2026-07-24)

InstUI 11.7.4 marks the first production release of the new components (accessible via the /v11_7 path).

### v11.7.4 component changes (compared to 11.7.3)

- Removed `FormFieldLabel` component
- Removed `focusRingBorderRadius` prop from `View`
- Removed `color="ai"` from `Heading`
- Removed `variant="inline-small"` and `variant="standalone-small"` from `Link`
- Removed `title` and `variant` prop from `Tag`
- Removed `hideActionsUserSeparator` prop from `TopNavBar.Layout`
- Removed `thumbVariant` prop from `RangeInput`
- Removed `renderWeekdayLabels` prop, `calendarIcon` is a new required prop in `DateTimeInput`

### Features

- **emotion,ui-scripts:** resolve tokens studio color modifiers and emit hex ([99141c0](https://github.com/instructure/instructure-ui/commit/99141c036c6a353c25200c57e2cd68a1bc1b8205))
- **emotion:** support alpha color modifier in applyColorModifiers ([c1643b3](https://github.com/instructure/instructure-ui/commit/c1643b3de2f0be084a042d8fd9478b963907da77))
- **many:** add prop most shared tokens to prop options in view ([a08bb3e](https://github.com/instructure/instructure-ui/commit/a08bb3e15759681c5247c8bf27b7a87fa0766dde))
- **many:** remove deprecated v2 items ([eaf8876](https://github.com/instructure/instructure-ui/commit/eaf88767c9beb95c4e09ee5705c387dfd79e4cb7))
- **many:** support current spacing tokens in the margin prop for v2 components ([1b47c5f](https://github.com/instructure/instructure-ui/commit/1b47c5f23eaa60b532cdfd53c39bd71f0cf51aaa))
- **ui-checkbox:** add aria-invalid attribute to Checkbox when validation errors are present ([8301bf9](https://github.com/instructure/instructure-ui/commit/8301bf9f2e2b5e498b601c064d02d9d3f8f4b863))
- **ui-codemods:** update tokens and move theme.componentOverrides to themeOverride.components ([7f94400](https://github.com/instructure/instructure-ui/commit/7f94400b25e32effc7b748d4c77ced7ecb1a70ef))
- **ui-grid,ui-form-field:** breakpoints are set from sharedTokens ([3ac1e64](https://github.com/instructure/instructure-ui/commit/3ac1e64e00c5cb29c342879fd596b34f1b1fbb35))
- **ui-modal:** on larger screens, inset the fullscreen modal from the viewport edge for a11y ([e36b2b5](https://github.com/instructure/instructure-ui/commit/e36b2b586ce24b38d77144f7118169f9249bad29))
- **ui-popover:** add shouldScrollContent prop ([288c43a](https://github.com/instructure/instructure-ui/commit/288c43ac739035424417e56dbd6a4659f938a492))
- **ui-position:** add available space to position ([2ce7236](https://github.com/instructure/instructure-ui/commit/2ce7236db58f6678aabd544823c65dda4a51082c))
- **ui-position:** use border and padding in available space calculation ([1967e20](https://github.com/instructure/instructure-ui/commit/1967e20a214df364ead442b4f236b5e7c6019c66))
- **ui-scripts:** add publish-private command for private-registry releases ([eefa5bd](https://github.com/instructure/instructure-ui/commit/eefa5bd7a97434ef90f4c1bc981dd3f23f0bd0d0))
- **ui-scripts:** allow pr-snapshot to publish at an operator-supplied prerelease version ([c334beb](https://github.com/instructure/instructure-ui/commit/c334beb58bbe6f45b80de45f35f8f2b4ec2238f3))
- **ui-scripts:** refactor theme type generation and fix token fetching script ([ab0536f](https://github.com/instructure/instructure-ui/commit/ab0536f81ffe9ae60f8b8cdc5038f4f323314416))
- **ui-select,ui-date-time-input:** rework DateTimeInput and replace DateInput v1 with DateInput v2 in DateTimeInput ([8d531cf](https://github.com/instructure/instructure-ui/commit/8d531cfa35d57ef7092c2f097df20777582f242b))
- **ui-tag:** remove the inline variant from Tag v2 ([255d84f](https://github.com/instructure/instructure-ui/commit/255d84f93a1b9200ea90a31092554cbc1b386a78))
- **ui-text-input,ui-select:** add contentSpacing prop for even wrapped-tag padding in multiple Select ([0969a00](https://github.com/instructure/instructure-ui/commit/0969a007a16c41eb2b5acec5ba1e4722b8ae0ed4))

### Bug Fixes

- **docs-app:** version-aware theme-override link and prop-table readability ([d1ac78c](https://github.com/instructure/instructure-ui/commit/d1ac78cfaca5ad20eef2b7d2d195a477c5aeceb5))
- **emotion:** propagate resolved component theme override to wrapped component ([446e820](https://github.com/instructure/instructure-ui/commit/446e8205cb7eb8282af565530d5f82a9f2355dfa))
- **many:** do not allow javascript: and data: hrefs ([4a0ac03](https://github.com/instructure/instructure-ui/commit/4a0ac038c6a4102646e04d27c1c3251f97367822))
- **many:** import cross-package deps from /latest in v2 components ([7ff3718](https://github.com/instructure/instructure-ui/commit/7ff3718be3f26188afd5027f4ebdbaf21bcdb1d4))
- **many:** keep form field messages out of the control's accessible name ([409d077](https://github.com/instructure/instructure-ui/commit/409d077a3095b318fd7d2e150bb01bc2732c9bf5))
- **many:** only reference rendered messages via aria-describedby ([ccc9516](https://github.com/instructure/instructure-ui/commit/ccc95165ec8dae6d06e001c0a20fcebef1cf9962))
- **ui-a11y-content:** prevent ScreenReaderContent text from being copied to clipboard ([b8ae50d](https://github.com/instructure/instructure-ui/commit/b8ae50dde3d93f0f7f2901d243fef58450a5065a))
- **ui-babel-preset:** fix Cannot find package 'core-js' errors ([a46ce2e](https://github.com/instructure/instructure-ui/commit/a46ce2e8c517d1a30f7d159fe84f1a50ce5fdf75))
- **ui-badge,ui-scripts:** use primaryTextColor for primary badge text ([a1adc22](https://github.com/instructure/instructure-ui/commit/a1adc22e23a8ad4e102f3fb9fa3d6e8a9b6706a9))
- **ui-billboard:** point icons doc links at valid icons pages ([bcfd452](https://github.com/instructure/instructure-ui/commit/bcfd4526ba358731a923fef36dba7273069f1885))
- **ui-buttons:** fix ai-secondary button size diff ([d559a3f](https://github.com/instructure/instructure-ui/commit/d559a3f5444ac70ef4f037f8810336825fb5e795))
- **ui-buttons:** fix buttons disabled style and color ([2f2f7b0](https://github.com/instructure/instructure-ui/commit/2f2f7b04c7d666aef0e76054c9f722dab9f679e7))
- **ui-date-input:** add missing Button dependency ([b9ff437](https://github.com/instructure/instructure-ui/commit/b9ff43752e8797a4f1ff6e61760626dee015e81c))
- **ui-date-input:** add scrollbar to dateinput v2 ([84f11c1](https://github.com/instructure/instructure-ui/commit/84f11c1c5638f9a91946b29125869115f66c5f0f))
- **ui-dialog,ui-date-input,ui-calendar:** add aria-live to calendar header, descriptive nav button labels with target month, aria-modal on focused dialogs ([ac11880](https://github.com/instructure/instructure-ui/commit/ac11880013be74f148558671177ed25c9286204f))
- **ui-dialog:** allow consumers to override inherited border-radius ([68cb5ca](https://github.com/instructure/instructure-ui/commit/68cb5caccf982cd7f967e778dff5246490e76514))
- **ui-drilldown:** disabled options no longer show hover/focus styles ([9c9e8bb](https://github.com/instructure/instructure-ui/commit/9c9e8bbaa69f081708139a53797d263a9fc5266b))
- **ui-expandable:** remove unused cross-package dependencies ([444f067](https://github.com/instructure/instructure-ui/commit/444f067a10a825ed102be42c6947d5be3d6efbec))
- **ui-flex:** resolve general.\* spacing tokens for the gap prop ([49b97ec](https://github.com/instructure/instructure-ui/commit/49b97ec1bd0bf86e80c18e6adbc6d7f6aaf38fbb))
- **ui-form-field:** disable child inputs when FormFieldGroup is disabled ([d30fc64](https://github.com/instructure/instructure-ui/commit/d30fc642a3586f708d86ab570ae73086107e2695))
- **ui-grid:** drop removed Grid component type from v2 props ([d7510c8](https://github.com/instructure/instructure-ui/commit/d7510c819471f3bb0c783250234273412b38e8de))
- **ui-instructure:** align AiInformation lower-section heading levels to h4 ([d2b541b](https://github.com/instructure/instructure-ui/commit/d2b541b6b021db9aca201abdfd799921c64deb67))
- **ui-modal:** add whitespace between header text nodes in scroll body aria-label ([350e841](https://github.com/instructure/instructure-ui/commit/350e841666bc5635a7e130bef1a82bd1583048be))
- **ui-modal:** restore Modal open/close transition animation ([ef6b3d1](https://github.com/instructure/instructure-ui/commit/ef6b3d14de2db187934b4e7a54276ee38fce6b0b))
- **ui-modal:** skip Modal.Body tab stop when it has focusable children ([25e4261](https://github.com/instructure/instructure-ui/commit/25e42617898fa6584da0b33eed589e2710875570))
- **ui-motion,ui-alerts:** capture child DOM via elementRef in Transition to avoid React 'ref is not a prop' warning ([aaa4a58](https://github.com/instructure/instructure-ui/commit/aaa4a58c4fd8f0d678972a4dea6f2d7c3faaed46))
- **ui-select:** don't strip renderBeforeInput from the combobox accessible name ([28d5e24](https://github.com/instructure/instructure-ui/commit/28d5e24e65a24b1e706fb67407523537d5db78b8))
- **ui-select:** fix screen reader labels on multiple select ([6cc240f](https://github.com/instructure/instructure-ui/commit/6cc240f38af252171954078a9adc603e2e776eb1))
- **ui-side-nav-bar:** show focus ring on selected item ([0dad569](https://github.com/instructure/instructure-ui/commit/0dad569e2d8e60481465893938ed93121c6d4d08))
- **ui-source-code-editor:** apply current theme to v2 search panel ([4534fa0](https://github.com/instructure/instructure-ui/commit/4534fa0fc244bfb7138f3d09fbeeb1e73dfa6afd))
- **ui-table:** fix caption for table to be responsive to sorting ([aac2b17](https://github.com/instructure/instructure-ui/commit/aac2b1790f970a1e8e2d959723eb0e4248105dd2))
- **ui-tabs:** fix focusring to make it more distinct ([c2e4eb0](https://github.com/instructure/instructure-ui/commit/c2e4eb09c90f6e71d5a61599de8cd5d3ac41019f))
- **ui-text-input:** restore inline cursor flow next to selected tags ([3dd1736](https://github.com/instructure/instructure-ui/commit/3dd1736173ff089970bbbd175bda81faa02895f7))
- **ui-top-nav-bar:** fix v2 topnavbar render error ([bd73345](https://github.com/instructure/instructure-ui/commit/bd733457d906f520e1f9e616004f515116ef40c5))
- **ui-truncate-text,ui-scripts:** replace innerHTML with manual DOM construction ([434d381](https://github.com/instructure/instructure-ui/commit/434d3810892129e9abcff94acd3efea3397e268c))
- **ui-truncate-text:** remove lineHeight as a theme input and use the 1.2 as the default ([d4f938f](https://github.com/instructure/instructure-ui/commit/d4f938f2fd3a8618e716987c054f17060a5009e5))
- **ui-utils,ui-svg-images:** isolate DOMPurify config from the shared singleton ([60e71f3](https://github.com/instructure/instructure-ui/commit/60e71f36842a01ed874f7a89b39d7d03afcc52ae))
- **ui-utils:** expand safeHref scheme allowlist ([5869dae](https://github.com/instructure/instructure-ui/commit/5869daef3a8c3baeafe664efb3f1915c5baefb41))

## [11.7.3](https://github.com/instructure/instructure-ui/compare/v11.7.2...v11.7.3) (2026-05-07)

### Bug Fixes

- **[v11.7] ui-buttons:** fix textAlign center on Buttons without icon ([b46ddb7](https://github.com/instructure/instructure-ui/commit/b46ddb788696bf1c556291d3a09a1ba659c6959f))
- **[v11.6, v11.7] ui-date-time-input,ui-date-input,ui-calendar:** set missing aria-selected on calendar days, BREAKING CHANGE: add mandatory prop selectedLabel, change datePickerDialog prop to mandatory ([08abed5](https://github.com/instructure/instructure-ui/commit/08abed5e8c8b29aecab0368e01e8e4ffd0c7fda7))
- **[v11.7] ui-tabs:** fix tabs panel layout when `unmountOnExit` is false ([826ff62](https://github.com/instructure/instructure-ui/commit/826ff62fba56bc0cadd6995b366e3ca505b1b6c1))
- **[v11.6, v11.7] ui-tree-browser,ui-top-nav-bar,ui-form-field:** add back some missing exports

### Features

- **many:** update dependencies, remove lots of Babel plugins, remove Webpack 4 support ([f916fca](https://github.com/instructure/instructure-ui/commit/f916fcafdddcb2d7de401f93e8ff92cfdfa47bba))
- **[v11.7] many:** add a way for consumers to pass their own component theme definition so they can build their own components with InstUI ([ce01c3e](https://github.com/instructure/instructure-ui/commit/ce01c3eedc46aa2588f4c8309a6eabf4461aaec7))
- **[v11.7] ui-checkbox:** add `data-checked` attribute to reflect checked state ([a790019](https://github.com/instructure/instructure-ui/commit/a790019ed2b47064a01b7ec532494cc723943241))
- **[v11.6, v11.7] ui-color-picker:** improve ColorPicker paste behavior ([e5c279d](https://github.com/instructure/instructure-ui/commit/e5c279dbf8ac9918f104e223b9625b3b50322f23))
- **[v11.7] ui-range-input:** remove deprecated thumb variant ([ca4a3fb](https://github.com/instructure/instructure-ui/commit/ca4a3fb45885fbcc9807566dadd3d027a17b8f72))
- **[v11.7] ui-select,ui-date-time-input:** rework DateTimeInput and replace DateInput v1 with DateInput v2 in DateTimeInput ([7717fc6](https://github.com/instructure/instructure-ui/commit/7717fc6db4d2a733c8349eb583d37a85a4137cf7))
- **ui-scripts:** use design tokens from external repo and convert JS to TS ([a03e0cb](https://github.com/instructure/instructure-ui/commit/a03e0cb24cdf1a2f5debbe707f73ce50ec4a666a))

### BREAKING CHANGES

- **[v11.7] ui-select,ui-date-time-input:** `renderWeekdayLabels` prop removed, `calendarIcon` is a new required prop
- **[v11.7] ui-range-input:** `thumbVariant` prop removed from RangeInput
- **[v11.7] ui-select,ui-date-time-input:** `prevMonthLabel` prop removed (use `screenReaderLabels.prevMonthButton` instead)
  - `nextMonthLabel` prop removed (use screenReaderLabels.nextMonthButton instead)
  - `renderWeekdayLabels` prop removed
  - `dateFormat` type changed
  - `screenReaderLabels` is a new required prop
  - `dateFormat` default changed: Moment's 'LL' (long month name) → locale's default date format

## [11.7.2](https://github.com/instructure/instructure-ui/compare/v11.7.1...v11.7.2) (2026-04-23)

### Bug Fixes

- **emotion:** fix getShortHandValue not trimming input string ([75eac6f](https://github.com/instructure/instructure-ui/commit/75eac6f122623fe4c7d750fde8739864402ecaaf))
- **many:** fix checkbox toggle variant icons and resolve border radius inheritance issues in DateInput and Menu from View ([ab2c8c2](https://github.com/instructure/instructure-ui/commit/ab2c8c2ba7f5b3944f7977244e37f4a4c916422a))
- **many:** fix doc component previews, update dark theme text and code block styles, and replace old icons ([d4e48d3](https://github.com/instructure/instructure-ui/commit/d4e48d3f739decb13b76c863c8f01685f0788dd6))
- **many:** small fixes for doc and fix component directory mapping in "dev" script ([39f0c99](https://github.com/instructure/instructure-ui/commit/39f0c991315e39d30e1f24b3142b986d5b9041ee))
- **ui-date-input:** voicover: read only textinput label, ignore children ([cd26015](https://github.com/instructure/instructure-ui/commit/cd26015f8d759e1dab931b0f691e345006ecb4b8))
- **ui-scripts,emotion:** fix primitives and semantics override functionality ([d72df52](https://github.com/instructure/instructure-ui/commit/d72df52242fdf5ecd13fa38e19f254da1be9a8dc))
- **ui-source-code-editor:** preserve scroll position in controlled mode ([49dd754](https://github.com/instructure/instructure-ui/commit/49dd754ffd5518219cec5e55d65e9ca86dfc5868))
- **ui-text-area,ui-radio-input,ui-number-input:** fix Tooltip placements ([034c163](https://github.com/instructure/instructure-ui/commit/034c16362ca78db3f5af2f277b2f013851faa46a))

### Features

- **emotion:** add helper for accessing computed theme (useComputedTheme.ts in the emotion package) ([6d3c649](https://github.com/instructure/instructure-ui/commit/6d3c64912304bf863e3bc720cdb29c88165bfe81))
- **many:** rework Select, SimpleSelect and TimeSelect ([fb95519](https://github.com/instructure/instructure-ui/commit/fb9551958326bdc8e95d55075c27c7e078c0c69c))
- **many:** rework TopNavBar ([bf40e4f](https://github.com/instructure/instructure-ui/commit/bf40e4f380dce5edc45a0f0bc83d5a5070d3be2b))
- **ui-byline:** rework Byline ([066524f](https://github.com/instructure/instructure-ui/commit/066524ff00c2417b29ac4bd9716f559c023f503e))
- **ui-codemods:** add codemod to support versioned import updates ([04f6686](https://github.com/instructure/instructure-ui/commit/04f668683e252df9b063902acbbf8e9c504f0bc7))
- **ui-expandable:** rework Expandable ([af31b5a](https://github.com/instructure/instructure-ui/commit/af31b5a3760e689590379e483ab8629d533065fc))
- **ui-img:** rework Img ([5e7a355](https://github.com/instructure/instructure-ui/commit/5e7a3556401ac3155a8ff58baad9359095f654ff))
- **ui-instructure:** rework DataPermissionLevels and NutritionFacts ([36c02c6](https://github.com/instructure/instructure-ui/commit/36c02c6b3e0badcf257a9697ea095ad07cd03d49))
- **ui-overlays:** rework Mask ([335cc5b](https://github.com/instructure/instructure-ui/commit/335cc5b00b1a2e346343c79001606f1782ceb9a1))
- **ui-rating,ui-icons:** rework Rating ([af97f0c](https://github.com/instructure/instructure-ui/commit/af97f0c0bc3a5d8324d99f23645b428192152193))
- **ui-table:** add screen reader announcements for column sorting ([6b23662](https://github.com/instructure/instructure-ui/commit/6b236623f3818007f17aa73a124ec5627467ece6))
- **ui-text,ui-editable:** rework InPlaceEdit and Editable ([10f637b](https://github.com/instructure/instructure-ui/commit/10f637b938d49e23ceddc6b52535f927dd91e37b))
- **ui-themes,ui-alerts,emotion:** fix primitives and semantics overrides and add freeze functionlionality to old components ([336fde9](https://github.com/instructure/instructure-ui/commit/336fde9952698eda020db4916f276e8532ed1669))
- **ui,ui-options,ui-drilldown:** rework Drilldown ([0562fe2](https://github.com/instructure/instructure-ui/commit/0562fe2b43e3235fc78c4981ada504c1a2f10d1a))

### BREAKING CHANGES

- **ui-top-nav-bar:** the component got a new version in this release

INSTUI-4967

- **ui-select:** the component got a new version in this release

INSTUI-4807

- **ui-img:** the component got a new version in this release

INSTUI-4970

- **ui-text,ui-editable:** the component got a new version in this release

INSTUI-4969

- **ui-rating,ui-icons:** the component got a new version in this release

INSTUI-4806

- **ui,ui-options,ui-drilldown:** the component got a new version in this release

INSTUI-4792

## [11.7.1](https://github.com/instructure/instructure-ui/compare/v11.7.0...v11.7.1) (2026-03-20)

### Bug Fixes

- **ui-buttons:** fix button to icon size mapping ([4bf8ed1](https://github.com/instructure/instructure-ui/commit/4bf8ed1dca8d0d88a79815bd80b4de252fa843ee))

# [11.7.0](https://github.com/instructure/instructure-ui/compare/v11.6.0...v11.7.0) (2026-03-18)

### Bug Fixes

- **many:** a11y requirement fix, interactive links must be underlined on interaction and isWithinText prop was removed ([8531756](https://github.com/instructure/instructure-ui/commit/8531756c564a3220a8266d02a72fb26c3bbcc977))
- **ui-checkbox:** prevent blur on checkbox label mousedown by manually restoring focus to hidden input ([843ca3e](https://github.com/instructure/instructure-ui/commit/843ca3e0d0db1197b343a17cd2740a4a8446d318))
- **ui-text-input,emotion:** fix TextInput displaying double focus rings when a focusable element is rendered inside ([b33cea2](https://github.com/instructure/instructure-ui/commit/b33cea283ef84cdc674c43bf8a0b7ca55f04cfaa))
- **ui-view:** clipping ContextView child content overflow ([94a76e8](https://github.com/instructure/instructure-ui/commit/94a76e884ee2ee09071d793daff9696049c06fe4))

### Features

- **ui-text:** migrate to new theming system ([19c7c44](https://github.com/instructure/instructure-ui/commit/19c7c4413a5632b6b10380f888824384724b6be3))
- **many:** add new theming solution ([1cef88e](https://github.com/instructure/instructure-ui/commit/1cef88e97f40dd85e15b10bc4307d013ae8b09d0))
- **many:** add solution for using both old and new token system in the same app ([688a713](https://github.com/instructure/instructure-ui/commit/688a713ff715433bb085323dbad61285387c5141))
- **many:** refactor theme parser and implement tray and tabs ([ef28373](https://github.com/instructure/instructure-ui/commit/ef283736fd76fbdcc674854916b298c199f8df50))
- **many:** rework TextArea and dependent FormField components ([0f8c438](https://github.com/instructure/instructure-ui/commit/0f8c43803e3458bbf7b2dd266a9e246cb89b0d3c))
- **many:** separate focus outline calculation from view, inject sharedTokens to generateStyles ([793fe43](https://github.com/instructure/instructure-ui/commit/793fe4346e7b960a272e8b4a98bc8e2c9bb7d2fe))
- **ui-avatar:** rework avatar to comply with new design ([70a60d4](https://github.com/instructure/instructure-ui/commit/70a60d4754851be21412a0fbaf234dd4ab39650b))
- **ui-badge:** rework Badge ([214ad24](https://github.com/instructure/instructure-ui/commit/214ad2468e9a5a2ea819d3d65f6efa35e915bd3e))
- **ui-breadcrumb:** migrate to new theming system and add new lucide icon and change separator style calculation ([d6c8006](https://github.com/instructure/instructure-ui/commit/d6c8006d213e95c6502d611d9a8e6792ba46e55d))
- **ui-buttons,ui-text-input:** add condensed sizes to IconButton and simplify TextInput afterElement ([49bd675](https://github.com/instructure/instructure-ui/commit/49bd675ad9d9e77bffeb1940888d33d6cc911c60))
- **ui-buttons:** add v2 button components with new icon system and theming ([4f49e3e](https://github.com/instructure/instructure-ui/commit/4f49e3e27d8a44f566f2390f8bb8abf6d8ee745b))
- **ui-checkbox:** checkbox rework ([85cc06b](https://github.com/instructure/instructure-ui/commit/85cc06b3580e117680b5df1c804a519f8ac7828c))
- **ui-color-picker:** rework ColorPicker ([fd7780f](https://github.com/instructure/instructure-ui/commit/fd7780fc7ba49cb12bdbe67d2f646d3ae0fbd23a))
- **ui-date-input,ui-calendar:** rework Calendar and DateInput ([4f127ef](https://github.com/instructure/instructure-ui/commit/4f127ef48f4cf3263e07c4b147e2f3f7c5218a3a))
- **ui-date-input:** migrate DateInput and DateInput2 ([c685444](https://github.com/instructure/instructure-ui/commit/c68544410815dd9cb2602e5a531b0de10c50b151))
- **ui-file-drop:** migrate to new theming system ([7e9208a](https://github.com/instructure/instructure-ui/commit/7e9208ad056ef1d18f5ffd616540624ef5615991))
- **ui-flex:** rework Flex ([ef2104b](https://github.com/instructure/instructure-ui/commit/ef2104bc3448df5b54647ec5db008b236441b919))
- **ui-form-field:** rework FormFieldGroup ([fb06912](https://github.com/instructure/instructure-ui/commit/fb069121f2e522b5ac18deb7f513e6212735cde2))
- **ui-grid:** rework Grid ([1002c2d](https://github.com/instructure/instructure-ui/commit/1002c2dea5dc3f94ed3080c06a16a7cc385eac56))
- **ui-heading:** rework Heading ([b8d5995](https://github.com/instructure/instructure-ui/commit/b8d5995bd0b7d11db6a4d83a96cef74c434ab40f))
- **ui-icons-lucide:** add lucide icons ([881275f](https://github.com/instructure/instructure-ui/commit/881275f2dff553db67c492bd2f929812f59fec37))
- **ui-icons,ui-billboard:** migrate to new theming system ([fb42132](https://github.com/instructure/instructure-ui/commit/fb42132f5f5fc9b0ecfe2b28773c2e1c10fa0c86))
- **ui-instructure:** migrate aiinformation to the new theming system ([419de61](https://github.com/instructure/instructure-ui/commit/419de618bb76b0fd4e71f1bfa8481b54b3c0af6e))
- **ui-link:** migrate to new theming system and deprecate old variants and add new size prop ([b83f73b](https://github.com/instructure/instructure-ui/commit/b83f73b6b6782ff48af88c5fa78b9ced0363e327))
- **ui-link:** migrate to new theming system and deprecate old variants and add new size prop ([777836e](https://github.com/instructure/instructure-ui/commit/777836ecf40f9df152885b4df2fa6f2a4abac1da))
- **ui-list:** migrate to new theming system ([98e203a](https://github.com/instructure/instructure-ui/commit/98e203a3f13f3a7b2e97846500c6d0d91730e29e))
- **ui-metric,emotion:** rework Metric ([019cac4](https://github.com/instructure/instructure-ui/commit/019cac4b4b7d9982be8d29ac831672c2e2d1b16a))
- **ui-modal:** rework Modal ([ce24aa1](https://github.com/instructure/instructure-ui/commit/ce24aa13ea866d62681e5e847cd42f0a01fc3fc3))
- **ui-navigation:** rework AppNav ([fba6b4d](https://github.com/instructure/instructure-ui/commit/fba6b4d6a7feb616175ff105f7d8d2aee34eca2b))
- **ui-number-input:** rewrite NumberInput to the new theming system ([500d4bc](https://github.com/instructure/instructure-ui/commit/500d4bc03037c2cc60bf83cd1e84b878bef87535))
- **ui-pagination:** pagination rework ([662d474](https://github.com/instructure/instructure-ui/commit/662d4742c22098d24d8bf8edffef77a78c42d832))
- **ui-pill:** migrate to new theming system ([8f8cfbe](https://github.com/instructure/instructure-ui/commit/8f8cfbee89256d3a29713cc73be1dcf7333a8488))
- **ui-popover:** rework Popover ([f1fc5f2](https://github.com/instructure/instructure-ui/commit/f1fc5f27abc8fd64ede88b18368e95a4ba8d3762))
- **ui-progress:** migrate progress bar to new theming ([caed1a6](https://github.com/instructure/instructure-ui/commit/caed1a68ad055d2b36927a55545f95128071a4e1))
- **ui-progress:** rework ProgressCircle ([cc773de](https://github.com/instructure/instructure-ui/commit/cc773de16d96f09cb7192a411ce7965acc525fff))
- **ui-radio-input:** migrate toggle variant to the new theming system ([87e3f80](https://github.com/instructure/instructure-ui/commit/87e3f80e07eaa4166eb0a9f45f8d39d6789b4ce7))
- **ui-radio-input:** use the new theme for RadioInput ([34bfd59](https://github.com/instructure/instructure-ui/commit/34bfd5956c47beceacb50637e7fd605b9e3f4210))
- **ui-range-input:** rework RangeInput ([7e1490c](https://github.com/instructure/instructure-ui/commit/7e1490c73f252acca017424722c7055e9be10c92))
- **ui-react-utils,ui-icons-lucide,ui-avatar:** add lucide icons to Avatar, refactor ui-icons-lucid package ([ab5c1ca](https://github.com/instructure/instructure-ui/commit/ab5c1ca8ec9961d754dafee0bcbe5040bb2641b1))
- **ui-react-utils:** add useDeterministicID which can be used instead of withDeterministicId for functional components ([91f025e](https://github.com/instructure/instructure-ui/commit/91f025e0a5b157f7a3bc801d8fd45d96b454124c))
- **ui-scripts,ui-icons,ui-codemods:** add build-time generation of custom/brand icon components and migration codemod ([b56cb4e](https://github.com/instructure/instructure-ui/commit/b56cb4e69339387ddfb37d532e644e20c4d87876))
- **ui-scripts:** add exeption for primitive theme ([0d54af1](https://github.com/instructure/instructure-ui/commit/0d54af1b99a1aeaf8640e2fa4fb7d9205857cbf8))
- **ui-scripts:** rework parser to accomodate multiple files ([bd4960e](https://github.com/instructure/instructure-ui/commit/bd4960e3e806ea5321b170309e30c0f7a9ef22ec))
- **ui-side-nav-bar:** rework SideNavBar ([97e48d1](https://github.com/instructure/instructure-ui/commit/97e48d1d807b193bbd637a57b27efe102731ba17))
- **ui-source-code-editor:** rework SourceCodeEditor ([2dcb747](https://github.com/instructure/instructure-ui/commit/2dcb747f94987e456c0c5bb5619bb6c8b641e98b))
- **ui-spinner,ui-avatar:** refactor spinner ([665ab13](https://github.com/instructure/instructure-ui/commit/665ab13c536a8b94b7ba3adc316d06a81f2b67e4))
- **ui-table:** migrate table to new theming system ([db376b5](https://github.com/instructure/instructure-ui/commit/db376b5ea018cad4edd56c975158bcc4d7dede89))
- **ui-tag:** rework Tag ([f3a72e3](https://github.com/instructure/instructure-ui/commit/f3a72e3be1d2f6aa912fa1e348d9eec6849b3f8c))
- **ui-toggle-details:** rework ToggleDetails ([a201f69](https://github.com/instructure/instructure-ui/commit/a201f69884d47ea24de0972b7d93c0f2a7508e4b))
- **ui-toggle-details:** rework ToggleGroup ([b36a4d3](https://github.com/instructure/instructure-ui/commit/b36a4d3873be7350659f68f9bfa695c51020cea9))
- **ui-tooltip:** rework Tooltip ([f87cf01](https://github.com/instructure/instructure-ui/commit/f87cf01e9bdd1003ee68324b1eb5b1d2a207a275))
- **ui-tray:** migrate to new theming system ([fea7820](https://github.com/instructure/instructure-ui/commit/fea78205526a3c07134c66c85003d5fd566e792a))
- **ui-tree-browser:** migrate to new theming system, add controlled selection and hoverable prop ([dad9ff4](https://github.com/instructure/instructure-ui/commit/dad9ff4d1e85ab07ba917e658b8d5799a40ba069))
- **ui-truncate-text:** rework TruncateText and sort the upgrade guide alphabetically ([61ea852](https://github.com/instructure/instructure-ui/commit/61ea8524000d08423249ff2f76acdb643ba1d047))
- **ui-text:** Removed 'alert' color prop value. Use 'primary' color instead.

Also improves documentation:

- Clarify variant usage and recommendations in README
- Add deprecation notes for size, weight, and lineHeight legacy values
- Update color examples to include inverse colors and remove alert
- Add JSDoc comments for deprecated prop values
- Improve code examples with clearer formatting

To test: Compare with Figma design

# [11.6.0](https://github.com/instructure/instructure-ui/compare/v11.5.0...v11.6.0) (2026-02-18)

### Bug Fixes

- **ui-modal:** voiceOver in Chrome treats scrollable modal body as single interactive object preventing line-by-line navigation ([0be3fb1](https://github.com/instructure/instructure-ui/commit/0be3fb1dee541a37c2d38ae6656fd0330f651265))

### Features

- **ui-date-input:** add missing role and aria-label to DateInput2 dialog ([6f2219a](https://github.com/instructure/instructure-ui/commit/6f2219a4f8df3f1261e5d41052c9233fdfaff6e8))

# [11.5.0](https://github.com/instructure/instructure-ui/compare/v11.4.0...v11.5.0) (2026-02-03)

### Features

- **ui-table:** expose min-width prop, so one can make a table where each column has no wrapping text ([317897a](https://github.com/instructure/instructure-ui/commit/317897a996288108865e8204be075b1cfab7530f))
- **ui-top-nav-bar:** allow to set aria-label on TopNavBar's overflow menu button ([2702ad4](https://github.com/instructure/instructure-ui/commit/2702ad42e42e67f1d69d8aa11d4135d9eea6bff2))
- **ui-view:** allow to set View's display prop to contents, inherit, initial, revert, revert-layer, unset ([3c3c93f](https://github.com/instructure/instructure-ui/commit/3c3c93f824317155552778c7dbe24c5e18b32615))

# [11.4.0](https://github.com/instructure/instructure-ui/compare/v11.3.0...v11.4.0) (2026-01-20)

### Features

- **ui-color-picker:** add new labelLevel prop to set heading level in ColorContrast ([06c9e79](https://github.com/instructure/instructure-ui/commit/06c9e79fc87c31da4ca8eff61e93094aa09c8be5))
- **ui-instructure:** add privacy notice link to the ai information panel ([447e40b](https://github.com/instructure/instructure-ui/commit/447e40b8ef1a5b776e01e831b2c5a6d45ca8274e))

# [11.3.0](https://github.com/instructure/instructure-ui/compare/v11.2.0...v11.3.0) (2026-01-12)

### Bug Fixes

- **ui-color-picker:** fix mixer button alignment and visual jump ([68c3e60](https://github.com/instructure/instructure-ui/commit/68c3e60acc5e1f410ed79a623a35fa3eaf7107f5))
- **ui-color-picker:** fix popover scrolling when content exceeds viewport ([66f2b18](https://github.com/instructure/instructure-ui/commit/66f2b18af0dead1f62ee61629262c39c6273dad0))
- **ui-icons:** fix ai info icon ([723ef9f](https://github.com/instructure/instructure-ui/commit/723ef9fb972fbcbf7627653698d2e47f8af49822))
- **ui-link:** fix Link outline styles and overrides ([f23269e](https://github.com/instructure/instructure-ui/commit/f23269ed1139bb9833abbc894493a95bb80e27f4))
- **ui-list:** align ordered list start position with unordered lists ([baed912](https://github.com/instructure/instructure-ui/commit/baed912a2f246797b5bcd58c40c64b26de6baaf2))
- **ui-modal:** adjust scrollbar detection tolerance in ModalBody ([5ae1f42](https://github.com/instructure/instructure-ui/commit/5ae1f42f47102b87a8c7afabdd9ab51b331de96a))
- **ui-selectable,ui-select:** fix typing of Select and Selectable event types and TypeScript errors in the examples ([bde40cc](https://github.com/instructure/instructure-ui/commit/bde40cc121674666cceb7eb24e116a50e1879445))
- **ui-top-nav-bar:** fix aria-expanded added twice when displaying menus/popups ([b58a1bc](https://github.com/instructure/instructure-ui/commit/b58a1bc8daba596c987dc368d7772e53253c1d77))

### Features

- **ui-tabs:** add tabIndex prop to the Panel for WCAG-compliant focus control (defaults to 0 for backward compatibility) ([9b2121f](https://github.com/instructure/instructure-ui/commit/9b2121f3e0f5fb0abf4ad12158f9972aa1acc5a4))

# [11.2.0](https://github.com/instructure/instructure-ui/compare/v11.0.1...v11.2.0) (2025-11-06)

### Bug Fixes

- fix themes for subcomponents displaying wrong in the docs app ([d0d821e](https://github.com/instructure/instructure-ui/commit/d0d821edbc9eb90b3a1217b20d412e1a86a93fd7))
- **ui-table:** fix selectable table screen reader issue on select all checkbox in the column header ([93a9847](https://github.com/instructure/instructure-ui/commit/93a9847800eea63e874587d19cf06c76bcb9ab95))

### Features

- **many:** migrate from npm to pnpm ([f7bb16e](https://github.com/instructure/instructure-ui/commit/f7bb16e114df83984c67d5a6e07fb4d9c65efc53))
- **ui-drilldown:** make Drilldown.Group controlled via selectedOptions prop. If provided, this prop fully drives the selection state instead of internal state ([3341639](https://github.com/instructure/instructure-ui/commit/33416395bf7d9a4d5649334d65cc9b599dbc2ec3))
- **ui-icons:** add compliance-draft icons ([b66ff1f](https://github.com/instructure/instructure-ui/commit/b66ff1f698b2b1d21ff8d5f4a96928d30b51d81c))

## [11.0.1](https://github.com/instructure/instructure-ui/compare/v11.0.0...v11.0.1) (2025-10-13)

### Bug Fixes

- **emotion:** fix useTheme export. The native emotion util was exported instead of our own ([8450778](https://github.com/instructure/instructure-ui/commit/8450778bbcbc2a2f928c1c53ff21147535d61940))
- **ui-drawer-layout,ui-a11y-utils:** fix Tray closing immediately after opening and calling onDismiss ([46593a4](https://github.com/instructure/instructure-ui/commit/46593a465f97158549b541d7daea1f453fcc2a56))
- **ui-text:** fixed an issue where letterSpacingNormal theme variable previously showed an error because its value was 0 ([856218d](https://github.com/instructure/instructure-ui/commit/856218d9852dc8c8d44d20a600db23ba11a7621f))
- **ui-view:** remove ui-prop-types dependency that was left in accidentally after the v11 release ([93f129b](https://github.com/instructure/instructure-ui/commit/93f129b7dda2bbe7fe29ae3e181c28d664dfff56))

# [11.0.0](https://github.com/instructure/instructure-ui/compare/v10.26.0...v11.0.0) (2025-10-06)

InstUI v11 is a major release that removes deprecated features and adds support for React 19. For details on how to upgrade, codemods see the upgrade guide at https://instructure.design/upgrade-guide

### Features

- **many:** instUI v11 release ([36f5438](https://github.com/instructure/instructure-ui/commit/36f54382669186227ba24798bbf7201ef2f5cd4c))

### BREAKING CHANGES

- React 16 and 17 are no longer supported
- remove `PropTypes` from all packages
- remove `CodeEditor` component
- remove `@instui/theme-registry` package
- remove `@testable`, `@experimental`, `@hack` decorators
- InstUISettingsProvider's `as` prop is removed
- `canvas.use()`, `canvasHighContrast.use()` functions are removed
- `canvasThemeLocal`, `canvasHighContrastThemeLocal` are removed
- `variables` field on theme objects are removed
- remove deprecated props from Table: Row's `isStacked`, Body's
  `isStacked`, `hover`, and `headers`
- `Table`'s `caption` prop is now required
- `ui-dom-utils`'s `getComputedStyle` can now return `undefined`

### Bug Fixes

- **ui-buttons:** fix focus ring distortion on circle shape buttons ([04e93c8](https://github.com/instructure/instructure-ui/commit/04e93c82d4c58b1d8b783933dfdeeb183f2c1335))
- **ui-drilldown:** fix for prevent option selection when Drilldown or its sub-components get disabled prop ([5fc37f6](https://github.com/instructure/instructure-ui/commit/5fc37f6b7c7622ab248a4d1bd575b2bbac97e0a0))

# [10.26.0](https://github.com/instructure/instructure-ui/compare/v10.25.0...v10.26.0) (2025-10-01)

### Bug Fixes

- **ui-breadcrumb:** fix Breadcrumb not read properly when truncated by screenreaders ([638ffbe](https://github.com/instructure/instructure-ui/commit/638ffbe5263be6e07dff13e2d114daa84631f119))
- **ui-buttons:** fix for AI secondary button visual glitch ([aff6f65](https://github.com/instructure/instructure-ui/commit/aff6f65aabdfb122314761746bcbcbf1b66aaf61))
- **ui-color-picker:** prevent selection outside of ColorMixer when dragging the indicator ([2e2bd90](https://github.com/instructure/instructure-ui/commit/2e2bd902da44cd2ca6ee933c2a70e11e1183fe6b))
- **ui-drawer-layout,ui-a11y-utils:** fix DrawerLayout not closing on ESC keypress ([390b294](https://github.com/instructure/instructure-ui/commit/390b2948a53527cd7b582fbe4f17af86443ea7a4))
- **ui-radio-input:** remove aria-disabled from RadioInput ([1b8946f](https://github.com/instructure/instructure-ui/commit/1b8946fdca56e6cb16df8bbc91148cecb8ed1d8e))
- **ui-table:** make TableColHeader focus outline and sorted icon overridable by brand overrides ([5b8231d](https://github.com/instructure/instructure-ui/commit/5b8231d4dc27d6ac05acdb4b88b367b16a964844))
- **ui-text-input:** set IconButton height in TextInput to not break layout ([f345a58](https://github.com/instructure/instructure-ui/commit/f345a58accc725afd99381a93d14c81070c854bc))
- **ui-utils,ui-drilldown:** make NDVA read options in Drilldown.Group correctly in Firefox ([994f158](https://github.com/instructure/instructure-ui/commit/994f15887ff7e1112208031514aa7e0ae134231b))

### Features

- Add `llms.txt` to instructure.design, add its contents as a downloadable `.zip` ([bfef92b](https://github.com/instructure/instructure-ui/commit/bfef92b58eb8a3ebd9fd4f9328f1d7dc7f072b5b)
- **ui-alerts:** expand Alert's liveRegion to accept direct DOM element ([e457a0b](https://github.com/instructure/instructure-ui/commit/e457a0bcc928c4b094cc2df6998f7dd853b9774f))
- **ui-buttons:** expose display prop on CondensedButton ([c827833](https://github.com/instructure/instructure-ui/commit/c8278332fb8cae64cb6e3608baf7a748e118849c))
- **ui-drilldown:** make Drilldown.Page handle optional Options ([18f6a06](https://github.com/instructure/instructure-ui/commit/18f6a06f6a8b69ed0cd83bae7c11395f34375e9a))
- **ui-icons:** add new ai-info icon ([f5941b1](https://github.com/instructure/instructure-ui/commit/f5941b1fa6b70a57942d9019e02b5160719866db))
- **ui-tree-browser:** add animation prop to TreeBrowser ([5906a0a](https://github.com/instructure/instructure-ui/commit/5906a0acb19564db6b54d0088a7a356b02533c13))

# [10.25.0](https://github.com/instructure/instructure-ui/compare/v10.24.2...v10.25.0) (2025-09-09)

### Bug Fixes

- **ui-a11y-utils:** fix focus region skipping items after Drilldown/scrollbars ([959b340](https://github.com/instructure/instructure-ui/commit/959b340708046df9666e281c42e038d047a7209a))
- **ui-avatar:** avatar now renders images correctly when using SSR ([7d8cc62](https://github.com/instructure/instructure-ui/commit/7d8cc6203bb850e1bed77cf5e85cf9ddeb03306a))
- **ui-buttons:** fix seondary ai iconbutton when shape is circle ([5098202](https://github.com/instructure/instructure-ui/commit/5098202843490098326c41e928811244f65f36c1))
- **ui-dialog,ui-a11y-utils:** fix focus getting stuck in some cases if something is removed from the middle of the focus stack ([eb3f47e](https://github.com/instructure/instructure-ui/commit/eb3f47eef4d1b8199b4e272d2142612b074f4ea1))
- **ui-form-field:** should not change layout when only screenreader-only message is present ([09977a2](https://github.com/instructure/instructure-ui/commit/09977a2595ac3f9c00fc8152ed9cabcfe818338c))
- **ui-heading:** ai heading won't show up on print ([af10476](https://github.com/instructure/instructure-ui/commit/af10476f5302c5e53e87ccf79a0e0f0d988871e2))
- **ui-modal:** fix Modal.body throwing error when 'as' is set to a React component ([350a05c](https://github.com/instructure/instructure-ui/commit/350a05c109ac219a885d0998290d00b20584e168))
- **ui-modal:** fix tabbable modal edge case ([e66ad32](https://github.com/instructure/instructure-ui/commit/e66ad32360a428668204bb8fb1299448af639200))
- **ui-scripts:** fix getGlyphData to ignore system-generated files in the icons folder ([9097301](https://github.com/instructure/instructure-ui/commit/90973018bc5cce8519715696f078874116c59c78))
- **ui-tabs,shared-types:** color tabs.panel focus outline from the theme and make it overridable by brand overrides ([b4f9893](https://github.com/instructure/instructure-ui/commit/b4f989343019620c2a25275eab7beba21230b158))
- **ui-view,ui-buttons:** clarify typing of elementRefs ([f8bdf91](https://github.com/instructure/instructure-ui/commit/f8bdf91544e56f804677be6709f4896ff9176c3f))

### Features

- **ui-flex:** add order prop to Flex.Item ([c563623](https://github.com/instructure/instructure-ui/commit/c56362317573f7bb94f7c1dfb8b2dcee6b59f278))
- **ui-flex:** add order prop to Flex.Item ([0eaa872](https://github.com/instructure/instructure-ui/commit/0eaa87269e1742e54fdaba4a0d8dc199524dcaa4))
- **ui-icons:** add new icons Instructure-3-dot and Instructure-1-dot ([4258567](https://github.com/instructure/instructure-ui/commit/4258567c0ca93955133b46feb1d85c7dcf30988e))
- **ui-icons:** add new icons user-assign and restore ([b617fe3](https://github.com/instructure/instructure-ui/commit/b617fe34b81ea1a120bfb1f539fa945e32e11703))
- **ui-icons:** add new redo and undo icons and modify the documentation page ([fd4f7b9](https://github.com/instructure/instructure-ui/commit/fd4f7b9de454536d04f8d39f19185ed22ae682c4))
- **ui-icons:** add new sidebar-open and sidebar-close icons ([154b534](https://github.com/instructure/instructure-ui/commit/154b534131a89a182b65f60afbf5383ed85c3681))
- **ui-icons:** rename icons ([5dc7995](https://github.com/instructure/instructure-ui/commit/5dc79951fdfa67a95aee478151d519baa2c002d0))
- **ui-menu:** remove fade in/out transitions from menu items ([d3845fb](https://github.com/instructure/instructure-ui/commit/d3845fb81f277c52f69230854ca9c1f15a3a3cab))
- **ui-pagination:** add onMouseEnter to Pagination ([327fe69](https://github.com/instructure/instructure-ui/commit/327fe69f15ac34e2efe5bb6d0580d8e07bcd6147))
- **ui-side-nav-bar:** remove experimental warning from SideNavBar documentation page ([c0cc00d](https://github.com/instructure/instructure-ui/commit/c0cc00d8bde785c51edbfb6325b61046c22050a9))

## [10.24.2](https://github.com/instructure/instructure-ui/compare/v10.24.1...v10.24.2) (2025-08-11)

### Bug Fixes

- **ui-react-utils:** fix "ref is not a prop" warning spam ([5c02971](https://github.com/instructure/instructure-ui/commit/5c029716199b98353c5de589025962bcba4b01b5))

## [10.24.1](https://github.com/instructure/instructure-ui/compare/v10.24.0...v10.24.1) (2025-07-30)

### Bug Fixes

- **ui-heading:** fix Heading rendering as H2 in most cases ([d6e4cd5](https://github.com/instructure/instructure-ui/commit/d6e4cd5f6369f219e70975c95f0e1e1bcb22ced4))
- **ui-motion:** fix Transitions not working on focusable elements ([2dabe86](https://github.com/instructure/instructure-ui/commit/2dabe864fb22ffa3e5280ce38f72bf3e7cf600a3))
- **ui-svg-images:** fix Firefox discarding numeric width/height values ([64a165a](https://github.com/instructure/instructure-ui/commit/64a165a58751354c602a59f779bc97ee817f9413))
- **ui-view,ui-position,ui-popover:** fix 'stretch' placement in Popover/ContextView ([f65acd5](https://github.com/instructure/instructure-ui/commit/f65acd5da879fb814c2e5a0d22319a502851fff3))

# [10.24.0](https://github.com/instructure/instructure-ui/compare/v10.23.0...v10.24.0) (2025-07-18)

### Bug Fixes

- **many:** fix focus ring not respecting theme overrides in Button and FileDrop ([8fffc5d](https://github.com/instructure/instructure-ui/commit/8fffc5db8f41249277283b0ad05be0d158d6d7d7))
- **ui-list:** remove delimiter placeholder after last child ([c1032a0](https://github.com/instructure/instructure-ui/commit/c1032a0d318d1f14840ab6bf49423c6eb92967d1))
- **ui-modal:** remove tabbability from modalBody if there is no scrollbar ([eb790ba](https://github.com/instructure/instructure-ui/commit/eb790ba3a05cb993a006f89b8cccf791ed918303))
- **ui-toggle-details,ui-expandable:** improve typing for onClick prop ([e086e31](https://github.com/instructure/instructure-ui/commit/e086e3194f93565a0314233a10bba804f48c3a16))

### Features

- **ui-color-picker:** add type=button to color preset's buttons for better form handling ([b94ee9f](https://github.com/instructure/instructure-ui/commit/b94ee9fe7afc6cf01463fa785f77aabf53bc975c))
- **ui-react-utils:** safeClonElement to support react 19 ([2c9931f](https://github.com/instructure/instructure-ui/commit/2c9931f4c6d815435e6db14e11f6260bb9df91a7))

# [10.23.0](https://github.com/instructure/instructure-ui/compare/v10.22.0...v10.23.0) (2025-07-09)

### Bug Fixes

- **ui-heading:** fix aria-label not passing when set ([6ac2fc5](https://github.com/instructure/instructure-ui/commit/6ac2fc51830ae2b8b2bb14ba55aaa6cdbeeddf13))

### Features

- **ui-table:** add setHoverStateTo to control the hover state of the Table's row ([60001cd](https://github.com/instructure/instructure-ui/commit/60001cd8439ecacc5eb3dc3a5be1144f7f5faa31))

# [10.22.0](https://github.com/instructure/instructure-ui/compare/v10.21.0...v10.22.0) (2025-07-04)

### Bug Fixes

- **ui-alerts:** fix Alert border radius override and add new prop for custom icon ([78ef567](https://github.com/instructure/instructure-ui/commit/78ef56729411333e4504c7080460df40ff9e718e))
- **ui-modal,ui-dom-utils:** fix Modal focus trap broken when it has a scrollbar ([0e4adf0](https://github.com/instructure/instructure-ui/commit/0e4adf07e17819f08f1004eb0f3b5c0036dc413b))
- **ui-react-utils:** fix an edge-case where safeCloneElement breaks with non-functional refs ([fa78679](https://github.com/instructure/instructure-ui/commit/fa78679d7f9634b0729a66197bb0466444514d4b))
- **ui-text-input:** better IconButton positioning inside TextInput when wrapped inside a Popover ([e39838e](https://github.com/instructure/instructure-ui/commit/e39838ee1149c32ccec2e7e6e17fdbc852571952))
- **ui-top-nav-bar:** ensure Drilldown overflows correctly in small viewports in TopNavBar ([0d32bd0](https://github.com/instructure/instructure-ui/commit/0d32bd08be43fea3279aea66c5a27283193f1809))

### Features

- **many:** add new package (instructure) and three new components: AiInformation, NutritionFacts and DataPermissionLevels ([073be7b](https://github.com/instructure/instructure-ui/commit/073be7b50893e9ab77158ee8a83506eddfbd4113))
- **ui-buttons:** add circular ai icon buttons ([89ff4b3](https://github.com/instructure/instructure-ui/commit/89ff4b3cc28c0fba376418a8f2bd33c290118478))
- **ui-heading,shared-types:** add new aiHeading prop and design. Also add h6 level to heading ([b6c7e0b](https://github.com/instructure/instructure-ui/commit/b6c7e0b9f650dc32ab4b571a8ebabc5ba149c20f))
- **ui-heading,shared-types:** add new aiHeading prop and design. Also add h6 level to heading ([a74236a](https://github.com/instructure/instructure-ui/commit/a74236a4e245b8738e6fa7785806a9586666d33c))
- **ui-icons:** new Mastery Connect icon ([883262d](https://github.com/instructure/instructure-ui/commit/883262dc48d1714c40253b3b680a348f212ea260))
- **ui-pagination:** add prop to customize screenreader label on buttons ([66e222c](https://github.com/instructure/instructure-ui/commit/66e222c943b1b1dbfbcbf8657fa868578e91ba5b))

# [10.21.0](https://github.com/instructure/instructure-ui/compare/v10.20.1...v10.21.0) (2025-06-27)

### Bug Fixes

- **ui-progress:** add aria-label to ProgressBar via the screenReaderLabel prop ([34dfbce](https://github.com/instructure/instructure-ui/commit/34dfbce5b4e9b68fd1bf50d952afe8b69e7d812b))
- **ui-select:** prevent scrolling when last item is hovered in Chrome ([51cd81a](https://github.com/instructure/instructure-ui/commit/51cd81a5360bbbc78d30e7e2489bb0c02b67a470))
- **ui-tabs:** fix bottom border of Tab with scrolling overflow in secondary variant ([dabd148](https://github.com/instructure/instructure-ui/commit/dabd14809ce6372b2605aea6edb6ea1a58c86b13))

### Features

- **ui-color-picker:** add colorScreenReaderLabel prop to provide more color information ([6650445](https://github.com/instructure/instructure-ui/commit/6650445d4ae33a0e7b37b6ed6b1d736f030e310b))
- **ui-heading:** enable setting level for headings with variant ([512c0df](https://github.com/instructure/instructure-ui/commit/512c0df17cd36126b70c0ab0aea77dba6bac08d3))
- **ui-simple-select,ui-select:** add layout prop to Select and SimpleSelect ([94f0a6f](https://github.com/instructure/instructure-ui/commit/94f0a6f99f9e813fe44e6c3111fdb4e5f3708b76))
- **ui-text-input,ui-date-input:** properly support IconButtons inside TextInputs ([40ca6bb](https://github.com/instructure/instructure-ui/commit/40ca6bbaa9d113a34c2477501b34ba4342a044d6))

## [10.20.1](https://github.com/instructure/instructure-ui/compare/v10.20.0...v10.20.1) (2025-06-17)

### Bug Fixes

- **ui-buttons:** fix secondary ai-button in firefox ([d331acd](https://github.com/instructure/instructure-ui/commit/d331acd8772306fe66d9d3797c6c30fb40e9f76c))

# [10.20.0](https://github.com/instructure/instructure-ui/compare/v10.19.1...v10.20.0) (2025-06-13)

### Bug Fixes

- **many:** update dependencies, browsersdb and moment timezone database ([3813636](https://github.com/instructure/instructure-ui/commit/3813636458c901ad4bc74a4d5ae015cb55defcb2))
- **ui-buttons:** make Button have a focus ring in Safari ([54118ac](https://github.com/instructure/instructure-ui/commit/54118ac22f3745c7b34f4da9d1c857951c63f8df))
- **ui-buttons:** remove underline from disabled Button with href ([90e8ce7](https://github.com/instructure/instructure-ui/commit/90e8ce710faf7d71b0a8cbd28940a89d3aa7f065))
- **ui-form-field:** make JAWS read input field labels and form error separately ([9c23166](https://github.com/instructure/instructure-ui/commit/9c23166433a8a4afa4a1b4e358d8d4080f13a23b))
- **ui-modal:** fill the available space if fullscreen prop is set ([6e42d1e](https://github.com/instructure/instructure-ui/commit/6e42d1e8f11266af16c7eb7e2b858eb39ebeec4d))
- **ui-time-select,ui-simple-select,ui-select:** add missing keyboard interactions and fix duplicate SR announcements ([0f7ffa5](https://github.com/instructure/instructure-ui/commit/0f7ffa5b263b0b287ca1c2387e0b902189706cb2))
- **ui-top-nav-bar,ui-popover,ui-drilldown:** automatically set aria-expanded, allow override with shouldSetAriaExpanded ([b8e1367](https://github.com/instructure/instructure-ui/commit/b8e13674a2e700e44162a29ca61ead4fd98ce193))
- **ui-top-nav-bar:** fix focus ring not showing when closing a dropdown ([051eca7](https://github.com/instructure/instructure-ui/commit/051eca7e94f4cb549002bc9d32499f9c3070db6f))
- **ui-top-nav-bar:** fix TopNavBarBrand flashing an outline on hover ([41caeea](https://github.com/instructure/instructure-ui/commit/41caeeae1bc5315959bfdc5e16943387de95f2e7))

### Features

- **many:** add missing inputRef prop to input components ([e1158fb](https://github.com/instructure/instructure-ui/commit/e1158fb7af5426e6ce13efe197c2148e1c5f15f0))
- **ui-icons:** add compare icon, include ai-colored icon in the index, improve svg to jsx conversion ([13b6a04](https://github.com/instructure/instructure-ui/commit/13b6a041d8eabaa4597d626e2eaaf296e3e788c6))

## [10.19.1](https://github.com/instructure/instructure-ui/compare/v10.19.0...v10.19.1) (2025-06-05)

### Bug Fixes

- **ui-drilldown:** fix highlighting first drilldown option if it is in a group ([3cc159b](https://github.com/instructure/instructure-ui/commit/3cc159bb0b6591bfb10eeeb6558dd384b09649d6))
- **ui-modal:** save modal from unnecessary rerender ([a473127](https://github.com/instructure/instructure-ui/commit/a473127b2049b02e5463b71c84a0b803fd9d40d4))
- **ui-top-nav-bar:** truncate TopNavBar menu items properly ([09efff0](https://github.com/instructure/instructure-ui/commit/09efff0810837962309a2e48828ea8fa7322a2cf))
- **ui-utils,ui-select:** make screenreader annouce disabled Select as dimmed in Chrome ([c547c31](https://github.com/instructure/instructure-ui/commit/c547c31b65fd15ebde0f588bbd364d12d1b46615))

# [10.19.0](https://github.com/instructure/instructure-ui/compare/v10.18.1...v10.19.0) (2025-06-03)

### Bug Fixes

- **emotion:** fix proptype definition ([d140fe3](https://github.com/instructure/instructure-ui/commit/d140fe3fcb78b2bb3eeda29014108f956d2226ac))
- **many:** fix "not a valid selector" exception when an option ID contains quotes ([78e0b96](https://github.com/instructure/instructure-ui/commit/78e0b96edf29f3d476ba30b03134f1726bbdd0f4))
- **ui-date-input:** make DateInput2 date parsing work in every locale and timezone ([7d2ed73](https://github.com/instructure/instructure-ui/commit/7d2ed732a4b8608b6fc29996e416b51ac25faf0c))
- **ui-top-nav-bar,ui-buttons:** display a focus ring in TopNavBar if a button has a Popover open ([1a03763](https://github.com/instructure/instructure-ui/commit/1a03763f99db390ec6cea58a71ef118930be64d8))

### Features

- **ui-list,shared-types:** ability to override delimiter color ([915fab3](https://github.com/instructure/instructure-ui/commit/915fab32650480ac3ce2e966eab6ba1e9c6e791e))

## [10.18.1](https://github.com/instructure/instructure-ui/compare/v10.18.0...v10.18.1) (2025-05-29)

### Bug Fixes

- **many:** fix access of colors from theme ([983e580](https://github.com/instructure/instructure-ui/commit/983e580a6e03d2cd590db76aae28f1d6e71004b8))
- **ui-alerts:** add variantScreenReaderLabel prop to Alert to improve screenreader usability ([814a0ea](https://github.com/instructure/instructure-ui/commit/814a0eaebc0cededff575a8ea0cd05f8ec27b6de))
- **ui-tabs:** remove scrollbar from tabs ([7c4e5be](https://github.com/instructure/instructure-ui/commit/7c4e5bedba8c1e9d1972eb702ccacb60c34eb513))
- **ui-top-nav-bar,ui-popover,ui-drilldown:** fix Drilldown's and TopNavBar's keyboard navigation issues ([6d7d3fa](https://github.com/instructure/instructure-ui/commit/6d7d3faa6c9fe8e7f2b987cb11ec2d9b00732d5b))
- **ui-view:** fix focus outline showing when setting a global CSS rule for outline ([00cfba9](https://github.com/instructure/instructure-ui/commit/00cfba9c30df9c58b2543824fa3e9b8967ec0516))

# [10.18.0](https://github.com/instructure/instructure-ui/compare/v10.17.0...v10.18.0) (2025-05-26)

### Bug Fixes

- **ui-alerts:** sotp passing onDismiss to div in Alert ([1ac0a2d](https://github.com/instructure/instructure-ui/commit/1ac0a2d2500e62e3d9892e71f0191c1119e1b529))
- **ui-heading:** add renderIcon prop to fix layout issues ([e69f4ae](https://github.com/instructure/instructure-ui/commit/e69f4ae29fa7138ab49aab2a5493b7cd8f7db49a))

### Features

- **emotion:** [InstUISettingsProvider] should be able to access the current theme ([d13b6c1](https://github.com/instructure/instructure-ui/commit/d13b6c1449d5ae7c2fa6d917c1a5db8d676df5b2))
- **ui-menu:** add prop to focus first element on open ([79c7349](https://github.com/instructure/instructure-ui/commit/79c734991509d84ce678118c0984ddbbac2207f8))
- **ui-themes,shared-types:** add new shadow tokens ([8e28f83](https://github.com/instructure/instructure-ui/commit/8e28f83d4516f0efc61d455b8d2b8ee5cf0a50fe))

# [10.17.0](https://github.com/instructure/instructure-ui/compare/v10.16.4...v10.17.0) (2025-05-20)

### Bug Fixes

- **ui-byline:** remove figure and figcaption ([72af55e](https://github.com/instructure/instructure-ui/commit/72af55e853ad4e1463726eacf9e2e48235dc9d80))
- **ui-checkbox:** remove pointer cursor from disabled checkbox toggle ([796284e](https://github.com/instructure/instructure-ui/commit/796284ecad5af495d369ef467386f21a503fdc0f))

### Features

- **ui-avatar,shared-types:** add new ai color variant ([52545d1](https://github.com/instructure/instructure-ui/commit/52545d10d670722dd0126f99e97cb4e13a4ea814))
- **ui-buttons,shared-types:** add ai-primary and ai-secondary colors to buttons ([47868fc](https://github.com/instructure/instructure-ui/commit/47868fc9fe552c0389183c4e19ae25825fe4bc7d))
- **ui-heading,shared-types:** add ai color ([a00690b](https://github.com/instructure/instructure-ui/commit/a00690b2c3df477298b89ac94055c26be06071b9))
- **ui-scripts:** add new ai-colored icon (temp solution) ([c221a97](https://github.com/instructure/instructure-ui/commit/c221a9772c6c6a3834c21a9e1e17ac7613a3c844))
- **ui-text,shared-types:** add ai-highlight color ([b31d917](https://github.com/instructure/instructure-ui/commit/b31d917938be54364c7931acb64d67b157d77bb5))
- **ui-themes,shared-types:** add new primitive and contrast colors ([c943d27](https://github.com/instructure/instructure-ui/commit/c943d276acc1ca04d7b9026fef210d1ac29ab91a))

## [10.16.4](https://github.com/instructure/instructure-ui/compare/v10.16.3...v10.16.4) (2025-05-09)

### Bug Fixes

- **ui-date-input:** correctly format the DateInput2 placeholder in every timezone ([f8229df](https://github.com/instructure/instructure-ui/commit/f8229df71ae6ad67fc089f7e1ff143842d7a0979))
- **ui-radio-input,ui-checkbox:** fix 'React does not recognize the isRequired prop on a DOM element' on RadioInputGroup and Checkbox ([32bb431](https://github.com/instructure/instructure-ui/commit/32bb43185eb53ce4e452d02e33c41ceaf0c4e2b9))

## [10.16.3](https://github.com/instructure/instructure-ui/compare/v10.16.1...v10.16.3) (2025-04-30)

### Bug Fixes

- **ui-date-input,ui-avatar:** add ref support to functional components ([6a6ba49](https://github.com/instructure/instructure-ui/commit/6a6ba493634a22a515d59b5acbecbc2d93084e0f))
- **ui-focusable:** fix Focusable example using the wrong ARIA tag ([c88b21c](https://github.com/instructure/instructure-ui/commit/c88b21caf85e9dbf213eadec423ac6ab8398a1f7))
- **ui-modal:** set inverseBackground to grey100100 ([2ef4a6b](https://github.com/instructure/instructure-ui/commit/2ef4a6b261d0412b43b690f5f6782bfcea17b7a0))
- **ui-options,ui-menu:** improve hover animations ([fed526c](https://github.com/instructure/instructure-ui/commit/fed526c735cfdc7678fc1ecee3ddf89aedded135))
- **ui-table:** fix table crashing in stacked layout when using falsy children ([cb1b2ae](https://github.com/instructure/instructure-ui/commit/cb1b2ae4c24f00f6ba37f414f52fd4a3fe444edf))
- **ui-time-select,ui-simple-select,ui-select:** make Select accessible for iOS VoiceOver ([b501a7b](https://github.com/instructure/instructure-ui/commit/b501a7b38bfa491298085a173a49a1baa0a19b29))

## [10.16.2](https://github.com/instructure/instructure-ui/compare/v10.16.1...v10.16.2) (2025-04-22)

**Note:** Version bump only for package instructure-ui

## [10.16.1](https://github.com/instructure/instructure-ui/compare/v10.16.0...v10.16.1) (2025-04-22)

### Bug Fixes

- **ui-select,ui-form-field:** fix iOS VoiceOver with Select and SimpleSelect announcing 'readonly' and 'textinput' ([d4378e7](https://github.com/instructure/instructure-ui/commit/d4378e757b2a07c86aa89fe84c063c0406741c10))

# [10.16.0](https://github.com/instructure/instructure-ui/compare/v10.15.2...v10.16.0) (2025-04-11)

### Bug Fixes

- **ui-alerts:** no passthroughProps are set in component so Alert won't pass down props such as id to the underlaying DOM ([e481373](https://github.com/instructure/instructure-ui/commit/e481373d1b16dc26f7c808e4ea31bd8c59e41883))
- **ui-buttons:** fix button border color ([5322f9c](https://github.com/instructure/instructure-ui/commit/5322f9c8d359a394e0ea4caa5dbab982169edddf))
- **ui-text-input:** make TextInput maintain focus when renderAfterInput is conditionally rendered ([c124e16](https://github.com/instructure/instructure-ui/commit/c124e16000e1d60e49372ade27633dbeb48e22ae))

### Features

- **ui-link:** add variants to <Link> ([308bb2f](https://github.com/instructure/instructure-ui/commit/308bb2f0e58cff05fd2358e17f449d6eaadf7d4a))

## [10.15.2](https://github.com/instructure/instructure-ui/compare/v10.15.1...v10.15.2) (2025-04-07)

### Bug Fixes

- **ui-a11y-utils:** prevent clicking on a Tooltip from closing the parent dialog ([89910fa](https://github.com/instructure/instructure-ui/commit/89910fafa6dbd8893965f5787f99972c65f47a1c))
- **ui-buttons:** fix tabindex=0 added unnecessarly to Buttons ([a9a68a4](https://github.com/instructure/instructure-ui/commit/a9a68a447d04e6c5509e0ce785745cdcaea73c54))
- **ui-options:** fix isAndroidOrIOS missing error for some bundlers ([3a383f8](https://github.com/instructure/instructure-ui/commit/3a383f8b188416f71dc888ba552fa9e50376cb31))
- update PropTypes to align with the new spacing tokens ([223d55b](https://github.com/instructure/instructure-ui/commit/223d55bad95e2a3a8b298d622e5b1d0fbab6b289))

## [10.15.1](https://github.com/instructure/instructure-ui/compare/v10.15.0...v10.15.1) (2025-04-03)

### Bug Fixes

- **ui-form-field:** update form error message color to have better contrast ([117433d](https://github.com/instructure/instructure-ui/commit/117433df655ca8fe8c7f72c0a27fc19f0db74402))
- **ui-pagination:** make Pagination wrap on smaller screen sizes and prevent scrollbars ([75e1540](https://github.com/instructure/instructure-ui/commit/75e154062530c141a380624f4590b517d8b9e691))
- **ui-side-nav-bar:** fix crash on null/falsy children ([6473eb6](https://github.com/instructure/instructure-ui/commit/6473eb6980581f72593b466ff3dd2fed392ddae9))
- **ui-utils:** fix 'no matching export' build error ([318fb44](https://github.com/instructure/instructure-ui/commit/318fb447ce30fc6de9efa1651484c71cc810ea37))

# [10.15.0](https://github.com/instructure/instructure-ui/compare/v10.14.0...v10.15.0) (2025-03-31)

### Bug Fixes

- **many:** fix having the same DOM ids if there are multiple instances of InstUI, e.g. module federation ([a0bb4d0](https://github.com/instructure/instructure-ui/commit/a0bb4d0a8d0f8bcca8f565883f56b599eec66fc9))
- **ui-a11y-utils:** make Modal stay open when button is clicked in certain configurations ([4511594](https://github.com/instructure/instructure-ui/commit/45115947077481f6b75cf4a4c909a515c790adc4))
- **ui-form-field:** fix misaligned text when size is exactly at the breakpoint ([142c508](https://github.com/instructure/instructure-ui/commit/142c508992d85ada9c0b70afea50bce0c3bb30d9))
- **ui-side-nav-bar:** make screenreaders announce Badge text in SideNavBar ([fea9f5e](https://github.com/instructure/instructure-ui/commit/fea9f5e0494f37ec59b7bc8699003a490b329134))
- **ui-source-code-editor:** make scrollview in SourceCodeEditor keyboard accessible ([6b3701c](https://github.com/instructure/instructure-ui/commit/6b3701cf076431ec56e0e5cfc720bbdc2114d885))
- **ui-themes,emotion:** fix typos in names of some spacing token ([9bbc6e4](https://github.com/instructure/instructure-ui/commit/9bbc6e4b51e000aa9d9a279224fd890401940a7e))

### Features

- **ui-avatar,emotion:** add theming solution to functional components ([9cbfd35](https://github.com/instructure/instructure-ui/commit/9cbfd35f038aed2942424707ec4669c820e3c820))
- **ui-breadcrumb,ui-tooltip:** add tooltips for truncated breadcrumbs ([1c22bfc](https://github.com/instructure/instructure-ui/commit/1c22bfcb01238b2af8b03db5391013175f487805))

# [10.14.0](https://github.com/instructure/instructure-ui/compare/v10.13.0...v10.14.0) (2025-03-17)

### Bug Fixes

- **ui-file-drop:** fix files and value prop empty when adding a file via drag and drop ([5842034](https://github.com/instructure/instructure-ui/commit/58420341bbdb942fa72fe1c8e416184ede421191))
- **ui-form-field:** do not pass vAlign prop to underlying html element ([78135b0](https://github.com/instructure/instructure-ui/commit/78135b09d7af43d536acafb4350b345896ee30d3))

### Features

- **ui-text,shared-types:** add warningColor to Text component ([dcea4d0](https://github.com/instructure/instructure-ui/commit/dcea4d0762b48c798fb4a17d10c3927355f52f60))

# [10.13.0](https://github.com/instructure/instructure-ui/compare/v10.12.0...v10.13.0) (2025-03-06)

### Bug Fixes

- **many:** fix form label not read by NVDA in hover mode and other layout issues ([ef77281](https://github.com/instructure/instructure-ui/commit/ef77281890511e8eea794196445d3ef2454537ba))
- **many:** fix Tooltip focus issues and make Tooltip closeable inside of a Modal ([3d05afe](https://github.com/instructure/instructure-ui/commit/3d05afe7506eaf81644860edd6f9501bf20de83f))
- **ui-form-field:** fix Select's focus selecting its leaf not instead of the input field ([efe0c4f](https://github.com/instructure/instructure-ui/commit/efe0c4f390beeb34e8cdb047b37500bbc6865b34))
- **ui-pagination:** remove padding from legacy Pagination ([dd2638e](https://github.com/instructure/instructure-ui/commit/dd2638e163505fd9d65359b547fcf34dd4846941))
- **ui-rating:** add text value to Rating examples ([502449d](https://github.com/instructure/instructure-ui/commit/502449d2ab32f0fbc5a5e039d503fa1b97726538))
- **ui-table:** match fontWeight in style to the appropriate theme variabel ([abad1cc](https://github.com/instructure/instructure-ui/commit/abad1cc60880460f1cb854864d2e5eae1f0d38df))
- **ui-view,ui-file-drop,ui-buttons:** make focus ring radius fit the enclosed element's radius ([1283939](https://github.com/instructure/instructure-ui/commit/128393959340cf0408f5c33b094c5d7f721553e9))

### Features

- **ui-date-input:** add feature to disable dates and access the input's ref ([411219e](https://github.com/instructure/instructure-ui/commit/411219e4347c75ed2ffeda320b33c591ffc05329))

# [10.12.0](https://github.com/instructure/instructure-ui/compare/v10.11.0...v10.12.0) (2025-02-24)

### Bug Fixes

- **ui-a11y-utils:** fix focus region missing mouse down target ([e37aee9](https://github.com/instructure/instructure-ui/commit/e37aee990f35c1f4f8afa03181fe996c7d49dc63))
- **ui-color-picker:** add hex to aria-label ([98adf34](https://github.com/instructure/instructure-ui/commit/98adf34bf082919a4aa809e06238633813ca888b))
- **ui-focusable:** make screenreader annouce Tooltip in Focusable example by providing aria props ([e38bce2](https://github.com/instructure/instructure-ui/commit/e38bce2fb08fa98fe1d98667f890a7137e4e2dea))
- **ui-modal:** make Modal's header non-sticky with small window height ([db5c708](https://github.com/instructure/instructure-ui/commit/db5c7082ec4834793d83cf7d6f469c4fbaa83eed))
- **ui-pagination:** remove margin from legacy Pagination ([4dacbf8](https://github.com/instructure/instructure-ui/commit/4dacbf8108d78c68c1946aff0a4ac7570ef8fe6e))
- **ui-select:** fix select's dropdown border radius ([7427773](https://github.com/instructure/instructure-ui/commit/74277738698fd9014a6cd5e4043f717914bc863d))
- **ui-sourcecodeeditor:** link label to input field programmatically ([b092b45](https://github.com/instructure/instructure-ui/commit/b092b457777c2dea480c09da87989cf985a1713e))
- **ui-time-select:** fix TimeSelect showing the wrong value when defaultValue is set and enteting a wrong value after a good one ([9d28a3b](https://github.com/instructure/instructure-ui/commit/9d28a3b5da8c6c60f37c0b60a5a2fe856bec0ffd))
- **ui-time-select:** make allowClearingSelection an optional prop ([fc1264c](https://github.com/instructure/instructure-ui/commit/fc1264cee1750fde1d8391a4da2dfc88485ab07b))

### Features

- **many:** introduce new spacing tokens; add margin prop for more components ([048c902](https://github.com/instructure/instructure-ui/commit/048c902406c00611cd117fb2fb8164a6eba62fb8))
- **ui-icons:** add new icons password-reset, neutral ([c4d2404](https://github.com/instructure/instructure-ui/commit/c4d2404807df9922f4cbaee29ec8d7768711f2e1))
- **ui-popover, ui-select:** allow overriding Select's dropdown border ([1e83164](https://github.com/instructure/instructure-ui/commit/1e83164770430d593f949be72b087295bb42e6b0))
- **ui-popover, ui-select:** allow overriding Select's dropdown border ([90d59d3](https://github.com/instructure/instructure-ui/commit/90d59d3c3689c3a1500c37db363fa43c1b8403d7))
- **ui-select,ui-simple-select:** add support for rendering selected option's before and after content in Select and SimpleSelect input ([87dc52d](https://github.com/instructure/instructure-ui/commit/87dc52dcd2a23acfe50856c05b8ff28c1046f85a))

# [10.11.0](https://github.com/instructure/instructure-ui/compare/v10.10.0...v10.11.0) (2025-02-03)

### Bug Fixes

- **ui-breadcrumb:** add and update aria tags in Breadcrumb and in documentation ([e8db0f2](https://github.com/instructure/instructure-ui/commit/e8db0f20b5f8acc6662a1c8cc7c2530466e6869d))
- **ui-menu:** make Menu.Item apply target prop ([6c85b31](https://github.com/instructure/instructure-ui/commit/6c85b312212edf9f08317d0d6aeb7c28fe1eb3b3))
- **ui-menu:** screenreaders should read the correct number of menu items ([0670648](https://github.com/instructure/instructure-ui/commit/06706488cd4b550594f7a5b2b52ea674c79b0530))
- **ui-pagination:** fix Pagination sometimes displaying non li elements in lists, fix key errors too ([1dbe539](https://github.com/instructure/instructure-ui/commit/1dbe53995c5eca96711024e86151eb0bbcf7e1f4))
- **ui-time-select:** clear input field after setting an empty value ([1993282](https://github.com/instructure/instructure-ui/commit/19932824ebbcc5c927d000d353405ff72c4bf264))
- **ui-tooltip:** ensure Esc key closes only the Tooltip when inside a Modal ([0e6e1e4](https://github.com/instructure/instructure-ui/commit/0e6e1e496ee844f3cfc9d47f2d66c425c05e474f))

### Features

- **shared-types,ui-buttons:** add theme variables for default and hover states for buttons ([43fde61](https://github.com/instructure/instructure-ui/commit/43fde61a9a5beea44b75d56358cf0d886c9da41a))
- **ui-filedrop:** add inputRef prop to make FileDrop focusable ([a3a75e0](https://github.com/instructure/instructure-ui/commit/a3a75e09432ab9fdf376f571ab874c83108df726))
- **ui-icons:** add give-award, grid-view, list-view icons ([1f37f70](https://github.com/instructure/instructure-ui/commit/1f37f70f437ec94c5d56650c9af5f96671563161))

# [10.10.0](https://github.com/instructure/instructure-ui/compare/v10.9.0...v10.10.0) (2024-12-18)

### Bug Fixes

- **ui-date-time-input,ui-form-field:** make DateTimeInput compatible with the new error format ([07c9443](https://github.com/instructure/instructure-ui/commit/07c9443116dc53b1d2da317e42f314ce3e9b9c39))
- **ui-date-time-input:** fix DateTimeInput displaying wrong value of its value is changed in a onChange callback ([69e9d24](https://github.com/instructure/instructure-ui/commit/69e9d2458b520b83eefb131d8de9a9a658f627a0))
- **ui-simple-select:** fix selection getting lost after options have changed ([4e07f9a](https://github.com/instructure/instructure-ui/commit/4e07f9a5b8c7823dfcbf40273e28a448cfae59fb))

### Features

- **many:** add new Typography tokens and update text and heading ([a09fa0f](https://github.com/instructure/instructure-ui/commit/a09fa0f9ee3b92e8b20415e1d57f5f465526936c))

# [10.9.0](https://github.com/instructure/instructure-ui/compare/v10.8.0...v10.9.0) (2024-12-12)

### Bug Fixes

- **ui-pagination:** fix color of pageInput's label ([b91cfe1](https://github.com/instructure/instructure-ui/commit/b91cfe1e77eeeb9956a87ac01d3ee4598d304a5a))

### Features

- **link:** add textUnderlineOffset to Link component theme override ([2b2a997](https://github.com/instructure/instructure-ui/commit/2b2a997d8c255c2568b44c755754a5fa3bdd0468))
- **many:** make meta package export every component and type definition ([dee9abb](https://github.com/instructure/instructure-ui/commit/dee9abb9cbffa4abc9edf48fb7d8ad41fea385b4))
- **shared-types,ui-options,ui-select:** allow to change font weight of selected option item in Select ([6818928](https://github.com/instructure/instructure-ui/commit/6818928536ad0145516c8d7d25eb8079c84089b6))
- **ui-date-input:** add support for custom calendar icon ([a0fff9d](https://github.com/instructure/instructure-ui/commit/a0fff9dc8ab96c45f1cb9bf2d4a49d8ba03b7b2b))
- **ui-number-input:** add customizable icons for increment and decrement buttons ([7be2226](https://github.com/instructure/instructure-ui/commit/7be222651902524f6c166e39f09878542a646d7c))

# [10.8.0](https://github.com/instructure/instructure-ui/compare/v10.7.0...v10.8.0) (2024-12-09)

### Bug Fixes

- **ui-select,ui-text-input:** fix long before elements overflowing in TextInput, Select, SimpleSelect ([ee9cafd](https://github.com/instructure/instructure-ui/commit/ee9cafdd027b9a1caaa0791d1b6dc4f8401c87e7))

### Features

- **shared-types,ui-progress:** add customization options for progressbar ([56308de](https://github.com/instructure/instructure-ui/commit/56308de9aa4b84a9f9f6fb7096b4916014c56b5b))

# [10.7.0](https://github.com/instructure/instructure-ui/compare/v10.6.1...v10.7.0) (2024-12-03)

### Bug Fixes

- **many:** hide required asterisks from screenreaders ([78aec71](https://github.com/instructure/instructure-ui/commit/78aec71d1056df3a43ffd226d993c451a8fe9c1d))
- **ui-color-picker:** make ColorPicker tooltip VoiceOver focusable ([610c0d8](https://github.com/instructure/instructure-ui/commit/610c0d8a03dd9c8b7080c5e2819193b1a7a4f2cd))
- **ui-source-code-editor:** prevent Vite from erroring out during the build in React 16/17 ([c871244](https://github.com/instructure/instructure-ui/commit/c8712447a296fc0e3e436536e983196be27ad388))
- **ui-text-area:** make focus line follow resized textarea ([dd1e12c](https://github.com/instructure/instructure-ui/commit/dd1e12ce7911afb9325be1de118ad976cd9f141a))

### Features

- **ui-icons:** new icons: chart-line,chart-pie,chart-scatter,learnplatform,search-ai,single-metric ([304a29a](https://github.com/instructure/instructure-ui/commit/304a29a4a2d950c62aa159e0db3212239afefc78))
- **ui-link:** update Link's color ([c3f5f37](https://github.com/instructure/instructure-ui/commit/c3f5f37e9d810e889e1ddcd058bb13e336e26097))
- **ui-number-input:** add back options for string input ([ce86cdb](https://github.com/instructure/instructure-ui/commit/ce86cdb91e016878edfeda3260f55bc7fd1db2e3))

## [10.6.1](https://github.com/instructure/instructure-ui/compare/v10.6.0...v10.6.1) (2024-11-26)

### Other

(**Experimental**) It is now possible to run InstUI 10 on the same page with InstUI v9 and v8. This is useful for e.g. module federation where the host app is running InstUI v8/v9 and the guest app wants to be on the latest version. To make this work specific criteria needs to be met:

- Host app needs to be using InstUI v8/v9
- Host app needs to import the `canvas`/`canvasHighContrast` theme before loading the guest app.
- Guest app must use `canvasThemeLocal` or `canvasHighContrastThemeLocal`. These are exported from `ui-themes` and do not have a `variables` field and a `.use()` method.
- Guest app's `InstUISettingsProvider`'s `theme` prop must be set otherwise it will default to a window-level theme
- Overrides specified in global themes are not applied to local themes, you must apply these manually.

These limitations/caveats are necessary to not cause breaking changes, a final iteration of thing change in InstUI v11 will remove some of these limitations.

The following are **deprecated** and will be removed in InstUI v11:

| Deprecation                                | What to use instead?                                                                                     |
| ------------------------------------------ | -------------------------------------------------------------------------------------------------------- |
| `canvas.use()`, `canvasHighContrast.use()` | Wrap all your application roots in `<InstUISettingsProvider>`                                            |
| `variables` field on theme objects         | Use the fields from the object above, e.g. use `canvas.borders` instead of `canvas.variables.borders`    |
| `@instructure/theme-registry` package      | This added the deprecated functions above. Wrap all your application roots in `<InstUISettingsProvider>` |

### Bug Fixes

- **emotion,shared-types:** better TS types for theme objects and their overrides ([c790958](https://github.com/instructure/instructure-ui/commit/c7909580b283ab6808f7c9d0f53b49630bf713d9))
- **shared-types,ui-pagination:** pagination indicators have spacing and coded as a list for a11y ([e6e5a7b](https://github.com/instructure/instructure-ui/commit/e6e5a7b6cda158f16cf0d86787130877b9c22a75))
- **ui-date-input:** fix DateInput2 not working with NVDA ([34fb8e0](https://github.com/instructure/instructure-ui/commit/34fb8e0d0882d7b45580533ed4218b5b306f6075))
- **ui-popover,ui-tooltip:** tooltips should close when esc is pressed ([d91de1c](https://github.com/instructure/instructure-ui/commit/d91de1c418c8fc2ff385593dc2ff938a4ba51914))
- **ui-progress,ui-tag:** remove onClick prop from Tag when callback is not provided. Fix Progress dependency mismatch (test-locator) ([de22f76](https://github.com/instructure/instructure-ui/commit/de22f76fd8fcdf6ef0a25788014da26f5fdfdd0e))

# [10.6.0](https://github.com/instructure/instructure-ui/compare/v10.5.0...v10.6.0) (2024-11-18)

### Bug Fixes

- **many:** adjust border colors to meet a11y contrast standards ([2f47e06](https://github.com/instructure/instructure-ui/commit/2f47e066f7107c67e37ce8b7aff483586cf7a6b7))
- **many:** fix regression where form elements without label got misaligned ([139f7f1](https://github.com/instructure/instructure-ui/commit/139f7f130cd7e8372af869a13cfd50cd6a97fd85))
- **ui-view:** adjust border colors to meet a11y contrast standards ([569072e](https://github.com/instructure/instructure-ui/commit/569072e797c8a91064567d7f4b773beeff9b3c14))

### Features

- **ui-color-picker,ui-color-utils:** add callback for contrast validation information and export validation methods ([e756c7d](https://github.com/instructure/instructure-ui/commit/e756c7dde20158e82483a4541e916ee98a7a93ec))
- **ui-view:** add borderColor prop to ContextView; make borderColor accept HEX code as a string in View ([a823d51](https://github.com/instructure/instructure-ui/commit/a823d51b16f237629e3342ed4195a41a09eefbac))

# [10.5.0](https://github.com/instructure/instructure-ui/compare/v10.4.1...v10.5.0) (2024-11-07)

### Bug Fixes

- do not lose focus when opening the side menu in the docs app ([0b4434d](https://github.com/instructure/instructure-ui/commit/0b4434df712df83f4a6d5e30bdea37b7be544d83))
- docs Github corner has focus ring ([cc742d1](https://github.com/instructure/instructure-ui/commit/cc742d16c6c2a1ac8de9defae1eb53d5db4fc0bd))
- **ui-alerts:** trigger onDismiss for SR only alerts ([98750f6](https://github.com/instructure/instructure-ui/commit/98750f689419aeb85969c93bceb31b2c74a34d68))
- **ui-date-input:** fix DateInput2 to update messages properly ([553a235](https://github.com/instructure/instructure-ui/commit/553a2351fc7f8c6d012d4001ff49c2450d29ee97))
- **ui-options,ui-utils:** subgroup titles in Options are not announced by TalkBack and iOS VoiceOver ([ebdf8f0](https://github.com/instructure/instructure-ui/commit/ebdf8f047cf8541723d494b16432c8248ef5fe1e))
- **ui-tabs:** tabpanel content is not accessible with keyboard navigation when it does not have focusable element ([297cd03](https://github.com/instructure/instructure-ui/commit/297cd039228cda5bf742f3c0ca5d1cbf6a253893))
- **ui-themes:** make all colors available ([46f9e38](https://github.com/instructure/instructure-ui/commit/46f9e38bb9f8ef0cb81ff5685cb7550b663ab896))
- **ui-tree-browser:** treeBrowser collection descriptor is not read by screenreaders ([87623f7](https://github.com/instructure/instructure-ui/commit/87623f77cbad91961c9c390511774001e8fa6177))
- **ui-view:** fix view success colors ([e250b02](https://github.com/instructure/instructure-ui/commit/e250b02bcbd8c12ec57de554df66fe1ef88d7a66))

### Features

- **many:** add new form field error msg style + add asterisk for required fields ([9b03683](https://github.com/instructure/instructure-ui/commit/9b03683dadeef4c5deae2c60bea10686f143ff5d))

## [10.4.1](https://github.com/instructure/instructure-ui/compare/v10.4.0...v10.4.1) (2024-10-28)

### Bug Fixes

- docs screenreader alerts are no longer screenreader focusable ([c225853](https://github.com/instructure/instructure-ui/commit/c2258531aa377b698fe932012112704f1879b501))
- **ui-buttons:** add back ic-brand theme tokens to basebutton ([ff21f05](https://github.com/instructure/instructure-ui/commit/ff21f05ccafe699ebfdb4da3dff6a418e00f0721))
- **ui-toggle-details:** do not put aria-expanded and aria-controls on the toggle if there is nothing to toggle ([82094c3](https://github.com/instructure/instructure-ui/commit/82094c3289dae60946047bbbdf60f768dcd63f4c))
- update license ([1c039d9](https://github.com/instructure/instructure-ui/commit/1c039d9cbf5a3ea99b59803ddde5c6c0b2d76ba5))

# [10.4.0](https://github.com/instructure/instructure-ui/compare/v10.3.0...v10.4.0) (2024-10-16)

### Bug Fixes

- **ui-calendar:** fix duplicate dates for certain timezones ([f9181aa](https://github.com/instructure/instructure-ui/commit/f9181aa88c35eba1e374240505d32bf618c46b04))
- **ui-date-input:** fix messages prop sometimes not populating in DateInput2 ([28d2601](https://github.com/instructure/instructure-ui/commit/28d2601f55ec418e32316b77604ec15d6368d23c))
- **ui-progress,ui-side-nav-bar:** improve a11y for Progress and SideNavBar examples ([2160fdd](https://github.com/instructure/instructure-ui/commit/2160fdd79f0ac671b8f42f06b2f8ec1f4f8b1577))

### Features

- **ui-modal:** modify modal to support less strict children ([40f8ca2](https://github.com/instructure/instructure-ui/commit/40f8ca24e80ceb41e8c5d05d1f9d5e8f77113370))

# [10.3.0](https://github.com/instructure/instructure-ui/compare/v10.2.2...v10.3.0) (2024-10-03)

### Bug Fixes

- **console:** remove **PURE** annotation from console to fix warnings in Vite/Rollup ([48e78bb](https://github.com/instructure/instructure-ui/commit/48e78bbd7c6830bc73aa1916970f3d656ccb54f8))
- **shared-types,ui-table:** fix color contrast for table sorting icons ([b5a60bf](https://github.com/instructure/instructure-ui/commit/b5a60bf4b682e100912d686524a7c4c04f828ea9))
- **ui-pagination:** fix pagination with numberinput when onBlur it calls onPage change every time, even where there are no changes ([38e75c4](https://github.com/instructure/instructure-ui/commit/38e75c4f610455128d0c3d19181a14823e150f4f))
- **ui-progress,ui-range-input:** use just the native HTML elements instead of ARIA tags ([f0fa72c](https://github.com/instructure/instructure-ui/commit/f0fa72c7d716ab2cb0af191debe27db1e911c19a))
- **ui-radio-input:** fixing the issue of TalkBack reading the radio grop options incorrectly ([ff2618e](https://github.com/instructure/instructure-ui/commit/ff2618e517ddf6ed37ec5d7dce65b51e5c133504))
- **ui-simple-select:** ensure input value updates correctly when options change ([4dc7cb2](https://github.com/instructure/instructure-ui/commit/4dc7cb2cfde69d28baaaced32a5e63aea9a48ee1))
- **ui-text-input:** icon in SimpleSelect is vertically centered ([13790d1](https://github.com/instructure/instructure-ui/commit/13790d14ac6eb6135d7ae22b2a29f542ddf95333))

### Features

- **ui-calendar,ui-date-input:** update DateInput2 api, add placeholder hint ([ee9dfab](https://github.com/instructure/instructure-ui/commit/ee9dfab8cb5cff76d829bd24163d2052a7da46a9))
- **ui-menu:** add renderLabelInfo to Menu ([2bc8554](https://github.com/instructure/instructure-ui/commit/2bc85544b5c51aba4a98bc5082b98b8e2e08b06e))

## [10.2.2](https://github.com/instructure/instructure-ui/compare/v10.2.1...v10.2.2) (2024-09-13)

### Bug Fixes

- **docs:** ensure page scrolls to anchor on load when linked ([6928c97](https://github.com/instructure/instructure-ui/commit/6928c972bbbed0073c37c93b4434f4505e80e374))
- **docs:** fix compileMarkdown heading id generation ([ef97c7c](https://github.com/instructure/instructure-ui/commit/ef97c7c034ed712085c69d2a4b575da1da6e2c66))
- **ui-checkbox,ui-radio-input:** reduce clickable area of checkbox and radioinput ([77b2a7d](https://github.com/instructure/instructure-ui/commit/77b2a7d18da19f28328486e53a31f7ca5ec37e74))
- **ui-selectable:** fix Select options not being selectable on iOS Safari with VoiceOver on ([aae996f](https://github.com/instructure/instructure-ui/commit/aae996fa6aed143fe1966fe3463727459a483ccc))
- **ui-toggle-details:** fix ToggleDetails flickering ([cbab3be](https://github.com/instructure/instructure-ui/commit/cbab3befb43f37f5df8b981f757dd857388502e0))

## [10.2.1](https://github.com/instructure/instructure-ui/compare/v10.2.0...v10.2.1) (2024-08-30)

### Features

- **ui-table:** new API that allows to use custom components ([link](https://github.com/instructure/instructure-ui/pull/1652))

# [10.2.0](https://github.com/instructure/instructure-ui/compare/v10.0.0...v10.2.0) (2024-08-23)

### Features

- **many:** add data visualization colors, refactor theme code ([c395e17](https://github.com/instructure/instructure-ui/commit/c395e17a43be9fd7ec9d6854f28ae8584c3667bc))
- **ui-icons:** add new AI icon ([44b02ce](https://github.com/instructure/instructure-ui/commit/44b02ce1dc7123a293793ebc493f9e8446dcc7b2))

# [10.1.0](https://github.com/instructure/instructure-ui/compare/v10.0.0...v10.1.0) (2024-08-23)

### Features

- **many:** add data visualization colors, refactor theme code ([c395e17](https://github.com/instructure/instructure-ui/commit/c395e17a43be9fd7ec9d6854f28ae8584c3667bc))
- **ui-icons:** add new AI icon ([44b02ce](https://github.com/instructure/instructure-ui/commit/44b02ce1dc7123a293793ebc493f9e8446dcc7b2))

# [10.0.0](https://github.com/instructure/instructure-ui/compare/v9.5.1...v10.0.0) (2024-07-31)

### Features

- **many:** rewrite color system ([1e5809e](https://github.com/instructure/instructure-ui/commit/1e5809e28dee8c2a71703a429609b8d2f95d76e6))
- **ui-codemods:** add codemod for v10 color update ([566751b](https://github.com/instructure/instructure-ui/commit/566751b602114752591e5d0cf2fe7d1ab01543f2))

### BREAKING CHANGES

- **many:** Breaks color overrides in certain cases
