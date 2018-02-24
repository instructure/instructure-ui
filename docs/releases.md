---
title: Releases
category: Contributing
order: 5
---

## Releases

### Release branches

There are two active branches: `master`, and `beta`.

In general, changes land on `master` first, and fixes to `beta`
are applied by cherry picking from `master`.

```text
master: A - B
```

At the beginning of each cycle (when we decide we're ready to publish a major release), the
`beta` branch is set to the HEAD commit of the `master` branch.


```text
master: A - B
             \
beta:         .
```

At this point `master` and `beta` branches point to the same
commit.

All regular work will keep going on the `master` branch:

```text
master: A - B - C - D
             \
beta:         .
```

We might determine that a commit (E) should be back-ported to the
`beta` branch (E').

At this point `beta`'s history has diverged from `master`:

```text
master: A - B - C - D - E - F
             \
beta:         . - E'
```

### Promoting the `master` branch to `beta`

Before beginning you will need:

- Permissions to write/push to the `beta` branch.

To promote `master` to `beta`:

Important: the following should only be run when we're ready to release any un-released
breaking changes that are in the `master` branch.

1. Run `git fetch origin --tags`.
1. Run `git checkout -B beta --track origin/master` to point the `beta` branch to `master`.
1. Run `git merge origin/beta` to preserve the release tags/history.
1. Run `git push -f origin beta` to update the remote `beta` branch.


### Beta Release Process

Before beginning you will need:

- Permissions to publish to the instructure org on npm and have run `npm login --scope=@instructure`.
- A local `beta` branch:

1. Run `git fetch origin --tags`.
1. Run `git checkout -B beta --track origin/beta`.

To create a beta release:

1. Run `yarn release -t beta`.
1. Enter a version with the 'beta' flag when the script asks for it (e.g. X.0.0-beta.1)
1. Verify that the release was tagged in Github and released to npm.

```text
master: A - B - C - D - E - F
             \
beta:         . - E'
                  |
(vX.0.0-beta.1)   .
```


### Major, Minor, Patch Release Process

Before beginning you will need:

- Permissions to publish to the instructure org on npm and have run `npm login --scope=@instructure`.
- Write/push permissions to `gh-pages` branch in the instructure-ui Github repository.
- A local `beta` branch:

1. Run `git fetch origin --tags`.
1. Run `git checkout -B beta --track origin/beta`.

A. To back-port a commit to the `beta` branch (E' and I' below):

1. `git cherry-pick` the commit from the `master` branch.
1. Push up the cherry-picked commit for review and testing: `git push origin HEAD:refs/for/beta`
1. Merge the commit into the `beta` branch.

B. To bump the package versions for a stable release (G^ and J^ below):

1. Run `yarn bump` to update the package version.
1. If necessary, manually update the CHANGELOG.md file to add any additional information about the release.
1. Push up the version bump commit for review and testing: `git push origin HEAD:refs/for/beta`
1. Merge the bump commit into the `beta` branch.

C. To create a stable release:

1. Run `yarn release -t latest` to publish the packages and git tag the release (vX.0.0 and vX.0.1 below).
1. Verify that the release was tagged in Github and the packages released to npm.
1. Verify that the documentation was updated on gh-pages.
1. `git cherry-pick` the version bump commit (G^' and J^' below) onto the `master` branch.

Here G^ is the version bump commit for the major release, vX.0.0, and J^ is the version bump commit for a
patch release, vX.0.1, (which includes the bug fix commit I').

```text
master: A - B - C - D - E - F - G^' - H - I - J^'
             \
beta:         . - E' - G^ - I' - J^
                  |    |         |
(vX.0.0-beta.1)   .    |         |
                       |         |
(vX.0.0):              .         |
                                 |
(vX.0.1):                        .
```


### Dev Releases

Before beginning you will need:

- Permissions to publish to the instructure org on npm and have run `npm login --scope=@instructure`.

To create a dev release:

1. Make sure you've checked out the branch you want to release
1. Run `yarn release -t dev`.
1. Enter a version with the 'dev' flag when the script asks for it (e.g. X.Y.0-dev.1)
1. Verify that the release was tagged in Github and released to npm.

```text
master: A - B - C - D - E - F - G^' - H - I - J^' - K
             \                                      |
beta:         . - E' - G^ - I' - J^                 |
                  |    |         |                  |
(vX.0.0-beta.1)   .    |         |                  |
                       |         |                  |
(vX.0.0):              .         |                  |
                                 |                  |
(vX.0.1):                        .                  |
                                                    |
(vX.Y.0-dev.1)                                      .
```


### Patching Older Releases

Before beginning you will need:

- Permissions to publish to the instructure org on npm and have run `npm login --scope=@instructure`.
- Permissions to create remote branches if the release branch isn't already set up (see A below).

A. To set up a branch for a patch release (e.g. 1.4.1 when the `beta` branch is already at 2.0.0):

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
1. From the local release branch (steps B (1, 2) above) run `yarn release -t stable`.
1. Verify that the release was tagged in Github and released to npm.
