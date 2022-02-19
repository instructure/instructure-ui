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

const {createRequire} = require(`module`);

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.info = exports.warn = exports.error = exports.getCommand = exports.runCommandsConcurrently = exports.runCommandSync = exports.runCommandAsync = exports.resolveBin = exports.confirm = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const which_1 = __importDefault(require("which"));
const execa_1 = __importDefault(require("execa"));
const readline_1 = __importDefault(require("readline"));
const chalk_1 = __importDefault(require("chalk"));
function info(...args) {
    console.info(chalk_1.default.blue(...args)); // eslint-disable-line no-console
}
exports.info = info;
function warn(...args) {
    console.warn(chalk_1.default.yellow('⚠️   ', ...args));
}
exports.warn = warn;
function error(...args) {
    console.error(chalk_1.default.red('⚠️   ', ...args));
}
exports.error = error;
class Command {
    constructor(bin, args = [], vars = []) {
        Object.defineProperties(this, {
            vars: {
                value: vars
            },
            bin: {
                value: resolveBin(bin)
            },
            args: {
                value: args
            }
        });
    }
    toString() {
        return `${this.vars.length > 0 ? `${this.vars.join(' ')} ` : ''}${this.bin}`;
    }
    get bin() {
        return this.bin;
    }
    get args() {
        return this.args;
    }
    get vars() {
        return this.vars;
    }
}
function getCommand(bin, args = [], vars = []) {
    return new Command(bin, args, vars);
}
exports.getCommand = getCommand;
function runCommandsConcurrently(commands) {
    const args = [
        '--kill-others-on-fail',
        '--prefix',
        '[{name}]',
        '--names',
        Object.keys(commands).join(','),
        '--prefix-colors',
        'bgBlue.bold,bgMagenta.bold,bgGreen.bold',
        '--success',
        'all'
    ];
    Object.keys(commands).forEach((name) => {
        let commandList = commands[name];
        if (commandList) {
            commandList = Array.isArray(commandList) ? commandList : [commandList];
            commandList.forEach((command) => {
                args.push(`${command.toString()}${command.args.length > 0 ? ` ${command.args.join(' ')} ` : ''}`);
            });
        }
    });
    let result = { status: 1 };
    try {
        result = runCommandSync(`${resolveBin('concurrently')}`, args);
    }
    catch (err) {
        error(err);
    }
    return result;
}
exports.runCommandsConcurrently = runCommandsConcurrently;
function runCommandSync(bin, args = [], vars = [], opts = {}) {
    const command = getCommand(bin, args, vars);
    const result = execa_1.default.sync(command.toString(), command.args, Object.assign({ stdio: 'inherit' }, opts));
    return Object.assign(Object.assign({}, result), { status: result.exitCode });
}
exports.runCommandSync = runCommandSync;
function runCommandAsync(bin, args = [], vars = [], opts = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        const command = getCommand(bin, args, vars);
        const result = yield (0, execa_1.default)(command.toString(), command.args, Object.assign({ stdio: 'inherit' }, opts));
        return Object.assign(Object.assign({}, result), { status: result.exitCode });
    });
}
exports.runCommandAsync = runCommandAsync;
function resolveBin(modName, { executable = modName, cwd = process.cwd() } = {}) {
    let pathFromWhich;
    try {
        if (process.versions.pnp) {

            const targetReq = createRequire(__dirname)
            const pnpApi = require("pnpapi");
            pathFromWhich = pnpApi.resolveRequest(executable, __dirname)
            const nonvirt = pnpApi.resolveVirtual(pathFromWhich)
            pathFromWhich = nonvirt || pathFromWhich
            const resolved = targetReq.resolve(pathFromWhich)
            const instance = targetReq(resolved)
            console.log({instance})
            // console.log({pathFromWhich, nonvirt})
        }
        else {
            pathFromWhich = fs_1.default.realpathSync(which_1.default.sync(executable));
            }
    }
    catch (_error) {
        // ignore _error
        console.log(_error)
    }
    try {
        const modPkgPath = require.resolve(`${modName}/package.json`);
        const modPkgDir = path_1.default.dirname(modPkgPath);
        const { bin } = require(modPkgPath);
        const binPath = typeof bin === 'string' ? bin : bin[executable];
        const fullPathToBin = path_1.default.join(modPkgDir, binPath);
        if (fullPathToBin === pathFromWhich) {
            return executable;
        }
        return fullPathToBin.replace(cwd, '.');
    }
    catch (error) {
        if (pathFromWhich) {
            return pathFromWhich;
        }
        throw error;
    }
}
exports.resolveBin = resolveBin;
function confirm(question) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            try {
                const dialog = readline_1.default.createInterface({
                    input: process.stdin,
                    output: process.stdout
                });
                dialog.question(question, (reply) => {
                    dialog.close();
                    resolve(reply);
                });
            }
            catch (e) {
                reject(e);
            }
        });
    });
}
exports.confirm = confirm;
//# sourceMappingURL=command.js.map
