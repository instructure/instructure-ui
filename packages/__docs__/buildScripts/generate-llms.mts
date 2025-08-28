import { writeFileSync, readFileSync } from 'fs'

// Define the section interface
interface SectionData {
  docs?: string[]
  sections?: string[]
  title?: string
  level?: number
}

function generateDocsMarkdown(
  filePath: string,
  summariesFilePath?: string
): string {
  const fileContent = readFileSync(filePath, 'utf-8')
  const jsonData = JSON.parse(fileContent)
  const { sections } = jsonData

  // Load summaries from the provided summaries file
  let summaries: Record<string, string> = {}
  if (summariesFilePath) {
    try {
      const summariesContent = readFileSync(summariesFilePath, 'utf-8')
      const summariesData = JSON.parse(summariesContent)
      summariesData.forEach(
        (item: { title: string; description?: string; summary?: string }) => {
          const normalizedKey = item.title
            .replace(/\s+/g, '')
            .replace(/[^a-zA-Z0-9]/g, '')
          summaries[normalizedKey] = item.description || item.summary || ''
          summaries[item.title] = item.description || item.summary || ''
        }
      )
    } catch (error) {
      console.warn('Could not load summaries file:', error)
    }
  }

  const filepath = 'https://instructure.design/pr-preview/pr-2109/markdowns/'

  let markdownContent = `# Instructure UI (InstUI) - React Component Library\n\n - version 10.24.1 \n\n `
  markdownContent += `- Instructure UI (InstUI) is a comprehensive React component library.\n\n`

  // Main Documentation section
  markdownContent += `## Documentation\n\n`

  // Add User Guides wrapper
  markdownContent += `### User Guides\n`

  // Process all non-component, non-utility sections
  Object.entries(sections as Record<string, SectionData>).forEach(([sectionKey, sectionData]) => {
    if (
      sectionKey === '__uncategorized' ||
      sectionKey === 'components' ||
      sectionKey.toLowerCase().includes('utilities') ||
      (sectionData.level || 0) > 0  // Fixed: Handle undefined level
    ) {
      return
    }

    const sectionTitle = sectionData.title || sectionKey
    markdownContent += `#### ${sectionTitle}\n\n`

    if (sectionData.docs && sectionData.docs.length > 0) {
      const uniqueDocs = [...new Set(sectionData.docs)]
      uniqueDocs.forEach((doc) => {
        const normalizedDoc = doc
          .replace(/\s+/g, '')
          .replace(/[^a-zA-Z0-9]/g, '')
        const summary = summaries[doc] || summaries[normalizedDoc] || ''
        markdownContent += `- [${doc}](${filepath}${doc}.md)${
          summary ? `: ${summary}` : ''
        }\n`
      })
    }
    markdownContent += '\n'
  })

  // Add Components section (sibling of User Guides)
  markdownContent += `### Components\n\n`

  const componentsSection = sections['components'] as SectionData | undefined
  if (componentsSection) {
    const allComponents = [...new Set(componentsSection.docs || [])]
    allComponents.forEach((component) => {
      const normalizedComponent = component
        .replace(/\s+/g, '')
        .replace(/[^a-zA-Z0-9]/g, '')
      const summary =
        summaries[component] || summaries[normalizedComponent] || ''
      markdownContent += `- [${component}](${filepath}${component}.md)${
        summary ? `: ${summary}` : ''
      }\n`
    })
  }

  // Process component subsections (keep AI Components + utilities, skip deprecated)
  if (componentsSection?.sections && componentsSection.sections.length > 0) {
    const subsections = componentsSection.sections
    subsections.forEach((subsectionPath: string) => {
      if (subsectionPath.toLowerCase().includes('deprecated')) return

      const subsection = sections[subsectionPath] as SectionData | undefined
      if (subsection && subsection.docs && subsection.docs.length > 0) {
        const subsectionTitle =
          subsection.title || subsectionPath.split('/').pop() || subsectionPath
        markdownContent += `\n#### ${subsectionTitle}\n\n`
        const uniqueSubDocs = [...new Set(subsection.docs)]
        uniqueSubDocs.forEach((doc) => {
          const normalizedDoc = doc
            .replace(/\s+/g, '')
            .replace(/[^a-zA-Z0-9]/g, '')
          const summary = summaries[doc] || summaries[normalizedDoc] || ''
          markdownContent += `- [${doc}](${filepath}${doc}.md)${
            summary ? `: ${summary}` : ''
          }\n`
        })
      }
    })
  }

  return markdownContent
}

function generateLLMSTxt(
  inputFilePath: string,
  outputFilePath: string,
  summariesFilePath?: string
) {
  const markdownContent = generateDocsMarkdown(inputFilePath, summariesFilePath)
  writeFileSync(outputFilePath, markdownContent)
}

export { generateLLMSTxt }