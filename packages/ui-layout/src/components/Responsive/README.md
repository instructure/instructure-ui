---
describes: Responsive
---

The `Responsive` component allows for rendering a component differently based on either
the element or the viewport size.

### Passing props at breakpoints
Breakpoints are defined by the `query` prop. Different props can be
specified for each breakpoint using the `props` prop. These props are passed to the
underlying component via the `Responsive` `render` or `children` props as functions.

The following example using `Progress` renders as a circle when the element is under 30rem.

```js
---
example: true
---
<Responsive
  query={{ small: { maxWidth: '30rem' }, large: { minWidth: '30rem' }}}
  props={{
    small: { variant: 'circle', size: 'medium' },
    large: { variant: 'bar', size: 'large' }
  }}
  render={(props, matches) => {
    return (
      <div>
        <Progress
          {...props}
          valueNow={80}
          valueMax={124}
          label="Percent complete"
          formatDisplayedValue={function (valueNow, valueMax) {
            return (
              <span>
                <Text size="x-large" weight="bold">{valueNow}</Text>
                <br />
                <Text size="small">of </Text>
                <Text size="small">{valueMax}</Text>
              </span>
            )
          }}
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
          hero={<PlaceholderIcon />}
        />
      )
    } else if (matches.includes('medium') && !matches.includes('large')) {
      return (
        <Media description="Medium breakpoint">
          <Avatar name="Alexander Hamilton" />
        </Media>
      )
    } else {
      return (
        <Pill variant="primary" text="Small breakpoint" />
      )
    }
  }}
</Responsive>
```
