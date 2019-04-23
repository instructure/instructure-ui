---
title: Releases
category: Contributing
order: 6
---

## Releases


### Stable (Major, Minor, Patch) Release Process

__To bump the package versions in preparation for a stable release:__

1. Run `git checkout -B your_local_release_branch --track origin/master`.
1. Run `yarn bump` to update the package version.
1. If necessary, manually update the CHANGELOG.md file to add any additional information about the release.
1. Push up the version bump commit for review and testing: `git push origin HEAD:refs/for/master`
1. Merge the bump commit into the `master` branch and wait for the post-merge CI build to complete the release.*
1. Verify that the release was [tagged in Github](https://github.com/instructure/instructure-ui/releases).
1. Verify that the release was published to npm by running `yarn info [package]@[version]`.
1. Verify that the [documentation was updated](https://instructure.design/).

__To manually run the release:__

You shouldn't need to do this, as new releases are published automatically by the post-merge CI build. If you're sure, read on:

> __Before beginning you will need:__
> - Permissions to publish to the instructure org on npm.
> - Set up a `.env` file with your Gerrit and npm account information (see `.env.example`).

1. Run `git checkout -B your_local_release_branch --track origin/master`.
1. Run `yarn release` to publish the packages and git tag the release.


### Pre-releases

RC pre-releases are run for every commit merged to the master branch as part of the CI build. However, if you need to run a pre-release manually, follow the instructions below.

> __Before beginning you will need:__
> - Permissions to publish to the instructure org on npm.
> - Set up a `.env` file with your Github and npm account information (see `.env.example`).

__To create a pre-release:__
1. Make sure you've checked out the branch/commit you want to release
1. Run `yarn release -t your_npm_tag_here`. (Note the tag option here!!)
1. Verify that the release was published to Npm by running `yarn info [package]@[version]`.


### Patching Older Releases

> __Before beginning you will need:__
> - Permissions to publish to the instructure org on npm.
> - Permissions to push to the stable branch in Gerrit.
> - Set up a `.env` file with your Github and npm account information (see `.env.example`).

A. __To update the stable branch for a patch release__ (e.g. 1.4.1 when the `master` branch is already at 2.0.0):

1. Make a new local stable branch: `git checkout origin/stable --track`
1. Merge in the latest release tag into the stable branch: `git merge v1.4.1`
1. Update the remote stable branch: `git push origin stable`

B. __To add a change to the patch release:__

1. Checkout the patch release branch locally: `git checkout origin/stable --track`
1. `git cherry-pick` the change from the `master` branch after it's been merged.
1. Push the change: `git push origin HEAD:refs/for/stable`
1. Review the new commit, test it and merge it to the remote stable branch.

C. __To create the patch release commit:__

1. Checkout the stable branch locally: `git checkout origin/stable --track`.
1. Run `yarn bump`.
1. Check that the CHANGELOG.md file was updated correctly and that the new version number is changed to 1.4.1.
1. Push the version bump commit for review: `git push origin HEAD:refs/for/stable`
1. Review the version bump commit, test it and merge it.

D. __To run the patch release:__

1. Checkout the stable branch locally: `git checkout origin/stable --track`.
1. Run `yarn release -t patch`. (Note the tag option here--this is important if the latest release is already the next major version.)
1. Verify that the release was [tagged in Github](https://github.com/instructure/instructure-ui/releases).
1. Verify that the release was published to Npm by running `yarn info [package]@[version]`.
