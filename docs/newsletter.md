---
title: Newsletter
parent: index
id: Newsletter
---

## May 2020

### Version 7.0 is here!

Happy Spring, InstUIers. After the past two months we've been through, I think we've all earned some warmer weather. Now that things are returning to normal-ish here at Instructure (after an amazing effort to welcome a lot of new online learners), we can resume publishing these updates on a regular basis.

**And we're coming back with a bang: As you might have noticed, we've just released Instructure UI 7.0!** The 7.0 upgrade positions the library for future improvements and better ongoing maintainability:

* Simplified organizational structure with individual packages for each component
* React 15 no longer supported
* Internet Explorer 11 no longer supported
* Simplified build output (ES modules only)
* A new look for our docs
* A few component updates

### Upgrading to 7.0

#### Most changes have codemods...
With version 7, almost every component has been moved to its own package to eliminate circular dependencies between packages and make the codebase more organized. We moved a lot of stuff around, but the good news is that fixing the vast majority of breaking changes in this release is a simple matter of updating component import paths. And the even better news is that codemods can do this busy work for you.

Use the following command in your repo root to automate the import path updates:

`npx @instructure/instui-cli codemod --scope-modifications imports`

You'll be given the option to migrate your component import paths to individual component packages OR `@instructure/ui`.

**Wait, what’s `@instructure/ui?`** Version 7 introduces a new package, `@instructure/ui`, that includes all Instructure UI components. Using this "universal" package means that your app no longer has to worry about what packages components live in. Yay! But if you choose to update your imports to `@instructure/ui` when you run the codemods, you'll want to make sure you have tree shaking configured to keep your bundle size down.

[Codemod documentation can be found here.](#ui-codemods)

#### ...but some changes don't
For the few breaking changes that weren't possible to codemod, [we've prepared a guide](#v7-upgrade-guide) that details how to handle each upgrade:
* `ui-forms/Select` has been removed. [Upgrade to `SimpleSelect`](#v7-upgrade-guide/upgrade-guide-for-version-7.0-select).
* `ui-forms/DateInput` has been removed. [Upgrade to `ui-date-input/DateInput`](#v7-upgrade-guide/#upgrade-guide-for-version-7.0-dateinput).
* `ui-forms/DateTimeInput` has been removed. [Replace with a combination of `DateInput` & `TimeSelect`](#v7-upgrade-guide/upgrade-guide-for-version-7.0-datetimeinput).
* `ui-elements/Table` has been removed. [Upgrade to `ui-table/Table`](#v7-upgrade-guide/#upgrade-guide-for-version-7.0-table).

#### Goodbye to old friends (and one frenemy)

##### Internet Explorer
We'll start with the frenemy. With version 7, Instructure UI lightens its load by dropping support for Internet Explorer 11. (As a point of reference, Development of IE came to an end in 2015, and Instructure's Canvas LMS software dropped support back in August 2019.) Not having to make the library backwards-compatible with an outdated, unmaintained browser allows us to remove a lot of polyfill dependencies, opens the door to simpler, more powerful component theming, and greatly speeds up the testing and QA end of things.

##### React 15
Support for React 15 is being dropped in version 7. This move allows us to begin to take advantage of React 16 features (fragments, better error handling, custom DOM attributes, and hooks) that will bring further improvements to the library in the future.

##### Discontinued CommonJS build output
We have discontinued CommonJS build output for components (found in each component package's lib directory). Moving forward, components will only provide ES modules output. This should reduce confusion, provide a single source of truth for build output, along with continued support for tree shaking. Codemods will be provided to transform import paths like this...

`import { Avatar } from '@instructure/ui-avatar/lib/Avatar'`

...into this:

`import { Avatar } from '@instructure/ui-avatar'`

##### DeprecatedAllTheThings
If a component's name on instructure.design began with “Deprecated”, it has been removed in version 7. However, other than the four breaking changes listed in the previous section, all this means is that the component has moved to a new package. Updating will only mean running codemods.

#### We're here to help
We've endeavored to make this major version upgrade as painless as possible. If you run into any trouble, don't hesitate to reach out [via Github](https://github.com/instructure/instructure-ui), and we'll help get you back on track.

Thanks for using Instructure UI!


## February 2020

### Button upgrades for 8.0
You'll notice some updates to the [Button](#Button) component that shipped with the latest [release](#CHANGELOG). You can read more about the context and reasoning for these changes in the [upgrade guide](##button-upgrade-guide). In short, Button has evolved a lot over the years (being one of the earliest components in the library) and the existing `variant` prop was preventing the flexibility necessary to keep up with the demands of our consumers.

We understand that Button is one of the most frequently used components, so we have done a few things (and are going to do a few more things) to make this upgrade as painless as possible.

#### We are intentionally releasing these changes early
We are yet to release version 7.0. These `Button` changes will not go into effect until version 8.0. This was deliberate. We wanted to give consumers as much time as possible to make these upgrades.

#### The upgraded Button is completely backwards compatible
Until we release version 8.0, `Button` is completely backwards compatible with previous props and theme variables. That means after upgrading to version 6.18.0, you should see no differences with your existing Button components. All props and theme variables applied should work exactly as they did before (though you will see some warnings helping you to know what needs updating, more on that later). If you do see any differences, let us know and we will push out a patch ASAP.

#### We created an exhaustive upgrade guide to help with changes
This [upgrade guide](##button-upgrade-guide) details every change you will need to make. It also includes example code for each possible variant and the upgraded equivalent.

#### We will continue to improve our codemods
Our codemods will work for simple configurations (we have those cases noted in the upgrade guide), but they still have limitations. We're going to look for ways to make them more intelligent to automate these updates where possible.

#### We added an environment variable to de-dupe deprecation warnings
If your application is anything like our documentation, you use [Button](#Button) all over the place. Deprecation warnings have already become quite noisy with the package migrations, with Button added into the mix the volume of those warnings is getting out of control. We know it's not feasible to upgrade everything at once (in fact, that would probably be a bad idea), and we want your console logs to stay clean in the meantime. With that in mind, we now provide an environment variable that will allow you to de-dupe deprecation warnings. You can read more about that in the following section.

### De-dupe deprecation warnings
We want our warnings to be helpful for consumers. Deprecation warnings will help you to stay up to date with the latest API updates and package migrations. However, with so much noise Instructure UI warnings were drowning out everything else in the console and hurting the developer experience. We still want to let you know that there are deprecation warnings, but it is sufficient to inform you of that fact once instead of a hundred times :) We're providing an environment variable that, when set, will warn you a single time that there are deprecation warnings. You can switch that flag off when you are ready to make your upgrades and get the full console output for each warning as you did before.

To de-dupe deprecation warnings, set the following environment variable

```js
OMIT_INSTUI_DEPRECATION_WARNINGS=1
```

We attempted to group all deprecation warnings together so that we could omit them when that flag is set. If you see other warnings that relate to API changes or upgrades, please let us know and we'll submit a patch to group them with the others.

As always, if there are other warnings outside of these that you find too noisy or unhelpful, please reach out. We are looking for ways to improve the developer experience moving forward and would love to have your feedback.

## November 2019

### We're listening
We recently conducted interviews with Instructure engineers to help us understand how InstUI is perceived and where we can improve. Interviews with our product designers are next. However, given the feedback we received from the engineering interviews, we’ve already arrived at one important conclusion (drumroll) &hellip;

### Simplifying 7.0
To make a seasonally appropriate analogy, our 7.0 release was shaping up to be an overstuffed turkey with the potential to cause upgrade constipation. Our intentions were good: 7.0 was going to be our "clean slate" release. Every component would be moved to its own sanely named package to prevent circular dependencies. All prop/API inconsistencies would be surfaced, publicly shamed, and fixed. Components managing their own state? Oh, heck no! They’d be ruthlessly refactored as controlled only.

Whew. That's a lot, right? And speaking with engineers made us appreciate what an upgrade burden the release was shaping up to be. So after that sanity check, here’s what you _can_ expect in the next major release:

* **Each component will move to its own package, but we'll hold off on most API changes until 8.0.** Upgrading to 7.0 will be almost entirely a matter of changing import paths, and we’ll publish codemods to automate as much of this busy work as possible.
* **We are, however, planning to remove the deprecated versions of [Select](#DeprecatedSelect) and [DateInput](#DeprecatedDateInput) in 7.0.** So if you haven't updated those components yet, there will be some API updating involved.
* But before you bust out the pitchforks at the prospect of replacing all those Selects, please note that **we're planning on releasing a Select component with less boilerplate that is closer to a native HTML select.** It will be available before the 7.0 release, so you'll have plenty of time to upgrade before the old Select is removed.
* **7.0 will also introduce a universal InstUI package that includes all the components.** This package makes a lot of sense for larger apps that consume InstUI. Like the simplified Select component, it owes its existence to the developers who suggested it during their interviews (thank you).

### And beyond 7.0?
* New components will be published with props that adhere to our [API guidelines](#api-guidelines).
* New components will be controlled only when it makes sense. However, if it makes the developer experience better for a component to manage some state, we'll do that instead.
* Existing components will be incrementally updated to jive with the API guidelines and manage state sensibly. These updates will only occur in major releases.

### Reacting to React
React 17's coming down the ol' intertubes pretty soon, so we'll be working to purge our library of deprecated lifecycle methods, legacy context, findDOMNode, and other cobwebs (codewebs?). If your app is still using React 15 and InstUI, please [reach out to us](https://github.com/instructure/instructure-ui): While we want to drop 15 as soon as possible, we don't want to break your stuff.
