---
title: Release process
category: Contributor Guides
order: 5
---

# Release Process

This document outlines the steps required for the release process. Please follow the instructions below:

##### 1. Checkout to Master

```text
---
type: code
---
git checkout master
```

##### 2. Create a New Branch for Release

- The branch should be created from the latest master.

```text
---
type: code
---
git checkout -b release
```

##### 3. Run Npm Bump Command

- This will propose new version numbers.

```text
---
type: code
---
npm run bump
```

- Check if the proposed version numbers are correct. If they are, accept them.

##### 4. Check the CHANGELOG.md

- If there's something missing, add it manually.

##### 5. Amend Your Commit

- If you made changes to the CHANGELOG.md, use the commands below to amend your commit.

```text
---
type: code
---
git add .
git commit --amend
```

##### 6. Push Your Changes to Remote

```text
---
type: code
---
git push origin release
```

##### 7. Ask for Review

- Once your changes are pushed, request for review.

##### 8. Merge to Master

- If the reviews and all automated checks are successful, merge your release branch to master.

##### 9. Wait for the Release Process to Succeed

- The release process may take some time, be patient.

##### 10. Announce the Release on Slack

    - Once the release is successful, announce it on the #instui channel on Slack. Be sure to include the changelog and new version in your announcement.

##### 11. Add a New Release to GitHub

    - Finally, add a new release to GitHub. This will display the newly released version as the latest.

##### 12. Release Process for Legacy Versions

This document describes the steps to follow when releasing updates to legacy versions. The example given is for v7:

##### 1. Checkout to the Maintenance Branch

- For example, for v7, check out the `v7_maintenance` branch.

```bash
---
type: code
---
git checkout v7_maintenance
```

##### 2. Create a New Branch for the Release

- The branch should be created from the maintenance branch.

```bash
---
type: code
---
git checkout -b release
```

##### 3. Run Npm Bump Command

- This will propose new version numbers.

```bash
---
type: code
---
npm run bump
```

- Check if the proposed version numbers are correct. If they are, accept them.

##### 4. Check the Changelog

- Amend your commit if necessary.

##### 5. Push Your Changes to Remote

```bash
---
type: code
---
git push origin release
```

##### 6. Request a Review and Wait for Automated Checks

##### 7. Merge to the Maintenance Branch

- After successful reviews and checks, merge your release branch to the maintenance branch.

##### 8. Run the Release Job Manually in GitHub Actions

- The release process may take some time, be patient.

##### 9. Announce the Release

- Once the release is successful, announce it on the #instui channel on Slack. Be sure to include the changelog and new version in your announcement.
