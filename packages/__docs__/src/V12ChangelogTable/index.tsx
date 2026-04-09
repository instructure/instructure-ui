/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 - present Instructure, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { Table } from '@instructure/ui-table'
import { Heading } from '@instructure/ui-heading'
import { View } from '@instructure/ui-view'
import { Text } from '@instructure/ui-text'

type V12ChangelogTableProps = {
  removed?: {
    name: string
    note: string
  }[]
  added?: {
    name: string
    note: string
  }[]
  changed?: {
    oldName: string
    newName: string
    note: string
  }[]
}

const V12ChangelogTable = ({
  removed,
  added,
  changed
}: V12ChangelogTableProps) => {
  return (
    <View as="div" margin="large 0">
      <Heading level="h4" margin="0 0 small">
        Theme variable changes
      </Heading>
      {removed && (
        <View as="div" margin="medium 0">
          <Heading level="h4" margin="0 0 small">
            Removed
          </Heading>
          <Table caption={`Removed variables`} layout="auto">
            <Table.Head>
              <Table.Row>
                <Table.ColHeader id="removed-name">
                  Variable name
                </Table.ColHeader>
                <Table.ColHeader id="removed-note">Note</Table.ColHeader>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {removed.map((data, index) => (
                <Table.Row key={`removed-${index}`}>
                  <Table.Cell>
                    <Text color="danger">{data.name}</Text>
                  </Table.Cell>
                  <Table.Cell>{data.note}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </View>
      )}

      {added && (
        <View as="div" margin="medium 0">
          <Heading level="h4" margin="0 0 small">
            Added
          </Heading>
          <Table caption={`Added variables`} layout="auto">
            <Table.Head>
              <Table.Row>
                <Table.ColHeader id="added-name">Variable name</Table.ColHeader>
                <Table.ColHeader id="added-note">Note</Table.ColHeader>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {added.map((data, index) => (
                <Table.Row key={`added-${index}`}>
                  <Table.Cell>
                    <Text color="success">{data.name}</Text>
                  </Table.Cell>
                  <Table.Cell>{data.note}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </View>
      )}

      {changed && (
        <View as="div" margin="medium 0">
          <Heading level="h4" margin="0 0 small">
            Renamed
          </Heading>
          <Table caption={`Renamed variables`} layout="auto">
            <Table.Head>
              <Table.Row>
                <Table.ColHeader id="changed-old">Old variable</Table.ColHeader>
                <Table.ColHeader id="changed-new">New variable</Table.ColHeader>
                <Table.ColHeader id="changed-note">Note</Table.ColHeader>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {changed.map((data, index) => (
                <Table.Row key={`changed-${index}`}>
                  <Table.Cell>
                    <Text color="warning">{data.oldName}</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text color="success">{data.newName}</Text>
                  </Table.Cell>
                  <Table.Cell>{data.note}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </View>
      )}
    </View>
  )
}

export default V12ChangelogTable
export { V12ChangelogTable }
