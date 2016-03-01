### Prerequisites and Installation

You'll need to have [Git](http://git-scm.com/) installed on your system.

Installation steps:

1. Install [Git](http://git-scm.com/).
2. Clone this repository.
3. Optionally run `./bin/instui install` to install [Node](https://nodejs.org/en/)) via [nvm](https://github.com/creationix/nvm).
4. Run `npm install`


### Development

- `npm start` runs the dev server to run/develop examples. You can then visit [http://localhost:8080](http://localhost:8080) in a browser. When you make changes to the source code in the `lib` directory you should see the page auto-reload.
- `npm test` will run the tests.
- `npm run test:watch` will run the tests and watch for changes to the source code. Run this if you'd like to debug tests in the browser (Chrome).

Run `npm run` to list the available commands.


### Linting and Code Formatting

Linting is run as part of the build. If you use the Sublime Text editor you can set up the following plugins to catch
linting and formatting errors earlier.

1. Install the [EditorConfig Plugin](https://github.com/sindresorhus/editorconfig-sublime)
2. Install the [SublimeLinter Plugin](http://sublimelinter.readthedocs.org/en/latest/)
3. Install the [SublimeLinter Eslint Plugin](https://github.com/roadhump/SublimeLinter-eslint)
4. Install the [SublimeLinter stylelint Plugin](https://github.com/kungfusheep/SublimeLinter-contrib-stylelint)
5. Install the dependencies:
`npm install`
5. Restart Sublime Text


### Documentation

Please update the documentation with any changes, the code and docs should
always be in sync.


### Build

Please do not include the output of `npm run build` in your commits.

