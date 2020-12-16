# packaging-test

This tool emulates a consumer of `@instructure/` packages for the purpose of
testing our packaging process -- locally and without publishing to NPM. We do
this through the use of a local NPM registry and Lerna.

## Usage

Run a [Verdaccio] container:

    docker run -it --rm --name verdaccio -p 4873:4873 verdaccio/verdaccio

BACK UP your ~/.npmrc! In fact, I recommend that you use a blank ~/.npmrc for
this in order to avoid accidentally publishing to the official NPM registry.

Visit http://localhost:4873 to verify the registry is running and create a user:

    npm adduser --registry http://localhost:4873

This will log you in in ~/.npmrc, this is what mine looked like:

    //localhost:4873/:_authToken="redacted=="

You should now be ready to publish through Lerna (from `instructure-ui/` root):

    lerna publish --skip-git --registry=http://localhost:4873 patch

Although we told it to `--skip-git`, Lerna will still touch some files, so be
sure not to commit them...

    Changes not staged for commit:
      (use "git add <file>..." to update what will be committed)
      (use "git restore <file>..." to discard changes in working directory)
        modified:   lerna.json
        modified:   packages/__docs__/package.json
        modified:   packages/__examples__/package.json

Once you've published a new version, wipe out `node_modules/` in this folder and
reinstall so that NPM picks up the latest (or do `npm update` like a champion):

    rm -rf ./node_modules && npm install

Verify that Webpack can bundle our packages:

    npx webpack --entry=$PWD/src/index.mjs

Verify that Node can import our packages:

    node src/index.mjs

???

[Verdaccio]: https://verdaccio.org/docs/en/docker
