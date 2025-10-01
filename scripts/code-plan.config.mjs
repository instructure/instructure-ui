/* eslint-disable notice/notice */

export const config = {
  // --- Model Configuration ---
  // Specifies which Gemini model to use for the analysis.
  // You can find available models in the Google AI documentation.
  model: 'gemini-2.5-flash',

  // --- Output Directory ---
  // The directory where conversation logs and plans will be saved.
  // This path is relative to the project root where you run the script.
  outputDir: '.code-plan/conversations',

  // --- File Parsing & Filtering ---
  // A RegExp to identify and remove license headers from source files.
  // This helps reduce the number of tokens sent to the model.
  // Set to `null` to disable.
  // This looks for a multiline block comment that includes "license" or "copyright".
  licenseHeaderRegex: /^\/\*[\s\S]*?(?:license|copyright)[\s\S]*?\*\/\s*/i,

  // An array of file extensions the script should trace and analyze when
  // resolving imports.
  extensions: ['.js', '.jsx', '.ts', '.tsx', '.mjs', '.cjs', '.mts', '.cts'],

  // --- Path Aliases ---
  // Maps import aliases (like those in a tsconfig.json or webpack config)
  // to their actual paths relative to the project root. This is crucial
  // for correctly tracing dependencies in projects that use non-relative imports.
  aliases: {
    '@instructure/': 'packages/'
  },
}

