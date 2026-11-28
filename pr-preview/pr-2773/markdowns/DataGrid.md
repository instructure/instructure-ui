# DataGrid


> **Work in progress.** `DataGrid` is under development. Its API will change and it is not ready for production use.

`DataGrid` is a data table built on [TanStack Table](https://tanstack.com/table/v9) (v9).

### Basic DataGrid

Pass `data` and TanStack `columns`. `caption` is the screen reader description of the table.

```js
---
type: example
---
const Example = () => {
  const columns = [
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'role', header: 'Role' },
    { accessorKey: 'age', header: 'Age' }
  ]

  const data = [
    { name: 'Ada Lovelace', role: 'Mathematician', age: 36 },
    { name: 'Grace Hopper', role: 'Computer scientist', age: 85 },
    { name: 'Katherine Johnson', role: 'Mathematician', age: 101 }
  ]

  return (
    <DataGrid
      caption="Famous computing pioneers"
      columns={columns}
      data={data}
    />
  )
}

render(<Example />)
```

### Pagination

Pass `pagination` to split the rows into pages and render a [Pagination](Pagination) below the table. `pageSize` is the number of rows per page and `initialPageIndex` is the zero-based page to show initially. `labelNext` and `labelPrev` are the accessible labels of the arrow buttons, and the optional `screenReaderLabelPageButton` labels the page number buttons.

```js
---
type: example
---
const Example = () => {
  const columns = [
    { accessorKey: 'id', header: 'ID' },
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'department', header: 'Department' }
  ]

  const departments = ['Math', 'Physics', 'Computing', 'Chemistry']
  const data = Array.from({ length: 47 }, (_, i) => ({
    id: i + 1,
    name: `Person ${i + 1}`,
    department: departments[i % departments.length]
  }))

  return (
    <DataGrid
      caption="Staff directory"
      columns={columns}
      data={data}
      pagination={{
        initialPageIndex: 0,
        pageSize: 10,
        labelNext: 'Next page',
        labelPrev: 'Previous page',
        screenReaderLabelPageButton: (page, total) =>
          `Page ${page} of ${total}`
      }}
    />
  )
}

render(<Example />)
```

### Expanding rows

Pass `expandedRows` to make rows expandable. `getSubRows` returns the child rows of a row, and rows with children get an expand/collapse button in their first cell. `labelExpandRow` and `labelCollapseRow` are the accessible labels of that button.

All rows start collapsed. Set `showExpandButtons` to `false` to hide the buttons and show every row expanded.

```js
---
type: example
---
const Example = () => {
  const [showExpandButtons, setShowExpandButtons] = useState(true)

  const columns = [
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'role', header: 'Role' }
  ]

  const data = [
    {
      name: 'Engineering',
      role: 'Department',
      subRows: [
        {
          name: 'Frontend',
          role: 'Team',
          subRows: [
            { name: 'Ada Lovelace', role: 'Engineer' },
            { name: 'Grace Hopper', role: 'Engineer' }
          ]
        },
        { name: 'Katherine Johnson', role: 'Engineering manager' }
      ]
    },
    { name: 'Design', role: 'Department' }
  ]

  return (
    <View as="div">
      <Checkbox
        variant="toggle"
        label="Show expand buttons"
        checked={showExpandButtons}
        onChange={() => setShowExpandButtons(!showExpandButtons)}
        margin="0 0 small"
      />
      <DataGrid
        caption="Company structure"
        columns={columns}
        data={data}
        expandedRows={{
          getSubRows: (row) => row.subRows,
          showExpandButtons,
          labelExpandRow: 'Expand row',
          labelCollapseRow: 'Collapse row'
        }}
      />
    </View>
  )
}

render(<Example />)
```

### Sorting

Pass `sorting` to make the column headers sortable. Clicking a header cycles its column through `ascending`, `descending` and unsorted (`none`). Only one column is sorted at a time, so sorting by another column clears the previous sort.

Features:

- The sort function of a column is inferred automatically from its values; InstUI's wrapper supports Tanstack's [alphanumeric, text, datetime, basic functions](https://tanstack.com/table/latest/docs/framework/react/guide/sorting#sorting-rowmodelfns).
- `labelSortColumn` returns the accessible label of a header button. It receives the header text and the current sort direction of the column, and should return an accessible label, e.g. "Sort by Name". When a column header is not a string, the column id is passed instead.
- `defaultSort` (optional) sorts by a column initially.
- `enableSorting` in a column definition to leave that column unsortable.
- Expanded rows are sorted within their parent row.

```js
---
type: example
---
const Example = () => {
  const columns = [
    { accessorKey: 'name', header: 'Name', id: 'name' },
    { accessorKey: 'role', header: 'Role', id: 'role' },
    {
      accessorKey: 'born',
      header: 'Born',
      id: 'born',
      cell: ({ getValue }) =>
        getValue().toLocaleDateString('en-US', {
          dateStyle: 'medium',
          timeZone: 'UTC'
        })
    },
    { accessorKey: 'age', header: 'Age', enableSorting:false }
  ]

  const data = [
    { name: 'Grace Hopper', role: 'Computer scientist', born: new Date('1906-12-09'), age: 85 },
    { name: 'Ada Lovelace', role: 'Mathematician', born: new Date('1815-12-10'), age: 36 },
    { name: 'Katherine Johnson', role: 'Mathematician', born: new Date('1918-08-26'), age: 101 },
    { name: 'John Doe', role: 'Mathematician', born: new Date('2001-05-17'), age: 23 },
    { name: 'Isaac Newton', role: 'physicist', born: new Date('1643-01-04'), age: 43 },
    { name: 'John Von Neumann', role: 'Computer scientist', born: new Date('1903-12-28'), age: 76 }
  ]

  return (
    <DataGrid
      caption="Famous computing pioneers"
      columns={columns}
      data={data}
      sorting={{
        labelSortColumn: (sortByHeader, sortDirection) =>
          sortDirection === 'none'
            ? `Sort by ${sortByHeader}`
            : `${sortByHeader}, sorted ${sortDirection}. Change sort order`,
        defaultSort: { columnId: 'role', direction: 'descending' }
      }}
    />
  )
}

render(<Example />)
```

### Putting it together

`pagination`, `expandedRows` and `sorting` work together. Expanded sub rows count toward `pageSize`, so the number of pages grows and shrinks as rows are expanded and collapsed. Sorting applies to all pages, and sub rows are sorted within their parent.

```js
---
type: example
---
const Example = () => {
  const [showExpandButtons, setShowExpandButtons] = useState(true)

  const columns = [
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'role', header: 'Role' },
    { accessorKey: 'location', header: 'Location' }
  ]

  const locations = ['Salt Lake City', 'London', 'Budapest', 'Sydney']
  const data = Array.from({ length: 12 }, (_, i) => ({
    name: `Team ${i + 1}`,
    role: 'Team',
    location: locations[i % locations.length],
    subRows: Array.from({ length: 3 }, (_, j) => ({
      name: `Member ${i + 1}.${j + 1}`,
      role: 'Engineer',
      location: locations[(i + j) % locations.length]
    }))
  }))

  return (
    <View as="div">
      <Checkbox
        variant="toggle"
        label="Show expand buttons"
        checked={showExpandButtons}
        onChange={() => setShowExpandButtons(!showExpandButtons)}
        margin="0 0 small"
      />
      <DataGrid
        caption="Engineering teams"
        columns={columns}
        data={data}
        pagination={{
          initialPageIndex: 0,
          pageSize: 8,
          labelNext: 'Next page',
          labelPrev: 'Previous page',
          screenReaderLabelPageButton: (page, total) =>
            `Page ${page} of ${total}`
        }}
        expandedRows={{
          getSubRows: (row) => row.subRows,
          showExpandButtons,
          labelExpandRow: 'Expand row',
          labelCollapseRow: 'Collapse row'
        }}
        sorting={{
          labelSortColumn: (sortByHeader, sortDirection) =>
            sortDirection === 'none'
              ? `Sort by ${sortByHeader}`
              : `${sortByHeader}, sorted ${sortDirection}. Change sort order`
        }}
      />
    </View>
  )
}

render(<Example />)
```


### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| DataGrid | data | `TData[]` | Yes | - | The rows to display. Each item becomes one row. |
| DataGrid | columns | `ColumnDef<TFeatures, TData>[]` | Yes | - | TanStack Table column definitions describing how to read and render each column. |
| DataGrid | caption | `string` | Yes | - | A screen reader friendly description of the table. |
| DataGrid | pagination | `{ /** * The zero-based index of the page to show initially. */ initialPageIndex: number /** * The number of rows on each page. */ pageSize: number /** * Accessible label for the next page button. */ labelNext: string /** * Accessible label for the previous page button. */ labelPrev: string /** * Accessible label for a page number button, given the page and the total page count. */ screenReaderLabelPageButton?: ( currentPage: number, totalPageNumber: number ) => string }` | No | - | Turns on pagination. `initialPageIndex` is the zero-based initial page and `pageSize` is the number of rows per page. The label props are the text for the pagination controls. |
| DataGrid | expandedRows | `{ /** * Returns the child rows of a row, which makes the row expandable. * Rows without children have no expand button. */ getSubRows: ( originalRow: TData, index: number ) => undefined \| ReadonlyArray<TData> /** * Whether the expand/collapse buttons are visible. When they are hidden, * all rows are expanded. Defaults to `true`. */ showExpandButtons?: boolean /** * Accessible label for the expand button of a collapsed row. */ labelExpandRow: string /** * Accessible label for the collapse button of an expanded row. */ labelCollapseRow: string }` | No | - | Turns on expandable rows. Rows with children (see `getSubRows`) get an expand button, and all rows start collapsed. |
| DataGrid | sorting | `{ /** * Returns the accessible label of a sortable header button, given the header * text and the current sort direction of its column. */ labelSortColumn: ( sortByHeader: string, sortDirection: DataGridSortDirection ) => string /** * The sort to apply initially. Without it the rows start in their original order. */ defaultSort?: { /** * id of the column (the `accessorKey` unless the column has an `id`) */ columnId: string direction: Exclude<DataGridSortDirection, 'none'> } }` | No | - | Turns on sorting. Clicking a column header changes sorting order, and only one column is sorted at a time. Columns opt out with `enableSorting: false` in their definition. |

### Usage

Install the package:

```shell
npm install @instructure/ui-table
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { DataGrid } from '@instructure/ui-table/v11_7'
```

