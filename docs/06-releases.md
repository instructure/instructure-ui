To release a new version of the library, follow these steps:

1. Run `npm version` to update the package version. (see the docs for the [npm version](https://docs.npmjs.com/cli/version) command for more info).
2. Push up the version bump commit to gerrit for review and testing.
3. Once the updated package.json file is merged, run `npm run release`

The `npm run release` script should add the tags for the release, update the `latest` branch, run `npm publish`
and finally publish the docs app to github pages.
