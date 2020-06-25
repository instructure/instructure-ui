# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [7.1.0](https://github.com/instructure/instructure-ui/compare/v7.0.0...v7.1.0) (2020-06-25)

**Note:** Version bump only for package @instructure/ui-theme-tokens





# [7.0.0](https://github.com/instructure/instructure-ui/compare/v6.26.0...v7.0.0) (2020-05-27)


### Bug Fixes

* **ui-theme-tokens,ui-token-scripts:** fix ui-token-scripts build ([e2e7105](https://github.com/instructure/instructure-ui/commit/e2e7105))


### chore

* remove canvas-ams-theme ([91f1336](https://github.com/instructure/instructure-ui/commit/91f1336))
* **ui-component-examples,ui-theme-tokens:** switch component examples loader to cjs ([3abd6ca](https://github.com/instructure/instructure-ui/commit/3abd6ca))


### Code Refactoring

* decouple theme properties from ui-themeable ([d5a8827](https://github.com/instructure/instructure-ui/commit/d5a8827))


### Features

* **ui-docs-client:** Docs/homepage refresh ([ee4957b](https://github.com/instructure/instructure-ui/commit/ee4957b))


### BREAKING CHANGES

* - Removed the `canvas-ams-theme` package. Use `canvas-theme` instead.

Change-Id: I077f6b8cbbef9ee12e5904fb4c9dc4b48409acbb
Reviewed-on: https://gerrit.instructure.com/c/instructure-ui/+/237960
Tested-by: Service Cloud Jenkins <svc.cloudjenkins@instructure.com>
Reviewed-by: Steve Jensen <sejensen@instructure.com>
QA-Review: Daniel Sasaki <dsasaki@instructure.com>
Product-Review: Steve Jensen <sejensen@instructure.com>
Visual-Regression-Test: Steve Jensen <sejensen@instructure.com>
* **ui-component-examples,ui-theme-tokens:** - renderPage and renderExample are no longer supplied by the webpack
  component-examples-loader

Change-Id: I5c632274264d7c934abc86f41399b8a7cda23e26
Reviewed-on: https://gerrit.instructure.com/c/instructure-ui/+/236873
Tested-by: Service Cloud Jenkins <svc.cloudjenkins@instructure.com>
Reviewed-by: Ken Meleta <kmeleta@instructure.com>
Product-Review: Ken Meleta <kmeleta@instructure.com>
QA-Review: Daniel Sasaki <dsasaki@instructure.com>
Visual-Regression-Test: Steve Jensen <sejensen@instructure.com>
* - Changed arguments for `ui-token-scripts` commands
- Changed structure of `ui-token-scripts` configuration file

Change-Id: I33213d2350f9ce07c157a6ad3f8cd2e6bccb14e9
Reviewed-on: https://gerrit.instructure.com/c/instructure-ui/+/236552
Reviewed-by: Steve Jensen <sejensen@instructure.com>
Product-Review: Steve Jensen <sejensen@instructure.com>
Tested-by: Service Cloud Jenkins <svc.cloudjenkins@instructure.com>
QA-Review: Daniel Sasaki <dsasaki@instructure.com>
Visual-Regression-Test: Steve Jensen <sejensen@instructure.com>





See the instructure-ui mono-repo [change log](#CHANGELOG) for past changes.
