---
title: Usage
category: Getting Started
order: 1
---

## Quick Start

The following steps will create a React app that uses Instructure-UI. Recommended if you are starting from scratch.

1. Create a new react app, e.g. with [create-react-app](https://reactjs.org/docs/create-a-new-react-app.html):

```shell
npx create-react-app my-cool-app
```

This will generate a vanilla React app with tests, sample code and scripts. You can try it by running `yarn start`.

2. Add InstUI dependencies to your `package.json`. We recommend that you add the `@instructure/ui` meta-package, this contains all of our UI components (substitute the version number with the latest one):

```json
{
  ...
  "dependencies": {
    ...
    "@instructure/ui": "^8.6.0"
  }
}
```

Run `yarn install`, so InstUI is downloaded to your `node_modules` folder and can be used.

3. Now you are ready to use InstUI, let's try it out. Replace the code in `App.js` with the following:

```javascript
import { Button, EmotionThemeProvider, canvas } from '@instructure/ui'

function App() {
  return (
    <EmotionThemeProvider theme={canvas}>
      <Button>Hello from InstUI!</Button>
    </EmotionThemeProvider>
  )
}

export default App
```

What does this code do?

- [EmotionThemeProvider](#EmotionThemeProvider) adds a theme to your application. InstUI components require a theme to work. There are 3 built-in themes: `canvas`, `canvasHighContrast`, `instructure`.
- [Button](#Button) is an InstUI button component

Finally, run `yarn start` to start up a basic development server.

Congrats, you have now a (very) basic app that uses Instructure-UI :)

## Integrating With an Existing Project

Just add the `@instructure/ui` dependency as shown above and wrap the part of your app that will use InstUI in `<EmotionThemeProvider>` and start using InstUI components.

## Further reading

- To use a different theme or customize one read about [EmotionThemeProvider](#EmotionThemeProvider)
- Make sure you read about [accessibility](#accessibility) with InstUI.
- [How to make your own component that uses InstUI's theming engine](#emotion)

> Note: Do not use tools with Instructure UI that remove `PropTypes` (for example
> [babel-plugin-transform-react-remove-prop-types](https://github.com/oliviertassinari/babel-plugin-transform-react-remove-prop-types)).
> Instructure UI uses `PropTypes` for its internal functionality (e.g. in
> `ui-react-utils/src/passtroughProps.js`), thus removing them will cause issues.
