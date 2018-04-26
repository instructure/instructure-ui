---
title: Releases
category: Contributing
order: 5
---

## Releases


### Stable (Major, Minor, Patch) Release Process

Before beginning you will need:

- Permissions to publish to the instructure org on npm.
- Write/push permissions to `gh-pages` branch in the instructure-ui Github repository.
- Set up a `.env` file with your Github and Npm account information (see `.env.example`).

A. To bump the package versions in preparation for a stable release:

1. Run `git fetch origin --tags`.
1. Run `git checkout -B your_local_release_branch --track origin/master`.
1. Run `yarn bump` to update the package version.
1. If necessary, manually update the CHANGELOG.md file to add any additional information about the release.
1. Push up the version bump commit for review and testing: `git push origin HEAD:refs/for/master`
1. Merge the bump commit into the `master` branch.

B. To create a stable release after the bump commit is merged:

1. Run `git fetch origin --tags`.
1. Run `git checkout -B your_local_release_branch --track origin/master`.
1. Run `yarn release -t latest` to publish the packages and git tag the release.
1. Verify that the release was tagged in Github and released to npm by running `yarn info [package]@[version]`.
1. Verify that the documentation was updated on gh-pages.


### Dev Releases

Before beginning you will need:

- Permissions to publish to the instructure org on npm.
- Set up a `.env` file with your Github and Npm account information (see `.env.example`).

To create a dev release:

1. Make sure you've checked out the branch you want to release
1. Run `yarn release -t dev`.
1. Enter a version with the 'dev' flag when the script asks for it (e.g. X.Y.0-dev.1)
1. Verify that the release was released to npm by running `yarn info [package]@[version]`.


### Patching Older Releases

Before beginning you will need:

- Permissions to publish to the instructure org on npm.
- Permissions to create remote branches if the release branch isn't already set up (see A below).
- Set up a `.env` file with your Github and Npm account information (see `.env.example`).

A. To set up a branch for a patch release (e.g. 1.4.1 when the `master` branch is already at 2.0.0):

1. Run `git fetch origin --tags` to pull down the remote branches and tags.
1. Make a new local branch for the release based on the release tag: `git checkout v1.4.0 -b patch/release-v1.4.x`
1. Create the remote branch: `git push origin patch/release-v1.4.x:patch/release-v1.4.x`

B. To add a change to the patch release (e.g. 1.4.1):

1. `git fetch origin --tags`
1. Checkout the patch release branch locally: `git checkout origin/patch/release-v1.4.x --track`
1. `git cherry-pick` the change from the `master` branch after it's been merged.
1. Push the change: `git push origin HEAD:refs/for/patch/release-v1.4.x`
1. Review the new commit, test it and merge it to the remote release branch.

C. To create the patch release commit (e.g. 1.4.1):

1. From the local release branch (steps B (1, 2) above), run `yarn bump`.
1. Check that the CHANGELOG.md file was updated correctly and that the new version number is changed to 1.4.1.
1. Push the version bump commit for review: `git push origin HEAD:refs/for/patch/release-v1.4.x`
1. Review the version bump commit, test it and merge it.

D. To run the patch release:

1. From the local release branch (steps B (1, 2) above) run `yarn release -t stable`.
1. Verify that the release was tagged in Github and released to npm by running `yarn info [package]@[version]`.
