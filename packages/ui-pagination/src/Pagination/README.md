---
describes: Pagination
---

Renders available pages of content, and reacts to selection of another page.
Expects array of `Pagination.Page` children. Focus and announcement of page change is
the responsibility of your app.

If there are more than 5 pages, the `compact` variant truncates the page navigation
to show only the first, last, and pages surrounding the current page. At fewer than
5 pages, no next/previous arrow buttons will be shown, and all pages will be listed.

Provide an `onClick` to `Pagination.Page` to handle navigation.

```js
---
type: example
---
class Example extends React.Component {
  constructor (props) {
    super(props)
    this.state = { currentPage: 0 }
  }

  setPage (page) {
    this.setState({ currentPage: page })
  }

  render () {
    const pages = Array.from(Array(9)).map((v, i) => <Pagination.Page
      key={i}
      onClick={this.setPage.bind(this, i)}
      current={i === this.state.currentPage}>
        {i + 1}
    </Pagination.Page>)

    return (
      <Pagination
        as="nav"
        margin="small"
        variant="compact"
        labelNext="Next Page"
        labelPrev="Previous Page"
      >
        {pages}
      </Pagination>
    )
  }
}

render(<Example />)
```

You can handle endpoints that have a lot of pages by using a sparse array of children:

```js
---
type: example
---
class Example extends React.Component {
  constructor (props) {
    super(props)
    this.state = { currentPage: 0 }
  }

  renderPage(pageIndex) {
    return (
      <Pagination.Page
        key={pageIndex}
        onClick={() => this.setState({ currentPage: pageIndex })}
        current={pageIndex === this.state.currentPage}
      >
          {pageIndex + 1}
      </Pagination.Page>
    )
  }

  render () {
    const {currentPage} = this.state
    const pages = Array(100000)
    pages[0] = this.renderPage(0)
    pages[pages.length - 1] = this.renderPage(pages.length - 1)
    const visiblePageRangeStart = Math.min(pages.length - 4, Math.max(currentPage - 1, 1))
    const visiblePageRangeEnd = Math.min(currentPage + 4, pages.length - 1)
    for (let i = visiblePageRangeStart; i < visiblePageRangeEnd; i++) {
      pages[i] = this.renderPage(i)
    }

    return (
      <Pagination
        as="nav"
        margin="small"
        variant="compact"
        labelNext="Next Page"
        labelPrev="Previous Page"
      >
        {pages}
      </Pagination>
    )
  }
}

render(<Example />)
```

If you instead provide an href to `Pagination.Page` it will render as a link.

```js
---
type: example
---
<Pagination variant="full" label="Jump to">
  <Pagination.Page href="/pages/1" current>A-G</Pagination.Page>
  <Pagination.Page href="/pages/2">H-J</Pagination.Page>
  <Pagination.Page href="/pages/3">K-M</Pagination.Page>
  <Pagination.Page href="/pages/3">N-Q</Pagination.Page>
  <Pagination.Page href="/pages/3">R-Z</Pagination.Page>
</Pagination>
```

The `variant="input"` prop will render Pagination with a NumberInput and all the arrow buttons.

```js
---
type: example
---
class Example extends React.Component {
  constructor (props) {
    super(props)
    this.state = { currentPage: 0 }
  }

  setPage (page) {
    this.setState({ currentPage: page })
  }

  render () {
    const pages = Array.from(Array(9)).map((v, i) => <Pagination.Page
      key={i}
      onClick={this.setPage.bind(this, i)}
      current={i === this.state.currentPage}>
        {i + 1}
    </Pagination.Page>)

    return (
      <Pagination
        as="nav"
        margin="small"
        variant="input"
        labelFirst="First Page"
        labelPrev="Previous Page"
        labelNext="Next Page"
        labelLast="Last Page"
      >
        {pages}
      </Pagination>
    )
  }
}

render(<Example />)
```

The `withFirstAndLastButton` prop makes the "Jump to first" and "Jump to last" buttons appear. The `labelFirst` and `labelLast` props set the labels for these buttons.

The `showDisabledButtons` prop displays the unavailable navigation buttons as disabled instead of hiding them.

```js
---
type: example
---
class Example extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      currentPage: 0,
      withFirstAndLastButton: true,
      showDisabledButtons: true
    }
  }

  setPage (page) {
    this.setState({ currentPage: page })
  }

  render () {
    const pages = Array.from(Array(9)).map((v, i) => <Pagination.Page
      key={i}
      onClick={this.setPage.bind(this, i)}
      current={i === this.state.currentPage}>
        {i + 1}
    </Pagination.Page>)

    return (
      <div>
        <FormFieldGroup description="Pagination Settings">
          <Checkbox
            checked={this.state.withFirstAndLastButton}
            label="With First and Last buttons"
            onChange={() => {
              this.setState({ withFirstAndLastButton: !this.state.withFirstAndLastButton })
            }}
          />
          <Checkbox
            checked={this.state.showDisabledButtons}
            label="Show disabled buttons"
            onChange={() => {
              this.setState({ showDisabledButtons: !this.state.showDisabledButtons })
            }}
          />
        </FormFieldGroup>

        <Pagination
          as="nav"
          margin="large small small"
          variant="compact"
          labelNext="Next Page"
          labelPrev="Previous Page"
          labelFirst="First Page"
          labelLast="Last Page"
          withFirstAndLastButton={ this.state.withFirstAndLastButton }
          showDisabledButtons={ this.state.showDisabledButtons }
        >
          {pages}
        </Pagination>
      </div>
    )
  }
}

render(<Example />)
```

### Guidelines

```js
---
type: embed
---
<Guidelines>
  <Figure recommendation="yes" title="Do">
    <Figure.Item>Use for splitting up content or data into several pages</Figure.Item>
    <Figure.Item>Use if there are more than 20 items displayed in one view</Figure.Item>
  </Figure>
</Guidelines>
```

```js
---
type: embed
---
<Guidelines>
  <Figure recommendation="a11y" title="Accessibility">
    <Figure.Item>Ensure page links and the next/previous buttons are labeled correctly for screen readers</Figure.Item>
  </Figure>
</Guidelines>
```
