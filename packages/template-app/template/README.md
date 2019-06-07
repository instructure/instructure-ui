This project was created with [Instructure UI](https://instructure.design).
Instructure UI has a number of beautiful and accessible React components with
baked-in styles and theming and helpful utility functions.

For easy setup, we've included all of our build presets. This includes
configurations for webpack, babel, eslint, etc, and allows you to start developing
immediately.

To get started, you can import and compose existing components from our library.
We've included a few commonly used ones already to render the landing page.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode. Open
[http://0.0.0.0:3000](http://0.0.0.0:3000) to view it in the browser.

The page will reload if you make edits. You will also see any lint errors in the
console.

### `yarn build`

Builds the app for production and outputs it to the `__build__` directory.

### `yarn lint`

Lints the app for eslint errors.

### `yarn lint:fix`

Fixes linting errors that can be automatically corrected.

### `yarn clean`

Clean by removing any build or cache related files and directories.

### `yarn open:sandbox`

If your project is hosted in a public [GitHub](http://github.com) repository,
you can open it with [codesandbox](https://codesandbox.io). To try it out:
  * Push your latest changes to a GitHub repo
  * Create a "repository" field in your `package.json` and add the GitHub repo url
  * Run `yarn open:sandbox` in the terminal

A chrome window should open up codesandbox with your project source.

## Theming
See [ui-themeable](https://instructure.design/#ui-themeable) for a more
comprehensive theming guide.

All components in our library are [themeable](https://instructure.design/#ui-themeable)
which allows you to create a custom look and feel for your application. This app
is pre-configured with our [canvas](https://instructure.design/#canvas) theme
which is also the default for our documentation. If you want to create your own
theme from scratch, you can do so using the
[ThemeRegistry](https://instructure.design/#ThemeRegistry) `registerTheme` method.
You can then replace this import in `src/App.js`

```js
import '@instructure/canvas-theme'
```

with your custom theme.

> **_NOTE:_**  You should have a theme imported if you are using Instructure UI components. You can replace this import with a different theme, but deleting it entirely may cause some components to have errors and possibly not render.

Alternatively, if you want to continue using the `canvas` theme as your default
with some overrides instead of creating an entirely new one, you can use the
[ApplyTheme](https://instructure.design/#ApplyTheme) component.

You can also make your custom built components in this app themeable. The `Banner`
component located in the source directory, for example, is already using
[themeable](https://instructure.design/#themeable) for styling.
