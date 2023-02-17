#! /usr/bin/env node
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils = require('util');
const { exec } = require('child_process');
const execute = utils.promisify(exec);
const inquirer = require('inquirer');
const options = require('../Options');
const mainInstaller_1 = __importDefault(require("./mainInstaller"));
const Features_1 = __importDefault(require("./Features"));
const Scaffolding_1 = __importDefault(require("./Scaffolding"));
inquirer.registerPrompt('suggest', require('inquirer-prompt-suggest'));
let questions = [...mainInstaller_1.default];
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    for (const question of questions) {
        const val = yield inquirer.prompt(question);
        yield question.action(val[question.name]);
    }
    yield (0, Features_1.default)();
    yield (0, Scaffolding_1.default)();
});
exports.default = run;
//# sourceMappingURL=index.js.map