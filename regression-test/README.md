# Regression testing app

This app is a target against our regression testing workflow. It simply renders each and every one of the Instructure UI component.

The regression testing suite is fairly simple at this point, it will only check a couple of things:

- use the latest snapshot version of instui
- check whether every component is in a renderable state (simply render them)
- check whether any error/warning is thrown inside the application

## Run the regeression tests locally

Run `prepare.js` to fetch latest snapshot versions

```sh
# cwd: regression-test
node ./prepare.js
```

In order to run the test you have to have it's dependencies installed. (this project is not a workspace of the main instui project)

```sh
# cwd: regression-test
npm install
```

Then build the project(with `esbuild`):

```sh
# cwd: regression-test
npm run build:esbuild
```

The regression testing tool (`testcafe`) will test the app in a real browser, so we have to have a server serving our application:

```sh
# cwd: regression-test
npm run serve
```

Now you can run the test suite:

```sh
# cwd: regression-test
npm run test
```

The test suite should be opened in a new `chrome` instance and it's result will be reported in the console in the shell which ran the `test` command.
