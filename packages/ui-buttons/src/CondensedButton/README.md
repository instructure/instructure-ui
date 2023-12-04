---
describes: CondensedButton
---

CondensedButton is a button component that renders without padding. It is meant specifically for tight spaces, or areas where the button padding would prevent the button content from aligning correctly with other elements.

```js
---
type: example
---
<View display="block" background="primary" padding="small">
  <CondensedButton>Click Me</CondensedButton>
</View>
```

In the following example, CondensedButton is used so that the button content can align with the rest of the table cell content.

```js
---
type: example
---
<Table caption='Tallest Roller Coasters'>
  <Table.Head>
    <Table.Row>
      <Table.ColHeader id="Roller Coaster">
        Roller Coaster
      </Table.ColHeader>
      <Table.ColHeader id="Height">
        Height
      </Table.ColHeader>
      <Table.ColHeader id="Amusement Park">
        Amusement Park
      </Table.ColHeader>
    </Table.Row>
  </Table.Head>
  <Table.Body>
    <Table.Row>
      <Table.Cell>
        Kingda Ka<br />
        <CondensedButton>View Advanced Stats</CondensedButton>
      </Table.Cell>
      <Table.Cell>
        456.0ft
      </Table.Cell>
      <Table.Cell>
        Six Flags Great America
      </Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell>
        Top Thrill Dragster<br />
        <CondensedButton>View Advanced Stats</CondensedButton>
      </Table.Cell>
      <Table.Cell>
        420.0ft
      </Table.Cell>
      <Table.Cell>
        Cedar Point
      </Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell>
        Superman: Escape from Krypton<br />
        <CondensedButton>View Advanced Stats</CondensedButton>
      </Table.Cell>
      <Table.Cell>
        415.0ft
      </Table.Cell>
      <Table.Cell>
        Six Flags Magic Mountain
      </Table.Cell>
    </Table.Row>
  </Table.Body>
</Table>
```
