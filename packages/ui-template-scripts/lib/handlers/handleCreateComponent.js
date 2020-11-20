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

const path = require('path')
const yargsInteractive = require('yargs-interactive')

const Project = require('@lerna/project')

const handleCreatePackage = require('./handleCreatePackage')
const handleCreateFromTemplate = require('./handleCreateFromTemplate')
const promptContentName = require('../utils/promptContentName')

module.exports = async (args) => {
  const { path: sourcePath, packageSource, name } = args

  const project = new Project(sourcePath)
  const packages = await project.getPackages()

  const componentName = await promptContentName({
    name,
    contentType: 'component',
    formatInstructions: ' (in PascalCase, e.g. NumberInput)'
  })

  promptChooseHowToCreateComponent({
    ...args,
    packages,
    packageSource: packageSource || 'src',
    name: componentName,
    version: project.version
  })
}

const promptChooseHowToCreateComponent = async (args) => {
  const { packages, packageTemplate } = args

  const createInExistingPackage = 'Create this component in an existing package'
  const createNewPackage = 'Create a new package for this component'
  const createNewComponent = 'Create this component without a package'

  let choices = [createNewComponent]

  if (packageTemplate) {
    choices = [createNewPackage, ...choices]
  }

  if (packages.length > 0) {
    choices = [createInExistingPackage, ...choices]
  }

  if (choices.length > 1) {
    const { createPackage } = await yargsInteractive().interactive({
      interactive: { default: true },
      createPackage: {
        type: 'list',
        describe: 'How would you like to create this component?',
        choices
      }
    })

    if (createPackage === createInExistingPackage) {
      promptSelectPackage(args)
    } else if (createPackage === createNewPackage) {
      promptCreateNewPackage(args)
    } else if (createPackage === createNewComponent) {
      createComponent(args)
    }
  } else {
    createComponent(args)
  }
}

const promptSelectPackage = async (args) => {
  const { packageSource, packages } = args

  const back = 'Return to main menu'
  const { selectedPackage } = await yargsInteractive().interactive({
    interactive: { default: true },
    selectedPackage: {
      type: 'list',
      describe: 'Choose a package where the component will be created:',
      choices: [...packages.map(({ name }) => name), back]
    }
  })

  if (selectedPackage === back) {
    promptChooseHowToCreateComponent(args)
  } else {
    const pkg = packages.find(({ name }) => name === selectedPackage)
    createComponent({ ...args, path: path.join(pkg.location, packageSource) })
  }
}

const promptCreateNewPackage = async (args) => {
  const { name } = args

  // Convert component name to hyphen case for suggested package name
  const generatedPackageName = `ui-${name.replace(
    /[A-Z]/g,
    (s, i) => `${i > 0 ? '-' : ''}${s.toLowerCase()}`
  )}`

  const { inputPackageName } = await yargsInteractive().interactive({
    interactive: { default: true },
    inputPackageName: {
      type: 'input',
      describe: `Type the name of the package (or press enter to use '${generatedPackageName}'):`
    }
  })

  const packageName = inputPackageName || generatedPackageName

  createPackage({ ...args, packageName })
}

const createPackage = (args) => {
  const {
    packageTemplate,
    packageName,
    path: sourcePath,
    name,
    values,
    version
  } = args

  handleCreatePackage({
    name: packageName,
    template: packageTemplate,
    path: sourcePath,
    values: generateValues({ values, name, packageName, version })
  })
}

const createComponent = (args) => {
  const { name, componentTemplate, path: sourcePath, values, version } = args

  handleCreateFromTemplate({
    name,
    template: componentTemplate,
    path: sourcePath,
    values: generateValues({ values, name, version })
  })
}

const generateValues = ({ values, name, packageName, version }) =>
  typeof values === 'function' ? values({ name, packageName, version }) : values
