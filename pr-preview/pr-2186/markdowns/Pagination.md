# Pagination


### NOTE

Pagination is in a state of transition. Its API has been expanded to allow
as close to zero config usage as possible, without introducing breaking changes to the previous methods.

The component is under review by the design team and it's possible we'll deprecate te "old" API in a
following version. If you're able to, please use the "new" API. Its documentation is on the top of this page.

One of the biggest improvement is that pagination now can handle large page numbers as well.

### Pagination

The pagination component provides props to handle most of the pagination use-cases. These following examples are the same as the "old" examples in behaviour, but with the "new" API

```js
---
type: example
---
const Example = () => {
  const [currentPage, setCurrentPage] = useState(1)

  return (
    <Pagination
      as="nav"
      margin="small"
      variant="compact"
      labelNext="Next Page"
      labelPrev="Previous Page"
      currentPage={currentPage}
      totalPageNumber={9}
      onPageChange={(nextPage) => setCurrentPage(nextPage)}
    />
  )
}

render(<Example />)
```

You can set any `totalPageNumber`, the component can handle it easily.\
Furthermore, you can set `siblingCount`, which indicates how many pages are visible on either side of the `currentPage` and the
`boundaryCount`, which indicates how many pages are visible in the beginning and end.\
Also, you can set `screenReaderLabelPageButton` to customize what a screenreader will announce when the button receives focus.

```js
---
type: example
---
const Example = () => {
  const [currentPage, setCurrentPage] = useState(1)
  return (
    <Pagination
      as="nav"
      margin="small"
      variant="compact"
      labelNext="Next Page"
      labelPrev="Previous Page"
      currentPage={currentPage}
      totalPageNumber={100000}
      onPageChange={(nextPage) => setCurrentPage(nextPage)}
      siblingCount={3}
      boundaryCount={2}
      screenReaderLabelPageButton={(currentPage, totalPageNumber) =>
        `Page ${currentPage} of ${totalPageNumber}`
      }
    />
  )
}

render(<Example />)
```

You can only display 1000 pages at once.

```js
---
type: example
---
const Example = () => {
  const [currentPage, setCurrentPage] = useState(1)
  return (
    <Pagination
      as="nav"
      margin="small"
      variant="full"
      labelNext="Next Page"
      labelPrev="Previous Page"
      currentPage={currentPage}
      totalPageNumber={100000}
      onPageChange={(nextPage) => setCurrentPage(nextPage)}
      siblingCount={3}
      boundaryCount={2}
    />
  )
}

render(<Example />)
```

You can override the default page rendering with `renderPageIndicator`.

```js
---
type: example
---
const Example = () => {
  const [currentPage, setCurrentPage] = useState(1)

  const pageMap = ['A-G', 'H-J', 'K-M', 'N-Q', 'R-Z']

  return (
    <Pagination
      as="nav"
      margin="small"
      variant="full"
      labelNext="Next Page"
      labelPrev="Previous Page"
      currentPage={currentPage}
      totalPageNumber={5}
      onPageChange={(nextPage) => setCurrentPage(nextPage)}
      siblingCount={5}
      boundaryCount={0}
      renderPageIndicator={(page) => pageMap[page - 1]}
    />
  )
}

render(<Example />)
```

The `variant="input"` prop will render Pagination with a NumberInput and all the arrow buttons.

```js
---
type: example
---
const Example = () => {
  const [currentPage, setCurrentPage] = useState(1)

  return (
    <Pagination
      as="nav"
      margin="small"
      variant="input"
      labelNext="Next Page"
      labelPrev="Previous Page"
      currentPage={currentPage}
      totalPageNumber={9}
      onPageChange={(nextPage) => setCurrentPage(nextPage)}
    />
  )
}

render(<Example />)
```

### Legacy examples

These provide possibly finer, but much more complicated control over the pagination component. They are still supported, but we recommend using the new API.

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
    <Figure.Item>Use `screenReaderLabelPageButton` or `screenReaderLabelNumberInput` for better screenreader experience</Figure.Item>
  </Figure>
</Guidelines>
```


### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| Pagination | children | `ChildPage \| ChildPage[]` | No | - | children of type Pagination.Page |
| Pagination | disabled | `boolean` | No | `false` | Disables interaction with all pages |
| Pagination | withFirstAndLastButton | `boolean` | No | `false` | Displays "jump to first" and "jump to last" buttons. Always turned on with `input` variant. |
| Pagination | showDisabledButtons | `boolean` | No | `false` | Displays the unavailable navigation buttons as disabled instead of hiding them. Always turned on with `input` variant. |
| Pagination | label | `React.ReactNode` | No | - | Visible label for component |
| Pagination | labelNext | `string` | No | - | Accessible label for next button |
| Pagination | labelPrev | `string` | No | - | Accessible label for previous button |
| Pagination | labelFirst | `string` | No | - | Accessible label for "jump to first" button |
| Pagination | labelLast | `string` | No | - | Accessible label for "jump to last" button |
| Pagination | labelNumberInput | `(totalPageNumber: number) => React.ReactNode` | No | `(numberOfPages: number) => `of ${numberOfPages}`` | Label for number input (__only__ for `input` variant) |
| Pagination | screenReaderLabelNumberInput | `( currentPage: number, totalPageNumber: number ) => string` | No | `(
  currentPage: number,
  numberOfPages: number
) => `Select page (${currentPage} of ${numberOfPages})`` | ScreenReaderLabel for number input (__only__ for `input` variant) |
| Pagination | screenReaderLabelPageButton | `( currentPage: number, totalPageNumber: number ) => string` | No | - | ScreenReaderLabel for page number buttons (__only__ for `full` and `compact variants) |
| Pagination | variant | `'full' \| 'compact' \| 'input'` | No | `'full'` | The compact variant truncates the page navigation to show only the first, last, and pages immediately surrounding the current page. Fewer than 5 pages, no next/previous arrow buttons will be shown, and all pages will be listed |
| Pagination | margin | `Spacing` | No | `'space8'` | Spacing token values can be found here: [Spacing Tokens](https://instructure.design/#layout-spacing/%23Tokens) Apply these values via familiar CSS-like shorthand. For example: `margin="space8 0 space12"`. |
| Pagination | as | `keyof JSX.IntrinsicElements \| ComponentType<P>` | No | `'div'` | the element type to render as |
| Pagination | elementRef | `(element: Element \| null) => void` | No | - | provides a reference to the underlying html root element |
| Pagination | inputRef | `(inputElement: HTMLInputElement \| null) => void` | No | - | provides a reference to the html input element (__only__ for `input` variant) |
| Pagination | shouldHandleFocus | `boolean` | No | `true` | For accessibility, Pagination sets focus on the first or last Pagination.Pages, respectively, when the Previous or Next arrow buttons are removed from the DOM. Set this property to `false` to prevent this behavior. |
| Pagination | totalPageNumber | `number` | No | `0` | The total number of pages |
| Pagination | currentPage | `number` | No | `1` | The current page number |
| Pagination | siblingCount | `number` | No | `1` | The number of pages to display before and after the current page |
| Pagination | boundaryCount | `number` | No | `1` | The number of always visible pages at the beginning and end of the pagination component |
| Pagination | onPageChange | `(next: number, prev: number) => void` | No | - | Called when page number is changed |
| Pagination | onMouseEnter | `(page: number) => void` | No | - | Called when a page is hovered. |
| Pagination | renderPageIndicator | `( pageIndex: number, currentPage: number ) => React.ReactNode` | No | `(page: number) => page` | Renders the visible pages |
| Pagination | ellipsis | `React.ReactNode` | No | `'…'` | The ellipsis (e.g. "...") |
| Pagination.PaginationArrowButton | direction | `'first' \| 'prev' \| 'next' \| 'last'` | No | - |  |
| Pagination.PaginationArrowButton | label | `string` | Yes | - |  |
| Pagination.PaginationArrowButton | buttonRef | `(element: Element \| null) => void` | No | - |  |
| Pagination.PaginationArrowButton | onClick | `( event: \| React.KeyboardEvent<HTMLInputElement> \| React.MouseEvent<HTMLButtonElement> \| React.FocusEvent<HTMLInputElement> ) => void` | No | - |  |
| Pagination.PaginationButton | children | `React.ReactNode` | Yes | - | Content to render as page selection |
| Pagination.PaginationButton | current | `boolean` | No | `false` | Whether the page is currently displayed |
| Pagination.PaginationButton | onClick | `( event: \| React.KeyboardEvent<HTMLInputElement> \| React.MouseEvent<HTMLButtonElement> \| React.FocusEvent<HTMLInputElement> ) => void` | No | - | Callback fired when the `Pagination.Page` is clicked. |
| Pagination.PaginationButton | screenReaderLabel | `string` | No | - | The text screenreaders should say when this button is in focus (sets the `aria-label` attribute). If left undefined (default) SRs will announce text in the child node(s). |
| Pagination.PaginationPageInput | numberOfPages | `number` | Yes | - | The number of pages in total |
| Pagination.PaginationPageInput | currentPageIndex | `number` | Yes | - | The index of the current page |
| Pagination.PaginationPageInput | onChange | `( event: \| React.KeyboardEvent<HTMLInputElement> \| React.MouseEvent<HTMLButtonElement> \| React.FocusEvent<HTMLInputElement>, pageIndex: number ) => void` | Yes | - | Fires when a new page index is selected |
| Pagination.PaginationPageInput | screenReaderLabel | `(currentPage: number, numberOfPages: number) => string` | Yes | - | ScreenReaderLabel for number input |
| Pagination.PaginationPageInput | label | `(numberOfPages: number) => React.ReactNode` | No | - | Label for number input |
| Pagination.PaginationPageInput | disabled | `boolean` | No | `false` | Disables interaction with the input |
| Pagination.PaginationPageInput | inputRef | `(element: HTMLInputElement \| null) => void` | No | - | provides a reference to the underlying html root element |

### Usage

Install the package:

```shell
npm install @instructure/ui-pagination
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { Pagination } from '@instructure/ui-pagination'
```

