import { Table } from '@instructure/ui-table'

const thisWontBeDetected = { caption: 'this is a table' }

export default function Example() {
  return (
    <Table {...thisWontBeDetected}>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Cell 1</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  )
}
