## Instructure UI showcase and documentation app

This folder contains the source code for the app that runs at [instructure.design](https://instructure.design/).

### Usage

From the root of the `instructure-ui` repo:

1. Run `pnpm install`
1. Run `pnpm run dev`
1. Open [http://localhost:9090](http://localhost:9090) in your browser

### Verbose dev logging

`pnpm run dev` keeps the startup output minimal (a doc-build progress bar, then a
single "Dev server ready" summary). For debugging — e.g. to see which file the
doc build is stuck on, or webpack's full per-asset/module breakdown — run:

```sh
pnpm run dev:verbose
```

This is equivalent to `DOCS_VERBOSE=1 pnpm run dev`, which also works directly.
