import { execFileSync } from 'child_process'
import { fileURLToPath} from 'url'

import {
  readFileSync,
  writeFileSync,
  readdirSync,
  mkdirSync,
  existsSync
} from 'fs'
import path from 'path'
import { generateLLMS } from './generate-llms.mjs'

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
}

interface GuideData {
  title: string
  description: string
  category?: string
  order?: number
  id?: string
  [key: string]: any
}

type DocumentationData = ComponentData | GuideData

function isComponent(data: DocumentationData): data is ComponentData {
  return (
    (data as ComponentData).displayName !== undefined &&
    (data.category === 'components' ||
      data.category === 'components/AI Components' ||
      data.category === 'components/utilities')
  )
}

function isGuide(data: DocumentationData): data is GuideData {
  return (
    (data as GuideData).title !== undefined &&
    (data.category === 'Guides' ||
      data.category === 'Getting Started' ||
      data.category === 'Patterns')
  )
}

function formatForMarkdownTable(text: string): string {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/\|/g, '\\|')
    .replace(/\n/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function formatTypeDefinitionForMarkdownTable(type: string): string {
  return `\`${type
    .replace(/\\/g, '\\\\')
    .replace(/\|/g, '\\|')
    .replace(/\n/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()}\``
}

function formatDefaultValueForMarkdownTable(value: string): string {
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
    const type = formatTypeDefinitionForMarkdownTable(
      prop.data.tsType?.raw || prop.data.type?.name || ''
    )
    const required = prop.data.required ? 'Yes' : 'No'
    const defaultValue = formatDefaultValueForMarkdownTable(
      prop.data.defaultValue?.value || ''
    )
    const description = formatForMarkdownTable(prop.data.description || '')

    propsContent += `| ${prop.component} | ${prop.name} | ${type} | ${required} | ${defaultValue} | ${description} |\n`
  }
  propsContent += '\n'

  return propsContent
}

function generateComponentUsage(doc: DocumentationData): string {
  if (!isComponent(doc)) return ''

  const { id, displayName, packageName, esPath } = doc
  const importName = displayName || id

  const example = []

  if (packageName) {
    example.push(`/*** ES Modules (with tree shaking) ***/
import { ${importName} } from '${packageName}'`)
  }

  if (esPath) {
    example.push(`/*** ES Modules (without tree shaking) ***/
import { ${importName} } from '${esPath}'`)
  }

  if (example.length === 0) return ''

  let usageContent = `### Usage\n\n`

  if (packageName) {
    usageContent += `Install the package:\n\n\`\`\`shell\nnpm install ${packageName}\n\`\`\`\n\n`
  }

  usageContent += `Import the component:\n\n\`\`\`javascript\n${example.join(
    '\n\n'
  )}\n\`\`\`\n\n`

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

  let markdownContent = `${description}\n\n`

  return markdownContent
}

async function generateIndividualMarkdownFiles(
  docsFolder: string,
  outputDir: string
): Promise<void> {
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true })
    console.log(`Created markdown directory: ${outputDir}`)
  }

  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)

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

  const buildDir = "./__build__/"
  // create new markdown for the zip
  generateLLMS(
    buildDir + 'markdown-and-sources-data.json',
    path.join(outputDir, 'INDEX.md'),
    './',
    path.join(__dirname, '../buildScripts/summaries.json')
  )
  const mdFiles = readdirSync(outputDir).filter((file) => file.endsWith('.md'))
 
  // Create zip using system command
  try {
    execFileSync('zip', ['documentation.zip', ...mdFiles], { cwd: outputDir })
  } catch (error) {
    console.error('Failed to create zip file:', error)
  }
}

export { generateIndividualMarkdownFiles }
