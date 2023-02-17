"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputCommand = exports.streamCommandOutput = void 0;
const { exec, spawnSync } = require('child_process');
const options = require('../Options');
const streamCommandOutput = (command) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        if (options.getOption('installed')) {
            command = `cd ${options.getOption('name')} && ${command}`;
        }
        const commandExec = spawnSync(command, {
            stdio: 'inherit',
            stdin: 'inherit',
            shell: true
        });
        if (commandExec.status === 0) {
            resolve();
        }
        else {
            reject();
        }
    });
});
exports.streamCommandOutput = streamCommandOutput;
const inputCommand = (command) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        if (options.getOption('installed')) {
            command = `cd ${options.getOption('name')} && ${command}`;
        }
        const commandExec = spawnSync(command, {
            stdio: 'inherit',
            stdin: 'inherit',
            shell: true
        });
        if (commandExec.status === 0) {
            resolve();
        }
        else {
            reject();
        }
    });
});
exports.inputCommand = inputCommand;
//# sourceMappingURL=Exec.js.map