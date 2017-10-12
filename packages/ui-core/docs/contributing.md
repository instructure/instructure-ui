---
title: Contributing
category: guides
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
5. Start making changes to your component (following the [guidelines](#component-guidelines)) and watch it update in the browser automatically.


### Testing

See the [testing documenation](#testing-components) for details.


### Debugging

1. Run `yarn test:watch --scope @instructure/ui-core`. This command should automatically open up the Chrome browser.
2. In Chrome click the 'Debug' button at the top of the page (you may have to scroll up).
3. Open the [Developer tools](https://developers.google.com/web/tools/chrome-devtools/debug/?hl=en) (`Command + Shift + C`).
3. Now you can add breakpoints in the test code or the component code to debug issues. (`Command + P` in the 'Sources' tab)

If you'd like to run the tests in a different browser (e.g. Firefox or Safari), you can run
`NODE_ENV=test karma start --browsers=Firefox`.

### Documentation

Please update the documentation with any changes, the code and docs should
always be in sync.
