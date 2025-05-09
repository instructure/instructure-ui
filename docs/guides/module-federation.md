---
title: Module federation
category: Guides
order: 1
---

# Module federation

InstUI supports [module federation](https://module-federation.io/) with some caveats. In a host app-guest app scenario, you have 2 choices depending on the version of InstUI you are using:

### (Recommended) Host and guest app are using larger version than InstUI v10.14:

- Both apps should use `canvasThemeLocal` or `canvasHighContrastThemeLocal` from the `@instructure/ui-themes` package when using themes. This means that `InstUISettingsProvider`'s theme prop cannot be left unset because it will default to `canvas`.
- Apps cannot use `canvas.use()`, `canvasHighContrast.use()`, these do not exist in the local themes.

### Host app is using InstUI v10.14 or earlier:

- Guest app needs to use **larger** version than InstUI v10.14
- Host app needs to import the `canvas`/`canvasHighContrast` theme before loading the guest app
- Guest app must use `canvasThemeLocal` or `canvasHighContrastThemeLocal`. Guest app's `InstUISettingsProvider`'s `theme` prop cannot be left unset because it will default to `canvas`
- Guest app cannot use `canvas.use()`, `canvasHighContrast.use()`, these do not exist in the local themes.

> Overrides specified in global themes are not applied to local themes.

You can check out a sample application on [Github](https://github.com/matyasf/module-federation-instui)
