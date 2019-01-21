## __examples__

Tools to work with `.examples` files for React components.

### Local Development

As you develop, you can run an application that displays component examples, documented via a `.examples.js` file in the
`__examples__` directory for each component.

From the root of the `instructure-ui` repo:

1. Run `yarn`
1. Run `yarn dev:examples`
1. [http://localhost:9090](http://localhost:9090) should open automatically in your browser


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
