
# Server side rendering (SSR)

**InstUI works under SSR with no SSR-specific setup.** Set up
[InstUISettingsProvider](/#InstUISettingsProvider) as you would in any app and
render — there is nothing extra to configure, and no per-component opt-in.

The rest of this page is the small number of cases where you do need to act.

## Why it works

Many components need an id for an element you never name: the target of an
`aria-describedby`, the `<title>` inside an SVG, the panel a tab controls.
InstUI generates those with React's built-in
[`useId`](https://react.dev/reference/react/useId), which produces the same
value for the same position in the React tree on the server and on the client,
so the server HTML and the hydrated tree agree.

Generated ids look like `ComponentName___token`, e.g. `FormFieldLayout___r7`.
The token is the `useId` value with React's delimiters (`:r0:` on React 18,
`«r0»` on React 19) stripped, so the id is always valid in a CSS selector. If
you pass your own `id` prop, yours is used and nothing is generated.

## Remove `instanceCounterMap` if you have one

Before ids came from `useId`, InstUI counted component instances in a shared map,
and earlier versions of this guide asked you to pass an `instanceCounterMap` to
`InstUISettingsProvider` to keep server and client ids aligned. **That map is no
longer read.** If you still pass one it is ignored — delete it.

| Deprecated                                                    | Replacement                                   |
| ------------------------------------------------------------- | --------------------------------------------- |
| `instanceCounterMap` prop on `DeterministicIdContextProvider` | none needed — remove the prop                 |
| `DeterministicIdContext`                                      | none needed — ids no longer come from context |
| `generateId` from `@instructure/ui-utils`                     | `useDeterministicId` / `withDeterministicId`  |

These are still exported for backwards compatibility and will be removed in the
next major version.

## Multiple React roots on one page

`useId` guarantees uniqueness **within a single React root**. If a page mounts
two or more independent roots — a micro-frontend layout, a widget embedded in a
legacy page, or a [module federation](/#module-federation) host and guest — each
root numbers its ids from scratch, so the roots can collide.

This is the one case that needs your action. Give each root a distinct
`identifierPrefix`, and pass the matching prefix to the server renderer so both
sides agree:

```javascript
---
type: code
---
// server
renderToPipeableStream(<GuestApp />, { identifierPrefix: 'guest-' })

// client
hydrateRoot(document.getElementById('guest'), <GuestApp />, {
  identifierPrefix: 'guest-'
})
```

The same option exists on `createRoot` for client-only roots.

## Next.js App Router

`InstUISettingsProvider` uses React context, so with the App Router it has to
live in a client component. Mark the layout that renders it with `'use client'`:

```javascript
---
type: code
---
// app/layout.tsx
'use client'
import { InstUISettingsProvider, canvas } from '@instructure/ui'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <InstUISettingsProvider theme={canvas}>
        <body>{children}</body>
      </InstUISettingsProvider>
    </html>
  )
}
```

With the Pages Router, render the provider in `pages/_app.js` instead; no
`'use client'` is involved.

## Building your own components

If you write components on top of InstUI, generate ids with the same utilities
rather than rolling your own, and they will be SSR-safe too.

In function components, use the `useDeterministicId` hook and call the returned
function **during render**:

```javascript
---
type: code
---
import { useDeterministicId } from '@instructure/ui-react-utils'

const MyComponent = () => {
  const getId = useDeterministicId('MyComponent')
  const id = getId()
  const messagesId = getId('MyComponent-messages')

  return (
    <div id={id} aria-describedby={messagesId}>
      <span id={messagesId}>Helpful text</span>
    </div>
  )
}
```

Call it more than once with different `instanceName` values to derive several
distinct, stable ids from one component instance. In class components, the
`withDeterministicId` decorator injects a `deterministicId` prop with the same
signature.

Three things break hydration, all of them avoidable:

- **Random or time-based ids during render.** `Math.random()`, `Date.now()` and
  `uid()` from `@instructure/uid` return a different value on the server than on
  the client, and a new one on every re-render — so any `aria-*` attribute
  pointing at the id silently re-points. Use `uid()` only for client-side
  identifiers that never reach the rendered markup.
- **Assigning ids in `useEffect`.** This dodges the hydration warning by
  rendering the attribute as `undefined` first, but then the server HTML has no
  id at all, and assistive technology reading the page before hydration finds a
  dangling `aria-describedby`.
- **Counting renders.** An id from a counter that advances once per render pass
  cannot match between a server render and a client render.


