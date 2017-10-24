---
describes: Breadcrumb
---

Change the `size` prop to control the font-size of the breadcrumbs
(default is `medium`).

Long breadcrumb text will be automatically truncated, ensuring the
breadcrumb list always remains on a single line. Note also the `margin` prop
used to add space around the breadcrumb list.

```js
---
example: true
---
<div>

  <Breadcrumb size="small" label="You are here:" margin="none none medium">
    <BreadcrumbLink href="https://instructure.github.io/instructure-ui/">English 204</BreadcrumbLink>
      <BreadcrumbLink
        onClick={function () {
          console.log("This BreadcrumbLink was clicked!")
        }}
      >
        Exploring John Updike
      </BreadcrumbLink>
    <BreadcrumbLink href="https://instructure.github.io/instructure-ui/">The Rabbit Novels</BreadcrumbLink>
    <BreadcrumbLink>Rabbit Is Rich</BreadcrumbLink>
  </Breadcrumb>
  <Breadcrumb label="You are here:" margin="none none medium">
    <BreadcrumbLink href="https://instructure.github.io/instructure-ui/">English 204</BreadcrumbLink>
      <BreadcrumbLink
        onClick={function () {
          console.log("This BreadcrumbLink was clicked!")
        }}
      >
        Exploring John Updike
      </BreadcrumbLink>
    <BreadcrumbLink href="https://instructure.github.io/instructure-ui/">The Rabbit Novels</BreadcrumbLink>
    <BreadcrumbLink>Rabbit Is Rich</BreadcrumbLink>
  </Breadcrumb>
  <Breadcrumb size="large" label="You are here:">
    <BreadcrumbLink href="https://instructure.github.io/instructure-ui/">English 204</BreadcrumbLink>
      <BreadcrumbLink
        onClick={function () {
          console.log("This BreadcrumbLink was clicked!")
        }}
      >
        Exploring John Updike
      </BreadcrumbLink>
    <BreadcrumbLink href="https://instructure.github.io/instructure-ui/">The Rabbit Novels</BreadcrumbLink>
    <BreadcrumbLink>Rabbit Is Rich</BreadcrumbLink>
  </Breadcrumb>
</div>
```

If you don't provide an href to `BreadcrumbLink`, it will render as text.

```js
---
example: true
---
<Breadcrumb label="You are here:">
  <BreadcrumbLink href="https://instructure.github.io/instructure-ui/">Course A</BreadcrumbLink>
  <BreadcrumbLink href="https://instructure.github.io/instructure-ui/">Modules</BreadcrumbLink>
  <BreadcrumbLink>A Great Module</BreadcrumbLink>
</Breadcrumb>
```
