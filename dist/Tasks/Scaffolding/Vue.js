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
exports.option = void 0;
const options = require('../../Options');
const Exec_1 = require("../../Utils/Exec");
const FileUpdates_1 = require("../../Utils/FileUpdates");
const Stub_1 = __importDefault(require("../../Utils/Stub"));
const Path_1 = require("../../Utils/Path");
exports.option = { name: 'Vue 3', value: 'vue' };
exports.default = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, FileUpdates_1.updateNodePackages)((packages) => {
        return Object.assign(Object.assign({}, packages), { vue: '^3.2.41', 'vue-router': '^4.1.6', pinia: '^2.0.22' });
    });
    yield (0, FileUpdates_1.updateNodePackages)((packages) => {
        return Object.assign(Object.assign({}, packages), { '@rushstack/eslint-patch': '^1.2.0', '@vitejs/plugin-vue': '^4.0.0', '@vue/eslint-config-prettier': '^7.0.0', eslint: '^8.23.1', 'eslint-plugin-vue': '^9.5.1', postcss: '^8.4.16', 'postcss-import': '^15.0.0', prettier: '^2.7.1', sass: '^1.54.9', axios: '^1.2.2', lodash: '^4.17.19' });
    }, true);
    yield installStubFiles();
    // Run npm install
    yield (0, Exec_1.streamCommandOutput)('npm install');
});
const stubsPath = `${__dirname}/../../Stubs/`;
const stubs = [
    new Stub_1.default(stubsPath + 'vue-react/resources/views/index.blade.html').withData([
        ['name', options.getOption('name')]
    ]),
    new Stub_1.default(stubsPath + 'vue-react/postcss.config.js'),
    new Stub_1.default(stubsPath + 'vue-react/resources/css/app.css'),
    new Stub_1.default(stubsPath + 'vue3/.eslintrc.cjs'),
    new Stub_1.default(stubsPath + 'vue3/resources/js/app.js'),
    new Stub_1.default(stubsPath + 'vue3/resources/js/bootstrap.js'),
    new Stub_1.default(stubsPath + 'vue3/resources/js/App.vue'),
    new Stub_1.default(stubsPath + 'vue3/resources/js/Views/IndexView.vue'),
    new Stub_1.default(stubsPath + 'vue3/resources/js/Router/index.js'),
    new Stub_1.default(stubsPath + 'vue3/resources/js/Layouts/MainLayout.vue'),
    `${stubsPath}vue3/resources/js/Components/`
];
const installStubFiles = () => __awaiter(void 0, void 0, void 0, function* () {
    for (const stub of stubs) {
        if (typeof stub === 'string') {
            const path = Stub_1.default.convertPathToProjectPath(stub);
            (0, Path_1.createPathIfNotExists)(path);
        }
        else {
            stub.save();
        }
    }
});
//# sourceMappingURL=Vue.js.map