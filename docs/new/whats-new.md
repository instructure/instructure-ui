---
title: What's New?
parent: index
id: WhatsNew
---

## What's New in 6.5.0?

### New InstUI Starter App Generator
We were inspired by the simplicity of spinning up projects using [create React app](https://github.com/facebook/create-react-app), and wanted to provide that same convenience to build apps with Instructure UI. As of the latest release, you can now use `instui-cli` to generate react apps configured with Instructure UI's presets out of the box. This includes settings for webpack, babel, eslint, and postcss. The canvas theme is also already imported for you and ui-themeable is preinstalled with a simple themeable component example. All you have to do is start developing.

```bash
$ npx @instructure/instui-cli create app --name MyInstuiApp
$ cd MyInstuiApp
$ yarn && yarn start
```

For more detailed usage and documentation, hit up the `Quick Start` guide on the [instructure.design](#) homepage.

#### Integration with Codesandbox

[Codesandbox](https://codesandbox.io) makes it easy to share and edit code directly in the browser. All starter apps ship with an `open:sandbox` command which allows you to open your project in codesandbox if it is stored in a public GitHub repository. Fill in the `repository` field in your package.json, push your latest changes, and then do

```bash
$ yarn open:sandbox
```

### Prototyping with Instructure UI

Our starter app and Codesandbox integration emerged from discussions about how we develop
prototypes that can be shared between developers and designers. We needed a system that would
allow us to easily:
* Create prototypes using an Instructure UI development environment
* Share and collaborate on prototypes with developers and designers
* Get a higher fidelity representation of the UX than is possible with static prototyping
* Share the actual interface code demonstrating what Instructure UI components should be used

Codesandbox gave us most of this out of the box. In fact, we initially considered using
it for our entire prototyping workflow. However, as our prototypes became larger Codesandbox
was less performant in the browser. We also found that we preferred to work in our standard
IDEs locally with our typical development configurations. Additionally, we were uncomfortable
placing all the source in Codesandbox. It seemed too far removed from the rest of Instructure
code currently living on GitHub, and we wanted to make sure we still had versioning.

Speaking of GitHub, we discovered that GitHub Codesandbox integrations could offer compelling
solutions to the issues above. With a little scripting we were able to come up with a workflow
that would combine the best of both worlds. Here are some of the key ideas:
* Prototypes with Instructure UI presets can easily be generated using the `instui create app` command
* Prototypes can be edited and run locally in the developer's preferred IDE using their typical tools
* Prototypes are committed to a single GitHub repository
* When we want to share a prototype, we can simply open the GitHub source in Codesandbox (using the `open:sandbox` command mentioned above)
* We can share the Codesandbox link with developers and designers
* Any changes made in Codesandbox during the collaborative stages can be committed back to GitHub using Codesandbox

Even though this workflow is WIP, we're excited about the possibilities. We hope you'll find some of
this useful or at least mildly interesting. Also, if you have ideas or improvements reach out!
We believe that better prototypes will mean better collaboration between engineering and product
design, and ultimately better interfaces for our users.

### AppNav
Many Instructure products appear inside the Canvas chrome &#151; a fancy way of saying that they appear to be part of Canvas to the user. [AppNav](#AppNav) provides a main navigation for these apps that works visually next to Canvas' global navigation. (Having said that, AppNav also works fine as a standalone nav outside of Canvas.)

AppNav's navigation items can render as either links or buttons, and feature a `renderAfter` prop you can use to easily align an element such as a badge with the item's text. AppNav also provides a `renderAfterItems` prop that, you guessed it, renders content after the navigation items (a separate set of action buttons, for example).

> AppNav is currently an experimental component because it is not responsive yet. Once we make the layout responsive, the experimental flag will be removed.

### Select/Selectable/Options

Keeping with our direction of moving to controlled-only components, [Select](#Select) has been rebuilt from the ground up as a *100% controlled component*. Combobox components like Select are used for a myriad of different use cases, and it's very difficult to prescribe functionality that fits every single one. To combat this recurring issue, we thought it best to make only the safest assumptions under the hood of Select and leave the specifics to the consumer.

Select is composed using a number of our other components &#151; most notably [Selectable](#Selectable) and [Options](#Options). Selectable facilitates the creation of combobox widgets, providing the attributes needed to associate an input with a list of selectable options navigable by mouse, keyboard, and screen reader. Selectable was previously released as an experimental component, but is now fully implemented in both DateInput and Select and ready for action.

Options is a component that provides views for a list of interactive list items. We realized this kind of view-only component could help consolidate styles in our existing components, like Select or Menu &#151; and facilitate the creation of new ones as well. Previously, if Select didn't quite fit your use case, you'd probably need to build something completely from scratch. Now, pairing Options and Selectable can provide a great starting point for a custom combobox.
