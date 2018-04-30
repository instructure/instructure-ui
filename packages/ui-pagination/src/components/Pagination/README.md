---
describes: Pagination
---

Renders available pages of content, and reacts to selection of another page.
Expects array of `PaginationButton` children. Focus and announcement of page change is
the responsibility of your app.

The `compact` variant truncates pages to show only the first, last, and
pages surrounding the current one.

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
    const pages = Array.from(Array(9)).map((v, i) => <PaginationButton
      key={i}
      onClick={this.setPage.bind(this, i)}
      current={i === this.state.currentPage}>
        {i + 1}
    </PaginationButton>)

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

If you instead provide an href to `PaginationButton` it will render as a link.

```js
---
example: true
---
<Pagination variant="full" label="Jump to">
  <PaginationButton href="/pages/1" current>A-G</PaginationButton>
  <PaginationButton href="/pages/2">H-J</PaginationButton>
  <PaginationButton href="/pages/3">K-M</PaginationButton>
  <PaginationButton href="/pages/3">N-Q</PaginationButton>
  <PaginationButton href="/pages/3">R-Z</PaginationButton>
</Pagination>
```
