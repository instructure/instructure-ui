## __examples__

Tools to work with `.examples` files for React components.

### Local Development

As you develop, you can run an application that displays component examples, documented via a `.examples.js` file in the
`__examples__` directory for each component.

From the root of the `instructure-ui` repo:

1. Run `yarn`
1. Run `yarn start:examples`
1. Open [http://localhost:9001](http://localhost:9001) in your browser


### Sketch Asset Generation

[Sketch](https://www.sketchapp.com/) assets for each component can be generated from the component examples that are
displayed in the examples app.

In order to import the components into Sketch, you'll need to first install the `asketch2sketch.sketchplugin` by
downloading [html-sketchapp](https://github.com/brainly/html-sketchapp/archive/master.zip) and copying the
`asketch2sketch.sketchplugin` file into your Sketch `Plugins` directory.

Then to generate the Sketch assets:

1. Run `yarn start:examples` to spin up the examples app on [localhost:9001](http://localhost:9001)
1. Run `yarn generate:sketch` to generate a `stories.asketch.json` file.
1. Once in Sketch, open the "Plugins" menu, select "From *Almost* Sketch to Sketch", and select the
   `packages/__examples__/stories.asketch.json` file.

### Test for Visual Regressions

After committing style changes, you can see if you've caused any unexpected visual regressions:

1. Run `yarn generate:screenshots` to generate the diff images in the `packages/__examples__/__screenshots__` directory.
1. Run `yarn review:screenshots` to spin up an app to review the images.

Note: this compares the HEAD commit to the previous commit, so you'll need to be sure to commit your changes first.
