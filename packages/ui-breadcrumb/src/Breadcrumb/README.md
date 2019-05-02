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
    <Breadcrumb.Link href="https://instructure.github.io/instructure-ui/">English 204</Breadcrumb.Link>
      <Breadcrumb.Link
        onClick={function () {
          console.log("This Breadcrumb.Link was clicked!")
        }}
      >
        Exploring John Updike
      </Breadcrumb.Link>
    <Breadcrumb.Link href="https://instructure.github.io/instructure-ui/">The Rabbit Novels</Breadcrumb.Link>
    <Breadcrumb.Link>Rabbit Is Rich</Breadcrumb.Link>
  </Breadcrumb>
  <View as="div" width="40rem">
    <Breadcrumb label="You are here:" margin="none none medium">
      <Breadcrumb.Link href="https://instructure.github.io/instructure-ui/">English 204</Breadcrumb.Link>
        <Breadcrumb.Link
          onClick={function () {
            console.log("This Breadcrumb.Link was clicked!")
          }}
        >
          Exploring John Updike
        </Breadcrumb.Link>
      <Breadcrumb.Link href="https://instructure.github.io/instructure-ui/">The Rabbit Novels</Breadcrumb.Link>
      <Breadcrumb.Link>Rabbit Is Rich</Breadcrumb.Link>
    </Breadcrumb>
  </View>
  <Breadcrumb size="large" label="You are here:">
    <Breadcrumb.Link href="https://instructure.github.io/instructure-ui/">English 204</Breadcrumb.Link>
      <Breadcrumb.Link
        onClick={function () {
          console.log("This Breadcrumb.Link was clicked!")
        }}
      >
        Exploring John Updike
      </Breadcrumb.Link>
    <Breadcrumb.Link href="https://instructure.github.io/instructure-ui/">The Rabbit Novels</Breadcrumb.Link>
    <Breadcrumb.Link>Rabbit Is Rich</Breadcrumb.Link>
  </Breadcrumb>
</div>
```

If you don't provide an href to `Breadcrumb.Link`, it will render as text.

```js
---
example: true
---
<Breadcrumb label="You are here:">
  <Breadcrumb.Link href="https://instructure.github.io/instructure-ui/">Course A</Breadcrumb.Link>
  <Breadcrumb.Link href="https://instructure.github.io/instructure-ui/">Modules</Breadcrumb.Link>
  <Breadcrumb.Link>A Great Module</Breadcrumb.Link>
</Breadcrumb>
```

You can include icons in `Breadcrumb.Link`:

```js
---
example: true
---
<Breadcrumb label="Breadcrumb with icons">
  <Breadcrumb.Link icon={<IconBankLine size="small" />} href="#Breadcrumb">Item Bank</Breadcrumb.Link>
  <Breadcrumb.Link icon={<IconClockLine size="small" />} onClick={() => {}}>History</Breadcrumb.Link>
  <Breadcrumb.Link icon={IconPlusLine} iconPlacement="end">New Question</Breadcrumb.Link>
</Breadcrumb>
```

### Guidelines

```js
---
guidelines: true
---
<Guidelines>
  <Figure recommendation="yes" title="Do">
    <Figure.Item>Place Breadcrumb near the top of the page</Figure.Item>
    <Figure.Item>Show hierarchy, not history</Figure.Item>
    <Figure.Item>Keep Breadcrumb titles short but descriptive</Figure.Item>
  </Figure>
  <Figure recommendation="no" title="Don't">
    <Figure.Item>Use Breadcrumb if you are taking users through a multi-step process</Figure.Item>
  </Figure>
</Guidelines>
```
