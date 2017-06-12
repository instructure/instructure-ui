### Prerequisites and Installation

You'll need to have [Git](http://git-scm.com/) installed on your system.

Installation steps:

1. Install [Git](http://git-scm.com/).
2. Clone this repository.
3. Optionally run `./scripts/install` to install [Node](https://nodejs.org/en/)) via [nvm](https://github.com/creationix/nvm).
4. Run `npm install`


### Development

- `npm run start:watch` runs the dev server to run/develop examples. You can then visit [http://localhost:8080](http://localhost:8080) in a browser. When you make changes to the source code in the `lib` directory you should see the page auto-reload.
- `npm test` will run the tests.
- `npm run test:watch` will run the tests and watch for changes to the source code. Run this if you'd like to debug tests in the browser (Chrome).
- `npm start` will build the production version of the documentation. You can view it at [http://localhost:8001](http://localhost:8001).

Run `npm run` to list the available commands.


### Linting and Code Formatting

Linting is run as part of the build. If you use the Sublime Text or Atom editors you can set up the following plugins to catch
linting and formatting errors earlier.

1. Install the *EditorConfig* plugin [Sublime](https://github.com/sindresorhus/editorconfig-sublime), [Atom](https://github.com/sindresorhus/atom-editorconfig)
2. Install the *Linter* plugin [Sublime](http://sublimelinter.readthedocs.org/en/latest/), [Atom](https://atom.io/packages/linter)
3. Install the *Eslint* plugin [Sublime](https://github.com/roadhump/SublimeLinter-eslint), [Atom](https://github.com/AtomLinter/linter-eslint)
4. Install the *Stylelint* plugin [Sublime](https://github.com/kungfusheep/SublimeLinter-contrib-stylelint), [Atom](https://atom.io/packages/linter-stylelint)
5. Install the dependencies:
`npm install`
5. Restart your editor


### Adding components

1. Run `npm run generate` and choose a name for your component (use Pascal case, e.g. 'MyComponent').
2. Import/export your component in `lib/components/index.js`.
3. Kill the server (if you had it running), and run `npm run start:watch` to pick up the new component.
4. Visit [http://0.0.0.0:8080](http://0.0.0.0:8080) in a browser. You should see your component listed in the docs.
5. Start making changes to your component (following the [guidelines](#component-guidelines)) and watch it update in the browser automatically.


### Testing

See the [testing documenation](#testing-components) for details.


### Debugging

1. Run `npm run test:watch`. This command should automatically open up the Chrome browser.
2. In Chrome click the 'Debug' button at the top of the page (you may have to scroll up).
3. Open the [Developer tools](https://developers.google.com/web/tools/chrome-devtools/debug/?hl=en) (`Command + Shift + C`).
3. Now you can add breakpoints in the test code or the component code to debug issues. (`Command + P` in the 'Sources' tab)

If you'd like to run the tests in a different browser (e.g. Firefox or Safari), you can run
`NODE_ENV=test karma start --browsers=Firefox`.


### Commit Guidelines

1. Run `npm run commit` to commit your changes and follow our commit message format.
2. Please do not include the output of `npm run build` in your commits.


### Documentation

Please update the documentation with any changes, the code and docs should
always be in sync.


### Releases

1. Make sure tags are up to date. If not, run `git fetch --tags --force`
2. Run `npm run bump` to update the package version. Ignore the advice to push the tag (we do that after we publish the release due to our gerrit workflow).
3. Update the [CHANGELOG](#CHANGELOG) to optionally add any additional information about the release.
4. Push up the version bump commit to gerrit for review and testing.
5. Once the updated package.json file is merged, run `npm run release`
6. Verify that the documentation was updated on gh-pages and the release was tagged in github.

