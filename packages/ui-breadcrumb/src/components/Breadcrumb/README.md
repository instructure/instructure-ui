---
describes: Breadcrumb
---

Breadcrumbs enable users to quickly see their location within a path of navigation. Change the `size` prop to control the font-size of the breadcrumbs
(default is `medium`).

Long breadcrumb text will be automatically truncated, ensuring the
breadcrumb list always remains on a single line. The `margin` prop can be
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
  <View as="div" width="40rem">
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
  </View>
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
### Guidelines

```js
---
guidelines: true
---
<Guidelines>
  <Figure recommendation="yes" title="Do">
    <FigureItem>Place Breadcrumb near the top of the page</FigureItem>
    <FigureItem>Show hierarchy, not history</FigureItem>
    <FigureItem>Keep Breadcrumb titles short but descriptive</FigureItem>
  </Figure>
  <Figure recommendation="no" title="Don't">
    <FigureItem>Use Breadcrumb if you are taking users through a multi-step process</FigureItem>
  </Figure>
</Guidelines>
```

