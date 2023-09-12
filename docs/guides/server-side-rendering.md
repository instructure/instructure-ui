---
title: Server side rendering (SSR)
category: Guides
order: 1
---

# SSR with Next.js

This document will demonstrate how to achieve Server Side Rendering (SSR) with [Next.js](https://nextjs.org/) using InstUI components.

> This document assumes that you already have a Next.js application in place.

```javascript
---
embed: true
---
<ToggleBlockquote
  summary="Warning!"
>
  <ToggleBlockquote.Paragraph>
   You should not install the InstUI meta package <code>@instructure/ui</code> since it has components that are not yet Server Side Renderable out of the box.
  </ToggleBlockquote.Paragraph>
  <ToggleBlockquote.Paragraph>
   The <Link href="/#CodeEditor">CodeEditor</Link> component currently relies on browser specific API's, thus it won't work with SSR! (You can still render it with Next.js's <Link target="_blank" href="https://nextjs.org/docs/advanced-features/dynamic-import#with-no-ssr">dynamic</Link> feature while making sure not to render it on the server side.)
  </ToggleBlockquote.Paragraph>
  <ToggleBlockquote.Paragraph>
    <i>Solving this limitation would be a breaking change, so we are planning to do this in the next major version of InstUI (v9).</i>
  </ToggleBlockquote.Paragraph>
  <ToggleBlockquote.Paragraph>
  <strong>You should install only the packages you need!</strong>
  </ToggleBlockquote.Paragraph>
</ToggleBlockquote>
```

#### Initial steps

- install InstUI related dependencies:

```sh
npm install @instructure/emotion @instructure/ui-react-utils
```

- in your Next.js application create - if it does not already exist - a file named `_app.js` inside the `pages` directory. This is a special file in Next.js because it allows you to override/control component initialization. Read more about it in the [Next.js docs](https://nextjs.org/docs/advanced-features/custom-app).

- then configure the `_app.js` so your component tree is wrapped with an `InstUISettingsProvider`
- the important step is to call `generateInstanceCounterMap` on every request, so the server side instance tracking and browser side instance tracking stays in sync with each other:

```js
---
render: false
example: false
---
//pages/_app.js
import React from 'react';
import Head from 'next/head';
import { InstUISettingsProvider } from "@instructure/emotion"
import { generateInstanceCounterMap } from '@instructure/ui-react-utils'

export default function MyApp(props) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
                                               {/* This is the important step */}
      <InstUISettingsProvider instanceCounterMap={generateInstanceCounterMap()}>
        <Component {...pageProps} />
      </InstUISettingsProvider>
    </>
  );
}
```

That is it! You should be ready to go!

#### Notes explaining what is going on with the above code

Keeping track of instances is a way we achieve deterministic `id` generation for components. Since components are being rendered on 2 places (server - client), it is crucial to have the same `ids` attached to the same instances on both the client and server sides.

To achieve deterministic `id` generation InstUI will keep track of every component instance internally, and will use this information to generate `ids` deterministically.
