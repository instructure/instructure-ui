---
describes: TableControlled
id: TableControlled__README
---

### `size`, `colAlign`, `layout` and `hover`

```javascript
---
example: true
render: false
---
class Example extends React.Component {
  state = {
    size: 'medium',
    colAlign: 'start',
    layout: 'auto',
    hover: false,
  }

  handleChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  }

  renderOptions () {
    const { size, colAlign, layout, hover } = this.state

    return (
      <Flex alignItems="start">
        <FlexItem margin="small">
          <RadioInputGroup
            name="size"
            description="size"
            value={size}
            onChange={(e, value) => this.handleChange('size', value)}
          >
            <RadioInput label="small" value="small" />
            <RadioInput label="medium" value="medium" />
            <RadioInput label="large" value="large" />
          </RadioInputGroup>
        </FlexItem>
        <FlexItem margin="small">
          <RadioInputGroup
            name="colAlign"
            description="colAlign"
            value={colAlign}
            onChange={(e, value) => this.handleChange('colAlign', value)}
          >
            <RadioInput label="start" value="start" />
            <RadioInput label="center" value="center" />
            <RadioInput label="end" value="end" />
          </RadioInputGroup>
        </FlexItem>
        <FlexItem margin="small">
          <RadioInputGroup
            name="layout"
            description="layout"
            value={layout}
            onChange={(e, value) => this.handleChange('layout', value)}
          >
            <RadioInput label="auto" value="auto" />
            <RadioInput label="fixed" value="fixed" />
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
    const { size, colAlign, layout, hover } = this.state

    return (
      <div>
        {this.renderOptions()}
        <TableControlled
          caption={<ScreenReaderContent>Top rated movies</ScreenReaderContent>}
          size={size}
          colAlign={colAlign}
          layout={layout}
          hover={hover}
        >
          <TableControlled.Head>
            <TableControlled.Row>
              <TableControlled.ColHeader id="Rank">Rank</TableControlled.ColHeader>
              <TableControlled.ColHeader id="Title">Title</TableControlled.ColHeader>
              <TableControlled.ColHeader id="Year">Year</TableControlled.ColHeader>
              <TableControlled.ColHeader id="Rating">Rating</TableControlled.ColHeader>
            </TableControlled.Row>
          </TableControlled.Head>
          <TableControlled.Body>
            <TableControlled.Row>
              <TableControlled.RowHeader>1</TableControlled.RowHeader>
              <TableControlled.Cell>The Shawshank Redemption</TableControlled.Cell>
              <TableControlled.Cell>1994</TableControlled.Cell>
              <TableControlled.Cell>9.3</TableControlled.Cell>
            </TableControlled.Row>
            <TableControlled.Row>
              <TableControlled.RowHeader>2</TableControlled.RowHeader>
              <TableControlled.Cell>The Godfather</TableControlled.Cell>
              <TableControlled.Cell>1972</TableControlled.Cell>
              <TableControlled.Cell>9.2</TableControlled.Cell>
            </TableControlled.Row>
            <TableControlled.Row>
              <TableControlled.RowHeader>3</TableControlled.RowHeader>
              <TableControlled.Cell>The Godfather: Part II</TableControlled.Cell>
              <TableControlled.Cell>1974</TableControlled.Cell>
              <TableControlled.Cell>9.0</TableControlled.Cell>
            </TableControlled.Row>
          </TableControlled.Body>
        </TableControlled>
      </div>
    )
  }
}

render(<Example />)
```

The `layout` default, `auto`, lets the browser determine table column widths based on cell content.
`layout="fixed"` forces columns of equal width, regardless of content.

> If you are using [TruncateText](#TruncateText) (or CSS ellipsis) in your Table, you need to set
> the layout to `fixed`, or the text truncation will not work.

```javascript
---
example: true
---
<TableControlled
  caption={<ScreenReaderContent>Top rated movies</ScreenReaderContent>}
  layout='fixed'
>
  <TableControlled.Head>
    <TableControlled.Row>
      <TableControlled.ColHeader id="Title">Title</TableControlled.ColHeader>
      <TableControlled.ColHeader id="Year">Year</TableControlled.ColHeader>
      <TableControlled.ColHeader id="Summary">Summary</TableControlled.ColHeader>
    </TableControlled.Row>
  </TableControlled.Head>
  <TableControlled.Body>
    <TableControlled.Row>
      <TableControlled.Cell>The Shawshank Redemption</TableControlled.Cell>
      <TableControlled.Cell>1994</TableControlled.Cell>
      <TableControlled.Cell>
        <TruncateText
          truncate="word"
          ellipsis="..."
        >
          Two imprisoned men bond over a number of years, finding solace and eventual
          redemption through acts of common decency.
        </TruncateText>
      </TableControlled.Cell>
    </TableControlled.Row>
  </TableControlled.Body>
</TableControlled>
```

### A sortable table

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
      <div>
        <TableControlled
          caption={<ScreenReaderContent>{`${caption}: sorted by ${sortBy} in ${direction} order`}</ScreenReaderContent>}
        >
          <TableControlled.Head>
            <TableControlled.Row>
              {(headers || []).map(({ id, text }) => (
                 <TableControlled.ColHeader
                   key={id}
                   id={id}
                   onRequestSort={this.handleSort}
                   sortDirection={id === sortBy ? direction : 'none'}
                 >
                   {text}
                 </TableControlled.ColHeader>
               ))}
            </TableControlled.Row>
          </TableControlled.Head>
          <TableControlled.Body>
            {sortedRows.map((row) => (
              <TableControlled.Row key={row.id}>
                {headers.map(({ id }) => (
                  <TableControlled.Cell key={id}>
                    {row[id]}
                  </TableControlled.Cell>
                ))}
              </TableControlled.Row>
            ))}
          </TableControlled.Body>
        </TableControlled>
        <Alert
          liveRegion={() => document.getElementById('flash-messages')}
          liveRegionPoliteness="polite"
          screenReaderOnly
        >
          {`Sorted by ${sortBy} in ${direction} order`}
        </Alert>
      </div>
    )
  }
}

render(
  <SortableTable
    caption="Top rated movies"
    headers={[
      {
        id: 'rank',
        text: 'Rank'
      },
      {
        id: 'title',
        text: 'Title'
      },
      {
        id: 'year',
        text: 'Year'
      },
      {
        id: 'rating',
        text: 'Rating',
      },
    ]}
    rows={[
      {
        id: '1',
        rank: 1,
        title: 'The Shawshank Redemption',
        year: 1994,
        rating: 9.3,
      },
      {
        id: '2',
        rank: 2,
        title: 'The Godfather',
        year: 1972,
        rating: 9.2,
      },
      {
        id: '3',
        rank: 3,
        title: 'The Godfather: Part II',
        year: 1974,
        rating: 9.0,
      },
      {
        id: '4',
        rank: 4,
        title: 'The Dark Knight',
        year: 2008,
        rating: 9.0,
      },
      {
        id: '5',
        rank: 5,
        title: '12 Angry Men',
        year: 1957,
        rating: 8.9,
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
      <div>
        <View
          as="div"
          padding="small"
          background="inverse"
          aria-live="polite"
          aria-atomic="true"
        >
          {`${selected.size} selected`}
        </View>
        <TableControlled
          caption={<ScreenReaderContent>{`${caption}: sorted by ${sortBy} in ${direction} order`}</ScreenReaderContent>}
        >
          <TableControlled.Head>
            <TableControlled.Row>
              <TableControlled.ColHeader id="select-all">
                <Checkbox
                  label={<ScreenReaderContent>Select all</ScreenReaderContent>}
                  onChange={() => this.handleSelectAll(allSelected)}
                  checked={allSelected}
                  indeterminate={someSelected}
                />
              </TableControlled.ColHeader>
              {(headers || []).map(({ id, text }) => (
                 <TableControlled.ColHeader
                   key={id}
                   id={id}
                   onRequestSort={onSort}
                   sortDirection={id === sortBy ? direction : 'none'}
                 >
                   {text}
                 </TableControlled.ColHeader>
               ))}
            </TableControlled.Row>
          </TableControlled.Head>
          <TableControlled.Body>
            {(rows || []).map((row) => {
              const rowSelected = selected.has(row.id)

              return (
                <TableControlled.Row key={row.id}>
                  <TableControlled.RowHeader>
                    <Checkbox
                      label={<ScreenReaderContent>Select row</ScreenReaderContent>}
                      onChange={() => this.handleSelectRow(rowSelected, row.id)}
                      checked={rowSelected}
                    />
                  </TableControlled.RowHeader>
                  {(headers || []).map(({ id, renderCell }) => (
                    <TableControlled.Cell key={id}>
                      {renderCell ? renderCell(row[id]) : row[id]}
                    </TableControlled.Cell>
                  ))}
                </TableControlled.Row>
              )
            })}
          </TableControlled.Body>
        </TableControlled>
        <Alert
          liveRegion={() => document.getElementById('flash-messages')}
          liveRegionPoliteness="polite"
          screenReaderOnly
        >
          {`Sorted by ${sortBy} in ${direction} order`}
        </Alert>
      </div>
    )
  }
}

class PaginatedTable extends React.Component {
  constructor(props) {
    super(props)
    const { perPage } = props

    this.state = {
      page: 0,
    }
  }

  handleClick = (page) => {
    this.setState({
      page,
    })
  }

  handleSort = (event, { id }) => {
    const { onSort } = this.props

    this.setState({
      page: 0,
    })
    onSort(event, {
      id,
    })
  }

  render() {
    const { caption, headers, rows, sortBy, ascending, perPage } = this.props
    const { page } = this.state
    const startIndex = page * perPage
    const slicedRows = rows.slice(startIndex, startIndex + perPage)
    const pageCount = perPage && Math.ceil(rows.length / perPage)

    return (
      <View as='div'>
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
              <PaginationButton
                key={index}
                onClick={() => this.handleClick(index)}
                current={index === page}
              >
                {index + 1}
              </PaginationButton>
            ))}
          </Pagination>
        )}
      </View>
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
      <PaginatedTable
        caption={caption}
        headers={headers}
        rows={sortedRows}
        onSort={this.handleSort}
        sortBy={sortBy}
        ascending={ascending}
        perPage={perPage}
      />
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
        id: 'rank',
        text: 'Rank'
      },
      {
        id: 'title',
        text: 'Title'
      },
      {
        id: 'year',
        text: 'Year'
      },
      {
        id: 'rating',
        text: 'Rating',
        renderCell: renderRating,
      },
    ]}
    rows={[
      {
        id: '1',
        rank: 1,
        title: 'The Shawshank Redemption',
        year: 1994,
        rating: 9.3,
      },
      {
        id: '2',
        rank: 2,
        title: 'The Godfather',
        year: 1972,
        rating: 9.2,
      },
      {
        id: '3',
        rank: 3,
        title: 'The Godfather: Part II',
        year: 1974,
        rating: 9.0,
      },
      {
        id: '4',
        rank: 4,
        title: 'The Dark Knight',
        year: 2008,
        rating: 9.0,
      },
      {
        id: '5',
        rank: 5,
        title: '12 Angry Men',
        year: 1957,
        rating: 8.9,
      },
    ]}
    perPage={3}
  />
)
```
