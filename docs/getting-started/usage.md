---
title: Usage
category: Getting Started
order: 1
---

## Quick Start

The following steps will create a React app that uses Instructure UI. Recommended if you are starting from scratch.

1. Create a new React app, e.g. with [create-react-app](https://reactjs.org/docs/create-a-new-react-app.html):

```md
---
type: code
---

npx create-react-app my-cool-app
```

This will generate a vanilla React app with tests, sample code and scripts. You can try it by running `npm start`.

2. Add InstUI dependencies to your `package.json`. We recommend that you add the `@instructure/ui` meta-package, this contains all of our UI components (substitute the version number with the latest one):

```md
---
type: code
---

{
...
"dependencies": {
...
"@instructure/ui": "^9"
}
}
```

Run `npm install`, so InstUI is downloaded to your `node_modules` folder and can be used.

3. Now you are ready to use InstUI, let's try it out. Replace the code in `App.js` with the following:

```js
---
type: code
---
import { Button, InstUISettingsProvider, canvas } from '@instructure/ui'

function App() {
  return (
    <InstUISettingsProvider theme={canvas}>
      <Button>Hello from InstUI!</Button>
    </InstUISettingsProvider>
  )
}

export default App
```

What does this code do?

- [InstUISettingsProvider](#InstUISettingsProvider) allows to specify the text direction (default is the direction that the user's browser supplies) and the theme to your application. InstUI components require a theme to work, all components are themeable, and themes control their look and feel. There are 3 built-in themes: [`canvas`](#canvas), [`canvasHighContrast`](#canvas-high-contrast), [`instructure`](#instructure). The component examples seen throughout the documentation use the [canvas theme](#canvas) by default.
- [Button](#Button) is an Instructure UI button component

Finally, run `npm start` to start up a basic development server.

Congrats, you have now a (very) basic app that uses Instructure UI :)

## Integrating With an Existing Project

Just add the `@instructure/ui` dependency as shown above and wrap the part of your app that will use InstUI in `<InstUISettingsProvider>` and start using InstUI components.

## Further reading

- To use a different theme or customize one read about [InstUISettingsProvider](#InstUISettingsProvider)
- Make sure you read about [Accessibility](#accessibility) with InstUI.
- [How to make your own component that uses InstUI's theming engine](#emotion)
