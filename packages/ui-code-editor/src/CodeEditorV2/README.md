---
describes: CodeEditor
---

A wrapper around the popular [CodeMirror](https://codemirror.net/) text editor.

### A11y test

```js
---
example: true
render: false
background: light
---

const languages = {
  json: `{
  "name": "@instructure/ui-code-editor",
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
example: true
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

class ColorExamples extends React.Component {
  state = {
    lineNumbers: true,
    editable: true,
    readOnly: false,
    indentWithTab: false,
    spellcheck: true,
    rtlMoveVisually: true,
  }

  render() {
    const booleanProps = ['lineNumbers', 'editable', 'readOnly', 'indentWithTab', 'spellcheck', 'rtlMoveVisually']
    const booleanPropsState = {}
    booleanProps.forEach(prop => { booleanPropsState[prop] = this.state[prop] })

    return (
      <View as="div" padding='medium' background='primary'>
        <View as="div" padding='small'>
          <FormFieldGroup
            description='Settings'
            name='Settings'
            rowSpacing='small'
          >
            {booleanProps.map(prop => (
              <Checkbox
                label={prop}
                key={prop}
                defaultChecked={this.state[prop]}
                onChange={() => {
                  this.setState({ [prop]: !this.state[prop] })
                }}
              />
            ))}
          </FormFieldGroup>
        </View>

        {Object.entries(languages).map(([key, value]) => {
          return (
            <View as="div" margin='medium 0' key={key}>
              <Heading level='h3' margin='0 0 small'>
                {key}
              </Heading>
              <CodeEditorV2
                label={`${key} code editor`}
                language={key}
                defaultValue={value}
                lineWrapping
                highlightActiveLine
                highlightActiveLineGutter
                {...booleanPropsState}
                {...this.state.lineNumbers && {
                  lineNumbers: true,
                  foldGutter: true,
                }}
              />
            </View>
          )
        })}
      </View>
    )
  }
}

render(<ColorExamples />)

```

### Language support

```js
---
example: true
render: false
background: light
---

const languages = {
  json: `{
  "name": "@instructure/ui-code-editor",
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
example: true
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
  yaml: languages.yml,
}

class LanguageExamples extends React.Component {
  state = {
    currentLanguage: 'javascript',
    currentValue: languageMap.javascript,
  }

  render() {
    const languageKeys = Object.keys(languageMap)

    return (
      <Flex alignItems='start'>
        <Flex.Item>
          <RadioInputGroup
            name="languageOptions"
            value={this.state.currentLanguage}
            description="Language"
            onChange={(e, currentLanguage) => {
              this.setState({
                currentLanguage,
                currentValue: languageMap[currentLanguage]
              })
            }}
          >
            {languageKeys.map(language => (
              <RadioInput
                key={language}
                label={language}
                value={language}
              />))}
          </RadioInputGroup>
        </Flex.Item>

        <Flex.Item padding="0 0 0 large" shouldGrow shouldShrink>
          <CodeEditorV2
            label={`${this.state.currentLanguage} code editor`}
            language={this.state.currentLanguage}
            value={this.state.currentValue}
            onChange={(value) => {
              this.setState({
                currentValue: value
              })
            }}
            lineNumbers
            lineWrapping
            highlightActiveLine
            highlightActiveLineGutter
          />
        </Flex.Item>
      </Flex>
    )
  }
}

render(<LanguageExamples />)

```

### Editable and readOnly

The editability of the content can be set with the combination of the `editable` and `readOnly` props.

The `readOnly` prop works like a "preventDefault" and disables any interaction by the user or API calls (e.g. copy-paste).
If the `editable` prop is set to `false`, the editor is also not focusable, and the `contenteditable="false"` is set on the content.

```js
---
example: true
render: false
background: light
---
class EditableExample extends React.Component {
  state = {
    editable: true,
    readOnly: false
  }

  render () {
    return (
      <View display="block" padding="medium medium small" background="primary">
        <View display="block" margin="small none large">
          <FormFieldGroup description="Settings" rowSpacing="small">
            {['editable', 'readOnly'].map((prop) => (
              <Checkbox
                label={prop}
                key={prop}
                defaultChecked={this.state[prop]}
                onChange={() => {
                  this.setState({ [prop]: !this.state[prop] })
                }}
              />
            ))}
          </FormFieldGroup>
        </View>

        <CodeEditorV2
          label='editable code editor'
          language="jsx"
          editable={this.state.editable}
          readOnly={this.state.readOnly}
          defaultValue={`function example() {
  console.log('example')
}`}
        />
      </View>
    )
  }
}



render(<EditableExample />)
```

### Gutter settings

The `lineNumbers` prop displays the line numbers in the side gutter, and the `foldGutter` prop displays the toggleable fold icon next to foldable code blocks.

If any of these two props are active, the gutter is displayed, and the `highlightActiveLineGutter` highlights the active line in the gutter. (The `highlightActiveLine` prop highlights the line itself.)

```js
---
example: true
render: false
background: light
---
class GutterExample extends React.Component {
  state = {
    lineNumbers: true,
    foldGutter: true,
    highlightActiveLineGutter: true,
    highlightActiveLine: true,
  }

  render () {
    return (
      <View display="block" padding="medium medium small" background="primary">
        <View display="block" margin="small none large">
          <FormFieldGroup description="Settings" rowSpacing="small">
            {['lineNumbers', 'foldGutter', 'highlightActiveLineGutter', 'highlightActiveLine'].map((prop) => (
              <Checkbox
                label={prop}
                key={prop}
                defaultChecked={this.state[prop]}
                onChange={() => {
                  this.setState({ [prop]: !this.state[prop] })
                }}
              />
            ))}
          </FormFieldGroup>
        </View>

        <CodeEditorV2
          label='gutter example'
          language="jsx"
          lineNumbers={this.state.lineNumbers}
          foldGutter={this.state.foldGutter}
          highlightActiveLineGutter={this.state.highlightActiveLineGutter}
          highlightActiveLine={this.state.highlightActiveLine}
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

Another useful feature is the `indentAll` public method on the `CodeEditorV2` component that can be called anytime to trigger a re-indent on the content.

```js
---
example: true
render: false
background: light
---
class IndentExample extends React.Component {
  state = {
    indentWithTab: true,
    indentUnitCount: '2',
  }

  editor = null

  get indentUnit() {
    return Array(parseInt(this.state.indentUnitCount)).fill(' ').join('')
  }

  reIndent () {
    this.editor.indentAll()
  }

  render () {
    return (
      <View display="block" padding="medium medium small" background="primary">
        <View display="block" margin="small none large">
          <FormFieldGroup description="Settings">
            <Checkbox
              label="indentWithTab"
              defaultChecked={this.state.indentWithTab}
              onChange={() => {
                this.setState({ indentWithTab: !this.state.indentWithTab })
              }}
            />
            <RadioInputGroup
              name="indentUnitCount"
              value={this.state.indentUnitCount}
              description="indent space count"
              onChange={(e, indentUnitCount) => {
                this.setState({indentUnitCount})
                this.reIndent()
              }}
            >
              {['2', '4', '8'].map(count => <RadioInput key={count} label={count} value={count} />)}
            </RadioInputGroup>
            <Button onClick={() => {
              this.reIndent()
            }}>
              Re-indent code
            </Button>
          </FormFieldGroup>
        </View>

        <CodeEditorV2
          label='indent example'
          ref={(component) => { this.editor = component }}
          language="jsx"
          indentWithTab={this.state.indentWithTab}
          indentUnit={this.indentUnit}
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
}

render(<IndentExample />)
```

### Direction

CodeEditorV2 is a bidirectional component. It will inherit the text-direction from the context, and can be set directly on the component with the `direction` prop. The `rtl` mode will flip the overall layout and selects base paragraph direction to RTL.

The `rtlMoveVisually` prop controls the cursor movement in RTL mode, whether it should be **visual** (pressing the left arrow moves the cursor left) or **logical** (pressing the left arrow moves to the next lower index in the string, which is visually right in RTL text).

```js
---
example: true
render: false
background: light
---
class DirectionExample extends React.Component {
  state = {
    contextDir: 'unset',
    editorDir: 'unset',
    rtlMoveVisually: true,
  }

  render () {
    return (
      <InstUISettingsProvider dir={this.state.contextDir !== 'unset'
        ? this.state.contextDir
        : undefined
      }>
        <View
          display="block"
          padding="medium medium small"
          background="primary"
        >
          <View
            display="block"
            margin="small none large"
          >
            <FormFieldGroup description="Settings" layout='columns' vAlign='top'>
              <RadioInputGroup
                name="contextDir"
                value={this.state.contextDir}
                description="context direction"
                onChange={(e, contextDir) => {
                  this.setState({contextDir})
                }}
              >
                {['unset', 'ltr', 'rtl'].map(dir => <RadioInput key={dir} label={dir} value={dir} />)}
              </RadioInputGroup>
              <RadioInputGroup
                name="editorDir"
                value={this.state.editorDir}
                description="editor direction"
                onChange={(e, editorDir) => {
                  this.setState({editorDir})
                }}
              >
                {['unset', 'ltr', 'rtl'].map(dir => <RadioInput key={dir} label={dir} value={dir} />)}
              </RadioInputGroup>
              <Checkbox
                label="rtlMoveVisually"
                defaultChecked={this.state.rtlMoveVisually}
                onChange={() => {
                  this.setState({ rtlMoveVisually: !this.state.rtlMoveVisually })
                }}
              />
            </FormFieldGroup>
          </View>

          <CodeEditorV2
            label='editable code editor'
            language="jsx"
            direction={this.state.editorDir !== 'unset'
              ? this.state.editorDir
              : undefined
            }
            rtlMoveVisually={this.state.rtlMoveVisually}
            defaultValue={`function directionExample(dir?: 'ltr' | 'rtl') {
  console.log(dir)
}`}
          />
        </View>
      </InstUISettingsProvider>
    )
  }
}



render(<DirectionExample />)
```

### Focus management

By default, CodeEditorV2 is tabbable/focusable, and once it is in focus, tabbing will move the focus on the page. These behaviours can be changed with the [editable](/#CodeEditorV2/#editable-and-readonly) and [indentWithTab](/#CodeEditorV2/#indentation-indent-with-tab) props.

The `autofocus` prop will automatically focus the editor on the initial render.

You can also manually focus the editor with its public `focus` method (the `hasFocus` getter is also available).

```js
---
example: true
render: false
background: light
---
class FocusExample extends React.Component {
  state = {
    indentWithTab: true,
    indentUnitCount: '2',
  }

  editor = null

  render () {
    return (
      <View display="block" padding="medium medium small" background="primary">
        <View display="block" margin="small none large">
          <Button onClick={() => {
            console.log('manual focus')
            this.editor.focus()
          }}>
            Focus editor
          </Button>
        </View>

        <CodeEditorV2
          label='focus example'
          ref={(component) => { this.editor = component }}
          language="jsx"
          onFocus={() => {
            console.log('onFocus')
            console.log({ hasFocus: this.editor.hasFocus })
          }}
          onBlur={() => {
            console.log('onBlur')
            console.log({ hasFocus: this.editor.hasFocus })
          }}
          defaultValue={`function exampleMethod(props: Props) {
  return props ? props.value : null
}`}
        />
      </View>
    )
  }
}

render(<FocusExample />)
```

### Attachment

The `attachment` prop removes the top/bottom border-radius and margin of the editor, so it can be attached to the top or bottom of another element.

```js
---
example: true
render: false
background: light
---
class AttachmentExample extends React.Component {
  state = {
    attachment: 'none'
  }

  render () {
    return (
      <View display="block" padding="medium medium small" background="primary">
        <View display="block" margin="small none large">
          <RadioInputGroup
            name="attachmentExample"
            value={this.state.attachment}
            description="attachment"
            onChange={(e, attachment) => {
              this.setState({attachment})
            }}
          >
            {['none', 'top', 'bottom'].map(attachment => <RadioInput key={attachment} label={attachment} value={attachment} />)}
          </RadioInputGroup>
        </View>

        {this.state.attachment === 'bottom' && (
          <View as="div" borderWidth='small' background='secondary' padding="small">
            CodeEditor is attached to the bottom of this element
          </View>
        )}
        <CodeEditorV2
          label='attachment example'
          language="jsx"
          attachment={this.state.attachment === 'none' ? undefined : this.state.attachment}
          defaultValue={`const fruit: string = "apple"

function exampleMethod(props: Props) {
  return props ? props.value : null
}`}
        />
        {this.state.attachment === 'top' && (
          <View as="div" borderWidth='small' background='secondary' padding="small">
            CodeEditor is attached to the top of this element
          </View>
        )}
      </View>
    )
  }
}



render(<AttachmentExample />)
```

### Playground

```js
---
example: true
render: false
---
class Example extends React.Component {
  state = {
    value: `const asd: string = "asdasd"

yarn install --asdasd

<button onclick="console.log('asd')">
  asdasd
</button>

asdasd {
  display: block;
  opacity: 0;
  margin: 10px
}

{
  "name": "@instructure/ui-code-editor",
  "version": "8.23.0",
  "description": "A UI component library made by Instructure Inc.",
}

const longText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in aliquam erat, sit amet imperdiet arcu. Curabitur cursus et diam in pharetra. Phasellus in ultrices ante. Vestibulum tellus arcu, gravida ac eros eget, vulputate dignissim ex. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nam in libero id felis accumsan tempor. Nulla varius rutrum mollis. Pellentesque enim erat, pellentesque sit amet enim quis, scelerisque imperdiet augue. Vestibulum purus ipsum, maximus sit amet risus quis, venenatis facilisis lacus. Nulla id sollicitudin nisl.'`,
    lang: 'jsx',
    editable: true,
    readOnly: false,
    attachment: 'none',
    lineNumbers: false,
    foldGutter: false,
    highlightActiveLineGutter: false,
    highlightActiveLine: true,
    lineWrapping: true,
    spellcheck: false,
    direction: 'ltr',
    rtlMoveVisually: true,
    indentOnLoad: false,
    indentWithTab: false,
  }

  textAreaRef = null

  render () {
    const booleanProps = [
      'editable',
      'readOnly',
      'lineNumbers',
      'foldGutter',
      'highlightActiveLineGutter',
      'highlightActiveLine',
      'lineWrapping',
      'spellcheck',
      'rtlMoveVisually',
      'indentOnLoad',
      'indentWithTab',
    ]
    const booleanPropsState = {}

    booleanProps.forEach(prop => { booleanPropsState[prop] = this.state[prop] })

    return (
      <div>
        <View display="block" margin="small none">
          <FormFieldGroup description="Settings" layout='columns' vAlign='top'>
            <RadioInputGroup
              name="language"
              value={this.state.lang}
              description="language"
              size="small"
              onChange={(e, lang) => {
                this.setState({lang})
              }}
            >
              {[
                'sh',
                'js',
                'json',
                'javascript',
                'jsx',
                'shell',
                'css',
                'html',
                'markdown',
                'yaml',
                'yml',
                'bash'
              ].map(lang => <RadioInput key={lang} label={lang} value={lang} />)}
            </RadioInputGroup>

            <FormFieldGroup
              description='Other props'
              name='Other props'
              rowSpacing='small'
            >
              {booleanProps.map((prop) => (
                <Checkbox
                  label={prop}
                  key={prop}
                  size='small'
                  defaultChecked={this.state[prop]}
                  onChange={() => {
                    this.setState({ [prop]: !this.state[prop] })
                  }}
                />
              ))}
            </FormFieldGroup>

            <FormFieldGroup
              description={<ScreenReaderContent>Other props</ScreenReaderContent>}
              name='Other props'
            >
              <RadioInputGroup
                name="attachment"
                value={this.state.attachment}
                description="attachment"
                size='small'
                onChange={(e, attachment) => {
                  this.setState({attachment})
                }}
              >
                <RadioInput label="none" value={'none'} />
                <RadioInput label="top" value={'top'} />
                <RadioInput label="bottom" value={'bottom'} />
              </RadioInputGroup>

              <RadioInputGroup
                name="direction"
                value={this.state.direction}
                description="direction"
                size="small"
                onChange={(e, direction) => {
                  this.setState({direction})
                }}
              >
                {[
                  'ltr',
                  'rtl',
                ].map(dir => <RadioInput key={dir} label={dir} value={dir} />)}
              </RadioInputGroup>
            </FormFieldGroup>

            <FormFieldGroup description='Value' name='Other props'>
              <TextArea
                label={<ScreenReaderContent>Change value</ScreenReaderContent>}
                height="22rem"
                textareaRef={(e) => { this.textAreaRef = e }}
                maxHeight='22rem'
              />
              <Button onClick={() => {
                this.setState({ value: this.textAreaRef.value })
              }}>
                Update value
              </Button>
            </FormFieldGroup>
          </FormFieldGroup>
        </View>

        <CodeEditorV2
          label='code editor'
          language={this.state.lang}
          {...booleanPropsState}
          direction={this.state.direction}
          attachment={
            this.state.attachment === 'none' ? undefined : this.state.attachment
          }
          value={this.state.value}
          onChange={(value) => {
            this.setState({ value })
          }}
        />
      </div>
    )
  }
}



render(<Example />)
```
