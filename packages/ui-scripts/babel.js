"use strict";
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

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.babel = void 0;
const path_1 = __importDefault(require("path"));
const command_1 = require("../utils/command");
const specifyCJSFormat = path_1.default.resolve(__dirname, '../../', 'bin/', 'specify-commonjs-format.js');
    const { BABEL_ENV, NODE_ENV, DEBUG, UNMANGLED_CLASS_NAMES, DISABLE_SPEEDY_STYLESHEET, OMIT_INSTUI_DEPRECATION_WARNINGS } = process.env;
    const args = process.argv.slice(2);
    // console.log({child_proc: process})
    // positional: ui-build src --watch
    const firstArg = args[0];
    const src = firstArg && firstArg.indexOf('--') < 0 ? firstArg : 'src';
    // uncomment the extensions arg after renaming the files from js -> ts happens
    let babelArgs = ['--extensions', '.ts,.tsx,.js,.jsx'];
    if (args.includes('--copy-files')) {
        babelArgs.push('--copy-files');
    }
    babelArgs = babelArgs.concat([
        src,
        '--ignore "src/**/*.test.js","src/**/__tests__/**"'
    ]);
    let envVars = [
        OMIT_INSTUI_DEPRECATION_WARNINGS
            ? `OMIT_INSTUI_DEPRECATION_WARNINGS=1`
            : false
    ];
    if (args.includes('--watch')) {
        envVars = envVars
            .concat([
            'NODE_ENV=development',
            'UNMANGLED_CLASS_NAMES=1',
            'DISABLE_SPEEDY_STYLESHEET=1'
        ])
            .filter(Boolean);
        babelArgs.push('--watch');
    }
    else {
        envVars = envVars
            .concat([
            `NODE_ENV=${BABEL_ENV || NODE_ENV || 'production'}`,
            DEBUG ? `DEBUG=1` : false,
            UNMANGLED_CLASS_NAMES ? `UNMANGLED_CLASS_NAMES=1` : false,
            DISABLE_SPEEDY_STYLESHEET ? `DISABLE_SPEEDY_STYLESHEET=1` : false
        ])
            .filter(Boolean);
    }
    let modules = ['es'];
    if (args.includes('--modules')) {
        //  eslint-disable-next-line no-unused-vars
        const [_, arg] = args.splice(args.indexOf('--modules'), 2);
        if (!arg) {
            throw new Error('Missing --modules argument');
        }
        modules = arg.split(',');
        if (modules.some((mod) => !['es', 'cjs'].includes(mod))) {
            throw new Error(`Invalid --modules argument: '${arg}'`);
        }
    }

    const b =require.resolve('@babel/cli')
    const commands = {
      es: (0, command_1.getCommand)('@babel/cli', [...babelArgs, '--out-dir', 'es'], [...envVars, 'ES_MODULES=1']),
      cjs: [
        (0, command_1.getCommand)('@babel/cli', [...babelArgs, '--out-dir', 'lib'], [...envVars, 'TRANSFORM_IMPORTS=1']),
        (0, command_1.getCommand)(specifyCJSFormat, [], [])
      ]
    };
    // console.log({commands})
    const commandsToRun = modules.reduce(
    //@ts-expect-error FIXME:
    (obj, key) => (Object.assign(Object.assign({}, obj), { [key]: commands[key] })), {});
    // console.log({commandsToRun:command_1.resolveBin("@babel/cli") })
    command_1.runCommandSync(command_1.resolveBin("@babel/core"), [...babelArgs, '--out-dir', 'es'], [...envVars, 'ES_MODULES=1'])
    // process.exit((0, command_1.runCommandsConcurrently)(commandsToRun).status);
//# sourceMappingURL=babel.js.map
