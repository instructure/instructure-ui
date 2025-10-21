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

import j from 'jscodeshift'
import {
  findAttribute,
  getVisibleChildren,
  renameElements,
  renameImportAndUsages,
  findImport,
  findEveryImport,
  addImportIfNeeded,
  replaceImport,
  removeAllChildren,
  findElement
} from '../utils/codemodHelpers'
import { expect, type MockInstance, vi } from 'vitest'

describe('test codemod helpers', () => {
  let consoleLogMock: ReturnType<typeof vi.spyOn>
  let consoleWarningMock: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    // Mocking console to prevent test output pollution
    // comment these out to see the test output
    consoleLogMock = vi
      .spyOn(console, 'log')
      .mockImplementation(() => {}) as MockInstance
    consoleWarningMock = vi
      .spyOn(console, 'warn')
      .mockImplementation(() => {}) as MockInstance
  })

  afterEach(() => {
    consoleLogMock.mockRestore()
    consoleWarningMock.mockRestore()
  })

  it('test findElement', () => {
    // Test finding simple elements by tag name
    const source = `
      <div>
        <Button id="btn1" onClick={handleClick}>Click me</Button>
        <Button type="submit" disabled>Submit</Button>
        <Icon size="small" />
        <Component.SubItem active={true}>Child</Component.SubItem>
        <div {...spreadProps}>Spread attributes</div>
      </div>
    `
    const filePath = 'test.jsx'
    const root = j(source)

    // Find all Button elements
    let result = findElement(filePath, j, root, 'Button')
    expect(result.length).toEqual(2)

    // Find elements by tag name and attribute name
    result = findElement(filePath, j, root, 'Button', { name: 'disabled' })
    expect(result.length).toEqual(1)
    expect(j(result.paths()[0]).toSource()).toContain('type="submit"')

    // Find elements by tag name and attribute name + value
    result = findElement(filePath, j, root, 'Button', {
      name: 'id',
      value: 'btn1'
    })
    expect(result.length).toEqual(1)
    expect(j(result.paths()[0]).toSource()).toContain('onClick={handleClick}')

    // Find elements by tag name and multiple attribute options
    result = findElement(filePath, j, root, 'Button', {
      name: 'type',
      value: ['reset', 'submit']
    })
    expect(result.length).toEqual(1)
    expect(j(result.paths()[0]).toSource()).toContain('type="submit"')

    // Find elements with all attributes present
    result = findElement(filePath, j, root, 'Button', [
      { name: 'type', value: 'submit' },
      { name: 'disabled' }
    ])
    expect(result.length).toEqual(1)

    // Test finding no matching elements
    result = findElement(filePath, j, root, 'Button', { name: 'nonexistent' })
    expect(result.length).toEqual(0)

    // Test finding component with member expression (namespace)
    result = findElement(filePath, j, root, 'Component.SubItem')
    expect(result.length).toEqual(1)
    expect(j(result.paths()[0]).toSource()).toContain('active={true}')

    // Test finding element with attribute and value that doesn't match
    result = findElement(filePath, j, root, 'Button', {
      name: 'type',
      value: 'reset'
    })
    expect(result.length).toEqual(0)

    // Verify error when using deep nesting in tag names
    expect(() => {
      findElement(filePath, j, root, 'Component.SubItem.DeepNesting')
    }).toThrow(/cannot handle tag names with 2 or more/)
  })

  it('test findAttribute', () => {
    const data = j(
      `<>
        <button id='1234' aloneAttr>asd</button>
        <button test={false}>asd</button>
        <test id={asd.gfd}>asd</test>
        <div {...{id:5}} />
      </>`
    )
    const r = findAttribute('', j, data, 'id')
    expect(j(r.paths()).toSource()).toEqual(["id='1234'", 'id={asd.gfd}'])

    const r2 = findAttribute('', j, data, 'id', '1234')
    expect(j(r2.paths()).toSource()).toEqual("id='1234'")

    const r3 = findAttribute('', j, data, 'aloneAttr')
    expect(j(r3.paths()).toSource()).toEqual('aloneAttr')
  })

  it('test getVisibleChildren', () => {
    const data = j(
      `<button>

        <button id='1234' aloneAttr>asd</button>

      </button>`
    )
    const r = getVisibleChildren(
      data.paths()[0].value.program.body[0].expression.children
    )
    expect(j(r).toSource()).toEqual("<button id='1234' aloneAttr>asd</button>")
  })

  it('test renameElements', () => {
    // Test simple tag renaming
    const simpleSource = `<Button id="test">Click me</Button>`
    let root = j(simpleSource)
    const buttonElements = root.find(j.JSXElement, {
      openingElement: {
        name: {
          type: 'JSXIdentifier',
          name: 'Button'
        }
      }
    })
    renameElements('test.js', buttonElements, 'Button', 'PrimaryButton')
    expect(root.toSource()).toEqual(
      `<PrimaryButton id="test">Click me</PrimaryButton>`
    )

    // Test self-closing tag renaming
    const selfClosingSource = `<Icon size="small" />`
    root = j(selfClosingSource)
    const iconElements = root.find(j.JSXElement, {
      openingElement: {
        name: {
          type: 'JSXIdentifier',
          name: 'Icon'
        }
      }
    })
    renameElements('test.js', iconElements, 'Icon', 'SVGIcon')
    expect(root.toSource()).toEqual(`<SVGIcon size="small" />`)

    // Test compound tag renaming
    const compoundSource = `<Component.SubItem active={true}>Child</Component.SubItem>`
    root = j(compoundSource)
    const compoundElements = root.find(j.JSXElement, {
      openingElement: {
        name: {
          type: 'JSXMemberExpression',
          object: {
            name: 'Component'
          },
          property: {
            name: 'SubItem'
          }
        }
      }
    })
    renameElements(
      'test.js',
      compoundElements,
      'Component.SubItem',
      'NewComponent.ListItem'
    )
    expect(root.toSource()).toEqual(
      `<NewComponent.ListItem active={true}>Child</NewComponent.ListItem>`
    )
  })

  it('test findImport', () => {
    // Test standard named import
    const source = `
      import { Button } from '@instructure/ui-buttons'
      import { Text } from '@instructure/ui-text'
      import React from 'react'
    `
    let root = j(source)

    // Find existing import
    let result = findImport(j, root, 'Button', '@instructure/ui-buttons')
    expect(result).toEqual('Button')

    // Find import with multiple possible paths
    result = findImport(j, root, 'Button', [
      '@instructure/ui-something',
      '@instructure/ui-buttons'
    ])
    expect(result).toEqual('Button')

    // Not existing import
    result = findImport(j, root, 'Modal', '@instructure/ui-buttons')
    expect(result).toBeUndefined()

    // Import from wrong path
    result = findImport(j, root, 'Button', '@instructure/ui-wrong')
    expect(result).toBeUndefined()

    // Test aliased import
    const aliasedSource = `
      import { Button as PrimaryButton } from '@instructure/ui-buttons'
      import { Text } from '@instructure/ui-text'
    `
    root = j(aliasedSource)
    result = findImport(j, root, 'Button', '@instructure/ui-buttons')
    expect(result).toEqual('PrimaryButton')

    // Test default import
    const defaultImportSource = `
      import DefaultButton from '@instructure/ui-buttons'
      import { Text } from '@instructure/ui-text'
    `
    root = j(defaultImportSource)
    result = findImport(j, root, 'DefaultButton', '@instructure/ui-buttons')
    expect(result).toEqual('DefaultButton')
  })

  it('test findEveryImport', () => {
    // Test with exactMatch = true (default)
    const source = `
      import { Button, IconButton } from '@instructure/ui-buttons'
      import { Text, Heading } from '@instructure/ui-text'
      import React from 'react'
      import { Modal as Dialog } from '@instructure/ui-modal'
      import DefaultIcon from '@instructure/ui-icons'
    `
    const root = j(source)

    // Find imports from exact path
    let result = findEveryImport(j, root, '@instructure/ui-buttons')
    expect(result.sort()).toEqual(['Button', 'IconButton'])

    // Renamed imports should return the local name
    result = findEveryImport(j, root, '@instructure/ui-modal')
    expect(result).toEqual(['Dialog'])

    // Default imports should be included
    result = findEveryImport(j, root, '@instructure/ui-icons')
    expect(result).toEqual(['DefaultIcon'])

    // No imports from a specific path
    result = findEveryImport(j, root, '@instructure/ui-missing')
    expect(result).toEqual([])

    // Test with exactMatch = false
    result = findEveryImport(j, root, '@instructure/ui', false)
    expect(result.sort()).toEqual([
      'Button',
      'DefaultIcon',
      'Dialog',
      'Heading',
      'IconButton',
      'Text'
    ])

    // Test with partial path that doesn't match
    result = findEveryImport(j, root, 'non-existent', false)
    expect(result).toEqual([])
  })

  it('test addImportIfNeeded', () => {
    // Test adding a new import when no imports from the path exist
    const source = `import { Button } from '@instructure/ui-buttons'
      import React from 'react'`
    let root = j(source)

    // Add new import from a new path
    let result = addImportIfNeeded(j, root, 'Modal', '@instructure/ui-modal')
    expect(result).toEqual('Modal')
    expect(root.toSource())
      .toEqual(`import { Button } from '@instructure/ui-buttons'
import React from 'react'
import { Modal } from "@instructure/ui-modal";`)

    // Test adding to existing import statement
    root = j(source)
    result = addImportIfNeeded(j, root, 'IconButton', '@instructure/ui-buttons')
    expect(result).toEqual('IconButton')
    expect(root.toSource()).toContain(
      "import { Button, IconButton } from '@instructure/ui-buttons'"
    )

    // Test adding a default import
    root = j(source)
    result = addImportIfNeeded(
      j,
      root,
      'DefaultIcon',
      '@instructure/ui-icons',
      true
    )
    expect(result).toEqual('DefaultIcon')
    expect(root.toSource()).toContain(
      `import DefaultIcon from "@instructure/ui-icons"`
    )

    // Test not adding an import when it already exists
    root = j(`
      import { Button, IconButton } from '@instructure/ui-buttons'
      import React from 'react'
    `)
    result = addImportIfNeeded(j, root, 'Button', '@instructure/ui-buttons')
    expect(result).toEqual('Button')
    expect(root.toSource()).toEqual(`
      import { Button, IconButton } from '@instructure/ui-buttons'
      import React from 'react'
    `)

    // Test with multiple possible paths
    root = j(source)
    result = addImportIfNeeded(j, root, 'Text', [
      '@instructure/ui-text',
      '@instructure/ui-components'
    ])
    expect(result).toEqual('Text')
    expect(root.toSource()).toContain(
      `import { Text } from "@instructure/ui-text"`
    )

    root = j(source)
    result = addImportIfNeeded(j, root, 'Text', [
      '@instructure/ui-text',
      '@instructure/ui-buttons'
    ])
    expect(result).toEqual('Text')
    expect(root.toSource()).toContain(
      `import { Button, Text } from '@instructure/ui-buttons'`
    )
    // Test with aliased import
    const aliasedSource = `
      import { Button as PrimaryButton } from '@instructure/ui-buttons'
      import React from 'react'
    `
    root = j(aliasedSource)
    result = addImportIfNeeded(j, root, 'Button', '@instructure/ui-buttons')
    expect(result).toEqual('PrimaryButton')
    // No new import should be added since it exists as an alias
    expect(root.toSource())
      .toContain(`import { Button as PrimaryButton } from '@instructure/ui-buttons'
      import React from 'react'`)
  })

  it('test replaceImport', () => {
    // Test replacing a named import
    const source = `
      import { Button, IconButton } from '@instructure/ui-buttons'
      import { Text } from '@instructure/ui-text'
      import React from 'react'
    `
    let root = j(source)

    // Replace a simple named import
    let result = replaceImport(
      j,
      root,
      'Button',
      'PrimaryButton',
      '@instructure/ui-buttons'
    )
    expect(result).toEqual('PrimaryButton')
    expect(root.toSource()).toContain(
      "import { PrimaryButton, IconButton } from '@instructure/ui-buttons'"
    )
    expect(root.toSource()).not.toContain(' Button')

    // Test replacing only matches the correct path
    root = j(source)
    result = replaceImport(
      j,
      root,
      'Text',
      'Typography',
      '@instructure/ui-text'
    )
    expect(result).toEqual('Typography')
    expect(root.toSource()).toEqual(`
      import { Button, IconButton } from '@instructure/ui-buttons'
      import { Typography } from '@instructure/ui-text'
      import React from 'react'
    `)

    // Test replacing with multiple possible paths
    root = j(source)
    result = replaceImport(j, root, 'Text', 'Typography', [
      '@instructure/ui-something',
      '@instructure/ui-text'
    ])
    expect(result).toEqual('Typography')
    expect(root.toSource()).toContain(
      "import { Typography } from '@instructure/ui-text'"
    )

    // Test replacing a default import
    const defaultImportSource = `
      import DefaultButton, { UglyButton } from '@instructure/ui-buttons'
      import { Text } from '@instructure/ui-text'
    `
    root = j(defaultImportSource)
    result = replaceImport(
      j,
      root,
      'DefaultButton',
      'PrimaryButton',
      '@instructure/ui-buttons',
      true
    )
    expect(result).toEqual('PrimaryButton')
    expect(root.toSource()).toEqual(`
      import PrimaryButton, { UglyButton } from '@instructure/ui-buttons'
      import { Text } from '@instructure/ui-text'
    `)

    // Test replacing non-existent import (should not modify the source)
    const originalSource = `import { Button } from '@instructure/ui-buttons'`
    root = j(originalSource)
    result = replaceImport(j, root, 'Modal', 'Dialog', '@instructure/ui-modal')
    expect(result).toEqual('Dialog')
    expect(root.toSource()).toEqual(originalSource) // Source should be unchanged
  })

  it('test removeAllChildren', () => {
    // Test removing children from a standard element
    const source = `<Container><Child>Text content</Child><AnotherChild /></Container>`
    let root = j(source)
    const containerElements = root.find(j.JSXElement, {
      openingElement: {
        name: {
          type: 'JSXIdentifier',
          name: 'Container'
        }
      }
    })

    // Apply removeAllChildren to the Container element
    removeAllChildren(containerElements.nodes()[0])
    expect(root.toSource()).toEqual(`<Container />`)

    // Test removing children from a nested element structure
    const nestedSource = `
      <Wrapper>
        <Container>
          <Child>Text content</Child>
          <AnotherChild />
        </Container>
      </Wrapper>
    `
    root = j(nestedSource)
    const innerContainers = root.find(j.JSXElement, {
      openingElement: {
        name: {
          type: 'JSXIdentifier',
          name: 'Container'
        }
      }
    })

    removeAllChildren(innerContainers.nodes()[0])
    expect(root.toSource()).toEqual(`
      <Wrapper>
        <Container />
      </Wrapper>
    `)

    // Test with an element that already has no children (self-closing)
    const selfClosingSource = `<EmptyElement />`
    root = j(selfClosingSource)
    const emptyElements = root.find(j.JSXElement, {
      openingElement: {
        name: {
          type: 'JSXIdentifier',
          name: 'EmptyElement'
        }
      }
    })

    removeAllChildren(emptyElements.nodes()[0])
    expect(root.toSource()).toEqual(`<EmptyElement />`)

    // Test with an element that has attributes
    const attributeSource = `<Button id="test" onClick={handleClick}>Click me</Button>`
    root = j(attributeSource)
    const buttonElements = root.find(j.JSXElement, {
      openingElement: {
        name: {
          type: 'JSXIdentifier',
          name: 'Button'
        }
      }
    })

    removeAllChildren(buttonElements.nodes()[0])
    expect(root.toSource()).toEqual(
      `<Button id="test" onClick={handleClick} />`
    )
  })

  it('test renameImportAndUsages', () => {
    // Test renaming a direct import and all its usages
    let source = `
      import { oldName } from '@import-path'
      import { otherThing } from 'another-path'

      function test() {
        oldName()
        const a = oldName
        return <Component prop={oldName} />;
      }
    `
    let root = j(source)
    let result = renameImportAndUsages(
      j,
      root,
      'oldName',
      'newName',
      '@import-path'
    )

    expect(result).toBe(true)
    expect(root.toSource()).toBe(`
      import { newName } from '@import-path'
      import { otherThing } from 'another-path'

      function test() {
        newName()
        const a = newName
        return <Component prop={newName} />;
      }
    `)

    // Test renaming a renamed import (with as syntax) but keeping the local name
    source = `
      import { oldName as localName } from '@import-path'
      import { oldName } from '@other-path'

      function test() {
        localName()
        const a = localName
        oldName()
      }
    `
    root = j(source)
    result = renameImportAndUsages(
      j,
      root,
      'oldName',
      'newName',
      '@import-path'
    )

    expect(result).toBe(true)
    expect(root.toSource()).toBe(`
      import { newName as localName } from '@import-path'
      import { oldName } from '@other-path'

      function test() {
        localName()
        const a = localName
        oldName()
      }
    `)

    // Test handle type imports correctly
    source = `
      import type { oldName } from '@import-path'
      import { name } from '@import-path'

      function test(): oldName {
        return name()
      }
    `
    root = j.withParser('tsx')(source)
    result = renameImportAndUsages(
      j,
      root,
      'oldName',
      'newName',
      '@import-path'
    )

    expect(result).toBe(true)
    expect(root.toSource()).toBe(`
      import type { newName } from '@import-path'
      import { name } from '@import-path'

      function test(): newName {
        return name()
      }
    `)

    // Test handling multiple imports from the same module
    source = `
      import { oldName, oldName as localName, otherThing } from '@import-path'

      function test() {
        oldName()
        localName()
        otherThing()
      }
    `
    root = j(source)
    result = renameImportAndUsages(
      j,
      root,
      'oldName',
      'newName',
      '@import-path'
    )

    expect(result).toBe(true)
    expect(root.toSource()).toBe(`
      import { newName, newName as localName, otherThing } from '@import-path'

      function test() {
        newName()
        localName()
        otherThing()
      }
    `)

    // Test not modifying source when import doesn't exist
    source = `
      import { otherThing } from '@import-path'

      function test() {
        otherThing()
      }
    `
    root = j(source)
    const originalSource = root.toSource()
    result = renameImportAndUsages(
      j,
      root,
      'oldName',
      'newName',
      '@import-path'
    )

    expect(result).toBe(false)
    expect(root.toSource()).toBe(originalSource)

    // Test handling object destructuring patterns
    source = `
      import { oldName } from '@import-path'
      import * as myModule from '@import-path'

      function test() {
        myModule.oldName()
        const { oldName } = myModule
        oldName()
      }
    `
    root = j(source)
    result = renameImportAndUsages(
      j,
      root,
      'oldName',
      'newName',
      '@import-path'
    )

    expect(result).toBe(true)
    expect(root.toSource()).toBe(`
      import { newName } from '@import-path'
      import * as myModule from '@import-path'

      function test() {
        myModule.newName()
        const { newName } = myModule
        newName()
      }
    `)

    // Test handling spread operator usage
    source = `
      import { oldName } from '@import-path'

      function test() {
        const obj = { ...oldName }
        return <Component {...oldName} />
      }
    `
    root = j(source)
    result = renameImportAndUsages(
      j,
      root,
      'oldName',
      'newName',
      '@import-path'
    )

    expect(result).toBe(true)
    expect(root.toSource()).toBe(`
      import { newName } from '@import-path'

      function test() {
        const obj = { ...newName }
        return <Component {...newName} />;
      }
    `)

    // Test not modifying similarly named identifiers
    source = `
      import { oldName } from '@import-path'

      function test() {
        const oldNameCustom = 'test'
        const prefixOldName = 'test'
        return oldName + oldNameCustom + prefixOldName
      }
    `
    root = j(source)
    result = renameImportAndUsages(
      j,
      root,
      'oldName',
      'newName',
      '@import-path'
    )

    expect(result).toBe(true)
    expect(root.toSource()).toBe(`
      import { newName } from '@import-path'

      function test() {
        const oldNameCustom = 'test'
        const prefixOldName = 'test'
        return newName + oldNameCustom + prefixOldName;
      }
    `)

    // Test renaming a JSX component import and its usages
    source = `
      import { Button } from '@instructure/ui-buttons'

      function TestComponent() {
        return (
          <div>
            <Button variant="primary">Click me</Button>
            <Button onClick={handleClick} />
          </div>
        )
      }
    `
    root = j(source)
    result = renameImportAndUsages(
      j,
      root,
      'Button',
      'PrimaryButton',
      '@instructure/ui-buttons'
    )

    expect(result).toBe(true)
    expect(root.toSource()).toBe(`
      import { PrimaryButton } from '@instructure/ui-buttons'

      function TestComponent() {
        return (
          <div>
            <PrimaryButton variant="primary">Click me</PrimaryButton>
            <PrimaryButton onClick={handleClick} />
          </div>
        );
      }
    `)

    // Test renaming a component with props spread
    source = `
      import { Button } from '@instructure/ui-buttons'

      function TestComponent(props) {
        return <Button {...props} />
      }
    `
    root = j(source)
    result = renameImportAndUsages(
      j,
      root,
      'Button',
      'PrimaryButton',
      '@instructure/ui-buttons'
    )

    expect(result).toBe(true)
    expect(root.toSource()).toBe(`
      import { PrimaryButton } from '@instructure/ui-buttons'

      function TestComponent(props) {
        return <PrimaryButton {...props} />;
      }
    `)

    // Test renaming a component used in JSX expressions
    source = `
      import { Button } from '@instructure/ui-buttons'

      function TestComponent() {
        const buttonVariant = 'primary'
        return buttonVariant === 'primary' ? <Button variant="primary" /> : null
      }
    `
    root = j(source)
    result = renameImportAndUsages(
      j,
      root,
      'Button',
      'PrimaryButton',
      '@instructure/ui-buttons'
    )

    expect(result).toBe(true)
    expect(root.toSource()).toBe(`
      import { PrimaryButton } from '@instructure/ui-buttons'

      function TestComponent() {
        const buttonVariant = 'primary'
        return buttonVariant === 'primary' ? <PrimaryButton variant="primary" /> : null;
      }
    `)

    // Test renaming a component with children
    source = `
      import { Button } from '@instructure/ui-buttons'

      function TestComponent() {
        return (
          <Button>
            <span>Click me</span>
            <Icon name="arrow-right" />
          </Button>
        )
      }
    `
    root = j(source)
    result = renameImportAndUsages(
      j,
      root,
      'Button',
      'PrimaryButton',
      '@instructure/ui-buttons'
    )

    expect(result).toBe(true)
    expect(root.toSource()).toBe(`
      import { PrimaryButton } from '@instructure/ui-buttons'

      function TestComponent() {
        return (
          <PrimaryButton>
            <span>Click me</span>
            <Icon name="arrow-right" />
          </PrimaryButton>
        );
      }
    `)

    // Test that default imports are NOT supported (should not modify source)
    source = `
      import Button from './Button'
      import { SecondaryButton } from './Button'

      function TestComponent() {
        return (
          <div>
            <Button>Default Import</Button>
            <SecondaryButton />
          </div>
        )
      }
    `
    root = j(source)
    result = renameImportAndUsages(
      j,
      root,
      'Button',
      'PrimaryButton',
      '@instructure/ui-buttons'
    )

    expect(result).toBe(false)
    expect(root.toSource()).toBe(source)
  })
})
