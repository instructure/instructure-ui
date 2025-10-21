# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

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

## [9.5.1](https://github.com/instructure/instructure-ui/compare/v9.5.0...v9.5.1) (2024-07-30)

### Bug Fixes

- **ui-color-picker,ui-color-utils:** fix corrupted CJS build ([e1016be](https://github.com/instructure/instructure-ui/commit/e1016be3bc32307f8b05fdf1d4176e4915cc8dd6))
- **ui-modal:** inherit border radius for ModalHeader ([03cf94d](https://github.com/instructure/instructure-ui/commit/03cf94d2d2a2c8f639c9e23eb9af78e38945db60))

# [9.5.0](https://github.com/instructure/instructure-ui/compare/v9.3.0...v9.5.0) (2024-07-26)

**Note:** Version bump only

# [9.4.0](https://github.com/instructure/instructure-ui/compare/v9.3.0...v9.4.0) (2024-07-26)

### Bug Fixes

- **ui-menu:** menuItem's onSelect type did not expose its value and selected types ([c58fff8](https://github.com/instructure/instructure-ui/commit/c58fff8736ac430a8992bce1caa11bf3a1f3f5b7))

### Features

- **ui-date-input,ui-text-input:** add custom validation function and fix small layout issue ([77218be](https://github.com/instructure/instructure-ui/commit/77218be635611c1c674cc6c85d4dceaa76509117))

# [9.3.0](https://github.com/instructure/instructure-ui/compare/v9.2.0...v9.3.0) (2024-07-17)

### Bug Fixes

- **ui-buttons:** do not emit failed prop type warning when setting CondensedButton's color to 'secondary' ([a3587df](https://github.com/instructure/instructure-ui/commit/a3587df46cd86d22cb037694bc397d48196a33d4))

### Features

- **ui-top-nav-bar:** add workaround hack for new topnav design with the old api ([e5b34c0](https://github.com/instructure/instructure-ui/commit/e5b34c0298cc6b45c82f5d2ee3b5ce4c9ff07c28))
- **ui,ui-date-input:** add new DateInput2 component ([9c893fc](https://github.com/instructure/instructure-ui/commit/9c893fc6ac1ae5ef4648f573b648cad78997ac86))

# [9.2.0](https://github.com/instructure/instructure-ui/compare/v9.1.0...v9.2.0) (2024-07-09)

### Bug Fixes

- **ui-drilldown:** index drilldown options to always preserve the correct order ([3159d06](https://github.com/instructure/instructure-ui/commit/3159d06eb7aad8573c2227f379af1e716b09e391))
- **ui-file-drop:** set aria-invalid to true when there are error messages ([67fce51](https://github.com/instructure/instructure-ui/commit/67fce51baa4c0b90409f487a5ad0f6b007ad6831))
- **ui-number-input,ui-pagination:** set numberinput type to number ([19f27f5](https://github.com/instructure/instructure-ui/commit/19f27f57470b4c9c5728009eae6b1fddcbb78695))
- **ui-top-nav-bar:** fix topnavbar item width changing ([88993e2](https://github.com/instructure/instructure-ui/commit/88993e2729f74d8991bcd4d1d215efeac0d7e510))
- **ui-top-nav-bar:** lowered topnavbar zindex so it goes below trays/popovers/modals/etc ([bcfcb84](https://github.com/instructure/instructure-ui/commit/bcfcb844f13c29934ffc4286c6bd51e05a9aaf15))

### Features

- **ui-table:** remove restriction for children types and add documentation ([00e3026](https://github.com/instructure/instructure-ui/commit/00e30266d178c977fe828868b5dc000717dd8e1d))
- **ui-tray:** add optional mask overlay to tray ([8616638](https://github.com/instructure/instructure-ui/commit/8616638d275c82724660ffd29842660aefa36688))

# [9.1.0](https://github.com/instructure/instructure-ui/compare/v9.0.1...v9.1.0) (2024-06-14)

### Bug Fixes

- **ui-buttons:** allow `secondary` option for CondensedButton color ([eca60d3](https://github.com/instructure/instructure-ui/commit/eca60d31b5a083ad60a77d1635c8bc24ef8e3a5f))
- **ui-color-picker:** add styling for disabled state ([7d6d3ad](https://github.com/instructure/instructure-ui/commit/7d6d3ad80a20fe325b397f83a01ac3ae62d0b6ec))
- **ui-react-utils:** remove defaultProps from DeterministicContextProvider ([5c89612](https://github.com/instructure/instructure-ui/commit/5c89612ceb4227f26462929068045bc06f3c080b))
- **ui-tabs:** fix horizontal scrolling with keyboard navigation ([a25c7db](https://github.com/instructure/instructure-ui/commit/a25c7db1ebede622f489dd65872ed8fc5a1b9651))
- **ui-tabs:** fix id generation when null is present as children ([85765ae](https://github.com/instructure/instructure-ui/commit/85765ae3183ac121714cd814a322dcc012ed2f72))
- **ui-top-nav-bar:** keep width unchanged when active status is set to topnavbar.item ([9770827](https://github.com/instructure/instructure-ui/commit/9770827de8968745d9b1c71cea19b3dd94315d0f))
- **ui-top-nav-bar:** show nothing in smallviewportlayout when there is one crumb link ([1c380a9](https://github.com/instructure/instructure-ui/commit/1c380a9943ffc1213d19961dc840181fb26a0308))

### Features

- **shared-types,ui-calendar,ui-select:** add yearpicker functionality to calendar ([2c0c6e0](https://github.com/instructure/instructure-ui/commit/2c0c6e081d96fc821c1296df5c4f1fba9a8c162c))
- **ui-menu:** add maxHeight functionality to Menu ([6494c4a](https://github.com/instructure/instructure-ui/commit/6494c4a78522e5c2a16d55ed5f000b8b7647c47d))
- **ui-tabs:** add option for persisting tabpanels ([6fe73a3](https://github.com/instructure/instructure-ui/commit/6fe73a3ec76c88fcc7baf2f587276de595316dbc))

## [9.0.1](https://github.com/instructure/instructure-ui/compare/v9.0.0...v9.0.1) (2024-05-09)

**Note:** Version bump only for package instructure-ui

# [9.0.0](https://github.com/instructure/instructure-ui/compare/v8.56.0...v9.0.0) (2024-05-09)

### Features

- **instui-cli,ui-codemods,ui-top-nav-bar:** remove desktopConfig prop from TopNavBar.Layout ([d5efe5f](https://github.com/instructure/instructure-ui/commit/d5efe5f76b5af15db6ff9224a501121f35bf1ed9))
- **instui-config,ui-codemods:** remove instui-cli and template packages ([17a4442](https://github.com/instructure/instructure-ui/commit/17a4442b917d0516d6977ab8bc845dd609a84e49))
- set tooling packages to private ([17ab811](https://github.com/instructure/instructure-ui/commit/17ab81187c0ad7778bf3afd1426ece7ee3ca1136))
- **shared-types,ui,ui-navigation:** remove deprecated component Navigation ([0173c76](https://github.com/instructure/instructure-ui/commit/0173c761f050d801f4191b823d423e6e29abedd5))
- **ui-buttons,ui-text:** remove deprecated prop values ([f6b27d8](https://github.com/instructure/instructure-ui/commit/f6b27d84fe9dfbd2987dc5af7edefb093bcb4e1b))
- **ui-dom-utils,ui-react-utils,ui-utils:** remove deprecated utils ([0a8c8e3](https://github.com/instructure/instructure-ui/commit/0a8c8e3230db7a7ec107bb726d1f98375c9446c4))
- **ui-overlays:** remove deprecated props from Mask and Overlay ([e079b81](https://github.com/instructure/instructure-ui/commit/e079b81859dc9dfe69e16ba65a1e1f5c24740640))
- **ui-top-nav-bar:** remove renderName and nameBackground prop from TopNavBar.Brand ([8e48ab5](https://github.com/instructure/instructure-ui/commit/8e48ab5d0302d6205f372a6ddd833cae860aee5b))

### BREAKING CHANGES

- **instui-config,ui-codemods:** instui-cli and template packages has been removed
- **ui-top-nav-bar:** renderName and nameBackground props have been removed
- following packages have been set to private:

* cz-lerna-changelog
* slint-plugin-instructure-ui
* pkg-utils
* ui-babel-preset
* ui-eslint-config
* ui-karma-config
* ui-scripts
* ui-stylelint-config
* ui-webpack-config

- **instui-cli,ui-codemods,ui-top-nav-bar:** desktopConfig prop from TopNavBar.Layout has been removed
- **ui-dom-utils,ui-react-utils,ui-utils:** deprecated utils has been removed
- **ui-overlays:** removed onDismiss prop from Mask and applicationElement from Overlay
- **ui-buttons,ui-text:** deprecated property values has been removed

# [8.56.0](https://github.com/instructure/instructure-ui/compare/v8.55.1...v8.56.0) (2024-05-06)

### Features

- **ui-top-nav-bar:** add onclick prop for hidden menu item ([7228ae1](https://github.com/instructure/instructure-ui/commit/7228ae160a449939f0427222b009b747b0daf926))

## [8.55.1](https://github.com/instructure/instructure-ui/compare/v8.55.0...v8.55.1) (2024-04-30)

### Bug Fixes

- **ui-dialog:** revert ecc0ee8 ([deb44dd](https://github.com/instructure/instructure-ui/commit/deb44ddbe05c472af0ba13d00cc2fa410f15a212))
- **ui-top-nav-bar:** change topnavbar secondary color to porcelaine ([4284cc0](https://github.com/instructure/instructure-ui/commit/4284cc0084b9302335717a52868d8de0a5d26bea))

# [8.55.0](https://github.com/instructure/instructure-ui/compare/v8.54.0...v8.55.0) (2024-04-09)

### Bug Fixes

- **ui-dialog:** menu closes when clicking on submenu ([7e7d1aa](https://github.com/instructure/instructure-ui/commit/7e7d1aae54f5649f0dd2b8c5974bb27f23a9956b))
- **ui-drawer-layout:** fix drawerlayout transition bug ([27ae4f1](https://github.com/instructure/instructure-ui/commit/27ae4f1acda8dd127ff55f2acd44790d7558ebe2))
- **ui-tabs:** fix automatic id generation ([4645981](https://github.com/instructure/instructure-ui/commit/464598168ff9a2fd76fe2e02a8bc7b89f9c1f68f))
- **ui-tray:** make focus trapping work ([048b9b4](https://github.com/instructure/instructure-ui/commit/048b9b436f6c4d9f4a82b47496a7beea774e82a9))

### Features

- **ui-buttons:** add stronger css rules for focused links ([84f2306](https://github.com/instructure/instructure-ui/commit/84f23068c5c03bb4ac64e539ec15abee35c33467))

# [8.54.0](https://github.com/instructure/instructure-ui/compare/v8.53.2...v8.54.0) (2024-03-21)

### Bug Fixes

- **ui-options:** add prop for workaround when VoiceOver doesn't announce the role of the highlighted item ([35ba0b3](https://github.com/instructure/instructure-ui/commit/35ba0b30d4e5589a36ca47bab1c3009251e3cb51))
- **ui-source-code-editor:** make search panel work with older react versions ([76cdaac](https://github.com/instructure/instructure-ui/commit/76cdaac296d8bdcbcf337ef1d95eb8d2e538b993))

### Features

- **ui-date-time-input:** make resetting programatically possible ([a474dab](https://github.com/instructure/instructure-ui/commit/a474daba920a16b6704f89e3c825902902ed1c0b))
- **ui-select:** expose prop to control auto-scrolling in select component ([7cd4c22](https://github.com/instructure/instructure-ui/commit/7cd4c22c83bff1a55481e359199865b176dd26df))

## [8.53.2](https://github.com/instructure/instructure-ui/compare/v8.53.1...v8.53.2) (2024-02-15)

### Bug Fixes

- **ui-source-code-editor:** make search panel react version agnostic ([f917e20](https://github.com/instructure/instructure-ui/commit/f917e20c588d93a30e0681a5c0b1a42e262f7d3e))

## [8.53.1](https://github.com/instructure/instructure-ui/compare/v8.53.0...v8.53.1) (2024-02-09)

### Bug Fixes

- **ui-source-code-editor:** use dependencies instead of devDependencies ([2cfbb4f](https://github.com/instructure/instructure-ui/commit/2cfbb4f5e4ab6f9aeffadd5657cb94965050d618))

# [8.53.0](https://github.com/instructure/instructure-ui/compare/v8.52.0...v8.53.0) (2024-02-08)

### Bug Fixes

- **ui-editable:** fix the Esc key event propagation inside the Editable component ([5223f2f](https://github.com/instructure/instructure-ui/commit/5223f2ff3c4c3d3cc8c9bea32efbdcac3aebdfa3))
- **ui-overlays:** add maskcounter ([fbe4d9e](https://github.com/instructure/instructure-ui/commit/fbe4d9eeaff0699068e43f5b3bb0afb05a206070))
- **ui-text-area:** correct highligh on textarea when using themeOverride ([b657193](https://github.com/instructure/instructure-ui/commit/b6571933c580835e23f0875a2cf385813962db00))

### Features

- **many:** provide defaults to dateInput for easier setup and use ([dcefc4e](https://github.com/instructure/instructure-ui/commit/dcefc4e259118264d76dfd248b01682a7c2ef661))
- **ui-date-time-input:** add initialTimeForNewDate prop to datetimeinput ([33711a3](https://github.com/instructure/instructure-ui/commit/33711a3d899c34913aafd40c7dec90faabc88cd0))
- **ui-date-time-input:** add placeholder to datetimeinput's timeselect ([3ec8cc3](https://github.com/instructure/instructure-ui/commit/3ec8cc31f06ee570b704f88b09739a0868da9ff7))
- **ui-source-code-editor:** add search panel ([991e8fa](https://github.com/instructure/instructure-ui/commit/991e8fa8be7461979ee522426f51e877fbb029e5))

# [8.52.0](https://github.com/instructure/instructure-ui/compare/v8.51.0...v8.52.0) (2024-02-02)

### Bug Fixes

- **console,ui-view:** fix process is not defined issue ([25271d8](https://github.com/instructure/instructure-ui/commit/25271d8cf3d30035316d18e15f0e7fa59050fcff))
- **shared-types:** extend OtherHTMLAttributes with Element ([474fa4d](https://github.com/instructure/instructure-ui/commit/474fa4da4781acc347b993a7c64c52d101b00feb))

### Features

- **ui-calendar:** make easy and minimal configuration possible ([911ac1b](https://github.com/instructure/instructure-ui/commit/911ac1b3c4523455a1e49f0581575952dcfc8605))
- **ui-drilldown,ui-top-nav-bar:** add shouldCloseOnClick ([c3df722](https://github.com/instructure/instructure-ui/commit/c3df7221b185996713a05d06ef585020bfa67c6b))
- **ui-pagination:** refactor Pagination and expand its API for easy config-based usage ([19b928b](https://github.com/instructure/instructure-ui/commit/19b928bd58212dfd2c9cc8b2a550d504bb3df0bc))

# [8.51.0](https://github.com/instructure/instructure-ui/compare/v8.50.0...v8.51.0) (2023-12-14)

### Bug Fixes

- fix review issues ([e2db3dc](https://github.com/instructure/instructure-ui/commit/e2db3dc26324b2a2a83e7c151f757551126d5c77))
- handle Preview errors in docs page ([bbcb307](https://github.com/instructure/instructure-ui/commit/bbcb30761c4c9e1ce3608e587ba7cb8dab7e0bd0))
- **ui-a11y-utils:** use event.detail instead of event.pointerType for safari/firefox ([f58c2d2](https://github.com/instructure/instructure-ui/commit/f58c2d27aa674f1221166b597dc596af40218288))
- **ui-truncate-text:** resizing TruncateText to its original width doesn't work ([d04417b](https://github.com/instructure/instructure-ui/commit/d04417b48d7e16d2bb2a2ad50dff64710219a74d))

### Features

- **ui-date-time-input:** add showMessages prop ([5212a19](https://github.com/instructure/instructure-ui/commit/5212a192b56fed621c80a697579fc164f9592391))
- **ui-top-nav-bar:** add a new variant 'forceIconWithLabel' for TopNavBar.Item ([ad7c8d5](https://github.com/instructure/instructure-ui/commit/ad7c8d513855a9a948aefb22c4e6ec3a25cd53f5))

# [8.50.0](https://github.com/instructure/instructure-ui/compare/v8.49.0...v8.50.0) (2023-12-05)

### Bug Fixes

- fix modal not dismissible via touch and add focus region tests ([e373da1](https://github.com/instructure/instructure-ui/commit/e373da144a96b0615ab0594677f6dae67ab5fa6d))
- **shared-types,ui-heading:** set h1 weight to 700 ([34aa934](https://github.com/instructure/instructure-ui/commit/34aa9341639a2cd5d3f7e9bd22c5b3c682ff6ffc))
- **ui-list:** add fix for nested list items ([614ac7a](https://github.com/instructure/instructure-ui/commit/614ac7a4eaef0fef26e1cadd9e18f349cac5e5d2))
- **ui-pagination:** fix chrome unable to focus undefined element ([503535b](https://github.com/instructure/instructure-ui/commit/503535be262deb6c16547b1c49f72435bd9f2bb1))
- **ui-selectable:** fix label can't be selected issue ([3892896](https://github.com/instructure/instructure-ui/commit/389289665f9e4b0a2664d97e24c005b565df546d))
- **ui-side-nav-bar:** fix scrollbar appearing in closed state ([e84775f](https://github.com/instructure/instructure-ui/commit/e84775f68d99aa301517b1158f43279eef38866e))

### Features

- **ui-avatar:** add showBorder prop to Avatar ([693ea76](https://github.com/instructure/instructure-ui/commit/693ea767282824272360fbdbcea57ad5152fbd0a))

# [8.49.0](https://github.com/instructure/instructure-ui/compare/v8.48.3...v8.49.0) (2023-11-24)

### Bug Fixes

- **shared-types,ui-heading:** change h1 heading weight ([b160d30](https://github.com/instructure/instructure-ui/commit/b160d30b331aaf25bf251576254ce3e8ae937c0f))
- **shared-types:** fix unwanted scrollbar ([ac8da80](https://github.com/instructure/instructure-ui/commit/ac8da8066fb86b41a4776189a60edcfccd2fb088))

### Features

- **shared-types,ui-pill:** change pill according to new design guidelines ([3bd8ee6](https://github.com/instructure/instructure-ui/commit/3bd8ee6316650dc66068f6e4d1a3fbb2fbb09e42))
- **ui-side-nav-bar:** change hover bahaviour of SideNavBar ([924f6b3](https://github.com/instructure/instructure-ui/commit/924f6b32ac78cb138545ffcfea151f693fcbe8d0))

## [8.48.3](https://github.com/instructure/instructure-ui/compare/v8.48.2...v8.48.3) (2023-11-23)

### Bug Fixes

- **ui-a11y-utils:** fix regression in focus region ([43dc1d8](https://github.com/instructure/instructure-ui/commit/43dc1d8efb62bffc2f208de5be817af038d405ca))

## [8.48.2](https://github.com/instructure/instructure-ui/compare/v8.48.1...v8.48.2) (2023-11-21)

### Bug Fixes

- **ui-a11y-utils,ui-popover,ui-tooltip:** fix focus manager issues ([9f59f09](https://github.com/instructure/instructure-ui/commit/9f59f098dd1a8572e9c34ec4a07948c02e19cddd))

## [8.48.1](https://github.com/instructure/instructure-ui/compare/v8.48.0...v8.48.1) (2023-11-17)

### Bug Fixes

- **ui-tray:** fix event listeners not working when a second tray is open ([ca62df5](https://github.com/instructure/instructure-ui/commit/ca62df5f1197b354c3b107ac38cca9984078e495))

### Features

- **ui-top-nav-bar:** add Breadcrumb to TopNavBar ([e340ae9](https://github.com/instructure/instructure-ui/commit/e340ae91fc0eeb961762453db020b80a44d0b70a))

# [8.48.0](https://github.com/instructure/instructure-ui/compare/v8.47.1...v8.48.0) (2023-11-10)

### Bug Fixes

- support multiple decorators with ReactTestUtils ([ef704b4](https://github.com/instructure/instructure-ui/commit/ef704b4c3373d78adac4bb45ec1d6adf84807a9e))
- **ui-modal:** fix second modal closing the first one if two of them are open ([73a3001](https://github.com/instructure/instructure-ui/commit/73a30014becff07438d66ff3b437671b445eef6f))
- **ui-side-nav-bar:** don't allow SideNavBar.Item to inherit global styles ([ded9542](https://github.com/instructure/instructure-ui/commit/ded954273558e2d4193838f4d878d755888c1e25))
- **ui-side-nav-bar:** increase SideNavBar.Item font weight to 400 ([53399e3](https://github.com/instructure/instructure-ui/commit/53399e3c7eb5eb196f5f7554f2fe93b2bc19bf71))

### Features

- **ui-breadcrumb,ui-link:** add onMouseEnter prop ([a52f836](https://github.com/instructure/instructure-ui/commit/a52f836b48bfbd99763e9f5381675e8eabaa22c5))

## [8.47.1](https://github.com/instructure/instructure-ui/compare/v8.47.0...v8.47.1) (2023-11-06)

### Bug Fixes

- **ui-a11y-utils:** fix popover reopen when clicking the trigger ([895cdfc](https://github.com/instructure/instructure-ui/commit/895cdfcf81f2143dbf33d44738626c333ad4a029))
- **ui-drilldown:** fix cmd+click not working on drilldown items ([10e53ff](https://github.com/instructure/instructure-ui/commit/10e53ff8960885a09e5626d95eabbb6590526f52))
- **ui-tray:** fix Tray component unmounting twice when closed ([1ec7647](https://github.com/instructure/instructure-ui/commit/1ec76470479e473377979b2fb1d2a0b4e5f43517))

# [8.47.0](https://github.com/instructure/instructure-ui/compare/v8.46.1...v8.47.0) (2023-10-27)

### Bug Fixes

- **emotion,ui-i18n,ui-react-utils:** make decorated components testable with ReactTestUtils ([3568250](https://github.com/instructure/instructure-ui/commit/3568250981506b20e235845ed7ebb576af5c5920))
- handleDocumentClick should only capture mouse events ([abcd31f](https://github.com/instructure/instructure-ui/commit/abcd31f66a8d895340a800c130e772b557c3ee8f))
- **instui-config:** v7 codemods were not run for BreadcrumbLink and FlexItem ([5b8601e](https://github.com/instructure/instructure-ui/commit/5b8601e74e7cc802fbfbf00f3a431418351a5e03))
- **ui-checkbox,ui-spinner:** remove hover highlight from disabled checkbox ([3fe755f](https://github.com/instructure/instructure-ui/commit/3fe755f65127e3bd18a7ff2a2d974b386ab831b0))
- **ui-date-time-input:** clear TimeSelect value when DateInput value is cleared ([b1a58e5](https://github.com/instructure/instructure-ui/commit/b1a58e5c04822da491966bc0a79403b30749ff7e))

### Features

- **ui-tabs:** add active property to tabs ([5037855](https://github.com/instructure/instructure-ui/commit/5037855e67b322ce07c2ca1c3113ddeb0229f003))
- **ui-top-nav-bar:** add as property to TopNavBarItem ([d471c16](https://github.com/instructure/instructure-ui/commit/d471c167e2292cdfc7011194ebf855adfd0bc814))

## [8.46.1](https://github.com/instructure/instructure-ui/compare/v8.46.0...v8.46.1) (2023-10-13)

### Bug Fixes

- **ui-drawer-layout,ui-tray:** fix multiple mounting during transition ([65a3f95](https://github.com/instructure/instructure-ui/commit/65a3f95a5a4cb8252c22fa61c5a9dc5e5b55011a))

# [8.46.0](https://github.com/instructure/instructure-ui/compare/v8.45.0...v8.46.0) (2023-10-11)

### Bug Fixes

- **ui-react-utils:** fix ID counter wrong when not in context ([29f8885](https://github.com/instructure/instructure-ui/commit/29f8885e0e52c58279f16ca7f65e200fe92344f3))
- **ui-truncate-text:** fix TruncateText not working inside TopNavBar.Item ([5253173](https://github.com/instructure/instructure-ui/commit/52531730991fdc50868fcb6122b6b6b187325863))

### Features

- **ui-spinner): feat(ui-spinner:** add delay prop and functionality to the Spinner ([1f44e5d](https://github.com/instructure/instructure-ui/commit/1f44e5dc81cd5a209ac9d05b87a361f63a0ead9f))

# [8.45.0](https://github.com/instructure/instructure-ui/compare/v8.44.0...v8.45.0) (2023-10-03)

### Bug Fixes

- **ui-color-picker:** add a padding to colorpicker button ([de420dd](https://github.com/instructure/instructure-ui/commit/de420ddd06328b58789474c47121d15894c958a1))
- **ui-drilldown:** call onBackButtonClicked function when ArrowLeft got pressed ([cd5e681](https://github.com/instructure/instructure-ui/commit/cd5e6814746b3fc42530c82c18409c6b7ad34ac3))

### Features

- **ui-view:** add overscroll-behavior to view and flex.item component ([6dc990f](https://github.com/instructure/instructure-ui/commit/6dc990f823ed79df013254ca074ab1ceee719ad3))

# [8.44.0](https://github.com/instructure/instructure-ui/compare/v8.43.1...v8.44.0) (2023-09-21)

### Bug Fixes

- **ui-number-input:** increase specificity for numberinput's input styles ([e761082](https://github.com/instructure/instructure-ui/commit/e7610820aecf58e6965aebcdfe38cc797e8ba1b4))
- **ui-select,ui-simple-select:** add new tests ([e156baa](https://github.com/instructure/instructure-ui/commit/e156baa29c0d8fe70037057a500f1217bc2d51e5))
- **ui-select:** add workaround for safari combobox ([09987bb](https://github.com/instructure/instructure-ui/commit/09987bb97b49eb7dbef934eb1f8590ea2106e08b))
- **ui-tree-browser:** prevent TreeBrowser from breaking keyboard navigation focus order ([0741bc5](https://github.com/instructure/instructure-ui/commit/0741bc548fcfdceaeb2a70b3549f6cc87c70af78))

### Features

- **grid:** add stretch option to vAlign ([7b215b6](https://github.com/instructure/instructure-ui/commit/7b215b61c80e1105ca7fa728e655149df8c07844))

## [8.43.1](https://github.com/instructure/instructure-ui/compare/v8.43.0...v8.43.1) (2023-09-11)

### Bug Fixes

- **ui-time-select:** fix nonpersistent event issue in Timeselect with react 16 ([77bc913](https://github.com/instructure/instructure-ui/commit/77bc9132c0f303eaa9e3ad0d1a7b2f9aab15f5e6))

# [8.43.0](https://github.com/instructure/instructure-ui/compare/v8.41.1...v8.43.0) (2023-09-07)

### Bug Fixes

- **ui-responsive:** round dimensions for query matcher ([5cd4e24](https://github.com/instructure/instructure-ui/commit/5cd4e24c4e9649c6baf1031155fbf192e52eee07))
- **ui-text-area:** fix textarea so selenium tests will pass ([2e54ae3](https://github.com/instructure/instructure-ui/commit/2e54ae34bfee0f44e806ebe3ac2b583d19178bc6))

### Features

- **ui-responsive:** add support for multiple responsive breakpoints ([255a832](https://github.com/instructure/instructure-ui/commit/255a83206b2e920b2bcc7e6ec7b83ae6ecee6053))

# [8.42.0](https://github.com/instructure/instructure-ui/compare/v8.41.1...v8.42.0) (2023-09-07)

### Bug Fixes

- **ui-responsive:** round dimensions for query matcher ([5cd4e24](https://github.com/instructure/instructure-ui/commit/5cd4e24c4e9649c6baf1031155fbf192e52eee07))

### Features

- **ui-responsive:** add support for multiple responsive breakpoints ([255a832](https://github.com/instructure/instructure-ui/commit/255a83206b2e920b2bcc7e6ec7b83ae6ecee6053))

## [8.41.1](https://github.com/instructure/instructure-ui/compare/v8.41.0...v8.41.1) (2023-08-24)

### Bug Fixes

- fix document in undefined SSR errors ([4c6e998](https://github.com/instructure/instructure-ui/commit/4c6e998bd23f1934054c8324262ccab3253fbc5a))
- **ui-dom-utils:** fix findFocusable throwing nullpointer exceptions ([2169bff](https://github.com/instructure/instructure-ui/commit/2169bff9d36647d424ec571b300ef98a635bfc1e))
- **ui-source-code-editor:** fix broken codemirror syntax highlight ([155b42a](https://github.com/instructure/instructure-ui/commit/155b42a29c12777c3c2a6ba58b9ef9d606078f48))

# [8.41.0](https://github.com/instructure/instructure-ui/compare/v8.40.1...v8.41.0) (2023-08-21)

### Features

- **shared-types,ui-theme-tokens:** add new 'desktop' and 'tablet' breakpoints to themes ([bcda3d0](https://github.com/instructure/instructure-ui/commit/bcda3d051e57cd1fc739a07424e08c21f98a1443))

## [8.40.1](https://github.com/instructure/instructure-ui/compare/v8.40.0...v8.40.1) (2023-08-18)

### Bug Fixes

- **ui-color-picker:** add id as allowed prop for color-picker ([2ced2b2](https://github.com/instructure/instructure-ui/commit/2ced2b2b16e3996d67a4e957ff6e2ed02e3db669))

# [8.40.0](https://github.com/instructure/instructure-ui/compare/v8.39.0...v8.40.0) (2023-08-17)

### Bug Fixes

- **ui-color-picker:** fix broken commonjs import for color-picker ([32dbd2b](https://github.com/instructure/instructure-ui/commit/32dbd2bf8f9c735fab84294aa0fb5cf7ed29a1e0))
- **ui-flex:** documentation wording ([b4a1374](https://github.com/instructure/instructure-ui/commit/b4a1374f16837e894c8f8508b46596d450318362))
- **ui-selectable:** move Selectable onClick listener one level down ([5c40100](https://github.com/instructure/instructure-ui/commit/5c4010098f31d867dff6167e1fcbac5c87168f5c))

### Features

- **emotion,shared-types,ui-theme-tokens:** add mediumSmall spacing to themes ([d909ded](https://github.com/instructure/instructure-ui/commit/d909ded14289e363543ddca76f6ac1a451bcf7cf))

# [8.39.0](https://github.com/instructure/instructure-ui/compare/v8.38.1...v8.39.0) (2023-07-21)

### Bug Fixes

- **ui-a11y-utils:** fix modal closing when losing focus ([5deda70](https://github.com/instructure/instructure-ui/commit/5deda7064ed9f20f6693f0ad46c19a89e096a66a))
- **ui-a11y-utils:** fix parent dialog closing when file picker input is closed ([1732297](https://github.com/instructure/instructure-ui/commit/17322976d6474e1ed35521c87fc6f137338edda3))
- **ui-dom-utils:** findFocusable only treats an element as hidden if display is 'none' ([69b3949](https://github.com/instructure/instructure-ui/commit/69b39490e8038e5ab02ec53ec8bd62fe3e876b08))
- **ui-text-area:** add ssr fix for resize observer ([412c7a1](https://github.com/instructure/instructure-ui/commit/412c7a159cb3af6a897e9cf1e47c0fa46398e0ce))
- **ui-text-area:** fix focusring issues in case of horizontal resize ([dcbda2e](https://github.com/instructure/instructure-ui/commit/dcbda2ea0afb1fe19c298dcaf76ab6c8d0b443f5))
- **ui-text-input:** fix textInput, where onFocus fires twice. ([eefd8ce](https://github.com/instructure/instructure-ui/commit/eefd8cef47ec4e9a3d279cc1658636f78e709dc9))

### Features

- **instui-config,shared-types,ui-navigation,ui-side-nav-bar,ui:** add side-nav-bar component and deprecate navigation ([45848bf](https://github.com/instructure/instructure-ui/commit/45848bf5feea16e05c19e559c03e53e4b0637412))

## [8.38.1](https://github.com/instructure/instructure-ui/compare/v8.38.0...v8.38.1) (2023-06-13)

### Bug Fixes

- **ui-dialog,ui-a11y-utils:** fix focusing not yet positioned elements ([f85b825](https://github.com/instructure/instructure-ui/commit/f85b8251e517c4180ccc403d18502e71833ed940))
- **ui-popover:** fix TruncateText in Popover not accepting click events ([27de84b](https://github.com/instructure/instructure-ui/commit/27de84bcab644c71e12e470500b928b8be256e29))

# [8.38.0](https://github.com/instructure/instructure-ui/compare/v8.37.0...v8.38.0) (2023-05-15)

### Bug Fixes

- **shared-types,ui-menu:** menu background overlapping borders ([a8262de](https://github.com/instructure/instructure-ui/commit/a8262de6e96a8a8a564d68df99e405f9f1c9299d))
- **ui-a11y-utils:** dialog closes when release mouse outside ([4989b56](https://github.com/instructure/instructure-ui/commit/4989b568c7c6e7514cd412b5870b5c17af7eae25))
- **ui-date-time-input:** fix onChange event not firing sometimes ([4eaf63c](https://github.com/instructure/instructure-ui/commit/4eaf63c2f9babe167c18c4dacfdaa2230942b1d6))
- **ui-date-time-input, ui-time-select:** Fix committing value issues when allowNonStepInput is true. ([30c9a98](https://github.com/instructure/instructure-ui/commit/30c9a9802a1d5d127ab280934338d32a61fbd5e9))

### Features

- **shared-types,ui-flex:** add `gap` prop to Flex ([e1a3396](https://github.com/instructure/instructure-ui/commit/e1a3396415ade0eeb3eb7c99088506213faefe23))

# [8.37.0](https://github.com/instructure/instructure-ui/compare/v8.36.0...v8.37.0) (2023-04-25)

### Bug Fixes

- **ui-date-time-input:** dateTimeInput does not trigger invalidDateTimeMessage on blur ([307a3f4](https://github.com/instructure/instructure-ui/commit/307a3f4e288aefcc8ae01ef4c39e30015d2c021f))
- **ui-grid:** fix Grid.Col offset style calculation ([91e532c](https://github.com/instructure/instructure-ui/commit/91e532cfbe9bc9da874faaf7b2c6063e2b52fafc))
- **ui-motion:** transition's behavior conflict ([57bbc92](https://github.com/instructure/instructure-ui/commit/57bbc92c64883382c9633d5eb63c265dd0d8a09d))
- **ui-progress:** fix ProgressBar `info` and `success` color in inverse mode ([920fa49](https://github.com/instructure/instructure-ui/commit/920fa49e89f7796faf8a527781a44c6f63f26bac))
- **ui-text-input:** fix TextInput padding calculation vol.2. ([757c04a](https://github.com/instructure/instructure-ui/commit/757c04a15cc17d890aea1c219195c7b4e3f3fc74)), closes [PR#1178](https://github.com/PR/issues/1178)

### Features

- **ui-date-time-input:** allow the user to enter non-step divisible time values ([2cf6c9d](https://github.com/instructure/instructure-ui/commit/2cf6c9d60b09f8279ab618c895be5515f3c5b965))
- **ui-progress:** add `shouldAnimate` prop to ProgressBar ([c528956](https://github.com/instructure/instructure-ui/commit/c528956f81c96df52b07b9dc59ae1e137307c780))
- **ui-source-code-editor:** add `height` and `width` props to SourceCodeEditor ([4e9b1e7](https://github.com/instructure/instructure-ui/commit/4e9b1e73ae10fe51b68e6c5c849f51194bebac85))

### Performance Improvements

- **ui-select:** improve perf for large amount of items ([396a13b](https://github.com/instructure/instructure-ui/commit/396a13b81b0471cfd19329817c563bcddc158828))

# [8.36.0](https://github.com/instructure/instructure-ui/compare/v8.35.1...v8.36.0) (2023-03-23)

### Bug Fixes

- **ui-text-input:** fix padding calculation for before/after element ([fe0f225](https://github.com/instructure/instructure-ui/commit/fe0f225e140d314ac4ad3a6c443fe518bea0f1fb))

### Features

- **ui-badge:** add `display` prop to Badge ([de14020](https://github.com/instructure/instructure-ui/commit/de140203dc916119cde96578173018bb1c9fd958))

## [8.35.1](https://github.com/instructure/instructure-ui/compare/v8.35.0...v8.35.1) (2023-03-10)

### Bug Fixes

- **ui-dialog,ui-drawer-layout,ui-modal,ui-popover,ui-tray:** remove browser reliant `Element` usage ([8c49c42](https://github.com/instructure/instructure-ui/commit/8c49c4277a3fc5b4b3f64cb3cbe00983cb1602e2))
- **ui-dom-utils:** add contenteditable to focusableSelector ([21c0108](https://github.com/instructure/instructure-ui/commit/21c01082a6a6f5ed1e4328aea486f1bef48c05e7))
- **ui-source-code-editor:** sourceCodeEditor doesn't delete text when select all with cmd+a in controlled mode ([89bf43f](https://github.com/instructure/instructure-ui/commit/89bf43fa2cdece4ce5318017eb68298d73d0983e))

# [8.35.0](https://github.com/instructure/instructure-ui/compare/v8.34.0...v8.35.0) (2023-02-17)

### Features

- **ui-time-select:** allow non-step values with allowNonStepInput ([6dace32](https://github.com/instructure/instructure-ui/commit/6dace32d7fbb4d13227ac988b83f521308541204))

# [8.34.0](https://github.com/instructure/instructure-ui/compare/v8.33.2...v8.34.0) (2023-02-10)

### Bug Fixes

- **ui-a11y-utils:** fix type for `removedNodes` and `addedNodes` ([f43c2ff](https://github.com/instructure/instructure-ui/commit/f43c2ffc92e152062bee943ea801b09d669c51a6))
- **ui-color-picker:** axe-check tests failing ([d32f395](https://github.com/instructure/instructure-ui/commit/d32f395d68bae878d7f720bdbb30c4c15300f1d0))

### Features

- **ui-time-select:** added "mountNode" property; ([c7df9a1](https://github.com/instructure/instructure-ui/commit/c7df9a1eb52a181ff89e3782acc918e706fd0016))

## [8.33.2](https://github.com/instructure/instructure-ui/compare/v8.33.1...v8.33.2) (2023-01-25)

### Bug Fixes

- **ui-breadcrumb:** fix prop typing for `Breadcrumb.Link` ([9093c3e](https://github.com/instructure/instructure-ui/commit/9093c3e216144519e63a4d4ea189312ac9422111))
- **ui-modal:** fix screenreader focus order in Chrome ([f32ae67](https://github.com/instructure/instructure-ui/commit/f32ae671b35ec251c7ab3d1e50d15df6bb287308))

## [8.33.1](https://github.com/instructure/instructure-ui/compare/v8.33.0...v8.33.1) (2023-01-06)

### Bug Fixes

- **ui-top-nav-bar:** fix TopNavBar `smallViewport mode` example ([7ddaf8a](https://github.com/instructure/instructure-ui/commit/7ddaf8a06211d20d0d942c935edc67aa4e5f5232))
- **ui-top-nav-bar:** smallViewport menu should close on layout switch ([10cd5a6](https://github.com/instructure/instructure-ui/commit/10cd5a6829c3e57fa107e6b710549620e9c4d275))

# [8.33.0](https://github.com/instructure/instructure-ui/compare/v8.32.1...v8.33.0) (2023-01-04)

### Bug Fixes

- **shared-types,ui-color-picker:** colorPicker css problem ([82ce9e3](https://github.com/instructure/instructure-ui/commit/82ce9e3cc43d566686a15838d95b5e6a81e86239))
- **ui-drilldown:** selectableType=single works like radio buttons ([3a20ddb](https://github.com/instructure/instructure-ui/commit/3a20ddb132bf5efd15f719df1236cd98933f1219))
- **ui-tabs:** tab bar is not scrollable on the left side ([d369138](https://github.com/instructure/instructure-ui/commit/d369138d74edacffd29039c1fe5a99de4990e385))

### Features

- **ui-drilldown:** add `selected` prop to Drilldown.Option which allows controlled behavior ([5776937](https://github.com/instructure/instructure-ui/commit/57769376930e8f6201ce603b9e9e832564db2dd6))
- **ui-icons:** add `arrow-nest` icon ([cb17dff](https://github.com/instructure/instructure-ui/commit/cb17dff42b4533bfe735cc86e71884b428f0e69f))

## [8.32.1](https://github.com/instructure/instructure-ui/compare/v8.30.0...v8.32.1) (2022-12-01)

### Bug Fixes

- **ui-source-code-editor:** update `codemirror` dependencies and fix `rtlMoveVisually` bug ([ae39490](https://github.com/instructure/instructure-ui/commit/ae39490ee8b381a48efd8b19eafa5238a6b1513c))

# [8.32.0](https://github.com/instructure/instructure-ui/compare/v8.31.0...v8.32.0) (2022-11-23)

### Features

- **emotion,ui-babel-preset,ui-source-code-editor:** remove lodash ([4670be5](https://github.com/instructure/instructure-ui/commit/4670be52905aac434f6398001be18995983b5a2d))
- **ui-drawer-layout:** expose `overflow` css props as themeable variables ([f64159c](https://github.com/instructure/instructure-ui/commit/f64159c55dfd374c4359159dfc10963135b0e9e6))

# [8.31.0](https://github.com/instructure/instructure-ui/compare/v8.30.0...v8.31.0) (2022-11-21)

### Bug Fixes

- **ui-tray:** pass `role` attribute to Dialog instead of the `\<span\>` ([5610130](https://github.com/instructure/instructure-ui/commit/56101302f6138e4474bbd14ddba43bddab648759))
- **ui-truncate-list:** take the container padding into accout in the maxWidth calculation ([013ab3b](https://github.com/instructure/instructure-ui/commit/013ab3beda58cd097ccf810394df41ca150c9588))

### Features

- **shared-types,ui,ui-top-nav-bar:** add new `TopNavBar` component ([3f27257](https://github.com/instructure/instructure-ui/commit/3f272572276fb62d7b06005dd46206604c890db2))
- **ui-dom-utils:** add `pseudoElt` parameter to `getComputedStyle` util ([b73434c](https://github.com/instructure/instructure-ui/commit/b73434c9d3fc90e243a178577b6ea865638f8fa3))
- **ui-tray:** pass extra Transition props on Tray ([afcaf92](https://github.com/instructure/instructure-ui/commit/afcaf922b83cb66b5a2ad635c6b5a3f5612cabad))

# [8.30.0](https://github.com/instructure/instructure-ui/compare/v8.29.0...v8.30.0) (2022-10-26)

### Bug Fixes

- **ui-code-editor:** Fix `global` is undefined build error that could come up using certain bundlers(vite, esbuild) by integrating `react-codemirror2` dependency into the `CodeEditor` component. ([1fee246](https://github.com/instructure/instructure-ui/commit/1fee246068aff15d9bdbae882e48431bd73df6a3))

### Features

- **ui-img:** add 'loading' prop to Img component ([0b69af2](https://github.com/instructure/instructure-ui/commit/0b69af2c34cd0ff85a6dbfccfe85abf21ec033c6))

# [8.29.0](https://github.com/instructure/instructure-ui/compare/v8.28.0...v8.29.0) (2022-09-29)

### Bug Fixes

- **ui-text-input:** remove focusring when receiving disabled prop ([f16e88e](https://github.com/instructure/instructure-ui/commit/f16e88ea8d591cc7d042027492e834c3b9090bf1))
- **ui-truncate-text:** impove TruncateText's performance for large amounts of contents ([22fcf14](https://github.com/instructure/instructure-ui/commit/22fcf143c9c1d923205b6ede3582a7edf61ecd37))

### Features

- **ui-dom-utils:** add webcomponent support for certain utility functions ([1bade83](https://github.com/instructure/instructure-ui/commit/1bade83c2d7aea75aa6eac6ceff852bac5186e84))
- **ui-icons:** add `award` icon ([4c7c37c](https://github.com/instructure/instructure-ui/commit/4c7c37ce1c75f28eb35faf621892647d245b8916))
- **ui-icons:** add `predictive` icon ([e9b210b](https://github.com/instructure/instructure-ui/commit/e9b210bb8f6101a257d5c8b019ce474157e6b058))

## [8.28.2](https://github.com/instructure/instructure-ui/compare/v8.28.0...v8.28.2) (2022-09-16)

### Bug Fixes

- **ui:** wrong peer dependency for `react` ([80580a7](https://github.com/instructure/instructure-ui/commit/80580a709d846f612a73dc757a5932cd975d49f8))

## [8.28.1](https://github.com/instructure/instructure-ui/compare/v8.28.0...v8.28.1) (2022-09-12)

### Bug Fixes

- fix issues in some components when using `React.StrictMode` and React 18 ([972bb93](https://github.com/instructure/instructure-ui/commit/972bb93d2835fcca3548d624b1ba2497661b4243))

# [8.28.0](https://github.com/instructure/instructure-ui/compare/v8.27.0...v8.28.0) (2022-09-02)

### Bug Fixes

- **ui-pagination:** wrong type description for Pagination's onClick ([867eb1a](https://github.com/instructure/instructure-ui/commit/867eb1a6c0bcbd2c65d26a23cac643df37a0aad3))

- fix propType for liveRegion ([e9ae7d3](https://github.com/instructure/instructure-ui/commit/e9ae7d396e4c5de5eb1df56666630b92f73a670e))

  **WARNING!** In case of **SSR**(server side rendering) and **Jest** you will need to substitute `Element` from the DOM API because it is used by some components:
  `Element = typeof Element === 'undefined' ? function(){} : Element`.

  ```
  // jest.config.js
  module.exports = {
    ...
    globals: {
      Element: function () {}
    }
  }
  ```

### Features

- **ui-drilldown:** add `minHeight` and `minWidth` props to Drilldown ([7e10b29](https://github.com/instructure/instructure-ui/commit/7e10b2966f4dfb79dfdecca62f12c3f9ba5b62b4))
- **ui-drilldown:** add `positionContainerDisplay` prop to Drilldown ([834302c](https://github.com/instructure/instructure-ui/commit/834302c1510c96bde8436307465fa480957719bc))
- **ui-icons:** add `header` icon ([46932bc](https://github.com/instructure/instructure-ui/commit/46932bcb4fbc3fc98566ae886b44c1005ebeb924))
- **ui-menu:** add `positionContainerDisplay` prop to Menu ([e8ed689](https://github.com/instructure/instructure-ui/commit/e8ed689bacb82b88bde3be3db1ade6ea6ee6ed89))
- **ui-popover:** add `positionContainerDisplay` prop to Popover ([fdcacec](https://github.com/instructure/instructure-ui/commit/fdcacecd6d1a0f52580f9ccd051dfa8e5270baf0))
- **ui-position:** add `containerDisplay` prop to Position ([0fdd83f](https://github.com/instructure/instructure-ui/commit/0fdd83fc06f3d63eadf4bd42bc96e0e8514a5981))
- **ui-responsive:** add `elementRef` prop to Responsive ([be7a338](https://github.com/instructure/instructure-ui/commit/be7a338d330e07f4120565fb61c92dd85518528c))
- **ui-tray:** add `position` theme variable to Tray ([375ed68](https://github.com/instructure/instructure-ui/commit/375ed68a6c38c241d45d3a13f5bb757ed68b9ab2))
- **ui-truncate-list,ui:** add `TruncateList` utility component ([f8b17ea](https://github.com/instructure/instructure-ui/commit/f8b17ea8b60234f746fcd7576f1532f38d5bbe5f))

# [8.27.0](https://github.com/instructure/instructure-ui/compare/v8.26.3...v8.27.0) (2022-07-25)

### Bug Fixes

- code of Conduct and License pages not show ([edf524c](https://github.com/instructure/instructure-ui/commit/edf524c66665ea8a13ca7dd6551f414d7e0e9fba))
- fix TS type and propType for liveRegion prop ([d0143ce](https://github.com/instructure/instructure-ui/commit/d0143ce1e3a252e79b6d7cb0aa1c6c63ec4fdc12))
- **ui-webpack-config:** `iconExample` is missing from SVGIcon and InlineSVG docs pages ([7ef6282](https://github.com/instructure/instructure-ui/commit/7ef62823dff36ce1b4855a2e5ffd9625e373685d))

### Features

- support React 18 ([0a2bf0c](https://github.com/instructure/instructure-ui/commit/0a2bf0cdd4d8bcec6e42a7ccf28a787e4a35bc40))

## [8.26.3](https://github.com/instructure/instructure-ui/compare/v8.26.2...v8.26.3) (2022-07-14)

### Bug Fixes

- **ui-color-picker,ui-date-input,ui-date-time-input,ui-select,ui-simple-select,ui-text-input,ui-time-select:** before/after elements should inherit input color ([7daf257](https://github.com/instructure/instructure-ui/commit/7daf257a8ee491f84de2f00a56becd22636891e3))

## [8.26.2](https://github.com/instructure/instructure-ui/compare/v8.26.1...v8.26.2) (2022-07-11)

### Bug Fixes

- **ui-color-picker:** fix required props for `ColorPicker` and sub-components ([4d38fb6](https://github.com/instructure/instructure-ui/commit/4d38fb61caaf5ca9140403db75d2ae56fe5be46b))

  **WARNING!** Since this commit fixes props that should be required props, some code changes might be needed.

## [8.26.1](https://github.com/instructure/instructure-ui/compare/v8.26.0...v8.26.1) (2022-07-06)

### Bug Fixes

- **ui-date-time-input:** fix enter not applyting date in React 16 ([244bb8d](https://github.com/instructure/instructure-ui/commit/244bb8df0b9955da6eef0ceba23e19e547a6720c))

# [8.26.0](https://github.com/instructure/instructure-ui/compare/v8.25.0...v8.26.0) (2022-06-30)

### Features

- **ui-color-picker:** Add `ColorPicker` component ([1cbd877](https://github.com/instructure/instructure-ui/commit/1cbd87783da67144ffbd1f6ed535ccd370fd4eeb))
- **ui-source-code-editor,ui-code-editor,ui:** add new `SourceCodeEditor` component ([b5064f5](https://github.com/instructure/instructure-ui/commit/b5064f5c767eb2d5c5a6d7f5bb6d05bd689418b5))
- **ui-responsive:** add `display` prop to Responsive ([b5663dc](https://github.com/instructure/instructure-ui/commit/b5663dc883a784e516f09fde682d05e794ea772b))
- **ui-tabs:** expose `defaultOverflowY` theme variable on Tabs.Panel ([a4b9540](https://github.com/instructure/instructure-ui/commit/a4b9540cb4a5f9655714152b1c62617b1b0e3a1f))

##### ColorPicker component

The `ColorPicker` is a versatile component that can be used to select colors and check their contrast ratios.

This commit also adds the [ColorPicker](/#ColorPicker)'s subcomponents as standalone components: [ColorIndicator](/#ColorIndicator), [ColorMixer](/#ColorMixer), [ColorPreset](/#ColorPreset), [ColorContrast](/#ColorContrast).

##### SourceCodeEditor component

A wrapper around the popular [CodeMirror V6](https://codemirror.net/) code editor component. CodeMirror provides a text input field with features like line gutters, syntax highlighting, and autocompletion.
It has better accessibility features than the (now deprecated) [CodeEditor](/#CodeEditor) component that is based on the former [version 5](https://codemirror.net/5/index.html) of CodeMirror.

# [8.25.0](https://github.com/instructure/instructure-ui/compare/v8.24.5...v8.25.0) (2022-06-03)

### Bug Fixes

- **ui-webpack-config:** fix icon fonts not loading correctly ([5947205](https://github.com/instructure/instructure-ui/commit/594720520f74500feb88ca64f3e3697b33434f44))

### Features

- **ui-icons:** add new `configure` icon ([04059ea](https://github.com/instructure/instructure-ui/commit/04059ead31f299766bd01b88105f2793456f1973))
- **ui-icons:** replace the `bank` icon with a new one ([c1c83a1](https://github.com/instructure/instructure-ui/commit/c1c83a1958383800cffa0f86abe512ea9de5468c))

## [8.24.5](https://github.com/instructure/instructure-ui/compare/v8.24.3...v8.24.5) (2022-05-31)

### Bug Fixes

- **ui-a11y-utils,ui-dialog,ui-modal:** calling stale callbacks ([c24cb92](https://github.com/instructure/instructure-ui/commit/c24cb92f62c9a8df7602501c73c69f6b61151812))
- **ui-grid:** modify Ts types for GridCol to accept positive fractions as well ([0f44843](https://github.com/instructure/instructure-ui/commit/0f44843420c27b918ea284ab9066f83fc3c929d7))

## [8.24.4](https://github.com/instructure/instructure-ui/compare/v8.24.3...v8.24.4) (2022-05-27)

### DEPRECATED

This release is deprecated, because we encountered problems during the release.

## [8.24.3](https://github.com/instructure/instructure-ui/compare/v8.24.2...v8.24.3) (2022-05-25)

### Features

- **ui-tree-browser** Add `compareFunc` for fine-grained ordering of the elements.

### Bug Fixes

- **ui-icons-build,ui-icons:** correct `instructure` icon displaying `canvas` logo ([53afffb](https://github.com/instructure/instructure-ui/commit/53afffb68cdee592b6d98380f2b7559659c2caee))

## [8.24.2](https://github.com/instructure/instructure-ui/compare/v8.24.1...v8.24.2) (2022-05-02)

### Bug Fixes

- **theme-registry:** fix theme registry name collision ([7dc4550](https://github.com/instructure/instructure-ui/commit/7dc45504aeda1bf2b904b2b25c3157376e7cf2a9))

## [8.24.1](https://github.com/instructure/instructure-ui/compare/v8.24.0...v8.24.1) (2022-04-29)

### Bug Fixes

- **ui-date-time-input,ui-time-select:** fix selection getting lost after value change ([0604ec5](https://github.com/instructure/instructure-ui/commit/0604ec59c560ca2868fdac84d6f4948f92d38d5b))
- **ui-drilldown,ui-options:** fix VoiceOver and Safari not reading Options.Item elements ([102c13d](https://github.com/instructure/instructure-ui/commit/102c13da991ad65ffde83ca7e0f23cbb760b8c68))

# [8.24.0](https://github.com/instructure/instructure-ui/compare/v8.23.0...v8.24.0) (2022-04-26)

### Bug Fixes

- **ui-date-time-input,ui-time-select:** setting non step divisible value works ([36d76fd](https://github.com/instructure/instructure-ui/commit/36d76fd2e7ab9b12e71bc101531e9d6615b674d5))
- **ui-date-time-input:** fix Date input to fill container in `DateTimeInput` ([4069706](https://github.com/instructure/instructure-ui/commit/40697060749bb4770120e822ef2b2466279b1497))
- **ui-text-area:** add missing `ref` to TextArea ([aa898b3](https://github.com/instructure/instructure-ui/commit/aa898b30de4e1049daf15f0fe4a2145d1994a8f4))
- **ui-text-input:** fix empty TextInput before/after elements having padding ([a5786c9](https://github.com/instructure/instructure-ui/commit/a5786c9083448dc1d7d8b5eecac11788c8b26fec))

### Features

- Docs: Render `Table of Contents` block on docs pages ([a64fbdb](https://github.com/instructure/instructure-ui/commit/a64fbdbe6a2c7eb50450aab15fe54e06459e15f9))
- **theme-registry:** add `theme-registry` package ([63216ef](https://github.com/instructure/instructure-ui/commit/63216ef58cfa3d1d61f85f1d9784cddffeddad72))
- **ui-date-time-input:** allow to disable dates in the calendar
- **ui-date-time-input:** add `rowSpacing` and `colSpacing` props to DateTimeInput ([5e829fa](https://github.com/instructure/instructure-ui/commit/5e829fae6b005f080497818df8b3fff19365aab3))
- **ui-link:** add `role` and `forceButtonRole` prop to Link component ([11828d0](https://github.com/instructure/instructure-ui/commit/11828d0b32844a522d267e189c8bc52aa928843a))

# [8.23.0](https://github.com/instructure/instructure-ui/compare/v8.22.0...v8.23.0) (2022-04-07)

### Bug Fixes

- **ui-codemods:** fix codemod paths in docs (`.ts` instead of `.js`) ([2372045](https://github.com/instructure/instructure-ui/commit/23720451b9e91fc1ba0b31b4f22fff32669a4d59))
- **ui-motion,ui-portal:** fix `ref` for Transition and Portal ([b847d9e](https://github.com/instructure/instructure-ui/commit/b847d9e895d630e5aa10061711d4e31cd6ab8841))
- **ui-simple-select:** revert refactor on SimpleSelect ([a6613e9](https://github.com/instructure/instructure-ui/commit/a6613e9efbf60b08ad06883e70c1f400b033e838))

### Features

- **shared-types,ui-range-input:** add accessible variant for RangeInput handle ([e71453c](https://github.com/instructure/instructure-ui/commit/e71453cd9e012b022e35f607c506174be157d8ec))

# [8.22.0](https://github.com/instructure/instructure-ui/compare/v8.21.0...v8.22.0) (2022-03-31)

### Features

- **ui-drilldown,ui:** add new `Drilldown` component ([44e7e13](https://github.com/instructure/instructure-ui/commit/44e7e13f1720680be9f7e76a3d3ec0cf94e88d5b))

##### Drilldown component

The [Drilldown](#Drilldown) component exists to support navigating and managing tree structures in compact spaces.
It is a diverse component that displays hierarchical data in a fashion that allows the users to “drill down” and dig deeper into the layers (pages) of the data structure.
It has similar look and features to the [Menu](#Menu), [Select](#Select) and [TreeBrowser](#TreeBrowser) components.

# [8.21.0](https://github.com/instructure/instructure-ui/compare/v8.20.0...v8.21.0) (2022-03-30)

### Bug Fixes

- **emotion:** fix text direction not working on simple html elements ([22c25bc](https://github.com/instructure/instructure-ui/commit/22c25bc6520e11e938d19bf258a3b93f5a20e0d5))
- **ui-text-input:** fix Event handling for `TextInput`, so that the focus ring will appear as intended when used as `Popover` trigger ([002505b](https://github.com/instructure/instructure-ui/commit/002505b762a235d29c27eb3fc8b69bcaff7482c2))

### Features

- **ui-icons:** update `stats` and `analytics` icons ([09110e7](https://github.com/instructure/instructure-ui/commit/09110e7bec04cb68273f80dbd601915366f7af50))

# [8.20.0](https://github.com/instructure/instructure-ui/compare/v8.19.0...v8.20.0) (2022-03-22)

### Bug Fixes

- **ui-icons-build,ui-icons:** fix SVG icon optimization script to correctly load config ([cd35e6d](https://github.com/instructure/instructure-ui/commit/cd35e6dd4336bb64ea1df1408f88b76bded816d8))

### Features

- **ui-icons:** add `mini-arrow-double` icon to the Iconography ([6718338](https://github.com/instructure/instructure-ui/commit/6718338e6a3c0c641e837c29e23371707e936ca2))
- **ui-icons:** add new icons: `canvas-logo`, `cloud-upload`, `elevate-logo`, `impact-logo` and `mastery-logo`. ([5e549a0](https://github.com/instructure/instructure-ui/commit/5e549a012dd4d0fa582d6aa8966e08f3575a969b))
- **ui-options:** add `href` prop to Options.Item ([49bf28c](https://github.com/instructure/instructure-ui/commit/49bf28c637f395f7ae5d23c0f676d83a15c2ee43))
- **ui-options:** modify default nested Options padding to have no extra padding ([bfc4f7c](https://github.com/instructure/instructure-ui/commit/bfc4f7cb094d91d25b58a87a24a473363c90796b))
- **ui-table:** add `mini-arrow-double` icon to sortable ColHeaders ([6e60ef1](https://github.com/instructure/instructure-ui/commit/6e60ef176d7f53cba1396a57b3468ffba4898578))

# [8.19.0](https://github.com/instructure/instructure-ui/compare/v8.18.0...v8.19.0) (2022-03-16)

### Bug Fixes

- **ui-babel-preset:** add back removed `@babel/plugin-proposal-optional-chaining` ([435c9ae](https://github.com/instructure/instructure-ui/commit/435c9ae794c15e2bd103f700f8c4e946d91c1b59))
- **ui-options:** fix `themeOverride` prop being passed to the underlying `div` ([669aa58](https://github.com/instructure/instructure-ui/commit/669aa58926b123028bcb9e39427d36910b78b0d1))

### Features

- **emotion:** themeOverride prop to accept function ([505f0bf](https://github.com/instructure/instructure-ui/commit/505f0bfad12aaa4f3d1607a85409f5541246e879))

# [8.18.0](https://github.com/instructure/instructure-ui/compare/v8.17.0...v8.18.0) (2022-02-23)

### Bug Fixes

- **ui-code-editor:** change dynamically imported `CodeMirror` language modes ([8e38d5a](https://github.com/instructure/instructure-ui/commit/8e38d5a2e11e842eafa2fa270e47a261c6ebb626))
  - this fix might cause some `jest` tests to fail, details about [how to fix them](/#CodeEditor)
- **ui-portal:** fix `Portal` not being SSR-able ([cb1375f](https://github.com/instructure/instructure-ui/commit/cb1375f2cda92fc4e659500a2f280fcd6de379f5))
- **ui-radio-input:** fix cursor of radioinput, version toggle in Safari ([0670cf5](https://github.com/instructure/instructure-ui/commit/0670cf5bc27401023eb273a44bdbf8cc79b5efa8))

### Features

- InstUI components can be rendered on the server side (SSR) - [more details](/#server-side-rendering)

# [8.17.0](https://github.com/instructure/instructure-ui/compare/v8.16.0...v8.17.0) (2022-02-07)

### Bug Fixes

- remove type:"commonjs" from package.json files ([0b243be](https://github.com/instructure/instructure-ui/commit/0b243bee389ee14493e6b3dbb30a8b660c295d3d))
- **ui-scripts:** remove package.json with type:"module" from es folders ([da3f5ef](https://github.com/instructure/instructure-ui/commit/da3f5ef4f57a6b423e3ba08fb8148bb6456c473d))

### Features

- **ui-responsive:** modify Responsive "props override" error to warning ([4935fa8](https://github.com/instructure/instructure-ui/commit/4935fa840983f4e6f8333d450e2dc965f8c08dbc))

# [8.16.0](https://github.com/instructure/instructure-ui/compare/v8.15.0...v8.16.0) (2022-02-03)

### Features

- **ui-select:** add `optionsMaxHeight` prop to Select ([cf361bf](https://github.com/instructure/instructure-ui/commit/cf361bf41dcef00548cd7a9053f44bec32c58f6a))
- **ui-simple-select:** add `optionsMaxHeight` prop to SimpleSelect ([c205f80](https://github.com/instructure/instructure-ui/commit/c205f80a35a46812abacb6cdfaadbc0de76beea4))

# [8.15.0](https://github.com/instructure/instructure-ui/compare/v8.14.0...v8.15.0) (2022-01-26)

### Bug Fixes

- **emotion:** make theme componentOverrides apply to Buttons ([8a3583e](https://github.com/instructure/instructure-ui/commit/8a3583edd65823b7e241e1350e2f100555663d57))
- **ui-code-editor:** should tab out from the editor when it's readonly ([bcd0bf6](https://github.com/instructure/instructure-ui/commit/bcd0bf6a1afd5fbfcec3fe4bd55199338b695339))
- **ui-range-input:** fixed empty label when `displayValue={true}` but has no `value`/`defaultValue` ([f238a9f](https://github.com/instructure/instructure-ui/commit/f238a9fe6b89c5d49b71b3df7bfd22785b198ed9))

### Features

- **ui-buttons:** deprecate `string` value for BaseButton and CloseButton `tabIndex` ([b1ff461](https://github.com/instructure/instructure-ui/commit/b1ff4615e6f67e7e53a3dc497bcfabe81bc47667))
- **ui-options:** add `description` and `descriptionRole` props to Options.Item ([a2cfa0c](https://github.com/instructure/instructure-ui/commit/a2cfa0cd8bf43d6072f1b352bbd6e43542081be8))
- **ui-options:** add props to set the vALign of Options.Item before/after content ([be635ba](https://github.com/instructure/instructure-ui/commit/be635ba5c734c0a40f9778131b251f32decddb75))
- **ui-overlays:** deprecate unused props: `applicationElement` of Overlay, `onDismiss` of Mask ([4c32099](https://github.com/instructure/instructure-ui/commit/4c3209999c7ae16939ea945b73d450312f228a5d))
- **ui-text:** deprecate the `warning` color variant for Text ([8e021a5](https://github.com/instructure/instructure-ui/commit/8e021a5b3e516729ccff9817aa74274df2268906))

# [8.14.0](https://github.com/instructure/instructure-ui/compare/v8.13.0...v8.14.0) (2021-12-16)

### Bug Fixes

- **ui-drawer-layout:** fix tray direction calculation ([ee3d106](https://github.com/instructure/instructure-ui/commit/ee3d106854950635178dd6fe076ade7ad8924abf))
- **ui-icons:** make `arrow-double-end` and `arrow-double-start` icons to be bidirectional ([7f86f28](https://github.com/instructure/instructure-ui/commit/7f86f28942ab56c7d2167bb4fb65502fc0a74d48))
- **ui-text-input:** fix `htmlSize` prop to accept only numbers ([1b5f16b](https://github.com/instructure/instructure-ui/commit/1b5f16b9e66601381a06aa50bcf709e29720ab4e))

### Features

- **ui-number-input,ui-pagination:** add Pagination `input` variant, NumberInput `textAlign` prop ([5b90d60](https://github.com/instructure/instructure-ui/commit/5b90d608fd51296ae04e353e991f50a373c592c5))
- **ui-pagination:** add new arrow button features ([80a43fe](https://github.com/instructure/instructure-ui/commit/80a43fe967206e9a026a9d61236a227e9a6bb184))

### Deprecations

- **ui-navigation:** the [`Navigation`](https://instructure.design/#Navigation) component has been deprecated and will be removed from instructure-ui in version 9 ([5605b7f](https://github.com/instructure/instructure-ui/commit/5605b7ff0123fb323ba0c730d409ac18c09a5b20))

# [8.13.0](https://github.com/instructure/instructure-ui/compare/v8.12.0...v8.13.0) (2021-12-01)

### Bug Fixes

- **ui-popover,ui-tooltip:** fixed Tooltip triggers being transformed to links/buttons ([07b0037](https://github.com/instructure/instructure-ui/commit/07b0037b0ddaf6d4f19cca140fc82fc9a2f1efc9))
- **ui-text-area:** fix jumping scroll issue ([9f4d9f9](https://github.com/instructure/instructure-ui/commit/9f4d9f91f603496ac87a04d953afe7fe9004874d))

### Features

- **canvas-theme,ui-theme-tokens,ui-themes:** update canvas theme colors ([a72237d](https://github.com/instructure/instructure-ui/commit/a72237dc213b86aa8f18da2618559ea4c118e1dd))
- **instructure-theme,ui-theme-tokens,ui-themes:** update Instructure theme colors ([07352f5](https://github.com/instructure/instructure-ui/commit/07352f5708a83600427460dfdbfda42e8c747d02))
- **ui-badge:** add `inverse` variant to Badge ([036388d](https://github.com/instructure/instructure-ui/commit/036388de53addbf7a2ca8b20c48fda441057aa5e))
- **ui-form-field:** make FormField messages accept `ReactNode` text, not just `string` ([4d36973](https://github.com/instructure/instructure-ui/commit/4d369733414715a70bae0628378e8d82214eab3e))
- **ui-tree-browser:** add 'sortOrder' property to TreeBrowser component ([e669e54](https://github.com/instructure/instructure-ui/pull/776/commits/e669e5405864b26c6f98b378e11cef6603fcca58))
- **ui-view:** vendor prefix all view style props ([4814652](https://github.com/instructure/instructure-ui/commit/48146521e58bef8e0f75c299278072c715448277))

# [8.12.0](https://github.com/instructure/instructure-ui/compare/v8.11.1...v8.12.0) (2021-11-17)

### Bug Fixes

- **emotion:** fix EmotionThemeProvider falling back to using Canvas theme ([cc5ce19](https://github.com/instructure/instructure-ui/commit/cc5ce19b934d6d6f54117e75432a6fb7e65c80ea))
- **ui-avatar:** add unset logic for image loaded state ([e6665c1](https://github.com/instructure/instructure-ui/commit/e6665c159832d0020d7da263be0e959c41589135))
- **ui-dialog,ui-drawer-layout:** fix Dialog role attribute ([2681e14](https://github.com/instructure/instructure-ui/commit/2681e145ad469e1396536d3e9eed75a19995eb8a))
- **ui-modal:** fix Modal.Header padding when it has CloseButton ([82b8314](https://github.com/instructure/instructure-ui/commit/82b8314a5ce13ef30c3f03125b1e2104ba81c889))
- **ui-motion:** fix interrupted transition not removing transition classes ([db3fd4f](https://github.com/instructure/instructure-ui/commit/db3fd4f6ad76471dce61cc91f8267c1eb3094020))
- **ui-scripts:** resolve webpack 5 commonjs build issue ([d51a85e](https://github.com/instructure/instructure-ui/commit/d51a85e4ec89d499dd5466623fc2efc85e3bddcf)), closes [#778](https://github.com/instructure/instructure-ui/issues/778)
- **ui-time-select:** fix timeselect highlight behaviour ([9653a89](https://github.com/instructure/instructure-ui/commit/9653a896e80ba4d73335225e80807746a232d96d))

### Features

- **shared-types,ui-checkbox,ui-radio-input:** make checkbox and radio borders consistent ([a6aaef2](https://github.com/instructure/instructure-ui/commit/a6aaef20508325ae9e5bfbbb29317174edebce9c))
- **ui-avatar:** add `hasInverseColor` prop to Avatars ([feef554](https://github.com/instructure/instructure-ui/commit/feef5549628027c176009575463e187f95a0affd))
- **ui-avatar:** add `renderIcon` prop to Avatar ([d7233d8](https://github.com/instructure/instructure-ui/commit/d7233d876cf2a6a968f764ad05e6dd1544b62f5f))
- **ui-date-input:** add display prop to DateInput for fluid width ([10d1551](https://github.com/instructure/instructure-ui/commit/10d1551b961c568d88c9c5f3393815f637662995))
- **ui-date-time-input,ui-i18n,ui-time-select:** add DateTimeInput ([1054ae9](https://github.com/instructure/instructure-ui/commit/1054ae96aa246cc77547d114d0afc47236996bdb))
- **ui-icons:** add `arrow-double-start, arrow-double-end` icons ([e3249d2](https://github.com/instructure/instructure-ui/commit/e3249d228eabac5bb98ff5d22e5881f2fe042606))
- **ui-tabs:** update Tabs focus styles to inset focus ring ([3a59c3f](https://github.com/instructure/instructure-ui/commit/3a59c3f0443db81631c4f4d5dafe5778389e8dbc))

## [8.11.1](https://github.com/instructure/instructure-ui/compare/v8.11.0...v8.11.1) (2021-10-19)

### Bug Fixes

- **ui-options,ui-select,ui-simple-select:** fix icon positioning ([8536a1c](https://github.com/instructure/instructure-ui/commit/8536a1c9badcd8c1d2ce55dfb462d1899e3ca500))

# [8.11.0](https://github.com/instructure/instructure-ui/compare/v8.10.2...v8.11.0) (2021-10-15)

### Note:

The `bidirectionalPolyfill` util [has been deleted](https://github.com/instructure/instructure-ui/pull/736). With the release of Safari 15 (Sep 20, 2021) all of our supported browsers (last 2 major versions) can handle [CSS Logical Properties](https://caniuse.com/css-logical-props) without any polyfills and prefixes, so this util was no longer needed.

### Bug Fixes

- **ui-menu:** fix menu tooltip position ([e60a4a9](https://github.com/instructure/instructure-ui/commit/e60a4a9f63b02052a6eb83aafb5ba9338213057b))
- **ui-svg-images:** fix icons getting cropped in zoomed windows ([732ac88](https://github.com/instructure/instructure-ui/commit/732ac885d8fdad2ae1cbccb81faebcd96ee9c2f3))

### Features

- **ui-modal:** add `spacing` prop to `Modal.Header` ([3887f80](https://github.com/instructure/instructure-ui/commit/3887f809f87137e161587a56dc23f134f3e2e64e))

## [8.10.2](https://github.com/instructure/instructure-ui/compare/v8.10.1...v8.10.2) (2021-10-01)

### Note:

This version contains no new Features or Bug Fixes. But internally we have changed how we access the DOM to be in line with React best practices.

`Warning: XYZ doesn't have "ref" property. ReactDOM.findDOMNode is deprecated in Strict mode, consider using refs instead. From InstUI v9, components must have the "ref" property for findDOMNode to work.`

If you see warnings like the one above, please read this article on how to update your code here: [Accessing the DOM](/#accessing-the-dom)

## [8.10.1](https://github.com/instructure/instructure-ui/compare/v8.10.0...v8.10.1) (2021-10-01)

### Bug Fixes

- **ui-popover:** popover does not update on certain prop changes ([93b506f](https://github.com/instructure/instructure-ui/commit/93b506fe0860718ebe2cc2729fd023e3e7489231))

# [8.10.0](https://github.com/instructure/instructure-ui/compare/v8.9.1...v8.10.0) (2021-09-28)

### Bug Fixes

- **emotion,ui-i18n:** decorator adds allowedProps property ([ddc7880](https://github.com/instructure/instructure-ui/commit/ddc7880d5a2f7d4d0596332e8d49cb9b1de68024))
- **ui-dom-utils:** remove el.contentWindow.document from getFrameDocumentSafe ([bf1e82e](https://github.com/instructure/instructure-ui/commit/bf1e82efccb682510708448efd369eddaa24f74b))
- **ui-tabs:** Fix small typo in ui-tabs readme ([6a2a770](https://github.com/instructure/instructure-ui/commit/6a2a7703791c742cbc3ea00dc66ccec21f2810d6))

### Features

- **ui-tabs:** add 'fixHeight' prop to Tabs ([b63e6e7](https://github.com/instructure/instructure-ui/commit/b63e6e71705efa7880195ea1e40b3eac67db06b9))

## [8.9.1](https://github.com/instructure/instructure-ui/compare/v8.9.0...v8.9.1) (2021-09-16)

### Bug Fixes

- **shared-types:** fix types not getting published ([000c779](https://github.com/instructure/instructure-ui/commit/000c779bb16c575bcfeb4a6c71d8cef1d768db01))

# [8.9.0](https://github.com/instructure/instructure-ui/compare/v8.8.0...v8.9.0) (2021-09-15)

### Bug Fixes

- fix shared-types TS errors ([7b83164](https://github.com/instructure/instructure-ui/commit/7b83164f4c5872f3a217e010563f59bf584ae4fc))

### Features

- **ui-icons:** add `immersive-reader` icon ([d5d6d4c](https://github.com/instructure/instructure-ui/commit/d5d6d4cd8f300e8635c69248f5d794c002269e08))

# [8.8.0](https://github.com/instructure/instructure-ui/compare/v8.7.0...v8.8.0) (2021-08-27)

### Bug Fixes

- link correct source code on docs page for legacy versions ([82dbb18](https://github.com/instructure/instructure-ui/commit/82dbb184f669557af7a84555300888d4d947e931))
- **ui-billboard:** fix heading margin when `size` is `small` ([36505bb](https://github.com/instructure/instructure-ui/commit/36505bb58e027753a61efc9a1137d2917fa70718))

### Features

- **ui-alerts:** add `hasShadow` property to Alerts ([7c0bca0](https://github.com/instructure/instructure-ui/commit/7c0bca0b3d6f480d1a3f2f4617e3ccfa5c617625))
- **ui-icons:** add `button-and-icon-maker` icon ([6764ecd](https://github.com/instructure/instructure-ui/commit/6764ecd92375fc8e5e8854333b6530de95a0dbe2))
- **ui-icons:** add `subtitles` icon ([1470957](https://github.com/instructure/instructure-ui/commit/14709575f6b463318a3c490ad8bc0637aca08a67))
- **ui-karma-config:** tests can be run from the IDE ([fafddf9](https://github.com/instructure/instructure-ui/commit/fafddf9dbf0a4a6575968eef73d0ba833daf670c))
- add better TypeScript types for multiple packages

# [8.7.0](https://github.com/instructure/instructure-ui/compare/v8.6.0...v8.7.0) (2021-07-16)

### Bug Fixes

- **ui-dom-utils:** remove supportsObjectFit from the repo, since it was for IE11 support ([1a94c52](https://github.com/instructure/instructure-ui/commit/1a94c525836b81bf0de2b54c1bbea3efe38aea67))
- **ui-dialog:** cleanup pending timeouts on unmount ([02d1cdf](https://github.com/instructure/instructure-ui/commit/02d1cdf4801dc578fed25e9f327f089aa37d0e92)), closes [#623](https://github.com/instructure/instructure-ui/issues/623)
- **ui-options:** add aria-hidden to Options label span ([29dab5a](https://github.com/instructure/instructure-ui/commit/29dab5a03f1125f6cb07ff2ab2e00470c32d0753))
- emotionThemeProvider examples not working in Codepen ([545b326](https://github.com/instructure/instructure-ui/commit/545b326d1db14b389b0010cf8758bdf356cd7168))

### Features

- **ui-avatar:** add `color` prop for setting the color of the initials ([7c65e4e](https://github.com/instructure/instructure-ui/commit/7c65e4e4f49ca0b0d803beb042ddef97df3a1b5d))
- **ui-avatar:** add `xx-small` and `xx-large` sizes to Avatar ([cee3840](https://github.com/instructure/instructure-ui/commit/cee38402fec15fbcba5779a42bf2de4aa9e598bb))
- **ui-avatar:** loaded image in `Avatar` has box-shadow instead of border (small visual change!) ([8eb9075](https://github.com/instructure/instructure-ui/commit/8eb9075ca2dc04eefb88875772637c3372dbdde2))
- **ui-icons:** add `important-dates` icon ([3a3b2d8](https://github.com/instructure/instructure-ui/commit/3a3b2d8a273aeeea72f77ede0e853d4592327cce))
- **ui-icons-build:** update `gulp-svgmin` dependency to v4 ([31de5b2](https://github.com/instructure/instructure-ui/commit/31de5b2a6a3eda82cfd16ba54661b4b8dc58ff90))
- **ui-i18n:** Deprecate DateTime. This is a thin wrapper around moment.js, please use moment or some other time library instead.
- **ui-portal:** remove `SubtreePortal` private component, not needed with react 16 ([396ea60](https://github.com/instructure/instructure-ui/commit/396ea6081bc26673b2ac59dd9adf72e2e9fa6ff2))
- **ui-scripts:** update `http-server` dependency from `^0.11.1` to `^0.12.0` ([8ccef24](https://github.com/instructure/instructure-ui/commit/8ccef242c0d194ab3af52fa189ffa3f485a9ba41))
- **ui-time-select:** replace moment.js with dayjs. We only support locales, supported by canvas. (https://community.canvaslms.com/t5/Canvas-Basics-Guide/What-languages-does-Canvas-support/ta-p/19) ([11211fc](https://github.com/instructure/instructure-ui/commit/11211fc4435dfb3fc2f5e69566d449203b92dfff))
- add support for React 17 ([f647826](https://github.com/instructure/instructure-ui/commit/f64782688b404f950e03c7f83a8328f0ca588248))
- remove polyfills, since all supported browsers are feature rich enough ([40d3a65](https://github.com/instructure/instructure-ui/commit/40d3a650f9fd563896ae087243b5e051704e4160))

# [8.6.0](https://github.com/instructure/instructure-ui/compare/v8.5.0...v8.6.0) (2021-06-18)

### Bug Fixes

- **ui-popover:** inverse color Popover without arrow shouldn't have light border ([e7eea77](https://github.com/instructure/instructure-ui/commit/e7eea778a25070f55e3226664a20bb45ea2275c8))
- **ui-popover:** recalculate offset and position on prop change ([c35c9f2](https://github.com/instructure/instructure-ui/commit/c35c9f24729ba23551a4cf48f5fbe19c30b7e182))
- **ui-test-sandbox:** fix issue with `emotion` can't insert node inside `head` ([361909c](https://github.com/instructure/instructure-ui/commit/361909c3718c35d190d4249918cc0bf7db6e93dc))

### Features

- **ui-menu:** propagate offset props from `Menu` to `Popover` ([ad54d1f](https://github.com/instructure/instructure-ui/commit/ad54d1f86585568dbe3a5b5aa6bd6b2711045b27))
- add "tabbing out" logic to the `Drilldown Menu` pattern ([d5e5db3](https://github.com/instructure/instructure-ui/commit/d5e5db351c0425ad157af24305d4d540cd9f97f6))
- **ui-icons:** add crop, rotate-right and rotate-left icons ([1d91032](https://github.com/instructure/instructure-ui/commit/1d9103226033768cfc150d9ff2f36f5de1cae0b5))
- **ui-options:** add option to recolor the icon of Option.Item ([39e1caf](https://github.com/instructure/instructure-ui/commit/39e1caf04dc2e89c9dd812d85cc7af008262b104))
- **ui-select,ui-simple-select:** pass option props to the label before/after render prop ([d548752](https://github.com/instructure/instructure-ui/commit/d548752fc0d7ba5d7943622d136d7022858bf8e2))

### Performance Improvements

- **ui-buttons:** use span instead of Flex ([e019e94](https://github.com/instructure/instructure-ui/commit/e019e94c7c8bce8434f7b348b7d9fd8e96b76191))
- **ui-text-input:** replace Flex with styled spans ([51c3922](https://github.com/instructure/instructure-ui/commit/51c3922e3af43695476dc1a81014babc87c6aac6))

# [8.5.0](https://github.com/instructure/instructure-ui/compare/v8.4.0...v8.5.0) (2021-06-09)

### Bug Fixes

- **emotion:** add componentId to match with componenet name in docs ([cc255eb](https://github.com/instructure/instructure-ui/commit/cc255ebef149ffe19a2102a179c1e7765b633888))
- **ui-tree-browser:** properly hide root collection if rootId === 0 ([1fb53c8](https://github.com/instructure/instructure-ui/commit/1fb53c85102115e525521bcc86a122c2ba49d6c7))

### Features

- **ui-table:** add `stackedSortByLabel` prop to `Table.ColHeader` ([13f0cce](https://github.com/instructure/instructure-ui/commit/13f0ccea618553d6ecd9ba8ed8effd6621e40c55))

# [8.4.0](https://github.com/instructure/instructure-ui/compare/v8.3.0...v8.4.0) (2021-05-11)

### Bug Fixes

- **ui-dialog:** fix page scrolling up when Menu opens ([40736e3](https://github.com/instructure/instructure-ui/commit/40736e39b87428415b1551d04faea00ce22a475c))
- fix all inter-package dependencies using fix version ([75cd898](https://github.com/instructure/instructure-ui/commit/75cd8983b7e206e4e14dc67c490c103cb4a3d915))
- **ui-webpack-config:** fix security issue caused by `terser-webpack-plugin` ([f026bc2](https://github.com/instructure/instructure-ui/commit/f026bc2aed901b9b85b1d880f837a0d6382dabb4))

# [8.3.0](https://github.com/instructure/instructure-ui/compare/v8.2.1...v8.3.0) (2021-05-04)

### Bug Fixes

- **ui:** export `EmotionThemeProvider` and `withStyle` from ui package ([61e153c](https://github.com/instructure/instructure-ui/commit/61e153c8a27c27ad850e59959a599b10b2c36b67))
- **ui-tree-browser:** fix root item rendering with wrong fontFamily ([12d061b](https://github.com/instructure/instructure-ui/commit/12d061bb833d39f4d7b82c741bbccb51ac2d28e6))

### Features

- **ui-babel-preset:** remove not needed Babel plugins ([e23eea6](https://github.com/instructure/instructure-ui/commit/e23eea66baf5d9d79e3dba7136eb7534bb220021))
- **ui-number-input:** add inputMode prop to NumberInput ([8bf3091](https://github.com/instructure/instructure-ui/commit/8bf309169d2103047bccc820519d12db35d69f26))

### Performance improvements

- **emotion:** upgrade to Emotion 11 whose parser was updated to a more performant one ([bcafe99](https://github.com/instructure/instructure-ui/commit/bcafe99382ea329af78931ab07adfb09c7fec415))
- **ui-babel-preset:** removing unneeded babel plugins are leading to performance improvements ([e23eea6](https://github.com/instructure/instructure-ui/commit/e23eea66baf5d9d79e3dba7136eb7534bb220021))

## [8.2.1](https://github.com/instructure/instructure-ui/compare/v8.2.0...v8.2.1) (2021-04-22)

### Bug Fixes

- **ui-select,ui-simple-select,ui-text-input:** fix empty space before or after input ([b2b18cb](https://github.com/instructure/instructure-ui/commit/b2b18cb8e278e075b7127a6b9070d93ff72e5e41))
- **ui-link:** fix link not displaying outline on focus ([8f36891](https://github.com/instructure/instructure-ui/commit/8f36891996d1fc623cb284e7b3c6f787197fd7f9))
- **ui-menu:** fix Menu keyboard navigation on submenus ([cbdabb3](https://github.com/instructure/instructure-ui/commit/cbdabb39fc58513f8312137273207fe1f7edffcb))
- **ui-tree-browser:** fix large thumbnail style; PR fixes ([4d7eee1](https://github.com/instructure/instructure-ui/commit/4d7eee1a3fd882c65846ed827d759e41da8eb79f))

### Features

- **ui-tree-browser:** Add new getCollectionProps ([7926b3d](https://github.com/instructure/instructure-ui/commit/7926b3db42781540959bb6cbb07002b8c8cdd615))
- **ui-tree-browser:** allow to render custom content in TreeBrowser nodes ([af9eb19](https://github.com/instructure/instructure-ui/commit/af9eb19e57f9f62244d5f8ab7bd9955d4b32120d))
- **ui-tree-browser:** remove dash at root icon ([e671214](https://github.com/instructure/instructure-ui/commit/e67121436f44c64f61fa95f222a2aefc41568f34))

# [8.2.0](https://github.com/instructure/instructure-ui/compare/v8.1.0...v8.2.0) (2021-04-22)

### DEPRECATED

This release is deprecated, because we encountered problems during the release.

# [8.1.0](https://github.com/instructure/instructure-ui/compare/v8.0.0...v8.1.0) (2021-04-15)

### Bug Fixes

- **emotion:** fix ui-babel-preset dependency ([fb1443e](https://github.com/instructure/instructure-ui/commit/fb1443ebb581663160df868f2d44c6927d8aa1ab))
- **template-app,ui-template-scripts:** fix template app generation error ([f3a5a7c](https://github.com/instructure/instructure-ui/commit/f3a5a7c07ab32225e9ed3e6f596b093e74563620))
- **ui:** add SimpleSelect export to @instructure/ui ([e6efc4d](https://github.com/instructure/instructure-ui/commit/e6efc4d5fa3297ef8d54abb27d078cbf8d2bce72))
- **ui-navigation:** fix AppNav crashing with a single Item ([3023464](https://github.com/instructure/instructure-ui/commit/3023464c1f272c9bbf44a3a8f5d03b595e1d3643))
- **ui-select:** fix null pointer exception in Select ([04ae3a4](https://github.com/instructure/instructure-ui/commit/04ae3a42f6e35968303ea4ba23137443838dc611))
- **ui-tree-browser:** fix vertical line extending into collection icon ([eb7eec7](https://github.com/instructure/instructure-ui/commit/eb7eec7e5fa3f2c80001e2f56e7b3ec3e94c9154))
- **ui-tree-browser:** list root items too when `showRootCollection` is `false` ([d6b5b44](https://github.com/instructure/instructure-ui/commit/d6b5b445dbdf0c806a13225d4f53585748712dda))

### Features

- **ui-simple-select:** add number value option to simple-select ([3c422d8](https://github.com/instructure/instructure-ui/commit/3c422d86754f582d08ed344e7f3f5a32a19710e7))

# [8.0.0](https://github.com/instructure/instructure-ui/compare/v7.5.0...v8.0.0) (2021-03-29)

The main feature for version 8 is the switch of the theming engine, we replaced the in-house `themeable` theming with the popular [emotion.js](https://emotion.sh/).

### Bug Fixes

- **ui-checkbox:** add spacing between single checkbox and messages ([e67bd98](https://github.com/instructure/instructure-ui/commit/e67bd9873f082656cef038295647c21b9fa8f46e))
- **ui-popover:** tooltips dont dismiss when hovered over (a11y) ([7b166c1](https://github.com/instructure/instructure-ui/commit/7b166c1a0c6701bf95a2f85059bdfecf514271f2))
- add all components to **docs** dependencies ([7fb5f51](https://github.com/instructure/instructure-ui/commit/7fb5f5177d8e35373335e0024fa790286e18c1d7))

### Code Refactoring

- **Migrated the package and it's component(s) from using `ui-themeable` to using the new theming solution based on [emotion.js](https://emotion.sh/).**
- **emotion,ui-themeable:** move ThemeablePropValues and ThemeablePropTypes util to emotion pack ([2d0ac1d](https://github.com/instructure/instructure-ui/commit/2d0ac1d3d4ae60802f639bee2545f9a8a32446b6))
- **emotion,ui-themeable,ui-view:** move `getShorthandPropValue` from `ui-themeable` to `emotion` ([91fd876](https://github.com/instructure/instructure-ui/commit/91fd876068b535e159367d46115782156e6a159a))
- **emotion,ui-themeable,ui-view:** move `makeThemeVars` util from `ui-themeable` to `emotion` ([f2291ba](https://github.com/instructure/instructure-ui/commit/f2291ba19ae680fe5202e2ea9508157950f14a38))
- **emotion,ui-themeable,ui-view:** move `mirrorShorthand` utils to `emotion` ([c779407](https://github.com/instructure/instructure-ui/commit/c77940764c1ee2b99d6fe7a55a8fd6aaf2b07197))
- **ui-avatar:** removed deprecated `inline` prop ([410d6ed](https://github.com/instructure/instructure-ui/commit/410d6ed0962b91b99883d5b2ed6ada5d190513c5))
- **ui-avatar:** removed deprecated `variant` prop ([ec75e0f](https://github.com/instructure/instructure-ui/commit/ec75e0f5bcdbf505d87550a746fe4619fda0c5cf))
- **ui-babel-preset,ui-webpack-config:** remove unnecessary babel and postcss plugins ([457bd82](https://github.com/instructure/instructure-ui/commit/457bd828fba65f9d60bc07afd4803b3499bf31b4))
- **ui-breadcrumb:** remove deprecated `icon` prop ([ebde230](https://github.com/instructure/instructure-ui/commit/ebde2302f01501a4d44f8f166ec44713e7aa8d8d))
- **ui-buttons:** remove deprecated `DeprecatedButton` component ([c0e2d03](https://github.com/instructure/instructure-ui/commit/c0e2d031301fddf68e816bf5587d6357b15b7035))
- **ui-buttons:** remove deprecated `icon` prop ([e024d59](https://github.com/instructure/instructure-ui/commit/e024d59d0caac7414cea2f8b957c8f2521887d37))
- **ui-buttons:** remove deprecated `variant` prop ([755608a](https://github.com/instructure/instructure-ui/commit/755608a0cae2c01dc4028a4f36a03c605a17c8f4))
- **ui-buttons:** remove deprecated CloseButton props ([cf8657d](https://github.com/instructure/instructure-ui/commit/cf8657d42f4c46f31f1292d468221eaff36327ca))
- **ui-buttons:** removed deprecated `buttonRef` prop ([92330fd](https://github.com/instructure/instructure-ui/commit/92330fdef044d0f401ff8145aed4d5964db69619))
- **ui-buttons,ui-toggle-details:** remove deprecated `fluidWidth` prop ([0ced14e](https://github.com/instructure/instructure-ui/commit/0ced14e08e15d6922dc6b3aac755ed2686ad7a70))
- **ui-byline:** remove deprecated `Media` component ([8ba146c](https://github.com/instructure/instructure-ui/commit/8ba146cc6f0169a56d2c12a37e1900153cdfcc55))
- **ui-date-input:** remove deprecated `label` prop ([55a0066](https://github.com/instructure/instructure-ui/commit/55a00661560be1a8d5d606bc2e5fc2e14165b7ff))
- **ui-file-drop:** removed deprecated `allowMultiple` prop ([e67dee7](https://github.com/instructure/instructure-ui/commit/e67dee7f064a5494cd601596baded0e9bc61c3d7))
- **ui-file-drop:** removed deprecated `allowRepeatFileSelection` prop ([90b5f19](https://github.com/instructure/instructure-ui/commit/90b5f1912f67ae1d23d2ad0a7e76b99481c64910))
- **ui-file-drop:** removed deprecated `enablePreview` prop ([8a18fcd](https://github.com/instructure/instructure-ui/commit/8a18fcd91adf55291b8928180ee5efbb3bf8dd70))
- **ui-file-drop:** removed deprecated `label` prop ([5a0d088](https://github.com/instructure/instructure-ui/commit/5a0d088c7e33256c9ac27dc276d68f7927ecbbd4))
- **ui-flex:** removed deprecated `grow` prop ([01cf295](https://github.com/instructure/instructure-ui/commit/01cf2952b294bf247e45eb2f328473e416921751))
- **ui-flex:** removed deprecated `inline` prop ([92834f0](https://github.com/instructure/instructure-ui/commit/92834f0d9ffc3ba60f4e14a4f3427b10754d1e61))
- **ui-flex:** removed deprecated `shrink` prop ([50aab33](https://github.com/instructure/instructure-ui/commit/50aab33245bc0a0340e6dbdd7c263a179e9e92ab))
- **ui-flex:** removed deprecated `visualDebug` prop ([40a0c92](https://github.com/instructure/instructure-ui/commit/40a0c9223b929c7a9c2a35fffbb2da8901dd5ecf))
- **ui-flex:** removed deprecated `wrapItems` prop ([57ef6ab](https://github.com/instructure/instructure-ui/commit/57ef6abb881454f8096bb6d8cdf98078c01fbe0d))
- **ui-focusable:** removed deprecated `FocusableView` component ([cb1eff4](https://github.com/instructure/instructure-ui/commit/cb1eff4d3f6b582df76a20de39d7dbc6d068b73e))
- **ui-heading:** remove deprecated themeAdapter from Heading ([bb1f68c](https://github.com/instructure/instructure-ui/commit/bb1f68c2c8d7d795e6398e9eb93b7063a3b59e69))
- **ui-heading:** removed deprecated `ellipsis` prop ([4eacdef](https://github.com/instructure/instructure-ui/commit/4eacdefe876bb482a2be7cbd7436017ac7b20e12))
- **ui-img:** removed deprecated `blur` prop, use `withBlur` instead. ([3db9952](https://github.com/instructure/instructure-ui/commit/3db99525baff0bdfd6470191aa2937613cc874c0))
- **ui-img:** removed deprecated `grayscale` prop ([5087021](https://github.com/instructure/instructure-ui/commit/50870218749c55ec5c85592d9fe3203d4fe324e5))
- **ui-img:** removed deprecated `inline` prop ([43868ed](https://github.com/instructure/instructure-ui/commit/43868ed4748e26ff0017c003bfaeb615b09a4b21))
- **ui-link:** removed deprecated `linkRef` prop ([f09d9e1](https://github.com/instructure/instructure-ui/commit/f09d9e1b6dd1fa0297aaed255250b1cc9d943ebf))
- **ui-link:** removed deprecated `variant` prop ([624d396](https://github.com/instructure/instructure-ui/commit/624d396923afcad4e2eab86cb7e8484c3c7d80c9))
- **ui-list:** deprecate `variant` inline styles ([376abd7](https://github.com/instructure/instructure-ui/commit/376abd7d05d61ed075414f9aab7880f495c6c1ad))
- **ui-metric,ui:** removed deprecated `MetricList` component ([d795851](https://github.com/instructure/instructure-ui/commit/d795851c05a87ae916649dc18c11bd042e31405c))
- **ui-metric,ui:** removed deprecated `MetricListItem` component ([b8e52b8](https://github.com/instructure/instructure-ui/commit/b8e52b897368733e354a02b1da097070fda3faba))
- **ui-number-input:** removed deprecated `inline` prop ([a985528](https://github.com/instructure/instructure-ui/commit/a9855282e851be8c6d4581610987230a11153386))
- **ui-number-input:** removed deprecated `label` prop ([15060d7](https://github.com/instructure/instructure-ui/commit/15060d7781bc10862d3950e6af55a4bbafdc1d0e))
- **ui-number-input:** removed deprecated `required` prop ([987b36f](https://github.com/instructure/instructure-ui/commit/987b36ff67097cfae6491efa02cf7dea0bdeff30))
- **ui-pill,ui-responsive:** remove deprecated props from Pill ([125f14c](https://github.com/instructure/instructure-ui/commit/125f14c45f9035a86a3ed2a459ad692c5ecaa7b4))
- **ui-popover:** removed deprecated `alignArrow` prop ([3799228](https://github.com/instructure/instructure-ui/commit/3799228e2a80284422e96bc5053b217055a6b324))
- **ui-popover:** removed deprecated `defaultShow` prop ([ecfb67f](https://github.com/instructure/instructure-ui/commit/ecfb67f1ff45893295d0fc4a916fecc0751b6b30))
- **ui-popover:** removed deprecated `label` prop ([efb32a7](https://github.com/instructure/instructure-ui/commit/efb32a7e97f3b0a3ada4528ed408d405d5c89f39))
- **ui-popover:** removed deprecated `onDismiss` prop ([5a39dd6](https://github.com/instructure/instructure-ui/commit/5a39dd6c54d3e26d9a06e1d875f12a29a8d08e7f))
- **ui-popover:** removed deprecated `onShow` prop ([43007c0](https://github.com/instructure/instructure-ui/commit/43007c028f4d790297d78dd95b151177c0d28e73))
- **ui-popover:** removed deprecated `onToggle` prop ([bdfcda8](https://github.com/instructure/instructure-ui/commit/bdfcda8963a720335ee51bdf14a7a2f8ceb86de2))
- **ui-popover:** removed deprecated `PopoverContent` component ([5e5cf71](https://github.com/instructure/instructure-ui/commit/5e5cf7153eea46664df346089d39de10621caa9f))
- **ui-popover:** removed deprecated `PopoverTrigger` component ([9768ade](https://github.com/instructure/instructure-ui/commit/9768adef486c2dfcbe1bbded0ac17ec6698adfaa))
- **ui-popover:** removed deprecated `show` prop ([6000c93](https://github.com/instructure/instructure-ui/commit/6000c9366fd2d6820aa366f3caaea59edd032f3f))
- **ui-popover:** removed deprecated `trackPosition` prop ([e60e89b](https://github.com/instructure/instructure-ui/commit/e60e89b60d6f6bb37612cfc7935df1a3b8e00e4c))
- **ui-popover:** removed deprecated `variant` prop ([1d16dff](https://github.com/instructure/instructure-ui/commit/1d16dff819b1f15b8f684be8fb317da70c31812b))
- **ui-position:** deprecate `trackPosition` and `over` properties ([b636040](https://github.com/instructure/instructure-ui/commit/b6360407c5d7ae648e74c380c6e90714b80fb69e))
- **ui-position:** deprecate `Position.Target` and `Position.Content` components ([9c731c8](https://github.com/instructure/instructure-ui/commit/9c731c8a625085edb9f9d94ac04ddb371499c960))
- **ui-progress,ui:** delete deprecated `Progress` component ([69a84d0](https://github.com/instructure/instructure-ui/commit/69a84d08f6d1347c3bd5fb4259879af3ed2e5d27))
- **ui-spinner:** removed deprecated `title` prop ([44dc5b1](https://github.com/instructure/instructure-ui/commit/44dc5b177bf31cea42817802c61500a3e0aed74e))
- **ui-tabs:** remove deprecated `selected` and `disabled` props ([3472cf2](https://github.com/instructure/instructure-ui/commit/3472cf28173fb58724ccf4ec2ca2fa82d9839989))
- **ui-tabs:** remove deprecated `selectedIndex` prop ([1557b96](https://github.com/instructure/instructure-ui/commit/1557b967144af197110795548b17a7a749495eaa))
- **ui-tabs:** remove deprecated `size` prop ([fecbf13](https://github.com/instructure/instructure-ui/commit/fecbf13668ca1b4c261b9f719727207732480c45))
- **ui-tabs:** remove deprecated `title` prop ([3e44810](https://github.com/instructure/instructure-ui/commit/3e448101e432b72eddcc766ba29c1bb9f6cf54b7))
- **ui-tabs:** remove deprecated props `onChange` and `focus` ([a3c640f](https://github.com/instructure/instructure-ui/commit/a3c640f5a952a21a0035471e9a7b03cae24fd44b))
- **ui-text:** remove color type `error` ([6d44017](https://github.com/instructure/instructure-ui/commit/6d44017dc3e0daa2d3c7e5135326aa06bc079f2e))
- **ui-text-input:** removed deprecated `icon` prop ([694962c](https://github.com/instructure/instructure-ui/commit/694962c08d1d77a81a0f270116a38c2200ed07e9))
- **ui-text-input:** removed deprecated `inline` prop ([7a51241](https://github.com/instructure/instructure-ui/commit/7a5124143f28e9470f52fb60b4bd660952e64cdd))
- **ui-text-input:** removed deprecated `label` prop ([dc01d90](https://github.com/instructure/instructure-ui/commit/dc01d90d1857d9e61270c7996959420531bc99fe))
- **ui-text-input:** removed deprecated `required` prop ([20cd5dd](https://github.com/instructure/instructure-ui/commit/20cd5dd8eb28243b2c8151420af3086eb7b1a35d))
- **ui-time-select:** removed deprecated `label` prop ([fce697f](https://github.com/instructure/instructure-ui/commit/fce697f583e0bf7c8d1d3eaaf4e2b01f22d5301e))
- **ui-tooltip:** `tip` and `variant` properties deprecated ([cd17b6b](https://github.com/instructure/instructure-ui/commit/cd17b6b5873a96040a9630c09177f47c4601b56e))
- **ui-view:** remove deprecated themeAdapter ([bbfb295](https://github.com/instructure/instructure-ui/commit/bbfb2950223a718a31eac4eb78bd95680e0981a5))
- **ui-view:** removed deprecated `focused` prop ([3980814](https://github.com/instructure/instructure-ui/commit/3980814a1c2780249dd41a373721c22298895a30))
- **ui-view:** removed deprecated `visualDebug` prop ([6d8e0bb](https://github.com/instructure/instructure-ui/commit/6d8e0bb55ef5a6ffa1d30b65879bcdc2ead99569))

### Features

- **instui-cli,ui-upgrade-scripts:** add codemod to rename `theme` prop to `themeOverride` ([e0607dd](https://github.com/instructure/instructure-ui/commit/e0607dd0a30c086a538817bde19e725ccc5dd085))
- **instui-config:** add codemod for themeable util imports ([89a95f8](https://github.com/instructure/instructure-ui/commit/89a95f86c129b266a0090b983587933c285a0960))
- **ui-color-utils:** add utility mehtod to convert a color string to a hexadecimal color string in the #AABBCC format([20a3a69](https://github.com/instructure/instructure-ui/commit/20a3a6990469a427b4115090faccad67f9216830))
- **ui-editable,ui-focusable:** delete depracated FocusableView ([fac2670](https://github.com/instructure/instructure-ui/commit/fac2670fdd165d8342209bac128fb6e02f1fd061))
- **ui-i18n:** remove decimal.js, its .mjs export is causing issues with Jest ([2e00b30](https://github.com/instructure/instructure-ui/commit/2e00b308cea08585b1afdc5861a5f9142a12f2af))
- **ui-icons:** add new icons and update old ones ([03e6027](https://github.com/instructure/instructure-ui/commit/03e60278022d1420feda12586f8260cf8f322b07))
- **ui-icons-build,ui-icons:** generate icons from svg files ([7bf065a](https://github.com/instructure/instructure-ui/commit/7bf065a036227956c9008c1992834c48fafa25e3))
- **ui-test-sandbox,ui:** delete ui-themeable package and usages ([60e4080](https://github.com/instructure/instructure-ui/commit/60e4080a68dd76b0d6462fa1b63e6a4f59c38f7d))

### Performance Improvements

- **ui-docs-client:** speed up iconography page ([d16a046](https://github.com/instructure/instructure-ui/commit/d16a046b24540fcd9dd9f642af31145671c9dda7))

### BREAKING CHANGES

- **ui-checkbox:** VISUAL CHANGE: Since there is more space between the checkbox and the messages, it can potentially break layouts (vertically more pixels).
- It is no longer a valid strategy to surround `jsx` code with `try..catch` because writing something in the console does not cause errors to be thrown. Use `spy(console, 'error')` instead. Also, when accessing `Component.displayName`, use `Component.displayName || Component.name` with the name as a fallback instead.
- **ui-babel-preset,ui-webpack-config:** Removed the following packages because they were supporting `ui-themable`, and are no longer needed when using `emotion` theming: `babel-plugin-themeable-styles`, `postcss-themeable-styles`, `ui-postcss-config`.
- **ui-test-sandbox,ui:** The whole `ui-themeable` package was deleted. It is superseeded by the `emotion` package.
- **ui-tabs:** `SecondarySelectedColor` style was removed, now just `secondaryColor` determines the color of the secondary tab. VISUAL CHANGE: `secondaryColor` changed to `textDarkest`, in the Canvas theme to `ic-brand-font-color-dark`
- **emotion,ui-themeable,ui-view:** Moved `mirrorShorthand`, `mirrorShorthandEdges`, `mirrorShorthandCorners` utils to from
  `ui-themeable` to `emotion` package.
- **emotion,ui-themeable,ui-view:** Moved `getShorthandPropValue` from `ui-themeable` to `emotion` package.
- **emotion,ui-themeable,ui-view:** Moved `makeThemeVars` util from `ui-themeable` to `emotion` package.
- **emotion,ui-themeable:** Moved `ThemeablePropValues` and `ThemeablePropTypes` utils from `ui-themeable`to `emotion` package.
- **ui-heading:** The theme variable 'fontFamily' has been split into the following values, override them
  individually: `h1FontFamily`, `h2FontFamily`, `h3FontFamily`, `h4FontFamily`, `h5FontFamily`.
- **ui-view:** Removed themeAdapter for deprecated theme variables: 'borderColorDefault' is now
  `borderColorPrimary`, 'borderColorInverse' is now `borderColorTransparent`, 'colorInverse' is now
  `colorPrimaryInverse`, 'background' is now `backgroundPrimary`, 'backgroundLight' is now
  `backgroundSecondary`, 'backgroundInverse' is now `backgroundPrimaryInverse`.
- **ui-view:** Removed deprecated `visualDebug` prop, use `withVisualDebug` instead.
- **ui-view:** Removed deprecated `focused` prop, use `withFocusOutline` instead.
- **ui-img:** Removed deprecated `blur` prop, use `withBlur` instead.
- **ui-img:** Removed deprecated `grayscale` prop, use `withGrayscale` instead.
- **ui-img:** Removed deprecated `inline` prop, use `display` ('inline-block' or ‘block') instead.
- **ui-heading:** Removed deprecated `ellipsis` prop, use `TruncateText` component child instead.
- **ui-focusable:** Removed deprecated `FocusableView` component, use `View` instead.
- **ui-avatar:** Removed deprecated `variant` prop, use `shape` instead.
- **ui-avatar:** Removed deprecated `inline` prop, use `display` ('inline-block' or 'block') instead.
- **ui-number-input:** Removed deprecated `inline` prop, use `display` ('inline-block' or 'block') instead.
- **ui-number-input:** Removed deprecated `required` prop, use `isRequired` instead.
- **ui-number-input:** Removed deprecated `label` prop, use `renderLabel` instead.
- **ui-time-select:** Removed deprecated `label` prop, use `renderLabel` instead.
- **ui-text-input:** Removed deprecated `icon` prop, use `renderAfterInput` instead.
- **ui-text-input:** Removed deprecated `inline` prop, use `display` ('inline-block' or ‘block') instead.
- **ui-text-input:** Removed deprecated `required` prop, use `isRequired` instead.
- **ui-text-input:** Removed deprecated `label` prop, use `renderLabel` instead.
- **ui-spinner:** Removed deprecated `title` prop, use `renderTitle` instead.
- **ui-popover:** Removed deprecated `onDismiss` prop, use `onHideContent` instead.
- **ui-popover:** Removed deprecated `alignArrow` prop, use `shouldAlignArrow` instead.
- **ui-popover:** Removed deprecated `trackPosition` prop, use `shouldTrackPosition` instead.
- **ui-popover:** Removed deprecated `label` prop, use `screenReaderLabel` instead.
- **ui-popover:** Removed deprecated `variant` prop, use `color` ('primary' or 'primary-inverse') instead.
- **ui-popover:** Removed deprecated `defaultShow` prop, use `defaultIsShowingContent` instead.
- **ui-popover:** Removed deprecated `show` prop, use `isShowingContent` instead.
- **ui-popover:** Removed deprecated `onToggle` prop, use `onShowContent` and `onHideContent` instead.
- **ui-popover:** Removed deprecated `onShow` prop, use `onPositioned` instead.
- **ui-popover:** Removed deprecated `PopoverContent` component, use Popover's `children` instead.
- **ui-popover:** Removed deprecated `PopoverTrigger` component, use Popover's `renderTrigger` prop instead.
- **ui-metric,ui:** Removed deprecated `MetricList` component, use `MetricGroup` instead.
- **ui-metric,ui:** Removed deprecated `MetricListItem` component, use `Metric` instead.
- **ui-link:** Removed deprecated `variant` prop, use `color` ('link' or ’link-inverse') instead.
- **ui-link:** Removed deprecated `linkRef` prop, use `elementRef` instead.
- **ui-flex:** Removed deprecated `shrink` prop, use `shouldShrink` instead.
- **ui-flex:** Removed deprecated `grow` prop, use `shouldGrow` instead.
- **ui-flex:** Removed deprecated `visualDebug` prop, use `withVisualDebug` instead.
- **ui-flex:** Removed deprecated `wrapItems` prop, use `wrap` ('wrap', 'no-wrap' or 'wrap-reverse') instead.
- **ui-flex:** Removed deprecated `inline` prop, use `display` (‘flex’ or ‘inline-flex’) instead.
- **ui-file-drop:** Removed deprecated `allowMultiple` prop, use `shouldAllowMultiple` instead.
- **ui-file-drop:** Removed deprecated `allowRepeatFileSelection` prop, use `shouldAllowRepeats` instead.
- **ui-file-drop:** Removed deprecated `enablePreview` prop, use `shouldEnablePreview` instead.
- **ui-file-drop:** Removed deprecated `label` prop, use `renderLabel` instead.
- **ui-byline:** Removed deprecated `Media` component, use `Byline` instead.
- **ui-breadcrumb:** Removed deprecated `icon` prop, use `renderIcon` instead.
- **ui-progress,ui:** Deleted deprecated Progress component, use ProgressBar or ProgressCircle instead.
- **ui-date-input:** Removed deprecated `label` prop: use `renderLabel` prop instead.
- **ui-checkbox:** Removed deprecated theme variables: `baseSizeSmall`, `baseSizeMedium`, `baseSizeLarge`. Use
  `toggleSize` instead.
- **ui-number-input:** Removed deprecated props: label, required, inline
- **ui-tabs:** Removed deprecated `onChange` prop: use `onRequestTabChange` instead. Removed deprecated `focus`
  prop: use `shouldFocusOnRender` instead.
- **ui-tabs:** Removed deprecated `selectedIndex` prop.
- **ui-tabs:** Removed deprecated `size` prop, use `maxWidth` instead.
- **ui-tabs:** Removed deprecated `title` prop: use `renderTitle` instead.
- **ui-tabs:** [Tabs.Tab and Tabs.Panel] Removed deprecated `selected` prop: use `isSelected` instead. Removed
  deprecated `disabled` prop: use `isDisabled` instead.
- **ui-buttons:** Removed deprecated CloseButton prop `children`, use `screenReaderLabel` instead. Removed deprecated
  CloseButton prop `variant`, use `color` instead.
- **ui-buttons:** Remove deprecated `DeprecatedButton` component.
- **ui-buttons:** Removed deprecated `variant` prop. The default value for `color` prop is now `secondary`.
- **ui-buttons:** Removed deprecated `icon` prop, use `renderIcon` instead.
- **ui-buttons,ui-toggle-details:** Removed deprecated `fluidWidth` prop, set `display="block"` and `textAlign="start"` instead.
- **ui-buttons:** removed deprecared `buttonRef` prop from `Button` and `CloseButton`, use `elementRef` instead.
- **ui-position:** `trackPosition` prop is deprecated, use `shouldTrackPosition` prop instead. `over` prop is
  depreacted, use `shouldPositionOverTarget` prop instead.
- **ui-position:** `Position.Target` is deprecated, use Position's `renderTarget` prop instead. `Position.Content` is deprecated, use Position's `children` instead.
- **ui-position,ui-view:** The "box-sizing" and "z-index" css properties are now added as inline css on the Content element,
  might break other rules added in class.
- **ui-table:** Removed support for deprecated "mode" property, since it was deprecated in v7.
- **ui-list:** Removed `variant` property: use InlineList component for inline lists and isUnstyled boolean prop for unstyled lists. Removed inline delimiter values (pipe, slash and arrow) from `delimiter` property.
- **ui-pill,ui-responsive:** Removed `text` property: use `children` instead. `Children` is now required. Removed `variant` property: use color instead. Within the new color prop `default` is now `primary` (gray), `primary` has updated to `info` (blue) and `message` is now `alert`.
- **ui-text:** Removed `error` type for color, use `danger` instead
- **ui-tooltip:** `tip` property is deprecated (use `renderTip` instead). | `renderTip` property is now required. | `variant` property is deprecated (use `color` instead)
- **ui-alerts:** Remove deprecated `closeButtonLabel` prop
- Removed `Decimal` wrapper for decimal.js because it was causing compilation errors with projects using Jest. If you need its functionality we recommend to copy-paste the needed methods from the source code.

# [7.5.0](https://github.com/instructure/instructure-ui/compare/v7.4.4...v7.5.0) (2021-03-22)

### Features

- **ui-tree-browser:** allow tree browser to render before, after nodes ([ca1dfaa](https://github.com/instructure/instructure-ui/commit/ca1dfaa))

## [7.4.4](https://github.com/instructure/instructure-ui/compare/v7.4.3...v7.4.4) (2021-03-12)

### Bug Fixes

- Add CommonJS build to @instructure/ui-themes ([7e99643](https://github.com/instructure/instructure-ui/commit/7e99643))

## [7.4.3](https://github.com/instructure/instructure-ui/compare/v7.4.1...v7.4.3) (2021-03-11)

### Bug Fixes

- fix release script path issue ([ea56688](https://github.com/instructure/instructure-ui/commit/ea5668850fcfb1e82486d8072fef2120222a3d70))
- fix tagging ([a3e4fbc](https://github.com/instructure/instructure-ui/commit/a3e4fbcd6ed6db7372c2dafd61053f7ac88c1446))
- **ui-scripts:** add comment on annotated tags ([ac8d075](https://github.com/instructure/instructure-ui/commit/ac8d075206567368290ba8b05d9f5676ac48c647))
- **ui-scripts:** fix bump tagging and rename prerelease builds from nightly to snapshot ([3473ed5](https://github.com/instructure/instructure-ui/commit/3473ed5a2aa659c92b7a5243e79e619eaab021c7))
- **ui-scripts:** fix typo ([96d704a](https://github.com/instructure/instructure-ui/commit/96d704aa5aab1ee4dddf279b4a01b0e6c3d9e424))

## [7.4.2](https://github.com/instructure/instructure-ui/compare/v7.4.1...v7.4.2) (2021-03-11)

### Bug Fixes

- fix release script path issue ([ea56688](https://github.com/instructure/instructure-ui/commit/ea56688))
- fix tagging ([a3e4fbc](https://github.com/instructure/instructure-ui/commit/a3e4fbc))
- **ui-scripts:** add comment on annotated tags ([ac8d075](https://github.com/instructure/instructure-ui/commit/ac8d075))
- **ui-scripts:** fix bump tagging and rename prerelease builds from nightly to snapshot ([3473ed5](https://github.com/instructure/instructure-ui/commit/3473ed5))
- **ui-scripts:** fix typo ([96d704a](https://github.com/instructure/instructure-ui/commit/96d704a))

## [7.4.1](https://github.com/instructure/instructure-ui/compare/v7.4.0...v7.4.1) (2021-03-04)

### Bug Fixes

- **all:** Fix package imports, now everything can be imported; fix test:all in main package.json ([2f11024](https://github.com/instructure/instructure-ui/commit/2f11024))
- **ui-docs-plugin:** fix favicon ([1ede99f](https://github.com/instructure/instructure-ui/commit/1ede99f))

# [7.4.0](https://github.com/instructure/instructure-ui/compare/v7.3.5...v7.4.0) (2021-02-01)

### Bug Fixes

- fix release script ([e5b7e1f](https://github.com/instructure/instructure-ui/commit/e5b7e1f))
- fix review issues ([33ee9d8](https://github.com/instructure/instructure-ui/commit/33ee9d8))
- fix review issues ([fe349c7](https://github.com/instructure/instructure-ui/commit/fe349c7))
- fix typo ([9aeced9](https://github.com/instructure/instructure-ui/commit/9aeced9))
- **ui-scripts:** fix ui-scripts config for deploy-docs-via-github ([14bae47](https://github.com/instructure/instructure-ui/commit/14bae47))

### Features

- **ui-icons:** add new icons and update old ones ([4b524b3](https://github.com/instructure/instructure-ui/commit/4b524b3))

## [7.3.5](https://github.com/instructure/instructure-ui/compare/v7.3.2...v7.3.5) (2021-01-21)

### Bug Fixes

- **browserslist-config-instui:** fix broken tests caused by IE11 support removal ([965cf1b](https://github.com/instructure/instructure-ui/commit/965cf1b))
- **browserslist-config-instui:** remove IE from supported browserslist ([09c0888](https://github.com/instructure/instructure-ui/commit/09c0888))
- **esm:** don't mark commonjs as esm ([957c7cd](https://github.com/instructure/instructure-ui/commit/957c7cd))
- **esm:** fix rebasing artifacts ([a791afe](https://github.com/instructure/instructure-ui/commit/a791afe))
- **esm:** improve esm support ([b9184cc](https://github.com/instructure/instructure-ui/commit/b9184cc))
- **esm:** remove packaging-test/ ([1bfb15f](https://github.com/instructure/instructure-ui/commit/1bfb15f))
- **esm:** rewrite specify-commonjs-format in js ([005905e](https://github.com/instructure/instructure-ui/commit/005905e))
- **esm:** specify "exports" in package manifests ([6007684](https://github.com/instructure/instructure-ui/commit/6007684))
- **esm:** upgrade babel ([173a310](https://github.com/instructure/instructure-ui/commit/173a310))
- **esm:** validate esm packaging ([687ea0e](https://github.com/instructure/instructure-ui/commit/687ea0e))
- **ui-modal:** fix modal resetting contents when size is changed to/from fullscreen ([397c2b8](https://github.com/instructure/instructure-ui/commit/397c2b8))

## [7.3.4](https://github.com/instructure/instructure-ui/compare/v7.3.2...v7.3.4) (2021-01-14)

### Bug Fixes

- **browserslist-config-instui:** fix broken tests caused by IE11 support removal ([1ecf80b](https://github.com/instructure/instructure-ui/commit/1ecf80b))
- **browserslist-config-instui:** remove IE from supported browserslist ([09c0888](https://github.com/instructure/instructure-ui/commit/09c0888))
- **esm:** don't mark commonjs as esm ([957c7cd](https://github.com/instructure/instructure-ui/commit/957c7cd))
- **esm:** fix rebasing artifacts ([a791afe](https://github.com/instructure/instructure-ui/commit/a791afe))
- **esm:** improve esm support ([b9184cc](https://github.com/instructure/instructure-ui/commit/b9184cc))
- **esm:** remove packaging-test/ ([1bfb15f](https://github.com/instructure/instructure-ui/commit/1bfb15f))
- **esm:** rewrite specify-commonjs-format in js ([005905e](https://github.com/instructure/instructure-ui/commit/005905e))
- **esm:** specify "exports" in package manifests ([6007684](https://github.com/instructure/instructure-ui/commit/6007684))
- **esm:** upgrade babel ([173a310](https://github.com/instructure/instructure-ui/commit/173a310))
- **esm:** validate esm packaging ([687ea0e](https://github.com/instructure/instructure-ui/commit/687ea0e))

## [7.3.3](https://github.com/instructure/instructure-ui/compare/v7.3.2...v7.3.3) (2021-01-13)

### Bug Fixes

- **browserslist-config-instui:** remove IE from supported browserslist ([09c0888](https://github.com/instructure/instructure-ui/commit/09c0888))
- **esm:** don't mark commonjs as esm ([957c7cd](https://github.com/instructure/instructure-ui/commit/957c7cd))
- **esm:** fix rebasing artifacts ([a791afe](https://github.com/instructure/instructure-ui/commit/a791afe))
- **esm:** improve esm support ([b9184cc](https://github.com/instructure/instructure-ui/commit/b9184cc))
- **esm:** remove packaging-test/ ([1bfb15f](https://github.com/instructure/instructure-ui/commit/1bfb15f))
- **esm:** rewrite specify-commonjs-format in js ([005905e](https://github.com/instructure/instructure-ui/commit/005905e))
- **esm:** specify "exports" in package manifests ([6007684](https://github.com/instructure/instructure-ui/commit/6007684))
- **esm:** upgrade babel ([173a310](https://github.com/instructure/instructure-ui/commit/173a310))
- **esm:** validate esm packaging ([687ea0e](https://github.com/instructure/instructure-ui/commit/687ea0e))

## [7.3.2](https://github.com/instructure/instructure-ui/compare/v7.3.1...v7.3.2) (2020-12-10)

### Bug Fixes

- **ui-a11y-utils:** don't hide elements with aria-live ([440fbd5](https://github.com/instructure/instructure-ui/commit/440fbd5))

## [7.3.1](https://github.com/instructure/instructure-ui/compare/v7.3.0...v7.3.1) (2020-11-30)

**Note:** Version bump only for package instructure-ui

# [7.3.0](https://github.com/instructure/instructure-ui/compare/v7.2.4...v7.3.0) (2020-10-26)

### Features

- **ui-icons:** add calculator-desmos icon to the project ([df9bb2b](https://github.com/instructure/instructure-ui/commit/df9bb2b))

## [7.2.4](https://github.com/instructure/instructure-ui/compare/v7.2.0...v7.2.4) (2020-10-09)

**Note:** Version bump only for package instructure-ui

## [7.2.3](https://github.com/instructure/instructure-ui/compare/v7.2.0...v7.2.3) (2020-10-08)

**Note:** Version bump only for package instructure-ui

## [7.2.2](https://github.com/instructure/instructure-ui/compare/v7.2.0...v7.2.2) (2020-10-08)

**Note:** Version bump only for package instructure-ui

## [7.2.1](https://github.com/instructure/instructure-ui/compare/v7.2.0...v7.2.1) (2020-10-07)

**Note:** Version bump only for package instructure-ui

# [7.2.0](https://github.com/instructure/instructure-ui/compare/v7.1.4...v7.2.0) (2020-09-23)

### Features

- **ui-icons:** add new icons: compass, line-reader, notepad, protactor, review-screen, ruler ([ea218ca](https://github.com/instructure/instructure-ui/commit/ea218ca))

## [7.1.4](https://github.com/instructure/instructure-ui/compare/v7.1.3...v7.1.4) (2020-09-09)

### Bug Fixes

- **ui-simple-select:** add missing event args ([ab18a17](https://github.com/instructure/instructure-ui/commit/ab18a17))

## [7.1.3](https://github.com/instructure/instructure-ui/compare/v7.1.2...v7.1.3) (2020-08-10)

### Bug Fixes

- **ui-docs-plugin:** make sure utilities are categorized properly ([9dd6118](https://github.com/instructure/instructure-ui/commit/9dd6118))
- **ui-options:** Don't let words overflow in Options component ([dbb6dfe](https://github.com/instructure/instructure-ui/commit/dbb6dfe))

## [7.1.2](https://github.com/instructure/instructure-ui/compare/v7.1.1...v7.1.2) (2020-07-17)

**Note:** Version bump only for package instructure-ui

## [7.1.1](https://github.com/instructure/instructure-ui/compare/v7.1.0...v7.1.1) (2020-07-01)

**Note:** Version bump only for package instructure-ui

# [7.1.0](https://github.com/instructure/instructure-ui/compare/v7.0.0...v7.1.0) (2020-06-25)

### Features

- **ui-table:** allow valid values for ColHeader scope prop ([3133e55](https://github.com/instructure/instructure-ui/commit/3133e55))
- **ui-tree-browser:** allow specifying a different icon for each item ([ea98f06](https://github.com/instructure/instructure-ui/commit/ea98f06))

# [7.0.0](https://github.com/instructure/instructure-ui/compare/v6.26.0...v7.0.0) (2020-05-27)

> **Note:** For instructions on upgrading to version 7.0.0 and more information about breaking changes, see [the upgrade guide](#v7-upgrade-guide).

### Bug Fixes

- **docs,ui-toggle-details:** update under the hood props + a couple README prop ([ccbb0b2](https://github.com/instructure/instructure-ui/commit/ccbb0b2))
- **ui-code-editor:** make it work as a controlled component ([586de21](https://github.com/instructure/instructure-ui/commit/586de21))
- **ui-docs-client:** Make sidebar search not wrap ([6015661](https://github.com/instructure/instructure-ui/commit/6015661))
- **ui-list:** fix style collisions in the docs for list and inline list ([0d1b29a](https://github.com/instructure/instructure-ui/commit/0d1b29a))
- **ui-popover:** reduce tooltip flickering ([461d3fe](https://github.com/instructure/instructure-ui/commit/461d3fe))
- **ui-position:** account for offsetTop discrepency in firefox ([c46c4d1](https://github.com/instructure/instructure-ui/commit/c46c4d1))
- **ui-range-input:** patch CSS for legacy Edge ([d7372fe](https://github.com/instructure/instructure-ui/commit/d7372fe))
- **ui-react-utils:** ensure ComponentIdentifier renders in the docs ([044b9f3](https://github.com/instructure/instructure-ui/commit/044b9f3))
- **ui-testable:** fixes for createSuper being undefined ([ce73f32](https://github.com/instructure/instructure-ui/commit/ce73f32))
- **ui-theme-tokens,ui-token-scripts:** fix ui-token-scripts build ([e2e7105](https://github.com/instructure/instructure-ui/commit/e2e7105))

### chore

- bump minimum react version to 16.8.0 ([7a96f00](https://github.com/instructure/instructure-ui/commit/7a96f00))
- remove references to React 15 ([4bb2426](https://github.com/instructure/instructure-ui/commit/4bb2426))
- remove canvas-ams-theme ([91f1336](https://github.com/instructure/instructure-ui/commit/91f1336))
- **ui-component-examples,ui-theme-tokens:** switch component examples loader to cjs ([3abd6ca](https://github.com/instructure/instructure-ui/commit/3abd6ca))
- **ui-react-utils:** remove react-lifecycles-compat polyfill ([aa698ae](https://github.com/instructure/instructure-ui/commit/aa698ae))
- **ui-themeable:** remove support for IE11 ([bf6f5f7](https://github.com/instructure/instructure-ui/commit/bf6f5f7))

### Code Refactoring

- decouple theme properties from ui-themeable ([d5a8827](https://github.com/instructure/instructure-ui/commit/d5a8827))

### Features

- remove 'experimental' tag along with '\_\_dangerouslyIgnore...' ([92bf753](https://github.com/instructure/instructure-ui/commit/92bf753))
- **docs:** Newsletter for version 7 release ([86ed6d3](https://github.com/instructure/instructure-ui/commit/86ed6d3))
- **ui-breadcrumb:** Add responsive breadcrumb docs ([3ab5566](https://github.com/instructure/instructure-ui/commit/3ab5566))
- **ui-codemods:** read consumer config for prettier if it exists when applying codemods ([e38cbf9](https://github.com/instructure/instructure-ui/commit/e38cbf9))
- **ui-docs-client:** add a ToggleBlockquote to be used internally for upgrade guides ([0e87dc9](https://github.com/instructure/instructure-ui/commit/0e87dc9))
- **ui-docs-client:** Docs/homepage refresh ([ee4957b](https://github.com/instructure/instructure-ui/commit/ee4957b))
- **ui-icons:** add "sort" icon ([3a76f0b](https://github.com/instructure/instructure-ui/commit/3a76f0b))
- **ui-icons:** added margin to 'add' and 'x' icons ([c7632c4](https://github.com/instructure/instructure-ui/commit/c7632c4))
- **ui-scripts:** Add flags to ui-test to opt out of linting and coverage ([d4ea03e](https://github.com/instructure/instructure-ui/commit/d4ea03e))
- **ui-tabs:** Responsive tabs ([df2c642](https://github.com/instructure/instructure-ui/commit/df2c642))
- **ui-text-area:** update deprecated lifecycle ([7e13cb3](https://github.com/instructure/instructure-ui/commit/7e13cb3))

### BREAKING CHANGES

- - Removed the `canvas-ams-theme` package. Use `canvas-theme` instead.

Change-Id: I077f6b8cbbef9ee12e5904fb4c9dc4b48409acbb
Reviewed-on: https://gerrit.instructure.com/c/instructure-ui/+/237960
Tested-by: Service Cloud Jenkins <svc.cloudjenkins@instructure.com>
Reviewed-by: Steve Jensen <sejensen@instructure.com>
QA-Review: Daniel Sasaki <dsasaki@instructure.com>
Product-Review: Steve Jensen <sejensen@instructure.com>
Visual-Regression-Test: Steve Jensen <sejensen@instructure.com>

- **ui-react-utils:** - removed lifecycle polyfill from ui-react-utils

TEST PLAN:

- No regressions to Expandable, Focusable, Transition,
  or Playground
- ui-react-utils should no longer export or document
  polyfill

Change-Id: Ib714de4dc2a4ef048af2f43f272bcb8a2e545a5c
Reviewed-on: https://gerrit.instructure.com/c/instructure-ui/+/237790
Tested-by: Service Cloud Jenkins <svc.cloudjenkins@instructure.com>
Reviewed-by: Chris Guerrero <cguerrero@instructure.com>
Product-Review: Ken Meleta <kmeleta@instructure.com>
QA-Review: Daniel Sasaki <dsasaki@instructure.com>
Visual-Regression-Test: Ken Meleta <kmeleta@instructure.com>

- - Minimum react and react-dom version raised to 16.8.0

TEST PLAN:

- no regressions in docs app
- homepage should note the react version change
- automated tests should pass

Change-Id: I7cd9dd6423fb9524e0a1a0dd490caeee3a2c2c17
Reviewed-on: https://gerrit.instructure.com/c/instructure-ui/+/237727
Tested-by: Service Cloud Jenkins <svc.cloudjenkins@instructure.com>
Reviewed-by: Chris Guerrero <cguerrero@instructure.com>
Product-Review: Steve Jensen <sejensen@instructure.com>
QA-Review: Daniel Sasaki <dsasaki@instructure.com>
Visual-Regression-Test: Ken Meleta <kmeleta@instructure.com>

- **ui-component-examples,ui-theme-tokens:** - renderPage and renderExample are no longer supplied by the webpack
  component-examples-loader

Change-Id: I5c632274264d7c934abc86f41399b8a7cda23e26
Reviewed-on: https://gerrit.instructure.com/c/instructure-ui/+/236873
Tested-by: Service Cloud Jenkins <svc.cloudjenkins@instructure.com>
Reviewed-by: Ken Meleta <kmeleta@instructure.com>
Product-Review: Ken Meleta <kmeleta@instructure.com>
QA-Review: Daniel Sasaki <dsasaki@instructure.com>
Visual-Regression-Test: Steve Jensen <sejensen@instructure.com>

- Dropping support for React 15.

TEST PLAN:

- yarn dev/yarn start should work
- yarn test/test:watch should work
- there should be no mention of react 15 in code
- there should be nothing depending on react 15
  or reactDOM 15

Change-Id: I2c054c986421014ffe15f0402e14bd2725cbc267
Reviewed-on: https://gerrit.instructure.com/c/instructure-ui/+/229009
Tested-by: Service Cloud Jenkins <svc.cloudjenkins@instructure.com>
QA-Review: Daniel Sasaki <dsasaki@instructure.com>
Visual-Regression-Test: Ken Meleta <kmeleta@instructure.com>
Reviewed-by: Steve Jensen <sejensen@instructure.com>
Product-Review: Steve Jensen <sejensen@instructure.com>

- - Changed arguments for `ui-token-scripts` commands

* Changed structure of `ui-token-scripts` configuration file

Change-Id: I33213d2350f9ce07c157a6ad3f8cd2e6bccb14e9
Reviewed-on: https://gerrit.instructure.com/c/instructure-ui/+/236552
Reviewed-by: Steve Jensen <sejensen@instructure.com>
Product-Review: Steve Jensen <sejensen@instructure.com>
Tested-by: Service Cloud Jenkins <svc.cloudjenkins@instructure.com>
QA-Review: Daniel Sasaki <dsasaki@instructure.com>
Visual-Regression-Test: Steve Jensen <sejensen@instructure.com>

- **ui-code-editor:** CodeEditor is now controlled-only.

TEST PLAN:

- playground examples should work as before in docs
- automated tests should pass
- in dev environment, no react lifecycles warnings should
  show in console

Change-Id: I68398d56447af2a03c9db51bee5cce96f1fe5bd2
Reviewed-on: https://gerrit.instructure.com/c/instructure-ui/+/224132
Tested-by: Service Cloud Jenkins <svc.cloudjenkins@instructure.com>
Reviewed-by: Chris Hart <chart@instructure.com>
Visual-Regression-Test: Ken Meleta <kmeleta@instructure.com>
Product-Review: Chris Hart <chart@instructure.com>
QA-Review: Daniel Sasaki <dsasaki@instructure.com>

- **ui-themeable:** - Removed support for IE11 by eliminating custom properties polyfill

* Removed `scopeStylesToNode`, `scopeCssText`, and `customPropertiesSupported`
  utility helpers.

Change-Id: I41de82b6167f1aa9f25d87ddc279e5d3c5f0b413
Reviewed-on: https://gerrit.instructure.com/c/instructure-ui/+/235818
Tested-by: Service Cloud Jenkins <svc.cloudjenkins@instructure.com>
Reviewed-by: Steve Jensen <sejensen@instructure.com>
Product-Review: Steve Jensen <sejensen@instructure.com>
QA-Review: Daniel Sasaki <dsasaki@instructure.com>
Visual-Regression-Test: Chris Guerrero <cguerrero@instructure.com>

# [6.26.0](https://github.com/instructure/instructure-ui/compare/v6.25.0...v6.26.0) (2020-04-30)

### Features

- **instui-config:** finish adding codemod configs for universal package ([142d52b](https://github.com/instructure/instructure-ui/commit/142d52b))
- **ui-file-drop:** add a height prop ([4fc0c4a](https://github.com/instructure/instructure-ui/commit/4fc0c4a))

# [6.25.0](https://github.com/instructure/instructure-ui/compare/v6.24.0...v6.25.0) (2020-04-27)

### Bug Fixes

- **instui-config:** publish import codemod configs to npm ([93fc574](https://github.com/instructure/instructure-ui/commit/93fc574))

### Features

- **instui-cli,instui-config,ui-codemods,ui-upgrade-scripts:** allow option to migrate to universal ([2090d6c](https://github.com/instructure/instructure-ui/commit/2090d6c))
- **instui-config,ui:** add a universal export package ([9e74450](https://github.com/instructure/instructure-ui/commit/9e74450))

# [6.24.0](https://github.com/instructure/instructure-ui/compare/v6.23.0...v6.24.0) (2020-04-14)

### Bug Fixes

- **ui-drawer-layout:** Fix no styles applied on root ([689780a](https://github.com/instructure/instructure-ui/commit/689780a))
- **ui-view:** optimize View in test and prod ([3d4ea25](https://github.com/instructure/instructure-ui/commit/3d4ea25))

### Features

- **instui-cli,instui-config:** add a default parser configuration file ([c25bb88](https://github.com/instructure/instructure-ui/commit/c25bb88))

# [6.23.0](https://github.com/instructure/instructure-ui/compare/v6.22.0...v6.23.0) (2020-04-02)

### Bug Fixes

- **ui-buttons:** fix canvas custom theming for primary Button text ([7672ee9](https://github.com/instructure/instructure-ui/commit/7672ee9))
- **ui-buttons:** fix issue with button theme overrides ([4022c95](https://github.com/instructure/instructure-ui/commit/4022c95))
- **ui-docs-client,ui-modal:** modalbody using undefined theme var ([66e0a16](https://github.com/instructure/instructure-ui/commit/66e0a16))
- **ui-tabs:** correct mis-named theme variable for Tabs.Panel ([35ce38b](https://github.com/instructure/instructure-ui/commit/35ce38b))

### Features

- **instui-config,canvas-ams-theme,ui-themes,ui-view:** add canvas-ams-theme ([f31849f](https://github.com/instructure/instructure-ui/commit/f31849f))
- **instui-config,ui-codemods,ui-scripts,ui-upgrade-scripts:** named imports for codemods ([a7db548](https://github.com/instructure/instructure-ui/commit/a7db548))
- **ui-docs-client:** update deprecated components still in use ([4543717](https://github.com/instructure/instructure-ui/commit/4543717))
- **ui-icons:** add-folder, add-media and record icons ([c1c7d67](https://github.com/instructure/instructure-ui/commit/c1c7d67))
- **ui-select,ui-text-input:** allow size attr on Select/TextInput ([025a564](https://github.com/instructure/instructure-ui/commit/025a564))
- **ui-simple-select,ui-table:** update select in sortable tables ([36e8b19](https://github.com/instructure/instructure-ui/commit/36e8b19))

# [6.22.0](https://github.com/instructure/instructure-ui/compare/v6.21.0...v6.22.0) (2020-03-16)

### Bug Fixes

- **ui-date-input:** allow passthrough props in DateInput ([7228baa](https://github.com/instructure/instructure-ui/commit/7228baa))
- **ui-popover:** allow tooltip to manage its focus region ([8391f4f](https://github.com/instructure/instructure-ui/commit/8391f4f))
- **ui-tag:** show cut off letter descenders ([b4cad27](https://github.com/instructure/instructure-ui/commit/b4cad27))
- **ui-time-select:** make TimeSelect test less brittle ([42a90c7](https://github.com/instructure/instructure-ui/commit/42a90c7))

### Features

- **canvas-theme,ui-docs-client:** theme color docs enhancements ([69a1938](https://github.com/instructure/instructure-ui/commit/69a1938))
- **ui-docs-client:** add Google analytics to docs app ([748c1e2](https://github.com/instructure/instructure-ui/commit/748c1e2))
- **ui-docs-client:** ensure button upgrade examples render 'canvas theme' ([4d68de9](https://github.com/instructure/instructure-ui/commit/4d68de9))
- **ui-menu:** restore support for mountNode ([b53ec24](https://github.com/instructure/instructure-ui/commit/b53ec24))
- **ui-select:** allow override of autocomplete attr in Select ([41e09ac](https://github.com/instructure/instructure-ui/commit/41e09ac))
- **ui-select,ui-simple-select:** add mountNode prop to Select ([a8b60a6](https://github.com/instructure/instructure-ui/commit/a8b60a6))
- **ui-time-select:** add TimeSelect component ([1dfa39b](https://github.com/instructure/instructure-ui/commit/1dfa39b))

# [6.21.0](https://github.com/instructure/instructure-ui/compare/v6.20.0...v6.21.0) (2020-02-26)

### Bug Fixes

- **ui-breadcrumb:** ensure Breakcrumb.Link icon + renderIcon props work ([14e5f1c](https://github.com/instructure/instructure-ui/commit/14e5f1c))
- **ui-navigation:** fix position/transition of Nav expand/collapse button ([c18dcab](https://github.com/instructure/instructure-ui/commit/c18dcab))

### Features

- **ui-heading:** Accept multiple font families ([da12bb8](https://github.com/instructure/instructure-ui/commit/da12bb8))
- **ui-select:** Add a SimpleSelect component ([a7ed234](https://github.com/instructure/instructure-ui/commit/a7ed234))
- **ui-themeable:** use hash instead of randomly generated component id when styles are null ([62ac665](https://github.com/instructure/instructure-ui/commit/62ac665))

# [6.20.0](https://github.com/instructure/instructure-ui/compare/v6.19.0...v6.20.0) (2020-02-13)

### Bug Fixes

- **ui-themeable:** check JSDOM environment ([5ef3244](https://github.com/instructure/instructure-ui/commit/5ef3244))

### Features

- **ui-docs-client:** update deprecated lifecycle in Playground ([9c6888f](https://github.com/instructure/instructure-ui/commit/9c6888f))
- **ui-motion:** update deprecated lifeycles from ui-motion ([9d0593e](https://github.com/instructure/instructure-ui/commit/9d0593e))
- **ui-text-input:** Add shouldNotWrap property ([cca1201](https://github.com/instructure/instructure-ui/commit/cca1201))
- **ui-themeable:** allow theme adapter to map a single old value to multiple new values ([8b5bb3f](https://github.com/instructure/instructure-ui/commit/8b5bb3f))

# [6.19.0](https://github.com/instructure/instructure-ui/compare/v6.18.0...v6.19.0) (2020-02-11)

### Bug Fixes

- **ui-expandable:** replace componentWillReceiveProps ([d59f529](https://github.com/instructure/instructure-ui/commit/d59f529))
- **ui-select:** ensure Select.Group imports .Option ([8dc609f](https://github.com/instructure/instructure-ui/commit/8dc609f))

### Features

- undeprecate disabled and readOnly in inputs ([79cf68f](https://github.com/instructure/instructure-ui/commit/79cf68f))
- **instructure-theme:** add instructure-theme ([df088ec](https://github.com/instructure/instructure-ui/commit/df088ec))
- **instui-cli,instui-config,ui-upgrade-scripts:** eliminate parser errors when running codemods ([0430c6b](https://github.com/instructure/instructure-ui/commit/0430c6b))
- **ui-docs-client:** use updated Button throughout docs/components ([9f0be81](https://github.com/instructure/instructure-ui/commit/9f0be81))
- **ui-link:** un-deprecate disabled in Link ([a8df168](https://github.com/instructure/instructure-ui/commit/a8df168))

# [6.18.0](https://github.com/instructure/instructure-ui/compare/v6.17.0...v6.18.0) (2020-02-04)

### Bug Fixes

- **ui-flex:** adopt more children types ([1f2ac25](https://github.com/instructure/instructure-ui/commit/1f2ac25))
- **ui-menu:** update Popover import to new package align updated props ([77176a7](https://github.com/instructure/instructure-ui/commit/77176a7))
- **ui-pill:** update TruncateText import to new package ([8957e76](https://github.com/instructure/instructure-ui/commit/8957e76))
- **ui-responsive:** responsive rendering fixes ([93627a6](https://github.com/instructure/instructure-ui/commit/93627a6))
- **ui-table:** loosen caption prop ([97cf3e7](https://github.com/instructure/instructure-ui/commit/97cf3e7))

### Features

- **instui-config,ui-buttons,ui-react-utils:** un-deprecate disabled and readOnly in button ([8041bbf](https://github.com/instructure/instructure-ui/commit/8041bbf))
- **instui-config,ui-buttons,ui-themeable:** upgrade Button ([ed73df1](https://github.com/instructure/instructure-ui/commit/ed73df1))
- **ui-buttons:** Add ToggleButton component ([4e25cfc](https://github.com/instructure/instructure-ui/commit/4e25cfc))
- **ui-buttons:** Update CloseButton to use upgraded Button props ([365e0ac](https://github.com/instructure/instructure-ui/commit/365e0ac))
- **ui-react-utils,ui-scripts,ui-webpack-config:** env variable to omit deprecation warnings ([6cc3193](https://github.com/instructure/instructure-ui/commit/6cc3193))

# [6.17.0](https://github.com/instructure/instructure-ui/compare/v6.16.0...v6.17.0) (2020-01-22)

### Bug Fixes

- Update Package READMEs and align deprecation statements ([8f892e4](https://github.com/instructure/instructure-ui/commit/8f892e4))
- **docs:** Update MIT License link ([13a9dff](https://github.com/instructure/instructure-ui/commit/13a9dff))
- **ui-billboard,ui-dialog,ui-expandable,ui-options,ui-text-input,ui-tooltip:** devDep audit ([c1f0dc0](https://github.com/instructure/instructure-ui/commit/c1f0dc0))
- **ui-forms:** add back the export of CheckboxFacade and ToggleFacade ([e5dc547](https://github.com/instructure/instructure-ui/commit/e5dc547))
- **ui-karma-config:** Stop eating top-level test suite errors ([7324d35](https://github.com/instructure/instructure-ui/commit/7324d35))
- **ui-number-input:** add type="button" to buttons ([5f66aff](https://github.com/instructure/instructure-ui/commit/5f66aff))
- **ui-table:** sort arrow should not change place based on cell alignment ([f1e0c29](https://github.com/instructure/instructure-ui/commit/f1e0c29))
- **ui-test-utils:** prevent test sandbox initialization in production and development ([80d9bc1](https://github.com/instructure/instructure-ui/commit/80d9bc1))

### Features

- **babel-plugin-transform-imports:** allow imports that are not at the root level of src ([d239362](https://github.com/instructure/instructure-ui/commit/d239362))
- **template-app:** update import paths to new packages ([bd78d0b](https://github.com/instructure/instructure-ui/commit/bd78d0b))
- **ui-babel-preset:** allow for specifying additional import transforms ([908c8d5](https://github.com/instructure/instructure-ui/commit/908c8d5))
- **ui-breadcrumb,ui-link,ui-elements:** address Links underlining ([388b8cc](https://github.com/instructure/instructure-ui/commit/388b8cc))
- **ui-docs-client:** allow for embedding code inline with markdown ([aea7989](https://github.com/instructure/instructure-ui/commit/aea7989))
- **ui-editable:** use IconButton internally for edit button ([8031721](https://github.com/instructure/instructure-ui/commit/8031721))
- **ui-forms:** export old Select subcomponents ([ecbcbf6](https://github.com/instructure/instructure-ui/commit/ecbcbf6))
- **ui-icons:** add 'audio-off' icon ([8f5030c](https://github.com/instructure/instructure-ui/commit/8f5030c))
- **ui-icons:** add comments-off and comments-on icons ([650a42a](https://github.com/instructure/instructure-ui/commit/650a42a))
- **ui-overlays:** update deprecated lifecycles in Overlay ([dddda64](https://github.com/instructure/instructure-ui/commit/dddda64))
- **ui-pagination:** use IconButton internally for the "previous/next" ([a0075e1](https://github.com/instructure/instructure-ui/commit/a0075e1))
- **ui-svg-images:** add `auto` height/width ([abf52f1](https://github.com/instructure/instructure-ui/commit/abf52f1))
- **ui-toggle-details:** use IconButton internally for the toggle btn ([f1679c4](https://github.com/instructure/instructure-ui/commit/f1679c4))

### Performance Improvements

- **ui-responsive:** responsive performance enhancements ([5096c00](https://github.com/instructure/instructure-ui/commit/5096c00))

# [6.16.0](https://github.com/instructure/instructure-ui/compare/v6.15.0...v6.16.0) (2019-12-13)

### Bug Fixes

- **ui-a11y-utils:** fix ui-a11y-utils dependencies ([d431666](https://github.com/instructure/instructure-ui/commit/d431666))
- **ui-docs-client:** remove unnecessary import of ScreenReaderContent ([07d453b](https://github.com/instructure/instructure-ui/commit/07d453b))
- **ui-modal:** update deprecated lifecycles in modal ([eaa0c9d](https://github.com/instructure/instructure-ui/commit/eaa0c9d))
- **ui-tooltip:** uncontrolled example broken ([9d19413](https://github.com/instructure/instructure-ui/commit/9d19413))

### Features

- **instui-cli,ui-scripts,ui-template-scripts:** add a new ui-template-scripts package ([e3669ba](https://github.com/instructure/instructure-ui/commit/e3669ba))
- **instui-cli,ui-upgrade-scripts:** add a new ui-upgrade-scripts package ([f5067ee](https://github.com/instructure/instructure-ui/commit/f5067ee))
- **ui-badge:** add ui-badge package ([8de4dae](https://github.com/instructure/instructure-ui/commit/8de4dae))
- **ui-buttons:** add a CondensedButton component ([e807b1c](https://github.com/instructure/instructure-ui/commit/e807b1c))
- **ui-buttons:** add an IconButton component ([e170d95](https://github.com/instructure/instructure-ui/commit/e170d95))
- **ui-byline,ui-layout:** add ui-byline package ([4be733d](https://github.com/instructure/instructure-ui/commit/4be733d))
- **ui-checkbox:** add ui-checkbox package ([94840fa](https://github.com/instructure/instructure-ui/commit/94840fa))
- **ui-docs-client:** make content within docs pages navigable via linking ([595f155](https://github.com/instructure/instructure-ui/commit/595f155))
- **ui-docs-client:** updates to compileMarkdown for id generation ([832f7b2](https://github.com/instructure/instructure-ui/commit/832f7b2))
- **ui-drawer-layout:** add ui-drawer-layout package ([2c59227](https://github.com/instructure/instructure-ui/commit/2c59227))
- **ui-elements:** add isWithinText prop to ui-element Link ([9d0ee8e](https://github.com/instructure/instructure-ui/commit/9d0ee8e))
- **ui-elements,ui-truncate-text:** add ui-truncate-text package ([75500f9](https://github.com/instructure/instructure-ui/commit/75500f9))
- **ui-expandable:** add ui-expandable package ([6e5bfd3](https://github.com/instructure/instructure-ui/commit/6e5bfd3))
- **ui-forms,ui-radio-input:** add ui-radio-input package ([151edd9](https://github.com/instructure/instructure-ui/commit/151edd9))
- **ui-forms,ui-text-area:** add ui-text-area package ([e116712](https://github.com/instructure/instructure-ui/commit/e116712))
- **ui-navigation:** remove experimental pill from AppNav ([e460042](https://github.com/instructure/instructure-ui/commit/e460042))
- **ui-range-input:** ui-range-input package ([48c2786](https://github.com/instructure/instructure-ui/commit/48c2786))
- **ui-responsive:** add ui-responsive package ([13616d2](https://github.com/instructure/instructure-ui/commit/13616d2))
- **ui-spinner:** ui-spinner and design updates ([c80c40c](https://github.com/instructure/instructure-ui/commit/c80c40c))
- **ui-themeable:** update deprecated lifecycles in themeable ([a581b70](https://github.com/instructure/instructure-ui/commit/a581b70))
- **ui-tray:** ui-tray package ([07d7399](https://github.com/instructure/instructure-ui/commit/07d7399))

# [6.15.0](https://github.com/instructure/instructure-ui/compare/v6.14.0...v6.15.0) (2019-11-18)

### Bug Fixes

- **ui-dom-utils:** prevent recursive textNode checks ([c06a7f9](https://github.com/instructure/instructure-ui/commit/c06a7f9))
- **ui-elements:** remove redundant TruncateText test ([ea222d3](https://github.com/instructure/instructure-ui/commit/ea222d3))
- **ui-focusable:** fix edge case with getSnapshotBeforeUpdate ([895d131](https://github.com/instructure/instructure-ui/commit/895d131))
- **ui-react-utils:** fix deprecated util functions in production ([1c09675](https://github.com/instructure/instructure-ui/commit/1c09675))
- **ui-react-utils:** omit children from passthroughProps ([c0e9cff](https://github.com/instructure/instructure-ui/commit/c0e9cff))
- **ui-select:** prevent cursor for uneditable selects ([2e2540a](https://github.com/instructure/instructure-ui/commit/2e2540a))
- **ui-tooltip:** update Tooltip dependency ([98a1617](https://github.com/instructure/instructure-ui/commit/98a1617))
- **ui-view:** allow View to use native browser focus ([7686f1b](https://github.com/instructure/instructure-ui/commit/7686f1b))

### Features

- ensure all packages have build script for types ([4891dc4](https://github.com/instructure/instructure-ui/commit/4891dc4))
- Move React to a peer dependency ([9648ca3](https://github.com/instructure/instructure-ui/commit/9648ca3))
- **instui-cli,template-component:** add react as a peer dep when generating components ([b8ca302](https://github.com/instructure/instructure-ui/commit/b8ca302))
- **template-component:** include types in component generation template ([ae9ce15](https://github.com/instructure/instructure-ui/commit/ae9ce15))
- **ui-a11y-content:** remove experimental flag from ui-a11y-content package ([ce96006](https://github.com/instructure/instructure-ui/commit/ce96006))
- **ui-a11y-utils,ui-dialog:** add ui-a11y-utils and ui-dialog ([c88cf8e](https://github.com/instructure/instructure-ui/commit/c88cf8e))
- **ui-alerts:** update deprecated lifeycles in Alert ([aac0930](https://github.com/instructure/instructure-ui/commit/aac0930))
- **ui-alerts,Alert:** make aria-atomic configurable ([502b3d9](https://github.com/instructure/instructure-ui/commit/502b3d9))
- **ui-avatar:** make ui-avatar backwards compatible ([c94255d](https://github.com/instructure/instructure-ui/commit/c94255d))
- **ui-buttons:** add a BaseButton component ([dbb83cd](https://github.com/instructure/instructure-ui/commit/dbb83cd))
- **ui-calendar:** reduce calendar test noise ([b5fea9b](https://github.com/instructure/instructure-ui/commit/b5fea9b))
- **ui-docs-client:** Add first InstUI Insider content ([acc4744](https://github.com/instructure/instructure-ui/commit/acc4744))
- **ui-docs-client,ui-elements:** ensure ui-docs-client is using Table from ui-table ([5788fce](https://github.com/instructure/instructure-ui/commit/5788fce))
- **ui-file-drop:** make ui-file-drop backwards compatible ([0534ca2](https://github.com/instructure/instructure-ui/commit/0534ca2))
- **ui-flex,ui-layout:** make ui-flex backwards compatible ([c11cc6b](https://github.com/instructure/instructure-ui/commit/c11cc6b))
- **ui-focusable:** update deprecated lifecycles in Focusable ([696c998](https://github.com/instructure/instructure-ui/commit/696c998))
- **ui-grid:** add ui-grid package ([3921f32](https://github.com/instructure/instructure-ui/commit/3921f32))
- **ui-heading:** make ui-heading backwards compatible ([c4f9541](https://github.com/instructure/instructure-ui/commit/c4f9541))
- **ui-icons-build,ui-icons:** fix icon build and add studio, certified ([90d01f4](https://github.com/instructure/instructure-ui/commit/90d01f4))
- **ui-img:** make ui-img backwards compatible ([ff7d2b6](https://github.com/instructure/instructure-ui/commit/ff7d2b6))
- **ui-link:** Make ui-link/Link backwards compatible ([3e62c49](https://github.com/instructure/instructure-ui/commit/3e62c49))
- **ui-list:** add ui-list package ([7c867af](https://github.com/instructure/instructure-ui/commit/7c867af))
- **ui-metric:** add ui-metric package ([d4b6dd3](https://github.com/instructure/instructure-ui/commit/d4b6dd3))
- **ui-modal:** add ui-modal package ([a9c5cee](https://github.com/instructure/instructure-ui/commit/a9c5cee))
- **ui-overlays,ui-tooltip:** expose positionTarget prop on Tooltip ([6c1a545](https://github.com/instructure/instructure-ui/commit/6c1a545))
- **ui-pill:** make ui-pill backwards compatible ([480eeb7](https://github.com/instructure/instructure-ui/commit/480eeb7))
- **ui-popover:** make ui-popover backwards compatible ([d9437ae](https://github.com/instructure/instructure-ui/commit/d9437ae))
- **ui-position:** make ui-position backwards compatible ([24e90d1](https://github.com/instructure/instructure-ui/commit/24e90d1))
- **ui-progress:** add ui-progress package ([4dfcf4a](https://github.com/instructure/instructure-ui/commit/4dfcf4a))
- **ui-rating:** add ui-rating package ([3fa4129](https://github.com/instructure/instructure-ui/commit/3fa4129))
- **ui-react-utils:** allow for completely custom message in deprecatePropValues ([9a86beb](https://github.com/instructure/instructure-ui/commit/9a86beb))
- **ui-react-utils:** update deprecated lifecycles in decorators ([87295bf](https://github.com/instructure/instructure-ui/commit/87295bf))
- **ui-tag:** ui-tag package ([dbf87ca](https://github.com/instructure/instructure-ui/commit/dbf87ca))
- **ui-text:** make ui-text backwards compatible ([7aabd6a](https://github.com/instructure/instructure-ui/commit/7aabd6a))
- **ui-text-input:** make ui-text-input backwards compatible ([b9d889d](https://github.com/instructure/instructure-ui/commit/b9d889d))
- **ui-themeable:** allow components to specify a theme adapter ([8be3d42](https://github.com/instructure/instructure-ui/commit/8be3d42))
- **ui-tooltip:** make ui-tooltip backwards compatible ([7608e7c](https://github.com/instructure/instructure-ui/commit/7608e7c))
- **ui-tooltip:** update tooltip callback naming ([2b26d54](https://github.com/instructure/instructure-ui/commit/2b26d54))
- **ui-view:** Make ui-view backwards-compatible ([7dd2a2f](https://github.com/instructure/instructure-ui/commit/7dd2a2f))
- **ui-view:** move ContextView to ui-view package ([4601b4a](https://github.com/instructure/instructure-ui/commit/4601b4a))

### Performance Improvements

- **ui-tooltip:** remove Focusable from Tooltip ([83aa0c9](https://github.com/instructure/instructure-ui/commit/83aa0c9))

# [6.14.0](https://github.com/instructure/instructure-ui/compare/v6.13.0...v6.14.0) (2019-10-14)

### Bug Fixes

- **instui-config:** fix typos in propName codemod config ([81f1975](https://github.com/instructure/instructure-ui/commit/81f1975))
- **ui-elements:** fix TruncateText's componentDidUpdate logic ([5055515](https://github.com/instructure/instructure-ui/commit/5055515))
- **ui-file-drop,ui-pill:** update babel ([a7a8489](https://github.com/instructure/instructure-ui/commit/a7a8489))
- **ui-react-utils:** fix production errors for decorator functions ([f5da64c](https://github.com/instructure/instructure-ui/commit/f5da64c))
- **ui-table:** ignore falsy children in Table.Row ([dae5db6](https://github.com/instructure/instructure-ui/commit/dae5db6))

### Features

- **ui-file-drop:** add ui-file-drop package ([b275521](https://github.com/instructure/instructure-ui/commit/b275521))
- **ui-heading:** add ui-heading package ([b681432](https://github.com/instructure/instructure-ui/commit/b681432))
- **ui-link:** add ui-link package ([fa75902](https://github.com/instructure/instructure-ui/commit/fa75902))
- **ui-position:** add ui-position package ([5511a88](https://github.com/instructure/instructure-ui/commit/5511a88))
- **ui-tooltip:** add ui-tooltip package ([2e88e8a](https://github.com/instructure/instructure-ui/commit/2e88e8a))

### Performance Improvements

- **ui-react-utils:** make dev-only decorators really noops in prod ([f2f4865](https://github.com/instructure/instructure-ui/commit/f2f4865))
- **ui-testable:** make ui-testable have no cost in prod ([5ab79fa](https://github.com/instructure/instructure-ui/commit/5ab79fa))
- **ui-view:** don't call verifySpanMargin in prod mode ([60e0c2f](https://github.com/instructure/instructure-ui/commit/60e0c2f))

# [6.13.0](https://github.com/instructure/instructure-ui/compare/v6.12.0...v6.13.0) (2019-09-24)

### Bug Fixes

- **instui-config:** fix v7 codemod paths ([918d38f](https://github.com/instructure/instructure-ui/commit/918d38f))
- **ui-focusable:** fix focus race condition with label / checkbox ([54da3ed](https://github.com/instructure/instructure-ui/commit/54da3ed))
- **ui-scripts:** follow-up fix to g/209544 ([bc6945b](https://github.com/instructure/instructure-ui/commit/bc6945b))

### Features

- **ui-elements:** allow TruncateText to force truncation of hidden text ([66bbf82](https://github.com/instructure/instructure-ui/commit/66bbf82))
- **ui-elements,ui-pill:** add ui-pill package for the Pill Component ([4a71024](https://github.com/instructure/instructure-ui/commit/4a71024))
- **ui-react-utils:** add hack decorator ([1351477](https://github.com/instructure/instructure-ui/commit/1351477))

### Performance Improvements

- **console:** help terser dead-code-eliminate console funcs ([323c469](https://github.com/instructure/instructure-ui/commit/323c469))

# [6.12.0](https://github.com/instructure/instructure-ui/compare/v6.11.0...v6.12.0) (2019-09-17)

### Bug Fixes

- **ui-utils:** export isEdge from the root of @instructure/ui-utils ([b97f3fe](https://github.com/instructure/instructure-ui/commit/b97f3fe))

### Features

- **ui-babel-preset:** add support for javascript optional chaining ([e56d64b](https://github.com/instructure/instructure-ui/commit/e56d64b))

# [6.11.0](https://github.com/instructure/instructure-ui/compare/v6.10.0...v6.11.0) (2019-09-16)

### Bug Fixes

- **instui-cli:** fix incorrect spacing for dependencies when generating package ([b1bbfe9](https://github.com/instructure/instructure-ui/commit/b1bbfe9))
- **ui-babel-preset:** ensure runtime helper is used for \_objectSpread ([2eb42d7](https://github.com/instructure/instructure-ui/commit/2eb42d7))
- **ui-karma-config:** run all tests if one test file fails to load ([a8dab36](https://github.com/instructure/instructure-ui/commit/a8dab36))
- **ui-layout:** DrawerTray content needs 100% height ([500af47](https://github.com/instructure/instructure-ui/commit/500af47))
- **ui-overlays:** do not unset duration for modals ([0b304e7](https://github.com/instructure/instructure-ui/commit/0b304e7))
- **ui-react-utils:** provide correct contextual binding for lifecycle methods in experimental ([9aeeb19](https://github.com/instructure/instructure-ui/commit/9aeeb19))
- **ui-tabs:** pass id in Tabs onRequestTabChange handler ([6d58611](https://github.com/instructure/instructure-ui/commit/6d58611))
- **ui-view:** fix border colors in Edge HCM ([091dde3](https://github.com/instructure/instructure-ui/commit/091dde3))

### Features

- **ui-a11y-content,ui-a11y:** add ui-a11y-content package ([cb49c7a](https://github.com/instructure/instructure-ui/commit/cb49c7a))
- **ui-avatar,ui-elements:** add ui-avatar package for Avatar component ([34a6001](https://github.com/instructure/instructure-ui/commit/34a6001))
- **ui-elements,ui-img:** add ui-img package for Img Component ([c2e4e7d](https://github.com/instructure/instructure-ui/commit/c2e4e7d))
- **ui-elements,ui-text:** add ui-text Package for Text Component ([5bdb65a](https://github.com/instructure/instructure-ui/commit/5bdb65a))
- **ui-flex:** add ui-flex package ([98730ff](https://github.com/instructure/instructure-ui/commit/98730ff))
- **ui-navigation:** Responsive AppNav ([dd843d0](https://github.com/instructure/instructure-ui/commit/dd843d0))
- **ui-popover:** Add ui-popover package ([62c1165](https://github.com/instructure/instructure-ui/commit/62c1165))
- **ui-react-utils:** add flag to suppress experimental warnings ([d30e678](https://github.com/instructure/instructure-ui/commit/d30e678))
- **ui-react-utils:** pass props in callRenderProp ([042bc84](https://github.com/instructure/instructure-ui/commit/042bc84))
- **ui-scripts:** enable ui-scripts to post to multiple slack channels ([ee796c2](https://github.com/instructure/instructure-ui/commit/ee796c2))
- **ui-view:** add ui-view Package for View Component ([7799577](https://github.com/instructure/instructure-ui/commit/7799577))
- **ui-view:** mark ui-view as experimental ([6b805fa](https://github.com/instructure/instructure-ui/commit/6b805fa))

### Performance Improvements

- **ui-utils:** stop using bowser for browser detection ([95f1232](https://github.com/instructure/instructure-ui/commit/95f1232))

# [6.10.0](https://github.com/instructure/instructure-ui/compare/v6.9.0...v6.10.0) (2019-08-27)

### Bug Fixes

- **ui-a11y:** prevent errors w/ x-domain iframes in FocusRegion ([83267f1](https://github.com/instructure/instructure-ui/commit/83267f1))
- **ui-alerts:** fix React warnings emitted from Alert.updateScreenreaderAlert ([c97e64d](https://github.com/instructure/instructure-ui/commit/c97e64d))
- **ui-docs-plugin:** fix docs in IE11 ([65a875c](https://github.com/instructure/instructure-ui/commit/65a875c))
- **ui-layout:** Map theme vars to Canvas vars ([7f21fec](https://github.com/instructure/instructure-ui/commit/7f21fec))
- **ui-pagination:** fix pagination buttons ([be78f69](https://github.com/instructure/instructure-ui/commit/be78f69))
- **ui-stylesheet,ui-themeable:** error when gt 1 copies of themeable ([b1e8164](https://github.com/instructure/instructure-ui/commit/b1e8164))
- **ui-table:** add aria-sort attributes to Table header ([eb802f1](https://github.com/instructure/instructure-ui/commit/eb802f1))
- **ui-tabs:** don't pass through onChange attr ([3e185d1](https://github.com/instructure/instructure-ui/commit/3e185d1))
- **ui-themeable:** revert the "newless" change ([c4ce9ba](https://github.com/instructure/instructure-ui/commit/c4ce9ba))

### Features

- **ui-forms:** disabled/readOnly in FileDrop ([86f323c](https://github.com/instructure/instructure-ui/commit/86f323c))

# [6.9.0](https://github.com/instructure/instructure-ui/compare/v6.8.1...v6.9.0) (2019-08-07)

### Bug Fixes

- **ui-themeable:** make themeable work with real `class`es ([ec0d5b9](https://github.com/instructure/instructure-ui/commit/ec0d5b9))

### Features

- **ui-forms:** add labelPlacement property ([39225ca](https://github.com/instructure/instructure-ui/commit/39225ca))

## [6.8.1](https://github.com/instructure/instructure-ui/compare/v6.8.0...v6.8.1) (2019-08-02)

### Bug Fixes

- **ui-a11y:** convert getElementsByTagName results to Array ([4e7c07a](https://github.com/instructure/instructure-ui/commit/4e7c07a))

# [6.8.0](https://github.com/instructure/instructure-ui/compare/v6.7.0...v6.8.0) (2019-07-31)

### Bug Fixes

- **template-component:** Update template and docs ([c1913e1](https://github.com/instructure/instructure-ui/commit/c1913e1))
- **ui-a11y,ui-overlays:** fix tray/dialog document click behaviors ([1130a73](https://github.com/instructure/instructure-ui/commit/1130a73))
- **ui-forms:** keep escape from closing modals when a file selection dialog is open ([321c246](https://github.com/instructure/instructure-ui/commit/321c246))
- **ui-react-utils:** handle fat arrow functions in callRenderProp ([6e0d0c8](https://github.com/instructure/instructure-ui/commit/6e0d0c8))
- **ui-select,ui-selectable:** stop event propagation from selectable ([fc75997](https://github.com/instructure/instructure-ui/commit/fc75997))
- **ui-test-utils:** reset viewport in init/before hook ([f271a5b](https://github.com/instructure/instructure-ui/commit/f271a5b))

### Features

- **browserslist-config-instui,ui-eslint-config:** add browserslist pkg, browser compat linting ([6fcee36](https://github.com/instructure/instructure-ui/commit/6fcee36))
- **ui-webpack-config:** Add a env var to disable linter failure on warnings ([ace5500](https://github.com/instructure/instructure-ui/commit/ace5500))

# [6.7.0](https://github.com/instructure/instructure-ui/compare/v6.6.0...v6.7.0) (2019-07-15)

### Bug Fixes

- **ui-editable:** move keyUp handler for escape handling ([4d197d3](https://github.com/instructure/instructure-ui/commit/4d197d3))

### Features

- **ui-forms:** allow all children in RadioInputGroup ([d7ca99a](https://github.com/instructure/instructure-ui/commit/d7ca99a))
- **ui-icons:** add Admin Tools, ePortfolio, Permissions, Sub-Accounts ([7c910ad](https://github.com/instructure/instructure-ui/commit/7c910ad))

# [6.6.0](https://github.com/instructure/instructure-ui/compare/v6.5.0...v6.6.0) (2019-07-03)

### Bug Fixes

- **template-app,template-component,template-package:** remove npmignore files from template packages ([e0b7136](https://github.com/instructure/instructure-ui/commit/e0b7136))
- **template-app,template-component,template-package,ui-scripts:** rename templates for npm ([1749abd](https://github.com/instructure/instructure-ui/commit/1749abd))

### Features

- **ui-scripts:** retrieve GitHub url from config instead of package.json ([c62b01e](https://github.com/instructure/instructure-ui/commit/c62b01e))

# [6.5.0](https://github.com/instructure/instructure-ui/compare/v6.4.0...v6.5.0) (2019-07-01)

### Bug Fixes

- add missing exports ([10044d4](https://github.com/instructure/instructure-ui/commit/10044d4))
- **instui-config,ui-tabs:** deprecate focus prop and add shouldFocusOnRender ([6f26701](https://github.com/instructure/instructure-ui/commit/6f26701))
- **ui-date-input:** align calendar icon ([32c9d9d](https://github.com/instructure/instructure-ui/commit/32c9d9d))
- **ui-date-input,ui-text-input:** add assistiveText prop to DateInput ([20ed322](https://github.com/instructure/instructure-ui/commit/20ed322))
- **ui-elements:** replace componentWillReceiveProps logic in TruncateText ([a7fa13d](https://github.com/instructure/instructure-ui/commit/a7fa13d))
- **ui-number-input:** update NumberInput prop names ([7cad427](https://github.com/instructure/instructure-ui/commit/7cad427))
- **ui-scripts:** Make fix flag work when no paths are passed to the lint command ([ed0cb15](https://github.com/instructure/instructure-ui/commit/ed0cb15))
- **ui-select:** scroll logic and example updates ([fd91714](https://github.com/instructure/instructure-ui/commit/fd91714))
- **ui-tabs:** tabbable content in a tab panel should be tabbable ([4753bd3](https://github.com/instructure/instructure-ui/commit/4753bd3))
- **ui-tabs:** update canvas theme variables to new variants ([6472a51](https://github.com/instructure/instructure-ui/commit/6472a51))
- **ui-test-utils:** remove window/document event listener cleanup ([9fb45b3](https://github.com/instructure/instructure-ui/commit/9fb45b3))
- **ui-text-input:** set line height to prevent truncating descenders ([4cb3666](https://github.com/instructure/instructure-ui/commit/4cb3666))
- **ui-text-input:** update TextInput prop names ([3aedab8](https://github.com/instructure/instructure-ui/commit/3aedab8))

### Features

- **instui-cli,template-app,ui-scripts:** add an instui starter app ([3f0f00e](https://github.com/instructure/instructure-ui/commit/3f0f00e))
- **instui-cli,template-component,ui-scripts:** Generate component script ([8b8480e](https://github.com/instructure/instructure-ui/commit/8b8480e))
- **instui-cli,template-package,ui-scripts:** move generate package script to instui-cli ([69f1613](https://github.com/instructure/instructure-ui/commit/69f1613))
- **instui-config,ui-date-input:** dateInput change label prop to renderLabel ([a172999](https://github.com/instructure/instructure-ui/commit/a172999))
- **ui-docs-client:** Add What's New page to docs ([64126d6](https://github.com/instructure/instructure-ui/commit/64126d6))
- **ui-elements:** Added `wrap` prop to Text ([b17daba](https://github.com/instructure/instructure-ui/commit/b17daba))
- **ui-icons:** add "code" icon ([b330455](https://github.com/instructure/instructure-ui/commit/b330455))
- **ui-icons:** add text-direction rtl and ltr icons ([3b91145](https://github.com/instructure/instructure-ui/commit/3b91145))
- **ui-navigation:** appNav component ([8f2d874](https://github.com/instructure/instructure-ui/commit/8f2d874))
- **ui-scripts:** allow open sandbox script to function in monorepo without repo name or username ([919d966](https://github.com/instructure/instructure-ui/commit/919d966))
- **ui-scripts:** expand codemod extensions to accept .jsx ([e217bb2](https://github.com/instructure/instructure-ui/commit/e217bb2))

# [6.4.0](https://github.com/instructure/instructure-ui/compare/v6.3.0...v6.4.0) (2019-06-13)

### Bug Fixes

- **ui-breadcrumb:** separator color ([e0c7fe0](https://github.com/instructure/instructure-ui/commit/e0c7fe0))
- **ui-component-examples:** prevent OOM when generating View examples ([df5f505](https://github.com/instructure/instructure-ui/commit/df5f505))
- **ui-component-examples:** support components w/ no props/values ([4c76e2b](https://github.com/instructure/instructure-ui/commit/4c76e2b))
- **ui-layout:** pass down elementRef to Flex and Flex.Item ([4dfb941](https://github.com/instructure/instructure-ui/commit/4dfb941))

### Features

- **ui-alerts:** add renderCloseButtonLabel to Alert ([4684530](https://github.com/instructure/instructure-ui/commit/4684530))
- **ui-eslint-config:** enable react/no-typos rule ([d8fc415](https://github.com/instructure/instructure-ui/commit/d8fc415))
- **ui-forms,ui-selectable:** deprecate ui-forms select ([1f7b53d](https://github.com/instructure/instructure-ui/commit/1f7b53d))
- **ui-icons:** add closed-captioning icon ([58444ee](https://github.com/instructure/instructure-ui/commit/58444ee))
- **ui-icons:** add miscellaneous 'table' icons to ui-icons ([8ec7a8b](https://github.com/instructure/instructure-ui/commit/8ec7a8b))
- **ui-icons:** update solid version of 'Dashboard' and 'Inbox' icons ([33a8b4c](https://github.com/instructure/instructure-ui/commit/33a8b4c))
- **ui-icons:** update svg exports for misc icons ([319abb7](https://github.com/instructure/instructure-ui/commit/319abb7))
- **ui-layout:** Add focus styles to View ([2dd401c](https://github.com/instructure/instructure-ui/commit/2dd401c))
- **ui-scripts:** add open-sandbox script ([093076a](https://github.com/instructure/instructure-ui/commit/093076a))
- **ui-scripts:** addition of a monorepo open sandbox command ([7fd349d](https://github.com/instructure/instructure-ui/commit/7fd349d))
- **ui-select:** add controlled select ([634ab1a](https://github.com/instructure/instructure-ui/commit/634ab1a))

# [6.3.0](https://github.com/instructure/instructure-ui/compare/v6.2.0...v6.3.0) (2019-05-28)

### Bug Fixes

- **ui-a11y:** dialogs with non focusable children should contain focus when shouldContainFocus ([f72a179](https://github.com/instructure/instructure-ui/commit/f72a179))
- **ui-elements:** Change scoping of Link color ([09028b8](https://github.com/instructure/instructure-ui/commit/09028b8))
- **ui-elements:** fix typo in componentWillUnmount ([093c47e](https://github.com/instructure/instructure-ui/commit/093c47e))
- **ui-portal:** remove ui-testable from Portal ([9421d63](https://github.com/instructure/instructure-ui/commit/9421d63))
- **ui-test-utils:** prevent test pollution related failures ([626bd7a](https://github.com/instructure/instructure-ui/commit/626bd7a))
- **ui-themeable:** Fix polyfill class selector ([0527709](https://github.com/instructure/instructure-ui/commit/0527709))

### Features

- **ui-icons:** update existing text-subscript icon per design ([fea49f4](https://github.com/instructure/instructure-ui/commit/fea49f4))
- **ui-layout:** add functional colors as background values for View ([18938fa](https://github.com/instructure/instructure-ui/commit/18938fa))
- **ui-options:** add Options component ([c0df653](https://github.com/instructure/instructure-ui/commit/c0df653))

# [6.2.0](https://github.com/instructure/instructure-ui/compare/v6.1.0...v6.2.0) (2019-05-13)

### Bug Fixes

- **ui-docs-client:** escape regexp chars in icon search term ([00b3ef9](https://github.com/instructure/instructure-ui/commit/00b3ef9))
- **ui-elements:** don’t set type=button on any non-button <Link>s ([67084ae](https://github.com/instructure/instructure-ui/commit/67084ae))
- **ui-forms:** use renderTitle prop on Spinner ([dce5248](https://github.com/instructure/instructure-ui/commit/dce5248))

### Features

- **ui-breadcrumb,ui-elements:** remove default as='button' on Link ([c23e859](https://github.com/instructure/instructure-ui/commit/c23e859))
- **ui-elements:** add renderTitle prop to Spinner component ([6b66b89](https://github.com/instructure/instructure-ui/commit/6b66b89))
- **ui-elements,ui-svg-images:** adds alert color to Text and InlineSVG components ([118ba53](https://github.com/instructure/instructure-ui/commit/118ba53))
- **ui-portal:** Use built-in React 16 Portal ([1e334e3](https://github.com/instructure/instructure-ui/commit/1e334e3))

# [6.1.0](https://github.com/instructure/instructure-ui/compare/v6.0.0...v6.1.0) (2019-05-09)

### Bug Fixes

- **instui-config,ui-forms:** deprecate DateInput from ui-forms ([d02c7ea](https://github.com/instructure/instructure-ui/commit/d02c7ea))
- **ui-docs-client,ui-docs-plugin:** update icon import paths ([5a3eda2](https://github.com/instructure/instructure-ui/commit/5a3eda2))
- **ui-prop-types:** Update childrenOrValue error message ([b36f61a](https://github.com/instructure/instructure-ui/commit/b36f61a))
- **ui-scripts:** fix tags for patch releases ([a479911](https://github.com/instructure/instructure-ui/commit/a479911))
- **ui-tabs:** Selected tab animations ([1313023](https://github.com/instructure/instructure-ui/commit/1313023))

### Features

- **ui-form-field:** add input container ref to FormField ([16bebbf](https://github.com/instructure/instructure-ui/commit/16bebbf))
- **ui-icons:** add new bullet-list-(option) icons to icon library ([c2433af](https://github.com/instructure/instructure-ui/commit/c2433af))

# [6.0.0](https://github.com/instructure/instructure-ui/compare/v5.52.3...v6.0.0) (2019-05-03)

### Bug Fixes

- **instui-cli:** don't use yarn to run jscodeshift ([992e250](https://github.com/instructure/instructure-ui/commit/992e250))
- **instui-cli,ui-codemods:** codemod paths should work when cli is globally installed ([0948a76](https://github.com/instructure/instructure-ui/commit/0948a76))
- **instui-cli,ui-codemods,ui-scripts:** require uncached version of configs ([7130c12](https://github.com/instructure/instructure-ui/commit/7130c12))
- **ui-docs-client:** fix search icon import path ([7390556](https://github.com/instructure/instructure-ui/commit/7390556))
- **ui-layout:** position should account for documentElement offset ([701b08e](https://github.com/instructure/instructure-ui/commit/701b08e))
- **ui-utils:** ensure 'getActiveElement' is using the instui 'contains' ([26f7d98](https://github.com/instructure/instructure-ui/commit/26f7d98))

### Features

- remove deprecated packages/props ([1d8813c](https://github.com/instructure/instructure-ui/commit/1d8813c))
- **babel-plugin-themeable-styles:** deprecate themeable config ([f3228bc](https://github.com/instructure/instructure-ui/commit/f3228bc))
- **canvas-theme,canvas-high-contrast-theme:** separate canvas theme packages ([ef2e1d0](https://github.com/instructure/instructure-ui/commit/ef2e1d0))
- **instui-cli,instui-config,ui-codemods:** add upgrade command ([a805ed6](https://github.com/instructure/instructure-ui/commit/a805ed6))
- **instui-cli,instui-config,ui-scripts:** Allow upgrade to specific version ([55c3c16](https://github.com/instructure/instructure-ui/commit/55c3c16))
- **instui-config,ui-codemods:** configure codemod updates for simple prop values ([4049122](https://github.com/instructure/instructure-ui/commit/4049122))
- **instui-config,ui-forms:** add deprecation + codemod for old TextInput to TextInputControlled ([eb83528](https://github.com/instructure/instructure-ui/commit/eb83528))
- **ui-babel-preset:** transform member imports to full paths ([d02cc45](https://github.com/instructure/instructure-ui/commit/d02cc45))
- **ui-dom-utils,ui-react-utils,ui-color-utils:** new utils packages ([03e8ee2](https://github.com/instructure/instructure-ui/commit/03e8ee2))

### Performance Improvements

- **ui-icons,ui-icons-build:** remove default exports for React icons ([95195ee](https://github.com/instructure/instructure-ui/commit/95195ee))

### BREAKING CHANGES

- **ui-core:** entire package has been removed
- **ui-elements:** ContextBox has been removed
- **ui-testbed:** entire package has been removed
- **ui-forms:** NumberInput has been removed
- **ui-container:** entire package has been removed
- **ui-menu:** MenuItemFlyout has been removed
- **ui-forms:** FormField & FormFieldGroup have been removed
- **ui-svg-images:** height and width props removed from SVGIcon
- **ui-utils:** Decimal has been removed
- **ui-overlays:** applicationElement, closeButtonLabel, closeButtonRef, closeButtonVariant props removed from Tray (as well as dep warnings from InstUI 3)
- **ui-overlays:** applicationElement, closeButtonLabel, closeButtonRef props removed from Popover (as well as dep warnings from InstUI 3)
- **ui-overlays:** applicationElement, closeButtonLabel, closeButtonRef props removed from Modal (as well as dep warnings from InstUI 3)
- **ui-overlays:** fullScreen prop removed from Mask
- **ui-menu:** active prop removed from MenuItem
- **ui-menu:** title, labelledBy and controls props removed from Menu
- **ui-a11y:** applicationElement prop removed from Dialog
- **ui-code-editor:** code prop removed from CodeEditor
- **ui-layout:** size prop removed from View
- **ui-elements:** ellipsis prop removed from Link
- **ui-overlays:** size prop removed from Tooltip, switched variant so the inverse Tooltip is what a consumer gets out of the box, default (light has to be explicitly set)
- **ui-alerts:** 3.0 deprecations removed from Alert
- **ui-elements:** 3.0 deprecations removed from Table, prop values from Heading, ListItem
- **ui-portal:** 3.0 deprecations removed from Portal
- **ui-component-examples:** should not be referencing a size prop for Tooltip
- **ui-utils:** deprecated util has updated messaging
- **scripts:** update component and package template dependancy from '^5' to '^6'
- **ui-forms, ui-icons, ui-overlays, ui-utils:** remove 'config' folder as they now reside in their own package
- **ui-themeable:** added warning in dev env when using react version < 15
- All package peerDependencies updated to remove support for React v0.14
- **ui-utils:** deprecated utils removed
- **ui-themes:** remove deprecated canvas-a11y theme
- removed /components and /utils directories, add codemods to update imports

## [5.52.3](https://github.com/instructure/instructure-ui/compare/v5.52.2...v5.52.3) (2019-04-25)

### Bug Fixes

- **ui-layout:** position should account for documentElement offset ([f70bde6](https://github.com/instructure/instructure-ui/commit/f70bde6))

## [5.52.2](https://github.com/instructure/instructure-ui/compare/v5.52.1...v5.52.2) (2019-04-17)

### Bug Fixes

- **ui-calendar,ui-date-input,ui-table:** align week labels in center ([2ec0d82](https://github.com/instructure/instructure-ui/commit/2ec0d82))
- **ui-date-input:** improve onRequestValidateDate documentation ([faa04db](https://github.com/instructure/instructure-ui/commit/faa04db))
- **ui-elements:** fix role for Rating so it reads correctly for SR ([8b3a4c0](https://github.com/instructure/instructure-ui/commit/8b3a4c0))
- **ui-elements:** MetricsList/MetricsListItem allow data attributes to be passed thru ([319188c](https://github.com/instructure/instructure-ui/commit/319188c))
- **ui-form-field:** allow data attributes to be passed thru FormField ([05ecfd5](https://github.com/instructure/instructure-ui/commit/05ecfd5))
- **ui-utils:** allow to prop on elements that allow href ([208fa09](https://github.com/instructure/instructure-ui/commit/208fa09))

### Performance Improvements

- **console:** fix production error/warning stripping ([f03d6e6](https://github.com/instructure/instructure-ui/commit/f03d6e6))

## [5.52.1](https://github.com/instructure/instructure-ui/compare/v5.52.0...v5.52.1) (2019-04-08)

### Bug Fixes

- **ui-scripts:** remove DEBUG var for babel transpile ([e8cd217](https://github.com/instructure/instructure-ui/commit/e8cd217))
- **ui-table:** deprecate prop `mode` ([d9282c1](https://github.com/instructure/instructure-ui/commit/d9282c1))
- **ui-text-input:** readOnly input should not look disabled ([1c13287](https://github.com/instructure/instructure-ui/commit/1c13287))

# [5.52.0](https://github.com/instructure/instructure-ui/compare/v5.51.1...v5.52.0) (2019-04-03)

### Bug Fixes

- **ui-scripts:** resolve promise for gerritbot review ([23a7123](https://github.com/instructure/instructure-ui/commit/23a7123))
- **ui-table:** use flex on sortable button ([f03eeb1](https://github.com/instructure/instructure-ui/commit/f03eeb1))

### Features

- **console:** remove console statements in prod env ([603c738](https://github.com/instructure/instructure-ui/commit/603c738))
- **ui-scripts:** ui-build --modules option ([0be81cc](https://github.com/instructure/instructure-ui/commit/0be81cc))

## [5.51.1](https://github.com/instructure/instructure-ui/compare/v5.51.0...v5.51.1) (2019-03-30)

### Bug Fixes

- **ui-elements,ui-layout:** prevent prop warnings due to defaults ([5a7128d](https://github.com/instructure/instructure-ui/commit/5a7128d))

# [5.51.0](https://github.com/instructure/instructure-ui/compare/v5.50.0...v5.51.0) (2019-03-29)

### Bug Fixes

- **ui-forms:** fix too much recursion error ([08dedf3](https://github.com/instructure/instructure-ui/commit/08dedf3))
- **ui-menu:** prevent menu from focusing single item ([6d8ac37](https://github.com/instructure/instructure-ui/commit/6d8ac37))

### Features

- **ui-scripts:** post gerrit reviews from publish script ([b63ec87](https://github.com/instructure/instructure-ui/commit/b63ec87))
- **ui-table:** make table responsive ([1ec9a2b](https://github.com/instructure/instructure-ui/commit/1ec9a2b))
- **ui-utils:** add React's render stack to console messages ([4226153](https://github.com/instructure/instructure-ui/commit/4226153))

# [5.50.0](https://github.com/instructure/instructure-ui/compare/v5.49.0...v5.50.0) (2019-03-28)

### Bug Fixes

- **ui-core:** update menu ui-core/config ([04dc453](https://github.com/instructure/instructure-ui/commit/04dc453))
- **ui-forms:** allow Select to render without inline mountNode ([44e9176](https://github.com/instructure/instructure-ui/commit/44e9176))
- **ui-forms:** prevent select from closing prematurely in IE ([785c9dd](https://github.com/instructure/instructure-ui/commit/785c9dd))
- **ui-forms:** remove explicit mountNode in Select ([8542b79](https://github.com/instructure/instructure-ui/commit/8542b79))
- **ui-overlays:** deprecate size prop for Tooltip ([07fddac](https://github.com/instructure/instructure-ui/commit/07fddac))
- **ui-scripts:** CSS changes should auto-reload with yarn dev ([071a1a9](https://github.com/instructure/instructure-ui/commit/071a1a9))
- **ui-scripts:** split DEBUG env variable ([0b0033e](https://github.com/instructure/instructure-ui/commit/0b0033e))

### Features

- **ui-billboard:** allow node and function for message prop ([88ebd37](https://github.com/instructure/instructure-ui/commit/88ebd37))
- **ui-text-input:** Add flex layout ([6613d27](https://github.com/instructure/instructure-ui/commit/6613d27))

# [5.49.0](https://github.com/instructure/instructure-ui/compare/v5.48.0...v5.49.0) (2019-03-22)

### Bug Fixes

- **ui-a11y:** convert NodeList to Array in ScreenReaderFocusRegion ([ab482a6](https://github.com/instructure/instructure-ui/commit/ab482a6))
- **ui-a11y:** prevent focus from escaping dialog ([899dd5e](https://github.com/instructure/instructure-ui/commit/899dd5e))
- **ui-component-examples:** improve loadtime for storybook ([679b37d](https://github.com/instructure/instructure-ui/commit/679b37d))
- **ui-menu:** always focus the entire menu when opened ([9bec477](https://github.com/instructure/instructure-ui/commit/9bec477))
- **ui-scripts:** don't update x-package deps when bumping versions ([5550000](https://github.com/instructure/instructure-ui/commit/5550000))
- **ui-tabs:** update Tabs sub-directories to support dot notation naming convention ([6bb2616](https://github.com/instructure/instructure-ui/commit/6bb2616))
- **ui-test-utils:** better error message when sinon sandbox is undef ([19d65df](https://github.com/instructure/instructure-ui/commit/19d65df))
- **ui-test-utils:** preserve built-in behavior of chai contain method ([a7b266e](https://github.com/instructure/instructure-ui/commit/a7b266e))
- **ui-themeable:** prevent setting a component theme to an empty object ([04d8bc2](https://github.com/instructure/instructure-ui/commit/04d8bc2))

### Features

- **ui-calendar,ui-focusable:** a Calendar component ([7a4f96e](https://github.com/instructure/instructure-ui/commit/7a4f96e))
- **ui-date-input:** A controlled DateInput ([e558771](https://github.com/instructure/instructure-ui/commit/e558771))
- **ui-scripts:** read dotenv file from project root ([6886dcb](https://github.com/instructure/instructure-ui/commit/6886dcb))
- **ui-test-utils:** add unmount util ([4d508be](https://github.com/instructure/instructure-ui/commit/4d508be))

# [5.48.0](https://github.com/instructure/instructure-ui/compare/v5.47.0...v5.48.0) (2019-03-18)

### Bug Fixes

- **ui-prop-types:** require prop-types >= 15.7 ([30c105a](https://github.com/instructure/instructure-ui/commit/30c105a))

### Features

- **ui-component-examples,ui-test-utils:** add parameters to example config ([19e4cfd](https://github.com/instructure/instructure-ui/commit/19e4cfd))
- **ui-table:** add controlled table ([20f39f9](https://github.com/instructure/instructure-ui/commit/20f39f9))

# [5.47.0](https://github.com/instructure/instructure-ui/compare/v5.46.1...v5.47.0) (2019-03-15)

### Bug Fixes

- **ui-utils:** updates to CustomPropTypes.Children ([4679cbb](https://github.com/instructure/instructure-ui/commit/4679cbb))

### Features

- **ui-selectable:** add Selectable component ([de742b4](https://github.com/instructure/instructure-ui/commit/de742b4))
- **ui-tabs:** new Tabs component ([b8fe295](https://github.com/instructure/instructure-ui/commit/b8fe295))
- **ui-test-utils:** add a few more test helpers ([386a867](https://github.com/instructure/instructure-ui/commit/386a867))

## [5.46.1](https://github.com/instructure/instructure-ui/compare/v5.46.0...v5.46.1) (2019-03-13)

### Bug Fixes

- **ui-icons:** add missing unpublish icon ([de613be](https://github.com/instructure/instructure-ui/commit/de613be))

# [5.46.0](https://github.com/instructure/instructure-ui/compare/v5.45.1...v5.46.0) (2019-03-12)

### Bug Fixes

- **ui-scripts:** include merged tags for bump and RCs ([62c3dbe](https://github.com/instructure/instructure-ui/commit/62c3dbe))

### Features

- **ui-text-input:** prepend/append content ([183d589](https://github.com/instructure/instructure-ui/commit/183d589))

## [5.45.1](https://github.com/instructure/instructure-ui/compare/v5.45.0...v5.45.1) (2019-03-12)

**Note:** Version bump only for package instructure-ui

# [5.45.0](https://github.com/instructure/instructure-ui/compare/v5.44.0...v5.45.0) (2019-03-11)

### Bug Fixes

- fix yarn test --scope ([92ba95e](https://github.com/instructure/instructure-ui/commit/92ba95e))
- **ui-babel-preset:** load themeable config ([b5b8397](https://github.com/instructure/instructure-ui/commit/b5b8397))
- **ui-forms:** prevent "duplicate adjacent keys" react warning ([1cf778f](https://github.com/instructure/instructure-ui/commit/1cf778f))
- **ui-scripts:** disable git reset for RC releases ([e02cf7a](https://github.com/instructure/instructure-ui/commit/e02cf7a))
- **ui-scripts:** move working directory check ([174e2d1](https://github.com/instructure/instructure-ui/commit/174e2d1))
- **ui-scripts:** update repo package version for RCs ([0573f5c](https://github.com/instructure/instructure-ui/commit/0573f5c))
- **ui-scripts:** use correct version in post-publish for RCs ([fa1c985](https://github.com/instructure/instructure-ui/commit/fa1c985))
- **ui-scripts,ui-test-utils:** make sure test teardown always runs ([be84200](https://github.com/instructure/instructure-ui/commit/be84200))
- **ui-text-input:** fix layout with inline and width props ([0a8dfea](https://github.com/instructure/instructure-ui/commit/0a8dfea))
- **ui-webpack-config:** add missing dependency ([234d7cd](https://github.com/instructure/instructure-ui/commit/234d7cd))

### Features

- A ui-prop-types package ([0fbc609](https://github.com/instructure/instructure-ui/commit/0fbc609))
- **ui-eslint-config:** remove async test rule ([607b878](https://github.com/instructure/instructure-ui/commit/607b878))
- **ui-karma-config,ui-scripts:** --randomize test order flag ([dee991c](https://github.com/instructure/instructure-ui/commit/dee991c))
- **ui-menu:** Fix roles on menu item group items for NVDA/JAWS ([76de5d0](https://github.com/instructure/instructure-ui/commit/76de5d0))
- **ui-postcss-config:** minify the css we publish to npm ([9aa49dc](https://github.com/instructure/instructure-ui/commit/9aa49dc))
- **ui-scripts,ui-test-utils:** move jsdom to ui-scripts ([9d1f063](https://github.com/instructure/instructure-ui/commit/9d1f063))
- **ui-test-utils:** add aliases for finding by text, label ([14fdb9e](https://github.com/instructure/instructure-ui/commit/14fdb9e))

### Performance Improvements

- **ui-babel-preset:** don't add polyfills to js we publish to npm ([2d2e859](https://github.com/instructure/instructure-ui/commit/2d2e859))

# [5.44.0](https://github.com/instructure/instructure-ui/compare/v5.43.0...v5.44.0) (2019-03-01)

### Bug Fixes

- **ui-scripts:** fix publish and post-publish ([1d863e3](https://github.com/instructure/instructure-ui/commit/1d863e3))

### Features

- **ui-buttons,ui-elements,ui-themes:** underline the Link component by default ([9a90a7f](https://github.com/instructure/instructure-ui/commit/9a90a7f))
- **ui-forms,ui-test-utils:** add locators, assertions, typeIn helper ([7d36c3d](https://github.com/instructure/instructure-ui/commit/7d36c3d))
- **ui-layout:** Add overflow props to View ([d0d779f](https://github.com/instructure/instructure-ui/commit/d0d779f))
- **ui-text-input:** add controlled TextInput ([a372757](https://github.com/instructure/instructure-ui/commit/a372757))

# [5.43.0](https://github.com/instructure/instructure-ui/compare/v5.42.0...v5.43.0) (2019-02-27)

### Bug Fixes

- **jenkins:** SSH directory doesn’t have access on post merge ([907b123](https://github.com/instructure/instructure-ui/commit/907b123))
- **postcss-themeable-styles,ui-buttons:** add missing Button theme variables ([ac626ec](https://github.com/instructure/instructure-ui/commit/ac626ec))
- **ui-buttons:** scope Button styles more tightly to HTML ([92f044f](https://github.com/instructure/instructure-ui/commit/92f044f))

### Features

- **ui-component-examples:** add a new examples generator ([eefb1e7](https://github.com/instructure/instructure-ui/commit/eefb1e7))
- **ui-overlays:** add overflow property to Modal ([614933c](https://github.com/instructure/instructure-ui/commit/614933c))
- **ui-test-utils:** add a11y test generator util ([16240d8](https://github.com/instructure/instructure-ui/commit/16240d8))

<a name="5.42.0"></a>

# [5.42.0](https://github.com/instructure/instructure-ui/compare/v5.41.1...v5.42.0) (2019-02-15)

### Bug Fixes

- generate:component should work w/ an existing package ([54be01b](https://github.com/instructure/instructure-ui/commit/54be01b))
- **ui-elements:** remove relative position from Link ([cd96e4c](https://github.com/instructure/instructure-ui/commit/cd96e4c))
- **ui-postcss-config:** use requires to prevent missing deps ([d6735a4](https://github.com/instructure/instructure-ui/commit/d6735a4))

### Features

- **ui-overlays:** deprecate small, medium tooltip - remove shadow ([0be0008](https://github.com/instructure/instructure-ui/commit/0be0008))
- **ui-scripts:** add examples and server scripts ([e229eef](https://github.com/instructure/instructure-ui/commit/e229eef))
- **ui-scripts,ui-test-utils:** add a --mocha option to ui-test ([bd37e2b](https://github.com/instructure/instructure-ui/commit/bd37e2b))

### Performance Improvements

- **babel-plugin-themeable-styles:** speed up babel transpile ([2df2a22](https://github.com/instructure/instructure-ui/commit/2df2a22))

<a name="5.41.1"></a>

## [5.41.1](https://github.com/instructure/instructure-ui/compare/v5.41.0...v5.41.1) (2019-01-30)

### Bug Fixes

- **docs-app:** fix codepen links ([1f8a56f](https://github.com/instructure/instructure-ui/commit/1f8a56f))
- **ui-babel-preset:** add missing babel-plugin-macros dep ([9e97e77](https://github.com/instructure/instructure-ui/commit/9e97e77))
- **ui-scripts:** switch to npm publish from yarn ([f22c2b2](https://github.com/instructure/instructure-ui/commit/f22c2b2))

<a name="5.41.0"></a>

# [5.41.0](https://github.com/instructure/instructure-ui/compare/v5.40.0...v5.41.0) (2019-01-29)

### Bug Fixes

- **cz-lerna-changelog:** add missing dependency ([4352282](https://github.com/instructure/instructure-ui/commit/4352282))
- **ui-editable,ui-forms:** select blurs when it shouldn't ([65563e8](https://github.com/instructure/instructure-ui/commit/65563e8))
- **ui-elements:** Make Link work with TruncateText ([5f49edc](https://github.com/instructure/instructure-ui/commit/5f49edc))
- **ui-elements:** remove gradiant from HCM progress ([00d5b7b](https://github.com/instructure/instructure-ui/commit/00d5b7b))
- **ui-focusable:** Focusable should retain focus ([2891d8c](https://github.com/instructure/instructure-ui/commit/2891d8c))
- **ui-form-field:** design alignment with form helper/error text ([9e7de74](https://github.com/instructure/instructure-ui/commit/9e7de74))
- **ui-forms:** fix enablePreview prop on FileDrop ([3c44424](https://github.com/instructure/instructure-ui/commit/3c44424))
- **ui-forms:** prevent multiple onChange events from controlled selects ([cef91d7](https://github.com/instructure/instructure-ui/commit/cef91d7))
- **ui-number-input:** use a large font when size="large" ([5f00619](https://github.com/instructure/instructure-ui/commit/5f00619))

### Features

- **ui-editable:** add "inline" prop to InPlaceEdit ([5caedc1](https://github.com/instructure/instructure-ui/commit/5caedc1))
- **ui-overlays:** allow support for icons alongside close button in inverse variant ([932a468](https://github.com/instructure/instructure-ui/commit/932a468))

<a name="5.40.0"></a>

# [5.40.0](https://github.com/instructure/instructure-ui/compare/v5.39.0...v5.40.0) (2019-01-15)

### Bug Fixes

- **ui-forms:** pass NumberInput props to input ([4b61a84](https://github.com/instructure/instructure-ui/commit/4b61a84))
- **ui-overlays:** ensure null can be passed as children to Modal ([80d7483](https://github.com/instructure/instructure-ui/commit/80d7483))
- **ui-test-utils:** use MutationObserver shim ([2b0128c](https://github.com/instructure/instructure-ui/commit/2b0128c))

### Features

- **ui-presets:** check if version is published already ([57b8e8f](https://github.com/instructure/instructure-ui/commit/57b8e8f))

<a name="5.39.0"></a>

# [5.39.0](https://github.com/instructure/instructure-ui/compare/v5.38.0...v5.39.0) (2019-01-11)

### Bug Fixes

- **docs-app:** add missing changelog in docs ([7c18ccd](https://github.com/instructure/instructure-ui/commit/7c18ccd))
- **NumberInput:** display '0' passed as a number ([4935f95](https://github.com/instructure/instructure-ui/commit/4935f95))
- **ui-forms:** fix disabled opacity for select options ([66101a6](https://github.com/instructure/instructure-ui/commit/66101a6))
- **ui-overlays:** prevent ModalBody focus when scrollable ([a1fafa5](https://github.com/instructure/instructure-ui/commit/a1fafa5))
- **ui-overlays:** set Modal transition to 0s for IE11 ([7a669e5](https://github.com/instructure/instructure-ui/commit/7a669e5))
- **ui-pagination:** Fix hidden label text layout ([4b15da4](https://github.com/instructure/instructure-ui/commit/4b15da4))

### Features

- **ui-billboard:** use link color for billboard message ([d0049db](https://github.com/instructure/instructure-ui/commit/d0049db))
- **ui-decorator:** add a ui-decorator package/util ([8179186](https://github.com/instructure/instructure-ui/commit/8179186))
- **ui-overlays:** add inverse variant to modal ([d0f6332](https://github.com/instructure/instructure-ui/commit/d0f6332))
- **ui-test-utils:** add MutationObserver, setImmediate shims ([97adeba](https://github.com/instructure/instructure-ui/commit/97adeba))
- **uid:** Add a uid package/util ([279bcda](https://github.com/instructure/instructure-ui/commit/279bcda))

<a name="5.38.0"></a>

# [5.38.0](https://github.com/instructure/instructure-ui/compare/v5.37.0...v5.38.0) (2019-01-04)

### Bug Fixes

- **ui-a11y,ui-test-utils:** handle iframes with inaccessible documents ([f155829](https://github.com/instructure/instructure-ui/commit/f155829))
- **ui-form-field:** ensure legend is the first child of fieldset ([1bd67a5](https://github.com/instructure/instructure-ui/commit/1bd67a5))
- **ui-forms:** use pointer cursor for toggle ([75d00d2](https://github.com/instructure/instructure-ui/commit/75d00d2))
- **ui-overlays:** remove border-radius from fullscreen modal ([552ab68](https://github.com/instructure/instructure-ui/commit/552ab68))
- **ui-overlays:** stop Modal inheriting parent font color ([68eb293](https://github.com/instructure/instructure-ui/commit/68eb293))
- **ui-test-utils:** logic that determines visibility is incorrect ([f0d59b1](https://github.com/instructure/instructure-ui/commit/f0d59b1))

### Features

- **media-capture:** Update type for returned file ([6238b6f](https://github.com/instructure/instructure-ui/commit/6238b6f))
- **ui-docs-client:** use Button in docs nav ([36bd57e](https://github.com/instructure/instructure-ui/commit/36bd57e))
- **ui-icons:** update lti sketch file with existing integrations icon ([85a8e49](https://github.com/instructure/instructure-ui/commit/85a8e49))
- **ui-layout:** allow node to be passed to Media description ([2987cd3](https://github.com/instructure/instructure-ui/commit/2987cd3))
- **ui-overlays:** add a 'regular' size tray option ([396b9ad](https://github.com/instructure/instructure-ui/commit/396b9ad))
- **ui-tree-browser:** allow item thumbnails in TreeBrowser ([a1ec11b](https://github.com/instructure/instructure-ui/commit/a1ec11b))

<a name="5.37.0"></a>

# [5.37.0](https://github.com/instructure/instructure-ui/compare/v5.36.0...v5.37.0) (2018-12-18)

### Bug Fixes

- **ui-a11y,ui-overlays:** shift+tab shouldn't skip Popover trigger ([8838a11](https://github.com/instructure/instructure-ui/commit/8838a11))
- **ui-billboard:** fix margin + href/onClick alignment issues ([181746a](https://github.com/instructure/instructure-ui/commit/181746a))
- **ui-docs-client,ui-docs-plugin:** fix ES path in usage examples ([2bd2baa](https://github.com/instructure/instructure-ui/commit/2bd2baa))
- **ui-elements:** truncateText should handle the empty string ([ff2f69d](https://github.com/instructure/instructure-ui/commit/ff2f69d))
- **ui-elements:** update focus styles to use outline ([1b044d3](https://github.com/instructure/instructure-ui/commit/1b044d3))
- **ui-forms:** eliminate unnecessary console warnings in Select ([9d9c3de](https://github.com/instructure/instructure-ui/commit/9d9c3de))
- **ui-forms:** fix the closeOnSelect prop in Select ([2b6b5f4](https://github.com/instructure/instructure-ui/commit/2b6b5f4))
- **ui-layout:** add default max-width to View styles ([019557b](https://github.com/instructure/instructure-ui/commit/019557b))

### Features

- **ui-elements:** add layout prop to Table ([976a2f7](https://github.com/instructure/instructure-ui/commit/976a2f7))
- **ui-icons:** add 'duplicate' icon ([b79ddb5](https://github.com/instructure/instructure-ui/commit/b79ddb5))

<a name="5.36.0"></a>

# [5.36.0](https://github.com/instructure/instructure-ui/compare/v5.35.0...v5.36.0) (2018-12-12)

### Bug Fixes

- **ui-a11y:** Fix opening non kb focusable dialog from another dialog ([cf3af9a](https://github.com/instructure/instructure-ui/commit/cf3af9a))
- **ui-elements:** fix delimeter in HC mode - IE11/EDGE ([9af87dc](https://github.com/instructure/instructure-ui/commit/9af87dc))
- **ui-elements,ui-overlays:** Focus state for truncated Pill ([a5d5b1b](https://github.com/instructure/instructure-ui/commit/a5d5b1b))
- **ui-number-input:** add missing dotfiles ([372eea9](https://github.com/instructure/instructure-ui/commit/372eea9))
- **ui-overlays,ui-a11y:** fix Popover with inline content ([6ec67ad](https://github.com/instructure/instructure-ui/commit/6ec67ad))

### Features

- **ui-forms:** display dashed line around FileDrop component in default state ([9c9181d](https://github.com/instructure/instructure-ui/commit/9c9181d))
- **ui-presets,ui-test-utils:** add karma viewport plugin ([138a2f8](https://github.com/instructure/instructure-ui/commit/138a2f8))

<a name="5.35.0"></a>

# [5.35.0](https://github.com/instructure/instructure-ui/compare/v5.34.0...v5.35.0) (2018-12-06)

### Bug Fixes

- **ui-a11y:** hide iframe content from screenreaders when outside of focus region ([573ef9d](https://github.com/instructure/instructure-ui/commit/573ef9d))
- **ui-buttons,ui-elements,ui-forms:** remove aria-disabled for input components ([512fb92](https://github.com/instructure/instructure-ui/commit/512fb92))
- **ui-elements:** fix focus outline for ellipsis Links ([7365c3c](https://github.com/instructure/instructure-ui/commit/7365c3c))
- **ui-form-field:** add missing files to ui-form-field package ([ace6c0e](https://github.com/instructure/instructure-ui/commit/ace6c0e))
- **ui-forms:** fix focus outline for fixed-width TextArea ([dad6e65](https://github.com/instructure/instructure-ui/commit/dad6e65))
- **ui-forms:** focus lost with RadioInputGroup in Dialog ([73f7fb8](https://github.com/instructure/instructure-ui/commit/73f7fb8))
- **ui-forms:** include select option groups in onChange ([f45c04b](https://github.com/instructure/instructure-ui/commit/f45c04b))
- **ui-forms:** prevent disabled and readonly selects from expanding ([b9c3586](https://github.com/instructure/instructure-ui/commit/b9c3586))
- **ui-forms:** prevent select arrow icon shrinking ([e47af0b](https://github.com/instructure/instructure-ui/commit/e47af0b))
- **ui-forms:** TextArea overflow and focus ring updates ([4157ea9](https://github.com/instructure/instructure-ui/commit/4157ea9))
- **ui-layout:** margin warning shouldn't apply to flexed elements ([854f3a3](https://github.com/instructure/instructure-ui/commit/854f3a3))
- **ui-layout:** position miscalculates offset with body margin ([bb16787](https://github.com/instructure/instructure-ui/commit/bb16787))
- **ui-overlays:** simplify Modal to rely solely on open prop in place of state ([a52ceaf](https://github.com/instructure/instructure-ui/commit/a52ceaf))
- **ui-tabs,ui-utils:** allow null children in TabList ([496fceb](https://github.com/instructure/instructure-ui/commit/496fceb))
- **ui-test-utils:** handle React 16 uncaught errors ([7fd8bec](https://github.com/instructure/instructure-ui/commit/7fd8bec))
- **ui-testable:** look up the DOM node inside the timeout ([e212f64](https://github.com/instructure/instructure-ui/commit/e212f64))

### Features

- **debounce,ui-utils:** add debounce package ([862294b](https://github.com/instructure/instructure-ui/commit/862294b))
- **ui-buttons,ui-elements,ui-themes:** update link color for standard theme ([78a18fa](https://github.com/instructure/instructure-ui/commit/78a18fa)), closes [#2578](https://github.com/instructure/instructure-ui/issues/2578)
- **ui-editable,ui-elements:** In place edit ([d98d6b4](https://github.com/instructure/instructure-ui/commit/d98d6b4))
- **ui-number-input:** add controlled NumberInput ([0d71026](https://github.com/instructure/instructure-ui/commit/0d71026))
- **ui-test-utils:** add findParent, findParents utils ([1d5aeb7](https://github.com/instructure/instructure-ui/commit/1d5aeb7))
- **ui-test-utils:** add selector to query failure messages ([e77358e](https://github.com/instructure/instructure-ui/commit/e77358e))
- **ui-test-utils:** support Sizzle selectors ([65481ff](https://github.com/instructure/instructure-ui/commit/65481ff))

<a name="5.34.0"></a>

# [5.34.0](https://github.com/instructure/instructure-ui/compare/v5.33.0...v5.34.0) (2018-11-20)

### Bug Fixes

- **ui-forms:** SelectSingle capitalization ([c740561](https://github.com/instructure/instructure-ui/commit/c740561))

### Features

- **ui-elements:** copy focusable styles to link ([36e76e9](https://github.com/instructure/instructure-ui/commit/36e76e9))
- **ui-focusable:** update focus outline to 2px ([962e689](https://github.com/instructure/instructure-ui/commit/962e689))
- **ui-forms:** copy focusable styles to numberinput ([e865a02](https://github.com/instructure/instructure-ui/commit/e865a02))
- **ui-forms:** update focus styles for Select ([3d6912b](https://github.com/instructure/instructure-ui/commit/3d6912b))
- **ui-icons:** add new icons ([4a83f6b](https://github.com/instructure/instructure-ui/commit/4a83f6b))
- **ui-tree-browser:** update TreeBrowser styles ([3c8bc94](https://github.com/instructure/instructure-ui/commit/3c8bc94))
- **ui-tree-browser:** use outlined icons for TreeBrowser ([5d89c38](https://github.com/instructure/instructure-ui/commit/5d89c38))

<a name="5.33.0"></a>

# [5.33.0](https://github.com/instructure/instructure-ui/compare/v5.32.0...v5.33.0) (2018-11-14)

### Bug Fixes

- **ui-elements:** increase maxWidth of Pill ([ce94e5f](https://github.com/instructure/instructure-ui/commit/ce94e5f))
- **ui-forms:** fix aria-checked on checkbox ([42351cc](https://github.com/instructure/instructure-ui/commit/42351cc))
- **ui-layout:** FlexItems width fix ([b161d96](https://github.com/instructure/instructure-ui/commit/b161d96))
- **ui-test-utils:** locator find/findAll return component root ([5866235](https://github.com/instructure/instructure-ui/commit/5866235))
- **ui-test-utils:** update clickable requirement ([ef9d12d](https://github.com/instructure/instructure-ui/commit/ef9d12d))

### Features

- **media-capture:** Allow MediaCapture to work without a webcam ([1fd0ba7](https://github.com/instructure/instructure-ui/commit/1fd0ba7))
- **ui-forms:** update TextArea focus styles ([19ae400](https://github.com/instructure/instructure-ui/commit/19ae400))
- **ui-forms:** update TextInput focus styles ([8acc504](https://github.com/instructure/instructure-ui/commit/8acc504))
- **ui-layout:** add omitViewProps function to View ([55556a4](https://github.com/instructure/instructure-ui/commit/55556a4))
- **ui-overlays:** add test fixture for Popover, Tooltip, Position ([aea476a](https://github.com/instructure/instructure-ui/commit/aea476a))
- **ui-presets:** Use major version for x-package deps ([47b793b](https://github.com/instructure/instructure-ui/commit/47b793b))
- **ui-test-utils:** add tabbable, clickable helpers ([2fbe6c2](https://github.com/instructure/instructure-ui/commit/2fbe6c2))

### Performance Improvements

- **ui-overlays:** fix ref in Mask to work w/shallowCompare ([0a0a706](https://github.com/instructure/instructure-ui/commit/0a0a706))

<a name="5.32.0"></a>

# [5.32.0](https://github.com/instructure/instructure-ui/compare/v5.31.0...v5.32.0) (2018-10-31)

### Bug Fixes

- **ui-i18n:** fix moment-timezone double import ([b2662a0](https://github.com/instructure/instructure-ui/commit/b2662a0))
- **ui-test-utils:** fix event firing ([3852beb](https://github.com/instructure/instructure-ui/commit/3852beb))

### Features

- **ui-buttons:** update tests to run on React 16 ([8c3b7c8](https://github.com/instructure/instructure-ui/commit/8c3b7c8))
- **ui-forms:** allow SingleSelect to accept arbitrary typed input ([8e324c8](https://github.com/instructure/instructure-ui/commit/8e324c8))
- **ui-icons:** add filter icon to iconography ([5f8162e](https://github.com/instructure/instructure-ui/commit/5f8162e))
- **ui-navigation:** update tests to run on React 16 ([9ea84f2](https://github.com/instructure/instructure-ui/commit/9ea84f2))

### Performance Improvements

- **ui-overlays:** improve perf of <Modal> ([dc1085f](https://github.com/instructure/instructure-ui/commit/dc1085f))
- **ui-overlays:** improve perf of <Tray> ([7b4e622](https://github.com/instructure/instructure-ui/commit/7b4e622))
- **ui-themeable:** avoid a forEach loop when possible ([3273839](https://github.com/instructure/instructure-ui/commit/3273839))
- **ui-utils:** simplify getClassList since all browsers we support have classList API ([d388c04](https://github.com/instructure/instructure-ui/commit/d388c04))

<a name="5.31.0"></a>

# [5.31.0](https://github.com/instructure/instructure-ui/compare/v5.30.0...v5.31.0) (2018-10-26)

### Bug Fixes

- **media-capture:** esc key propagation for device inputs ([ea04778](https://github.com/instructure/instructure-ui/commit/ea04778))
- **ui-a11y:** fix focus trapping for Dialog ([945b74c](https://github.com/instructure/instructure-ui/commit/945b74c))
- **ui-elements:** Link role, type, tabIndex ([f42ab3b](https://github.com/instructure/instructure-ui/commit/f42ab3b))
- **ui-focusable:** fix display property ([08a0bd5](https://github.com/instructure/instructure-ui/commit/08a0bd5))
- **ui-forms:** DateInput should reset given an empty value ([b2130f8](https://github.com/instructure/instructure-ui/commit/b2130f8))
- **ui-forms:** fix autogrow + resize interaction ([b65fdcd](https://github.com/instructure/instructure-ui/commit/b65fdcd))
- **ui-layout,ui-overlays,ui-portal:** prevent error when Portal DOM node is not defined ([ad29d11](https://github.com/instructure/instructure-ui/commit/ad29d11))
- **ui-presets:** fix publish-packages script ([1cca5af](https://github.com/instructure/instructure-ui/commit/1cca5af))
- **ui-test-utils:** .focus helper should programmatically focus ([36abbd6](https://github.com/instructure/instructure-ui/commit/36abbd6))
- **ui-test-utils:** add tests for components that render null ([e684860](https://github.com/instructure/instructure-ui/commit/e684860))
- **ui-test-utils:** filter in query instead of after ([50ae1c5](https://github.com/instructure/instructure-ui/commit/50ae1c5))
- **ui-test-utils:** fix setContext method ([6834f87](https://github.com/instructure/instructure-ui/commit/6834f87))
- **ui-test-utils,ui-testbed:** queries should work with SVG elements ([a25f720](https://github.com/instructure/instructure-ui/commit/a25f720))

### Features

- **ui-billboard:** update tests to run on React 16 ([a9b7912](https://github.com/instructure/instructure-ui/commit/a9b7912))
- **ui-breadcrumb:** update tests to run on React 16 ([02e9900](https://github.com/instructure/instructure-ui/commit/02e9900))
- **ui-layout,View:** add light option to background prop ([764a372](https://github.com/instructure/instructure-ui/commit/764a372))
- **ui-presets:** add warning for non-async tests ([00033a3](https://github.com/instructure/instructure-ui/commit/00033a3))
- **ui-presets:** upgrade eslint ([a1dcf1f](https://github.com/instructure/instructure-ui/commit/a1dcf1f))
- **ui-svg-images:** update tests to run on React 16 ([0f4e40a](https://github.com/instructure/instructure-ui/commit/0f4e40a))
- **ui-test-utils:** add spy on Event.preventDefault, focusable selector ([1e68a42](https://github.com/instructure/instructure-ui/commit/1e68a42))

### Reverts

- WIP(\*): adding Accessibility documentation to the docs ([f082fa4](https://github.com/instructure/instructure-ui/commit/f082fa4))

<a name="5.30.0"></a>

# [5.30.0](https://github.com/instructure/instructure-ui/compare/v5.29.0...v5.30.0) (2018-09-27)

### Bug Fixes

- **ui-portal:** ui-testable should be a dependency ([64117ad](https://github.com/instructure/instructure-ui/commit/64117ad))
- **ui-portal,ui-test-utils:** return a DOM node from getComponentRoot ([2903d29](https://github.com/instructure/instructure-ui/commit/2903d29))

### Features

- **ui-test-utils:** add hasClass helper to test utils ([72c21ad](https://github.com/instructure/instructure-ui/commit/72c21ad))
- **ui-test-utils:** add utils for making custom queries ([7ca0da9](https://github.com/instructure/instructure-ui/commit/7ca0da9))

<a name="5.29.0"></a>

# [5.29.0](https://github.com/instructure/instructure-ui/compare/v5.28.1...v5.29.0) (2018-09-26)

### Bug Fixes

- **generate-examples:** add npmignore ([80e54cb](https://github.com/instructure/instructure-ui/commit/80e54cb))
- **ui-elements,ui-utils:** prevent TruncateText from rendering hidden text ([b489a32](https://github.com/instructure/instructure-ui/commit/b489a32))
- **ui-portal,ui-test-utils:** fix empty selectors for testable.findAll ([1ced426](https://github.com/instructure/instructure-ui/commit/1ced426))
- **ui-test-utils:** clear themeable stylesheet between tests ([215f075](https://github.com/instructure/instructure-ui/commit/215f075))
- **ui-test-utils:** expectEmpty should work with testable.findAll ([3cf77f9](https://github.com/instructure/instructure-ui/commit/3cf77f9))
- **ui-test-utils:** fix findAll by label ([bbb3a8b](https://github.com/instructure/instructure-ui/commit/bbb3a8b))
- **ui-test-utils:** fix query by attribute ([b6ba1ad](https://github.com/instructure/instructure-ui/commit/b6ba1ad))
- **ui-test-utils:** fix query by text/contents ([5f1cf80](https://github.com/instructure/instructure-ui/commit/5f1cf80))
- **ui-test-utils:** fix testable component matches ([255fef7](https://github.com/instructure/instructure-ui/commit/255fef7))

### Features

- **ui-breadcrumb:** add icon support ([aab8e8c](https://github.com/instructure/instructure-ui/commit/aab8e8c))
- **ui-test-utils:** Add a ui-test-utils package ([1e9f4ec](https://github.com/instructure/instructure-ui/commit/1e9f4ec))
- **ui-test-utils:** add helpers to get tag, computedStyle ([b456764](https://github.com/instructure/instructure-ui/commit/b456764))

<a name="5.28.1"></a>

## [5.28.1](https://github.com/instructure/instructure-ui/compare/v5.28.0...v5.28.1) (2018-09-18)

### Bug Fixes

- **ui-breadcrumb:** vertical alignment ([699416a](https://github.com/instructure/instructure-ui/commit/699416a))
- **ui-forms:** fix asyncronous Select option highlighting ([5638ccb](https://github.com/instructure/instructure-ui/commit/5638ccb))
- **ui-forms:** Fix time input in DateTimeInput ([372d8ff](https://github.com/instructure/instructure-ui/commit/372d8ff))

<a name="5.28.0"></a>

# [5.28.0](https://github.com/instructure/instructure-ui/compare/v5.27.0...v5.28.0) (2018-09-13)

### Bug Fixes

- **ui-elements:** escape HTML strings used in TruncateText measurements ([3c7d7a7](https://github.com/instructure/instructure-ui/commit/3c7d7a7))
- **ui-forms:** Render selected option when not exist in options ([c821efa](https://github.com/instructure/instructure-ui/commit/c821efa))
- **ui-forms:** Update DateTimeInput when changing locale or timezone ([524307d](https://github.com/instructure/instructure-ui/commit/524307d))

### Features

- **ui-overlays:** add constrain to Modal ([3392939](https://github.com/instructure/instructure-ui/commit/3392939))
- **ui-tree-browser:** add selection styling to TreeBrowser ([4643c66](https://github.com/instructure/instructure-ui/commit/4643c66))

<a name="5.27.0"></a>

# [5.27.0](https://github.com/instructure/instructure-ui/compare/v5.26.0...v5.27.0) (2018-09-10)

### Bug Fixes

- **pkg-utils:** downgrade lerna to fix the release script ([7bfc540](https://github.com/instructure/instructure-ui/commit/7bfc540))
- **ui-buttons:** no role="button" for buttons ([be78aac](https://github.com/instructure/instructure-ui/commit/be78aac))

### Features

- **docs-examples,generate-examples:** autogenerate component examples ([b50fae5](https://github.com/instructure/instructure-ui/commit/b50fae5))

<a name="5.26.0"></a>

# [5.26.0](https://github.com/instructure/instructure-ui/compare/v5.25.0...v5.26.0) (2018-09-06)

### Bug Fixes

- **ui-a11y:** evaluate functional liveRegion prop in ScreenReaderFocusRegion ([3425bf7](https://github.com/instructure/instructure-ui/commit/3425bf7))
- **ui-a11y:** remove aria-hidden before node is removed ([112f9ba](https://github.com/instructure/instructure-ui/commit/112f9ba))
- **ui-forms:** invalid aria attributes when closed ([410f1a9](https://github.com/instructure/instructure-ui/commit/410f1a9))
- **ui-forms:** Update input when selected options updated ([128e3dd](https://github.com/instructure/instructure-ui/commit/128e3dd))
- **ui-layout:** improve vertical margin warning on View ([9c4fb19](https://github.com/instructure/instructure-ui/commit/9c4fb19))
- **ui-menu,ui-overlays:** Remove aria-expanded from Menu ([2ea110d](https://github.com/instructure/instructure-ui/commit/2ea110d))
- **ui-presets:** don't write incorrect npmrc files ([0528899](https://github.com/instructure/instructure-ui/commit/0528899))
- **ui-presets:** pass args to karma ([5cbeb21](https://github.com/instructure/instructure-ui/commit/5cbeb21))

### Features

- **ui-axe-check:** Add axe-core wrapper utility ([3264318](https://github.com/instructure/instructure-ui/commit/3264318))
- **ui-docs-client:** add figure/guideline for do/don't section ([b253910](https://github.com/instructure/instructure-ui/commit/b253910))
- **ui-menu,ui-overlays:** add constrain prop to tooltip and menu ([98797aa](https://github.com/instructure/instructure-ui/commit/98797aa))
- **ui-presets:** Add --no-headless flag for karma ([be4b0c0](https://github.com/instructure/instructure-ui/commit/be4b0c0))

<a name="5.25.0"></a>

# [5.25.0](https://github.com/instructure/instructure-ui/compare/v5.24.0...v5.25.0) (2018-08-24)

### Bug Fixes

- **ui-breadcrumb:** Implement WebAIM recommendations ([4e3ec0e](https://github.com/instructure/instructure-ui/commit/4e3ec0e))
- **ui-buttons,ui-elements:** Fix Safari focus issue ([7825b13](https://github.com/instructure/instructure-ui/commit/7825b13))
- **ui-forms:** do not clear input when receiving new options ([e4ca8ca](https://github.com/instructure/instructure-ui/commit/e4ca8ca))
- **ui-forms:** fix select expand/collapse click events ([3d3bcc1](https://github.com/instructure/instructure-ui/commit/3d3bcc1))
- **ui-forms:** RangeInput needs min-width ([d1118d1](https://github.com/instructure/instructure-ui/commit/d1118d1))
- **ui-forms,ui-layout:** add constrain prop to select ([25bfc2e](https://github.com/instructure/instructure-ui/commit/25bfc2e))
- **ui-layout:** account for stretch positioning in constrain logic ([d21ac1c](https://github.com/instructure/instructure-ui/commit/d21ac1c))

### Features

- **ui-pagination:** Add tooltips to Pagination ([0df511b](https://github.com/instructure/instructure-ui/commit/0df511b))

### Performance Improvements

- **babel-plugin-themeable-styles,ui-themeable:** more small perf improvements ([cf51ab9](https://github.com/instructure/instructure-ui/commit/cf51ab9))

<a name="5.24.0"></a>

# [5.24.0](https://github.com/instructure/instructure-ui/compare/v5.23.0...v5.24.0) (2018-08-08)

### Bug Fixes

- **ui-docs-client,ui-themeable:** always apply theme when component updates ([a9f7d74](https://github.com/instructure/instructure-ui/commit/a9f7d74))
- **ui-elements:** add aria attributes to Rating ([9b859ba](https://github.com/instructure/instructure-ui/commit/9b859ba))
- **ui-elements:** remove relative import ([d0a184e](https://github.com/instructure/instructure-ui/commit/d0a184e))
- **ui-forms:** clear out DateInput when passed an empty value ([0b8bbcb](https://github.com/instructure/instructure-ui/commit/0b8bbcb))
- **ui-layout:** Make Flex ignore null children ([c49ec3d](https://github.com/instructure/instructure-ui/commit/c49ec3d))
- **ui-presets:** trim command results ([eeb62c0](https://github.com/instructure/instructure-ui/commit/eeb62c0))
- **ui-themeable,ui-themes,ui-utils:** remove immutable variable ([5b6178e](https://github.com/instructure/instructure-ui/commit/5b6178e))

### Features

- **ui-buttons:** add cursor prop to Button ([b47fbb5](https://github.com/instructure/instructure-ui/commit/b47fbb5))
- **ui-elements:** add warning and message variants to pill ([7665242](https://github.com/instructure/instructure-ui/commit/7665242))

### Performance Improvements

- get babel helpers from 'babel-runtime' instead of inlining them ([1472658](https://github.com/instructure/instructure-ui/commit/1472658))
- **ui-presets:** add babel constant elements transform ([a62f424](https://github.com/instructure/instructure-ui/commit/a62f424))

<a name="5.23.0"></a>

# [5.23.0](https://github.com/instructure/instructure-ui/compare/v5.22.0...v5.23.0) (2018-08-03)

### Bug Fixes

- **docs-app:** fix codepens ([4c755f5](https://github.com/instructure/instructure-ui/commit/4c755f5))
- **ui-buttons,ui-elements:** Fix event target ([8e29910](https://github.com/instructure/instructure-ui/commit/8e29910))
- **ui-presets:** fix bump script ([14e6668](https://github.com/instructure/instructure-ui/commit/14e6668))

### Features

- **ui-elements:** handle Pill overflow with Tooltip ([64d75d1](https://github.com/instructure/instructure-ui/commit/64d75d1))
- **ui-media-player:** Add SourceChooser to VideoPlayerControls ([44fdb71](https://github.com/instructure/instructure-ui/commit/44fdb71))
- **ui-presets:** add an install-react script ([d4e87fe](https://github.com/instructure/instructure-ui/commit/d4e87fe))
- **ui-presets:** Allow files passed to ui-test --lint ([47c1e5c](https://github.com/instructure/instructure-ui/commit/47c1e5c))
- **ui-presets:** better cross platform support for scripts ([9343a7e](https://github.com/instructure/instructure-ui/commit/9343a7e))
- **ui-presets:** run tests with react 15 and 16 ([148fe88](https://github.com/instructure/instructure-ui/commit/148fe88))
- **ui-tree-browser:** improve aria support ([bad6cc9](https://github.com/instructure/instructure-ui/commit/bad6cc9))

### Performance Improvements

- **ui-buttons,ui-tabs:** a couple more small perf improvements ([2b00c1b](https://github.com/instructure/instructure-ui/commit/2b00c1b))

<a name="5.22.0"></a>

# [5.22.0](https://github.com/instructure/instructure-ui/compare/v5.21.0...v5.22.0) (2018-07-27)

### Bug Fixes

- move React/ReactDOM back to peerDependencies ([99e9458](https://github.com/instructure/instructure-ui/commit/99e9458))
- **docs:** add id to README ([d3a43d4](https://github.com/instructure/instructure-ui/commit/d3a43d4))
- **ui-elements:** prevent invalid props error for Text ([1452a12](https://github.com/instructure/instructure-ui/commit/1452a12))
- **ui-themeable,ui-themes:** fix theme.use({ accessible: true }) ([fe07a3a](https://github.com/instructure/instructure-ui/commit/fe07a3a))

### Features

- **ui-presets:** Separate out node test from karma ([01aea24](https://github.com/instructure/instructure-ui/commit/01aea24))

### Performance Improvements

- **ui-buttons:** speed up <Button>s ([54d7c71](https://github.com/instructure/instructure-ui/commit/54d7c71))
- **ui-elements:** speed up <Text> ([6fff58b](https://github.com/instructure/instructure-ui/commit/6fff58b))
- **ui-forms:** don't even render options <ul> when not open ([e3fa113](https://github.com/instructure/instructure-ui/commit/e3fa113))
- **ui-i18n:** cache the default "dir" lookup ([ac746a8](https://github.com/instructure/instructure-ui/commit/ac746a8))
- **ui-layout:** avoid View::verifySpanMargin check in prod ([b0c2691](https://github.com/instructure/instructure-ui/commit/b0c2691))
- **ui-utils:** a faster uid() ([d0fc68e](https://github.com/instructure/instructure-ui/commit/d0fc68e))
- **ui-utils:** speed up pickProps and omitProps ([e286ef6](https://github.com/instructure/instructure-ui/commit/e286ef6))

<a name="5.21.0"></a>

# [5.21.0](https://github.com/instructure/instructure-ui/compare/v5.20.1...v5.21.0) (2018-07-25)

### Bug Fixes

- add React,React-DOM 16 to dependencies ([d49430f](https://github.com/instructure/instructure-ui/commit/d49430f))
- fix typo in \`build:examples\` script ([e0f9772](https://github.com/instructure/instructure-ui/commit/e0f9772))
- **ui-a11y:** remove role presentation on PresentationContent ([0c777a0](https://github.com/instructure/instructure-ui/commit/0c777a0))
- **ui-buttons:** prevent error on null child in Button component ([5681198](https://github.com/instructure/instructure-ui/commit/5681198))
- **ui-docs-plugin:** fix docs build w/ docker ([565147e](https://github.com/instructure/instructure-ui/commit/565147e))
- **ui-elements,ui-focusable,ui-navigation:** docs app fixes ([fe4f121](https://github.com/instructure/instructure-ui/commit/fe4f121))
- **ui-forms:** prevent scroll jumping with long textareas ([61d7a2e](https://github.com/instructure/instructure-ui/commit/61d7a2e))
- **ui-layout:** fix position constrain logic ([656d7c1](https://github.com/instructure/instructure-ui/commit/656d7c1))
- **ui-motion:** apply aria-hidden to transition content when transitioned out ([ca818c1](https://github.com/instructure/instructure-ui/commit/ca818c1))

### Features

- **ui-alerts,ui-icons:** update/add icons, update icons within alerts ([da0c3f6](https://github.com/instructure/instructure-ui/commit/da0c3f6))
- **ui-elements,ui-themes:** add link decoration brand variable to canvas theme ([e88ca27](https://github.com/instructure/instructure-ui/commit/e88ca27))
- **ui-overlays:** make label prop required for overlay ([3fdd14c](https://github.com/instructure/instructure-ui/commit/3fdd14c))

### Performance Improvements

- **ui-buttons:** avoid work just to show a warning in production ([0f2cbe9](https://github.com/instructure/instructure-ui/commit/0f2cbe9))
- **ui-themeable:** avoid doing work per-instance ([9b2a84c](https://github.com/instructure/instructure-ui/commit/9b2a84c))
- **ui-themeable:** only run the code that adds "dir" to <html> once ([954ab88](https://github.com/instructure/instructure-ui/commit/954ab88))
- **ui-utils:** use a constant array in omitProps to avoid garbage ([6b5d868](https://github.com/instructure/instructure-ui/commit/6b5d868))

<a name="5.20.1"></a>

## [5.20.1](https://github.com/instructure/instructure-ui/compare/v5.20.0...v5.20.1) (2018-07-18)

### Bug Fixes

- **ui-presets:** more release script updates ([387808c](https://github.com/instructure/instructure-ui/commit/387808c))
- **ui-utils:** fix recent change of `DeprecatedComponent` ([c7dd5d7](https://github.com/instructure/instructure-ui/commit/c7dd5d7))
- **ui-utils,ui-themeable:** fix bug applying high-contrast theme ([f42b126](https://github.com/instructure/instructure-ui/commit/f42b126))

<a name="5.20.0"></a>

# [5.20.0](https://github.com/instructure/instructure-ui/compare/v5.19.0...v5.20.0) (2018-07-17)

### Bug Fixes

- **docker,ui-presets:** fix a few bugs with the post-publish script ([c75f5cc](https://github.com/instructure/instructure-ui/commit/c75f5cc))
- **ui-a11y:** resolve issues with multiple focus regions in FF and Safari ([a6cc584](https://github.com/instructure/instructure-ui/commit/a6cc584))
- **ui-elements:** Improve circle Progress for SRs ([76c6ecb](https://github.com/instructure/instructure-ui/commit/76c6ecb))

### Features

- **ui-elements:** add constrain prop to Img ([d2911a2](https://github.com/instructure/instructure-ui/commit/d2911a2))
- **ui-presets:** Include changelogs in rc packages ([edd1873](https://github.com/instructure/instructure-ui/commit/edd1873))

<a name="5.19.0"></a>

# [5.19.0](https://github.com/instructure/instructure-ui/compare/v5.18.0...v5.19.0) (2018-07-12)

### Bug Fixes

- **babel-plugin-themeable-styles,ui-presets:** add hashPrefix to CSS classes ([3e0d269](https://github.com/instructure/instructure-ui/commit/3e0d269))
- **docs,ui-docs-client:** make menu closed by default ([2f5b14f](https://github.com/instructure/instructure-ui/commit/2f5b14f))
- **ui-a11y:** dismiss FocusRegion even when source event's default is prevented ([babd1fc](https://github.com/instructure/instructure-ui/commit/babd1fc))
- **ui-forms:** stop JAWS always reading the first option ([b41bd4f](https://github.com/instructure/instructure-ui/commit/b41bd4f))
- **ui-presets:** quiet down some noisy output ([09c2789](https://github.com/instructure/instructure-ui/commit/09c2789))
- **ui-presets:** remove no-verify for bump commit ([b7a6be1](https://github.com/instructure/instructure-ui/commit/b7a6be1))

### Features

- **ui-a11y,ui-focusable:** add Focusable component ([555bb30](https://github.com/instructure/instructure-ui/commit/555bb30))
- **ui-icons-build,ui-icons:** add es modules version of ui-icons ([b6b8de5](https://github.com/instructure/instructure-ui/commit/b6b8de5))
- **ui-media-player:** Add Volume to VideoPlayerControls ([762242e](https://github.com/instructure/instructure-ui/commit/762242e))

### Performance Improvements

- **ui-forms,ui-utils:** use 'fast-deep-equal' instead of 'deep-equal' ([7732ff3](https://github.com/instructure/instructure-ui/commit/7732ff3))
- **ui-themeable:** some things to make themeable faster ([fc0a269](https://github.com/instructure/instructure-ui/commit/fc0a269))
- **ui-utils:** improve perf of `DeprecatedComponent` in prod ([66888e5](https://github.com/instructure/instructure-ui/commit/66888e5))

<a name="5.18.0"></a>

# [5.18.0](https://github.com/instructure/instructure-ui/compare/v5.17.0...v5.18.0) (2018-07-09)

### Bug Fixes

- **ui-presets:** add git user and email ([f210506](https://github.com/instructure/instructure-ui/commit/f210506))

### Features

- **ui-presets:** move .env variables into package.json for ui-scripts ([5e97982](https://github.com/instructure/instructure-ui/commit/5e97982))

<a name="5.17.0"></a>

# [5.17.0](https://github.com/instructure/instructure-ui/compare/v5.16.0...v5.17.0) (2018-07-06)

### Features

- **ui-icons:** add calculator icon ([df2f9ce](https://github.com/instructure/instructure-ui/commit/df2f9ce))

<a name="5.16.0"></a>

# [5.16.0](https://github.com/instructure/instructure-ui/compare/v5.15.0...v5.16.0) (2018-07-06)

### Bug Fixes

- **ui-layout,ui-motion,ui-overlays:** theme prop should work w/ Portal ([2c20181](https://github.com/instructure/instructure-ui/commit/2c20181))
- **ui-pagination:** fix perf for lots of pages ([40e18e9](https://github.com/instructure/instructure-ui/commit/40e18e9))

### Features

- **ui-code-editor:** add bash language type to code editor ([5fba1f9](https://github.com/instructure/instructure-ui/commit/5fba1f9))
- **ui-icons:** add check-mark-indeterminate icon ([886e700](https://github.com/instructure/instructure-ui/commit/886e700))
- **ui-icons:** add quiz-title and quiz-instructions icon ([6cf0691](https://github.com/instructure/instructure-ui/commit/6cf0691))

<a name="5.15.0"></a>

# [5.15.0](https://github.com/instructure/instructure-ui/compare/v5.14.0...v5.15.0) (2018-06-28)

### Bug Fixes

- **ui-a11y,ui-overlays:** Improve KO navigation for Popover ([8d547ce](https://github.com/instructure/instructure-ui/commit/8d547ce))
- **ui-presets:** don't PSA for release candidates ([7cf8648](https://github.com/instructure/instructure-ui/commit/7cf8648))

### Features

- **ui-forms:** add screenreader announcements to Select ([0ccfc36](https://github.com/instructure/instructure-ui/commit/0ccfc36))

<a name="5.14.0"></a>

# [5.14.0](https://github.com/instructure/instructure-ui/compare/v5.13.1...v5.14.0) (2018-06-28)

### Bug Fixes

- **cz-lerna-changelog:** ensure changeID is the last element of commit msg ([fe64e52](https://github.com/instructure/instructure-ui/commit/fe64e52))
- **ui-forms:** [NumberInput](#NumberInput) don't strip trailing zeros ([9ddfeb8](https://github.com/instructure/instructure-ui/commit/9ddfeb8))
- **ui-a11y:** use unique ids for [FocusRegion](#FocusRegion), [Dialog](#Dialog) ([f4fccb9](https://github.com/instructure/instructure-ui/commit/f4fccb9))
- **ui-presets:** fix post publish script ([693a7a4](https://github.com/instructure/instructure-ui/commit/693a7a4))
- **ui-pagination:** make default ArrowIcon for [Pagination](#Pagination) small ([e8d5a95](https://github.com/instructure/instructure-ui/commit/e8d5a95))

### Features

- **ui-forms:** add indeterminate state to [Checkbox](#Checkbox) ([8752390](https://github.com/instructure/instructure-ui/commit/8752390))
- **ui-svg-images:** add color property to [InlineSVG](#InlineSVG) ([596b9c6](https://github.com/instructure/instructure-ui/commit/596b9c6))

<a name="5.13.1"></a>

## [5.13.1](https://github.com/instructure/instructure-ui/compare/v5.13.0...v5.13.1) (2018-06-22)

### Bug Fixes

- **ui-a11y:** absolutely position offscreen content at top ([f0d6305](https://github.com/instructure/instructure-ui/commit/f0d6305))
- **ui-a11y:** dialog should return focus on blur ([f7eb47e](https://github.com/instructure/instructure-ui/commit/f7eb47e))
- **ui-forms:** accept zero for decimal places in [NumberInput](#NumberInput) ([d4cdd6b](https://github.com/instructure/instructure-ui/commit/d4cdd6b))
- **ui-forms:** don't use window.event in [NumberInput](#NumberInput) ([943a0c9](https://github.com/instructure/instructure-ui/commit/943a0c9))
- **ui-forms:** handle min={0} and max={0} props in [NumberInput](#NumberInput) ([5b09754](https://github.com/instructure/instructure-ui/commit/5b09754))
- **ui-forms:** [NumberInput](#NumberInput) onChange w/ updated precision ([fa33d06](https://github.com/instructure/instructure-ui/commit/fa33d06))
- **ui-forms:** fix inline input and label alignment in [Select](#Select) ([a696dcc](https://github.com/instructure/instructure-ui/commit/a696dcc))
- **ui-forms:** [Select](#Select) should return focus to input on close ([0baa76f](https://github.com/instructure/instructure-ui/commit/0baa76f))
- **ui-layout:** [Position](#Position), absolutely position offscreen content ([8c85b25](https://github.com/instructure/instructure-ui/commit/8c85b25))

<a name="5.13.0"></a>

# [5.13.0](https://github.com/instructure/instructure-ui/compare/v5.12.0...v5.13.0) (2018-06-16)

### Bug Fixes

- **cz-lerna-changelog:** pass in config for footer prefix ([9822f1f](https://github.com/instructure/instructure-ui/commit/9822f1f))
- **karma:** Improve plugin support inside monorepos ([94d0d2a](https://github.com/instructure/instructure-ui/commit/94d0d2a))
- **NumberInput:** fix controlled component ([1ec816a](https://github.com/instructure/instructure-ui/commit/1ec816a))
- **Tag:** pass down elementRef ([ccb7a11](https://github.com/instructure/instructure-ui/commit/ccb7a11))
- **ui-forms:** fix aria-selected values on Select options ([d84098a](https://github.com/instructure/instructure-ui/commit/d84098a))
- **ui-forms:** Select input shouldn't be wrapped w/label ([4c6e6c1](https://github.com/instructure/instructure-ui/commit/4c6e6c1))
- **ui-forms,RangeInput:** focus styles for Edge 16 up ([bbdf9e6](https://github.com/instructure/instructure-ui/commit/bbdf9e6))
- **ui-i18n:** Fix leading zero decimal parsing ([3224dc8](https://github.com/instructure/instructure-ui/commit/3224dc8))
- **ui-layout:** Make body scrollTop attribute consistent for positioning ([55e5ed2](https://github.com/instructure/instructure-ui/commit/55e5ed2))
- **ui-presets:** catch error w/ no issues ([0443262](https://github.com/instructure/instructure-ui/commit/0443262))
- **ui-presets:** include version in slack message ([c762e86](https://github.com/instructure/instructure-ui/commit/c762e86))
- **ui-presets:** only run deploy after a stable release ([387501c](https://github.com/instructure/instructure-ui/commit/387501c))
- **ui-presets:** release script changes for Jenkins ([511ddb3](https://github.com/instructure/instructure-ui/commit/511ddb3))

### Features

- **cz-lerna-changelog,ui-presets:** add lerna changelog package ([f7592eb](https://github.com/instructure/instructure-ui/commit/f7592eb))
- **ui-buttons,Button:** Add circle-default variant ([addb97c](https://github.com/instructure/instructure-ui/commit/addb97c))
- **ui-elements,Link:** Add icon prop to Link ([8953edb](https://github.com/instructure/instructure-ui/commit/8953edb))
- **ui-media-player:** Add FullScreenButton to ([2ba3722](https://github.com/instructure/instructure-ui/commit/2ba3722))

<a name="5.12.0"></a>

# [5.12.0](https://github.com/instructure/instructure-ui/compare/v5.11.0...v5.12.0) (2018-06-11)

### Bug Fixes

- **ui-i18n,Decimal:** fix toLocaleString ([b32e06c](https://github.com/instructure/instructure-ui/commit/b32e06c))
- **ui-elements:** Fix lineHeight default in TruncateText ([cbbf35f](https://github.com/instructure/instructure-ui/commit/cbbf35f))
- **ui-forms,Select:** Change selected option when Select children update ([5dc9391](https://github.com/instructure/instructure-ui/commit/5dc9391))
- **ui-presets:** Always pass an npm tag to publish ([da06936](https://github.com/instructure/instructure-ui/commit/da06936))
- **ui-presets:** Remove meta data from pre-release versions ([ecc8d1c](https://github.com/instructure/instructure-ui/commit/ecc8d1c))
- **ui-tabs:** add min-width so long string doesn't break layout ([a0a9981](https://github.com/instructure/instructure-ui/commit/a0a9981))

### Features

- **ui-buttons,Button:** Add icon prop ([3e63ef7](https://github.com/instructure/instructure-ui/commit/3e63ef7))
- **ui-buttons,Button:** Responsive button docs ([4f52006](https://github.com/instructure/instructure-ui/commit/4f52006))
- **ui-presets:** Add ui-scripts for release and publish ([1e7409f](https://github.com/instructure/instructure-ui/commit/1e7409f))

<a name="5.11.0"></a>

# [5.11.0](https://github.com/instructure/instructure-ui/compare/v5.10.0...v5.11.0) (2018-06-06)

### Bug Fixes

- **docs:** Add Object.values polyfill to fix IE11 ([af17ebd](https://github.com/instructure/instructure-ui/commit/af17ebd))
- **inputs:** remove negative z-index from radio and checkbox inputs ([b49249b](https://github.com/instructure/instructure-ui/commit/b49249b))
- **Locale:** use documentElement.lang prior to window.navigator for defaults ([2ea6603](https://github.com/instructure/instructure-ui/commit/2ea6603))
- **ui-core,codemod:** add import from ui-core to ui-alerts for Alert ([6e524f5](https://github.com/instructure/instructure-ui/commit/6e524f5))
- **ui-docs-client:** Update usage examples for commonjs imports ([b8ef639](https://github.com/instructure/instructure-ui/commit/b8ef639))
- **ui-forms:** Fix selected option matching in SelectSingle ([193da1f](https://github.com/instructure/instructure-ui/commit/193da1f))
- **ui-pagination:** Change focus only when necessary ([fc5642f](https://github.com/instructure/instructure-ui/commit/fc5642f))
- **ui-utils:** fix console.warn.apply(undefined) ([e7dc6ad](https://github.com/instructure/instructure-ui/commit/e7dc6ad))

### Features

- **config-loader:** Add a config-loader package ([832ff12](https://github.com/instructure/instructure-ui/commit/832ff12))
- **release:** Add a post-release script to update Jira ([eb3642d](https://github.com/instructure/instructure-ui/commit/eb3642d))
- **ui-elements,Badge:** RTL support start center/end center placement ([175f25c](https://github.com/instructure/instructure-ui/commit/175f25c))
- **ui-elements,Progress:** RTL support for ProgressBar with visible val ([5756a8e](https://github.com/instructure/instructure-ui/commit/5756a8e))
- **ui-elements,Tag:** RTL support for the inline variant ([953f870](https://github.com/instructure/instructure-ui/commit/953f870))
- **ui-forms:** Rtl support for Checkbox toggle variant ([1de3e0a](https://github.com/instructure/instructure-ui/commit/1de3e0a))
- **ui-forms:** Rtl support for select ([f0732d4](https://github.com/instructure/instructure-ui/commit/f0732d4))
- **ui-forms,RangeInput:** ensure the min max values switch when "rtl" ([5bdc70a](https://github.com/instructure/instructure-ui/commit/5bdc70a))
- **ui-i18n,docs:** ApplyTextDirection child func/position docs ([248c7e6](https://github.com/instructure/instructure-ui/commit/248c7e6))
- **ui-layout:** Rtl support for DrawerLayout ([fdeee39](https://github.com/instructure/instructure-ui/commit/fdeee39))
- **ui-layout,Media:** RTL support for Media ([1b8790a](https://github.com/instructure/instructure-ui/commit/1b8790a))
- **ui-media-player:** Adopt Legacy Context API ([7416dd4](https://github.com/instructure/instructure-ui/commit/7416dd4))
- **ui-media-player,media-capture:** Rtl support for VideoPlayer ([bbe0f60](https://github.com/instructure/instructure-ui/commit/bbe0f60))
- **ui-navigation,Navigation:** RTL support for nav toggle action ([dca378d](https://github.com/instructure/instructure-ui/commit/dca378d))
- **ui-overlays:** Mirror Popover placement for rtl ([046ec0c](https://github.com/instructure/instructure-ui/commit/046ec0c))
- **ui-presets:** Add stylelint rules for bidrectional text support ([b58ea17](https://github.com/instructure/instructure-ui/commit/b58ea17))
- **ui-toggle-details:** ToggleGroup component ([d828826](https://github.com/instructure/instructure-ui/commit/d828826))

<a name="5.10.0"></a>

# [5.10.0](https://github.com/instructure/instructure-ui/compare/v5.9.0...v5.10.0) (2018-05-23)

### Bug Fixes

- **docs:** Fix codepens ([0e70c81](https://github.com/instructure/instructure-ui/commit/0e70c81))
- **eslint-plugin-instructure-ui:** Add publishConfig ([ac4640c](https://github.com/instructure/instructure-ui/commit/ac4640c))
- **NumberInput:** formatValueOnRender prop ([e734b8a](https://github.com/instructure/instructure-ui/commit/e734b8a))
- **scripts:** Fix generate:component script ([24f5e21](https://github.com/instructure/instructure-ui/commit/24f5e21))

### Features

- **scripts:** Update generate:component template to reflect new pattern ([69a10ce](https://github.com/instructure/instructure-ui/commit/69a10ce))
- **ui-forms,RadioInputGroup:** let toggle support inline layout ([ca611da](https://github.com/instructure/instructure-ui/commit/ca611da))
- **ui-i18n:** ApplyDirection and bidirectional components ([06f052b](https://github.com/instructure/instructure-ui/commit/06f052b))

<a name="5.9.0"></a>

# [5.9.0](https://github.com/instructure/instructure-ui/compare/v5.8.1...v5.9.0) (2018-05-21)

### Bug Fixes

- **build:** Add scripts, cname, and update env vars ([576a6ca](https://github.com/instructure/instructure-ui/commit/576a6ca))
- **Decimal:** allow in progress negative numbers ([fab4a48](https://github.com/instructure/instructure-ui/commit/fab4a48))
- **docs:** Fix broken component examples in ie11 ([ea091ab](https://github.com/instructure/instructure-ui/commit/ea091ab))
- **scripts:** fix bump script ([64f1eef](https://github.com/instructure/instructure-ui/commit/64f1eef))
- **ui-a11y:** focus manager does not steal focus on document click ([0d59b0b](https://github.com/instructure/instructure-ui/commit/0d59b0b))
- **ui-a11y:** IE11 compatibility fix ([1a03ff1](https://github.com/instructure/instructure-ui/commit/1a03ff1))
- **ui-alerts,Alert:** remove flex rule on contents ([240ba81](https://github.com/instructure/instructure-ui/commit/240ba81))
- **ui-pagination,Pagination:** Manage focus ([b0a3364](https://github.com/instructure/instructure-ui/commit/b0a3364))

### Features

- **ui-alerts,Alert:** make aria-live configurable ([8689784](https://github.com/instructure/instructure-ui/commit/8689784))
- **ui-code-editor:** support yaml/yml formats ([2ffc130](https://github.com/instructure/instructure-ui/commit/2ffc130))
- **ui-docs-client:** prop to showMenu by default ([7fb0fd5](https://github.com/instructure/instructure-ui/commit/7fb0fd5))
- **ui-elements,List:** add line delimiters for vertical lists ([9cba13d](https://github.com/instructure/instructure-ui/commit/9cba13d))
- **ui-elements,ListItem:** Add padding prop to ListItem ([5d866a2](https://github.com/instructure/instructure-ui/commit/5d866a2))
- **ui-icons:** Adds closed captioning and full screen icons ([57a0abb](https://github.com/instructure/instructure-ui/commit/57a0abb))
- **ui-icons,ui-icons-build,ui-svg-images:** RTL for icon build ([f5f40f6](https://github.com/instructure/instructure-ui/commit/f5f40f6))
- **ui-media-player:** Add ui-media-player package ([fb5689e](https://github.com/instructure/instructure-ui/commit/fb5689e))
- **ui-toggle-details,ToggleDetails:** allow full-width summary ([fa39e0f](https://github.com/instructure/instructure-ui/commit/fa39e0f))

<a name="5.8.1"></a>

## [5.8.1](https://github.com/instructure/instructure-ui/compare/v5.8.0...v5.8.1) (2018-05-11)

### Bug Fixes

- Set a default text direction to fix broken bidirectional styles ([77f6aed](https://github.com/instructure/instructure-ui/commit/77f6aed))

<a name="5.8.0"></a>

# [5.8.0](https://github.com/instructure/instructure-ui/compare/v5.7.0...v5.8.0) (2018-05-11)

### Bug Fixes

- **build:** Fixes so that the release script doesn't fail ([72eca18](https://github.com/instructure/instructure-ui/commit/72eca18))
- **ui-docs-plugin:** handle missing icons config ([3168132](https://github.com/instructure/instructure-ui/commit/3168132))

### Features

- **storybook,RTLaddon:** add a RTL button for switching storybook examp ([2b9e0dd](https://github.com/instructure/instructure-ui/commit/2b9e0dd))
- **ToggleDetails:** Add focus and focused ([d80db8a](https://github.com/instructure/instructure-ui/commit/d80db8a))
- **ui-elements:** Add a TruncateText component ([86ee847](https://github.com/instructure/instructure-ui/commit/86ee847))
- **ui-presets:** Webpack loading for gif and otf ([ffa0fa4](https://github.com/instructure/instructure-ui/commit/ffa0fa4))

<a name="5.7.0"></a>

# [5.7.0](https://github.com/instructure/instructure-ui/compare/v5.6.0...v5.7.0) (2018-05-07)

### Bug Fixes

- **release:** Fix auto-release script ([f2b99d3](https://github.com/instructure/instructure-ui/commit/f2b99d3))
- **ui-overlays,Popover:** Pass down stacking/z-index to ContextView/View ([a2a39ef](https://github.com/instructure/instructure-ui/commit/a2a39ef))

### Features

- **ui-docs-client:** Add RTL toggle to Playground ([21a0a34](https://github.com/instructure/instructure-ui/commit/21a0a34))

<a name="5.6.0"></a>

# [5.6.0](https://github.com/instructure/instructure-ui/compare/v5.5.0...v5.6.0) (2018-05-04)

### Bug Fixes

- **ui-utils:** Remove relative package imports ([b8fd970](https://github.com/instructure/instructure-ui/commit/b8fd970))

### Features

- **ui-presets:** Add an eslint rule to prevent relative package imports ([d23b53d](https://github.com/instructure/instructure-ui/commit/d23b53d))

<a name="5.5.0"></a>

# [5.5.0](https://github.com/instructure/instructure-ui/compare/v5.4.0...v5.5.0) (2018-04-26)

### Bug Fixes

- **media-capture:** Update the FileSave submit button to prevent default ([fd47f2a](https://github.com/instructure/instructure-ui/commit/fd47f2a))
- **ui-docs-client:** Fix source code path ([7c23cac](https://github.com/instructure/instructure-ui/commit/7c23cac))
- **ui-docs-client:** Use resource displayName instead of name for usage ([8357c5c](https://github.com/instructure/instructure-ui/commit/8357c5c))
- **ui-forms:** Preserve [FileDrop](#FileDrop) event during onDrop ([e45b70d](https://github.com/instructure/instructure-ui/commit/e45b70d))
- **ui-i18n:** Fix moment version dependency ([b6289c2](https://github.com/instructure/instructure-ui/commit/b6289c2))
- **ui-overlays:** Fix a11y issues in Tooltip and Popover ([352b8ca](https://github.com/instructure/instructure-ui/commit/352b8ca))

### Features

- **ui-forms,DateInput:** Add support for disabled days ([c1067ad](https://github.com/instructure/instructure-ui/commit/c1067ad))
- **ui-icons,IconX:** Updated IconX to be a little smaller ([1bdcd86](https://github.com/instructure/instructure-ui/commit/1bdcd86))
- **ui-layout,View:** Add style prop white list (incl backgroundImage) ([d8a35ab](https://github.com/instructure/instructure-ui/commit/d8a35ab))
- **ui-overlays,Tray:** Replace timeout with requestAnimationFrame ([ddd9096](https://github.com/instructure/instructure-ui/commit/ddd9096))
- **ui-presets,eslint:** Add no-undefined eslint rule ([ff896ea](https://github.com/instructure/instructure-ui/commit/ff896ea))

<a name="5.4.0"></a>

# [5.4.0](https://github.com/instructure/instructure-ui/compare/v5.3.1...v5.4.0) (2018-04-25)

### Bug Fixes

- **ui-a11y:** Update Focus Region to focus on next tick ([eef1df2](https://github.com/instructure/instructure-ui/commit/eef1df2))
- **ui-forms:** Only render checkmark when checked ([592d533](https://github.com/instructure/instructure-ui/commit/592d533))
- **ui-forms,DateInput:** set newState to textInputValue vs raw ([dd16c75](https://github.com/instructure/instructure-ui/commit/dd16c75))
- **ui-i18n:** Fix moment's version to >= 2.20 for toISOString(keepOffset ([5103a81](https://github.com/instructure/instructure-ui/commit/5103a81))
- **ui-themes:** Make high-contrast theme backwards compatible with < 5.3 ([28b75ef](https://github.com/instructure/instructure-ui/commit/28b75ef))

### Features

- **build:** Add no semi lint rule until we can add prettier config ([cd97004](https://github.com/instructure/instructure-ui/commit/cd97004))
- **ui-layout:** Add View and ContextView components ([497ccd5](https://github.com/instructure/instructure-ui/commit/497ccd5))

### Performance Improvements

- **ui-elements:** async avatar loading ([0501ae2](https://github.com/instructure/instructure-ui/commit/0501ae2))

<a name="5.3.1"></a>

## [5.3.1](https://github.com/instructure/instructure-ui/compare/v5.3.0...v5.3.1) (2018-04-24)

### Bug Fixes

- **ui-themes:** Should be backwards compatible with <= 5.3 components ([6f44e11](https://github.com/instructure/instructure-ui/commit/6f44e11))

<a name="5.3.0"></a>

# [5.3.0](https://github.com/instructure/instructure-ui/compare/v5.2.0...v5.3.0) (2018-04-20)

### Bug Fixes

- **ui-alerts:** Fix an issue where removing screenreader alerts could fail ([4fac6e6](https://github.com/instructure/instructure-ui/commit/4fac6e6))
- **ui-docs-client:** Update GithubCorner styles ([57ddbec](https://github.com/instructure/instructure-ui/commit/57ddbec))
- **ui-icons,IconAssignment:** Assignment should show for line & solid ([fbfcf59](https://github.com/instructure/instructure-ui/commit/fbfcf59))
- **ui-utils,getFontSize:** Improve performance ([702c923](https://github.com/instructure/instructure-ui/commit/702c923))

### Features

- **build:** Add visual diff scripts ([792d958](https://github.com/instructure/instructure-ui/commit/792d958))
- **build:** Generate Sketch assets from component examples ([33f88ae](https://github.com/instructure/instructure-ui/commit/33f88ae))
- **ui-forms:** allow persistent options in MultipleSelect ([ffc5946](https://github.com/instructure/instructure-ui/commit/ffc5946))
- **ui-icons:** import codemod config ([3b96226](https://github.com/instructure/instructure-ui/commit/3b96226))
- **ui-navigation:** new Navigation/NavigationItem component ([29da924](https://github.com/instructure/instructure-ui/commit/29da924))

<a name="5.2.0"></a>

# [5.2.0](https://github.com/instructure/instructure-ui/compare/v5.1.1...v5.2.0) (2018-04-06)

### Bug Fixes

- **ui-forms:** Fix warning issue in [DateTimeInput](#DateTimeInput) ([1704c53](https://github.com/instructure/instructure-ui/commit/1704c53))
- **ui-i18n:** Fix [DateTime](#DateTime). Should use moment-timezone. ([c78de61](https://github.com/instructure/instructure-ui/commit/c78de61))
- **ui-tabs:** Fix [TabList](#TabList) support for nodes as title ([eb33479](https://github.com/instructure/instructure-ui/commit/eb33479))

### Features

- **ui-billboard:** Size icons in [Billboard](#Billboard) with [SVGIcon](#SVGIcon) size prop ([11d3bfe](https://github.com/instructure/instructure-ui/commit/11d3bfe))
- **ui-forms:** Add readOnly to ui-forms components ([f494d0d](https://github.com/instructure/instructure-ui/commit/f494d0d))

<a name="5.1.1"></a>

## [5.1.1](https://github.com/instructure/instructure-ui/compare/v5.1.0...v5.1.1) (2018-04-05)

### Bug Fixes

- **ui-utils:** Generated element ids can't start with a number ([c6e159e](https://github.com/instructure/instructure-ui/commit/c6e159e))

<a name="5.1.0"></a>

# [5.1.0](https://github.com/instructure/instructure-ui/compare/v5.0.1...v5.1.0) (2018-04-04)

### Deprecations

#### **ui-menu: Deprecate MenuItemFlyout ([dc82765](https://github.com/instructure/instructure-ui/commit/dc82765))**

Don't panic. You can still create menu fly-outs. In order to simplify the component
API, the `MenuItemFlyout` component has been consolidated with `Menu`.

To create fly-out menus moving forward you can replace `MenuItemFlyout` with `Menu`.

See the updated [Menu](#Menu) documentation for examples.

### Bug Fixes

- **ui-forms:** remove 0.01em top padding ([14a5675](https://github.com/instructure/instructure-ui/commit/14a5675))
- **ui-code-editor:** CodeEditor content should update when value changes ([eb7ecdd](https://github.com/instructure/instructure-ui/commit/eb7ecdd))
- **ui-toggle-details:** iconColor should be themeable ([14e6577](https://github.com/instructure/instructure-ui/commit/14e6577))

### Features

- **DateTimeInput:** new DateTimeInput component ([2aaf29b](https://github.com/instructure/instructure-ui/commit/2aaf29b))

### Performance Improvements

- **ui-utils:** Replace shortid with nanoid ([5d0a93e](https://github.com/instructure/instructure-ui/commit/5d0a93e))

<a name="5.0.1"></a>

## [5.0.1](https://github.com/instructure/instructure-ui/compare/v5.0.0...v5.0.1) (2018-04-02)

### Bug Fixes

- Add missing dependencies ([d66826b](https://github.com/instructure/instructure-ui/commit/d66826b))

<a name="5.0.0"></a>

# [5.0.0](https://github.com/instructure/instructure-ui/compare/v4.8.0...v5.0.0) (2018-03-29)

### Upgrade Guide

The easiest way to upgrade is to run `yarn upgrade --scope @instructure`. Once you've done this, make sure
you check the 'BREAKING CHANGES' section below so that you can make those changes as necessary.

After upgrading you should see deprecation warnings in dev and test environments that will help you prepare
for future releases (or check out the 'Deprecations' section below). The [ui-codemods](#ui-codemods) scripts
should make it easy to update your import/require statements to get rid of a lot of the warnings. Note: you'll
need to update your package.json file manually to add the new packages.

Note though, that it's not necessary to upgrade everything at once. Depending on the size of your application
you may want to upgrade a package (or component) at a time. This is a major release, but in this case
it's safe to do that.

### Release Highlights

#### **Breaking up is hard to do: Goodbye, `ui-core`!**

We have broken `ui-core` into smaller packages like [ui-breadcrumb](#ui-breadcrumb), [ui-buttons](#ui-buttons),
and [ui-container](#ui-container). This change is intended to make consuming Instructure UI components easier by
allowing applications to only import and update the packages they need. You're welcome.

#### **...and hello, `ui-icons`!**

This release brings Instructure's [SVG icon library](#iconography) into Instructure UI. Icons can now be imported
from the [ui-icons](#ui-icons) package. We have also added a [ui-svg-images](#ui-svg-images) package, with components for
handling [inline SVGs](#InlineSVG) and [SVG icons](#SVGIcon).

#### **A [Responsive 🕶🎸](#Responsive) component ([abe0cb3](https://github.com/instructure/instructure-ui/commit/abe0cb3))**

If this release has a rock star, it's the [Responsive](#Responsive) component. It will swagger into
your application wearing shades, rock the greatest guitar solo you've ever heard, and basically
solve every responsive front-end problem ever. The true "one ring to rule them all" of responsive
development, Responsive allows you to -- _wait for it_ -- choose between element queries and
media queries, specify your own breakpoints, and conditionally render content at those breakpoints.
Enjoy.

#### **Add RFC generator and docs ([64d6368](https://github.com/instructure/instructure-ui/commit/64d6368))**

RFC stands for _Request for Comment_ and reflects our new process for contributing to Instructure
UI. An RFC is a markdown document that describes the purpose of the proposed change or addition,
including the API, props and theme variables. RFC documents are committed to Instructure UI
and iterated on by the contributor and the UI Development team. Once the RFC is approved and merged
to master, development can begin. Take a look at the [RFC for the Flex component](#FlexRFC), for
an example, or create your own by running `yarn generate:rfc` in your local repository.

#### **A media-capture Package**

This package was contributed recently for use in the [Arc video platform](https://www.arcmedia.com/) and includes a native [VideoPlayer](#VideoPlayer) as well as a [MediaCapture](#MediaCapture) component for recording and uploading videos.

#### **Add [Flex](#Flex) component ([7f702ac](https://github.com/instructure/instructure-ui/commit/7f702ac))**

Feeling like [Grid](#Grid) is just overkill for a simple column layout? Struggling to line up icons,
buttons, and text? Thinking of just giving up and quietly using `<table>`? Well, you're in for a
[real treat](#Flex), my friend.

#### **Add screen reader only variant to [Alert](#Alert)**

[Alert](#Alert) now has a `screenReaderOnly` property. When set to `true`, the alert should only be
visible to screen readers.

#### **Add experimental flag and decorator ([9bbcbab](https://github.com/instructure/instructure-ui/commit/9bbcbab))**

This feature allows component developers to indicate that their component uses JS or CSS features
that are not fully supported by all browsers, or that the component is still in experimentation mode
and the API may change. Putting `experimental: true` in the YAML front matter
of a doc will render a [Pill](#Pill) with the text 'Experimental' before the page heading in the
documentation. A console warning will also display in dev environments.

#### **Add [Img](#Img) cover property ([edcc5ce](https://github.com/instructure/instructure-ui/commit/edcc5ce))**

CSS's `object-fit: cover` comes to the [Img](#Img) component, with polyfill support for IE11. When
the new `cover` prop is `true`, Img fills the full width and height of its containing element, while
maintaining the aspect ratio of the source image. Great for full-page or section background images.

#### **Update [Select](#Select) to use non-native options dropdown ([c291a38](https://github.com/instructure/instructure-ui/commit/c291a38))**

We have combined Autocomplete and [Select](#Select) into a single, amazing component. No more ugly
browser-styled select options! With this change, Select moves to the new [ui-forms](#ui-forms) package. The
original Select and Autocomplete components in `ui-core` are now deprecated and will be removed in a
future release. We've also fixed a bunch of accessibility bugs in the process, so upgrade as soon
as you can!

### Deprecations

#### **applicationElement ([ee7d1e9](https://github.com/instructure/instructure-ui/commit/ee7d1e9))**

Remember when you used to have to pass in an `applicationElement` prop to [Moda](#Modal), [Popover](#Popover),
and [Tray](#Tray)?

Forget about it. You no longer have to supply an `applicationElement` prop because it's all done automagically 🎩.

#### **ui-core Deprecations**

Nearly all components in ui-core have been deprecated in the 5.0.0 release and have been moved into separate,
smaller packages. As you upgrade, you can run a [ui-codemod](#ui-codemods) script to update the import/require
statements in your code, or check the `config/imports.config.json` file in the ui-core package to see where
things have moved. Also note that if you upgrade the `ui-core` package, you'll see deprecation warnings
in dev and test environments that will also tell you what the new package is for each component. Note: you'll
need to update your package.json file manually to add the new packages.

#### **PopoverMenu ([893f628](https://github.com/instructure/instructure-ui/commit/893f6289d2bb9ca0dee0327b0e75759e7d5dc074))**

Speaking of `ui-core`... `PopoverMenu` will remain in ui-core _but_ it does not make the move to the new `ui-menu` package on its own, PopoverMenu functionality has now been consolidated into [Menu](#Menu). By assigning a node to the `trigger` prop it will create a menu from the triggering element (ie: <Button>).

#### **Close Buttons**

The `closeButtonLabel` prop is deprecated in [Modal](#Modal), [Tray](#Tray), and [Popover](#Popover). To migrate
to the new versions of these components, render a [CloseButton](#CloseButton) as a child (see the examples in the
documentation for implementation details). This change should give consuming applications more control over the
layout of the content.

#### **Icon width and height**

The `width` and `height` props have been deprecated in the [SVGIcon](#SVGIcon) component. Going forward, you
can use the `size` prop instead. This should make the icons sizes more consistent across the consuming application.

### BREAKING CHANGES

- **ui-forms:** [MetricsList](#MetricsList) text alignment is now a prop instead of a theme variable
- **ui-motion,ui-alerts:** - The [Transition](#Transition).duration and [Alert](#Alert).transitionDuration static
  attributes have been removed. These values are now distributed
  via a duration theme variable located in
  `ui-themes/lib/canvas/base/transition.js`
- **ui-presets:** Themes have to be imported in a `mocha.config.js` file for mocha/jsdom tests
- **ui-forms:** [DateInput](#DateInput) onDateChange prop arguments have changed and the
  invalidDateMessage prop is now required.
- **ui-forms:** [RadioInputGroup](#RadioInputGroup) onChange prop arguments have changed
- **ui-a11y:** FocusManager is no longer exported as a singleton. You now need to import and create a new instance. Ex:
  `const myFocusManager = new FocusManager()`
- **ui-tabs:** [TabList](#TabList) deprecated `accordion` variant is removed. Use the [ToggleDetails](#ToggleDetails)
  component instead.
- **ui-utils:** Usage of [CustomPropTypes](#CustomPropTypes) will need to be updated for
  the types that have been split out into [LayoutPropTypes](#LayoutPropTypes), [I18nPropTypes](#I18I18nPropTypes),
  [FormPropTypes](#FormPropTypes), and [ThemeablePropTypes](#ThemeablePropTypes)

### Bug Fixes

- **docs:** Prevent console warnings in docs app ([e4729ec](https://github.com/instructure/instructure-ui/commit/e4729ec))
- **media-capture:** Do not trigger device dialog on finished ([5cdc70f](https://github.com/instructure/instructure-ui/commit/5cdc70f))
- **media-capture:** User-friendly device names on Firefox
- **scripts:** Fix release script for pre-releases ([03d11a4](https://github.com/instructure/instructure-ui/commit/03d11a4))
- **scripts:** Add babel and postcss config to package template
- **ui-a11y:** [focusManager](#focusManager) should handle multiple dialogs ([9722dbe](https://github.com/instructure/instructure-ui/commit/9722dbe))
- **ui-alerts:** add min-width to [Alert](#Alert) so flex items don't collapse ([9861c9b](https://github.com/instructure/instructure-ui/commit/9861c9b))
- **ui-buttons:** Fix icon centering with as=div [Button](#Button) ([659f3a4](https://github.com/instructure/instructure-ui/commit/659f3a4))
- **ui-buttons:** Fix inverse link [Button](#Button) :focus outline ([b9abdb0](https://github.com/instructure/instructure-ui/commit/b9abdb0))
- **ui-buttons:** [Button](#Button) Fire onClick with href prop ([f7c22c9](https://github.com/instructure/instructure-ui/commit/f7c22c9))
- **ui-elements:** rename Image component to [Img](#Img) ([668479f](https://github.com/instructure/instructure-ui/commit/668479f))
- **ui-elements:** Fix high contrast mode for [ProgressBar](#ProgressBar) ([2aed758](https://github.com/instructure/instructure-ui/commit/2aed758))
- **ui-elements:** trim whitespace in [Avatar](#Avatar) makeInitialsFromName ([212e92a](https://github.com/instructure/instructure-ui/commit/212e92a))
- **ui-elements:** deprecate [Heading](#Heading) color prop ([74b86e0](https://github.com/instructure/instructure-ui/commit/74b86e0))
- **ui-elements:** fix [Image](#Image) display property ([a72961c](https://github.com/instructure/instructure-ui/commit/a72961c))
- **ui-elements:** Make [Spinner](#Spinner) look better in IE11 ([081f7a0](https://github.com/instructure/instructure-ui/commit/081f7a0))
- **ui-elements:** Disabled [Tag](#Tag) should not be keyboard focusable ([6bb66bc](https://github.com/instructure/instructure-ui/commit/6bb66bc))
- **ui-elements:** allow node prop type for [MetricsList](#MetricsList) label and value props ([ffaaeea](https://github.com/instructure/instructure-ui/commit/ffaaeea))
- **ui-forms:** Resolve [Select](#Select) a11y issues ([a66a03c](https://github.com/instructure/instructure-ui/commit/a66a03c))
- **ui-forms:** [Select](#Select) doesn't expand with Space key ([866709f](https://github.com/instructure/instructure-ui/commit/866709f))
- **ui-forms:** Fix [TextArea](#TextArea) resizing when text is deleted ([682d336](https://github.com/instructure/instructure-ui/commit/682d336))
- **ui-forms:** [TextInput](#TextInput) not reading [Tooltip](#Tooltip) id ([5d6adee](https://github.com/instructure/instructure-ui/commit/5d6adee))
- **ui-forms:** increase CSS specificity for [NumberInput](#NumberInput),[TimeInput](#TimeInput) ([a6b08b3](https://github.com/instructure/instructure-ui/commit/a6b08b3))
- **ui-forms:** [RadioInputGroup](#RadioInputGroup) should pass event to onChange cb ([4268eec](https://github.com/instructure/instructure-ui/commit/4268eec))
  ([74fa7eb](https://github.com/instructure/instructure-ui/commit/74fa7eb))
- **ui-forms:** Allow [Select](#Select) selectedOption to be cleared ([2aa2b94](https://github.com/instructure/instructure-ui/commit/2aa2b94))
- **ui-forms:** Ensure [Select](#Select) resets results on close ([b26c8b3](https://github.com/instructure/instructure-ui/commit/b26c8b3))
- **ui-forms:** Fix [Select](#Select) component onChange handlers ([c6ef9fc](https://github.com/instructure/instructure-ui/commit/c6ef9fc))
- **ui-forms:** Prevent value change of disabled controlled [Select](#Select) ([525a4e4](https://github.com/instructure/instructure-ui/commit/525a4e4))
- **ui-forms:** [TextArea](#TextArea) should shrink when cleared ([3320d9d](https://github.com/instructure/instructure-ui/commit/3320d9d))
- **ui-icons:** Add Sketch template file ([42a5c3f](https://github.com/instructure/instructure-ui/commit/42a5c3f))
- **ui-layout:** Fix [Position](#Position) constraint logic ([9763ef3](https://github.com/instructure/instructure-ui/commit/9763ef3))
- **ui-layout:** Fix [Position](#Position) getOffsetParents in IE11 ([15797b5](https://github.com/instructure/instructure-ui/commit/15797b5))
- **ui-layout:** [Position](#Position) should handle transformed/relative position parents ([26bc897](https://github.com/instructure/instructure-ui/commit/26bc897))
- **media-capture:** Utilize ts-ebml to get duration and cues headers in ([8aadc43](https://github.com/instructure/instructure-ui/commit/8aadc43))
- **ui-menu:** Remove transition from :focus ring on [Menu](#Menu) ([cba89db](https://github.com/instructure/instructure-ui/commit/cba89db))
- **ui-menu:** Resolve issues with [Menu](#Menu) inside [Modal](#Modal) ([c6f3c18](https://github.com/instructure/instructure-ui/commit/c6f3c18))
- **ui-presets:** Remove cycle in dependency graph ([352a58b](https://github.com/instructure/instructure-ui/commit/352a58b))
- **ui-presets:** Remove unnecessary dependency ([943bab4](https://github.com/instructure/instructure-ui/commit/943bab4))
- **ui-testbed:** update CSS to disable transitions ([fa75264](https://github.com/instructure/instructure-ui/commit/fa75264))
- **ui-svg-images:** fix [InlineSVG](#InlineSVG) example size ([0369e7e](https://github.com/instructure/instructure-ui/commit/0369e7e))
- **ui-svg-images:** Fix size prop for [SVGIcon](#SVGIcon) ([2ef69e9](https://github.com/instructure/instructure-ui/commit/2ef69e9))

### Features

- **build:** Add RFC generator and docs ([64d6368](https://github.com/instructure/instructure-ui/commit/64d6368))
- **build:** Add copyright notice eslint plugin ([0153907](https://github.com/instructure/instructure-ui/commit/0153907))
- **media-capture:** add feature detection for [MediaCapture](#MediaCapture) ([c7450f6](https://github.com/instructure/instructure-ui/commit/c7450f6))
- **media-capture:** Add [MediaCapture](#MediaCapture), [VideoPlayer](#VideoPlayer) ([39ebb9e](https://github.com/instructure/instructure-ui/commit/39ebb9e))
- **media-capture:** [VideoPlayer](#VideoPlayer) playback onCanPlay handler ([c00de06](https://github.com/instructure/instructure-ui/commit/c00de06))
- **scripts:** Add ability to specify a package to generate:component ([1a890ee](https://github.com/instructure/instructure-ui/commit/1a890ee))
- **ui-a11y:** add ui-a11y package ([e913843](https://github.com/instructure/instructure-ui/commit/e913843))
- **ui-a11y:** add a [FocusRegion](#FocusRegion) component ([f395fd8](https://github.com/instructure/instructure-ui/commit/f395fd8))
- **ui-a11y:** Add [FocusRegionManager](#FocusRegionManager), [FocusRegion](#FocusRegion) utilities ([d14eaa0](https://github.com/instructure/instructure-ui/commit/d14eaa0))
- **ui-a11y:** add hasVisibleChildren ([bf31684](https://github.com/instructure/instructure-ui/commit/bf31684))
- **ui-alerts:** Add a ui-alerts package ([d078984](https://github.com/instructure/instructure-ui/commit/d078984))
- **ui-alerts:** Add screen reader only variant to [Alert](#Alert) ([d764e94](https://github.com/instructure/instructure-ui/commit/d764e94))
- **ui-billboard:** Add ui-billboard package ([4272911](https://github.com/instructure/instructure-ui/commit/4272911))
- **ui-breadcrumb:** Add ui-breadcrumb package ([b990973](https://github.com/instructure/instructure-ui/commit/b990973))
- **ui-buttons:** Add a ui-buttons package ([21bde2f](https://github.com/instructure/instructure-ui/commit/21bde2f))
- **ui-code-editor:** Add ui-code-editor package ([7d6bd1c](https://github.com/instructure/instructure-ui/commit/7d6bd1c))
- **ui-container:** Add a ui-container package ([b90aade](https://github.com/instructure/instructure-ui/commit/b90aade))
- **ui-docs-plugin,ui-utils:** Add experimental flag and decorator ([9bbcbab](https://github.com/instructure/instructure-ui/commit/9bbcbab))
- **ui-elements:** Add a ui-elements package ([12483d7](https://github.com/instructure/instructure-ui/commit/12483d7))
- **ui-elements:** add [Img](#Img) component ([9d0cb9e](https://github.com/instructure/instructure-ui/commit/9d0cb9e))
- **ui-elements:** Deprecate colors for [Heading](#Heading) ([26cc418](https://github.com/instructure/instructure-ui/commit/26cc418))
- **ui-elements:** Add [Img](#Img) cover property ([edcc5ce](https://github.com/instructure/instructure-ui/commit/edcc5ce))
- **ui-elements:** Add [Rating](#Rating) to ui-elements package ([77eaa11](https://github.com/instructure/instructure-ui/commit/77eaa11))
- **ui-forms:** Add ui-forms package ([ca6b694](https://github.com/instructure/instructure-ui/commit/ca6b694))
- **ui-forms:** Update [NumberInput](#NumberInput) i18n solution ([572bb3a](https://github.com/instructure/instructure-ui/commit/572bb3a))
- **ui-forms:** [Checkbox](#Checkbox) Update checkmark icon and border ([e75b0e6](https://github.com/instructure/instructure-ui/commit/e75b0e6))
- **ui-forms:** Update [Select](#Select) to use non-native options dropdown ([c291a38](https://github.com/instructure/instructure-ui/commit/c291a38))
- **ui-forms:** [TextArea](#TextArea) maxHeight should accept ems, rems ([8817c07](https://github.com/instructure/instructure-ui/commit/8817c07))
- **ui-i18n:** Adding ui-i18n package ([823f89a](https://github.com/instructure/instructure-ui/commit/823f89a))
- **ui-icons:** Add icons (from instructure-icons) as a new package ([8c3b3f0](https://github.com/instructure/instructure-ui/commit/8c3b3f0))
- **ui-icons:** add share and video-camera icons ([5c7a3fb](https://github.com/instructure/instructure-ui/commit/5c7a3fb))
- **ui-icons:** add progress icon ([0f4207b](https://github.com/instructure/instructure-ui/commit/0f4207b))
- **ui-layout:** Add ui-layout package ([c461644](https://github.com/instructure/instructure-ui/commit/c461644))
- **ui-layout:** A [Responsive](#Responsive) component ([abe0cb3](https://github.com/instructure/instructure-ui/commit/abe0cb3))
- **ui-layout:** A [DrawerLayout](#DrawerLayout) component ([1cfb7b5](https://github.com/instructure/instructure-ui/commit/1cfb7b5))
- **ui-layout:** Add [Flex](#Flex) component ([7f702ac](https://github.com/instructure/instructure-ui/commit/7f702ac))
- **ui-menu:** Add ui-menu package ([7a7fb35](https://github.com/instructure/instructure-ui/commit/7a7fb35))
- **ui-motion:** Add ui-motion package ([638c6a9](https://github.com/instructure/instructure-ui/commit/638c6a9))
- **ui-overlays:** Add a ui-overlays package ([c9762a4](https://github.com/instructure/instructure-ui/commit/c9762a4))
- **ui-overlays:** [Tray](#Tray),[Modal](#Modal) Deprecate closeButtonLabel and closeButtonRef ([85a76b8](https://github.com/instructure/instructure-ui/commit/85a76b8))
- **ui-overlays,ui-i18n:** Add RTL language support to [Tray](#Tray) ([3309bcb](https://github.com/instructure/instructure-ui/commit/3309bcb))
- **ui-overlays:** deprecate applicationElement prop ([ee7d1e9](https://github.com/instructure/instructure-ui/commit/ee7d1e9))
- **ui-pages:** Add [Pages](#Pages) component ([6fda3e3](https://github.com/instructure/instructure-ui/commit/6fda3e3))
- **ui-pagination:** Add ui-pagination package ([ef3ee97](https://github.com/instructure/instructure-ui/commit/ef3ee97))
- **ui-portal:** Add ui-portal package ([d4ed6db](https://github.com/instructure/instructure-ui/commit/d4ed6db))
- **ui-presets,ui-core:** Add support for node test environments ([5d3a452](https://github.com/instructure/instructure-ui/commit/5d3a452))
- **ui-svg-images:** Add ui-svg-images, remove instructure-icons imports ([6201628](https://github.com/instructure/instructure-ui/commit/6201628))
- **ui-svg-images:** Add [SVGIcon](#SVGIcon) size prop, deprecate height/width ([24501ea](https://github.com/instructure/instructure-ui/commit/24501ea))
- **ui-svg-images:** Add `inline` prop to [SVGIcon](#SVGIcon) and [InlineSVG](#InlineSVG) ([72fe27f](https://github.com/instructure/instructure-ui/commit/72fe27f))
- **ui-tabs:** Add ui-tabs package ([7b984c7](https://github.com/instructure/instructure-ui/commit/7b984c7))
- **ui-themeable:** Add [ApplyTheme](#ApplyTheme) to ui-themeable package
- **ui-themeable:** Add shorthandPropType ([066d1f0](https://github.com/instructure/instructure-ui/commit/066d1f0))
  ([c69644c](https://github.com/instructure/instructure-ui/commit/c69644c))
- **ui-toggle-details:** Add ui-toggle-details package ([6b606de](https://github.com/instructure/instructure-ui/commit/6b606de))
- **ui-tree-browser:** Add ui-tree-browser package ([1c59c1f](https://github.com/instructure/instructure-ui/commit/1c59c1f))
- **ui-utils:** Split up CustomPropTypes ([25fb0e0](https://github.com/instructure/instructure-ui/commit/25fb0e0))

<a name="4.8.0"></a>

# [4.8.0](https://github.com/instructure/instructure-ui/compare/v4.7.3...v4.8.0) (2018-03-26)

### Bug Fixes

- **ui-buttons:** Button href prop should work with onClick ([b2a78bb](https://github.com/instructure/instructure-ui/commit/b2a78bb))

### Features

- **ui-overlay,ui-i18n:** add RTL language support to Tray ([92679d7](https://github.com/instructure/instructure-ui/commit/92679d7))

<a name="4.7.3"></a>

## [4.7.3](https://github.com/instructure/instructure-ui/compare/v4.7.2...v4.7.3) (2018-03-06)

### Bug Fixes

- **FileDrop:** Fix positioning of the inner native file input element ([3664ccb](https://github.com/instructure/instructure-ui/commit/3664ccb))

<a name="4.7.2"></a>

## [4.7.2](https://github.com/instructure/instructure-ui/compare/v4.7.1...v4.7.2) (2018-02-14)

### Bug Fixes

- **ListItem:** stop :not selector selecting everything ([8209b8c](https://github.com/instructure/instructure-ui/commit/8209b8c))

<a name="4.7.1"></a>

## [4.7.1](https://github.com/instructure/instructure-ui/compare/v4.7.0...v4.7.1) (2018-01-25)

### Bug Fixes

- **ui-menu:** Pass href prop down to ElementType ([e876404](https://github.com/instructure/instructure-ui/commit/e876404))

<a name="4.7.0"></a>

# [4.7.0](https://github.com/instructure/instructure-ui/compare/v4.6.0...v4.7.0) (2018-01-24)

### Bug Fixes

- **babel-plugin-transform-class-display-name:** Add empty statement ([92473b3](https://github.com/instructure/instructure-ui/commit/92473b3))
- **Button:** fix icon alignment for small/large circle variant ([2853f53](https://github.com/instructure/instructure-ui/commit/2853f53))
- **Button,TreeBrowser:** Focus outline on focus only w/ MS Edge ([30ee7b2](https://github.com/instructure/instructure-ui/commit/30ee7b2))
- **DateInput:** fire onDateChange when transitioning to/from empty ([9765f55](https://github.com/instructure/instructure-ui/commit/9765f55))
- **MetricsList:** fix alignment for edge ([58333cd](https://github.com/instructure/instructure-ui/commit/58333cd))
- **MetricsList:** Vertically align MetricsListItems ([b666c09](https://github.com/instructure/instructure-ui/commit/b666c09))
- **Popover:** adds alignArrow prop to Popover ([46414dc](https://github.com/instructure/instructure-ui/commit/46414dc))
- **TimeInput:** allow disabled prop to pass down ([6e9f444](https://github.com/instructure/instructure-ui/commit/6e9f444))

### Features

- **List:** Add itemSpacing prop ([36cf537](https://github.com/instructure/instructure-ui/commit/36cf537))

<a name="4.6.0"></a>

# [4.6.0](https://github.com/instructure/instructure-ui/compare/v4.5.0...v4.6.0) (2018-01-03)

### Bug Fixes

- **List:** don't render delimiter when delimiter=none unless it's inline ([3e81b1f](https://github.com/instructure/instructure-ui/commit/3e81b1f))
- **List:** ignore falsy children ([cb7a45c](https://github.com/instructure/instructure-ui/commit/cb7a45c)), closes [/github.com/facebook/react/issues/2956#issuecomment-338041943](https://github.com//github.com/facebook/react/issues/2956/issues/issuecomment-338041943)

### Features

- **build:** Support a beta release branch ([b9b187c](https://github.com/instructure/instructure-ui/commit/b9b187c))
- **Button:** Handle text color for :hover/:focus ([8c77678](https://github.com/instructure/instructure-ui/commit/8c77678))
- **PopoverMenu:** re-export MenuItem, etc. for simplicity ([52ecc4c](https://github.com/instructure/instructure-ui/commit/52ecc4c))
- **postcss:** Add config option to opt into nesting instead of nested ([5443bbb](https://github.com/instructure/instructure-ui/commit/5443bbb))

<a name="4.5.0"></a>

# [4.5.0](https://github.com/instructure/instructure-ui/compare/v4.4.1...v4.5.0) (2017-12-19)

### Bug Fixes

- **CloseButton:** remove inline size to allow size prop to work correctl ([0c01510](https://github.com/instructure/instructure-ui/commit/0c01510))
- **DateInput:** Allow text input when component is controlled ([05e0112](https://github.com/instructure/instructure-ui/commit/05e0112))
- **FormFieldLayout:** fix inline input issues ([35ca6bb](https://github.com/instructure/instructure-ui/commit/35ca6bb))
- **ui-codemods:** Update Typography to Text ([ff9d596](https://github.com/instructure/instructure-ui/commit/ff9d596))
- **ui-docs-plugin:** Pass down config to loaders correctly ([62f01f6](https://github.com/instructure/instructure-ui/commit/62f01f6))
- **ui-presets:** Remove unnecessary dependency that's causing issues dow ([a55b8b3](https://github.com/instructure/instructure-ui/commit/a55b8b3))

### Features

- **List:** Updates variant prop. Adds delimiter prop. ([7b29a44](https://github.com/instructure/instructure-ui/commit/7b29a44))

<a name="4.4.1"></a>

## [4.4.1](https://github.com/instructure/instructure-ui/compare/v4.4.0...v4.4.1) (2017-12-14)

### Bug Fixes

- **ui-docs-plugin:** Pass down config to loaders correctly ([deabfc4](https://github.com/instructure/instructure-ui/commit/deabfc4))
- **ui-presets:** Remove unnecessary dependency that's causing issues dow ([bd2d81e](https://github.com/instructure/instructure-ui/commit/bd2d81e))

<a name="4.4.0"></a>

# [4.4.0](https://github.com/instructure/instructure-ui/compare/v4.3.0...v4.4.0) (2017-12-13)

### Bug Fixes

- **Avatar:** trim whitespace in makeInitialsFromName ([4317939](https://github.com/instructure/instructure-ui/commit/4317939))
- **docs:** Add missing docs app dependency ([fea9a70](https://github.com/instructure/instructure-ui/commit/fea9a70))
- **TextArea:** shrink when cleared ([0b45287](https://github.com/instructure/instructure-ui/commit/0b45287))

### Features

- **ui-presets,ui-core:** Add support for node test environments + tweaks for quizzes ([dc7a484](https://github.com/instructure/instructure-ui/commit/dc7a484))

<a name="4.3.0"></a>

# [4.3.0](https://github.com/instructure/instructure-ui/compare/v4.2.0...v4.3.0) (2017-12-11)

### Bug Fixes

- **Alert:** close button focus overlapping edge of container ([aeb2130](https://github.com/instructure/instructure-ui/commit/aeb2130))
- **Alert:** Convert border values to theme vars ([273c86e](https://github.com/instructure/instructure-ui/commit/273c86e))
- **Autocomplete:** fix controlled behavior ([8af7d62](https://github.com/instructure/instructure-ui/commit/8af7d62))
- **browser:** fix accessing style when it's undefined in Position ([806a861](https://github.com/instructure/instructure-ui/commit/806a861))
- **build:** Always ask for the release tag ([e01629c](https://github.com/instructure/instructure-ui/commit/e01629c))
- **build:** Use correct format for release (git) tags ([c9ec4df](https://github.com/instructure/instructure-ui/commit/c9ec4df))
- **Checkbox:** Update disabled/readonly checkboxes to not be tabbable ([8b37729](https://github.com/instructure/instructure-ui/commit/8b37729))
- **ContextBox:** Position close button correctly in dialog example ([7c0e846](https://github.com/instructure/instructure-ui/commit/7c0e846))
- **DateInput:** fix controlled component version ([af6208e](https://github.com/instructure/instructure-ui/commit/af6208e))
- **DateInput:** Link messages to inputs for SR ([fe8f2bc](https://github.com/instructure/instructure-ui/commit/fe8f2bc))
- **DateInput:** Prevent inputRef from getting called multiple times ([1dbd960](https://github.com/instructure/instructure-ui/commit/1dbd960))
- **FileDrop:** allow extensions without leading dot ([9a155e9](https://github.com/instructure/instructure-ui/commit/9a155e9))
- **Grid:** Make GridCols equal-width by default ([cb8e5d3](https://github.com/instructure/instructure-ui/commit/cb8e5d3))
- **Link:** fix inverse focus for a11y ([c98a4af](https://github.com/instructure/instructure-ui/commit/c98a4af))
- **List:** remove ellipsis styles from pipe variant ([390a60a](https://github.com/instructure/instructure-ui/commit/390a60a))
- **Mask:** Make full-screen Mask work in Safari ([029f467](https://github.com/instructure/instructure-ui/commit/029f467))
- **Menu:** Long menu item alignment is off ([3cfc435](https://github.com/instructure/instructure-ui/commit/3cfc435))
- **Menu,MenuItem,PopoverMenu:** Fix VO double select on radio,checkbox ([28b733b](https://github.com/instructure/instructure-ui/commit/28b733b))
- **NumberInput:** add sv locale ([40c6cb7](https://github.com/instructure/instructure-ui/commit/40c6cb7))
- **NumberInput:** extend `disabled` styling to the arrow container ([d3ac1d4](https://github.com/instructure/instructure-ui/commit/d3ac1d4))
- **Popover:** Popover onDismiss callback never fired ([28d236c](https://github.com/instructure/instructure-ui/commit/28d236c))
- **RadioInput:** Disabled/read-only radios selectable in Safari ([5fbba2c](https://github.com/instructure/instructure-ui/commit/5fbba2c))
- **RadioInput,Checkbox:** Move inputs outside label elements ([7531488](https://github.com/instructure/instructure-ui/commit/7531488))
- **release:** Run tests only once for a release ([c3710fb](https://github.com/instructure/instructure-ui/commit/c3710fb))
- **Select:** Make arrowColor theme variable work ([3731899](https://github.com/instructure/instructure-ui/commit/3731899))
- **Spinner:** adjust large spinner animation ([36d9ea6](https://github.com/instructure/instructure-ui/commit/36d9ea6))
- **Tag:** Tag components render wrong title value ([88b9bf1](https://github.com/instructure/instructure-ui/commit/88b9bf1))
- **ToggleDetails:** Fix filled variant in IE11 ([f1970d1](https://github.com/instructure/instructure-ui/commit/f1970d1))
- **Tooltip:** Move focus on single tab press with tooltip ([dd7d4d0](https://github.com/instructure/instructure-ui/commit/dd7d4d0))
- **ui-core:** Audit/add missing Canvas variables ([a9cefe9](https://github.com/instructure/instructure-ui/commit/a9cefe9))
- **ui-core:** Fix canvas-high-contrast component themes ([c577019](https://github.com/instructure/instructure-ui/commit/c577019))
- **ui-docs-client:** Codepen links are missing some globals ([9e620e2](https://github.com/instructure/instructure-ui/commit/9e620e2))
- **ui-docs-plugin:** misc fixes ([aff7b27](https://github.com/instructure/instructure-ui/commit/aff7b27))
- **ui-presets:** Build CSS with webpack in dev/debug mode ([d3083be](https://github.com/instructure/instructure-ui/commit/d3083be))
- **ui-presets:** Don't remove width/height from SVG tags ([639f620](https://github.com/instructure/instructure-ui/commit/639f620))

### Features

- **build:** Default release script to HEAD commit ([f96b34a](https://github.com/instructure/instructure-ui/commit/f96b34a))
- **build:** Use headless chrome ([39339fd](https://github.com/instructure/instructure-ui/commit/39339fd))
- **ContextBox,Container:** Moving border from ContextBox to Container ([8bf314a](https://github.com/instructure/instructure-ui/commit/8bf314a))
- **FileDrop:** Add support for validation messages ([37a9106](https://github.com/instructure/instructure-ui/commit/37a9106))
- **FormField:** Add prop to allow left aligned FormField label ([089833a](https://github.com/instructure/instructure-ui/commit/089833a))
- **Menu:** Add focus state ([b5f4069](https://github.com/instructure/instructure-ui/commit/b5f4069))
- **Menu:** Focus first menu item when menu only has one item ([d03d1f2](https://github.com/instructure/instructure-ui/commit/d03d1f2))
- **TextInput:** add textAlign variant to support `center` ([53843e1](https://github.com/instructure/instructure-ui/commit/53843e1))
- **ui-core:** Move moment dependency to ui-utils ([0d12a6a](https://github.com/instructure/instructure-ui/commit/0d12a6a))
- **ui-presets:** Add build and test scripts ([6921a48](https://github.com/instructure/instructure-ui/commit/6921a48))
- **ui-themes:** Add canvas-high-contrast theme ([e6cd8e8](https://github.com/instructure/instructure-ui/commit/e6cd8e8))
- **ui-utils:** Add a uid helper ([c9cc6c3](https://github.com/instructure/instructure-ui/commit/c9cc6c3))
- **ui-utils:** Addition of utils needed for the layout component ([501ada3](https://github.com/instructure/instructure-ui/commit/501ada3))

<a name="4.2.0"></a>

# [4.2.0](https://github.com/instructure/instructure-ui/compare/4.1.0...4.2.0) (2017-12-08)

### Features

- **button:** remove focus on disabled buttons ([863e055](https://github.com/instructure/instructure-ui/commit/863e055))

<a name="4.1.0"></a>

# [4.1.0](https://github.com/instructure/instructure-ui/compare/4.0.1...4.1.0) (2017-11-29)

### Bug Fixes

- **Tag:** Focus state hidden in IE11 ([22d5d5c](https://github.com/instructure/instructure-ui/commit/22d5d5c))
- **ui-docs-client:** Codepen links are missing some globals ([0a3f30c](https://github.com/instructure/instructure-ui/commit/0a3f30c))

### Features

- **Tag:** inline variant ([7ad7f7a](https://github.com/instructure/instructure-ui/commit/7ad7f7a))

<a name="4.0.1"></a>

## [4.0.1](https://github.com/instructure/instructure-ui/compare/v4.0.0...v4.0.1) (2017-11-17)

### Bug Fixes

- **Mask:** Fullscreen modal footer hidden on iPad ([ebb76d5](https://github.com/instructure/instructure-ui/commit/ebb76d5))
- **ui-codemods:** add lib to imports path for ui-themes and ui-themeable ([973cf9b](https://github.com/instructure/instructure-ui/commit/973cf9b))

<a name="4.0.0"></a>

# [4.0.0](https://github.com/instructure/instructure-ui/compare/v3.3.1...v4.0.0) (2017-10-13)

The two major themes of the 4.0 release are mono-repo and documentation!

### Mono-repo

In 4.0 we've split the `instructure-ui` library into a bunch of smaller libraries
and we're publishing them all as separate modules to NPM.

This should make it easier to upgrade going forward. (e.g you can upgrade to a
patch or minor release of [@instructure/ui-core](#ui-core) without upgrading
[@instructure/ui-themeable](#ui-themeable)).

Unfortunately this also means that paths for imports will have to change when applying
this upgrade.

However, the codemod script provided by [@instructure/ui-codemods](#ui-codemods)
should help with that, and you can see what paths have changed in the `ui-core/config/imports.config.json` file.

### Documentation

The [@instructure/ui-docs-plugin](#ui-docs-plugin) module has gotten an overhaul and now supports
[JSDoc](http://usejsdoc.org/) and generates documentation from any file format that
supports JS style code blocks, in addition to markdown.

All of the utilities, and packages have been documented, so finding your way
around the libraries and seeing how they fit together should be a lot easier.

### Bug Fixes

- **Alert:** Announce live region content in the docs ([493440a](https://github.com/instructure/instructure-ui/commit/493440a))
- **Autocomplete:** add calls for onInputChange ([33ad3cb](https://github.com/instructure/instructure-ui/commit/33ad3cb))
- **Autocomplete,Codepen:** Codepen examples should render ([36ef124](https://github.com/instructure/instructure-ui/commit/36ef124))
- **Autocomplete,Menu,Dialog:** Prevent esc from closing Dialog ([284eeed](https://github.com/instructure/instructure-ui/commit/284eeed))
- **Avatar:** include canvas theme generator ([dc27b6a](https://github.com/instructure/instructure-ui/commit/dc27b6a))
- **build:** ignore lib directories ([cb56606](https://github.com/instructure/instructure-ui/commit/cb56606))
- **build:** Use local version of yarn for scripts ([fcf7732](https://github.com/instructure/instructure-ui/commit/fcf7732))
- **build:** use relative paths for entries so that app rebuilds in dev ([f60d94d](https://github.com/instructure/instructure-ui/commit/f60d94d))
- **Button:** Correct fluidWidth Button heights ([5ede261](https://github.com/instructure/instructure-ui/commit/5ede261))
- **CheckboxGroup,RadioInputGroup:** Link messages to inputs for SR ([fba6550](https://github.com/instructure/instructure-ui/commit/fba6550))
- **documentation:** Examples should have valid URLs for hrefs ([18eeaa4](https://github.com/instructure/instructure-ui/commit/18eeaa4))
- **FileDrop:** make input sibling of label ([d892cff](https://github.com/instructure/instructure-ui/commit/d892cff))
- **Forms:** fix css placeholder color ([7c63393](https://github.com/instructure/instructure-ui/commit/7c63393))
- **Forms:** Update size prop ([95ecfd2](https://github.com/instructure/instructure-ui/commit/95ecfd2))
- **Grid:** width and offset not working ([1a2fa45](https://github.com/instructure/instructure-ui/commit/1a2fa45))
- **Grid:** GridCol with width="auto" should not shrink ([ae82286](https://github.com/instructure/instructure-ui/commit/ae82286))
- **Mask:** Prevent mask from calling onDismiss when defaultPrevented ([4f42ad0](https://github.com/instructure/instructure-ui/commit/4f42ad0))
- **Mask:** Update Mask example text ([77deb7e](https://github.com/instructure/instructure-ui/commit/77deb7e))
- **Modal:** Modify modal to dismiss for Mask click instead of document ([64f6816](https://github.com/instructure/instructure-ui/commit/64f6816))
- **ToggleDetails:** Fix fluidWidth prop / updates ([de9ef24](https://github.com/instructure/instructure-ui/commit/de9ef24))
- **ui-docs-client:** Fix navigation issues ([193399e](https://github.com/instructure/instructure-ui/commit/193399e))
- **ui-docs-client:** Make version link to changelog ([581fca4](https://github.com/instructure/instructure-ui/commit/581fca4))

### Features

- **Autocomplete:** implement value getter ([1a8a730](https://github.com/instructure/instructure-ui/commit/1a8a730))
- **ui-codemods:** Adding codemod for updating imports ([f4907cb](https://github.com/instructure/instructure-ui/commit/f4907cb))
- **build:** Monorepo second pass ([5fae316](https://github.com/instructure/instructure-ui/commit/5fae316))
- **build:** Monorepo, yarn workspaces and Lerna setup ([edd71af](https://github.com/instructure/instructure-ui/commit/edd71af))
- **DateInput:** Add conversion status as part of onDateChange ([1ecb819](https://github.com/instructure/instructure-ui/commit/1ecb819))
- **Forms:** Update component font sizes ([13f77c6](https://github.com/instructure/instructure-ui/commit/13f77c6))
- **List:** Remove margin from unstyled list item ([0e39d75](https://github.com/instructure/instructure-ui/commit/0e39d75))
- **ToggleDetails:** add controllable behavior ([f767b50](https://github.com/instructure/instructure-ui/commit/f767b50))
- **ui-docs-plugin:** Doc comment blocks in all file types & JSdocs ([6189147](https://github.com/instructure/instructure-ui/commit/6189147))
- **ui-docs-plugin:** Integrate react-axe in dev mode ([6a29682](https://github.com/instructure/instructure-ui/commit/6a29682))
- **ui-utils:** Add jsdocs for util functions ([c6b5834](https://github.com/instructure/instructure-ui/commit/c6b5834))

### BREAKING CHANGES

- **Autocomplete,Codepen:** JS examples will need to include a call to render and will need to
  include `render: false` as front matter inside the code block
- **ui-docs-plugin:** Inverse examples will need to include `inverse: true` as front matter inside
  the code block
- **Typography,Text:** Typography component is renamed to Text, so
  imports/requires will need to be updated (it's added to the codemod
  config in ui-core)
- **Forms:** The font size of the components will have increased
- **Forms:** Font-sizes for `large` and `small`
  simple RadioInputs and Checkboxes have changed. In
  particular, Checkbox toggles have gone from using the
  same font-size for every size to changing the
  font-size based on the `size` prop (to be
  consistent with other InstUI components).
- **List:** ListItem with `unstyled` variant won't have margins.
- **build:** Imports of instructure-ui/babel/, instructure-ui/lib/themeable and
  instructure-ui/lib/themes will need to be updated
- **build:** Imports of instructure-ui and ui-docs packages will
  need to be updated to use the new packages: @instructure/ui-core, @instructure/ui-codemods, @instructure/ui-config
- **build:** Imports of ui-docs will need to be updated to: @instructure/ui-docs-plugin, @instructure/ui-docs-client
- **Autocomplete:** onInputChange prop now has a new argument providing the
  value and the event argument is now nullable
- **ToggleDetails:** expanded prop now means ToggleDetails is controlled
  and defaultExpanded prop fills the same job expanded did previously

<a name="3.4.0"></a>

# [3.4.0](https://github.com/instructure/instructure-ui/compare/v3.3.1...v3.4.0) (2017-09-12)

### Bug Fixes

- **babel:** Warn on unlocatable css imports ([c6d82fc](https://github.com/instructure/instructure-ui/commit/c6d82fc))

### Features

- **themeing:** Allow ignoring certain files ([c24e4bc](https://github.com/instructure/instructure-ui/commit/c24e4bc))

<a name="3.3.1"></a>

## [3.3.1](https://github.com/instructure/instructure-ui/compare/v3.3.0...v3.3.1) (2017-09-11)

### Bug Fixes

- **Autocomplete:** Autocomplete clears text on select ([143ce14](https://github.com/instructure/instructure-ui/commit/143ce14))
- **Container:** add missing prop-type ([946604d](https://github.com/instructure/instructure-ui/commit/946604d))
- **DateInput:** Fix multiple setState calls via input ref function ([0cce6d7](https://github.com/instructure/instructure-ui/commit/0cce6d7))
- **file-drop:** Fix dropping the same file twice ([34aa303](https://github.com/instructure/instructure-ui/commit/34aa303))
- **Modal:** Added fullScreen prop to Mask component ([7ddea42](https://github.com/instructure/instructure-ui/commit/7ddea42))
- **Modal:** disable page scrolling when fullScreen prop is set ([207780e](https://github.com/instructure/instructure-ui/commit/207780e))
- **themeable:** Allow multiple themeable components with the same name ([779fc7d](https://github.com/instructure/instructure-ui/commit/779fc7d))

<a name="3.3.0"></a>

# [3.3.0](https://github.com/instructure/instructure-ui/compare/v3.2.0...v3.3.0) (2017-09-06)

### Bug Fixes

- **Alert:** Apply a11y theme to added alerts ([531a4ad](https://github.com/instructure/instructure-ui/commit/531a4ad))
- **Autocomplete:** add index argument to formatSelectedOption ([a7dfccb](https://github.com/instructure/instructure-ui/commit/a7dfccb))
- **Autocomplete:** Add more end padding to input ([4496b4a](https://github.com/instructure/instructure-ui/commit/4496b4a))
- **Checkbox:** Add min-width rule to label ([4e35459](https://github.com/instructure/instructure-ui/commit/4e35459))
- **ContextBox,Position:** ContextBox positioning is incorrect ([0e44db0](https://github.com/instructure/instructure-ui/commit/0e44db0))
- **DateInput:** Make popover target the input element ([5ad19e7](https://github.com/instructure/instructure-ui/commit/5ad19e7))
- **DatePicker:** DatePicker UI improvements ([b0872ce](https://github.com/instructure/instructure-ui/commit/b0872ce))
- **Modal:** Max-width for Modal content ([af0607c](https://github.com/instructure/instructure-ui/commit/af0607c))
- **Modal:** positioned content breaks out of Modal ([9ef840a](https://github.com/instructure/instructure-ui/commit/9ef840a))
- **Popover:** Fix focus trapping to work with Menu ([bfcccf4](https://github.com/instructure/instructure-ui/commit/bfcccf4))
- **Popover,Dialog:** Prevent Popover jumping to bottom of screen ([426f4ff](https://github.com/instructure/instructure-ui/commit/426f4ff))
- **Position:** fix out-of-bounds calculation for Position ([9c1aa4b](https://github.com/instructure/instructure-ui/commit/9c1aa4b))

### Features

- **TabList:** Add tabRef prop to TabPanel ([77a8def](https://github.com/instructure/instructure-ui/commit/77a8def))

### Performance Improvements

- **lib/util/time.js:** Don't force all locales to be included in bundle ([6a62bd4](https://github.com/instructure/instructure-ui/commit/6a62bd4))

<a name="3.2.0"></a>

# [3.2.0](https://github.com/instructure/instructure-ui/compare/v3.1.0...v3.2.0) (2017-08-18)

### Bug Fixes

- **Autocomplete:** adds optionsMaxWidth prop to Autocomplete ([f2e0f2f](https://github.com/instructure/instructure-ui/commit/f2e0f2f))
- **button:** Firefox - Return button needs to be pressed twice ([4a6fe9f](https://github.com/instructure/instructure-ui/commit/4a6fe9f))

### Features

- **autocomplete:** Change autocomplete min-width ([03a7652](https://github.com/instructure/instructure-ui/commit/03a7652))

<a name="3.1.0"></a>

# [3.1.0](https://github.com/instructure/instructure-ui/compare/v3.0.0...v3.1.0) (2017-08-16)

### Bug Fixes

- **autocomplete:** add min-width to autocomplete ([587f074](https://github.com/instructure/instructure-ui/commit/587f074))
- **build:** release script should run the deploy ([3ed1b20](https://github.com/instructure/instructure-ui/commit/3ed1b20))
- **codepen:** use the correct format for js_external param ([9398a93](https://github.com/instructure/instructure-ui/commit/9398a93))
- **NumberInput:** Fix hidden arrows in Firefox ([727609c](https://github.com/instructure/instructure-ui/commit/727609c))
- **Position:** ContextBox arrow should be correct in example ([4406d57](https://github.com/instructure/instructure-ui/commit/4406d57))
- **warning:** use console.error instead of throwing errors ([5aa3a7b](https://github.com/instructure/instructure-ui/commit/5aa3a7b))

### Features

- **Checkbox,CheckboxGroup:** Add Readonly to Checkbox values ([a77624f](https://github.com/instructure/instructure-ui/commit/a77624f))
- **RadioInput:** Allow readonly on radioinput values ([5248571](https://github.com/instructure/instructure-ui/commit/5248571))

<a name="3.0.0"></a>

# [3.0.0](https://github.com/instructure/instructure-ui/compare/v2.5.0...v3.0.0) (2017-08-08)

This release is all about dialogs. We've made a new [Dialog](#Dialog) component, and
we're now using it in [Popover](#Popover), [Modal](#Modal), and [Tray](#Tray), so
that they all get the new functionality and have a consistent API.

We've also done a lot of property renaming to also help with that consistency and
developer UX going forward.

Note: We've included a codemod and DEV environment warnings to make it easy to update
your code to use the new property names.

### BREAKING CHANGES

To help with this upgrade, deprecated props should now emit console warnings in DEV
environments. You can also run the codemod to update properties for this release:

```sh
yarn add @instructure/ui-codemods
```

```sh
jscodeshift -t node_modules/@instructure/ui-codemods/lib/updatePropNames.js <path> --config=node_modules/@instructure/ui-core/config/propNames.config.json
```

- **DateInput:** add `value` prop for controlled component support
- **build:** `themeable.config.js` now required for babel preset.
- **DateInput, DatePicker:** callback function arguments changed
- **Table:** deprecated props
- **Portal, Position, Overlay, Modal, Tray, Popover:** deprecated props
- **Menu, PopoverMenu:** deprecated props
- **Tag:** deprecated props
- **Alert:** deprecated props

### Bug Fixes

- **Autocomplete:** Add z-index to avoid overlap ([a588081](https://github.com/instructure/instructure-ui/commit/a588081))
- **Autocomplete:** fix duplicate calls to onChange ([856e67b](https://github.com/instructure/instructure-ui/commit/856e67b))
- **Autocomplete:** Make options menu expand to full input width ([d6dfe87](https://github.com/instructure/instructure-ui/commit/d6dfe87))
- **Autocomplete:** Resolve VO issues ([e4d4592](https://github.com/instructure/instructure-ui/commit/e4d4592))
- **Autocomplete:** The options list should close on select ([d672875](https://github.com/instructure/instructure-ui/commit/d672875))
- **Autocomplete:** visual bug fixes ([27d858b](https://github.com/instructure/instructure-ui/commit/27d858b))
- **Billboard, omitProp 'padding':** don't allow padding to get styled ([c860d3f](https://github.com/instructure/instructure-ui/commit/c860d3f))
- **build:** Remove `.js` from theme import in template ([cad860e](https://github.com/instructure/instructure-ui/commit/cad860e))
- **Button:** buttonRef prop should return the button DOM element ([29474cd](https://github.com/instructure/instructure-ui/commit/29474cd))
- **Button:** Fix :focus ring issue in Firefox ([430cf7d](https://github.com/instructure/instructure-ui/commit/430cf7d))
- **Button, fluidWidth:** replace min-height with top/bottom padding ([30b3073](https://github.com/instructure/instructure-ui/commit/30b3073))
- **Button, omitProp 'padding':** padding was getting passed down through ([c005760](https://github.com/instructure/instructure-ui/commit/c005760))
- **Checkbox:** Make size prop work for CheckboxFacade ([53523f8](https://github.com/instructure/instructure-ui/commit/53523f8))
- **DateInput:** Make props align better with controlled and uncontrolled ([712447d](https://github.com/instructure/instructure-ui/commit/712447d))
- **DateInput, DatePicker:** Provide the event object in the callback arg ([37cd10a](https://github.com/instructure/instructure-ui/commit/37cd10a))
- **DatePicker:** Fix :focus states in Edge 15 ([ae620ef](https://github.com/instructure/instructure-ui/commit/ae620ef))
- **dependencies:** Resolve empty styles in transpiled JS ([f79c154](https://github.com/instructure/instructure-ui/commit/f79c154))
- **Dialog:** Render Dialog example outside aria-hidden region ([3b614db](https://github.com/instructure/instructure-ui/commit/3b614db))
- **docs:** Upgrade ui-docs to prevent theme conflicts ([db23135](https://github.com/instructure/instructure-ui/commit/db23135))
- **ensureSingleChild:** Fix ensureSingleChild when child is a string ([f796ca0](https://github.com/instructure/instructure-ui/commit/f796ca0))
- **FormFieldGroup:** Handle null children ([9b9019a](https://github.com/instructure/instructure-ui/commit/9b9019a))
- **generate:** Fix the component template for the generate task ([76d86f0](https://github.com/instructure/instructure-ui/commit/76d86f0))
- **Heading, omitProp 'padding':** don't allow padding to get passed down ([c4dbd6b](https://github.com/instructure/instructure-ui/commit/c4dbd6b))
- **Image, omitProps 'padding':** keep padding from getting passed down f ([df1c2ec](https://github.com/instructure/instructure-ui/commit/df1c2ec))
- **lint:** lint errors shouldn't fail build when debugging ([5e21641](https://github.com/instructure/instructure-ui/commit/5e21641))
- **List, omitProps 'padding':** don't let padding get styled ([9fa375e](https://github.com/instructure/instructure-ui/commit/9fa375e))
- **Media, omitProps 'padding':** padding should not be a media property ([d966622](https://github.com/instructure/instructure-ui/commit/d966622))
- **Menu,PopoverMenu:** Menu flyouts should close onSelect ([b8185a0](https://github.com/instructure/instructure-ui/commit/b8185a0))
- **Pagination, omitProps 'margin/padding':** don't allow margin/padding ([3d27f40](https://github.com/instructure/instructure-ui/commit/3d27f40))
- **Pill, omitProps 'padding':** dont' allow padding to be added as a pro ([7b8502f](https://github.com/instructure/instructure-ui/commit/7b8502f))
- **PopoverMenu,MenuItemFlyout:** Only close flyout on ESC press ([a767adf](https://github.com/instructure/instructure-ui/commit/a767adf))
- **Position:** Fix mountNode prop in rel position container ([c59c339](https://github.com/instructure/instructure-ui/commit/c59c339))
- **Position:** Negative offsets should work ([7c35e8f](https://github.com/instructure/instructure-ui/commit/7c35e8f))
- **Table:** Deprecate the tableData prop ([5c9a5f6](https://github.com/instructure/instructure-ui/commit/5c9a5f6))
- **Table, omitProps 'padding':** don't allow padding to be added as a pr ([67c79e3](https://github.com/instructure/instructure-ui/commit/67c79e3))
- **Tag, omitProps 'padding':** don't allow padding to be added as a prop ([fcb251c](https://github.com/instructure/instructure-ui/commit/fcb251c))
- **themeable:** Fix transform-themable with empty css files ([1d05744](https://github.com/instructure/instructure-ui/commit/1d05744))
- **themeable:** Polyfill Edge 15 until improved css var support ([427a13c](https://github.com/instructure/instructure-ui/commit/427a13c))
- **TreeBrowser:** Component broken in Edge v15 ([f6aab8b](https://github.com/instructure/instructure-ui/commit/f6aab8b))

### Features

- **Autocomplete:** Adds editable prop to Autocomplete ([15c70d1](https://github.com/instructure/instructure-ui/commit/15c70d1))
- **Button, Link:** Add inverse link variants to Link and Button ([8b499c5](https://github.com/instructure/instructure-ui/commit/8b499c5))
- **CloseButton:** Add a CloseButton component ([7475cb2](https://github.com/instructure/instructure-ui/commit/7475cb2))
- **DateInput:** Return raw input for onDateChange ([9195dd1](https://github.com/instructure/instructure-ui/commit/9195dd1))
- **Dialog:** Add a Dialog component ([0c197e1](https://github.com/instructure/instructure-ui/commit/0c197e1))
- **Mask:** Add a Mask component ([5db3aa2](https://github.com/instructure/instructure-ui/commit/5db3aa2))
- **Popover:** Add Dialog component behavior to Popover ([fcb2b89](https://github.com/instructure/instructure-ui/commit/fcb2b89))
- **Position:** Add 'stretch', 'constrain' and 'over' props ([6930e83](https://github.com/instructure/instructure-ui/commit/6930e83))
- **Spinner:** Add x-small Spinner size ([14e49e6](https://github.com/instructure/instructure-ui/commit/14e49e6))
- **SVGIcon,InlineSVG:** Add icon components and new rotation prop ([02cd4b5](https://github.com/instructure/instructure-ui/commit/02cd4b5))
- **Modal:** Add Dialog component behavior to Modal ([8597802](https://github.com/instructure/instructure-ui/commit/8597802))
- **Tray:** Add Dialog component behavior to Tray ([ffd181e](https://github.com/instructure/instructure-ui/commit/ffd181e))

<a name="2.5.0"></a>

# [2.5.0](https://github.com/instructure/instructure-ui/compare/v2.4.0...v2.5.0) (2017-06-20)

### Bug Fixes

- **Autocomplete:** Fix apply a11y theme ([0e6c3b3](https://github.com/instructure/instructure-ui/commit/0e6c3b3))
- **Autocomplete:** fix typo in autocomplete prop documentation ([ce8bad9](https://github.com/instructure/instructure-ui/commit/ce8bad9))
- **Container:** Fix Transition issue with children visibility ([0ec49ab](https://github.com/instructure/instructure-ui/commit/0ec49ab))
- **DateInput:** Preserve time portion of provided value across date selections ([bb46db1](https://github.com/instructure/instructure-ui/commit/bb46db1))
- **NumberInput:** make arrows work for large numbers ([99b7d70](https://github.com/instructure/instructure-ui/commit/99b7d70))
- **TextInput:** Handle icons better ([5fc761b](https://github.com/instructure/instructure-ui/commit/5fc761b))
- **themeable:** CSS variables polyfill shouldn't scope root selectors ([1545a8f](https://github.com/instructure/instructure-ui/commit/1545a8f))
- **themeable:** IE11 CSS variable polyfill should scope media queries ([1f54b62](https://github.com/instructure/instructure-ui/commit/1f54b62))

### Features

- **Alert:** Add live region support and transitions ([948b00d](https://github.com/instructure/instructure-ui/commit/948b00d))
- **Autocomplete:** Added 'multiple' feature ([520a005](https://github.com/instructure/instructure-ui/commit/520a005))
- **Badge:** Support rtl text ([3bce62f](https://github.com/instructure/instructure-ui/commit/3bce62f))
- **Breadcrumb:** Support rtl text for breadcrumb ([46c9ecf](https://github.com/instructure/instructure-ui/commit/46c9ecf))
- **Button:** Support rtl text ([6f64f5d](https://github.com/instructure/instructure-ui/commit/6f64f5d))
- **Checkbox:** Support rtl text in checkbox ([9038f86](https://github.com/instructure/instructure-ui/commit/9038f86))
- **ContextBox:** Support rtl text in ContextBox ([7747bef](https://github.com/instructure/instructure-ui/commit/7747bef))
- **Docs, ColorSwatch:** Support rtl text in ColorSwatch ([9237071](https://github.com/instructure/instructure-ui/commit/9237071))
- **FormField, TextInput:** Support rtl text for text inputs ([c7dbdc2](https://github.com/instructure/instructure-ui/commit/c7dbdc2))
- **FormFieldLayout:** Support rtl text ([2445616](https://github.com/instructure/instructure-ui/commit/2445616))
- **GridCol:** Support rtl text in GridCol ([cb687fd](https://github.com/instructure/instructure-ui/commit/cb687fd))
- **List:** Support rtl text in List ([56b6541](https://github.com/instructure/instructure-ui/commit/56b6541))
- **Menu:** Support rtl text in Menu ([08b5253](https://github.com/instructure/instructure-ui/commit/08b5253))
- **Modal:** Support rtl text in modal ([1d340b5](https://github.com/instructure/instructure-ui/commit/1d340b5))
- **NumberInput:** Support rtl text in NumberInput ([9a9a878](https://github.com/instructure/instructure-ui/commit/9a9a878))
- **RadioInput:** Support rtl text in RadioInput ([377b150](https://github.com/instructure/instructure-ui/commit/377b150))
- **Select:** Support rtl text in Select ([7caf740](https://github.com/instructure/instructure-ui/commit/7caf740))
- **Tag:** Support rtl text in Tag ([ef69bfb](https://github.com/instructure/instructure-ui/commit/ef69bfb))
- **TextArea:** Support rtl text in TextArea ([cd58264](https://github.com/instructure/instructure-ui/commit/cd58264))
- **ToggleDetails:** Support rtl in ToggleDetails ([5e8aad4](https://github.com/instructure/instructure-ui/commit/5e8aad4))
- **TreeBrowser:** a11y navigation improvements ([272c873](https://github.com/instructure/instructure-ui/commit/272c873))
- **TreeBrowser:** Support rtl text in TreeBrowser ([9e6b91e](https://github.com/instructure/instructure-ui/commit/9e6b91e))

<a name="2.4.0"></a>

# [2.4.0](https://github.com/instructure/instructure-ui/compare/v2.3.0...v2.4.0) (2017-06-12)

### Bug Fixes

- **Badge:** Make it possible to add SR-only text ([4e3737f](https://github.com/instructure/instructure-ui/commit/4e3737f))
- **DateInput:** add messages to date input ([1d18fc0](https://github.com/instructure/instructure-ui/commit/1d18fc0))
- **themeable:** Remove all 'ms-' hacks for non-IE browsers ([0a491de](https://github.com/instructure/instructure-ui/commit/0a491de))
- **NumberInput:** NumberInput bug fix ([ea84a69](https://github.com/instructure/instructure-ui/commit/ea84a69))
- **themeable:** default theme overrides aren't applied to components ([e58424f](https://github.com/instructure/instructure-ui/commit/e58424f))

### Features

- **Grid:** Forward aria/role attributes on <Grid> components ([04adaea](https://github.com/instructure/instructure-ui/commit/04adaea))
- **TabList:** Deprecate 'accordion' variant ([30c7a2d](https://github.com/instructure/instructure-ui/commit/30c7a2d))
- **TimeInput:** Add a TimeInput component ([78201d3](https://github.com/instructure/instructure-ui/commit/78201d3))
- **TreeBrowser:** Add expanded/defaultExpanded props ([52a6ce1](https://github.com/instructure/instructure-ui/commit/52a6ce1))
- **Breadcrumb:** Add onClick to BreadcrumbLink ([c6af374](https://github.com/instructure/instructure-ui/commit/c6af374))

<a name="2.3.0"></a>

# [2.3.0](https://github.com/instructure/instructure-ui/compare/v2.2.2...v2.3.0) (2017-06-01)

### Bug Fixes

- **Badge:** Make SVGs display block ([102207f](https://github.com/instructure/instructure-ui/commit/102207f))
- **codepen examples:** fix codepen example links ([866af50](https://github.com/instructure/instructure-ui/commit/866af50))
- **DatePicker:** Make DatePicker KO navigable with arrow keys ([059f947](https://github.com/instructure/instructure-ui/commit/059f947))
- **npm:** Update shrinkwrap file so app compiles again ([0ec660a](https://github.com/instructure/instructure-ui/commit/0ec660a))
- **NumberInput:** Fixed-width input layout bug ([fa6d9b8](https://github.com/instructure/instructure-ui/commit/fa6d9b8))
- **NumberInput:** support i18n ([4e814f5](https://github.com/instructure/instructure-ui/commit/4e814f5))

### Features

- **Autocomplete:** Add an Autocomplete component ([d3e0d47](https://github.com/instructure/instructure-ui/commit/d3e0d47))
- **List:** Add List component ([1ee5c4d](https://github.com/instructure/instructure-ui/commit/1ee5c4d))

<a name="2.2.2"></a>

## [2.2.2](https://github.com/instructure/instructure-ui/compare/v2.2.1...v2.2.2) (2017-05-22)

### Bug Fixes

- **MenuItem:** Prevent onSelect from firing twice ([2c67d78](https://github.com/instructure/instructure-ui/commit/2c67d78))

<a name="2.2.1"></a>

## [2.2.1](https://github.com/instructure/instructure-ui/compare/v2.2.0...v2.2.1) (2017-05-22)

### Bug Fixes

- **Menu:** Prevent UL margin style overrides ([4522876](https://github.com/instructure/instructure-ui/commit/4522876))
- **ToolTip:** Events on the child of Trigger not being passed through to Popover ([69513b8](https://github.com/instructure/instructure-ui/commit/69513b8))
- **MenuItem,Button:** should support target="\_blank" ([99b8544](https://github.com/instructure/instructure-ui/commit/99b8544))
- **MenuItemFlyout:** Expose ref for flyout content ([5e0622e](https://github.com/instructure/instructure-ui/commit/5e0622e))

<a name="2.2.0"></a>

## [2.2.0](https://github.com/instructure/instructure-ui/compare/v2.1.1...v2.2.0) (2017-05-22)

### Bug Fixes

- **Position:** Fix flaky Position test for Firefox ([8ea348d](https://github.com/instructure/instructure-ui/commit/8ea348d))
- **Button:** Fix heights and add icon support ([faef77a](https://github.com/instructure/instructure-ui/commit/faef77a))
- **ToggleDetails:** Fix button type and fluidWidth ([e1da0f4](https://github.com/instructure/instructure-ui/commit/e1da0f4))
- **Modal:** Fix fullscreen in safari cutting off content ([d1d4ec7](https://github.com/instructure/instructure-ui/commit/d1d4ec7))
- **containerQuery:** Should support ems ([4a09603](https://github.com/instructure/instructure-ui/commit/4a09603))
- **sinon-chai:** Use the correct sinon-chai testing assertions ([453a211](https://github.com/instructure/instructure-ui/commit/453a211))

### Features

- **ApplyTheme:** Make accessible themes 'immutable' ([144a4fb](https://github.com/instructure/instructure-ui/commit/144a4fb))
- **MenuFlyout:** Add MenuFlyout option to Menu ([6ea4f71](https://github.com/instructure/instructure-ui/commit/6ea4f71))

<a name="2.1.1"></a>

## [2.1.1](https://github.com/instructure/instructure-ui/compare/v2.1.0...v2.1.1) (2017-05-18)

### Bug Fixes

- **build:** Fix compilation errors from missing moment-timezone ([501184d](https://github.com/instructure/instructure-ui/commit/501184d))

<a name="2.1.0"></a>

# [2.1.0](https://github.com/instructure/instructure-ui/compare/v2.0.0...v2.1.0) (2017-05-17)

### Bug Fixes

- **Button:** fix display getting overridden ([0409876](https://github.com/instructure/instructure-ui/commit/0409876))
- **requestAnimationFrame:** requestAnimationFrame util should fall back ([2352de8](https://github.com/instructure/instructure-ui/commit/2352de8))
- **Tag, Pagination:** fix margin-padding values ([e34eb57](https://github.com/instructure/instructure-ui/commit/e34eb57))
- **text-align:** Fix text alignment CSS rules for IE ([1c22ba6](https://github.com/instructure/instructure-ui/commit/1c22ba6))
- **themes:** Provide a way to import accessible themes separately ([7e556df](https://github.com/instructure/instructure-ui/commit/7e556df))
- **Transition:** Fix Transition component example ([c197cba](https://github.com/instructure/instructure-ui/commit/c197cba))

### Features

- **Badge:** Add Badge component ([3247199](https://github.com/instructure/instructure-ui/commit/3247199))
- **Button:** add a danger variant ([7d741aa](https://github.com/instructure/instructure-ui/commit/7d741aa))
- **DatePicker, DateInput:** Add DatePicker and DateInput components ([457dea7](https://github.com/instructure/instructure-ui/commit/457dea7))
- **NumberInput:** Add a NumberInput component ([c37afdc](https://github.com/instructure/instructure-ui/commit/c37afdc))

<a name="2.0.0"></a>

# [2.0.0](https://github.com/instructure/instructure-ui/compare/v1.4.1...v2.0.0) (2017-05-10)

### Bug Fixes

- **release:** Fix typo in release script ([9850924](https://github.com/instructure/instructure-ui/commit/9850924))
- **Spinner:** Fix illegal rule console warning ([d0820aa](https://github.com/instructure/instructure-ui/commit/d0820aa))
- **TabList:** Fix TabList transitions and unmountOnExit ([fcc5961](https://github.com/instructure/instructure-ui/commit/fcc5961))
- **themes:** Don't depend on import order for themeable components, themes ([10396c8](https://github.com/instructure/instructure-ui/commit/10396c8))

### Dependencies and Build

- Remove UMD output and build scripts ([5d5eb65](https://github.com/instructure/instructure-ui/commit/5d5eb65))
- Upgrade React to the latest version ([c422be7](https://github.com/instructure/instructure-ui/commit/c422be7))

### API Changes

- **Avatar:** Update the Avatar component API ([56f4eab](https://github.com/instructure/instructure-ui/commit/56f4eab))
- **Container:** Make `size` property values consistent ([f75465a](https://github.com/instructure/instructure-ui/commit/f75465a))
- **isBlock:** Replace `isBlock` props with `inline` ([c1dcdff](https://github.com/instructure/instructure-ui/commit/c1dcdff))
- **ToggleDetails:** Update the ToggleDetails component API ([c8348b5](https://github.com/instructure/instructure-ui/commit/c8348b5))
- **RTL support:** Replace left/right with start/end ([c855ea1](https://github.com/instructure/instructure-ui/commit/c855ea1))
- **Grid:** Change breakpoints and media to use 'small', 'medium', etc. ([15f592a](https://github.com/instructure/instructure-ui/commit/15f592a))

### Features

- **Button:** Wrap text when 'isBlock' prop is set ([d8af67d](https://github.com/instructure/instructure-ui/commit/d8af67d))
- **Pagination:** Add Pagination ([76ee0f0](https://github.com/instructure/instructure-ui/commit/76ee0f0))
- **Pill:** Add Pill component ([354795c](https://github.com/instructure/instructure-ui/commit/354795c))
- **RTL support:** Rename placement props ([099795a](https://github.com/instructure/instructure-ui/commit/099795a))
- **Tag:** Add Tag component ([6a0d804](https://github.com/instructure/instructure-ui/commit/6a0d804))

### Upgrade Guide

We've introduced some improved API and component changes that are not backwards compatible with previous versions. To help with migrating to 2.x, here is a list of specific areas where changes will be required in order to upgrade.

#### Build and Dependency Updates

- **React 0.14.9 or 15.4.0 is required**
- **UMD format is no longer supported**
- **instructure-icons is now a peer dependency**

#### Themes no longer dependent on import order

You no longer have to call `setDefaultTheme`. If you import just the theme that you need, it will be used as the default (otherwise the first theme imported will be the default).

If you'd like to add user overrides or toggle on the a11y version, you can do:

```
import { canvas } from 'instructure-ui/lib/themes'
canvas.use({ accessible: true, overrides: brandVariables })
```

Note: this also splits out the a11y themes from the base so they can be
imported separately.

BREAKING CHANGES:

- removed `ApplyTheme.setDefaultTheme`
- removed `themeable.setDefaultTheme`
- trigger a11y themes using `theme.use()`

#### `size` prop changes

Camel-case values in `Container` component `margin` and `padding` props will need to be changed to use dashes (for consistency with other components).

<table>
  <caption> Alert, Avatar, Billboard, Breadcrumb, Button, ContextBox, Heading, Image, Link, Media, Modal, Pill, Progress, Rating, Spinner, Table, TabList</caption>
  <thead><tr><th>1.x</th><th>2.x</th></tr></thead>
  <tbody>
    <tr>
    <td>
    'xxxSmall'
    </td>
    <td>
    'xxx-small'
    </td>
    </tr>
    <tr>
    <td>
    'xxSmall'
    </td>
    <td>
    'xx-small'
    </td>
    </tr>
    <tr>
      <td>
      'xSmall'
      </td>
      <td>
      'x-small'
      </td>
    </tr>
    <tr>
      <td>
      'xLarge'
      </td>
      <td>
      'x-large'
      </td>
    </tr>
    <tr>
      <td>
      'xxLarge'
      </td>
      <td>
      'xx-large'
      </td>
    </tr>
  </tbody>
</table>

#### Position API Changes

Components previously using `left` and `right` for positioning have been updated to use `start` and `end` to better support RTL languages in the future.

<table>
  <caption>ContextBox, Popover, Position, Tooltip, Tray </caption>
  <thead><tr><th>1.x</th><th>2.x</th></tr></thead>
  <tbody>
    <tr>
    <td>
    placement: 'left'
    </td>
    <td>
    placement: 'start'
    </td>
    </tr>
    <tr>
    <td>
    placement: 'right'
    </td>
    <td>
    placement: 'end'
    </td>
    </tr>
    <tr>
    <td>
    placement: 'middle'
    </td>
    <td>
    placement: 'center'
    </td>
    </tr>
  </tbody>
</table>

#### `textAlign` prop Values

Components previously using `left` and `right` for the `textAlign` prop have been updated to use `start` and `end` to better support RTL languages in the future.

<table>
  <caption>Container, ContextBox, FormField, Grid, GridCol, TabList</caption>
  <thead><tr><th>1.x</th><th>2.x</th></tr></thead>
  <tbody>
    <tr>
      <td>
      textAlign: 'left'
      </td>
      <td>
      textAlign: 'start'
      </td>
    </tr>
    <tr>
      <td>
      textAlign: 'right'
      </td>
      <td>
      textAlign: 'end'
      </td>
    </tr>
  </tbody>
</table>

#### `isBlock` prop

Changes for consistency in component APIs

<table>
  <caption>Button, ToggleDetails</caption>
  <thead><tr><th>1.x</th><th>2.x</th></tr></thead>
  <tbody>
    <tr>
      <td>
      isBlock: true
      </td>
      <td>
      fluidWidth: true
      </td>
    </tr>
  </tbody>
</table>
<br/>
<table>
  <caption>Checkbox, FormField, FormFieldLayout, Image, RadioInput, Select, TextArea, TextInput, Tooltip, Transition </caption>
  <thead><tr><th>1.x</th><th>2.x</th></tr></thead>
  <tbody>
    <tr>
      <td>
      isBlock: true
      </td>
      <td>
      inline: false
      </td>
    </tr>
  </tbody>
</table>

#### `Avatar` Component API

Changes to our `<Avatar>` component:

<table>
  <thead><tr><th>1.x</th><th>2.x</th></tr></thead>
  <tbody>
    <tr>
      <td>
      userName: 'Sarah'
      </td>
      <td>
      name: 'Sarah'
      </td>
    </tr>
    <tr>
      <td>
      userImgUrl: {avatarSquare}
      </td>
      <td>
      src: {avatarSquare}
      </td>
    </tr>
  </tbody>
</table>

#### `ToggleDetails` Component API

Changes to our `<ToggleDetails>` component:

<table>
  <thead><tr><th>1.x</th><th>2.x</th></tr></thead>
  <tbody>
    <tr>
      <td>
      isExpanded
      </td>
      <td>
      expanded
      </td>
    </tr>
  </tbody>
</table>

#### Breakpoint (`startAt`) props

Changes to the allowed values for the `<Grid>` component props, with extension into a few components where we allow breakpoints to be set:

<table>
  <caption>Grid, FormFieldGroup, RadioInputGroup, CheckboxGroup</caption>
  <thead><tr><th>1.x</th><th>2.x</th></tr></thead>
  <tbody>
    <tr>
      <td>phone</td>
      <td>small</td>
    </tr>
    <tr>
      <td>tablet</td>
      <td>medium</td>
    </tr>
    <tr>
      <td>desktop</td>
      <td>large</td>
    </tr>
    <tr>
      <td>wide</td>
      <td>x-large</td>
    </tr>
  </tbody>
</table>

<a name="1.4.1"></a>

## [1.4.1](https://github.com/instructure/instructure-ui/compare/v1.4.0...v1.4.1) (2017-04-14)

<a name="1.4.0"></a>

## [1.4.0](https://github.com/instructure/instructure-ui/compare/v1.3.4...v1.4.0) (2017-04-13)

### Bug Fixes

- **MenuItemGroup:** Prevent errors when MenuItemGroup has only one child ([ec333dc](https://github.com/instructure/instructure-ui/commit/ec333dc))
- **Modal:** Focus 'Open Modal' button in Modal example when Modal closes ([ee02811](https://github.com/instructure/instructure-ui/commit/ee02811))
- **Position:** Improve Position component (for PopoverMenu bug fixes) ([3e06a07](https://github.com/instructure/instructure-ui/commit/3e06a07))
- **Rating:** Rating component should be themeable when `animateFill` pro ([ce17907](https://github.com/instructure/instructure-ui/commit/ce17907))

### Performance Improvements

- **themeable:** Update shouldComponentUpdate for themeable components ([3ad419b](https://github.com/instructure/instructure-ui/commit/3ad419b))

## 1.3.4

#### Upgrade instructure-icons @jstern

#### Prevent normalize.css from breaking the [Button](#Button) component styles @mphillips

## 1.3.3

#### Add option to show on click to [Tooltip](#Tooltip) @sburnett

## 1.3.2

#### Update onItemClick and onCollectionClick return values for [TreeBrowser](#TreeBrowser) @mberns

## 1.3.1

#### Remove PureComponent so that the library still works with React 0.14.8 @jstern

#### Call [PopoverMenu](#PopoverMenu) event handlers after setState @jstern

## 1.3.0

#### Resolve [PopoverMenu](#PopoverMenu) focus issues @sejensen

#### Only render [Portal](#Portal)/[Position](#Position) if it has content @mzabriskie

#### Add a [FileDrop](#FileDrop) component @ddoumecq

#### Update [modern](#modern) theme for [TextArea](#TextArea) @phiett

#### Add a [Container](#Container) component @chart

#### Fix console warnings for invalid placeholder [TextArea](#TextArea) and [TextInput](#TextInput) styles @jsimon

#### Fix IE11 bug with thin line on triangle for [ContextBox](#ContextBox) @phiett

#### Enter key should trigger onClick on [Button](#Button) component for any element @jstern

#### Add ellipsis prop to [Heading](#Heading) component @chart

#### [MetricsList](#MetricsList) read item label before value @cprescott

#### Fix URL to docs in the docs @eschiebel

## 1.2.0

#### Add a `trackPosition` prop to [Position](#Position) component so that positioning can be toggled on/off @mzabriskie

#### Fix [Grid](#Grid) component/remove extra padding on left and right sides @jstern

## 1.1.0

#### Fix "illegal rule inserted" console warning @jstern

#### Allow [Billboard](#Billboard) to render as a link if `href` prop is provided @chart

#### Update look of [Avatar](#Avatar) @phiett

#### Update [modern](#modern) theme for [RadioInput](#RadioInput) @phiett

#### Update [modern](#modern) theme for [Checkbox](#Checkbox) @phiett

#### Prevent referencing window at require time @bburgoyne

#### Allow [Billboard](#Billboard) to pass props to button @chart

#### Allow `inverse` close button on [Tray](#Tray) @ctennety

## 1.0.2

#### Do not focus [PopoverMenu](#PopoverMenu) trigger on mount @sejensen

#### Fix `shouldCloseOnOverlayClick` prop for [Modal](#Modal) @mzabriskie

#### Fix [PopoverMenu](#PopoverMenu) bug when MenuItems are triggered by ENTER key press @jstern

## 1.0.1

#### Fix focus state for RadioInput and Checkbox @chart

#### Fix message display for form components at `wide` screens @jstern

#### Fix focus for [Menu](#Menu) component when first item is a MenuItemGroup @sejensen

#### Add [Billboard](#Billboard) component @chart

## 1.0.0

#### Add a [Position](#Position) component @mzabriskie

#### Update design of [Checkbox](#Checkbox) `toggle` variant @chart

#### Fix [Grid](#Grid) component bugs with `spaceAround` and `spaceBetween` props in IE 11 @jstern

#### Update design of [RadioInputGroup](#RadioInputGroup) `toggle` variant @chart

#### Minimize CSS in JS bundles @jbelser

#### Update `modern` design of [Checkbox](#Checkbox) component @andy

#### Fix CSS specificity bug with [Link](#Link) component @jstern

#### Optimize style injection (using [glamor](https://github.com/threepointone/glamor) Stylesheet) @jstern

#### Import themes individually and change the API for setting the default theme. See [theme](#canvas) documentation. @jstern

#### Make box-shadows consistent (use [theme config](#canvas) for shadows) @phiett

#### Add `x-small` size to [Progress](#Progress) component @brinaca

#### Fix margins on [FormFieldLabel](#FormFieldLabel) when there is no visible label text @chart

#### Fix [Link](#Link) component in `a11y` theme @chart

#### Fix alignment of close button on [Alert](#Alert) component @phiett

#### Add `as` prop to (note `tag` and `tagName` props have been removed): @sejensen

- [AccessibleContent](#AccessibleContent)
- [Button](#Button)
- [Heading](#Heading)
- [Link](#Link)
- [PresentationContent](#PresentationContent)
- [ScreenReaderContent](#ScreenReaderContent)
- [Typography](#Typography)

#### Update [Button](#Button) for `modern` theme @andy

#### Add a `buttonRef` prop to the [Button](#Button) component @jstern

#### Replace `style` prop on [Typography](#Typography) component with `fontStyle` @jstern

#### Fix spacing on [Button](#Button) component so that it lines up with TextInput @chart

#### Fix [Progress](#Progress) component VoiceOver bug @cpalmer

#### Add focus management to [Tray](#Tray) @jcorrigan

#### Make onChange handler for [TextArea](#TextArea) consistent with TextInput @jstern

#### Add an index file to the components directory in /dist build output @jstern

#### Add focus ring to a11y theme of [Link](#Link) and [Button](#Button) components

#### Add new color `mediumLighter` to canvas and modern themes @phiett

#### Updates to [Menu](#Menu) component `checkbox` and `radio` item types @sejensen

#### Prevent errors when [Transition](#Transition) steps occur after the component unmounts @jstern

#### Ensure modern theme for [Checkbox](#Checkbox) and [RadioInput](#RadioInput) are brand vs gray @phiett

#### [ToggleDetails](#ToggleDetails) customization updates

#### Change [Checkbox](#Checkbox) and [RadioInput](#RadioInput) to dark vs brand @phiett

#### Fix bugs in [CheckboxGroup](#CheckboxGroup) and [MenuItemGroup](#MenuItemGroup) due to unintentional state modification @sejensen

#### [Popover](#Popover) refactor and bug fixes @mzabriskie

#### Fix [TextArea](#TextArea) ENTER key support and horizontal scroll on FF and IE 11 @jstern

#### Remove three Item limit from [MetricList](#MetricList) @cprescott

#### Replace [Checkbox](#Checkbox) & [RadioInput](#RadioInput) focus states with single outline state @phiett

#### Add `inline` layout option to [FormField](#FormField)/all form components

#### Add `column` layout optino to [FormFieldGroup](#FormFieldGroup), [RadioInputGroup](#RadioInputGroup), [CheckboxGroup](#CheckboxGroup) @jstern, @chart

#### Add `offset` prop to [GridCol](#GridCol) @jstern

#### Make [Tooltip](#Tooltip) default to `default` variant @jstern

#### Remove zIndex props and add them to component themes @jstern

#### Allow any trigger content for [Tooltip](#Tooltip) @jstern

#### Prevent overwriting existing keys @jstern

#### Update color theme variable names @phiett

#### Fix screen reader bugs in [Progress](#Progress) component @phiett

#### Add [TreeBrowser](#TreeBrowser) component @mberns

## 0.18.2

#### Remove babel-polyfill peer dependency (required polyfills are listed in build.config.js)

#### [Modal](#Modal) should focus close button by default

#### Add generateTheme and setDefaultTheme to both [ApplyTheme](#ApplyTheme) and themeable

#### Add Modern theme

#### Fix [Modal](#Modal) scrolling issues in FF

## 0.18.1

#### Upgrade to Webpack 2/bundle size improvements

#### Adjust [Heading](#Heading) component styles

#### Add LatoWeb to font-family to match Canvas

#### [Tray](#Tray) component updates

#### Reduce height of [Progress](#Progress) bars

## 0.18.0

#### Document theme variables for each component

#### Fix [Select](#Select) component disabled state

#### Fix [Button](#Button) component 'circle' variant in Firefox

#### [Heading](#Heading) component updates

#### Fix [Progress](#Progress)

#### Make codepens work for non jsx examples (e.g. [Modal](#Modal))

#### Updates to [Tray](#Tray) component

#### Update [TextArea](#TextArea) and [Select](#Select) focus styles

#### Add a [Canvas theme](#canvas)

#### Add an [accessible theme](#a11y)

#### Add [Media](#Media) component

## 0.17.3

#### Replace CSSTransitionGroup with [Transition](#Transition) component

#### Fix [RadioInput](#RadioInput) and [Checkbox](#Checkbox) focus issues in Safari

#### Remove `max-width` prop from the [Alert](#Alert) component

#### Fix [Transition](#Transition) component `unmountOnExit` prop

#### Add [AccessibleContent](#AccessibleContent) and [PresentationContent](#PresentationContent)

#### Upgrade instructure-icons

#### Update [Progress](#Progress) component styles

#### Add [Tray](#Tray) component

#### Update [Transition](#Transition) component styles

#### Prevent errors in the [Avatar](#Avatar) component when `userName` prop is not provided

## 0.17.2

#### Add option to [RangeInput](#RangeInput) to turn off value display

#### Fix [Popover](#Popover) bug, uninitialized state when show prop is set

#### Define all variables in theme.js for each component

#### Add a dismissable decorator

## 0.17.1

#### Added support for linux in the generate script

See [commit](https://github.com/instructure/instructure-ui/commit/a9153714552d1dd0f300421de320264140ac4912) for details.

#### Fix for [Table](#Table) component to prevent nested tables from inheriting hover or stripe styling

#### Fix for [TabList](#TabList) component `minimal`, `simple` variants so they no longer break in a flexed container

#### Fix [Modal](#Modal) component footer behavior when there is minimal body content

#### Add `zIndex` prop to the [Overlay](#Overlay) and [Popover](#Popover) components

#### Add custom chai assertion to verify that a dom element exists for testing

See [commit](https://github.com/instructure/instructure-ui/commit/fcea0dd9ee67d172a5eb04e348fb5caf0b93472d) for details.

## 0.17.0

#### Add a [Breadcrumb](#Breadcrumb) component

#### Prevent Bootstrap or other CSS from interfering with component styles

## 0.16.0

#### Add a [Modal](#Modal) component

#### Add a [Overlay](#Overlay) component

#### Add a [Portal](#Portal) component

#### Add focused getter to the [Button](#Button) component

#### Fix focus state for [Checkbox](#Checkbox) `toggle` variant

#### Fix [RangeInput](#RangeInput) passing `props` to it's input

#### Update to [Button](#Button) design

#### Update to [Select](#Select) don't set disabled attribute

#### Update [Transition](#Transition) component

## 0.15.0

#### Add a [ToggleDetails](#ToggleDetails) component

#### Add a [Table](#Table) component

#### Don't trigger [PopoverMenu](#PopoverMenu) on focus by default

#### Move [Checkbox](#Checkbox) label to the right of the toggle

#### Add a [TextArea](#TextArea) component

#### Updates to font sizes (see [Typography](#Typography) component)

## 0.14.4

#### Add getDisplayName util and use it to determine component type

## 0.14.3

#### Remove umd named define from webpack config

## 0.14.2

#### Add missing type attribute on button elements rendered by the Button component

## 0.14.1

#### Don't bundle babel-polyfill with the library

This prevents the "only one instance of babel-polyfill is allowed" errors.

## 0.14.0

### Breaking changes (code changes required to upgrade)

#### Inject Component CSS into the document

Components will now inject the required CSS into the document when they are mounted, so importing the CSS dependencies is no longer required. The usage documentation for each component has been updated to reflect this change.

#### Added babel-polyfill as a peer dependency

The components now require babel-polyfill.

#### Updates to form input components

All of the form input components now consistently handle focus and validation messages. As a result the `errors` prop is now the `messages` prop for all form inputs.

### New components and bug fixes

#### Add Progress component

See [documentation and examples](#Progress) for details.

#### Fix Spinner component animation in Firefox

See [commit](https://github.com/instructure/instructure-ui/commit/f7a0fec6bb95b1baa42e83593a01b50bdab77438) for details.

#### Remove references to the DOM at require time

This should allow for running tests using instructure-ui components without a browser.

#### Updates to colors and typography

The global colors have been updated and the required font family is now Lato. A [Typography](#Typography) component has been added.

#### Fix imports of instructure-icons components

Icons are now imported individually to reduce the overall library bundle size.

#### Prevent React warnings by removing invalid props passed down to children

#### Add levels to Heading component

The [Heading](#Heading) component now supports levels 1-5 (and a reset) and also supports overriding the root
element.
