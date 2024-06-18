# Regression testing app

This app is a target against our regression testing workflow. It simply renders each and every one of the Instructure UI component.

The regression testing suite is fairly simple at this point, it will only check a couple of things:

- use the latest snapshot version of InstUI
- check if components are in a renderable state (simply render them)

## Run the regression tests locally

In order to run the test you have to have it's dependencies installed. (this project is not a workspace of the main instui project)

```sh
# cwd: regression-test
npm install
```

Then build the project:

```sh
# cwd: regression-test
npm run build
```

The regression testing tool will test the app in a real browser, requiring a server to serve our application. This command will start the Next.js server:
```sh
# cwd: regression-test
npm start
```

Now you can run the test suite:

```sh
# cwd: regression-test
npm run test
```

The test suite should be opened in a new `chrome` instance and it's result will be reported in the console in the shell which ran the `test` command.
