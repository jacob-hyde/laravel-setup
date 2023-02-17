"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
const options = require('../Options');
const Path_1 = require("./Path");
class Stub {
    constructor(stubFile) {
        this.stubFile = stubFile;
    }
    withData(data) {
        this.data = data;
        return this;
    }
    withCallback(callback) {
        this.callback = callback;
        return this;
    }
    save() {
        const stubFile = this.readStubFile();
        const modifiedStub = this.modifyStub(stubFile);
        this.publishStub(modifiedStub);
    }
    readStubFile() {
        return fs.readFileSync(this.stubFile, 'utf8');
    }
    modifyStub(stub) {
        if (this.data) {
            stub = this.data.reduce((stub, [key, value]) => {
                return stub.replace(new RegExp(`\\[\\-\\-${key}\\-\\-\\]`, 'g'), value);
            }, stub);
        }
        if (this.callback) {
            stub = this.callback(stub);
        }
        return stub;
    }
    publishStub(stub) {
        const path = Stub.convertPathToProjectPath(this.stubFile);
        (0, Path_1.createPathIfNotExists)(path);
        fs.writeFileSync(path, stub);
    }
    static convertPathToProjectPath(path) {
        if (path.includes('Stubs/')) {
            path = path.replace(/.*Stubs\/[^\/]+\/(.*)/, `${options.getOption('name')}/$1`);
        }
        else {
            path = `${options.getOption('name')}/${path}`;
        }
        return path;
    }
}
exports.default = Stub;
//# sourceMappingURL=Stub.js.map