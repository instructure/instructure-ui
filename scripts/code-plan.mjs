#!/usr/bin/env node
/* eslint-disable no-console, notice/notice */

import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'
import readline from 'readline'
import os from 'os'
import crypto from 'crypto'
import { GoogleGenAI } from '@google/genai'

// ==============================================================================
//  Configuration
// ==============================================================================

const defaultConfig = {
  model: 'gemini-2.5-flash',
  outputDir: '.code-plan/conversations',
  licenseHeaderRegex: null,
  extensions: ['.js', '.jsx', '.ts', '.tsx'],
  aliases: {},
}
let config

// ==============================================================================
//  UI Utilities
// ==============================================================================

const spinner = {
  frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'],
  interval: 80,
  timer: null,
  start(message = 'Loading...') {
    // Hide cursor
    process.stdout.write('\x1B[?25l')
    let i = 0
    this.timer = setInterval(() => {
      const frame = this.frames[i = ++i % this.frames.length]
      process.stdout.write(`\r${frame} ${message}`)
    }, this.interval)
  },
  stop() {
    clearInterval(this.timer)
    // Clear the line and move cursor to the beginning
    process.stdout.clearLine(0)
    process.stdout.cursorTo(0)
    // Show cursor
    process.stdout.write('\x1B[?25h')
  }
}

// ==============================================================================
//  API Integrations (Jira & Gemini)
// ==============================================================================

/**
 * A simple recursive function to extract plain text from Jira's Atlassian Document Format (ADF).
 * @param {object} node - An ADF node.
 * @returns {string} The extracted plain text.
 */
function extractTextFromADF(node) {
  if (node && node.type === 'text') {
    return node.text
  }
  if (node && node.content && Array.isArray(node.content)) {
    return node.content.map(extractTextFromADF).join('')
  }
  return ''
}

/**
 * Fetches the summary and description of a Jira ticket using the built-in fetch API.
 * @param {string} ticketId - The Jira ticket ID (e.g., "PROJ-123").
 * @returns {Promise<string>} A formatted string of the ticket's details.
 */
async function fetchJiraTicket(ticketId) {
  const { JIRA_HOST, JIRA_USER_EMAIL, JIRA_API_TOKEN } = process.env
  if (!JIRA_HOST || !JIRA_USER_EMAIL || !JIRA_API_TOKEN) {
    throw new Error("Jira environment variables (JIRA_HOST, JIRA_USER_EMAIL, JIRA_API_TOKEN) are not set in your .env file.")
  }

  const url = `https://${JIRA_HOST}/rest/api/3/issue/${ticketId}`
  const authToken = Buffer.from(`${JIRA_USER_EMAIL}:${JIRA_API_TOKEN}`).toString('base64')

  spinner.start(`Fetching details for Jira ticket: ${ticketId}...`)
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${authToken}`,
        'Accept': 'application/json',
      },
    })

    if (!response.ok) {
      let errorMessage = `Failed to fetch Jira ticket ${ticketId}. Status: ${response.status}`
      if (response.status === 401) errorMessage += ' Check your Jira credentials.'
      if (response.status === 404) errorMessage += ' Ticket not found.'
      throw new Error(errorMessage)
    }

    const data = await response.json()
    const summary = data.fields.summary
    const descriptionObject = data.fields.description
    const description = descriptionObject ? extractTextFromADF(descriptionObject) : "No description found."

    return `Ticket ${ticketId}: ${summary}\n\nDescription:\n${description}`
  } catch (error) {
    logError(`Error during Jira fetch for ${ticketId}.`, error)
    process.exit(1)
  } finally {
    spinner.stop()
  }
}


// ==============================================================================
//  Interactive Mode & FZF Integration
// ==============================================================================

function isFzfAvailable() {
  try {
    execSync('command -v fzf', { stdio: 'ignore' })
    return true
  } catch {
    return false
  }
}

function runFzf() {
  const tmpFile = path.join(os.tmpdir(), `fzf-result-${crypto.randomBytes(16).toString('hex')}`)
  try {
    const findCommand = `{(command -v fd >/dev/null && fd --type f --hidden --exclude .git --extension ts --extension tsx --extension js --extension jsx .) || (find . -path "*/node_modules" -prune -o -path "*/.git" -prune -o -type f \\( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" \\) -print);}`
    const fzfCommand = `${findCommand} | fzf --reverse --no-mouse > ${tmpFile}`
    execSync(fzfCommand, { stdio: 'inherit' })
    return fs.readFileSync(tmpFile, 'utf-8').trim()
  } catch {
    return ''
  } finally {
    if (fs.existsSync(tmpFile)) {
      fs.unlinkSync(tmpFile)
    }
  }
}

function promptUser(query) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
  return new Promise(resolve => rl.question(query, answer => {
    rl.close()
    resolve(answer)
  }))
}

async function runInteractiveMode(isDryRun) {
  console.log("Running in interactive mode...")
  let entryPoint = ''

  if (isFzfAvailable()) {
    console.log("FZF detected. Launching file finder...")
    entryPoint = runFzf()
  }

  if (!entryPoint) {
    entryPoint = await promptUser("Enter the path to the entry file: ")
  }

  console.log(`> Using file: ${entryPoint}`)

  if (!entryPoint) {
    logError("File path cannot be empty.")
    process.exit(1)
  }

  const issueIdentifier = await promptUser("Enter the issue description or a Jira ticket ID (e.g., PROJ-123): ")
  if (!issueIdentifier) {
    logError("Input cannot be empty.")
    process.exit(1)
  }

  const jiraTicketRegex = /^[A-Z][A-Z0-9]+-\d+$/i
  let issueDescription
  if (jiraTicketRegex.test(issueIdentifier)) {
    issueDescription = await fetchJiraTicket(issueIdentifier)
  } else {
    issueDescription = issueIdentifier
  }

  await runAnalysis(entryPoint, issueDescription, isDryRun)
}


// ==============================================================================
//  Core Script Logic (Saving, API calls, Parsing, etc.)
// ==============================================================================

function generateTitleFromIssue(issueDescription) {
  return issueDescription.toLowerCase().replace(/[^\w\s-]/g, '').trim().split(/\s+/).slice(0, 7).join('_').replace(/_$/, '')
}

function saveConversation(issueDescription, fullPrompt, geminiResponse) {
  const timestamp = new Date().toISOString().replace(/:/g, '-').replace(/\..+/, '')

  const getTagContent = (tag, isFinalTag = false) => {
    if (isFinalTag) {
      const startIndex = geminiResponse.indexOf(`<${tag}>`)
      if (startIndex === -1) return null

      const openingTag = `<${tag}>`
      const closingTag = `</${tag}>`

      let content = geminiResponse.substring(startIndex + openingTag.length)

      if (content.trim().endsWith(closingTag)) {
        const closingIndex = content.lastIndexOf(closingTag)
        content = content.substring(0, closingIndex)
      }
      return content.trim()
    }
    const regex = new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`, 'i')
    const match = geminiResponse.match(regex)
    return match ? match[1].trim() : null
  }

  const title = getTagContent('TITLE') || generateTitleFromIssue(issueDescription)
  const outputBaseDir = path.resolve(process.cwd(), config.outputDir)
  const sessionDir = path.join(outputBaseDir, `${timestamp}-${title}`)
  fs.mkdirSync(sessionDir, { recursive: true })

  fs.writeFileSync(path.join(sessionDir, 'request.txt'), fullPrompt)

  const explanationContent = getTagContent('EXPLANATION') || "No explanation was generated."
  const planContent = getTagContent('PLAN', true) || "No plan was generated or found."

  const combinedPlan = `## Explanation\n\n${explanationContent}\n\n---\n\n## Plan\n\n${planContent}`
  fs.writeFileSync(path.join(sessionDir, 'plan.md'), combinedPlan)

  return sessionDir
}

async function sendToGemini(prompt) {
  try {
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) throw new Error("GEMINI_API_KEY not found. Ensure it is set in your .env file.")
    const ai = new GoogleGenAI({ apiKey })
    const response = await ai.models.generateContent({
      model: config.model,
      contents: prompt,
    })
    return response.text
  } catch (error) {
    logError("Failed to get response from Gemini API.", error)
    process.exit(1)
  }
}

function logError(message, error = null) {
  console.error(`\nError: ${message}`)
  if (error && error.stack) console.error(error.stack)
  console.error()
}

function cleanCodeForLLM(code) {
  return code.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*/g, '').replace(/^\s*[\r\n]/gm, '').trim()
}

function formatFileForLLM(relativePath, content) {
  const header = `// ===== FILE: ${relativePath} =====`
  const cleanedCode = cleanCodeForLLM(content)
  return `${header}\n${cleanedCode}`
}

function removeLicenseHeader(content) {
  if (!config.licenseHeaderRegex) {
    return content
  }
  return content.replace(config.licenseHeaderRegex, '')
}

function parseImports(content) {
  const importPattern = /(?:import|export)(?:\s+.*?\s+from)?\s+['"]([^'"]+)['"]|import\s*\(['"]([^'"]+)['"]\)/g
  return Array.from(content.matchAll(importPattern), match => match[1] || match[2])
}

function _findFileWithExtension(basePath) {
  try {
    if (fs.statSync(basePath).isFile()) return basePath
  } catch { /* Path is not a file, continue */ }
  for (const ext of config.extensions) {
    const fullPath = `${basePath}${ext}`
    try {
      if (fs.statSync(fullPath).isFile()) return fullPath
    } catch { /* Path is not a file, continue */ }
  }
  try {
    if (fs.statSync(basePath).isDirectory()) {
      for (const ext of config.extensions) {
        let indexPath = path.join(basePath, `index${ext}`)
        if (fs.existsSync(indexPath) && fs.statSync(indexPath).isFile()) return indexPath
        indexPath = path.join(basePath, 'src', `index${ext}`)
        if (fs.existsSync(indexPath) && fs.statSync(indexPath).isFile()) return indexPath
      }
    }
  } catch { /* Path is not a directory, continue */ }
  return null
}

function resolvePath(importPath, sourceDir, projectRoot, aliases) {
  for (const [alias, aliasPath] of Object.entries(aliases)) {
    if (importPath.startsWith(alias)) {
      const relativePart = importPath.substring(alias.length)
      const candidatePath = path.join(projectRoot, aliasPath, relativePart)
      const resolved = _findFileWithExtension(candidatePath)
      if (resolved) return path.resolve(resolved)
    }
  }
  if (importPath.startsWith('./') || importPath.startsWith('../')) {
    const candidatePath = path.resolve(sourceDir, importPath)
    const resolved = _findFileWithExtension(candidatePath)
    if (resolved) return path.resolve(resolved)
  }
  return null
}

/**
 * Finds and reads README.md files associated with the traced source files.
 * @param {Array<object>} sourceFiles - The array of {path, content} objects for source files.
 * @param {string} projectRoot - The absolute path to the project root.
 * @returns {Array<object>} An array of {path, content} objects for documentation files.
 */
function collectAssociatedDocs(sourceFiles, projectRoot) {
  const docFiles = []
  const checkedDirs = new Set()

  for (const file of sourceFiles) {
    const dir = path.dirname(file.path)
    if (checkedDirs.has(dir)) {
      continue
    }
    checkedDirs.add(dir)

    const docPath = path.join(dir, 'README.md')
    try {
      const fullDocPath = path.join(projectRoot, docPath)
      if (fs.existsSync(fullDocPath)) {
        const content = fs.readFileSync(fullDocPath, 'utf-8')
        docFiles.push({ path: docPath, content })
      }
    } catch { /* Ignore errors for directories that might not be readable */ }
  }
  return docFiles
}

function collectAllSourceFiles(entryPoint, aliases) {
  const projectRoot = process.cwd()
  let entryPath
  try {
    const resolvedEntryPoint = path.resolve(projectRoot, entryPoint)
    entryPath = _findFileWithExtension(resolvedEntryPoint)
    if (!entryPath) throw new Error(`Entry point not found or could not be resolved: ${resolvedEntryPoint}`)
  } catch (e) {
    logError(`Failed to resolve the entry point.`, e)
    return []
  }
  const queue = [entryPath]
  const visited = new Set()
  const allFiles = []
  while (queue.length > 0) {
    const currentPath = queue.shift()
    if (visited.has(currentPath)) continue
    visited.add(currentPath)
    try {
      const content = fs.readFileSync(currentPath, 'utf-8')
      allFiles.push({ path: path.relative(projectRoot, currentPath), content: content })
      const rawImports = parseImports(content)
      const sourceDir = path.dirname(currentPath)
      for (const importPath of rawImports) {
        const resolvedPath = resolvePath(importPath, sourceDir, projectRoot, aliases)
        if (resolvedPath && !visited.has(resolvedPath)) queue.push(resolvedPath)
      }
    } catch (e) {
      logError(`Could not process file '${path.relative(projectRoot, currentPath)}'.`, e)
    }
  }
  return allFiles
}

async function runAnalysis(entryPoint, issueDescription, isDryRun = false) {
  console.log(`\nStarting analysis from entry point: '${entryPoint}'`)
  console.log("-".repeat(40))

  console.log('Collecting source files and documentation...')
  const sourceFiles = collectAllSourceFiles(entryPoint, config.aliases)
  const docFiles = collectAssociatedDocs(sourceFiles, process.cwd())
  console.log(`Found ${sourceFiles.length} source file(s) and ${docFiles.length} documentation file(s).`)

  if (sourceFiles.length > 0) {
    const outputParts = []
    const mainPrompt = `Here is the problem description:\n"${issueDescription}"\n\nPlease analyze the following documentation and source code. When referencing files, use full paths from the repository root (e.g., 'packages/ui-buttons/src/Button/index.tsx'). Structure your response in three parts, enclosed in XML-like tags: First, provide a short, underscore_separated, descriptive title for this session (less than 100 characters) inside <TITLE> tags. Second, a detailed explanation of the issue inside <EXPLANATION> tags. Third, the actionable implementation plan inside <PLAN> tags.`
    outputParts.push(mainPrompt)

    if (docFiles.length > 0) {
      outputParts.push('\n--- RELEVANT DOCUMENTATION ---\n')
      docFiles.forEach(doc => {
        const header = `// ===== DOCUMENTATION: ${doc.path} =====`
        outputParts.push(`${header}\n\n${doc.content}`)
      })
    }

    outputParts.push('\n--- RELEVANT SOURCE CODE ---\n')
    sourceFiles.forEach(fileData => {
      const fileContent = removeLicenseHeader(fileData.content)
      const formattedFile = formatFileForLLM(fileData.path, fileContent)
      outputParts.push(formattedFile)
    })

    const fullPrompt = outputParts.join('\n\n')

    if (isDryRun) {
      console.log('\n\n--- DRY RUN MODE ---')
      console.log(`\nCollected ${sourceFiles.length} source file(s) and ${docFiles.length} documentation file(s).`)
      console.log('The following prompt would be sent to the Gemini API:\n')
      console.log('-'.repeat(80))
      console.log(fullPrompt)
      console.log('-'.repeat(80))
      console.log('\nDry run complete. Exiting without making an API call.')
      return
    }

    spinner.start(`Context generated. Sending to Gemini model: ${config.model}...`)
    let geminiResponse
    try {
      geminiResponse = await sendToGemini(fullPrompt)
    } finally {
      spinner.stop()
    }
    console.log('\n\nGemini Response:\n' + '-'.repeat(40))
    console.log(geminiResponse)
    console.log('-'.repeat(40))
    const sessionPath = saveConversation(issueDescription, fullPrompt, geminiResponse)
    console.log(`\nConversation saved to: ${path.relative(process.cwd(), sessionPath)}`)
  }
}

function displayUsage() {
  console.log(`
Usage: code-plan [options]

  AI-powered planning script to analyze codebases and generate implementation plans based on an issue description or Jira ticket.

Options:
  -e, --entry-point <path> Path to the entry file for analysis.
  -i, --issue <text>     Issue description or Jira ticket ID (e.g., "PROJ-123").
  -c, --config <path>    Specify a path to a custom configuration file.
                         (Default: ./code-plan.config.mjs)
  --dry-run              Prepare the prompt and print it to the console without
                         calling the Gemini API.
  -h, --help             Display this usage information.

Examples:
  code-plan                                           # Run in interactive mode
  code-plan -e src/index.js -i "fix login button"   # Run with direct inputs
  code-plan -e src/index.js -i PROJ-1234            # Run with a Jira ticket
  code-plan --dry-run -e src/index.js -i "fix login"  # Perform a dry run
  code-plan -c ./custom.config.js                   # Run in interactive mode with a custom config
`)
}

async function start() {
  let args = process.argv.slice(2)

  if (args.includes('--help') || args.includes('-h') || args.length === 0) {
    displayUsage()
    process.exit(0)
  }

  const dryRunIndex = args.indexOf('--dry-run')
  const isDryRun = dryRunIndex > -1
  if (isDryRun) {
    args.splice(dryRunIndex, 1)
  }

  const configIndex = args.findIndex(arg => arg === '--config' || arg === '-c')
  let configPath = './code-plan.config.mjs'
  let userConfig = {}

  const loadUserConfig = async (filePath, isExplicit) => {
    try {
      const resolvedPath = path.resolve(process.cwd(), filePath)
      const configModule = await import(resolvedPath)
      return configModule.config || {}
    } catch (err) {
      if (isExplicit) {
        logError(`Failed to load configuration file: ${filePath}`, err)
        process.exit(1)
      } else if (err.code !== 'ERR_MODULE_NOT_FOUND') {
        logError(`Error loading default configuration from ${filePath}`, err)
        process.exit(1)
      }
      return {}
    }
  }

  if (configIndex > -1) {
    const providedPath = args[configIndex + 1]
    if (!providedPath || providedPath.startsWith('-')) {
      logError('Error: --config flag requires a value.')
      process.exit(1)
    }
    configPath = providedPath
    args.splice(configIndex, 2)
    userConfig = await loadUserConfig(configPath, true)
  } else {
    userConfig = await loadUserConfig(configPath, false)
  }

  config = { ...defaultConfig, ...userConfig }

  let entryPoint = null
  const entryPointIndex = args.findIndex(arg => arg === '--entry-point' || arg === '-e')
  if (entryPointIndex > -1) {
    const providedPath = args[entryPointIndex + 1]
    if (!providedPath || providedPath.startsWith('-')) {
      logError('Error: --entry-point flag requires a value.')
      process.exit(1)
    }
    entryPoint = providedPath
    args.splice(entryPointIndex, 2)
  }

  let issueIdentifier = null
  const issueIdentifierIndex = args.findIndex(arg => arg === '--issue' || arg === '-i')
  if (issueIdentifierIndex > -1) {
    const providedIssue = args[issueIdentifierIndex + 1]
    if (!providedIssue || providedIssue.startsWith('-')) {
      logError('Error: --issue flag requires a value.')
      process.exit(1)
    }
    issueIdentifier = providedIssue
    args.splice(issueIdentifierIndex, 2)
  }

  if (args.length > 0) {
    logError(`Unknown arguments: ${args.join(' ')}`)
    displayUsage()
    process.exit(1)
  }

  if ((entryPoint && !issueIdentifier) || (!entryPoint && issueIdentifier)) {
    logError('Error: Both --entry-point and --issue must be provided together.')
    displayUsage()
    process.exit(1)
  }

  if (entryPoint && issueIdentifier) {
    const jiraTicketRegex = /^[A-Z][A-Z0-9]+-\d+$/i
    let issueDescription

    if (jiraTicketRegex.test(issueIdentifier)) {
      issueDescription = await fetchJiraTicket(issueIdentifier)
    } else {
      issueDescription = issueIdentifier
    }
    await runAnalysis(entryPoint, issueDescription, isDryRun)
  } else {
    await runInteractiveMode(isDryRun)
  }
}

start()
