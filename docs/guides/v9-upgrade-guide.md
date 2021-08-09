---
title: Upgrade Guide for Version 9.0
category: Guides
order: 99
---

# Upgrade Guide for Version 9

> Note: This is a work in progress document, it will be final when version 9 is released.

Please read this guide carefully if you plan to update your app to this release.

We recommend upgrading your application for each major version gradually, e.g. if you plan to update from 7.x to 9.x, then migrate first to 8.x and then to version 9.

### Removal of deprecated packages and components

The following deprecated components are removed in v9:

- [ComponentIdentifier](#ComponentIdentifier), [DateTime](#DateTime): These components have been removed because they are not used by InstUI and other Instructure projects. If you need it, just copy & paste their code.

- InstUI-CLI's `create-app`, `create-component` and `create-package` commands: Just follow the instructions in the [usage](#usage) docs. Also, the `template-component`, `template-app` and `template-app` packages have been removed.
