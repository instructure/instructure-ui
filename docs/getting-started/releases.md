---
title: Releases
category: Getting Started
order: 8
---

> Note: This information is for maintainters

## Releases

Every commit that has functional changes to the `master` branch constitutes as a relase. The release process is the following:
- Make a new branch and push your changes there. Use `yarn commit` to commit changes.
- When the code you want to add is ready on your branch you should open a pull request to the `master` branch.
- Wait for the pull request to be reviewed and watch any Github notifications about issues/comments.
- Run `yarn bump` to increase the version automatically based on the commits.
    - If the code to be merged contains a *breaking change*, it will result in a major version increase.
    - If the change is *new functionality*, it will result in a minor version increase.
    - *Bugfixes, performance changes and pure refactorings* will result in a patch release.
- `git push` the new release commit
- Wait for the review of the release commit
- Rebase the code into the `master` branch. Jenkins will detect that there is a new version and will update the documentation and publish the new `npm` package.

### Post-release checks

1. Verify that the release was [tagged in Github](https://github.com/instructure/instructure-ui/releases).
1. Verify that the release was published to npm by running `yarn info [package]@[version]`.
1. Verify that the [documentation was updated](https://instructure.design/).

__To manually run the release:__

You shouldn't have to do this, as new releases are published automatically by the post-merge CI build. If you're sure, read on:

> __Before beginning you will need:__
> - Permissions to publish to the instructure org on npm.
> - Set up a `.env` file with your Gerrit and npm account information (see `.env.example`).
1. Run `git fetch --all --tags`.
1. Run `git checkout -B your_local_branch --track origin/master`.
1. Run `yarn release` to publish the packages and git tag the release.


### Patching Older Releases

> __Before beginning you will need:__
> - Permissions to publish to the instructure org on npm.
> - Permissions to push to the stable branch in Gerrit.
> - Set up a `.env` file with your Github and npm account information (see `.env.example`).
A. __To update the stable branch for a patch release__ (e.g. 1.4.1 when the `master` branch is already at 2.0.0):

1. Run `git fetch --all --tags`.
1. Run `git checkout -B your_local_branch --track origin/stable`.
1. Merge in the latest release tag into the stable branch: `git merge v1.4.1`
1. Update the remote stable branch: `git push origin stable`

B. __To add a change to the patch release:__

1. Run `git fetch --all --tags`.
1. Run `git checkout -B your_local_branch --track origin/stable`.
1. Make the bug fix and commit the changes.
1. Push the change to gerrit for review: `git push origin HEAD:refs/for/stable`
1. Review the new commit, test it and merge it to the remote stable branch.

C. __To create the patch release commit:__

1. Run `git fetch --all --tags`.
1. Run `git checkout -B your_local_branch --track origin/stable`.
1. Run `yarn bump`.
1. Check that the CHANGELOG.md files and version numbers were updated correctly.
1. Push the version bump commit for review: `git push origin HEAD:refs/for/stable`
1. Review the version bump commit, test it and merge it.

D. __To manually run the patch release:__

> __Before beginning you will need:__
> - Permissions to publish to the instructure org on npm.
> - Set up a `.env` file with your Gerrit and npm account information (see `.env.example`).
1. Run `git fetch --all --tags`.
1. Run `git checkout -B your_local_branch --track origin/stable`.
1. Run `yarn release patch`. (Note the tag ('patch') option here--this is important if the latest release is already ahead of the patch release. If not, you can just run `yarn release` or let the CI build handle it.)
1. Verify that the release was [tagged in Github](https://github.com/instructure/instructure-ui/releases).
1. Verify that the release was published to Npm by running `yarn info [package]@[version]`.

E. __Merge the release into the master branch:__

1. Run `git fetch --all --tags`.
1. Run `git checkout -B your_local_branch --track origin/master`.
1. Run `git merge origin/stable`
1. Push the merge commit for review: `git push origin HEAD:refs/for/master`
1. Review the merge commit, test it and merge it.
