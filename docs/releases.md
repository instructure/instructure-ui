---
title: Releases
category: Contributing
order: 5
---

## Releases

### Release branches

There are two active branches: `master`, and `stable`.

All development is off of the `master` branch, so in general, changes land on `master` first,
and fixes are applied to `stable` by cherry picking them from `master`.

All stable releases should be run off of the `stable` branch (see below).

```text
master: A - B
```

At the beginning of each cycle (when we decide we're ready to publish a major release), the
`stable` branch is set to the HEAD commit of the `master` branch.


```text
master: A - B
             \
stable:       .
```

At this point `master` and `stable` branches point to the same
commit.

All regular work will keep going on the `master` branch:

```text
master: A - B - C - D
             \
stable:       .
```

We might determine that a commit (E) should be back-ported to the
`stable` branch (E').

At this point `stable`'s history has diverged from `master`:

```text
master: A - B - C - D - E - F
             \
stable:       . - E'
```

### Major Release Process

Before beginning you will need:

- Permissions to write/push to the `stable` branch.

To promote `master` to `stable` prior to running a major release:

1. Run `git fetch origin --tags`.
1. Run `git checkout -B stable --track origin/stable`.
1. Run `git merge origin/master --ff-only` to merge in the changes from the remote `master` branch.
1. Run `yarn test` and make sure there are no test or lint failures due to the merge.
1. Run `git push origin stable` to update the remote `stable` branch.


### Stable (Major, Minor, Patch) Release Process

Before beginning you will need:

- Permissions to publish to the instructure org on npm and have run `npm login --scope=@instructure`.
- Write/push permissions to `gh-pages` branch in the instructure-ui Github repository.
- A local `stable` branch:

1. Run `git fetch origin --tags`.
1. Run `git checkout -B stable --track origin/stable`.

A. To back-port a commit to the `stable` branch (E' and I' below):

1. `git cherry-pick` the commit from the `master` branch.
1. Push up the cherry-picked commit for review and testing: `git push origin HEAD:refs/for/stable`
1. Merge the commit into the `stable` branch.

B. To bump the package versions for a stable release (G^ and J^ below):

1. Run `yarn bump` to update the package version.
1. If necessary, manually update the CHANGELOG.md file to add any additional information about the release.
1. Push up the version bump commit for review and testing: `git push origin HEAD:refs/for/stable`
1. Merge the bump commit into the `stable` branch.

C. To create a stable release:

1. Run `yarn release -t latest` to publish the packages and git tag the release (vX.0.0 and vX.0.1 below).
1. Verify that the release was tagged in Github and released to npm by running `yarn info [package]@[version]`.
1. Verify that the documentation was updated on gh-pages.
1. Run `yarn bump -v X.0.0` on the `master` branch to update the package.json files, and copy the changes to CHANGELOG.md from the `stable` branch.

Here G^ is the version bump commit for the major release, vX.0.0, and J^ is the version bump commit for a
patch release, vX.0.1, (which includes the bug fix commit I').

```text
master: A - B - C - D - E - F - G^' - H - I - J^'
             \
stable:       . - E' - G^ - I' - J^
                       |         |
(vX.0.0):              .         |
                                 |
(vX.0.1):                        .
```


### Dev (Pre) Releases

Before beginning you will need:

- Permissions to publish to the instructure org on npm and have run `npm login --scope=@instructure`.

To create a dev release:

1. Make sure you've checked out the branch you want to release
1. Run `yarn release -t dev`.
1. Enter a version with the 'dev' flag when the script asks for it (e.g. X.Y.0-dev.1)
1. Verify that the release was tagged in Github and released to npm by running `yarn info [package]@[version]`.



### Patching Older Releases

If the `stable` branch has already been updated in preparation for a major release,
you may have to create a temporary patch branch to patch in a bug fix for an older
release.

Before beginning you will need:

- Permissions to publish to the instructure org on npm and have run `npm login --scope=@instructure`.
- Permissions to create remote branches if the release branch isn't already set up (see A below).

A. To set up a branch for a patch release (e.g. 1.4.1 when the `stable` branch is already at 2.0.0):

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
1. From the local release branch (steps B (1, 2) above) run `yarn release -t stable` (Note: if it's the latest stable release run `yarn release -t latest` instead).
1. Verify that the release was tagged in Github and released to npm by running `yarn info [package]@[version]`.
