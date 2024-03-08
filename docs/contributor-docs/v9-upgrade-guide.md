---
title: Upgrade Guide for Version 9.0
category: Contributor Guides
order: 7
---

# Upgrade Guide for Version 9

> Note: This is a work in progress document, it will be final when version 9 is released.

Please read this guide carefully if you plan to update your app to this release.

We recommend upgrading your application for each major version gradually, e.g. if you plan to update from 7.x to 9.x, then migrate first to 8.x and then to version 9.

The tables below show what will be removed and what are they replaced with. We also marked if there are [codemods](#ui-codemods) available.

#### CommonJS build has been removed in v9

Since CommonJS style imports `require(..)` have been superseded by ES6 style imports `import … from …` and are well supported both in browsers and in node.js we decided to no longer include packages with CommonJS style imports in our releases.

### Deprecated Components

| Component                 | Substitute / Notes                                                                                                                                             |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [CodeEditor](#CodeEditor) | CodeEditor will be deleted in v9. Use [SourceCodeEditor](#SourceCodeEditor) instead, which is the wrapper for the newer version of the CodeMirror code editor. |
| [Navigation](#Navigation) | Navigation will be deleted in v9. It has been renamed to [SideNavBar](#SideNavBar).                                                                            |

### Deprecated Utilities

| Utility                                       | Substitute / Notes                                                                                                                                  |
| --------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| [addResizeListener](#addResizeListener)       | Use the native [ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver) utility. Example usage: [here](#addResizeListener) |
| [ApplyTextDirection](#ApplyTextDirection)     | Use [InstUISettingsProvider](#InstUISettingsProvider) instead to configure text direction.                                                          |
| [bidirectional](#bidirectional)               | It has been renamed to [textDirectionContextConsumer](#textDirectionContextConsumer), functionality remains the same.                               |
| [Browser](#Browser)                           | It has been removed in v9.                                                                                                                          |
| [ComponentIdentifier](#ComponentIdentifier)   | This util has been removed because it is not used by InstUI and other Instructure projects. If you need it, just copy & paste their code.           |
| [DateTime](#DateTime)                         | This util has been removed because it is not used by InstUI and other Instructure projects. If you need it, just copy & paste their code.           |
| [elementMatches](#elementMatches)             | This polyfill is only needed for old, unsupported browsers.                                                                                         |
| [EmotionThemeProvider](#EmotionThemeProvider) | It has been renamed to [InstUISettingsProvider](#InstUISettingsProvider) and can now also configure text direction.                                 |
| [isEdge](#isEdge)                             | It has been removed in v9.                                                                                                                          |
| [isIE11](#isIE11)                             | It has been removed in v9.                                                                                                                          |

### Deprecated Properties

For more information, click the name of the component to see its full documentation.

| Component                                         | Old Property             | New Property | Notes                                                                                                                               |
| ------------------------------------------------- | ------------------------ | ------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| [Mask](#Mask)                                     | onDismiss                | -            | This prop hasn't been used by the component for a long time, will be permanently removed in V9.                                     |
| [Overlay](#Overlay)                               | applicationElement       | -            | This prop is passed to Dialog, but it has been removed from Dialog in V6, so it will be permanently removed from Overlay too in V9. |
| [TopNavBarBrand](#TopNavBarBrand)                 | renderName               | -            | Please use the updated [TopNavBar](#TopNavBar) design.                                                                              |
| [TopNavBarDesktopLayout](#TopNavBarDesktopLayout) | hideActionsUserSeparator | -            | From v9, actionUserSeparator has to be visible at all times. Please do not use designs which hide it.                               |

### Deprecated Property Values

For more information, click the name of the component to see its full documentation.

| Component                   | Property | Old Value | New Value | Notes                                                                                                             |
| --------------------------- | -------- | --------- | --------- | ----------------------------------------------------------------------------------------------------------------- |
| [BaseButton](#BaseButton)   | tabIndex | `string`  | `number`  | Now only accepts `number` and not `string`.                                                                       |
| [CloseButton](#CloseButton) | tabIndex | `string`  | `number`  | Now only accepts `number` and not `string`.                                                                       |
| [Text](#Text)               | color    | warning   | -         | The `warning` color variant doesn't have sufficient color contrast with the background (4.5:1) required for text. |

### Removed packages and scripts

- InstUI-CLI's `create-app`, `create-component` and `create-package` commands: Just follow the instructions in the [usage](#usage) docs.
- The `template-component`, `template-app` and `template-app` packages have been removed.

### Removal of deprecated legacy reference attributes from components

Some of our components had reference properties to the underlying html elements which were meant to be used internally within the component itself. These properties will now warn about this usage and will be deleted in v9.

If you wish to get access to the html elements please refer [this](https://instructure.design/#accessing-the-dom) page which will explain how to do it with examples.
