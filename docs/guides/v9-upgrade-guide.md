---
title: Upgrade Guide for Version 9.0
category: Guides
order: 99
---

# Upgrade Guide for Version 9

> Note: This is a work in progress document, it will be final when version 9 is released.

Please read this guide carefully if you plan to update your app to this release.

We recommend upgrading your application for each major version gradually, e.g. if you plan to update from 7.x to 9.x, then migrate first to 8.x and then to version 9.

The tables below show what will be removed and what are they replaced with. We also marked if there are [codemods](#ui-codemods) available.

##### Table of Contents

- [Deprecated Components](/#v9-upgrade-guide/#upgrade-guide-for-version-9-deprecated-components)
- [Deprecated Utilities](/#v9-upgrade-guide/#upgrade-guide-for-version-9-deprecated-utilities)
- [Deprecated Properties](/#v9-upgrade-guide/#upgrade-guide-for-version-9-deprecated-properties)
- [Deprecated Property Values](/#v9-upgrade-guide/#upgrade-guide-for-version-9-deprecated-property-values)
- [Removed packages and scripts](/#v9-upgrade-guide/#upgrade-guide-for-version-9-removed-packages-and-scripts)
- [Removal of deprecated legacy reference attributes from components](/#v9-upgrade-guide/#upgrade-guide-for-version-9-removal-of-deprecated-legacy-reference-attributes-from-components)

### Deprecated Components

| Component                 | Substitute / Notes                                                                            |
| ------------------------- | --------------------------------------------------------------------------------------------- |
| [Navigation](#Navigation) | This component is deprecated in v8 and will be removed in InstUI v9 due to the lack of usage. |

### Deprecated Utilities

| Utility                                       | Substitute / Notes                                                                                                                                  |
| --------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| [EmotionThemeProvider](#EmotionThemeProvider) | It has been renamed to [InstUISettingsProvider](#InstUISettingsProvider) and can now also configure text direction.                                 |
| [ApplyTextDirection](#ApplyTextDirection)     | Use [InstUISettingsProvider](#InstUISettingsProvider) instead to configure text direction.                                                          |
| [addResizeListener](#addResizeListener)       | Use the native [ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver) utility. Example usage: [here](#addResizeListener) |
| [bidirectional](#bidirectional)               | I has been renamed to [textDirectionContextConsumer](#textDirectionContextConsumer), functionality remains the same.                                |
| [ComponentIdentifier](#ComponentIdentifier)   | This util has been removed because it is not used by InstUI and other Instructure projects. If you need it, just copy & paste their code.           |
| [DateTime](#DateTime)                         | This util has been removed because it is not used by InstUI and other Instructure projects. If you need it, just copy & paste their code.           |
| [elementMatches](#elementMatches)             | This polyfill is only needed for old, unsupported browsers.                                                                                         |

### Deprecated Properties

For more information, click the name of the component to see its full documentation.

- CMA = Codemod available

| Component           | Old Property       | New Property | CMA\* | Notes                                                                                                                               |
| ------------------- | ------------------ | ------------ | ----- | ----------------------------------------------------------------------------------------------------------------------------------- |
| [Overlay](#Overlay) | applicationElement | -            | -     | This prop is passed to Dialog, but it has been removed from Dialog in V6, so it will be permanently removed from Overlay too in V9. |
| [Mask](#Mask)       | onDismiss          | -            | -     | This prop hasn't been used by the component for a long time, will be permanently removed in V9.                                     |

### Deprecated Property Values

For more information, click the name of the component to see its full documentation.

- CMA = Codemod available

| Component                   | Property | Old Value | New Value | CMA\* | Notes                                                                                                             |
| --------------------------- | -------- | --------- | --------- | ----- | ----------------------------------------------------------------------------------------------------------------- |
| [BaseButton](#BaseButton)   | tabIndex | `string`  | `number`  | -     | Now only accepts `number` and not `string`.                                                                       |
| [CloseButton](#CloseButton) | tabIndex | `string`  | `number`  | -     | Now only accepts `number` and not `string`.                                                                       |
| [Text](#Text)               | color    | warning   | -         | -     | The `warning` color variant doesn't have sufficient color contrast with the background (4.5:1) required for text. |

### Removed packages and scripts

- InstUI-CLI's `create-app`, `create-component` and `create-package` commands: Just follow the instructions in the [usage](#usage) docs.
- The `template-component`, `template-app` and `template-app` packages have been removed.

### Removal of deprecated legacy reference attributes from components

Some of our components had reference properties to the underlying html elements which were meant to be used internally within the component itself. These properties will now warn about this usage and will be deleted in v9.

If you wish to get access to the html elements please refer [this](https://instructure.design/#accessing-the-dom) page which will explain how to do it with examples.
