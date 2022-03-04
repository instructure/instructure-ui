# Regression testing app

This app is a target against our regression testing workflow. It simply renders each and every one of the Instructure UI component.

The regression testing suite is fairly simple at this point, it will only check a couple of things:

- use the latest snapshot version of instui
- check whether every component is in a renderable state (simply render them)
- check whether any error/warning is thrown inside the application

## Run the regeression tests locally

In order to run the test you have to have it's dependencies installed. (this project is not a workspace of the main instui project)

```sh
# cwd: examples
yarn install
```

Then build the project(with `esbuild`):

```sh
# cwd: examples
yarn build:esbuild
```

The regression testing tool (`testcafe`) will test the app in a real browser, so we have to have a server serving our application:

```sh
# cwd: examples
yarn serve
```

Now you can run the test suite:

```sh
# cwd: examples
yarn test
```

The test suite should be opened in a new `chrome` instance and it's result will be reported in the console in the shell which ran the `test` command.
