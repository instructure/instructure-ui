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

// import path from 'path'
// import { runCommandsConcurrently, getCommand } from '../utils/command'
import { transformFileSync } from '@babel/core'

// const specifyCJSFormat = path.resolve(
//   __dirname,
//   '../../',
//   'bin/',
//   'specify-commonjs-format.js'
// )
// const { default: b } = require('@babel/cli/lib/babel/dir');

type ModuleType = ('es' | 'cjs')[]


// async function transform(sourcePath: string, outputDir: string) {
//   await b({
//     cliOptions: {
//       filenames: [sourcePath],
//       extensions: ['.tsx', '.js'],
//       outDir: outputDir,
//       copyFiles: true,
//       copyIgnored: true,
//     },
//   });
// }

export const babel = async () => {
  const {
    BABEL_ENV,
    NODE_ENV,
    DEBUG,
    UNMANGLED_CLASS_NAMES,
    DISABLE_SPEEDY_STYLESHEET,
    OMIT_INSTUI_DEPRECATION_WARNINGS
  } = process.env

  const args = process.argv.slice(2)

  // positional: ui-build src --watch
  const firstArg = args[0]
  const src = firstArg && firstArg.indexOf('--') < 0 ? firstArg : 'src'

  // uncomment the extensions arg after renaming the files from js -> ts happens
  let babelArgs = ['--extensions', '.ts,.tsx,.js,.jsx']
  const bArgs = {
    cwd: `${process.cwd()}/${src}`,
    ignore: ["src/**/*.test.js", "src/**/__tests__/**"],
    extensions: ['.ts,.tsx,.js,.jsx']
  }

  if (args.includes('--copy-files')) {
    babelArgs.push('--copy-files')
  }

  babelArgs = babelArgs.concat([
    src,
    '--ignore "src/**/*.test.js","src/**/__tests__/**"'
  ])

  let envVars = [
    OMIT_INSTUI_DEPRECATION_WARNINGS
      ? `OMIT_INSTUI_DEPRECATION_WARNINGS=1`
      : false
  ]

  if (args.includes('--watch')) {
    envVars = envVars.concat(['NODE_ENV=development']).filter(Boolean)
    babelArgs.push('--watch')
  } else {
    envVars = envVars
      .concat([
        `NODE_ENV=${BABEL_ENV || NODE_ENV || 'production'}`,
        DEBUG ? `DEBUG=1` : false
      ])
      .filter(Boolean)
  }

  let modules: ModuleType = ['es']

  if (args.includes('--modules')) {
    //  eslint-disable-next-line no-unused-vars
    const [_, arg] = args.splice(args.indexOf('--modules'), 2)

    if (!arg) {
      throw new Error('Missing --modules argument')
    }

    modules = arg.split(',') as ModuleType

    if (modules.some((mod) => !['es', 'cjs'].includes(mod))) {
      throw new Error(`Invalid --modules argument: '${arg}'`)
    }
  }

  // TODO: rework this:
  // this currently does the following:
  //  - it will check wheter the given string to `getCommand` is in fact an executable binary
  //  - if it is then, it will store the path to the binary in the `Command` class
  //  - the `command-utils` exposes a couple of utility functions to run these commands (as async, or in concurrent mode)
  //  - the `command-utils` will spawn sub processes and will call cli programs to do the work (such as babel)
  //  - this is problematic, because I can give `getCommand` any kind of program, and if that program is in PATH
  //  (which it will be by default if you install it to the monorepo) and it will get that binary
  //  no matter which package installed it
  //
  // As opposed yarn classic, yarn modern does not allow using dependencies which are not declared in the pacakge.
  // So we have to rework this script to only contain programs that are listed as dependencies, which means we should be
  // using @babel/core programatically here, instead of calling it with a new sub process and using the @babel/cli.
  // ----------------------------------- //
  // const commands = {
  //   es: getCommand(
  //     'babel',
  //     [...babelArgs, '--out-dir', 'es'],
  //     [...envVars, 'ES_MODULES=1']
  //   ),
  //   cjs: [
  //     getCommand(
  //       'babel',
  //       [...babelArgs, '--out-dir', 'lib'],
  //       [...envVars, 'TRANSFORM_IMPORTS=1']
  //     ),
  //     getCommand(specifyCJSFormat, [], [])
  //   ]
  // }

  // const commandsToRun = modules.reduce(
  //   //@ts-expect-error FIXME:
  //   (obj, key) => ({ ...obj, [key]: commands[key] }),
  //   {}
  // )

  // process.exit(runCommandsConcurrently(commandsToRun).status)
  // --------------------------------------------------------- //
  console.log({ args, bArgs, cwd: process.cwd() })
  // await transform(bArgs.cwd, "hello")
  const res = transformFileSync(`${bArgs.cwd}/console.ts`)

  console.log(res);

}
