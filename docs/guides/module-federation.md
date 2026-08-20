---
title: Module federation
category: Guides
order: 3
relevantForAI: true
---

# Module federation

InstUI supports [module federation](https://module-federation.io/) with some caveats. In a host app-guest app scenario, you have 2 choices depending on the version of InstUI you are using:

### InstUI v11 or newer

Just use themes as you would without module federation. Note that theme objects are not shared between instances, you will need to pass overrides manually to guest apps if needed.

### InstUI v10.14 - v10.latest:

- Both apps should use `canvasThemeLocal` or `canvasHighContrastThemeLocal` from the `@instructure/ui-themes` package when using themes. This means that `InstUISettingsProvider`'s theme prop cannot be left unset because it will default to `canvas`.
- Apps cannot use `canvas.use()`, `canvasHighContrast.use()`, these do not exist in the local themes.

### Host app is using InstUI v10.14 or earlier:

- Guest app needs to use **larger** version than InstUI v10.14
- Host app needs to import the `canvas`/`canvasHighContrast` theme before loading the guest app
- Guest app must use `canvasThemeLocal` or `canvasHighContrastThemeLocal`. Guest app's `InstUISettingsProvider`'s `theme` prop cannot be left unset because it will default to `canvas`
- Guest app cannot use `canvas.use()`, `canvasHighContrast.use()`, these do not exist in the local themes.

> Overrides specified in global themes are not applied to local themes.

### Keeping generated ids unique across apps

InstUI generates element ids with React's `useId`, which only guarantees
uniqueness within a single React root. When a host and a guest app each mount
their own root on the same page, both start numbering from scratch and their ids
can collide. Give each root a distinct `identifierPrefix`:

```javascript
---
type: code
---
createRoot(hostEl, { identifierPrefix: 'host-' })
createRoot(guestEl, { identifierPrefix: 'guest-' })
```

Older InstUI versions handled this with a shared `instanceCounterMap`, which is
now ignored. See [Server side rendering](/#server-side-rendering) for details.

You can check out a sample application on [Github](https://github.com/matyasf/module-federation-instui)
