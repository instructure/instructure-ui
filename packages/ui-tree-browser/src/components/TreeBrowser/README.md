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
    1: { id: 1, name: "Addition Worksheet"},
    2: { id: 2, name: "Subtraction Worksheet"},
    3: { id: 3, name: "General Questions" },
    4: { id: 4, name: "Vogon Poetry"},
    5: { id: 5, name: "Bistromath", descriptor: "Explain the Bistromathic Drive" }
  }}
  defaultExpanded={[1, 3]}
  rootId={1}
  showFulltext
/>
```

An example of a controlled `<TreeBrowser />` with custom icons and selection highlighting:

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
        collectionIcon={IconUser.Line}
        collectionIconExpanded={IconX.Line}
        itemIcon={IconUser.Line}
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

An example of a `<TreeBrowser />` with thumbnails:

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
    1: { id: 1, name: "Bao Bao", thumbnail: avatarSquare},
    2: { id: 2, name: "Bei Bei"},
    3: { id: 3, name: "Mei Xiang", thumbnail: avatarPortrait}
  }}
  defaultExpanded={[1]}
  itemIcon={IconUser.Solid}
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
    <FigureItem>Use for browsing hierarchical content</FigureItem>
  </Figure>
  <Figure recommendation="no" title="Don't">
    <FigureItem>Use for site navigation</FigureItem>
  </Figure>
</Guidelines>
```
