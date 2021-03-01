---
title: Releases
category: Getting Started
order: 8
---

> Note: This information is for maintainers

## Releases

Every commit that has functional changes to the `master` branch constitutes as a release. The release process is the following:

- Make a new `git` branch and push your changes there. Use `yarn commit` to commit changes.
- When the code you want to add is ready on your branch you should open a pull request to the `master` branch.
- Wait for the pull request to be reviewed and watch any Github notifications about issues/comments.
- Run `yarn bump` to increase the version automatically based on the commits.
  - If the code to be merged contains a _breaking change_, it will result in a major version increase.
  - If the change is _new functionality_, it will result in a minor version increase.
  - _Bugfixes, performance changes and pure refactorings_ will result in a patch release.
- `git push` the new release commit
- Wait for the review of the release commit
- Rebase and Merge the code into the `master` branch. Jenkins will detect that there is a new version and will update the documentation and publish the new `npm` package.

### Post-release checks

1. Verify that the release was [tagged in Github](https://github.com/instructure/instructure-ui/releases).
1. Verify that the release was published to npm by running `yarn info [package]@[version]`.
1. Verify that the [documentation was updated](https://instructure.design/).
