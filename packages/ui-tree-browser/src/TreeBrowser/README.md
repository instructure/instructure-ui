---
describes: TreeBrowser
---

The `<TreeBrowser/>` component provides a keyboard accessible tree structure. The component expects
to receive a normalized data structure, examples can be seen at https://github.com/paularmstrong/normalizr.

```js
---
example: true
---
<TreeBrowser
  collections={{
    1: {
      id: 1,
      name: "Assignments",
      collections: [2,3],
      items: [3],
      descriptor: "Class Assignments"
    },
    2: { id: 2, name: "English Assignments", collections: [4], items: [] },
    3: { id: 3, name: "Math Assignments", collections: [5], items: [1,2] },
    4: { id: 4, name: "Reading Assignments", collections: [], items: [4] },
    5: { id: 5, name: "Advanced Math Assignments", items: [5]}
  }}
  items={{
    1: { id: 1, name: "Addition Worksheet" },
    2: { id: 2, name: "Subtraction Worksheet" },
    3: { id: 3, name: "General Questions" },
    4: { id: 4, name: "Vogon Poetry" },
    5: { id: 5, name: "Bistromath", descriptor: "Explain the Bistromathic Drive" }
  }}
  defaultExpanded={[1, 3]}
  rootId={1}
/>
```

### Managing State
`<TreeBrowser />` can be fully controlled. The following example uses the `onCollectionToggle` callback function to set the state. It then uses the `expanded` prop to configure which collections are open or closed.

```js
---
example: true
render: false
---
class Example extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      expanded: [2]
    }
  }

  handleCollectionClick = (id, collection) => {
    console.log(collection.id)
  };

  handleCollectionToggle = (collection) => {
    this.setState((state) => {
      const expanded = [...state.expanded]
      const index = expanded.indexOf(collection.id)

      if (!collection.expanded) {
        expanded.splice(index, 1)
      } else if (index < 0) {
        expanded.push(collection.id)
      }

      return { expanded }
    })
  };

  render () {
    return (
      <TreeBrowser
        variant="indent"
        selectionType="single"
        collections={{
          1: { id: 1, name: "Grade 1", collections: [2,3,6] },
          2: { id: 2, name: "Math Outcomes", collections: [4], items: [3,4], descriptor: "1 Group | 2 Outcomes" },
          3: { id: 3, name: "Reading Outcome", collections: [5], items: [1,2], descriptor: "1 Group | 2 Outcomes" },
          4: { id: 4, name: "Advanced Math", items: [6], descriptor: "1 Outcome" },
          5: { id: 5, name: "Advanced Reading", items: [5], descriptor: "1 Group | 2 Outcomes" },
          6: { id: 6, name: "Advanced Outcomes", items: [5,6], descriptor: "2 Outcomes" },
        }}
        items={{
          1: { id: 1, name: "Can read" },
          2: { id: 2, name: "Can write" },
          3: { id: 3, name: "Can add" },
          4: { id: 4, name: "Can subtract" },
          5: { id: 5, name: "Can read Shakespeare" },
          6: { id: 6, name: "Can do quantum physics" }
        }}
        showRootCollection={false}
        rootId={1}
        expanded={this.state.expanded}
        onCollectionToggle={this.handleCollectionToggle}
        onCollectionClick={this.handleCollectionClick}
      />
    )
  }
}

render(<Example/>)
```

### Customizing Icons
All of the `<TreeBrowser>` icons are customizable. The following example sets custom icons for the expanded and collapsed state of the collections along with each of the items.

```js
---
example: true
---
<TreeBrowser
  collections={{
    1: {
      id: 1,
      name: "Grades",
      collections: [],
      items: [1,2,3]
    },
  }}
  items={{
    1: { id: 1, name: "Sarah" },
    2: { id: 2, name: "Jenny" },
    3: { id: 3, name: "Juan" }
  }}
  defaultExpanded={[1]}
  collectionIcon={IconGradebookLine}
  collectionIconExpanded={IconXSolid}
  itemIcon={IconUserSolid}
  rootId={1}
  size="large"
/>
```

You can also specify a different icon for each item if needed. To do this, use `getItemProps`. This function is called with the props for each item and returns new props you specify. These props are then passed to the item when it is rendered. In the following example, we override the `itemIcon` prop depending on the item name.

```js
---
example: true
---
<TreeBrowser
  collections={{
    1: {
      id: 1,
      name: "Saved",
      collections: [],
      items: [1,2,3]
    },
  }}
  items={{
    1: { id: 1, name: "Modules" },
    2: { id: 2, name: "Videos" },
    3: { id: 3, name: "Students" }
  }}
  defaultExpanded={[1]}
  rootId={1}
  size="large"
  getItemProps={({ name, ...props }) => {
    let itemIcon = IconUserSolid

    if (name === 'Modules') {
      itemIcon = IconModuleLine
    }

    if (name === 'Videos') {
      itemIcon = IconVideoLine
    }

    return {
      ...props, // Be sure to pass the rest of the props along
      itemIcon,
      name
    }
  }}
/>
```


### Thumbnails
An example of a `<TreeBrowser />` with thumbnail images.

```js
---
example: true
---
<TreeBrowser
  collections={{
    1: {
      id: 1,
      name: "Pandas",
      collections: [],
      items: [1,2,3]
    },
  }}
  items={{
    1: { id: 1, name: "Bao Bao", thumbnail: avatarSquare },
    2: { id: 2, name: "Bei Bei" },
    3: { id: 3, name: "Mei Xiang", thumbnail: avatarPortrait }
  }}
  defaultExpanded={[1]}
  itemIcon={IconUserSolid}
  rootId={1}
  size="large"
/>
```
### Guidelines

```js
---
guidelines: true
---
<Guidelines>
  <Figure recommendation="yes" title="Do">
    <Figure.Item>Use for browsing hierarchical content</Figure.Item>
  </Figure>
  <Figure recommendation="no" title="Don't">
    <Figure.Item>Use for site navigation</Figure.Item>
  </Figure>
</Guidelines>
```
