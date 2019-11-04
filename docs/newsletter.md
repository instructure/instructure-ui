---
title: Newsletter
parent: index
id: Newsletter
---

## November 4, 2019

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
