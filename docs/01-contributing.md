### Prerequisites and Installation

You'll need to have [Git](http://git-scm.com/) installed on your system. There is an install script provided that will install all of the other dependencies (note: it installs [nvm](https://github.com/creationix/nvm) and uses it to install the correct version of [Node](https://nodejs.org/en/)).

Installation steps:

1. Install [Git](http://git-scm.com/).
2. Clone this repository.
3. Run the install script: `scripts/install`


### Development

- `npm start` runs the dev server to run/develop examples. You can then visit [http://localhost:8080](http://localhost:8080) in a browser. When you make changes to the source code in the `lib` directory you should see the page auto-reload.
- `npm test` will run the tests.
- `npm run test:watch` will run the tests and watch for changes to the source code. Run this if you'd like to debug tests in the browser (Chrome).

See the scripts section in the package.json file for all of the other build tasks/options.


### Linting and Code Formatting

Linting is run as part of the build. If you use the Sublime Text editor you can set up the following plugins to catch
linting and formatting errors earlier.

1. Install the [EditorConfig Plugin](https://github.com/sindresorhus/editorconfig-sublime)
2. Install the [SublimeLinter Plugin](http://sublimelinter.readthedocs.org/en/latest/)
3. Install the [SublimeLinter Eslint Plugin](https://github.com/roadhump/SublimeLinter-eslint)
4. Install the dependencies:
`npm install`
5. Restart Sublime Text

### Documentation

Please update the documentation with any API changes, the code and docs should
always be in sync.

### Build

Please do not include the output of `npm run build` in your commits, we
only do this when we release. (Also, you probably don't need to build
anyway unless you are fixing something around our global build.)

### Guidelines

Components should:

- be high contrast aware (use color variables, meet [4.5:1](http://www.w3.org/TR/WCAG20-TECHS/G18.html) and [3:1](http://www.w3.org/TR/WCAG20-TECHS/G183.html)).
- be keyboard friendly (proper use of tabIndex, logical tab order, ESC to close modals, etc).
- be screenreader friendly (label all inputs, use native controls, use screenreader-only text).
- have good test coverage.

### Commit Subjects

If your patch **changes the API or fixes a bug** please use one of the
following prefixes in your commit subject:

- `[fixed] ...`
- `[changed] ...`
- `[added] ...`
- `[removed] ...`

That ensures the subject line of your commit makes it into the
auto-generated changelog. Do not use these tags if your change doesn't
fix a bug and doesn't change the public API.

Commits with changed, added, or removed, must be reviewed by another
collaborator.

### When using `[changed]` or `[removed]`...

Please include an upgrade path with example code in the commit message.
If it doesn't make sense to do this, then it doesn't make sense to use
`[changed]` or `[removed]` :)


