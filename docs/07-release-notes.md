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

