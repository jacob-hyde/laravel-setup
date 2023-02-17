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
exports.replaceInFile = exports.updateNodePackages = void 0;
const fs_1 = require("fs");
const options = require('../Options');
const updateNodePackages = (callback, dev = false) => __awaiter(void 0, void 0, void 0, function* () {
    const configurationKey = dev ? 'devDependencies' : 'dependencies';
    const packageJsonPath = `${options.getOption('name')}/package.json`;
    const packageJson = JSON.parse((0, fs_1.readFileSync)(packageJsonPath, 'utf8'));
    packageJson[configurationKey] = callback(packageJson[configurationKey] || {});
    Object.keys(packageJson[configurationKey]).sort().reduce((obj, key) => {
        obj[key] = packageJson[configurationKey][key];
        return obj;
    }, {});
    (0, fs_1.writeFileSync)(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
});
exports.updateNodePackages = updateNodePackages;
const replaceInFile = (search, replace, path) => {
    const fileContent = (0, fs_1.readFileSync)(path, 'utf-8');
    const updatedContent = fileContent.replace(search, replace);
    (0, fs_1.writeFileSync)(path, updatedContent, 'utf-8');
};
exports.replaceInFile = replaceInFile;
//# sourceMappingURL=FileUpdates.js.map