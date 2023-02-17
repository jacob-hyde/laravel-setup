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
const options = require('../Options');
const Exec_1 = require("../Utils/Exec");
const questions = [
    {
        name: 'name',
        type: 'input',
        message: 'What is the name of your project?',
        validate: function (value) {
            return value.length ? true : 'Please enter your project name.';
        },
        action: function (value) {
            return __awaiter(this, void 0, void 0, function* () {
                options.setOption('name', value);
            });
        }
    },
    {
        name: 'version',
        type: 'suggest',
        message: 'What Version do you want to install?',
        default: 'latest',
        suggestions: ['latest', '^10', '^9', '^8', '^7', '^6', '^5'],
        validate: function (value) {
            return parseFloat(value) || value.charAt(0) === '^' || value === 'latest'
                ? true
                : 'Please enter a valid version.';
        },
        filter: function (value) {
            return value === 'latest' ? '^10' : value;
        },
        action: function (value) {
            return __awaiter(this, void 0, void 0, function* () {
                options.setOption('version', value);
                yield (0, Exec_1.streamCommandOutput)(`composer create-project laravel/laravel=${value} ${options.getOption('name')} --prefer-dist`);
                options.setOption('installed', true);
            });
        }
    }
];
exports.default = questions;
//# sourceMappingURL=mainInstaller.js.map