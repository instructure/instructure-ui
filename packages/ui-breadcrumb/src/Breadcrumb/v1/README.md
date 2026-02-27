---
describes: Breadcrumb
---

Breadcrumbs enable users to quickly see their location within a path of navigation.
Long breadcrumb text will be automatically truncated, ensuring the list always
remains on a single line.

**Breadcrumbs are best suited for tablet-sized (~768px) screens and larger.**
For smaller screens, use a [Link](Link) that returns the user to the previous page or view.
The example below is implemented with [Responsive](Responsive). Resize the browser window to see
Breadcrumb become a Link at under 768px.

```js
---
type: example
---
<Responsive
  query={{
    tablet: { minWidth: 768 }
  }}
>
  {(props, matches) => {
    if (matches.includes('tablet')) {
      return (
        <Breadcrumb label="breadcrumb">
          <Breadcrumb.Link href="#">Student Forecast</Breadcrumb.Link>
          <Breadcrumb.Link href="#">University of Utah</Breadcrumb.Link>
          <Breadcrumb.Link href="#">University of Utah Colleges</Breadcrumb.Link>
          <Breadcrumb.Link>College of Life Sciences</Breadcrumb.Link>
        </Breadcrumb>
      )
    } else {
      return (
        <Link
          href="#"
          isWithinText={false}
          renderIcon={IconArrowOpenStartLine}
        >
          <TruncateText>University of Utah Colleges</TruncateText>
        </Link>
      )
    }
  }}
</Responsive>
```

Change the `size` prop to control the font-size of the breadcrumbs (default is `medium`).

```js
---
type: example
---
<div>
  <Breadcrumb size="small" label="breadcrumb" margin="none none medium">
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
    <Breadcrumb label="breadcrumb" margin="none none medium">
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
  <Breadcrumb size="large" label="breadcrumb">
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

### Icons

You can include icons in `Breadcrumb.Link`:

```js
---
type: example
---
<Breadcrumb label="Breadcrumb with icons">
  <Breadcrumb.Link renderIcon={<IconBankLine size="small" />} href="#Breadcrumb">Item Bank</Breadcrumb.Link>
  <Breadcrumb.Link renderIcon={<IconClockLine size="small" />} onClick={() => {}}>History</Breadcrumb.Link>
  <Breadcrumb.Link renderIcon={IconPlusLine} iconPlacement="end">New Question</Breadcrumb.Link>
</Breadcrumb>
```

### Guidelines

```js
---
type: embed
---
<Guidelines>
  <Figure recommendation="yes" title="Do">
    <Figure.Item>Place Breadcrumb near the top of the page</Figure.Item>
    <Figure.Item>Show hierarchy, not history</Figure.Item>
    <Figure.Item>Keep Breadcrumb titles short but descriptive</Figure.Item>
  </Figure>
  <Figure recommendation="no" title="Don't">
    <Figure.Item>Use Breadcrumb if you are taking users through a multi-step process</Figure.Item>
    <Figure.Item>Use Breadcrumb in mobile layouts: use a Link to the previous page/view instead</Figure.Item>
  </Figure>
</Guidelines>
```

```js
---
type: embed
---
<Guidelines>
  <Figure recommendation="a11y" title="Accessibility">
    <Figure.Item>
    To indicate the current element within a breadcrumb, the <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current">aria-current</a> attribute is used. In this component, aria-current="page" will automatically be applied to the last element, and we recommend that the current page always be the last element in the breadcrumb. If the last element is not the current page, the isCurrentPage property should be applied to the relevant Breadcrumb.Link to ensure compatibility with screen readers.
    </Figure.Item>
  </Figure>
</Guidelines>
```
