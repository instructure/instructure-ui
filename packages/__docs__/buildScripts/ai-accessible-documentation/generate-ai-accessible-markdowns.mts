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

/**
 * Processes InstUI JSON metadata to generate AI-accessible materials:
 * - Generates structured markdown files for InstUI components (with prop tables and usage section) and guides
 * - Packages all documentation with an index file into a downloadable zip file
 */

import { execFileSync } from 'child_process'

import {
  readFileSync,
  writeFileSync,
  readdirSync,
  mkdirSync,
  existsSync
} from 'fs'
import path from 'path'
import { generateAIAccessibleLlmsFile } from './generate-ai-accessible-llms-file.mjs'

interface PropDefinition {
  tsType?: {
    raw?: string
    name?: string
  }
  type?: {
    name?: string
  }
  required?: boolean
  defaultValue?: {
    value?: string
  }
  description?: string
}

interface ComponentData {
  displayName: string
  description: string
  props: Record<string, PropDefinition>
  category?: string
  parent?: string
  id?: string
  packageName?: string
  esPath?: string
  title?: string
  relevantForAI?: boolean
}

interface GuideData {
  title: string
  description: string
  category?: string
  order?: number
  id?: string
  [key: string]: any
  relevantForAI?: boolean
}

type DocumentationData = ComponentData | GuideData

function isComponent(data: DocumentationData): data is ComponentData {
  return (
    (data as ComponentData).displayName !== undefined &&
    (data as ComponentData).props !== undefined
  )
}

function isGuide(data: DocumentationData): data is GuideData {
  return (data as GuideData).title !== undefined && data.relevantForAI === true
}

function formatPropsMarkdownTable(text: string): string {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/\|/g, '\\|')
    .replace(/\n/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function formatPropsTypeDefinitionForMarkdownTable(type: string): string {
  return `\`${type
    .replace(/\\/g, '\\\\')
    .replace(/\|/g, '\\|')
    .replace(/\n/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()}\``
}

function formatPropsDefaultValueForMarkdownTable(value: string): string {
  return value ? `\`${value}\`` : '-'
}

function generatePropsTable(
  component: ComponentData,
  childComponents: ComponentData[] = []
): string {
  const { displayName, props } = component

  const allProps: Array<{
    name: string
    data: PropDefinition
    component: string
  }> = []

  // Collect props from parent component e.g. for Tabs
  for (const [propName, propData] of Object.entries(props)) {
    if (propName === 'dir') continue
    allProps.push({
      name: propName,
      data: propData,
      component: displayName
    })
  }

  // Collect props from child components e.g. for Tabs.Panel
  for (const child of childComponents) {
    const childName = child.displayName.split('.').pop() || ''
    for (const [propName, propData] of Object.entries(child.props)) {
      if (propName === 'dir') continue
      allProps.push({
        name: propName,
        data: propData,
        component: `${displayName}.${childName}`
      })
    }
  }

  if (allProps.length === 0) {
    return ''
  }

  let propsContent = `### Props\n\n`
  propsContent += `| Component | Prop | Type | Required | Default | Description |\n`
  propsContent += `|-----------|------|------|----------|---------|-------------|\n`

  for (const prop of allProps) {
    const type = formatPropsTypeDefinitionForMarkdownTable(
      prop.data.tsType?.raw || prop.data.tsType?.name || ''
    )
    const required = prop.data.required ? 'Yes' : 'No'
    const defaultValue = formatPropsDefaultValueForMarkdownTable(
      prop.data.defaultValue?.value || ''
    )
    const description = formatPropsMarkdownTable(prop.data.description || '')

    propsContent += `| ${prop.component} | ${prop.name} | ${type} | ${required} | ${defaultValue} | ${description} |\n`
  }
  propsContent += '\n'

  return propsContent
}

function generateComponentUsage(doc: DocumentationData): string {
  if (!isComponent(doc)) return ''

  const { id, displayName, packageName } = doc
  const importName = displayName || id

  if (!packageName) return ''

  let usageContent = `### Usage\n\n`

  usageContent += `Install the package:\n\n\`\`\`shell\nnpm install ${packageName}\n\`\`\`\n\n`

  usageContent += `Import the component:\n\n\`\`\`javascript
/*** ES Modules (with tree shaking) ***/
import { ${importName} } from '${packageName}'
\`\`\`\n\n`

  return usageContent
}

function generateComponentMarkdown(
  jsonData: ComponentData,
  childComponents: ComponentData[] = []
): string {
  const { displayName, description } = jsonData

  let markdownContent = `# ${displayName}\n\n`
  markdownContent += `${description}\n\n`
  markdownContent += generatePropsTable(jsonData, childComponents)
  markdownContent += generateComponentUsage(jsonData)

  return markdownContent
}

function generateGuideMarkdown(jsonData: GuideData): string {
  const { description } = jsonData

  const markdownContent = `${description}\n\n`

  return markdownContent
}

async function generateAIAccessibleMarkdowns(
  docsFolder: string,
  outputDir: string
): Promise<void> {
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true })
    // eslint-disable-next-line no-console
    console.log(`Created markdown directory: ${outputDir}`)
  }

  const files = readdirSync(docsFolder)
  const jsonFiles = files.filter((file) => file.endsWith('.json'))

  const allDocs: DocumentationData[] = []
  for (const file of jsonFiles) {
    try {
      const filePath = path.join(docsFolder, file)
      const fileContent = readFileSync(filePath, 'utf-8')
      const jsonData: DocumentationData = JSON.parse(fileContent)
      allDocs.push(jsonData)
    } catch (error) {
      console.error(`Error processing file ${file}:`, error)
    }
  }

  // Process guides
  const guides = allDocs.filter(isGuide)
  for (const guide of guides) {
    const markdownContent = generateGuideMarkdown(guide)
    const fileName = `${
      guide.id || guide.title.toLowerCase().replace(/\s+/g, '-')
    }.md`
    const filePath = path.join(outputDir, fileName)
    writeFileSync(filePath, markdownContent)
  }

  // Process components
  const components = allDocs.filter(isComponent)

  for (const component of components) {
    const childComponents = components.filter(
      (c) => c.parent === component.displayName
    )
    // Do not generate a markdown file for child components like Tabs.Panel
    if (!component.parent) {
      const markdownContent = generateComponentMarkdown(
        component,
        childComponents
      )
      const fileName = `${
        component.id ||
        component.displayName.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      }.md`
      const filePath = path.join(outputDir, fileName)
      writeFileSync(filePath, markdownContent)
    }
  }

  const buildDir = './__build__/'
  // create an llms-like index file for docs in the zip
  generateAIAccessibleLlmsFile(buildDir + 'markdown-and-sources-data.json', {
    outputFilePath: path.join(outputDir, 'index.md'),
    baseUrl: './',
    summariesFilePath:
      './buildScripts/ai-accessible-documentation/summaries-for-llms-file.json'
  })
  const mdFiles = readdirSync(outputDir).filter((file) => file.endsWith('.md'))

  // Create zip using system command
  try {
    execFileSync('zip', ['documentation.zip', ...mdFiles], { cwd: outputDir })
  } catch (error) {
    console.error('Failed to create zip file:', error)
  }
}

export { generateAIAccessibleMarkdowns }
