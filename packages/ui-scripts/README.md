---
category: packages
---

## ui-scripts

[![npm][npm]][npm-url]
[![build-status][build-status]][build-status-url]
[![MIT License][license-badge]][LICENSE]
[![Code of Conduct][coc-badge]][coc]

A CLI tool for UI component libraries made by Instructure Inc.

### Installation

```sh
yarn add @instructure/ui-scripts
```

### Scripts

#### `build`

To build (babel transpile) a package to be consumed as a library:

`yarn ui-scripts --build`

To build (webpack) a package to be consumed as an application:

`yarn ui-scripts --build --bundle`

#### `clean`

To clean out built/generated files from a package:

`yarn ui-scripts --clean`

#### `test`

To run (karma/mocha) tests for a package:

`yarn ui-scripts --test`

#### `lint`

To lint (eslint/stylelint) a package:

`yarn ui-scripts --lint`

To lint a commit message (the `HEAD` commit):

`yarn ui-scripts --lint-commit`

#### `commit`

To write a correctly formatted commit message and commit the staged changes:

`yarn ui-scripts --commit`

#### `install-react`

To install a specific version of React and ReactDOM without updating `package.json`
(defaults to the versions specified in the resolutions field):

`yarn ui-scripts --install-react [version]`

#### `bump`

To update all package versions
(defaults to determining the version automatically using commit messages):

`yarn ui-scripts --bump [version]`

#### `release`

To release
(NPM publish, create Git tag, deploy docs, create Jira version, Slack notification)
for all packages (defaults to current version):

`yarn ui-scripts --release [version]`

#### `post-publish`

To run just the post-publish steps
(create Git tag, create Jira version, Slack notification)
of the release script:

`yarn ui-scripts --post-publish`

#### `deploy-docs`

To run just the deploy of the documentation (to Github pages):

`yarn ui-scripts --deploy-docs`

#### `deprecate-package`

To deprecate a package with the specified version (defaults to current version):

`yarn ui-scripts --deprecate-package [version]`

To run for all packages, run from the repo root:

`yarn lerna exec --stream -- ui-scripts --deprecate-package [version]`

#### `publish-package`

To publish a package (if [version] is already published, it will tell you):

`yarn ui-scripts --publish-package [version]`

To run for all packages, run from the repo root:

`yarn lerna exec --stream -- ui-scripts --publish-package [version]`


### Configuration

If you'd like to use the publish, deploy, and release scripts, you'll need to configure your project as follows:

#### Project level

Add the config to your project level `package.json` file:

```json
"config": {
  "ui-scripts": {
    "slack_emoji": ":instui:",
    "slack_channel": "#instui",
    "jira_host": "instructure.atlassian.net",
    "jira_project_id": "17900",
    "jira_project_key": "INSTUI",
    "npm_scope": "@instructure:registry=https://registry.npmjs.org/",
    "gh_pages_branch": "gh-pages",
    "gh_pages_dir": "packages/__docs__/__build__",
    "gh_pages_cname": "instructure.design",
    "changelog_url": "https://instructure.design/#CHANGELOG"
  }
}
```

#### Environment variables

Add a `.env` file to your project root:

```sh
NPM_TOKEN=
NPM_USERNAME=
NPM_EMAIL=
GIT_EMAIL=""
GIT_USERNAME=
GIT_REMOTE_URL=gerrit:instructure-ui
GIT_REMOTE_NAME=origin
JIRA_CONSUMER_KEY=
JIRA_TOKEN=
JIRA_SECRET=
JIRA_PEM_PATH=/Users/your_user_name/.ssh/jira.pem
SLACK_USERNAME=instui
SLACK_WEBHOOK=
```

[npm]: https://img.shields.io/npm/v/@instructure/ui-scripts.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-scripts

[build-status]: https://travis-ci.org/instructure/instructure-ui.svg?branch=master
[build-status-url]: https://travis-ci.org/instructure/instructure-ui "Travis CI"

[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE

[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
