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

import { Heading } from '@instructure/ui-heading'
import {
  SourceCodeEditor,
  SourceCodeEditorProps
} from '@instructure/ui-source-code-editor'

type CMProps = Omit<SourceCodeEditorProps, 'label'> & { exampleLabel?: string }

const languages = {
  json: `{
  "name": "@instructure/ui-code-editor",
  "repository": {
    "type": "git",
    "url": "https://github.com/instructure/instructure-ui.git"
  },
}`,
  javascript: `const fruit: string = "apple"

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
  padding: 10px 25px;
  text-align: center;
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

# example
echo "Hello World!"

________________________________________

$ chmod a+x name.sh
$ ./name.sh Hans-Wolfgang Loidl
My surname is Loidl
Total number of arguments is 2`,
  yml: `---
 doe: "a deer, a female deer"
 pi: 3.14159
 xmas: true
 calling-birds:
   - huey
   - dewey
 xmas-fifth-day:
   calling-birds: four
   french-hens: 3
   partridges:
     count: 1
     location: "a pear tree"
   turtle-doves: two`
}

const valueByLanguage = {
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

const propCombinations: CMProps[] = [
  { exampleLabel: 'default state' },
  ...Object.entries(valueByLanguage).map(
    ([lang, value]) =>
      ({
        exampleLabel: `${lang} language`,
        language: lang as SourceCodeEditorProps['language'],
        defaultValue: value,
        lineWrapping: true
      } as CMProps)
  ),
  {
    exampleLabel: 'lineWrapping off',
    defaultValue: valueByLanguage['jsx'],
    lineWrapping: false
  },
  {
    exampleLabel: 'readOnly',
    readOnly: true
  },
  {
    exampleLabel: 'editable off',
    editable: false
  },
  {
    exampleLabel: 'editable off and readOnly',
    editable: false,
    readOnly: true
  },
  {
    exampleLabel: 'lineNumbers',
    lineNumbers: true
  },
  {
    exampleLabel: 'foldGutter',
    foldGutter: true
  },
  {
    exampleLabel: 'lineNumbers and foldGutter',
    foldGutter: true,
    lineNumbers: true
  },
  {
    exampleLabel: 'lineNumbers and highlightActiveLineGutter',
    highlightActiveLineGutter: true,
    lineNumbers: true
  },
  {
    exampleLabel: 'highlightActiveLine',
    highlightActiveLine: true
  },
  {
    exampleLabel: 'autofocus',
    autofocus: true
  },
  {
    exampleLabel: 'spellcheck',
    spellcheck: true,
    defaultValue: `const thisisabadvariable: strng = "aple"`
  },
  {
    exampleLabel: 'rtl direction',
    direction: 'rtl'
  },
  {
    exampleLabel: 'indentOnLoad off',
    indentOnLoad: false,
    defaultValue: `   const foo = "bar"
const baz = () => {
console.log(foo)
          console.log('should be indented')
}`
  },
  {
    exampleLabel: 'indentOnLoad on',
    indentOnLoad: true,
    defaultValue: `   const foo = "bar"
const baz = () => {
console.log(foo)
          console.log('should be indented')
}`
  },
  {
    exampleLabel: 'indentUnit 8 spaces',
    indentOnLoad: true,
    indentUnit: `        `
  },
  {
    exampleLabel: 'value and onChange',
    value: `const foo = "This is a value."
const bar = "It should override the defaultValue."`,
    onChange: () => {}
  },
  {
    exampleLabel: 'attachment top',
    attachment: 'top'
  },
  {
    exampleLabel: 'attachment bottom',
    attachment: 'bottom'
  }
]

function SourceCodeEditorExamples() {
  return (
    <div style={{ width: '30rem' }}>
      {propCombinations.map((props, idx) => (
        <div style={{ marginTop: '2rem' }} key={props.exampleLabel || idx}>
          {props.exampleLabel && (
            <Heading level="h4" margin="small none">
              {props.exampleLabel}
            </Heading>
          )}
          <SourceCodeEditor
            label="Label"
            language="jsx"
            defaultValue={`function exampleMethod(props: Props) {
  const obj = {
    fruit: 'apple'
  }

  return props ? props.value : null
}`}
            {...props}
          />
        </div>
      ))}
    </div>
  )
}

export default SourceCodeEditorExamples
