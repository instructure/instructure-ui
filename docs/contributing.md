---
title: Contributing
category: guides
order: 1
---

## Contributing

### Development

- `yarn start:watch` runs the dev server to run/develop examples. You can then visit [http://localhost:8080](http://localhost:8080) in a browser. When you make changes to the source code in the `packages/ui-core/src` directory you should see the page auto-reload.
- `yarn test` will run the tests.
- `yarn test:watch --scope @instructure/ui-core` will run the tests and watch for changes to the source code. Run this if you'd like to debug tests in the browser (Chrome).
- `yarn start` will build the production version of the documentation. You can view it at [http://localhost:8001](http://localhost:8001).

Run `yarn run` to list the available commands.


### Adding components

1. Run `yarn generate:component` and choose a name for your component (use Pascal case, e.g. 'MyComponent').
2. Import/export your component in `packages/ui-core/src/components/index.js`.
3. Kill the server (if you had it running), and run `yarn start:watch` to pick up the new component.
4. Visit [http://localhost:8080](http://localhost:8080) in a browser. You should see your component listed in the docs.
5. Start making changes to your component and watch it update in the browser automatically.


### Testing

All components should have good test coverage. See the [testing documentation](#testing-components) for details.


### Debugging

1. Run `yarn test:watch --scope @instructure/ui-core`. This command should automatically open up the Chrome browser.
2. In Chrome click the 'Debug' button at the top of the page (you may have to scroll up).
3. Open the [Developer tools](https://developers.google.com/web/tools/chrome-devtools/debug/?hl=en) (`Command + Shift + C`).
3. Now you can add breakpoints in the test code or the component code to debug issues. (`Command + P` in the 'Sources' tab)

If you'd like to run the tests in a different browser (e.g. Firefox or Safari), you can run
`NODE_ENV=test karma start --browsers=Firefox`.

### Documentation

All components and utilities should be well documented, including examples.

Write documentation inline in code comment blocks. The code and docs should
always be in sync.

### Accessibility Requirements

All components should:

- be high contrast aware (use theme variables for all colors, colors should meet [4.5:1](http://www.w3.org/TR/WCAG20-TECHS/G18.html) and [3:1](http://www.w3.org/TR/WCAG20-TECHS/G183.html) contrast ratios).
- be keyboard friendly (proper use of tabIndex, logical tab order, ESC to close modals, etc).
- be screenreader friendly (label all inputs, use native controls, use screenreader-only text).

### CSS Conventions

The build system uses the webpack css-loader and [css modules](https://github.com/css-modules/css-modules) to generate
Suit/BEM style class names, where the "block" portion includes the component name and a configured prefix. So in the .css source for components we only have to worry about "element" and "modifier" class names (using BEM terminology).

#### Element Class Names

Element classes should be camel case (e.g. `inputLabel`).

#### Modifier Class Names

Modifiers should also be camel case, with a couple exceptions:

- If part of the classname is dynamically generated in the JS from a component prop, use a double dash before the generated part of the class name. e.g. `positioned--left` where "left" is a string value passed as a prop `positioned`.

#### Element and Wildcard Selectors

As a general rule, element (e.g. `p { ... }`) and wildcard (`*`) selectors should be avoided. Exceptions could be made for
components that would never render children.
