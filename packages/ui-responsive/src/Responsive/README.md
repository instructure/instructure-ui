---
describes: Responsive
---

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
example: true
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
example: true
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
