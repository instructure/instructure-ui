# Responsive


The `Responsive` component allows for rendering a component differently based on either
the element or the viewport size.

> **A note on performance**: Try to limit children to only content or components that need explicit updates at different breakpoints. Content that can scale on its own does not need to be rendered via Responsive. Similarly, don't overuse Responsive. Using many Responsive instances on a single page can also negatively affect rendering performance.

### Passing props at breakpoints

Breakpoints are defined by the `query` prop. Different props can be
specified for each breakpoint using the `props` prop. These props are passed to the
underlying component via the `Responsive` `render` or `children` props as functions.

The following example using `Avatar` renders as a circle when the element is under 30rem.

```js
---
type: example
---
<Responsive
  query={{ small: { maxWidth: '30rem' }, large: { minWidth: '30rem' }}}
  props={{
    small: { shape: 'circle', size: 'medium' },
    large: { shape: 'rectangle', size: 'x-large' }
  }}
  render={(props, matches) => {
    return (
      <div>
        <Avatar
          {...props}
          name="Kyle Montgomery"
          src={avatarSquare}
        />
      </div>
    )
  }}
/>
```

### Rendering conditionally based on breakpoint matches

The `render` and `children` props also receive an array of names corresponding to the
currently matching queries. These can be used to determine what should be rendered at a
given breakpoint.

```js
---
type: example
---
<Responsive
  match="media"
  query={{
    small: { maxWidth: 600 },
    medium: { minWidth: 600 },
    large: { minWidth: 800}
  }}
>
  {(props, matches) => {
    if (matches.includes('large')) {
      return (
        <Billboard
          message="Large breakpoint"
          hero={<IconUserLine />}
        />
      )
    } else if (matches.includes('medium') && !matches.includes('large')) {
      return (
        <Byline description="Medium breakpoint">
          <Avatar name="Alexander Hamilton" />
        </Byline>
      )
    } else {
      return (
        <Pill color="primary">
          Small breakpoint
        </Pill>
      )
    }
  }}
</Responsive>
```

### Defining multiple breakpoints

Setting up multiple media query breakpoints is supported. You can use 4 breakpoints at the same time: `minWidth`, `maxWidth`, `minHeight`,
`maxHeight`. In the following example, the use of two breakpoints, the `minWidth` and `maxWidth`, are used to render the component with the `medium` label.

**Note:** Overlapping breakpoints for height are not fully supported.

```js
---
type: example
---
<Responsive
  match="media"
  query={{
    small: { maxWidth: 400 },
    medium: { minWidth: 401, maxWidth: 599 },
    large: { minWidth: 600}
  }}
>
  {(props, matches) => {
    if (matches.includes('large')) {
      return (
        <Billboard
          message="Large breakpoint"
          hero={<IconUserLine />}
          style={{ border: '10px solid #aaa' }}
        />
      )
    } else if (matches.includes('medium') && !matches.includes('large')) {
      return (
        <Byline description="Medium breakpoint">
          <Avatar name="Alexander Hamilton" />
        </Byline>
      )
    } else {
      return (
        <Pill color="primary">
          Small breakpoint
        </Pill>
      )
    }
  }}
</Responsive>
```


### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| Responsive | query | `{ [breakpointName: string]: Query }` | Yes | - | Consists of an object where the keys define the names of breakpoints. The values are query objects with keys representing the breakpoint condition and values representing a breakpoint value as a string or number. Ex. `{small: { maxWidth: 400 }, large: { minWidth: '600em'}}` |
| Responsive | match | `'element' \| 'media'` | No | `'element'` | Specifies if the `<Responsive />` component should use element or media queries |
| Responsive | props | `{ [breakpointName: string]: ResponsivePropsObject }` | No | `null` | Consists of an object where the keys match the breakpoint names used in the query. The values are objects with keys representing prop names and values representing prop values Ex. `{small: { myProp: 'fillscreen' }, large: { myProp: 'fillcontainer' }}` |
| Responsive | render | `( props?: ResponsivePropsObject \| null, matches?: QueriesMatching ) => any` | No | - | Function called on render with the following form `(props, matches) => {...}` where the props are the current props to be applied and matches is an array of current matches from the query prop. Either this or a `children` prop function must be supplied. |
| Responsive | children | `( props?: ResponsivePropsObject \| null, matches?: QueriesMatching ) => any` | No | `null` | Function that takes the same form and arguments as the render prop. Either this or a `render` prop function must be supplied. |
| Responsive | display | `'inline' \| 'block' \| 'inline-block' \| 'flex' \| 'inline-flex'` | No | - | The Responsive component is rendered as a `<div>`, so it has `display="block"` by default. You can override the display value with this prop. |
| Responsive | elementRef | `(el: HTMLDivElement \| null) => void` | No | - | A function that returns a reference to root HTML element |

### Usage

Install the package:

```shell
npm install @instructure/ui-responsive
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { Responsive } from '@instructure/ui-responsive'
```

