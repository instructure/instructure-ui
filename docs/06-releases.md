To release a new version of the library, follow these steps:

1. Run `npm run bump:major`, `npm run bump:minor` or `npm run bump:patch` to update the package version. If you need to specify a version (e.g. for a beta release) you can run `npm run bump` and enter a version.
2. Update the [release notes](#release-notes) (this is a manual step for now). Run `git commit --amend` to add it to the version bump commit.
3. Push up the version bump commit to gerrit for review and testing.
4. Once the updated package.json file is merged, run `npm run release`
5. Verify that the documentation was updated on gh-pages.

