---
title: Release process
category: Contributor Guides
order: 5
---

## Release Process for Minor Updates

This document outlines the steps required for the release process. Please follow the instructions below:

##### 1. Checkout to Master

```text
---
type: code
---
git checkout master
```

##### 2. Create a New Branch for Release

- The branch should be created from the latest master. (note: if a local branch named `release` already exists, delete it beforehand)

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
HUSKY=0 git commit --amend
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

##### 10. Add a New Release to GitHub

- Add a new release to GitHub. This will display the newly released version as the latest and automatically triggers a Slack notification.

## Release Process for Legacy Versions

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

## Release Process for Major updates

Major version updates are very similar to minor updates but there are a couple additinal things to take care of.

##### 1. Create a maintenance branch

Before the update, create a maintenance branch from the current master and push it to remote. If the current major version is 11, then:

```text
---
type: code
---
git checkout -b v11_maintenance
git push origin v11_maintenance
```

##### 2. Update the version mapping for the docs

Update the fields in the file `./packages/__docs__/versions.json` with the latest version and the maintenance branch map. Remove old unsupported versions if they are no longer needed and you don't want them to appear in the docs page version selector.

##### 3. Add redirect for the legacy docs

Add a new line to the file `./packages/__docs__/_redirects` to redirect the legacy docs. If the current major version is 11, then:

```text
---
type: code
---
/v11/* https://v11--preview-instui.netlify.app/:splat 200
```

##### 4. Update version references in the docs app

1. In `docs/getting-started/usage.md` update the version in the code snippet for `package.json`
2. In `packages/__docs__/src/Hero/index.tsx` update the url and title of the Upgrade Guide button 
3. In `packages/__docs__/src/Hero/index.tsx` update the url and title of the Upgrade Guide link in the "What's new?" section
4. In `packages/__docs__/src/CodeSandboxButton/index.tsx` update the `@instructure/` dependencies to the latest version

##### 5. Do a release like it was a minor update

Follow the same process as it's described above. The `npm run bump` command should automatically recognise that there were a breaking commit and it should be a major version change.
