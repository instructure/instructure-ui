#!/usr/bin/env node

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

/* eslint-disable no-unused-expressions */

import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import codemod from './commands/codemod.js'
import create from './commands/create.js'
import createComponent from './commands/create-component.js'
import createFromTemplate from './commands/create-from-template.js'
import createPackage from './commands/create-package.js'
import upgrade from './commands/upgrade.js'
import upgradePackages from './commands/upgrade-packages.js'
import version from './commands/version.js'

yargs(hideBin(process.argv)).command([
  codemod,
  create,
  createComponent,
  createFromTemplate,
  createPackage,
  upgrade,
  upgradePackages,
  version
]).argv
/* eslint-enable no-unused-expressions */
