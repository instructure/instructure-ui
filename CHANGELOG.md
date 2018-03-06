# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="4.7.3"></a>
## [4.7.3](https://github.com/instructure/instructure-ui/compare/v4.7.2...v4.7.3) (2018-03-06)


### Bug Fixes

* **FileDrop:** Fix positioning of the inner native file input element ([3664ccb](https://github.com/instructure/instructure-ui/commit/3664ccb))



<a name="4.7.2"></a>
## [4.7.2](https://github.com/instructure/instructure-ui/compare/v4.7.1...v4.7.2) (2018-02-14)


### Bug Fixes

* **ListItem:** stop :not selector selecting everything ([8209b8c](https://github.com/instructure/instructure-ui/commit/8209b8c))



<a name="4.7.1"></a>
## [4.7.1](https://github.com/instructure/instructure-ui/compare/v4.7.0...v4.7.1) (2018-01-25)


### Bug Fixes

* **ui-menu:** Pass href prop down to ElementType ([e876404](https://github.com/instructure/instructure-ui/commit/e876404))



<a name="4.7.0"></a>
# [4.7.0](https://github.com/instructure/instructure-ui/compare/v4.6.0...v4.7.0) (2018-01-24)


### Bug Fixes

* **babel-plugin-transform-class-display-name:** Add empty statement ([92473b3](https://github.com/instructure/instructure-ui/commit/92473b3))
* **Button:** fix icon alignment for small/large circle variant ([2853f53](https://github.com/instructure/instructure-ui/commit/2853f53))
* **Button,TreeBrowser:** Focus outline on focus only w/ MS Edge ([30ee7b2](https://github.com/instructure/instructure-ui/commit/30ee7b2))
* **DateInput:** fire onDateChange when transitioning to/from empty ([9765f55](https://github.com/instructure/instructure-ui/commit/9765f55))
* **MetricsList:** fix alignment for edge ([58333cd](https://github.com/instructure/instructure-ui/commit/58333cd))
* **MetricsList:** Vertically align MetricsListItems ([b666c09](https://github.com/instructure/instructure-ui/commit/b666c09))
* **Popover:** adds alignArrow prop to Popover ([46414dc](https://github.com/instructure/instructure-ui/commit/46414dc))
* **TimeInput:** allow disabled prop to pass down ([6e9f444](https://github.com/instructure/instructure-ui/commit/6e9f444))


### Features

* **List:** Add itemSpacing prop ([36cf537](https://github.com/instructure/instructure-ui/commit/36cf537))



<a name="4.6.0"></a>
# [4.6.0](https://github.com/instructure/instructure-ui/compare/v4.5.0...v4.6.0) (2018-01-03)


### Bug Fixes

* **List:** don't render delimiter when delimiter=none unless it's inline ([3e81b1f](https://github.com/instructure/instructure-ui/commit/3e81b1f))
* **List:** ignore falsy children ([cb7a45c](https://github.com/instructure/instructure-ui/commit/cb7a45c)), closes [/github.com/facebook/react/issues/2956#issuecomment-338041943](https://github.com//github.com/facebook/react/issues/2956/issues/issuecomment-338041943)


### Features

* **build:** Support a beta release branch ([b9b187c](https://github.com/instructure/instructure-ui/commit/b9b187c))
* **Button:** Handle text color for :hover/:focus ([8c77678](https://github.com/instructure/instructure-ui/commit/8c77678))
* **PopoverMenu:** re-export MenuItem, etc. for simplicity ([52ecc4c](https://github.com/instructure/instructure-ui/commit/52ecc4c))
* **postcss:** Add config option to opt into nesting instead of nested ([5443bbb](https://github.com/instructure/instructure-ui/commit/5443bbb))



<a name="4.5.0"></a>
# [4.5.0](https://github.com/instructure/instructure-ui/compare/v4.4.1...v4.5.0) (2017-12-19)


### Bug Fixes

* **CloseButton:** remove inline size to allow size prop to work correctl ([0c01510](https://github.com/instructure/instructure-ui/commit/0c01510))
* **DateInput:** Allow text input when component is controlled ([05e0112](https://github.com/instructure/instructure-ui/commit/05e0112))
* **FormFieldLayout:** fix inline input issues ([35ca6bb](https://github.com/instructure/instructure-ui/commit/35ca6bb))
* **ui-codemods:** Update Typography to Text ([ff9d596](https://github.com/instructure/instructure-ui/commit/ff9d596))
* **ui-docs-plugin:** Pass down config to loaders correctly ([62f01f6](https://github.com/instructure/instructure-ui/commit/62f01f6))
* **ui-presets:** Remove unnecessary dependency that's causing issues dow ([a55b8b3](https://github.com/instructure/instructure-ui/commit/a55b8b3))


### Features

* **List:** Updates variant prop. Adds delimiter prop. ([7b29a44](https://github.com/instructure/instructure-ui/commit/7b29a44))



<a name="4.4.1"></a>
## [4.4.1](https://github.com/instructure/instructure-ui/compare/v4.4.0...v4.4.1) (2017-12-14)


### Bug Fixes

* **ui-docs-plugin:** Pass down config to loaders correctly ([deabfc4](https://github.com/instructure/instructure-ui/commit/deabfc4))
* **ui-presets:** Remove unnecessary dependency that's causing issues dow ([bd2d81e](https://github.com/instructure/instructure-ui/commit/bd2d81e))



<a name="4.4.0"></a>
# [4.4.0](https://github.com/instructure/instructure-ui/compare/v4.3.0...v4.4.0) (2017-12-13)


### Bug Fixes

* **Avatar:** trim whitespace in makeInitialsFromName ([4317939](https://github.com/instructure/instructure-ui/commit/4317939))
* **docs:** Add missing docs app dependency ([fea9a70](https://github.com/instructure/instructure-ui/commit/fea9a70))
* **TextArea:** shrink when cleared ([0b45287](https://github.com/instructure/instructure-ui/commit/0b45287))


### Features

* **ui-presets,ui-core:** Add support for node test environments + tweaks for quizzes ([dc7a484](https://github.com/instructure/instructure-ui/commit/dc7a484))



<a name="4.3.0"></a>
# [4.3.0](https://github.com/instructure/instructure-ui/compare/v4.2.0...v4.3.0) (2017-12-11)


### Bug Fixes

* **Alert:** close button focus overlapping edge of container ([aeb2130](https://github.com/instructure/instructure-ui/commit/aeb2130))
* **Alert:** Convert border values to theme vars ([273c86e](https://github.com/instructure/instructure-ui/commit/273c86e))
* **Autocomplete:** fix controlled behavior ([8af7d62](https://github.com/instructure/instructure-ui/commit/8af7d62))
* **browser:** fix accessing style when it's undefined in Position ([806a861](https://github.com/instructure/instructure-ui/commit/806a861))
* **build:** Always ask for the release tag ([e01629c](https://github.com/instructure/instructure-ui/commit/e01629c))
* **build:** Use correct format for release (git) tags ([c9ec4df](https://github.com/instructure/instructure-ui/commit/c9ec4df))
* **Checkbox:** Update disabled/readonly checkboxes to not be tabbable ([8b37729](https://github.com/instructure/instructure-ui/commit/8b37729))
* **ContextBox:** Position close button correctly in dialog example ([7c0e846](https://github.com/instructure/instructure-ui/commit/7c0e846))
* **DateInput:** fix controlled component version ([af6208e](https://github.com/instructure/instructure-ui/commit/af6208e))
* **DateInput:** Link messages to inputs for SR ([fe8f2bc](https://github.com/instructure/instructure-ui/commit/fe8f2bc))
* **DateInput:** Prevent inputRef from getting called multiple times ([1dbd960](https://github.com/instructure/instructure-ui/commit/1dbd960))
* **FileDrop:** allow extensions without leading dot ([9a155e9](https://github.com/instructure/instructure-ui/commit/9a155e9))
* **Grid:** Make GridCols equal-width by default ([cb8e5d3](https://github.com/instructure/instructure-ui/commit/cb8e5d3))
* **Link:** fix inverse focus for a11y ([c98a4af](https://github.com/instructure/instructure-ui/commit/c98a4af))
* **List:** remove ellipsis styles from pipe variant ([390a60a](https://github.com/instructure/instructure-ui/commit/390a60a))
* **Mask:** Make full-screen Mask work in Safari ([029f467](https://github.com/instructure/instructure-ui/commit/029f467))
* **Menu:** Long menu item alignment is off ([3cfc435](https://github.com/instructure/instructure-ui/commit/3cfc435))
* **Menu,MenuItem,PopoverMenu:** Fix VO double select on radio,checkbox ([28b733b](https://github.com/instructure/instructure-ui/commit/28b733b))
* **NumberInput:** add sv locale ([40c6cb7](https://github.com/instructure/instructure-ui/commit/40c6cb7))
* **NumberInput:** extend `disabled` styling to the arrow container ([d3ac1d4](https://github.com/instructure/instructure-ui/commit/d3ac1d4))
* **Popover:** Popover onDismiss callback never fired ([28d236c](https://github.com/instructure/instructure-ui/commit/28d236c))
* **RadioInput:** Disabled/read-only radios selectable in Safari ([5fbba2c](https://github.com/instructure/instructure-ui/commit/5fbba2c))
* **RadioInput,Checkbox:** Move inputs outside label elements ([7531488](https://github.com/instructure/instructure-ui/commit/7531488))
* **release:** Run tests only once for a release ([c3710fb](https://github.com/instructure/instructure-ui/commit/c3710fb))
* **Select:** Make arrowColor theme variable work ([3731899](https://github.com/instructure/instructure-ui/commit/3731899))
* **Spinner:** adjust large spinner animation ([36d9ea6](https://github.com/instructure/instructure-ui/commit/36d9ea6))
* **Tag:** Tag components render wrong title value ([88b9bf1](https://github.com/instructure/instructure-ui/commit/88b9bf1))
* **ToggleDetails:** Fix filled variant in IE11 ([f1970d1](https://github.com/instructure/instructure-ui/commit/f1970d1))
* **Tooltip:** Move focus on single tab press with tooltip ([dd7d4d0](https://github.com/instructure/instructure-ui/commit/dd7d4d0))
* **ui-core:** Audit/add missing Canvas variables ([a9cefe9](https://github.com/instructure/instructure-ui/commit/a9cefe9))
* **ui-core:** Fix canvas-high-contrast component themes ([c577019](https://github.com/instructure/instructure-ui/commit/c577019))
* **ui-docs-client:** Codepen links are missing some globals ([9e620e2](https://github.com/instructure/instructure-ui/commit/9e620e2))
* **ui-docs-plugin:** misc fixes ([aff7b27](https://github.com/instructure/instructure-ui/commit/aff7b27))
* **ui-presets:** Build CSS with webpack in dev/debug mode ([d3083be](https://github.com/instructure/instructure-ui/commit/d3083be))
* **ui-presets:** Don't remove width/height from SVG tags ([639f620](https://github.com/instructure/instructure-ui/commit/639f620))


### Features

* **build:** Default release script to HEAD commit ([f96b34a](https://github.com/instructure/instructure-ui/commit/f96b34a))
* **build:** Use headless chrome ([39339fd](https://github.com/instructure/instructure-ui/commit/39339fd))
* **ContextBox,Container:** Moving border from ContextBox to Container ([8bf314a](https://github.com/instructure/instructure-ui/commit/8bf314a))
* **FileDrop:** Add support for validation messages ([37a9106](https://github.com/instructure/instructure-ui/commit/37a9106))
* **FormField:** Add prop to allow left aligned FormField label ([089833a](https://github.com/instructure/instructure-ui/commit/089833a))
* **Menu:** Add focus state ([b5f4069](https://github.com/instructure/instructure-ui/commit/b5f4069))
* **Menu:** Focus first menu item when menu only has one item ([d03d1f2](https://github.com/instructure/instructure-ui/commit/d03d1f2))
* **TextInput:** add textAlign variant to support `center` ([53843e1](https://github.com/instructure/instructure-ui/commit/53843e1))
* **ui-core:** Move moment dependency to ui-utils ([0d12a6a](https://github.com/instructure/instructure-ui/commit/0d12a6a))
* **ui-presets:** Add build and test scripts ([6921a48](https://github.com/instructure/instructure-ui/commit/6921a48))
* **ui-themes:** Add canvas-high-contrast theme ([e6cd8e8](https://github.com/instructure/instructure-ui/commit/e6cd8e8))
* **ui-utils:** Add a uid helper ([c9cc6c3](https://github.com/instructure/instructure-ui/commit/c9cc6c3))
* **ui-utils:** Addition of utils needed for the layout component ([501ada3](https://github.com/instructure/instructure-ui/commit/501ada3))



<a name="4.2.0"></a>
# [4.2.0](https://github.com/instructure/instructure-ui/compare/4.1.0...4.2.0) (2017-12-08)


### Features

* **button:** remove focus on disabled buttons ([863e055](https://github.com/instructure/instructure-ui/commit/863e055))



<a name="4.1.0"></a>
# [4.1.0](https://github.com/instructure/instructure-ui/compare/4.0.1...4.1.0) (2017-11-29)


### Bug Fixes

* **Tag:** Focus state hidden in IE11 ([22d5d5c](https://github.com/instructure/instructure-ui/commit/22d5d5c))
* **ui-docs-client:** Codepen links are missing some globals ([0a3f30c](https://github.com/instructure/instructure-ui/commit/0a3f30c))


### Features

* **Tag:** inline variant ([7ad7f7a](https://github.com/instructure/instructure-ui/commit/7ad7f7a))



<a name="4.0.1"></a>
## [4.0.1](https://github.com/instructure/instructure-ui/compare/v4.0.0...v4.0.1) (2017-11-17)


### Bug Fixes

* **Mask:** Fullscreen modal footer hidden on iPad ([ebb76d5](https://github.com/instructure/instructure-ui/commit/ebb76d5))
* **ui-codemods:** add lib to imports path for ui-themes and ui-themeable ([973cf9b](https://github.com/instructure/instructure-ui/commit/973cf9b))



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

* **Alert:** Announce live region content in the docs ([493440a](https://github.com/instructure/instructure-ui/commit/493440a))
* **Autocomplete:** add calls for onInputChange ([33ad3cb](https://github.com/instructure/instructure-ui/commit/33ad3cb))
* **Autocomplete,Codepen:** Codepen examples should render ([36ef124](https://github.com/instructure/instructure-ui/commit/36ef124))
* **Autocomplete,Menu,Dialog:** Prevent esc from closing Dialog ([284eeed](https://github.com/instructure/instructure-ui/commit/284eeed))
* **Avatar:** include canvas theme generator ([dc27b6a](https://github.com/instructure/instructure-ui/commit/dc27b6a))
* **build:** ignore lib directories ([cb56606](https://github.com/instructure/instructure-ui/commit/cb56606))
* **build:** Use local version of yarn for scripts ([fcf7732](https://github.com/instructure/instructure-ui/commit/fcf7732))
* **build:** use relative paths for entries so that app rebuilds in dev ([f60d94d](https://github.com/instructure/instructure-ui/commit/f60d94d))
* **Button:** Correct fluidWidth Button heights ([5ede261](https://github.com/instructure/instructure-ui/commit/5ede261))
* **CheckboxGroup,RadioInputGroup:** Link messages to inputs for SR ([fba6550](https://github.com/instructure/instructure-ui/commit/fba6550))
* **documentation:** Examples should have valid URLs for hrefs ([18eeaa4](https://github.com/instructure/instructure-ui/commit/18eeaa4))
* **FileDrop:** make input sibling of label ([d892cff](https://github.com/instructure/instructure-ui/commit/d892cff))
* **Forms:** fix css placeholder color ([7c63393](https://github.com/instructure/instructure-ui/commit/7c63393))
* **Forms:** Update size prop ([95ecfd2](https://github.com/instructure/instructure-ui/commit/95ecfd2))
* **Grid:** width and offset not working ([1a2fa45](https://github.com/instructure/instructure-ui/commit/1a2fa45))
* **Grid:** GridCol with width="auto" should not shrink ([ae82286](https://github.com/instructure/instructure-ui/commit/ae82286))
* **Mask:** Prevent mask from calling onDismiss when defaultPrevented ([4f42ad0](https://github.com/instructure/instructure-ui/commit/4f42ad0))
* **Mask:** Update Mask example text ([77deb7e](https://github.com/instructure/instructure-ui/commit/77deb7e))
* **Modal:** Modify modal to dismiss for Mask click instead of document ([64f6816](https://github.com/instructure/instructure-ui/commit/64f6816))
* **ToggleDetails:** Fix fluidWidth prop / updates ([de9ef24](https://github.com/instructure/instructure-ui/commit/de9ef24))
* **ui-docs-client:** Fix navigation issues ([193399e](https://github.com/instructure/instructure-ui/commit/193399e))
* **ui-docs-client:** Make version link to changelog ([581fca4](https://github.com/instructure/instructure-ui/commit/581fca4))


### Features

* **Autocomplete:** implement value getter ([1a8a730](https://github.com/instructure/instructure-ui/commit/1a8a730))
* **ui-codemods:** Adding codemod for updating imports ([f4907cb](https://github.com/instructure/instructure-ui/commit/f4907cb))
* **build:** Monorepo second pass ([5fae316](https://github.com/instructure/instructure-ui/commit/5fae316))
* **build:** Monorepo, yarn workspaces and Lerna setup ([edd71af](https://github.com/instructure/instructure-ui/commit/edd71af))
* **DateInput:** Add conversion status as part of onDateChange ([1ecb819](https://github.com/instructure/instructure-ui/commit/1ecb819))
* **Forms:** Update component font sizes ([13f77c6](https://github.com/instructure/instructure-ui/commit/13f77c6))
* **List:** Remove margin from unstyled list item ([0e39d75](https://github.com/instructure/instructure-ui/commit/0e39d75))
* **ToggleDetails:** add controllable behavior ([f767b50](https://github.com/instructure/instructure-ui/commit/f767b50))
* **ui-docs-plugin:** Doc comment blocks in all file types & JSdocs ([6189147](https://github.com/instructure/instructure-ui/commit/6189147))
* **ui-docs-plugin:** Integrate react-axe in dev mode ([6a29682](https://github.com/instructure/instructure-ui/commit/6a29682))
* **ui-utils:** Add jsdocs for util functions ([c6b5834](https://github.com/instructure/instructure-ui/commit/c6b5834))


### BREAKING CHANGES

* **Autocomplete,Codepen:** JS examples will need to include a call to render and will need to
  include `render: false` as front matter inside the code block
* **ui-docs-plugin:** Inverse examples will need to include `inverse: true` as front matter inside
  the code block
* **Typography,Text:** Typography component is renamed to Text, so
imports/requires will need to be updated (it's added to the codemod
config in ui-core)
* **Forms:** The font size of the components will have increased
* **Forms:** Font-sizes for `large` and `small`
simple RadioInputs and Checkboxes have changed. In
particular, Checkbox toggles have gone from using the
same font-size for every size to changing the
font-size based on the `size` prop (to be
consistent with other InstUI components).
* **List:** ListItem with `unstyled` variant won't have margins.
* **build:** Imports of instructure-ui/babel/, instructure-ui/lib/themeable and
instructure-ui/lib/themes will need to be updated
* **build:** Imports of instructure-ui and ui-docs packages will
need to be updated to use the new packages: @instructure/ui-core, @instructure/ui-codemods, @instructure/ui-config
* **build:** Imports of ui-docs will need to be updated to: @instructure/ui-docs-plugin, @instructure/ui-docs-client
* **Autocomplete:** onInputChange prop now has a new argument providing the
value and the event argument is now nullable
* **ToggleDetails:** expanded prop now means ToggleDetails is controlled
and defaultExpanded prop fills the same job expanded did previously


<a name="3.4.0"></a>
# [3.4.0](https://github.com/instructure/instructure-ui/compare/v3.3.1...v3.4.0) (2017-09-12)


### Bug Fixes

* **babel:** Warn on unlocatable css imports ([c6d82fc](https://github.com/instructure/instructure-ui/commit/c6d82fc))


### Features

* **themeing:** Allow ignoring certain files ([c24e4bc](https://github.com/instructure/instructure-ui/commit/c24e4bc))



<a name="3.3.1"></a>
## [3.3.1](https://github.com/instructure/instructure-ui/compare/v3.3.0...v3.3.1) (2017-09-11)


### Bug Fixes

* **Autocomplete:** Autocomplete clears text on select ([143ce14](https://github.com/instructure/instructure-ui/commit/143ce14))
* **Container:** add missing prop-type ([946604d](https://github.com/instructure/instructure-ui/commit/946604d))
* **DateInput:** Fix multiple setState calls via input ref function ([0cce6d7](https://github.com/instructure/instructure-ui/commit/0cce6d7))
* **file-drop:** Fix dropping the same file twice ([34aa303](https://github.com/instructure/instructure-ui/commit/34aa303))
* **Modal:** Added fullScreen prop to Mask component ([7ddea42](https://github.com/instructure/instructure-ui/commit/7ddea42))
* **Modal:** disable page scrolling when fullScreen prop is set ([207780e](https://github.com/instructure/instructure-ui/commit/207780e))
* **themeable:** Allow multiple themeable components with the same name ([779fc7d](https://github.com/instructure/instructure-ui/commit/779fc7d))



<a name="3.3.0"></a>
# [3.3.0](https://github.com/instructure/instructure-ui/compare/v3.2.0...v3.3.0) (2017-09-06)


### Bug Fixes

* **Alert:** Apply a11y theme to added alerts ([531a4ad](https://github.com/instructure/instructure-ui/commit/531a4ad))
* **Autocomplete:** add index argument to formatSelectedOption ([a7dfccb](https://github.com/instructure/instructure-ui/commit/a7dfccb))
* **Autocomplete:** Add more end padding to input ([4496b4a](https://github.com/instructure/instructure-ui/commit/4496b4a))
* **Checkbox:** Add min-width rule to label ([4e35459](https://github.com/instructure/instructure-ui/commit/4e35459))
* **ContextBox,Position:** ContextBox positioning is incorrect ([0e44db0](https://github.com/instructure/instructure-ui/commit/0e44db0))
* **DateInput:** Make popover target the input element ([5ad19e7](https://github.com/instructure/instructure-ui/commit/5ad19e7))
* **DatePicker:** DatePicker UI improvements ([b0872ce](https://github.com/instructure/instructure-ui/commit/b0872ce))
* **Modal:** Max-width for Modal content ([af0607c](https://github.com/instructure/instructure-ui/commit/af0607c))
* **Modal:** positioned content breaks out of Modal ([9ef840a](https://github.com/instructure/instructure-ui/commit/9ef840a))
* **Popover:** Fix focus trapping to work with Menu ([bfcccf4](https://github.com/instructure/instructure-ui/commit/bfcccf4))
* **Popover,Dialog:** Prevent Popover jumping to bottom of screen ([426f4ff](https://github.com/instructure/instructure-ui/commit/426f4ff))
* **Position:** fix out-of-bounds calculation for Position ([9c1aa4b](https://github.com/instructure/instructure-ui/commit/9c1aa4b))


### Features

* **TabList:** Add tabRef prop to TabPanel ([77a8def](https://github.com/instructure/instructure-ui/commit/77a8def))


### Performance Improvements

* **lib/util/time.js:** Don't force all locales to be included in bundle ([6a62bd4](https://github.com/instructure/instructure-ui/commit/6a62bd4))



<a name="3.2.0"></a>
# [3.2.0](https://github.com/instructure/instructure-ui/compare/v3.1.0...v3.2.0) (2017-08-18)


### Bug Fixes

* **Autocomplete:** adds optionsMaxWidth prop to Autocomplete ([f2e0f2f](https://github.com/instructure/instructure-ui/commit/f2e0f2f))
* **button:** Firefox - Return button needs to be pressed twice ([4a6fe9f](https://github.com/instructure/instructure-ui/commit/4a6fe9f))


### Features

* **autocomplete:** Change autocomplete min-width ([03a7652](https://github.com/instructure/instructure-ui/commit/03a7652))



<a name="3.1.0"></a>
# [3.1.0](https://github.com/instructure/instructure-ui/compare/v3.0.0...v3.1.0) (2017-08-16)


### Bug Fixes

* **autocomplete:** add min-width to autocomplete ([587f074](https://github.com/instructure/instructure-ui/commit/587f074))
* **build:** release script should run the deploy ([3ed1b20](https://github.com/instructure/instructure-ui/commit/3ed1b20))
* **codepen:** use the correct format for js_external param ([9398a93](https://github.com/instructure/instructure-ui/commit/9398a93))
* **NumberInput:** Fix hidden arrows in Firefox ([727609c](https://github.com/instructure/instructure-ui/commit/727609c))
* **Position:** ContextBox arrow should be correct in example ([4406d57](https://github.com/instructure/instructure-ui/commit/4406d57))
* **warning:** use console.error instead of throwing errors ([5aa3a7b](https://github.com/instructure/instructure-ui/commit/5aa3a7b))


### Features

* **Checkbox,CheckboxGroup:** Add Readonly to Checkbox values ([a77624f](https://github.com/instructure/instructure-ui/commit/a77624f))
* **RadioInput:** Allow readonly on radioinput values ([5248571](https://github.com/instructure/instructure-ui/commit/5248571))



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

* **DateInput:** add `value` prop for controlled component support
* **build:** `themeable.config.js` now required for babel preset.
* **DateInput, DatePicker:** callback function arguments changed
* **Table:** deprecated props
* **Portal, Position, Overlay, Modal, Tray, Popover:** deprecated props
* **Menu, PopoverMenu:** deprecated props
* **Tag:** deprecated props
* **Alert:** deprecated props

### Bug Fixes

* **Autocomplete:** Add z-index to avoid overlap ([a588081](https://github.com/instructure/instructure-ui/commit/a588081))
* **Autocomplete:** fix duplicate calls to onChange ([856e67b](https://github.com/instructure/instructure-ui/commit/856e67b))
* **Autocomplete:** Make options menu expand to full input width ([d6dfe87](https://github.com/instructure/instructure-ui/commit/d6dfe87))
* **Autocomplete:** Resolve VO issues ([e4d4592](https://github.com/instructure/instructure-ui/commit/e4d4592))
* **Autocomplete:** The options list should close on select ([d672875](https://github.com/instructure/instructure-ui/commit/d672875))
* **Autocomplete:** visual bug fixes ([27d858b](https://github.com/instructure/instructure-ui/commit/27d858b))
* **Billboard, omitProp 'padding':** don't allow padding to get styled ([c860d3f](https://github.com/instructure/instructure-ui/commit/c860d3f))
* **build:** Remove `.js` from theme import in template ([cad860e](https://github.com/instructure/instructure-ui/commit/cad860e))
* **Button:** buttonRef prop should return the button DOM element ([29474cd](https://github.com/instructure/instructure-ui/commit/29474cd))
* **Button:** Fix :focus ring issue in Firefox ([430cf7d](https://github.com/instructure/instructure-ui/commit/430cf7d))
* **Button, fluidWidth:** replace min-height with top/bottom padding ([30b3073](https://github.com/instructure/instructure-ui/commit/30b3073))
* **Button, omitProp 'padding':** padding was getting passed down through ([c005760](https://github.com/instructure/instructure-ui/commit/c005760))
* **Checkbox:** Make size prop work for CheckboxFacade ([53523f8](https://github.com/instructure/instructure-ui/commit/53523f8))
* **DateInput:** Make props align better with controlled and uncontrolled ([712447d](https://github.com/instructure/instructure-ui/commit/712447d))
* **DateInput, DatePicker:** Provide the event object in the callback arg ([37cd10a](https://github.com/instructure/instructure-ui/commit/37cd10a))
* **DatePicker:** Fix :focus states in Edge 15 ([ae620ef](https://github.com/instructure/instructure-ui/commit/ae620ef))
* **dependencies:** Resolve empty styles in transpiled JS ([f79c154](https://github.com/instructure/instructure-ui/commit/f79c154))
* **Dialog:** Render Dialog example outside aria-hidden region ([3b614db](https://github.com/instructure/instructure-ui/commit/3b614db))
* **docs:** Upgrade ui-docs to prevent theme conflicts ([db23135](https://github.com/instructure/instructure-ui/commit/db23135))
* **ensureSingleChild:** Fix ensureSingleChild when child is a string ([f796ca0](https://github.com/instructure/instructure-ui/commit/f796ca0))
* **FormFieldGroup:** Handle null children ([9b9019a](https://github.com/instructure/instructure-ui/commit/9b9019a))
* **generate:** Fix the component template for the generate task ([76d86f0](https://github.com/instructure/instructure-ui/commit/76d86f0))
* **Heading, omitProp 'padding':** don't allow padding to get passed down ([c4dbd6b](https://github.com/instructure/instructure-ui/commit/c4dbd6b))
* **Image, omitProps 'padding':** keep padding from getting passed down f ([df1c2ec](https://github.com/instructure/instructure-ui/commit/df1c2ec))
* **lint:** lint errors shouldn't fail build when debugging ([5e21641](https://github.com/instructure/instructure-ui/commit/5e21641))
* **List, omitProps 'padding':** don't let padding get styled ([9fa375e](https://github.com/instructure/instructure-ui/commit/9fa375e))
* **Media, omitProps 'padding':** padding should not be a media property ([d966622](https://github.com/instructure/instructure-ui/commit/d966622))
* **Menu,PopoverMenu:** Menu flyouts should close onSelect ([b8185a0](https://github.com/instructure/instructure-ui/commit/b8185a0))
* **Pagination, omitProps 'margin/padding':** don't allow margin/padding ([3d27f40](https://github.com/instructure/instructure-ui/commit/3d27f40))
* **Pill, omitProps 'padding':** dont' allow padding to be added as a pro ([7b8502f](https://github.com/instructure/instructure-ui/commit/7b8502f))
* **PopoverMenu,MenuItemFlyout:** Only close flyout on ESC press ([a767adf](https://github.com/instructure/instructure-ui/commit/a767adf))
* **Position:** Fix mountNode prop in rel position container ([c59c339](https://github.com/instructure/instructure-ui/commit/c59c339))
* **Position:** Negative offsets should work ([7c35e8f](https://github.com/instructure/instructure-ui/commit/7c35e8f))
* **Table:** Deprecate the tableData prop ([5c9a5f6](https://github.com/instructure/instructure-ui/commit/5c9a5f6))
* **Table, omitProps 'padding':** don't allow padding to be added as a pr ([67c79e3](https://github.com/instructure/instructure-ui/commit/67c79e3))
* **Tag, omitProps 'padding':** don't allow padding to be added as a prop ([fcb251c](https://github.com/instructure/instructure-ui/commit/fcb251c))
* **themeable:** Fix transform-themable with empty css files ([1d05744](https://github.com/instructure/instructure-ui/commit/1d05744))
* **themeable:** Polyfill Edge 15 until improved css var support ([427a13c](https://github.com/instructure/instructure-ui/commit/427a13c))
* **TreeBrowser:** Component broken in Edge v15 ([f6aab8b](https://github.com/instructure/instructure-ui/commit/f6aab8b))

### Features

* **Autocomplete:** Adds editable prop to Autocomplete ([15c70d1](https://github.com/instructure/instructure-ui/commit/15c70d1))
* **Button, Link:** Add inverse link variants to Link and Button ([8b499c5](https://github.com/instructure/instructure-ui/commit/8b499c5))
* **CloseButton:** Add a CloseButton component ([7475cb2](https://github.com/instructure/instructure-ui/commit/7475cb2))
* **DateInput:** Return raw input for onDateChange ([9195dd1](https://github.com/instructure/instructure-ui/commit/9195dd1))
* **Dialog:** Add a Dialog component ([0c197e1](https://github.com/instructure/instructure-ui/commit/0c197e1))
* **Mask:** Add a Mask component ([5db3aa2](https://github.com/instructure/instructure-ui/commit/5db3aa2))
* **Popover:** Add Dialog component behavior to Popover ([fcb2b89](https://github.com/instructure/instructure-ui/commit/fcb2b89))
* **Position:** Add 'stretch', 'constrain' and 'over' props ([6930e83](https://github.com/instructure/instructure-ui/commit/6930e83))
* **Spinner:** Add x-small Spinner size ([14e49e6](https://github.com/instructure/instructure-ui/commit/14e49e6))
* **SVGIcon,InlineSVG:** Add icon components and new rotation prop ([02cd4b5](https://github.com/instructure/instructure-ui/commit/02cd4b5))
* **Modal:** Add Dialog component behavior to Modal ([8597802](https://github.com/instructure/instructure-ui/commit/8597802))
* **Tray:** Add Dialog component behavior to Tray ([ffd181e](https://github.com/instructure/instructure-ui/commit/ffd181e))


<a name="2.5.0"></a>
# [2.5.0](https://github.com/instructure/instructure-ui/compare/v2.4.0...v2.5.0) (2017-06-20)


### Bug Fixes

* **Autocomplete:** Fix apply a11y theme ([0e6c3b3](https://github.com/instructure/instructure-ui/commit/0e6c3b3))
* **Autocomplete:** fix typo in autocomplete prop documentation ([ce8bad9](https://github.com/instructure/instructure-ui/commit/ce8bad9))
* **Container:** Fix Transition issue with children visibility ([0ec49ab](https://github.com/instructure/instructure-ui/commit/0ec49ab))
* **DateInput:** Preserve time portion of provided value across date selections ([bb46db1](https://github.com/instructure/instructure-ui/commit/bb46db1))
* **NumberInput:** make arrows work for large numbers ([99b7d70](https://github.com/instructure/instructure-ui/commit/99b7d70))
* **TextInput:** Handle icons better ([5fc761b](https://github.com/instructure/instructure-ui/commit/5fc761b))
* **themeable:** CSS variables polyfill shouldn't scope root selectors ([1545a8f](https://github.com/instructure/instructure-ui/commit/1545a8f))
* **themeable:** IE11 CSS variable polyfill should scope media queries ([1f54b62](https://github.com/instructure/instructure-ui/commit/1f54b62))


### Features

* **Alert:** Add live region support and transitions ([948b00d](https://github.com/instructure/instructure-ui/commit/948b00d))
* **Autocomplete:** Added 'multiple' feature ([520a005](https://github.com/instructure/instructure-ui/commit/520a005))
* **Badge:** Support rtl text ([3bce62f](https://github.com/instructure/instructure-ui/commit/3bce62f))
* **Breadcrumb:** Support rtl text for breadcrumb ([46c9ecf](https://github.com/instructure/instructure-ui/commit/46c9ecf))
* **Button:** Support rtl text ([6f64f5d](https://github.com/instructure/instructure-ui/commit/6f64f5d))
* **Checkbox:** Support rtl text in checkbox ([9038f86](https://github.com/instructure/instructure-ui/commit/9038f86))
* **ContextBox:** Support rtl text in ContextBox ([7747bef](https://github.com/instructure/instructure-ui/commit/7747bef))
* **Docs, ColorSwatch:** Support rtl text in ColorSwatch ([9237071](https://github.com/instructure/instructure-ui/commit/9237071))
* **FormField, TextInput:** Support rtl text for text inputs ([c7dbdc2](https://github.com/instructure/instructure-ui/commit/c7dbdc2))
* **FormFieldLayout:** Support rtl text ([2445616](https://github.com/instructure/instructure-ui/commit/2445616))
* **GridCol:** Support rtl text in GridCol ([cb687fd](https://github.com/instructure/instructure-ui/commit/cb687fd))
* **List:** Support rtl text in List ([56b6541](https://github.com/instructure/instructure-ui/commit/56b6541))
* **Menu:** Support rtl text in Menu ([08b5253](https://github.com/instructure/instructure-ui/commit/08b5253))
* **Modal:** Support rtl text in modal ([1d340b5](https://github.com/instructure/instructure-ui/commit/1d340b5))
* **NumberInput:** Support rtl text in NumberInput ([9a9a878](https://github.com/instructure/instructure-ui/commit/9a9a878))
* **RadioInput:** Support rtl text in RadioInput ([377b150](https://github.com/instructure/instructure-ui/commit/377b150))
* **Select:** Support rtl text in Select ([7caf740](https://github.com/instructure/instructure-ui/commit/7caf740))
* **Tag:** Support rtl text in Tag ([ef69bfb](https://github.com/instructure/instructure-ui/commit/ef69bfb))
* **TextArea:** Support rtl text in TextArea ([cd58264](https://github.com/instructure/instructure-ui/commit/cd58264))
* **ToggleDetails:** Support rtl in ToggleDetails ([5e8aad4](https://github.com/instructure/instructure-ui/commit/5e8aad4))
* **TreeBrowser:** a11y navigation improvements ([272c873](https://github.com/instructure/instructure-ui/commit/272c873))
* **TreeBrowser:** Support rtl text in TreeBrowser ([9e6b91e](https://github.com/instructure/instructure-ui/commit/9e6b91e))



<a name="2.4.0"></a>
# [2.4.0](https://github.com/instructure/instructure-ui/compare/v2.3.0...v2.4.0) (2017-06-12)


### Bug Fixes

* **Badge:** Make it possible to add SR-only text ([4e3737f](https://github.com/instructure/instructure-ui/commit/4e3737f))
* **DateInput:** add messages to date input ([1d18fc0](https://github.com/instructure/instructure-ui/commit/1d18fc0))
* **themeable:** Remove all 'ms-' hacks for non-IE browsers ([0a491de](https://github.com/instructure/instructure-ui/commit/0a491de))
* **NumberInput:** NumberInput bug fix ([ea84a69](https://github.com/instructure/instructure-ui/commit/ea84a69))
* **themeable:** default theme overrides aren't applied to components ([e58424f](https://github.com/instructure/instructure-ui/commit/e58424f))


### Features

* **Grid:** Forward aria/role attributes on <Grid> components ([04adaea](https://github.com/instructure/instructure-ui/commit/04adaea))
* **TabList:** Deprecate 'accordion' variant ([30c7a2d](https://github.com/instructure/instructure-ui/commit/30c7a2d))
* **TimeInput:** Add a TimeInput component ([78201d3](https://github.com/instructure/instructure-ui/commit/78201d3))
* **TreeBrowser:** Add expanded/defaultExpanded props ([52a6ce1](https://github.com/instructure/instructure-ui/commit/52a6ce1))
* **Breadcrumb:** Add onClick to BreadcrumbLink ([c6af374](https://github.com/instructure/instructure-ui/commit/c6af374))



<a name="2.3.0"></a>
# [2.3.0](https://github.com/instructure/instructure-ui/compare/v2.2.2...v2.3.0) (2017-06-01)


### Bug Fixes

* **Badge:** Make SVGs display block ([102207f](https://github.com/instructure/instructure-ui/commit/102207f))
* **codepen examples:** fix codepen example links ([866af50](https://github.com/instructure/instructure-ui/commit/866af50))
* **DatePicker:** Make DatePicker KO navigable with arrow keys ([059f947](https://github.com/instructure/instructure-ui/commit/059f947))
* **npm:** Update shrinkwrap file so app compiles again ([0ec660a](https://github.com/instructure/instructure-ui/commit/0ec660a))
* **NumberInput:** Fixed-width input layout bug ([fa6d9b8](https://github.com/instructure/instructure-ui/commit/fa6d9b8))
* **NumberInput:** support i18n ([4e814f5](https://github.com/instructure/instructure-ui/commit/4e814f5))


### Features

* **Autocomplete:** Add an Autocomplete component ([d3e0d47](https://github.com/instructure/instructure-ui/commit/d3e0d47))
* **List:** Add List component ([1ee5c4d](https://github.com/instructure/instructure-ui/commit/1ee5c4d))



<a name="2.2.2"></a>
## [2.2.2](https://github.com/instructure/instructure-ui/compare/v2.2.1...v2.2.2) (2017-05-22)


### Bug Fixes
* **MenuItem:** Prevent onSelect from firing twice ([2c67d78](https://github.com/instructure/instructure-ui/commit/2c67d78))



<a name="2.2.1"></a>
## [2.2.1](https://github.com/instructure/instructure-ui/compare/v2.2.0...v2.2.1) (2017-05-22)


### Bug Fixes
* **Menu:** Prevent UL margin style overrides ([4522876](https://github.com/instructure/instructure-ui/commit/4522876))
* **ToolTip:** Events on the child of Trigger not being passed through to Popover ([69513b8](https://github.com/instructure/instructure-ui/commit/69513b8))
* **MenuItem,Button:** should support target="_blank" ([99b8544](https://github.com/instructure/instructure-ui/commit/99b8544))
* **MenuItemFlyout:** Expose ref for flyout content ([5e0622e](https://github.com/instructure/instructure-ui/commit/5e0622e))



<a name="2.2.0"></a>
## [2.2.0](https://github.com/instructure/instructure-ui/compare/v2.1.1...v2.2.0) (2017-05-22)


### Bug Fixes
* **Position:** Fix flaky Position test for Firefox ([8ea348d](https://github.com/instructure/instructure-ui/commit/8ea348d))
* **Button:** Fix heights and add icon support ([faef77a](https://github.com/instructure/instructure-ui/commit/faef77a))
* **ToggleDetails:** Fix button type and fluidWidth ([e1da0f4](https://github.com/instructure/instructure-ui/commit/e1da0f4))
* **Modal:** Fix fullscreen in safari cutting off content ([d1d4ec7](https://github.com/instructure/instructure-ui/commit/d1d4ec7))
* **containerQuery:** Should support ems ([4a09603](https://github.com/instructure/instructure-ui/commit/4a09603))
* **sinon-chai:** Use the correct sinon-chai testing assertions ([453a211](https://github.com/instructure/instructure-ui/commit/453a211))


### Features
* **ApplyTheme:** Make accessible themes 'immutable' ([144a4fb](https://github.com/instructure/instructure-ui/commit/144a4fb))
* **MenuFlyout:** Add MenuFlyout option to Menu ([6ea4f71](https://github.com/instructure/instructure-ui/commit/6ea4f71))



<a name="2.1.1"></a>
## [2.1.1](https://github.com/instructure/instructure-ui/compare/v2.1.0...v2.1.1) (2017-05-18)


### Bug Fixes

* **build:** Fix compilation errors from missing moment-timezone ([501184d](https://github.com/instructure/instructure-ui/commit/501184d))



<a name="2.1.0"></a>
# [2.1.0](https://github.com/instructure/instructure-ui/compare/v2.0.0...v2.1.0) (2017-05-17)


### Bug Fixes

* **Button:** fix display getting overridden ([0409876](https://github.com/instructure/instructure-ui/commit/0409876))
* **requestAnimationFrame:** requestAnimationFrame util should fall back ([2352de8](https://github.com/instructure/instructure-ui/commit/2352de8))
* **Tag, Pagination:** fix margin-padding values ([e34eb57](https://github.com/instructure/instructure-ui/commit/e34eb57))
* **text-align:** Fix text alignment CSS rules for IE ([1c22ba6](https://github.com/instructure/instructure-ui/commit/1c22ba6))
* **themes:** Provide a way to import accessible themes separately ([7e556df](https://github.com/instructure/instructure-ui/commit/7e556df))
* **Transition:** Fix Transition component example ([c197cba](https://github.com/instructure/instructure-ui/commit/c197cba))


### Features

* **Badge:** Add Badge component ([3247199](https://github.com/instructure/instructure-ui/commit/3247199))
* **Button:** add a danger variant ([7d741aa](https://github.com/instructure/instructure-ui/commit/7d741aa))
* **DatePicker, DateInput:** Add DatePicker and DateInput components ([457dea7](https://github.com/instructure/instructure-ui/commit/457dea7))
* **NumberInput:** Add a NumberInput component ([c37afdc](https://github.com/instructure/instructure-ui/commit/c37afdc))



<a name="2.0.0"></a>
# [2.0.0](https://github.com/instructure/instructure-ui/compare/v1.4.1...v2.0.0) (2017-05-10)


### Bug Fixes

* **release:** Fix typo in release script ([9850924](https://github.com/instructure/instructure-ui/commit/9850924))
* **Spinner:** Fix illegal rule console warning ([d0820aa](https://github.com/instructure/instructure-ui/commit/d0820aa))
* **TabList:** Fix TabList transitions and unmountOnExit ([fcc5961](https://github.com/instructure/instructure-ui/commit/fcc5961))
* **themes:** Don't depend on import order for themeable components, themes ([10396c8](https://github.com/instructure/instructure-ui/commit/10396c8))


### Dependencies and Build

* Remove UMD output and build scripts ([5d5eb65](https://github.com/instructure/instructure-ui/commit/5d5eb65))
* Upgrade React to the latest version ([c422be7](https://github.com/instructure/instructure-ui/commit/c422be7))


### API Changes

* **Avatar:** Update the Avatar component API ([56f4eab](https://github.com/instructure/instructure-ui/commit/56f4eab))
* **Container:** Make `size` property values consistent ([f75465a](https://github.com/instructure/instructure-ui/commit/f75465a))
* **isBlock:** Replace `isBlock` props with `inline` ([c1dcdff](https://github.com/instructure/instructure-ui/commit/c1dcdff))
* **ToggleDetails:** Update the ToggleDetails component API ([c8348b5](https://github.com/instructure/instructure-ui/commit/c8348b5))
* **RTL support:** Replace left/right with start/end ([c855ea1](https://github.com/instructure/instructure-ui/commit/c855ea1))
* **Grid:** Change breakpoints and media to use 'small', 'medium', etc. ([15f592a](https://github.com/instructure/instructure-ui/commit/15f592a))


### Features

* **Button:** Wrap text when 'isBlock' prop is set ([d8af67d](https://github.com/instructure/instructure-ui/commit/d8af67d))
* **Pagination:** Add Pagination ([76ee0f0](https://github.com/instructure/instructure-ui/commit/76ee0f0))
* **Pill:** Add Pill component ([354795c](https://github.com/instructure/instructure-ui/commit/354795c))
* **RTL support:** Rename placement props ([099795a](https://github.com/instructure/instructure-ui/commit/099795a))
* **Tag:** Add Tag component ([6a0d804](https://github.com/instructure/instructure-ui/commit/6a0d804))


### Upgrade Guide

We've introduced some improved API and component changes that are not backwards compatible with previous versions. To help with migrating to 2.x, here is a list of specific areas where changes will be required in order to upgrade.

#### Build and Dependency Updates

* **React 0.14.9 or 15.4.0 is required**
* **UMD format is no longer supported**
* **instructure-icons is now a peer dependency**


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
      userImgUrl: {avatarImage}
      </td>
      <td>
      src: {avatarImage}
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

* **MenuItemGroup:** Prevent errors when MenuItemGroup has only one child ([ec333dc](https://github.com/instructure/instructure-ui/commit/ec333dc))
* **Modal:** Focus 'Open Modal' button in Modal example when Modal closes ([ee02811](https://github.com/instructure/instructure-ui/commit/ee02811))
* **Position:** Improve Position component (for PopoverMenu bug fixes) ([3e06a07](https://github.com/instructure/instructure-ui/commit/3e06a07))
* **Rating:** Rating component should be themeable when `animateFill` pro ([ce17907](https://github.com/instructure/instructure-ui/commit/ce17907))


### Performance Improvements

* **themeable:** Update shouldComponentUpdate for themeable components ([3ad419b](https://github.com/instructure/instructure-ui/commit/3ad419b))


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
