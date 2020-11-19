---
describes: Table
---

### Table layout

In stacked layout, column header is rendered in each cell, but not in row header.

> If you are using [TruncateText](#TruncateText) (or CSS ellipsis) in your Table, set the
> layout to `fixed` or `stacked`, or the text truncation will not work. To force long strings to break and not
> exceed the bounds of the table cell, use `fixed` or `stacked`, together with the [Text](#Text) component:
> `<Text wrap="break-word">[long string]</Text>`.

```javascript
---
example: true
render: false
---
class Example extends React.Component {
  state = {
    layout: 'auto',
    hover: false,
  }

  handleChange = (field, value) => {
    this.setState({
      [field]: value,
    })
  }

  renderOptions () {
    const { layout, hover } = this.state

    return (
      <Flex alignItems="start">
        <FlexItem margin="small">
          <RadioInputGroup
            name="layout"
            description="layout"
            value={layout}
            onChange={(e, value) => this.handleChange('layout', value)}
          >
            <RadioInput label="auto" value="auto" />
            <RadioInput label="fixed" value="fixed" />
            <RadioInput label="stacked" value="stacked" />
          </RadioInputGroup>
        </FlexItem>
        <FlexItem margin="small">
          <Checkbox
            label="hover"
            checked={hover}
            onChange={(e, value) => this.handleChange('hover', !hover)}
          />
        </FlexItem>
      </Flex>
    )
  }

  render() {
    const { layout, hover } = this.state

    return (
      <div>
        {this.renderOptions()}
        <Table
          caption='Top rated movies'
          layout={layout}
          hover={hover}
        >
          <Table.Head>
            <Table.Row>
              <Table.ColHeader id="Rank">Rank</Table.ColHeader>
              <Table.ColHeader id="Title">Title</Table.ColHeader>
              <Table.ColHeader id="Year">Year</Table.ColHeader>
              <Table.ColHeader id="Rating">Rating</Table.ColHeader>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            <Table.Row>
              <Table.RowHeader>1</Table.RowHeader>
              <Table.Cell>The Shawshank Redemption</Table.Cell>
              <Table.Cell>1994</Table.Cell>
              <Table.Cell>9.3</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.RowHeader>2</Table.RowHeader>
              <Table.Cell>The Godfather</Table.Cell>
              <Table.Cell>1972</Table.Cell>
              <Table.Cell>9.2</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.RowHeader>3</Table.RowHeader>
              <Table.Cell>The Godfather: Part II</Table.Cell>
              <Table.Cell>1974</Table.Cell>
              <Table.Cell>9.0</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    )
  }
}

render(<Example />)
```

### Column width and alignment

Each column (`ColHeader`) can have a custom width, and each cell (`ColHeader`, `RowHeader` or `Cell`)
can be aligned differently.

```javascript
---
example: true
render: false
---
class Example extends React.Component {
  render() {
    const { headers, rows } = this.props

    return (
      <Responsive
        query={{
          small: { maxWidth: '40rem' },
          large: { minWidth: '41rem' },
        }}
        props={{
          small: { layout: 'stacked' },
          large: { layout: 'fixed' },
        }}
      >
        {({ layout }) => (
          <div>
            <Table
              caption='Top rated movies'
              layout={layout}
            >
              <Table.Head>
                <Table.Row>
                  {(headers || []).map(({ id, text, width, textAlign }) => (
                    <Table.ColHeader
                      key={id}
                      id={id}
                      width={width}
                      textAlign={textAlign}
                    >
                      {text}
                    </Table.ColHeader>
                   ))}
                </Table.Row>
              </Table.Head>
              <Table.Body>
                {rows.map((row) => (
                  <Table.Row key={row.id}>
                    {headers.map(({ id, renderCell, textAlign }) => (
                      <Table.Cell
                        key={id}
                        textAlign={layout === 'stacked' ? 'start' : textAlign}
                      >
                        {renderCell ? renderCell(row[id], layout) : row[id]}
                      </Table.Cell>
                    ))}
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        )}
      </Responsive>
    )
  }
}

const renderSummary = (summary, layout) => (layout === 'stacked')
  ? summary
  : (
    <TruncateText
      truncate="word"
      ellipsis="..."
    >
      {summary}
    </TruncateText>
  )

render(
  <Example
    headers={[
      {
        id: 'Title',
        text: 'Title',
        width: '25%',
        textAlign: 'start',
      },
      {
        id: 'Year',
        text: 'Year',
        width: '15%',
        textAlign: 'start',
      },
      {
        id: 'Summary',
        text: 'Summary',
        width: '40%',
        renderCell: renderSummary,
        textAlign: 'start',
      },
      {
        id: 'BoxOffice',
        text: 'Box Office',
        width: '20%',
        textAlign: 'end',
      },
    ]}
    rows={[
      {
        id: '1',
        Title: 'The Shawshank Redemption',
        Year: 1994,
        Summary: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
        BoxOffice: '$28,341,469',
      },
      {
        id: '2',
        Title: 'The Godfather',
        Year: 1972,
        Summary: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
        BoxOffice: '$133,698,921',
      },
      {
        id: '3',
        Title: 'The Godfather: Part II',
        Year: 1974,
        Summary: 'The early life and career of Vito Corleone in 1920s New York City is portrayed, while his son, Michael, expands and tightens his grip on the family crime syndicate.',
        BoxOffice: '$47,542,841',
      },
    ]}
  />
)
```

### A sortable table using our Responsive component

Resize the window to see how column headers transition into a Select for sorting table content when the traditional Table Header is no longer clickable. The Table layout itself switches from the horizontal view to the stacked view allowing content to be viewed without horizontal scrolling. See [Responsive](#Responsive) for more examples.

```javascript
---
example: true
render: false
---
class SortableTable extends React.Component {
  constructor (props) {
    super(props)
    const { headers } = props

    this.state = {
      sortBy: headers && headers[0] && headers[0].id,
      ascending: true,
    }
  }

  handleSort = (event, { id }) => {
    const { sortBy, ascending } = this.state

    if (id === sortBy) {
      this.setState({
        ascending: !ascending,
      })
    } else {
      this.setState({
        sortBy: id,
        ascending: true,
      })
    }
  }

  render() {
    const { caption, headers, rows } = this.props
    const { sortBy, ascending } = this.state
    const direction = ascending ? 'ascending' : 'descending'
    const sortedRows = [...(rows || [])].sort((a, b) => {
      if (a[sortBy] < b[sortBy]) {
        return -1
      }
      if (a[sortBy] > b[sortBy]) {
        return 1
      }
      return 0
    })

    if (!ascending) {
      sortedRows.reverse()
    }
    return (
      <Responsive
        query={{
          small: { maxWidth: '40rem' },
          large: { minWidth: '41rem' },
        }}
        props={{
          small: { layout: 'stacked' },
          large: { layout: 'auto' },
        }}
      >
        {(props) => (
          <div>
            <Table
              caption={`${caption}: sorted by ${sortBy} in ${direction} order`}
              {...props}
            >
              <Table.Head renderSortLabel="Sort by">
                <Table.Row>
                  {(headers || []).map(({ id, text }) => (
                    <Table.ColHeader
                      key={id}
                      id={id}
                      onRequestSort={this.handleSort}
                      sortDirection={id === sortBy ? direction : 'none'}
                    >
                      {text}
                    </Table.ColHeader>
                   ))}
                </Table.Row>
              </Table.Head>
              <Table.Body>
                {sortedRows.map((row) => (
                  <Table.Row key={row.id}>
                    {headers.map(({ id, renderCell }) => (
                      <Table.Cell key={id}>
                        {renderCell ? renderCell(row[id]) : row[id]}
                      </Table.Cell>
                    ))}
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
            <Alert
              liveRegion={() => document.getElementById('flash-messages')}
              liveRegionPoliteness="polite"
              screenReaderOnly
            >
              {`Sorted by ${sortBy} in ${direction} order`}
            </Alert>
          </div>
        )}
      </Responsive>
    )
  }
}

render(
  <SortableTable
    caption="Top rated movies"
    headers={[
      {
        id: 'Rank',
        text: 'Rank',
      },
      {
        id: 'Title',
        text: 'Title',
      },
      {
        id: 'Year',
        text: 'Year',
      },
      {
        id: 'Rating',
        text: 'Rating',
        renderCell: (rating) => rating.toFixed(1),
      },
    ]}
    rows={[
      {
        id: '1',
        Rank: 1,
        Title: 'The Shawshank Redemption',
        Year: 1994,
        Rating: 9.3,
      },
      {
        id: '2',
        Rank: 2,
        Title: 'The Godfather',
        Year: 1972,
        Rating: 9.2,
      },
      {
        id: '3',
        Rank: 3,
        Title: 'The Godfather: Part II',
        Year: 1974,
        Rating: 9.0,
      },
      {
        id: '4',
        Rank: 4,
        Title: 'The Dark Knight',
        Year: 2008,
        Rating: 9.0,
      },
      {
        id: '5',
        Rank: 5,
        Title: '12 Angry Men',
        Year: 1957,
        Rating: 8.9,
      },
    ]}
  />
)
```

### A sortable table with selection and pagination

The composition order is important. `SelectableTable` -> `PaginatedTable` -> `SortableTable`, so
that selection does not re-paginate or re-sort the table, and pagination does not re-sort the table.

```javascript
---
example: true
render: false
---
class SelectableTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: new Set()
    }
  }

  handleSelectAll = (allSelected) => {
    const { rowIds } = this.props

    this.setState({
      selected: allSelected ? new Set() : new Set(rowIds),
    })
  }

  handleSelectRow = (rowSelected, rowId) => {
    const { selected } = this.state
    const copy = new Set(selected)
    if (rowSelected) {
      copy.delete(rowId)
    } else {
      copy.add(rowId)
    }

    this.setState({
      selected: copy,
    })
  }

  render() {
    const { caption, headers, rows, onSort, sortBy, ascending, rowIds } = this.props
    const { selected } = this.state
    const allSelected = selected.size > 0 && rowIds.every((id) => selected.has(id))
    const someSelected = selected.size > 0 && !allSelected
    const direction = ascending ? 'ascending' : 'descending'

    return (
      <Responsive
        query={{
          small: { maxWidth: '40rem' },
          large: { minWidth: '41rem' },
        }}
        props={{
          small: { layout: 'stacked' },
          large: { layout: 'auto' },
        }}
      >
        {(props) => (
          <div>
            <View
              as="div"
              padding="small"
              background="primary-inverse"
            >
              {`${selected.size} of ${rowIds.length} selected`}
            </View>
            <Table
              caption={`${caption}: sorted by ${sortBy} in ${direction} order`}
              {...props}
            >
              <Table.Head renderSortLabel={<ScreenReaderContent>Sort by</ScreenReaderContent>}>
                <Table.Row>
                  <Table.ColHeader id="select">
                    <Checkbox
                      label={<ScreenReaderContent>Select all</ScreenReaderContent>}
                      onChange={() => this.handleSelectAll(allSelected)}
                      checked={allSelected}
                      indeterminate={someSelected}
                    />
                  </Table.ColHeader>
                  {(headers || []).map(({ id, text, width }) => (
                     <Table.ColHeader
                       key={id}
                       id={id}
                       width={width}
                       onRequestSort={onSort}
                       sortDirection={id === sortBy ? direction : 'none'}
                     >
                       {text}
                     </Table.ColHeader>
                   ))}
                </Table.Row>
              </Table.Head>
              <Table.Body>
                {(rows || []).map((row) => {
                  const rowSelected = selected.has(row.id)

                  return (
                    <Table.Row key={row.id}>
                      <Table.RowHeader>
                        <Checkbox
                          label={<ScreenReaderContent>Select row</ScreenReaderContent>}
                          onChange={() => this.handleSelectRow(rowSelected, row.id)}
                          checked={rowSelected}
                        />
                      </Table.RowHeader>
                      {(headers || []).map(({ id, renderCell }) => (
                        <Table.Cell key={id}>
                          {renderCell ? renderCell(row[id]) : row[id]}
                        </Table.Cell>
                      ))}
                    </Table.Row>
                  )
                })}
              </Table.Body>
            </Table>
            <Alert
              liveRegion={() => document.getElementById('flash-messages')}
              liveRegionPoliteness="polite"
              screenReaderOnly
            >
              {`${selected.size} of ${rowIds.length} selected`}
            </Alert>
          </div>
        )}
      </Responsive>
    )
  }
}

class PaginatedTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 0,
    }
  }

  handleClick = (page) => {
    this.setState({
      page,
    })
  }

  handleSort = (event, options) => {
    const { onSort } = this.props

    this.setState({
      page: 0,
    })
    onSort(event, options)
  }

  render() {
    const { caption, headers, rows, sortBy, ascending, perPage } = this.props
    const { page } = this.state
    const startIndex = page * perPage
    const slicedRows = rows.slice(startIndex, startIndex + perPage)
    const pageCount = perPage && Math.ceil(rows.length / perPage)

    return (
      <div>
        <SelectableTable
          caption={caption}
          headers={headers}
          rows={slicedRows}
          onSort={this.handleSort}
          sortBy={sortBy}
          ascending={ascending}
          rowIds={rows.map((row) => row.id)}
        />
        {pageCount > 1 && (
          <Pagination
            variant='compact'
            labelNext='Next Page'
            labelPrev='Previous Page'
            margin='large'
          >
            {Array.from(Array(pageCount), (item, index) => (
              <Pagination.Page
                key={index}
                onClick={() => this.handleClick(index)}
                current={index === page}
              >
                {index + 1}
              </Pagination.Page>
            ))}
          </Pagination>
        )}
        <Alert
          liveRegion={() => document.getElementById('flash-messages')}
          liveRegionPoliteness="polite"
          screenReaderOnly
        >
          {`Table page ${page + 1} of ${pageCount}`}
        </Alert>
      </div>
    )
  }
}

class SortableTable extends React.Component {
  constructor (props) {
    super(props)
    const { headers } = props

    this.state = {
      sortBy: headers && headers[0] && headers[0].id,
      ascending: true,
    }
  }

  handleSort = (event, { id }) => {
    const { sortBy, ascending } = this.state

    if (id === sortBy) {
      this.setState({
        ascending: !ascending,
      })
    } else {
      this.setState({
        sortBy: id,
        ascending: true,
      })
    }
  }

  render() {
    const { caption, headers, rows, perPage } = this.props
    const { sortBy, ascending } = this.state
    const sortedRows = [...rows].sort((a, b) => {
      if (a[sortBy] < b[sortBy]) {
        return -1
      }
      if (a[sortBy] > b[sortBy]) {
        return 1
      }
      return 0
    })

    if (!ascending) {
      sortedRows.reverse()
    }
    return (
      <div>
        <PaginatedTable
          caption={caption}
          headers={headers}
          rows={sortedRows}
          onSort={this.handleSort}
          sortBy={sortBy}
          ascending={ascending}
          perPage={perPage}
        />
        <Alert
          liveRegion={() => document.getElementById('flash-messages')}
          liveRegionPoliteness="polite"
          screenReaderOnly
        >
          {`Sorted by ${sortBy} in ${ascending ? 'ascending' : 'descending'} order`}
        </Alert>
      </div>
    )
  }
}

const renderRating = (rating) => (
  <Rating
    label='Rating'
    valueNow={rating}
    valueMax={10}
    iconCount={5}
  />
)

render(
  <SortableTable
    caption="Top rated movies"
    headers={[
      {
        id: 'Rank',
        text: 'Rank',
      },
      {
        id: 'Title',
        text: 'Title',
        width: '40%',
      },
      {
        id: 'Year',
        text: 'Year',
      },
      {
        id: 'Rating',
        text: 'Rating',
        renderCell: renderRating,
      },
    ]}
    rows={[
      {
        id: '1',
        Rank: 1,
        Title: 'The Shawshank Redemption',
        Year: 1994,
        Rating: 9.3,
      },
      {
        id: '2',
        Rank: 2,
        Title: 'The Godfather',
        Year: 1972,
        Rating: 9.2,
      },
      {
        id: '3',
        Rank: 3,
        Title: 'The Godfather: Part II',
        Year: 1974,
        Rating: 9.0,
      },
      {
        id: '4',
        Rank: 4,
        Title: 'The Dark Knight',
        Year: 2008,
        Rating: 9.0,
      },
      {
        id: '5',
        Rank: 5,
        Title: '12 Angry Men',
        Year: 1957,
        Rating: 8.9,
      },
    ]}
    perPage={3}
  />
)
```

### Guidelines

```js
---
guidelines: true
---
<Guidelines>
  <Figure recommendation="yes" title="Do">
    <Figure.Item>Column headers can be sortable</Figure.Item>
    <Figure.Item>Use the <Link href="#CondensedButton">CondensedButton</Link> and <strong>small</strong> inputs inside cells</Figure.Item>
    <Figure.Item>Actions must relate to that row only</Figure.Item>
    <Figure.Item>Use horizontal and vertical alignment that makes sense with the content</Figure.Item>
    <Figure.Item>Start align US dates and apply i18n</Figure.Item>
    <Figure.Item>Start align text and alphanumeric</Figure.Item>
    <Figure.Item>Start align currency</Figure.Item>
    <Figure.Item>End align quantities and decimals</Figure.Item>
    <Figure.Item>Table headers should have the same start or end alignment as their column contents</Figure.Item>
  </Figure>
  <Figure recommendation="no" title="Don't">
    <Figure.Item>Center align more than 4 characters/numbers, choose start or end</Figure.Item>
    <Figure.Item>Use to create a layout</Figure.Item>
    <Figure.Item>Use zebra stripes</Figure.Item>
    <Figure.Item>Bottom align ever</Figure.Item>
  </Figure>
</Guidelines>
```
