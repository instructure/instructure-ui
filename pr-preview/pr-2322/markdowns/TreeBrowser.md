# TreeBrowser


The `<TreeBrowser/>` component provides a keyboard accessible tree structure. The component expects
to receive a normalized data structure, examples can be seen at https://github.com/paularmstrong/normalizr.

### Size

- ```js
  class Example extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        size: 'medium'
      }

      this.sizes = ['small', 'medium', 'large']
    }

    handleSizeSelect = (e, size) => {
      this.setState({ size })
    }

    render() {
      return (
        <>
          <View display="block" margin="none none medium">
            <RadioInputGroup
              name="treeBrowserSize"
              defaultValue="medium"
              description={
                <ScreenReaderContent>
                  TreeBrowser size selector
                </ScreenReaderContent>
              }
              variant="toggle"
              onChange={this.handleSizeSelect}
            >
              {this.sizes.map((size) => (
                <RadioInput key={size} label={size} value={size} />
              ))}
            </RadioInputGroup>
          </View>

          <TreeBrowser
            size={this.state.size}
            collections={{
              1: {
                id: 1,
                name: 'Assignments',
                collections: [2, 3],
                items: [3],
                descriptor: 'Class Assignments'
              },
              2: {
                id: 2,
                name: 'English Assignments',
                collections: [4],
                items: []
              },
              3: {
                id: 3,
                name: 'Math Assignments',
                collections: [5],
                items: [1, 2]
              },
              4: {
                id: 4,
                name: 'Reading Assignments',
                collections: [],
                items: [4]
              },
              5: { id: 5, name: 'Advanced Math Assignments', items: [5] }
            }}
            items={{
              1: { id: 1, name: 'Addition Worksheet' },
              2: { id: 2, name: 'Subtraction Worksheet' },
              3: { id: 3, name: 'General Questions' },
              4: { id: 4, name: 'Vogon Poetry' },
              5: {
                id: 5,
                name: 'Bistromath',
                descriptor: 'Explain the Bistromathic Drive'
              }
            }}
            defaultExpanded={[1, 3]}
            rootId={1}
          />
        </>
      )
    }
  }

  render(<Example />)
  ```

- ```js
  const Example = () => {
    const [size, setSize] = useState('medium')
    const sizes = ['small', 'medium', 'large']

    const handleSizeSelect = (e, size) => {
      setSize(size)
    }

    return (
      <>
        <View display="block" margin="none none medium">
          <RadioInputGroup
            name="treeBrowserSize"
            defaultValue="medium"
            description={
              <ScreenReaderContent>
                TreeBrowser size selector
              </ScreenReaderContent>
            }
            variant="toggle"
            onChange={handleSizeSelect}
          >
            {sizes.map((size) => (
              <RadioInput key={size} label={size} value={size} />
            ))}
          </RadioInputGroup>
        </View>

        <TreeBrowser
          size={size}
          collections={{
            1: {
              id: 1,
              name: 'Assignments',
              collections: [2, 3],
              items: [3],
              descriptor: 'Class Assignments'
            },
            2: {
              id: 2,
              name: 'English Assignments',
              collections: [4],
              items: []
            },
            3: {
              id: 3,
              name: 'Math Assignments',
              collections: [5],
              items: [1, 2]
            },
            4: {
              id: 4,
              name: 'Reading Assignments',
              collections: [],
              items: [4]
            },
            5: { id: 5, name: 'Advanced Math Assignments', items: [5] }
          }}
          items={{
            1: { id: 1, name: 'Addition Worksheet' },
            2: { id: 2, name: 'Subtraction Worksheet' },
            3: { id: 3, name: 'General Questions' },
            4: { id: 4, name: 'Vogon Poetry' },
            5: {
              id: 5,
              name: 'Bistromath',
              descriptor: 'Explain the Bistromathic Drive'
            }
          }}
          defaultExpanded={[1, 3]}
          rootId={1}
        />
      </>
    )
  }

  render(<Example />)
  ```

### Managing State

`<TreeBrowser />` can be fully controlled. The following example uses the `onCollectionToggle` callback function to set the state. It then uses the `expanded` prop to configure which collections are open or closed.

- ```js
  class Example extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        expanded: [2]
      }
    }

    handleCollectionClick = (id, collection) => {
      console.log(collection.id)
    }

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
    }

    render() {
      return (
        <TreeBrowser
          variant="indent"
          selectionType="single"
          collections={{
            1: { id: 1, name: 'Grade 1', collections: [2, 3, 6] },
            2: {
              id: 2,
              name: 'Math Outcomes',
              collections: [4],
              items: [3, 4],
              descriptor: '1 Group | 2 Outcomes'
            },
            3: {
              id: 3,
              name: 'Reading Outcome',
              collections: [5],
              items: [1, 2],
              descriptor: '1 Group | 2 Outcomes'
            },
            4: {
              id: 4,
              name: 'Advanced Math',
              items: [6],
              descriptor: '1 Outcome'
            },
            5: {
              id: 5,
              name: 'Advanced Reading',
              items: [5],
              descriptor: '1 Group | 2 Outcomes'
            },
            6: {
              id: 6,
              name: 'Advanced Outcomes',
              items: [5, 6],
              descriptor: '2 Outcomes'
            }
          }}
          items={{
            1: { id: 1, name: 'Can read' },
            2: { id: 2, name: 'Can write' },
            3: { id: 3, name: 'Can add' },
            4: { id: 4, name: 'Can subtract' },
            5: { id: 5, name: 'Can read Shakespeare' },
            6: { id: 6, name: 'Can do quantum physics' }
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

  render(<Example />)
  ```

- ```js
  const Example = () => {
    const [expanded, setExpanded] = useState([2])

    const handleCollectionClick = (id, collection) => {
      console.log(collection.id)
    }

    const handleCollectionToggle = (collection) => {
      setExpanded((prevExpanded) => {
        const newExpanded = [...prevExpanded]
        const index = newExpanded.indexOf(collection.id)

        if (!collection.expanded) {
          newExpanded.splice(index, 1)
        } else if (index < 0) {
          newExpanded.push(collection.id)
        }

        return newExpanded
      })
    }

    return (
      <TreeBrowser
        variant="indent"
        selectionType="single"
        collections={{
          1: { id: 1, name: 'Grade 1', collections: [2, 3, 6] },
          2: {
            id: 2,
            name: 'Math Outcomes',
            collections: [4],
            items: [3, 4],
            descriptor: '1 Group | 2 Outcomes'
          },
          3: {
            id: 3,
            name: 'Reading Outcome',
            collections: [5],
            items: [1, 2],
            descriptor: '1 Group | 2 Outcomes'
          },
          4: {
            id: 4,
            name: 'Advanced Math',
            items: [6],
            descriptor: '1 Outcome'
          },
          5: {
            id: 5,
            name: 'Advanced Reading',
            items: [5],
            descriptor: '1 Group | 2 Outcomes'
          },
          6: {
            id: 6,
            name: 'Advanced Outcomes',
            items: [5, 6],
            descriptor: '2 Outcomes'
          }
        }}
        items={{
          1: { id: 1, name: 'Can read' },
          2: { id: 2, name: 'Can write' },
          3: { id: 3, name: 'Can add' },
          4: { id: 4, name: 'Can subtract' },
          5: { id: 5, name: 'Can read Shakespeare' },
          6: { id: 6, name: 'Can do quantum physics' }
        }}
        showRootCollection={false}
        rootId={1}
        expanded={expanded}
        onCollectionToggle={handleCollectionToggle}
        onCollectionClick={handleCollectionClick}
      />
    )
  }

  render(<Example />)
  ```

### Customizing Icons

All of the `<TreeBrowser>` icons are customizable.
The following example sets custom icons for the expanded and collapsed state of the collections via `collectionIcon` and `collectionIconExpanded` and custom item icons via `itemIcon`.

```js
---
type: example
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

#### Different icons for each item

One way do this is to use `getItemProps`. This function is called with the props for each item and returns new props you specify. These props are then passed to the item when it is rendered. In the following example, we override the `itemIcon` prop depending on the item name.

```js
---
type: example
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

Another way to do it is to specify the `thumbnail` property in the `items` collection. This also overrides `itemIcon`.

```js
---
type: example
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

### Rendering custom content in nodes

Using the `renderContent` property allows you to render custom content in the area where the text and descriptor are.
To meet a11y standards make sure to have the right contrast ratio on hovered and selected states; you can use the
`selected` and `focused` attributes in the given `props`.

```js
---
type: example
---
<TreeBrowser
  collections={{
    1: {
      id: 1,
      name: "Pandas",
      collections: [],
      items: [1, 2, 3]
    },
  }}
  items={{
    1: { id: 1, name: "Bao Bao" },
    2: { id: 2, name: "Bei Bei" },
    3: { id: 3, name: "Mei Xiang" }
  }}
  defaultExpanded={[1]}
  itemIcon={IconUserSolid}
  rootId={1}
  size="large"
  renderContent={(props)=> {
    if (props.level > 1) {
      return <div style={{ display: 'flex', alignItems: 'flex-end', padding: '0.6rem 0 0.6rem 1rem' }}>
        <span>{props.name}</span>
        <Tag text="done" size="small" margin="0 xx-small 0 xx-small"/>
        <Tag text="class A" size="small"/>
      </div>
    }
    return <div style={{padding: '0.6rem 0 0.6rem 1rem'}}>{props.name}</div>
  }}
/>
```

### Rendering custom items before and after nodes

An example of a `<TreeBrowser />` with a custom item after each collection.

- ```js
  class Example extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        expanded: true,
        hoveredLine: null
      }
    }

    renderInput = () => {
      const { expanded } = this.state
      if (expanded) {
        return (
          <InstUISettingsProvider
            theme={
              this.state.hoveredLine === 'renderAfter'
                ? {
                    componentOverrides: {
                      View: {
                        focusColorInfo: 'white'
                      },
                      TextInput: {
                        focusOutlineColor: 'white'
                      }
                    }
                  }
                : undefined
            }
          >
            <View
              as="div"
              padding="xx-small"
              onFocus={(e) => e.stopPropagation()}
              onClick={(e) => e.stopPropagation()}
              onMouseEnter={() => this.setState({ hoveredLine: 'renderAfter' })}
              onMouseLeave={() => this.setState({ hoveredLine: 'null' })}
            >
              <TextInput
                placeholder="Enter new group name"
                display="inline-block"
                width="12rem"
                renderLabel=""
                onKeyDown={(e) => {
                  e.stopPropagation()
                }}
              />
              <IconButton
                screenReaderLabel="Cancel"
                onClick={(e) => this.setExpand(e, !expanded)}
                onKeyDown={(e) => {
                  if (e.code === 'Space' || e.code === 'Enter') {
                    e.preventDefault()
                    this.setExpand(e, !expanded)
                  }
                }}
                margin="0 0 0 small"
              >
                <IconXSolid />
              </IconButton>
              <IconButton
                screenReaderLabel="Add new group"
                onClick={(e) => this.setExpand(e, !expanded)}
                onKeyDown={(e) => {
                  if (e.code === 'Space' || e.code === 'Enter') {
                    e.preventDefault()
                    this.setExpand(e, !expanded)
                  }
                }}
                margin="0 0 0 small"
              >
                <IconCheckSolid />
              </IconButton>
            </View>
          </InstUISettingsProvider>
        )
      }

      return <View as="div">Create New Group</View>
    }

    setExpand = (e, expanded) => {
      e.stopPropagation()
      this.setState({ expanded })
      this._node.focus()
    }

    renderNode = () => {
      const { expanded } = this.state
      return (
        <TreeBrowser.Node
          containerRef={(el) => (this._node = el)}
          onClick={(e) => this.setExpand(e, !expanded)}
          onKeyDown={(e) => {
            if (e.code === 'Space' || e.code === 'Enter') {
              e.preventDefault()
              this.setExpand(e, !expanded)
            }
          }}
          itemIcon={this.state.expanded ? '' : <IconPlusLine />}
          size="large"
        >
          {this.renderInput()}
        </TreeBrowser.Node>
      )
    }

    render() {
      return (
        <TreeBrowser
          selectionType="single"
          size="large"
          defaultExpanded={[1, 2]}
          collections={{
            1: {
              id: 1,
              name: 'Grade 1',
              collections: [2]
            },
            2: {
              id: 2,
              name: 'Math Outcomes',
              collections: [],
              items: [1, 2],
              descriptor: '1 Group | 2 Outcomes',
              renderAfterItems: this.renderNode()
            }
          }}
          items={{
            1: { id: 1, name: 'Can add' },
            2: { id: 2, name: 'Can subtract' }
          }}
          showRootCollection={true}
          rootId={1}
        />
      )
    }
  }

  render(<Example />)
  ```

- ```js
  const Example = () => {
    const [expanded, setExpanded] = useState(true)
    const [hoveredLine, setHoveredLine] = useState(null)
    const nodeRef = useRef(null)

    const handleExpandToggle = useCallback((e, newExpandedState) => {
      e.stopPropagation()
      setExpanded(newExpandedState)
      nodeRef.current?.focus()
    }, [])

    const handleKeyPress = useCallback(
      (e, newExpandedState) => {
        if (e.code === 'Space' || e.code === 'Enter') {
          e.preventDefault()
          handleExpandToggle(e, newExpandedState)
        }
      },
      [handleExpandToggle]
    )

    const renderInput = () => {
      if (expanded) {
        return (
          <InstUISettingsProvider
            theme={
              hoveredLine === 'renderAfter'
                ? {
                    componentOverrides: {
                      View: {
                        focusColorInfo: 'white'
                      },
                      TextInput: {
                        focusOutlineColor: 'white'
                      }
                    }
                  }
                : undefined
            }
          >
            <View
              as="div"
              padding="xx-small"
              onFocus={(e) => e.stopPropagation()}
              onClick={(e) => e.stopPropagation()}
              onMouseEnter={() => setHoveredLine('renderAfter')}
              onMouseLeave={() => setHoveredLine(null)}
            >
              <TextInput
                placeholder="Enter new group name"
                display="inline-block"
                width="12rem"
                renderLabel=""
                onKeyDown={(e) => e.stopPropagation()}
              />
              <IconButton
                screenReaderLabel="Cancel"
                onClick={(e) => handleExpandToggle(e, false)}
                onKeyDown={(e) => handleKeyPress(e, false)}
                margin="0 0 0 small"
              >
                <IconXSolid />
              </IconButton>
              <IconButton
                screenReaderLabel="Add new group"
                onClick={(e) => handleExpandToggle(e, false)}
                onKeyDown={(e) => handleKeyPress(e, false)}
                margin="0 0 0 small"
              >
                <IconCheckSolid />
              </IconButton>
            </View>
          </InstUISettingsProvider>
        )
      }

      return <View as="div">Create New Group</View>
    }

    const renderNode = () => (
      <TreeBrowser.Node
        containerRef={(el) => (nodeRef.current = el)}
        onClick={(e) => handleExpandToggle(e, !expanded)}
        onKeyDown={(e) => handleKeyPress(e, !expanded)}
        itemIcon={expanded ? '' : <IconPlusLine />}
        size="large"
      >
        {renderInput()}
      </TreeBrowser.Node>
    )

    return (
      <TreeBrowser
        selectionType="single"
        size="large"
        defaultExpanded={[1, 2]}
        collections={{
          1: {
            id: 1,
            name: 'Grade 1',
            collections: [2]
          },
          2: {
            id: 2,
            name: 'Math Outcomes',
            collections: [],
            items: [1, 2],
            descriptor: '1 Group | 2 Outcomes',
            renderAfterItems: renderNode()
          }
        }}
        items={{
          1: { id: 1, name: 'Can add' },
          2: { id: 2, name: 'Can subtract' }
        }}
        showRootCollection={true}
        rootId={1}
      />
    )
  }

  render(<Example />)
  ```

### Change the order of appearance of items and collections

By default, the order of collections and items depend on the order of `collections` and `items` array. We can override it by providing a `sortOrder` comparison function.

---

**NOTE**

This works with all collections and items of the TreeBrowser.

---

- ```js
  class Example extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        size: 'medium',
        sorted: false
      }
    }
    toggleSort = (event) => {
      this.setState({ sorted: !this.state.sorted })
    }
    render() {
      return (
        <>
          <View display="block" margin="none none medium">
            <FormFieldGroup description="Turn on/off sorting">
              <Checkbox
                checked={this.state.sorted}
                label="Sort"
                onChange={this.toggleSort}
              />
            </FormFieldGroup>
          </View>

          <TreeBrowser
            size={this.state.size}
            collections={{
              1: {
                id: 1,
                name: 'Assignments',
                collections: [3, 2],
                items: [3],
                descriptor: 'Class Assignments'
              },
              2: {
                id: 2,
                name: 'English Assignments',
                collections: [4],
                items: []
              },
              3: {
                id: 3,
                name: 'Math Assignments',
                collections: [5],
                items: [2, 1]
              },
              4: {
                id: 4,
                name: 'Reading Assignments',
                collections: [],
                items: [4]
              },
              5: { id: 5, name: 'Advanced Math Assignments', items: [5] }
            }}
            items={{
              1: { id: 1, name: 'Addition Worksheet' },
              2: { id: 2, name: 'Subtraction Worksheet' },
              3: { id: 3, name: 'General Questions' },
              4: { id: 4, name: 'Vogon Poetry' },
              5: {
                id: 5,
                name: 'Bistromath',
                descriptor: 'Explain the Bistromathic Drive'
              }
            }}
            defaultExpanded={[1, 3]}
            rootId={1}
            sortOrder={
              this.state.sorted
                ? (a, b) => {
                    return a.name.localeCompare(b.name)
                  }
                : (a, b) => {
                    return 0
                  }
            }
          />
        </>
      )
    }
  }

  render(<Example />)
  ```

- ```js
  const Example = () => {
    const [size, setSize] = useState('medium')
    const [sorted, setSorted] = useState(false)

    const toggleSort = () => {
      setSorted(!sorted)
    }

    return (
      <>
        <View display="block" margin="none none medium">
          <FormFieldGroup description="Turn on/off sorting">
            <Checkbox checked={sorted} label="Sort" onChange={toggleSort} />
          </FormFieldGroup>
        </View>

        <TreeBrowser
          size={size}
          collections={{
            1: {
              id: 1,
              name: 'Assignments',
              collections: [3, 2],
              items: [3],
              descriptor: 'Class Assignments'
            },
            2: {
              id: 2,
              name: 'English Assignments',
              collections: [4],
              items: []
            },
            3: {
              id: 3,
              name: 'Math Assignments',
              collections: [5],
              items: [2, 1]
            },
            4: {
              id: 4,
              name: 'Reading Assignments',
              collections: [],
              items: [4]
            },
            5: { id: 5, name: 'Advanced Math Assignments', items: [5] }
          }}
          items={{
            1: { id: 1, name: 'Addition Worksheet' },
            2: { id: 2, name: 'Subtraction Worksheet' },
            3: { id: 3, name: 'General Questions' },
            4: { id: 4, name: 'Vogon Poetry' },
            5: {
              id: 5,
              name: 'Bistromath',
              descriptor: 'Explain the Bistromathic Drive'
            }
          }}
          defaultExpanded={[1, 3]}
          rootId={1}
          sortOrder={sorted ? (a, b) => a.name.localeCompare(b.name) : () => 0}
        />
      </>
    )
  }

  render(<Example />)
  ```

There is another way to sort the children of one collection. By adding the `compareFunc` as the comparison function to the collection's properties. This will be effective only within the collection's scope. For more convenience, we support a prop called `type` to specify whether the collection's children is either an item or a subcollection (this is only make sense in `compareFunc`)

- ```js
  class Example extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        size: 'medium'
      }
    }
    render() {
      return (
        <TreeBrowser
          size={this.state.size}
          collections={{
            1: {
              id: 1,
              name: 'Assignments',
              collections: [3, 2],
              items: [3],
              descriptor: 'Class Assignments',
              // Sort the direct children of "Assignment" by their name in alphabetical order
              compareFunc: (a, b) => {
                return a.name.localeCompare(b.name)
              }
            },
            2: {
              id: 2,
              name: 'English Assignments',
              collections: [4],
              items: []
            },
            3: {
              id: 3,
              name: 'Math Assignments',
              collections: [5],
              items: [2, 1],
              //  The items appear before subcollections
              compareFunc: (a, b) => {
                if (a.type === 'item' && b.type === 'collection') {
                  return -1
                }
                if (a.type === 'collection' && b.type === 'item') {
                  return 1
                }
                return 0
              }
            },
            4: {
              id: 4,
              name: 'Reading Assignments',
              collections: [],
              items: [4]
            },
            5: { id: 5, name: 'Advanced Math Assignments', items: [5] }
          }}
          items={{
            1: { id: 1, name: 'Addition Worksheet' },
            2: { id: 2, name: 'Subtraction Worksheet' },
            3: { id: 3, name: 'General Questions' },
            4: { id: 4, name: 'Vogon Poetry' },
            5: {
              id: 5,
              name: 'Bistromath',
              descriptor: 'Explain the Bistromathic Drive'
            }
          }}
          defaultExpanded={[1, 3]}
          rootId={1}
        />
      )
    }
  }

  render(<Example />)
  ```

- ```js
  const Example = () => {
    const [size, setSize] = useState('medium')

    return (
      <TreeBrowser
        size={size}
        collections={{
          1: {
            id: 1,
            name: 'Assignments',
            collections: [3, 2],
            items: [3],
            descriptor: 'Class Assignments',
            // Sort the direct children of "Assignment" by their name in alphabetical order
            compareFunc: (a, b) => a.name.localeCompare(b.name)
          },
          2: {
            id: 2,
            name: 'English Assignments',
            collections: [4],
            items: []
          },
          3: {
            id: 3,
            name: 'Math Assignments',
            collections: [5],
            items: [2, 1],
            //  The items appear before subcollections
            compareFunc: (a, b) => {
              if (a.type === 'item' && b.type === 'collection') {
                return -1
              }
              if (a.type === 'collection' && b.type === 'item') {
                return 1
              }
              return 0
            }
          },
          4: {
            id: 4,
            name: 'Reading Assignments',
            collections: [],
            items: [4]
          },
          5: { id: 5, name: 'Advanced Math Assignments', items: [5] }
        }}
        items={{
          1: { id: 1, name: 'Addition Worksheet' },
          2: { id: 2, name: 'Subtraction Worksheet' },
          3: { id: 3, name: 'General Questions' },
          4: { id: 4, name: 'Vogon Poetry' },
          5: {
            id: 5,
            name: 'Bistromath',
            descriptor: 'Explain the Bistromathic Drive'
          }
        }}
        defaultExpanded={[1, 3]}
        rootId={1}
      />
    )
  }

  render(<Example />)
  ```

### showRootCollection

The `showRootCollection` prop sets whether the root collection (specified in `rootId` prop) is displayed or to begin with its immediate sub-collections and items instead. It defaults to `true`.

- ```js
  class Example extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        showRootCollection: true
      }
    }

    handleSwitch = () => {
      this.setState({ showRootCollection: !this.state.showRootCollection })
    }

    renderNode = () => {
      return (
        <TreeBrowser.Node itemIcon={<IconPlusLine />}>More</TreeBrowser.Node>
      )
    }

    render() {
      return (
        <>
          <View display="block" margin="none none medium">
            <Checkbox
              label="showRootCollection"
              variant="toggle"
              size="medium"
              checked={this.state.showRootCollection}
              onChange={this.handleSwitch}
            />
          </View>

          <TreeBrowser
            collections={{
              1: {
                id: 1,
                name: 'Assignments',
                collections: [2, 3],
                items: [3, 5],
                descriptor: 'Class Assignments',
                renderAfterItems: this.renderNode()
              },
              2: {
                id: 2,
                name: 'English Assignments',
                collections: [4],
                items: []
              },
              3: {
                id: 3,
                name: 'Math Assignments',
                collections: [5],
                items: [1, 2]
              },
              4: {
                id: 4,
                name: 'Reading Assignments',
                collections: [],
                items: [4]
              },
              5: { id: 5, name: 'Advanced Math Assignments', items: [5] }
            }}
            items={{
              1: { id: 1, name: 'Addition Worksheet' },
              2: { id: 2, name: 'Subtraction Worksheet' },
              3: { id: 3, name: 'General Questions' },
              4: { id: 4, name: 'Vogon Poetry' },
              5: {
                id: 5,
                name: 'Bistromath',
                descriptor: 'Explain the Bistromathic Drive'
              }
            }}
            defaultExpanded={[1, 3]}
            rootId={1}
            showRootCollection={this.state.showRootCollection}
          />
        </>
      )
    }
  }

  render(<Example />)
  ```

- ```js
  const Example = () => {
    const [showRootCollection, setShowRootCollection] = useState(true)

    const handleSwitch = () => {
      setShowRootCollection(!showRootCollection)
    }

    const renderNode = () => {
      return (
        <TreeBrowser.Node itemIcon={<IconPlusLine />}>More</TreeBrowser.Node>
      )
    }

    return (
      <>
        <View display="block" margin="none none medium">
          <Checkbox
            label="showRootCollection"
            variant="toggle"
            size="medium"
            checked={showRootCollection}
            onChange={handleSwitch}
          />
        </View>

        <TreeBrowser
          collections={{
            1: {
              id: 1,
              name: 'Assignments',
              collections: [2, 3],
              items: [3, 5],
              descriptor: 'Class Assignments',
              renderAfterItems: renderNode()
            },
            2: {
              id: 2,
              name: 'English Assignments',
              collections: [4],
              items: []
            },
            3: {
              id: 3,
              name: 'Math Assignments',
              collections: [5],
              items: [1, 2]
            },
            4: {
              id: 4,
              name: 'Reading Assignments',
              collections: [],
              items: [4]
            },
            5: { id: 5, name: 'Advanced Math Assignments', items: [5] }
          }}
          items={{
            1: { id: 1, name: 'Addition Worksheet' },
            2: { id: 2, name: 'Subtraction Worksheet' },
            3: { id: 3, name: 'General Questions' },
            4: { id: 4, name: 'Vogon Poetry' },
            5: {
              id: 5,
              name: 'Bistromath',
              descriptor: 'Explain the Bistromathic Drive'
            }
          }}
          defaultExpanded={[1, 3]}
          rootId={1}
          showRootCollection={showRootCollection}
        />
      </>
    )
  }

  render(<Example />)
  ```

### Guidelines

```js
---
type: embed
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


### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| TreeBrowser | collections | `Record<number \| string, Collection>` | Yes | - | a normalized hash of collections, keyed by id, that contains an :id, :name, :items (an array of item ids), :collections (an array of collection ids), optional :descriptor text, optional :containerRef function, an optional :renderBeforeItems TreeNode, and an optional :renderAfterItems TreeNode. Each collection must have a unique id. |
| TreeBrowser | items | `Record<number, CollectionItem>` | Yes | - | a hash of items, keyed by id, that contain an :id, :name, optional :descriptor text, and optional :thumbnail url |
| TreeBrowser | rootId | `string \| number` | No | - | specifies the id of the root level collection, if present. if no root is specified, all collections will be rendered at the top level |
| TreeBrowser | expanded | `(string \| number \| undefined)[]` | No | - | an array of expanded collection ids, must be accompanied by an 'onCollectionToggle' prop |
| TreeBrowser | defaultExpanded | `(string \| number)[]` | No | `[]` | an array of collection ids to expand by default |
| TreeBrowser | selectionType | `'none' \| 'single'` | No | `'none'` | There are 2 types of tree selection: single and multi. This is set up to allow for "multi" in the future without having to deprecate the old API. |
| TreeBrowser | size | `'small' \| 'medium' \| 'large'` | No | `'medium'` |  |
| TreeBrowser | variant | `'folderTree' \| 'indent'` | No | `'folderTree'` |  |
| TreeBrowser | collectionIcon | `\| keyof ReactHTML \| keyof ReactSVG \| ClassType<P, ClassicComponent<P, ComponentState>, ClassicComponentClass<P>> \| ComponentClass \| ReactNode \| ((data: P) => ReactNode \| Element) \| (() => ReactNode \| Element) \| Element` | No | `IconFolderLine` |  |
| TreeBrowser | collectionIconExpanded | `\| keyof ReactHTML \| keyof ReactSVG \| ClassType<P, ClassicComponent<P, ComponentState>, ClassicComponentClass<P>> \| ComponentClass \| ReactNode \| ((data: P) => ReactNode \| Element) \| (() => ReactNode \| Element) \| Element` | No | `IconFolderLine` |  |
| TreeBrowser | itemIcon | `\| keyof ReactHTML \| keyof ReactSVG \| ClassType<P, ClassicComponent<P, ComponentState>, ClassicComponentClass<P>> \| ComponentClass \| ReactNode \| ((data: P) => ReactNode \| Element) \| (() => ReactNode \| Element) \| Element` | No | `IconDocumentLine` |  |
| TreeBrowser | getItemProps | `(props: Record<string, any>) => Record<string, any>` | No | `(props: unknown) => props` | A function called with each item's props as an argument. The return value of this function is a props object which will be passed to the item when it is rendered. This is useful for situations where you need to render the item differently depending on it's props. For example, if you would like to display a different icon for items with a certain name. |
| TreeBrowser | getCollectionProps | `(props: Record<string, any>) => TreeBrowserButtonProps` | No | `(props: unknown) => props` | A function called with each collection's props as an argument. The return value of this function is a props object which will be passed to the collection when it is rendered. This is useful for situations where you need to render the collection differently depending on it's props. For example, if you would like to display a different icon for collections with a certain name. |
| TreeBrowser | showRootCollection | `boolean` | No | `true` | Whether or not to show the root collection specified in rootId prop or to begin with its immediate subcollections and items instead |
| TreeBrowser | onCollectionClick | `(e: React.MouseEvent, data: CollectionData) => void` | No | - |  |
| TreeBrowser | onCollectionToggle | `(collection: CollectionData) => void` | No | - |  |
| TreeBrowser | onItemClick | `(data: CollectionData) => void` | No | - |  |
| TreeBrowser | treeLabel | `string` | No | - | An optional label to assist visually impaired users |
| TreeBrowser | renderContent | `(props: TreeBrowserButtonProps) => JSX.Element` | No | - |  |
| TreeBrowser | sortOrder | `(obj1: any, obj2: any) => number` | No | `function () {
  return 0
}` | An optional compare function to specify order of the collections and the items |
| TreeBrowser | animation | `boolean` | No | `true` | Whether to enable animation for the TreeBrowser |
| TreeBrowser.TreeButton | id | `string \| number` | No | - |  |
| TreeBrowser.TreeButton | name | `string` | No | - |  |
| TreeBrowser.TreeButton | descriptor | `string` | No | - |  |
| TreeBrowser.TreeButton | type | `'collection' \| 'item' \| string` | No | `'treeButton'` |  |
| TreeBrowser.TreeButton | size | `'small' \| 'medium' \| 'large'` | No | `'medium'` |  |
| TreeBrowser.TreeButton | variant | `'folderTree' \| 'indent'` | No | `'folderTree'` |  |
| TreeBrowser.TreeButton | collectionIcon | `\| keyof ReactHTML \| keyof ReactSVG \| ClassType<P, ClassicComponent<P, ComponentState>, ClassicComponentClass<P>> \| ComponentClass \| ReactNode \| ((data: P) => ReactNode \| Element) \| (() => ReactNode \| Element) \| Element` | No | - |  |
| TreeBrowser.TreeButton | collectionIconExpanded | `\| keyof ReactHTML \| keyof ReactSVG \| ClassType<P, ClassicComponent<P, ComponentState>, ClassicComponentClass<P>> \| ComponentClass \| ReactNode \| ((data: P) => ReactNode \| Element) \| (() => ReactNode \| Element) \| Element` | No | - |  |
| TreeBrowser.TreeButton | itemIcon | `\| keyof ReactHTML \| keyof ReactSVG \| ClassType<P, ClassicComponent<P, ComponentState>, ClassicComponentClass<P>> \| ComponentClass \| ReactNode \| ((data: P) => ReactNode \| Element) \| (() => ReactNode \| Element) \| Element` | No | - |  |
| TreeBrowser.TreeButton | thumbnail | `string` | No | - |  |
| TreeBrowser.TreeButton | onClick | `(e: React.MouseEvent) => void` | No | - | Called when this button is clicked |
| TreeBrowser.TreeButton | expanded | `boolean` | No | `false` |  |
| TreeBrowser.TreeButton | selected | `boolean` | No | `false` |  |
| TreeBrowser.TreeButton | focused | `boolean` | No | `false` |  |
| TreeBrowser.TreeButton | level | `number` | No | - |  |
| TreeBrowser.TreeButton | containerRef | `(el: HTMLElement \| null) => void` | No | - | A function that returns a reference to the parent li element |
| TreeBrowser.TreeButton | renderContent | `(props: TreeBrowserButtonProps) => JSX.Element` | No | - |  |
| TreeBrowser.TreeCollection | id | `number \| string` | Yes | - |  |
| TreeBrowser.TreeCollection | name | `string` | Yes | - |  |
| TreeBrowser.TreeCollection | descriptor | `string` | No | - |  |
| TreeBrowser.TreeCollection | items | `CollectionItem[]` | No | `[]` |  |
| TreeBrowser.TreeCollection | collections | `CollectionProps[]` | No | `[]` |  |
| TreeBrowser.TreeCollection | expanded | `boolean` | No | `false` |  |
| TreeBrowser.TreeCollection | selection | `string` | No | `''` |  |
| TreeBrowser.TreeCollection | size | `'small' \| 'medium' \| 'large'` | No | `'medium'` |  |
| TreeBrowser.TreeCollection | variant | `'folderTree' \| 'indent'` | No | `'folderTree'` |  |
| TreeBrowser.TreeCollection | collectionIcon | `\| keyof ReactHTML \| keyof ReactSVG \| ClassType<P, ClassicComponent<P, ComponentState>, ClassicComponentClass<P>> \| ComponentClass \| ReactNode \| ((data: P) => ReactNode \| Element) \| (() => ReactNode \| Element) \| Element` | No | - |  |
| TreeBrowser.TreeCollection | collectionIconExpanded | `\| keyof ReactHTML \| keyof ReactSVG \| ClassType<P, ClassicComponent<P, ComponentState>, ClassicComponentClass<P>> \| ComponentClass \| ReactNode \| ((data: P) => ReactNode \| Element) \| (() => ReactNode \| Element) \| Element` | No | - |  |
| TreeBrowser.TreeCollection | itemIcon | `\| keyof ReactHTML \| keyof ReactSVG \| ClassType<P, ClassicComponent<P, ComponentState>, ClassicComponentClass<P>> \| ComponentClass \| ReactNode \| ((data: P) => ReactNode \| Element) \| (() => ReactNode \| Element) \| Element` | No | - |  |
| TreeBrowser.TreeCollection | getItemProps | `(props: Record<string, any>) => Record<string, any>` | No | `(props: unknown) => props` | A function called with each item's props as an argument. The return value of this function is a props object which will be passed to the item when it is rendered. This is useful for situations where you need to render the item differently depending on it's props. For example, if you would like to display a different icon for items with a certain name. |
| TreeBrowser.TreeCollection | getCollectionProps | `(props: Record<string, any>) => TreeBrowserButtonProps` | No | `(props: unknown) => props` | A function called with each collection's props as an argument. The return value of this function is a props object which will be passed to the collection when it is rendered. This is useful for situations where you need to render the collection differently depending on it's props. For example, if you would like to display a different icon for collections with a certain name. |
| TreeBrowser.TreeCollection | onItemClick | `(e: React.MouseEvent, data: CollectionData) => void` | No | - |  |
| TreeBrowser.TreeCollection | onCollectionClick | `(e: React.MouseEvent, data: CollectionData) => void` | No | - |  |
| TreeBrowser.TreeCollection | onKeyDown | `(e: React.KeyboardEvent, data: CollectionData) => void` | No | - |  |
| TreeBrowser.TreeCollection | numChildren | `number` | No | - |  |
| TreeBrowser.TreeCollection | level | `number` | Yes | - |  |
| TreeBrowser.TreeCollection | position | `number` | No | - |  |
| TreeBrowser.TreeCollection | renderBeforeItems | `ReactElement` | No | - | children of type TreeNode |
| TreeBrowser.TreeCollection | renderAfterItems | `ReactElement` | No | - | children of type TreeNode |
| TreeBrowser.TreeCollection | containerRef | `(el: HTMLElement \| null) => void` | No | - | A function that returns a reference to the underlying HTML container @param el The DOM HTMLElement |
| TreeBrowser.TreeCollection | isCollectionFlattened | `boolean` | No | `false` |  |
| TreeBrowser.TreeCollection | renderContent | `(props: TreeBrowserButtonProps) => JSX.Element` | No | - |  |
| TreeBrowser.TreeCollection | compareFunc | `(a: CompareObject, b: CompareObject) => number` | No | - |  |
| TreeBrowser.TreeNode | id | `` | No | - |  |
| TreeBrowser.TreeNode | size | `` | No | `'medium'` |  |
| TreeBrowser.TreeNode | variant | `` | No | `'folderTree'` |  |
| TreeBrowser.TreeNode | selected | `` | No | `false` |  |
| TreeBrowser.TreeNode | focused | `` | No | `false` |  |
| TreeBrowser.TreeNode | itemIcon | `` | No | - |  |
| TreeBrowser.TreeNode | thumbnail | `` | No | - |  |
| TreeBrowser.TreeNode | level | `` | No | - |  |
| TreeBrowser.TreeNode | children | `React.ReactNode` | No | - | The children to be rendered within the `<TreeNode />` |
| TreeBrowser.TreeNode | containerRef | `` | No | - |  |
| TreeBrowser.TreeNode | onKeyDown | `(e: React.KeyboardEvent, data: CollectionData) => void` | No | - |  |
| TreeBrowser.TreeNode | onClick | `` | No | - |  |

### Usage

Install the package:

```shell
npm install @instructure/ui-tree-browser
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { TreeBrowser } from '@instructure/ui-tree-browser'
```

