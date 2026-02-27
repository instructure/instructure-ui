---
describes: CodeEditor
---

A wrapper around the popular [CodeMirror](https://codemirror.net/) code editor component. CodeMirror provides a text input field with features like line gutters, syntax highlighting, and autocompletion.

### Built-in features

SourceCodeEditor has a lot of built-in features that makes editing code easier.

##### Command keybinding

The editor has a lot of handy key bindings for commands like copying and deleting lines, moving lines up and down, selection and indentation, etc. See the keymaps here: [defaultKeymap](https://codemirror.net/docs/ref/#commands.defaultKeymap), [closeBracketsKeymap](https://codemirror.net/docs/ref/#autocomplete.closeBracketsKeymap), [historyKeymap](https://codemirror.net/docs/ref/#commands.historyKeymap), [foldKeymap](https://codemirror.net/docs/ref/#language.foldKeymap), [completionKeymap](https://codemirror.net/docs/ref/#autocomplete.completionKeymap), [lintKeymap](https://codemirror.net/docs/ref/#lint.lintKeymap).

##### History

The history feature remembers the steps of the code editing and selections, and lets you undo and redo them.

##### Cursor and selection

Instead of using the browser's native selection and cursor, SourceCodeEditor uses its own system. This allows the editor to display secondary selection ranges, and tends to produce a type of selection more in line with that users expect in a text editor.

It also allows **multiple** cursors to be placed (`Cmd/Ctrl` + click), multiple ranges to be selected and edited at the same time.

**Rectangular selections:** by default, it will react to left mouse drag with the `Option/Alt` key held down. When such a selection occurs, the text within the rectangle that was dragged over will be selected, as one selection range per line.

The editor highlights text that matches the current selection.

##### Bracket matching and closing

Whenever the cursor is next to a bracket, that bracket and the one it matches are highlighted. Or, when no matching bracket is found, another highlighting style is used to indicate this.

When a closeable bracket is typed, its closing bracket is immediately inserted after the cursor.

### Language support

Setting the correct language adds **syntax highlighting** and other helpful features to the editor, like **code folding**, **auto-indentation**, **syntax-aware selection** and **autocompletion** features.

**Note:** In case you need support for additional languages, please contact us on [GitHub](https://github.com/instructure/instructure-ui)!

```js
---
type: example
---
  const languages = {
    json: `{
      "name": "@instructure/ui-source-code-editor",
      "version": "8.24.2",
      "description": "A UI component library made by Instructure Inc.",
      "author": "Instructure, Inc. Engineering and Product Design",
      "module": "./es/index.js",
      "main": "./lib/index.js",
      "types": "./types/index.d.ts",
      "repository": {
        "type": "git",
        "url": "https://github.com/instructure/instructure-ui.git"
      },
    }`,
    javascript: `const fruit: string = "apple"

  const re = new RegExp('ab+c')

  function exampleMethod(props: Props) {
    return props ? props.value : null
  }

  /**
   * This is an example
   * @param {Object} props
   */
  const Example = () => {
    return (
      <View as="div" padding={'large'}>
        <Position
          renderTarget={<GoodComponent />}
          placement='end center'
          offsetX='20px'
        >
          <span style={{ padding: '8px', background: 'white' }}>
            Positioned content
          </span>
        </Position>
      </View>
    )
  }

  render(<Example />)`,

    html: `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Example app</title>
      </head>
      <body>
        <div id="app">
          <button onclick="myFunction()">Click me</button>
        </div>

        <script src="script.js"></script>
      </body>
    </html>`,
    css: `a {
      text-decoration: none;

      &:hover { text-decoration: underline; }
    }

    a:link, a:visited, a:hover, a:active {
      background-color: green;
      color: white;
      padding: 10px 25px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
    }

    .centertext { text-align: center; }

    img { opacity: 0.5; filter: alpha(opacity=50); }`,
    markdown: `#### The quarterly results look great!

    > - Revenue was off the chart.
    > - Profits were higher than ever.

    *Everything* is going according to **plan**.

    ---
    type: example
    ---`,
    shell: `#!/bin/bash

    # example of using arguments to a script
    echo "My first name is $1"
    echo "My surname is $2"
    echo "Total number of arguments is $#"

    ________________________________________

    $ chmod a+x name.sh
    $ ./name.sh Hans-Wolfgang Loidl
    My first name is Hans-Wolfgang
    My surname is Loidl
    Total number of arguments is 2`,
    yml: `---
    doe: "a deer, a female deer"
    ray: "a drop of golden sun"
    pi: 3.14159
    xmas: true
    french-hens: 3
    calling-birds:
      - huey
      - dewey
      - louie
      - fred
    xmas-fifth-day:
      calling-birds: four
      french-hens: 3
      golden-rings: 5
      partridges:
        count: 1
        location: "a pear tree"
      turtle-doves: two`
  }

  const languageMap = {
    json: languages.json,
    js: languages.javascript,
    jsx: languages.javascript,
    javascript: languages.javascript,
    html: languages.html,
    css: languages.css,
    markdown: languages.markdown,
    sh: languages.shell,
    shell: languages.shell,
    bash: languages.shell,
    yml: languages.yml,
    yaml: languages.yml
  }

  const LanguageExamples = () => {
    const [currentLanguage, setCurrentLanguage] = useState('javascript')
    const [currentValue, setCurrentValue] = useState(languageMap.javascript)

    const languageKeys = Object.keys(languageMap)

    return (
      <Flex alignItems="start">
        <Flex.Item>
          <RadioInputGroup
            name="languageOptions"
            value={currentLanguage}
            description="Language"
            onChange={(e, newLanguage) => {
              setCurrentLanguage(newLanguage)
              setCurrentValue(languageMap[newLanguage])
            }}
          >
            {languageKeys.map((language) => (
              <RadioInput key={language} label={language} value={language} />
            ))}
          </RadioInputGroup>
        </Flex.Item>

        <Flex.Item padding="0 0 0 large" shouldGrow shouldShrink>
          <FormField label="SourceCodeEditor with syntax highlight">
            <SourceCodeEditor
              label={`${currentLanguage} SourceCodeEditor with syntax highlight`}
              language={currentLanguage}
              value={currentValue}
              onChange={(value) => {
                setCurrentValue(value)
              }}
              lineNumbers
              lineWrapping
              highlightActiveLine
              highlightActiveLineGutter
            />
          </FormField>
        </Flex.Item>
      </Flex>
    )
  }

  render(<LanguageExamples />)
```

### Controlled mode

SourceCodeEditor works best as an uncontrolled component (with the `defaultValue` prop), and that is how we recommend it to be used. As an uncontrolled component, the underlying CodeMirror component can take care of all interactions.

We've implemented the "controlled" usage, but please let us know if you run into any performance issues or bugs.

```js
---
type: example
---
  const ControlledExample = () => {
    const [value, setValue] = useState(`const fruit: string = "apple"

  function exampleMethod(props: Props) {
    return props ? props.value : null
  }`)

    const textAreaRef = useRef(null)

    return (
      <View display="block" background="primary">
        <Flex alignItems="start">
          <Flex.Item shouldGrow shouldShrink padding="0 large 0 0">
            <FormField
              label="Controlled code editor"
              id="controlledCodeEditor"
              messages={[
                {
                  type: 'hint',
                  text: 'Type in the editor or set the value from the textarea.'
                }
              ]}
            >
              <SourceCodeEditor
                label="controlled code editor"
                value={value}
                onChange={(newValue) => setValue(newValue)}
                highlightActiveLine
                highlightActiveLineGutter
                lineWrapping
                lineNumbers
                foldGutter
                spellcheck
              />
            </FormField>
          </Flex.Item>
          <Flex.Item size="50%" padding="0 0 0 large">
            <FormFieldGroup
              description="Set value from the outside"
              name="setValue"
            >
              <TextArea
                label={<ScreenReaderContent>Change value</ScreenReaderContent>}
                textareaRef={(e) => {
                  textAreaRef.current = e
                }}
                defaultValue={value}
              />
              <Button
                color="primary"
                onClick={() => {
                  if (textAreaRef.current) {
                    setValue(textAreaRef.current.value)
                  }
                }}
              >
                Update value
              </Button>
            </FormFieldGroup>
          </Flex.Item>
        </Flex>
      </View>
    )
  }
  render(<ControlledExample />)
```

### Editable and readOnly

The editability of the content can be set with the combination of the `editable` and `readOnly` props.

The `readOnly` prop works like a "preventDefault" and disables any interaction by the user or API calls (e.g. copy-paste).
If the `editable` prop is set to `false`, the editor is also not focusable, and the `contenteditable="false"` is set on the content.

```js
---
type: example
---
  const EditableExample = () => {
    const [settings, setSettings] = useState({
      editable: true,
      readOnly: false
    })

    return (
      <View display="block" padding="medium medium small" background="primary">
        <View display="block" margin="small none large">
          <FormFieldGroup description="Settings" rowSpacing="small">
            {Object.keys(settings).map((prop) => (
              <Checkbox
                label={prop}
                key={prop}
                defaultChecked={settings[prop]}
                onChange={() =>
                  setSettings((prevState) => ({
                    ...prevState,
                    [prop]: !prevState[prop]
                  }))
                }
              />
            ))}
          </FormFieldGroup>
        </View>

        <SourceCodeEditor
          label="editable code editor"
          language="jsx"
          editable={settings.editable}
          readOnly={settings.readOnly}
          defaultValue={`function example() {
    console.log('example')
  }`}
        />
      </View>
    )
  }
  render(<EditableExample />)
```

### Gutter settings

The `lineNumbers` prop displays the line numbers in the side gutter, and the `foldGutter` prop displays the toggleable fold icon next to foldable code blocks.

If any of these two props are active, the gutter is displayed, and the `highlightActiveLineGutter` highlights the active line in the gutter. (The `highlightActiveLine` prop highlights the line itself.)

```js
---
type: example
---
  const GutterExample = () => {
    const [settings, setSettings] = useState({
      lineNumbers: true,
      foldGutter: true,
      highlightActiveLineGutter: true,
      highlightActiveLine: true
    })

    return (
      <View display="block" padding="medium medium small" background="primary">
        <View display="block" margin="small none large">
          <FormFieldGroup description="Settings" rowSpacing="small">
            {[
              'lineNumbers',
              'foldGutter',
              'highlightActiveLineGutter',
              'highlightActiveLine'
            ].map((prop) => (
              <Checkbox
                label={prop}
                key={prop}
                defaultChecked={settings[prop]}
                onChange={() => {
                  setSettings((prevSettings) => ({
                    ...prevSettings,
                    [prop]: !prevSettings[prop]
                  }))
                }}
              />
            ))}
          </FormFieldGroup>
        </View>

        <SourceCodeEditor
          label="gutter example"
          language="jsx"
          lineNumbers={settings.lineNumbers}
          foldGutter={settings.foldGutter}
          highlightActiveLineGutter={settings.highlightActiveLineGutter}
          highlightActiveLine={settings.highlightActiveLine}
          defaultValue={`const fruit: string = "apple"

  function exampleMethod(props: Props) {
  return props ? props.value : null
  }

  /**
  * This is an example
  * @param {Object} props
  */
  const Example = () => {
  return (
    <View as="div" padding={'large'}>
      <Position
        renderTarget={<GoodComponent />}
        placement='end center'
        offsetX='20px'
      >
        <span style={{ padding: '8px', background: 'white' }}>
          Positioned content
        </span>
      </Position>
    </View>
  )
  }

  render(<Example />)`}
        />
      </View>
    )
  }
  render(<GutterExample />)
```

### Indentation

##### auto-indent

The editor automatically indents the lines on input. The `indentOnLoad` prop indents the code on the initial load and when the `value` prop is updated.

##### indent with tab

When the `indentWithTab` feature is turned on, Tab and Shift-Tab will indent the code.
By default, it is turned off, and tabbing will focus the next element in the tab order.

**Accessibility note**: Even if `indentWithTab` is on, pressing Escape before tabbing will not handle indentation and will handle focus instead. When using this feature, it is recommended to add info about this behaviour in your documentation.

##### indent unit

You can also override the unit by which indentation happens (defaults to 2 spaces).
The `indentUnitCount` prop should be a string consisting either entirely of spaces or entirely of tabs.

##### manual re-indent

Another useful feature is the `indentAll` public method on the `SourceCodeEditor` component that can be called anytime to trigger a re-indent on the content.

```js
---
type: example
---
  const IndentExample = () => {
    const [indentWithTab, setIndentWithTab] = useState(true)
    const [indentUnitCount, setIndentUnitCount] = useState('2')

    const editorRef = useRef(null)

    const indentUnit = Array(parseInt(indentUnitCount)).fill(' ').join('')

    const reIndent = () => {
      if (editorRef.current) {
        editorRef.current.indentAll()
      }
    }

    const indentCurrentSelection = () => {
      if (editorRef.current) {
        editorRef.current.indentCurrentSelection()
      }
    }

    return (
      <View display="block" padding="medium medium small" background="primary">
        <View display="block" margin="small none large">
          <FormFieldGroup description="Settings">
            <Checkbox
              label="indentWithTab"
              defaultChecked={indentWithTab}
              onChange={() => setIndentWithTab(!indentWithTab)}
            />
            <RadioInputGroup
              name="indentUnitCount"
              value={indentUnitCount}
              description="indent space count"
              onChange={(e, value) => {
                setIndentUnitCount(value)
                reIndent()
              }}
            >
              {['2', '4', '8'].map((count) => (
                <RadioInput key={count} label={count} value={count} />
              ))}
            </RadioInputGroup>
            <Button onClick={reIndent}>Re-indent code</Button>
            <Button onClick={indentCurrentSelection}>
              Indent current selection
            </Button>
          </FormFieldGroup>
        </View>

        <SourceCodeEditor
          label="indent example"
          ref={editorRef}
          language="jsx"
          indentWithTab={indentWithTab}
          indentUnit={indentUnit}
          defaultValue={`const fruit: string = "apple"

  function exampleMethod(props: Props) {
    return props ? props.value : null
  }

  /**
  * This is an example
  * @param {Object} props
  */
  const Example = () => {
    return (
      <View as="div" padding={'large'}>
        <Position
          renderTarget={<GoodComponent />}
          placement='end center'
          offsetX='20px'
        >
          <span style={{ padding: '8px', background: 'white' }}>
            Positioned content
          </span>
        </Position>
      </View>
    )
  }

  render(<Example />)`}
        />
      </View>
    )
  }

  render(<IndentExample />)
```

### Direction

SourceCodeEditor is a bidirectional component. It will inherit the text-direction from the context, and can be set directly on the component with the `direction` prop. The `rtl` mode will flip the overall layout and selects base paragraph direction to RTL.

The `rtlMoveVisually` prop controls the cursor movement in RTL mode, whether it should be **visual** (pressing the left arrow moves the cursor left) or **logical** (pressing the left arrow moves to the next lower index in the string, which is visually right in RTL text).

```js
---
type: example
---
  const DirectionExample = () => {
    const [settings, setSettings] = useState({
      contextDir: 'unset',
      editorDir: 'unset',
      rtlMoveVisually: true
    })

    return (
      <InstUISettingsProvider
        dir={settings.contextDir !== 'unset' ? settings.contextDir : undefined}
      >
        <View
          display="block"
          padding="medium medium small"
          background="primary"
        >
          <View display="block" margin="small none large">
            <FormFieldGroup
              description="Settings"
              layout="columns"
              vAlign="top"
            >
              <RadioInputGroup
                name="contextDir"
                value={settings.contextDir}
                description="context direction"
                onChange={(e, contextDir) => {
                  setSettings((prevSettings) => ({
                    ...prevSettings,
                    contextDir
                  }))
                }}
              >
                {['unset', 'ltr', 'rtl'].map((dir) => (
                  <RadioInput key={dir} label={dir} value={dir} />
                ))}
              </RadioInputGroup>
              <RadioInputGroup
                name="editorDir"
                value={settings.editorDir}
                description="editor direction"
                onChange={(e, editorDir) => {
                  setSettings((prevSettings) => ({
                    ...prevSettings,
                    editorDir
                  }))
                }}
              >
                {['unset', 'ltr', 'rtl'].map((dir) => (
                  <RadioInput key={dir} label={dir} value={dir} />
                ))}
              </RadioInputGroup>
              <Checkbox
                label="rtlMoveVisually"
                defaultChecked={settings.rtlMoveVisually}
                onChange={() => {
                  setSettings((prevSettings) => ({
                    ...prevSettings,
                    rtlMoveVisually: !prevSettings.rtlMoveVisually
                  }))
                }}
              />
            </FormFieldGroup>
          </View>

          <SourceCodeEditor
            label="editable code editor"
            language="jsx"
            direction={
              settings.editorDir !== 'unset' ? settings.editorDir : undefined
            }
            rtlMoveVisually={settings.rtlMoveVisually}
            defaultValue={`function directionExample(dir?: 'ltr' | 'rtl') {
    console.log(dir)
  }`}
          />
        </View>
      </InstUISettingsProvider>
    )
  }

  render(<DirectionExample />)
```

### Focus management

By default, SourceCodeEditor is tabbable/focusable, and once it is in focus, tabbing will move the focus on the page. These behaviours can be changed with the [editable](/#SourceCodeEditor/#editable-and-readonly) and [indentWithTab](/#SourceCodeEditor/#indentation-indent-with-tab) props.

The `autofocus` prop will automatically focus the editor on the initial render.

You can also manually focus the editor with its public `focus` method (the `hasFocus` getter is also available).

```js
---
type: example
---
  const FocusExample = () => {
    const [indentWithTab, setIndentWithTab] = useState(true)
    const [indentUnitCount, setIndentUnitCount] = useState('2')

    const editorRef = useRef(null)

    return (
      <View display="block" padding="medium medium small" background="primary">
        <View display="block" margin="small none large">
          <Button
            onClick={() => {
              console.log('manual focus')
              editorRef.current.focus()
            }}
          >
            Focus editor
          </Button>
        </View>

        <SourceCodeEditor
          label="focus example"
          ref={editorRef}
          language="jsx"
          onFocus={() => {
            console.log('onFocus')
            console.log({ hasFocus: editorRef.current.hasFocus })
          }}
          onBlur={() => {
            console.log('onBlur')
            console.log({ hasFocus: editorRef.current.hasFocus })
          }}
          defaultValue={`function exampleMethod(props: Props) {
    return props ? props.value : null
  }`}
        />
      </View>
    )
  }

  render(<FocusExample />)
```

### Attachment

The `attachment` prop removes the top/bottom border-radius and margin of the editor, so it can be attached to the top or bottom of another element.

```js
---
type: example
---
  const AttachmentExample = () => {
    const [attachment, setAttachment] = useState('none')

    const viewProps = {
      as: 'div',
      background: 'primary-inverse',
      padding: 'small'
    }

    return (
      <View display="block" padding="medium medium small" background="primary">
        <View display="block" margin="small none large">
          <RadioInputGroup
            name="attachmentExample"
            value={attachment}
            description="attachment"
            onChange={(e, attachment) => {
              setAttachment(attachment)
            }}
          >
            {['none', 'top', 'bottom'].map((attachment) => (
              <RadioInput
                key={attachment}
                label={attachment}
                value={attachment}
              />
            ))}
          </RadioInputGroup>
        </View>

        {attachment === 'bottom' && (
          <View {...viewProps}>
            CodeEditor is attached to the bottom of this element
          </View>
        )}
        <SourceCodeEditor
          label="attachment example"
          language="jsx"
          attachment={attachment === 'none' ? undefined : attachment}
          defaultValue={`const fruit: string = "apple"

  function exampleMethod(props: Props) {
    return props ? props.value : null
  }`}
        />
        {attachment === 'top' && (
          <View {...viewProps}>
            CodeEditor is attached to the top of this element
          </View>
        )}
      </View>
    )
  }

  render(<AttachmentExample />)
```

### Search

To enable the search panel use the `searchConfig` prop.

You can open the search panel in the code editor by pressing `cmd/ctrl+f` when the editor is in focus (otherwise the browser's search will open). The reason you would use this instead of the browser native search is because it will miss results that are far out of view in the text rendered by the editor. This is the limitation of the underlying CodeMirror component.

Hitting `Enter` jumps to the next result and `Shift+Enter` to the previous. Alternatively you can use the up and down buttons to the right of the input field.

Placement: the search panel will open at the bottom of the editor. This cannot be changed unfortunately due to a limitation in CodeMirror.

```js
---
type: example
---
<SourceCodeEditor
  label="lorem"
  language="markdown"
  defaultValue={`Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit
enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet.
Nisi anim cupidatat excepteur officia.
`}
  searchConfig={{
    placeholder: 'Find in code...',
    nextResultLabel: 'Next result',
    prevResultLabel: 'Previouse result',
  }}
/>
```
