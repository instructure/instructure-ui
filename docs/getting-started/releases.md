---
title: Releases
category: Getting Started
order: 8
---

> Note: This information is for maintainters

## Releases

Every commit that has functional changes to the `master` branch constitutes as a relase. Ther release process is the following:
- When the code you want to add is ready on your branch you should open a pull request. 
- Wait for the pull request to be reviewed and watch any Github notifications about issues/comments by the maintainers.
- Run `yarn bump` to increase the version automatically based on the commits.
    - If the code to be merged contains a breaking change, it will result in a major version increase.
    - If the change is new functionality, it will result in a minor version increase.
    - Bugfixes, performance changes and pure refactorings will result in a patch release.
- `git push` the new release script
- Review the changes
- Rebase the code into the `master` branch. Jenkins will detect that there is a new version and will update the documentation and publish the new `npm` package.
