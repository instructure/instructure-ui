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

- If the code to be merged contains a _breaking change_, it will result in a major version increase.

- If the change is _new functionality_, it will result in a minor version increase.

- _Bugfixes, performance changes and pure refactorings_ will result in a patch release.

- `git push` the new release commit

- Wait for the review of the release commit

- Rebase and Merge the code into the `master` branch. Github will detect that there is a new version and will update the documentation and publish the new `npm` package.

### Post-release checks

1. Verify that the release was [tagged in Github](https://github.com/instructure/instructure-ui/releases).

1. Verify that the release was published to npm by running `yarn info [package]@[version]`.

1. Verify that the [documentation was updated](https://instructure.design/).

### Patching Older Releases

0. You need to branch off from the **last release commit** of the old version and name it `v<major-version> -maintenance`, if it is non existent. E.g. if you'd like to start v6 maintenance branch:

```
//checkout the v6.26.0 commit
git checkout 35258f25cad1e17e5dbe5dcb4389b5185d709f72

//create new branch from it
git checkout -b v6-maintenance
```

1.  Check out the `v<major-version>-maintenance` branch. E.g. for v6:

```
git checkout v6-maintenance
```

2. Open a branch from the maintenance branch
3. Commit your changes to the branch with `yarn commit` **_NOTE: you can not make breaking changes. This is only for minor and patch level changes_**
4. Open a pull request to the maintenance branch
5. If the reviews and checks succeed, update the version: `yarn bump` and push it to the remote
6. Wait for the version bump's review
7. Rebase and Merge the code into the `v<major-version>-maintenance` branch.
8. If you are working on the one before the latest version (E.g. if the latest version is v8, the following applies to v7 only), you have to release your work to `npm` and deploy the docs to `gh-pages` as well. You have to trigger a github action manually on your branch.
   - Go to the [project repo](https://github.com/instructure/instructure-ui)
   - Navigate to actions
   - From the left menu, click `Release older version to npm and deploy docs to legacy gh-pages.`
   - In the right side of the page, select the `Run workflow` dropdown and search for the maintenance branch
   - Run the workflow against the maintenance branch
   - Congrats. Your work is done here
9. If you work on an older version, you only have to release to `npm`, no docs deploy needed
   - Go to the [project repo](https://github.com/instructure/instructure-ui)
   - Navigate to actions
   - From the left menu, click `Release older version to npm only.`
   - In the right side of the page, select the `Run workflow` dropdown and search for the maintenance branch
   - Run the workflow against the maintenance branch
   - Congrats. Your work is done here
