# DataGrid


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


### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| DataGrid | data | `TData[]` | Yes | - | The rows to display. Each item becomes one row. |
| DataGrid | columns | `ColumnDef<TFeatures, TData>[]` | Yes | - | TanStack Table column definitions describing how to read and render each column. |
| DataGrid | caption | `string` | Yes | - | A screen reader friendly description of the table. |

### Usage

Install the package:

```shell
npm install @instructure/ui-table
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { DataGrid } from '@instructure/ui-table'
```

