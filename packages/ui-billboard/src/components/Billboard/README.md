---
describes: Billboard
---
### Static Billboard
Used for empty states, 404 pages, redirects, etc.

```js
---
example: true
---
<Billboard
  size="medium"
  heading="Well, this is awkward."
  message="Think there should be something here?"
  hero={<Img src={placeholderImage(900, 500)} />}
/>
```

### Structure

- If Billboard has an `href` prop set, it will render as a link;
if an `onClick` prop is set, the component will render as a button.
- Use the `message` prop for your link or button text/call to action, and
the `size` prop to adjust the size of the icon and text.
- Pass [Instructure icons](#icons-react) to the `hero` property via a function
_(see examples)_, and they will be sized correctly based on the Billboard's
`size`.

```js
---
example: true
---
<Grid startAt="medium" vAlign="middle">
  <GridRow>
    <GridCol>
      <Billboard
        heading="404"
        message="Billboard is now a button"
        size="small"
        onClick={function () {
          alert('This Billboard was clicked!')
        }}
        hero={(size) => <IconUser.Solid size={size} />}
      />
    </GridCol>
    <GridCol>
      <Billboard
        message="Click this link"
        href="http://instructure.com"
        hero={(size) => <IconGradebook.Line size={size} />}
      />
    </GridCol>
    <GridCol>
      <Billboard
        message="Create a new Module"
        size="large"
        onClick={function () {
          alert('This Billboard was clicked!')
        }}
        hero={(size) => <IconPlus.Line size={size} />}
      />
    </GridCol>
  </GridRow>
</Grid>
```


### Disabled Billboard
```js
---
example: true
---
<Billboard
  size="small"
  heading="This is disabled"
  onClick={function () {
    alert('This Billboard was clicked!')
  }}
  hero={(size) => <IconUser.Solid size={size} />}
  disabled
/>
```
