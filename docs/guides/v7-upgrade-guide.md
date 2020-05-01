---
title: Upgrade Guide for Version 7.0
category: Guides
order: 1
---

# Upgrade Guide for Version 7.0

The following steps can be done in small commits prior to upgrading to version 7.0. __Note: You will need to be on at least 6.14.0 to have access to all the new packages.__
* Upgrade all instances of the following components
  - [Table from @instructure/ui-elements](#v7-upgrade-guide/#upgrade-guide-for-version-7.0-table)
  - [DateInput from @instructure/ui-forms](#v7-upgrade-guide/#upgrade-guide-for-version-7.0-dateinput)
  - [DateTimeInput from @instructure/ui-forms](#v7-upgrade-guide/upgrade-guide-for-version-7.0-datetimeinput)
  - [Select from @instructure/ui-forms](#v7-upgrade-guide/upgrade-guide-for-version-7.0-select)

* Migrate all component imports via codemod
```js
npx @instructure/instui-cli codemod --scope-modifications imports
```

```javascript
---
embed: true
---
<ToggleBlockquote
  summary="Version 7.0 set-up"
>
  <List>
    <List.Item>
      Migrate off React 15
    </List.Item>
    <List.Item>
      Ensure you are using React 16
    </List.Item>
    <List.Item>
      Drop support for Internet Explorer 11 (IE11)
    </List.Item>
    <List.Item>
      Remove any unnecessary polyfill, transpile, and prefix dependencies that were needed for IE11
    </List.Item>
    <List.Item>
      Bump instructure-ui dependencies to 7.0
    </List.Item>
  </List>
</ToggleBlockquote>
```
### React 16 and beyond
With the move to drop support for React 15, the Instructure UI library will be better positioned to take advantage of some of the features available in React 16 (fragments, error boundaries, portals, support for custom DOM attributes, improved server-side rendering, and reduced file size). This decision also lays the groundwork for supporting React 17.

### Goodbye to IE11
With version 7, Instructure UI lightens its load by dropping support for IE11. (As a point of reference, Development of IE came to an end in 2015 and Canvas dropped support back in August 2019.) Not having to make the library backwards-compatible with an outdated, unmaintained browser allows us to remove a ton of dependencies.

The following IE11 specific utilities have been removed from ui-themeable. If they're used in your application, they should also be removed from your codebase:
- getCssTextWithPolyfill
- getCssTextWithVariables
- applyVariablesPolyfillToNode
- applyVariablesToNodeStyle


```javascript
---
embed: true
---
<ToggleBlockquote
  summary="Migrations and codemods"
>
  <List>
    <List.Item>
      Individual package components
    </List.Item>
    <List.Item>
      A new meta package, <code>@instructure/ui</code>
    </List.Item>
    <List.Item>
      Updated codemods for package migration
    </List.Item>
    <List.Item>
      Updated import codemod
    </List.Item>
  </List>
</ToggleBlockquote>
```

### Codemods for package migration
To reduce confusion, we looked to improve the organization of our codebase for version 7. That involved migrating most components to their own packages. This eliminated circular dependencies and resulted in more predictability moving forward.

```js
/* Previous */
import { Avatar } from '@instructure/ui-elements'
/* Upgraded Single Package */
import { Avatar } from '@instructure/ui-avatar'
```

We understand this was helpful for us, but can make for a frustrating upgrade. We did a few things to try and mitigate this pain:

- __Introduction of a meta component package__<br/>
`@instructure/ui` is a new package that was created to export all components from a single location. This requires no knowledge of the Instructure UI package organization and can be less keystrokes when adding multiple imports. It also serves as an abstraction layer so the consuming app no longer cares about where components live. If you go with this option, ensure you have tree shaking properly configured to keep your bundle size down.

- __Codemods to automate import migrations__<br/>
Import changes can be completely automated using the following command in your repo root. You will be given the option to migrate all imports to individual packages or the universal '@instructure/ui' package mentioned above.

```js
npx @instructure/instui-cli codemod --scope-modifications imports
```

### Discontinued CommonJS build output
Instructure UI has discontinued CommonJS build output for components (found in each component package's `lib` directory). Moving forward, components will only provide the ES modules output as before. This should reduce confusion, provide a single source of truth for build output, along with continued support for tree shaking. You can view the import options under the `Usage` section of each component page. 
```js
/* Previous */
import { Avatar } from '@instructure/ui-avatar/lib/Avatar'
/* Upgraded */
import { Avatar } from '@instructure/ui-avatar'
```
Using the following command from your repo root, the codemods will update the imports for you automatically.
```js
npx @instructure/instui-cli codemod --scope-modifications imports
```

### Manual upgrades
```javascript
---
embed: true
---
<ToggleBlockquote
  summary="Some assembly required"
>
  <ToggleBlockquote.Paragraph>
    We have tried our best to provide codemods for as many things as possible, however, there are a few items that will require the consuming apps to make some manual upgrades. Please see the detailed examples below for the best path forward.
  </ToggleBlockquote.Paragraph>
</ToggleBlockquote>
```

### Table
The updated import path for the Table component is `@instructure/ui-table`. The table below outlines the code/props that will need to be manually upgraded. Additional mention: the `caption` prop is now rendered using `<ScreenReaderContent>` so there is no need to wrap the string as was required previously. See the simplified 'previous' and 'upgraded' examples below. For best practices on building responsive tables see [Table](/#Table) component documentation.
 
| Previous | Upgraded | Codemods Available? |
|----------|-----------------|-------------------|
| `@instructure/ui-elements` | `@instructure/ui-table` | Yes |
| `thead` | Change to `Table.Head` | No |
| `th scope="col"` | Change to `Table.ColHeader` | No |
| `th scope="row"` | Change to `Table.RowHeader` | No |
| `tbody` | Change to `Table.Body` | No |
| `tr` | Change to `Table.Row` | No |
| `td` | Change to `Table.Cell` | No |

<!-- //////////////////////////////////// -->
<!-- THIS IS WHERE THE TABLE STUFF STARTS -->
<!-- //////////////////////////////////// -->
```javascript
---
embed: true
theme: 'canvas'
---
<View as="div" margin="large">
  <Table caption="My Table">
    <Table.Head>
      <Table.Row>
        <Table.ColHeader id="Prop">Rank</Table.ColHeader>
        <Table.ColHeader id="Type">Title</Table.ColHeader>
        <Table.ColHeader id="Default">Year</Table.ColHeader>
        <Table.ColHeader id="Description">Rating</Table.ColHeader>
      </Table.Row>
    </Table.Head>
    <Table.Body>
      <Table.Row>
        <Table.Cell>
          1
        </Table.Cell>
        <Table.Cell>
          The Shawshank Redemption
        </Table.Cell>
        <Table.Cell>
          1994
        </Table.Cell>
        <Table.Cell>
          9.3
        </Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
</View>
```

#### Upgrade example for a basic Table
```js
/* Previous */
import { Table } from '@instructure/ui-elements'

<Table caption={<ScreenReaderContent>My Table</ScreenReaderContent>}>
  <thead>
    <tr>
      <th scope="col">Rank</th>
      <th scope="col">Title</th>
      <th scope="col">Year</th>
      <th scope="col">Rating</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        1
      </td>
      <td>
        The Shawshank Redemption
      </td>
      <td>
        1994
      </td>
      <td>
        9.3
      </td>
    </tr>
  </tbody>
</Table>

/* Upgraded */
import { Table } from '@instructure/ui-table'

<Table caption="My Table">
  <Table.Head>
    <Table.Row>
      <Table.ColHeader id="Prop">Rank</Table.ColHeader>
      <Table.ColHeader id="Type">Title</Table.ColHeader>
      <Table.ColHeader id="Default">Year</Table.ColHeader>
      <Table.ColHeader id="Description">Rating</Table.ColHeader>
    </Table.Row>
  </Table.Head>
  <Table.Body>
    <Table.Row>
      <Table.Cell>
        1
      </Table.Cell>
      <Table.Cell>
        The Shawshank Redemption
      </Table.Cell>
      <Table.Cell>
        1994
      </Table.Cell>
      <Table.Cell>
        9.3
      </Table.Cell>
    </Table.Row>
  </Table.Body>
</Table>
```

<!-- //////////////////////////////////////// -->
<!-- THIS IS WHERE THE DATEINPUT STUFF STARTS -->
<!-- //////////////////////////////////////// -->

### DateInput

DateInput has been removed from ui-forms; use DateInput from `ui-date-input` instead. DateInput is a controlled only component and will need to be composed in the consuming app. View the [component documentation](#DateInput) for examples of managing state for the updated DateInput.


<!-- ////////////////////////////////////////////// -->
<!-- THIS IS WHERE THE DATE/TIME INPUT STUFF STARTS -->
<!-- ////////////////////////////////////////////// -->

### DateTimeInput
DateTimeInput has been removed from ui-forms. See a __read only__ example of implementing a [DateTime Input Pattern](/#TimeDate) using Select and DateInput.


<!-- ///////////////////////////////////// -->
<!-- THIS IS WHERE THE SELECT STUFF STARTS -->
<!-- ///////////////////////////////////// -->

### Select
Select within the ui-forms package has been removed; use [Select](/#Select) from `ui-select` instead. Similar to DateInput, Select is a controlled only component that will need to be composed in the consuming app. Examples are available for managing state within this new component. 

__Important note:__ If you do not need the level of customization that ui-select/Select provides, use SimpleSelect instead (available from the `ui-simple-select` package). SimpleSelect closely parallels the functionality of a standard HTML `<select>`. View the [SimpleSelect documentation](#SimpleSelect) for detailed examples.
