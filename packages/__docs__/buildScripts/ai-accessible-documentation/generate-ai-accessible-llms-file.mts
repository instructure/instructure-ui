/**
 * Processes InstUI JSON metadata to generate a file
 * formatted for Large Language Model Systems (LLMS) and AI agent consumption
 * - Contains a catalog of links pointing to ai-accessible markdown files about InstUI components and guides
 * - Contains a summary of each component/guide next to the links
*/

import { writeFileSync, readFileSync } from 'fs'

interface SectionData {
  docs?: string[]
  sections?: string[]
  title?: string
}

interface GenerateLLMSOptions {
  summariesFilePath?: string
  baseUrl?: string
  outputFilePath?: string
}

function generateAIAccessibleLlmsFile(
  sourceFilePath: string,
  options: GenerateLLMSOptions = {}
): string {
  const { summariesFilePath, baseUrl = '', outputFilePath } = options

  const fileContent = readFileSync(sourceFilePath, 'utf-8')
  const jsonData = JSON.parse(fileContent)
  const { sections } = jsonData

  let summaries: Record<string, string> = {}
  // Generate summaries object from the summaries file for later lookup
  if (summariesFilePath) {
    try {
      const summariesContent = readFileSync(summariesFilePath, 'utf-8')
      const data = JSON.parse(summariesContent)

      data.forEach((item: { title: string; summary?: string }) => {
        summaries[item.title] = item.summary || ''
      })
    } catch (error) {
      console.warn('Could not load summaries file:', error)
    }
  }

  let LlmsMarkdownContent = `# Instructure UI (InstUI) - React Component Library\n\n- version 10.24.1 \n\n`
  LlmsMarkdownContent += `- Instructure UI (InstUI) is a comprehensive React component library.\n\n`

  // Add main Documentation section
  LlmsMarkdownContent += `## Documentation\n\n`

  // Add User Guides section
  LlmsMarkdownContent += `### User Guides\n`

  Object.entries(sections as Record<string, SectionData>).forEach(
    ([sectionKey, sectionData]) => {
      const sectionTitle = sectionData.title || sectionKey

      // Only process these specific sections
      if (!['Getting Started', 'Guides', 'Patterns'].includes(sectionTitle)) {
        return
      }

      LlmsMarkdownContent += `#### ${sectionTitle}\n\n`

      if (sectionData.docs && sectionData.docs.length > 0) {
        const uniqueDocs = [...new Set(sectionData.docs)]
        uniqueDocs.forEach((doc) => {
          // Skip unnecessary documents
          if (
            doc === 'CODE_OF_CONDUCT' ||
            doc === 'LICENSE' ||
            doc.includes('upgrade-guide')
          ) {
            return
          }
          const displayName = doc
            .replace(/([A-Z])/g, ' $1')
            .replace(/-/g, ' ')
            .trim()
            .toLowerCase()
            .replace(/^\w/, (char) => char.toUpperCase())

          const summary = summaries[doc]
          LlmsMarkdownContent += `- [${displayName}](${baseUrl}${doc}.md)${
            summary ? `: ${summary}` : ''
          }\n`
        })
      }
      LlmsMarkdownContent += '\n'
    }
  )

  // Add Components section under Documentation
  LlmsMarkdownContent += `### Components\n\n`

  const componentsSection = sections['components'] as SectionData | undefined
  if (componentsSection) {
    const allComponents = [...new Set(componentsSection.docs || [])]
    allComponents.forEach((component) => {
      const summary = summaries[component]
      LlmsMarkdownContent += `- [${component}](${baseUrl}${component}.md)${
        summary ? `: ${summary}` : ''
      }\n`
    })
  }

  // Process component subsections like Components/AI Components and Components/Utilities, skip deprecated
  if (componentsSection?.sections && componentsSection.sections.length > 0) {
    const subsections = componentsSection.sections
    subsections.forEach((subsectionPath: string) => {
      if (subsectionPath.toLowerCase().includes('deprecated')) return

      const subsection = sections[subsectionPath] as SectionData | undefined
      if (subsection && subsection.docs && subsection.docs.length > 0) {
        const subsectionTitle = subsection.title
        LlmsMarkdownContent += `\n#### ${subsectionTitle}\n\n`
        // Avoid duplicates
        const uniqueSubDocs = [...new Set(subsection.docs)]
        uniqueSubDocs.forEach((doc) => {
          const summary = summaries[doc]
          LlmsMarkdownContent += `- [${doc}](${baseUrl}${doc}.md)${
            summary ? `: ${summary}` : ''
          }\n`
        })
      }
    })
  }

  if (outputFilePath) {
    writeFileSync(outputFilePath, LlmsMarkdownContent)
  }

  return LlmsMarkdownContent
}

export { generateAIAccessibleLlmsFile }
