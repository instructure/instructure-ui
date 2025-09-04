import { writeFileSync, readFileSync } from 'fs'

interface SectionData {
  docs?: string[]
  sections?: string[]
  title?: string
}

function generateDocsMarkdown(
  filePath: string,
  summariesFilePath?: string,
  baseUrl?: string
  
): string {
  const fileContent = readFileSync(filePath, 'utf-8')
  const jsonData = JSON.parse(fileContent)
  const { sections } = jsonData

  let summaries: Record<string, string> = {}
  // Generate summaries object form the summaries file for later lookup
  if (summariesFilePath) {
    try {
      const fileContent = readFileSync(summariesFilePath, 'utf-8')
      const data = JSON.parse(fileContent)

      data.forEach((item: { title: string; summary?: string }) => {
        summaries[item.title] = item.summary || ''
      })
    } catch (error) {
      console.warn('Could not load summaries file:', error)
    }
  }

  let markdownContent = `# Instructure UI (InstUI) - React Component Library\n\n - version 10.24.1 \n\n `
  markdownContent += `- Instructure UI (InstUI) is a comprehensive React component library.\n\n`

  // Main Documentation section
  markdownContent += `## Documentation\n\n`

  // Add User Guides wrapper
  markdownContent += `### User Guides\n`

  Object.entries(sections as Record<string, SectionData>).forEach(
    ([sectionKey, sectionData]) => {
      const sectionTitle = sectionData.title || sectionKey

      // Only process these specific sections
      if (!['Getting Started', 'Guides', 'Patterns'].includes(sectionTitle)) {
        return
      }

      markdownContent += `#### ${sectionTitle}\n\n`

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
          .replace(/([A-Z])/g, ' $1') // Add space before each capital letter first
          .replace(/-/g, ' ') // Then replace hyphens with spaces
          .trim() // Remove any leading/trailing spaces
          .toLowerCase() // Convert everything to lowercase
          .replace(/^\w/, (char) => char.toUpperCase())  // Capitalize only the first letter

          const summary = summaries[doc]
          markdownContent += `- [${displayName}](${baseUrl}${doc}.md)${
            summary ? `: ${summary}` : ''
          }\n`
        })
      }
      markdownContent += '\n'
    }
  )

  // Add Components section (sibling of User Guides)
  markdownContent += `### Components\n\n`

  const componentsSection = sections['components'] as SectionData | undefined
  if (componentsSection) {
    const allComponents = [...new Set(componentsSection.docs || [])]
    allComponents.forEach((component) => {
      const summary = summaries[component]
      markdownContent += `- [${component}](${baseUrl}${component}.md)${
        summary ? `: ${summary}` : ''
      }\n`
    })
  }

  // Process component subsections like AI Components and utilities, skip deprecated
  if (componentsSection?.sections && componentsSection.sections.length > 0) {
    const subsections = componentsSection.sections
    subsections.forEach((subsectionPath: string) => {
      if (subsectionPath.toLowerCase().includes('deprecated')) return

      const subsection = sections[subsectionPath] as SectionData | undefined
      if (subsection && subsection.docs && subsection.docs.length > 0) {
        const subsectionTitle = subsection.title
        markdownContent += `\n#### ${subsectionTitle}\n\n`
        // Avoid duplicates
        const uniqueSubDocs = [...new Set(subsection.docs)]
        uniqueSubDocs.forEach((doc) => {
          const summary = summaries[doc]
          markdownContent += `- [${doc}](${baseUrl}${doc}.md)${
            summary ? `: ${summary}` : ''
          }\n`
        })
      }
    })
  }

  return markdownContent
}

function generateLLMS(
  inputFilePath: string,
  outputFilePath: string,
  baseUrl: string,
  summariesFilePath?: string
  
) {
  const markdownContent = generateDocsMarkdown(inputFilePath, summariesFilePath, baseUrl)
  writeFileSync(outputFilePath, markdownContent)
}

export { generateLLMS }
