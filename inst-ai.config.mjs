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
 *//**
* inst-ai Configuration File
*
* This file allows you to customize the behavior of inst-ai.
* All settings here can be overridden by CLI flags or environment variables.
*/

export const config = {
  // AI Configuration
  ai: {
    provider: 'claude',
    models: {
      fast: 'claude-3-5-haiku-latest',         // For quick tasks: classification, extraction, parsing
      thorough: 'claude-sonnet-4-5-20250929'   // For complex tasks: generation, detailed analysis
    },
    enableMockMode: false,
    // Warn user if estimated input tokens exceed this threshold. Helps prevent
    // accidentally sending very large contexts which may be slow or expensive.
    // The default is intentionally large; tune in your inst-ai.config.js as needed.
    tokenWarningThreshold: 140000  // Conservative limit for Claude
  },

  // Jira Configuration
  jira: {
    defaultIssueType: 'Bug',
    enableDryRun: false,
    templatesDir: './.inst-ai/templates/jira',
    customTemplates: {}
  },

  // Slack Configuration
  slack: {
    enableMockMode: false,
  },

  // Code Analysis Configuration
  analysis: {
    extensions: ['.ts', '.tsx'],
    licenseHeaderRegex: /^\/\*[\s\S]*?(?:license|copyright)[\s\S]*?\*\/\s*/i,
    // Maximum depth for dependency tracing. This limits how many levels of imports
    // the FileCollector will traverse starting from an entry point. Lower values
    // help prevent overly large file collections in deep or circular dependency
    // graphs. Adjust in your `inst-ai.config.js` as needed.
    maxDependencyDepth: 4,
    aliases: {
      '@instructure/': 'packages/'
    },
    componentPatterns: [
      'packages/*/src/**/index.{ts,tsx}'
    ],
    // Folders to include in component and file searches (supports glob patterns)
    // If specified, only files within these folders will be considered
    // Example: ['src/**', 'packages/**', 'components/**']
    includeFolders: [],
    // Folders to exclude from component and file searches (supports glob patterns)
    // These patterns take precedence over includeFolders
    // Common exclusions are automatically applied (node_modules, .git, etc.)
    excludeFolders: [
      'node_modules/**',
      '.git/**',
      'dist/**',
      'build/**',
      'coverage/**',
      '.next/**',
      '.nuxt/**',
      'out/**',
      'tmp/**',
      'temp/**',
      'packages/__docs__/**',
      '*.log',
      '.env*',
      '.DS_Store'
    ],
    workingDirectory: process.cwd(),
    // Only collect README.md files by default to focus on key project documentation
    docPatterns: ['README.md']
  },

  // Plan Generation Configuration
  planning: {
    sessionDir: '.inst-ai/sessions',
    templatesDir: './.inst-ai/templates/planning'
  },

  // UI Configuration
  ui: {
    enableSpinner: true,
    enableColors: true,
    confirmBeforeCreate: true,
    interactiveSelector: 'inquirer' // 'auto', 'fzf', or 'inquirer'
  },

  // Editor Configuration
  editor: {
    // Command to open files in your editor
    // Uses $EDITOR or $VISUAL environment variables by default
    // Can be overridden with a custom command (e.g., 'code', 'vim', 'nano')
    command: process.env.EDITOR || process.env.VISUAL || 'vim',
    // Additional arguments to pass to the editor
    args: []
  }
}
