---
describes: Pagination
---

Renders available pages of content, and reacts to selection of another page.
Expects array of `PaginationButton` children. Focus and announcement of page change is
the responsibility of your app.

If there are more than 5 pages, the `compact` variant truncates the page navigation
to show only the first, last, and pages surrounding the current page. At fewer than
5 pages, no next/previous arrow buttons will be shown, and all pages will be listed.

Provide an `onClick` to `PaginationButton` to handle navigation.

```js
---
example: true
render: false
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
example: true
render: false
---
class Example extends React.Component {
  constructor (props) {
    super(props)
    this.state = { currentPage: 0 }
  }

  renderPaginationButton(pageIndex) {
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
    const pages = Array(100000)
    pages[0] = this.renderPaginationButton(0)
    pages[pages.length - 1] = this.renderPaginationButton(pages.length - 1)
    const visiblePageRangeStart = Math.max(this.state.currentPage - 1, 0)
    const visiblePageRangeEnd = Math.min(this.state.currentPage + 4, pages.length - 1)
    for (let i = visiblePageRangeStart; i < visiblePageRangeEnd; i++) {
      pages[i] = this.renderPaginationButton(i)
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
example: true
---
<Pagination variant="full" label="Jump to">
  <Pagination.Page href="/pages/1" current>A-G</Pagination.Page>
  <Pagination.Page href="/pages/2">H-J</Pagination.Page>
  <Pagination.Page href="/pages/3">K-M</Pagination.Page>
  <Pagination.Page href="/pages/3">N-Q</Pagination.Page>
  <Pagination.Page href="/pages/3">R-Z</Pagination.Page>
</Pagination>
```
### Guidelines

```js
---
guidelines: true
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
guidelines: true
---
<Guidelines>
  <Figure recommendation="a11y" title="Accessibility">
    <Figure.Item>Ensure page links and the next/previous buttons are labeled correctly for screen readers</Figure.Item>
  </Figure>
</Guidelines>
```
