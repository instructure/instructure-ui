To release a new version of the library, follow these steps:

1. Run `npm run bump` to update the package version and push it up to gerrit for review.
2. Once the updated package.json file is merged, take note of the commit SHA for that commit and run `npm run release`

The `npm run release` script should add the tags for the release, update the `latest` branch, run `npm publish`
and finally publish the docs app to github pages.
