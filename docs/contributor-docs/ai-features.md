---
title: AI features
category: Contributor Guides
order: 8
---

## Generating AI agent friendly markdown files for components and guides

InstUI's JSON metadata is used to create a markdown version of the documentation for easier use by AI tools and coding assistants.

These markdown files are created during the build process then are made available for users using specific links.

This collection includes structured files for almost everything under the 'Getting Started', 'Guides', 'Patterns' and 'Components' (including Components/AI Components and Components/Utilities) sections of the documentation.

How it works:
The core logic resides in `packages/__docs__/buildScripts/ai-accessible-documentation/generate-ai-accessible-markdowns.mts`.

1. **Input and output**  
   Input: The script processes the JSON files found under `packages/__docs__/__build__/docs` if they belong to the corresponding sections mentioned above.  
   Output: A directory of generated .md files under `packages/__docs__/__build__/markdowns`, which are also compressed into a documentation.zip archive as well which also can be found in this directory.

2. **Data loading and classification**  
   The script reads all JSON files from the specified docs folder.
   Identifies the necessary components and guides based on having props (components) or having a `relevantForAI: true` YAML flag (guides).

3. **Markdown generation**  
   A markdown file is generated using the data found under the 'description' key. As for components, an addtional table of props and a 'Usage' section is generated for showing how to import the component.
   As for the table of props, the props of a child component (e.g. Tabs.Panel) of a parent component (e.g. Tabs) is also included in the table.

4. **Index file creation and packaging**  
   After all individual markdown files are written, index.md file is generated, which acts as a master list of contents for the entire documentation set.
   Finally, the script uses the system's zip command to package all .md files in the output directory into the final documentation.zip file, which can be downloaded here: https://instructure.design/markdowns/documentation.zip  
   The AI-friendly markdown files are now avaliable either downloading the documentation.zip file or through a link that follows this pattern: https://instructure.design/markdowns/Alert.md

## Generating llms.txt for LLMs

In addition to the markdown files, a llms.txt file is also generated. This file is specifically formatted for optimal consumption by Large Language Models (LLMs) and AI coding agents.
This file contains a catalog of links pointing to the online markdown files of InstUI components and guides generated above and short description of each component/guide

How it works:
The core logic resides in `packages/__docs__/buildScripts/ai-accessible-documentation/ggenerate-ai-accessible-llms-file.mts`.

1. **Input and output**  
   Input: The script processes the following JSON file: `packages/__docs__/__build__/markdown-and-sources-data.json`  
   Output: An llms.txt file is placed into `packages/__docs__/__build__` which can be found here: https://instructure.design/llms.txt

2. **Data loading and classification**  
   The script indenftifies the necessary elements looking for "Getting Started", "Guides", "Patterns", and "Components" section names.

3. **Markdown generation**  
   It creates a documentation structure like this:

   ```md
   ---
   type: code
   ---

   # Instructure UI (InstUI) - React Component Library

   ## Documentation

   ### User Guides

   #### Getting Started

   #### Guides

   #### Patterns

   ### Components

   #### Utilities

   #### AI components
   ```

   It generates links for the components/guides and appends a brief summary of each of them using the `packages/__docs__/buildScripts/ai-accessible-documentation/summaries-for-llms-file.json` file, searching for matching component/guide title.
