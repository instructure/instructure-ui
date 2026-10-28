---
describes: DataGrid
---

> **Work in progress.** `DataGrid` is under development. Its API will change and it is not ready for production use.

`DataGrid` is a data table built on [TanStack Table](https://tanstack.com/table/latest) (v9).

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

Pass `pagination` to split the rows into pages and render a [Pagination](Pagination) below the table. `pageSize` is the number of rows per page and `pageIndex` is the zero-based page to show initially. `labelNext` and `labelPrev` are the accessible labels of the arrow buttons, and the optional `screenReaderLabelPageButton` labels the page number buttons.

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
        pageIndex: 0,
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
